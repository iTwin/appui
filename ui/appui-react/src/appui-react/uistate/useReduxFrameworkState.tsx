/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import * as React from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import { UiFramework } from "../UiFramework";
import type { FrameworkState as ReduxFrameworkState } from "../redux/FrameworkState";

/* eslint-disable deprecation/deprecation */

/** @internal */
export function useReduxFrameworkState<T>(
  selector: (state: ReduxFrameworkState | undefined) => T
): T {
  const subscribe = React.useCallback((onStoreChange: () => void) => {
    const reduxStore = UiFramework.reduxStore;
    if (!reduxStore) return () => {};

    return reduxStore.subscribe(onStoreChange);
  }, []);
  const getSnapshot = React.useCallback((): T => {
    const reduxStore = UiFramework.reduxStore;
    const state = reduxStore?.getState();
    const frameworkState = state?.[UiFramework.frameworkStateKey] as
      | ReduxFrameworkState
      | undefined;
    return selector(frameworkState);
  }, [selector]);
  return useSyncExternalStore(subscribe, getSnapshot);
}
