/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { DropdownMenu, MenuExtraContent } from "@itwin/itwinui-react";
import type { ToolbarCustomItem } from "../../toolbar/ToolbarItem";
import { ExpandIndicator } from "./ExpandIndicator";
import { Item } from "./Item";
import { GroupMenuItem, usePopoverPlacement } from "./GroupItem";
import { ToolGroupOverflowContext } from "./OverflowButton";
import { ToolbarContext } from "./Toolbar";

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
