/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { PlaybackSettings, TimelineComponent, TimelinePausePlayAction, TimelinePausePlayArgs } from "@itwin/imodel-components-react";
import {
  BackstageAppButton, CommandItemDef, ContentGroup, ContentLayoutDef, ContentLayoutManager, CoreTools, FrontstageDef, FrontstageManager, FrontstageProps,
  FrontstageProvider, ModalDialogManager, NavigationAidHost, NavigationWidgetComposer, ToolbarComposer, ToolbarHelper, ToolWidgetComposer, useWidgetDirection,
  WidgetStateChangedEventArgs,
} from "@itwin/appui-react";
import { AppTools } from "../../tools/ToolSpecifications";
import { SmallStatusBarWidgetControl } from "../statusbars/SmallStatusBar";
import { HorizontalPropertyGridWidgetControl, VerticalPropertyGridWidgetControl } from "../widgets/PropertyGridDemoWidget";
import { TableDemoWidgetControl } from "../widgets/TableDemoWidget";
import { AppToolbarUtilities, NestedFrontstage1 } from "./NestedFrontstage1";
import { CommonToolbarItem, StandardContentLayouts, ToolbarItemUtilities, ToolbarOrientation, ToolbarUsage, UiAdmin, WidgetState } from "@itwin/appui-abstract";
import { AppUi } from "../AppUi";
import { TestModalDialog } from "../dialogs/TestModalDialog";
import { IModelApp } from "@itwin/core-frontend";

