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
import { PopupContext } from "@itwin/core-react/internal";

/** Popover component used in `StatusBar` component.
 * This component should wrap the element that triggers the popover.
 * @note Add the `StatusBarPopover.ExpandIndicator` to popover trigger buttons.
 * @public
 */
export function StatusBarPopover({
  content,
  middleware,
  ...other
}: React.ComponentProps<typeof Popover>) {
  const [portalTarget, setPortalTarget] = React.useState<
    HTMLElement | undefined
  >(undefined);
  return (
    <Popover
      {...other}
      content={
        <PopupContext.Provider value={portalTarget}>
          {content}
        </PopupContext.Provider>
      }
      placement="top"
      applyBackground
      middleware={{
        ...middleware,
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
