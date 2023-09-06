/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import { create } from "zustand";
import { getWidgetState } from "./useSpatialLayoutEvents";
import produce from "immer";
import { WidgetState } from "../widgets/WidgetState";
import { BeEvent } from "@itwin/core-bentley";
import type { SpatialLayout } from "./SpatialLayout";

/** @internal */
export interface SpatialLayoutState {
  activeWidgetId: string | undefined;
  panelSize: number;
  layout: SpatialLayout;
}

/** @internal */
export const useSpatialLayoutStore = create<SpatialLayoutState>((set, get) => ({
  activeWidgetId: undefined,
  panelSize: 300,
  layout: {
    setWidgetState: (id, widgetState) =>
      set((state) =>
        produce(state, (draft) => {
          if (widgetState === WidgetState.Open) {
            draft.activeWidgetId = id;
            return;
          }
          if (draft.activeWidgetId === id) {
            draft.activeWidgetId = undefined;
          }
        })
      ),
    getWidgetState: (widgetId) => {
      const state = get();
      return getWidgetState(state, widgetId);
    },
    onWidgetStateChanged: new BeEvent(),
    setPanelSize: (size) =>
      set((store) =>
        produce(store, (draft) => {
          draft.panelSize = size;
        })
      ),
  },
}));