function RightPanel() {
  const direction = useWidgetDirection();
  const [state, setState] = React.useState(() => {
    const frontstageDef = FrontstageManager.activeFrontstageDef!;
    const widgetDef = frontstageDef.findWidgetDef("VerticalPropertyGrid")!;
    return WidgetState[widgetDef.state];
  });
  React.useEffect(() => {
    const listener = (args: WidgetStateChangedEventArgs) => {
      if (args.widgetDef.id === "VerticalPropertyGrid")
        setState(WidgetState[args.widgetState]);
    };
    FrontstageManager.onWidgetStateChangedEvent.addListener(listener);
    return () => {
      FrontstageManager.onWidgetStateChangedEvent.removeListener(listener);
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

  public override get frontstage(): FrontstageProps {
    const contentGroup = new ContentGroup(AppUi.TestContentGroup1);
    return {
      id: this.id,
      version: 1,
      defaultTool: CoreTools.selectElementCommand,
      contentGroup,
      defaultContentId: "TestContent1",
      contentManipulation: {
        isFreeform: true,
        element: <FrontstageToolWidget />,
      },
      toolSettings: {
        isToolSettings: true,
      },
      viewNavigation: {
        isFreeform: true,
        element: < FrontstageNavigationWidget />,
      },
      statusBar: {
        isStatusBar: true,
        control: SmallStatusBarWidgetControl,
      },
      topPanel: {
        resizable: false,
        sections: {
          start: {
            widgets: [
              { element: <h2>Top panel</h2> },
              {
                element: <>
                  <h2>TopMost panel</h2>
                  <span>BottomMost panel:</span>
                  & nbsp;
                  < button onClick={() => {
                    const frontstageDef = FrontstageManager.activeFrontstageDef;
                    const widgetDef = frontstageDef?.findWidgetDef("BottomMostPanelWidget");
                    widgetDef?.setWidgetState(WidgetState.Open);
                  }} > show</button>
                  & nbsp;
                  < button onClick={() => {
                    const frontstageDef = FrontstageManager.activeFrontstageDef;
                    const widgetDef = frontstageDef?.findWidgetDef("BottomMostPanelWidget");
                    widgetDef?.setWidgetState(WidgetState.Hidden);
                  }
                  }> hide</button >
                </>,
              },
            ],
          },
        },
      },
      leftPanel: {
        sections: {
          start: {
            widgets: [
              {
                id: "VerticalPropertyGrid",
                iconSpec: "icon-placeholder",
                labelKey: "SampleApp:widgets.VerticalPropertyGrid",
                control: VerticalPropertyGridWidgetControl,
              },
            ],
          },
          end: {
            widgets: [
              {
                iconSpec: "icon-placeholder",
                labelKey: "SampleApp:widgets.TableDemo",
                control: TableDemoWidgetControl,
              },
            ],
          },
        },
      },
      rightPanel: {
        resizable: false,
        size: 200,
        sections: {
          start: {
            widgets: [
              { element: <RightPanel /> },
            ],
          },
          end: {
            widgets: [
              {
                defaultState: WidgetState.Open,
                iconSpec: "icon-placeholder",
                labelKey: "SampleApp:widgets.HorizontalPropertyGrid",
                control: HorizontalPropertyGridWidgetControl,
                fillZone: true,
              },
              {
                id: "VerticalPropertyGrid1",
                defaultState: WidgetState.Hidden,
                iconSpec: "icon-placeholder",
                labelKey: "SampleApp:widgets.VerticalPropertyGrid",
                control: VerticalPropertyGridWidgetControl,
              },
            ],
          },
        },
      },
      bottomPanel: {
        sections: {
          start: {
            widgets: [
              { element: <SampleTimelineComponent /> },
            ],
          },
          end: {
            widgets: [
              {
                id: "BottomMostPanelWidget",
                element: <h2> BottomMost panel</h2>,
              },
            ],
          },
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
        await FrontstageManager.openNestedFrontstage(frontstage1Def);
      },
    });
  }

  /** Command that opens switches the content layout - TODO Review */
  private get _switchLayout() {
    return new CommandItemDef({
      iconSpec: "icon-placeholder",
      labelKey: "SampleApp:buttons.switchLayout",
      execute: async () => {
        const activeFrontstageDef = FrontstageManager.activeFrontstageDef;
        if (activeFrontstageDef) {
          const contentLayout = new ContentLayoutDef(StandardContentLayouts.twoHorizontalSplit);
          if (contentLayout && activeFrontstageDef.contentGroup) {
            await ContentLayoutManager.setActiveLayout(contentLayout, activeFrontstageDef.contentGroup);
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
      execute: () => ModalDialogManager.openDialog(<TestModalDialog />),
    });
  }

  private _horizontalItems: CommonToolbarItem[] = [
    ToolbarHelper.createToolbarItemFromItemDef(10, this._openPopupWindow),
    ToolbarHelper.createToolbarItemFromItemDef(10, CoreTools.selectElementCommand),
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item1),
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item2),
    ToolbarHelper.createToolbarItemFromItemDef(10, this._openNestedFrontstage1),
    ToolbarHelper.createToolbarItemFromItemDef(10, this._switchLayout),
    ToolbarHelper.createToolbarItemFromItemDef(10, this._pausePlayTimeline),
    ToolbarHelper.createToolbarItemFromItemDef(10, this._openModal),
  ];

  private _verticalItems: CommonToolbarItem[] = [
    ToolbarHelper.createToolbarItemFromItemDef(10, CoreTools.rotateViewCommand),
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.tool1),
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.tool2),
    ToolbarItemUtilities.createGroupButton("SampleApp:anotherGroup", 10, "icon-placeholder", IModelApp.localization.getLocalizedString("SampleApp:anotherGroup"), [
      AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.tool1),
      AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.tool2),
      AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item3),
      AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item4),
      AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item5),
      AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item6),
      AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item7),
      AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item8),
    ]),
  ];

  public override render() {
    return (
      <ToolWidgetComposer
        cornerItem={<BackstageAppButton />}
        verticalToolbar={<ToolbarComposer items={this._verticalItems} usage={ToolbarUsage.ContentManipulation} orientation={ToolbarOrientation.Vertical} />}
        horizontalToolbar={<ToolbarComposer items={this._horizontalItems} usage={ToolbarUsage.ContentManipulation} orientation={ToolbarOrientation.Horizontal} />}
      />
    );
  }
}

/** Define a NavigationWidget with Buttons to display in the TopRight zone.
 */
class FrontstageNavigationWidget extends React.Component {
  private _horizontalItems: CommonToolbarItem[] = [
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item5),
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item6),
  ];

  private _verticalItems: CommonToolbarItem[] = [
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item7),
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item8),
  ];

  public override render() {
    return (
      <NavigationWidgetComposer
        navigationAidHost={<NavigationAidHost />} // StandardRotationNavigationAid
        verticalToolbar={<ToolbarComposer items={this._verticalItems} usage={ToolbarUsage.ViewNavigation} orientation={ToolbarOrientation.Vertical} />}
        horizontalToolbar={<ToolbarComposer items={this._horizontalItems} usage={ToolbarUsage.ViewNavigation} orientation={ToolbarOrientation.Horizontal} />}
      />
    );
  }
}
