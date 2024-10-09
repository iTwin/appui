/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import type { Draft } from "immer";
import { castDraft, produce } from "immer";
import { UiError } from "@itwin/appui-abstract";
import type { NineZoneState } from "../NineZoneState.js";
import type { DraggedTabState, TabState } from "../TabState.js";
import { category } from "./NineZoneStateHelpers.js";
import type { SavedTabState, TabHomeState } from "../SavedTabState.js";
import { getTabLocation } from "../TabLocation.js";
import {
  addFloatingWidget,
  assertWidgetState,
  getWidgetState,
  removeWidget,
  setWidgetActiveTabId,
  updateWidgetState,
} from "./WidgetStateHelpers.js";
import type { WidgetState } from "../WidgetState.js";
import { isFloatingWidgetRestoreState } from "../WidgetRestoreState.js";
import { Rectangle } from "@itwin/core-react/internal";
import { getUniqueId } from "../../base/NineZone.js";
import { insertPanelWidget } from "./PanelStateHelpers.js";

/** @internal */
export function createTabState(
  id: TabState["id"],
  args?: Partial<TabState>
): TabState {
  return {
    label: "",
    ...args,
    id,
    unloaded: false,
  };
}

/** @internal */
export function updateTabState(
  state: NineZoneState,
  id: TabState["id"],
  update: (draft: Draft<TabState>) => void
) {
  // eslint-disable-next-line deprecation/deprecation
  if (!(id in state.tabs)) throw new UiError(category, "Tab does not exist");

  return produce(state, (draft) => {
    const tab = draft.tabs[id];
    update(tab);
  });
}

/** @internal */
export function updateSavedTabState(
  state: NineZoneState,
  id: TabState["id"],
  update: (draft: Draft<SavedTabState>) => void
) {
  return produce(state, (draft) => {
    const allIds = draft.savedTabs.allIds;
    const byId = draft.savedTabs.byId;
    let tab = byId[id];
    if (!tab) {
      allIds.push(id);
      tab = byId[id] = { id };
    } else {
      const index = allIds.indexOf(id);
      allIds.splice(index, 1);
      allIds.push(id);
    }

    update(tab);
  });
}

/** Adds a new `tab`.
 * @internal
 */
export function addTab(
  state: NineZoneState,
  id: TabState["id"],
  tabArgs?: Partial<TabState>
): NineZoneState {
  // eslint-disable-next-line deprecation/deprecation
  if (id in state.tabs) throw new UiError(category, "Tab already exists");
  const tab = {
    ...createTabState(id),
    ...tabArgs,
  };
  return produce(state, (stateDraft) => {
    stateDraft.tabs[id] = castDraft(tab);
  });
}

/** Adds an existing `tab` to a specified `widget`.
 * @internal
 */
export function addTabToWidget(
  state: NineZoneState,
  tabId: TabState["id"],
  widgetId: WidgetState["id"]
): NineZoneState {
  return insertTabToWidget(state, tabId, widgetId, Infinity);
}

/** Inserts an existing `tab` to a specified `widget` at a specified `tabIndex`.
 * @internal
 */
export function insertTabToWidget(
  state: NineZoneState,
  tabId: TabState["id"],
  widgetId: WidgetState["id"],
  tabIndex: number
): NineZoneState {
  if (!(tabId in state.tabs))
    // eslint-disable-next-line deprecation/deprecation
    throw new UiError(category, "Tab does not exist", undefined, () => ({
      tabId,
    }));
  assertWidgetState(state, widgetId);
  const location = getTabLocation(state, tabId);
  if (location)
    // eslint-disable-next-line deprecation/deprecation
    throw new UiError(
      category,
      "Tab is already in a widget",
      undefined,
      () => ({ tabId, widgetId: location.widgetId })
    );

  return produce(state, (draft) => {
    const widget = getWidgetState(draft, widgetId);
    widget.tabs.splice(tabIndex, 0, tabId);
  });
}

/** Removes tab from the UI, but keeps the tab state.
 * @internal
 */
export function removeTabFromWidget(
  state: NineZoneState,
  tabId: TabState["id"]
): NineZoneState {
  const location = getTabLocation(state, tabId);
  if (!location) return state;

  const widgetId = location.widgetId;
  const widget = getWidgetState(state, widgetId);
  const tabs = [...widget.tabs];
  const tabIndex = tabs.indexOf(tabId);
  tabs.splice(tabIndex, 1);

  if (tabs.length === 0) {
    return removeWidget(state, widgetId);
  }

  if (tabId === widget.activeTabId) {
    state = setWidgetActiveTabId(state, widget.id, tabs[0]);
  }

  return updateWidgetState(state, widgetId, {
    tabs,
  });
}

/** Removes tab from the UI and deletes the tab state.
 * @internal
 */
export function removeTab(
  state: NineZoneState,
  tabId: TabState["id"]
): NineZoneState {
  // eslint-disable-next-line deprecation/deprecation
  if (!(tabId in state.tabs)) throw new UiError(category, "Tab does not exist");

  state = removeTabFromWidget(state, tabId);
  return produce(state, (draft) => {
    delete draft.tabs[tabId];

    if (draft.toolSettings?.tabId === tabId) {
      draft.toolSettings = undefined;
    }
  });
}

const defaultHomeState: TabHomeState = {
  side: "left",
  widgetId: "",
  widgetIndex: 0,
  tabIndex: 0,
};

/** Adds removed tab to the UI.
 * @internal
 */
export function addRemovedTab(
  state: NineZoneState,
  tabId: TabState["id"]
): NineZoneState {
  if (!(tabId in state.tabs))
    // eslint-disable-next-line deprecation/deprecation
    throw new UiError(category, "Tab does not exist", undefined, () => ({
      tabId,
    }));

  const savedTab = state.savedTabs.byId[tabId];
  const home = savedTab?.home || defaultHomeState;
  const { tabIndex, widgetId } = home;

  // Add to an existing widget (by widget id).
  if (widgetId in state.widgets) {
    return insertTabToWidget(state, tabId, widgetId, tabIndex);
  }

  // Add to a floating widget.
  if (isFloatingWidgetRestoreState(home)) {
    // Add to a new floating widget.
    const nzBounds = Rectangle.createFromSize(state.size);
    const bounds = Rectangle.create(home.floatingWidget.bounds).containIn(
      nzBounds
    );
    return addFloatingWidget(state, widgetId, [tabId], {
      ...home.floatingWidget,
      bounds: bounds.toProps(),
    });
  }

  // Add to a panel section.
  const panel = state.panels[home.side];

  // Add to existing panel section.
  if (panel.widgets.length >= panel.maxWidgetCount) {
    const sectionIndex = Math.min(panel.maxWidgetCount - 1, home.widgetIndex);
    const sectionId = panel.widgets[sectionIndex];
    return insertTabToWidget(state, tabId, sectionId, home.tabIndex);
  }

  // Create a new panel section.
  const newSectionId = getUniqueId();
  return insertPanelWidget(
    state,
    panel.side,
    newSectionId,
    [tabId],
    home.widgetIndex
  );
}
