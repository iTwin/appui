/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyFilterBuilder
 */

import type { PropertyDescription } from "@itwin/appui-abstract";
import { StandardTypeNames } from "@itwin/appui-abstract";

/**
 * Logical operator for joining rules.
 * @beta
 */
export enum PropertyFilterRuleGroupOperator {
  And,
  Or,
}

/**
 * Operators for comparing property value in [[PropertyFilterRule]].
 * @beta
 */
export type PropertyFilterRuleOperator =
  | "is-true"
  | "is-false"
  | "is-equal"
  | "is-not-equal"
  | "greater"
  | "greater-or-equal"
  | "less"
  | "less-or-equal"
  | "like"
  | "is-null"
  | "is-not-null";

/**
 * Operators supported by [[usePropertyFilterBuilder]] when building filter rules.
 * @beta
 */
export type PropertyFilterBuilderRuleOperator =
  | PropertyFilterRuleOperator
  | "between"
  | "not-between";

/**
 * Function that returns set of available operator based on property type.
 * @beta
 */
export function getPropertyFilterBuilderOperators(
  property: PropertyDescription
): PropertyFilterBuilderRuleOperator[] {
  const typename = property.typename;

  if (
    typename === StandardTypeNames.Bool ||
    typename === StandardTypeNames.Boolean
  ) {
    return ["is-true", "is-false"];
  }

  const operators: PropertyFilterBuilderRuleOperator[] = [
    "is-equal",
    "is-not-equal",
    "is-null",
    "is-not-null",
  ];

  if (
    typename === StandardTypeNames.Number ||
    typename === StandardTypeNames.Int ||
    typename === StandardTypeNames.Integer ||
    typename === StandardTypeNames.Double ||
    typename === StandardTypeNames.Float ||
    typename === StandardTypeNames.Hex ||
    typename === StandardTypeNames.Hexadecimal ||
    typename === StandardTypeNames.ShortDate ||
    typename === StandardTypeNames.DateTime
  ) {
    return [
      ...operators,
      "greater",
      "greater-or-equal",
      "less",
      "less-or-equal",
      "between",
      "not-between",
    ];
  }

  if (
    typename === StandardTypeNames.String ||
    typename === StandardTypeNames.Text
  ) {
    return ["like", ...operators];
  }

  return operators;
}

/**
 * Function that checks if supplied [[PropertyFilterBuilderRuleOperator]] operator is unary.
 * @beta
 */
export function isUnaryPropertyFilterBuilderOperator(
  operator: PropertyFilterBuilderRuleOperator
) {
  return (
    operator !== "between" &&
    operator !== "not-between" &&
    isUnaryPropertyFilterOperator(operator)
  );
}

/**
 * Function that checks if supplied [[PropertyFilterRuleOperator]] operator is unary.
 * @beta
 */
export function isUnaryPropertyFilterOperator(
  operator: PropertyFilterRuleOperator
) {
  switch (operator) {
    case "is-true":
    case "is-false":
    case "is-null":
    case "is-not-null":
      return true;
  }
  return false;
}
