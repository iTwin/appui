/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { useStrataKitModules } from "./useStrataKitModules.js";

interface StrataKitPortalProviderProps {
  children?: React.ReactNode;
  modules: NonNullable<ReturnType<typeof useStrataKitModules>>;
  container: HTMLElement | null;
}

/** @internal */
export function StrataKitPortalProvider(props: StrataKitPortalProviderProps) {
  const { modules, container, children: childrenProp } = props;

  const { PortalContext } = modules["@stratakit/foundations"];
  const { RootContext } = modules["@stratakit/foundations/secret-internals"];
  const { portalProvider } = React.useContext(RootContext);

  const children = React.useMemo(() => {
    if (!portalProvider) {
      return <>{childrenProp}</>;
    }

    return React.cloneElement(
      portalProvider as React.ReactElement<React.PropsWithChildren>,
      { children: childrenProp }
    );
  }, [portalProvider, childrenProp]);

  return (
    <PortalContext.Provider value={{ container }}>
      {children}
    </PortalContext.Provider>
  );
}
