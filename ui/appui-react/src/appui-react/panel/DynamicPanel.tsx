/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import "./DynamicPanel.scss";
import * as React from "react";
import { Divider, IconButton } from "@itwin/itwinui-react";
import { SvgCloseSmall } from "@itwin/itwinui-icons-react";
import { type DynamicPanelPlacement, usePanelsStore } from "./PanelsState.js";
import { useConditionalValueProp } from "../shared/ConditionalValue.js";
import { PanelSideContext } from "../layout/widget-panels/Panel.js";
import type { PanelSide } from "../layout/widget-panels/PanelTypes.js";
import { useSafeContext } from "../hooks/useSafeContext.js";

interface DynamicPanelProps {
  placement: DynamicPanelPlacement;
  label: string | undefined;
  onClose?: () => void;
  content: React.ReactNode;
}

function DynamicPanelComponent(props: DynamicPanelProps) {
  const { placement, label, onClose, content } = props;
  return (
    <div className="uifw-panel-dynamicPanel" data-_appui-placement={placement}>
      <div className="uifw-panel-dynamicPanel_header">
        <span className="uifw-panel-dynamicPanel_label">{label}</span>
        <IconButton
          label="Close"
          styleType="borderless"
          size="small"
          onClick={onClose}
        >
          <SvgCloseSmall />
        </IconButton>
      </div>
      <Divider className="uifw-panel-dynamicPanel_divider" />
      <div>{content}</div>
    </div>
  );
}

interface FrameworkDynamicPanelProps {
  placement: DynamicPanelPlacement;
}

function FrameworkDynamicPanel(props: FrameworkDynamicPanelProps) {
  const { placement } = props;
  const slice = usePanelsStore((state) => {
    if (!placement) return undefined;
    return state.dynamic[placement];
  });
  const panel = slice?.active;
  const label = useConditionalValueProp(panel?.label);
  if (!panel) return null;
  return (
    <DynamicPanelComponent
      placement={props.placement}
      label={label}
      content={panel.content}
      onClose={slice.close}
    />
  );
}

/** @internal */
export function DynamicPanelRenderer() {
  const side = useSafeContext(PanelSideContext);
  const placement = toDynamicPanelPlacement(side);
  if (!placement) return;
  return <FrameworkDynamicPanel placement={placement} />;
}

function toDynamicPanelPlacement(
  side: PanelSide
): DynamicPanelPlacement | undefined {
  if (side === "left") return "left";
  if (side === "right") return "right";
  return undefined;
}
