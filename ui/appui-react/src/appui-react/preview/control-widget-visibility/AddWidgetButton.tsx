/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { usePreviewFeatures } from "../PreviewFeatures.js";
import { DropdownMenu, MenuItem } from "@itwin/itwinui-react";
import { TabBarButton } from "../../layout/widget/Button.js";
import { useLayout } from "../../layout/base/LayoutStore.js";
import { getTabLocation } from "../../layout/state/TabLocation.js";
import { SvgAdd } from "@itwin/itwinui-icons-react";
import { NineZoneDispatchContext } from "../../layout/base/NineZone.js";
import { WidgetIdContext } from "../../layout/widget/Widget.js";
import { WidgetActionDropdownContext } from "../widget-action-dropdown/MoreButton.js";

/** @internal */
export const label = "Add widget";

/** @internal */
export function AddWidgetButton() {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const widgetId = React.useContext(WidgetIdContext);
  const dropdownContext = React.useContext(WidgetActionDropdownContext);
  const tabs = useUserControlledHiddenTabs();

  if (!widgetId) return null;

  const getMenuItems = (close?: () => void) =>
    tabs.map((tab) => {
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
            close?.();
          }}
        >
          {tab.label}
        </MenuItem>
      );
    });

  const icon = <SvgAdd />;
  if (dropdownContext !== undefined) {
    return (
      <MenuItem
        startIcon={icon}
        subMenuItems={getMenuItems(dropdownContext.onClose)}
      >
        {label}
      </MenuItem>
    );
  }
  return (
    <DropdownMenu menuItems={(close) => getMenuItems(close)}>
      <TabBarButton label={label}>{icon}</TabBarButton>
    </DropdownMenu>
  );
}

/** @internal */
export function useAddTab() {
  const tabs = useUserControlledHiddenTabs();
  const { controlWidgetVisibility } = usePreviewFeatures();
  if (tabs.length === 0) return false;
  return !!controlWidgetVisibility;
}

/** Returns hidden tabs whose visibility can be manipulated by the end user.
 * @internal
 */
export function useUserControlledHiddenTabs() {
  const { controlWidgetVisibility } = usePreviewFeatures();
  const hiddenTabs = useLayout((state) => {
    if (!controlWidgetVisibility) return [];

    const tabs = Object.values(state.tabs);
    const toolSettingsTabId = state.toolSettings?.tabId;
    return tabs.filter((tab) => {
      if (tab.id === toolSettingsTabId) return false;

      const location = getTabLocation(state, tab.id);
      // Tab is visible.
      if (!!location) return false;

      // Case where only specific tabs are user-controlled.
      if (Array.isArray(controlWidgetVisibility)) {
        return controlWidgetVisibility.includes(tab.id);
      }

      return true;
    });
  }, true);
  return hiddenTabs;
}
