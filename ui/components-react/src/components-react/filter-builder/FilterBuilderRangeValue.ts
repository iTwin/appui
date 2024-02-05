/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyFilterBuilder
 */

import type { PrimitiveValue, PropertyValue } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";

/**
 * Data structure that describes range value.
 * @beta
 */
export interface PropertyFilterBuilderRuleRangeValue {
  from: PrimitiveValue;
  to: PrimitiveValue;
}

/** @beta */
export namespace PropertyFilterBuilderRuleRangeValue {
  /**
   * Parses [[PropertyFilterBuilderRuleRangeValue]] from [[PropertyValue]].
   * @beta
   */
  export function parse(
    val?: PropertyValue
  ): PropertyFilterBuilderRuleRangeValue {
    return parseRangeValue(val);
  }

  /**
   * Serializes [[PropertyFilterBuilderRuleRangeValue]] into [[PrimitiveValue]].
   * @beta
   */
  export function serialize(
    val: PropertyFilterBuilderRuleRangeValue
  ): PrimitiveValue {
    return {
      valueFormat: PropertyValueFormat.Primitive,
      value: JSON.stringify(val),
    };
  }

  /**
   * Checks if [[PropertyFilterBuilderRuleRangeValue]] has valid range.
   * @beta
   */
  export function isRangeValid({
    from,
    to,
  }: PropertyFilterBuilderRuleRangeValue) {
    if (isNumericValue(from) && isNumericValue(to)) {
      return from.value < to.value;
    }

    if (isDateValue(from) && isDateValue(to)) {
      return new Date(from.value) < new Date(to.value);
    }

    return false;
  }
}

function isNumericValue(
  value: PrimitiveValue
): value is PrimitiveValue & { value: number } {
  return typeof value.value === "number";
}

function isDateValue(
  value: PrimitiveValue
): value is PrimitiveValue & { value: string | Date } {
  return typeof value.value === "string" || value.value instanceof Date;
}

function parseRangeValue(
  val?: PropertyValue
): PropertyFilterBuilderRuleRangeValue {
  if (
    !val ||
    val.valueFormat !== PropertyValueFormat.Primitive ||
    typeof val.value !== "string"
  ) {
    return {
      from: { valueFormat: PropertyValueFormat.Primitive },
      to: { valueFormat: PropertyValueFormat.Primitive },
    };
  }

  try {
    const value = JSON.parse(val.value);
    if (value.from !== undefined && value.to !== undefined) {
      return value as PropertyFilterBuilderRuleRangeValue;
    }
  } catch {}

  return {
    from: { valueFormat: PropertyValueFormat.Primitive },
    to: { valueFormat: PropertyValueFormat.Primitive },
  };
}
