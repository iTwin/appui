/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ContentGroup, Frontstage } from "@itwin/appui-react";
import { StandardContentLayouts } from "@itwin/appui-abstract";

interface CreateTestFrontstageArgs {
  id: string;
}

/** Used in e2e tests to test different configurations. */
export const createTestFrontstage = ({ id }: CreateTestFrontstageArgs) => {
  {
    const contentGroup = new ContentGroup({
      id: "test-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "custom-content",
          classId: "",
          content: (
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
          ),
        },
      ],
    });

    return {
      id,
      version: Math.random(),
      contentGroup,
      leftPanel: {
        sections: {
          start: [
            {
              id: "widget-1",
              label: "Widget 1",
              canPopout: true,
              content: <>Widget 1 content</>,
            },
          ],
        },
      },
    } satisfies Frontstage;
  }
};
