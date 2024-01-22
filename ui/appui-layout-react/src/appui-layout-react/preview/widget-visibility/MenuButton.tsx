/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { SvgAdd, SvgClose, SvgMoreVertical } from "@itwin/itwinui-icons-react";
import { DropdownMenu, IconButton, MenuItem } from "@itwin/itwinui-react";
import { useActiveTabId } from "../../widget/Widget";
import { NineZoneDispatchContext } from "../../base/NineZone";
import { useLayout } from "../../base/LayoutStore";
import { getTabLocation } from "../../state/TabLocation";
import { Icon } from "@itwin/core-react";

/** @internal */
export function MenuButton() {
  return (
    <DropdownMenu
      menuItems={(close) => [
        <AddTab key="add-tab" onClose={close} />,
        <CloseTab key="close-tab" onClose={close} />,
      ]}
    >
      <IconButton size="small" styleType="borderless" aria-label="More options">
        <SvgMoreVertical />
      </IconButton>
    </DropdownMenu>
  );
}

interface MenuItemProps {
  onClose: () => void;
}

function CloseTab(props: MenuItemProps) {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const id = useActiveTabId();
  return (
    <MenuItem
      key="close-tab"
      icon={<SvgClose />}
      onClick={() => {
        dispatch({
          type: "WIDGET_TAB_HIDE",
          id,
        });
        props.onClose();
      }}
    >
      Close tab
    </MenuItem>
  );
}

function AddTab(props: MenuItemProps) {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const hiddenTabs = useLayout((state) => {
    const tabs = Object.values(state.tabs);
    return tabs.filter((tab) => {
      if (tab.id === state.toolSettings?.tabId) return false;
      return getTabLocation(state, tab.id) === undefined;
    });
  }, true);
  return (
    <MenuItem
      icon={<SvgAdd />}
      subMenuItems={hiddenTabs.map((hiddenTab) => (
        <MenuItem
          key={hiddenTab.id}
          icon={<Icon iconSpec={hiddenTab.iconSpec} />}
          onClick={() => {
            dispatch({
              type: "WIDGET_TAB_SHOW",
              id: hiddenTab.id,
            });
            props.onClose();
          }}
        >
          {hiddenTab.label}
        </MenuItem>
      ))}
    >
      Add tab
    </MenuItem>
  );
}
