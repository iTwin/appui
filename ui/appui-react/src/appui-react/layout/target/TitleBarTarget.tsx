/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./TitleBarTarget.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { DraggedWidgetIdContext, useTarget } from "../base/DragManager.js";
import { CursorTypeContext } from "../base/NineZone.js";
import { getCursorClassName } from "../widget-panels/CursorOverlay.js";
import type { WidgetState } from "../state/WidgetState.js";
import { WidgetIdContext } from "../widget/Widget.js";
import { TabOutline } from "../outline/TabOutline.js";
import { useAllowedWidgetTarget } from "./useAllowedWidgetTarget.js";
import type { WidgetDropTargetState } from "../state/DropTargetState.js";
import { useLayout } from "../base/LayoutStore.js";
import { useSendBackHomeState } from "../widget/SendBack.js";

/** @internal */
export function TitleBarTarget() {
  const cursorType = React.useContext(CursorTypeContext);
  const draggedWidgetId = React.useContext(DraggedWidgetIdContext);
  const widgetId = React.useContext(WidgetIdContext);
  const activeHomeState = useSendBackHomeState();
  assert(!!widgetId);
  const draggedTab = useLayout((state) => !!state.draggedTab);
  const [ref] = useTarget<HTMLDivElement>(useTargetArgs(widgetId));
  const allowedTarget = useAllowedWidgetTarget(widgetId);

  const hidden =
    !allowedTarget ||
    (((!draggedTab && !draggedWidgetId) || draggedWidgetId === widgetId) &&
      !(activeHomeState?.widgetId === widgetId));
  const className = classnames(
    "nz-target-titleBarTarget",
    hidden && "nz-hidden",
    cursorType && getCursorClassName(cursorType)
  );
  return (
    <div className={className} ref={ref}>
      <TabOutline />
    </div>
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
