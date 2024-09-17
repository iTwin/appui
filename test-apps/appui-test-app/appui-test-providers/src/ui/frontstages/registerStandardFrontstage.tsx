/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
// __PUBLISH_EXTRACT_START__ AppUI.StandardFrontstageProvider.Imports
import {
  StageUsage,
<<<<<<< HEAD:test-apps/appui-test-app/appui-test-providers/src/ui/frontstages/registerStandardFrontstage.tsx
  StandardFrontstageProvider,
=======
  StandardContentLayouts,
>>>>>>> 79f71b01f (Move /content apis from appui-abstract into appui-react (#1033)):apps/test-providers/src/ui/frontstages/registerStandardFrontstage.tsx
  UiFramework,
} from "@itwin/appui-react";
// __PUBLISH_EXTRACT_END__
import {
  ReactContentControl,
  ReactContentControlOptions,
} from "../content/ReactContentControl";

export async function registerStandardFrontstage() {
  // __PUBLISH_EXTRACT_START__ AppUI.StandardFrontstageProvider
  const id = "example:StandardFrontstage";
  UiFramework.frontstages.addFrontstageProvider(
    new StandardFrontstageProvider({
      id,
      usage: StageUsage.General,
      contentGroupProps: {
        id: `${id}:content-group`,
        layout: StandardContentLayouts.singleView,
        contents: [
          {
            id: `${id}:content`,
            classId: ReactContentControl,
            applicationData: {
              node: <h1>Custom Content</h1>,
            } satisfies ReactContentControlOptions,
          },
        ],
      },
    })
  );
  // __PUBLISH_EXTRACT_END__
}
