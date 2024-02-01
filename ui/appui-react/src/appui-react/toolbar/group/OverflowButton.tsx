/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./OverflowButton.scss";
import classnames from "classnames";
import * as React from "react";
import { DropdownMenu, IconButton, MenuItem } from "@itwin/itwinui-react";
import { SvgMore } from "@itwin/itwinui-icons-react";
import { ToolbarContext } from "./Toolbar";

/** @internal */
interface ToolGroupOverflow {
  close: () => void;
}

/** @internal */
export const ToolGroupOverflowContext = React.createContext<
  ToolGroupOverflow | undefined
>(undefined);

/** @internal */
export function OverflowButton(props: React.PropsWithChildren<{}>) {
  const placement = usePlacement();
  const orientation = useMenuOrientation();
  return (
    <DropdownMenu
      className={classnames(
        "uifw-toolbar-group-overflowButton_menu",
        `uifw-${orientation}`
      )}
      menuItems={(close) => {
        const children = React.Children.toArray(props.children);
        return [
          <ToolGroupOverflowContext.Provider key={0} value={{ close }}>
            {children.map((child, index) => (
              <MenuItem
                key={index}
                className="uifw-toolbar-group-overflowButton_menuItem"
              >
                {child}
              </MenuItem>
            ))}
          </ToolGroupOverflowContext.Provider>,
        ];
      }}
      placement={placement}
    >
      <IconButton label="More" styleType="borderless">
        <SvgMore />
      </IconButton>
    </DropdownMenu>
  );
}

function usePlacement() {
  const context = React.useContext(ToolbarContext);
  if (!context) return undefined;

  return `${context.expandsTo}` as const;
}

function useMenuOrientation() {
  const context = React.useContext(ToolbarContext);
  if (!context) return undefined;

  const horizontal =
    context.expandsTo === "left" || context.expandsTo === "right";
  return horizontal ? "horizontal" : "vertical";
}
