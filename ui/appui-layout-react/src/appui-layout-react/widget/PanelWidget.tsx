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
import { useRefs } from "@itwin/core-react";

/** @internal */
export interface PanelWidgetProps {
  widgetId: WidgetState["id"];
  onBeforeTransition(): void;
  onPrepareTransition(): void;
  onTransitionEnd(): void;
  size: number | undefined;
  transition: "init" | "transition" | undefined;
}

/** @internal */
export const PanelWidget = React.forwardRef<HTMLDivElement, PanelWidgetProps>( // eslint-disable-line react/display-name
  function PanelWidget({
    widgetId,
    onBeforeTransition,
    onPrepareTransition,
    onTransitionEnd,
    size,
    transition,
  }, forwardedRef) { // eslint-disable-line @typescript-eslint/naming-convention
    const side = React.useContext(PanelSideContext)!;
    const panel = useLayout((state) => state.panels[side]);
    const widget = useLayout(React.useCallback((state) => {
      // Parent components are providing `side`, `widgetId`.
      // This is called before the context values are updated by parent components, hence `widgetId` can no longer be in an updated state.
      // Looks like a "Zombie child" problem, see: https://react-redux.js.org/api/hooks#stale-props-and-zombie-children
      const w = state.widgets[widgetId];
      if (!w) {
        console.log("PanelWidget:layout", widgetId, w);
      }
      return w;
    }, [widgetId]));
    if (!widget)
      console.log("PanelWidget", widgetId, widget);
    const horizontal = isHorizontalPanelSide(panel.side);
    const elementRef = React.useRef<HTMLDivElement>(null);
    const ref = useRefs(forwardedRef, elementRef);
    const mode = useMode(widgetId);
    const borders = useBorders(widgetId);
    const [prevMode, setPrevMode] = React.useState(mode);
    const lastOnPrepareTransition = React.useRef(onPrepareTransition);
    lastOnPrepareTransition.current = onPrepareTransition;
    if (prevMode !== mode) {
      onBeforeTransition();
      setPrevMode(mode);
    }
    React.useLayoutEffect(() => {
      lastOnPrepareTransition.current();
    }, [mode]);
    const onSave = React.useCallback(() => {
      onBeforeTransition();
    }, [onBeforeTransition]);
    const onRestore = React.useCallback(() => {
      onPrepareTransition();
    }, [onPrepareTransition]);
    useTabTransientState(widget?.activeTabId || "", onSave, onRestore);
    const style = React.useMemo<React.CSSProperties | undefined>(() => {
      if (size !== undefined) {
        return { flexBasis: size };
      } else if (mode === "fit") {
        return getMaxSize(horizontal, `${100 / panel.widgets.length}%`);
      }
      return undefined;
    }, [horizontal, size, mode, panel.widgets.length]);

    if (!widget)
      return null;
    const showTarget = panel.widgets.length !== 1;
    const className = classnames(
      "nz-widget-panelWidget",
      horizontal && "nz-horizontal",
      size === undefined && `nz-${mode}`,
      transition !== undefined && `nz-${transition}`,
      borders,
    );
    return (
      <WidgetProvider
        id={widget.id}
      >
        <Widget
          className={className}
          onTransitionEnd={onTransitionEnd}
          style={style}
          ref={ref}
        >
          <WidgetTabBar separator={isHorizontalPanelSide(panel.side) ? true : !widget.minimized} />
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
    if (!widget)
      return false;

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
  const panel = useLayout((state) => state.panels[side]);
  const widgets = useLayout((state) => state.widgets);
  const tabs = useLayout((state) => state.tabs);
  assert(!!panel);
  const fillWidget = findFillWidget(panel.widgets, widgets, tabs);

  // Force `fill` for last panel widget that is not minimized.
  if (!fillWidget) {
    for (let i = panel.widgets.length - 1; i >= 0; i--) {
      const wId = panel.widgets[i];
      const w = widgets[wId];
      assert(!!w);
      if (w.minimized)
        continue;
      if (wId === widgetId)
        return "fill";
      break;
    }
  }

  const widget = widgets[widgetId];
  if (!widget)
    return "fill";

  if (widget.minimized)
    return "minimized";
  const tabId = widget.activeTabId;
  const tab = tabs[tabId];
  return tab.preferredPanelWidgetSize ? "fit" : "fill";
}

/** @internal */
export function useBorders(widgetId: WidgetState["id"]) {
  const side = React.useContext(PanelSideContext)!;
  const panel = useLayout((state) => state.panels[side]);
  const panels = useLayout((state) => state.panels);
  const toolSettings = useLayout((state) => state.toolSettings);
  assert(!!panel);
  let top = true;
  let bottom = true;
  let left = true;
  let right = true;
  const isHorizontal = isHorizontalPanelSide(panel.side);
  const isVertical = !isHorizontal;
  const isFirst = panel.widgets[0] === widgetId;
  const isLast = panel.widgets[panel.widgets.length - 1] === widgetId;
  const isTopMostPanelBorder = panel.side === "top" ||
    (isVertical && !panels.top.span) ||
    (isVertical && panels.top.span && panels.top.collapsed) ||
    (isVertical && panels.top.widgets.length === 0);
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
}
