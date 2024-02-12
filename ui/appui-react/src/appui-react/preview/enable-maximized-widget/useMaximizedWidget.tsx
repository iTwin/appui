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

/** @internal */
export function useMaximizedWidget() {
  const widgetId = React.useContext(WidgetIdContext);
  const { enabled, maximizedWidget } = React.useContext(MaximizedWidgetContext);

  if (!enabled) return false;

  return widgetId === maximizedWidget;
}
