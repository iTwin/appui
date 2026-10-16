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
  StandardContentLayouts,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
} from "@itwin/appui-react";
import { SvgDraw, SvgEdit } from "@itwin/itwinui-icons-react";
import {
  getCustomViewSelectorPopupItem,
  StrataKitIcon,
  ViewportContent,
} from "@itwin/appui-test-providers";
import { CreateCircleTool } from "../../tools/CreateCircleTool";

import svgDraw from "@stratakit/icons/draw.svg";
import svgEdit from "@stratakit/icons/edit.svg";

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
createEditorFrontstage.stageId = "editor";

export function createEditorFrontstageProvider(): UiItemsProvider {
  const id = "appui-test-app:editor-items";
  return {
    id,
    getBackstageItems: () => [
      BackstageItemUtilities.createStageLauncher({
        stageId: createEditorFrontstage.stageId,
        groupPriority: 400,
        label: "Editor",
        icon: <StrataKitIcon href={svgEdit} iconNode={<SvgEdit />} />,
      }),
    ],
    getToolbarItems: () => [
      ToolbarItemUtilities.createForTool(CreateCircleTool, {
        label: "Create Circle",
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Horizontal,
            usage: ToolbarUsage.ContentManipulation,
          },
        },
      }),
      getCustomViewSelectorPopupItem(),
    ],
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
          icon: <StrataKitIcon href={svgDraw} iconNode={<SvgDraw />} />,
          content: <AccuDrawWidget />,
          layouts,
        },
      ];
    },
  };
}
