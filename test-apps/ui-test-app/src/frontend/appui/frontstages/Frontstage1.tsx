/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { PlaybackSettings, TimelineComponent, TimelinePausePlayAction, TimelinePausePlayArgs } from "@itwin/imodel-components-react";
import {
  ActionItemButton,
  CommandItemDef,
  ContentGroup,
  ContentLayoutDef,
  CoreTools,
  Frontstage,
  FrontstageDef,
  FrontstageProps,
  FrontstageProvider,
  GroupButton,
  NavigationWidget,
  StagePanel,
  ToolbarGroupItem,
  ToolButton,
  ToolWidget,
  UiFramework,
  useWidgetDirection,
  Widget,
  WidgetState,
  WidgetStateChangedEventArgs,
  Zone,
  ZoneLocation,
  ZoneState,
} from "@itwin/appui-react";
import { Direction, Toolbar } from "@itwin/appui-layout-react";
import { AppTools } from "../../tools/ToolSpecifications";
import { SmallStatusBarWidgetControl } from "../statusbars/SmallStatusBar";
import { HorizontalPropertyGridWidgetControl, VerticalPropertyGridWidgetControl } from "../widgets/PropertyGridDemoWidget";
import { TableDemoWidgetControl } from "../widgets/TableDemoWidget";
import { NestedFrontstage1 } from "./NestedFrontstage1";
import { StandardContentLayouts, UiAdmin } from "@itwin/appui-abstract";
import { AppUi } from "../AppUi";
import { TestModalDialog } from "../dialogs/TestModalDialog";

/* eslint-disable react/jsx-key, deprecation/deprecation */

function RightPanel() {
  const direction = useWidgetDirection();
  const [state, setState] = React.useState(() => {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef!;
    const widgetDef = frontstageDef.findWidgetDef("VerticalPropertyGrid")!;
    return WidgetState[widgetDef.state];
  });
  React.useEffect(() => {
    const listener = (args: WidgetStateChangedEventArgs) => {
      if (args.widgetDef.id === "VerticalPropertyGrid")
        setState(WidgetState[args.widgetState]);
    };
    UiFramework.frontstages.onWidgetStateChangedEvent.addListener(listener);
    return () => {
      UiFramework.frontstages.onWidgetStateChangedEvent.removeListener(listener);
    };
  });
  return (
    <>
      <h2>Right panel</h2>
      <p>{state}</p>
      <p>{direction}</p>
    </>
  );
}

function SampleTimelineComponent() {
  const duration = 20 * 1000;
  const startDate = new Date(2014, 6, 6);
  const endDate = new Date(2016, 8, 12);
  const [loop, setLoop] = React.useState<boolean>(false);

  const handleOnSettingsChange = (settings: PlaybackSettings) => {
    if (settings.loop !== undefined) {
      setLoop(settings.loop);
    }
  };

  return (
    <div>
      <TimelineComponent
        startDate={startDate}
        endDate={endDate}
        initialDuration={0}
        totalDuration={duration}
        minimized={true}
        showDuration={true}
        repeat={loop}
        onSettingsChange={handleOnSettingsChange}
        alwaysMinimized={true}
        componentId={"sampleApp-sampleTimeline"} // qualify id with "<appName>-" to ensure uniqueness
      />
    </div>
  );
}

export class Frontstage1 extends FrontstageProvider {
  public static stageId = "ui-test-app:Test1";

  public get id(): string {
    return Frontstage1.stageId;
  }

  private _topMostPanel = {
    widgets: [
      <Widget element={<>
        <h2>TopMost panel</h2>
        <span>BottomMost panel:</span>
        &nbsp;
        <button onClick={() => {
          const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
          const widgetDef = frontstageDef?.findWidgetDef("BottomMostPanelWidget");
          widgetDef?.setWidgetState(WidgetState.Open);
        }}>show</button>
        &nbsp;
        <button onClick={() => {
          const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
          const widgetDef = frontstageDef?.findWidgetDef("BottomMostPanelWidget");
          widgetDef?.setWidgetState(WidgetState.Hidden);
        }}>hide</button>
      </>} />,
    ],
  };

  private _topPanel = {
    widgets: [
      <Widget element={<h2>Top panel</h2>} />,
    ],
  };

