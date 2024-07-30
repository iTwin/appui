/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "./TestPopoutFrontstage.scss";
import * as React from "react";
import { Frontstage } from "@itwin/appui-react";
import { createTestFrontstage } from "./createTestFrontstage";

export const createTestPopoutFrontstage = () => {
  {
    const frontstage = createTestFrontstage({
      id: "appui-test-app:TestPopout",
    });

    return {
      ...frontstage,
      leftPanel: {
        sections: {
          start: [
            {
              id: "widget-1",
              label: "Widget 1",
              canPopout: true,
              content: (
                <>
                  <div>Widget 1 content</div>
                  <div id="border-test" />
                </>
              ),
            },
          ],
        },
      },
    } satisfies Frontstage;
  }
};
