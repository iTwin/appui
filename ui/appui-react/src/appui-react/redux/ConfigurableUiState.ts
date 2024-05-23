/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import type { ActionsUnion } from "./redux-ts";
import { createAction } from "./redux-ts";
import {
  SYSTEM_PREFERRED_COLOR_THEME,
  type ThemeId,
  TOOLBAR_OPACITY_DEFAULT,
  WIDGET_OPACITY_DEFAULT,
} from "../theme/ThemeId";
import { SnapMode } from "@itwin/core-frontend";
import { useFrameworkState } from "../uistate/useFrameworkState";

/** Action Ids used by Redux and to send sync UI components. Typically used to refresh visibility or enable state of control.
 *  Since these are also used as sync ids they should be in lowercase.
 * @note This is used by sync UI event APIs.
 * @public
 */
export enum ConfigurableUiActionId {
  SetSnapMode = "configurableui:set_snapmode",
  SetTheme = "configurableui:set_theme",
  SetToolPrompt = "configurableui:set_toolprompt",
  SetWidgetOpacity = "configurableui:set_widget_opacity",
  SetDragInteraction = "configurableui:set-drag-interaction",
  SetShowWidgetIcon = "configurableui:set-show-widget-icon",
  AutoCollapseUnpinnedPanels = "configurableui:set-auto-collapse-unpinned-panels",
  SetViewOverlayDisplay = "configurableui:set-view-overlay-display",
  AnimateToolSettings = "configurableui:set-animate-tool-settings",
  UseToolAsToolSettingsLabel = "configurableui:set-use-tool-as-tool-settings-label",
  SetToolbarOpacity = "configurableui:set-toolbar-opacity",
}

/* eslint-disable deprecation/deprecation */

/** The portion of state managed by the ConfigurableUiReducer.
 * @public
 * @deprecated in 4.14.x. Use {@link useFrameworkState} instead.
 */
export interface ConfigurableUiState {
  /** @deprecated in 4.14.x. Use `snapMode` prop of {@link SnapModeField} instead. */
  snapMode: number;
  /** @deprecated in 4.14.x. Not used by AppUI components. */
  toolPrompt: string;
  /** @deprecated in 4.14.x. Use `theme` prop of {@link ThemeManager} instead. */
  theme: string;
  /** @deprecated in 4.14.x. Use {@link ConfigurableUiContentProps.widgetOpacity} prop of {@link ConfigurableUiContent} instead. */
  widgetOpacity: number;
  /** @deprecated in 4.14.x. Use `useDragInteraction` prop of {@link Toolbar}. */
  useDragInteraction: boolean;
  showWidgetIcon: boolean;
  autoCollapseUnpinnedPanels: boolean;
  /** @deprecated in 4.14.x. Use {@link ConfigurableUiContentProps.viewOverlay} prop of {@link ConfigurableUiContent} instead. */
  viewOverlayDisplay: boolean;
  animateToolSettings: boolean;
  useToolAsToolSettingsLabel: boolean;
  toolbarOpacity: number;
}

/** Used on first call of ConfigurableUiReducer.
 * @internal
 */
export const initialConfigurableUiState: ConfigurableUiState = {
  snapMode: SnapMode.NearestKeypoint as number,
  toolPrompt: "",
  theme: SYSTEM_PREFERRED_COLOR_THEME,
  widgetOpacity: WIDGET_OPACITY_DEFAULT,
  useDragInteraction: false,
  showWidgetIcon: true,
  autoCollapseUnpinnedPanels: false,
  viewOverlayDisplay: true,
  animateToolSettings: false,
  useToolAsToolSettingsLabel: false,
  toolbarOpacity: TOOLBAR_OPACITY_DEFAULT,
};

/** An object with a function that creates each ConfigurableUiReducer that can be handled by our reducer.
 * @public
 * @deprecated in 4.14.x. Use {@link useFrameworkState} instead.
 */
