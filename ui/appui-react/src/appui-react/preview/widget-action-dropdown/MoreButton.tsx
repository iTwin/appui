/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";
import { SvgMoreVertical } from "@itwin/itwinui-icons-react";
import { DropdownMenu, IconButton } from "@itwin/itwinui-react";

/** @internal */
export function MoreButton(props: React.PropsWithChildren<{}>) {
  return (
    <DropdownMenu
      placement="bottom-end"
      menuItems={(onClose) => [
        <WidgetActionDropdownContext.Provider key={0} value={{ onClose }}>
          {props.children}
        </WidgetActionDropdownContext.Provider>,
      ]}
    >
      <IconButton size="small" styleType="borderless" aria-label="More actions">
        <SvgMoreVertical />
      </IconButton>
    </DropdownMenu>
  );
}

/** @internal */
export const WidgetActionDropdownContext = React.createContext<
  | undefined
  | {
      onClose: () => void;
    }
>(undefined);
