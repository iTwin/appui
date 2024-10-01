/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { assert } from "@itwin/core-bentley";
import type { NineZoneState } from "../../layout/state/NineZoneState.js";
import type { NineZoneStateReducer } from "../../layout/state/NineZoneStateReducer.js";
import { getTabLocation } from "../../layout/state/TabLocation.js";
import {
  getWidgetState,
  setWidgetActiveTabId,
} from "../../layout/state/internal/WidgetStateHelpers.js";

/** Reducer factory to activate tab of a dragged widget when dropped in a container.
 * @internal
 */
export const activateDroppedTab =
  (reducer: typeof NineZoneStateReducer): typeof NineZoneStateReducer =>
  (state, action) => {
    if (action.type === "WIDGET_TAB_DRAG_END") {
      const draggedTabId = action.id;

      state = reducer(state, action);
      const widget = getWidgetByTabId(state, draggedTabId);
      state = setWidgetActiveTabId(state, widget.id, draggedTabId);
    } else if (action.type === "WIDGET_DRAG_END") {
      const draggedWidget = getWidgetState(state, action.floatingWidgetId);

      state = reducer(state, action);
      const widget = getWidgetByTabId(state, draggedWidget.activeTabId);
      state = setWidgetActiveTabId(state, widget.id, draggedWidget.activeTabId);
    } else {
      state = reducer(state, action);
    }
    return state;
  };

function getWidgetByTabId(state: NineZoneState, draggedWidgetTabId: string) {
  const location = getTabLocation(state, draggedWidgetTabId);
  assert(!!location);

  const widget = state.widgets[location.widgetId];
  return widget;
}
