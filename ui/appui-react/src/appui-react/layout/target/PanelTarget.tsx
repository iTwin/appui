/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetPanels
 */

import "./PanelTarget.scss";
import classnames from "classnames";
import * as React from "react";
import { DraggedWidgetIdContext, usePanelTarget } from "../base/DragManager";
import { CursorTypeContext, getUniqueId } from "../base/NineZone";
import { getCursorClassName } from "../widget-panels/CursorOverlay";
import type { PanelSide } from "../widget-panels/PanelTypes";
import { isHorizontalPanelSide } from "../widget-panels/Panel";
import { useAllowedPanelTarget } from "./useAllowedPanelTarget";
import { useLayout } from "../base/LayoutStore";

/** @internal */
export interface PanelTargetProps {
  side: PanelSide;
}

/** @internal */
export function PanelTarget(props: PanelTargetProps) {
  const { side } = props;
  const cursorType = React.useContext(CursorTypeContext);
  const draggedWidgetId = React.useContext(DraggedWidgetIdContext);
  const draggedTab = useLayout((state) => !!state.draggedTab);
  const allowedTarget = useAllowedPanelTarget();
  const newWidgetId = React.useMemo(() => getUniqueId(), []);
  const [ref, targeted] = usePanelTarget<HTMLDivElement>({
    side,
    newWidgetId,
  });
  const visible = (draggedTab || !!draggedWidgetId) && allowedTarget;
  const isHorizontal = isHorizontalPanelSide(side);
  const className = classnames(
    "nz-target-panelTarget",
    isHorizontal ? "nz-horizontal" : "nz-vertical",
    targeted && "nz-targeted",
    !visible && "nz-hidden",
    cursorType && getCursorClassName(cursorType)
  );
  return <div className={className} ref={ref} />;
}
