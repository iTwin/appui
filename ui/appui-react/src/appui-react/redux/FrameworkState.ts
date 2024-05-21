/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import { combineReducers } from "redux";
import type { ConfigurableUiState } from "./ConfigurableUiState";
import {
  ConfigurableUiReducer,
  initialConfigurableUiState,
} from "./ConfigurableUiState";
import type { SessionState } from "./SessionState";
import { initialSessionState, SessionStateReducer } from "./SessionState";
import type { useFrameworkState } from "../uistate/useFrameworkState";

/* eslint-disable deprecation/deprecation */

/** Interface combining all the Framework state interfaces.
 * @public
 * @deprecated in 4.14.x. Use {@link useFrameworkState} instead.
 */
export interface FrameworkState {
  configurableUiState: ConfigurableUiState;
  sessionState: SessionState;
}

/** @internal */
// eslint-disable-next-line deprecation/deprecation
export function createFrameworkState(): FrameworkState {
  return {
    configurableUiState: { ...initialConfigurableUiState },
    sessionState: { ...initialSessionState },
  };
}

/** Framework reducer that combines the [[ConfigurableUiReducer]] and [[SessionStateReducer]].
 * @public
 * @deprecated in 4.14.x. Use {@link useFrameworkState} instead.
 */
export const FrameworkReducer = combineReducers({
  // eslint-disable-next-line deprecation/deprecation
  configurableUiState: ConfigurableUiReducer,
  // eslint-disable-next-line deprecation/deprecation
  sessionState: SessionStateReducer,
});
