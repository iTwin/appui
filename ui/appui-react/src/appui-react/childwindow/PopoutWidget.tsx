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
import type { FrontstageDef } from "../frontstage/FrontstageDef";

interface PopoutWidgetProps {
  widgetContainerId: string;
  frontstageDef: FrontstageDef;
  widgetDef: WidgetDef;
}

/** Component used to wrap a widget for use in a child window.
 * @internal
 */
export function PopoutWidget({
  widgetContainerId,
  frontstageDef,
  widgetDef,
}: PopoutWidgetProps) {
  const { reparentPopoutWidgets } = usePreviewFeatures();
  if (reparentPopoutWidgets) {
    return (
      <ReparentedPopoutWidget
        widgetContainerId={widgetContainerId}
        frontstageDef={frontstageDef}
      />
    );
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
  frontstageDef,
  widgetContainerId,
}: Pick<PopoutWidgetProps, "widgetContainerId" | "frontstageDef">) {
  const setContainer = useContainersStore((state) => state.setContainer);
  const ref = React.useCallback(
    (instance: HTMLDivElement | null) => {
      const nineZoneState = frontstageDef.nineZoneState;
      if (!nineZoneState) return;

      const popoutWidget = nineZoneState.popoutWidgets.byId[widgetContainerId];
      if (!popoutWidget) return;

      const widget = nineZoneState.widgets[widgetContainerId];
      const tabId = widget.tabs[0];
      if (!tabId) return;

      setContainer(tabId, instance);
    },
    [setContainer, widgetContainerId, frontstageDef]
  );

  return (
    <div
      className="uifw-childWindow-popoutWidget_reparented"
      data-widget-id={widgetContainerId}
      ref={ref}
    />
  );
}
