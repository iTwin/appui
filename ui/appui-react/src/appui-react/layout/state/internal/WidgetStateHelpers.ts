/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import { castDraft, produce } from "immer";
import { UiError } from "@itwin/appui-abstract";
import { assert } from "@itwin/core-bentley";
import { Point, Rectangle } from "@itwin/core-react";
import type { NineZoneState } from "../NineZoneState.js";
import type {
  FloatingWidgetState,
  PopoutWidgetState,
  WidgetState,
} from "../WidgetState.js";
import { getTabLocation } from "../TabLocation.js";
import type { PanelWidgetLocation } from "../WidgetLocation.js";
import {
  getWidgetLocation,
  isFloatingWidgetLocation,
  isPanelWidgetLocation,
  isPopoutWidgetLocation,
} from "../WidgetLocation.js";
import {
  category,
  initSizeProps,
  setRectangleProps,
  toRectangleProps,
} from "./NineZoneStateHelpers.js";
import { updatePanelState } from "./PanelStateHelpers.js";
import { updateTabState } from "./TabStateHelpers.js";
import type { RectangleProps } from "../../../utils/RectangleProps.js";

/** @internal */
export function createWidgetState(
  id: WidgetState["id"],
  tabs: WidgetState["tabs"],
  args?: Partial<WidgetState>
): WidgetState {
  if (tabs.length === 0)
    // eslint-disable-next-line deprecation/deprecation
    throw new UiError(category, "Widget must contain tabs");
  return {
    activeTabId: tabs[0],
    minimized: false,
    ...args,
    id,
    tabs,
  };
}

/** @internal */
export function updateWidgetState(
  state: NineZoneState,
  id: WidgetState["id"],
  args: Partial<WidgetState>
) {
  return produce(state, (draft) => {
    const widget = getWidgetState(draft, id);
    draft.widgets[id] = {
      ...widget,
      ...castDraft(args),
    };
  });
}

/** @internal */
export function addWidgetState(
  state: NineZoneState,
  id: WidgetState["id"],
  tabs: WidgetState["tabs"],
  args?: Partial<WidgetState>
) {
  // eslint-disable-next-line deprecation/deprecation
  if (id in state.widgets) throw new UiError(category, "Widget already exists");

  const widget = createWidgetState(id, tabs, args);
  for (const tabId of widget.tabs) {
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
  }
  return produce(state, (draft) => {
    draft.widgets[id] = castDraft(widget);
  });
}

/** @internal */
export function removeWidget(
  state: NineZoneState,
  id: WidgetState["id"]
): NineZoneState {
  const location = getWidgetLocation(state, id);
  // eslint-disable-next-line deprecation/deprecation
  if (!location) throw new UiError(category, "Widget not found");

  if (isFloatingWidgetLocation(location))
    return removeFloatingWidget(state, id);
  if (isPopoutWidgetLocation(location)) return removePopoutWidget(state, id);
  return removePanelWidget(state, id, location);
}

/** @internal */
export function removeWidgetState(
  state: NineZoneState,
  id: WidgetState["id"]
): NineZoneState {
  assertWidgetState(state, id);
  return produce(state, (draft) => {
    delete draft.widgets[id];
  });
}

/** @internal */
export function createFloatingWidgetState(
  id: FloatingWidgetState["id"],
  args?: Partial<FloatingWidgetState>
): FloatingWidgetState {
  const bounds = toRectangleProps(args?.bounds);
  return {
    home: {
      side: "left",
      widgetId: "",
      widgetIndex: 0,
    },
    ...args,
    bounds,
    id,
  };
}

/** @internal */
export function createPopoutWidgetState(
  id: PopoutWidgetState["id"],
  args?: Partial<PopoutWidgetState>
): PopoutWidgetState {
  const bounds = toRectangleProps(args?.bounds);
  const home: PopoutWidgetState["home"] = args?.home
    ? args.home
    : {
        side: "left",
        widgetId: "",
        widgetIndex: 0,
      };
  return {
    ...args,
    home,
    bounds,
    id,
  };
}

