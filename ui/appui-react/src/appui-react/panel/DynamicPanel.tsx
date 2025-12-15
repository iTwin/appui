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
import { useConditionalValue } from "../hooks/useConditionalValue.js";
import type { ConditionalValue } from "../shared/ConditionalValue.js";
import { usePanelsStore } from "./PanelsState.js";

interface DynamicPanelProps {
  side: "left" | "right";
}

/** @internal */
export function DynamicPanel(props: DynamicPanelProps) {
  const { side } = props;
  const panelSlice = usePanelsStore((state) => {
    if (side === "left") return state.dynamic.left;
    return state.dynamic.right;
  });
  const { active: panel, close } = panelSlice;
  const label = useConditionalValue(
    () => {
      if (!panel) return undefined;
      if (isConditionalValue(panel.label)) {
        return panel.label.getValue();
      }
      return panel.label;
    },
    isConditionalValue(panel?.label) ? panel.label.eventIds : []
  );
  if (!panel) return null;
  return (
    <div className="uifw-panel-dynamicPanel">
      <div className="uifw-panel-dynamicPanel_header">
        <span className="uifw-panel-dynamicPanel_label">{label}</span>
        <IconButton
          label="Close"
          styleType="borderless"
          size="small"
          onClick={close}
        >
          <SvgCloseSmall />
        </IconButton>
      </div>
      <Divider className="uifw-panel-dynamicPanel_divider" />
      <div>{panel.content}</div>
    </div>
  );
}

function isConditionalValue<T, TC>(
  value: T | ConditionalValue<TC>
): value is ConditionalValue<TC> {
  return (
    typeof value === "object" &&
    value !== null &&
    "eventIds" in value &&
    "getValue" in value
  );
}
