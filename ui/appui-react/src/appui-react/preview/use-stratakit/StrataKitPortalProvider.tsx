/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { useStrataKitModules } from "./useStrataKitModules.js";

interface StrataKitPortalProviderProps {
  children?: React.ReactNode;
  container: HTMLElement | null;
}

/** @internal */
export function StrataKitPortalProvider(props: StrataKitPortalProviderProps) {
  const { container, children } = props;
  const modules = useStrataKitModules();

  if (!modules) {
    return <>{children}</>;
  }

  const { PortalProvider } = modules["@stratakit/mui"];

  return <PortalProvider container={container}>{children}</PortalProvider>;
}
