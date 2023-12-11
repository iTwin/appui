/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyFilterBuilder
 */

import type { Draft } from "immer";
import { produce } from "immer";
import * as React from "react";
import type { PropertyDescription, PropertyValue } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import { Guid } from "@itwin/core-bentley";
import { PropertyFilterRuleOperator } from "./Operators";
import {
  isUnaryPropertyFilterOperator,
  PropertyFilterRuleGroupOperator,
} from "./Operators";
import type { PropertyFilter, PropertyFilterRule } from "./Types";
import { isPropertyFilterRuleGroup } from "./Types";
import { UiComponents } from "../UiComponents";
/**
 * Data structure that describes [[PropertyFilterBuilder]] component state.
 * @beta
 */
export interface PropertyFilterBuilderState {
  /** Root group of rules in [[PropertyFilterBuilder]] component. */
  rootGroup: PropertyFilterBuilderRuleGroup;
}

/**
 * Type that describes [[PropertyFilterBuilder]] component group item.
 * @beta
 */
export type PropertyFilterBuilderRuleGroupItem =
  | PropertyFilterBuilderRuleGroup
  | PropertyFilterBuilderRule;

/**
 * Data structure that describes [[PropertyFilterBuilder]] component rule group.
 * @beta
 */
export interface PropertyFilterBuilderRuleGroup {
  /** Id of this rule group. */
  id: string;
  /** Id of rule group that this group is nested in. */
  groupId?: string;
  /** Operator that should join items in this group. */
  operator: PropertyFilterRuleGroupOperator;
  /** Items in this group. */
  items: PropertyFilterBuilderRuleGroupItem[];
}

/**
 * Data structure that describes [[PropertyFilterBuilder]] component single rule.
 * @beta
 */
export interface PropertyFilterBuilderRule {
  /** Id of this rule. */
  id: string;
  /** Id of rule group that this rule is nested in. */
  groupId: string;
  /** Property used in this rule. */
  property?: PropertyDescription;
  /** Operator that should be used to compare property value. */
  operator?: PropertyFilterRuleOperator;
  /** Value that property should be compared to. */
  value?: PropertyValue;
  /** Error message of this rule. */
  errorMessage?: string;
}

/**
 * Actions for controlling [[PropertyFilterBuilder]] component state.
 * @beta
 */
export class PropertyFilterBuilderActions {
  constructor(
    private setState: (
      setter: (
        prevState: PropertyFilterBuilderState
      ) => PropertyFilterBuilderState
    ) => void
  ) {}

  private updateState(
    updater: (state: Draft<PropertyFilterBuilderState>) => void
  ) {
    this.setState(produce(updater));
  }

  /** Adds new rule or group of rules to the group specified by path. */
  public addItem(path: string[], itemType: "RULE_GROUP" | "RULE") {
    this.updateState((state) => {
      const parentGroup = findRuleGroup(state.rootGroup, path);
      if (!parentGroup) return;
      const item =
        itemType === "RULE_GROUP"
          ? createEmptyRuleGroup(parentGroup.id)
          : createEmptyRule(parentGroup.id);
      parentGroup.items.push(item);
    });
  }

  /** Removes item specified by path. */
  public removeItem(path: string[]) {
    function removeItemFromGroup(
      state: Draft<PropertyFilterBuilderState>,
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

  /** Removes all items from root group. */
  public removeAllItems() {
    const removeAllRootItems = (state: Draft<PropertyFilterBuilderState>) => {
      state.rootGroup.items.forEach((item) => {
        this.removeItem([item.id]);
      });
    };

    this.updateState((state) => {
      removeAllRootItems(state);
    });
  }

  /** Sets operator of rule group specified by the path. */
  public setRuleGroupOperator(
    path: string[],
    operator: PropertyFilterRuleGroupOperator
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
      rule.operator = undefined;
      rule.value = undefined;
      rule.errorMessage = undefined;
    });
  }

