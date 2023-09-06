/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import { useSpatialLayoutStore } from "./SpatialLayoutStore";
import type { Layout } from "../layout/Layout";

/** @internal */
export interface SpatialLayout extends Layout {
  setPanelSize: (size: number) => void;
}

/** @internal */
export function createSpatialLayout(): Layout {
  return useSpatialLayoutStore.getState().layout;
}
