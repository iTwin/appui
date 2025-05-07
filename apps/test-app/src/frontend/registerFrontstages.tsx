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
import {
  createEditorFrontstage,
  createEditorFrontstageProvider,
} from "./appui/frontstages/EditorFrontstage";
import { createTestPanelFrontstage } from "./appui/frontstages/TestPanelFrontstage";
import { createTestPopoutFrontstage } from "./appui/frontstages/TestPopoutFrontstage";
import {
  createWidgetApiFrontstage,
  createWidgetApiFrontstageProvider,
} from "./appui/frontstages/WidgetApiFrontstage";
import { createLanguageProvider } from "./Localization";
import { createStatusBarUiItemsProvider } from "./appui/providers/StatusbarUiItemsProvider";
import { IModelConnection, IpcApp, ViewState } from "@itwin/core-frontend";
import {
  createITwinUIV2Frontstage,
  createITwinUIV2FrontstageProvider,
} from "./appui/frontstages/iTwinUIV2Frontstage";
import { createTestWidgetFrontstage } from "./appui/frontstages/TestWidgetFrontstage";
import {
  createSpatialFrontstage,
  createSpatialFrontstageProvider,
} from "./appui/frontstages/SpatialFrontstage";
import { createTestToolSettingsFrontstage } from "./appui/frontstages/TestToolSettingsFrontstage";

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
  const frontstages = [
    createMainFrontstage({
      contentProps: {
        imodel: iModelConnection,
        viewState,
      },
    }),
    createElementStackingFrontstage(),
    createTestPanelFrontstage(),
    createTestWidgetFrontstage(),
    createTestPopoutFrontstage(),
    createTestToolSettingsFrontstage(),
    createWidgetApiFrontstage(),
    createCustomContentFrontstage(),
    createContentLayoutFrontstage(),
    createSynchronizedViewportFrontstage(),
    createPopoutWindowsFrontstage(),
    createITwinUIV2Frontstage(),
    createSpatialFrontstage(),
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
  UiItemsManager.register(createMainFrontstageProvider(), {
    stageIds: [createMainFrontstage.stageId],
  });
  UiItemsManager.register(new FloatingWidgetsUiItemsProvider(), {
    stageIds: [createWidgetApiFrontstage.stageId],
  });
  UiItemsManager.register(createWidgetApiFrontstageProvider(), {
    stageIds: [createWidgetApiFrontstage.stageId],
  });
  UiItemsManager.register(new AbstractUiItemsProvider(), {
    stageIds: [createMainFrontstage.stageId, createWidgetApiFrontstage.stageId],
  });
  UiItemsManager.register(new MessageUiItemsProvider(), {
    stageIds: [createMainFrontstage.stageId, createWidgetApiFrontstage.stageId],
  });
  UiItemsManager.register(new InspectUiItemInfoToolProvider(), {
    stageIds: [createWidgetApiFrontstage.stageId],
  });
  UiItemsManager.register(createPreviewFeaturesProvider(), {
    stageUsages: [StageUsage.General],
  });
  UiItemsManager.register(createLanguageProvider(), {
    stageUsages: [StageUsage.General],
  });
  UiItemsManager.register(createElementStackingProvider(), {
    stageUsages: ["development"],
  });
  UiItemsManager.register(new CustomContentStageUiProvider(), {
    stageIds: [createCustomContentFrontstage.stageId],
  });
  UiItemsManager.register(new ContentLayoutStageUiItemsProvider(), {
    stageIds: [createContentLayoutFrontstage.stageId],
  });
  UiItemsManager.register(createSynchronizedViewportProvider(), {
    stageIds: [createSynchronizedViewportFrontstage.stageId],
  });
  UiItemsManager.register(createPopoutWindowsProvider(), {
    stageIds: [createPopoutWindowsFrontstage.stageId],
  });
  UiItemsManager.register(createITwinUIV2FrontstageProvider(), {
    stageIds: [createITwinUIV2Frontstage.stageId],
  });
  UiItemsManager.register(createSpatialFrontstageProvider(), {
    stageIds: [createSpatialFrontstage.stageId],
  });

  if (IpcApp.isValid) {
    UiFramework.frontstages.addFrontstage(createEditorFrontstage());
    UiItemsManager.register(createEditorFrontstageProvider(), {
      stageIds: [createEditorFrontstage.stageId],
    });
  }

  const ids = frontstages.map((frontstage) => frontstage.id);
  return ids;
}
