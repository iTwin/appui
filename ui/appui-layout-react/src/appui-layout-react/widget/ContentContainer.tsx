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
import { PanelSideContext, WidgetPanelContext } from "../widget-panels/Panel";
import { useActiveTabId, WidgetIdContext } from "./Widget";
import { useLayout } from "../base/LayoutStore";
import { getWidgetState } from "../state/internal/WidgetStateHelpers";
import { useContainersStore } from "./ContentRenderer";

/** @internal */
export interface WidgetContentContainerProps {
  children?: React.ReactNode;
}

/** @internal */
export function WidgetContentContainer(props: WidgetContentContainerProps) {
  const widgetId = React.useContext(WidgetIdContext);
  const side = React.useContext(PanelSideContext);
  assert(!!widgetId);
  const minimized = useLayout((state) => {
    const widget = getWidgetState(state, widgetId);
    return widget.minimized;
  });
  const ref = useContainerBounds();
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
        ref={ref}
      />
      {props.children}
    </div>
  );
}

function useContainerBounds() {
  const widgetId = React.useContext(WidgetIdContext);
  const widgetPanel = React.useContext(WidgetPanelContext);
  const tabId = useActiveTabId();
  assert(!!widgetId);
  const setContainer = useContainersStore((state) => state.setContainer);

  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      const element = entry.target;
      const bounds = element.getBoundingClientRect();
      setContainer(tabId, bounds);
    });
    ref.current && ro.observe(ref.current);
    return () => ro.disconnect();
  }, [tabId, setContainer]);

  const floatingWidgetBounds = useLayout((state) => {
    const floatingWidget = state.floatingWidgets.byId[widgetId];
    if (!floatingWidget)
      return undefined;
    return floatingWidget.bounds;
  });
  React.useLayoutEffect(() => {
    if (!floatingWidgetBounds || !ref.current)
      return;
    const bounds = ref.current.getBoundingClientRect();
    setContainer(tabId, bounds);
  }, [floatingWidgetBounds]);

  React.useEffect(() => {
    return widgetPanel?.onTransition.addListener(() => {
      if (!ref.current)
        return;
      const bounds = ref.current.getBoundingClientRect();
      setContainer(tabId, bounds);
    });
  }, [widgetPanel])
  return ref;
}
