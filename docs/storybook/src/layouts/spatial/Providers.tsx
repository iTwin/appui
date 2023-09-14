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
  UiItemsProvider,
  WidgetState,
  isToolbarActionItem,
} from "@itwin/appui-react";
import {
  Avatar,
  DropdownButton,
  MenuItem,
  Stepper,
  getUserColor,
} from "@itwin/itwinui-react";
import {
  SvgHome,
  SvgTableOfContents,
  SvgDocument,
  SvgImodel,
  SvgSettings,
  SvgConfiguration,
  SvgGlobe,
  SvgNotification,
  SvgPlaceholder,
} from "@itwin/itwinui-icons-react";
import { UiItemsProviderUtilities } from "../UiItemsProviderUtilities";
import { layersProvider } from "../providers/layersProvider";
import { viewpointsProvider } from "../providers/viewpointsProvider";

export namespace SpatialProviders {
  /** Updates toolbar item location. Renders widget in a spatial panel as is. */
  export function viewpoints() {
    return UiItemsProviderUtilities.updateToolbarItemLocations(
      viewpointsProvider,
      (item) => [
        // For each item return 0..N locations.
        {
          id: item.id,
          toolbarId: "content-manipulation",
        },
      ]
    );
  }

  /** Updates toolbar item location. Renders content of all layer widgets in a spatial panel. */
  export function layers() {
    let provider = layersProvider;
    provider = UiItemsProviderUtilities.overrideToolbarItems(
      provider,
      (item) => {
        if (isToolbarActionItem(item)) {
          return [
            {
              ...item,
              execute: () => {
                console.log("layers clicked");
                const frontstageDef =
                  UiFramework.frontstages.activeFrontstageDef;
                const widgetDef =
                  frontstageDef?.findWidgetDef("spatial:layers");
                if (!widgetDef) return;
                if (widgetDef.state === WidgetState.Open) {
                  widgetDef.setWidgetState(WidgetState.Hidden);
                  return;
                }
                widgetDef.setWidgetState(WidgetState.Open);
              },
            },
          ];
        }
        return [];
      }
    );
    provider = UiItemsProviderUtilities.updateToolbarItemLocations(
      provider,
      (item) => [
        {
          id: item.id,
          toolbarId: "content-manipulation",
          groupPriority: 1,
        },
      ]
    );
    provider = UiItemsProviderUtilities.override(provider, {
      provideWidgets: (id, usage, location, section) => {
        const widgets = layersProvider.provideWidgets
          ? layersProvider.provideWidgets(id, usage, location, section)
          : [];
        return [
          {
            id: "spatial:layers",
            content: (
              <>
                {widgets.map((w) => (
                  <React.Fragment key={w.id}>{w.content}</React.Fragment>
                ))}
              </>
            ),
          },
        ];
      },
    });
    return provider;
  }

  export const contentManipulation: UiItemsProvider = {
    id: "content-manipulation-provider",
    getToolbarItems: () => {
      return [
        ToolbarItemUtilities.createActionItem(
          "home",
          0,
          <SvgHome />,
          "Home",
          () => {
            const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
            const widgetDef = frontstageDef?.findWidgetDef("home");
            widgetDef?.setWidgetState(WidgetState.Open);
          }
        ),
        ToolbarItemUtilities.createActionItem(
          "assets",
          0,
          <SvgTableOfContents />,
          "Assets",
          () => {
            const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
            const widgetDef = frontstageDef?.findWidgetDef("assets");
            widgetDef?.setWidgetState(WidgetState.Open);
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
          }
        ),
      ];
    },
    getToolbarItemLocations: () => {
      const toolbarId = "content-manipulation";
      return [
        {
          id: "home",
          toolbarId,
          groupPriority: 2,
        },
        {
          id: "assets",
          toolbarId,
          groupPriority: 2,
        },
        {
          id: "documents",
          toolbarId,
          groupPriority: 2,
        },
      ];
    },
  };

  export const contextNavigation: UiItemsProvider = {
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

  export const viewNavigation: UiItemsProvider = {
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

  export const widgets: UiItemsProvider = {
    id: "widget-provider",
    provideWidgets: (_stageid, _stageUsage) => {
      return [
        {
          id: "configure",
          content: <ConfigureWidget />,
          label: "Portfolio Configuration",
          icon: <SvgSettings />,
        },
        {
          id: "home",
          content: <b>Home content</b>,
          label: "Home widget",
          icon: <SvgPlaceholder />,
        },
        {
          id: "assets",
          content: <b>Assets content</b>,
          label: "Assets widget",
          icon: <SvgPlaceholder />,
        },
        {
          id: "documents",
          content: <b>Documents content</b>,
          label: "Documents widget",
          icon: <SvgPlaceholder />,
        },
      ];
    },
  };
}

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

function ConfigureWidget() {
  const [currentStep, setCurrentStep] = React.useState(2);
  return (
    <Stepper
      currentStep={currentStep}
      steps={[
        { name: "First Step" },
        { name: "Second Step" },
        { name: "Third Step" },
        { name: "Last Step" },
      ]}
      onStepClick={(index) => {
        setCurrentStep(index);
      }}
    />
  );
}
