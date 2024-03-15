/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import type { DropdownButton } from "@itwin/itwinui-react";
import { DropdownMenu, MenuExtraContent } from "@itwin/itwinui-react";
import type { ToolbarCustomItem } from "../ToolbarItem";
import { ExpandIndicator } from "./ExpandIndicator";
import { Item } from "./Item";
import { GroupMenuItem, usePopoverPlacement } from "./GroupItem";
import { ToolGroupOverflowContext } from "./OverflowButton";

/** @internal */
export interface CustomItemProps {
  item: ToolbarCustomItem;
}

/** @internal */
export const CustomItem = React.forwardRef<HTMLButtonElement, CustomItemProps>(
  function CustomItem({ item }, ref) {
    const placement = usePopoverPlacement();
    const toolGroupOverflow = React.useContext(ToolGroupOverflowContext);

    const menuItems = React.useCallback<
      React.ComponentProps<typeof DropdownButton>["menuItems"]
    >(
      (_close) => {
        return [
          <MenuExtraContent key={0}>{item.panelContent}</MenuExtraContent>,
        ];
      },
      [item]
    );

    if (toolGroupOverflow) {
      return <GroupMenuItem item={item} />;
    }
    return (
      <DropdownMenu menuItems={menuItems} placement={placement}>
        <Item ref={ref} item={item}>
          <ExpandIndicator />
        </Item>
      </DropdownMenu>
    );
  }
);