  private _leftPanel = {
    allowedZones: [2, 4, 7, 9],
  };

  private _rightPanel = {
    allowedZones: [2, 9],
    widgets: [
      <Widget element={<RightPanel />} />,
    ],
  };

  private _bottomPanel = {
    widgets: [
      <Widget element={<SampleTimelineComponent />} />,
    ],
  };

  private _bottomMostPanel = {
    allowedZones: [2, 4, 9],
    widgets: [
      <Widget id="BottomMostPanelWidget" element={<h2>BottomMost panel</h2>} />,
    ],
  };

  public get frontstage(): React.ReactElement<FrontstageProps> {
    const contentGroup = new ContentGroup(AppUi.TestContentGroup1);
    return {
      id: this.id,
      version: 1,
      contentGroup: contentGroup,

      contentManipulation: {
        content: <FrontstageToolWidget />,
      },

      toolSettings: {},

      viewNavigation: {
        content: <FrontstageNavigationWidget />,
      },

      statusBar: {},

      topPanel: {
        resizable: false,

        sections: {
          start: [...this._topPanel.widgets],
          end: [...this._topMostPanel.widgets],
        },
      },

      leftPanel: {
        sections: {
          start: [{
            id: "VerticalPropertyGrid",
            icon: "icon-placeholder",
            labelKey: "SampleApp:widgets.VerticalPropertyGrid",
          }],

          end: [{
            icon: "icon-placeholder",
            labelKey: "SampleApp:widgets.TableDemo",
          }],
        },
      },

      rightPanel: {
        resizable: false,
        size: 200,

        sections: {
          start: [...this._rightPanel.widgets],

          end: [{
            defaultState: WidgetState.Open,
            icon: "icon-placeholder",
            labelKey: "SampleApp:widgets.HorizontalPropertyGrid",
          }, {
            id: "VerticalPropertyGrid1",
            defaultState: WidgetState.Hidden,
            icon: "icon-placeholder",
            labelKey: "SampleApp:widgets.VerticalPropertyGrid",
          }],
        },
      },

      bottomPanel: {
        sections: {
          start: [...this._bottomPanel.widgets],
          end: [...this._bottomMostPanel.widgets],
        },
      },
    };
  }
}
/** Define a ToolWidget with Buttons to display in the TopLeft zone.
 */
class FrontstageToolWidget extends React.Component {
  private static _frontstage1Def: FrontstageDef | undefined;

  private static async getFrontstage1Def() {
    if (!this._frontstage1Def) {
      const frontstageProvider = new NestedFrontstage1();
      this._frontstage1Def = await FrontstageDef.create(frontstageProvider);
    }
    return this._frontstage1Def;
  }

  /** Command that opens a nested Frontstage */
  private get _openNestedFrontstage1() {
    return new CommandItemDef({
      iconSpec: "icon-placeholder",
      labelKey: "SampleApp:buttons.openNestedFrontstage1",
      execute: async () => {
        const frontstage1Def = await FrontstageToolWidget.getFrontstage1Def();
        await UiFramework.frontstages.openNestedFrontstage(frontstage1Def);
      },
    });
  }

  /** Command that opens switches the content layout - TODO Review */
  private get _switchLayout() {
    return new CommandItemDef({
      iconSpec: "icon-placeholder",
      labelKey: "SampleApp:buttons.switchLayout",
      execute: async () => {
        const activeFrontstageDef = UiFramework.frontstages.activeFrontstageDef;
        if (activeFrontstageDef) {
          const contentLayout = new ContentLayoutDef(StandardContentLayouts.twoHorizontalSplit);
          if (contentLayout && activeFrontstageDef.contentGroup) {
            await UiFramework.content.layouts.setActive(contentLayout, activeFrontstageDef.contentGroup);
          }
        }
      },
    });
  }

  /** Command to send pause/play toggle to the SampleTimelineComponent */
  private get _pausePlayTimeline() {
    return new CommandItemDef({
      iconSpec: "icon-snow",
      labelKey: "SampleApp:buttons.toggleTimelinePlay",
      execute: async () => {
        const eventArgs: TimelinePausePlayArgs = { uiComponentId: "sampleApp-sampleTimeline", timelineAction: TimelinePausePlayAction.Toggle };
        UiAdmin.sendUiEvent(eventArgs);
      },
    });
  }

