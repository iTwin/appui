/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  ToolbarOrientation,
  ToolbarUsage,
  useGroupToolbarItemLocations,
  useGroupedToolbarItems,
  useToolbarItemLocations,
} from "@itwin/appui-react";
import { Flex } from "@itwin/itwinui-react";
import { useGroupToolbarItems, useToolbarItems } from "../useToolbarItems";
import { Toolbar } from "./Toolbar";

export function ContextNavigationToolbar() {
  // TODO: need a better strategy to assign toolbar items to specific toolbars
  const items = useToolbarItems(
    ToolbarUsage.ViewNavigation,
    ToolbarOrientation.Horizontal
  );
  return <Toolbar items={items} />;
}

export function ViewNavigationToolbar() {
  const items = useToolbarItems(
    ToolbarUsage.ViewNavigation,
    ToolbarOrientation.Vertical
  );
  const groupedItems = useGroupToolbarItems(items);
  return (
    <Flex gap="m">
      {groupedItems.map((items) => (
        <Toolbar key={items[0].groupPriority ?? 0} items={items} />
      ))}
    </Flex>
  );
}

export function ContentManipulationToolbar() {
  const allLocations = useToolbarItemLocations();
  const locations = React.useMemo(() => {
    return allLocations.filter((location) => {
      return location.toolbarId === "content-manipulation";
    });
  }, [allLocations]);
  const groupedLocations = useGroupToolbarItemLocations(locations);
  const groupedItems = useGroupedToolbarItems(groupedLocations);
  return (
    <Flex gap="m" style={{ flexDirection: "column", alignItems: "end" }}>
      {groupedItems.map((items, index) => (
        <Toolbar orientation="vertical" key={index} items={items} />
      ))}
    </Flex>
  );
}
