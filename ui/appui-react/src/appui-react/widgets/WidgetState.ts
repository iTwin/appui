/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

/**
 * Describes the visibility and mounting state of a widget.
 * @public
 */
export enum WidgetState {
  /**
   * Both the widget tab and its content are visible.
   */
  Open = 0,
  /**
   * The widget tab is visible, but the widget content is not visible.
   */
  Closed = 1,
  /**
   * Neither the widget tab nor its content are visible, but the widget's React node is still rendered.
   * Useful for pre-initialization and preserving widget state while the widget is not visible.
   */
  Hidden = 2,
  /**
   * Widget is in a floating state. Widget content visibility depends on internal logic, but the widget tab is visible.
   */
  Floating = 3,
  /**
   * Neither the widget tab nor its content are visible, and the widget's React node is not rendered.
   * Changing the widget state to `Unloaded` will unmount the content node if it was previously rendered.
   */
  Unloaded = 4,
}
