/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./PanelWidget.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import type { WidgetState } from "../state/WidgetState.js";
import type { PanelSide } from "../widget-panels/PanelTypes.js";
import {
  isHorizontalPanelSide,
  PanelSideContext,
} from "../widget-panels/Panel.js";
import { WidgetContentContainer } from "./ContentContainer.js";
import { WidgetTabBar } from "./TabBar.js";
import { Widget, WidgetProvider } from "./Widget.js";
import { WidgetOutline } from "../outline/WidgetOutline.js";
import { WidgetTarget } from "../target/WidgetTarget.js";
import { isHorizontalPanelState } from "../state/PanelState.js";
import { useLayout } from "../base/LayoutStore.js";
import { getWidgetState } from "../state/internal/WidgetStateHelpers.js";
import type { NineZoneState } from "../state/NineZoneState.js";

/** @internal */
export interface PanelWidgetProps {
  widgetId: WidgetState["id"];
}

/** @internal */
export const PanelWidget = React.forwardRef<HTMLDivElement, PanelWidgetProps>(
  function PanelWidget({ widgetId }, ref) {
    const side = React.useContext(PanelSideContext);
    assert(!!side);
    const widgetsLength = useLayout((state) => {
      const panel = state.panels[side];
      return panel.widgets.length;
    });
    const minimized = useLayout((state) => {
      const widget = getWidgetState(state, widgetId);
      return widget.minimized;
    });
    const horizontal = isHorizontalPanelSide(side);
    const mode = useMode(widgetId);
    const borders = useBorders(widgetId);
    const showTarget = widgetsLength !== 1;
    const className = classnames(
      "nz-widget-panelWidget",
      horizontal && "nz-horizontal",
      `nz-${mode}`,
      borders
    );
    const content = React.useMemo(
      () => (
        <WidgetContentContainer>
          {showTarget && <WidgetTarget />}
          <WidgetOutline />
        </WidgetContentContainer>
      ),
      [showTarget]
    );
    return (
      <WidgetProvider id={widgetId}>
        <Widget className={className} ref={ref}>
          <WidgetTabBar
            separator={isHorizontalPanelSide(side) ? true : !minimized}
          />
          {content}
        </Widget>
      </WidgetProvider>
    );
  }
);

function findFillWidget(state: NineZoneState, side: PanelSide) {
  const panelWidgets = state.panels[side].widgets;
  return panelWidgets.find((widgetId) => {
    const widget = getWidgetState(state, widgetId);
    if (widget.minimized) return false;
    const tabId = widget.activeTabId;
    const tab = state.tabs[tabId];
    if (!tab.preferredPanelWidgetSize) return true;
    return false;
  });
}

/** @internal */
export function useMode(widgetId: string): "fit" | "fill" | "minimized" {
  const side = React.useContext(PanelSideContext);
  assert(!!side);
  return useLayout((state) => {
    const fillWidget = findFillWidget(state, side);

    // Force `fill` for last panel widget that is not minimized.
    if (!fillWidget) {
      const panel = state.panels[side];
      for (let i = panel.widgets.length - 1; i >= 0; i--) {
        const wId = panel.widgets[i];
        const w = getWidgetState(state, wId);
        if (w.minimized) continue;
        if (wId === widgetId) return "fill";
        break;
      }
    }

    const widget = getWidgetState(state, widgetId);
    if (widget.minimized) return "minimized";
    const tabId = widget.activeTabId;
    const tab = state.tabs[tabId];
    return tab.preferredPanelWidgetSize ? "fit" : "fill";
  });
}

/** @internal */
export function useBorders(widgetId: WidgetState["id"]) {
  const side = React.useContext(PanelSideContext);
  assert(!!side);
  return useLayout((state) => {
    const panels = state.panels;
    const panel = panels[side];
    const toolSettings = state.toolSettings;
    const isHorizontal = isHorizontalPanelSide(panel.side);
    const isVertical = !isHorizontal;
    const isFirst = panel.widgets[0] === widgetId;
    const isLast = panel.widgets[panel.widgets.length - 1] === widgetId;
    const isTopMostPanelBorder =
      panel.side === "top" ||
      (isVertical && !panels.top.span) ||
      (isVertical && panels.top.span && panels.top.collapsed) ||
      (isVertical && panels.top.widgets.length === 0);

    let top = true;
    let bottom = true;
    let left = true;
    let right = true;
    if (panel.side === "bottom") {
      bottom = false;
    }
    if (isVertical && isLast) {
      bottom = false;
    }
    if (isTopMostPanelBorder && toolSettings?.type === "docked") {
      top = false;
    }
    if (isVertical && !isFirst) {
      top = false;
    }
    if (
      isVertical &&
      panels.top.span &&
      !panels.top.collapsed &&
      panels.top.widgets.length > 0
    ) {
      top = false;
    }
    if (isHorizontal && !isFirst) {
      left = false;
    }
    if (
      isHorizontalPanelState(panel) &&
      !panel.span &&
      isFirst &&
      !panels.left.collapsed &&
      panels.left.widgets.length > 0
    ) {
      left = false;
    }
    if (
      isHorizontalPanelState(panel) &&
      !panel.span &&
      isLast &&
      !panels.right.collapsed &&
      panels.right.widgets.length > 0
    ) {
      right = false;
    }
    return {
      "nz-border-top": top,
      "nz-border-bottom": bottom,
      "nz-border-left": left,
      "nz-border-right": right,
    };
  }, true);
}
