/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { useTranslation as useComponentsTranslation } from "@itwin/components-react/internal";
import { IconButton } from "@itwin/itwinui-react";
import { SvgMore } from "@itwin/itwinui-icons-react";
import { useLabelProps } from "./Item.js";
import { ToolbarMenu, usePopoverPlacement } from "./GroupItem.js";
import { ToolbarContext } from "./Toolbar.js";
import { useSafeContext } from "../../hooks/useSafeContext.js";

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
  const { setPopoverOpen } = useSafeContext(ToolbarContext);
  const { translate } = useComponentsTranslation();
  return (
    <ToolbarMenu
      menuItems={(close) => {
        return [
          <OverflowMenu key={0} onClose={close}>
            {props.children}
          </OverflowMenu>,
        ];
      }}
      placement={placement}
      onVisibleChange={(newVisible) => {
        setPopoverOpen(newVisible);
      }}
    >
      <IconButton
        ref={ref}
        label={translate("toolbar.overflow")}
        labelProps={labelProps}
        styleType="borderless"
      >
        <SvgMore />
      </IconButton>
    </ToolbarMenu>
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
