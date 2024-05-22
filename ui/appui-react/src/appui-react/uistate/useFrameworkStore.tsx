/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import type { Immutable } from "immer";
import produce from "immer";
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
    setToolPrompt: (toolPrompt: string, args?: ActionArgs) => void;
    setWidgetOpacity: (opacity: number, args?: ActionArgs) => void;
    setSnapMode: (snapMode: number, args?: ActionArgs) => void;
    setDragInteraction: (dragInteraction: boolean, args?: ActionArgs) => void;
    setShowWidgetIcon: (showWidgetIcon: boolean, args?: ActionArgs) => void;
    setAutoCollapseUnpinnedPanels: (
      autoCollapse: boolean,
      args?: ActionArgs
    ) => void;
    setViewOverlayDisplay: (
      displayViewOverlay: boolean,
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
              draft.configurableUi.theme = theme;
            })
          );
          handleArgs(args, {
            eventId: ConfigurableUiActionId.SetTheme,
          });
        },
        setToolPrompt: (toolPrompt, args) => {
          const frameworkState = get();
          if (frameworkState.configurableUi.toolPrompt === toolPrompt) return;
          set((state) =>
            produce(state, (draft) => {
              draft.configurableUi.theme = toolPrompt;
            })
          );
          handleArgs(args, {
            eventId: ConfigurableUiActionId.SetToolPrompt,
          });
        },
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
        setViewOverlayDisplay: (displayViewOverlay, args) => {
          const frameworkState = get();
          if (
            frameworkState.configurableUi.viewOverlayDisplay ===
            displayViewOverlay
          )
            return;
          set((state) =>
            produce(state, (draft) => {
              draft.configurableUi.viewOverlayDisplay = displayViewOverlay;
            })
          );
          handleArgs(args, {
            eventId: ConfigurableUiActionId.SetViewOverlayDisplay,
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
