/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { IModelApp } from "@itwin/core-frontend";
import { CommonToolbarItem, ConditionalBooleanValue, IconSpecUtilities, StageUsage, ToolbarItemUtilities, WidgetState } from "@itwin/appui-abstract";
import {
  AccuDrawDialog, AccuDrawWidgetControl, BasicNavigationWidget, BasicToolWidget, CommandItemDef,
  CoreTools, CustomItemDef, FrontstageConfig, FrontstageProvider, IModelConnectedViewSelector, ModelessDialogManager,
  ToolbarHelper,
} from "@itwin/appui-react";
import { SampleAppIModelApp, SampleAppUiActionId } from "../../../../frontend/index";
import { EditTools } from "../../../tools/editing/ToolSpecifications";
// cSpell:Ignore statusbars
import { Orientation } from "@itwin/core-react";

import sketchIconSvg from "../../icons/draw.svg";
import { InitialIModelContentStageProvider } from "../ViewsFrontstage";

export class EditFrontstage extends FrontstageProvider {
  private _contentGroupProvider = new InitialIModelContentStageProvider(true);
  public static stageId = "EditFrontstage";
  public override get id(): string {
    return EditFrontstage.stageId;
  }

  private _additionalTools = new AdditionalTools();

  public static savedViewLayoutProps: string;

  /** Get the CustomItemDef for ViewSelector  */
  private get _viewSelectorItemDef() {
    return new CustomItemDef({
      customId: "sampleApp:viewSelector",
      popupPanelNode: (
        <IModelConnectedViewSelector
          listenForShowUpdates={false}  // Demo for showing only the same type of view in ViewSelector - See IModelViewport.tsx, onActivated
        />
      ),
    });
  }

  private get _additionalNavigationVerticalToolbarItems() {
    return [
      ToolbarHelper.createToolbarItemFromItemDef(200, this._viewSelectorItemDef)];
  }

  public override frontstageConfig(): FrontstageConfig {
    return {
      id: this.id,
      version: 1,
      contentGroup: this._contentGroupProvider,
      usage: StageUsage.Edit,
      contentManipulation: {
        id: "contentManipulation",
        content: <BasicToolWidget additionalHorizontalItems={this._additionalTools.additionalHorizontalToolbarItems}
          additionalVerticalItems={this._additionalTools.additionalVerticalToolbarItems} showCategoryAndModelsContextTools={false} />,
      },
      toolSettings: {
        id: "toolSettings",
        icon: "icon-placeholder",
      },
      viewNavigation: {
        id: "viewNavigation",
        content: <BasicNavigationWidget additionalVerticalItems={this._additionalNavigationVerticalToolbarItems} />,
      },
      statusBar: {
        id: "statusBar",
      },
      leftPanel: {
        size: 250,
        sections: {
          start: [
            {
              id: "ActiveSettings",
              defaultState: WidgetState.Closed,
              icon: "icon-active",
              labelKey: "SampleApp:widgets.ActiveSettings",
            },
            {
              id: "ModelCreation",
              defaultState: WidgetState.Closed,
              icon: "icon-add",
              labelKey: "SampleApp:widgets.ModelCreation",
            },
          ],
        },
      },
      bottomPanel: {
        sections: {
          start: [
            { id: AccuDrawWidgetControl.id, label: AccuDrawWidgetControl.label },
          ],
        },
      },
    };
  }
}

/** Define a ToolWidget with Buttons to display in the TopLeft zone.
 */
class AdditionalTools {
  public sketchGroupItems = ToolbarHelper.constructChildToolbarItems([
    EditTools.placeLineStringTool, EditTools.placeArcTool]);

  public sketchGroupButtonItem = ToolbarItemUtilities.createGroupButton("SampleApp:buttons.sketch", 135, IconSpecUtilities.createWebComponentIconSpec(sketchIconSvg),
    IModelApp.localization.getLocalizedString("SampleApp:buttons.sketch"), this.sketchGroupItems);

  public additionalHorizontalToolbarItems: CommonToolbarItem[] = [...ToolbarHelper.createToolbarItemsFromItemDefs([
    CoreTools.keyinPaletteButtonItemDef, EditTools.deleteElementTool,
    EditTools.moveElementTool, EditTools.rotateElementTool, EditTools.placeBlockTool], 100),
  this.sketchGroupButtonItem];

  private get _accudrawDialogItemVertical() {
    const dialogId = "accudraw-vertical";
    return new CommandItemDef({
      iconSpec: "icon-placeholder",
      labelKey: "SampleApp:buttons.accuDrawDialogVertical",
      execute: () => {
        ModelessDialogManager.openDialog(
          <AccuDrawDialog
            opened={true}
            dialogId={dialogId}
            orientation={Orientation.Vertical}
            onClose={() => ModelessDialogManager.closeDialog(dialogId)}
          />, dialogId);
      },
    });
  }

  private get _accudrawDialogItemHorizontal() {
    const dialogId = "accudraw-horizontal";
    return new CommandItemDef({
      iconSpec: "icon-placeholder",
      labelKey: "SampleApp:buttons.accuDrawDialogHorizontal",
      execute: () => {
        ModelessDialogManager.openDialog(
          <AccuDrawDialog
            opened={true}
            dialogId={dialogId}
            orientation={Orientation.Horizontal}
            onClose={() => ModelessDialogManager.closeDialog(dialogId)}
          />, dialogId);
      },
    });
  }

  public getMiscGroupItem = (): CommonToolbarItem => {
    const children = ToolbarHelper.constructChildToolbarItems([
      this._accudrawDialogItemVertical, this._accudrawDialogItemHorizontal,
    ]);

    const groupHiddenCondition = new ConditionalBooleanValue(() => SampleAppIModelApp.getTestProperty() === "HIDE", [SampleAppUiActionId.setTestProperty]);
    const item = ToolbarItemUtilities.createGroupButton("SampleApp:buttons.misc", 130, "icon-tools", IModelApp.localization.getLocalizedString("SampleApp:buttons.misc"), children, { isHidden: groupHiddenCondition });
    return item;
  };

  // test ToolbarHelper.createToolbarItemsFromItemDefs
  public additionalVerticalToolbarItems: CommonToolbarItem[] = [this.getMiscGroupItem()];
}
