/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
  StatusBarItem,
  StatusBarItemUtilities,
  StatusBarSection,
  ToolbarItem,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
} from "@itwin/appui-react";
import { SampleTool } from "../../tools/SampleTool.js";
import { AppUiTestProviders } from "../../AppUiTestProviders.js";
import { OpenAbstractDialogTool } from "../../tools/OpenAbstractModalDialogTool.js";
import { ToolWithDynamicSettings } from "../../tools/ToolWithDynamicSettings.js";
import { UnitsField } from "../statusfields/unitsfield/UnitsField.js";

/** The AbstractUiItemsProvider provides additional items to any frontstage that has a usage value of StageUsage.General.
 * The unique thing about the items provided with this provider is that the toolbar and and statusbar items provider simply
 * provide abstract item data and the UI packages generate the necessary React components. This means that the package that
 * supplies the abstract definitions only need to take a dependency on appui-abstract and not on react or any of the other appui packages.
 */
export class AbstractUiItemsProvider implements UiItemsProvider {
  public readonly id = "appui-test-providers:AbstractUiItemsProvider";

  public getToolbarItems(): readonly ToolbarItem[] {
    const horizontal = {
      standard: {
        usage: ToolbarUsage.ContentManipulation,
        orientation: ToolbarOrientation.Horizontal,
      },
    };
    return [
      ToolbarItemUtilities.createForTool(SampleTool, {
        itemPriority: 1000,
        layouts: horizontal,
      }),
      ToolbarItemUtilities.createForTool(ToolWithDynamicSettings, {
        itemPriority: 1001,
        layouts: horizontal,
      }),
      ToolbarItemUtilities.createForTool(OpenAbstractDialogTool, {
        itemPriority: 10.1,
        layouts: {
          standard: {
            usage: ToolbarUsage.ContentManipulation,
            orientation: ToolbarOrientation.Vertical,
          },
        },
      }),
    ];
  }

  public getStatusBarItems(): readonly StatusBarItem[] {
    return [
      /** Add a status bar item that will open a dialog allowing the user to set the active unit system used to display quantity values. */
      StatusBarItemUtilities.createCustomItem({
        id: "AppUiTestProviders:UnitsStatusBarItem",
        section: StatusBarSection.Center,
        itemPriority: 100,
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
      }),
    ];
  }
}
