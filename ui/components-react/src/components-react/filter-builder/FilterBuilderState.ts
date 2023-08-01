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
import { PropertyValueFormat, StandardTypeNames } from "@itwin/appui-abstract";
import { Guid } from "@itwin/core-bentley";
import type { PropertyFilterRuleOperator } from "./Operators";
import {
  isUnaryPropertyFilterOperator,
  PropertyFilterRuleGroupOperator,
} from "./Operators";
import type { PropertyFilter, PropertyFilterRule } from "./Types";
import { isPropertyFilterRuleGroup } from "./Types";
import { UiComponents } from "../UiComponents";

/**
 * Data structure that describes [[PropertyFilterBuilder]] component state.
 * @internal
 */
export interface PropertyFilterBuilderState {
  /** Root group of rules in [[PropertyFilterBuilder]] component. */
  rootGroup: PropertyFilterBuilderRuleGroup;
}

/**
 * Type that describes [[PropertyFilterBuilder]] component group item.
 * @internal
 */
export type PropertyFilterBuilderRuleGroupItem =
  | PropertyFilterBuilderRuleGroup
  | PropertyFilterBuilderRule;

/**
 * Data structure that describes [[PropertyFilterBuilder]] component rule group.
 * @internal
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
 * @internal
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
 * @internal
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

  public setRuleErrorMessage(path: string[], errorMessage?: string) {
    this.updateState((state) => {
      const rule = findRule(state.rootGroup, path);
      if (!rule) return;
      if (
        rule.operator !== undefined &&
        isUnaryPropertyFilterOperator(rule.operator)
      ) {
        return;
      }
      rule.errorMessage = errorMessage;
    });
  }

  public removeErrorMessages() {
    const removeRule = (item: PropertyFilterBuilderRuleGroupItem) => {
      if (isPropertyFilterBuilderRuleGroup(item)) {
        item.items.forEach((itm) => removeRule(itm));
      } else {
        item.errorMessage = undefined;
      }
    };
    this.updateState((state) => {
      removeRule(state.rootGroup);
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
  initialFilter?: PropertyFilter;
}
/**
 * Custom hook that creates state for [[PropertyFilterBuilder]] component. It creates empty state or initializes
 * state from supplied initial filter.
 * @beta
 */
export function usePropertyFilterBuilder({
  initialFilter,
}: UsePropertyFilterBuilderProps) {
  const [state, setState] = React.useState<PropertyFilterBuilderState>(
    initialFilter
      ? convertFilterToState(initialFilter)
      : { rootGroup: createEmptyRuleGroup() }
  );

  const [actions] = React.useState(
    () => new PropertyFilterBuilderActions(setState)
  );

  const validate = (
    ruleValidator?: ({
      actions,
      item,
      path,
    }: DefaultRuleGroupItemValidatorProps) => boolean
  ) => {
    actions.removeErrorMessages();
    if (
      ruleValidator
        ? ruleValidator({ actions, item: state.rootGroup, path: [] })
        : defaultRuleGroupItemValidator({
            actions,
            item: state.rootGroup,
            path: [],
          })
    ) {
      return buildPropertyFilter(state.rootGroup);
    } else {
      return undefined;
    }
  };
  return { rootGroup: state.rootGroup, actions, validate };
}

interface DefaultRuleGroupItemValidatorProps {
  actions: PropertyFilterBuilderActions;
  item: PropertyFilterBuilderRuleGroupItem;
  path: string[];
}

function defaultRuleGroupItemValidator({
  actions,
  item,
  path,
}: DefaultRuleGroupItemValidatorProps) {
  if (isPropertyFilterBuilderRuleGroup(item)) {
    return defaultRuleGroupValidator({ actions, item, path });
  } else {
    return defaultRuleValidator({ actions, item, path });
  }
}

interface DefaultRuleGroupValidatorProps
  extends Omit<DefaultRuleGroupItemValidatorProps, "item"> {
  item: PropertyFilterBuilderRuleGroup;
}

function defaultRuleGroupValidator({
  actions,
  item,
  path,
}: DefaultRuleGroupValidatorProps) {
  let areRulesValid = true;
  item.items.forEach((itm) => {
    const isRuleValid = defaultRuleGroupItemValidator({
      actions,
      item: itm,
      path: [...path, itm.id],
    });
    if (!isRuleValid) areRulesValid = false;
  });
  return areRulesValid;
}

interface DefaultRuleValidatorProps
  extends Omit<DefaultRuleGroupItemValidatorProps, "item"> {
  item: PropertyFilterBuilderRule;
}

function defaultRuleValidator({
  actions,
  item,
  path,
}: DefaultRuleValidatorProps) {
  if (
    item.operator === undefined ||
    isUnaryPropertyFilterOperator(item.operator)
  ) {
    return true;
  }
  if (item.value === undefined) {
    actions.setRuleErrorMessage(
      path,
      isTypeNameNumeric(item.property?.typename)
        ? UiComponents.translate("filterBuilder.errorMessages.notANumber")
        : UiComponents.translate("filterBuilder.errorMessages.emptyValue")
    );
    return false;
  }
  // istanbul ignore else
  if (item.value.valueFormat === PropertyValueFormat.Primitive) {
    if (
      isTypeNameNumeric(item.property?.typename) &&
      item.value.value === undefined
    ) {
      actions.setRuleErrorMessage(
        path,
        UiComponents.translate("filterBuilder.errorMessages.notANumber")
      );
      return false;
    }
    if (item.value.value === undefined || item.value.value === "") {
      actions.setRuleErrorMessage(
        path,
        UiComponents.translate("filterBuilder.errorMessages.emptyValue")
      );
      return false;
    }
  }
  return true;
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

const isTypeNameNumeric = (typename?: string) => {
  return (
    typename === StandardTypeNames.Number ||
    typename === StandardTypeNames.Int ||
    typename === StandardTypeNames.Float ||
    typename === StandardTypeNames.Double
  );
};
