/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Common
 */

import type { IModelConnection } from "@itwin/core-frontend";
import * as React from "react";

const IModelConnectionContext = React.createContext<
  IModelConnection | undefined
>(undefined);

/**
 * Provides `IModelConnection` to the components wrapped by the provider.
 * @public
 */
export function IModelConnectionProvider({
  iModelConnection,
  children,
}: React.PropsWithChildren<{ iModelConnection?: IModelConnection }>) {
  return (
    <IModelConnectionContext.Provider value={iModelConnection}>
      {children}
    </IModelConnectionContext.Provider>
  );
}

/**
 * @internal
 */
export function useIModelConnection() {
  return React.useContext(IModelConnectionContext);
}
