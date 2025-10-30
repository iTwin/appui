/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import {
  DropdownMenu,
  unstable_Toolbar as Toolbar,
} from "@stratakit/structures";
import { Item, MenuItem } from "./Item.js";
import {
  isToolbarActionItem,
  isToolbarGroupItem,
  type ToolbarGroupItem,
} from "../../toolbar/ToolbarItem.js";
import { ActionMenuItem } from "./ActionItem.js";

interface GroupItemProps {
  item: ToolbarGroupItem;
}

/** @internal */
export const GroupItem = React.forwardRef<HTMLButtonElement, GroupItemProps>(
  function GroupItem(props, forwardedRef) {
    const { item } = props;
    return (
      <Toolbar.Item
        render={(itemProps) => {
          return (
            <DropdownMenu.Provider>
              <DropdownMenu.Button
                render={<Item item={item} {...itemProps} />}
              />
              <DropdownMenu.Content>
                <MenuItems items={item.items} />
              </DropdownMenu.Content>
            </DropdownMenu.Provider>
          );
        }}
        ref={forwardedRef}
      />
    );
  }
);

function GroupMenuItem(props: GroupItemProps) {
  const { item } = props;
  return (
    <MenuItem
      item={item}
      submenu={
        <DropdownMenu.Submenu>
          <MenuItems items={item.items} />
        </DropdownMenu.Submenu>
      }
    />
  );
}

interface MenuItemsProps {
  items: ToolbarGroupItem["items"];
}

function MenuItems(props: MenuItemsProps) {
  const { items } = props;
  return items.map((item) => {
    if (isToolbarActionItem(item)) {
      return <ActionMenuItem key={item.id} item={item} />;
    }
    if (isToolbarGroupItem(item)) {
      return <GroupMenuItem key={item.id} item={item} />;
    }
    return undefined;
  });
}
