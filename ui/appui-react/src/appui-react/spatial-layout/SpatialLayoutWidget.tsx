/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Dialog, IconButton } from "@itwin/itwinui-react";
import { SvgClose, SvgWindowMaximize } from "@itwin/itwinui-icons-react";
import { useSpecificWidgetDef } from "../frontstage/FrontstageDef";
import { WidgetState } from "../widgets/WidgetState";
import { useSpatialLayout } from "./useSpatialLayout";

/** @internal */
export function SpatialLayoutWidget() {
  const activeWidgetId = useSpatialLayout((state) => state.activeWidgetId);
  const widgetDef = useSpecificWidgetDef(activeWidgetId || "");
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
