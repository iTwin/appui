/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  StageUsage,
  StandardContentLayouts,
  StandardFrontstageProps,
  StandardFrontstageProvider,
} from "@itwin/appui-react";
import { createContentControl } from "./createContentControl";

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
