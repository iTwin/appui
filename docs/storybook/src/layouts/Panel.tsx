/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Dialog, IconButton } from "@itwin/itwinui-react";
import {
  WidgetDef,
  WidgetState,
  useSpecificWidgetDef,
} from "@itwin/appui-react";
import { SvgClose, SvgWindowMaximize } from "@itwin/itwinui-icons-react";

export interface PanelProps {}

export function Panel() {
  const [widgetId] = React.useState<WidgetDef["id"]>("configure");
  const widgetDef = useSpecificWidgetDef(widgetId);
  if (!widgetDef) return null;
  return (
    <Dialog isOpen={true}>
      <Dialog.Main
        data-iui-placement=""
        style={{ top: "4em", left: "0.5em", height: "calc(100% - 4.5em)" }}
      >
        <Dialog.TitleBar>
          <Dialog.TitleBar.Title>{widgetDef.label}</Dialog.TitleBar.Title>
          <IconButton
            size="small"
            styleType="borderless"
            onClick={() => {}}
            aria-label="Expand"
          >
            <SvgWindowMaximize />
          </IconButton>
          <IconButton
            size="small"
            styleType="borderless"
            onClick={() => {
              widgetDef.setWidgetState(WidgetState.Closed);
            }}
            aria-label="Close"
          >
            <SvgClose />
          </IconButton>
        </Dialog.TitleBar>
        <Dialog.Content>{widgetDef.reactNode}</Dialog.Content>
      </Dialog.Main>
    </Dialog>
  );
}
