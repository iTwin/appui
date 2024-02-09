/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import * as React from "react";
import type { StoreApi } from "zustand";
import { createStore } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { assert } from "@itwin/core-bentley";
import type { NineZoneState } from "../state/NineZoneState";
import { createNineZoneState } from "../state/NineZoneState";

/** @internal */
export type LayoutState = NineZoneState;

/** @internal */
export type LayoutStore = StoreApi<NineZoneState>;

/** @internal */
export const LayoutStoreContext = React.createContext<LayoutStore | undefined>(
  undefined
);
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
export function useLayout<SelectorOutput>(
  selector: (state: LayoutState) => SelectorOutput,
  multipleSlices = false
) {
  const store = useLayoutStore();
  return useStoreWithEqualityFn(
    store,
    selector,
    multipleSlices ? shallow : undefined
  );
}
