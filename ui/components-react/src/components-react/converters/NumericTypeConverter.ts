/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module TypeConverters
 */

import type { Primitives } from "@itwin/appui-abstract";
import { StandardTypeNames } from "@itwin/appui-abstract";
import type { LessGreaterOperatorProcessor } from "./TypeConverter.js";
import { TypeConverter } from "./TypeConverter.js";
import { TypeConverterManager } from "./TypeConverterManager.js";

/**
 * Base Numeric Type Converter.
 * @public
 */
export abstract class NumericTypeConverterBase
  extends TypeConverter
  implements LessGreaterOperatorProcessor
{
  public override get isLessGreaterType(): boolean {
    return true;
  }

  public isLessThan(a: Primitives.Numeric, b: Primitives.Numeric): boolean {
    return a < b;
  }

  public isLessThanOrEqualTo(
    a: Primitives.Numeric,
    b: Primitives.Numeric
  ): boolean {
    return a <= b;
  }

  public isGreaterThan(a: Primitives.Numeric, b: Primitives.Numeric): boolean {
    return a > b;
  }

  public isGreaterThanOrEqualTo(
    a: Primitives.Numeric,
    b: Primitives.Numeric
  ): boolean {
    return a >= b;
  }

  public sortCompare(
    a: Primitives.Numeric,
    b: Primitives.Numeric,
    _ignoreCase?: boolean
  ): number {
    return +a - +b;
  }
}

/**
 * Float Type Converter.
 * @public
 */
export class FloatTypeConverter extends NumericTypeConverterBase {
  private static parseString(value: string): number | undefined {
    const parsedValue = parseFloat(value);
    return Number.isNaN(parsedValue) ? undefined : parsedValue;
  }

  public override convertToString(value?: Primitives.Float) {
    if (value === undefined) return "";

    let numericValue = 0;
    if (typeof value === "string") {
      if (value === "-" || value === "" || value === "-0.0" || value === "-0") {
        // handle these semi-valid values as 0
        numericValue = 0;
      } else {
        numericValue = FloatTypeConverter.parseString(value) ?? 0;
      }
    } else {
      numericValue = value;
    }
    // this is close to calling `toFixed(2)`, but cuts of any trailing zeros
    let stringValue = (Math.round(100 * numericValue) / 100).toString();
    // because this is a _float_ converter, we want to emphasize the number is a float - make
    // sure there's a decimal part
    if (stringValue.indexOf(".") === -1) stringValue += ".0";
    return stringValue;
  }

  public override convertFromString(value: string): number | undefined {
    return FloatTypeConverter.parseString(value);
  }
}
TypeConverterManager.registerConverter(
  StandardTypeNames.Float,
  FloatTypeConverter
);
TypeConverterManager.registerConverter(
  StandardTypeNames.Double,
  FloatTypeConverter
);
TypeConverterManager.registerConverter(
  StandardTypeNames.Number,
  FloatTypeConverter
);

/**
 * Int Type Converter.
 * @public
 */
export class IntTypeConverter extends NumericTypeConverterBase {
  private static parseString(value: string): number | undefined {
    const parsedValue = parseInt(value, 10);
    return Number.isNaN(parsedValue) ? undefined : parsedValue;
  }

  public override convertToString(value?: Primitives.Int) {
    if (value === undefined) return "";

    let numericValue = 0;
    if (typeof value === "string") {
      if (value === "-" || value === "" || value === "-0") {
        // handle these semi-valid values as 0
        numericValue = 0;
      } else {
        numericValue = IntTypeConverter.parseString(value) ?? 0;
      }
    } else {
      numericValue = value;
    }
    return Math.round(numericValue).toString();
  }

  public override convertFromString(value: string): number | undefined {
    return IntTypeConverter.parseString(value);
  }
}

TypeConverterManager.registerConverter(StandardTypeNames.Int, IntTypeConverter);
TypeConverterManager.registerConverter(
  StandardTypeNames.Integer,
  IntTypeConverter
);
