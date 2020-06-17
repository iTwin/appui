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
import { TabsStateContext, ToolSettingsNodeContext, WidgetContentNodeContext } from "../base/NineZone";
import { TabState, toolSettingsTabId } from "../base/NineZoneState";
import { WidgetContentContainersContext, WidgetContentManagerContext } from "./ContentManager";

/** @internal */
export const WidgetContentRenderers = React.memo(function WidgetContentRenderers() { // tslint:disable-line: variable-name no-shadowed-variable
  const widgetContent = React.useContext(WidgetContentNodeContext);
  const toolSettingsContent = React.useContext(ToolSettingsNodeContext);
  const widgetContentContainers = React.useContext(WidgetContentContainersContext);
  const tabs = React.useContext(TabsStateContext);
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
});

interface WidgetContentRendererProps {
  children?: React.ReactNode;
  renderTo: Element | null | undefined;
  tabId: TabState["id"];
}

/** @internal */
export const WidgetContentRenderer = React.memo(function WidgetContentRenderer(props: WidgetContentRendererProps) { // tslint:disable-line: variable-name no-shadowed-variable
  const widgetContentManager = React.useContext(WidgetContentManagerContext);
  const container = React.useRef<HTMLDivElement>(undefined!);
  if (!container.current) {
    container.current = document.createElement("div");
    container.current.className = "nz-widget-contentRenderer";
  }
  React.useEffect(() => {
    const parent = props.renderTo;
    const child = container.current;
    if (parent) {
      parent.appendChild(child);
      widgetContentManager.onRestoreTransientState.emit(props.tabId);
    }
    return () => {
      parent?.removeChild(child);
    };
  }, [props.renderTo, widgetContentManager, props.tabId]);
  return ReactDOM.createPortal(
    <TabIdContext.Provider value={props.tabId}>
      {props.children}
    </TabIdContext.Provider>,
    container.current,
  );
});

/** @internal */
export const TabIdContext = React.createContext<TabState["id"]>(""); // tslint:disable-line: variable-name
TabIdContext.displayName = "nz:TabIdContext";

/** @internal */
export function useTransientState(onSave?: () => void, onRestore?: () => void) {
  const widgetContentManager = React.useContext(WidgetContentManagerContext);
  const tabId = React.useContext(TabIdContext);
  React.useEffect(() => {
    const handleSaveTransientState = (id: TabState["id"]) => {
      tabId === id && onSave && onSave();
    };
    widgetContentManager.onSaveTransientState.add(handleSaveTransientState);
    return () => {
      widgetContentManager.onSaveTransientState.remove(handleSaveTransientState);
    };
  }, [widgetContentManager, onSave, tabId]);
  React.useEffect(() => {
    const handleRestoreTransientState = (id: TabState["id"]) => {
      tabId === id && onRestore && onRestore();
    };
    widgetContentManager.onRestoreTransientState.add(handleRestoreTransientState);
    return () => {
      widgetContentManager.onRestoreTransientState.remove(handleRestoreTransientState);
    };
  }, [widgetContentManager, onRestore, tabId]);
}
