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
  const removeListeners = [
    IModelApp.viewManager.onViewOpen.addListener(onStoreChange),
    IModelApp.viewManager.onViewClose.addListener(onStoreChange),
  ];
  return () => {
    removeListeners.forEach((remove) => remove());
  };
};

let lastViewports: ScreenViewport[] = [];
const getSnapshot = () => {
  const viewports = Array.from(IModelApp.viewManager);
  if (
    viewports.length === lastViewports.length &&
    viewports.every((vp, i) => vp === lastViewports[i])
  )
    return lastViewports;

  lastViewports = viewports;
  return viewports;
};

/** Returns all viewports of the `IModelApp.viewManager`.
 * @internal
 */
export function useViewports(): ScreenViewport[] {
  const viewports = useSyncExternalStore(subscribe, getSnapshot);
  return viewports;
}
