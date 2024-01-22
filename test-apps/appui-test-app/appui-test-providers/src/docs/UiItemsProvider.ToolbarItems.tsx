/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { SvgPlaceholder as SvgIcon } from "@itwin/itwinui-icons-react";
// __PUBLISH_EXTRACT_START__ AppUI.UiItemsProvider.ToolbarItems
import {
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
} from "@itwin/appui-react";

const provider: UiItemsProvider = {
  id: "example:Provider",
  getToolbarItems: () => [
    ToolbarItemUtilities.createActionItem(
      "example:ToolbarItem",
      100,
      <SvgIcon />,
      "My custom toolbar item",
      () => {},
      {
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Horizontal,
            usage: ToolbarUsage.ContentManipulation,
          },
        },
      }
    ),
  ],
};
// __PUBLISH_EXTRACT_END__

export { provider };
