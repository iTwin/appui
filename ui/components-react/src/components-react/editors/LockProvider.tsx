/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */

import * as React from "react";
import type { DialogItem } from "@itwin/appui-abstract";

/** @internal */
export const LockContext = React.createContext<{
  inlineLock: boolean;
  setInlineLock: (inlineLock: boolean) => void;
}>({
  inlineLock: false,
  setInlineLock: () => {},
});

/** @internal */
export function LockProvider({ children }: React.PropsWithChildren) {
  const [inlineLock, setInlineLock] = React.useState(false);
  return (
    <LockContext.Provider
      value={React.useMemo(
        () => ({
          inlineLock,
          setInlineLock,
        }),
        [inlineLock]
      )}
    >
      {children}
    </LockContext.Provider>
  );
}

/** @internal */
export const PropertyEditorContext = React.createContext<{
  dialogItem: DialogItem | undefined;
  isLock: boolean;
}>(null!);

type PropertyEditorContextType = React.ContextType<
  typeof PropertyEditorContext
>;

interface PropertyEditorProviderProps extends PropertyEditorContextType {
  children?: React.ReactNode;
}

/** @internal */
export function PropertyEditorProvider({
  children,
  dialogItem,
  isLock,
}: PropertyEditorProviderProps) {
  return (
    <PropertyEditorContext.Provider
      value={React.useMemo(
        () => ({
          dialogItem,
          isLock,
        }),
        [dialogItem, isLock]
      )}
    >
      {children}
    </PropertyEditorContext.Provider>
  );
}
