/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { StateCreator } from "zustand";
import { createStore, useStore } from "zustand";
import { useSafeContext } from "../hooks/useSafeContext.js";
import type { DynamicPanel } from "./Panel.js";
import { isDynamicPanel, type Panel } from "./Panel.js";
import { UiItemsManager } from "../ui-items-provider/UiItemsManager.js";
import { useActiveFrontstageDef } from "../frontstage/FrontstageDef.js";
import { produce } from "immer";

interface PanelsState {
  panels: Panel[];
  setPanels: (panels: Panel[]) => void;
  dynamic: {
    left: DynamicPanelSlice;
    right: DynamicPanelSlice;
  };
  open: (id: Panel["id"]) => void;
  close: (id: Panel["id"]) => void;
}

interface DynamicPanelSlice {
  activePanel: DynamicPanel | undefined;
  open: (id: Panel["id"]) => void;
  close: () => void;
}

const createDynamicPanelSlice =
  (
    side: "left" | "right"
  ): StateCreator<PanelsState, [], [], DynamicPanelSlice> =>
  (set) => ({
    activePanel: undefined,
    open: (id: Panel["id"]) => {
      set((state) =>
        produce(state, (draft) => {
          const panel = draft.panels.find((p) => p.id === id);
          if (!panel) return;

          if (isDynamicPanel(panel)) {
            draft.dynamic[side].activePanel = panel;
          }
        })
      );
    },
    close: () => {
      set((state) =>
        produce(state, (draft) => {
          draft.dynamic[side].activePanel = undefined;
        })
      );
    },
  });

/** @internal */
export function createPanelsStore(stateOverrides?: Partial<PanelsState>) {
  return createStore<PanelsState>((set, get, store) => {
    return {
      panels: [],
      setPanels: (panels: Panel[]) => set({ panels }),
      open: (id: Panel["id"]) => {
        set((state) =>
          produce(state, (draft) => {
            const panel = state.panels.find((p) => p.id === id);
            if (!panel) return;

            if (isDynamicPanel(panel)) {
              const placement = panel.placement;
              if (placement === "left") {
                draft.dynamic.left.activePanel = panel;
              }
            }
          })
        );
      },
      close: (id: Panel["id"]) => {
        set((state) =>
          produce(state, (draft) => {
            if (draft.dynamic.left.activePanel?.id === id) {
              draft.dynamic.left.activePanel = undefined;
            }
          })
        );
      },
      dynamic: {
        left: createDynamicPanelSlice("left")(set, get, store),
        right: createDynamicPanelSlice("right")(set, get, store),
      },
      ...stateOverrides,
    };
  });
}

const PanelsStoreContext = React.createContext<
  ReturnType<typeof createPanelsStore> | undefined
>(undefined);

/** @internal */
export function PanelsProvider(props: React.PropsWithChildren) {
  const frontstageDef = useActiveFrontstageDef();
  const [store] = React.useState(() => {
    const panels = frontstageDef
      ? [...UiItemsManager.getPanels(frontstageDef.id, frontstageDef.usage)]
      : undefined;
    return createPanelsStore({
      panels,
    });
  });
  const setPanels = useStore(store, (state) => state.setPanels);
  React.useEffect(() => {
    return UiItemsManager.onUiProviderRegisteredEvent.addListener(() => {
      if (!frontstageDef) return;
      const panels = UiItemsManager.getPanels(
        frontstageDef.id,
        frontstageDef.usage
      );
      setPanels([...panels]);
    });
  }, [frontstageDef, setPanels]);
  React.useEffect(() => {
    if (!frontstageDef) return;
    frontstageDef.setPanelsStore(store);
  }, [store, frontstageDef]);
  return (
    <PanelsStoreContext.Provider value={store}>
      {props.children}
    </PanelsStoreContext.Provider>
  );
}

/** @internal */
export function usePanelsStore<SelectorOutput>(
  selector: (state: PanelsState) => SelectorOutput
) {
  const store = useSafeContext(PanelsStoreContext);
  return useStore(store, selector);
}
