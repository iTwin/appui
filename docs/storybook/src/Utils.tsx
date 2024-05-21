/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  FrontstageConfig,
  StageUsage,
  StandardFrontstageProps,
  StandardFrontstageProvider,
} from "@itwin/appui-react";
import { createContentControl } from "./createContentControl";

class StoryFrontstageProvider extends StandardFrontstageProvider {
  private _contentManipulation: FrontstageConfig["contentManipulation"];

  public constructor(
    props: StandardFrontstageProps &
      Pick<FrontstageConfig, "contentManipulation">
  ) {
    super(props);

    this._contentManipulation = props.contentManipulation;
  }

  public override frontstageConfig(): FrontstageConfig {
    const config = super.frontstageConfig();
    return {
      ...config,
      contentManipulation:
        this._contentManipulation ?? config.contentManipulation,
    };
  }
}

export function createFrontstageProvider(
  overrides?: Partial<ConstructorParameters<typeof StoryFrontstageProvider>[0]>
) {
  return new StoryFrontstageProvider({
    id: "main-frontstage",
    usage: StageUsage.Private,
    version: Math.random(),
    contentGroupProps: {
      id: "ContentGroup",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "Content",
          classId: createContentControl(
            <h1
              style={{
                display: "flex",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Content
            </h1>
          ),
        },
      ],
    },
    hideStatusBar: true,
    hideToolSettings: true,
    hideNavigationAid: true,
    ...overrides,
  });
}

export function removeProperty() {
  return {
    table: {
      disable: true,
    },
  };
}
