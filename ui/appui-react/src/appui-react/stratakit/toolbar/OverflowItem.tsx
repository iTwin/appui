/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { IconButton } from "@stratakit/bricks";
import {
  DropdownMenu,
  unstable_Toolbar as Toolbar,
} from "@stratakit/structures";
import moreIcon from "@stratakit/icons/more-horizontal.svg";
import {
  isToolbarActionItem,
  isToolbarCustomItem,
  isToolbarGroupItem,
  type ToolbarItem,
} from "../../toolbar/ToolbarItem.js";
import { ActionMenuItem } from "./ActionItem.js";
import { GroupMenuItem } from "./GroupItem.js";
import { CustomMenuItem } from "./CustomItem.js";

interface OverflowItemProps {
  items: ToolbarItem[];
}

/** @internal */
export const OverflowItem = React.forwardRef<
  HTMLButtonElement,
  OverflowItemProps
>(function OverflowItem(props, forwardedRef) {
  const { items } = props;
  return (
    <Toolbar.Item
      render={(itemProps) => {
        return (
          <DropdownMenu.Provider>
            <DropdownMenu.Button
              render={
                <IconButton
                  variant="ghost"
                  icon={`${moreIcon}#icon-large`}
                  label="More"
                  ref={forwardedRef}
                  {...itemProps}
                />
              }
            />
            <DropdownMenu.Content>
              {items.map((item) => {
                if (isToolbarActionItem(item)) {
                  return <ActionMenuItem key={item.id} item={item} />;
                }
                if (isToolbarGroupItem(item)) {
                  return <GroupMenuItem key={item.id} item={item} />;
                }
                if (isToolbarCustomItem(item)) {
                  return <CustomMenuItem key={item.id} item={item} />;
                }
                return undefined;
              })}
            </DropdownMenu.Content>
          </DropdownMenu.Provider>
        );
      }}
      ref={forwardedRef}
    />
  );
});
