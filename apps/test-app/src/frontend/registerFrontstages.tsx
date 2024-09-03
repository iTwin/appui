/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  StageUsage,
  StandardContentToolsUiItemsProvider,
  StandardNavigationToolsUiItemsProvider,
  UiFramework,
  UiItemsManager,
} from "@itwin/appui-react";
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
  AppUiTestProviders,
  ContentLayoutStageUiItemsProvider,
  createContentLayoutFrontstage,
  createCustomContentFrontstage,
  createPopoutWindowsFrontstage,
  createPopoutWindowsProvider,
  createPreviewFeaturesProvider,
  createSynchronizedViewportFrontstage,
  createSynchronizedViewportProvider,
  CustomContentStageUiProvider,
  FloatingWidgetsUiItemsProvider,
  InspectUiItemInfoToolProvider,
  MessageUiItemsProvider,
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
import { createLanguageProvider } from "./Localization";
import { createStatusBarUiItemsProvider } from "./appui/providers/StatusbarUiItemsProvider";
import { IModelConnection, ViewState } from "@itwin/core-frontend";

interface RegisterFrontstagesArgs {
  iModelConnection?: IModelConnection;
  viewState?: ViewState;
}

export function registerFrontstages({
  iModelConnection,
  viewState,
}: RegisterFrontstagesArgs) {
  UiFramework.frontstages.clearFrontstageDefs();
  UiItemsManager.clearAllProviders();

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
    createSynchronizedViewportFrontstage(),
    createPopoutWindowsFrontstage(),
  ];
  frontstages.forEach((frontstage) => {
    UiFramework.frontstages.addFrontstage(frontstage);
  });

  UiItemsManager.register(new StandardContentToolsUiItemsProvider(), {
    stageIds: [
      createMainFrontstage.stageId,
      createEditorFrontstage.stageId,
      createWidgetApiFrontstage.stageId,
      createSynchronizedViewportFrontstage.stageId,
      createPopoutWindowsFrontstage.stageId,
    ],
  });
  UiItemsManager.register(new StandardNavigationToolsUiItemsProvider(), {
    stageIds: [
      createMainFrontstage.stageId,
      createWidgetApiFrontstage.stageId,
      createSynchronizedViewportFrontstage.stageId,
      createPopoutWindowsFrontstage.stageId,
    ],
  });
  UiItemsManager.register(createStatusBarUiItemsProvider(), {
    stageIds: [
      createMainFrontstage.stageId,
      createWidgetApiFrontstage.stageId,
      createSynchronizedViewportFrontstage.stageId,
      createPopoutWindowsFrontstage.stageId,
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
    new InspectUiItemInfoToolProvider(AppUiTestProviders.localizationNamespace)
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
    new CustomContentStageUiProvider(AppUiTestProviders.localizationNamespace),
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
  UiItemsManager.register(createSynchronizedViewportProvider(), {
    stageIds: [createSynchronizedViewportFrontstage.stageId],
  });
  UiItemsManager.register(createPopoutWindowsProvider(), {
    stageIds: [createPopoutWindowsFrontstage.stageId],
  });

  if (ProcessDetector.isElectronAppFrontend) {
    UiFramework.frontstages.addFrontstage(createEditorFrontstage());
    UiItemsManager.register(createEditorFrontstageProvider(), {
      stageIds: [createEditorFrontstage.stageId],
    });
  }
}
