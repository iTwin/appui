/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */
import * as React from "react";
import {
  getWidgetLocation,
  isFloatingWidgetLocation,
  isPopoutWidgetLocation,
} from "../state/WidgetLocation";
import { isAllowedSideTarget } from "./useAllowedSideTarget";
import type { WidgetState } from "../state/WidgetState";
import { useLayout } from "../base/LayoutStore";
import { DraggedWidgetIdContext } from "../base/DragManager";

/** Checks the proposed docking target to see if it's allowed by the dragged widget or tab
 * @internal
 */
export function useAllowedWidgetTarget(widgetId: WidgetState["id"]) {
  const draggedWidget = React.useContext(DraggedWidgetIdContext);
  return useLayout((state) => {
    const widgetLocation = getWidgetLocation(state, widgetId);

    if (!widgetLocation || isPopoutWidgetLocation(widgetLocation)) {
      return false;
    } else if (isFloatingWidgetLocation(widgetLocation)) {
      return true;
    }

    return isAllowedSideTarget(state, draggedWidget, widgetLocation.side);
  });
}
