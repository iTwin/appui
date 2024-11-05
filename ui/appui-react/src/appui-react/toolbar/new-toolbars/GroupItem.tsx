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
import type { ToolbarItem } from "../../toolbar/ToolbarItem.js";
import {
  isToolbarActionItem,
  isToolbarCustomItem,
  isToolbarGroupItem,
  type ToolbarGroupItem,
} from "../../toolbar/ToolbarItem.js";
import { useConditionalProp } from "../../hooks/useConditionalProp.js";
import { ExpandIndicator } from "./ExpandIndicator.js";
import { Item } from "./Item.js";
import { Badge } from "./Badge.js";
import { ToolGroupOverflowContext } from "./OverflowButton.js";
import { ToolbarContext } from "./Toolbar.js";

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
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const iconSpec = useConditionalProp(item.icon);
  const label = useConditionalProp(item.label);
  const isDisabled = useConditionalProp(item.isDisabled);
  const isHidden = useConditionalProp(item.isHidden);
  const isActive = useConditionalProp(item.isActive);

  if (isHidden) {
    return null;
  }

  const subMenuItems = isDisabled ? undefined : toMenuItems(item, onClose);
  const startIcon = item.iconNode ? (
    <>{item.iconNode}</>
  ) : (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    <Icon iconSpec={iconSpec} />
  );
  return (
    <MenuItem
      startIcon={startIcon}
      disabled={isDisabled}
      subMenuItems={subMenuItems}
      onClick={() => {
        if (isToolbarActionItem(item)) {
          item.execute();
          onClose?.();
        }
      }}
      isSelected={isActive}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <Badge badge={item.badge} badgeKind={item.badgeKind} />
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
