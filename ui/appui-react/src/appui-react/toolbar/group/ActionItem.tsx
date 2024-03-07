/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import type { ToolbarActionItem } from "../ToolbarItem";
import { ToolGroupOverflowContext } from "./OverflowButton";
import { Item } from "./Item";

/** @internal */
interface ActionItemProps extends CommonProps {
  item: ToolbarActionItem;
}

/** @internal */
export function ActionItem(props: ActionItemProps) {
  const { item } = props;
  const toolGroupOverflow = React.useContext(ToolGroupOverflowContext);
  return (
    <Item
      item={item}
      onClick={() => {
        toolGroupOverflow?.onClose?.();
        item.execute();
      }}
    />
  );
}
