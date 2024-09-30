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
import type {
  PropertyFilterBuilderRuleOperator,
  PropertyFilterRuleGroupOperator,
} from "./Operators.js";
import {
  isUnaryPropertyFilterBuilderOperator,
  isUnaryPropertyFilterOperator,
} from "./Operators.js";
import type {
  PropertyFilter,
  PropertyFilterRule,
  PropertyFilterRuleGroup,
} from "./Types.js";
import { isPropertyFilterRuleGroup } from "./Types.js";
import { PropertyFilterBuilderRuleRangeValue } from "./FilterBuilderRangeValue.js";
import { useTranslation } from "../l10n/useTranslation.js";

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
  operator: `${PropertyFilterRuleGroupOperator}`;
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
  operator?: PropertyFilterBuilderRuleOperator;
  /** Value that property should be compared to. */
  value?: PropertyValue;
  /** Error message of this rule. */
  errorMessage?: string;
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
  public addItem(
    path: string[],
    item: "RULE_GROUP" | "RULE" | PropertyFilterRule | PropertyFilterRuleGroup
  ) {
    this.updateState((state) => {
      const parentGroup = findRuleGroup(state.rootGroup, path);
      if (!parentGroup) return;

      if (item === "RULE" || item === "RULE_GROUP") {
        const newItem =
          item === "RULE_GROUP"
            ? createEmptyRuleGroup(parentGroup.id)
            : createEmptyRule(parentGroup.id);
        parentGroup.items.push(newItem);
        return;
      }

      if (isPropertyFilterRuleGroup(item)) {
        const itemId = Guid.createValue();
        const newItem: PropertyFilterBuilderRuleGroup = {
          id: itemId,
          groupId: parentGroup.id,
          operator: item.operator,

          items: item.rules.map((rule) => getRuleGroupItem(rule, itemId)),
        };
        parentGroup.items.push(newItem);
        return;
      }

      parentGroup.items.push(getRuleItem(item, parentGroup.id));
    });
  }

  /** Removes item specified by path. */
  public removeItem(path: string[], allowLastRuleDelete: boolean = false) {
    function removeItemFromGroup(
      state: Draft<PropertyFilterBuilderState>,
      pathToItem: string[]
    ) {
      const pathToParent = pathToItem.slice(0, -1);
      const parentGroup = findRuleGroup(state.rootGroup, pathToParent);
      if (!parentGroup) {
        return;
      }

      const itemId = pathToItem[pathToItem.length - 1];
      const itemIndex = parentGroup.items.findIndex(
        (item) => item.id === itemId
      );
      if (itemIndex === -1) {
        return;
      }
      if (parentGroup.items.length === 1 && !allowLastRuleDelete) {
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
    this.updateState((state) => {
      state.rootGroup = createEmptyRuleGroup();
    });
  }

  /** Sets operator of rule group specified by the path. */
  public setRuleGroupOperator(
    path: string[],
    operator: `${PropertyFilterRuleGroupOperator}`
  ) {
    this.updateState((state) => {
      const group = findRuleGroup(state.rootGroup, path);
      if (!group) {
        return;
      }
      group.operator = operator;
    });
  }

  /** Sets property of rule specified by the path. */
  public setRuleProperty(path: string[], property?: PropertyDescription) {
    this.updateState((state) => {
      const rule = findRule(state.rootGroup, path);
      if (!rule) {
        return;
      }
      rule.property = property;
      rule.operator = undefined;
      rule.value = undefined;
      rule.errorMessage = undefined;
    });
  }

  /** Sets operator of rule specified by the path. */
  public setRuleOperator(
    path: string[],
    operator: PropertyFilterBuilderRuleOperator
  ) {
    this.updateState((state) => {
      const rule = findRule(state.rootGroup, path);
      if (!rule) {
        return;
      }
      if (isUnaryPropertyFilterBuilderOperator(operator)) {
        rule.value = undefined;
      }
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
      if (!rule) {
        return;
      }
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

  const validateRules = useRulesValidation(ruleValidator);
  const buildFilter = React.useCallback(
    (options?: BuildFilterOptions) => {
      const ruleErrors = validateRules(state.rootGroup);
      if (!options?.ignoreErrors) {
        actions.setRuleErrorMessages(ruleErrors);
      }

      return ruleErrors.size === 0
        ? buildPropertyFilter(state.rootGroup)
        : undefined;
    },
    [state.rootGroup, actions, validateRules]
  );
  return { rootGroup: state.rootGroup, actions, buildFilter };
}

function useRulesValidation(
  ruleValidator?: (item: PropertyFilterBuilderRule) => string | undefined
) {
  const defaultValidator = useDefaultPropertyFilterBuilderRuleValidator();
  const { translate } = useTranslation();
  return React.useCallback(
    (rootRule: PropertyFilterBuilderRuleGroupItem) => {
      const ruleIdsAndErrorMessages = new Map<string, string>();
      const validateRulesInner = (item: PropertyFilterBuilderRuleGroupItem) => {
        if (isPropertyFilterBuilderRuleGroup(item)) {
          item.items.forEach((itm) => {
            validateRulesInner(itm);
          });
        } else {
          const errorMessage = ruleValidator
            ? ruleValidator(item)
            : defaultValidator(item);
          if (errorMessage)
            ruleIdsAndErrorMessages.set(
              item.id,
              // need to check if error message is a key for translation in case `ruleValidator` is using `defaultPropertyFilterBuilderRuleValidator` internally
              errorMessage.startsWith("filterBuilder.errorMessages")
                ? translate(errorMessage)
                : errorMessage
            );
        }
      };
      validateRulesInner(rootRule);
      return ruleIdsAndErrorMessages;
    },
    [ruleValidator, defaultValidator, translate]
  );
}

/**
 * Creates default rule validator.
 * @beta
 */
export function useDefaultPropertyFilterBuilderRuleValidator() {
  const { translate } = useTranslation();
  return React.useCallback(
    (item: PropertyFilterBuilderRule) => {
      // eslint-disable-next-line deprecation/deprecation
      const errorMessage = defaultPropertyFilterBuilderRuleValidator(item);
      return errorMessage ? translate(errorMessage) : undefined;
    },
    [translate]
  );
}

/**
 * Default rule validator.
 * @beta
 * @deprecated in 4.17.0. Use `useDefaultPropertyFilterBuilderRuleValidator` instead.
 */
export function defaultPropertyFilterBuilderRuleValidator(
  item: PropertyFilterBuilderRule
): string | undefined {
  if (
    item.property === undefined ||
    item.operator === undefined ||
    isUnaryPropertyFilterBuilderOperator(item.operator)
  ) {
    return undefined;
  }
  if (item.operator === "between" || item.operator === "not-between") {
    return rangeRuleValidator(item.value);
  }
  if (isEmptyValue(item.value)) {
    return "filterBuilder.errorMessages.emptyValue";
  }
  return undefined;
}

function rangeRuleValidator(value?: PropertyValue) {
  const range = PropertyFilterBuilderRuleRangeValue.parse(value);
  if (isEmptyValue(range.from) || isEmptyValue(range.to)) {
    return "filterBuilder.errorMessages.emptyValue";
  }
  if (!PropertyFilterBuilderRuleRangeValue.isRangeValid(range)) {
    return "filterBuilder.errorMessages.invalidRange";
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

  if (rules.length === 1 && !isPropertyFilterRuleGroup(rules[0])) {
    return rules[0];
  }

  return {
    operator: rootGroup.operator,
    rules,
  };
}

function buildPropertyFilterFromRule(
  rule: PropertyFilterBuilderRule
): PropertyFilter | undefined {
  const { property, operator, value } = rule;
  if (!property || operator === undefined) {
    return undefined;
  }

  if (operator === "between" || operator === "not-between") {
    return buildPropertyFilterFromRangeRule({
      ...rule,
      property,
      operator,
      value,
    });
  }

  if (!isUnaryPropertyFilterOperator(operator) && isEmptyValue(value)) {
    return undefined;
  }

  return { property, operator, value };
}

function buildPropertyFilterFromRangeRule(
  rule: PropertyFilterBuilderRule & {
    property: PropertyDescription;
    operator: "between" | "not-between";
  }
): PropertyFilter | undefined {
  const { property, operator, value } = rule;
  if (
    !value ||
    value.valueFormat !== PropertyValueFormat.Primitive ||
    typeof value.value !== "string"
  ) {
    return undefined;
  }

  const { to, from } = PropertyFilterBuilderRuleRangeValue.parse(value);
  if (isEmptyValue(to) || isEmptyValue(from)) {
    return undefined;
  }

  return {
    operator: operator === "between" ? "and" : "or",
    rules: [
      {
        property,
        operator: operator === "between" ? "greater-or-equal" : "less",
        value: from,
      },
      {
        property,
        operator: operator === "between" ? "less-or-equal" : "greater",
        value: to,
      },
    ],
  };
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
    operator: "and",
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
  if (isPropertyFilterRuleGroup(filter)) {
    const rangeRule = getRangeRuleItems(filter, parentId);

    return rangeRule
      ? rangeRule
      : {
          id,
          groupId: parentId,
          operator: filter.operator,
          items: filter.rules.map((rule) => getRuleGroupItem(rule, id)),
        };
  }
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

function getRangeRuleItems(
  group: PropertyFilterRuleGroup,
  parentId: string
): PropertyFilterBuilderRuleGroupItem | undefined {
  if (group.rules.length !== 2) {
    return undefined;
  }

  const [from, to] = group.rules;
  if (
    isPropertyFilterRuleGroup(from) ||
    !from.value ||
    from.value.valueFormat !== PropertyValueFormat.Primitive ||
    isPropertyFilterRuleGroup(to) ||
    !to.value ||
    to.value.valueFormat !== PropertyValueFormat.Primitive ||
    from.property.name !== to.property.name
  ) {
    return undefined;
  }

  if (
    from.operator === "greater-or-equal" &&
    to.operator === "less-or-equal" &&
    group.operator === "and"
  ) {
    return {
      id: Guid.createValue(),
      groupId: parentId,
      operator: "between",
      property: from.property,
      value: PropertyFilterBuilderRuleRangeValue.serialize({
        from: from.value,
        to: to.value,
      }),
    };
  }

  if (
    from.operator === "less" &&
    to.operator === "greater" &&
    group.operator === "or"
  ) {
    return {
      id: Guid.createValue(),
      groupId: parentId,
      operator: "not-between",
      property: from.property,
      value: PropertyFilterBuilderRuleRangeValue.serialize({
        from: from.value,
        to: to.value,
      }),
    };
  }

  return undefined;
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
      operator: "and",
      items: [getRuleItem(filter, id)],
    },
  };
}

function isEmptyValue(value?: PropertyValue) {
  return (
    value?.valueFormat !== PropertyValueFormat.Primitive ||
    value.value === undefined ||
    value.value === ""
  );
}

function areOperatorsSimilar(
  firstOperator?: PropertyFilterBuilderRuleOperator,
  secondOperator?: PropertyFilterBuilderRuleOperator
) {
  return (
    (isOperatorEqualOrIsNotEqual(firstOperator) &&
      isOperatorEqualOrIsNotEqual(secondOperator)) ||
    (isInequalityOperator(firstOperator) &&
      isInequalityOperator(secondOperator)) ||
    (isRangeOperator(firstOperator) && isRangeOperator(secondOperator))
  );
}

function isOperatorEqualOrIsNotEqual(
  operator?: PropertyFilterBuilderRuleOperator
) {
  return operator === "is-equal" || operator === "is-not-equal";
}

function isInequalityOperator(operator?: PropertyFilterBuilderRuleOperator) {
  return (
    operator === "less" ||
    operator === "less-or-equal" ||
    operator === "greater" ||
    operator === "greater-or-equal"
  );
}

function isRangeOperator(operator?: PropertyFilterBuilderRuleOperator) {
  return operator === "between" || operator === "not-between";
}
