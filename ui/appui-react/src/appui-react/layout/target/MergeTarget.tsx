/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./MergeTarget.scss";
import classnames from "classnames";
import * as React from "react";
import { DraggedWidgetIdContext, useTarget } from "../base/DragManager";
import { CursorTypeContext, NineZoneDispatchContext } from "../base/NineZone";
import { getCursorClassName } from "../widget-panels/CursorOverlay";
import type { WidgetState } from "../state/WidgetState";
import type { WidgetDropTargetState } from "../state/DropTargetState";
import { useAllowedWidgetTarget } from "./useAllowedWidgetTarget";
import { useLayout } from "../base/LayoutStore";
import { WidgetDraggedOverContext } from "../widget/WidgetDraggedOverContext";
import { IsTabDraggedContext } from "../widget/IsTabDraggedContext";

/** @internal */
export interface MergeTargetProps {
  widgetId: WidgetState["id"];
}

/** @internal */
export function MergeTarget(props: MergeTargetProps) {
  const { widgetId } = props;
  const cursorType = React.useContext(CursorTypeContext);
  const draggedWidgetId = React.useContext(DraggedWidgetIdContext);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const draggedOver = React.useContext(WidgetDraggedOverContext);
  const draggedTab = useLayout((state) => !!state.draggedTab);
  const [ref, targeted] = useTarget<HTMLDivElement>(useTargetArgs(widgetId));
  const allowedTarget = useAllowedWidgetTarget(widgetId);
  // This state is used instead of the draggedOver context because tab bar or tab and merge
  // target are mutually exclusive but they set the same context value.
  const [isDraggedOver, setIsDraggedOver] = React.useState(false);
  const isTabDragged = React.useContext(IsTabDraggedContext);

  const hidden =
    !isTabDragged?.isDragged &&
    (!allowedTarget ||
      (!draggedTab && !draggedWidgetId) ||
      draggedWidgetId === widgetId);
  const className = classnames(
    "nz-target-mergeTarget",
    (targeted || isDraggedOver) && "nz-targeted",
    hidden && "nz-hidden",
    cursorType && getCursorClassName(cursorType)
  );
  return (
    <div
      className={className}
      ref={ref}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggedOver(true);
        draggedOver?.setTarget("widget");
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
          target: { widgetId, type: "widget" },
        });
      }}
    />
  );
}

function useTargetArgs(widgetId: WidgetState["id"]) {
  return React.useMemo<WidgetDropTargetState>(() => {
    return {
      type: "widget",
      widgetId,
    };
  }, [widgetId]);
}
