/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import { create } from "zustand";
import type { SpatialLayoutState } from "./SpatialLayoutState";

/** @internal */
export const useSpatialLayoutStore = create<SpatialLayoutState>(() => ({
  activeWidgetId: undefined,
}));
