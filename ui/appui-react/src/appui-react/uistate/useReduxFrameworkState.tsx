/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import { useCallback, useSyncExternalStore } from "react";
import { UiFramework } from "../UiFramework.js";
import type { FrameworkState as ReduxFrameworkState } from "../redux/FrameworkState.js";

/* eslint-disable @typescript-eslint/no-deprecated */

/** @internal */
export function useReduxFrameworkState<T>(
  selector: (state: ReduxFrameworkState | undefined) => T
): T {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const reduxStore = UiFramework.reduxStore;
    if (!reduxStore) return () => {};

    return reduxStore.subscribe(onStoreChange);
  }, []);
  const getSnapshot = useCallback((): T => {
    const reduxStore = UiFramework.reduxStore;
    const state = reduxStore?.getState();
    const frameworkState = state?.[UiFramework.frameworkStateKey] as
      | ReduxFrameworkState
      | undefined;
    return selector(frameworkState);
  }, [selector]);
  return useSyncExternalStore(subscribe, getSnapshot);
}
