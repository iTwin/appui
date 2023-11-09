/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import { produce } from "immer";
import { Point, Rectangle } from "@itwin/core-react";
import { assert } from "@itwin/core-bentley";
import type { TabState } from "./TabState";
import { addRemovedTab, removeTabFromWidget } from "./TabState";
import { getWidgetLocation, isPanelWidgetLocation } from "./WidgetLocation";
import type { NineZoneAction } from "./NineZoneAction";
import {
  isPanelDropTargetState,
  isSectionDropTargetState,
  isTabDropTargetState,
  isWidgetDropTargetState,
  isWindowDropTargetState,
} from "./DropTargetState";
import { getWidgetPanelSectionId, insertPanelWidget } from "./PanelState";
import type { NineZoneState } from "./NineZoneState";
import type { FloatingWidgetHomeState } from "./WidgetState";
import {
  addFloatingWidget,
  addPopoutWidget,
  floatingWidgetBringToFront,
} from "./WidgetState";
import {
  getPanelMaxSize,
  updatePanelState,
} from "./internal/PanelStateHelpers";
import {
  createDraggedTabState,
  updateSavedTabState,
  updateTabState,
} from "./internal/TabStateHelpers";
import {
  initRectangleProps,
  isToolSettingsFloatingWidget,
  setPointProps,
  setSizeProps,
  updateHomeOfToolSettingsWidget,
} from "./internal/NineZoneStateHelpers";
import {
  addWidgetState,
  getWidgetState,
  removeFloatingWidget,
  removePanelWidget,
  removePopoutWidget,
  removeWidget,
  setWidgetActiveTabId,
  updateFloatingWidgetState,
  updateWidgetState,
} from "./internal/WidgetStateHelpers";
import { getSendBackHomeState } from "../widget/SendBack";
import { panelSides } from "../widget-panels/Panel";
import type { TabLocation } from "./TabLocation";
import {
  getTabLocation,
  isFloatingTabLocation,
  isPanelTabLocation,
  isPopoutTabLocation,
} from "./TabLocation";
import { getUniqueId } from "../base/NineZone";

