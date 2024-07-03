/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  BackstageAppButton,
  BackstageItemUtilities,
  ContentGroup,
  ContentGroupProvider,
  FrontstageUtilities,
  UiFramework,
  UiItemsProvider,
} from "@itwin/appui-react";
import { ViewportComponent } from "@itwin/imodel-components-react";
import { SvgImodel } from "@itwin/itwinui-icons-react";
import React from "react";

// __PUBLISH_EXTRACT_START__ Example_Viewport_Frontstage_Group_Provider
export class ViewportFrontstageGroupProvider extends ContentGroupProvider {
  public override async contentGroup(): Promise<ContentGroup> {
    return new ContentGroup({
      id: "content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "viewport",
          classId: "",
          content: <Viewport />,
        },
      ],
    });
  }
}

function Viewport() {
  const [viewState] = React.useState(UiFramework.getDefaultViewState());
  const [iModel] = React.useState(UiFramework.getIModelConnection());
  if (!iModel) return null;
  return <ViewportComponent viewState={viewState} imodel={iModel} />;
}

// __PUBLISH_EXTRACT_END__

// __PUBLISH_EXTRACT_START__ Example_Register_Viewport_Frontstage
export function registerViewportFrontstage(): void {
  UiFramework.frontstages.addFrontstage(
    FrontstageUtilities.createStandardFrontstage({
      id: "example:ViewportFrontstage",
      contentGroupProps: new ViewportFrontstageGroupProvider(),
      cornerButton: <BackstageAppButton />,
      usage: "General",
    })
  );
}
// __PUBLISH_EXTRACT_END__

export const viewportUiItemsProvider = {
  id: "example-stage-backstageItemProvider",
  getBackstageItems: () => [
    BackstageItemUtilities.createStageLauncher(
      "example:ViewportFrontstage",
      100,
      20,
      "Simple viewport",
      undefined,
      <SvgImodel />
    ),
  ],
} satisfies UiItemsProvider;
