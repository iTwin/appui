/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { type CommonProps, Icon } from "@itwin/core-react";
import type { DropdownButton } from "@itwin/itwinui-react";
import {
  DropdownMenu,
  IconButton,
  MenuExtraContent,
} from "@itwin/itwinui-react";
import type { ToolbarCustomItem } from "../ToolbarItem";
import { useConditionalValue } from "../../hooks/useConditionalValue";
import { ItemLabel } from "./ActionItem";
import { ExpandIndicator } from "./ExpandIndicator";

/** @internal */
export interface CustomItemProps extends CommonProps {
  item: ToolbarCustomItem;
}

/** @internal */
export function CustomItem(props: CustomItemProps) {
  const { item } = props;
  const label = useConditionalValue(item.label);
  const description = useConditionalValue(item.description);
  const isDisabled = useConditionalValue(item.isDisabled);
  const isHidden = useConditionalValue(item.isHidden);
  const iconSpec = useConditionalValue(item.icon);

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
    >
      <IconButton
        className={props.className}
        styleType="borderless"
        disabled={isDisabled}
        isActive={item.isActive}
        label={<ItemLabel label={label} description={description} />}
        style={props.style}
      >
        <Icon iconSpec={iconSpec} />
        <ExpandIndicator />
      </IconButton>
    </DropdownMenu>
  );
}
