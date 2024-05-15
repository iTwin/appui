/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import * as React from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import {
  ConfigurableUiActionId,
  ConfigurableUiActions,
} from "../configurableui/state";
import { type FrameworkState } from "./FrameworkState";
import { UiFramework } from "../UiFramework";
import { type GlobalState, useGlobalStore } from "./useGlobalStore";
import type { ThemeId } from "../theme/ThemeId";

/** Returns the current framework state.
 * @note This is a replacement for `useSelector` in redux.
 * @internal
 */
export function useGlobalState(): GlobalState {
  const globalState = useGlobalStore();
  const lastState = React.useRef<FrameworkState | undefined>(undefined);
  const lastFramework = React.useRef<GlobalState | undefined>(undefined);
  const subscribe = React.useCallback((onStoreChange: () => void) => {
    const reduxStore = UiFramework.reduxStore;
    if (!reduxStore) return () => {};

    return reduxStore.subscribe(onStoreChange);
  }, []);
  const getSnapshot = React.useCallback<() => GlobalState | undefined>(() => {
    const reduxStore = UiFramework.reduxStore;
    if (!reduxStore) return undefined;

    const reduxStoreState = reduxStore.getState();
    // eslint-disable-next-line deprecation/deprecation
    const state = reduxStoreState[UiFramework.frameworkStateKey] as
      | FrameworkState
      | undefined;
    if (!state) return state;
    if (lastState.current === state) return lastFramework.current;

    lastState.current = state;
    lastFramework.current = {
      session: state.sessionState,
      configurableUi: {
        ...state.configurableUiState,
        setTheme: (theme: ThemeId) => {
          // eslint-disable-next-line deprecation/deprecation
          reduxStore.dispatch(ConfigurableUiActions.setTheme(theme));
        },
      },
    };
    return lastFramework.current;
  }, []);
  const reduxState = useSyncExternalStore(subscribe, getSnapshot);
  return reduxState ?? globalState;
}

/** @internal */
export function dispatchActionToFrameworkStore(type: string, payload: any) {
  switch (type) {
    // eslint-disable-next-line deprecation/deprecation
    case ConfigurableUiActionId.SetTheme.valueOf():
      return useGlobalStore.getState().configurableUi.setTheme(payload);
  }
}
