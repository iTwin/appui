/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { SvgPlaceholder as SvgIcon } from "@itwin/itwinui-icons-react";
// __PUBLISH_EXTRACT_START__ AppUI.UiItemsProvider.StatusBarItems
import { StatusBarItemUtilities, UiItemsProvider } from "@itwin/appui-react";

const provider: UiItemsProvider = {
  id: "example:Provider",
  getStatusBarItems: () => [
    StatusBarItemUtilities.createActionItem({
      id: "example:StatusBarItem",
      itemPriority: 100,
      icon: <SvgIcon />,
      tooltip: "My status bar item",
    }),
  ],
};
// __PUBLISH_EXTRACT_END__

export { provider };
