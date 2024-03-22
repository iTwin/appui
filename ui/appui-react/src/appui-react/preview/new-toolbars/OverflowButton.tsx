/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { DropdownMenu, IconButton } from "@itwin/itwinui-react";
import { SvgMore } from "@itwin/itwinui-icons-react";
import { useLabelProps } from "./Item";
import { usePopoverPlacement } from "./GroupItem";
import { ToolbarContext } from "./Toolbar";

/** @internal */
interface ToolGroupOverflow {
  onClose?: () => void;
}

/** @internal */
export const ToolGroupOverflowContext = React.createContext<
  ToolGroupOverflow | undefined
>(undefined);

interface OverflowButtonProps {
  children?: React.ReactNode;
}

/** @internal */
export const OverflowButton = React.forwardRef<
  HTMLButtonElement,
  OverflowButtonProps
>(function OverflowButton(props, ref) {
  const placement = usePopoverPlacement();
  const labelProps = useLabelProps();
  const context = React.useContext(ToolbarContext);

  return (
    <DropdownMenu
      menuItems={(close) => {
        return [
          <OverflowMenu key={0} onClose={close}>
            {props.children}
          </OverflowMenu>,
        ];
      }}
      placement={placement}
      onVisibleChange={(newVisible) => {
        context?.setPopoverOpen(newVisible);
      }}
    >
      <IconButton
        ref={ref}
        label="More"
        labelProps={labelProps}
        styleType="borderless"
      >
        <SvgMore />
      </IconButton>
    </DropdownMenu>
  );
});

interface OverflowMenuProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

function OverflowMenu({ children, onClose }: OverflowMenuProps) {
  return (
    <ToolGroupOverflowContext.Provider value={{ onClose }}>
      {children}
    </ToolGroupOverflowContext.Provider>
  );
}
