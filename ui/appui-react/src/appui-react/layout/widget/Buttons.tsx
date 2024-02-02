/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { assert } from "@itwin/core-bentley";
import * as React from "react";
import { useLayout } from "../base/LayoutStore";
import {
  isHorizontalPanelSide,
  PanelSideContext,
} from "../widget-panels/Panel";
import { Dock } from "./Dock";
import { useFloatingWidgetId, useWidgetAllowedToDock } from "./FloatingWidget";
import { PinToggle } from "./PinToggle";
import { PopoutToggle } from "./PopoutToggle";
import { PreviewHorizontalPanelAlignButton } from "./PreviewHorizontalPanelAlign";
import {
  PreviewMaximizeToggle,
  usePreviewMaximizedWidget,
} from "./PreviewMaximizeToggle";
import { SendBack } from "./SendBack";
import { useActiveTabId, WidgetIdContext } from "./Widget";
/** @internal */
export function TabBarButtons() {
  const { enabled: previewEnableMaximizedFloatingWidget, maximizedWidget } =
    usePreviewMaximizedWidget();
  const isToolSettings = useIsToolSettingsTab();
  const floatingWidgetId = useFloatingWidgetId();
  const canBeDocked = useWidgetAllowedToDock();

  const isMainPanelWidget = useIsMainPanelWidget();
  const tabId = useActiveTabId();
  const canPopout = useLayout((state) => {
    const tab = state.tabs[tabId];
    return tab.canPopout;
  });
  // istanbul ignore next (preview)
  const isMaximized =
    maximizedWidget === floatingWidgetId &&
    previewEnableMaximizedFloatingWidget;
  return (
    <div className="nz-widget-tabBarButtons">
      {canPopout && <PopoutToggle />}
      {
        // istanbul ignore next (preview)
        previewEnableMaximizedFloatingWidget &&
          !isToolSettings &&
          floatingWidgetId && <PreviewMaximizeToggle />
      }
      {!isMaximized && floatingWidgetId && !isToolSettings && canBeDocked && (
        <SendBack />
      )}
      {isToolSettings && <Dock />}
      {isMainPanelWidget && <PreviewHorizontalPanelAlignButton />}
      {isMainPanelWidget && <PinToggle />}
    </div>
  );
}

function useIsToolSettingsTab() {
  const activeTabId = useActiveTabId();
  const toolSettingsTabId = useLayout((state) => state.toolSettings?.tabId);
  return activeTabId === toolSettingsTabId;
}

/** @internal */
export function useIsMainPanelWidget() {
  const side = React.useContext(PanelSideContext);
  const widgetId = React.useContext(WidgetIdContext);
  return useLayout((state) => {
    const widgets = side ? state.panels[side].widgets : undefined;
    if (!widgets) return false;
    assert(!!side);
    const mainWidget = isHorizontalPanelSide(side)
      ? widgets[widgets.length - 1]
      : widgets[0];
    return mainWidget === widgetId;
  });
}
