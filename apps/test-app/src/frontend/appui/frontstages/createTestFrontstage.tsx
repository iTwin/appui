/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  ContentGroup,
  Frontstage,
  StandardContentLayouts,
} from "@itwin/appui-react";

interface CreateTestFrontstageArgs extends Partial<Frontstage> {
  id: string;
}

export const createTestFrontstage = (
  frontstageArgs: CreateTestFrontstageArgs
) => {
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
      version: Math.random(),
      contentGroup,
      ...frontstageArgs,
    } satisfies Frontstage;
  }
};
