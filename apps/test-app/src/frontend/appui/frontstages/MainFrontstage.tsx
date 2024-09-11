/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  BackstageAppButton,
  BackstageItemUtilities,
  FrontstageUtilities,
  SettingsModalFrontstage,
  StageUsage,
  UiItemsProvider,
} from "@itwin/appui-react";
import {
  ComponentExamplesModalFrontstage,
  getCustomViewSelectorPopupItem,
  ViewportContent,
} from "@itwin/appui-test-providers";
import { SvgImodel } from "@itwin/itwinui-icons-react";

interface CreateMainFrontstageArgs {
  contentProps: React.ComponentProps<typeof ViewportContent>;
}

export function createMainFrontstage(args?: CreateMainFrontstageArgs) {
  return FrontstageUtilities.createStandardFrontstage({
    id: createMainFrontstage.stageId,
    contentGroupProps: {
      id: "content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "viewport",
          classId: "",
          content: <ViewportContent {...args?.contentProps} />,
        },
      ],
    },
    cornerButton: <BackstageAppButton />,
    usage: StageUsage.General,
  });
}
createMainFrontstage.stageId = "main";

export function createMainFrontstageProvider() {
  return {
    id: "appui-test-app:backstageItemsProvider",
    getToolbarItems: () => [getCustomViewSelectorPopupItem()],
    getBackstageItems: () => [
      BackstageItemUtilities.createStageLauncher({
        stageId: createMainFrontstage.stageId,
        groupPriority: 100,
        itemPriority: 10,
        label: "View iModel",
        subtitle: "Review iModel",
        icon: <SvgImodel />,
      }),
      SettingsModalFrontstage.getBackstageActionItem(400, 10),
      ComponentExamplesModalFrontstage.getBackstageActionItem(400, 20),
    ],
  } satisfies UiItemsProvider;
}
