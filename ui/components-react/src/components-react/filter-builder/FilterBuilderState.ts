/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module FilterBuilder
 */

import type { Draft } from "immer";
import { produce } from "immer";
import * as React from "react";
import type { PropertyDescription, PropertyValue } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import { Guid } from "@itwin/core-bentley";
import { FilterRuleOperator } from "./Operators";
import { FilterRuleGroupOperator, isUnaryFilterOperator } from "./Operators";
import type { Filter, FilterRule } from "./Types";
import { isFilterRuleGroup } from "./Types";
import { UiComponents } from "../UiComponents";
/**
 * Data structure that describes [[FilterBuilder]] component state.
 * @beta
 */
export interface FilterBuilderState {
  /** Root group of rules in [[FilterBuilder]] component. */
  rootGroup: FilterBuilderRuleGroup;
}

/**
 * Type that describes [[FilterBuilder]] component group item.
 * @beta
 */
export type FilterBuilderRuleGroupItem =
  | FilterBuilderRuleGroup
  | FilterBuilderRule;

/**
 * Data structure that describes [[FilterBuilder]] component rule group.
 * @beta
 */
export interface FilterBuilderRuleGroup {
  /** Id of this rule group. */
  id: string;
  /** Id of rule group that this group is nested in. */
  groupId?: string;
  /** Operator that should join items in this group. */
  operator: FilterRuleGroupOperator;
  /** Items in this group. */
  items: FilterBuilderRuleGroupItem[];
}

/**
 * Data structure that describes [[FilterBuilder]] component single rule.
 * @beta
 */
export interface FilterBuilderRule {
  /** Id of this rule. */
  id: string;
  /** Id of rule group that this rule is nested in. */
  groupId: string;
  /** Property used in this rule. */
  property?: PropertyDescription;
  /** Operator that should be used to compare property value. */
  operator?: FilterRuleOperator;
  /** Value that property should be compared to. */
  value?: PropertyValue;
  /** Error message of this rule. */
  errorMessage?: string;
}

/**
 * Actions for controlling [[PropertyFilterBuilder]] component state.
 * @beta
 */
export class FilterBuilderActions {
  constructor(
    private setState: (
      setter: (prevState: FilterBuilderState) => FilterBuilderState
    ) => void
  ) {}

  private updateState(updater: (state: Draft<FilterBuilderState>) => void) {
    this.setState(produce(updater));
  }

  /** Adds new rule or group of rules to the group specified by path. */
  public addItem(path: string[]) {
    this.updateState((state) => {
      const parentGroup = findRuleGroup(state.rootGroup, path);
      if (!parentGroup) return;
      const item = createEmptyRule(parentGroup.id);
      parentGroup.items.push(item);
    });
  }

  /** Removes item specified by path. */
  public removeItem(path: string[]) {
    function removeItemFromGroup(
      state: Draft<FilterBuilderState>,
      pathToItem: string[]
    ) {
      const pathToParent = pathToItem.slice(0, -1);
      const parentGroup = findRuleGroup(state.rootGroup, pathToParent);
      if (!parentGroup) return;
      const itemId = pathToItem[pathToItem.length - 1];
      const itemIndex = parentGroup.items.findIndex(
        (item) => item.id === itemId
      );
      if (itemIndex === -1) return;
      if (parentGroup.items.length === 1) {
        parentGroup.items[0] = createEmptyRule(parentGroup.id);
        return;
      }
      parentGroup.items.splice(itemIndex, 1);
    }

    this.updateState((state) => {
      removeItemFromGroup(state, path);
    });
  }

  /** Sets operator of rule group specified by the path. */
  public setRuleGroupOperator(
    path: string[],
    operator: FilterRuleGroupOperator
  ) {
    this.updateState((state) => {
      const group = findRuleGroup(state.rootGroup, path);
      if (!group) return;
      group.operator = operator;
    });
  }

  /** Sets property of rule specified by the path. */
  public setRuleProperty(path: string[], property?: PropertyDescription) {
    this.updateState((state) => {
      const rule = findRule(state.rootGroup, path);
      if (!rule) return;
      rule.property = property;
      rule.value = undefined;
      rule.errorMessage = undefined;
    });
  }

  /** Sets operator of rule specified by the path. */
  public setRuleOperator(path: string[], operator: FilterRuleOperator) {
    this.updateState((state) => {
      const rule = findRule(state.rootGroup, path);
      if (!rule) return;
      if (isUnaryFilterOperator(operator)) rule.value = undefined;
      if (
        operator !== rule.operator &&
        !areOperatorsSimilar(operator, rule.operator)
      ) {
        rule.value = undefined;
      }
      rule.operator = operator;
    });
  }

  /** Sets value of rule specified by the path. */
  public setRuleValue(path: string[], value: PropertyValue) {
    this.updateState((state) => {
      const rule = findRule(state.rootGroup, path);
      if (!rule) return;
      rule.value = value;
    });
  }

