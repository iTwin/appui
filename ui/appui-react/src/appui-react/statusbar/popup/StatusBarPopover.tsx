/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import { Popover } from "@itwin/itwinui-react";
import { ButtonExpandIndicator } from "./ExpandIndicator.js";
import { type CommonProps, PopupContext } from "@itwin/core-react";

// eslint-disable-next-line deprecation/deprecation
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
export function StatusBarPopover({ content, ...props }: StatusBarPopoverProps) {
  const [portalTarget, setPortalTarget] = React.useState<
    HTMLElement | undefined
  >(undefined);
  return (
    <Popover
      {...props}
      content={
        <PopupContext.Provider value={portalTarget}>
          {content}
        </PopupContext.Provider>
      }
      placement="top"
      applyBackground
      middleware={{
        offset: 4,
      }}
      ref={(el) => {
        setPortalTarget(el ?? undefined);
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
