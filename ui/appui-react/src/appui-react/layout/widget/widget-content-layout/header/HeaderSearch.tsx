/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import "./HeaderSearch.scss";
import React from "react";

import { SearchBox } from "@itwin/itwinui-react";

import type { SearchExpandedState } from "./types.js";
import { SvgClose, SvgSearch } from "@itwin/itwinui-icons-react";

interface HeaderSearchProps {
  iconSize?: "small" | "large";
  onSearch?: (value: string) => void;
  searchExpandedState: SearchExpandedState;
  searchState: [string, React.Dispatch<React.SetStateAction<string>>];
}

/**
 *
 */
export const HeaderSearch: React.FC<HeaderSearchProps> = (props) => {
  const [isExpanded, setIsExpanded] = props.searchExpandedState;
  const [searchText, setSearchText] = props.searchState;
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (!isExpanded) return;
    const el = inputRef.current;
    if (!el) return;
    // Focus on next animation frame to allow expand animation / layout to settle.
    const id = requestAnimationFrame(() => {
      el.focus();
      const v = el.value;
      if (v) el.selectionStart = el.selectionEnd = v.length;
    });
    return () => cancelAnimationFrame(id);
  }, [isExpanded]);

  return (
    <SearchBox
      onExpand={() => setIsExpanded(true)}
      isExpanded={isExpanded}
      className="nz-widget-widgetContentLayout-header-headerSearch"
      expandable
      size={props.iconSize}
    >
      <SearchBox.CollapsedState>
        <SearchBox.ExpandButton
          label="Search"
          labelProps={{placement: "bottom"}}
          size={props.iconSize}
          styleType="borderless"
        >
          <SvgSearch />
        </SearchBox.ExpandButton>
      </SearchBox.CollapsedState>
      <SearchBox.ExpandedState>
        <SearchBox.Icon size={props.iconSize}>
          <SvgSearch />
        </SearchBox.Icon>
        <SearchBox.Input
          ref={inputRef}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setSearchText(e.currentTarget.value);
            props.onSearch?.(e.currentTarget.value);
          }}
          value={searchText}
        />
        <SearchBox.CollapseButton
          size={props.iconSize}
          label="Clear"
          labelProps={{ placement: "bottom" }}
          onClick={() => {
            setIsExpanded(false);
            setSearchText("");
            if (searchText) props.onSearch?.("");
          }}
        >
          <SvgClose />
        </SearchBox.CollapseButton>
      </SearchBox.ExpandedState>
    </SearchBox>
  );
};
