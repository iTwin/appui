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
import { SvgLayers } from "@itwin/itwinui-icons-react";
import { Input, InputGroup, List, ListItem } from "@itwin/itwinui-react";

function createToolbarItem() {
  return ToolbarItemUtilities.createActionItem(
    "layers",
    0,
    <SvgLayers />,
    "Layers",
    () => {
      console.log("layers clicked");
      const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
      const widgetDefs = [
        frontstageDef?.findWidgetDef("layers:list"),
        frontstageDef?.findWidgetDef("layers:manage"),
      ];
      for (const widgetDef of widgetDefs) {
        if (!widgetDef) continue;
        if (widgetDef.state === WidgetState.Open) {
          widgetDef.setWidgetState(WidgetState.Hidden);
          continue;
        }
        widgetDef.setWidgetState(WidgetState.Open);
      }
    }
  );
}
export const layersProvider: UiItemsProvider = {
  id: "layers-provider",
  getToolbarItems: () => {
    return [createToolbarItem()];
  },
  getToolbarItemLocations: () => {
    return [
      {
        id: "layers",
        toolbarId: "contentManipulation-horizontal",
      },
    ];
  },
  provideWidgets: () => {
    return [
      {
        id: "layers:list",
        content: <LayerList />,
        label: "View Layers",
        icon: <SvgLayers />,
        defaultState: WidgetState.Hidden,
      },
      {
        id: "layers:manage",
        content: <ManageLayers />,
        label: "Manage Layers",
        icon: <SvgLayers />,
        defaultState: WidgetState.Hidden,
      },
    ];
  },
  // TODO: this is temporary for current toolbars (simulates getToolbarItemLocations).
  provideToolbarItems: (_stageId, _stageUsage, usage, orientation) => {
    if (usage !== ToolbarUsage.ContentManipulation) return [];
    if (orientation !== ToolbarOrientation.Horizontal) return [];
    return [createToolbarItem()];
  },
};

export function LayerList() {
  return (
    <List>
      <ListItem>Layer 1</ListItem>
      <ListItem>Layer 2</ListItem>
      <ListItem>Layer 3</ListItem>
    </List>
  );
}

export function ManageLayers() {
  return (
    <InputGroup label="New Layer" style={{ padding: "12px" }}>
      <Input placeholder="Id" />
      <Input placeholder="Name" />
    </InputGroup>
  );
}
