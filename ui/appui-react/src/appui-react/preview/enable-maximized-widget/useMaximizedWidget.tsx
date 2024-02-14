/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { WidgetIdContext } from "../../layout/widget/Widget";
import { MaximizedWidgetContext } from "./MaximizedWidget";
import { useLayout } from "../../layout/base/LayoutStore";
import {
  getWidgetLocation,
  isPanelWidgetLocation,
} from "../../layout/state/WidgetLocation";
import type { WidgetState } from "../../layout/state/WidgetState";
import type { PanelSide } from "../../layout/widget-panels/PanelTypes";

/** @internal */
export function useIsMaximizedWidget() {
  const widgetId = React.useContext(WidgetIdContext);
  const maximizedWidgetId = useMaximizedWidgetId();
  if (maximizedWidgetId === undefined) return false;

  return widgetId === maximizedWidgetId;
}

/** @internal */
export function useMaximizedPanelLayout(side: PanelSide) {
  const location = useMaximizedPanelWidgetLocation();
  return {
    "preview-maximized-panel": location?.side === side,
  };
}

/** @internal */
export function useMaximizedPanel(side: PanelSide) {
  const isMaximized = useIsMaximizedPanel(side);
  if (!isMaximized) return undefined;
  return {
    "preview-maximized-panel": isMaximized,
  };
}

/** @internal */
export function useMaximizedSection(widgetId: WidgetState["id"]) {
  const location = useMaximizedPanelWidgetLocation();
  if (!location) return undefined;

  return {
    "preview-maximized-section": location.widgetId === widgetId,
    "preview-maximized-section-sibling": location.widgetId !== widgetId,
  };
}

function useIsMaximizedPanel(side: PanelSide) {
  const location = useMaximizedPanelWidgetLocation();
  return location?.side === side;
}

function useMaximizedPanelWidgetLocation() {
  const location = useMaximizedWidgetLocation();

  if (!location) return undefined;
  if (!isPanelWidgetLocation(location)) return undefined;

  return location;
}

function useMaximizedWidgetLocation() {
  const widgetId = useMaximizedWidgetId();
  const location = useLayout((state) => {
    if (!widgetId) return undefined;
    return getWidgetLocation(state, widgetId);
  }, true);

  if (!widgetId || !location) return undefined;
  return { ...location, widgetId };
}

function useMaximizedWidgetId() {
  const { enabled, maximizedWidget } = React.useContext(MaximizedWidgetContext);
  if (!enabled) return undefined;

  return maximizedWidget;
}
