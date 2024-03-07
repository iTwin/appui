/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { type CommonProps, Icon } from "@itwin/core-react";
import { Popover, Surface } from "@itwin/itwinui-react";
import { isToolbarGroupItem, type ToolbarGroupItem } from "../ToolbarItem";
import { useConditionalValue } from "../../hooks/useConditionalValue";
import { ExpandIndicator } from "./ExpandIndicator";
import { Item } from "./Item";
import { ToolbarContext } from "./Toolbar";
import { NestedMenu } from "./NestedMenu";

/** @internal */
interface GroupItemProps extends CommonProps {
  item: ToolbarGroupItem;
}

/** @internal */
export function GroupItem(props: GroupItemProps) {
  const { item } = props;
  const isHidden = useConditionalValue(item.isHidden);
  const placement = usePlacement();
  const [visible, setVisible] = React.useState(false);

  if (isHidden) return null;
  return (
    <Popover
      content={<Menu item={item} onClose={() => setVisible(!visible)} />}
      placement={placement}
      visible={visible}
      onVisibleChange={setVisible}
    >
      <Item item={item}>
        <ExpandIndicator />
      </Item>
    </Popover>
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
  onClose?: () => void;
}

function Menu({ item, onClose }: MenuProps) {
  const [groupStack, setGroupStack] = React.useState([item]);
  const activeGroup = groupStack[groupStack.length - 1];
  const { items } = activeGroup;
  const columns = React.useMemo(() => {
    const columnCount = getColumnCount(items.length);
    return toColumns(items, columnCount);
  }, [items]);
  const nested = groupStack.length > 1;
  return (
    <Surface elevation={1}>
      <Surface.Body isPadded>
        <NestedMenu
          title={activeGroup.label}
          nested={nested}
          onBack={() => {
            setGroupStack((prev) => prev.slice(0, prev.length - 1));
          }}
        >
          {columns.map((columnItems, columnIndex) => (
            <NestedMenu.Column key={columnIndex}>
              {columnItems.map((columnItem) => (
                <MenuItem
                  key={columnItem.id}
                  item={columnItem}
                  onExpandGroup={(groupItem) => {
                    setGroupStack((prev) => [...prev, groupItem]);
                  }}
                  onClose={onClose}
                />
              ))}
            </NestedMenu.Column>
          ))}
        </NestedMenu>
      </Surface.Body>
    </Surface>
  );
}

interface MenuItemProps {
  item: ToolbarGroupItem["items"][number];
  onExpandGroup?: (item: ToolbarGroupItem) => void;
  onClose?: () => void;
}

function MenuItem({ item, onExpandGroup, onClose }: MenuItemProps) {
  const iconSpec = useConditionalValue(item.icon);
  const isDisabled = useConditionalValue(item.isDisabled);
  const label = useConditionalValue(item.label);
  const isGroupItem = isToolbarGroupItem(item);
  return (
    <NestedMenu.Item
      icon={<Icon iconSpec={iconSpec} />}
      disabled={isDisabled}
      submenu={isGroupItem}
      onClick={() => {
        if (isGroupItem) {
          onExpandGroup?.(item);
          return;
        }
        item.execute();
        onClose?.();
      }}
    >
      {label}
    </NestedMenu.Item>
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
