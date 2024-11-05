/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./NavigationWidget.scss";
import * as React from "react";
import { DropdownButton, MenuItem } from "@itwin/itwinui-react";
import { SvgAdd } from "@itwin/itwinui-icons-react";
import { label, useUserControlledHiddenTabs } from "./AddWidgetButton.js";
import { NineZoneDispatchContext } from "../../layout/base/NineZone.js";
import { useLayout } from "../../layout/base/LayoutStore.js";
import { panelSides } from "../../layout/widget-panels/Panel.js";

/** Displays a dropdown button to un-hide widgets in the bottom-right corner of the navigation widget area.
 * @internal
 */
export function NavigationWidget({
  children,
}: React.PropsWithChildren<object>) {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const tabs = useUserControlledHiddenTabs();
  const hasWidgets = useHasWidgets();
  const showAdd = tabs.length > 0 && !hasWidgets;
  return (
    <div className="uifw-preview-navigationWidget">
      {children}
      <div>
        {showAdd && (
          <DropdownButton
            className="uifw-preview-navigationWidget_add"
            startIcon={<SvgAdd />}
            menuItems={(close) =>
              tabs.map((tab) => {
                return (
                  <MenuItem
                    key={tab.id}
                    onClick={() => {
                      dispatch({
                        type: "WIDGET_TAB_SHOW",
                        id: tab.id,
                      });
                      close();
                    }}
                  >
                    {tab.label}
                  </MenuItem>
                );
              })
            }
          >
            {label}
          </DropdownButton>
        )}
      </div>
    </div>
  );
}

/** Returns `false` if there are no floating widgets or panel sections. */
function useHasWidgets() {
  return useLayout((state) => {
    if (state.floatingWidgets.allIds.length > 0) return true;

    for (const side of panelSides) {
      const panel = state.panels[side];
      if (panel.widgets.length > 0) {
        return true;
      }
    }
    return false;
  });
}
