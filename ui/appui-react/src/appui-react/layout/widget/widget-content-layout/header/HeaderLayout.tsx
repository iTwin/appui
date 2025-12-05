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

/**
 * Props for the HeaderLayout component.
 */
export interface HeaderLayoutProps
  extends Omit<ComponentProps<typeof HeaderFirstRow>, "leftContent"> {
  /**
   * CSS class name for the header element.
   */
  className?: string;
  /**
   * CSS class name for the buttons container.
   */
  buttonsClassName?: string;

  /**
   * React node to display a toggle in the header.
   */
  toggle?: React.ComponentProps<typeof ToggleSwitch>;
  /**
   * Array of buttons to display in the header.
   */
  buttons?: React.ReactNode[];
  /**
   * React node to display a menu in the header.
   */
  menu?: {
    title: string;
    items: { label: string; onClick: () => void }[];
  };
  /**
   *  Title to display in the header.
   */
  title?: string;
}

/**
 * A layout component for the header, including optional search, icons, buttons, title, and a menu.
 */
export function HeaderLayout(props: HeaderLayoutProps) {
  const buttons = props.buttons || [];
  const icons = props.icons || [];
  const leftItems = [
    props.toggle ? (
      <React.Fragment key="toggle">
        {<ToggleSwitch {...props.toggle} />}
      </React.Fragment>
    ) : undefined,
    props.menu ? (
      <React.Fragment key="menu">
        {
          <DropdownButton
            className="nz-menu"
            menuItems={props.menu.items.map((i) => (
              <MenuItem key={i.label} onClick={i.onClick}>
                {i.label}
              </MenuItem>
            ))}
          >
            {props.menu.title}
          </DropdownButton>
        }
      </React.Fragment>
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
