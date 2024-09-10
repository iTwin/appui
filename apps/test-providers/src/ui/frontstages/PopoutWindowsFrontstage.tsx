/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  BackstageAppButton,
  FrontstageUtilities,
  StageUsage,
} from "@itwin/appui-react";
import { ViewportContent } from "../ViewportContent";

export function createPopoutWindowsFrontstage() {
  return FrontstageUtilities.createStandardFrontstage({
    id: createPopoutWindowsFrontstage.stageId,
    usage: StageUsage.General,
    contentGroupProps: {
      id: "popout-windows-stage-frontstage-main-content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "primaryContent",
          classId: "",
          content: <ViewportContent />,
        },
      ],
    },
    cornerButton: <BackstageAppButton icon="icon-bentley-systems" />,
  });
}
createPopoutWindowsFrontstage.stageId =
  "appui-test-providers:PopoutWindowsFrontstage";