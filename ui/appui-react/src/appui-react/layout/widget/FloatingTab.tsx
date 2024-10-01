/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./FloatingTab.scss";
import classnames from "classnames";
import * as React from "react";
import type { UseDragTabArgs } from "../base/DragManager.js";
import { useDragTab } from "../base/DragManager.js";
import {
  NineZoneDispatchContext,
  ShowWidgetIconContext,
  TabNodeContext,
} from "../base/NineZone.js";
import { useLayout } from "../base/LayoutStore.js";
import { TabIdContext } from "./ContentRenderer.js";

interface FloatingTabProps {
  icon?: React.ReactNode;
}

/** @internal */
export function FloatingTabProvider() {
  const tabNode = React.useContext(TabNodeContext);
  const id = useLayout((state) => {
    const draggedTab = state.draggedTab;
    return draggedTab?.tabId;
  });
  if (!id) return null;
  return <TabIdContext.Provider value={id}>{tabNode}</TabIdContext.Provider>;
}

/** Component that displays a floating tab.
 * @internal
 */
export function FloatingTab({ icon }: FloatingTabProps) {
  const { id, position } = useLayout((state) => {
    const draggedTab = state.draggedTab;
    return {
      id: draggedTab?.tabId,
      position: draggedTab?.position,
    };
  }, true);
  const label = useLayout((state) => {
    const tabId = state.draggedTab?.tabId;
    const tab = tabId ? state.tabs[tabId] : undefined;
    return tab?.label;
  });

  const dispatch = React.useContext(NineZoneDispatchContext);
  const onDrag = React.useCallback<NonNullable<UseDragTabArgs["onDrag"]>>(
    (dragBy) => {
      id &&
        dispatch({
          type: "WIDGET_TAB_DRAG",
          dragBy,
        });
    },
    [dispatch, id]
  );
  const onDragEnd = React.useCallback<NonNullable<UseDragTabArgs["onDragEnd"]>>(
    (target) => {
      id &&
        dispatch({
          type: "WIDGET_TAB_DRAG_END",
          id,
          target,
        });
    },
    [dispatch, id]
  );
  useDragTab({
    tabId: id || "",
    onDrag,
    onDragEnd,
  });
  const showWidgetIcon = React.useContext(ShowWidgetIconContext);
  const style = position && {
    transform: `translate(${position.x}px, ${position.y}px)`,
  };
  const className = classnames(
    "nz-widget-floatingTab",
    !position && "nz-hidden"
  );
  return (
    <div className={className} style={style}>
      {showWidgetIcon && icon}
      <span>{label}</span>
    </div>
  );
}
