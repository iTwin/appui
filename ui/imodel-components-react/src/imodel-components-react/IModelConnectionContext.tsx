/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Common
 */

import type { IModelConnection } from "@itwin/core-frontend";
import * as React from "react";

interface IModelConnectionContext {
  imodel: IModelConnection | undefined;
}

const imodelConnectionContext = React.createContext<IModelConnectionContext>({
  imodel: undefined,
});

/**
 * Provides `IModelConnection` to the components delivered by this package.
 * @public
 */
export function IModelConnectionProvider({
  imodel,
  children,
}: React.PropsWithChildren<{ imodel: IModelConnection }>) {
  return (
    <imodelConnectionContext.Provider
      value={React.useMemo(() => ({ imodel }), [imodel])}
    >
      {children}
    </imodelConnectionContext.Provider>
  );
}

/**
 * @internal
 */
export function useIModelConnection(): IModelConnectionContext {
  return React.useContext(imodelConnectionContext);
}
