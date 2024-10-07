/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { ConfigurableUiControlType } from "../configurableui/ConfigurableUiControl.js";
import { StatusBar } from "../statusbar/StatusBar.js";
import type { StatusBarWidgetControl } from "../statusbar/StatusBarWidgetControl.js";
import { useActiveFrontstageDef } from "../frontstage/FrontstageDef.js";

/** @internal */
// eslint-disable-next-line deprecation/deprecation
export function WidgetPanelsStatusBar(props: CommonProps) {
  const frontstageDef = useActiveFrontstageDef();
  const widgetDef = frontstageDef?.statusBar;
  if (!widgetDef) return null;
  const content = widgetDef.reactNode;
  const widgetControl =
    content === undefined
      ? // eslint-disable-next-line deprecation/deprecation
        (widgetDef.getWidgetControl(
          // eslint-disable-next-line deprecation/deprecation
          ConfigurableUiControlType.StatusBarWidget
          // eslint-disable-next-line deprecation/deprecation
        ) as StatusBarWidgetControl | undefined)
      : undefined;
  return (
    // eslint-disable-next-line deprecation/deprecation
    <StatusBar {...props} widgetControl={widgetControl}>
      {content}
    </StatusBar>
  );
}
