/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { SendBack } from "./SendBack";
import { useActiveTabId, WidgetIdContext } from "./Widget";
import { Dock } from "./Dock";
import { isHorizontalPanelSide, PanelSideContext } from "../widget-panels/Panel";
import { PinToggle } from "./PinToggle";
import { PopoutToggle } from "./PopoutToggle";
import { toolSettingsTabId } from "../state/ToolSettingsState";
import { useLayout } from "../base/LayoutStore";
import { assert } from "@itwin/core-bentley";
import { useFloatingWidgetId } from "./FloatingWidget";

/** @internal */
export function TabBarButtons() {
  const isToolSettings = useIsToolSettingsTab();
  const floatingWidgetId = useFloatingWidgetId();
  const isMainPanelWidget = useIsMainPanelWidget();
  const tabId = useActiveTabId();
  const canPopout = useLayout((state) => {
    const tab = state.tabs[tabId];
    return tab.canPopout;
  });
  return (
    <div className="nz-widget-tabBarButtons">
      {canPopout && <PopoutToggle />}
      {floatingWidgetId && !isToolSettings && <SendBack />}
      {isToolSettings && <Dock />}
      {isMainPanelWidget && <PinToggle />}
    </div>
  );
}

function useIsToolSettingsTab() {
  const activeTabId = useActiveTabId();
  return activeTabId === toolSettingsTabId;
}

/** @internal */
export function useIsMainPanelWidget() {
  const side = React.useContext(PanelSideContext);
  const widgetId = React.useContext(WidgetIdContext);
  return useLayout((state) => {
    const widgets = side ? state.panels[side].widgets : undefined;
    if (!widgets)
      return false;
    assert(!!side);
    const mainWidget = isHorizontalPanelSide(side) ? widgets[widgets.length - 1] : widgets[0];
    return mainWidget === widgetId;
  });
}
