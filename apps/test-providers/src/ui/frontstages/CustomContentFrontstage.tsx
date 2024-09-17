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
  UiFramework,
  ViewToolWidgetComposer,
} from "@itwin/appui-react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import { SampleContentControl } from "../content/SampleContentControl";
import { useActiveContentId } from "../useActiveContentId";

function CustomViewToolWidgetComposer() {
  const activeId = useActiveContentId();

  const hideNavigationAid = activeId === "ui-test:customContent";
  return <ViewToolWidgetComposer hideNavigationAid={hideNavigationAid} />;
}

export function createCustomContentFrontstage(): Frontstage {
  const frontstage = FrontstageUtilities.createStandardFrontstage({
    id: createCustomContentFrontstage.stageId,
    usage: StageUsage.General,
    contentGroupProps: {
      id: "appui-test-providers:custom-stage-content",
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
          id: "primaryContent",
          // eslint-disable-next-line deprecation/deprecation
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
          id: "ui-test:customContent",
          classId: SampleContentControl,
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
createCustomContentFrontstage.stageId = "appui-test-providers:CustomContent";
