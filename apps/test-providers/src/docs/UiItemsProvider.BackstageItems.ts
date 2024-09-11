/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// __PUBLISH_EXTRACT_START__ AppUI.UiItemsProvider.BackstageItems
import { BackstageItemUtilities, UiItemsProvider } from "@itwin/appui-react";

const provider: UiItemsProvider = {
  id: "example:Provider",
  getBackstageItems: () => [
    BackstageItemUtilities.createActionItem({
      id: "example:BackstageItem",
      label: "My backstage item",
    }),
  ],
};
// __PUBLISH_EXTRACT_END__

export { provider };
