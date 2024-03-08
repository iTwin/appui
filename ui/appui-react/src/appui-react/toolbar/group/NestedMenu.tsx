/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./NestedMenu.scss";
import * as React from "react";
import { flattenChildren } from "@itwin/core-react";
import { Flex, IconButton, List, ListItem, Text } from "@itwin/itwinui-react";
import {
  SvgChevronRightSmall,
  SvgProgressBackward,
} from "@itwin/itwinui-icons-react";

interface NestedMenuProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  nested?: boolean;
  onBack?: () => void;
}

interface NestedMenuContextArgs {
  columnIndex?: number;
  itemIndex?: number;
  focusedColumnIndex?: number;
  focusedItemIndex?: number;
}

const NestedMenuContext = React.createContext<
  NestedMenuContextArgs | undefined
>(undefined);

/** @internal */
export function NestedMenu({
  children,
  nested,
  title,
  onBack,
}: NestedMenuProps) {
  const flattened = flattenChildren(children);
  const columns = React.Children.toArray(flattened);
  const columnIndexToItemCountMap = columns.reduce<Map<number, number>>(
    (acc, column, columnIndex) => {
      if (!React.isValidElement<ItemProps>(column)) {
        acc.set(columnIndex, 0);
        return acc;
      }

      const columnItems = React.Children.toArray(column.props.children);
      const length = columnItems.length;
      acc.set(columnIndex, length);
      return acc;
    },
    new Map()
  );

  const [focusedColumnIndex, setFocusedColumnIndex] = React.useState(0);
  const [focusedItemIndex, setFocusedItemIndex] = React.useState(0);

  const itemCount =
    columnIndexToItemCountMap.get(focusedColumnIndex) ??
    Number.POSITIVE_INFINITY;
  const actualFocusedItemIndex = Math.min(focusedItemIndex, itemCount - 1);
  return (
    <Flex
      flexDirection="column"
      tabIndex={-1}
      onKeyDown={(e) => {
        switch (e.key) {
          case "ArrowDown": {
            const newIndex = (actualFocusedItemIndex + 1) % itemCount;
            setFocusedItemIndex(newIndex);
            break;
          }
          case "ArrowUp": {
            const newIndex = mod(actualFocusedItemIndex - 1, itemCount);
            setFocusedItemIndex(newIndex);
            break;
          }
          case "ArrowRight": {
            const columnCount = columnIndexToItemCountMap.size;
            const newIndex = (focusedColumnIndex + 1) % columnCount;
            setFocusedColumnIndex(newIndex);
            break;
          }
          case "ArrowLeft": {
            const columnCount = columnIndexToItemCountMap.size;
            const newIndex = mod(focusedColumnIndex - 1, columnCount);
            setFocusedColumnIndex(newIndex);
            break;
          }
        }
      }}
    >
      <Flex
        flexDirection="row"
        className="uifw-toolbar-group-nestedMenu_menuHeader"
      >
        {nested && (
          <IconButton styleType="borderless" onClick={onBack}>
            <SvgProgressBackward />
          </IconButton>
        )}
        <Flex.Item flex={1}>
          <Text
            variant="subheading"
            className="uifw-toolbar-group-nestedMenu_menuTitle"
          >
            {title}
          </Text>
        </Flex.Item>
      </Flex>
      <Flex.Item flex={1} className="uifw-toolbar-group-nestedMenu_columns">
        <Flex>
          {columns.map((column, columnIndex) => {
            return (
              <NestedMenuContext.Provider
                key={columnIndex}
                value={{
                  focusedItemIndex: actualFocusedItemIndex,
                  focusedColumnIndex,
                  columnIndex,
                }}
              >
                {column}
              </NestedMenuContext.Provider>
            );
          })}
        </Flex>
      </Flex.Item>
    </Flex>
  );
}

NestedMenu.Item = Item;
NestedMenu.Column = Column;

interface ColumnProps {
  children?: React.ReactNode;
}

function Column({ children }: ColumnProps) {
  const context = React.useContext(NestedMenuContext);
  const items = React.Children.toArray(children);
  return (
    <Flex.Item>
      <List>
        {items.map((item, itemIndex) => {
          return (
            <NestedMenuContext.Provider
              key={itemIndex}
              value={{ ...context, itemIndex }}
            >
              {item}
            </NestedMenuContext.Provider>
          );
        })}
      </List>
    </Flex.Item>
  );
}

interface ItemProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  submenu?: boolean;
  onClick?: () => void;
}

function Item({ children, icon, disabled, submenu, onClick }: ItemProps) {
  const context = React.useContext(NestedMenuContext);
  const { columnIndex, itemIndex, focusedColumnIndex, focusedItemIndex } =
    context || {};
  const ref = React.useRef<HTMLLIElement>(null);
  const isFocused = React.useMemo(() => {
    if (focusedColumnIndex === undefined) return false;
    if (focusedItemIndex === undefined) return false;
    return focusedColumnIndex === columnIndex && focusedItemIndex === itemIndex;
  }, [columnIndex, itemIndex, focusedColumnIndex, focusedItemIndex]);
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!isFocused) return;
    element.focus();
  }, [isFocused]);
  return (
    <ListItem
      actionable
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      tabIndex={isFocused ? 0 : -1}
      ref={ref}
      onKeyDown={(e) => {
        switch (e.key) {
          case "Enter":
          case " ":
          case "Spacebar": {
            onClick?.();
            break;
          }
        }
      }}
    >
      <ListItem.Icon>{icon}</ListItem.Icon>
      <ListItem.Content>{children}</ListItem.Content>
      {submenu && (
        <ListItem.Icon>
          <SvgChevronRightSmall />
        </ListItem.Icon>
      )}
    </ListItem>
  );
}

function mod(num: number, modulo: number) {
  return ((num % modulo) + modulo) % modulo;
}
