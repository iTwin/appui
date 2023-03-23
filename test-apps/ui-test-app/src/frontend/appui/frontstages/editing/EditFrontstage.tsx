/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { IModelApp } from "@itwin/core-frontend";
import { ConditionalBooleanValue, IconSpecUtilities } from "@itwin/appui-abstract";
import {
  AccuDrawDialog,
  AccuDrawWidgetControl,
  BasicNavigationWidget,
  BasicToolWidget,
  CommandItemDef,
  CoreTools,
  CustomItemDef,
  Frontstage,
  FrontstageProvider,
  IModelConnectedViewSelector,
  StagePanel,
  StageUsage,
  ToolbarHelper,
  ToolbarItem,
  ToolbarItemUtilities,
  Widget,
  WidgetState,
  Zone,
  ZoneLocation,
  ZoneState,
} from "@itwin/appui-react";
import { SampleAppIModelApp, SampleAppUiActionId } from "../../../../frontend/index";
import { EditTools } from "../../../tools/editing/ToolSpecifications";
// cSpell:Ignore contentviews statusbars
import { EditStatusBarWidgetControl } from "../../statusbars/editing/EditStatusBar";
import { ActiveSettingsWidget } from "../../widgets/editing/ActiveSettingsWidget";
import { ModelCreationWidget } from "../../widgets/editing/ModelCreationWidget";
import { Orientation } from "@itwin/core-react";

/* eslint-disable react/jsx-key, deprecation/deprecation */

import sketchIconSvg from "../../icons/draw.svg?sprite";
import { InitialIModelContentStageProvider } from "../ViewsFrontstage";

export class EditFrontstage extends FrontstageProvider {
  private _contentGroupProvider = new InitialIModelContentStageProvider(true);
  public static stageId = "EditFrontstage";
  public get id(): string {
    return EditFrontstage.stageId;
  }

  private _additionalTools = new AdditionalTools();

  public static savedViewLayoutProps: string;

  private _bottomPanel = {
    widgets: [
      <Widget id={AccuDrawWidgetControl.id} label={AccuDrawWidgetControl.label} control={AccuDrawWidgetControl} />,
    ],
  };

  /** Get the CustomItemDef for ViewSelector  */
  private get _viewSelectorItemDef() {
    return new CustomItemDef({
      customId: "sampleApp:viewSelector",
      reactElement: (
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

  public get frontstage() {
    return {
      id: this.id,
      contentGroup: this._contentGroupProvider,
      usage: StageUsage.Edit,

      contentManipulation: {
        content: <BasicToolWidget additionalHorizontalItems={this._additionalTools.additionalHorizontalToolbarItems}
          additionalVerticalItems={this._additionalTools.additionalVerticalToolbarItems} showCategoryAndModelsContextTools={false} />,
      },

      toolSettings: {
        icon: "icon-placeholder",
      },

      viewNavigation: {
        content: <BasicNavigationWidget additionalVerticalItems={this._additionalNavigationVerticalToolbarItems} />,
      },

      statusBar: {},

      bottomPanel: {
        sections: {
          start: [...this._bottomPanel.widgets],
        },
      },

      rightPanel: {},

      leftPanel: {
        sections: {
          start: [{
            defaultState: WidgetState.Closed,
            icon: "icon-active",
            labelKey: "SampleApp:widgets.ActiveSettings",
            syncEventIds: [SampleAppUiActionId.setTestProperty],
            stateFunc: (): WidgetState => SampleAppIModelApp.getTestProperty() !== "HIDE" ? WidgetState.Closed : WidgetState.Hidden,
          }, {
            defaultState: WidgetState.Closed,
            icon: "icon-add",
            labelKey: "SampleApp:widgets.ModelCreation",
            syncEventIds: [SampleAppUiActionId.setTestProperty],
            stateFunc: (): WidgetState => SampleAppIModelApp.getTestProperty() !== "HIDE" ? WidgetState.Closed : WidgetState.Hidden,
          }],
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

  public sketchGroupButtonItem = ToolbarItemUtilities.createGroupItem("SampleApp:buttons.sketch", 135, IconSpecUtilities.createSvgIconSpec(sketchIconSvg),
    IModelApp.localization.getLocalizedString("SampleApp:buttons.sketch"), this.sketchGroupItems);

  public additionalHorizontalToolbarItems: ToolbarItem[] = [...ToolbarHelper.createToolbarItemsFromItemDefs([
    CoreTools.keyinPaletteButtonItemDef, EditTools.deleteElementTool,
    EditTools.moveElementTool, EditTools.rotateElementTool, EditTools.placeBlockTool], 100),
  this.sketchGroupButtonItem];

  private get _accudrawDialogItemVertical() {
    const dialogId = "accudraw-vertical";
    return new CommandItemDef({
      iconSpec: "icon-placeholder",
      labelKey: "SampleApp:buttons.accuDrawDialogVertical",
      execute: () => {
        UiFramework.dialogs.modeless.open(
          <AccuDrawDialog
            opened={true}
            dialogId={dialogId}
            orientation={Orientation.Vertical}
            onClose={() => UiFramework.dialogs.modeless.close(dialogId)}
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
        UiFramework.dialogs.modeless.open(
          <AccuDrawDialog
            opened={true}
            dialogId={dialogId}
            orientation={Orientation.Horizontal}
            onClose={() => UiFramework.dialogs.modeless.close(dialogId)}
          />, dialogId);
      },
    });
  }

  public getMiscGroupItem = (): ToolbarItem => {
    const children = ToolbarHelper.constructChildToolbarItems([
      this._accudrawDialogItemVertical, this._accudrawDialogItemHorizontal,
    ]);

    const groupHiddenCondition = new ConditionalBooleanValue(() => SampleAppIModelApp.getTestProperty() === "HIDE", [SampleAppUiActionId.setTestProperty]);
    const item = ToolbarItemUtilities.createGroupItem("SampleApp:buttons.misc", 130, "icon-tools", IModelApp.localization.getLocalizedString("SampleApp:buttons.misc"), children, { isHidden: groupHiddenCondition });
    return item;
  };

  // test ToolbarHelper.createToolbarItemsFromItemDefs
  public additionalVerticalToolbarItems: ToolbarItem[] = [this.getMiscGroupItem()];
}
