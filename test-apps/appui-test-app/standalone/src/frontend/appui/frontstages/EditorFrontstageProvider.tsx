/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageItemUtilities,
  StageUsage,
  StandardFrontstageProvider,
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
import { SvgEdit } from "@itwin/itwinui-icons-react";
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

export const editorFrontstageProvider = new StandardFrontstageProvider({
  id: "standalone:editor-frontstage",
  contentGroupProps: new InitialIModelContentStageProvider(),
  usage: StageUsage.General,
});

const toolbarItemOverrides = {
  layouts: {
    standard: {
      orientation: ToolbarOrientation.Horizontal,
      usage: ToolbarUsage.ContentManipulation,
    },
  },
};

export const editorUiItemsProvider: UiItemsProvider = {
  id: "standalone:editor-items",
  getBackstageItems: () => [
    BackstageItemUtilities.createStageLauncher(
      "standalone:editor-frontstage",
      400,
      0,
      "Editor",
      undefined,
      <SvgEdit />
    ),
  ],
  getToolbarItems: () => [
    createToolbarItem(CreateLineStringTool, toolbarItemOverrides),
    createToolbarItem(CreateArcTool, toolbarItemOverrides),
  ],
};