  /**
   * Sets error messages of the rules specified by id.
   * If rule id is not present in the map, then its error message will be cleared.
   */
  public setRuleErrorMessages(ruleIdsAndErrorMessages: Map<string, string>) {
    this.updateState((state) => {
      const setErrorMessages = (item: FilterBuilderRuleGroupItem) => {
        if (isFilterBuilderRuleGroup(item)) {
          item.items.forEach((itm) => {
            setErrorMessages(itm);
          });
        } else {
          item.errorMessage = ruleIdsAndErrorMessages.get(item.id);
        }
      };

      setErrorMessages(state.rootGroup);
    });
  }
}

/**
 * Function to check if supplied [[FilterBuilderRuleGroupItem]] is [FilterBuilderRuleGroup]].
 * @beta
 */
export function isFilterBuilderRuleGroup(
  item: FilterBuilderRuleGroupItem
): item is FilterBuilderRuleGroup {
  return (item as any).items !== undefined;
}

/**
 * Props for [[useFilterBuilder]]
 * @beta
 */
export interface UseFilterBuilderProps {
  /** Initial filter for [[FilterBuilder]] */
  initialFilter?: Filter;
  /** Custom rule validator to be used when [[UseFilterBuilderResult.buildFilter]] is invoked. Should return error message or `undefined`, if rule is valid. */
  ruleValidator?: (rule: FilterBuilderRule) => string | undefined;
}

/**
 * Options for [[UseFilterBuilderResult.buildFilter]].
 * @beta
 */
export interface FilterOptions {
  /**
   * Specifies whether errors encountered while validating filter rules should be ignored and not persisted in state.
   * This is useful in case component needs to get filter matching rule validator but does not want to show errors in UI.
   */
  ignoreErrors?: boolean;
}

/**
 * Type for [[usePropertyFilterBuilder]] return object.
 * @beta
 */
export interface UseFilterBuilderResult {
  /** Root group of the [[FilterBuilder]]. */
  rootGroup: FilterBuilderRuleGroup;
  /** Actions for manipulating [[FilterBuilder]] state. */
  actions: FilterBuilderActions;
  /**
   * Validates and builds [[Filter]] based on current state. It uses [[defaultFilterBuilderRuleValidator]] or
   * custom validator provided through [[UseFilterBuilderProps]] to validate each rule.
   * @returns [[Filter]] if all rules are valid, `undefined` otherwise.
   */
  buildFilter: (options?: FilterOptions) => Filter | undefined;
}

/**
 * Custom hook that creates state for [[PropertyFilterBuilder]] component. It creates empty state or initializes
 * state from supplied initial filter.
 * @beta
 */
export function useFilterBuilder(
  props?: UseFilterBuilderProps
): UseFilterBuilderResult {
  const { initialFilter, ruleValidator } = props ?? {
    initialFilter: undefined,
    ruleValidator: undefined,
  };
  const [state, setState] = React.useState<FilterBuilderState>(
    initialFilter
      ? convertFilterToState(initialFilter)
      : { rootGroup: createEmptyRuleGroup() }
  );

  const [actions] = React.useState(() => new FilterBuilderActions(setState));

  const buildFilter = React.useCallback(
    (options?: FilterOptions) => {
      const ruleErrors = validateRules(state.rootGroup, ruleValidator);
      if (!options?.ignoreErrors) {
        actions.setRuleErrorMessages(ruleErrors);
      }

      return ruleErrors.size === 0 ? createFilter(state.rootGroup) : undefined;
    },
    [state.rootGroup, actions, ruleValidator]
  );
  return { rootGroup: state.rootGroup, actions, buildFilter };
}

function validateRules(
  rule: FilterBuilderRuleGroupItem,
  ruleValidator?: (item: FilterBuilderRule) => string | undefined
) {
  const ruleIdsAndErrorMessages = new Map<string, string>();

  const validateRulesInner = (item: FilterBuilderRuleGroupItem) => {
    if (isFilterBuilderRuleGroup(item)) {
      item.items.forEach((itm) => {
        validateRulesInner(itm);
      });
    } else {
      const errorMessage = ruleValidator
        ? ruleValidator(item)
        : defaultFilterBuilderRuleValidator(item);
      if (errorMessage) ruleIdsAndErrorMessages.set(item.id, errorMessage);
    }
  };

  validateRulesInner(rule);

  return ruleIdsAndErrorMessages;
}

/**
 * Default rule validator.
 * @beta
 */
