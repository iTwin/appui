/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageAppButton,
  Frontstage,
  FrontstageUtilities,
  IModelViewportControl,
  StageUsage,
  StandardContentLayouts,
  UiFramework,
  ViewToolWidgetComposer,
} from "@itwin/appui-react";
import { SampleContentControl } from "../content/SampleContentControl.js";
import { useActiveContentId } from "../useActiveContentId.js";

function CustomViewToolWidgetComposer() {
  const activeId = useActiveContentId();

  const hideNavigationAid = activeId === "sample-content";
  return <ViewToolWidgetComposer hideNavigationAid={hideNavigationAid} />;
}

export function createCustomContentFrontstage(): Frontstage {
  const frontstage = FrontstageUtilities.createStandardFrontstage({
    id: createCustomContentFrontstage.stageId,
    usage: StageUsage.General,
    contentGroupProps: {
      id: "content-group",
      layout: {
        ...StandardContentLayouts.twoHorizontalSplit,
        horizontalSplit: {
          ...StandardContentLayouts.twoHorizontalSplit.horizontalSplit!,
          minSizeBottom: 100,
          percentage: 0.8,
        },
      },
      contents: [
        {
          id: "primary-content",
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          classId: IModelViewportControl,
          applicationData: {
            viewState: UiFramework.getDefaultViewState,
            iModelConnection: UiFramework.getIModelConnection,
            featureOptions: {
              defaultViewOverlay: {
                enableScheduleAnimationViewOverlay: true,
                enableAnalysisTimelineViewOverlay: true,
                enableSolarTimelineViewOverlay: true,
              },
            },
          },
        },
        {
          id: "sample-content",
          classId: SampleContentControl,
          renderActiveStrip: false,
        },
      ],
    },
    cornerButton: <BackstageAppButton />,
  });
  return {
    ...frontstage,
    viewNavigation: {
      ...frontstage.viewNavigation!,
      content: <CustomViewToolWidgetComposer />,
    },
  };
}
createCustomContentFrontstage.stageId = "custom-content";
