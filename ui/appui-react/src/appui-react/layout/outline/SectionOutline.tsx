/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetPanels
 */

import "./SectionOutline.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import type { CommonProps } from "@itwin/core-react";
import { useTargeted } from "../base/DragManager";
import {
  isHorizontalPanelSide,
  PanelSideContext,
} from "../widget-panels/Panel";
import { useTargetDirection } from "../target/SectionTarget";
import { isSectionDropTargetState } from "../state/DropTargetState";
import { useLayout } from "../base/LayoutStore";
import { useSendBackHomeState } from "../widget/SendBack";

/** @internal */
// eslint-disable-next-line deprecation/deprecation
export interface SectionOutlineProps extends CommonProps {
  sectionIndex: 0 | 1;
}

/** @internal */
export function SectionOutline(props: SectionOutlineProps) {
  const hidden = useHidden(props.sectionIndex);
  const direction = useTargetDirection();
  const style = useSize(props.sectionIndex);
  const className = classnames(
    "nz-outline-sectionOutline",
    `nz-${props.sectionIndex}`,
    `nz-${direction}`,
    hidden && "nz-hidden",
    props.className
  );
  return (
    <div
      className={className}
      style={{
        ...(hidden ? {} : style),
        ...props.style,
      }}
    />
  );
}

function useHidden(sectionIndex: SectionOutlineProps["sectionIndex"]) {
  const side = React.useContext(PanelSideContext);
  const targeted = useTargeted();
  const activeHomeState = useSendBackHomeState();

  return React.useMemo(() => {
    if (
      activeHomeState &&
      activeHomeState.side === side &&
      activeHomeState.sectionIndex === sectionIndex
    )
      return false;

    if (!targeted) return true;

    if (!isSectionDropTargetState(targeted)) return true;

    if (targeted.sectionIndex !== sectionIndex) return true;
    if (targeted.side !== side) return true;

    return false;
  }, [targeted, side, sectionIndex, activeHomeState]);
}

function useSize(sectionIndex: SectionOutlineProps["sectionIndex"]) {
  const side = React.useContext(PanelSideContext);
  assert(!!side);
  const splitterPercent = useLayout(
    (state) => state.panels[side].splitterPercent
  );
  return React.useMemo<React.CSSProperties | undefined>(() => {
    let size = splitterPercent;
    if (!size) return undefined;
    if (sectionIndex === 1) size = 100 - size;
    const style: React.CSSProperties = {};
    if (isHorizontalPanelSide(side)) style.width = `${size}%`;
    else style.height = `${size}%`;
    return style;
  }, [side, splitterPercent, sectionIndex]);
}
