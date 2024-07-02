/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { UiFramework } from "@itwin/appui-react";

export const WidgetContentContext = React.createContext<{
  activeId: string | undefined;
  setActiveId: (id: string | undefined) => void;
}>({
  activeId: undefined,
  setActiveId: () => {},
});

/** Tracks the active content id when content view is rendered in the widgets. */
export function WidgetContentProvider(props: React.PropsWithChildren<{}>) {
  const [activeId, setActiveId] = React.useState<string | undefined>(undefined);
  React.useEffect(() => {
    return UiFramework.content.onActiveContentChangedEvent.addListener(() => {
      setActiveId(undefined);
    });
  }, []);
  return (
    <WidgetContentContext.Provider
      value={{
        activeId,
        setActiveId: React.useCallback((id) => {
          UiFramework.content.setActiveId(undefined);
          setActiveId(id);
        }, []),
      }}
    >
      {props.children}
    </WidgetContentContext.Provider>
  );
}
