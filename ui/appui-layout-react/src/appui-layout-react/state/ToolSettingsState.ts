/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import produce from "immer";
import { UiError } from "@itwin/appui-abstract";
import { category } from "./internal/NineZoneStateHelpers";
import type { NineZoneState } from "./NineZoneState";
import type { TabState } from "./TabState";
import { removeTabFromWidget } from "./TabState";
import { getTabLocation } from "./TabLocation";

/** @internal */
export interface CommonToolSettingsState {
  readonly tabId: TabState["id"];
}

/** @internal */
export interface DockedToolSettingsState extends CommonToolSettingsState {
  readonly type: "docked";
}

/** @internal */
export interface WidgetToolSettingsState extends CommonToolSettingsState {
  readonly type: "widget";
}

/** @internal */
export type ToolSettingsState =
  | DockedToolSettingsState
  | WidgetToolSettingsState;

/** @internal */
export function isDockedToolSettingsState(
  state: ToolSettingsState
): state is DockedToolSettingsState {
  return state.type === "docked";
}

/** Adds a docked tool settings.
 * @internal
 */
export function addDockedToolSettings(
  state: NineZoneState,
  tabId: TabState["id"]
): NineZoneState {
  if (state.toolSettings)
    throw new UiError(category, "Tool settings already exist");
  if (!(tabId in state.tabs))
    throw new UiError(category, "Tab does not exist", undefined, () => ({
      tabId,
    }));
  const location = getTabLocation(state, tabId);
  if (location)
    throw new UiError(
      category,
      "Tab is already in a widget",
      undefined,
      () => ({ tabId, widgetId: location.widgetId })
    );

  return produce(state, (stateDraft) => {
    stateDraft.toolSettings = {
      tabId,
      type: "docked",
    };
  });
}

/** Adds a widget to the tool settings.
 * @internal
 */
export function addWidgetToolSettings(
  state: NineZoneState,
  tabId: TabState["id"]
): NineZoneState {
  if (state.toolSettings)
    throw new UiError(category, "Tool settings already exist");
  if (!(tabId in state.tabs))
    throw new UiError(category, "Tab does not exist", undefined, () => ({
      tabId,
    }));
  const location = getTabLocation(state, tabId);
  if (!location)
    throw new UiError(category, "Tab is not in a widget", undefined, () => ({
      tabId,
    }));

  return produce(state, (stateDraft) => {
    stateDraft.toolSettings = {
      tabId,
      type: "widget",
    };
  });
}

/** Removes tab from the tool settings, but keeps the tab state.
 * @internal
 */
export function removeTabFromToolSettings(
  state: NineZoneState,
  tabId: TabState["id"]
): NineZoneState {
  if (!state.toolSettings) return state;

  const toolSettingsTabId = state.toolSettings.tabId;
  if (toolSettingsTabId !== tabId) return state;

  if (state.toolSettings.type === "widget") {
    state = removeTabFromWidget(state, tabId);
  }

  return produce(state, (draft) => {
    draft.toolSettings = undefined;
  });
}
