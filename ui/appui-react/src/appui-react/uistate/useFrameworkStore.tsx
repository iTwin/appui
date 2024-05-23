/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import produce from "immer";
import type { StoreApi, UseBoundStore } from "zustand";
import { create } from "zustand";
import { createFrameworkState } from "../redux/FrameworkState";
import type {
  CursorMenuData,
  CursorMenuPayload,
  PresentationSelectionScope,
} from "../redux/SessionState";
import { type SessionState, SessionStateActionId } from "../redux/SessionState";
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
export interface FrameworkState {
  session: Omit<
    // eslint-disable-next-line deprecation/deprecation
    SessionState,
    "defaultViewState" | "iModelConnection" | "numItemsSelected"
  > & {
    setActiveIModelId: (iModelId: string, args?: ActionArgs) => void;
    setAvailableSelectionScopes: (
      availableSelectionScopes: PresentationSelectionScope[],
      args?: ActionArgs
    ) => void;
    setDefaultViewId: (viewId: string, args?: ActionArgs) => void;
    setDefaultIModelViewportControlId: (
      iModelViewportControlId: string,
      args?: ActionArgs
    ) => void;
    setSelectionScope: (
      activeSelectionScope: string,
      args?: ActionArgs
    ) => void;
    updateCursorMenu: (
      // eslint-disable-next-line deprecation/deprecation
      cursorMenuData: CursorMenuData | CursorMenuPayload | undefined,
      args?: ActionArgs
    ) => void;
  };
}

/** Internal framework state store that replaces redux store.
 * @internal
 */
export const useFrameworkStore: UseBoundStore<StoreApi<FrameworkState>> =
  create<FrameworkState>((set, get) => {
    const initialState = createFrameworkState();
    return {
      session: {
        ...initialState.sessionState,
        setActiveIModelId: (iModelId: string, args?: ActionArgs) => {
          const frameworkState = get();
          if (frameworkState.session.iModelId === iModelId) return;
          set((state) =>
            produce(state, (draft) => {
              draft.session.iModelId = iModelId;
            })
          );
          handleArgs(args, {
            eventId: SessionStateActionId.SetActiveIModelId,
          });
        },
        setAvailableSelectionScopes: (
          availableSelectionScopes: PresentationSelectionScope[],
          args?: ActionArgs
        ) => {
          const frameworkState = get();
          if (
            frameworkState.session.availableSelectionScopes ===
            availableSelectionScopes
          )
            return;
          set((state) =>
            produce(state, (draft) => {
              draft.session.availableSelectionScopes = availableSelectionScopes;
            })
          );
          handleArgs(args, {
            eventId: SessionStateActionId.SetAvailableSelectionScopes,
          });
        },
        setDefaultViewId: (viewId: string, args?: ActionArgs) => {
          const frameworkState = get();
          if (frameworkState.session.defaultViewId === viewId) return;
          set((state) =>
            produce(state, (draft) => {
              draft.session.defaultViewId = viewId;
            })
          );
          handleArgs(args, {
            eventId: SessionStateActionId.SetDefaultViewId,
          });
        },
        setDefaultIModelViewportControlId: (
          iModelViewportControlId: string,
          args?: ActionArgs
        ) => {
          const frameworkState = get();
          if (
            frameworkState.session.defaultIModelViewportControlId ===
            iModelViewportControlId
          )
            return;
          set((state) =>
            produce(state, (draft) => {
              draft.session.defaultIModelViewportControlId =
                iModelViewportControlId;
            })
          );
          handleArgs(args, {
            eventId: SessionStateActionId.SetDefaultIModelViewportControlId,
          });
        },
        setSelectionScope: (
          activeSelectionScope: string,
          args?: ActionArgs
        ) => {
          const frameworkState = get();
          if (
            frameworkState.session.activeSelectionScope === activeSelectionScope
          )
            return;
          set((state) =>
            produce(state, (draft) => {
              draft.session.activeSelectionScope = activeSelectionScope;
            })
          );
          handleArgs(args, {
            eventId: SessionStateActionId.SetSelectionScope,
          });
        },
        updateCursorMenu: (
          // eslint-disable-next-line deprecation/deprecation
          cursorMenuData: CursorMenuData | CursorMenuPayload | undefined,
          args?: ActionArgs
        ) => {
          set((state) =>
            produce(state, (draft) => {
              // eslint-disable-next-line deprecation/deprecation
              // draft.session.cursorMenuData = cursorMenuData; // TODO: type check
              draft.session.cursorMenuPayload = cursorMenuData;
            })
          );
          handleArgs(args, {
            eventId: SessionStateActionId.UpdateCursorMenu,
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
