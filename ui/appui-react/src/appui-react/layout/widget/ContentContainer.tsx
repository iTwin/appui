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
import { WidgetContentManagerContext } from "./ContentManager.js";
import { PanelSideContext } from "../widget-panels/Panel.js";
import { WidgetIdContext } from "./Widget.js";
import { useLayout } from "../base/LayoutStore.js";
import { getWidgetState } from "../state/internal/WidgetStateHelpers.js";

/** @internal */
export interface WidgetContentContainerProps {
  children?: React.ReactNode;
}

/** @internal */
export function WidgetContentContainer(props: WidgetContentContainerProps) {
  const widgetId = React.useContext(WidgetIdContext);
  const widgetContentManager = React.useContext(WidgetContentManagerContext);
  const side = React.useContext(PanelSideContext);
  assert(!!widgetId);
  const { minimized, activeTabId } = useLayout((state) => {
    const widget = getWidgetState(state, widgetId);
    return { minimized: widget.minimized, activeTabId: widget.activeTabId };
  }, true);
  const ref = React.useCallback<React.RefCallback<HTMLDivElement>>(
    (instance) => {
      if (!widgetContentManager) return;

      widgetContentManager.setContainer(activeTabId, instance ?? undefined);
    },
    [widgetContentManager, activeTabId]
  );

  const className = classnames(
    "nz-widget-contentContainer",
    undefined === side && minimized && "nz-minimized"
  );
  return (
    <div className={className}>
      <div className="nz-content" ref={ref} />
      {props.children}
    </div>
  );
}
