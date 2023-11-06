/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  StageUsage,
  StandardFrontstageProps,
  StandardFrontstageProvider,
} from "@itwin/appui-react";
import {
  ReactContentControl,
  ReactContentControlOptions,
} from "./ReactContentControl";

export function createFrontstageProvider(
  overrides?: Partial<StandardFrontstageProps>
) {
  return new StandardFrontstageProvider({
    id: "main-frontstage",
    usage: StageUsage.Private,
    version: Math.random(),
    contentGroupProps: {
      id: "ContentGroup",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "Content",
          classId: ReactContentControl,
          applicationData: {
            node: (
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
          } satisfies ReactContentControlOptions,
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
