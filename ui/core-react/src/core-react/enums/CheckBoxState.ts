/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Common
 */

/** State of a checkbox
 * @public
 */
export enum CheckBoxState {
  Off,
  On,
  Partial,
}

/** A data type that holds all the checkbox display attributes
 * @public
 * @deprecated in 4.15.0. Not used by AppUI.
 */
export interface CheckBoxInfo {
  isVisible?: boolean;
  isDisabled?: boolean;
  state?: CheckBoxState;
  tooltip?: string;
}
