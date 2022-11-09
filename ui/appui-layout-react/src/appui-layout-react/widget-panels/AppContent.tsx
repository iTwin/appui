/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetPanels
 */

import * as React from "react";
import { AutoCollapseUnpinnedPanelsContext, NineZoneDispatchContext } from "../base/NineZone";
import { WidgetPanelsContent } from "./Content";
import { ContentNodeContext } from "./Panels";
import { panelSides } from "./Panel";
import { useRefEffect, useRefs } from "@itwin/core-react";
import { useLayout } from "../base/LayoutStore";

/** Main app content (i.e. viewport) that will change bounds based on panel pinned settings.
 * @internal
 */
export function AppContent() {
  const panels = useLayout((state) => state.panels);
  const content = React.useContext(ContentNodeContext);
  const ref = usePanelsAutoCollapse<HTMLDivElement>();
  return (
    <WidgetPanelsContent
      className="nz-widgetPanels-appContent"
      ref={ref}
      pinnedLeft={panels.left.pinned}
      pinnedRight={panels.right.pinned}
      pinnedTop={panels.top.pinned}
      pinnedBottom={panels.bottom.pinned}
    >
      {content}
    </WidgetPanelsContent>
  );
}

/** @internal */
export function usePanelsAutoCollapse<T extends Element>(): React.Ref<T> {
  const panels = useLayout((state) => state.panels);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const autoCollapseUnpinnedPanels = React.useContext(AutoCollapseUnpinnedPanelsContext);

  const collapsePanels = React.useCallback(() => {
    for (const side of panelSides) {
      const panel = panels[side];
      if (panel.collapsed || panel.pinned)
        continue;
      dispatch({
        type: "PANEL_SET_COLLAPSED",
        collapsed: true,
        side: panel.side,
      });
    }
  }, [dispatch, panels]);
  const mouseDownRef = useRefEffect<T>((instance) => {
    if (!instance)
      return;
    instance.addEventListener("mousedown", collapsePanels, true);
    return () => {
      instance.removeEventListener("mousedown", collapsePanels, true);
    };
  }, [collapsePanels]);
  const mouseEnterRef = useRefEffect<T>((instance) => {
    if (!instance || !autoCollapseUnpinnedPanels)
      return;
    instance.addEventListener("mouseenter", collapsePanels, true);
    return () => {
      instance.removeEventListener("mouseenter", collapsePanels, true);
    };
  }, [collapsePanels, autoCollapseUnpinnedPanels]);
  const ref = useRefs(mouseDownRef, mouseEnterRef);
  return ref;
}
