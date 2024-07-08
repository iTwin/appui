/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
// __PUBLISH_EXTRACT_START__ AppUI.StandardFrontstageProvider.Imports
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  FrontstageUtilities,
  StageUsage,
  UiFramework,
} from "@itwin/appui-react";
// __PUBLISH_EXTRACT_END__

export async function registerStandardFrontstage() {
  // __PUBLISH_EXTRACT_START__ AppUI.StandardFrontstageProvider
  const id = "example:StandardFrontstage";
  UiFramework.frontstages.addFrontstage(
    FrontstageUtilities.createStandardFrontstage({
      id,
      usage: StageUsage.General,
      contentGroupProps: {
        id: `${id}:content-group`,
        layout: StandardContentLayouts.singleView,
        contents: [
          {
            id: `${id}:content`,
            classId: "",
            content: <h1>Custom Content</h1>,
          },
        ],
      },
    })
  );
  // __PUBLISH_EXTRACT_END__
}
