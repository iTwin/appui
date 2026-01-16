/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import "./HeaderIconToolbar.scss";
import * as React from "react";
import {
  ButtonGroup,
  Divider,
  DropdownMenu,
  IconButton,
  MenuDivider,
  MenuItem,
  Text,
} from "@itwin/itwinui-react";
import { SvgMore, SvgSearch } from "@itwin/itwinui-icons-react";
import { HeaderSearch } from "./HeaderSearch.js";
import type { WidgetContentLayout } from "../WidgetContentLayout.js";

type WidgetContentLayoutHeaderProps = React.ComponentProps<
  typeof WidgetContentLayout.Header
>;
type IconMenu = NonNullable<WidgetContentLayoutHeaderProps["icons"]>[number];

interface IconMenuSearch {
  type: "search";
}

type SearchExpandedState = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];

interface HeaderIconToolbarProps
  extends Pick<WidgetContentLayoutHeaderProps, "iconSize" | "onSearch"> {
  /** Array of icon menu items to display, including regular icons, search, and dividers. */
  menuIcons: (IconMenu | IconMenuSearch)[];
  /** State tuple controlling whether the search box is expanded or collapsed. */
  searchExpandedState: SearchExpandedState;
}

/**
 * Header toolbar component that displays menu icons with overflow handling.
 * Renders a button group with icons, search functionality, and an overflow menu.
 * Icons that don't fit in the available space are moved into a dropdown menu.
 * @internal
 */
export function HeaderIconToolbar(props: HeaderIconToolbarProps) {
  const [searchIsExpanded, setSearchIsExpanded] = props.searchExpandedState;
  const searchState = React.useState("");

  return (
    <div
      className="nz-widget-widgetContentLayout-header-headerIconToolbar"
      data-_appui-icon-size={props.iconSize}
      data-_appui-search-expanded={searchIsExpanded ? "true" : "false"}
      data-_appui-single-item={props.menuIcons.length === 1 ? "true" : "false"}
    >
      <ButtonGroup
        key={String(searchIsExpanded)}
        className="nz-buttonGroup"
        overflowPlacement="end"
        overflowButton={(overflowStart) => (
          <DropdownMenu
            menuItems={(close) =>
              Array(props.menuIcons.length - overflowStart)
                .fill(null)
                .map((_, _index) => {
                  const index = overflowStart + _index;
                  const icon = props.menuIcons.at(index);
                  if (!icon) return <></>;
                  return icon.type === "divider" ? (
                    _index === 0 || searchIsExpanded ? (
                      <React.Fragment key={index}></React.Fragment>
                    ) : (
                      <MenuDivider key={index} />
                    )
                  ) : icon.type === "search" ? (
                    !searchIsExpanded ? (
                      <MenuItem
                        key={index}
                        onClick={() => {
                          close();
                          setSearchIsExpanded(true);
                        }}
                        startIcon={<SvgSearch />}
                      >
                        Search
                      </MenuItem>
                    ) : (
                      <React.Fragment key={index}></React.Fragment>
                    )
                  ) : (
                    <MenuItem
                      isSelected={icon.isActive}
                      disabled={icon.disabled}
                      key={index}
                      onClick={() => {
                        icon.onClick();
                        close();
                      }}
                      startIcon={<>{icon.icon}</>}
                    >
                      {icon.label}
                    </MenuItem>
                  );
                })
            }
          >
            <IconButton
              size={props.iconSize}
              styleType="borderless"
              aria-label="More"
            >
              <SvgMore />
            </IconButton>
          </DropdownMenu>
        )}
      >
        {props.menuIcons.map((icon, index) =>
          icon.type === "divider" ? (
            <Divider
              orientation="vertical"
              key={icon.key ?? `divider-${index}`}
            />
          ) : icon.type === "search" ? (
            <HeaderSearch
              key="search"
              searchExpandedState={props.searchExpandedState}
              searchState={searchState}
              iconSize={props.iconSize}
              onSearch={props.onSearch}
            />
          ) : (
            <IconButton
              disabled={icon.disabled}
              label={
                icon.tooltipContent ? (
                  <>
                    {icon.label}
                    <Text isMuted variant="small">
                      {icon.tooltipContent}
                    </Text>
                  </>
                ) : (
                  icon.label
                )
              }
              key={icon.label}
              size={props.iconSize}
              styleType="borderless"
              onClick={icon.onClick}
              labelProps={{ placement: "bottom" }}
              isActive={icon.isActive}
              className="nz-iconButton"
            >
              {icon.icon}
            </IconButton>
          )
        )}
      </ButtonGroup>
    </div>
  );
}
