/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
// __PUBLISH_EXTRACT_START__ AppUI.UiItemsProvider.Widgets
import {
  StagePanelLocation,
  StagePanelSection,
  UiItemsProvider,
} from "@itwin/appui-react";

const provider: UiItemsProvider = {
  id: "example:Provider",
  getWidgets: () => [
    {
      id: "example:Widget",
      content: <div>My custom widget</div>,
      layouts: {
        standard: {
          location: StagePanelLocation.Right,
          section: StagePanelSection.Start,
        },
      },
    },
  ],
};
// __PUBLISH_EXTRACT_END__

export { provider };
