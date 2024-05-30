/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { usePreviewFeatures } from "../PreviewFeatures";
import { DropdownMenu, MenuItem } from "@itwin/itwinui-react";
import { TabBarButton } from "../../layout/widget/Button";
import { useLayout } from "../../layout/base/LayoutStore";
import { getTabLocation } from "../../layout/state/TabLocation";
import { SvgAdd } from "@itwin/itwinui-icons-react";
import { NineZoneDispatchContext } from "../../layout/base/NineZone";
import { WidgetIdContext } from "../../layout/widget/Widget";

/** @internal */
export function AddTabButton() {
  const tabs = useHiddenTabs();
  const dispatch = React.useContext(NineZoneDispatchContext);
  const widgetId = React.useContext(WidgetIdContext);
  if (!widgetId) return null;

  const menuItems = tabs.map((tab) => {
    return (
      <MenuItem
        key={tab.id}
        onClick={() => {
          dispatch({
            type: "WIDGET_TAB_ADD_TO_WIDGET",
            id: tab.id,
            widgetId,
          });
          dispatch({
            type: "WIDGET_TAB_OPEN",
            id: tab.id,
          });
        }}
      >
        {tab.label}
      </MenuItem>
    );
  });
  return (
    <DropdownMenu menuItems={(_close) => menuItems}>
      <TabBarButton title="Add tab">
        <SvgAdd />
      </TabBarButton>
    </DropdownMenu>
  );
}

/** @internal */
export function useAddTab() {
  const tabs = useHiddenTabs();
  const { controlWidgetVisibility } = usePreviewFeatures();
  if (tabs.length === 0) return false;
  return !!controlWidgetVisibility;
}

function useHiddenTabs() {
  const hiddenTabs = useLayout((state) => {
    const tabs = Object.values(state.tabs);
    const toolSettingsTabId = state.toolSettings?.tabId;
    return tabs.filter((tab) => {
      if (tab.id === toolSettingsTabId) return false;
      const location = getTabLocation(state, tab.id);
      return !location;
    });
  }, true);
  return hiddenTabs;
}