export const ConfigurableUiActions = {
  setSnapMode: (snapMode: number) =>
    createAction(ConfigurableUiActionId.SetSnapMode, snapMode),
  setTheme:
    /**
     * Use `UiFramework.setColorTheme` instead which is conveniently typed with available theme union.
     * @param theme ThemeId
     */
    (theme: string) => createAction(ConfigurableUiActionId.SetTheme, theme),
  setToolPrompt:
    // istanbul ignore next
    (toolPrompt: string) =>
      createAction(ConfigurableUiActionId.SetToolPrompt, toolPrompt),
  setWidgetOpacity:
    // istanbul ignore next
    (opacity: number) =>
      createAction(ConfigurableUiActionId.SetWidgetOpacity, opacity),
  setDragInteraction: (dragInteraction: boolean) =>
    createAction(ConfigurableUiActionId.SetDragInteraction, dragInteraction),
  setShowWidgetIcon: (showWidgetIcon: boolean) =>
    createAction(ConfigurableUiActionId.SetShowWidgetIcon, showWidgetIcon),
  setAutoCollapseUnpinnedPanels: (autoCollapse: boolean) =>
    createAction(
      ConfigurableUiActionId.AutoCollapseUnpinnedPanels,
      autoCollapse
    ),
  setViewOverlayDisplay: (displayViewOverlay: boolean) =>
    createAction(
      ConfigurableUiActionId.SetViewOverlayDisplay,
      displayViewOverlay
    ),
  setAnimateToolSettings: (animateToolSettings: boolean) =>
    createAction(
      ConfigurableUiActionId.AnimateToolSettings,
      animateToolSettings
    ),
  setUseToolAsToolSettingsLabel: (useToolAsToolSettingsLabel: boolean) =>
    createAction(
      ConfigurableUiActionId.UseToolAsToolSettingsLabel,
      useToolAsToolSettingsLabel
    ),
  setToolbarOpacity: (opacity: number) =>
    createAction(ConfigurableUiActionId.SetToolbarOpacity, opacity),
};

/** Union of ConfigurableUi Redux actions
 * @public
 * @deprecated in 4.14.x. Use {@link useFrameworkState} instead.
 */
export type ConfigurableUiActionsUnion = ActionsUnion<
  typeof ConfigurableUiActions
>;

/** Handles actions to update ConfigurableUiState.
 * @public
 * @deprecated in 4.14.x. Use {@link useFrameworkState} instead.
 */
export function ConfigurableUiReducer(
  state: ConfigurableUiState = initialConfigurableUiState,
  action: ConfigurableUiActionsUnion
): ConfigurableUiState {
  const outState = state;

  switch (action.type) {
    case ConfigurableUiActionId.SetSnapMode: {
      return { ...state, snapMode: action.payload };
    }
    case ConfigurableUiActionId.SetToolPrompt: {
      return { ...state, toolPrompt: action.payload };
    }
    case ConfigurableUiActionId.SetTheme: {
      return { ...state, theme: action.payload as ThemeId }; // Need to cast because of the (string & {}) trick.
    }
    case ConfigurableUiActionId.SetWidgetOpacity: {
      return { ...state, widgetOpacity: action.payload };
    }
    case ConfigurableUiActionId.SetDragInteraction: {
      return { ...state, useDragInteraction: action.payload };
    }
    case ConfigurableUiActionId.SetShowWidgetIcon: {
      return { ...state, showWidgetIcon: action.payload };
    }
    case ConfigurableUiActionId.AutoCollapseUnpinnedPanels: {
      return { ...state, autoCollapseUnpinnedPanels: action.payload };
    }
    case ConfigurableUiActionId.SetViewOverlayDisplay: {
      return { ...state, viewOverlayDisplay: action.payload };
    }
    case ConfigurableUiActionId.AnimateToolSettings: {
      return { ...state, animateToolSettings: action.payload };
    }
    case ConfigurableUiActionId.UseToolAsToolSettingsLabel: {
      return { ...state, useToolAsToolSettingsLabel: action.payload };
    }
    case ConfigurableUiActionId.SetToolbarOpacity: {
      return { ...state, toolbarOpacity: action.payload };
    }
  }
  return outState;
}
