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
import type { Layout } from "../layout/Layout";
import { WidgetState } from "../widgets/WidgetState";
import type { SpatialLayoutState } from "./SpatialLayoutState";
import produce from "immer";
import { BeEvent } from "@itwin/core-bentley";

function getWidgetState(state: SpatialLayoutState, widgetId: string) {
  if (state.activeWidgetId === widgetId) return WidgetState.Open;
  return WidgetState.Closed;
}

function createSpatialLayout(): Layout {
  return {
    setWidgetState: (id, state) => {
      useSpatialLayoutStore.setState(
        produce((draft) => {
          if (state === WidgetState.Open) {
            draft.activeWidgetId = id;
            return;
          }
          if (draft.activeWidgetId === id) {
            draft.activeWidgetId = undefined;
          }
        })
      );
    },
    getWidgetState: (widgetId) => {
      const state = useSpatialLayoutStore.getState();
      return getWidgetState(state, widgetId);
    },
    onWidgetStateChanged: new BeEvent(),
  };
}

/** Set up the layout to emit WidgetDef events, handle setters & getters.
 * @internal
 */
export function useSetupSpatialLayout() {
  const frontstageDef = useActiveFrontstageDef();
  const layout = React.useMemo(() => createSpatialLayout(), []);
  if (frontstageDef) {
    frontstageDef.layout = layout;
  }
  React.useEffect(() => {
    return useSpatialLayoutStore.subscribe((state, prevState) => {
      if (!frontstageDef) return;

      for (const widgetId of [prevState.activeWidgetId, state.activeWidgetId]) {
        if (!widgetId) continue;

        const prevWidgetState = getWidgetState(prevState, widgetId);
        const widgetState = getWidgetState(state, widgetId);
        if (prevWidgetState === widgetState) return;
        layout.onWidgetStateChanged?.raiseEvent(widgetId, widgetState);
      }
    });
  }, [frontstageDef, layout]);
}
