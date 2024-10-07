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
import { assert } from "@itwin/core-bentley";
import { useTargeted } from "../base/DragManager.js";
import {
  isHorizontalPanelSide,
  PanelSideContext,
} from "../widget-panels/Panel.js";
import { isHorizontalPanelState } from "../state/PanelState.js";
import { isPanelDropTargetState } from "../state/DropTargetState.js";
import { useLayout } from "../base/LayoutStore.js";
import { useSendBackHomeState } from "../widget/SendBack.js";

/** @internal */
export function PanelOutline() {
  const side = React.useContext(PanelSideContext);
  assert(!!side);
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
    span && "nz-span"
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
  const activeHomeState = useSendBackHomeState();

  return React.useMemo(() => {
    if (activeHomeState) {
      if (
        activeHomeState.side === side &&
        activeHomeState.widgetId === undefined &&
        activeHomeState.sectionIndex === undefined
      )
        return false;
    }

    if (!targeted) return true;

    if (!isPanelDropTargetState(targeted)) return true;

    if (targeted.side !== side) return true;

    return false;
  }, [side, targeted, activeHomeState]);
}

function useSize() {
  const side = React.useContext(PanelSideContext);
  assert(!!side);
  return useLayout((state) => {
    const panel = state.panels[side];
    return panel.size !== undefined ? panel.size : panel.minSize;
  });
}
