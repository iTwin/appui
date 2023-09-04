/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ToolbarOrientation, ToolbarUsage } from "@itwin/appui-react";
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
  const items = useToolbarItems(
    ToolbarUsage.ContentManipulation,
    ToolbarOrientation.Vertical
  );
  const groupedItems = useGroupToolbarItems(items);
  return (
    <Flex gap="m" style={{ flexDirection: "column", alignItems: "end" }}>
      {groupedItems.map((items) => (
        <Toolbar
          orientation="vertical"
          key={items[0].groupPriority ?? 0}
          items={items}
        />
      ))}
    </Flex>
  );
}
