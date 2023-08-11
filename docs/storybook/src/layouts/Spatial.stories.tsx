/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  Avatar,
  ButtonGroup,
  DropdownButton,
  Flex,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Stepper,
  getUserColor,
} from "@itwin/itwinui-react";
import {
  IModelViewportControl,
  SpatialLayoutWidget,
  SpatialLayout,
  StageUsage,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiFramework,
  UiItemsManager,
  WidgetState,
  isToolbarActionItem,
  useActiveFrontstageDef,
  FrontstageDef,
  WidgetDef,
} from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";
import {
  SvgConfiguration,
  SvgDocument,
  SvgGlobe,
  SvgHome,
  SvgImodel,
  SvgLayers,
  SvgLocation,
  SvgNotification,
  SvgPlaceholder,
  SvgSettings,
  SvgTableOfContents,
} from "@itwin/itwinui-icons-react";
import { AppUiDecorator } from "../AppUiDecorator";
import { StorybookFrontstageProvider } from "../StorybookFrontstageProvider";
import { useGroupToolbarItems, useToolbarItems } from "./useToolbarItems";
import { CommonProps } from "@itwin/core-react";

function Demo() {
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    void (async function () {
      await IModelApp.startup();
      await UiFramework.initialize(undefined);
      UiFramework.frontstages.addFrontstageProvider(
        new StorybookFrontstageProvider({
          id: "main-frontstage",
          usage: StageUsage.Private,
          contentGroupProps: {
            id: "ViewportContentGroup",
            layout: StandardContentLayouts.singleView,
            contents: [
              {
                id: "ViewportContent",
                classId: IModelViewportControl,
                applicationData: {},
              },
            ],
          },
          hideStatusBar: true,
          hideToolSettings: true,
          hideNavigationAid: true,
        })
      );
      UiItemsManager.register({
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
                const frontstageDef =
                  UiFramework.frontstages.activeFrontstageDef;
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
                const frontstageDef =
                  UiFramework.frontstages.activeFrontstageDef;
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
                const frontstageDef =
                  UiFramework.frontstages.activeFrontstageDef;
                const widgetDef = frontstageDef?.findWidgetDef("documents");
                widgetDef?.setWidgetState(WidgetState.Open);
              },
              {
                groupPriority: 2,
              }
            ),
          ];
        },
      });
      UiItemsManager.register({
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
                const frontstageDef =
                  UiFramework.frontstages.activeFrontstageDef;
                const widgetDef = frontstageDef?.findWidgetDef("configure");
                widgetDef?.setWidgetState(WidgetState.Open);
              }
            ),
          ];
        },
      });
      UiItemsManager.register({
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
      });
      UiItemsManager.register({
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
      });
      await UiFramework.frontstages.setActiveFrontstage("main-frontstage");
      setInitialized(true);
    })();
    return () => {
      UiItemsManager.unregister("provider-1");
    };
  }, []);
  if (!initialized) return null;
  return <Initialized />;
}

function Initialized() {
  return (
    <SpatialLayout style={{ height: "100vh" }} content={<Viewport />}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "0.5em",
          boxSizing: "border-box",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ContextNavigationToolbar />
          <ViewNavigationToolbar />
        </div>
        <SpatialLayoutWidget />
        <ContentManipulationToolbar />
      </div>
    </SpatialLayout>
  );
}

function Viewport() {
  const [hidden, setHidden] = React.useState(true);
  return (
    <>
      <div
        style={{
          height: "100%",
          background: "radial-gradient(#666, #00000000)",
          cursor: "pointer",
        }}
        onClick={() => setHidden((prev) => !prev)}
      />
      <WidgetsInfo style={{ visibility: hidden ? "hidden" : undefined }} />
    </>
  );
}

