/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { IconSpecUtilities } from "@itwin/appui-abstract";

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
import { UnitsPopupUiDataProvider } from "../dialogs/UnitsPopup";
import { IModelApp } from "@itwin/core-frontend";
import { UiItemsProvidersTest } from "../../ui-items-providers-test";
import { OpenAbstractDialogTool } from "../../tools/OpenAbstractModalDialogTool";
import statusFieldSvg from "../icons/StatusField.svg";

/**
 * The GeneralUiItemsProvider provides additional items to any frontstage that has a usage value of StageUsage.General.
 * NOTE: All items provided by this provider use abstract definitions and do not rely on React.
 */
export class GeneralUiItemsProvider implements UiItemsProvider {
  public readonly id = "GeneralUiItemsProvider";

  public provideToolbarItems(_stageId: string, stageUsage: string, toolbarUsage: ToolbarUsage, toolbarOrientation: ToolbarOrientation): ToolbarItem[] {
    /** Add a tool that displays tool settings  */
    if (stageUsage === StageUsage.General && toolbarUsage === ToolbarUsage.ContentManipulation && toolbarOrientation === ToolbarOrientation.Horizontal) {
      return [SampleTool.getActionButtonDef(1000)];
    }
    /** Add a tool that opens a dialog box  */
    if (stageUsage === StageUsage.General && toolbarUsage === ToolbarUsage.ContentManipulation && toolbarOrientation === ToolbarOrientation.Vertical) {
      return [OpenAbstractDialogTool.getActionButtonDef(10.1)];
    }

    return [];
  }

  public provideStatusBarItems(_stageId: string, stageUsage: string): StatusBarItem[] {
    const unitsIcon = IconSpecUtilities.createWebComponentIconSpec(statusFieldSvg);
    const statusBarItems: StatusBarItem[] = [];
    if (stageUsage === StageUsage.General) {
      statusBarItems.push(
        /** Add a status bar item to set the active unit system used to display quantity values.  */
        StatusBarItemUtilities.createActionItem("UiItemsProvidersTest:UnitsStatusBarItem", StatusBarSection.Center, 100,
          unitsIcon, UiItemsProvidersTest.translate("StatusBar.UnitsFlyover"),
          () => {
            IModelApp.uiAdmin.openDialog(new UnitsPopupUiDataProvider(), UiItemsProvidersTest.translate("StatusBar.Units"),
              true, "uiItemsProvidersTest:units-popup", { movable: true, width: 280, minWidth: 280 });
          }
        ));
    }
    return statusBarItems;
  }

}
