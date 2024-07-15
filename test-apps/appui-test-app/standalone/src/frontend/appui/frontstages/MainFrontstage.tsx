/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { useSelector } from "react-redux";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  BackstageAppButton,
  BackstageItem,
  BackstageItemUtilities,
  FrontstageUtilities,
  SettingsModalFrontstage,
  StageUsage,
  StandardContentToolsUiItemsProvider,
  StandardNavigationToolsUiItemsProvider,
  StandardStatusbarUiItemsProvider,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiFramework,
  UiItemsManager,
  UiItemsProvider,
} from "@itwin/appui-react";
import {
  ComponentExamplesModalFrontstage,
  ViewportContent,
} from "@itwin/appui-test-providers";
import { SvgImodel, SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { TestAppLocalization } from "../../useTranslation";
import { RootState } from "../..";

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

/** Application continues to use redux store and opts-in to respect `viewOverlayDisplay`. */
function MainFrontstageViewport() {
  const viewOverlay = useSelector((state: RootState) => {
    // eslint-disable-next-line deprecation/deprecation
    return state.frameworkState.configurableUiState.viewOverlayDisplay;
  });
  return (
    <ViewportContent
      renderViewOverlay={viewOverlay ? undefined : () => undefined}
    />
  );
}

export class MainFrontstage {
  public static stageId = "appui-test-app:main-stage";

  public static register() {
    UiFramework.frontstages.addFrontstage(
      FrontstageUtilities.createStandardFrontstage({
        id: MainFrontstage.stageId,
        version: 1.1,
        contentGroupProps: {
          id: "content-group",
          layout: StandardContentLayouts.singleView,
          contents: [
            {
              id: "viewport",
              classId: "",
              content: <MainFrontstageViewport />,
            },
          ],
        },
        cornerButton: <BackstageAppButton />,
        usage: StageUsage.General,
      })
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

    UiItemsManager.register(
      {
        id: "main-stage-toolbar-items",
        getToolbarItems: () => [
          ToolbarItemUtilities.createActionItem(
            "toggle-view-overlay",
            100,
            <SvgPlaceholder />,
            "Toggle View Overlay",
            () => {
              // eslint-disable-next-line deprecation/deprecation
              UiFramework.setViewOverlayDisplay(
                // eslint-disable-next-line deprecation/deprecation
                !UiFramework.viewOverlayDisplay
              );
            },
            {
              layouts: {
                standard: {
                  orientation: ToolbarOrientation.Horizontal,
                  usage: ToolbarUsage.ContentManipulation,
                },
              },
            }
          ),
        ],
      },
      { stageIds: [MainFrontstage.stageId] }
    );
  }
}
