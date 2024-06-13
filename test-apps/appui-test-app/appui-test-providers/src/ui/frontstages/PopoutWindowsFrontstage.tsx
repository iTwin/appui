/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageAppButton,
  ContentGroup,
  ContentGroupProps,
  ContentGroupProvider,
  ContentProps,
  createStandardFrontstage,
  Frontstage,
  IModelViewportControl,
  StageUsage,
  StandardContentToolsUiItemsProvider,
  StandardNavigationToolsUiItemsProvider,
  StandardStatusbarUiItemsProvider,
  UiFramework,
  UiItemsManager,
} from "@itwin/appui-react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import { getSavedViewLayoutProps } from "../../tools/ContentLayoutTools";
import { PopoutWindowsStageUiItemsProvider } from "../providers/PopoutWindowsStageUiItemsProvider";

/**
 * The PopoutWindowsFrontstageContentGroupProvider provides a class with the primary method `provideContentGroup` to provide a ContentGroup
 * to a stage when the stage is activated.
 */
export class PopoutWindowsFrontstageGroupProvider extends ContentGroupProvider {
  public override prepareToSaveProps(contentGroupProps: ContentGroupProps) {
    const newContentsArray = contentGroupProps.contents.map(
      (content: ContentProps) => {
        const newContent = { ...content };
        if (newContent.applicationData) delete newContent.applicationData;
        return newContent;
      }
    );
    return { ...contentGroupProps, contents: newContentsArray };
  }

  public override applyUpdatesToSavedProps(
    contentGroupProps: ContentGroupProps
  ) {
    const newContentsArray = contentGroupProps.contents.map(
      (content: ContentProps) => {
        const newContent = { ...content };

        if (newContent.classId === IModelViewportControl.id) {
          newContent.applicationData = {
            ...newContent.applicationData,
            isPrimaryView: true,
            featureOptions: {
              defaultViewOverlay: {
                enableScheduleAnimationViewOverlay: true,
                enableAnalysisTimelineViewOverlay: true,
                enableSolarTimelineViewOverlay: true,
              },
            },
          };
        }
        return newContent;
      }
    );
    return { ...contentGroupProps, contents: newContentsArray };
  }

  public override async contentGroup(
    config: Frontstage
  ): Promise<ContentGroup> {
    const savedViewLayoutProps = await getSavedViewLayoutProps(
      config.id,
      UiFramework.getIModelConnection()
    );
    if (savedViewLayoutProps) {
      const viewState =
        savedViewLayoutProps.contentGroupProps.contents[0].applicationData
          ?.viewState;
      if (viewState) {
        UiFramework.setDefaultViewState(viewState);
      }
      const contentGroupProps = this.applyUpdatesToSavedProps(
        savedViewLayoutProps.contentGroupProps
      );
      return new ContentGroup(contentGroupProps);
    }

    return new ContentGroup({
      id: "popout-windows-stage-frontstage-main-content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "primaryContent",
          classId: IModelViewportControl.id,
          applicationData: {
            isPrimaryView: true,
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
    });
  }
}

/**
 * The PopoutWindowsFrontstage provides a register method that registers a FrontstageProvider that is used to activate a stage.
 * It also register "standard" providers to provide tool buttons and statusbar items. Finally it registers a UiItemsProvider
 * that provides tools that are only intended to be used in this stage. This stage also uses a ContentGroupProvider to provide a
 * ContentGroup to use when the stage is activated. Using a ContentGroupProvider allows async code to be run as a stage is activated
 * so it can use logic to determine what content and layout to use.
 */

export class PopoutWindowsFrontstage {
  public static stageId = "appui-test-providers:PopoutWindowsFrontstage";

  private static _contentGroupProvider =
    new PopoutWindowsFrontstageGroupProvider();

  public static supplyAppData(_id: string, _applicationData?: any) {
    return {
      viewState: UiFramework.getDefaultViewState,
      iModelConnection: UiFramework.getIModelConnection,
    };
  }

  public static register(localizationNamespace: string) {
    UiFramework.frontstages.addFrontstage(
      createStandardFrontstage({
        id: PopoutWindowsFrontstage.stageId,
        version: 1.1,
        contentGroupProps: PopoutWindowsFrontstage._contentGroupProvider,
        cornerButton: (
          <BackstageAppButton
            key="appui-test-providers-popout-windows-backstage"
            icon="icon-bentley-systems"
          />
        ),
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
