/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import { produce } from "immer";
import { Rectangle } from "@itwin/core-react";
import { assert } from "@itwin/core-bentley";
import { getWidgetLocation, isPanelWidgetLocation } from "./WidgetLocation";
import type { NineZoneAction } from "./NineZoneAction";
import {
  isPanelDropTargetState,
  isSectionDropTargetState,
  isTabDropTargetState,
  isWidgetDropTargetState,
  isWindowDropTargetState,
} from "./DropTargetState";
import { getWidgetPanelSectionId } from "./PanelState";
import type { NineZoneState } from "./NineZoneState";
import { addFloatingWidget, floatingWidgetBringToFront } from "./WidgetState";
import { updatePanelState } from "./internal/PanelStateHelpers";
import { updateHomeOfToolSettingsWidget } from "./internal/NineZoneStateHelpers";
import {
  addWidgetState,
  getWidgetState,
  removeFloatingWidget,
  setWidgetActiveTabId,
  updateFloatingWidgetState,
  updateWidgetState,
} from "./internal/WidgetStateHelpers";

/** @internal */
export function DropWidgetActiveTabPreviewReducer(
  state: NineZoneState,
  action: NineZoneAction
): NineZoneState {
  switch (action.type) {
    case "WIDGET_DRAG_END": {
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

        state = setWidgetActiveTabId(
          state,
          targetWidget.id,
          draggedWidget.activeTabId
        );
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

        state = setWidgetActiveTabId(
          state,
          targetWidget.id,
          draggedWidget.activeTabId
        );
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

        state = setWidgetActiveTabId(state, targetWidget.id, action.id);
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

        state = setWidgetActiveTabId(state, targetWidget.id, action.id);
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
  }
  return state;
}
