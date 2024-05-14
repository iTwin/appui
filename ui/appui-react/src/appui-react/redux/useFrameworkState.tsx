/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import produce from "immer";
import * as React from "react";
import { ReactReduxContext } from "react-redux";
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

interface FrameworkStateProviderProps {
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

/** @internal */
export function FrameworkStateProvider({
  children,
  state,
  dispatch,
}: FrameworkStateProviderProps) {
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
) {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.theme,
      };
    // eslint-disable-next-line deprecation/deprecation
    case ConfigurableUiActionId.SetTheme.valueOf():
      const anyAction = action as AnyFrameworkAction;
      return {
        ...state,
        theme: anyAction.payload,
      };
  }
  return state;
}

/** @internal */
export function useFrameworkState() {
  const context = React.useContext(FrameworkStateContext);
  const reduxContext = React.useContext(ReactReduxContext);
  const [reduxState, setReduxState] = React.useState<
    FrameworkState | undefined
  >(() => {
    if (!reduxContext) return undefined;
    const state = reduxContext.store.getState();
    // eslint-disable-next-line deprecation/deprecation
    return state[UiFramework.frameworkStateKey];
  });
  React.useEffect(() => {
    if (!reduxContext) {
      setReduxState(undefined);
      return;
    }
    return reduxContext.store.subscribe(() => {
      const state = reduxContext.store.getState();
      // eslint-disable-next-line deprecation/deprecation
      setReduxState(state[UiFramework.frameworkStateKey]);
    });
  }, [reduxContext]);
  return reduxState ?? context;
}

/** @internal */
export type FrameworkDispatch = (action: FrameworkAction) => void;

/** @internal */
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

/** @internal */
export function actionToReduxAction(
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

/** @internal */
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
