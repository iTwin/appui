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
}
