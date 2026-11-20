/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { useStrataKitModules } from "./useStrataKitModules.js";

interface StrataKitPortalProviderProps {
  children?: React.ReactNode;
  /** Uses parent container if not provided. */
  container: HTMLElement | undefined;
}

/** @internal */
export function StrataKitPortalProvider(props: StrataKitPortalProviderProps) {
  const { container, children } = props;
  const modules = useStrataKitModules();

  if (!modules) {
    return <>{children}</>;
  }

  const { PortalProvider } = modules["@stratakit/mui"];

  return (
    <PortalContextConsumer modules={modules}>
      {(portalContext) => (
        <PortalProvider
          container={container ?? portalContext?.container ?? null}
        >
          {children}
        </PortalProvider>
      )}
    </PortalContextConsumer>
  );
}

type StrataKitModules = NonNullable<ReturnType<typeof useStrataKitModules>>;
type PortalContextValue = React.ContextType<
  StrataKitModules["@stratakit/foundations"]["PortalContext"]
>;

interface PortalContextConsumerProps {
  children: (value: PortalContextValue) => React.ReactNode;
  modules: StrataKitModules;
}

/**
 * Exposes `PortalContext` via render prop, since `useContext` can not be used conditionally.
 */
function PortalContextConsumer(props: PortalContextConsumerProps) {
  const { children, modules } = props;

  const { PortalContext } = modules["@stratakit/foundations"];
  const value = React.useContext(PortalContext);

  return <>{children(value)}</>;
}
