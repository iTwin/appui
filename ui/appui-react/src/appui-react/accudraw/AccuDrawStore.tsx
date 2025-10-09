/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { create } from "zustand";

interface AccuDrawStore {
  is3d: boolean;
}

/** @internal */
export const useAccuDrawStore = create<AccuDrawStore>(() => ({ is3d: false }));
