/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./ContentContainer.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { WidgetContentManagerContext } from "./ContentManager";
import { PanelSideContext } from "../widget-panels/Panel";
import { WidgetIdContext } from "./Widget";
import { useLayout } from "../base/LayoutStore";

/** @internal */
export interface WidgetContentContainerProps {
  children?: React.ReactNode;
}

/** @internal */
export function WidgetContentContainer(props: WidgetContentContainerProps) {
  const widgetId = React.useContext(WidgetIdContext);
  assert(!!widgetId);
  const minimized = useLayout((state) => {
    const widget = state.widgets[widgetId];
    return widget?.minimized;
  });
  const activeTabId = useLayout((state) => {
    const widget = state.widgets[widgetId];
    return widget?.activeTabId;
  });
  const widgetContentManager = React.useContext(WidgetContentManagerContext);
  const side = React.useContext(PanelSideContext);

  const className = classnames(
    "nz-widget-contentContainer",
    undefined === side && minimized && "nz-minimized",
  );
  return (
    <div
      className={className}
    >
      <div
        className="nz-content"
        ref={(instance: HTMLDivElement | null) => {
          if (!activeTabId)
            return;
          widgetContentManager.setContainer(activeTabId, instance);
        }}
      />
      {props.children}
    </div>
  );
}
