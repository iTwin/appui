/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import "./Popup.scss";
import * as React from "react";
import { Popover } from "@itwin/itwinui-react";

/** Popover component used in [[StatusBar]] component.
 * This component should wrap the element that triggers the popover.
 * @public
 */
export function StatusBarPopover(props: React.ComponentProps<typeof Popover>) {
  return (
    <Popover
      {...props}
      placement="top"
      applyBackground
      middleware={{
        offset: 4,
      }}
    />
  );
}
