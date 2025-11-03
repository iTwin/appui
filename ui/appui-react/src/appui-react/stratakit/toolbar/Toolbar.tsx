/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import type { ToolbarProps } from "../../toolbar/Toolbar.js";
import { Divider } from "@stratakit/bricks";
import { unstable_Toolbar as StrataKitToolbar } from "@stratakit/structures";
import {
  isToolbarActionItem,
  isToolbarCustomItem,
  isToolbarGroupItem,
} from "../../toolbar/ToolbarItem.js";
import { GroupItem } from "./GroupItem.js";
import { ActionItem } from "./ActionItem.js";
import { CustomItem } from "./CustomItem.js";
import { useVisibleItems } from "./useVisibleItems.js";

/** @internal */
export function Toolbar(props: ToolbarProps) {
  const visibleItems = useVisibleItems(props.items);
  return (
    <div
      style={{
        flex: "1 1 100%",
        minWidth: 0,
      }}
    >
      <StrataKitToolbar.Group variant="solid">
        {visibleItems.map((item, index) => {
          const nextItem = visibleItems[index + 1];
          const renderSeparator = nextItem
            ? item.groupPriority !== nextItem.groupPriority
            : false;

          let itemElement: React.JSX.Element | undefined;
          if (isToolbarActionItem(item)) {
            itemElement = <ActionItem item={item} />;
          }
          if (isToolbarGroupItem(item)) {
            itemElement = <GroupItem item={item} />;
          }
          if (isToolbarCustomItem(item)) {
            itemElement = <CustomItem item={item} />;
          }
          return (
            <React.Fragment key={item.id}>
              {itemElement}
              {renderSeparator && <Divider orientation="vertical" />}
            </React.Fragment>
          );
        })}
      </StrataKitToolbar.Group>
    </div>
  );
}
