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
  ToolbarActionItem,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
} from "@itwin/appui-react";
import {
  CreateArcTool,
  CreateLineStringTool,
  EditTools,
} from "@itwin/editor-frontend";
import { SvgDraw, SvgEdit } from "@itwin/itwinui-icons-react";
import { InitialIModelContentStageProvider } from "./MainFrontstage";
import { IModelApp, ToolType } from "@itwin/core-frontend";

function createToolbarItem( // TODO: add to imodel-components-react?
  tool: ToolType,
  overrides?: Partial<ToolbarActionItem>
) {
  return ToolbarItemUtilities.createActionItem(
    tool.toolId,
    10,
    tool.iconSpec,
    tool.flyover,
    async () => {
      await IModelApp.tools.run(tool.toolId);
    },
    overrides
  );
}

export async function initializeEditor() {
  await EditTools.initialize();
}

export const editorFrontstage = FrontstageUtilities.createStandardFrontstage({
  id: "standalone:editor-frontstage",
  contentGroupProps: new InitialIModelContentStageProvider(),
  usage: StageUsage.General,
  cornerButton: <BackstageAppButton />,
});

export const editorUiItemsProvider = createUiItemsProvider();

function createUiItemsProvider(): UiItemsProvider {
  const id = "standalone:editor-items";
  return {
    id,
    getBackstageItems: () => [
      BackstageItemUtilities.createStageLauncher(
        editorFrontstage.id,
        400,
        0,
        "Editor",
        undefined,
        <SvgEdit />
      ),
    ],
    getToolbarItems: () => {
      const overrides = {
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Horizontal,
            usage: ToolbarUsage.ContentManipulation,
          },
        },
      };
      return [
        createToolbarItem(CreateLineStringTool, overrides),
        createToolbarItem(CreateArcTool, overrides),
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
