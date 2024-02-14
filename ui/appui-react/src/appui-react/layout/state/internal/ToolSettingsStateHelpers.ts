/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import produce from "immer";
import { UiError } from "@itwin/appui-abstract";
import type { NineZoneState } from "../NineZoneState";
import { category } from "./NineZoneStateHelpers";
import { getTabLocation } from "../TabLocation";
import type { TabState } from "../TabState";

/** Adds a docked tool settings.
 * @internal
 */
export function addDockedToolSettings(
  state: NineZoneState,
  tabId: TabState["id"],
  hidden = false
): NineZoneState {
  if (state.toolSettings)
    // eslint-disable-next-line deprecation/deprecation
    throw new UiError(category, "Tool settings already exist");
  if (!(tabId in state.tabs))
    // eslint-disable-next-line deprecation/deprecation
    throw new UiError(category, "Tab does not exist", undefined, () => ({
      tabId,
    }));
  const location = getTabLocation(state, tabId);
  if (location)
    // eslint-disable-next-line deprecation/deprecation
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
      hidden,
    };
  });
}

/** Adds a widget tool settings.
 * @internal
 */
export function addWidgetToolSettings(
  state: NineZoneState,
  tabId: TabState["id"]
): NineZoneState {
  if (state.toolSettings)
    // eslint-disable-next-line deprecation/deprecation
    throw new UiError(category, "Tool settings already exist");
  if (!(tabId in state.tabs))
    // eslint-disable-next-line deprecation/deprecation
    throw new UiError(category, "Tab does not exist", undefined, () => ({
      tabId,
    }));
  const location = getTabLocation(state, tabId);
  if (!location)
    // eslint-disable-next-line deprecation/deprecation
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
