/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Inputs
 */

import type { InputLabel } from "./InputLabel";

/** Enum for Input status
 * @public
 * @deprecated in 4.12.x. Enum used in a deprecated component {@link InputLabel}.
 */
export enum InputStatus {
  Success = "success",
  Warning = "warning",
  Error = "error",
}
