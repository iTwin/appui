/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Common
 */
import { CheckBoxState as _CheckBoxState } from "@itwin/core-react";

/* eslint-disable deprecation/deprecation */

/** State of a checkbox.
 * @public
 */
export type CheckBoxState = _CheckBoxState;
/** State of a checkbox.
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CheckBoxState = _CheckBoxState;
