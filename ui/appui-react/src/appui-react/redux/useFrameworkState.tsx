/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import * as React from "react";
import type { Store } from "redux";
import { ReactReduxContext } from "react-redux";
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

/** @internal */
export function FrameworkStateProvider({
  children,
  state,
  dispatch,
}: FrameworkStateProviderProps) {
  return (
    <FrameworkDispatchContext.Provider value={dispatch}>
      <FrameworkStateContext.Provider value={state}>
        {children}
      </FrameworkStateContext.Provider>
    </FrameworkDispatchContext.Provider>
  );
}

/** @internal */
export function useFrameworkState() {
  const context = React.useContext(FrameworkStateContext);
  const reduxContext = React.useContext(ReactReduxContext);
  const [reduxFrameworkState, setReduxFrameworkState] = React.useState<
    FrameworkState | undefined
  >(() => {
    if (!reduxContext) return undefined;
    const reduxState = reduxContext.store.getState();
    // eslint-disable-next-line deprecation/deprecation
    return reduxState[UiFramework.frameworkStateKey];
  });
  React.useEffect(() => {
    if (!reduxContext) {
      setReduxFrameworkState(undefined);
      return;
    }
    return reduxContext.store.subscribe(() => {
      const reduxState = reduxContext.store.getState();
      // eslint-disable-next-line deprecation/deprecation
      setReduxFrameworkState(reduxState[UiFramework.frameworkStateKey]);
    });
  }, [reduxContext]);
  return reduxFrameworkState ?? context;
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
        reduxDispatch(reduxStore, action);
        return;
      }

      context?.(action);
    },
    [context]
  );
  return dispatch;
}

function reduxDispatch(reduxStore: Store, action: FrameworkAction) {
  const reduxAction = actionToReduxAction(action);
  if (!reduxAction) return;
  reduxStore.dispatch(reduxAction);
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

/** @internal */
export type FrameworkAction =
  | {
      type: "SET_THEME";
      theme: string;
    }
  | {
      type: string;
      [key: string]: any;
    };
