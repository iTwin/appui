/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { BeEvent } from "@itwin/core-bentley";

export interface TestProviderState {
  hideCustomDialogButton: boolean;
  showCustomViewOverlay: boolean;
  allow3dManipulations: boolean;
}

const initialState = {
  hideCustomDialogButton: false,
  showCustomViewOverlay: false,
  allow3dManipulations: true,
} as TestProviderState;

// TODO: use `zustand` instead.
function createStore() {
  const state = initialState;
  const onChanged = new BeEvent();
  return {
    state,
    onChanged,
    setHideCustomDialogButton: (hide: boolean) => {
      state.hideCustomDialogButton = hide;
      onChanged.raiseEvent();
    },
    setShowCustomViewOverlay: (show: boolean) => {
      state.showCustomViewOverlay = show;
      onChanged.raiseEvent();
    },
    setAllow3dManipulations: (allow: boolean) => {
      state.allow3dManipulations = allow;
      onChanged.raiseEvent();
    },
  };
}

export const store = createStore();
