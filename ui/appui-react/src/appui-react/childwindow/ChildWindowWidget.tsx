/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ChildWindowManager
 */

import "./ChildWindowWidget.scss";
import * as React from "react";
import type { WidgetDef } from "../widgets/WidgetDef.js";
import { useReparentPopoutWidget } from "../preview/reparent-popout-widgets/useReparentPopoutWidget.js";
import { ReparentedPopoutWidget } from "../preview/reparent-popout-widgets/ReparentedPopoutWidget.js";
import { ErrorBoundary } from "react-error-boundary";
import { WidgetFallback } from "../widget-panels/Content.js";
import { usePopoutDraggedWidgets } from "../preview/popout-dragged-widgets/usePopoutDraggedWidgets.js";
import { ChildWindowPopoutWidget } from "../preview/popout-dragged-widgets/PopoutWidget.js";
import type { FrontstageDef } from "../frontstage/FrontstageDef.js";

interface ChildWindowWidgetProps {
  widgetContainerId: string;
  frontstageDef: FrontstageDef;
  widgetDef: WidgetDef;
}

/** Component used to wrap a widget for use in a child window.
 * @internal
 */
export function ChildWindowWidget({
  widgetContainerId,
  widgetDef,
  frontstageDef,
}: ChildWindowWidgetProps) {
  const reparent = useReparentPopoutWidget(widgetDef.id);
  const popoutDraggedWidgets = usePopoutDraggedWidgets();
  if (reparent) {
    return <ReparentedPopoutWidget widgetId={widgetContainerId} />;
  }
  if (popoutDraggedWidgets)
    return (
      <ChildWindowPopoutWidget
        frontstageDef={frontstageDef}
        id={widgetContainerId}
      />
    );
  return (
    <div
      className="uifw-popout-widget-filled-container"
      data-widget-id={widgetContainerId}
    >
      <ErrorBoundary FallbackComponent={WidgetFallback}>
        {widgetDef.reactNode}
      </ErrorBoundary>
    </div>
  );
}
