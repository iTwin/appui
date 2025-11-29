/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import "./HeaderTopRight.scss";
import React from "react";

import {
  ButtonGroup,
  Divider,
  DropdownMenu,
  IconButton,
  MenuDivider,
  MenuItem,
} from "@itwin/itwinui-react";

import { HeaderSearch } from "./HeaderSearch.js";
import type { IconMenu, IconMenuSearch, SearchExpandedState } from "./types.js";
import { SvgMore, SvgSearch } from "@itwin/itwinui-icons-react";

interface HeaderTopRightProps {
  menuIcons: (IconMenu | IconMenuSearch)[];
  iconSize?: "small" | "large";
  onSearch?: (value: string) => void;
  searchExpandedState: SearchExpandedState;
}

/**
 *
 */
export const HeaderTopRight: React.FC<HeaderTopRightProps> = (props) => {
  const [searchIsExpanded, setSearchIsExpanded] = props.searchExpandedState;
  const searchState = React.useState("");

  return (
    <div
      className="nz-widget-widgetContentLayout-header-headerTopRight"
      data-icon-size={props.iconSize ?? "normal"}
      data-search-expanded={searchIsExpanded ? "true" : "false"}
      data-single-item={props.menuIcons.length === 1 ? "true" : "false"}
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
            <Divider orientation="vertical" key={index} />
          ) : icon.type === "search" ? (
            <HeaderSearch
              key={index}
              searchExpandedState={props.searchExpandedState}
              searchState={searchState}
              iconSize={props.iconSize}
              onSearch={props.onSearch}
            />
          ) : (
            <IconButton
              disabled={icon.disabled}
              label={icon.label}
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
};
