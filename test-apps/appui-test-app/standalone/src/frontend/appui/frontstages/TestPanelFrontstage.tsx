/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Frontstage } from "@itwin/appui-react";
import { createTestFrontstage } from "./createTestFrontstage";

/** Used in e2e tests to test different panel configurations. */
export const createTestPanelFrontstage = () => {
  {
    const urlParams = new URLSearchParams(window.location.search);
    const size = urlParams.get("size");
    const defaultState = urlParams.get("defaultState");
    const resizable = urlParams.get("resizable");

    const frontstage = createTestFrontstage({
      id: "test-panel",
    });

    return {
      ...frontstage,
      leftPanel: {
        sizeSpec: size ? Number(size) : undefined,
        defaultState: defaultState ? Number(defaultState) : undefined,
        resizable: resizable ? Boolean(Number(resizable)) : undefined,
        sections: {
          start: [
            {
              id: "widget-1",
              label: "Widget 1",
              content: (
                <>
                  Frontstage provided widget: <b>widget-1</b>
                </>
              ),
            },
          ],
        },
      },
    } satisfies Frontstage;
  }
};
