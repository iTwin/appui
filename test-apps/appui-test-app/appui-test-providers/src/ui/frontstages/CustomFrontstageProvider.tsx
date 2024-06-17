/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
// __PUBLISH_EXTRACT_START__ AppUI.FrontstageProvider.Imports
import { StandardContentLayouts } from "@itwin/appui-abstract";
import { ContentGroup } from "@itwin/appui-react";
// __PUBLISH_EXTRACT_END__
import {
  ReactContentControl,
  ReactContentControlOptions,
} from "../content/ReactContentControl";

// __PUBLISH_EXTRACT_START__ AppUI.FrontstageProvider
const customFrontstageProvider = {
  id: "example:CustomFrontstage",
  version: 1,
  contentGroup: new ContentGroup({
    id: "content-group",
    layout: StandardContentLayouts.singleView,
    contents: [
      {
        id: "content",
        classId: ReactContentControl,
        applicationData: {
          node: <h1>Custom Content</h1>,
        } satisfies ReactContentControlOptions,
      },
    ],
  }),
};
// __PUBLISH_EXTRACT_END__

export { customFrontstageProvider };
