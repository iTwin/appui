/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import "./HeaderLayout.scss";
import * as React from "react";
import {
  DropdownButton,
  MenuItem,
  Text,
  ToggleSwitch,
} from "@itwin/itwinui-react";
import { HeaderTopBar } from "./HeaderTopBar.js";
import type { WidgetContentLayout } from "../WidgetContentLayout.js";

type WidgetContentLayoutHeaderProps = React.ComponentProps<
  typeof WidgetContentLayout.Header
>;

type HeaderLayoutProps = Pick<
  WidgetContentLayoutHeaderProps,
  | "toggle"
  | "buttons"
  | "menu"
  | "title"
  | "onSearch"
  | "icons"
  | "iconSize"
  | "children"
>;

/**
 * A layout component for the header, including optional search, icons, buttons, title, and a menu.
 * @internal
 */
export function HeaderLayout(props: HeaderLayoutProps) {
  const buttons = props.buttons || [];
  const icons = props.icons || [];
  const leftItems = [
    props.toggle ? <ToggleSwitch key="toggle" {...props.toggle} /> : undefined,
    props.menu ? (
      <DropdownButton
        key="menu"
        className="nz-menu"
        menuItems={props.menu.items.map((i) => (
          <MenuItem key={i.label} onClick={i.onClick}>
            {i.label}
          </MenuItem>
        ))}
      >
        {props.menu.title}
      </DropdownButton>
    ) : undefined,
    buttons.length > 0 ? (
      <div key="buttons" className="nz-buttons">
        {buttons}
      </div>
    ) : undefined,
  ].filter((item) => !!item);
  const topBarLeftItems = props.title
    ? [
        <Text key="title" className="nz-title">
          {props.title}
        </Text>,
      ]
    : leftItems.slice(0, 1);
  const remainingLeftItems = props.title ? leftItems : leftItems.slice(1);
  return (
    <div className="nz-widget-widgetContentLayout-header-headerLayout">
      {(props.onSearch || topBarLeftItems.length > 0 || icons.length > 0) && (
        <HeaderTopBar
          primaryContent={topBarLeftItems}
          onSearch={props.onSearch}
          icons={icons}
          iconSize={props.iconSize}
        />
      )}
      {remainingLeftItems.map((item) => (
        <div className="nz-remainingItems" key={item.key}>
          {item}
        </div>
      ))}
      {props.children}
    </div>
  );
}
