/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import type { ToolbarItem } from "../../toolbar/ToolbarItem.js";
import {
  isToolbarActionItem,
  isToolbarCustomItem,
  isToolbarGroupItem,
} from "../../toolbar/ToolbarItem.js";
import { ToolGroup } from "./ToolGroup.js";
import type { ToolbarProps as OldToolbarProps } from "../Toolbar.js";
import { ActionItem } from "./ActionItem.js";
import { GroupItem } from "./GroupItem.js";
import { CustomItem } from "./CustomItem.js";

/** These exist for backwards compatibility only. */
type ToolbarInternalProps = Pick<OldToolbarProps, "onItemExecuted">;

interface ToolbarProps extends ToolbarInternalProps {
  /** Definitions for items of the toolbar. */
  items: ToolbarItem[];
  /** Describes direction to which the panels are expanded. Orientation of the toolbar is determined based on this prop. Defaults to `bottom`.  */
  expandsTo?: "top" | "bottom" | "left" | "right";
  /** Describes how panels are aligned. Defaults to `start`. */
  panelAlignment?: "start" | "end";
}

/** @internal */
export function Toolbar({
  items,
  expandsTo = "bottom",
  panelAlignment = "start",
  onItemExecuted,
}: ToolbarProps) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const orientation = getOrientation(expandsTo);
  return (
    <ToolbarContext.Provider
      value={React.useMemo(
        () => ({
          expandsTo,
          orientation,
          panelAlignment,
          popoverOpen,
          setPopoverOpen,
          onItemExecuted,
        }),
        [
          expandsTo,
          orientation,
          panelAlignment,
          popoverOpen,
          setPopoverOpen,
          onItemExecuted,
        ]
      )}
    >
      <ToolGroup>
        {items.map((item, index) => {
          const nextItem =
            items.length > index + 1 ? items[index + 1] : undefined;
          const renderSeparator = nextItem
            ? item.groupPriority !== nextItem.groupPriority
            : false;
          return (
            <ItemRenderer
              key={item.id}
              item={item}
              renderSeparator={renderSeparator}
            />
          );
        })}
      </ToolGroup>
    </ToolbarContext.Provider>
  );
}

interface ItemRendererProps {
  item: ToolbarItem;
  renderSeparator: boolean;
}

const ItemRenderer = React.forwardRef<HTMLButtonElement, ItemRendererProps>(
  function ItemRenderer({ item, renderSeparator }, forwardedRef) {
    let itemElement: React.JSX.Element | undefined;
    if (isToolbarActionItem(item)) {
      itemElement = <ActionItem ref={forwardedRef} item={item} />;
    }
    if (isToolbarGroupItem(item)) {
      itemElement = <GroupItem ref={forwardedRef} item={item} />;
    }
    if (isToolbarCustomItem(item)) {
      itemElement = <CustomItem ref={forwardedRef} item={item} />;
    }
    return (
      <ToolbarItemContext.Provider value={{ renderSeparator }}>
        {itemElement}
      </ToolbarItemContext.Provider>
    );
  }
);

interface ToolbarContextProps
  extends Pick<Required<ToolbarProps>, "expandsTo" | "panelAlignment">,
    Pick<ToolbarProps, "onItemExecuted"> {
  popoverOpen: boolean;
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  orientation: "horizontal" | "vertical";
}

/** @internal */
export const ToolbarContext = React.createContext<
  ToolbarContextProps | undefined
>(undefined);
ToolbarContext.displayName = "uifw:ToolbarContext";

/** @internal */
export const ToolbarItemContext = React.createContext<
  | {
      renderSeparator: boolean;
    }
  | undefined
>(undefined);
ToolbarContext.displayName = "uifw:ToolbarContext";

function getOrientation(expandsTo: ToolbarContextProps["expandsTo"]) {
  switch (expandsTo) {
    case "left":
    case "right":
      return "vertical";
    case "top":
    case "bottom":
      return "horizontal";
  }
}
