/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  BackstageAppButton,
  BackstageItem,
  BackstageItemUtilities,
  FrontstageUtilities,
  SettingsModalFrontstage,
  StageUsage,
  StandardContentToolsUiItemsProvider,
  StandardFrontstageProps,
  StandardNavigationToolsUiItemsProvider,
  StandardStatusbarUiItemsProvider,
  UiFramework,
  UiItemsManager,
  UiItemsProvider,
} from "@itwin/appui-react";
import {
  ComponentExamplesModalFrontstage,
  ViewportContent,
} from "@itwin/appui-test-providers";
import { TestAppLocalization } from "../../useTranslation";
import { SvgImodel } from "@itwin/itwinui-icons-react";

// Sample UI items provider that dynamically adds ui items
class MainStageBackstageItemsProvider implements UiItemsProvider {
  public readonly id = "main-stage-backstageItemProvider";

  public provideBackstageItems(): BackstageItem[] {
    return [
      BackstageItemUtilities.createStageLauncher({
        stageId: MainFrontstage.stageId,
        groupPriority: 100,
        itemPriority: 10,
        label: TestAppLocalization.translate("backstage.viewIModel"),
        subtitle: TestAppLocalization.translate("backstage.iModelStage"),
        icon: <SvgImodel />,
      }),
      SettingsModalFrontstage.getBackstageActionItem(400, 10),
      ComponentExamplesModalFrontstage.getBackstageActionItem(400, 20),
    ];
  }
}

export class MainFrontstage {
  public static stageId = "appui-test-app:main-stage";

  public static register() {
    const stageProps: StandardFrontstageProps = {
      id: MainFrontstage.stageId,
      version: 1.1,
      contentGroupProps: {
        id: "views-frontstage-default-content-group",
        layout: StandardContentLayouts.singleView,
        contents: [
          {
            id: "imodel-view-0",
            classId: "",
            content: <ViewportContent />,
          },
        ],
      },
      cornerButton: <BackstageAppButton />,
      usage: StageUsage.General,
    };

    UiFramework.frontstages.addFrontstage(
      FrontstageUtilities.createStandardFrontstage(stageProps)
    );
    this.registerUiItemProviders();
  }

  private static registerUiItemProviders() {
    UiItemsManager.register(new MainStageBackstageItemsProvider());

    // Provides standard tools for ToolWidget - limit to showing only in this stage
    UiItemsManager.register(new StandardContentToolsUiItemsProvider(), {
      providerId: "main-stage-standardContentTools",
      stageIds: [MainFrontstage.stageId],
    });

    // Provides standard tools for NavigationWidget - limit to showing only in this stage
    UiItemsManager.register(new StandardNavigationToolsUiItemsProvider(), {
      providerId: "main-stage-standardNavigationTools",
      stageIds: [MainFrontstage.stageId],
    });

    // Provides standard status fields - limit to showing only in this stage
    UiItemsManager.register(new StandardStatusbarUiItemsProvider(), {
      providerId: "main-stage-standardStatusItems",
      stageIds: [MainFrontstage.stageId],
    });
  }
}
