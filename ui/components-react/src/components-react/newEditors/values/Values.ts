/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 *
 */
export interface NumericValue {
  rawValue: number | undefined;
  displayValue: string;
  roundingError?: number;
}

/**
 *
 */
export interface InstanceKeyValue {
  key: { id: string; className: string };
  label: string;
}

/**
 *
 */
export interface TextValue {
  value: string;
}

/**
 *
 */
export interface BooleanValue {
  value: boolean;
}

/**
 *
 */
export interface DateValue {
  value: Date;
}

/**
 *
 */
export interface EnumValue {
  choice: number | string;
  label: string;
}

/**
 *
 */
export type Value =
  | NumericValue
  | InstanceKeyValue
  | TextValue
  | BooleanValue
  | DateValue
  | EnumValue;

/**
 *
 */
export function isTextValue(
  value: Value | undefined
): value is TextValue | undefined {
  return (
    value === undefined || ("value" in value && typeof value.value === "string")
  );
}

/**
 *
 */
export function isNumericValue(
  value: Value | undefined
): value is NumericValue | undefined {
  return (
    value === undefined || ("rawValue" in value && "displayValue" in value)
  );
}

/**
 *
 */
export function isBooleanValue(
  value: Value | undefined
): value is BooleanValue | undefined {
  return (
    value === undefined ||
    ("value" in value && typeof value.value === "boolean")
  );
}

/**
 *
 */
export function isDateTimeValue(
  value: Value | undefined
): value is DateValue | undefined {
  return (
    value === undefined || ("value" in value && value.value instanceof Date)
  );
}

/**
 *
 */
export function isEnumValue(
  value: Value | undefined
): value is EnumValue | undefined {
  return value === undefined || ("choice" in value && "label" in value);
}

/**
 *
 */
export interface EnumChoice {
  value: number | string;
  label: string;
}
