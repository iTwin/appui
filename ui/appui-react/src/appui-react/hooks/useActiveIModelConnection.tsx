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

/** React hook that maintains the active IModelConnection. For this hook to work properly the
 * IModelConnection must be set using {@link UiFramework.setIModelConnection} method.
 * @public
 */
export function useActiveIModelConnection(): IModelConnection | undefined {
  const [activeConnection, setActiveConnection] = React.useState(() =>
    UiFramework.getIModelConnection()
  );
  React.useEffect(() => {
    UiFramework.onIModelConnectionChanged.addListener((newConnection) => {
      setActiveConnection(newConnection);
    });
  }, []);
  return activeConnection;
}