/** @internal */
export function NineZoneStateReducer(
  state: NineZoneState,
  action: NineZoneAction
): NineZoneState {
  switch (action.type) {
    case "RESIZE": {
      state = produce(state, (draft) => {
        setSizeProps(draft.size, action.size);
      });
      const nzBounds = Rectangle.createFromSize(action.size);
      for (const id of state.floatingWidgets.allIds) {
        const floatingWidget = state.floatingWidgets.byId[id];
        const bounds = Rectangle.create(floatingWidget.bounds);
        const containedBounds = bounds.containIn(nzBounds);
        state = updateFloatingWidgetState(state, id, {
          bounds: containedBounds.toProps(),
        });
      }
      for (const side of panelSides) {
        const panel = state.panels[side];
        if (!panel.size) continue;
        const maxSize = getPanelMaxSize(side, state.size, panel.maxSize);
        const size = Math.min(Math.max(panel.size, panel.minSize), maxSize);
        state = updatePanelState(state, side, (draft) => {
          draft.size = size;
        });
      }
      return state;
    }
    case "PANEL_TOGGLE_COLLAPSED": {
      return updatePanelState(state, action.side, (draft) => {
        draft.collapsed = !draft.collapsed;
      });
    }
    case "PANEL_SET_COLLAPSED": {
      return updatePanelState(state, action.side, (draft) => {
        draft.collapsed = action.collapsed;
      });
    }
    case "PANEL_SET_SIZE": {
      const { side, size: preferredSize } = action;

      return updatePanelState(state, side, (draft) => {
        let size = preferredSize;
        if (size !== undefined) {
          const maxSize = getPanelMaxSize(side, state.size, draft.maxSize);
          size = Math.min(Math.max(size, draft.minSize), maxSize);
        }
        draft.size = size;
      });
    }
    case "PANEL_SET_SPLITTER_VALUE": {
      const splitterPercent = Math.min(Math.max(action.percent, 0), 100);
      return updatePanelState(state, action.side, (draft) => {
        draft.splitterPercent = splitterPercent;
      });
    }
    case "PANEL_TOGGLE_SPAN": {
      const { side } = action;
      return updatePanelState(state, side, (draft) => {
        draft.span = !draft.span;
      });
    }
    case "PANEL_SET_PINNED": {
      return updatePanelState(state, action.side, (draft) => {
        draft.pinned = action.pinned;
      });
    }
    case "PANEL_TOGGLE_PINNED": {
      return updatePanelState(state, action.side, (draft) => {
        draft.pinned = !draft.pinned;
      });
    }
    case "PANEL_INITIALIZE": {
      return updatePanelState(state, action.side, (draft) => {
        const maxSize = getPanelMaxSize(draft.side, state.size, draft.maxSize);
        const size = Math.min(Math.max(action.size, draft.minSize), maxSize);
        draft.size = size;
      });
    }
    case "PANEL_WIDGET_DRAG_START": {
      const { side, newFloatingWidgetId } = action;
      const panel = state.panels[side];
      const widgetIndex = panel.widgets.indexOf(action.id);
      const widget = getWidgetState(state, action.id);
      state = removePanelWidget(state, action.id);
      return addFloatingWidget(
        state,
        newFloatingWidgetId,
        widget.tabs,
        {
          bounds: Rectangle.create(action.bounds).toProps(),
          userSized: action.userSized,
          id: action.newFloatingWidgetId,
          home: {
            side: action.side,
            widgetId: undefined,
            widgetIndex,
          },
        },
        {
          ...widget,
          minimized: false,
        }
      );
    }
    case "WIDGET_DRAG": {
      const { floatingWidgetId, dragBy } = action;
      const floatingWidget = state.floatingWidgets.byId[floatingWidgetId];
      const newBounds = Rectangle.create(floatingWidget.bounds).offset(dragBy);
      return updateFloatingWidgetState(state, floatingWidgetId, {
        bounds: newBounds.toProps(),
      });
    }
    case "WIDGET_DRAG_END": {
      // TODO: handle duplicates in WIDGET_TAB_DRAG_END action
      const { target, floatingWidgetId } = action;
      const floatingWidget = state.floatingWidgets.byId[floatingWidgetId];
      const draggedWidget = getWidgetState(state, floatingWidgetId);

      if (isWindowDropTargetState(target)) {
        const nzBounds = Rectangle.createFromSize(state.size);
        let newBounds = Rectangle.create(floatingWidget.bounds);
        if (draggedWidget.minimized) {
          const containedBounds = newBounds.setHeight(35).containIn(nzBounds);
          newBounds = newBounds.setPosition(containedBounds.topLeft());
        } else {
          newBounds = newBounds.containIn(nzBounds);
        }
        state = updateFloatingWidgetState(state, floatingWidgetId, {
          bounds: newBounds.toProps(),
        });
        return floatingWidgetBringToFront(state, floatingWidgetId);
      }

      state = removeFloatingWidget(state, floatingWidgetId);
      if (isTabDropTargetState(target)) {
        state = updateHomeOfToolSettingsWidget(
          state,
          target.widgetId,
          floatingWidget.home
        );
        const targetWidget = getWidgetState(state, target.widgetId);
        const tabs = [...targetWidget.tabs];
        tabs.splice(target.tabIndex, 0, ...draggedWidget.tabs);
        state = updateWidgetState(state, target.widgetId, {
          tabs,
        });
      } else if (isSectionDropTargetState(target)) {
        state = updatePanelState(state, target.side, (draft) => {
          draft.widgets.splice(target.sectionIndex, 0, target.newWidgetId);
          draft.collapsed = false;
        });
        state = addWidgetState(
          state,
          target.newWidgetId,
          draggedWidget.tabs,
          draggedWidget
        );
      } else if (isWidgetDropTargetState(target)) {
        state = updateHomeOfToolSettingsWidget(
          state,
          target.widgetId,
          floatingWidget.home
        );
        const widget = getWidgetLocation(state, target.widgetId);
        if (widget && isPanelWidgetLocation(widget)) {
          state = updatePanelState(state, widget.side, (draft) => {
            draft.collapsed = false;
          });
        }
        const targetWidget = getWidgetState(state, target.widgetId);
        const tabs = [...targetWidget.tabs];
        tabs.splice(targetWidget.tabs.length, 0, ...draggedWidget.tabs);
        state = updateWidgetState(state, target.widgetId, {
          tabs,
        });
      } else {
        const panelSectionId = getWidgetPanelSectionId(target.side, 0);
        state = updatePanelState(state, target.side, (draft) => {
          draft.widgets = [panelSectionId];
          draft.collapsed = false;
        });
        state = addWidgetState(state, panelSectionId, draggedWidget.tabs, {
          ...draggedWidget,
          minimized: false,
        });
      }
      return state;
    }
    case "FLOATING_WIDGET_RESIZE": {
      const { resizeBy } = action;
      const widget = getWidgetState(state, action.id);

      const floatingWidget = state.floatingWidgets.byId[action.id];
      // if this is not a tool settings widget then set the userSized flag
      // istanbul ignore else
      if (!isToolSettingsFloatingWidget(state, action.id)) {
        state = updateFloatingWidgetState(state, action.id, {
          userSized: true,
        });
      }

      const minWidth = 200;
      const minHeight = 120;
      let newBounds = Rectangle.create(floatingWidget.bounds);

      // Resize top-left corner.
      const maxLeft = newBounds.right - minWidth;
      const maxTop = newBounds.bottom - minHeight;

      newBounds = newBounds.inset(-resizeBy.left, -resizeBy.top, 0, 0);
      const left = Math.min(maxLeft, newBounds.left);
      const top = Math.min(maxTop, newBounds.top);
      newBounds = new Rectangle(left, top, newBounds.right, newBounds.bottom);

      // Resize bottom-right corner.
      const minRight = newBounds.left + minWidth;
      const minBottom = newBounds.top + minHeight;

      newBounds = newBounds.inset(0, 0, -resizeBy.right, -resizeBy.bottom);
      const right = Math.max(minRight, newBounds.right);
      const bottom = Math.max(minBottom, newBounds.bottom);
      newBounds = new Rectangle(left, top, right, bottom);

      state = updateFloatingWidgetState(state, action.id, {
        bounds: newBounds,
      });

      const tab = state.tabs[widget.activeTabId];
      if (tab.isFloatingWidgetResizable) {
        const size = newBounds.getSize();
        state = updateTabState(state, widget.activeTabId, {
          preferredFloatingWidgetSize: size,
          userSized: true,
        });
      }

      return state;
    }
    case "FLOATING_WIDGET_SET_BOUNDS": {
      const nzBounds = Rectangle.createFromSize(state.size);
      const bounds = Rectangle.create(action.bounds).containIn(nzBounds);
      return updateFloatingWidgetState(state, action.id, {
        bounds: bounds.toProps(),
      });
    }
    case "FLOATING_WIDGET_CLEAR_USER_SIZED": {
      return produce(state, (draft) => {
        const floatingWidget = draft.floatingWidgets.byId[action.id];
        floatingWidget.userSized = false;
        const widget = getWidgetState(draft, action.id);
        const tab = draft.tabs[widget.activeTabId];
        tab.userSized = false;
      });
    }
    case "FLOATING_WIDGET_SET_USER_SIZED": {
      return produce(state, (draft) => {
        const floatingWidget = draft.floatingWidgets.byId[action.id];
        floatingWidget.userSized = action.userSized;
      });
    }
    case "FLOATING_WIDGET_BRING_TO_FRONT": {
      return floatingWidgetBringToFront(state, action.id);
    }
    case "FLOATING_WIDGET_SEND_BACK": {
      const widget = getWidgetState(state, action.id);
      const sendBackHomeState = getSendBackHomeState(state, action.id);

      // Add tabs to an existing widget.
      if (sendBackHomeState.widgetId) {
        const destinationWidget = state.widgets[sendBackHomeState.widgetId];
        const tabs = [...destinationWidget.tabs, ...widget.tabs];
        state = updateWidgetState(state, destinationWidget.id, {
          tabs,
        });
        return removeWidget(state, widget.id);
      }

      const sectionIndex = sendBackHomeState.sectionIndex ?? 0;
      const home = state.floatingWidgets.byId[action.id].home;
      const destinationWidgetId =
        home.widgetId ?? getWidgetPanelSectionId(home.side, sectionIndex);

      // Add tabs to a new panel widget.
      state = removeWidget(state, widget.id);
      return insertPanelWidget(
        state,
        sendBackHomeState.side,
        destinationWidgetId,
        widget.tabs,
        sectionIndex
      );
    }
    case "POPOUT_WIDGET_SEND_BACK": {
      const popoutWidget = state.popoutWidgets.byId[action.id];
      const widget = getWidgetState(state, action.id);
      const home = popoutWidget.home;
      const panel = state.panels[home.side];
      let widgetPanelSectionId = home.widgetId;
      let homeWidgetPanelSection;
      if (widgetPanelSectionId) {
        homeWidgetPanelSection = state.widgets[widgetPanelSectionId];
      } else {
        widgetPanelSectionId = getWidgetPanelSectionId(
          panel.side,
          home.widgetIndex
        );
        homeWidgetPanelSection = state.widgets[widgetPanelSectionId];
      }

      state = removeWidget(state, popoutWidget.id);
      if (homeWidgetPanelSection) {
        const tabs = [...homeWidgetPanelSection.tabs, ...widget.tabs];
        state = updateWidgetState(state, homeWidgetPanelSection.id, {
          tabs,
        });
      } else {
        // if widget panel section was removed because it was empty insert it
        const sectionIndex = widgetPanelSectionId.endsWith("End") ? 1 : 0;
        state = insertPanelWidget(
          state,
          panel.side,
          widgetPanelSectionId,
          [...widget.tabs],
          sectionIndex
        );
      }
      return state;
    }
    case "WIDGET_TAB_CLICK": {
      const { id, widgetId } = action;
      state = setWidgetActiveTabId(state, widgetId, id);
      return updateWidgetState(state, widgetId, {
        minimized: false,
      });
    }
    case "WIDGET_TAB_DOUBLE_CLICK": {
      if (action.floatingWidgetId === undefined) return state;

      const widget = getWidgetState(state, action.widgetId);
      const active = action.id === widget.activeTabId;
      if (!active) return setWidgetActiveTabId(state, widget.id, action.id);

      return updateWidgetState(state, widget.id, {
        minimized: !widget.minimized,
      });
    }
    case "WIDGET_TAB_DRAG_START": {
      const tabId = action.id;
      let home: FloatingWidgetHomeState;
      if (action.floatingWidgetId) {
        const floatingWidget =
          state.floatingWidgets.byId[action.floatingWidgetId];
        home = floatingWidget.home;
      } else {
        assert(!!action.side);
        const panel = state.panels[action.side];
        const widgetIndex = panel.widgets.indexOf(action.widgetId);
        home = {
          side: action.side,
          widgetId: action.widgetId,
          widgetIndex,
        };
      }
      state = produce(state, (draft) => {
        draft.draggedTab = createDraggedTabState(tabId, {
          position: Point.create(action.position).toProps(),
          home,
        });
      });
      return removeTabFromWidget(state, tabId);
    }
    case "WIDGET_TAB_DRAG": {
      return produce(state, (draft) => {
        const draggedTab = draft.draggedTab;
        assert(!!draggedTab);
        const position = Point.create(draggedTab.position).offset(
          action.dragBy
        );
        setPointProps(draggedTab.position, position);
      });
    }
    case "WIDGET_TAB_DRAG_END": {
      assert(!!state.draggedTab);
      const target = action.target;
      if (isTabDropTargetState(target)) {
        state = updateHomeOfToolSettingsWidget(
          state,
          target.widgetId,
          state.draggedTab.home
        );
        const targetWidget = getWidgetState(state, target.widgetId);
        const tabIndex = target.tabIndex;
        const tabs = [...targetWidget.tabs];
        tabs.splice(tabIndex, 0, action.id);
        state = updateWidgetState(state, targetWidget.id, {
          tabs,
        });
      } else if (isPanelDropTargetState(target)) {
        state = updatePanelState(state, target.side, (draft) => {
          draft.widgets.push(target.newWidgetId);
          draft.collapsed = false;
        });
        state = addWidgetState(state, target.newWidgetId, [action.id]);
      } else if (isSectionDropTargetState(target)) {
        state = updatePanelState(state, target.side, (draft) => {
          draft.widgets.splice(target.sectionIndex, 0, target.newWidgetId);
          draft.collapsed = false;
        });
        state = addWidgetState(state, target.newWidgetId, [action.id]);
      } else if (isWidgetDropTargetState(target)) {
        updateHomeOfToolSettingsWidget(
          state,
          target.widgetId,
          state.draggedTab.home
        );
        const widget = getWidgetLocation(state, target.widgetId);
        if (widget && isPanelWidgetLocation(widget)) {
          state = updatePanelState(state, widget.side, (draft) => {
            draft.collapsed = false;
          });
        }
        const targetWidget = getWidgetState(state, target.widgetId);
        const tabIndex = targetWidget.tabs.length;
        const tabs = [...targetWidget.tabs];
        tabs.splice(tabIndex, 0, action.id);
        state = updateWidgetState(state, targetWidget.id, {
          tabs,
        });
      } else {
        const tab = state.tabs[state.draggedTab.tabId];
        const nzBounds = Rectangle.createFromSize(state.size);
        const bounds = Rectangle.createFromSize(
          tab.preferredFloatingWidgetSize || target.size
        ).offset(state.draggedTab.position);
        const containedBounds = bounds.containIn(nzBounds);
        const userSized =
          tab.userSized ||
          (tab.isFloatingWidgetResizable &&
            /* istanbul ignore next */ !!tab.preferredFloatingWidgetSize);

        state = addFloatingWidget(
          state,
          target.newFloatingWidgetId,
          [action.id],
          {
            bounds: containedBounds,
            home: state.draggedTab.home,
            userSized,
          }
        );
      }
      return produce(state, (draft) => {
        draft.draggedTab = undefined;
      });
    }
    case "WIDGET_TAB_POPOUT": {
      const { id, position, size } = action;
      const location = getTabLocation(state, id);
      if (location && isPopoutTabLocation(location)) return state;

      const savedTab = state.savedTabs.byId[id];

      const tab = state.tabs[id];

      let contentHeight = 800;
      let contentWidth = 600;

      if (tab.preferredFloatingWidgetSize) {
        contentWidth = tab.preferredFloatingWidgetSize.width;
        contentHeight = tab.preferredFloatingWidgetSize.height;
      } else {
        const popoutContentContainer = document.getElementById(
          `content-container:${id}`
        );
        if (popoutContentContainer !== null) {
          contentWidth = popoutContentContainer.offsetWidth + 20;
          contentHeight = popoutContentContainer.offsetHeight + 20;
        }
      }

      let preferredBounds = savedTab?.popoutBounds
        ? Rectangle.create(savedTab.popoutBounds)
        : Rectangle.createFromSize({
            height: contentHeight,
            width: contentWidth,
          });
      if (size) preferredBounds = preferredBounds.setSize(size);
      if (position) preferredBounds = preferredBounds.setPosition(position);

      const popoutWidgetId = getUniqueId();
      let home: FloatingWidgetHomeState | undefined;
      if (location && isPanelTabLocation(location)) {
        const panel = state.panels[location.side];
        const widgetIndex = panel.widgets.indexOf(location.widgetId);
        home = {
          side: location.side,
          widgetId: location.widgetId,
          widgetIndex,
        };
      } else if (location && isFloatingTabLocation(location)) {
        const floatingWidget =
          state.floatingWidgets.byId[location.floatingWidgetId];
        home = floatingWidget.home;
      }

      state = removeTabFromWidget(state, id);
      return addPopoutWidget(state, popoutWidgetId, [id], {
        bounds: preferredBounds.toProps(),
        home,
      });
    }
    case "WIDGET_TAB_HIDE": {
      const { id } = action;
      state = produce(state, (draft) => {
        if (!draft.toolSettings) return;

        const isToolSettings = draft.toolSettings.tabId === id;
        if (isToolSettings && draft.toolSettings.type === "docked") {
          draft.toolSettings.hidden = true;
        }
      });

      const location = getTabLocation(state, id);
      if (!location) return state;

      const widgetId = location.widgetId;
      const tabIndex = state.widgets[widgetId].tabs.indexOf(id);
      if (isFloatingTabLocation(location)) {
        const floatingWidget = state.floatingWidgets.byId[widgetId];
        // widgetDef.setFloatingContainerId(location.floatingWidgetId);
        state = updateSavedTabState(state, id, (draft) => {
          draft.home = {
            widgetId,
            tabIndex,
            floatingWidget,
          };
        });
      } else if (isPanelTabLocation(location)) {
        const side = location.side;
        const widgetIndex = state.panels[side].widgets.indexOf(widgetId);
        state = updateSavedTabState(state, id, (draft) => {
          draft.home = {
            widgetId,
            side,
            widgetIndex,
            tabIndex,
          };
        });
      }

      return removeTabFromWidget(state, id);
    }
    case "WIDGET_TAB_SET_LABEL": {
      return updateTabState(state, action.id, {
        label: action.label,
      });
    }
    case "WIDGET_TAB_OPEN": {
      return openWidgetTab(state, action.id);
    }
    case "WIDGET_TAB_CLOSE": {
      const { id } = action;
      if (
        state.toolSettings?.tabId === id &&
        state.toolSettings.type === "docked"
      ) {
        return state;
      }

      let location: TabLocation;
      [state, location] = unhideTab(state, id);

      // TODO: should change activeTabId of a widget with multiple tabs.
      const widget = state.widgets[location.widgetId];
      // istanbul ignore else
      if (isFloatingTabLocation(location) && id === widget.activeTabId) {
        state = updateWidgetState(state, widget.id, {
          minimized: true,
        });
      }
      return state;
    }
    case "WIDGET_TAB_FLOAT": {
      const { id, position, size } = action;

      let location: TabLocation;
      [state, location] = unhideTab(state, id);

      if (isFloatingTabLocation(location)) return state;

      const tab = state.tabs[id];
      const preferredSize = size ??
        tab.preferredFloatingWidgetSize ?? { height: 400, width: 400 };
      const preferredPosition = position ?? { x: 50, y: 100 };
      const preferredBounds =
        Rectangle.createFromSize(preferredSize).offset(preferredPosition);
      const nzBounds = Rectangle.createFromSize(state.size);
      const containedBounds = preferredBounds.containIn(nzBounds);

      const userSized = position
        ? tab.userSized ||
          (tab.isFloatingWidgetResizable &&
            /* istanbul ignore next */ !!tab.preferredFloatingWidgetSize)
        : undefined;

      if (isPanelTabLocation(location)) {
        const panel = state.panels[location.side];
        const widgetIndex = panel.widgets.indexOf(location.widgetId);

        state = updateTabState(state, id, {
          preferredFloatingWidgetSize: preferredSize,
        });
        state = removeTabFromWidget(state, id);
        state = addFloatingWidget(state, id, [id], {
          bounds: containedBounds,
          home: {
            side: location.side,
            widgetId: location.widgetId,
            widgetIndex,
          },
          userSized,
        });
      } else {
        const popoutWidgetId = location.popoutWidgetId;
        const popoutWidget = state.popoutWidgets.byId[popoutWidgetId];
        const widget = state.widgets[popoutWidgetId];
        state = removePopoutWidget(state, popoutWidgetId);

        const bounds = popoutWidget.bounds;
        const home = popoutWidget.home;

        state = addFloatingWidget(
          state,
          popoutWidgetId,
          [id],
          {
            bounds,
            home,
          },
          widget
        );
      }

      const isToolSettings = state.toolSettings?.tabId === id;
      if (isToolSettings) {
        state = produce(state, (draft) => {
          assert(!!draft.toolSettings);
          draft.toolSettings.type = "widget";
        });
      }

      return state;
    }
    case "WIDGET_TAB_SET_POPOUT_BOUNDS": {
      state = updateSavedTabState(state, action.id, (draft) => {
        initRectangleProps(draft, "popoutBounds", action.bounds);
      });
      return state;
    }
    case "WIDGET_TAB_SHOW": {
      return showWidgetTab(state, action.id);
    }
    case "WIDGET_TAB_EXPAND": {
      state = showWidgetTab(state, action.id);
      const location = getTabLocation(state, action.id);
      // istanbul ignore else
      if (location && isPanelTabLocation(location)) {
        state = updatePanelState(state, location.side, (draft) => {
          draft.splitterPercent =
            draft.widgets.findIndex((wId) => wId === location.widgetId) === 0
              ? 100
              : 0;
        });
      }
      return state;
    }
    case "TOOL_SETTINGS_DRAG_START": {
      if (!state.toolSettings) return state;
      if (state.toolSettings.type === "widget") return state;

      const { newFloatingWidgetId } = action;
      const tabId = state.toolSettings.tabId;

      const tab = state.tabs[tabId];
      const size = tab.preferredFloatingWidgetSize || {
        height: 200,
        width: 300,
      };
      state = addFloatingWidget(state, newFloatingWidgetId, [tabId], {
        bounds: Rectangle.createFromSize(size).toProps(),
      });
      return produce(state, (draft) => {
        assert(!!draft.toolSettings);
        draft.toolSettings.type = "widget";
      });
    }
    case "TOOL_SETTINGS_DOCK": {
      if (!state.toolSettings) return state;
      if (state.toolSettings.type === "docked") return state;

      state = removeTabFromWidget(state, state.toolSettings.tabId);
      return produce(state, (draft) => {
        assert(!!draft.toolSettings);
        draft.toolSettings.type = "docked";
      });
    }
  }
  return state;
}

