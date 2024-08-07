/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
  StageUsage,
  StatusBarItem,
  StatusBarItemUtilities,
  StatusBarSection,
  ToolbarItem,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
} from "@itwin/appui-react";
import { SampleTool } from "../../tools/SampleTool";
import { AppUiTestProviders } from "../../AppUiTestProviders";
import { OpenAbstractDialogTool } from "../../tools/OpenAbstractModalDialogTool";
import { ToolWithDynamicSettings } from "../../tools/ToolWithDynamicSettings";
import { UnitsField } from "../statusfields/unitsfield/UnitsField";

export interface AbstractUiItemsProviderProps {
  sampleTool?: { itemPriority?: number; groupPriority?: number };
  dynamicTool?: { itemPriority?: number; groupPriority?: number };
  openAbstractDialogTool?: { itemPriority?: number; groupPriority?: number };
  unitsStatusBarItem?: { itemPriority?: number; section?: StatusBarSection };
}

/**
 * The AbstractUiItemsProvider provides additional items to any frontstage that has a usage value of StageUsage.General.
 * The unique thing about the items provided with this provider is that the toolbar and and statusbar items provider simply
 * provide abstract item data and the UI packages generate the necessary React components. This means that the package that
 * supplies the abstract definitions only need to take a dependency on appui-abstract and not on react or any of the other appui packages.
 */
export class AbstractUiItemsProvider implements UiItemsProvider {
  public readonly id = "appui-test-providers:AbstractUiItemsProvider";

  constructor(
    localizationNamespace: string,
    public props?: AbstractUiItemsProviderProps
  ) {
    // register tools that will be returned via this provider
    OpenAbstractDialogTool.register(localizationNamespace);
    SampleTool.register(localizationNamespace);
    ToolWithDynamicSettings.register(localizationNamespace);
  }

  public provideToolbarItems(
    _stageId: string,
    stageUsage: string,
    toolbarUsage: ToolbarUsage,
    toolbarOrientation: ToolbarOrientation
  ): ToolbarItem[] {
    /** Add a tool that displays tool settings  */
    if (
      stageUsage === StageUsage.General.valueOf() &&
      toolbarUsage === ToolbarUsage.ContentManipulation &&
      toolbarOrientation === ToolbarOrientation.Horizontal
    ) {
      return [
        SampleTool.getActionButtonDef(
          this.props?.sampleTool?.itemPriority ?? 1000,
          this.props?.sampleTool?.groupPriority
        ),
        ToolWithDynamicSettings.getActionButtonDef(
          this.props?.dynamicTool?.itemPriority ?? 1001,
          this.props?.dynamicTool?.groupPriority
        ),
      ];
    }
    /** Add a tool that opens a dialog box  */
    if (
      stageUsage === StageUsage.General.valueOf() &&
      toolbarUsage === ToolbarUsage.ContentManipulation &&
      toolbarOrientation === ToolbarOrientation.Vertical
    ) {
      return [
        OpenAbstractDialogTool.getActionButtonDef(
          this.props?.openAbstractDialogTool?.itemPriority ?? 10.1,
          this.props?.openAbstractDialogTool?.groupPriority
        ),
      ];
    }

    return [];
  }

  public provideStatusBarItems(
    _stageId: string,
    stageUsage: string
  ): StatusBarItem[] {
    const statusBarItems: StatusBarItem[] = [];
    if (stageUsage === StageUsage.General.valueOf()) {
      statusBarItems.push(
        /** Add a status bar item that will open a dialog allow the user to set the active unit system used to display quantity values.  */
        StatusBarItemUtilities.createCustomItem({
          id: "AppUiTestProviders:UnitsStatusBarItem",
          section:
            this.props?.unitsStatusBarItem?.section ?? StatusBarSection.Center,
          itemPriority: this.props?.unitsStatusBarItem?.itemPriority ?? 100,
          content: (
            <UnitsField
              label={AppUiTestProviders.translate("StatusBar.UnitsFlyover")}
              title={AppUiTestProviders.translate("StatusBar.Units")}
              options={[
                {
                  label: AppUiTestProviders.translate("StatusBar.Metric"),
                  value: "metric",
                },
                {
                  label: AppUiTestProviders.translate("StatusBar.Imperial"),
                  value: "imperial",
                },
                {
                  label: AppUiTestProviders.translate("StatusBar.UsSurvey"),
                  value: "usSurvey",
                },
                {
                  label: AppUiTestProviders.translate("StatusBar.UsCustomary"),
                  value: "usCustomary",
                },
              ]}
            />
          ),
        })
      );
    }
    return statusBarItems;
  }
}
