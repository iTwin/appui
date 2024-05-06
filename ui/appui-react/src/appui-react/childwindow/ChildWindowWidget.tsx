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
import { useRefs } from "@itwin/core-react";
import { usePopoutsStore } from "./usePopoutsStore";
import { useReparentPopoutWidget } from "../preview/reparent-popout-widgets/useReparentPopoutWidget";

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
    return <Reparented widgetContainerId={widgetContainerId} />;
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

function Reparented({
  widgetContainerId,
}: Pick<ChildWindowWidgetProps, "widgetContainerId">) {
  const setPopout = usePopoutsStore((state) => state.setPopout);
  const setPopoutRef = React.useCallback<React.RefCallback<HTMLDivElement>>(
    (instance) => {
      setPopout(widgetContainerId, instance ?? undefined);
    },
    [setPopout, widgetContainerId]
  );
  const autoCloseRef = useAutoClosePopovers(widgetContainerId);
  const ref = useRefs(setPopoutRef, autoCloseRef);

  return (
    <div
      className="uifw-childWindow-childWindowWidget_reparented"
      data-widget-id={widgetContainerId}
      ref={ref}
    />
  );
}

/** A workaround to close floating/popover elements when a popout widget is closed.
 * There are some issues with the popover alignment, especially if the tab is not active (popover target is not rendered) after closing the popout.
 */
function useAutoClosePopovers(widgetContainerId: string) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const onClosePopoutWidget = usePopoutsStore(
    (state) => state.onClosePopoutWidget
  );
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    return onClosePopoutWidget.addListener(({ windowId }) => {
      if (windowId !== widgetContainerId) return;
      element.dispatchEvent(new MouseEvent("mousedown"));
      element.dispatchEvent(new PointerEvent("pointerdown"));
    });
  }, [widgetContainerId, onClosePopoutWidget]);
  return ref;
}
