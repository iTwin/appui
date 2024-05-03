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
import { useRefs } from "@itwin/core-react";
import { BeUiEvent } from "@itwin/core-bentley";
import { usePopoutsStore } from "./usePopoutsStore";

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
      className="uifw-childWindow-popoutWidget_reparented"
      data-widget-id={widgetContainerId}
      ref={ref}
    />
  );
}

/** @internal */
export const onClosePopoutWidget = new BeUiEvent<{
  windowId: string;
}>();

/** A workaround to close floating/popover elements when a popout widget is closed.
 * There are some issues with the popover alignment, especially if the tab is not active (popover target is not rendered) after closing the popout.
 */
function useAutoClosePopovers(widgetContainerId: string) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    return onClosePopoutWidget.addListener(({ windowId }) => {
      if (windowId !== widgetContainerId) return;
      element.dispatchEvent(new MouseEvent("mousedown"));
      element.dispatchEvent(new PointerEvent("pointerdown"));
    });
  }, [widgetContainerId]);
  return ref;
}
