/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetPanels
 */

import "./PanelTargets.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { TargetContainer } from "./TargetContainer";
import { PanelTarget } from "./PanelTarget";
import { SectionTarget, useTargetDirection } from "./SectionTarget";
import { MergeTarget } from "./MergeTarget";
import { isHorizontalPanelState } from "../state/PanelState";
import { PanelSideContext } from "../widget-panels/Panel";
import { useLayout } from "../base/LayoutStore";

/** @internal */
export function PanelTargets() {
  const side = React.useContext(PanelSideContext)!;
  const panel = useLayout((state) => state.panels[side]);
  const direction = useTargetDirection();
  const type = usePanelTargetsType();
  const className = classnames(
    "nz-target-panelTargets",
    `nz-${panel.side}`,
    type === "two-widgets" && "nz-wide",
    // istanbul ignore next
    isHorizontalPanelState(panel) && panel.span && "nz-span",
  );

  let targets;
  if (type === "no-panel") {
    targets = <PanelTarget side={panel.side} />;
  } else if (type === "single-widget") {
    targets = <>
      <SectionTarget sectionIndex={0} />
      <MergeTarget widgetId={panel.widgets[0]} />
      <SectionTarget sectionIndex={1} />
    </>;
  } else if (type === "two-widgets") {
    targets = <>
      <MergeTarget widgetId={panel.widgets[0]} />
      <MergeTarget widgetId={panel.widgets[1]} />
    </>;
  }
  return (
    <TargetContainer
      className={className}
      direction={direction}
    >
      {targets}
    </TargetContainer>
  );
}

function usePanelTargetsType(): "no-panel" | "single-widget" | "two-widgets" | "hidden" {
  const side = React.useContext(PanelSideContext)!;
  const panel = useLayout((state) => state.panels[side]);

  if (panel.widgets.length === 0)
    return "no-panel";

  if (!panel.collapsed)
    return "hidden";

  if (panel.widgets.length === 2)
    return "two-widgets";

  assert(panel.widgets.length === 1);
  return "single-widget";
}
