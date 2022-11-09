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
import { ToolSettingsNodeContext, WidgetContentNodeContext } from "../base/NineZone";
import { TabState } from "../state/TabState";
import { WidgetContentContainersContext, WidgetContentManagerContext } from "./ContentManager";
import { toolSettingsTabId } from "../state/ToolSettingsState";
import { useLayout } from "../base/LayoutStore";

/** @internal */
export function WidgetContentRenderers() {
  const widgetContent = React.useContext(WidgetContentNodeContext);
  const toolSettingsContent = React.useContext(ToolSettingsNodeContext);
  const widgetContentContainers = React.useContext(WidgetContentContainersContext);
  const tabs = useLayout((state) => state.tabs);
  const tabEntries = Object.entries(tabs);
  return (
    <>
      {tabEntries.map(([, tab]) => {
        const container = widgetContentContainers[tab.id];
        const children = tab.id === toolSettingsTabId ? toolSettingsContent : widgetContent;
        return <WidgetContentRenderer
          children={children}
          key={tab.id}
          renderTo={container}
          tabId={tab.id}
        />;
      })}
    </>
  );
}

interface WidgetContentRendererProps {
  children?: React.ReactNode;
  renderTo: Element | null | undefined;
  tabId: TabState["id"];
}

/** @internal */
export function WidgetContentRenderer(props: WidgetContentRendererProps) {
  const widgetContentManager = React.useContext(WidgetContentManagerContext);
  const container = React.useRef<HTMLDivElement>(undefined!);
  if (!container.current) {
    container.current = document.createElement("div");
    container.current.classList.add("nz-widget-contentRenderer");
  }
  React.useLayoutEffect(() => {
    const parent = props.renderTo;
    if (parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }

      parent.appendChild(container.current);
      widgetContentManager.onRestoreTransientState.raiseEvent(props.tabId);
    }
    return () => {
      for (const child of parent?.children || []) {
        if (child === container.current) {
          parent!.removeChild(child);
          return;
        }
      }
    };
  }, [props.renderTo, widgetContentManager, props.tabId]);
  return ReactDOM.createPortal(
    <TabIdContext.Provider value={props.tabId}>
      {props.children}
    </TabIdContext.Provider>,
    container.current,
  );
}

/** @internal */
export const TabIdContext = React.createContext<TabState["id"]>(""); // eslint-disable-line @typescript-eslint/naming-convention
TabIdContext.displayName = "nz:TabIdContext";

/** @internal */
export function useTabTransientState(tabId: string, onSave?: () => void, onRestore?: () => void) {
  const widgetContentManager = React.useContext(WidgetContentManagerContext);
  React.useEffect(() => {
    return widgetContentManager.onSaveTransientState.addListener((id) => {
      tabId === id && onSave && onSave();
    });
  }, [widgetContentManager, onSave, tabId]);
  React.useEffect(() => {
    return widgetContentManager.onRestoreTransientState.addListener((id) => {
      tabId === id && onRestore && onRestore();
    });
  }, [widgetContentManager, onRestore, tabId]);
}

/** @internal */
export function useTransientState(onSave?: () => void, onRestore?: () => void) {
  const tabId = React.useContext(TabIdContext);
  return useTabTransientState(tabId, onSave, onRestore);
}
