/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiFramework,
  UiItemsProvider,
  WidgetState,
} from "@itwin/appui-react";
import { SvgLocation } from "@itwin/itwinui-icons-react";
import { WidgetLayout } from "./WidgetLayout";
import { ExpandableBlock } from "@itwin/itwinui-react";

function createViewpointsToolbarItem() {
  return ToolbarItemUtilities.createActionItem(
    "viewpoints",
    0,
    <SvgLocation />,
    "Viewpoints",
    () => {
      console.log("viewpoints clicked");
      const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
      const widgetDef = frontstageDef?.findWidgetDef("viewpoints");
      widgetDef?.setWidgetState(WidgetState.Open);
    }
  );
}
export const viewpointsProvider: UiItemsProvider = {
  id: "viewpoints-provider",
  getToolbarItems: () => {
    return [createViewpointsToolbarItem()];
  },
  getToolbarItemLocations: () => {
    return [
      {
        id: "viewpoints",
        toolbarId: "contentManipulation-horizontal",
      },
    ];
  },
  provideWidgets: () => {
    return [
      {
        id: "viewpoints",
        content: <Viewpoints />,
        label: "Viewpoints",
        icon: <SvgLocation />,
      },
    ];
  },
  // TODO: this is temporary for current toolbars (simulates getToolbarItemLocations).
  provideToolbarItems: (_stageId, _stageUsage, usage, orientation) => {
    if (usage !== ToolbarUsage.ContentManipulation) return [];
    if (orientation !== ToolbarOrientation.Horizontal) return [];
    return [createViewpointsToolbarItem()];
  },
};

export function Viewpoints() {
  return (
    <WidgetLayout>
      <WidgetLayout.Tools />
      <WidgetLayout.Tabs />
      <ExpandableBlock title="Viewpoint 1">Viewpoint 1 content</ExpandableBlock>
      <ExpandableBlock title="Viewpoint 2">Viewpoint 2 content</ExpandableBlock>
    </WidgetLayout>
  );
}
