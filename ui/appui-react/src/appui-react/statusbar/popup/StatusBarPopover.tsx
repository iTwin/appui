/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import { Popover } from "@itwin/itwinui-react";
import { ButtonExpandIndicator } from "./ExpandIndicator";
import type { CommonProps } from "@itwin/core-react";

type StatusBarPopoverProps = CommonProps &
  Pick<
    React.ComponentProps<typeof Popover>,
    | "content"
    | "children"
    | "visible"
    | "onVisibleChange"
    | "closeOnOutsideClick"
  >;

/** Popover component used in `StatusBar` component.
 * This component should wrap the element that triggers the popover.
 * @note Add the `StatusBarPopover.ExpandIndicator` to popover trigger buttons.
 * @public
 */
export function StatusBarPopover(props: StatusBarPopoverProps) {
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

/** Components used in `StatusBarPopover`.
 * @public
 */
export namespace StatusBarPopover {
  /** Indicator to be used in popover trigger buttons to show expandable content.
   * @public
   */
  export const ExpandIndicator = ButtonExpandIndicator;
}
