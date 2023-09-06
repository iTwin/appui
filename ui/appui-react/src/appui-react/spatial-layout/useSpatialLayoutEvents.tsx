/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import * as React from "react";
import { useActiveFrontstageDef } from "../frontstage/FrontstageDef";
import { useSpatialLayoutStore } from "./SpatialLayoutStore";
import type { SpatialLayoutState } from "./SpatialLayoutState";
import { WidgetState } from "../widgets/WidgetState";

/** @internal */
export function getWidgetState(state: SpatialLayoutState, widgetId: string) {
  if (state.activeWidgetId === widgetId) return WidgetState.Open;
  return WidgetState.Closed;
}

/** Set up the layout to emit WidgetDef events.
 * @internal
 */
export function useSpatialLayoutEvents() {
  const frontstageDef = useActiveFrontstageDef();
  React.useEffect(() => {
    return useSpatialLayoutStore.subscribe((state, prevState) => {
      const layout = frontstageDef?.layout;
      if (!layout) return;

      for (const widgetId of [prevState.activeWidgetId, state.activeWidgetId]) {
        if (!widgetId) continue;

        const prevWidgetState = getWidgetState(prevState, widgetId);
        const widgetState = getWidgetState(state, widgetId);
        if (prevWidgetState === widgetState) return;
        frontstageDef.layout.onWidgetStateChanged?.raiseEvent(
          widgetId,
          widgetState
        );
      }
    });
  }, [frontstageDef]);
}
