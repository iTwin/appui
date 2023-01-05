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
  const widgetContent = React.useContext(WidgetContentNodeContext);
  const toolSettingsContent = React.useContext(ToolSettingsNodeContext);

  const bounds = useContainersStore((state) => state.containers[tabId]);
  const isActive = useLayout((state) => {
    const location = getTabLocation(state, tabId)
    if (!location)
      return false;
    const widget = getWidgetState(state, location.widgetId);
    return widget.activeTabId === tabId;
  });
  const children = tabId === toolSettingsTabId ? toolSettingsContent : widgetContent;
  return (
    <TabIdContext.Provider value={tabId}>
      <div
        className="nz-widget-contentRenderer"
        style={isActive && bounds ? {
          left: bounds.left,
          top: bounds.top,
          height: bounds.bottom - bounds.top,
          width: bounds.right - bounds.left,
        } : {
          display: "none",
        }}>
        {children}
      </div>
    </TabIdContext.Provider>
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
