/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import produce, { castDraft } from "immer";
import type { StoreApi, UseBoundStore } from "zustand";
import { create } from "zustand";
import {
  ConfigurableUiActionId,
  type ConfigurableUiState,
} from "../redux/ConfigurableUiState";
import { createFrameworkState } from "../redux/FrameworkState";
import type {
  CursorMenuData,
  CursorMenuPayload,
  PresentationSelectionScope,
} from "../redux/SessionState";
import { type SessionState, SessionStateActionId } from "../redux/SessionState";
import { SyncUiEventDispatcher } from "../syncui/SyncUiEventDispatcher";
import type { ViewState } from "@itwin/core-frontend";

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
  configurableUi: Omit<
    // eslint-disable-next-line deprecation/deprecation
    ConfigurableUiState,
    "theme" | "viewOverlayDisplay" | "toolPrompt"
  > & {
    setWidgetOpacity: (opacity: number, args?: ActionArgs) => void;
    setSnapMode: (snapMode: number, args?: ActionArgs) => void;
    setDragInteraction: (dragInteraction: boolean, args?: ActionArgs) => void;
    setShowWidgetIcon: (showWidgetIcon: boolean, args?: ActionArgs) => void;
    setAutoCollapseUnpinnedPanels: (
      autoCollapse: boolean,
      args?: ActionArgs
    ) => void;
    setAnimateToolSettings: (
      animateToolSettings: boolean,
      args?: ActionArgs
    ) => void;
    setUseToolAsToolSettingsLabel: (
      useToolAsToolSettingsLabel: boolean,
      args?: ActionArgs
    ) => void;
    setToolbarOpacity: (opacity: number, args?: ActionArgs) => void;
  };
  session: Omit<
    // eslint-disable-next-line deprecation/deprecation
    SessionState,
    "defaultViewState" | "iModelConnection" | "numItemsSelected"
  > & {
    defaultViewState: ViewState | undefined;
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
    setDefaultViewState: (
      viewState: ViewState | undefined,
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
      configurableUi: {
        ...initialState.configurableUiState,
        setWidgetOpacity: (opacity: number, args?: ActionArgs) => {
          const frameworkState = get();
          if (frameworkState.configurableUi.widgetOpacity === opacity) return;
          set((state) =>
            produce(state, (draft) => {
              draft.configurableUi.widgetOpacity = opacity;
            })
          );
          handleArgs(args, {
            eventId: ConfigurableUiActionId.SetWidgetOpacity,
          });
        },
        setSnapMode: (snapMode: number, args?: ActionArgs) => {
          const frameworkState = get();
          if (frameworkState.configurableUi.snapMode === snapMode) return;
          set((state) =>
            produce(state, (draft) => {
              draft.configurableUi.snapMode = snapMode;
            })
          );
          handleArgs(args, {
            eventId: ConfigurableUiActionId.SetSnapMode,
          });
        },
        setDragInteraction: (dragInteraction: boolean, args?: ActionArgs) => {
          const frameworkState = get();
          if (
            frameworkState.configurableUi.useDragInteraction === dragInteraction
          )
            return;
          set((state) =>
            produce(state, (draft) => {
              draft.configurableUi.useDragInteraction = dragInteraction;
            })
          );
          handleArgs(args, {
            eventId: ConfigurableUiActionId.SetDragInteraction,
          });
        },
        setShowWidgetIcon: (showWidgetIcon: boolean, args?: ActionArgs) => {
          const frameworkState = get();
          if (frameworkState.configurableUi.showWidgetIcon === showWidgetIcon)
            return;
          set((state) =>
            produce(state, (draft) => {
              draft.configurableUi.showWidgetIcon = showWidgetIcon;
            })
          );
          handleArgs(args, {
            eventId: ConfigurableUiActionId.SetShowWidgetIcon,
          });
        },
        setAutoCollapseUnpinnedPanels: (
          autoCollapse: boolean,
          args?: ActionArgs
        ) => {
          const frameworkState = get();
          if (
            frameworkState.configurableUi.autoCollapseUnpinnedPanels ===
            autoCollapse
          )
            return;
          set((state) =>
            produce(state, (draft) => {
              draft.configurableUi.autoCollapseUnpinnedPanels = autoCollapse;
            })
          );
          handleArgs(args, {
            eventId: ConfigurableUiActionId.AutoCollapseUnpinnedPanels,
          });
        },
        setAnimateToolSettings: (
          animateToolSettings: boolean,
          args?: ActionArgs
        ) => {
          const frameworkState = get();
          if (
            frameworkState.configurableUi.animateToolSettings ===
            animateToolSettings
          )
            return;
          set((state) =>
            produce(state, (draft) => {
              draft.configurableUi.animateToolSettings = animateToolSettings;
            })
          );
          handleArgs(args, {
            eventId: ConfigurableUiActionId.AnimateToolSettings,
          });
        },
        setUseToolAsToolSettingsLabel: (
          useToolAsToolSettingsLabel: boolean,
          args?: ActionArgs
        ) => {
          const frameworkState = get();
          if (
            frameworkState.configurableUi.useToolAsToolSettingsLabel ===
            useToolAsToolSettingsLabel
          )
            return;
          set((state) =>
            produce(state, (draft) => {
              draft.configurableUi.useToolAsToolSettingsLabel =
                useToolAsToolSettingsLabel;
            })
          );
          handleArgs(args, {
            eventId: ConfigurableUiActionId.UseToolAsToolSettingsLabel,
          });
        },
        setToolbarOpacity: (opacity: number, args?: ActionArgs) => {
          const frameworkState = get();
          if (frameworkState.configurableUi.toolbarOpacity === opacity) return;
          set((state) =>
            produce(state, (draft) => {
              draft.configurableUi.toolbarOpacity = opacity;
            })
          );
          handleArgs(args, {
            eventId: ConfigurableUiActionId.SetToolbarOpacity,
          });
        },
      },
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
        setDefaultViewState: (
          viewState: ViewState | undefined,
          args?: ActionArgs
        ) => {
          const frameworkState = get();
          if (frameworkState.session.defaultViewState === viewState) return;
          set((state) =>
            produce(state, (draft) => {
              draft.session.defaultViewState = castDraft(viewState);
            })
          );
          handleArgs(args, {
            eventId: SessionStateActionId.SetDefaultViewState,
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
