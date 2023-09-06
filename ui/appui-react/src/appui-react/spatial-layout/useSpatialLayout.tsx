/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import { useStore } from "zustand";
import { shallow } from "zustand/shallow";
import type { SpatialLayoutState } from "./SpatialLayoutStore";
import { useSpatialLayoutStore } from "./SpatialLayoutStore";

/** @internal */
export function useSpatialLayout<SelectorOutput>(
  selector: (state: SpatialLayoutState) => SelectorOutput,
  multipleSlices = false
) {
  return useStore(
    useSpatialLayoutStore,
    selector,
    multipleSlices ? shallow : undefined
  );
}
