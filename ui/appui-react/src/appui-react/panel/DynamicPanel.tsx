/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import "./DynamicPanel.scss";
import * as React from "react";
import { useStore } from "zustand";
import { Divider, IconButton } from "@itwin/itwinui-react";
import { SvgCloseSmall } from "@itwin/itwinui-icons-react";
import { PanelsStoreContext } from "./PanelsState.js";
import { useConditionalValueProp } from "../shared/ConditionalValue.js";
import { PanelSideContext } from "../layout/widget-panels/Panel.js";
import type { createPanelsStore } from "./PanelsState.js";
import type { DynamicPanelPlacement } from "./PanelsState.js";
import type { PanelSide } from "../layout/widget-panels/PanelTypes.js";

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
  store: ReturnType<typeof createPanelsStore>;
}

function FrameworkDynamicPanel(props: FrameworkDynamicPanelProps) {
  const { placement, store } = props;
  const slice = useStore(store, (state) => {
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
  const side = React.useContext(PanelSideContext);
  const store = React.useContext(PanelsStoreContext);
  const placement = toDynamicPanelPlacement(side);
  if (!placement || !store) return;
  return <FrameworkDynamicPanel placement={placement} store={store} />;
}

function toDynamicPanelPlacement(
  side: PanelSide | undefined
): DynamicPanelPlacement | undefined {
  if (side === "left") return "left";
  if (side === "right") return "right";
  return undefined;
}
