/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import { castDraft } from "immer";
import * as React from "react";
import type { Store } from "redux";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import {
  ConfigurableUiActionId,
  ConfigurableUiActions,
} from "../redux/ConfigurableUiState";
import type { FrameworkState as ReduxFrameworkState } from "../redux/FrameworkState";
import { UiFramework } from "../UiFramework";
import {
  type FrameworkState,
  handleArgs,
  useFrameworkStore,
} from "./useFrameworkStore";
import {
  SessionStateActionId,
  SessionStateActions,
} from "../redux/SessionState";

/** Returns the current framework state. Redux state is used if available, otherwise the root framework state is used.
 * @note This should be used as a replacement for redux `useSelector()` hook when accessing framework state.
 * @note Use {@link UiFramework.state} to access framework state globally.
 * @beta
 */
export function useFrameworkState(): FrameworkState {
  const frameworkState = useFrameworkStore();
  const cachedStateRef = React.useRef<
    | {
        // eslint-disable-next-line deprecation/deprecation
        reduxState: ReduxFrameworkState;
        state: FrameworkState;
      }
    | undefined
  >(undefined);
  const subscribe = React.useCallback((onStoreChange: () => void) => {
    const reduxStore = UiFramework.reduxStore;
    if (!reduxStore) return () => {};

    return reduxStore.subscribe(onStoreChange);
  }, []);
  const getSnapshot = React.useCallback((): FrameworkState | undefined => {
    const reduxStore = UiFramework.reduxStore;
    if (!reduxStore) return undefined;

    const reduxFrameworkState = reduxStore.getState()[
      // eslint-disable-next-line deprecation/deprecation
      UiFramework.frameworkStateKey
    ] as
      | ReduxFrameworkState // eslint-disable-line deprecation/deprecation
      | undefined;
    if (!reduxFrameworkState) {
      cachedStateRef.current = undefined;
      return undefined;
    }
    if (cachedStateRef.current?.reduxState === reduxFrameworkState)
      return cachedStateRef.current.state;

    cachedStateRef.current = {
      reduxState: reduxFrameworkState,
      state: toFrameworkState(reduxFrameworkState, reduxStore),
    };
    return cachedStateRef.current.state;
  }, []);
  const reduxState = useSyncExternalStore(subscribe, getSnapshot);
  return reduxState ?? frameworkState;
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

/** @internal */
export function toFrameworkState(
  // eslint-disable-next-line deprecation/deprecation
  reduxFrameworkState: ReduxFrameworkState,
  reduxStore: Store
): FrameworkState {
  return {
    session: {
      ...reduxFrameworkState.sessionState,
      setNumItemsSelected: (numItemsSelected, args) => {
        if (
          reduxFrameworkState.sessionState.numItemsSelected === numItemsSelected
        ) {
          return;
        }
        reduxStore.dispatch(
          // eslint-disable-next-line deprecation/deprecation
          SessionStateActions.setNumItemsSelected(numItemsSelected)
        );
        handleArgs(args, { eventId: SessionStateActionId.SetNumItemsSelected });
      },
    },
    configurableUi: {
      ...reduxFrameworkState.configurableUiState,
      setTheme: (theme, args) => {
        if (reduxFrameworkState.configurableUiState.theme === theme) {
          return;
        }
        // eslint-disable-next-line deprecation/deprecation
        reduxStore.dispatch(ConfigurableUiActions.setTheme(theme));
        handleArgs(args, { eventId: ConfigurableUiActionId.SetTheme });
      },
    },
  };
}