/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ChildWindowManager
 */

import "./ChildWindowWidget.scss";
import * as React from "react";
import type { WidgetDef } from "../widgets/WidgetDef";
import { useReparentPopoutWidget } from "../preview/reparent-popout-widgets/useReparentPopoutWidget";
import { ReparentedPopoutWidget } from "../preview/reparent-popout-widgets/ReparentedPopoutWidget";

interface ChildWindowWidgetProps {
  widgetContainerId: string;
  widgetDef: WidgetDef;
}

/** Component used to wrap a widget for use in a child window.
 * @internal
 */
export function ChildWindowWidget({
  widgetContainerId,
  widgetDef,
}: ChildWindowWidgetProps) {
  const reparent = useReparentPopoutWidget(widgetDef.id);
  if (reparent) {
    return <ReparentedPopoutWidget widgetId={widgetContainerId} />;
  }
  return (
    <div
      className="uifw-popout-widget-filled-container"
      data-widget-id={widgetContainerId}
    >
      {widgetDef.reactNode}
    </div>
  );
}
