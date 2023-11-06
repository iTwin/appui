/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// __PUBLISH_EXTRACT_START__ AppUI.FrontstageProvider
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  ContentGroup,
  FrontstageConfig,
  FrontstageProvider,
} from "@itwin/appui-react";
import {
  ReactContentControl,
  ReactContentControlOptions,
} from "../ReactContentControl";

export class CustomFrontstageProvider extends FrontstageProvider {
  public override get id(): string {
    return "example:CustomFrontstage";
  }

  public override frontstageConfig(): FrontstageConfig {
    const contentGroup = new ContentGroup({
      id: `${this.id}:content-group`,
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: `${this.id}:content`,
          classId: ReactContentControl,
          applicationData: {
            node: <h1>Custom Content</h1>,
          } satisfies ReactContentControlOptions,
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
// __PUBLISH_EXTRACT_END__
