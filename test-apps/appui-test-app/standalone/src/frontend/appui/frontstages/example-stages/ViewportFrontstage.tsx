/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  BackstageAppButton,
  ContentGroup,
  ContentGroupProvider,
  IModelViewportControl,
  StandardFrontstageProps,
  StandardFrontstageProvider,
  UiFramework,
} from "@itwin/appui-react";
import React from "react";

// __PUBLISH_EXTRACT_START__ Example_Viewport_Frontstage_Group_Provider
export class ViewportFrontstageGroupProvider extends ContentGroupProvider {
  public override async contentGroup(): Promise<ContentGroup> {
    return new ContentGroup({
      id: "content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "viewport",
          classId: IModelViewportControl,
          applicationData: {
            viewState: UiFramework.getDefaultViewState,
            iModelConnection: UiFramework.getIModelConnection,
          },
        },
      ],
    });
  }
}
// __PUBLISH_EXTRACT_END__

// __PUBLISH_EXTRACT_START__ Example_Register_Viewport_Frontstage
export function registerViewportFrontstage(): void {
  const stageProps: StandardFrontstageProps = {
    id: "example:ViewportFrontstage",
    contentGroupProps: new ViewportFrontstageGroupProvider(),
    cornerButton: <BackstageAppButton />,
    usage: "General",
  };
  UiFramework.frontstages.addFrontstageProvider(
    new StandardFrontstageProvider(stageProps)
  );
}
// __PUBLISH_EXTRACT_END__
