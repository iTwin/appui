/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./NestedMenu.scss";
import * as React from "react";
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

/** @internal */
export function NestedMenu({
  children,
  nested,
  title,
  onBack,
}: NestedMenuProps) {
  return (
    <Flex flexDirection="column">
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
        <Flex>{children}</Flex>
      </Flex.Item>
    </Flex>
  );
}

NestedMenu.Item = Item;
NestedMenu.Column = Column;

interface ItemProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  submenu?: boolean;
  onClick?: () => void;
}

function Item({ children, icon, disabled, submenu, onClick }: ItemProps) {
  return (
    <ListItem
      actionable
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
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

interface ColumnProps {
  children?: React.ReactNode;
}

function Column({ children }: ColumnProps) {
  return (
    <Flex.Item>
      <List>{children}</List>
    </Flex.Item>
  );
}
