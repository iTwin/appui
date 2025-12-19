/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { StateCreator } from "zustand";
import { createStore, useStore } from "zustand";
import { useSafeContext } from "../hooks/useSafeContext.js";
import { isDynamicPanel, type Panel } from "./Panel.js";
import { UiItemsManager } from "../ui-items-provider/UiItemsManager.js";
import { useActiveFrontstageDef } from "../frontstage/FrontstageDef.js";
import { produce } from "immer";

/** @internal */
export type DynamicPanel = Extract<Panel, { type: "dynamic" }>;

/** @internal */
export type DynamicPanelPlacement = Extract<
  DynamicPanel["placement"],
  "left" | "right"
>;

interface OpenPanelArgs {
  id: string;
}

type ClosePanelArgs =
  | {
      id: string;
    }
  | {
      type: "dynamic";
      placement: "left" | "right";
    };

/** @internal */
export interface PanelsState {
  panels: Panel[];
  setPanels: (panels: Panel[]) => void;
  dynamic: {
    left: DynamicPanelSlice;
    right: DynamicPanelSlice;
  };
  open: (args: OpenPanelArgs) => void;
  close: (args: ClosePanelArgs) => void;
}

/** @internal */
export interface DynamicPanelSlice {
  active: DynamicPanel | undefined;
  open: (id: Panel["id"]) => void;
  close: () => void;
}

const createDynamicPanelSlice =
  (
    side: "left" | "right"
  ): StateCreator<PanelsState, [], [], DynamicPanelSlice> =>
  (set) => ({
    active: undefined,
    open: (id: Panel["id"]) => {
      set((state) =>
        produce(state, (draft) => {
          const panel = draft.panels.find((p) => p.id === id);
          if (!panel) return;

          if (isDynamicPanel(panel)) {
            draft.dynamic[side].active = panel;
          }
        })
      );
    },
    close: () => {
      set((state) =>
        produce(state, (draft) => {
          draft.dynamic[side].active = undefined;
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
      dynamic: {
        left: createDynamicPanelSlice("left")(set, get, store),
        right: createDynamicPanelSlice("right")(set, get, store),
      },
      open: (args) => {
        set((state) =>
          produce(state, (draft) => {
            const panel = draft.panels.find((p) => p.id === args.id);
            if (!panel) return;
            if (!isDynamicPanel(panel)) return;
            const placement = (() => {
              if (panel.placement === "left") return "left";
              if (panel.placement === "right") return "right";
              return "left";
            })();
            draft.dynamic[placement].active = panel;
          })
        );
      },
      close: (args) => {
        set((state) =>
          produce(state, (draft) => {
            if ("type" in args) {
              draft.dynamic[args.placement].active = undefined;
              return;
            }

            const placements = ["left", "right"] as const;
            for (const placement of placements) {
              const slice = draft.dynamic[placement];
              const panel = slice.active;
              if (!panel) continue;
              if (panel.id !== args.id) continue;

              slice.active = undefined;
            }
          })
        );
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
  React.useEffect(() => {
    if (!frontstageDef) return;
    return store.subscribe((state, prevState) => {
      const placements = ["left", "right"] as const;
      for (const placement of placements) {
        const prevOpen = prevState.dynamic[placement].active?.id;
        const currOpen = state.dynamic[placement].active?.id;
        if (prevOpen === currOpen) continue;
        prevOpen &&
          frontstageDef.panels.onPanelOpenChanged.raiseEvent({
            id: prevOpen,
            open: false,
          });
        currOpen &&
          frontstageDef.panels.onPanelOpenChanged.raiseEvent({
            id: currOpen,
            open: true,
          });
      }
    });
  }, [frontstageDef, store]);
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
