/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

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
}

/**
 * Type definition for a value.
 * @beta
 */
export type Value =
  | NumericValue
  | InstanceKeyValue
  | TextValue
  | BooleanValue
  | DateValue
  | EnumValue
  | object;
