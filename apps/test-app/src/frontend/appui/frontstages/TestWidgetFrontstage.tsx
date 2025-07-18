/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  Frontstage,
  StagePanelState,
  Widget,
  WidgetConfig,
  WidgetState,
} from "@itwin/appui-react";
import { createTestFrontstage } from "./createTestFrontstage";

/** Used in e2e tests to test different widget configurations. */
export const createTestWidgetFrontstage = () => {
  {
    const urlParams = new URLSearchParams(window.location.search);
    const frontstageParams = getFrontstageParams(urlParams);
    const widgetParams = getWidgetParams(urlParams);

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
              ...widgetParams,
            },
          ],
        },
      },
    } satisfies Frontstage;
  }
};

export function getFrontstageParams(params: URLSearchParams) {
  const versionParam = params.get("frontstageVersion");
  const version = versionParam ? Number(versionParam) : undefined;
  return {
    ...(version ? { version } : undefined),
  } satisfies Partial<Frontstage>;
}

function getDefaultState(params: URLSearchParams): Widget["defaultState"] {
  const param = params.get("defaultState");
  if (param === "hidden") return WidgetState.Hidden;
  if (param === "floating") return WidgetState.Floating;
  return undefined;
}

export function getWidgetParams(params: URLSearchParams) {
  const defaultState = getDefaultState(params);
  const useSavedState = params.has("useSavedState");
  return {
    ...(defaultState !== undefined ? { defaultState } : undefined),
    useSavedState,
  } satisfies Partial<WidgetConfig>;
}
