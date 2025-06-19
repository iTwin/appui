/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Hooks
 */

import * as React from "react";
import type { IModelConnection } from "@itwin/core-frontend";
import { UiFramework } from "../UiFramework.js";

const subscribe = (onStoreChange: () => void) => {
  return UiFramework.onIModelConnectionChanged.addListener(onStoreChange);
};

const getSnapshot = () => {
  return UiFramework.getIModelConnection();
};

/** React hook that maintains the active IModelConnection. For this hook to work properly the
 * IModelConnection must be set using {@link UiFramework.setIModelConnection} method.
 * @public
 */
export function useActiveIModelConnection(): IModelConnection | undefined {
  return React.useSyncExternalStore(subscribe, getSnapshot);
}
