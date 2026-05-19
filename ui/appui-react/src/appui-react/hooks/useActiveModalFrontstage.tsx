/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Hooks
 */

import { useSyncExternalStore } from "react";
import { UiFramework } from "../UiFramework.js";

const subscribe = (onStoreChange: () => void) => {
  return UiFramework.frontstages.onModalFrontstageChangedEvent.addListener(
    onStoreChange
  );
};

const getSnapshot = () => {
  return UiFramework.frontstages.activeModalFrontstage;
};

/** React hook that returns the active modal frontstage.
 * @internal
 */
export function useActiveModalFrontstage() {
  const frontstage = useSyncExternalStore(subscribe, getSnapshot);
  return frontstage;
}
