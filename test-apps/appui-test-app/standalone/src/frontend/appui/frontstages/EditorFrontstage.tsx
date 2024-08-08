/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  AccuDrawWidget,
  BackstageAppButton,
  BackstageItemUtilities,
  FrontstageUtilities,
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
} from "@itwin/appui-react";
import { CreateArcTool, CreateLineStringTool } from "@itwin/editor-frontend";
import { SvgDraw, SvgEdit } from "@itwin/itwinui-icons-react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import { ViewportContent } from "@itwin/appui-test-providers";

export function createEditorFrontstage() {
  return FrontstageUtilities.createStandardFrontstage({
    id: createEditorFrontstage.stageId,
    contentGroupProps: {
      id: "content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "viewport",
          classId: "",
          content: <ViewportContent />,
        },
      ],
    },
    usage: StageUsage.General,
    cornerButton: <BackstageAppButton />,
  });
}
createEditorFrontstage.stageId = "appui-test-app:editor-frontstage";

export function createEditorFrontstageProvider(): UiItemsProvider {
  const id = "appui-test-app:editor-items";
  return {
    id,
    getBackstageItems: () => [
      BackstageItemUtilities.createStageLauncher({
        stageId: createEditorFrontstage.stageId,
        groupPriority: 400,
        label: "Editor",
        icon: <SvgEdit />,
      }),
    ],
    getToolbarItems: () => {
      const layouts = {
        standard: {
          orientation: ToolbarOrientation.Horizontal,
          usage: ToolbarUsage.ContentManipulation,
        },
      };
      return [
        ToolbarItemUtilities.createForTool(CreateLineStringTool, {
          itemPriority: 10,
          layouts,
        }),
        ToolbarItemUtilities.createForTool(CreateArcTool, {
          itemPriority: 10,
          layouts,
        }),
      ];
    },
    getWidgets: () => {
      const layouts = {
        standard: {
          location: StagePanelLocation.Right,
          section: StagePanelSection.Start,
        },
      };
      return [
        {
          id: `${id}:accudraw-widget`,
          label: "AccuDraw",
          icon: <SvgDraw />,
          content: <AccuDrawWidget />,
          layouts,
        },
      ];
    },
  };
}
