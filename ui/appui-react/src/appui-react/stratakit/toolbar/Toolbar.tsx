/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import type { ToolbarProps } from "../../toolbar/Toolbar.js";
import { unstable_Toolbar as StrataKitToolbar } from "@stratakit/structures";
import {
  isToolbarActionItem,
  isToolbarCustomItem,
  isToolbarGroupItem,
} from "../../toolbar/ToolbarItem.js";
import { GroupItem } from "./GroupItem.js";
import { ActionItem } from "./ActionItem.js";
import { CustomItem } from "./CustomItem.js";

/** @internal */
export function Toolbar(props: ToolbarProps) {
  return (
    <StrataKitToolbar.Group variant="solid">
      {props.items.map((item) => {
        if (isToolbarActionItem(item)) {
          return <ActionItem key={item.id} item={item} />;
        }
        if (isToolbarGroupItem(item)) {
          return <GroupItem key={item.id} item={item} />;
        }
        if (isToolbarCustomItem(item)) {
          return <CustomItem key={item.id} item={item} />;
        }
        return undefined;
      })}
    </StrataKitToolbar.Group>
  );
}
