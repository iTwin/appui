/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
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
import { IModelConnection, ViewState } from "@itwin/core-frontend";
import React from "react";
import {
  createMainFrontstage,
  createMainFrontstageLauncher,
} from "./appui/frontstages/MainFrontstage";
import {
  createElementStackingFrontstage,
  createElementStackingProvider,
} from "./appui/frontstages/ElementStacking";
import {
  ComponentExamplesModalFrontstage,
  FloatingWidgetsUiItemsProvider,
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

interface AppProps {
  iModelConnection?: IModelConnection;
  viewState?: ViewState;
}

export function App({ iModelConnection, viewState }: AppProps) {
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
    <ThemeManager>
      <ConfigurableUiContent appBackstage={<BackstageComposer />} />
    </ThemeManager>
  );
}
