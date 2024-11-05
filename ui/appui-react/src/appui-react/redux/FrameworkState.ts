/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import { combineReducers } from "redux";
import type { ConfigurableUiState } from "./ConfigurableUiState.js";
import { ConfigurableUiReducer } from "./ConfigurableUiState.js";
import type { SessionState } from "./SessionState.js";
import { SessionStateReducer } from "./SessionState.js";

/* eslint-disable @typescript-eslint/no-deprecated */

/** Interface combining all the Framework state interfaces.
 * @public
 * @deprecated in 4.15.0. Use your preferred state management library instead.
 */
export interface FrameworkState {
  configurableUiState: ConfigurableUiState;
  sessionState: SessionState;
}

/** Framework reducer that combines the [[ConfigurableUiReducer]] and [[SessionStateReducer]].
 * @public
 * @deprecated in 4.15.0. Use your preferred state management library instead.
 */
export const FrameworkReducer = combineReducers({
  configurableUiState: ConfigurableUiReducer,
  sessionState: SessionStateReducer,
});
