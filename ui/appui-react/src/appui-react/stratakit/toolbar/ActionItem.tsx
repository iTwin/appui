/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { unstable_Toolbar as Toolbar } from "@stratakit/structures";
import { Item, MenuItem } from "./Item.js";
import type { ToolbarActionItem } from "../../toolbar/ToolbarItem.js";

interface ActionItemProps {
  item: ToolbarActionItem;
}

/** @internal */
export const ActionItem = React.forwardRef<HTMLButtonElement, ActionItemProps>(
  function ActionItem(props, forwardedRef) {
    const { item } = props;
    return (
      <Toolbar.Item
        render={<Item item={item} />}
        onClick={() => {
          item.execute();
          // onItemExecuted?.(item); // TODO:
        }}
        ref={forwardedRef}
      />
    );
  }
);

/** @internal */
export function ActionMenuItem(props: ActionItemProps) {
  const { item } = props;
  return (
    <MenuItem
      item={props.item}
      onClick={() => {
        item.execute();
        // onItemExecuted?.(item); // TODO:
      }}
    />
  );
}
