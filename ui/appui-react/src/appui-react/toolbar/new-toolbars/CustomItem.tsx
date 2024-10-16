/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { DropdownMenu, MenuExtraContent } from "@itwin/itwinui-react";
import type { ToolbarCustomItem } from "../../toolbar/ToolbarItem.js";
import { ExpandIndicator } from "./ExpandIndicator.js";
import { Item } from "./Item.js";
import { GroupMenuItem, usePopoverPlacement } from "./GroupItem.js";
import { ToolGroupOverflowContext } from "./OverflowButton.js";
import { ToolbarContext } from "./Toolbar.js";

/** @internal */
export interface CustomItemProps {
  item: ToolbarCustomItem;
}

/** @internal */
export const CustomItem = React.forwardRef<HTMLButtonElement, CustomItemProps>(
  function CustomItem({ item }, ref) {
    const placement = usePopoverPlacement();
    const context = React.useContext(ToolbarContext);
    const overflowContext = React.useContext(ToolGroupOverflowContext);

    if (overflowContext) {
      return <GroupMenuItem item={item} onClose={overflowContext.onClose} />;
    }
    return (
      <DropdownMenu
        menuItems={() => {
          return [
            <MenuExtraContent key={0}>{item.panelContent}</MenuExtraContent>,
          ];
        }}
        placement={placement}
        onVisibleChange={(newVisible) => {
          context?.setPopoverOpen(newVisible);
        }}
      >
        <Item ref={ref} item={item}>
          <ExpandIndicator />
        </Item>
      </DropdownMenu>
    );
  }
);