/** @internal */
export function updateFloatingWidgetState(
  state: NineZoneState,
  id: FloatingWidgetState["id"],
  args: Partial<FloatingWidgetState>
) {
  if (!(id in state.floatingWidgets.byId))
    // eslint-disable-next-line deprecation/deprecation
    throw new UiError(category, "Floating widget does not exist");

  return produce(state, (draft) => {
    const floatingWidget = draft.floatingWidgets.byId[id];
    const { bounds, ...other } = args;
    draft.floatingWidgets.byId[id] = {
      ...floatingWidget,
      ...other,
    };
    if (bounds) setRectangleProps(floatingWidget.bounds, bounds);
  });
}

/** Removes floating widget from the UI and deletes the widget state.
 * @internal
 */
export function removeFloatingWidget(
  state: NineZoneState,
  id: FloatingWidgetState["id"]
): NineZoneState {
  if (!(id in state.floatingWidgets.byId))
    // eslint-disable-next-line deprecation/deprecation
    throw new UiError(category, "Floating widget does not exist");

  state = produce(state, (draft) => {
    delete draft.floatingWidgets.byId[id];
    const idIndex = draft.floatingWidgets.allIds.indexOf(id);
    draft.floatingWidgets.allIds.splice(idIndex, 1);
  });
  return removeWidgetState(state, id);
}

/** Removes popout widget from the UI and deletes the widget state.
 * @internal
 */
export function removePopoutWidget(
  state: NineZoneState,
  id: PopoutWidgetState["id"]
) {
  if (!(id in state.popoutWidgets.byId))
    // eslint-disable-next-line deprecation/deprecation
    throw new UiError(category, "Popout widget does not exist");

  state = produce(state, (draft) => {
    delete draft.popoutWidgets.byId[id];
    const index = state.popoutWidgets.allIds.indexOf(id);
    draft.popoutWidgets.allIds.splice(index, 1);
  });
  return removeWidgetState(state, id);
}

/** @internal */
export function removePanelWidget(
  state: NineZoneState,
  id: WidgetState["id"],
  location?: PanelWidgetLocation
): NineZoneState {
  location = location || findPanelWidget(state, id);
  // eslint-disable-next-line deprecation/deprecation
  if (!location) throw new UiError(category, "Panel widget not found");

  state = updatePanelState(state, location.side, (draft) => {
    assert(!!location);
    draft.widgets.splice(location.index, 1);
  });

  const widgets = state.panels[location.side].widgets;
  const expandedWidget = widgets.find((widgetId) => {
    const widget = getWidgetState(state, widgetId);
    return !widget.minimized;
  });
  if (!expandedWidget && widgets.length > 0) {
    const firstWidgetId = widgets[0];
    state = updateWidgetState(state, firstWidgetId, {
      minimized: false,
    });
  }

  return removeWidgetState(state, id);
}

function findPanelWidget(state: NineZoneState, id: WidgetState["id"]) {
  const location = getWidgetLocation(state, id);
  if (location && isPanelWidgetLocation(location)) return location;
  return undefined;
}

/** @internal */
export function assertWidgetState(state: NineZoneState, id: WidgetState["id"]) {
  if (!(id in state.widgets))
    // eslint-disable-next-line deprecation/deprecation
    throw new UiError(category, "Widget does not exist", undefined, () => ({
      id,
    }));
}

/** @internal */
export function getWidgetState<T extends NineZoneState>(
  state: T,
  id: WidgetState["id"]
): T["widgets"][0] {
  assertWidgetState(state, id);
  return state.widgets[id] as T["widgets"][0];
}

/** @internal */
export function setWidgetActiveTabId(
  state: NineZoneState,
  widgetId: WidgetState["id"],
  tabId: WidgetState["activeTabId"]
): NineZoneState {
  const widget = getWidgetState(state, widgetId);
  if (!widget.tabs.includes(tabId))
    // eslint-disable-next-line deprecation/deprecation
    throw new UiError(category, "Tab is not in a widget");

  state = updateWidgetState(state, widgetId, {
    activeTabId: tabId,
  });

  const floatingWidget = state.floatingWidgets.byId[widgetId];
  if (floatingWidget) {
    const activeTab = state.tabs[tabId];
    const preferredFloatingWidgetSize = Rectangle.create(
      floatingWidget.bounds
    ).getSize();
    state = updateTabState(state, activeTab.id, (draft) => {
      initSizeProps(
        draft,
        "preferredFloatingWidgetSize",
        preferredFloatingWidgetSize
      );
    });
  }
  return state;
}

