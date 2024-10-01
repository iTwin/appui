/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { useLayout } from "../base/LayoutStore.js";
import {
  isHorizontalPanelSide,
  PanelSideContext,
} from "../widget-panels/Panel.js";
import { WidgetIdContext } from "./Widget.js";

/** @internal */
export function usePanelWidgetId() {
  const side = React.useContext(PanelSideContext);
  const widgetId = React.useContext(WidgetIdContext);
  if (!side || widgetId === undefined) return undefined;
  return widgetId;
}

/** @internal */
export function useMainPanelWidgetId() {
  const side = React.useContext(PanelSideContext);
  const widgetId = React.useContext(WidgetIdContext);
  return useLayout((state) => {
    if (!side) return undefined;
    const widgets = state.panels[side].widgets;
    const mainWidget = isHorizontalPanelSide(side)
      ? widgets[widgets.length - 1]
      : widgets[0];
    return mainWidget === widgetId ? widgetId : undefined;
  });
}
