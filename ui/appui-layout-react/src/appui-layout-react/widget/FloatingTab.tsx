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
import { Icon } from "@itwin/core-react";
import { useDragTab, UseDragTabArgs } from "../base/DragManager";
import { NineZoneDispatchContext, ShowWidgetIconContext } from "../base/NineZone";
import { useLayout } from "../base/LayoutStore";

/** Component that displays a floating tab.
 * @internal
 */
export function FloatingTab() {
  const draggedTab = useLayout((state) => state.draggedTab);
  const tabs = useLayout((state) => state.tabs);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const id = draggedTab?.tabId;
  const tab = id ? tabs[id] : undefined;
  const onDrag = React.useCallback<NonNullable<UseDragTabArgs["onDrag"]>>((dragBy) => {
    id && dispatch({
      type: "WIDGET_TAB_DRAG",
      dragBy,
    });
  }, [dispatch, id]);
  const onDragEnd = React.useCallback<NonNullable<UseDragTabArgs["onDragEnd"]>>((target) => {
    id && dispatch({
      type: "WIDGET_TAB_DRAG_END",
      id,
      target,
    });
  }, [dispatch, id]);
  useDragTab({
    tabId: id || "",
    onDrag,
    onDragEnd,
  });
  const showWidgetIcon = React.useContext(ShowWidgetIconContext);
  const style = draggedTab && {
    transform: `translate(${draggedTab.position.x}px, ${draggedTab.position.y}px)`,
  };
  const className = classnames(
    "nz-widget-floatingTab",
    !draggedTab && "nz-hidden",
  );
  return (
    <div
      className={className}
      style={style}
    >
      {showWidgetIcon && tab && tab.iconSpec && <Icon iconSpec={tab.iconSpec} />}
      <span>{tab && tab.label}</span>
    </div>
  );
}
