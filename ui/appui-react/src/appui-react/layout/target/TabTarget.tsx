/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./TabTarget.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { DraggedWidgetIdContext, useTarget } from "../base/DragManager";
import { CursorTypeContext, NineZoneDispatchContext } from "../base/NineZone";
import { getCursorClassName } from "../widget-panels/CursorOverlay";
import type { WidgetState } from "../state/WidgetState";
import { WidgetIdContext } from "../widget/Widget";
import { TabIdContext } from "../widget/ContentRenderer";
import { useAllowedWidgetTarget } from "./useAllowedWidgetTarget";
import type { TabDropTargetState } from "../state/DropTargetState";
import { useLayout } from "../base/LayoutStore";
import { getWidgetState } from "../state/internal/WidgetStateHelpers";
import { WidgetDraggedOverContext } from "../widget/WidgetDraggedOverContext";
import { IsTabDraggedContext } from "../widget/IsTabDraggedContext";

/** @internal */
export function TabTarget() {
  const cursorType = React.useContext(CursorTypeContext);
  const draggedTab = useLayout((state) => !!state.draggedTab);
  const draggedWidgetId = React.useContext(DraggedWidgetIdContext);
  const widgetId = React.useContext(WidgetIdContext);
  const draggedOver = React.useContext(WidgetDraggedOverContext);
  const dispatch = React.useContext(NineZoneDispatchContext);
  assert(!!widgetId);
  const tabIndex = useTabIndex();
  // This state is used instead of the draggedOver context because tab and merge
  // target are mutually exclusive but they set the same context value.
  const [isDraggedOver, setIsDraggedOver] = React.useState(false);
  const isTabDragged = React.useContext(IsTabDraggedContext);
  const [ref, targeted] = useTarget<HTMLDivElement>(
    useTargetArgs(widgetId, tabIndex)
  );
  const allowedTarget = useAllowedWidgetTarget(widgetId);
  const hidden =
    !isTabDragged?.isDragged &&
    (!allowedTarget ||
      (!draggedTab && !draggedWidgetId) ||
      draggedWidgetId === widgetId);
  const className = classnames(
    "nz-target-tabTarget",
    hidden && "nz-hidden",
    (targeted || isDraggedOver) && "nz-targeted",
    cursorType && getCursorClassName(cursorType)
  );
  return (
    <div
      className={className}
      ref={ref}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggedOver(true);
        draggedOver?.setTarget("tab");
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDraggedOver(false);
        draggedOver?.setTarget(undefined);
      }}
      onDrop={(e) => {
        e.preventDefault();
        isTabDragged?.setIsDragged(false);
        setIsDraggedOver(false);
        draggedOver?.setTarget(undefined);
        const id = e.dataTransfer.getData("text/plain");
        dispatch({
          type: "WIDGET_TAB_DRAG_END_NEW",
          id,
          target: { type: "tab", widgetId, tabIndex },
        });
      }}
    />
  );
}

function useTabIndex() {
  const widgetId = React.useContext(WidgetIdContext);
  const tabId = React.useContext(TabIdContext);
  assert(!!widgetId);
  return useLayout((state) => {
    const widget = getWidgetState(state, widgetId);
    return widget.tabs.findIndex((id) => id === tabId);
  });
}

function useTargetArgs(widgetId: WidgetState["id"], tabIndex: number) {
  return React.useMemo<TabDropTargetState>(() => {
    return {
      type: "tab",
      widgetId,
      tabIndex,
    };
  }, [widgetId, tabIndex]);
}
