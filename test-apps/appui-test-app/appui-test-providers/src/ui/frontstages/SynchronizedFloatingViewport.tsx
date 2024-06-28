/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
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
import { SynchronizedFloatingViewportProvider } from "../providers/SynchronizedFloatingViewportProvider";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import { ViewportContent } from "../ViewportContent";

/**
 * The SynchronizedFloatingViewport stage provides a register method that registers a FrontstageProvider that is used to activate a stage.
 * It also register "standard" providers to provide tool buttons and statusbar items. Finally it registers a UiItemsProvider
 * that provides tools that are only intended to be used in this stage. This stage also uses a ContentGroupProvider to provide a
 * ContentGroup to use when the stage is activated. Using a ContentGroupProvider allows async code to be run as a stage is activated
 * so it can use logic to determine what content and layout to use.
 */

export class SynchronizedFloatingViewportStage {
  public static stageId =
    "appui-test-providers:SynchronizedFloatingViewportExample";

  public static register(localizationNamespace: string) {
    UiFramework.frontstages.addFrontstage(
      FrontstageUtilities.createStandardFrontstage({
        id: SynchronizedFloatingViewportStage.stageId,
        version: 1.1,
        contentGroupProps: {
          id: "synchronized-floating-viewport-stage-frontstage-main-content-group",
          layout: StandardContentLayouts.singleView,
          contents: [
            {
              id: "primaryContent",
              classId: "",
              content: <ViewportContent />,
              applicationData: {
                viewState: UiFramework.getDefaultViewState,
                iModelConnection: UiFramework.getIModelConnection,
                featureOptions: {
                  defaultViewOverlay: {
                    enableScheduleAnimationViewOverlay: true,
                    enableAnalysisTimelineViewOverlay: true,
                    enableSolarTimelineViewOverlay: true,
                  },
                },
              },
            },
          ],
        },
        cornerButton: <BackstageAppButton icon="icon-bentley-systems" />,
        usage: StageUsage.General,
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
        providerId: "synchronized-floating-viewport-stage-standardContentTools",
        stageIds: [SynchronizedFloatingViewportStage.stageId],
      }
    );

    // Provides standard tools for NavigationWidget in stage
    UiItemsManager.register(new StandardNavigationToolsUiItemsProvider(), {
      providerId:
        "synchronized-floating-viewport-stage-standardNavigationTools",
      stageIds: [SynchronizedFloatingViewportStage.stageId],
    });

    // Provides standard status fields for stage
    UiItemsManager.register(new StandardStatusbarUiItemsProvider(), {
      providerId: "synchronized-floating-viewport-stage-standardStatusItems",
      stageIds: [SynchronizedFloatingViewportStage.stageId],
    });

    // Provides example widgets stage
    SynchronizedFloatingViewportProvider.register(localizationNamespace);
  }
}
