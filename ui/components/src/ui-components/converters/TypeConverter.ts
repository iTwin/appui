/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module TypeConverters
 */

// cSpell:ignore valuetypes shortdate

import { OutputMessageAlert, OutputMessagePriority, OutputMessageType } from "@bentley/imodeljs-frontend";
import { Primitives, PrimitiveValue, PropertyDescription, PropertyRecord, PropertyValue, PropertyValueFormat } from "@bentley/ui-abstract";
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
  Composite = "composite",
}

/** Sort compare method for types that support sorting
 * @public
 */
export interface SortComparer {
  /** Sort function for two primitive values */
  sortCompare(valueA: Primitives.Value, valueB: Primitives.Value, ignoreCase?: boolean): number;
}

/** Operators for all filterable types
 * @public
 */
export interface OperatorProcessor {
  /** Determines if two primitive values are equal */
  isEqualTo(a: Primitives.Value, b: Primitives.Value): boolean;
  /** Determines if two primitive values are not equal */
  isNotEqualTo(a: Primitives.Value, b: Primitives.Value): boolean;
}

/** Operators for Numeric types, DateTime, TimeSpan, or  any type that supports these comparisons
 * @public
 */
export interface LessGreaterOperatorProcessor {
  /** Determines if a primitive values is less than another primitive value */
  isLessThan(a: Primitives.Value, b: Primitives.Value): boolean;
  /** Determines if a primitive values is less than or equal to another primitive value */
  isLessThanOrEqualTo(a: Primitives.Value, b: Primitives.Value): boolean;
  /** Determines if a primitive values is greater than another primitive value */
  isGreaterThan(a: Primitives.Value, b: Primitives.Value): boolean;
  /** Determines if a primitive values is greater than or equal to another primitive value */
  isGreaterThanOrEqualTo(a: Primitives.Value, b: Primitives.Value): boolean;
}

/** Operators for all filterable null-able types
 * @public
 */
export interface NullableOperatorProcessor {
  /** Determines if a primitive value is null or undefined */
  isNull(value: Primitives.Value): boolean;
  /** Determines if a primitive value is not null or not undefined */
  isNotNull(value: Primitives.Value): boolean;
}

/** Asynchronous Error Message returned as part of [[AsyncValueProcessingResult]]
 * @beta
 */
export interface AsyncErrorMessage {
  priority: OutputMessagePriority;
  briefMessage: string;
  detailedMessage?: string;
  msgType?: OutputMessageType;
  alertType?: OutputMessageAlert;
  displayTime?: number;
}

/** Asynchronous Value Process Result
 * @beta
 */
export interface AsyncValueProcessingResult {
  encounteredError: boolean;
  returnValue?: PropertyValue;
  errorMessage?: AsyncErrorMessage;
}

/**
 * Type Converter base class.
 * @public
 */
export abstract class TypeConverter implements SortComparer, OperatorProcessor, NullableOperatorProcessor {
  /** Converts a primitive value to a string */
  public convertToString(value?: Primitives.Value): string | Promise<string> {
    if (value === undefined)
      return "";
    return value.toString();
  }

  /** Converts a string to a primitive value */
  public convertFromString(_value: string): ConvertedPrimitives.Value | undefined | Promise<ConvertedPrimitives.Value | undefined> {
    return undefined;
  }

  /** Converts a value associated with a property description to a string */
  public convertPropertyToString(_propertyDescription: PropertyDescription, value?: Primitives.Value): string | Promise<string> {
    return this.convertToString(value);
  }

  /** Converts a string with a property record to a property value */
  public async convertFromStringToPropertyValue(value: string, _propertyRecord?: PropertyRecord): Promise<PropertyValue> {
    const stringValue = await this.convertFromString(value);
    const propertyValue: PrimitiveValue = {
      valueFormat: PropertyValueFormat.Primitive,
      value: stringValue ? stringValue : "",
      displayValue: "",
    };
    return propertyValue;
  }

  /** Sort function for two primitive values */
  public abstract sortCompare(valueA: Primitives.Value, valueB: Primitives.Value, _ignoreCase?: boolean): number;

  /** Determines if two primitive values are equal */
  public isEqualTo(valueA: Primitives.Value, valueB: Primitives.Value): boolean {
    return valueA === valueB;
  }

  /** Determines if two primitive values are not equal */
  public isNotEqualTo(valueA: Primitives.Value, valueB: Primitives.Value): boolean {
    return valueA !== valueB;
  }

  /** Determines if a primitive value is null or undefined */
  public isNull(value: Primitives.Value): boolean {
    return value === null || value === undefined;
  }

  /** Determines if a primitive value is not null or not undefined */
  public isNotNull(value: Primitives.Value): boolean {
    return value !== null && value !== undefined;
  }

  /** Determines if the converter is for a string type */
  public get isStringType(): boolean { return false; }
  /** Determines if the converter is for a numeric type */
  public get isLessGreaterType(): boolean { return false; }
  /** Determines if the converter is for a boolean type */
  public get isBooleanType(): boolean { return false; }
  /** Determines if the converter is for a nullable type */
  public get isNullableType(): boolean { return true; }
}
