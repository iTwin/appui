/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ToolbarItem, ToolbarItemLayouts } from "@itwin/appui-react";

// Additional spatial-layout specific meta-data for toolbar items.
interface SpatialLayoutToolbarItem {
  // Activates a widget with the given ID when specified.
  readonly widgetId?: string;
  readonly content?: React.ReactNode; // TODO: this could be moved to `ToolbarCustomItem`
  // Specifies the location of the toolbar item.
  readonly location: "content-manipulation";
}

interface SpatialToolbarItemLayouts extends ToolbarItemLayouts {
  readonly spatial: SpatialLayoutToolbarItem;
}

export function createSpatialToolbarItemLayouts(
  args: SpatialLayoutToolbarItem
): SpatialToolbarItemLayouts {
  return {
    spatial: {
      ...args,
    },
  };
}

export type SpatialToolbarItem<T extends ToolbarItem = ToolbarItem> = T & {
  readonly layouts: SpatialToolbarItemLayouts;
};

export function isSpatialToolbarItem<T extends ToolbarItem>(
  item: ToolbarItem
): item is SpatialToolbarItem<T> {
  return "spatial" in (item.layouts ?? {});
}
