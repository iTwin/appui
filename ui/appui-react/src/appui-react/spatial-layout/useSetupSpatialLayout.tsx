/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import * as React from "react";
import { SpatialLayoutStateReducer } from "./SpatialLayoutStateReducer";
import { useActiveFrontstageDef } from "../frontstage/FrontstageDef";
import { useSpatialLayoutStore } from "./SpatialLayoutStore";
import type { Layout } from "../layout/Layout";
import { WidgetState } from "../widgets/WidgetState";
import { UiFramework } from "../UiFramework";
import type { SpatialLayoutState } from "./SpatialLayoutState";

function getWidgetState(state: SpatialLayoutState, widgetId: string) {
  if (state.activeWidgetId === widgetId) return WidgetState.Open;
  return WidgetState.Closed;
}

/** Set up the layout to emit WidgetDef events, handle setters & getters.
 * @internal
 */
export function useSetupSpatialLayout() {
  const frontstageDef = useActiveFrontstageDef();
  const layout = React.useMemo<Layout>(() => {
    return {
      dispatch: (action) => {
        let state = useSpatialLayoutStore.getState();
        state = SpatialLayoutStateReducer(state, action);
        useSpatialLayoutStore.setState(state, true);
      },
      getWidgetState: (widgetId) => {
        const state = useSpatialLayoutStore.getState();
        return getWidgetState(state, widgetId);
      },
    };
  }, []);
  React.useEffect(() => {
    if (!frontstageDef) return;
    frontstageDef.layout = layout;
  }, [frontstageDef, layout]);
  React.useEffect(() => {
    return useSpatialLayoutStore.subscribe((state, prevState) => {
      if (!frontstageDef) return;

      for (const widgetId of [prevState.activeWidgetId, state.activeWidgetId]) {
        const widgetDef = widgetId
          ? frontstageDef.findWidgetDef(widgetId)
          : undefined;
        if (!widgetDef) continue;

        const prevWidgetState = getWidgetState(prevState, widgetDef.id);
        const widgetState = getWidgetState(state, widgetDef.id);
        if (prevWidgetState === widgetState) return;
        UiFramework.frontstages.onWidgetStateChangedEvent.emit({
          widgetDef,
          widgetState,
        });
      }
    });
  }, [frontstageDef]);
}
