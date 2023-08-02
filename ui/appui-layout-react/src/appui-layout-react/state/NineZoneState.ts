/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

// Cspell:ignore popout
import produce from "immer";
import type { SizeProps } from "@itwin/core-react";
import { Rectangle } from "@itwin/core-react";
import { updateTabState } from "./internal/TabStateHelpers";
import type {
  FloatingWidgetsState,
  PopoutWidgetsState,
  WidgetsState,
} from "./WidgetState";
import { addFloatingWidget } from "./WidgetState";
import type { PanelsState } from "./PanelState";
import type { ToolSettingsState } from "./ToolSettingsState";
import { createPanelsState } from "./internal/PanelStateHelpers";
import type { DraggedTabState, TabsState } from "./TabState";
import { removeTabFromWidget } from "./TabState";
import type { PointProps } from "@itwin/appui-abstract";
import { UiError } from "@itwin/appui-abstract";
import { getUniqueId } from "../base/NineZone";
import {
  category,
  convertPopoutWidgetContainerToFloating,
} from "./internal/NineZoneStateHelpers";
import {
  getTabLocation,
  isFloatingTabLocation,
  isPanelTabLocation,
} from "./TabLocation";
import type { SavedTabsState } from "./SavedTabState";

/** @internal */
export interface NineZoneState {
  readonly draggedTab: DraggedTabState | undefined;
  readonly floatingWidgets: FloatingWidgetsState;
  readonly popoutWidgets: PopoutWidgetsState;
  readonly panels: PanelsState;
  readonly tabs: TabsState;
  readonly savedTabs: SavedTabsState;
  readonly toolSettings: ToolSettingsState | undefined;
  readonly widgets: WidgetsState;
  readonly size: SizeProps;
}

/** @internal */
export function createNineZoneState(
  args?: Partial<NineZoneState>
): NineZoneState {
  return {
    draggedTab: undefined,
    floatingWidgets: {
      byId: {},
      allIds: [],
    },
    popoutWidgets: {
      byId: {},
      allIds: [],
    },
    panels: createPanelsState(),
    widgets: {},
    tabs: {},
    savedTabs: {
      allIds: [],
      byId: {},
    },
    toolSettings: undefined,
    size: {
      height: 0,
      width: 0,
    },
    ...args,
  };
}

/** When running in web-browser - browser prohibits auto opening of popup windows so convert any PopoutWidgets to
 * FloatingWidgets in this situation.
 * @internal
 */
export function convertAllPopupWidgetContainersToFloating(
  state: NineZoneState
): NineZoneState {
  // TODO: review
  return produce(state, (draft) => {
    for (const widgetContainerId of state.popoutWidgets.allIds) {
      const popoutWidget = state.popoutWidgets.byId[widgetContainerId];
      const bounds = popoutWidget.bounds;
      const home = popoutWidget.home;
      const id = popoutWidget.id;
      // remove the popout entry
      delete draft.popoutWidgets.byId[widgetContainerId];
      const idIndex = draft.popoutWidgets.allIds.indexOf(widgetContainerId);
      draft.popoutWidgets.allIds.splice(idIndex, 1);
      // insert floating entry
      draft.floatingWidgets.byId[widgetContainerId] = { bounds, id, home };
      draft.floatingWidgets.allIds.push(widgetContainerId);
    }
  });
}

/** @internal */
export function floatWidget(
  state: NineZoneState,
  widgetTabId: string,
  position?: PointProps,
  size?: SizeProps
): NineZoneState {
  // TODO: review
  const location = getTabLocation(state, widgetTabId);
  if (!location) throw new UiError(category, "Tab not found");

  if (isFloatingTabLocation(location)) return state;

  const tab = state.tabs[widgetTabId];
  const preferredSize = size ??
    tab.preferredFloatingWidgetSize ?? { height: 400, width: 400 };
  const preferredPosition = position ?? { x: 50, y: 100 };
  const preferredBounds =
    Rectangle.createFromSize(preferredSize).offset(preferredPosition);
  const nzBounds = Rectangle.createFromSize(state.size);
  const containedBounds = preferredBounds.containIn(nzBounds);

  // istanbul ignore else
  if (isPanelTabLocation(location)) {
    const floatingWidgetId = widgetTabId
      ? widgetTabId
      : /* istanbul ignore next */ getUniqueId();
    const panel = state.panels[location.side];
    const widgetIndex = panel.widgets.indexOf(location.widgetId);

    const floatedTab = state.tabs[widgetTabId];
    state = updateTabState(state, floatedTab.id, {
      preferredFloatingWidgetSize: preferredSize,
    });
    state = removeTabFromWidget(state, widgetTabId);
    return addFloatingWidget(
      state,
      floatingWidgetId,
      [widgetTabId],
      {
        bounds: containedBounds,
        home: {
          side: location.side,
          widgetId: location.widgetId,
          widgetIndex,
        },
      },
      {
        isFloatingStateWindowResizable:
          floatedTab.isFloatingStateWindowResizable,
      }
    );
  }
  // istanbul ignore next
  return convertPopoutWidgetContainerToFloating(state, location.popoutWidgetId);
}
