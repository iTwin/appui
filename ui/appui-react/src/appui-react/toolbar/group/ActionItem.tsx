/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import type { ToolbarActionItem } from "../ToolbarItem";
import { ToolGroupOverflowContext } from "./OverflowButton";
import { Item } from "./Item";
import { GroupMenuItem } from "./GroupItem";

/** @internal */
export interface ActionItemProps {
  item: ToolbarActionItem;
}

/** @internal */
export const ActionItem = React.forwardRef<HTMLButtonElement, ActionItemProps>(
  function ActionItem({ item }, ref) {
    const toolGroupOverflow = React.useContext(ToolGroupOverflowContext);
    if (toolGroupOverflow) {
      return <GroupMenuItem item={item} />;
    }
    return (
      <Item
        ref={ref}
        item={item}
        onClick={() => {
          item.execute();
        }}
      />
    );
  }
);