// TODO: replace with iTwinUI based Toolbar components.
function ContextNavigationToolbar() {
  const items = useToolbarItems(
    ToolbarUsage.ViewNavigation,
    ToolbarOrientation.Horizontal
  );
  return (
    <ButtonGroup>
      {items.map((item) => {
        if (item.id === "context-select")
          return <React.Fragment key={item.id}>{item.icon}</React.Fragment>;
        return (
          <IconButton
            key={item.id}
            label={item.label}
            onClick={() => {
              if (isToolbarActionItem(item)) {
                item.execute();
              }
            }}
          >
            {item.icon}
          </IconButton>
        );
      })}
    </ButtonGroup>
  );
}

function ViewNavigationToolbar() {
  const items = useToolbarItems(
    ToolbarUsage.ViewNavigation,
    ToolbarOrientation.Vertical
  );
  const groupedItems = useGroupToolbarItems(items);
  return (
    <Flex gap="m">
      {groupedItems.map((group) => (
        <ButtonGroup key={group[0].groupPriority ?? 0}>
          {group.map((item) => (
            <IconButton
              key={item.id}
              label={item.label}
              onClick={() => {
                if (isToolbarActionItem(item)) {
                  item.execute();
                }
              }}
            >
              {item.icon}
            </IconButton>
          ))}
        </ButtonGroup>
      ))}
    </Flex>
  );
}

function ContentManipulationToolbar() {
  const items = useToolbarItems(
    ToolbarUsage.ContentManipulation,
    ToolbarOrientation.Vertical
  );
  const groupedItems = useGroupToolbarItems(items);
  return (
    <Flex gap="s" style={{ flexDirection: "column", alignItems: "end" }}>
      {groupedItems.map((group) => (
        <ButtonGroup orientation="vertical" key={group[0].groupPriority ?? 0}>
          {group.map((item) => (
            <IconButton
              key={item.id}
              label={item.label}
              onClick={() => {
                if (isToolbarActionItem(item)) {
                  item.execute();
                }
              }}
            >
              {item.icon}
            </IconButton>
          ))}
        </ButtonGroup>
      ))}
    </Flex>
  );
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

function WidgetsInfo(props: CommonProps) {
  const frontstageDef = useActiveFrontstageDef();
  const widgetDefs = useWidgetDefs(frontstageDef);
  React.useEffect(() => {
    return UiFramework.frontstages.onWidgetStateChangedEvent.addListener(
      (args) =>
        console.log(
          "onWidgetStateChangedEvent",
          args.widgetDef.id,
          args.widgetState
        )
    );
  }, []);
  return (
    <List
      style={{
        position: "absolute",
        top: "4em",
        right: "0.5em",
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: 8,
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.36)",
        ...props.style,
      }}
    >
      {widgetDefs.map((widgetDef) => (
        <WidgetInfo key={widgetDef.id} widgetDef={widgetDef} />
      ))}
    </List>
  );
}

interface WidgetInfo extends CommonProps {
  widgetDef: WidgetDef;
}

function WidgetInfo({ widgetDef }: WidgetInfo) {
  const id = widgetDef.id;
  const [state, setState] = React.useState(widgetDef.state);
  React.useEffect(() => {
    return UiFramework.frontstages.onWidgetStateChangedEvent.addListener(
      (args) => {
        if (args.widgetDef.id !== id) return;
        setState(args.widgetState);
      }
    );
  }, [id]);
  return (
    <ListItem>
      <ListItem.Content>
        {widgetDef.id}
        <ListItem.Description>{widgetDef.label}</ListItem.Description>
      </ListItem.Content>
      {WidgetState[state]}
    </ListItem>
  );
}

function getWidgetDefs(frontstageDef: FrontstageDef | undefined) {
  if (!frontstageDef) return [];
  return [...frontstageDef.widgetDefs];
}

function useWidgetDefs(frontstageDef: FrontstageDef | undefined) {
  const [widgets] = React.useState(() => getWidgetDefs(frontstageDef));
  return widgets;
}

const meta: Meta = {
  title: "Layouts/Spatial",
  component: Demo,
  decorators: [AppUiDecorator],
} satisfies Meta<typeof Demo>;

export default meta;

type Story = StoryObj<typeof Demo>;

export const Basic: Story = {};
