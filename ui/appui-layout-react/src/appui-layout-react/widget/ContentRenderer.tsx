/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./ContentRenderer.scss";
import produce, { castDraft } from "immer";
import * as React from "react";
import create from "zustand";
import { ToolSettingsNodeContext, WidgetContentNodeContext } from "../base/NineZone";
import { TabState } from "../state/TabState";
import { toolSettingsTabId } from "../state/ToolSettingsState";
import { useLayout } from "../base/LayoutStore";
import { RectangleProps } from "@itwin/core-react";
import { getTabLocation } from "../state/TabLocation";
import { getWidgetState } from "../state/internal/WidgetStateHelpers";
import { WidgetIdContext } from "./Widget";
import { assert } from "@itwin/core-bentley";

/** @internal */
export function WidgetContentRenderers() {
  const tabIds = useLayout((state) => {
    return Object.keys(state.tabs);
  }, true);
  return (
    <>
      {tabIds.map((tabId) => {
        return (
          <WidgetContent
            key={tabId}
            tabId={tabId}
          />
        );
      })}
    </>
  );
}

interface WidgetContentProps {
  tabId: TabState["id"];
}

function WidgetContent({ tabId }: WidgetContentProps) {
  const widgetId = useLayout((state) => {
    const location = getTabLocation(state, tabId)
    if (!location)
      return undefined;
    const widget = getWidgetState(state, location.widgetId);
    return widget.id;
  });
  return (
    <WidgetIdContext.Provider value={widgetId}>
      <TabIdContext.Provider value={tabId}>
        <WidgetContentRenderer />
      </TabIdContext.Provider>
    </WidgetIdContext.Provider>
  );
}

function WidgetContentRenderer() {
  const widgetContent = React.useContext(WidgetContentNodeContext);
  const toolSettingsContent = React.useContext(ToolSettingsNodeContext);
  const tabId = React.useContext(TabIdContext);
  const widgetId = React.useContext(WidgetIdContext);
  assert(!!tabId);
  const zIndex = useWidgetZIndex();

  const bounds = useContainersStore((state) => state.containers[tabId]);
  const isActive = useLayout((state) => {
    if (!widgetId)
      return false;
    const widget = getWidgetState(state, widgetId);
    return widget.activeTabId === tabId;
  });
  const children = tabId === toolSettingsTabId ? toolSettingsContent : widgetContent;
  return (
    <div
      className="nz-widget-contentRenderer"
      style={isActive && bounds ? {
        left: bounds.left,
        top: bounds.top,
        height: bounds.bottom - bounds.top,
        width: bounds.right - bounds.left,
        zIndex: zIndex === undefined ? undefined : zIndex + 1,
        background: "green",
        opacity: 0.5,
      } : {
        display: "none",
      }}>
      {children}
    </div>
  );
}

/** @internal */
export const TabIdContext = React.createContext<TabState["id"] | undefined>(undefined); // eslint-disable-line @typescript-eslint/naming-convention
TabIdContext.displayName = "nz:TabIdContext";

interface ContainersStore {
  setContainer: (tabId: TabState["id"], container: RectangleProps | undefined) => void;
  containers: { readonly [id in TabState["id"]]: RectangleProps | undefined };
}

/** @internal */
export const useContainersStore = create<ContainersStore>((set) => ({
  containers: {},
  setContainer: (tabId: TabState["id"], container: RectangleProps | undefined) => {
    set((state) => produce(state, (draft) => {
      draft.containers[tabId] = castDraft(container);
    }));
  },
}));

/** @internal */
export function useWidgetZIndex() {
  const widgetId = React.useContext(WidgetIdContext);
  const floatingIndex = useLayout((state) => {
    if (!widgetId)
      return undefined;
    const index = state.floatingWidgets.allIds.indexOf(widgetId);
    if (index >= 0)
      return index + 1;
    return undefined;
  });
  if (floatingIndex === undefined)
    return floatingIndex;
  return floatingIndex * 10;
}
