/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@itwin/itwinui-layouts-react";
import {
  BackstageComposer,
  ConfigurableUiContent,
  SettingsModalFrontstage,
  StandardContentToolsUiItemsProvider,
  StandardNavigationToolsUiItemsProvider,
  StandardStatusbarUiItemsProvider,
  ThemeManager,
  UiFramework,
  UiItemsManager,
} from "@itwin/appui-react";
import {
  createMainFrontstage,
  createMainFrontstageLauncher,
} from "../frontend/appui/frontstages/MainFrontstage";
import { appConfig } from "../frontend/appConfig";
import { SnapshotConnection } from "@itwin/core-frontend";
import { createViewState } from "../frontend/createViewState";
import { appInitializer } from "../frontend/AppInitializer";
import {
  ComponentExamplesModalFrontstage,
  FloatingWidgetsUiItemsProvider,
} from "@itwin/appui-test-providers";
import {
  createElementStackingFrontstage,
  createElementStackingProvider,
} from "../frontend/appui/frontstages/ElementStacking";
import { createTestPopoutFrontstage } from "../frontend/appui/frontstages/TestPopoutFrontstage";
import { createTestPanelFrontstage } from "../frontend/appui/frontstages/TestPanelFrontstage";
import { ProcessDetector } from "@itwin/core-bentley";
import { EditTools } from "@itwin/editor-frontend";
import {
  createEditorFrontstage,
  createEditorFrontstageProvider,
} from "../frontend/appui/frontstages/EditorFrontstage";
import { useEngagementTime } from "../frontend/appui/useEngagementTime";
import {
  createWidgetApiFrontstage,
  createWidgetApiStageProvider,
} from "../frontend/appui/frontstages/WidgetApiFrontstage";

export const Route = createFileRoute("/local/$fileName")({
  component: Local,
  loader: async (ctx) => {
    await appInitializer.initialize();

    const filePath = `${appConfig.snapshotPath}/${ctx.params.fileName}`;
    const iModelConnection = await SnapshotConnection.openFile(filePath);
    const viewState = await createViewState(iModelConnection);

    if (ProcessDetector.isElectronAppFrontend) {
      await EditTools.initialize();
    }
    return {
      iModelConnection,
      viewState,
    };
  },
});

function Local() {
  const { iModelConnection, viewState } = Route.useLoaderData();
  React.useEffect(() => {
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
    ];
    frontstages.forEach((frontstage) => {
      UiFramework.frontstages.addFrontstage(frontstage);
    });

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
    UiItemsManager.register(new StandardStatusbarUiItemsProvider(), {
      stageIds: [
        createMainFrontstage.stageId,
        createWidgetApiFrontstage.stageId,
      ],
    });
    UiItemsManager.register({
      id: "appui-test-app:backstageItemsProvider",
      getBackstageItems: () => [
        createMainFrontstageLauncher(),
        SettingsModalFrontstage.getBackstageActionItem(400, 10),
        ComponentExamplesModalFrontstage.getBackstageActionItem(400, 20),
      ],
    });
    UiItemsManager.register(createElementStackingProvider(), {
      stageIds: [createElementStackingFrontstage.stageId],
    });
    UiItemsManager.register(new FloatingWidgetsUiItemsProvider(), {
      stageIds: [createWidgetApiFrontstage.stageId],
    });
    UiItemsManager.register(createWidgetApiStageProvider(), {
      stageIds: [createWidgetApiFrontstage.stageId],
    });

    if (ProcessDetector.isElectronAppFrontend) {
      UiFramework.frontstages.addFrontstage(createEditorFrontstage());
      UiItemsManager.register(createEditorFrontstageProvider(), {
        stageIds: [createEditorFrontstage.stageId],
      });
    }

    void UiFramework.frontstages.setActiveFrontstage(
      createMainFrontstage.stageId
    );
    return () => {
      UiFramework.frontstages.clearFrontstageDefs();
    };
  }, [iModelConnection, viewState]);
  useEngagementTime();
  return (
    <PageLayout.Content>
      <ThemeManager>
        <ConfigurableUiContent appBackstage={<BackstageComposer />} />
      </ThemeManager>
    </PageLayout.Content>
  );
}
