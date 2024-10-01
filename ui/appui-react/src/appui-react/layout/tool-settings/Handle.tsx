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
import type { CommonProps, Point } from "@itwin/core-react";
import { useRefs, useResizeObserver } from "@itwin/core-react";
import { useDragToolSettings } from "../base/DragManager.js";
import {
  getUniqueId,
  NineZoneDispatchContext,
  useLabel,
} from "../base/NineZone.js";
import { useDrag } from "../widget/TabBar.js";
import { SvgDragHandleVertical } from "@itwin/itwinui-icons-react";
import { Icon } from "@itwin/itwinui-react";

/** Properties of [[DockedToolSettingsHandle]] component.
 * @internal
 */
// eslint-disable-next-line deprecation/deprecation
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
  const handleDragStart = React.useCallback(
    (initialPointerPosition: Point) => {
      onDragStart({
        initialPointerPosition,
        pointerPosition: initialPointerPosition,
      });
      dispatch({
        type: "TOOL_SETTINGS_DRAG_START",
        newFloatingWidgetId,
      });
    },
    [dispatch, newFloatingWidgetId, onDragStart]
  );
  const dragRef = useDrag(handleDragStart);
  const refs = useRefs(dragRef, resizeObserverRef);
  const title = useLabel("toolSettingsHandleTitle");
  const className = classnames("nz-toolSettings-handle", props.className);

  return (
    <div className={className} ref={refs} style={props.style} title={title}>
      <Icon size="large">
        <SvgDragHandleVertical />
      </Icon>
    </div>
  );
}
