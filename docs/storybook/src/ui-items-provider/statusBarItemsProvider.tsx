/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// __PUBLISH_EXTRACT_START__ AppUI.UiItemsProvider.StatusBarItems
import {
  StatusBarItemUtilities,
  StatusBarSection,
  UiItemsProvider,
} from "@itwin/appui-react";

const provider: UiItemsProvider = {
  id: "example:Provider",
  getStatusBarItems: () => [
    StatusBarItemUtilities.createActionItem(
      "example:StatusBarItem",
      StatusBarSection.Center,
      100,
      "icon-placeholder",
      "My custom status bar item",
      () => {
        console.log("Clicked!");
      }
    ),
  ],
};
// __PUBLISH_EXTRACT_END__

export { provider };
