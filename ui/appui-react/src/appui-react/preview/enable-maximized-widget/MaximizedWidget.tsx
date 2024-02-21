/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";

interface MaximizedWidgetState {
  maximizedWidget: string | undefined;
  setMaximizedWidget: (id: string | undefined) => void;
}

/** Context containing configuration and state for maximized widget feature.
 * @internal
 */
export const MaximizedWidgetContext = React.createContext<MaximizedWidgetState>(
  {
    maximizedWidget: undefined,
    setMaximizedWidget: () => {},
  }
);

/** Maximized widget feature provider.
 * @internal
 */
export function MaximizedWidgetProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [maximizedWidget, setMaximizedWidget] = React.useState<
    string | undefined
  >(undefined);
  return (
    <MaximizedWidgetContext.Provider
      value={{ maximizedWidget, setMaximizedWidget }}
    >
      {children}
    </MaximizedWidgetContext.Provider>
  );
}
