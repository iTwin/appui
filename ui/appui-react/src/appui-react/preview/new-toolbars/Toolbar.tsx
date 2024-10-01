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

interface ToolbarProps {
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
}: ToolbarProps) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  return (
    <ToolbarContext.Provider
      value={{
        expandsTo,
        panelAlignment,
        popoverOpen,
        setPopoverOpen,
      }}
    >
      <ToolGroup>
        {items.map((item) => {
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
    </ToolbarContext.Provider>
  );
}

interface ToolbarContextProps
  extends Pick<Required<ToolbarProps>, "expandsTo" | "panelAlignment"> {
  popoverOpen: boolean;
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/** @internal */
export const ToolbarContext = React.createContext<
  ToolbarContextProps | undefined
>(undefined);
ToolbarContext.displayName = "uifw:ToolbarContext";
