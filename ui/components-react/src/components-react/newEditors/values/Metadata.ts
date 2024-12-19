/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { EnumChoice } from "./Values.js";

/**
 *
 */
export type ValueType =
  | "string"
  | "number"
  | "bool"
  | "date"
  | "enum"
  | "instanceKey";

/**
 *
 */
export interface ValueMetadata {
  type: ValueType;
  preferredEditor?: string;
}

/**
 *
 */
export interface EnumValueMetadata extends ValueMetadata {
  type: "enum";
  choices: EnumChoice[];
}
