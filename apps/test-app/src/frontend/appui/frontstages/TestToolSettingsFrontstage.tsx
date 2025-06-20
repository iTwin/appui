/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  StagePanelLocation,
  StagePanelSection,
  StandardLayout,
} from "@itwin/appui-react";
import { createTestFrontstage } from "./createTestFrontstage";
import { getFrontstageParams, getWidgetParams } from "./TestWidgetFrontstage";

type StandardLayoutProps = React.ComponentProps<typeof StandardLayout>;

/** Used in e2e tests to test different tool settings configurations. */
export const createTestToolSettingsFrontstage = () => {
  {
    const urlParams = new URLSearchParams(window.location.search);
    const frontstageParams = getFrontstageParams(urlParams);
    const defaultLocation = getDefaultLocation(urlParams);
    const widgetParams = getWidgetParams(urlParams);

    const frontstage = createTestFrontstage({
      id: "test-tool-settings",
      layout: (
        <StandardLayout
          toolSettings={{
            defaultLocation,
          }}
        />
      ),
      toolSettings: {
        id: "toolSettings",
        ...widgetParams,
      },
      ...frontstageParams,
    });

    return frontstage;
  }
};

function getDefaultLocation(
  params: URLSearchParams
): Required<StandardLayoutProps>["toolSettings"]["defaultLocation"] {
  const locationParam = params.get("location");
  const location = toStagePanelLocation(locationParam ?? "");
  if (!location) {
    return undefined;
  }

  const sectionParam = params.get("section");
  const section = sectionParam
    ? (Number(sectionParam) as StagePanelSection)
    : undefined;
  return {
    location,
    section: section ?? StagePanelSection.Start,
  };
}

function toStagePanelLocation(side: string) {
  switch (side) {
    case "bottom":
      return StagePanelLocation.Bottom;
    case "left":
      return StagePanelLocation.Left;
    case "right":
      return StagePanelLocation.Right;
    case "top":
      return StagePanelLocation.Top;
  }
  return undefined;
}
