/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import produce from "immer";
import { WidgetState } from "../widgets/WidgetState";
import type { SpatialLayoutState } from "./SpatialLayoutState";
import type { Action } from "../layout/Action";

/** @internal */
export function SpatialLayoutStateReducer(
  state: SpatialLayoutState,
  action: Action
): SpatialLayoutState {
  return produce(state, (draft) => {
    if (action.state === WidgetState.Open) {
      draft.activeWidgetId = action.id;
      return;
    }
    if (draft.activeWidgetId === action.id) {
      draft.activeWidgetId = undefined;
    }
  });
}
