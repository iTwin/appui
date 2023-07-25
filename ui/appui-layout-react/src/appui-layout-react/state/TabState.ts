/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import produce from "immer";
import type { PointProps } from "@itwin/appui-abstract";
import { UiError } from "@itwin/appui-abstract";
import { type IconSpec, Rectangle, type SizeProps } from "@itwin/core-react";
import type { PanelSide } from "../widget-panels/Panel";
import type { NineZoneState } from "./NineZoneState";
import {
  addFloatingWidget,
  type FloatingWidgetHomeState,
  type WidgetState,
} from "./WidgetState";
import { getTabLocation } from "./TabLocation";
import { category } from "./internal/NineZoneStateHelpers";
import { createTabState } from "./internal/TabStateHelpers";
import {
  assertWidgetState,
  getWidgetState,
  removeWidget,
  setWidgetActiveTabId,
  updateWidgetState,
} from "./internal/WidgetStateHelpers";
import {
  isFloatingWidgetTabHomeState,
  type TabHomeState,
} from "./TabHomeState";
import { insertPanelWidget } from "./PanelState";
import { getUniqueId } from "../base/NineZone";

/** `WidgetDef` is equivalent structure in `appui-react`.
 * @internal
 */
export interface TabState {
  readonly id: string;
  readonly label: string;
  readonly iconSpec?: IconSpec;
  readonly preferredFloatingWidgetSize?: SizeProps;
  readonly preferredPanelWidgetSize?: "fit-content";
  readonly allowedPanelTargets?: PanelSide[];
  readonly canPopout?: boolean;
  readonly userSized?: boolean;
  readonly isFloatingStateWindowResizable?: boolean;
  readonly hideWithUiWhenFloating?: boolean;
  readonly home?: TabHomeState;
}

/** @internal */
export interface TabsState {
  readonly [id: string]: TabState;
}

/** @internal */
export interface DraggedTabState {
  readonly tabId: TabState["id"];
  readonly position: PointProps;
  readonly home: FloatingWidgetHomeState;
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
    stateDraft.tabs[id] = tab;
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

/** Removes tab from the UI, but keeps the tab state (hide).
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

/** Adds removed tab to the UI (show).
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

  const tab = state.tabs[tabId];
  const home = tab.home || defaultHomeState;
  const { widgetId, tabIndex } = home;

  // Add to an existing widget (by widget id).
  if (widgetId in state.widgets) {
    return insertTabToWidget(state, tabId, widgetId, tabIndex);
  }

  // Add to a floating widget.
  if (isFloatingWidgetTabHomeState(home)) {
    // Add to a new floating widget.
    const nzBounds = Rectangle.createFromSize(state.size);
    const bounds = Rectangle.create(home.floatingWidget.bounds).containIn(
      nzBounds
    );
    return addFloatingWidget(state, home.widgetId, [tabId], {
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
