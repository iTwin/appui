/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  ToolbarItem,
  ToolbarItemLocation,
  UiItemsProvider,
} from "@itwin/appui-react";

export namespace UiItemsProviderUtilities {
  export function updateToolbarItemLocations(
    provider: UiItemsProvider,
    getLocations: (item: ToolbarItem) => ReadonlyArray<ToolbarItemLocation>
  ): UiItemsProvider {
    return {
      ...provider,
      getToolbarItemLocations: () => {
        const items = provider.getToolbarItems
          ? provider.getToolbarItems()
          : [];

        const locations: ToolbarItemLocation[] = [];
        for (const item of items) {
          const itemLocations = getLocations(item);
          locations.push(...itemLocations);
        }
        return locations;
      },
    };
  }

  export function overrideToolbarItems(
    provider: UiItemsProvider,
    overrideItem: (item: ToolbarItem) => ReadonlyArray<ToolbarItem>
  ): UiItemsProvider {
    return {
      ...provider,
      getToolbarItems: () => {
        const newItems: ToolbarItem[] = [];

        const items = provider.getToolbarItems
          ? provider.getToolbarItems()
          : [];

        for (const item of items) {
          const override = overrideItem(item);
          newItems.push(...override);
        }
        return newItems;
      },
    };
  }

  export function override(
    provider: UiItemsProvider,
    overrides: Partial<UiItemsProvider>
  ): UiItemsProvider {
    return {
      ...provider,
      id: provider.id,
      ...overrides,
    };
  }
}
