/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./useMaximizedWidget.scss";
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
import { usePreviewFeatures } from "../PreviewFeatures";

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
    "uifw-preview-enableMaximizedWidget_panel-layout": location?.side === side,
  };
}

/** @internal */
export function useMaximizedPanel(side: PanelSide) {
  const isMaximized = useIsMaximizedPanel(side);
  if (!isMaximized) return undefined;
  return {
    "uifw-preview-enableMaximizedWidget_panel": isMaximized,
  };
}

/** @internal */
export function useMaximizedSection(widgetId: WidgetState["id"]) {
  const location = useMaximizedPanelWidgetLocation();
  if (!location) return undefined;

  return {
    "uifw-preview-enableMaximizedWidget_section":
      location.widgetId === widgetId,
    "uifw-preview-enableMaximizedWidget_section-sibling":
      location.widgetId !== widgetId,
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
  const { maximizedWidget } = React.useContext(MaximizedWidgetContext);
  const preview = usePreviewFeatures();
  const enabled =
    preview.enableMaximizedFloatingWidget || preview.enableMaximizedPanelWidget;
  if (!enabled) return undefined;

  return maximizedWidget;
}

/** @internal */
export function useMaximizedFloatingWidget() {
  const isMaximizedWidget = useIsMaximizedWidget();
  if (!isMaximizedWidget)
    return {
      style: {},
      classNames: {},
    };

  return {
    style: {
      transform: "unset",
      height: "unset",
      width: "unset",
      "max-height": "unset",
      "max-width": "unset",
    },
    classNames: { "uifw-preview-enableMaximizedWidget_floatingWidget": true },
  };
}

/** @internal */
export function useMaximizedWidgetTabBarHandle() {
  const isMaximizedWidget = useIsMaximizedWidget();
  return {
    "uifw-preview-enableMaximizedWidget_widget-tabBar": isMaximizedWidget,
  };
}
