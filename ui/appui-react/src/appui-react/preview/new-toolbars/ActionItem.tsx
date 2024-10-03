/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import type { ToolbarActionItem } from "../../toolbar/ToolbarItem.js";
import { ToolGroupOverflowContext } from "./OverflowButton.js";
import { Item } from "./Item.js";
import { GroupMenuItem } from "./GroupItem.js";

/** @internal */
export interface ActionItemProps {
  item: ToolbarActionItem;
}

/** @internal */
export const ActionItem = React.forwardRef<HTMLButtonElement, ActionItemProps>(
  function ActionItem({ item }, ref) {
    const overflowContext = React.useContext(ToolGroupOverflowContext);
    if (overflowContext) {
      return <GroupMenuItem item={item} onClose={overflowContext.onClose} />;
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
