/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import { castDraft } from "immer";
import { ConfigurableUiActionId } from "../redux/ConfigurableUiState";
import type { FrameworkState as ReduxFrameworkState } from "../redux/FrameworkState";
import { UiFramework } from "../UiFramework";
import { type FrameworkState, useFrameworkStore } from "./useFrameworkStore";

/** Returns the current framework state. Redux state is used if available, otherwise the root framework state is used.
 * @note This should be used as a replacement for redux `useSelector()` hook when accessing framework state.
 * @note Use {@link UiFramework.state} to access framework state globally.
 * @beta
 */
export function useFrameworkState(): FrameworkState {
  const frameworkState = useFrameworkStore();
  return frameworkState;
}

/** @internal */
export function dispatchActionToFrameworkState(
  state: FrameworkState,
  type: string,
  payload: any,
  immediateSync: boolean
) {
  switch (type) {
    case ConfigurableUiActionId.SetTheme.valueOf():
      return state.configurableUi.setTheme(payload, { immediateSync });
  }
}

/** @internal */
export function toReduxFrameworkState(
  state: FrameworkState
  // eslint-disable-next-line deprecation/deprecation
): ReduxFrameworkState {
  const draftState = castDraft(state);
  return {
    configurableUiState: draftState.configurableUi,
    sessionState: draftState.session,
  };
}
