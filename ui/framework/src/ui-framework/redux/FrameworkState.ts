/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module State */

import { ConfigurableUiState, ConfigurableUiReducer } from "../configurableui/state";
import { SessionState, SessionStateReducer } from "./SessionState";
import { combineReducers } from "../utils/redux-ts";

/** Interface combining all the Framework state interfaces.
 * @beta
 */
export interface FrameworkState {
  configurableUiState: ConfigurableUiState;
  sessionState: SessionState;
}

/** Framework reducer that combines the [[ConfigurableUiReducer]] and [[SessionStateReducer]].
 * @beta
 */
export const FrameworkReducer = combineReducers({ // tslint:disable-line:variable-name
  configurableUiState: ConfigurableUiReducer,
  sessionState: SessionStateReducer,
});
