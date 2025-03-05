/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageItemUtilities,
  Frontstage,
  FrontstageUtilities,
  StageUsage,
  StandardContentLayouts,
  ToolbarItemUtilities,
  UiItemsProvider,
} from "@itwin/appui-react";
import { SvgAdd, SvgEdit, SvgMapInfo } from "@itwin/itwinui-icons-react";
import { ViewportContent } from "@itwin/appui-test-providers";
import { SpatialAppProviders } from "../spatial/Providers";
import { createSpatialToolbarItemLayouts } from "../spatial/SpatialToolbarItem";
import {
  LayersToolbarButton,
  ViewpointToolbarButton,
} from "../spatial/ToolbarButtons";
import { SpatialHeader, SpatialLayout } from "../spatial/Layout";

export function createSpatialFrontstage(): Frontstage {
  const frontstage = FrontstageUtilities.createStandardFrontstage({
    id: createSpatialFrontstage.stageId,
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
  });
  return {
    ...frontstage,
    layout: (
      <SpatialAppProviders>
        <SpatialLayout contextNavigation={<SpatialHeader />} />
      </SpatialAppProviders>
    ),
  };
}
createSpatialFrontstage.stageId = "spatial-frontstage";

export function createSpatialFrontstageProvider(): UiItemsProvider {
  return {
    id: "appui-test-app:spatial-items",
    getBackstageItems: () => [
      BackstageItemUtilities.createStageLauncher({
        stageId: createSpatialFrontstage.stageId,
        groupPriority: 200,
        itemPriority: 10,
        label: "Spatial",
        icon: <SvgMapInfo />,
      }),
    ],
    getToolbarItems: () => [
      ToolbarItemUtilities.createCustomItem({
        id: "viewpoints",
        groupPriority: 100,
        layouts: createSpatialToolbarItemLayouts({
          location: "content-manipulation",
          // TODO: alternatively set `panelContent` of a custom item, since this simply opens a custom panel.
          content: <ViewpointToolbarButton />,
        }),
      }),
      ToolbarItemUtilities.createCustomItem({
        id: "layers",
        groupPriority: 200,
        layouts: createSpatialToolbarItemLayouts({
          location: "content-manipulation",
          content: <LayersToolbarButton />,
        }),
      }),
      ToolbarItemUtilities.createActionItem({
        id: "add-tool",
        icon: <SvgAdd />,
        label: "Add",
        groupPriority: 200,
        layouts: createSpatialToolbarItemLayouts({
          widgetId: "add-widget",
          location: "content-manipulation",
        }),
      }),
      ToolbarItemUtilities.createActionItem({
        id: "edit-tool",
        icon: <SvgEdit />,
        label: "Edit",
        groupPriority: 200,
        layouts: createSpatialToolbarItemLayouts({
          widgetId: "edit-widget",
          location: "content-manipulation",
        }),
      }),
    ],
    getWidgets: () => [
      {
        id: "add-widget",
        content: <div>Widget `add` content</div>,
        label: "Add",
      },
      {
        id: "edit-widget",
        content: <div>Widget `edit` content</div>,
        label: "Edit",
      },
    ],
  };
}
