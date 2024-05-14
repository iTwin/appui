/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import produce from "immer";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import * as React from "react";
import { create } from "zustand";
import {
  ConfigurableUiActionId,
  type ConfigurableUiActionsUnion,
} from "../configurableui/state";
import { UiFramework } from "../UiFramework";
import type { FrameworkState } from "./FrameworkState";

/** @internal */
export const FrameworkStateContext = React.createContext<
  FrameworkState | undefined
>(undefined);

/** @internal */
export const FrameworkDispatchContext = React.createContext<
  FrameworkDispatch | undefined
>(undefined);

interface FrameworkProviderProps {
  children?: React.ReactNode;
  state?: FrameworkState;
  dispatch?: FrameworkDispatch;
}

const { getProviderId, setProvider } = (() => {
  const frameworkProviders = new Map<
    number,
    {
      state: FrameworkState | undefined;
      dispatch: FrameworkDispatch | undefined;
    }
  >();
  let providerId = 0;

  function updateStore() {
    const entries = Array.from(frameworkProviders.entries());
    if (entries.length === 0) {
      useRootFrameworkStore.getState().setRoot(undefined, undefined);
      return;
    }
    const sorted = entries.sort(([id1, _], [id2, __]) => id1 - id2);
    const lowest = sorted[0][1];
    useRootFrameworkStore.getState().setRoot(lowest.state, lowest.dispatch);
  }
  return {
    getProviderId: () => ++providerId,
    setProvider: (
      id: number,
      state: FrameworkState | undefined,
      dispatch: FrameworkDispatch | undefined
    ) => {
      frameworkProviders.set(id, { state, dispatch });
      updateStore();
      return () => {
        frameworkProviders.delete(id);
        updateStore();
      };
    },
  };
})();

/** Applications should use redux provider until none of the components are referencing framework state from the redux store.
 * @internal
 */
export function FrameworkProvider({
  children,
  state,
  dispatch,
}: FrameworkProviderProps) {
  const parentProvider = React.useContext(FrameworkStateContext);
  const idRef = React.useRef(() => {
    return getProviderId();
  });
  React.useEffect(() => {
    if (parentProvider) return;
    const id = idRef.current();
    return setProvider(id, state, dispatch);
  }, [state, dispatch, parentProvider]);
  return (
    <FrameworkDispatchContext.Provider value={dispatch}>
      <FrameworkStateContext.Provider value={state}>
        {children}
      </FrameworkStateContext.Provider>
    </FrameworkDispatchContext.Provider>
  );
}

/** @internal */
export function FrameworkStateReducer(
  state: FrameworkState,
  action: FrameworkAction
): FrameworkState {
  switch (action.type) {
    case "SET_THEME":
      return produce(state, (draft) => {
        draft.configurableUiState.theme = action.theme;
      });
  }
  return state;
}

/** Returns framework state.
 * @note Uses redux store if available. Fallbacks to `FrameworkProvider`.
 * @internal
 */
export function useFrameworkState() {
  const context = React.useContext(FrameworkStateContext);
  const subscribe = React.useCallback((onStoreChange: () => void) => {
    const reduxStore = UiFramework.reduxStore;
    if (!reduxStore) return () => {};

    return reduxStore.subscribe(onStoreChange);
  }, []);
  const getSnapshot = React.useCallback(() => {
    const reduxStore = UiFramework.reduxStore;
    if (!reduxStore) return undefined;

    const state = reduxStore.getState();
    // eslint-disable-next-line deprecation/deprecation
    return state[UiFramework.frameworkStateKey] as FrameworkState | undefined;
  }, []);
  const reduxState = useSyncExternalStore(subscribe, getSnapshot);
  return reduxState ?? context;
}

/** @internal */
export type FrameworkDispatch = (action: FrameworkAction) => void;

/** Returns framework dispatch function.
 * @note Uses redux dispatch if available. Fallbacks to `FrameworkProvider`.
 * @internal
 */
export function useFrameworkDispatch() {
  const context = React.useContext(FrameworkDispatchContext);
  const dispatch = React.useCallback<FrameworkDispatch>(
    (action) => {
      const reduxStore = UiFramework.reduxStore;
      if (reduxStore) {
        const reduxAction = actionToReduxAction(action);
        if (!reduxAction) return;
        reduxStore.dispatch(reduxAction);
        return;
      }

      context?.(action);
    },
    [context]
  );
  return dispatch;
}

function actionToReduxAction(
  action: FrameworkAction
  // eslint-disable-next-line deprecation/deprecation
): ConfigurableUiActionsUnion | undefined {
  switch (action.type) {
    case "SET_THEME":
      return {
        // eslint-disable-next-line deprecation/deprecation
        type: ConfigurableUiActionId.SetTheme,
        payload: action.theme,
      };
  }
  return undefined;
}

interface AnyFrameworkAction {
  type: string;
  [key: string]: any;
}

/** @internal */
export type FrameworkAction =
  | {
      type: "SET_THEME";
      theme: string;
    }
  // TODO: is there a way to keep type auto-completion and known action types strict? i.e. for string literals: "SET_THEME" | (string & {})
  | AnyFrameworkAction;

interface RootFramework {
  state: FrameworkState | undefined;
  dispatch: FrameworkDispatch | undefined;
  setRoot: (
    state: FrameworkState | undefined,
    dispatch: FrameworkDispatch | undefined
  ) => void;
}

/** Store for root `FrameworkProvider`. Used for backwards compatibility in `UiFramework` statics to access framework state and dispatch.
 * @internal
 */
export const useRootFrameworkStore = create<RootFramework>((set) => ({
  state: undefined,
  dispatch: undefined,
  setRoot: (frameworkState, dispatch) => {
    set((state) =>
      produce(state, (draft) => {
        draft.state = frameworkState;
        draft.dispatch = dispatch;
      })
    );
  },
  reset: () => {
    set({ state: undefined, dispatch: undefined });
  },
}));
