/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module TypeConverters
 */

// cSpell:ignore valuetypes shortdate

import {
  OutputMessagePriority,
  OutputMessageType,
  OutputMessageAlert,
  PropertyDescription,
  PropertyRecord,
  Primitives,
  PropertyValue,
  PropertyValueFormat,
  PrimitiveValue,
} from "@bentley/imodeljs-frontend";

import { ConvertedPrimitives } from "./valuetypes/ConvertedTypes";

/**
 * StandardTypeConverterTypeNames.
 * @beta
 */
export enum StandardTypeConverterTypeNames {
  Text = "text",
  String = "string",
  ShortDate = "shortdate",
  DateTime = "dateTime",
  Boolean = "boolean",
  Bool = "bool",
  Float = "float",
  Double = "double",
  Int = "int",
  Integer = "integer",
  Hexadecimal = "hexadecimal",
  Hex = "hex",
  Enum = "enum",
  Point2d = "point2d",
  Point3d = "point3d",
  Navigation = "navigation",
}

/** Sort compare method for types that support sorting
 * @public
 */
export interface SortComparer {
  sortCompare(valueA: Primitives.Value, valueB: Primitives.Value, ignoreCase?: boolean): number;
}

/** Operators for all filterable types
 * @public
 */
export interface OperatorProcessor {
  isEqualTo(a: Primitives.Value, b: Primitives.Value): boolean;
  isNotEqualTo(a: Primitives.Value, b: Primitives.Value): boolean;
}

/** Operators for Numeric types, DateTime, TimeSpan, or  any type that supports these comparisons
 * @public
 */
export interface LessGreaterOperatorProcessor {
  isLessThan(a: Primitives.Value, b: Primitives.Value): boolean;
  isLessThanOrEqualTo(a: Primitives.Value, b: Primitives.Value): boolean;
  isGreaterThan(a: Primitives.Value, b: Primitives.Value): boolean;
  isGreaterThanOrEqualTo(a: Primitives.Value, b: Primitives.Value): boolean;
}

/** Operators for all filterable null-able types
 * @public
 */
export interface NullableOperatorProcessor {
  isNull(value: Primitives.Value): boolean;
  isNotNull(value: Primitives.Value): boolean;
}

/** Asynchronous Error Message returned as part of [[AsyncValueProcessingResult]]
 * @beta
 */
export interface AsyncErrorMessage {
  briefMsg: string;
  detailedMsg?: string;
  priority?: OutputMessagePriority;
  msgType?: OutputMessageType;
  localizationNamespace?: string;   // If this is defined, the detailed and brief properties are keys used along with the namespace to look up localized strings.
  alertType?: OutputMessageAlert;
  displayTime?: number;
}

/** Asynchronous Value Process Result
 * @beta
 */
export interface AsyncValueProcessingResult {
  returnValue?: PropertyValue;
  encounteredError: boolean;
  errorMsg?: AsyncErrorMessage;
}

/**
 * Type Converter base class.
 * @public
 */
export abstract class TypeConverter implements SortComparer, OperatorProcessor {
  public convertToString(value?: Primitives.Value): string | Promise<string> {
    if (value === undefined)
      return "";
    return value.toString();
  }

  public convertFromString(_value: string): ConvertedPrimitives.Value | undefined | Promise<ConvertedPrimitives.Value | undefined> {
    return undefined;
  }

  public convertPropertyToString(_propertyDescription: PropertyDescription, value?: Primitives.Value): string | Promise<string> {
    return this.convertToString(value);
  }

  public async convertFromStringToPropertyValue(value: string, _propertyRecord?: PropertyRecord): Promise<PropertyValue> {
    const stringValue = await this.convertFromString(value);
    const propertyValue: PrimitiveValue = {
      valueFormat: PropertyValueFormat.Primitive,
      value: stringValue ? stringValue : "",
      displayValue: "",
    };
    return propertyValue;
  }

  public abstract sortCompare(valueA: Primitives.Value, valueB: Primitives.Value, _ignoreCase?: boolean): number;

  public isEqualTo(valueA: Primitives.Value, valueB: Primitives.Value): boolean {
    return valueA === valueB;
  }

  public isNotEqualTo(valueA: Primitives.Value, valueB: Primitives.Value): boolean {
    return valueA !== valueB;
  }

  public isNull(value: Primitives.Value): boolean {
    return value === null || value === undefined;
  }

  public isNotNull(value: Primitives.Value): boolean {
    return value !== null && value !== undefined;
  }

  public get isStringType(): boolean { return false; }
  public get isLessGreaterType(): boolean { return false; }
  public get isBooleanType(): boolean { return false; }
  public get isNullableType(): boolean { return true; }
}
