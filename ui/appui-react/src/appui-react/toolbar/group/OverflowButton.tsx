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

/** @internal */
export interface ToolGroupOverflow {
  close: () => void;
}

/** @internal */
export const ToolGroupOverflowContext = React.createContext<
  ToolGroupOverflow | undefined
>(undefined);

/** @internal */
export function OverflowButton(props: React.PropsWithChildren<{}>) {
  return (
    <DropdownMenu
      menuItems={(close) => {
        const children = React.Children.toArray(props.children);
        return [
          <ToolGroupOverflowContext.Provider key={0} value={{ close }}>
            {children}
          </ToolGroupOverflowContext.Provider>,
        ];
      }}
    >
      <IconButton label="More" styleType="borderless">
        <SvgMore />
      </IconButton>
    </DropdownMenu>
  );
}
