/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./WidgetTarget.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "../base/assert";
import { DraggedWidgetContext, useWidgetTarget } from "../base/DragManager";
import { CursorTypeContext, DraggedTabContext } from "../base/NineZone";
import { getCursorClassName } from "../widget-panels/CursorOverlay";
import { PanelSideContext } from "../widget-panels/Panel";
import { useTarget } from "./TabTarget";

/** @internal */
export interface WidgetTargetProps {
  position?: "first" | "last";
  widgetIndex: number;
}

/** @internal */
export const WidgetTarget = React.memo<WidgetTargetProps>(function WidgetTarget(props) { // tslint:disable-line: variable-name no-shadowed-variable
  const cursorType = React.useContext(CursorTypeContext);
  const draggedTab = React.useContext(DraggedTabContext);
  const draggedWidget = React.useContext(DraggedWidgetContext);
  const side = React.useContext(PanelSideContext);
  assert(side);
  const onTargeted = useWidgetTarget({
    side,
    widgetIndex: props.widgetIndex,
  });
  const [targeted, setTargeted] = React.useState(false);
  const handleTargeted = React.useCallback((t) => {
    setTargeted(t);
    onTargeted(t);
  }, [onTargeted]);
  const ref = useTarget<HTMLDivElement>(handleTargeted);
  const hidden = !draggedTab && !draggedWidget;
  const className = classnames(
    "nz-widget-widgetTarget",
    hidden && "nz-hidden",
    targeted && "nz-targeted",
    `nz-${side}`,
    props.position && `nz-${props.position}`,
    cursorType && getCursorClassName(cursorType),
  );
  return (
    <div
      className={className}
      ref={ref}
    />
  );
});