function openWidgetTab(state: NineZoneState, id: TabState["id"]) {
  if (
    state.toolSettings?.tabId === id &&
    state.toolSettings.type === "docked"
  ) {
    return produce(state, (draft) => {
      assert(draft.toolSettings!.type === "docked");
      draft.toolSettings!.hidden = false;
    });
  }

  let location: TabLocation;
  [state, location] = unhideTab(state, id);

  return produce(state, (draft) => {
    const widget = draft.widgets[location.widgetId];
    widget.minimized = false;
    widget.activeTabId = id;

    if (isPanelTabLocation(location)) {
      const panel = draft.panels[location.side];
      panel.collapsed = false;
      // istanbul ignore next
      if (undefined === panel.size || 0 === panel.size) {
        panel.size = panel.minSize ?? 200;
      }
    }
  });
}

function showWidgetTab(state: NineZoneState, id: TabState["id"]) {
  state = openWidgetTab(state, id);
  const location = getTabLocation(state, id);
  if (!location) return state;
  state = updateWidgetState(state, location.widgetId, {
    activeTabId: id,
    minimized: false,
  });
  if (isPanelTabLocation(location)) {
    state = updatePanelState(state, location.side, (draft) => {
      draft.collapsed = false;
    });
  }
  if (isFloatingTabLocation(location)) {
    state = floatingWidgetBringToFront(state, location.floatingWidgetId);
  }
  return state;
}

function unhideTab(state: NineZoneState, id: TabState["id"]) {
  let location = getTabLocation(state, id);
  if (!location) {
    state = addRemovedTab(state, id);
    location = getTabLocation(state, id);
    assert(!!location);
  }
  return [state, location] as const;
}
