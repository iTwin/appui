/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */
import * as React from "react";
import { DraggedWidgetIdContext } from "../base/DragManager.js";
import { useLayout } from "../base/LayoutStore.js";
import type { NineZoneState } from "../state/NineZoneState.js";
import type { PanelSide } from "../widget-panels/PanelTypes.js";

/** Check the docking side against allowed regions
 * @internal
 */
export function useAllowedSideTarget(side: PanelSide) {
  const draggedWidgetId = React.useContext(DraggedWidgetIdContext);
  return useLayout((state) =>
    isAllowedSideTarget(state, draggedWidgetId, side)
  );
}

/** @internal */
export function isAllowedSideTarget(
  state: NineZoneState,
  draggedWidget: string | undefined,
  side: PanelSide
) {
  const draggedTab = state.draggedTab;
  const tabsState = state.tabs;
  const widgetsState = state.widgets;

  let allowedPanelTargets: ReadonlyArray<PanelSide> | undefined;
  if (draggedTab) {
    const tab = tabsState[draggedTab.tabId];
    allowedPanelTargets = tab.allowedPanelTargets;
  } else if (draggedWidget && draggedWidget in widgetsState) {
    // handle a case where DraggedWidgetIdContext exists, but dragged widget is not in WidgetsStateContent
    const widget = widgetsState[draggedWidget];
    const activeTabId = widget.activeTabId;
    const activeTab = tabsState[activeTabId];
    allowedPanelTargets = activeTab.allowedPanelTargets;
    widget.tabs.forEach((tabId) => {
      const tab = tabsState[tabId];
      if (!allowedPanelTargets) {
        allowedPanelTargets = tab.allowedPanelTargets;
      } else if (tab.allowedPanelTargets !== undefined) {
        const tabPanelTargets = tab.allowedPanelTargets;
        allowedPanelTargets = allowedPanelTargets.filter((x) =>
          tabPanelTargets.includes(x)
        );
      }
    });
  }
  if (allowedPanelTargets) {
    return allowedPanelTargets.includes(side);
  }
  return true;
}
