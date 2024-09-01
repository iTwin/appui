/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./WidgetOutline.scss";
import classnames from "classnames";
import * as React from "react";
import { useTargeted } from "../base/DragManager";
import { WidgetIdContext } from "../widget/Widget";
import {
  isTabDropTargetState,
  isWidgetDropTargetState,
} from "../state/DropTargetState";
import { useSendBackHomeState } from "../widget/SendBack";
import { WidgetDraggedOverContext } from "../widget/WidgetDraggedOverContext";

/** @internal */
export function WidgetOutline() {
  const hidden = useHidden();
  const className = classnames(
    "nz-outline-widgetOutline",
    hidden && "nz-hidden"
  );

  return <div className={className} />;
}

function useHidden() {
  const widgetId = React.useContext(WidgetIdContext);
  const targeted = useTargeted();
  const activeHomeState = useSendBackHomeState();
  const draggedOver = React.useContext(WidgetDraggedOverContext);

  return React.useMemo(() => {
    if (draggedOver?.target !== undefined) return false;
    if (activeHomeState?.widgetId === widgetId) return false;

    if (!targeted) return true;

    if (isWidgetDropTargetState(targeted) && targeted.widgetId === widgetId)
      return false;

    if (isTabDropTargetState(targeted) && targeted.widgetId === widgetId)
      return false;

    return true;
  }, [targeted, widgetId, activeHomeState, draggedOver]);
}
