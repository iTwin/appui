/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import type {
  BooleanValue,
  DateValue,
  EnumValue,
  InstanceKeyValue,
  NumericValue,
  TextValue,
  Value,
} from "./Values.js";

/**
 * Type guard for text value.
 * @beta
 */
export function isText(value: Value): value is TextValue {
  return "value" in value && typeof value.value === "string";
}

/**
 * Type guard for numeric value.
 * @beta
 */
export function isNumeric(value: Value): value is NumericValue {
  return "rawValue" in value && "displayValue" in value;
}

/**
 * Type guard for boolean value.
 * @beta
 */
export function isBoolean(value: Value): value is BooleanValue {
  return "value" in value && typeof value.value === "boolean";
}

/**
 * Type guard for date value.
 * @beta
 */
export function isDate(value: Value): value is DateValue {
  return "value" in value && value.value instanceof Date;
}

/**
 * Type guard for enum value.
 * @beta
 */
export function isEnum(value: Value): value is EnumValue {
  return "choice" in value;
}

/**
 * Type guard for instance key value.
 * @beta
 */
export function isInstanceKey(value: Value): value is InstanceKeyValue {
  return "key" in value && "id" in value.key && "className" in value.key;
}

/**
 * Checks if two values are equal.
 * @beta
 */
export function areEqual(
  lhs: Value | undefined,
  rhs: Value | undefined
): boolean {
  if (lhs === undefined && rhs === undefined) {
    return true;
  }
  if (lhs === undefined) {
    return false;
  }
  if (rhs === undefined) {
    return false;
  }

  if (isNumeric(lhs) && isNumeric(rhs)) {
    return lhs.rawValue === rhs.rawValue;
  }
  if (isText(lhs) && isText(rhs)) {
    return lhs.value === rhs.value;
  }
  if (isBoolean(lhs) && isBoolean(rhs)) {
    return lhs.value === rhs.value;
  }
  if (isDate(lhs) && isDate(rhs)) {
    return lhs.value === rhs.value;
  }
  if (isInstanceKey(lhs) && isInstanceKey(rhs)) {
    return lhs.key.id === rhs.key.id && lhs.key.className === rhs.key.className;
  }
  if (isEnum(lhs) && isEnum(rhs)) {
    return lhs.choice === rhs.choice;
  }
  return false;
}
