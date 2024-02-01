/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { type CommonProps } from "@itwin/core-react";
import type { DropdownButton } from "@itwin/itwinui-react";
import { DropdownMenu, MenuExtraContent } from "@itwin/itwinui-react";
import type { ToolbarCustomItem } from "../ToolbarItem";
import { useConditionalValue } from "../../hooks/useConditionalValue";
import { ExpandIndicator } from "./ExpandIndicator";
import { Item } from "./Item";
import { usePlacement } from "./GroupItem";

/** @internal */
interface CustomItemProps extends CommonProps {
  item: ToolbarCustomItem;
}

/** @internal */
export function CustomItem(props: CustomItemProps) {
  const { item } = props;
  const isDisabled = useConditionalValue(item.isDisabled);
  const isHidden = useConditionalValue(item.isHidden);
  const placement = usePlacement();

  const menuItems = React.useCallback<
    React.ComponentProps<typeof DropdownButton>["menuItems"]
  >(
    (_close) => {
      return [<MenuExtraContent key={0}>{item.panelContent}</MenuExtraContent>];
    },
    [item]
  );
  if (isHidden) return null;
  return (
    // TODO: replace with `Popover` when available.
    <DropdownMenu
      className={props.className}
      disabled={isDisabled}
      style={props.style}
      menuItems={menuItems}
      placement={placement}
    >
      <Item item={item}>
        <ExpandIndicator />
      </Item>
    </DropdownMenu>
  );
}
