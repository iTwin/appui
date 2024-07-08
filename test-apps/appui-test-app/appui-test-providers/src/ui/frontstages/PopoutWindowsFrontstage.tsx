/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  BackstageAppButton,
  FrontstageUtilities,
  StageUsage,
  StandardContentToolsUiItemsProvider,
  StandardNavigationToolsUiItemsProvider,
  StandardStatusbarUiItemsProvider,
  UiFramework,
  UiItemsManager,
} from "@itwin/appui-react";
import { PopoutWindowsStageUiItemsProvider } from "../providers/PopoutWindowsStageUiItemsProvider";
import { ViewportContent } from "../ViewportContent";

/**
 * The PopoutWindowsFrontstage provides a register method that registers a FrontstageProvider that is used to activate a stage.
 * It also register "standard" providers to provide tool buttons and statusbar items. Finally it registers a UiItemsProvider
 * that provides tools that are only intended to be used in this stage. This stage also uses a ContentGroupProvider to provide a
 * ContentGroup to use when the stage is activated. Using a ContentGroupProvider allows async code to be run as a stage is activated
 * so it can use logic to determine what content and layout to use.
 */

export class PopoutWindowsFrontstage {
  public static stageId = "appui-test-providers:PopoutWindowsFrontstage";

  public static register(localizationNamespace: string) {
    UiFramework.frontstages.addFrontstage(
      FrontstageUtilities.createStandardFrontstage({
        id: PopoutWindowsFrontstage.stageId,
        usage: StageUsage.General,
        contentGroupProps: {
          id: "popout-windows-stage-frontstage-main-content-group",
          layout: StandardContentLayouts.singleView,
          contents: [
            {
              id: "primaryContent",
              classId: "",
              content: <ViewportContent />,
            },
          ],
        },
        cornerButton: (
          <BackstageAppButton
            key="appui-test-providers-popout-windows-backstage"
            icon="icon-bentley-systems"
          />
        ),
      })
    );
    this.registerToolProviders(localizationNamespace);
  }

  private static registerToolProviders(localizationNamespace: string) {
    // Provides standard tools for ToolWidget in stage
    UiItemsManager.register(
      new StandardContentToolsUiItemsProvider({
        vertical: {
          selectElement: true,
        },
        horizontal: {
          clearSelection: true,
          clearDisplayOverrides: true,
          hide: "group",
          isolate: "group",
          emphasize: "element",
        },
      }),
      {
        providerId: "popout-window-stage-standardContentTools",
        stageIds: [PopoutWindowsFrontstage.stageId],
      }
    );

    // Provides standard tools for NavigationWidget in stage
    UiItemsManager.register(new StandardNavigationToolsUiItemsProvider(), {
      providerId: "popout-windows-stage-standardNavigationTools",
      stageIds: [PopoutWindowsFrontstage.stageId],
    });

    // Provides standard status fields for stage
    UiItemsManager.register(new StandardStatusbarUiItemsProvider(), {
      providerId: "popout-windows-stage-standardStatusItems",
      stageIds: [PopoutWindowsFrontstage.stageId],
    });

    // Provides example widgets stage
    PopoutWindowsStageUiItemsProvider.register(localizationNamespace);
  }
}
