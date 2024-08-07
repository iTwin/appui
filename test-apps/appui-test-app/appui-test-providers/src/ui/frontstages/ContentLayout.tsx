/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageAppButton,
  ContentGroup,
  ContentGroupProvider,
  Frontstage,
  FrontstageUtilities,
  StageContentLayout,
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
  StandardContentToolsUiItemsProvider,
  StandardNavigationToolsUiItemsProvider,
  StandardStatusbarUiItemsProvider,
  UiFramework,
  UiItemsManager,
  useActiveViewport,
} from "@itwin/appui-react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import { getSavedViewLayoutProps } from "../../tools/ContentLayoutTools";
import { ContentLayoutStageUiItemsProvider } from "../providers/ContentLayoutStageUiItemsProvider";
import { ViewportContent } from "../ViewportContent";

/** The ContentLayoutStageContentGroupProvider provides a class with the primary method `provideContentGroup` to provide a ContentGroup
 * to a stage when the stage is activated. This provider will look to see if the user saved out a ContentGroup to use when a stage and
 * specific iModel is opened. See `SaveContentLayoutTool` in `ContentLayoutTools.tsx` to see tool that saved the layout and ViewStates.
 * If no saved state was found `UiFramework.getDefaultViewState` is used to specify the ViewState and `StandardContentLayouts.singleView`
 * is used to specify the layout. The `prepareToSaveProps` prepare the JSON to be saved to local storage when saving ContentGroup data. The
 * method `applyUpdatesToSavedProps` is used to make any updates to the saved JSON before it is applied to the stage.
 */
export class ContentLayoutStageContentGroupProvider extends ContentGroupProvider {
  public override async contentGroup(
    config: Frontstage
  ): Promise<ContentGroup> {
    const defaultContent = new ContentGroup({
      id: "content-layout-stage-frontstage-main-content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "primaryContent",
          classId: "",
          content: <ViewportContent renderViewOverlay={() => undefined} />,
        },
      ],
    });

    const iModelConnection = UiFramework.getIModelConnection();
    if (!iModelConnection) return defaultContent;

    const savedViewLayoutProps = await getSavedViewLayoutProps(
      config.id,
      iModelConnection
    );
    if (!savedViewLayoutProps) return defaultContent;

    const viewStates = await StageContentLayout.viewStatesFromProps(
      iModelConnection,
      savedViewLayoutProps
    );
    if (viewStates.length > 0) {
      const defaultViewState = viewStates[0];
      if (defaultViewState) {
        UiFramework.setDefaultViewState(defaultViewState);
      }
    }

    return new ContentGroup({
      ...savedViewLayoutProps.contentGroupProps,
      contents: savedViewLayoutProps.contentGroupProps.contents.map(
        (content, index) => {
          const viewState = viewStates[index];
          return {
            ...content,
            content: (
              <ViewportContent
                viewState={viewState}
                renderViewOverlay={() => undefined}
              />
            ),
          };
        }
      ),
    });
  }
}

/** The ContentLayoutStage provides a register method that registers a FrontstageProvider that is used to activate a stage.
 * It also register "standard" providers to provide tool buttons and statusbar items. Finally it registers a UiItemsProvider
 * that provides tools that are only intended to be used in this stage. This stage also uses a ContentGroupProvider to provide a
 * ContentGroup to use when the stage is activated. Using a ContentGroupProvider allows async code to be run as a stage is activated
 * so it can use logic to determine what content and layout to use.
 */

export class ContentLayoutStage {
  public static stageId = "appui-test-providers:ContentLayoutExample";

  private static _contentGroupProvider =
    new ContentLayoutStageContentGroupProvider();

  public static register(localizationNamespace: string) {
    UiFramework.frontstages.addFrontstage(
      FrontstageUtilities.createStandardFrontstage({
        id: ContentLayoutStage.stageId,
        contentGroupProps: ContentLayoutStage._contentGroupProvider,
        cornerButton: (
          <BackstageAppButton
            key="appui-test-providers-ContentLayoutExample-backstage"
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
        providerId: "content-layout-stage-standardContentTools",
        stageIds: [ContentLayoutStage.stageId],
      }
    );

    // Provides standard tools for NavigationWidget in stage
    UiItemsManager.register(new StandardNavigationToolsUiItemsProvider(), {
      providerId: "content-layout-stage-standardNavigationTools",
      stageIds: [ContentLayoutStage.stageId],
    });

    // Provides standard status fields for stage
    UiItemsManager.register(
      new StandardStatusbarUiItemsProvider({ activityCenter: true }),
      {
        providerId: "content-layout-stage-standardStatusItems",
        stageIds: [ContentLayoutStage.stageId],
      }
    );

    UiItemsManager.register(
      {
        id: "widgets",
        getWidgets: () => {
          return [
            {
              id: "active-view",
              label: "Active view",
              content: <ActiveView />,
              layouts: {
                standard: {
                  location: StagePanelLocation.Right,
                  section: StagePanelSection.End,
                },
              },
            },
          ];
        },
      },
      {
        stageIds: [ContentLayoutStage.stageId],
      }
    );

    // Provides example widgets stage
    ContentLayoutStageUiItemsProvider.register(localizationNamespace);
  }
}

function ActiveView() {
  const viewport = useActiveViewport();
  if (!viewport) return <span>No active viewport</span>;
  return (
    <span>
      <b>id:</b> {viewport.view.id}
      <br />
      <b>description:</b> {viewport.view.description}
    </span>
  );
}
