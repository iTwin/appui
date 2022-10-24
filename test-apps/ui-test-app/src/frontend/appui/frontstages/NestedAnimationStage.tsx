/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  ContentGroup, CoreTools, FrontstageProps, FrontstageProvider, NestedFrontstage, ToolWidgetComposer,
} from "@itwin/appui-react";
import { StandardContentLayouts } from "@itwin/appui-abstract";

export class NestedAnimationStage extends FrontstageProvider {
  public static stageId = "ui-test-app:NestedAnimationStage";

  public override get id(): string {
    return NestedAnimationStage.stageId;
  }

  public override get frontstage(): FrontstageProps {
    const contentGroup = new ContentGroup(
      {
        id: "ScheduleAnimation",
        layout: StandardContentLayouts.singleView,
        contents: [
          {
            id: "ScheduleAnimationView",
            classId: "ScheduleAnimationControl",
          },
        ],
      },
    );
    return {
      id: this.id,
      defaultTool: CoreTools.selectElementCommand,
      contentGroup,
      contentManipulation: {
        isFreeform: true,
        element: <FrontstageToolWidget />,
      },
    };
  }
}

/** Define a ToolWidget with Buttons to display in the TopLeft zone.
 */
class FrontstageToolWidget extends React.Component {
  public override render() {
    return (
      <ToolWidgetComposer
        cornerItem={NestedFrontstage.backToPreviousFrontstageCommand}
      />
    );
  }
}
