import "./HeaderLayout.scss";
import classNames from "classnames";
import React from "react";

import { DropdownButton, MenuItem, Text, ToggleSwitch } from "@itwin/itwinui-react";

import type { HeaderFirstRowProps } from "./HeaderFirstRow.js";
import { HeaderFirstRow } from "./HeaderFirstRow.js";

/**
 * Props for the HeaderLayout component.
 */
export interface HeaderLayoutProps extends Omit<HeaderFirstRowProps, "leftContent"> {
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
  toggle?: React.ComponentProps<typeof ToggleSwitch>,
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
  }
  /**
   *  Title to display in the header.
   */
  title?: string;
}

/**
 * A layout component for the header, including optional search, icons, buttons, title, and a menu.
 */
export const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  className,
  buttonsClassName,
  topLeftClassName,
  toggle,
  onSearch,
  icons = [],
  menu,
  buttons = [],
  iconSize,
  title,
}) => {
  const leftItems = [
    toggle ? <React.Fragment key="toggle">{<ToggleSwitch {...toggle}/>}</React.Fragment> : undefined,
    menu ? <React.Fragment key="menu">{<DropdownButton className="nz-widget-layout-header-menu" menuItems={menu.items.map(i => <MenuItem key={i.label} onClick={i.onClick}>{i.label}</MenuItem>)}>{menu.title}</DropdownButton>}</React.Fragment> : undefined,
    buttons?.length > 0 ? (
      <div
        key="buttons"
        className={classNames("nz-header-buttons", buttonsClassName)}
      >
        {buttons}
      </div>
    ) : undefined,
  ].filter((item) => !!item);
  const firstRowLeftItems = title ? [<Text key="title" className="nz-header-title">{title}</Text>] : leftItems.slice(0, 1);
  const remainingLeftItems = title ? leftItems : leftItems.slice(1);

  return (
    <div className={classNames("nz-widget-layout-header-header", className)}>
      {(onSearch || firstRowLeftItems.length > 0 || icons.length > 0) && (
        <div className="nz-header-first-row">
          <HeaderFirstRow
            leftContent={firstRowLeftItems}
            onSearch={onSearch}
            icons={icons}
            iconSize={iconSize}
            topLeftClassName={topLeftClassName}
          />
        </div>
      )}
      {remainingLeftItems.map((item, index) => (
        <div className="nz-header-remaining-item" key={index}>{item}</div>
      ))}
    </div>
  );
};
