/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { useLayout } from "../base/LayoutStore";
import {
  isHorizontalPanelSide,
  PanelSideContext,
} from "../widget-panels/Panel";
import { WidgetIdContext } from "./Widget";

/** @internal */
export function useIsMainPanelWidget() {
  const side = React.useContext(PanelSideContext);
  const widgetId = React.useContext(WidgetIdContext);
  return useLayout((state) => {
    const widgets = side ? state.panels[side].widgets : undefined;
    if (!widgets) return false;
    assert(!!side);
    const mainWidget = isHorizontalPanelSide(side)
      ? widgets[widgets.length - 1]
      : widgets[0];
    return mainWidget === widgetId;
  });
}