  /** Sets operator of rule specified by the path. */
  public setRuleOperator(path: string[], operator: PropertyFilterRuleOperator) {
    this.updateState((state) => {
      const rule = findRule(state.rootGroup, path);
      if (!rule) return;
      if (isUnaryPropertyFilterOperator(operator)) rule.value = undefined;
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
      const setErrorMessages = (item: PropertyFilterBuilderRuleGroupItem) => {
        if (isPropertyFilterBuilderRuleGroup(item)) {
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
 * Function to check if supplied [[PropertyFilterBuilderRuleGroupItem]] is [[PropertyFilterBuilderRuleGroup]].
 * @beta
 */
export function isPropertyFilterBuilderRuleGroup(
  item: PropertyFilterBuilderRuleGroupItem
): item is PropertyFilterBuilderRuleGroup {
  return (item as any).items !== undefined;
}

/**
 * Props for [[usePropertyFilterBuilder]]
 * @beta
 */
export interface UsePropertyFilterBuilderProps {
  /** Initial filter for [[PropertyFilterBuilder]] */
  initialFilter?: PropertyFilter;
  /** Custom rule validator to be used when [[UsePropertyFilterBuilderResult.buildFilter]] is invoked. Should return error message or `undefined`, if rule is valid. */
  ruleValidator?: (rule: PropertyFilterBuilderRule) => string | undefined;
}

/**
 * Options for [[UsePropertyFilterBuilderResult.buildFilter]].
 * @beta
 */
export interface BuildFilterOptions {
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
export interface UsePropertyFilterBuilderResult {
  /** Root group of the [[PropertyFilterBuilder]]. */
  rootGroup: PropertyFilterBuilderRuleGroup;
  /** Actions for manipulating [[PropertyFilterBuilder]] state. */
  actions: PropertyFilterBuilderActions;
  /**
   * Validates and builds [[PropertyFilter]] based on current state. It uses [[defaultPropertyFilterBuilderRuleValidator]] or
   * custom validator provided through [[UsePropertyFilterBuilderProps]] to validate each rule.
   * @returns [[PropertyFilter]] if all rules are valid, `undefined` otherwise.
   */
  buildFilter: (options?: BuildFilterOptions) => PropertyFilter | undefined;
}

/**
 * Custom hook that creates state for [[PropertyFilterBuilder]] component. It creates empty state or initializes
 * state from supplied initial filter.
 * @beta
 */
export function usePropertyFilterBuilder(
  props?: UsePropertyFilterBuilderProps
): UsePropertyFilterBuilderResult {
  const { initialFilter, ruleValidator } = props ?? {
    initialFilter: undefined,
    ruleValidator: undefined,
  };
  const [state, setState] = React.useState<PropertyFilterBuilderState>(
    initialFilter
      ? convertFilterToState(initialFilter)
      : { rootGroup: createEmptyRuleGroup() }
  );

  const [actions] = React.useState(
    () => new PropertyFilterBuilderActions(setState)
  );

  const buildFilter = React.useCallback(
    (options?: BuildFilterOptions) => {
      const ruleErrors = validateRules(state.rootGroup, ruleValidator);
      if (!options?.ignoreErrors) {
        actions.setRuleErrorMessages(ruleErrors);
      }

      return ruleErrors.size === 0
        ? buildPropertyFilter(state.rootGroup)
        : undefined;
    },
    [state.rootGroup, actions, ruleValidator]
  );
  return { rootGroup: state.rootGroup, actions, buildFilter };
}

function validateRules(
  rule: PropertyFilterBuilderRuleGroupItem,
  ruleValidator?: (item: PropertyFilterBuilderRule) => string | undefined
) {
  const ruleIdsAndErrorMessages = new Map<string, string>();

  const validateRulesInner = (item: PropertyFilterBuilderRuleGroupItem) => {
    if (isPropertyFilterBuilderRuleGroup(item)) {
      item.items.forEach((itm) => {
        validateRulesInner(itm);
      });
    } else {
      const errorMessage = ruleValidator
        ? ruleValidator(item)
        : defaultPropertyFilterBuilderRuleValidator(item);
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
export function defaultPropertyFilterBuilderRuleValidator(
  item: PropertyFilterBuilderRule
): string | undefined {
  if (
    item.property === undefined ||
    item.operator === undefined ||
    isUnaryPropertyFilterOperator(item.operator)
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
export function buildPropertyFilter(
  groupItem: PropertyFilterBuilderRuleGroupItem
): PropertyFilter | undefined {
  if (isPropertyFilterBuilderRuleGroup(groupItem))
    return buildPropertyFilterFromRuleGroup(groupItem);
  return buildPropertyFilterFromRule(groupItem);
}

function buildPropertyFilterFromRuleGroup(
  rootGroup: PropertyFilterBuilderRuleGroup
): PropertyFilter | undefined {
  const rules = new Array<PropertyFilter>();
  for (const item of rootGroup.items) {
    const rule = buildPropertyFilter(item);
    if (rule) rules.push(rule);
  }

  if (rules.length === 0) return undefined;

  if (rules.length === 1) return rules[0];

  return {
    operator: rootGroup.operator,
    rules,
  };
}

function buildPropertyFilterFromRule(
  rule: PropertyFilterBuilderRule
): PropertyFilter | undefined {
  const { property, operator, value } = rule;
  if (!property || operator === undefined) return undefined;

  if (
    !isUnaryPropertyFilterOperator(operator) &&
    (!value ||
      value.valueFormat !== PropertyValueFormat.Primitive ||
      value.value === undefined)
  )
    return undefined;

  return { property, operator, value };
}

function createEmptyRule(groupId: string): PropertyFilterBuilderRule {
  return {
    id: Guid.createValue(),
    groupId,
  };
}

function createEmptyRuleGroup(
  groupId?: string
): PropertyFilterBuilderRuleGroup {
  const id = Guid.createValue();
  return {
    id,
    groupId,
    operator: PropertyFilterRuleGroupOperator.And,
    items: [createEmptyRule(id)],
  };
}

function findRuleGroup(
  rootGroup: PropertyFilterBuilderRuleGroup,
  path: string[]
): PropertyFilterBuilderRuleGroup | undefined {
  if (path.length === 0) return rootGroup;

  const [currentItemId, ...rest] = path;
  const currentItem = rootGroup.items.find((item) => item.id === currentItemId);
  if (!currentItem || !isPropertyFilterBuilderRuleGroup(currentItem))
    return undefined;

  return findRuleGroup(currentItem, rest);
}

function findRule(
  rootGroup: PropertyFilterBuilderRuleGroup,
  path: string[]
): PropertyFilterBuilderRule | undefined {
  if (path.length === 0) return undefined;

  const [currentItemId, ...rest] = path;
  const currentItem = rootGroup.items.find((item) => item.id === currentItemId);
  if (!currentItem) return undefined;

  if (isPropertyFilterBuilderRuleGroup(currentItem))
    return findRule(currentItem, rest);

  return currentItem;
}

function getRuleGroupItem(
  filter: PropertyFilter,
  parentId: string
): PropertyFilterBuilderRuleGroupItem {
  const id = Guid.createValue();
  if (isPropertyFilterRuleGroup(filter))
    return {
      id,
      groupId: parentId,
      operator: filter.operator,
      items: filter.rules.map((rule) => getRuleGroupItem(rule, id)),
    };
  return getRuleItem(filter, id);
}

function getRuleItem(filter: PropertyFilterRule, parentId: string) {
  return {
    id: Guid.createValue(),
    groupId: parentId,
    property: filter.property,
    operator: filter.operator,
    value: filter.value,
  };
}

function convertFilterToState(
  filter: PropertyFilter
): PropertyFilterBuilderState {
  const id = Guid.createValue();
  if (isPropertyFilterRuleGroup(filter)) {
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
      operator: PropertyFilterRuleGroupOperator.And,
      items: [getRuleItem(filter, id)],
    },
  };
}

function areOperatorsSimilar(
  firstOperator?: PropertyFilterRuleOperator,
  secondOperator?: PropertyFilterRuleOperator
) {
  return (
    (isOperatorEqualOrIsNotEqual(firstOperator) &&
      isOperatorEqualOrIsNotEqual(secondOperator)) ||
    (isInequalityOperator(firstOperator) &&
      isInequalityOperator(secondOperator))
  );
}

function isOperatorEqualOrIsNotEqual(operator?: PropertyFilterRuleOperator) {
  return (
    operator === PropertyFilterRuleOperator.IsEqual ||
    operator === PropertyFilterRuleOperator.IsNotEqual
  );
}

function isInequalityOperator(operator?: PropertyFilterRuleOperator) {
  return (
    operator === PropertyFilterRuleOperator.Less ||
    operator === PropertyFilterRuleOperator.LessOrEqual ||
    operator === PropertyFilterRuleOperator.Greater ||
    operator === PropertyFilterRuleOperator.GreaterOrEqual
  );
}
