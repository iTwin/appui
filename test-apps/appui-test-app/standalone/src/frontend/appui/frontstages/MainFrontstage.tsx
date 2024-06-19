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
import { ComponentExamplesModalFrontstage } from "@itwin/appui-test-providers";
import { ViewportComponent } from "@itwin/imodel-components-react";
import stageIconSvg from "./imodeljs.svg";
import { TestAppLocalization } from "../../useTranslation";

// Sample UI items provider that dynamically adds ui items
class MainStageBackstageItemsProvider implements UiItemsProvider {
  public readonly id = "main-stage-backstageItemProvider";

  public provideBackstageItems(): BackstageItem[] {
    return [
      BackstageItemUtilities.createStageLauncher(
        MainFrontstage.stageId,
        100,
        10,
        TestAppLocalization.translate("backstage.viewIModel"),
        TestAppLocalization.translate("backstage.iModelStage"),
        stageIconSvg
      ),
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
        id: "content-group",
        layout: StandardContentLayouts.singleView,
        contents: [
          {
            id: "viewport",
            classId: "",
            content: (
              <ViewportComponent
                imodel={UiFramework.getIModelConnection()!}
                viewState={UiFramework.getDefaultViewState()}
              />
            ),
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
