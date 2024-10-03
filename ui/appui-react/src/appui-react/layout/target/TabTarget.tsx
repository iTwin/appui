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
import { DraggedWidgetIdContext, useTarget } from "../base/DragManager.js";
import { CursorTypeContext } from "../base/NineZone.js";
import { getCursorClassName } from "../widget-panels/CursorOverlay.js";
import type { WidgetState } from "../state/WidgetState.js";
import { WidgetIdContext } from "../widget/Widget.js";
import { TabIdContext } from "../widget/ContentRenderer.js";
import { useAllowedWidgetTarget } from "./useAllowedWidgetTarget.js";
import type { TabDropTargetState } from "../state/DropTargetState.js";
import { useLayout } from "../base/LayoutStore.js";
import { getWidgetState } from "../state/internal/WidgetStateHelpers.js";

/** @internal */
export function TabTarget() {
  const cursorType = React.useContext(CursorTypeContext);
  const draggedTab = useLayout((state) => !!state.draggedTab);
  const draggedWidgetId = React.useContext(DraggedWidgetIdContext);
  const widgetId = React.useContext(WidgetIdContext);
  assert(!!widgetId);
  const tabIndex = useTabIndex();
  const [ref, targeted] = useTarget<HTMLDivElement>(
    useTargetArgs(widgetId, tabIndex)
  );
  const allowedTarget = useAllowedWidgetTarget(widgetId);
  const hidden =
    !allowedTarget ||
    (!draggedTab && !draggedWidgetId) ||
    draggedWidgetId === widgetId;
  const className = classnames(
    "nz-target-tabTarget",
    hidden && "nz-hidden",
    targeted && "nz-targeted",
    cursorType && getCursorClassName(cursorType)
  );
  return <div className={className} ref={ref} />;
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
