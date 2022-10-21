/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { CommonToolbarItem, StandardContentLayouts, ToolbarItemUtilities, ToolbarOrientation, ToolbarUsage, WidgetState } from "@itwin/appui-abstract";
import {
  ContentGroup, CoreTools, Frontstage, FrontstageProps, FrontstageProvider, IModelViewportControl, NavigationAidHost,
  NavigationWidgetComposer, StagePanel, ToolbarComposer, ToolbarHelper, ToolWidgetComposer, UiFramework, Widget,
} from "@itwin/appui-react";
import { AppTools } from "../../tools/ToolSpecifications";
import { IModelViewportControl as App_IModelViewport } from "../contentviews/IModelViewport";
import { SmallStatusBarWidgetControl } from "../statusbars/SmallStatusBar";
import { NavigationTreeWidgetControl } from "../widgets/NavigationTreeWidget";
import { HorizontalPropertyGridWidgetControl, VerticalPropertyGridWidgetControl } from "../widgets/PropertyGridDemoWidget";
import { TableDemoWidgetControl } from "../widgets/TableDemoWidget";
import { ReactTableDemoContentControl } from "../table-demo/ReactTableDemo";
import { AppToolbarUtilities } from "./NestedFrontstage1";
import { IModelApp } from "@itwin/core-frontend";

export class Frontstage3 extends FrontstageProvider {
  public static stageId = "ui-test-app:Test3";

  public get id(): string {
    return Frontstage3.stageId;
  }

  private getDefaultViewState = () => {
    return UiFramework.getDefaultViewState()?.clone();
  };

  public get frontstage(): React.ReactElement<FrontstageProps> {

    const myContentGroup: ContentGroup = new ContentGroup(
      {
        id: "ui-test-app:Frontstage3ContentGroup",
        layout: StandardContentLayouts.fourQuadrants,
        contents: [
          {
            id: "imodelView1",
            classId: IModelViewportControl.id,
            applicationData: { viewState: UiFramework.getDefaultViewState, iModelConnection: UiFramework.getIModelConnection },
          },
          {
            id: "reactTableView",
            classId: ReactTableDemoContentControl,
          },
          {
            id: "imodelView2",
            classId: App_IModelViewport.id,
            applicationData: { viewState: this.getDefaultViewState, iModelConnection: UiFramework.getIModelConnection },
          },
          {
            id: "oldTableView",
            classId: "TableExampleContent",
          },
        ],
      },
    );

    return (
      <Frontstage
        id={this.id}
        defaultTool={CoreTools.selectElementCommand}
        contentGroup={myContentGroup}
        contentManipulation={
          <Widget isFreeform={true} element={this.getToolWidget()} />
        }
        toolSettings={
          <Widget isToolSettings={true} />
        }
        viewNavigation={
          <Widget isFreeform={true} element={this.getNavigationWidget()} />
        }
        rightPanel={
          <StagePanel
            sections={{
              start: {
                widgets: [
                  <Widget key={0} iconSpec="icon-placeholder" labelKey="SampleApp:widgets.NavigationTree" control={NavigationTreeWidgetControl} />,
                ],
              },
              end: {
                widgets: [
                  <Widget key={0} id="VerticalPropertyGrid" defaultState={WidgetState.Hidden} iconSpec="icon-placeholder" labelKey="SampleApp:widgets.VerticalPropertyGrid" control={VerticalPropertyGridWidgetControl} />,
                  <Widget key={1} defaultState={WidgetState.Open} iconSpec="icon-placeholder" labelKey="SampleApp:widgets.HorizontalPropertyGrid" control={HorizontalPropertyGridWidgetControl} />,
                ],
              },
            }}
          />
        }
        leftPanel={
          <StagePanel
            sections={{
              end: {
                widgets: [
                  <Widget key={0} iconSpec="icon-placeholder" labelKey="SampleApp:widgets.TableDemo" control={TableDemoWidgetControl} />,
                ],
              },
            }}
          />
        }
        statusBar={
          <Widget isStatusBar={true} control={SmallStatusBarWidgetControl} />
        }
      />
    );
  }

  /** Define a ToolWidget with Buttons to display in the TopLeft zone.
   */
  private getToolWidget(): React.ReactNode {
    const horizontalItems: CommonToolbarItem[] = [
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item1),
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item2),
      ToolbarItemUtilities.createGroupButton("SampleApp:buttons.toolGroup", 10, "icon-placeholder", IModelApp.localization.getLocalizedString("SampleApp:buttons.toolGroup"), [
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.tool1),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.tool2),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.infoMessageCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.warningMessageCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.errorMessageCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.noIconMessageCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item6),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item7),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item8),
      ]),
    ];

    const verticalItems: CommonToolbarItem[] = [
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.tool1),
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.tool2),
      ToolbarItemUtilities.createGroupButton("SampleApp:buttons.toolGroup", 10, "icon-placeholder", IModelApp.localization.getLocalizedString("SampleApp:buttons.toolGroup"), [
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.successMessageBoxCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.informationMessageBoxCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.questionMessageBoxCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.warningMessageBoxCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.errorMessageBoxCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.openMessageBoxCommand2),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.openMessageBoxCommand3),
      ]),
    ];

    return (
      <ToolWidgetComposer
        cornerItem={AppTools.backstageToggleCommand}
        verticalToolbar={<ToolbarComposer items={verticalItems} usage={ToolbarUsage.ContentManipulation} orientation={ToolbarOrientation.Vertical} />}
        horizontalToolbar={<ToolbarComposer items={horizontalItems} usage={ToolbarUsage.ContentManipulation} orientation={ToolbarOrientation.Horizontal} />}
      />
    );
  }

  /** Define a NavigationWidget with Buttons to display in the TopRight zone.
   */
  private getNavigationWidget(): React.ReactNode {

    const horizontalItems: CommonToolbarItem[] = [
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item5),
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item6),
      ToolbarItemUtilities.createGroupButton("SampleApp:buttons.toolGroup", 10, "icon-placeholder", IModelApp.localization.getLocalizedString("SampleApp:buttons.toolGroup"), [
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.infoMessageCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.warningMessageCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.errorMessageCommand),
      ]),
    ];

    const verticalItems: CommonToolbarItem[] = [
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item7),
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item8),
    ];

    return (
      <NavigationWidgetComposer
        navigationAidHost={<NavigationAidHost />} // CubeNavigationAid
        verticalToolbar={<ToolbarComposer items={verticalItems} usage={ToolbarUsage.ViewNavigation} orientation={ToolbarOrientation.Vertical} />}
        horizontalToolbar={<ToolbarComposer items={horizontalItems} usage={ToolbarUsage.ViewNavigation} orientation={ToolbarOrientation.Horizontal} />}
      />
    );
  }
}
