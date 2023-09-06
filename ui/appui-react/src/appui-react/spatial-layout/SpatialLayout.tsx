/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import { useSpatialLayoutStore } from "./SpatialLayoutStore";
import type { Layout } from "../layout/Layout";
import { WidgetState } from "../widgets/WidgetState";
import produce from "immer";
import { BeEvent } from "@itwin/core-bentley";
import { getWidgetState } from "./useSpatialLayoutEvents";

/** @internal */
export function createSpatialLayout(): Layout {
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
