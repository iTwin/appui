/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import { ConfigurableUiActionId } from "../redux/ConfigurableUiState";
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
