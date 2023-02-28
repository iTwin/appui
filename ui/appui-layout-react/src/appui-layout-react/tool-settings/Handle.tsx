/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */

import "./Handle.scss";
import classnames from "classnames";
import * as React from "react";
import { CommonProps, Point, useRefs, useResizeObserver } from "@itwin/core-react";
import { useDragToolSettings } from "../base/DragManager";
import { getUniqueId, NineZoneDispatchContext, useLabel } from "../base/NineZone";
import { useDrag } from "../widget/TabBar";

/** Properties of [[DockedToolSettingsHandle]] component.
 * @internal
 */
export interface DockedToolSettingsHandleProps extends CommonProps {
  onResize?: (w: number) => void;
}

/** Component that displays tool settings as a bar across the top of the content view.
 * @internal
 */
export function DockedToolSettingsHandle(props: DockedToolSettingsHandleProps) {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const resizeObserverRef = useResizeObserver<HTMLDivElement>(props.onResize);
  const newFloatingWidgetId = React.useMemo(() => getUniqueId(), []);
  const onDragStart = useDragToolSettings({ newFloatingWidgetId });
  const handleDragStart = React.useCallback((initialPointerPosition: Point) => {
    onDragStart({
      initialPointerPosition,
      pointerPosition: initialPointerPosition,
    });
    dispatch({
      type: "TOOL_SETTINGS_DRAG_START",
      newFloatingWidgetId,
    });
  }, [dispatch, newFloatingWidgetId, onDragStart]);
  const dragRef = useDrag(handleDragStart);
  const refs = useRefs(dragRef, resizeObserverRef);
  const title = useLabel("toolSettingsHandleTitle");
  const className = classnames(
    "nz-toolSettings-handle",
    props.className,
  );

  return (
    <div className={className} ref={refs} style={props.style} title={title}>
      <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="var(--iui-color-icon-muted, currentColor)"
      >
        <path d="M7 4a1 1 0 11-2 0 1 1 0 012 0zM6 7a1 1 0 100 2 1 1 0 000-2zm0 4a1 1 0 100 2 1 1 0 000-2zm5-7a1 1 0 11-2 0 1 1 0 012 0zm-1 3a1 1 0 100 2 1 1 0 000-2zm0 4a1 1 0 100 2 1 1 0 000-2z" />
      </svg>
    </div>
  );
}
