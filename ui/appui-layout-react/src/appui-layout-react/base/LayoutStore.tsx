/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import { assert } from "@itwin/core-bentley";
import * as React from "react";
import { createNineZoneState, NineZoneState } from "../state/NineZoneState";
import { createStore, Store, useStoreData } from "./Store";

/** @internal */
export type LayoutStore = Store<NineZoneState>;

/** @internal */
export const LayoutStoreContext = React.createContext<LayoutStore | undefined>(undefined);
LayoutStoreContext.displayName = "appui:LayoutStoreContext";

/** @internal */
export function createLayoutStore(args?: Partial<NineZoneState>) {
  return createStore(createNineZoneState(args));
}

/** @internal */
export function useLayoutStore() {
  const store = React.useContext(LayoutStoreContext);
  assert(!!store, "LayoutStoreContext not found");
  return store;
}

/** @internal */
export function useLayout<SelectorOutput>(selector: (state: NineZoneState) => SelectorOutput) {
  const store = useLayoutStore();
  return useStoreData(store, selector);
}
