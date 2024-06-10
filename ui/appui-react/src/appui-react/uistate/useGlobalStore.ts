/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import type { IModelConnection, ViewState } from "@itwin/core-frontend";
import { createStore } from "zustand";
import type { CursorMenuPayload } from "../redux/SessionState";

interface GlobalState {
  numItemsSelected: number;
  iModelConnection: IModelConnection | undefined;
  viewState: ViewState | undefined;
  cursorMenuPayload: CursorMenuPayload | undefined;
}

/** Replacement for static APIs that were dependent on redux store.
 * @internal
 */
export const useGlobalStore = createStore<GlobalState>(() => ({
  numItemsSelected: 0,
  iModelConnection: undefined,
  viewState: undefined,
  cursorMenuPayload: undefined,
}));
