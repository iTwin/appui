/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./GroupItem.scss";
import * as React from "react";
import { type CommonProps, Icon } from "@itwin/core-react";
import type { DropdownButton } from "@itwin/itwinui-react";
import {
  DropdownMenu,
  Flex,
  IconButton,
  MenuExtraContent,
  MenuItem,
  Text,
} from "@itwin/itwinui-react";
import { isToolbarGroupItem, type ToolbarGroupItem } from "../ToolbarItem";
import { useConditionalValue } from "../../hooks/useConditionalValue";
import { ItemLabel } from "./ActionItem";
import { SvgProgressBackward } from "@itwin/itwinui-icons-react";
import { ExpandIndicator } from "./ExpandIndicator";

/** @internal */
export interface GroupItemProps extends CommonProps {
  item: ToolbarGroupItem;
}

/** @internal */
export function GroupItem(props: GroupItemProps) {
  const { item } = props;
  const label = useConditionalValue(item.label);
  const description = useConditionalValue(item.description);
  const isDisabled = useConditionalValue(item.isDisabled);
  const isHidden = useConditionalValue(item.isHidden);
  const iconSpec = useConditionalValue(item.icon);

  const menuItems = React.useCallback<
    React.ComponentProps<typeof DropdownButton>["menuItems"]
  >(
    (close) => {
      return [
        <MenuExtraContent key={0}>
          <Menu item={item} onClose={close} />
        </MenuExtraContent>,
      ];
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

interface MenuProps {
  item: ToolbarGroupItem;
  onClose: () => void;
}

function Menu({ item, onClose }: MenuProps) {
  const [groupStack, setGroupStack] = React.useState([item]);
  const activeGroup = groupStack[groupStack.length - 1];
  const { items } = activeGroup;
  const columns = React.useMemo(() => {
    const columnCount = getColumnCount(items.length);
    return toColumns(items, columnCount);
  }, [items]);
  return (
    <>
      <Flex>
        {groupStack.length > 1 && (
          <IconButton
            label="Back"
            styleType="borderless"
            onClick={() => {
              setGroupStack((prev) => prev.slice(0, prev.length - 1));
            }}
          >
            <SvgProgressBackward />
          </IconButton>
        )}
        <Flex.Item flex={1}>
          <Text
            variant="subheading"
            className="uifw-toolbar-group-groupItem_menuTitle"
          >
            {item.label}
          </Text>
        </Flex.Item>
      </Flex>
      <Flex>
        {columns.map((columnItems, index) => (
          <Flex.Item key={index}>
            {columnItems.map((columnItem) => (
              <ToolbarMenuItem
                key={columnItem.id}
                item={columnItem}
                onExpandGroup={(groupItem) => {
                  setGroupStack((prev) => [...prev, groupItem]);
                }}
                onClose={onClose}
              />
            ))}
          </Flex.Item>
        ))}
      </Flex>
    </>
  );
}

interface ToolbarMenuItemProps {
  item: ToolbarGroupItem["items"][number];
  onExpandGroup: (item: ToolbarGroupItem) => void;
  onClose: () => void;
}

function ToolbarMenuItem({
  item,
  onExpandGroup,
  onClose,
}: ToolbarMenuItemProps) {
  const iconSpec = useConditionalValue(item.icon);
  const isGroupItem = isToolbarGroupItem(item);
  return (
    <MenuItem
      icon={<Icon iconSpec={iconSpec} />}
      onClick={() => {
        if (isGroupItem) {
          onExpandGroup(item);
          return;
        }
        item.execute();
        onClose();
      }}
    >
      {item.label}
      {isGroupItem && " >"}
    </MenuItem>
  );
}

function getColumnCount(itemCount: number): number {
  if (itemCount <= 6) return 1;
  if (itemCount <= 24) return 2;
  if (itemCount <= 36) return 3;
  return 4;
}

function toColumns<T>(
  items: ReadonlyArray<T>,
  columnCount: number
): Array<Array<T>> {
  const itemsPerColumn = Math.ceil(items.length / columnCount);
  return items.reduce<Array<Array<T>>>((acc, item, index) => {
    const columnIndex = Math.floor(index / itemsPerColumn);
    if (columnIndex >= acc.length) {
      acc.push([item]);
      return acc;
    }
    acc[columnIndex].push(item);
    return acc;
  }, []);
}
