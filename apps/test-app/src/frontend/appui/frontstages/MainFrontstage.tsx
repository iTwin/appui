/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageAppButton,
  BackstageItemUtilities,
  ConditionalBooleanValue,
  FrontstageUtilities,
  RestoreFrontstageLayoutTool,
  SettingsModalFrontstage,
  StageUsage,
  StandardContentLayouts,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
} from "@itwin/appui-react";
import {
  AppUiTestProviders,
  ComponentExamplesModalFrontstage,
  getCustomViewSelectorPopupItem,
  store,
  ViewportContent,
} from "@itwin/appui-test-providers";
import { Svg3D, SvgImodel } from "@itwin/itwinui-icons-react";
import { IModelApp } from "@itwin/core-frontend";

interface CreateMainFrontstageArgs {
  contentProps: React.ComponentProps<typeof ViewportContent>;
}

export function createMainFrontstage(args?: CreateMainFrontstageArgs) {
  return FrontstageUtilities.createStandardFrontstage({
    id: createMainFrontstage.stageId,
    contentGroupProps: {
      id: "content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "viewport",
          classId: "",
          content: <ViewportContent {...args?.contentProps} />,
        },
      ],
    },
    cornerButton: <BackstageAppButton />,
    usage: StageUsage.General,
  });
}
createMainFrontstage.stageId = "main";

export function createMainFrontstageProvider() {
  return {
    id: "appui-test-app:backstageItemsProvider",
    getToolbarItems: () => [
      getCustomViewSelectorPopupItem(),
      ToolbarItemUtilities.createForTool(RestoreFrontstageLayoutTool, {
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Horizontal,
            usage: ToolbarUsage.ContentManipulation,
          },
        },
      }),
      createToggle3dManipulationsToolbarItem(),
    ],
    getBackstageItems: () => [
      BackstageItemUtilities.createStageLauncher({
        stageId: createMainFrontstage.stageId,
        groupPriority: 100,
        itemPriority: 10,
        label: "View iModel",
        subtitle: "Review iModel",
        icon: <SvgImodel />,
      }),
      SettingsModalFrontstage.getBackstageActionItem(400, 10),
      ComponentExamplesModalFrontstage.getBackstageActionItem(400, 20),
    ],
  } satisfies UiItemsProvider;
}

function createToggle3dManipulationsToolbarItem() {
  return ToolbarItemUtilities.createActionItem({
    id: "toggle-3d-manipulations",
    icon: <Svg3D />,
    label: "Toggle 3d manipulations",
    execute: () => {
      const viewport = IModelApp.viewManager.selectedView;
      if (!viewport) return;
      if (!viewport.view.is3d()) return;

      const allow3dManipulations = !viewport.view.allow3dManipulations();
      viewport.view.setAllow3dManipulations(allow3dManipulations);
      store.setAllow3dManipulations(allow3dManipulations);
      IModelApp.toolAdmin.dispatchUiSyncEvent(
        AppUiTestProviders.syncUiEventId.toggle3dManipulations
      );
    },
    isActiveCondition: new ConditionalBooleanValue(() => {
      return store.state.allow3dManipulations;
    }, [AppUiTestProviders.syncUiEventId.toggle3dManipulations]),
    itemPriority: 2,
    groupPriority: 3000,
    layouts: {
      standard: {
        orientation: ToolbarOrientation.Horizontal,
        usage: ToolbarUsage.ContentManipulation,
      },
    },
  });
}
