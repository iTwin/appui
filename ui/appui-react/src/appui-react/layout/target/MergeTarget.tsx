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
import { DraggedWidgetIdContext, useTarget } from "../base/DragManager.js";
import { CursorTypeContext } from "../base/NineZone.js";
import { getCursorClassName } from "../widget-panels/CursorOverlay.js";
import type { WidgetState } from "../state/WidgetState.js";
import type { WidgetDropTargetState } from "../state/DropTargetState.js";
import { useAllowedWidgetTarget } from "./useAllowedWidgetTarget.js";
import { useLayout } from "../base/LayoutStore.js";

/** @internal */
export interface MergeTargetProps {
  widgetId: WidgetState["id"];
}

/** @internal */
export function MergeTarget(props: MergeTargetProps) {
  const { widgetId } = props;
  const cursorType = React.useContext(CursorTypeContext);
  const draggedWidgetId = React.useContext(DraggedWidgetIdContext);
  const draggedTab = useLayout((state) => !!state.draggedTab);
  const [ref, targeted] = useTarget<HTMLDivElement>(useTargetArgs(widgetId));
  const allowedTarget = useAllowedWidgetTarget(widgetId);
  const hidden =
    !allowedTarget ||
    (!draggedTab && !draggedWidgetId) ||
    draggedWidgetId === widgetId;
  const className = classnames(
    "nz-target-mergeTarget",
    targeted && "nz-targeted",
    hidden && "nz-hidden",
    cursorType && getCursorClassName(cursorType)
  );
  return <div className={className} ref={ref} />;
}

function useTargetArgs(widgetId: WidgetState["id"]) {
  return React.useMemo<WidgetDropTargetState>(() => {
    return {
      type: "widget",
      widgetId,
    };
  }, [widgetId]);
}
