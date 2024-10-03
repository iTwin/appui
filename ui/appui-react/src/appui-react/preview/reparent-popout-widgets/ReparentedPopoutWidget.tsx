/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ChildWindowManager
 */

import "./ReparentedPopoutWidget.scss";
import * as React from "react";
import { useRefs } from "@itwin/core-react/internal";
import { usePopoutsStore } from "./usePopoutsStore.js";
import type { WidgetState } from "../../layout/state/WidgetState.js";

interface ReparentedPopoutWidgetProps {
  widgetId: WidgetState["id"];
}

/** @internal */
export function ReparentedPopoutWidget({
  widgetId,
}: ReparentedPopoutWidgetProps) {
  const setPopout = usePopoutsStore((state) => state.setPopout);
  const setPopoutRef = React.useCallback<React.RefCallback<HTMLDivElement>>(
    (instance) => {
      setPopout(widgetId, instance ?? undefined);
    },
    [setPopout, widgetId]
  );
  const autoCloseRef = useAutoClosePopovers(widgetId);
  const ref = useRefs(setPopoutRef, autoCloseRef);

  return (
    <div
      className="uifw-preview-reparentPopoutWidgets-reparentedPopoutWidget"
      data-widget-id={widgetId}
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
