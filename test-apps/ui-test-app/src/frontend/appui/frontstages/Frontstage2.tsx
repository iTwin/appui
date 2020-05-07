/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  ActionItemButton, ContentGroup, ContentLayoutDef, CoreTools, Frontstage, FrontstageProps, FrontstageProvider, GroupButton, NavigationWidget,
  ToolButton, ToolWidget, Widget, WidgetState, Zone, ZoneState,
} from "@bentley/ui-framework";
import { Direction, Toolbar } from "@bentley/ui-ninezone";
import { AppTools } from "../../tools/ToolSpecifications";
import { TreeExampleContentControl } from "../contentviews/TreeExampleContent";
import { SmallStatusBarWidgetControl } from "../statusbars/SmallStatusBar";
import { MobxDemoWidgetControl } from "../widgets/MobxDemoWidget/MobxDemoWidgetControl";
import { NavigationTreeWidgetControl } from "../widgets/NavigationTreeWidget";
import {
  HorizontalPropertyGridContentControl, HorizontalPropertyGridWidgetControl, VerticalPropertyGridWidgetControl,
} from "../widgets/PropertyGridDemoWidget";

export class Frontstage2 extends FrontstageProvider {

  public get frontstage(): React.ReactElement<FrontstageProps> {
    const contentLayoutDef: ContentLayoutDef = new ContentLayoutDef(
      { // Four Views, two stacked on the left, two stacked on the right.
        descriptionKey: "SampleApp:ContentLayoutDef.FourQuadrants",
        verticalSplit: {
          percentage: 0.50,
          minSizeLeft: 100, minSizeRight: 100,
          left: { horizontalSplit: { percentage: 0.50, top: 0, bottom: 1, minSizeTop: 100, minSizeBottom: 100 } },
          right: { horizontalSplit: { percentage: 0.50, top: 2, bottom: 3, minSizeTop: 100, minSizeBottom: 100 } },
        },
      },
    );

    const myContentGroup: ContentGroup = new ContentGroup(
      {
        contents: [
          {
            classId: "UiFramework.IModelViewportControl",
            applicationData: { label: "Content 1a", bgColor: "black" },
          },
          {
            classId: TreeExampleContentControl,
            applicationData: { label: "Content 2a", bgColor: "black" },
          },
          {
            classId: "TestApp.IModelViewport",
            applicationData: { label: "Content 3a", bgColor: "black" },
          },
          {
            classId: HorizontalPropertyGridContentControl,
            applicationData: { label: "Content 4a", bgColor: "black" },
          },
        ],
      },
    );

    return (
      <Frontstage id="Test2"
        defaultTool={CoreTools.selectElementCommand}
        defaultLayout={contentLayoutDef} contentGroup={myContentGroup}
        isInFooterMode={false} applicationData={{ key: "value" }}

        contentManipulationTools={
          <Zone
            widgets={[
              <Widget isFreeform={true} element={<FrontstageToolWidget />} />,
            ]}
          />
        }
        toolSettings={
          <Zone
            widgets={[
              <Widget isToolSettings={true} />,
            ]}
          />
        }
        viewNavigationTools={
          <Zone
            widgets={[
              <Widget isFreeform={true} element={<FrontstageNavigationWidget />} />,
            ]}
          />
        }
        centerRight={
          <Zone allowsMerging={true} defaultState={ZoneState.Minimized}
            widgets={[
              <Widget iconSpec="icon-placeholder" labelKey="SampleApp:widgets.NavigationTree" control={NavigationTreeWidgetControl} />,
            ]}
          />
        }
        bottomLeft={
          <Zone
            widgets={[
              <Widget iconSpec="icon-placeholder" labelKey="SampleApp:widgets.MobxDemoWidget" control={MobxDemoWidgetControl} fillZone={true} />,
            ]}
          />
        }
        statusBar={
          <Zone defaultState={ZoneState.Open}
            widgets={[
              <Widget isStatusBar={true} control={SmallStatusBarWidgetControl} />,
            ]}
          />
        }
        bottomRight={
          <Zone allowsMerging={true} defaultState={ZoneState.Minimized}
            widgets={[
              <Widget id="VerticalPropertyGrid" defaultState={WidgetState.Hidden} iconSpec="icon-placeholder" labelKey="SampleApp:widgets.VerticalPropertyGrid" control={VerticalPropertyGridWidgetControl} />,
              <Widget defaultState={WidgetState.Hidden} iconSpec="icon-placeholder" labelKey="SampleApp:widgets.HorizontalPropertyGrid" control={HorizontalPropertyGridWidgetControl} />,
            ]}
          />
        }
      />
    );
  }
}

/** Define a ToolWidget with Buttons to display in the TopLeft zone.
 */
class FrontstageToolWidget extends React.Component {
  private _horizontalToolbar =
    <Toolbar
      expandsTo={Direction.Bottom}
      items={
        <>
          <ActionItemButton actionItem={AppTools.item1} />
          <ActionItemButton actionItem={AppTools.item2} />
          <GroupButton
            labelKey="SampleApp:buttons.toolGroup"
            iconSpec="icon-placeholder"
            items={[AppTools.tool1, AppTools.tool2]}
            direction={Direction.Bottom}
            itemsInColumn={7}
          />
        </>
      }
    />;

  private _verticalToolbar =
    <Toolbar
      expandsTo={Direction.Right}
      items={
        <>
          <GroupButton
            labelKey="SampleApp:buttons.anotherGroup"
            iconSpec="icon-placeholder"
            items={[AppTools.item3, AppTools.item4, AppTools.item5, AppTools.item6, AppTools.item7, AppTools.item8]}
          />
        </>
      }
    />;

  public render() {
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

  private _horizontalToolbar =
    <Toolbar
      expandsTo={Direction.Bottom}
      items={
        <>
          <ToolButton toolId="item5" iconSpec="icon-placeholder" labelKey="SampleApp:buttons.item5" />
          <ToolButton toolId="item6" iconSpec="icon-placeholder" labelKey="SampleApp:buttons.item6" />
          <ToolButton toolId="item7" iconSpec="icon-placeholder" labelKey="SampleApp:buttons.item7" />
        </>
      }
    />;

  private _verticalToolbar =
    <Toolbar
      expandsTo={Direction.Right}
      items={
        <>
          <ToolButton toolId="item8" iconSpec="icon-placeholder" labelKey="SampleApp:buttons.item8" />
        </>
      }
    />;

  public render() {
    return (
      <NavigationWidget
        navigationAidId="StandardRotationNavigationAid"
        horizontalToolbar={this._horizontalToolbar}
        verticalToolbar={this._verticalToolbar}
      />
    );
  }
}