export function defaultFilterBuilderRuleValidator(
  item: FilterBuilderRule
): string | undefined {
  if (
    item.property === undefined ||
    item.operator === undefined ||
    isUnaryFilterOperator(item.operator)
  ) {
    return undefined;
  }
  if (item.value === undefined) {
    return UiComponents.translate("filterBuilder.errorMessages.emptyValue");
  }
  if (
    item.value.valueFormat === PropertyValueFormat.Primitive &&
    (item.value.value === undefined || item.value.value === "")
  ) {
    return UiComponents.translate("filterBuilder.errorMessages.emptyValue");
  }
  return undefined;
}

/** @internal */
export function createFilter(
  groupItem: FilterBuilderRuleGroupItem
): Filter | undefined {
  if (isFilterBuilderRuleGroup(groupItem))
    return buildFilterFromRuleGroup(groupItem);
  return buildFilterFromRule(groupItem);
}

function buildFilterFromRuleGroup(
  rootGroup: FilterBuilderRuleGroup
): Filter | undefined {
  const rules = new Array<Filter>();
  for (const item of rootGroup.items) {
    const rule = createFilter(item);
    if (rule) rules.push(rule);
  }

  if (rules.length === 0) return undefined;

  if (rules.length === 1) return rules[0];

  return {
    operator: rootGroup.operator,
    rules,
  };
}

function buildFilterFromRule(rule: FilterBuilderRule): Filter | undefined {
  const { property, operator, value } = rule;
  if (!property || operator === undefined) return undefined;

  if (
    !isUnaryFilterOperator(operator) &&
    (!value ||
      value.valueFormat !== PropertyValueFormat.Primitive ||
      value.value === undefined)
  )
    return undefined;

  return { property, operator, value };
}

function createEmptyRule(groupId: string): FilterBuilderRule {
  return {
    id: Guid.createValue(),
    groupId,
  };
}

function createEmptyRuleGroup(groupId?: string): FilterBuilderRuleGroup {
  const id = Guid.createValue();
  return {
    id,
    groupId,
    operator: FilterRuleGroupOperator.And,
    items: [createEmptyRule(id)],
  };
}

function findRuleGroup(
  rootGroup: FilterBuilderRuleGroup,
  path: string[]
): FilterBuilderRuleGroup | undefined {
  if (path.length === 0) return rootGroup;

  const [currentItemId, ...rest] = path;
  const currentItem = rootGroup.items.find((item) => item.id === currentItemId);
  if (!currentItem || !isFilterBuilderRuleGroup(currentItem)) return undefined;

  return findRuleGroup(currentItem, rest);
}

function findRule(
  rootGroup: FilterBuilderRuleGroup,
  path: string[]
): FilterBuilderRule | undefined {
  if (path.length === 0) return undefined;

  const [currentItemId, ...rest] = path;
  const currentItem = rootGroup.items.find((item) => item.id === currentItemId);
  if (!currentItem) return undefined;

  if (isFilterBuilderRuleGroup(currentItem)) return findRule(currentItem, rest);

  return currentItem;
}

function getRuleGroupItem(
  filter: Filter,
  parentId: string
): FilterBuilderRuleGroupItem {
  const id = Guid.createValue();
  if (isFilterRuleGroup(filter))
    return {
      id,
      groupId: parentId,
      operator: filter.operator,
      items: filter.rules.map((rule) => getRuleGroupItem(rule, id)),
    };
  return getRuleItem(filter, id);
}

function getRuleItem(filter: FilterRule, parentId: string) {
  return {
    id: Guid.createValue(),
    groupId: parentId,
    property: filter.property,
    operator: filter.operator,
    value: filter.value,
  };
}

function convertFilterToState(filter: Filter): FilterBuilderState {
  const id = Guid.createValue();
  if (isFilterRuleGroup(filter)) {
    return {
      rootGroup: {
        id,
        operator: filter.operator,
        items: filter.rules.map((rule) => getRuleGroupItem(rule, id)),
      },
    };
  }
  return {
    rootGroup: {
      id,
      operator: FilterRuleGroupOperator.And,
      items: [getRuleItem(filter, id)],
    },
  };
}

function areOperatorsSimilar(
  firstOperator?: FilterRuleOperator,
  secondOperator?: FilterRuleOperator
) {
  return (
    (isOperatorEqualOrIsNotEqual(firstOperator) &&
      isOperatorEqualOrIsNotEqual(secondOperator)) ||
    (isInequalityOperator(firstOperator) &&
      isInequalityOperator(secondOperator))
  );
}

function isOperatorEqualOrIsNotEqual(operator?: FilterRuleOperator) {
  return (
    operator === FilterRuleOperator.IsEqual ||
    operator === FilterRuleOperator.IsNotEqual
  );
}

function isInequalityOperator(operator?: FilterRuleOperator) {
  return (
    operator === FilterRuleOperator.Less ||
    operator === FilterRuleOperator.LessOrEqual ||
    operator === FilterRuleOperator.Greater ||
    operator === FilterRuleOperator.GreaterOrEqual
  );
}
