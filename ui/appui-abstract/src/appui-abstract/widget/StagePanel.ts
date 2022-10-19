/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

/** Available Stage Panel locations.
 * @public
 */
export enum StagePanelLocation {
  Top = 101,
  TopMost,
  Left,
  Right,
  Bottom,
  BottomMost,
}

/** Enum for Stage Panel Sections
 * @public
 */
export enum StagePanelSection {
  Start,
  /** @deprecated - all widgets that a targeted for Middle will be placed in `End` section */
  Middle,
  End,
}
