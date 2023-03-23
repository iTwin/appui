/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */
import * as React from "react";
import {
  ActionItemButton,
  CommandItemDef,
  ContentGroup,
  CoreTools,
  Frontstage,
  FrontstageDef,
  FrontstageProps,
  FrontstageProvider,
  GroupButton,
  NavigationWidget,
  NestedFrontstage,
  ToolbarGroupItem,
  ToolButton,
  ToolWidget,
  UiFramework,
  Widget,
  WidgetState,
  Zone,
  ZoneLocation,
  ZoneState,
} from "@itwin/appui-react";
import { Direction, Toolbar } from "@itwin/appui-layout-react";
import { AppTools } from "../../tools/ToolSpecifications";
import { SmallStatusBarWidgetControl } from "../statusbars/SmallStatusBar";
import { HorizontalPropertyGridWidgetControl, VerticalPropertyGridWidgetControl } from "../widgets/PropertyGridDemoWidget";
import { NestedFrontstage2 } from "./NestedFrontstage2";
import { AppUi } from "../AppUi";
import { TestModalDialog } from "../dialogs/TestModalDialog";

/* eslint-disable react/jsx-key */

export class NestedFrontstage1 extends FrontstageProvider {
  public static stageId = "ui-test-app:NestedFrontstage1";

  public get id(): string {
    return NestedFrontstage1.stageId;
  }

  public get frontstage(): React.ReactElement<FrontstageProps> {
    const contentGroup = new ContentGroup(AppUi.TestContentGroup1);

    return {
      id: this.id,
      contentGroup: contentGroup,

      contentManipulation: {
        content: <FrontstageToolWidget />,
      },

      toolSettings: {},

      viewNavigation: {
        content: <FrontstageNavigationWidget />,
      },

      statusBar: {
        icon: "icon-placeholder",
        labelKey: "SampleApp:widgets.StatusBar",
      },

      rightPanel: {
        sections: {
          end: [{
            defaultState: WidgetState.Closed,
            icon: "icon-placeholder",
            labelKey: "SampleApp:widgets.HorizontalPropertyGrid",
          }, {
            id: "VerticalPropertyGrid",
            defaultState: WidgetState.Hidden,
            icon: "icon-placeholder",
            labelKey: "SampleApp:widgets.VerticalPropertyGrid",
          }],
        },
      },
    };
  }
}

/** Define a ToolWidget with Buttons to display in the TopLeft zone.
 */
class FrontstageToolWidget extends React.Component {
  private static _frontstage2Def: FrontstageDef | undefined;
  private static async getFrontstage2Def() {
    if (!this._frontstage2Def) {
      const frontstageProvider = new NestedFrontstage2();
      this._frontstage2Def = await FrontstageDef.create(frontstageProvider);
    }
    return this._frontstage2Def;
  }

  /** Command that opens a nested Frontstage */
  private get _openNestedFrontstage2() {
    return new CommandItemDef({
      iconSpec: "icon-placeholder",
      labelKey: "SampleApp:buttons.openNestedFrontstage2",
      execute: async () => {
        const frontstage2Def = await FrontstageToolWidget.getFrontstage2Def();
        await UiFramework.frontstages.openNestedFrontstage(frontstage2Def);
      },
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
    <Toolbar // eslint-disable-line deprecation/deprecation
      expandsTo={Direction.Bottom} // eslint-disable-line deprecation/deprecation
      items={
        <>
          <ActionItemButton actionItem={CoreTools.selectElementCommand} />
          <ActionItemButton actionItem={AppTools.item1} />
          <ActionItemButton actionItem={AppTools.item2} />
          <ActionItemButton actionItem={this._openNestedFrontstage2} />
          <ActionItemButton actionItem={this._openModal} />
        </>
      }
    />);

  private _verticalToolbar = (
    <Toolbar // eslint-disable-line deprecation/deprecation
      expandsTo={Direction.Right} // eslint-disable-line deprecation/deprecation
      items={
        <>
          <ActionItemButton actionItem={CoreTools.rotateViewCommand} />
          <ToolButton toolId={AppTools.tool1.id} iconSpec={AppTools.tool1.iconSpec} labelKey={AppTools.tool1.label} execute={AppTools.tool1.execute} />
          <ToolButton toolId={AppTools.tool2.id} iconSpec={AppTools.tool2.iconSpec} labelKey={AppTools.tool2.label} execute={AppTools.tool2.execute} />
          <ToolbarGroupItem
            labelKey="SampleApp:buttons.anotherGroup"
            iconSpec="icon-placeholder"
            items={[AppTools.tool1, AppTools.tool2, AppTools.item3, AppTools.item4, AppTools.item5, AppTools.item6, AppTools.item7, AppTools.item8]}
          />
        </>
      }
    />
  );

  public override render() {
    return (
      <ToolWidget // eslint-disable-line deprecation/deprecation
        appButton={NestedFrontstage.backToPreviousFrontstageCommand}
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
    <Toolbar // eslint-disable-line deprecation/deprecation
      expandsTo={Direction.Bottom} // eslint-disable-line deprecation/deprecation
      items={
        <>
          <ToolButton toolId={AppTools.item5.id} iconSpec={AppTools.item5.iconSpec} labelKey={AppTools.item5.label} execute={AppTools.item5.execute} />
          <ToolButton toolId={AppTools.item6.id} iconSpec={AppTools.item6.iconSpec} labelKey={AppTools.item6.label} execute={AppTools.item6.execute} />
        </>
      }
    />
  );

  private _verticalToolbar = (
    <Toolbar // eslint-disable-line deprecation/deprecation
      expandsTo={Direction.Left} // eslint-disable-line deprecation/deprecation
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
      // eslint-disable-next-line deprecation/deprecation
      (<NavigationWidget
        navigationAidId="StandardRotationNavigationAid"
        horizontalToolbar={this._horizontalToolbar}
        verticalToolbar={this._verticalToolbar}
      />)
    );
  }
}
