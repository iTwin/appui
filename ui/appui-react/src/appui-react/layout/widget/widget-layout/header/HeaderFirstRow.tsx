import "./HeaderFirstRow.scss";
import classNames from "classnames";
import React from "react";

import { HeaderTopRight } from "./HeaderTopRight.js";
import type { IconMenu, IconMenuDivider, IconMenuSearch } from "./types.js";

/**
 *
 */
export interface HeaderFirstRowProps {
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
export const HeaderFirstRow: React.FC<HeaderFirstRowProps> = (props) => {
  const { onSearch } = props;
  const icons = props.icons || [];
  const menuIcons: (IconMenu | IconMenuSearch)[] = [...icons].reverse();
  if (onSearch) {
    if (icons.length > 0)
      menuIcons.push({ type: "divider" } as IconMenuDivider);
    menuIcons.push({ type: "search" } as IconMenuSearch);
  }

  const searchExpandedState = React.useState(false);

  return <div className={classNames("nz-header-first-row-root", (props.leftContent.length === 0 || menuIcons.length === 0) && "single-column")}>
    {props.leftContent.length > 0 &&
      <div className={classNames("nz-header-first-row-top-left", props.topLeftClassName)}>
        {props.leftContent}
      </div>}
    {menuIcons.length > 0 && (
      <HeaderTopRight
        menuIcons={menuIcons}
        onSearch={props.onSearch}
        searchExpandedState={searchExpandedState}
        iconSize={props.iconSize}
      />
    )}
  </div>;
};
