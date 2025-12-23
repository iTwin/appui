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
import type { DynamicPanel, DynamicPanelSlice } from "./PanelsState.js";
import { PanelSideContext } from "../layout/widget-panels/Panel.js";
import { useConditionalValueProp } from "../shared/ConditionalValue.js";

interface DynamicPanelProps {
  panel: DynamicPanel;
  slice: DynamicPanelSlice;
}

/** @internal */
function DynamicPanelComponent(props: DynamicPanelProps) {
  const side = React.useContext(PanelSideContext);
  const { panel, slice } = props;
  const label = useConditionalValueProp(panel.label);
  return (
    <div className="uifw-panel-dynamicPanel" data-_appui-panel-side={side}>
      <div className="uifw-panel-dynamicPanel_header">
        <span className="uifw-panel-dynamicPanel_label">{label}</span>
        <IconButton
          label="Close"
          styleType="borderless"
          size="small"
          onClick={slice.close}
        >
          <SvgCloseSmall />
        </IconButton>
      </div>
      <Divider className="uifw-panel-dynamicPanel_divider" />
      <div>{panel.content}</div>
    </div>
  );
}

export { DynamicPanelComponent as DynamicPanel };
