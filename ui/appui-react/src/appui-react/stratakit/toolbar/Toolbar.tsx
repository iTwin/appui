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
import { useOverflow } from "./useOverflow.js";
import { OverflowItem } from "./OverflowItem.js";

/** @internal */
export function Toolbar(props: ToolbarProps) {
  const allVisibleItems = useVisibleItems(props.items);
  const [itemsRef, containerRef, overflowItemIndex] =
    useOverflow<HTMLDivElement>("horizontal");
  const setItem = React.useCallback(
    (id: string, el: HTMLElement | null) => {
      if (el) {
        itemsRef.current.set(id, el);
      } else {
        itemsRef.current.delete(id);
      }
    },
    [itemsRef]
  );

  const visibleItems =
    overflowItemIndex === undefined
      ? allVisibleItems
      : allVisibleItems.slice(0, overflowItemIndex);
  const overflowItems =
    overflowItemIndex === undefined
      ? []
      : allVisibleItems.slice(overflowItemIndex);
  return (
    <div
      style={{
        flex: "1 1 100%",
        minWidth: 0,
      }}
      ref={containerRef}
    >
      <StrataKitToolbar.Group variant="solid">
        {visibleItems.map((item, index) => {
          const nextItem = visibleItems[index + 1];
          const renderSeparator = nextItem
            ? item.groupPriority !== nextItem.groupPriority
            : false;

          // Do not render items that overflow.
          if (overflowItemIndex !== undefined && index >= overflowItemIndex) {
            return null;
          }

          return (
            <React.Fragment key={item.id}>
              <ItemRenderer item={item} setItem={setItem} />
              {renderSeparator && <Divider orientation="vertical" />}
            </React.Fragment>
          );
        })}
        {overflowItemIndex !== undefined && (
          <OverflowItem items={overflowItems} />
        )}
      </StrataKitToolbar.Group>
    </div>
  );
}

interface ItemRendererProps {
  item: ToolbarProps["items"][number];
  setItem: (id: string, el: HTMLElement | null) => void;
}

function ItemRenderer(props: ItemRendererProps) {
  const { item, setItem } = props;
  const handleRef = React.useCallback(
    (x: HTMLElement | null) => {
      setItem(item.id, x);
    },
    [item.id, setItem]
  );
  if (isToolbarActionItem(item)) {
    return <ActionItem item={item} ref={handleRef} />;
  }
  if (isToolbarGroupItem(item)) {
    return <GroupItem item={item} ref={handleRef} />;
  }
  if (isToolbarCustomItem(item)) {
    return <CustomItem item={item} ref={handleRef} />;
  }
  return undefined;
}
