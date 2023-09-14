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
import {
  SvgCheckmark,
  SvgLocation,
  SvgSearch,
  SvgVisibilityHalf,
  SvgVisibilityHide,
  SvgVisibilityShow,
} from "@itwin/itwinui-icons-react";
import {
  ExpandableBlock,
  IconButton,
  Tabs,
  ToggleSwitch,
} from "@itwin/itwinui-react";

function createToolbarItem() {
  return ToolbarItemUtilities.createActionItem(
    "viewpoints",
    0,
    <SvgLocation />,
    "Viewpoints",
    () => {
      console.log("viewpoints clicked");
      const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
      const widgetDef = frontstageDef?.findWidgetDef("viewpoints");
      if (!widgetDef) return;
      if (widgetDef.state === WidgetState.Open) {
        widgetDef.setWidgetState(WidgetState.Hidden);
        return;
      }
      widgetDef.setWidgetState(WidgetState.Open);
    }
  );
}

export const viewpointsProvider: UiItemsProvider = {
  id: "viewpoints-provider",
  getToolbarItems: () => {
    return [createToolbarItem()];
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

function WidgetLayout(props: React.PropsWithChildren<{}>) {
  return <div style={{ padding: "0.5em" }}>{props.children}</div>;
}

WidgetLayout.Tools = Tools;
WidgetLayout.Tabs = WidgetTabs;

function Tools() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex" }}>
        <IconButton styleType="borderless">
          <SvgVisibilityShow />
        </IconButton>
        <IconButton styleType="borderless">
          <SvgVisibilityHide />
        </IconButton>
        <IconButton styleType="borderless">
          <SvgVisibilityHalf />
        </IconButton>
      </div>
      <IconButton styleType="borderless">
        <SvgSearch />
      </IconButton>
    </div>
  );
}

function WidgetTabs() {
  return (
    <Tabs type="pill" labels={["Pill tab 1", "Pill tab 2"]}>
      <ToggleSwitch label="Toggle feature No.1" icon={<SvgCheckmark />} />
      <ToggleSwitch checked={true} disabled label="This you cannot change" />
      <ToggleSwitch label="Toggle feature No.2" />
    </Tabs>
  );
}
