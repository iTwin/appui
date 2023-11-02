/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module FilterBuilder
 */

import type { PropertyDescription, PropertyValue } from "@itwin/appui-abstract";
import type { FilterRuleGroupOperator, FilterRuleOperator } from "./Operators";

/**
 * Type that describes property filter.
 * @beta
 */
export type Filter = FilterRule | FilterRuleGroup;

/**
 * Data structure that describes group of filter rules.
 * @beta
 */
export interface FilterRuleGroup {
  /** Operator that should join rules in this group. */
  operator: FilterRuleGroupOperator;
  /** Rules in this group. */
  rules: Array<Filter>;
}

/**
 * Data structure that describes single filter rule.
 * @beta
 */
export interface FilterRule {
  /** Property used in this rule. */
  property: PropertyDescription;
  /** Operator that should be used to compare property value. */
  operator: FilterRuleOperator;
  /** Value that property should be compared to. */
  value?: PropertyValue;
}

/**
 * Function that checks if supplied filter is rule group.
 * @beta
 */
export function isFilterRuleGroup(filter: Filter): filter is FilterRuleGroup {
  return (filter as any).rules !== undefined;
}
