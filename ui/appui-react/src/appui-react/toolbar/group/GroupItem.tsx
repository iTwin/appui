/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { Icon } from "@itwin/core-react";
import { DropdownMenu, MenuExtraContent, MenuItem } from "@itwin/itwinui-react";
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
import { Badge } from "./Badge";
import { ToolGroupOverflowContext } from "./OverflowButton";
import { ToolbarContext } from "./Toolbar";

/** @internal */
export interface GroupItemProps {
  item: ToolbarGroupItem;
}

/** @internal */
export const GroupItem = React.forwardRef<HTMLButtonElement, GroupItemProps>(
  function GroupItem({ item }, ref) {
    const placement = usePopoverPlacement();
    const context = React.useContext(ToolbarContext);
    const overflowContext = React.useContext(ToolGroupOverflowContext);

    if (overflowContext) {
      return <GroupMenuItem item={item} onClose={overflowContext.onClose} />;
    }
    return (
      <DropdownMenu
        menuItems={(close) => {
          return toMenuItems(item, close);
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

  const subMenuItems = isDisabled ? undefined : toMenuItems(item, onClose);
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

function toMenuItems(item: ToolbarItem, onClose?: () => void) {
  if (isToolbarGroupItem(item)) {
    return item.items.map((groupItem) => {
      return (
        <GroupMenuItem key={groupItem.id} item={groupItem} onClose={onClose} />
      );
    });
  }
  if (isToolbarCustomItem(item)) {
    return [
      <MenuExtraContent key={item.id}>{item.panelContent}</MenuExtraContent>,
    ];
  }
  return [];
}
