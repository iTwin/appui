/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";
import { SvgMoreVertical } from "@itwin/itwinui-icons-react";
import { DropdownMenu, IconButton, MenuItem } from "@itwin/itwinui-react";

/** @internal */
export function MoreButton(props: React.PropsWithChildren<{}>) {
  return (
    <DropdownMenu
      placement="bottom-end"
      menuItems={(_close) => {
        const children = React.Children.toArray(props.children);
        return children.map((child, index) => {
          return <MenuItem key={index}>{child}</MenuItem>;
        });
      }}
    >
      <IconButton size="small" styleType="borderless" aria-label="More actions">
        <SvgMoreVertical />
      </IconButton>
    </DropdownMenu>
  );
}