  private get _openPopupWindow() {
    return new CommandItemDef({
      iconSpec: "icon-smiley-sad",
      label: "Open Popup Window",
      execute: () => location.href = "pw://imodelbridges-qa-us-pw.bentley.com:imodelbridges-qa-us-pw-01/Documents/D{8e708119-4aef-49f0-b412-d9b5615ba928}",
      // execute: () => window.open("pw://imodelbridges-qa-us-pw.bentley.com:imodelbridges-qa-us-pw-01/Documents/D{8e708119-4aef-49f0-b412-d9b5615ba928}"),
    });
  }

  private get _openModal() {
    return new CommandItemDef({
      iconSpec: "icon-smiley-happy",
      label: "Open Modal Dialog",
      execute: () => UiFramework.dialogs.modal.open(<TestModalDialog />),
    });
  }

  private _horizontalToolbar = (
    <Toolbar
      expandsTo={Direction.Bottom}
      items={
        <>
          <ActionItemButton actionItem={this._openPopupWindow} />
          <ActionItemButton actionItem={CoreTools.selectElementCommand} />
          <ActionItemButton actionItem={AppTools.item1} />
          <ActionItemButton actionItem={AppTools.item2} />
          <ActionItemButton actionItem={this._openNestedFrontstage1} />
          <ActionItemButton actionItem={this._switchLayout} />
          <ActionItemButton actionItem={this._pausePlayTimeline} />
          <ActionItemButton actionItem={this._openModal} />
        </>
      }
    />
  );

  private _verticalToolbar = (
    <Toolbar
      expandsTo={Direction.Right}
      items={
        <>
          <ActionItemButton actionItem={CoreTools.rotateViewCommand} />
          <ToolButton toolId={AppTools.tool1.id} iconSpec={AppTools.tool1.iconSpec} labelKey={AppTools.tool1.label} execute={AppTools.tool1.execute} />
          <ToolButton toolId={AppTools.tool2.id} iconSpec={AppTools.tool2.iconSpec} labelKey={AppTools.tool2.label} execute={AppTools.tool2.execute} />
          <ToolbarGroupItem
            labelKey="SampleApp:buttons.anotherGroup"
            iconSpec="icon-placeholder"
            items={
              [
                AppTools.tool1, AppTools.tool2, AppTools.item3, AppTools.item4, AppTools.item5,
                AppTools.item6, AppTools.item7, AppTools.item8,
              ]
            }
          />
        </>
      }
    />
  );

  public override render() {
    return (
      <ToolWidget
        appButton={AppTools.backstageToggleCommand}
        horizontalToolbar={this._horizontalToolbar}
        verticalToolbar={this._verticalToolbar}
      />
    );
  }
}

/** Define a NavigationWidget with Buttons to display in the TopRight zone.
 */
class FrontstageNavigationWidget extends React.Component {

  private _horizontalToolbar = (
    <Toolbar
      expandsTo={Direction.Bottom}
      items={
        <>
          <ToolButton toolId={AppTools.item5.id} iconSpec={AppTools.item5.iconSpec} labelKey={AppTools.item5.label} execute={AppTools.item5.execute} />
          <ToolButton toolId={AppTools.item6.id} iconSpec={AppTools.item6.iconSpec} labelKey={AppTools.item6.label} execute={AppTools.item6.execute} />
        </>
      }
    />
  );

  private _verticalToolbar = (
    <Toolbar
      expandsTo={Direction.Right}
      items={
        <>
          <ToolButton toolId={AppTools.item7.id} iconSpec={AppTools.item7.iconSpec} labelKey={AppTools.item7.label} execute={AppTools.item7.execute} />
          <ToolButton toolId={AppTools.item8.id} iconSpec={AppTools.item8.iconSpec} labelKey={AppTools.item8.label} execute={AppTools.item8.execute} />
        </>
      }
    />
  );

  public override render() {
    return (
      <NavigationWidget
        navigationAidId="StandardRotationNavigationAid"
        horizontalToolbar={this._horizontalToolbar}
        verticalToolbar={this._verticalToolbar}
      />
    );
  }
}
