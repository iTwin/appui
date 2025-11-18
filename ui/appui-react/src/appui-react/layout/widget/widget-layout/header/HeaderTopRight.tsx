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

import { GAP_WIDTH, ICON_SIZE_MAP, MAX_SEARCH_WIDTH } from "./constants.js";
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
  const headerRef = React.useRef<HTMLDivElement>(null);
  const searchState = React.useState("");

  const iconPixelSize = ICON_SIZE_MAP[props.iconSize ?? "normal"];
  return (
    <div
      ref={headerRef}
      className="nz-header-top-right-root"
      style={{
        minWidth:
          props.menuIcons.length === 1
            ? searchIsExpanded
              ? MAX_SEARCH_WIDTH
              : iconPixelSize
            : iconPixelSize +
              (searchIsExpanded ? GAP_WIDTH + MAX_SEARCH_WIDTH : 0),
        minHeight: iconPixelSize,
      }}
    >
      <ButtonGroup
        key={String(searchIsExpanded)}
        className="nz-button-group"
        overflowPlacement="start"
        overflowButton={(overflowStart) => (
          <DropdownMenu
            menuItems={(close) =>
              Array(Math.max(overflowStart + 1, 0))
                .fill(null)
                .map((_, _index) => {
                  const index = overflowStart - _index;
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
              // className={styles.divider}
              key={index}
            />
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
              className="nz-icon-button"
            >
              {icon.icon}
            </IconButton>
          )
        )}
      </ButtonGroup>
    </div>
  );
};
