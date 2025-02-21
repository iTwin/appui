/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageItemUtilities,
  Frontstage,
  FrontstageUtilities,
  StageUsage,
  StandardContentLayouts,
  UiItemsProvider,
} from "@itwin/appui-react";
import { SvgMapInfo } from "@itwin/itwinui-icons-react";
import { ViewportContent } from "@itwin/appui-test-providers";

export function createSpatialFrontstage(): Frontstage {
  const frontstage = FrontstageUtilities.createStandardFrontstage({
    id: createSpatialFrontstage.stageId,
    contentGroupProps: {
      id: "content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "viewport",
          classId: "",
          content: <ViewportContent />,
        },
      ],
    },
    usage: StageUsage.General,
  });
  return {
    ...frontstage,
    layout: <div>Hello spatial</div>,
  };
}
createSpatialFrontstage.stageId = "appui-test-app:spatial-frontstage";

export function createSpatialFrontstageProvider(): UiItemsProvider {
  const id = "appui-test-app:spatial-items";
  return {
    id,
    getBackstageItems: () => [
      BackstageItemUtilities.createStageLauncher({
        stageId: createSpatialFrontstage.stageId,
        groupPriority: 200,
        itemPriority: 10,
        label: "Spatial",
        icon: <SvgMapInfo />,
      }),
    ],
  };
}
