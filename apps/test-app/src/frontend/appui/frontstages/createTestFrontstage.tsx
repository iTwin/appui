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

interface CreateTestFrontstageArgs {
  id: string;
}

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
    } satisfies Frontstage;
  }
};
