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
import { WidgetContentManagerContext } from "./ContentManager.js";
import { PanelSideContext } from "../widget-panels/Panel.js";
import { useActiveTabId, WidgetIdContext } from "./Widget.js";
import { useLayout } from "../base/LayoutStore.js";
import { getWidgetState } from "../state/internal/WidgetStateHelpers.js";
import { useSafeContext } from "../../hooks/useSafeContext.js";

/** @internal */
export interface WidgetContentContainerProps {
  children?: React.ReactNode;
}

/** @internal */
export function WidgetContentContainer(props: WidgetContentContainerProps) {
  const side = React.useContext(PanelSideContext);
  const widgetId = useSafeContext(WidgetIdContext);
  const minimized = useLayout((state) => {
    return getWidgetState(state, widgetId).minimized;
  });
  const ref = useWidgetContentContainer();

  return (
    <div
      className={classnames(
        "nz-widget-contentContainer",
        undefined === side && minimized && "nz-minimized"
      )}
    >
      <div className="nz-content" ref={ref} />
      {props.children}
    </div>
  );
}

/** @internal */
export function useWidgetContentContainer(): React.RefCallback<HTMLDivElement> {
  const widgetContentManager = useSafeContext(WidgetContentManagerContext);
  const activeTabId = useActiveTabId();
  return React.useCallback(
    (instance) => {
      widgetContentManager.setContainer(activeTabId, instance ?? undefined);
    },
    [widgetContentManager, activeTabId]
  );
}
