/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import { combineReducers } from "redux";
import {
  ConfigurableUiReducer,
  type ConfigurableUiState,
  initialConfigurableUiState,
} from "../configurableui/state";
import type { SessionState } from "./SessionState";
import { initialSessionState, SessionStateReducer } from "./SessionState";

/** Interface combining all the Framework state interfaces.
 * @public
 */
export interface FrameworkState {
  configurableUiState: ConfigurableUiState;
  sessionState: SessionState;
}

/** @internal */
export function createFrameworkState(): FrameworkState {
  return {
    configurableUiState: { ...initialConfigurableUiState },
    sessionState: { ...initialSessionState },
  };
}

/** Framework reducer that combines the [[ConfigurableUiReducer]] and [[SessionStateReducer]].
 * @public
 * @deprecated in 4.14.x. Use your preferred state management library instead.
 */
export const FrameworkReducer = combineReducers({
  configurableUiState: ConfigurableUiReducer,
  sessionState: SessionStateReducer,
});
