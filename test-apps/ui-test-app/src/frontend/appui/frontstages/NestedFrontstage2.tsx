/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { CommonToolbarItem, ToolbarItemUtilities } from "@itwin/appui-abstract";
import {
  ContentGroup, CoreTools, FrontstageConfig, FrontstageProvider, NavigationAidHost, NavigationWidgetComposer,
  ToolbarComposer, ToolbarHelper, ToolbarOrientation, ToolbarUsage, ToolWidgetComposer, WidgetState,
} from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";

import { AppTools } from "../../tools/ToolSpecifications";
import { AppUi } from "../AppUi";
import { AppToolbarUtilities, BackstageBackButton } from "./NestedFrontstage1";

export class NestedFrontstage2 extends FrontstageProvider {
  public static stageId = "ui-test-app:NestedFrontstage2";

  public override get id(): string {
    return NestedFrontstage2.stageId;
  }

  public override frontstageConfig(): FrontstageConfig {
    const contentGroup = new ContentGroup(AppUi.TestContentGroup2);
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
        icon: "icon-placeholder",
        labelKey: "SampleApp:widgets.StatusBar",
      },
      rightPanel: {
        sections: {
          end: [
            { id: "HorizontalPropertyGrid", defaultState: WidgetState.Closed, icon: "icon-placeholder", labelKey: "SampleApp:widgets.HorizontalPropertyGrid" },
            { id: "VerticalPropertyGrid", defaultState: WidgetState.Hidden, icon: "icon-placeholder", labelKey: "SampleApp:widgets.VerticalPropertyGrid" },
          ],
        },
      },
    };
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
