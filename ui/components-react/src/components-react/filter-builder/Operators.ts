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
  And = "and",
  Or = "or",
}

/**
 * Operators for comparing property value in [[PropertyFilterRule]].
 * @note `Like` operator should be handled as a contains operator - it matches all strings that contain a given string.
 * @beta
 */
export enum PropertyFilterRuleOperator {
  IsTrue = "is-true",
  IsFalse = "is-false",
  IsEqual = "is-equal",
  IsNotEqual = "is-not-equal",
  Greater = "greater",
  GreaterOrEqual = "greater-or-equal",
  Less = "less",
  LessOrEqual = "less-or-equal",
  Like = "like",
  IsNull = "is-null",
  IsNotNull = "is-not-null",
}

/**
 * Operators supported by [[usePropertyFilterBuilder]] when building filter rules.
 * @beta
 */
export type PropertyFilterBuilderRuleOperator =
  | `${PropertyFilterRuleOperator}`
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
    typename === StandardTypeNames.Bool.valueOf() ||
    typename === StandardTypeNames.Boolean.valueOf()
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
    typename === StandardTypeNames.Number.valueOf() ||
    typename === StandardTypeNames.Int.valueOf() ||
    typename === StandardTypeNames.Integer.valueOf() ||
    typename === StandardTypeNames.Double.valueOf() ||
    typename === StandardTypeNames.Float.valueOf() ||
    typename === StandardTypeNames.Hex.valueOf() ||
    typename === StandardTypeNames.Hexadecimal.valueOf() ||
    typename === StandardTypeNames.ShortDate.valueOf() ||
    typename === StandardTypeNames.DateTime.valueOf()
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
    typename === StandardTypeNames.String.valueOf() ||
    typename === StandardTypeNames.Text.valueOf()
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
  operator: `${PropertyFilterRuleOperator}`
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
