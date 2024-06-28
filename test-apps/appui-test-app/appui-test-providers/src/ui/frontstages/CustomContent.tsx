/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageAppButton,
  Frontstage,
  FrontstageUtilities,
  IModelViewportControl,
  StageUsage,
  StandardContentToolsUiItemsProvider,
  StandardNavigationToolsUiItemsProvider,
  StandardStatusbarUiItemsProvider,
  UiFramework,
  UiItemsManager,
  ViewToolWidgetComposer,
} from "@itwin/appui-react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import { CustomContentStageUiProvider } from "../providers/CustomContentStageUiProvider";
import { SampleContentControl } from "../content/SampleContentControl";

function useActiveContentId() {
  const [activeId, setActiveId] = React.useState(
    UiFramework.content.getActiveId()
  );
  React.useEffect(() => {
    return UiFramework.content.onActiveContentChangedEvent.addListener(
      (args) => {
        setActiveId(args.id);
      }
    );
  }, []);
  return activeId;
}

function CustomViewToolWidgetComposer() {
  const activeId = useActiveContentId();

  const hideNavigationAid = activeId === "ui-test:customContent";
  return <ViewToolWidgetComposer hideNavigationAid={hideNavigationAid} />;
}

function createFrontstage(): Frontstage {
  const frontstage = FrontstageUtilities.createStandardFrontstage({
    id: CustomContentFrontstage.stageId,
    version: 1.1,
    contentGroupProps: {
      id: "appui-test-providers:custom-stage-content",
      layout: {
        ...StandardContentLayouts.twoHorizontalSplit,
        horizontalSplit: {
          ...StandardContentLayouts.twoHorizontalSplit.horizontalSplit!,
          minSizeBottom: 100,
          percentage: 0.8,
        },
      },
      contents: [
        {
          id: "primaryContent",
          // eslint-disable-next-line deprecation/deprecation
          classId: IModelViewportControl,
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
        {
          id: "ui-test:customContent",
          classId: SampleContentControl,
        },
      ],
    },
    hideNavigationAid: false,
    cornerButton: <BackstageAppButton />,
    usage: StageUsage.General,
  });
  return {
    ...frontstage,
    viewNavigation: {
      ...frontstage.viewNavigation!,
      content: <CustomViewToolWidgetComposer />,
    },
  };
}

/**
 * This class is used to register a new frontstage that is called 'Custom' which provides custom content along with imodel content.
 * Providers are used to provide some tools from standard providers along with a stage-specific provider that
 * defines a couple test tool buttons to demonstrate how to use Redux from a package like the one that includes this
 * frontstage definition.
 */
export class CustomContentFrontstage {
  public static stageId = "appui-test-providers:CustomContent";

  public static register(localizationNamespace: string) {
    CustomContentFrontstage.registerToolProviders(localizationNamespace);
    UiFramework.frontstages.addFrontstage(createFrontstage());
  }

  private static registerToolProviders(localizationNamespace: string) {
    // Provides standard tools for ToolWidget
    UiItemsManager.register(
      new StandardContentToolsUiItemsProvider({
        horizontal: {
          clearSelection: true,
          clearDisplayOverrides: true,
          hide: "group",
          isolate: "group",
          emphasize: "element",
        },
        vertical: {
          selectElement: true,
        },
      }),
      {
        providerId: "customContentTools",
        stageIds: [CustomContentFrontstage.stageId],
      }
    );

    /** Provides standard tools for NavigationWidget */
    UiItemsManager.register(new StandardNavigationToolsUiItemsProvider(), {
      providerId: "customNavigationTools",
      stageIds: [CustomContentFrontstage.stageId],
    });

    /** Provides standard status fields */
    UiItemsManager.register(new StandardStatusbarUiItemsProvider(), {
      providerId: "customStatusFields",
      stageIds: [CustomContentFrontstage.stageId],
    });

    // register stage specific items provider
    UiItemsManager.register(
      new CustomContentStageUiProvider(localizationNamespace),
      {
        providerId: "customStageTools",
        stageIds: [CustomContentFrontstage.stageId],
      }
    );
  }
}
