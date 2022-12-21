/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type { PropertyDescription, PropertyValue } from "@itwin/appui-abstract";
import type { PropertyFilterRuleGroupOperator, PropertyFilterRuleOperator } from "./Operators";

/** @alpha */
export type PropertyFilter = PropertyFilterRule | PropertyFilterRuleGroup;

/** @alpha */
export interface PropertyFilterRuleGroup {
  operator: PropertyFilterRuleGroupOperator;
  rules: Array<PropertyFilter>;
}

/** @alpha */
export interface PropertyFilterRule {
  property: PropertyDescription;
  operator: PropertyFilterRuleOperator;
  value?: PropertyValue;
}

/** @alpha */
export function isPropertyFilterRuleGroup(filter: PropertyFilter): filter is PropertyFilterRuleGroup {
  return (filter as any).rules !== undefined;
}
