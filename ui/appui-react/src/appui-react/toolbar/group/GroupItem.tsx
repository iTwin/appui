/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./GroupItem.scss";
import * as React from "react";
import { type CommonProps, Icon } from "@itwin/core-react";
import {
  DropdownMenu,
  MenuExtraContent,
  MenuItem,
  Text,
} from "@itwin/itwinui-react";
import type { ToolbarItem } from "../ToolbarItem";
import {
  isToolbarActionItem,
  isToolbarGroupItem,
  type ToolbarGroupItem,
} from "../ToolbarItem";
import { useConditionalValue } from "../../hooks/useConditionalValue";
import { ExpandIndicator } from "./ExpandIndicator";
import { Item } from "./Item";
import { ToolbarContext } from "./Toolbar";
import { Badge } from "./Badge";

/** @internal */
export interface GroupItemProps extends CommonProps {
  item: ToolbarGroupItem;
}

/** @internal */
export const GroupItem = React.forwardRef<HTMLButtonElement, GroupItemProps>(
  function GroupItem({ item }, ref) {
    const isHidden = useConditionalValue(item.isHidden);
    const placement = usePlacement();
    const context = React.useContext(ToolbarContext);

    if (isHidden) return null;
    return (
      <DropdownMenu
        menuItems={(_close) => {
          return toGroupMenuItems(item);
        }}
        placement={placement}
        onVisibleChange={(newVisible) => {
          context?.setPopoverOpen(newVisible);
        }}
      >
        <Item item={item} ref={ref}>
          <ExpandIndicator />
        </Item>
      </DropdownMenu>
    );
  }
);

/** @internal */
export function usePlacement() {
  const context = React.useContext(ToolbarContext);
  if (!context) return undefined;

  return `${context.expandsTo}-${context.panelAlignment}` as const;
}

function MenuTitle({ item }: { item: ToolbarGroupItem }) {
  const label = useConditionalValue(item.label);
  return (
    <MenuExtraContent>
      <Text variant="subheading" className="uifw-toolbar-group-groupItem_title">
        {label}
      </Text>
    </MenuExtraContent>
  );
}

interface GroupMenuItemProps {
  item: ToolbarItem;
  onExpandGroup?: (item: ToolbarGroupItem) => void;
  onClose?: () => void;
}

function GroupMenuItem({ item, onExpandGroup, onClose }: GroupMenuItemProps) {
  const iconSpec = useConditionalValue(item.icon);
  const isDisabled = useConditionalValue(item.isDisabled);
  const label = useConditionalValue(item.label);

  const subMenuItems =
    isToolbarGroupItem(item) && !isDisabled
      ? toGroupMenuItems(item)
      : undefined;
  return (
    <MenuItem
      startIcon={<Icon iconSpec={iconSpec} />}
      disabled={isDisabled}
      subMenuItems={subMenuItems}
      onClick={() => {
        if (isToolbarGroupItem(item)) {
          onExpandGroup?.(item);
          return;
        }
        if (isToolbarActionItem(item)) {
          item.execute();
          onClose?.();
        }
        // TODO: handle custom item which is not supported by current toolbars.
      }}
    >
      <Badge badge={item.badge} />
      {label}
    </MenuItem>
  );
}

function toGroupMenuItems(groupItem: ToolbarGroupItem) {
  const items = groupItem.items.map((item) => {
    return <GroupMenuItem key={item.id} item={item} />;
  });
  return [<MenuTitle key="menu-title" item={groupItem} />, ...items];
}
