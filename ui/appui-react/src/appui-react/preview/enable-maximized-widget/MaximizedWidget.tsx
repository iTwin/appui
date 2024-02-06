/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";

/** Maximized widget feature state.
 * @internal
 */
export function useMaximizedWidget() {
  return React.useContext(MaximizedWidgetContext);
}

interface MaximizedWidgetState {
  enabled: boolean | undefined;
  maximizedWidget: string | undefined;
  setMaximizedWidget: (id: string | undefined) => void;
}

/** Context containing configuration and state for maximized widget feature. */
const MaximizedWidgetContext = React.createContext<MaximizedWidgetState>({
  enabled: false,
  maximizedWidget: undefined,
  setMaximizedWidget: () => {},
});

interface MaximizedWidgetProviderProps {
  enabled?: boolean;
  children?: React.ReactNode;
}

/** Maximized widget feature provider.
 * @internal
 */
export function MaximizedWidgetProvider({
  enabled,
  children,
}: MaximizedWidgetProviderProps) {
  const [maximizedWidget, setMaximizedWidget] = React.useState<
    string | undefined
  >(undefined);
  return (
    <MaximizedWidgetContext.Provider
      value={{ enabled, maximizedWidget, setMaximizedWidget }}
    >
      {children}
    </MaximizedWidgetContext.Provider>
  );
}
