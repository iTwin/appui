/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Common
 */

/** State of a checkbox
 * @public
 * @deprecated in 4.16.0. Use {@link @itwin/components-react#CheckBoxState} instead.
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
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  state?: CheckBoxState;
  tooltip?: string;
}
