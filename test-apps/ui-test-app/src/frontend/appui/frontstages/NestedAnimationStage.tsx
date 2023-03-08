/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */
import * as React from "react";
import {
  ContentGroup, CoreTools, Frontstage, FrontstageProps, FrontstageProvider, NestedFrontstage, ToolWidget, Widget, Zone,
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

    return {
      id: this.id,
      contentGroup: myContentGroup,

      contentManipulation: {
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
      // eslint-disable-next-line deprecation/deprecation
      (<ToolWidget
        appButton={NestedFrontstage.backToPreviousFrontstageCommand}
      />)
    );
  }
}
