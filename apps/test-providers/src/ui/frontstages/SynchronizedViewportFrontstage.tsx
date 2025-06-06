/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageAppButton,
  Frontstage,
  FrontstageUtilities,
  StageUsage,
  StandardContentLayouts,
} from "@itwin/appui-react";
import { ViewportContent } from "../ViewportContent.js";

export function createSynchronizedViewportFrontstage(): Frontstage {
  return FrontstageUtilities.createStandardFrontstage({
    id: createSynchronizedViewportFrontstage.stageId,
    contentGroupProps: {
      id: "synchronized-floating-viewport-stage-frontstage-main-content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "primaryContent",
          classId: "",
          content: <ViewportContent />,
        },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    cornerButton: <BackstageAppButton icon="icon-bentley-systems" />,
    usage: StageUsage.General,
  });
}
createSynchronizedViewportFrontstage.stageId =
  "appui-test-providers:SynchronizedViewport";
