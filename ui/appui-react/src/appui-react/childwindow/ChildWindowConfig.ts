/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * An extension of a Window to be used for Popout Widgets.
 * @internal
 */
export interface ChildWindow extends Window {
  /** Width that child window wants to open to */
  expectedWidth?: number;
  /** Height that child window wants to open to */
  expectedHeight?: number;
  /** Difference between width child window actually opened to as compared to expected */
  deltaWidth?: number;
  /** Difference between height child window actually opened to as compared to expected */
  deltaHeight?: number;
  /** If outer size should be used for calculations instead of inner size */
  shouldUseOuterSized?: boolean;
}
