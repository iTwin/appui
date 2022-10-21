/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { CommonToolbarItem, ToolbarItemUtilities, ToolbarOrientation, ToolbarUsage, WidgetState } from "@itwin/appui-abstract";
import {
  ContentGroup, CoreTools, Frontstage, FrontstageProps, FrontstageProvider, NavigationAidHost, NavigationWidgetComposer,
  StagePanel,
  ToolbarComposer, ToolbarHelper, ToolWidgetComposer, Widget,
} from "@itwin/appui-react";
import { AppTools } from "../../tools/ToolSpecifications";
import { SmallStatusBarWidgetControl } from "../statusbars/SmallStatusBar";
import { HorizontalPropertyGridWidgetControl, VerticalPropertyGridWidgetControl } from "../widgets/PropertyGridDemoWidget";
import { AppUi } from "../AppUi";
import { AppToolbarUtilities, BackstageBackButton } from "./NestedFrontstage1";
import { IModelApp } from "@itwin/core-frontend";

export class NestedFrontstage2 extends FrontstageProvider {
  public static stageId = "ui-test-app:NestedFrontstage2";

  public get id(): string {
    return NestedFrontstage2.stageId;
  }

  public get frontstage(): React.ReactElement<FrontstageProps> {
    const contentGroup = new ContentGroup(AppUi.TestContentGroup2);

    return (
      <Frontstage id={this.id}
        defaultTool={CoreTools.rotateViewCommand}
        contentGroup={contentGroup}
        contentManipulation={
          <Widget isFreeform={true} element={<FrontstageToolWidget />} />
        }
        toolSettings={
          <Widget isToolSettings={true} />
        }
        viewNavigation={
          <Widget isFreeform={true} element={<FrontstageNavigationWidget />} />
        }
        statusBar={
          <Widget isStatusBar={true} iconSpec="icon-placeholder" labelKey="SampleApp:widgets.StatusBar" control={SmallStatusBarWidgetControl} />
        }
        rightPanel={
          <StagePanel
            sections={{
              end: {
                widgets: [
                  <Widget key={0} defaultState={WidgetState.Closed} iconSpec="icon-placeholder" labelKey="SampleApp:widgets.HorizontalPropertyGrid" control={HorizontalPropertyGridWidgetControl} fillZone={true} />,
                  <Widget key={1} id="VerticalPropertyGrid" defaultState={WidgetState.Hidden} iconSpec="icon-placeholder" labelKey="SampleApp:widgets.VerticalPropertyGrid" control={VerticalPropertyGridWidgetControl} />,
                ],
              },
            }}
          />
        }
      />
    );
  }
}

/** Define a ToolWidget with Buttons to display in the TopLeft zone.
 */
class FrontstageToolWidget extends React.Component {
  private _horizontalItems: CommonToolbarItem[] = [
    ToolbarHelper.createToolbarItemFromItemDef(10, CoreTools.selectElementCommand),
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item1),
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item2),
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
        cornerItem={<BackstageBackButton />}
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
