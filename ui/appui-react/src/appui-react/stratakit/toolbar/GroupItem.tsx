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
import { Item } from "./Item.js";
import type { ToolbarActionItem } from "../../toolbar/ToolbarItem.js";
import {
  isToolbarActionItem,
  isToolbarGroupItem,
  type ToolbarGroupItem,
} from "../../toolbar/ToolbarItem.js";
import { ActionMenuItem } from "./ActionItem.js";
import { Divider } from "@stratakit/bricks";

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
                <GroupMenuItems item={item} />
              </DropdownMenu.Content>
            </DropdownMenu.Provider>
          );
        }}
        ref={forwardedRef}
      />
    );
  }
);

type FlatToolbarGroupItem = Omit<ToolbarGroupItem, "items"> & {
  items: ReadonlyArray<ToolbarActionItem>;
};

/** @internal */
export function GroupMenuItems(props: GroupItemProps) {
  const { item } = props;
  const flatGroupItems = React.useMemo(() => {
    const groups: FlatToolbarGroupItem[] = [];
    const stack = [item];
    while (stack.length > 0) {
      const current = stack.pop()!;
      const actionItems = current.items.filter(isToolbarActionItem);
      if (actionItems.length > 0) {
        groups.push({
          ...current,
          items: actionItems,
        });
      }

      const groupItems = current.items.filter(isToolbarGroupItem);
      stack.push(...groupItems);
    }
    return groups;
  }, [item]);
  return flatGroupItems.map((group, index) => {
    return (
      <React.Fragment key={group.id}>
        {index > 0 && <Divider />}
        {group.items.map((actionItem) => (
          <ActionMenuItem key={actionItem.id} item={actionItem} />
        ))}
      </React.Fragment>
    );
  });
}
