/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { PlaybackSettings, TimelineComponent, TimelinePausePlayAction, TimelinePausePlayArgs } from "@itwin/imodel-components-react";
import {
  BackstageAppButton, CommandItemDef, ContentGroup, ContentLayoutDef, CoreTools, FrontstageConfig, FrontstageDef,
  FrontstageProvider, NavigationAidHost, NavigationWidgetComposer, ToolbarComposer, ToolbarHelper, ToolbarItem, ToolbarOrientation, ToolbarUsage, ToolWidgetComposer, UiFramework, useWidgetDirection,
  WidgetState, WidgetStateChangedEventArgs,
} from "@itwin/appui-react";
import { AppTools } from "../../tools/ToolSpecifications";
import { AppToolbarUtilities, NestedFrontstage1 } from "./NestedFrontstage1";
import { StandardContentLayouts, ToolbarItemUtilities, UiAdmin } from "@itwin/appui-abstract";
import { AppUi } from "../AppUi";
import { TestModalDialog } from "../dialogs/TestModalDialog";
import { IModelApp } from "@itwin/core-frontend";

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

  public override frontstageConfig(): FrontstageConfig {
    const contentGroup = new ContentGroup(AppUi.TestContentGroup1);
    return {
      id: this.id,
      version: 1,
      contentGroup,
      contentManipulation: {
        id: "contentManipulation",
        content: <FrontstageToolWidget />,
      },
      toolSettings: {
        id: "toolSettings",
      },
      viewNavigation: {
        id: "viewNavigation",
        content: <FrontstageNavigationWidget />,
      },
      statusBar: {
        id: "statusBar",
      },
      topPanel: {
        resizable: false,
        sections: {
          start: [
            {
              id: "topPanel",
              content: <h2>Top panel</h2>,
            },
            {
              id: "topMostPanel",
              content: <>
                <h2>TopMost panel</h2>
                <span>BottomMost panel:</span>
                & nbsp;
                < button onClick={() => {
                  const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
                  const widgetDef = frontstageDef?.findWidgetDef("BottomMostPanelWidget");
                  widgetDef?.setWidgetState(WidgetState.Open);
                }}>show</button>
                & nbsp;
                < button onClick={() => {
                  const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
                  const widgetDef = frontstageDef?.findWidgetDef("BottomMostPanelWidget");
                  widgetDef?.setWidgetState(WidgetState.Hidden);
                }
                }>hide</button>
              </>,
            },
          ],
        },
      },
      leftPanel: {
        sections: {
          start: [
            {
              id: "VerticalPropertyGrid",
              icon: "icon-placeholder",
              labelKey: "SampleApp:widgets.VerticalPropertyGrid",
            },
          ],
        },
      },
      rightPanel: {
        resizable: false,
        size: 200,
        sections: {
          start: [
            {
              id: "RightPanel",
              content: <RightPanel />,
            },
          ],
          end: [
            {
              id: "HorizontalPropertyGrid1",
              defaultState: WidgetState.Open,
              icon: "icon-placeholder",
              labelKey: "SampleApp:widgets.HorizontalPropertyGrid",
            },
            {
              id: "VerticalPropertyGrid1",
              defaultState: WidgetState.Hidden,
              icon: "icon-placeholder",
              labelKey: "SampleApp:widgets.VerticalPropertyGrid",
            },
          ],
        },
      },
      bottomPanel: {
        sections: {
          start: [
            {
              id: "SampleTimeline",
              content: <SampleTimelineComponent />,
            },
          ],
          end: [
            {
              id: "BottomMostPanelWidget",
              content: <h2>BottomMost panel</h2>,
            },
          ],
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

  private _horizontalItems: ToolbarItem[] = [
    ToolbarHelper.createToolbarItemFromItemDef(10, this._openPopupWindow),
    ToolbarHelper.createToolbarItemFromItemDef(10, CoreTools.selectElementCommand),
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item1),
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item2),
    ToolbarHelper.createToolbarItemFromItemDef(10, this._openNestedFrontstage1),
    ToolbarHelper.createToolbarItemFromItemDef(10, this._switchLayout),
    ToolbarHelper.createToolbarItemFromItemDef(10, this._pausePlayTimeline),
    ToolbarHelper.createToolbarItemFromItemDef(10, this._openModal),
  ];

  private _verticalItems: ToolbarItem[] = [
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
  private _horizontalItems: ToolbarItem[] = [
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item5),
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item6),
  ];

  private _verticalItems: ToolbarItem[] = [
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
