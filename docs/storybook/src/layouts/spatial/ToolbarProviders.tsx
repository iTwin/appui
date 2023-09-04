/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiFramework,
  WidgetState,
  UiItemsProvider,
} from "@itwin/appui-react";
import {
  SvgConfiguration,
  SvgDocument,
  SvgGlobe,
  SvgHome,
  SvgImodel,
  SvgLayers,
  SvgLocation,
  SvgNotification,
  SvgSettings,
  SvgTableOfContents,
} from "@itwin/itwinui-icons-react";
import {
  Avatar,
  DropdownButton,
  MenuItem,
  getUserColor,
} from "@itwin/itwinui-react";

export const contentManipulationProvider: UiItemsProvider = {
  id: "content-manipulation-provider",
  provideToolbarItems: (_stageid, _stageUsage, usage, orientation) => {
    if (usage !== ToolbarUsage.ContentManipulation) return [];
    if (orientation !== ToolbarOrientation.Vertical) return [];
    return [
      ToolbarItemUtilities.createActionItem(
        "viewpoints",
        0,
        <SvgLocation />,
        "Viewpoints",
        () => undefined,
        {
          groupPriority: 0,
        }
      ),
      ToolbarItemUtilities.createActionItem(
        "layers",
        0,
        <SvgLayers />,
        "Layers",
        () => undefined,
        {
          groupPriority: 1,
        }
      ),
      ToolbarItemUtilities.createActionItem(
        "home",
        0,
        <SvgHome />,
        "Home",
        () => {
          const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
          const widgetDef = frontstageDef?.findWidgetDef("home");
          widgetDef?.setWidgetState(WidgetState.Open);
        },
        {
          groupPriority: 2,
        }
      ),
      ToolbarItemUtilities.createActionItem(
        "Assets",
        0,
        <SvgTableOfContents />,
        "Assets",
        () => {
          const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
          const widgetDef = frontstageDef?.findWidgetDef("assets");
          widgetDef?.setWidgetState(WidgetState.Open);
        },
        {
          groupPriority: 2,
        }
      ),
      ToolbarItemUtilities.createActionItem(
        "documents",
        0,
        <SvgDocument />,
        "Documents",
        () => {
          const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
          const widgetDef = frontstageDef?.findWidgetDef("documents");
          widgetDef?.setWidgetState(WidgetState.Open);
        },
        {
          groupPriority: 2,
        }
      ),
    ];
  },
};

export const contextNavigationProvider: UiItemsProvider = {
  id: "context-navigation-provider",
  provideToolbarItems: (_stageid, _stageUsage, usage, orientation) => {
    if (usage !== ToolbarUsage.ViewNavigation) return [];
    if (orientation !== ToolbarOrientation.Horizontal) return [];
    return [
      ToolbarItemUtilities.createActionItem(
        "logo",
        0,
        <SvgImodel />,
        "",
        () => undefined
      ),
      ToolbarItemUtilities.createActionItem(
        "title",
        0,
        <>Spatial Layout</>, // TODO: allow custom node in a ToolbarCustomItem
        "",
        () => undefined
      ),
      ToolbarItemUtilities.createActionItem(
        "context-select",
        0,
        <ContextSelect />, // TODO: allow custom node in a ToolbarCustomItem
        "",
        () => undefined
      ),
      ToolbarItemUtilities.createActionItem(
        "configure",
        0,
        <SvgSettings />,
        "Configure",
        () => {
          const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
          const widgetDef = frontstageDef?.findWidgetDef("configure");
          widgetDef?.setWidgetState(WidgetState.Open);
        }
      ),
    ];
  },
};

export const viewNavigationProvider: UiItemsProvider = {
  id: "view-navigation-provider",
  provideToolbarItems: (_stageid, _stageUsage, usage, orientation) => {
    if (usage !== ToolbarUsage.ViewNavigation) return [];
    if (orientation !== ToolbarOrientation.Vertical) return []; // TODO: add `toolbarId` as `preferredLocation` as part of UiItemsProvider refactor?
    return [
      ToolbarItemUtilities.createActionItem(
        "settings",
        0,
        <SvgConfiguration />,
        "Settings",
        () => undefined,
        {
          groupPriority: 1,
        }
      ),
      ToolbarItemUtilities.createActionItem(
        "compass",
        0,
        <SvgGlobe />,
        "Compass",
        () => undefined,
        {
          groupPriority: 1,
        }
      ),
      ToolbarItemUtilities.createActionItem(
        "notifications",
        0,
        <SvgNotification />,
        "Notifications",
        () => undefined,
        {
          groupPriority: 2,
        }
      ),
      ToolbarItemUtilities.createActionItem(
        "user",
        0,
        <Avatar
          abbreviation="NS"
          backgroundColor={getUserColor("Name Surname")}
          size="small"
          title="Name Surname"
        />,
        "User Account",
        () => undefined,
        {
          groupPriority: 2,
        }
      ),
    ];
  },
};

function ContextSelect() {
  const [views] = React.useState([
    "Selected view #1",
    "Selected view #2",
    "Selected view #3",
  ]);
  const [selectedView, setSelectedView] = React.useState(views[0]);
  return (
    <DropdownButton // TODO: `Select` is not styled correctly in the `ButtonGroup`
      menuItems={(close) =>
        views.map((view) => (
          <MenuItem
            key={view}
            onClick={() => {
              setSelectedView(view);
              close();
            }}
          >
            {view}
          </MenuItem>
        ))
      }
    >
      {selectedView}
    </DropdownButton>
  );
}
