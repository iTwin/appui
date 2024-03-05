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
import { SvgProgressBackward } from "@itwin/itwinui-icons-react";
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
import { ExpandIndicator } from "./ExpandIndicator";
import { Item } from "./Item";
import { ToolbarContext } from "./Toolbar";

/** @internal */
interface GroupItemProps extends CommonProps {
  item: ToolbarGroupItem;
}

/** @internal */
export function GroupItem(props: GroupItemProps) {
  const { item } = props;
  const isHidden = useConditionalValue(item.isHidden);
  const placement = usePlacement();

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
    <DropdownMenu
      className={props.className}
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

/** @internal */
export function usePlacement() {
  const context = React.useContext(ToolbarContext);
  if (!context) return undefined;

  return `${context.expandsTo}-${context.panelAlignment}` as const;
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
        {columns.map((columnItems, columnIndex) => (
          <Flex.Item key={columnIndex}>
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
  const isDisabled = useConditionalValue(item.isDisabled);
  const isGroupItem = isToolbarGroupItem(item);
  return (
    <MenuItem
      startIcon={<Icon iconSpec={iconSpec} />}
      onClick={() => {
        if (isGroupItem) {
          onExpandGroup(item);
          return;
        }
        item.execute();
        onClose();
      }}
      disabled={isDisabled}
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
