/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  ContentLayoutProps,
  StandardContentLayouts,
} from "@itwin/appui-abstract";
import {
  BackstageAppButton,
  BackstageItem,
  BackstageItemUtilities,
  ContentGroup,
  ContentGroupProps,
  ContentGroupProvider,
  ContentProps,
  Frontstage,
  FrontstageUtilities,
  IModelViewportControl,
  SettingsModalFrontstage,
  StageContentLayout,
  StageContentLayoutProps,
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
import { AnalysisStyle } from "@itwin/core-common";
import { IModelConnection, ViewState } from "@itwin/core-frontend";
import { LocalStateStorage } from "@itwin/core-react";
import { SampleAppIModelApp } from "../../index";
import { AppUi } from "../AppUi";
import stageIconSvg from "./imodeljs.svg";
import { getUrlParam } from "../../UrlParams";
import { TestAppLocalization } from "../../useTranslation";
import { ViewportComponent } from "@itwin/imodel-components-react";

function getIModelSpecificKey(
  inKey: string,
  iModelConnection: IModelConnection | undefined
) {
  const imodelId = iModelConnection?.iModelId ?? "unknownImodel";
  return `[${imodelId}]${inKey}`;
}

export async function getSavedViewLayoutProps(
  activeFrontstageId: string,
  iModelConnection: IModelConnection | undefined
) {
  const localSettings = new LocalStateStorage();
  const result = await localSettings.getSetting(
    "ContentGroupLayout",
    getIModelSpecificKey(activeFrontstageId, iModelConnection)
  );

  if (result.setting) {
    // Parse StageContentLayoutProps
    const savedViewLayoutProps: StageContentLayoutProps = result.setting;
    if (iModelConnection) {
      // Create ViewStates
      const viewStates = await StageContentLayout.viewStatesFromProps(
        iModelConnection,
        savedViewLayoutProps
      );
      if (0 === viewStates.length) return undefined;

      // Add applicationData to the ContentProps
      savedViewLayoutProps.contentGroupProps.contents.forEach(
        (contentProps, index) => {
          // eslint-disable-next-line deprecation/deprecation
          contentProps.applicationData = {
            viewState: viewStates[index],
            iModelConnection,
          };
        }
      );
    }
    return savedViewLayoutProps;
  }
  return undefined;
}

export class InitialIModelContentStageProvider extends ContentGroupProvider {
  constructor(private _forEditing?: boolean) {
    super();
  }

  public override prepareToSaveProps(contentGroupProps: ContentGroupProps) {
    const newContentsArray = contentGroupProps.contents.map((content) => {
      const newContent = { ...content };
      // eslint-disable-next-line deprecation/deprecation
      if (newContent.applicationData) delete newContent.applicationData;
      return newContent;
    });
    return { ...contentGroupProps, contents: newContentsArray };
  }

  public override applyUpdatesToSavedProps(
    contentGroupProps: ContentGroupProps
  ) {
    const newContentsArray = contentGroupProps.contents.map((content) => {
      const newContent = { ...content };

      // eslint-disable-next-line deprecation/deprecation
      if (newContent.classId === IModelViewportControl.id) {
        // eslint-disable-next-line deprecation/deprecation
        newContent.applicationData = {
          // eslint-disable-next-line deprecation/deprecation
          ...newContent.applicationData,
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
    });
    return { ...contentGroupProps, contents: newContentsArray };
  }

  public override async contentGroup(
    config: Frontstage
  ): Promise<ContentGroup> {
    const viewIdsSelected = SampleAppIModelApp.getInitialViewIds();
    const iModelConnection = UiFramework.getIModelConnection();

    if (!iModelConnection)
      throw new Error(
        `Unable to generate content group if not iModelConnection is available`
      );

    if (0 === viewIdsSelected.length) {
      const savedViewLayoutProps = await getSavedViewLayoutProps(
        config.id,
        iModelConnection
      );
      if (savedViewLayoutProps) {
        const viewState =
          // eslint-disable-next-line deprecation/deprecation
          savedViewLayoutProps.contentGroupProps.contents[0].applicationData
            ?.viewState;
        if (viewState) {
          UiFramework.setDefaultViewState(viewState);
        }
        return new ContentGroup(savedViewLayoutProps.contentGroupProps);
      }

      return new ContentGroup({
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
      });
    }

    // first find an appropriate layout
    const contentLayoutProps: ContentLayoutProps | undefined =
      AppUi.findLayoutFromContentCount(viewIdsSelected.length);
    if (!contentLayoutProps) {
      throw Error(
        `Could not find layout ContentLayoutProps when number of viewStates=${viewIdsSelected.length}`
      );
    }

    let viewStates: ViewState[] = [];
    const promises = new Array<Promise<ViewState>>();
    viewIdsSelected.forEach((viewId: string) => {
      promises.push(iModelConnection.views.load(viewId));
    });

    const timeline = getUrlParam("timeline");
    try {
      viewStates = await Promise.all(promises);
      if (timeline) {
        viewStates.forEach((viewState) => {
          viewState.displayStyle.settings.analysisStyle =
            AnalysisStyle.fromJSON({});
        });
      }
    } catch {}

    // create the content props that specifies an iModelConnection and a viewState entry in the application data.
    const contentProps: ContentProps[] = [];
    viewStates.forEach((viewState, index) => {
      if (0 === index) {
        UiFramework.setDefaultViewState(viewState);
      }
      contentProps.push({
        id: `imodel-view-${index}`,
        classId: "",
        content: (
          <ViewportComponent viewState={viewState} imodel={iModelConnection} />
        ),
        // TODO: view overlay should be set in the content control
        applicationData: {
          featureOptions: {
            defaultViewOverlay: {
              enableScheduleAnimationViewOverlay: true,
              enableAnalysisTimelineViewOverlay: true,
              enableSolarTimelineViewOverlay: true,
            },
          },
        },
      });
    });

    const myContentGroup: ContentGroup = new ContentGroup({
      id: "views-frontstage-default-content-group",
      layout: contentLayoutProps,
      contents: contentProps,
    });
    return myContentGroup;
  }
}

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
  private static _contentGroupProvider =
    new InitialIModelContentStageProvider();

  public static supplyAppData(_id: string, _applicationData?: any) {
    return {
      viewState: UiFramework.getDefaultViewState,
      iModelConnection: UiFramework.getIModelConnection,
    };
  }

  public static register() {
    const stageProps: StandardFrontstageProps = {
      id: MainFrontstage.stageId,
      version: 1.1,
      contentGroupProps: MainFrontstage._contentGroupProvider,
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
