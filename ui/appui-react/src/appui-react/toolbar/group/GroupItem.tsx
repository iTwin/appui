/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./GroupItem.scss";
import * as React from "react";
import { Icon } from "@itwin/core-react";
import {
  DropdownMenu,
  MenuExtraContent,
  MenuItem,
  Text,
} from "@itwin/itwinui-react";
import type { ToolbarItem } from "../ToolbarItem";
import {
  isToolbarActionItem,
  isToolbarCustomItem,
  isToolbarGroupItem,
  type ToolbarGroupItem,
} from "../ToolbarItem";
import { useConditionalValue } from "../../hooks/useConditionalValue";
import { ExpandIndicator } from "./ExpandIndicator";
import { Item } from "./Item";
import { ToolbarContext } from "./Toolbar";
import { Badge } from "./Badge";
import { ToolGroupOverflowContext } from "./OverflowButton";

/** @internal */
export interface GroupItemProps {
  item: ToolbarGroupItem;
}

/** @internal */
export const GroupItem = React.forwardRef<HTMLButtonElement, GroupItemProps>(
  function GroupItem({ item }, ref) {
    const placement = usePopoverPlacement();
    const context = React.useContext(ToolbarContext);
    const toolGroupOverflow = React.useContext(ToolGroupOverflowContext);

    if (toolGroupOverflow) {
      return <GroupMenuItem item={item} />;
    }
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
export function usePopoverPlacement() {
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
  onClose?: () => void;
}

/** @internal */
export function GroupMenuItem({ item, onClose }: GroupMenuItemProps) {
  const iconSpec = useConditionalValue(item.icon);
  const label = useConditionalValue(item.label);
  const isDisabled = useConditionalValue(item.isDisabled);
  const isHidden = useConditionalValue(item.isHidden);

  if (isHidden) {
    return null;
  }

  const subMenuItems = isDisabled ? undefined : toSubMenuItems(item);
  return (
    <MenuItem
      startIcon={<Icon iconSpec={iconSpec} />}
      disabled={isDisabled}
      subMenuItems={subMenuItems}
      onClick={() => {
        if (isToolbarActionItem(item)) {
          item.execute();
          onClose?.();
        }
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

function toSubMenuItems(item: ToolbarItem) {
  if (isToolbarGroupItem(item)) {
    return toGroupMenuItems(item);
  }
  if (isToolbarCustomItem(item)) {
    return [
      <MenuExtraContent key={item.id}>{item.panelContent}</MenuExtraContent>,
    ];
  }
  return undefined;
}
