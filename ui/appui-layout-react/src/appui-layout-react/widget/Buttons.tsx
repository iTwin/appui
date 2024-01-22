/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { SendBack } from "./SendBack";
import { useActiveTabId, WidgetIdContext } from "./Widget";
import { Dock } from "./Dock";
import {
  isHorizontalPanelSide,
  PanelSideContext,
} from "../widget-panels/Panel";
import { PinToggle } from "./PinToggle";
import { PopoutToggle } from "./PopoutToggle";
import { useLayout } from "../base/LayoutStore";
import { useFloatingWidgetId, useWidgetAllowedToDock } from "./FloatingWidget";
import {
  PreviewMaximizeToggle,
  usePreviewMaximizedWidget,
} from "./PreviewMaximizeToggle";
import { usePreviewFeatures } from "../preview/PreviewFeatures";
import { MenuButton } from "../preview/widget-visibility/MenuButton";

/** @internal */
export function TabBarButtons() {
  const { enabled: previewEnableMaximizedFloatingWidget, maximizedWidget } =
    usePreviewMaximizedWidget();
  const isToolSettings = useIsToolSettingsTab();
  const floatingWidgetId = useFloatingWidgetId();
  const canBeDocked = useWidgetAllowedToDock();
  const { controlWidgetVisibility } = usePreviewFeatures();

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
      {isMainPanelWidget && <PinToggle />}
      {controlWidgetVisibility && <MenuButton />}
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
