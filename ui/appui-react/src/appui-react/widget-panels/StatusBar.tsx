/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { ConfigurableUiControlType } from "../configurableui/ConfigurableUiControl";
import { StatusBar } from "../statusbar/StatusBar";
import type { StatusBarWidgetControl } from "../statusbar/StatusBarWidgetControl";
import { useActiveFrontstageDef } from "../frontstage/FrontstageDef";

/** @internal */
// eslint-disable-next-line deprecation/deprecation
export function WidgetPanelsStatusBar(props: CommonProps) {
  const frontstageDef = useActiveFrontstageDef();
  const widgetDef = frontstageDef?.statusBar;
  if (!widgetDef) return null;
  const content = widgetDef.reactNode;
  const widgetControl =
    content === undefined
      ? (widgetDef.getWidgetControl(
          ConfigurableUiControlType.StatusBarWidget
        ) as StatusBarWidgetControl | undefined)
      : undefined;
  return (
    <StatusBar {...props} widgetControl={widgetControl}>
      {content}
    </StatusBar>
  );
}
