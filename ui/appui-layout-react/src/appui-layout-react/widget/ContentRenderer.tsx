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
import { assert } from "@itwin/core-bentley";
import {
  ToolSettingsNodeContext,
  WidgetContentNodeContext,
} from "../base/NineZone";
import type { TabState } from "../state/TabState";
import {
  useContainersStore,
  WidgetContentManagerContext,
} from "./ContentManager";
import { toolSettingsTabId } from "../state/ToolSettingsState";
import { useLayout } from "../base/LayoutStore";

/** @internal */
export function WidgetContentRenderers() {
  const widgetContent = React.useContext(WidgetContentNodeContext);
  const toolSettingsContent = React.useContext(ToolSettingsNodeContext);
  const tabIds = useLayout((state) => {
    return Object.keys(state.tabs);
  }, true);
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
  const widgetContentManager = React.useContext(WidgetContentManagerContext);
  const container = React.useRef<HTMLDivElement>(undefined!);
  if (!container.current) {
    container.current = document.createElement("div");
    container.current.classList.add("nz-widget-contentRenderer");
  }
  React.useLayoutEffect(() => {
    const parent = renderTo;
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
  }, [renderTo, widgetContentManager, props.tabId]);
  return ReactDOM.createPortal(
    <TabIdContext.Provider value={props.tabId}>
      {props.children}
    </TabIdContext.Provider>,
    container.current
  );
}

/** @internal */
export const TabIdContext = React.createContext<TabState["id"] | undefined>(
  undefined
); // eslint-disable-line @typescript-eslint/naming-convention
TabIdContext.displayName = "nz:TabIdContext";

/** @internal */
export function useTabTransientState(
  tabId: string,
  onSave?: () => void,
  onRestore?: () => void
) {
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
  assert(!!tabId);
  return useTabTransientState(tabId, onSave, onRestore);
}
