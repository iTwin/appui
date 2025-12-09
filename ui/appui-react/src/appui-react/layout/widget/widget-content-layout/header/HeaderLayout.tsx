/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import "./HeaderLayout.scss";
import classNames from "classnames";
import type { ComponentProps } from "react";
import React from "react";

import {
  DropdownButton,
  MenuItem,
  Text,
  ToggleSwitch,
} from "@itwin/itwinui-react";

import { HeaderFirstRow } from "./HeaderFirstRow.js";
import type { WidgetContentLayoutHeaderProps } from "../WidgetContentLayout.js";

/**
 * Props for the [[HeaderLayout]] component.
 * @internal
 */
type HeaderLayoutProps = Pick<
  WidgetContentLayoutHeaderProps,
  | "className"
  | "buttonsClassName"
  | "toggle"
  | "buttons"
  | "menu"
  | "title"
  | "onSearch"
  | "icons"
  | "iconSize"
  | "topLeftClassName"
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
      <div
        key="buttons"
        className={classNames("nz-buttons", props.buttonsClassName)}
      >
        {buttons}
      </div>
    ) : undefined,
  ].filter((item) => !!item);
  const firstRowLeftItems = props.title
    ? [
        <Text key="title" className="nz-title">
          {props.title}
        </Text>,
      ]
    : leftItems.slice(0, 1);
  const remainingLeftItems = props.title ? leftItems : leftItems.slice(1);
  return (
    <div
      className={classNames(
        "nz-widget-widgetContentLayout-header-headerLayout",
        props.className
      )}
    >
      {(props.onSearch || firstRowLeftItems.length > 0 || icons.length > 0) && (
        <HeaderFirstRow
          leftContent={firstRowLeftItems}
          onSearch={props.onSearch}
          icons={icons}
          iconSize={props.iconSize}
          topLeftClassName={props.topLeftClassName}
        />
      )}
      {remainingLeftItems.map((item, index) => (
        <div className="nz-remainingItems" key={index}>
          {item}
        </div>
      ))}
    </div>
  );
}
