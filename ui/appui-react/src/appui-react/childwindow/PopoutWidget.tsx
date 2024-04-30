/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ChildWindowManager
 */

import "./PopoutWidget.scss";
import * as React from "react";
import type { WidgetDef } from "../widgets/WidgetDef";
import { usePreviewFeatures } from "../preview/PreviewFeatures";
import { useContainersStore } from "../layout/widget/ContentManager";

interface PopoutWidgetProps {
  widgetContainerId: string;
  widgetDef: WidgetDef;
}

/** Component used to wrap a widget for use in a child window.
 * @internal
 */
export function PopoutWidget({
  widgetContainerId,
  widgetDef,
}: PopoutWidgetProps) {
  const { reparentPopoutWidgets } = usePreviewFeatures();
  if (reparentPopoutWidgets) {
    return <ReparentedPopoutWidget widgetContainerId={widgetContainerId} />;
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

function ReparentedPopoutWidget({
  widgetContainerId,
}: Pick<PopoutWidgetProps, "widgetContainerId">) {
  const setPopoutContainer = useContainersStore(
    (state) => state.setPopoutContainer
  );
  const ref = React.useCallback(
    (instance: HTMLDivElement | null) => {
      setPopoutContainer(widgetContainerId, instance);
    },
    [setPopoutContainer, widgetContainerId]
  );

  return (
    <div
      className="uifw-childWindow-popoutWidget_reparented"
      data-widget-id={widgetContainerId}
      ref={ref}
    />
  );
}
