/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import "./HeaderTopBar.scss";
import classNames from "classnames";
import React from "react";

import { HeaderIconToolbar } from "./HeaderIconToolbar.js";
import type { IconMenuSearch } from "./types.js";
import type {
  IconMenu,
  IconMenuDivider,
  WidgetContentLayoutHeaderProps,
} from "../WidgetContentLayout.js";

/**
 * Props for the [[HeaderTopBar]] component.
 * @internal
 */
interface HeaderTopBarProps
  extends Pick<
    WidgetContentLayoutHeaderProps,
    "icons" | "onSearch" | "iconSize"
  > {
  primaryContent: React.JSX.Element[];
}

/**
 * Internal layout component that renders the top bar of the widget header,
 * including optional left content and a top-right icon/search area.
 * @internal
 */
export function HeaderTopBar(props: HeaderTopBarProps) {
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
        "nz-widget-widgetContentLayout-header-headerTopBar",
        (props.primaryContent.length === 0 || menuIcons.length === 0) &&
          "nz-singleColumn"
      )}
      data-search-expanded={searchExpandedState[0] ? "true" : "false"}
    >
      {props.primaryContent.length > 0 && (
        <div className="nz-primaryContent">{props.primaryContent}</div>
      )}
      {menuIcons.length > 0 && (
        <HeaderIconToolbar
          menuIcons={menuIcons}
          onSearch={props.onSearch}
          searchExpandedState={searchExpandedState}
          iconSize={props.iconSize}
        />
      )}
    </div>
  );
}
