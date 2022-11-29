/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { ContentGroup, FrontstageConfig, FrontstageProvider } from "@itwin/appui-react";
import { StandardContentLayouts } from "@itwin/appui-abstract";

export class ScheduleAnimationFrontstage extends FrontstageProvider {
  public static stageId = "ui-test-app:ScheduleAnimationFrontstage";

  public override get id(): string {
    return ScheduleAnimationFrontstage.stageId;
  }

  public override frontstageConfig(): FrontstageConfig {
    const contentGroup = new ContentGroup({
      id: "ScheduleAnimation",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "ScheduleAnimation",
          classId: "ScheduleAnimationControl",
        },
      ],
    });

    return {
      id: this.id,
      version: 1,
      contentGroup,
    };
  }
}
