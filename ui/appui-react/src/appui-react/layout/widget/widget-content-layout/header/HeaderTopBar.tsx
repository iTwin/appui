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
  const menuIcons = React.useMemo(() => {
    let icons: (IconMenu | IconMenuSearch)[] = props.icons || [];
    if (props.onSearch) {
      if (icons.length > 0)
        icons = [
          { type: "divider", key: "search-divider" } as IconMenuDivider,
          ...icons.map((icon, index) =>
            icon.type === "divider"
              ? ({ ...icon, key: `divider-${index}` } as IconMenuDivider)
              : icon
          ),
        ];
      icons = [{ type: "search" } as IconMenuSearch, ...icons];
    }
    return icons;
  }, [props.icons, props.onSearch]);

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
