/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/**
 * Value types supported by editor system.
 * @beta
 */
export type ValueType =
  | "string"
  | "number"
  | "bool"
  | "date"
  | "enum"
  | "instanceKey";

/**
 * Additional metadata that is used along side value to determine applicable editor.
 * @beta
 */
export interface ValueMetadata {
  type: ValueType;
  preferredEditor?: string;
}

/**
 * Type definition for available enum choice that can be supplied for editing enum values.
 */
export interface EnumChoice {
  value: number | string;
  label: string;
}

/**
 * Additional metadata that is used along side enum value to determine applicable editor.
 */
export interface EnumValueMetadata extends ValueMetadata {
  type: "enum";
  choices: EnumChoice[];
}
