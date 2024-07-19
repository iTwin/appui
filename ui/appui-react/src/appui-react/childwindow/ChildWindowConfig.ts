/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * An extension of a Window to be used for Popout Widgets.
 * @internal
 */
export interface ChildWindow extends Window {
  /** Expected width of the child window. */
  expectedWidth?: number;
  /** Expected height of the child window. */
  expectedHeight?: number;
  /** Expected top value of the child window. */
  expectedTop?: number;
  /** Expected left value of the child window. */
  expectedLeft?: number;
  /** Difference between expected child window width and actual value when opened. */
  deltaWidth?: number;
  /** Difference between expected child window height and actual value when opened. */
  deltaHeight?: number;
  /** Difference between expected child window left value and actual value when opened. */
  deltaLeft?: number;
  /** Difference between expected child window top value and actual value when opened. */
  deltaTop?: number;
}
