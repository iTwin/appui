/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Viewer } from "cesium";
import { create } from "zustand";

export const useAppStore = create<{
  viewer: Viewer | undefined;
}>(() => ({
  viewer: undefined,
}));
