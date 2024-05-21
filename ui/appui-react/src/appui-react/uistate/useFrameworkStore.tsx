/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import type { Immutable } from "immer";
import produce, { castDraft } from "immer";
import type { StoreApi, UseBoundStore } from "zustand";
import { create } from "zustand";
import {
  ConfigurableUiActionId,
  type ConfigurableUiState,
} from "../redux/ConfigurableUiState";
import { createFrameworkState } from "../redux/FrameworkState";
import { type SessionState, SessionStateActionId } from "../redux/SessionState";
import type { ThemeId } from "../theme/ThemeId";
import { SyncUiEventDispatcher } from "../syncui/SyncUiEventDispatcher";

interface ActionArgs {
  /** Defaults to `false`. */
  immediateSync?: boolean;
}

/** Interface that replaces framework state and actions used in redux.
 * @note This type is mapped to the redux framework state for backwards compatibility.
 * @note This type should not be used by consumers directly, additional required properties can be added.
 * @note Actions dispatch sync UI events. Use `args` parameter to provide additional options.
 * @internal
 */
export type FrameworkState = Immutable<{
  // eslint-disable-next-line deprecation/deprecation
  configurableUi: ConfigurableUiState & {
    setTheme: (theme: ThemeId, args?: ActionArgs) => void;
  };
  // eslint-disable-next-line deprecation/deprecation
  session: SessionState & {
    setNumItemsSelected: (numSelected: number, args?: ActionArgs) => void;
  };
}>;

/** Internal framework state store that replaces redux store.
 * @internal
 */
export const useFrameworkStore: UseBoundStore<StoreApi<FrameworkState>> =
  create<FrameworkState>((set, get) => {
    const initialState = createFrameworkState();
    return {
      configurableUi: {
        ...initialState.configurableUiState,
        setTheme: (theme, args) => {
          const frameworkState = get();
          if (frameworkState.configurableUi.theme === theme) return;
          set((state) =>
            produce(state, (draft) => {
              draft.configurableUi.theme = castDraft(theme);
            })
          );
          handleArgs(args, {
            eventId: ConfigurableUiActionId.SetTheme,
          });
        },
      },
      session: {
        ...initialState.sessionState,
        setNumItemsSelected: (numSelected, args) => {
          const frameworkState = get();
          if (frameworkState.session.numItemsSelected === numSelected) return;
          set((state) =>
            produce(state, (draft) => {
              draft.session.numItemsSelected = numSelected;
            })
          );
          handleArgs(args, {
            eventId: SessionStateActionId.SetNumItemsSelected,
          });
        },
      },
    };
  });

/** @internal */
export function handleArgs(
  args: ActionArgs | undefined,
  {
    eventId,
  }: {
    eventId: string;
  }
) {
  const { immediateSync = false } = args ?? {};
  if (immediateSync)
    SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(eventId);
  else SyncUiEventDispatcher.dispatchSyncUiEvent(eventId);
}