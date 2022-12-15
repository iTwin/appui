/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import { assert } from "@itwin/core-bentley";
import * as React from "react";
import { createStore, StoreApi, useStore } from "zustand";
import shallow from "zustand/shallow";
import { createNineZoneState, NineZoneState } from "../state/NineZoneState";

/** @internal */
export type LayoutState = NineZoneState;

/** @internal */
export type LayoutStore = StoreApi<NineZoneState>;

/** @internal */
export const LayoutStoreContext = React.createContext<LayoutStore | undefined>(undefined);
LayoutStoreContext.displayName = "appui:LayoutStoreContext";

/** @internal */
export function createLayoutStore(args?: Partial<LayoutState>): LayoutStore {
  return createStore<LayoutState>(() => createNineZoneState(args));
}

/** @internal */
export function useLayoutStore() {
  const store = React.useContext(LayoutStoreContext);
  assert(!!store, "LayoutStoreContext is not defined");
  return store;
}

/** @internal */
export function useLayout<SelectorOutput>(selector: (state: LayoutState) => SelectorOutput, multipleSlices: boolean = false) {
  const store = useLayoutStore();
  return useStore(store, selector, multipleSlices ? shallow : undefined);
}
