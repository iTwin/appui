/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import type { ToolbarItem } from "../ToolbarItem";
import {
  isToolbarActionItem,
  isToolbarCustomItem,
  isToolbarGroupItem,
} from "../ToolbarItem";
import { ToolGroup } from "./ToolGroup";

/** @internal */
export interface ToolbarProps extends CommonProps {
  orientation?: "horizontal" | "vertical";
  items: ToolbarItem[];
}

/** @internal */
export function Toolbar(props: ToolbarProps) {
  return (
    <ToolGroup orientation={props.orientation}>
      {props.items.map((item) => {
        if (isToolbarActionItem(item)) {
          return <ToolGroup.ActionItem key={item.id} item={item} />;
        }
        if (isToolbarGroupItem(item)) {
          return <ToolGroup.GroupItem key={item.id} item={item} />;
        }
        if (isToolbarCustomItem(item)) {
          return <ToolGroup.CustomItem key={item.id} item={item} />;
        }
        return null;
      })}
    </ToolGroup>
  );
}
