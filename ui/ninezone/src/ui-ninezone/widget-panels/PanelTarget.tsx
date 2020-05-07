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
import { assert } from "../base/assert";
import { DraggedWidgetContext, usePanelTarget } from "../base/DragManager";
import { CursorTypeContext, DraggedTabContext } from "../base/NineZone";
import { isHorizontalPanelState } from "../base/NineZoneState";
import { getCursorClassName } from "../widget-panels/CursorOverlay";
import { useTarget } from "../widget/TabTarget";
import { PanelStateContext } from "./Panel";

/** @internal */
export const PanelTarget = React.memo(function PanelTarget() { // tslint:disable-line: variable-name no-shadowed-variable
  const panel = React.useContext(PanelStateContext);
  const cursorType = React.useContext(CursorTypeContext);
  const draggedTab = React.useContext(DraggedTabContext);
  const draggedWidget = React.useContext(DraggedWidgetContext);
  assert(panel);
  const [targeted, setTargeted] = React.useState(false);
  const onTargeted = usePanelTarget({
    side: panel.side,
  });
  const handleTargeted = React.useCallback((t) => {
    setTargeted(t);
    onTargeted(t);
  }, [onTargeted]);
  const ref = useTarget<HTMLDivElement>(handleTargeted);
  const hidden = !draggedTab && !draggedWidget;
  const className = classnames(
    "nz-widgetPanels-panelTarget",
    hidden && "nz-hidden",
    targeted && "nz-targeted",
    isHorizontalPanelState(panel) && panel.span && "nz-span",
    `nz-${panel.side}`,
    cursorType && getCursorClassName(cursorType),
  );
  return (
    <div
      className={className}
      ref={ref}
    />
  );
});
