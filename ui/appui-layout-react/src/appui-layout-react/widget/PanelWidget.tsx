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
import { WidgetsState, WidgetState } from "../state/WidgetState";
import { isHorizontalPanelSide, PanelSideContext } from "../widget-panels/Panel";
import { WidgetContentContainer } from "./ContentContainer";
import { useTabTransientState } from "./ContentRenderer";
import { WidgetTabBar } from "./TabBar";
import { Widget, WidgetProvider } from "./Widget";
import { WidgetOutline } from "../outline/WidgetOutline";
import { WidgetTarget } from "../target/WidgetTarget";
import { isHorizontalPanelState } from "../state/PanelState";
import { TabsState } from "../state/TabState";
import { useLayout } from "../base/LayoutStore";
import { getWidgetState } from "../state/internal/WidgetStateHelpers";

/** @internal */
export interface PanelWidgetProps {
  widgetId: WidgetState["id"];
}

/** @internal */
export const PanelWidget = React.forwardRef<HTMLDivElement, PanelWidgetProps>( // eslint-disable-line react/display-name
  function PanelWidget({
    widgetId,
  }, ref) { // eslint-disable-line @typescript-eslint/naming-convention
    const side = React.useContext(PanelSideContext)!;
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
      borders,
    );
    return (
      <WidgetProvider
        id={widgetId}
      >
        <Widget
          className={className}
          ref={ref}
        >
          <WidgetTabBar separator={isHorizontalPanelSide(side) ? true : !minimized} />
          <WidgetContentContainer>
            {showTarget && <WidgetTarget />}
            <WidgetOutline />
          </WidgetContentContainer>
        </Widget>
      </WidgetProvider>
    );
  }
);

function getMaxSize(horizontal: boolean, size: string | number) {
  if (horizontal)
    return {
      maxWidth: size,
    };
  return {
    maxHeight: size,
  };
}

function findFillWidget(panelWidgets: ReadonlyArray<string>, widgets: WidgetsState, tabs: TabsState) {
  return panelWidgets.find((widgetId) => {
    const widget = widgets[widgetId];
    if (widget.minimized)
      return false;
    const tabId = widget.activeTabId;
    const tab = tabs[tabId];
    if (!tab.preferredPanelWidgetSize)
      return true;
    return false;
  });
}

/** @internal */
export function useMode(widgetId: string): "fit" | "fill" | "minimized" {
  const side = React.useContext(PanelSideContext)!;
  return useLayout((state) => {
    const panel = state.panels[side];
    const widgets = state.widgets;
    const tabs = state.tabs;

    const fillWidget = findFillWidget(panel.widgets, widgets, tabs);

    // Force `fill` for last panel widget that is not minimized.
    if (!fillWidget) {
      for (let i = panel.widgets.length - 1; i >= 0; i--) {
        const wId = panel.widgets[i];
        const w = widgets[wId];
        if (w.minimized)
          continue;
        if (wId === widgetId)
          return "fill";
        break;
      }
    }

    const widget = widgets[widgetId];
    if (widget.minimized)
      return "minimized";
    const tabId = widget.activeTabId;
    const tab = tabs[tabId];
    return tab.preferredPanelWidgetSize ? "fit" : "fill";
  });
}

/** @internal */
export function useBorders(widgetId: WidgetState["id"]) {
  const side = React.useContext(PanelSideContext)!;
  return useLayout((state) => {
    const panels = state.panels;
    const panel = panels[side];
    const toolSettings = state.toolSettings;
    const isHorizontal = isHorizontalPanelSide(panel.side);
    const isVertical = !isHorizontal;
    const isFirst = panel.widgets[0] === widgetId;
    const isLast = panel.widgets[panel.widgets.length - 1] === widgetId;
    const isTopMostPanelBorder = panel.side === "top" ||
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
    if (isTopMostPanelBorder && toolSettings.type === "docked") {
      top = false;
    }
    if (isVertical && !isFirst) {
      top = false;
    }
    if (isVertical && panels.top.span && !panels.top.collapsed && panels.top.widgets.length > 0) {
      top = false;
    }
    if (isHorizontal && !isFirst) {
      left = false;
    }
    if (isHorizontalPanelState(panel) && !panel.span && isFirst && !panels.left.collapsed && panels.left.widgets.length > 0) {
      left = false;
    }
    if (isHorizontalPanelState(panel) && !panel.span && isLast && !panels.right.collapsed && panels.right.widgets.length > 0) {
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
