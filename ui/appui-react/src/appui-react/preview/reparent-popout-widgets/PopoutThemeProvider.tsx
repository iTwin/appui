/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./PopoutThemeProvider.scss";
import * as React from "react";
import { ThemeProvider } from "@itwin/itwinui-react";
import { TabIdContext } from "../../layout/widget/ContentRenderer";
import { useLayoutStore } from "../../layout/base/LayoutStore";
import {
  getTabLocation,
  isPopoutTabLocation,
} from "../../layout/state/TabLocation";
import { usePopoutsStore } from "./usePopoutsStore";

/** Theme provider is required to open floating/popover elements in a popout widget window (instead of a main window).
 * @note iTwinUI v2 `ThemeProvider` is not used because of https://github.com/iTwin/appui/issues/612
 * @internal
 */
export function PopoutThemeProvider({ children }: React.PropsWithChildren<{}>) {
  const tabId = React.useContext(TabIdContext);
  const layoutStore = useLayoutStore();
  const stateRef = React.useRef(layoutStore.getState());
  React.useEffect(
    () => layoutStore.subscribe((state) => (stateRef.current = state)),
    [layoutStore]
  );
  const popoutContainer = usePopoutsStore((state) => {
    if (!tabId) return undefined;
    const tabLocation = getTabLocation(stateRef.current, tabId);
    if (!tabLocation) return undefined;
    if (!isPopoutTabLocation(tabLocation)) return undefined;
    return state.popouts[tabLocation.popoutWidgetId];
  });
  return (
    <ThemeProvider
      portalContainer={popoutContainer ?? undefined}
      className="uifw-preview-reparentPopoutWidgets-popoutThemeProvider"
    >
      {children}
    </ThemeProvider>
  );
}
