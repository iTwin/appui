/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module FilterBuilder
 */

import type { PropertyDescription } from "@itwin/appui-abstract";
import { StandardTypeNames } from "@itwin/appui-abstract";
import { UiComponents } from "../UiComponents";

/**
 * Logical operator for joining rules.
 * @beta
 */
export enum FilterRuleGroupOperator {
  And,
  Or,
}

/**
 * Operators for comparing property value in rule.
 * @beta
 */
export enum FilterRuleOperator {
  IsTrue,
  IsFalse,

  IsEqual,
  IsNotEqual,

  Greater,
  GreaterOrEqual,
  Less,
  LessOrEqual,

  Like,

  IsNull,
  IsNotNull,
}

/**
 * Function that returns set of available operator based on property type.
 * @beta
 */
export function getFilterOperators(property: PropertyDescription) {
  const typename = property.typename;

  if (
    typename === StandardTypeNames.Bool ||
    typename === StandardTypeNames.Boolean
  ) {
    return [FilterRuleOperator.IsTrue, FilterRuleOperator.IsFalse];
  }

  const operators = [
    FilterRuleOperator.IsEqual,
    FilterRuleOperator.IsNotEqual,
    FilterRuleOperator.IsNull,
    FilterRuleOperator.IsNotNull,
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
      FilterRuleOperator.Greater,
      FilterRuleOperator.GreaterOrEqual,
      FilterRuleOperator.Less,
      FilterRuleOperator.LessOrEqual,
    ];
  }

  if (
    typename === StandardTypeNames.String ||
    typename === StandardTypeNames.Text
  ) {
    return [FilterRuleOperator.Like, ...operators];
  }

  return operators;
}

/* istanbul ignore next */
/**
 * Function that returns display label for rule operator.
 * @beta
 */
export function getFilterOperatorLabel(operator: FilterRuleOperator) {
  switch (operator) {
    case FilterRuleOperator.IsTrue:
      return UiComponents.translate("filterBuilder.operators.isTrue");
    case FilterRuleOperator.IsFalse:
      return UiComponents.translate("filterBuilder.operators.isFalse");
    case FilterRuleOperator.IsEqual:
      return UiComponents.translate("filterBuilder.operators.equal");
    case FilterRuleOperator.IsNotEqual:
      return UiComponents.translate("filterBuilder.operators.notEqual");
    case FilterRuleOperator.Greater:
      return ">";
    case FilterRuleOperator.GreaterOrEqual:
      return ">=";
    case FilterRuleOperator.Less:
      return "<";
    case FilterRuleOperator.LessOrEqual:
      return "<=";
    case FilterRuleOperator.Like:
      return UiComponents.translate("filterBuilder.operators.contains");
    case FilterRuleOperator.IsNull:
      return UiComponents.translate("filterBuilder.operators.isNull");
    case FilterRuleOperator.IsNotNull:
      return UiComponents.translate("filterBuilder.operators.isNotNull");
  }
}

/**
 * Function that checks if supplied operator is unary.
 * @beta
 */
export function isUnaryFilterOperator(operator: FilterRuleOperator) {
  switch (operator) {
    case FilterRuleOperator.IsTrue:
    case FilterRuleOperator.IsFalse:
    case FilterRuleOperator.IsNull:
    case FilterRuleOperator.IsNotNull:
      return true;
  }
  return false;
}
