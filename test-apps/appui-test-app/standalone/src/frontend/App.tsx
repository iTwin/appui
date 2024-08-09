/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  BackstageComposer,
  ConfigurableUiContent,
  SafeAreaContext,
  SafeAreaInsets,
  StageUsage,
  StandardContentToolsUiItemsProvider,
  StandardNavigationToolsUiItemsProvider,
  ThemeManager,
  UiFramework,
  UiItemsManager,
} from "@itwin/appui-react";
import { IModelConnection, ViewState } from "@itwin/core-frontend";
import React from "react";
import {
  createMainFrontstage,
  createMainFrontstageProvider,
} from "./appui/frontstages/MainFrontstage";
import {
  createElementStackingFrontstage,
  createElementStackingProvider,
} from "./appui/frontstages/ElementStacking";
import {
  AbstractUiItemsProvider,
  AppPreviewFeatures,
  AppUiTestProviders,
  ContentLayoutStageUiItemsProvider,
  createContentLayoutFrontstage,
  createCustomContentFrontstage,
  createPreviewFeaturesProvider,
  CustomContentStageUiProvider,
  FloatingWidgetsUiItemsProvider,
  InspectUiItemInfoToolProvider,
  MessageUiItemsProvider,
  WidgetContentProvider,
} from "@itwin/appui-test-providers";
import { ProcessDetector } from "@itwin/core-bentley";
import {
  createEditorFrontstage,
  createEditorFrontstageProvider,
} from "./appui/frontstages/EditorFrontstage";
import { createTestPanelFrontstage } from "./appui/frontstages/TestPanelFrontstage";
import { createTestPopoutFrontstage } from "./appui/frontstages/TestPopoutFrontstage";
import {
  createWidgetApiFrontstage,
  createWidgetApiStageProvider,
} from "./appui/frontstages/WidgetApiFrontstage";
import { useEngagementTime } from "./appui/useEngagementTime";
import {
  AppLocalizationProvider,
  createLanguageProvider,
} from "./Localization";
import { createStatusBarUiItemsProvider } from "./appui/providers/StatusbarUiItemsProvider";

interface AppProps {
  iModelConnection?: IModelConnection;
  viewState?: ViewState;
  frontstageId?: string;
  featureOverrides?: React.ComponentProps<
    typeof AppPreviewFeatures
  >["featureOverrides"];
}

export function App({
  iModelConnection,
  viewState,
  frontstageId,
  featureOverrides,
}: AppProps) {
  React.useEffect(() => {
    // TODO: registration of frontstages and providers should go into initializer.
    const mainFrontstage = createMainFrontstage({
      contentProps: {
        imodel: iModelConnection,
        viewState,
      },
    });
    const frontstages = [
      mainFrontstage,
      createElementStackingFrontstage(),
      createTestPanelFrontstage(),
      createTestPopoutFrontstage(),
      createWidgetApiFrontstage(),
      createCustomContentFrontstage(),
      createContentLayoutFrontstage(),
    ];
    frontstages.forEach((frontstage) => {
      UiFramework.frontstages.addFrontstage(frontstage);
    });
    // SynchronizedFloatingViewportStage.register(
    //   AppUiTestProviders.localizationNamespace
    // );
    // PopoutWindowsFrontstage.register(AppUiTestProviders.localizationNamespace);

    UiItemsManager.register(new StandardContentToolsUiItemsProvider(), {
      stageIds: [
        createMainFrontstage.stageId,
        createEditorFrontstage.stageId,
        createWidgetApiFrontstage.stageId,
      ],
    });
    UiItemsManager.register(new StandardNavigationToolsUiItemsProvider(), {
      stageIds: [
        createMainFrontstage.stageId,
        createWidgetApiFrontstage.stageId,
      ],
    });
    UiItemsManager.register(createStatusBarUiItemsProvider(), {
      stageIds: [
        createMainFrontstage.stageId,
        createWidgetApiFrontstage.stageId,
      ],
    });
    UiItemsManager.register(createMainFrontstageProvider());
    UiItemsManager.register(createElementStackingProvider(), {
      stageIds: [createElementStackingFrontstage.stageId],
    });
    UiItemsManager.register(new FloatingWidgetsUiItemsProvider(), {
      stageIds: [createWidgetApiFrontstage.stageId],
    });
    UiItemsManager.register(createWidgetApiStageProvider(), {
      stageIds: [createWidgetApiFrontstage.stageId],
    });
    UiItemsManager.register(
      new AbstractUiItemsProvider(AppUiTestProviders.localizationNamespace)
    );
    UiItemsManager.register(new MessageUiItemsProvider());
    UiItemsManager.register(
      new InspectUiItemInfoToolProvider(
        AppUiTestProviders.localizationNamespace
      )
    );
    UiItemsManager.register(createPreviewFeaturesProvider(), {
      stageUsages: [StageUsage.General],
    });
    UiItemsManager.register(createLanguageProvider(), {
      stageUsages: [StageUsage.General],
    });
    UiItemsManager.register(createElementStackingProvider(), {
      stageUsages: ["development"],
    });
    UiItemsManager.register(
      new CustomContentStageUiProvider(
        AppUiTestProviders.localizationNamespace
      ),
      {
        stageIds: [createCustomContentFrontstage.stageId],
      }
    );
    UiItemsManager.register(
      new ContentLayoutStageUiItemsProvider(
        AppUiTestProviders.localizationNamespace
      ),
      {
        stageIds: [createContentLayoutFrontstage.stageId],
      }
    );

    if (ProcessDetector.isElectronAppFrontend) {
      UiFramework.frontstages.addFrontstage(createEditorFrontstage());
      UiItemsManager.register(createEditorFrontstageProvider(), {
        stageIds: [createEditorFrontstage.stageId],
      });
    }

    void UiFramework.frontstages.setActiveFrontstage(
      frontstageId ?? createMainFrontstage.stageId
    );
    return () => {
      UiFramework.frontstages.clearFrontstageDefs();
    };
  }, [iModelConnection, viewState, frontstageId]);
  useEngagementTime();
  return (
    <ThemeManager>
      <SafeAreaContext.Provider value={SafeAreaInsets.All}>
        <WidgetContentProvider>
          <AppPreviewFeatures featureOverrides={featureOverrides}>
            <AppLocalizationProvider>
              <ConfigurableUiContent appBackstage={<BackstageComposer />} />
            </AppLocalizationProvider>
          </AppPreviewFeatures>
        </WidgetContentProvider>
      </SafeAreaContext.Provider>
    </ThemeManager>
  );
}
