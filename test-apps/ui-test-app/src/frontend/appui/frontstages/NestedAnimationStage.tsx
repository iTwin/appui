/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  ContentGroup, CoreTools, Frontstage, FrontstageProps, FrontstageProvider, NestedFrontstage, ToolWidgetComposer, Widget,
} from "@itwin/appui-react";
import { StandardContentLayouts } from "@itwin/appui-abstract";

export class NestedAnimationStage extends FrontstageProvider {
  public static stageId = "ui-test-app:NestedAnimationStage";

  public get id(): string {
    return NestedAnimationStage.stageId;
  }

  public get frontstage(): React.ReactElement<FrontstageProps> {
    const myContentGroup: ContentGroup = new ContentGroup(
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

    return (
      <Frontstage id={this.id}
        defaultTool={CoreTools.selectElementCommand}
        contentGroup={myContentGroup}
        contentManipulation={
          <Widget isFreeform={true} element={<FrontstageToolWidget />} />
        }
      />
    );
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
