/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { Id64String } from "@itwin/core-bentley";

/**
 * Type definition for numeric value that can be handled by editor.
 * @beta
 */
export interface NumericValue {
  rawValue: number | undefined;
  displayValue: string;
  roundingError?: number;
}

/**
 * Type definition for instance key value that can be handled by editor.
 * @beta
 */
export interface InstanceKeyValue {
  key: { id: Id64String; className: string };
  label: string;
}

/**
 * Type definition for text value that can be handled by editor.
 * @beta
 */
export interface TextValue {
  value: string;
}

/**
 * Type definition for boolean value that can be handled by editor.
 * @beta
 */
export interface BooleanValue {
  value: boolean;
}

/**
 * Type definition for date value that can be handled by editor.
 * @beta
 */
export interface DateValue {
  value: Date;
}

/**
 * Type definition for enum value that can be handled by editor.
 * @beta
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

// eslint-disable-next-line @typescript-eslint/no-redeclare
export namespace Value {
  /**
   * Type guard for text value.
   * @beta
   */
  export function isTextValue(value: Value): value is TextValue {
    return "value" in value && typeof value.value === "string";
  }

  /**
   * Type guard for numeric value.
   * @beta
   */
  export function isNumericValue(value: Value): value is NumericValue {
    return "rawValue" in value && "displayValue" in value;
  }

  /**
   * Type guard for boolean value.
   * @beta
   */
  export function isBooleanValue(value: Value): value is BooleanValue {
    return "value" in value && typeof value.value === "boolean";
  }

  /**
   * Type guard for date value.
   * @beta
   */
  export function isDateValue(value: Value): value is DateValue {
    return "value" in value && value.value instanceof Date;
  }

  /**
   * Type guard for enum value.
   * @beta
   */
  export function isEnumValue(value: Value): value is EnumValue {
    return "choice" in value && "label" in value;
  }

  /**
   * Type guard for instance key value.
   * @beta
   */
  export function isInstanceKeyValue(value: Value): value is InstanceKeyValue {
    return "key" in value && "id" in value.key && "className" in value.key;
  }
}
