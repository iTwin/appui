/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetPanels
 */

import "./PanelOutline.scss";
import classnames from "classnames";
import * as React from "react";
import { useTargeted } from "../base/DragManager";
import { isHorizontalPanelSide, PanelSideContext } from "../widget-panels/Panel";
import { isHorizontalPanelState } from "../state/PanelState";
import { isPanelDropTargetState } from "../state/DropTargetState";
import { useLayout } from "../base/LayoutStore";

/** @internal */
export function PanelOutline() {
  const side = React.useContext(PanelSideContext)!;
  const isHorizontal = isHorizontalPanelSide(side);
  const span = useLayout((state) => {
    const panel = state.panels[side];
    return isHorizontalPanelState(panel) ? panel.span : false;
  });
  const hidden = useHidden();
  const className = classnames(
    "nz-outline-panelOutline",
    hidden && "nz-hidden",
    `nz-${side}`,
    span && "nz-span",
  );
  const size = useSize();
  return (
    <div
      className={className}
      style={{
        width: isHorizontal ? undefined : size,
        height: isHorizontal ? size : undefined,
      }}
    />
  );
}

/** @internal */
export function useHidden() {
  const side = React.useContext(PanelSideContext);
  const targeted = useTargeted();
  if (!targeted)
    return true;

  if (!isPanelDropTargetState(targeted))
    return true;

  if (targeted.side !== side)
    return true;

  return false;
}

function useSize() {
  const side = React.useContext(PanelSideContext)!;
  return useLayout((state) => {
    const panel = state.panels[side];
    return panel.size !== undefined ? panel.size : panel.minSize;
  });
}
