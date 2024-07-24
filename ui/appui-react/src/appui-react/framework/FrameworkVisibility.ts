/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */
/**
 * [[UiFramework.visibility]] interface
 * @public
 */
export interface FrameworkVisibility {
  /** Determines if the Ui is visible */
  isUiVisible: boolean;

  /** When true, the UI automatically hides after a specified period of inactivity, defined by {@link FrameworkVisibility.inactivityTime}. Defaults to `false`. */
  autoHideUi: boolean;

  /** Determines whether the widget panels are shown and hidden. Defaults to false. */
  showHidePanels: boolean;

  /** Determines whether the status bar is shown and hidden. Defaults to false. */
  showHideFooter: boolean;

  /** Determines the amount of inactivity time in `ms` before the UI is hidden if {@link FrameworkVisibility.autoHideUi} is enabled. Defaults to `3.5` seconds. */
  inactivityTime: number;

  /** Determines whether the proximity of the mouse should alter the opacity of a toolbar. Defaults to `true`.
   * @deprecated in 4.11.0. The preferred mode is to change opacity in a snappy way (use {@link FrameworkVisibility.snapWidgetOpacity}).
   */
  useProximityOpacity: boolean;

  /** Determines whether the opacity of a toolbar should change immediately when the mouse gets close. Defaults to `false`. */
  snapWidgetOpacity: boolean;

  /** Handler for when a Frontstage is ready */
  handleFrontstageReady(): void;

  /** Handler for when the mouse moves over the content area */
  handleContentMouseMove(
    _event?: React.MouseEvent<HTMLElement, MouseEvent>
  ): void;

  /** Handler for when the mouse enters a widget */
  handleWidgetMouseEnter(
    _event?: React.MouseEvent<HTMLElement, MouseEvent>
  ): void;

  /** Shows the Ui and resets the inactivity timer */
  showUiAndResetTimer(): void;

  /** Shows the Ui and cancels the inactivity timer */
  showUiAndCancelTimer(): void;
}
