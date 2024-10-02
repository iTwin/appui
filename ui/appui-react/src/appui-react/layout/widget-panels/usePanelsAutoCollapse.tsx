/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetPanels
 */

import * as React from "react";
import { useRefEffect, useRefs } from "@itwin/core-react/internal";
import {
  AutoCollapseUnpinnedPanelsContext,
  NineZoneDispatchContext,
} from "../base/NineZone.js";
import { panelSides } from "./Panel.js";
import { useLayoutStore } from "../base/LayoutStore.js";

/** @internal */
export function usePanelsAutoCollapse<T extends Element>(): React.Ref<T> {
  const layoutStore = useLayoutStore();
  const panelsRef = React.useRef(layoutStore.getState().panels);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const autoCollapseUnpinnedPanels = React.useContext(
    AutoCollapseUnpinnedPanelsContext
  );

  React.useEffect(
    () =>
      layoutStore.subscribe((state) => {
        panelsRef.current = state.panels;
      }),
    [layoutStore]
  );

  const collapsePanels = React.useCallback(() => {
    for (const side of panelSides) {
      const panel = panelsRef.current[side];
      if (panel.collapsed || panel.pinned) continue;
      dispatch({
        type: "PANEL_SET_COLLAPSED",
        collapsed: true,
        side: panel.side,
      });
    }
  }, [dispatch]);
  const mouseDownRef = useRefEffect<T>(
    (instance) => {
      if (!instance) return;
      instance.addEventListener("mousedown", collapsePanels, true);
      return () => {
        instance.removeEventListener("mousedown", collapsePanels, true);
      };
    },
    [collapsePanels]
  );
  const mouseEnterRef = useRefEffect<T>(
    (instance) => {
      if (!instance || !autoCollapseUnpinnedPanels) return;
      instance.addEventListener("mouseenter", collapsePanels, true);
      return () => {
        instance.removeEventListener("mouseenter", collapsePanels, true);
      };
    },
    [collapsePanels, autoCollapseUnpinnedPanels]
  );
  const ref = useRefs(mouseDownRef, mouseEnterRef);
  return ref;
}
