/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageAppButton,
  ConfigurableCreateInfo,
  ContentControl,
  ContentGroup,
  ContentToolWidgetComposer,
} from "@itwin/appui-react";
import { StandardContentLayouts } from "@itwin/appui-abstract";

// __PUBLISH_EXTRACT_START__ Example_Custom_Content_Control
class CustomContentControl extends ContentControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);

    this.reactNode = (
      <h1
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Custom content!
      </h1>
    );
  }
}
// __PUBLISH_EXTRACT_END__

// __PUBLISH_EXTRACT_START__ Example_Custom_Frontstage_Provider
export const customFrontstage = {
  id: "example:CustomFrontstage",
  version: 1,
  contentGroup: new ContentGroup({
    id: "test-group",
    layout: StandardContentLayouts.singleView,
    contents: [{ id: "custom-content", classId: CustomContentControl }],
  }),
  contentManipulation: {
    id: "contentManipulationTools",
    content: (
      <ContentToolWidgetComposer cornerButton={<BackstageAppButton />} />
    ),
  },
};
// __PUBLISH_EXTRACT_END__
