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

interface ToolbarProps extends CommonProps {
  /** Describes direction to which the panels are expanded. Orientation of the toolbar is determined based on this direction. Defaults to `bottom`.  */
  expandsTo?: "top" | "bottom" | "left" | "right";
  /** Describes how panels are aligned. Defaults to `start`. */
  panelAlignment?: "start" | "end";
  /** Definitions for items of the toolbar. */
  items: ToolbarItem[];
}

/** @internal */
export function Toolbar({
  expandsTo = "bottom",
  panelAlignment = "start",
  ...props
}: ToolbarProps) {
  const orientation = toOrientation(expandsTo);
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
      <ToolGroup alignment={panelAlignment} orientation={orientation}>
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

function toOrientation(expandsTo: Required<ToolbarProps>["expandsTo"]) {
  switch (expandsTo) {
    case "left":
    case "right":
      return "vertical";
    case "top":
    case "bottom":
      return "horizontal";
  }
}
