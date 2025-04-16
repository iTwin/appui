/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Hooks
 */

import { useSyncExternalStore } from "react";
import { IModelApp } from "@itwin/core-frontend";
import type { InteractiveTool } from "@itwin/core-frontend";

const subscribe = (onStoreChange: () => void) => {
  return IModelApp.toolAdmin.activeToolChanged.addListener(onStoreChange);
};

const getSnapshot = () => {
  return IModelApp.toolAdmin.activeTool;
};

/** React hook that maintains the active tool.
 * @internal
 */
export function useActiveTool(): InteractiveTool | undefined {
  const activeTool = useSyncExternalStore(subscribe, getSnapshot);
  return activeTool;
}
