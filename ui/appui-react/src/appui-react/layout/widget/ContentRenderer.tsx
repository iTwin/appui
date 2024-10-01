/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./ContentRenderer.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  ToolSettingsNodeContext,
  WidgetContentNodeContext,
} from "../base/NineZone.js";
import type { TabState } from "../state/TabState.js";
import {
  useContainersStore,
  WidgetContentManagerContext,
} from "./ContentManager.js";
import { useLayout } from "../base/LayoutStore.js";

/** @internal */
export function WidgetContentRenderers() {
  const widgetContent = React.useContext(WidgetContentNodeContext);
  const toolSettingsContent = React.useContext(ToolSettingsNodeContext);
  const tabIds = useLayout((state) => {
    return Object.keys(state.tabs);
  }, true);
  const toolSettingsTabId = useLayout((state) => state.toolSettings?.tabId);
  return (
    <>
      {tabIds.map((tabId) => {
        const children =
          tabId === toolSettingsTabId ? toolSettingsContent : widgetContent;
        return (
          <WidgetContentRenderer key={tabId} tabId={tabId}>
            {children}
          </WidgetContentRenderer>
        );
      })}
    </>
  );
}

interface WidgetContentRendererProps {
  children?: React.ReactNode;
  tabId: TabState["id"];
}

/** @internal */
export function WidgetContentRenderer(props: WidgetContentRendererProps) {
  const renderTo = useContainersStore((state) => state.containers[props.tabId]);
  const unloaded = useLayout((state) => !!state.tabs[props.tabId].unloaded);
  const widgetContentManager = React.useContext(WidgetContentManagerContext);
  const container = React.useRef<HTMLDivElement>(undefined!);
  if (!container.current) {
    container.current = document.createElement("div");
    container.current.classList.add("nz-widget-contentRenderer");
  }
  React.useLayoutEffect(() => {
    if (!widgetContentManager) return;

    const parent = renderTo;
    if (!parent) return;

    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }

    parent.appendChild(container.current);
    widgetContentManager.onRestoreTransientState.raiseEvent(props.tabId);

    const ev = new CustomEvent("appui:reparent", {
      bubbles: true,
      detail: {
        widget: container.current,
      },
    });
    window.dispatchEvent(ev);

    return () => {
      for (const child of parent?.children || []) {
        if (child === container.current) {
          parent.removeChild(child);
          return;
        }
      }
    };
  }, [renderTo, widgetContentManager, props.tabId]);
  return ReactDOM.createPortal(
    <div
      style={{ height: "100%", width: "100%" }}
      id={`content-container:${props.tabId}`}
    >
      <TabIdContext.Provider value={props.tabId}>
        {unloaded ? null : props.children}
      </TabIdContext.Provider>
    </div>,
    container.current
  );
}

/** @internal */
export const TabIdContext = React.createContext<TabState["id"] | undefined>(
  undefined
);
TabIdContext.displayName = "nz:TabIdContext";

/** @internal */
export function useTabTransientState(
  tabId: string,
  onSave?: () => void,
  onRestore?: () => void
) {
  const widgetContentManager = React.useContext(WidgetContentManagerContext);
  React.useEffect(() => {
    if (!widgetContentManager) return;

    return widgetContentManager.onSaveTransientState.addListener((id) => {
      tabId === id && onSave && onSave();
    });
  }, [widgetContentManager, onSave, tabId]);
  React.useEffect(() => {
    if (!widgetContentManager) return;

    return widgetContentManager.onRestoreTransientState.addListener((id) => {
      tabId === id && onRestore && onRestore();
    });
  }, [widgetContentManager, onRestore, tabId]);
}
