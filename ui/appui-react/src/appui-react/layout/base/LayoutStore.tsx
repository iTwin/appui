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
import type { NineZoneState } from "../state/NineZoneState.js";
import { createNineZoneState } from "../state/NineZoneState.js";

/** @public */
export type LayoutState = NineZoneState;

/** @public */
export type LayoutStore = StoreApi<LayoutState>;

/** @public */
export const LayoutStoreContext = React.createContext<LayoutStore | undefined>(
  undefined
);
LayoutStoreContext.displayName = "appui:LayoutStoreContext";

/** @public */
export function createLayoutStore(args?: Partial<LayoutState>): LayoutStore {
  return createStore<LayoutState>(() => createNineZoneState(args));
}

/** @public */
export function useLayoutStore() {
  const store = React.useContext(LayoutStoreContext);
  assert(!!store, "LayoutStoreContext is not defined");
  return store;
}

/** @public */
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

const optionalLayoutStore = createStore<LayoutState | undefined>(
  () => undefined
);

/** @public */
export function useOptionalLayout<SelectorOutput>(
  selector: (state: LayoutState | undefined) => SelectorOutput,
  multipleSlices = false
) {
  const store = React.useContext(LayoutStoreContext);
  const slice = useStoreWithEqualityFn(
    store ?? optionalLayoutStore,
    selector,
    multipleSlices ? shallow : undefined
  );
  return slice;
}
