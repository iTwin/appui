/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageItemUtilities,
  StagePanelLocation,
  StagePanelSection,
  StatusBarItemUtilities,
  StatusBarSection,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
  WidgetState,
} from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";
import { SvgRename, SvgWindowSettings } from "@itwin/itwinui-icons-react";
import {
  createSplitSingleViewportToolbarItem,
  RestoreSavedContentLayoutTool,
  SaveContentLayoutTool,
} from "../../tools/ContentLayoutTools";
import { AppUiTestProviders } from "../../AppUiTestProviders";
import { getCustomViewSelectorPopupItem } from "../buttons/ViewSelectorPanel";
import { ContentLayoutStage } from "../frontstages/ContentLayout";
import { DisplayStyleField } from "../statusfields/DisplayStyleField";
import { ViewportWidgetComponent } from "../widgets/ViewportWidget";

/** Provides additional items specific to the content layout frontstage. */
export function createContentLayoutUiItemsProvider(
  localizationNamespace: string
) {
  RestoreSavedContentLayoutTool.register(localizationNamespace);
  SaveContentLayoutTool.register(localizationNamespace);

  const id = "appui-test-providers:content-layout-stage-items-provider";
  return {
    id,
    getToolbarItems: () => {
      const horizontal = {
        standard: {
          usage: ToolbarUsage.ContentManipulation,
          orientation: ToolbarOrientation.Horizontal,
        },
      };
      const vertical = {
        standard: {
          usage: ToolbarUsage.ViewNavigation,
          orientation: ToolbarOrientation.Vertical,
        },
      };
      return [
        {
          ...createSplitSingleViewportToolbarItem(),
          itemPriority: 15,
          groupPriority: 3000,
          layouts: horizontal,
        },
        ToolbarItemUtilities.createGroupItem(
          "ui-admin",
          3000,
          <SvgWindowSettings />,
          "UI Admin",
          [
            ToolbarItemUtilities.createActionItem(
              "show-input-editor",
              0,
              <SvgRename />,
              "Show Input Editor",
              () => {
                IModelApp.uiAdmin.showInputEditor(
                  30,
                  { name: "x", displayLabel: "Set X", typename: "number" },
                  {
                    x: 200,
                    y: 150,
                  },
                  (args) => {
                    console.log("Input editor commit", args);
                  },
                  () => {
                    console.log("Input editor cancel");
                  }
                );
              }
            ),
            ToolbarItemUtilities.createActionItem(
              "hide-input-editor",
              0,
              <SvgRename />,
              "Hide Input Editor",
              () => {
                IModelApp.uiAdmin.hideInputEditor();
              }
            ),
          ],
          {
            layouts: horizontal,
          }
        ),
        ToolbarItemUtilities.createForTool(SaveContentLayoutTool, {
          itemPriority: 10,
          groupPriority: 3000,
          layouts: vertical,
        }),
        ToolbarItemUtilities.createForTool(RestoreSavedContentLayoutTool, {
          itemPriority: 15,
          groupPriority: 3000,
          layouts: vertical,
        }),
        {
          ...getCustomViewSelectorPopupItem(20, 3000),
          layouts: vertical,
        },
      ];
    },
    getWidgets: () => [
      {
        id: "appui-test-providers:viewport-widget",
        label: "Viewport",
        icon: "icon-bentley-systems",
        defaultState: WidgetState.Floating,
        canFloat: {
          containerId: "appui-test-providers:viewport-widget",
        },
        canPopout: true,
        content: <ViewportWidgetComponent />,
        layouts: {
          standard: {
            location: StagePanelLocation.Bottom,
            section: StagePanelSection.Start,
          },
        },
      },
    ],
    getStatusBarItems: () => [
      StatusBarItemUtilities.createCustomItem(
        "DisplayStyle",
        StatusBarSection.Center,
        400,
        <DisplayStyleField />
      ),
    ],
    getBackstageItems: () => [
      BackstageItemUtilities.createStageLauncher(
        ContentLayoutStage.stageId,
        300,
        2,
        AppUiTestProviders.translate("backstage.contentLayoutFrontstageLabel"),
        undefined,
        undefined
      ),
    ],
  } satisfies UiItemsProvider;
}
