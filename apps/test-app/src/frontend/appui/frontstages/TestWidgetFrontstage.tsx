/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  Frontstage,
  StagePanelState,
  Widget,
  WidgetState,
} from "@itwin/appui-react";
import { createTestFrontstage } from "./createTestFrontstage";

/** Used in e2e tests to test different widget configurations. */
export const createTestWidgetFrontstage = () => {
  {
    const urlParams = new URLSearchParams(window.location.search);
    const frontstageParams = getFrontstageParams(urlParams);

    const defaultState = getDefaultState(urlParams);
    const useSavedState = urlParams.has("useSavedState");

    const frontstage = createTestFrontstage({
      id: "test-widget",
      version: frontstageParams.version,
    });

    return {
      ...frontstage,
      rightPanel: {
        defaultState: StagePanelState.Open,
        sections: {
          start: [
            {
              id: "widget-1",
              label: "Widget 1",
              content: <>Widget 1 content</>,
              defaultState,
              useSavedState,
            },
          ],
        },
      },
    } satisfies Frontstage;
  }
};

function getFrontstageParams(params: URLSearchParams) {
  const versionParam = params.get("frontstageVersion");
  const version = versionParam ? Number(versionParam) : undefined;
  return { version } satisfies Partial<Frontstage>;
}

function getDefaultState(params: URLSearchParams): Widget["defaultState"] {
  const param = params.get("defaultState");
  if (param === "hidden") return WidgetState.Hidden;
  return undefined;
}
