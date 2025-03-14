/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

/**
 * Value types supported by editor system.
 * @beta
 */
export type ValueType =
  | "string"
  | "number"
  | "bool"
  | "date"
  | "dateTime"
  | "enum"
  | "instanceKey";

/**
 * Additional metadata that is used along side value.
 * @beta
 */
export interface ValueMetadata {
  type: ValueType;
  preferredEditor?: string;
  isNullable?: boolean;
}

/**
 * Type definition for available enum choice that can be supplied for editing enum values.
 * @beta
 */
export interface EnumChoice {
  value: number | string;
  label: string;
}

/**
 * Additional metadata that is used along side enum value to determine applicable editor.
 * @beta
 */
export interface EnumValueMetadata extends ValueMetadata {
  type: "enum";
  choices: EnumChoice[];
  isStrict: boolean;
}
