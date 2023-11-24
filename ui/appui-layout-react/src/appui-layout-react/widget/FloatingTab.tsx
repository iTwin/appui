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
import type { UseDragTabArgs } from "../base/DragManager";
import { useDragTab } from "../base/DragManager";
import {
  NineZoneDispatchContext,
  ShowWidgetIconContext,
} from "../base/NineZone";
import { useLayout } from "../base/LayoutStore";
import { usePreviewFeatures } from "../preview/PreviewFeatures";

/** Component that displays a floating tab.
 * @internal
 */
export function FloatingTab() {
  const { id, position } = useLayout((state) => {
    const draggedTab = state.draggedTab;
    return {
      id: draggedTab?.tabId,
      position: draggedTab?.position,
    };
  }, true);
  const { iconSpec, label } = useLayout((state) => {
    const tabId = state.draggedTab?.tabId;
    const tab = tabId ? state.tabs[tabId] : undefined;
    return {
      iconSpec: tab?.iconSpec,
      label: tab?.label,
    };
  }, true);

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

  const { changeActiveTabAfterDragDrop } = usePreviewFeatures();
  const onDragEnd = React.useCallback<NonNullable<UseDragTabArgs["onDragEnd"]>>(
    (target) => {
      id &&
        dispatch({
          type: "WIDGET_TAB_DRAG_END",
          id,
          target,
          isActiveTabPreview: changeActiveTabAfterDragDrop,
        });
    },
    [dispatch, id, changeActiveTabAfterDragDrop]
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
      {showWidgetIcon && iconSpec && <Icon iconSpec={iconSpec} />}
      <span>{label}</span>
    </div>
  );
}
