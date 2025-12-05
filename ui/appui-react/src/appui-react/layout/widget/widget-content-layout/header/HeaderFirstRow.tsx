/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import "./HeaderFirstRow.scss";
import classNames from "classnames";
import React from "react";

import { HeaderTopRight } from "./HeaderTopRight.js";
import type { IconMenu, IconMenuDivider, IconMenuSearch } from "./types.js";

interface HeaderFirstRowProps {
  /**
   * CSS class name for the top left container.
   */
  topLeftClassName?: string;
  /**
   * Array of icons to display in the top right of the header.
   */
  icons?: IconMenu[];
  /**
   * Callback function to handle search input changes.
   * Should be memoized to avoid unnecessary re-renders.
   * @param {string} value - The new search value.
   */
  onSearch?: (value: string) => void;
  /**
   * Size of the icons in the header.
   */
  iconSize?: "small" | "large";
  leftContent: React.JSX.Element[];
}

/**
 *
 */
export function HeaderFirstRow(props: HeaderFirstRowProps) {
  let menuIcons: (IconMenu | IconMenuSearch)[] = props.icons || [];
  if (props.onSearch) {
    if (menuIcons.length > 0)
      menuIcons = [{ type: "divider" } as IconMenuDivider, ...menuIcons];
    menuIcons = [{ type: "search" } as IconMenuSearch, ...menuIcons];
  }

  const searchExpandedState = React.useState(false);

  return (
    <div
      className={classNames(
        "nz-widget-widgetContentLayout-header-headerFirstRow",
        (props.leftContent.length === 0 || menuIcons.length === 0) &&
          "nz-singleColumn"
      )}
      data-search-expanded={searchExpandedState[0] ? "true" : "false"}
    >
      {props.leftContent.length > 0 && (
        <div className={classNames("nz-leftContent", props.topLeftClassName)}>
          {props.leftContent}
        </div>
      )}
      {menuIcons.length > 0 && (
        <HeaderTopRight
          menuIcons={menuIcons}
          onSearch={props.onSearch}
          searchExpandedState={searchExpandedState}
          iconSize={props.iconSize}
        />
      )}
    </div>
  );
}