/** @internal */
export function getNewFloatingWidgetBounds(
  state: NineZoneState
): RectangleProps {
  // Matches min size (to handle auto-sized floating widgets correctly).
  const size = { height: 120, width: 200 };
  const initialPosition = new Point(360, 340);

  const nzBounds = Rectangle.createFromSize(state.size);
  const widgetsBounds = nzBounds.inset(20, 20, 20, 20);
  const offset = new Point(40, 40);

  let bounds = Rectangle.createFromSize(size);
  if (state.floatingWidgets.allIds.length === 0) {
    // Initial floating widget position.
    bounds = bounds.offset(initialPosition);
  } else {
    // Position is relative to last floating widget if available.
    const widgetId =
      state.floatingWidgets.allIds[state.floatingWidgets.allIds.length - 1];
    const widget = state.floatingWidgets.byId[widgetId];
    const widgetBounds = Rectangle.create(widget.bounds);

    // Bounds relative to top left of a last floating widget.
    const topLeft = widgetBounds.topLeft().offset(offset);
    bounds = bounds.offset(topLeft);

    // Bottom right of new bounds should also be outside of a floating widget.
    const widgetBottomRight = new Point(
      widgetBounds.right,
      widgetBounds.bottom
    );
    const minBottomRight = widgetBottomRight.offset(offset);
    const x = Math.max(0, minBottomRight.x - bounds.right);
    const y = Math.max(0, minBottomRight.y - bounds.bottom);
    bounds = bounds.offset({ x, y });
  }

  // TODO: might still end up with a bunch of overlapping widgets.
  if (bounds.bottom >= widgetsBounds.bottom) {
    bounds = bounds.setPosition({ x: bounds.left, y: widgetsBounds.top });
  }
  if (bounds.right >= widgetsBounds.right) {
    bounds = bounds.setPosition({
      x: widgetsBounds.left,
      y: widgetsBounds.top,
    });
  }
  bounds = bounds.containIn(widgetsBounds);
  return bounds.toProps();
}

/** @internal */
export function addFloatingWidget(
  state: NineZoneState,
  id: FloatingWidgetState["id"],
  tabs: WidgetState["tabs"],
  floatingWidgetArgs?: Partial<FloatingWidgetState>,
  widgetArgs?: Partial<WidgetState>
): NineZoneState {
  if (id in state.floatingWidgets.byId)
    // eslint-disable-next-line deprecation/deprecation
    throw new UiError(category, "Floating widget already exists");

  state = addWidgetState(state, id, tabs, widgetArgs);

  let bounds = floatingWidgetArgs?.bounds;
  if (!bounds) {
    bounds = getNewFloatingWidgetBounds(state);
  }

  const tabId = tabs[0];
  const tab = state.tabs[tabId];
  const resizable = tab.isFloatingWidgetResizable;

  const floatingWidget = createFloatingWidgetState(id, {
    bounds,
    resizable,
    ...floatingWidgetArgs,
  });
  return produce(state, (stateDraft) => {
    stateDraft.floatingWidgets.byId[id] = floatingWidget;
    stateDraft.floatingWidgets.allIds.push(id);
  });
}

/** @internal */
export function addPopoutWidget(
  state: NineZoneState,
  id: PopoutWidgetState["id"],
  tabs: WidgetState["tabs"],
  popoutWidgetArgs?: Partial<PopoutWidgetState>,
  widgetArgs?: Partial<WidgetState>
): NineZoneState {
  if (tabs.length !== 1)
    // eslint-disable-next-line deprecation/deprecation
    throw new UiError(
      category,
      "Popout widget should contain one tab only",
      undefined,
      () => ({ tabs })
    );

  const popoutWidget = createPopoutWidgetState(id, popoutWidgetArgs);
  state = addWidgetState(state, id, tabs, widgetArgs);
  return produce(state, (stateDraft) => {
    stateDraft.popoutWidgets.byId[id] = popoutWidget;
    stateDraft.popoutWidgets.allIds.push(id);
  });
}

/** @internal */
export function floatingWidgetBringToFront(
  state: NineZoneState,
  floatingWidgetId: FloatingWidgetState["id"]
): NineZoneState {
  return produce(state, (draft) => {
    const idIndex = draft.floatingWidgets.allIds.indexOf(floatingWidgetId);
    const spliced = draft.floatingWidgets.allIds.splice(idIndex, 1);
    draft.floatingWidgets.allIds.push(spliced[0]);
  });
}
