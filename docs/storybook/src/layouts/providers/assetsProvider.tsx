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
  useLayout,
} from "@itwin/appui-react";
import { SvgTableOfContents } from "@itwin/itwinui-icons-react";
import { List, ListItem } from "@itwin/itwinui-react";

function createToolbarItem() {
  return ToolbarItemUtilities.createActionItem(
    "assets",
    0,
    <SvgTableOfContents />,
    "Assets",
    () => {
      console.log("assets clicked");
      const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
      const widgetDef = frontstageDef?.findWidgetDef("assets");
      if (!widgetDef) return;
      if (widgetDef.state === WidgetState.Open) {
        widgetDef.setWidgetState(WidgetState.Hidden);
        return;
      }
      widgetDef.setWidgetState(WidgetState.Open);
    }
  );
}
export const assetsProvider: UiItemsProvider = {
  id: "assets-provider",
  getToolbarItems: () => {
    return [createToolbarItem()];
  },
  getToolbarItemLocations: () => {
    return [
      {
        id: "assets",
        toolbarId: "contentManipulation-horizontal",
      },
    ];
  },
  provideWidgets: () => {
    return [
      {
        id: "assets",
        content: <Assets />,
        label: "Assets",
        icon: <SvgTableOfContents />,
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

function Assets() {
  return (
    <List>
      <Asset id="1" />
      <Asset id="2" />
      <Asset id="3" />
    </List>
  );
}

function Asset(props: { id: string }) {
  const { id } = useLayout();
  return (
    <ListItem
      style={
        id === "spatial"
          ? {
              display: "flex",
              justifyContent: "space-between",
              padding: "20px",
            }
          : undefined
      }
    >
      <span>Asset</span>
      <span>{props.id}</span>
    </ListItem>
  );
}
