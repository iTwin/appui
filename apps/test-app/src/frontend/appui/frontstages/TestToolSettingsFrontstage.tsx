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

type StandardLayoutProps = React.ComponentProps<typeof StandardLayout>;

/** Used in e2e tests to test different tool settings configurations. */
export const createTestToolSettingsFrontstage = () => {
  {
    const urlParams = new URLSearchParams(window.location.search);
    const defaultLocation = getDefaultLocation(urlParams);

    const frontstage = createTestFrontstage({
      id: "test-tool-settings",
      version: Math.random(),
      layout: (
        <StandardLayout
          toolSettings={{
            defaultLocation,
          }}
        />
      ),
      toolSettings: {
        id: "toolSettings",
      },
    });

    return frontstage;
  }
};

function getDefaultLocation(
  params: URLSearchParams
): Required<StandardLayoutProps>["toolSettings"]["defaultLocation"] {
  const locationParam = params.get("location");
  const location = toStagePanelLocation(locationParam ?? "");
  const section = params.get("section");
  if (!location || !section) {
    return undefined;
  }
  return {
    location,
    section: Number(section) as StagePanelSection,
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
