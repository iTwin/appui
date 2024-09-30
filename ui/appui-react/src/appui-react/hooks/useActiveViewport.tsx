/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Hooks
 */

import { useSyncExternalStore } from "react";
import type { ScreenViewport } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";

const subscribe = (onStoreChange: () => void) => {
  return IModelApp.viewManager.onSelectedViewportChanged.addListener(
    onStoreChange
  );
};

const getSnapshot = () => {
  return IModelApp.viewManager.selectedView;
};

/** React hook that maintains the active viewport.
 * @public
 */
export function useActiveViewport(): ScreenViewport | undefined {
  const activeViewport = useSyncExternalStore(subscribe, getSnapshot);
  return activeViewport;
}
