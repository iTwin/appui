/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import produce, { castDraft } from "immer";
import { UiError } from "@itwin/appui-abstract";
import { type IconSpec, Rectangle, type SizeProps } from "@itwin/core-react";
import type { PanelSide } from "../widget-panels/Panel";
import type { NineZoneState } from "./NineZoneState";
import { addFloatingWidget, type WidgetState } from "./WidgetState";
import { getTabLocation } from "./TabLocation";
import { category, type XAndY } from "./internal/NineZoneStateHelpers";
import { createTabState } from "./internal/TabStateHelpers";
import {
  assertWidgetState,
  getWidgetState,
  removeWidget,
  setWidgetActiveTabId,
  updateWidgetState,
} from "./internal/WidgetStateHelpers";
import { insertPanelWidget } from "./PanelState";
import { getUniqueId } from "../base/NineZone";
import {
  isFloatingWidgetRestoreState,
  type PanelWidgetRestoreState,
} from "./WidgetRestoreState";
import type { TabHomeState } from "./SavedTabState";

/** `WidgetDef` is equivalent structure in `appui-react`.
 * @internal
 */
export interface TabState {
  readonly id: string;
  readonly label: string;
  readonly iconSpec?: IconSpec;
  readonly preferredFloatingWidgetSize?: SizeProps;
  readonly preferredPanelWidgetSize?: "fit-content";
  readonly allowedPanelTargets?: ReadonlyArray<PanelSide>;
  readonly canPopout?: boolean;
  readonly userSized?: boolean;
  readonly isFloatingWidgetResizable?: boolean;
  readonly hideWithUiWhenFloating?: boolean;
  readonly unloaded?: boolean;
}

/** @internal */
export interface TabsState {
  readonly [id: string]: TabState;
}

/** @internal */
export interface DraggedTabState {
  readonly tabId: TabState["id"];
  readonly position: XAndY;
  readonly home: PanelWidgetRestoreState;
}

/** Adds a new `tab`.
 * @internal
 */
export function addTab(
  state: NineZoneState,
  id: TabState["id"],
  tabArgs?: Partial<TabState>
): NineZoneState {
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
    throw new UiError(category, "Tab does not exist", undefined, () => ({
      tabId,
    }));
  assertWidgetState(state, widgetId);
  const location = getTabLocation(state, tabId);
  if (location)
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
