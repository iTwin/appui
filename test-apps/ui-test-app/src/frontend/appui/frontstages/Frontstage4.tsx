/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { IModelApp, NotifyMessageDetails, OutputMessagePriority } from "@itwin/core-frontend";
import {
  CommonToolbarItem,
  DialogButtonDef, DialogButtonType, DialogItem, DialogItemValue, DialogLayoutDataProvider, DialogPropertyItem, DialogPropertySyncItem,
  PropertyChangeResult, PropertyChangeStatus, PropertyDescription, StandardContentLayouts, StandardTypeNames, ToolbarItemUtilities, ToolbarOrientation, ToolbarUsage, WidgetState,
} from "@itwin/appui-abstract";
import {
  BackstageAppButton,
  CommandItemDef, ContentGroup, FrontstageConfig, FrontstageProvider, ModalDialogManager,
  ModelessDialogManager, NavigationAidHost, NavigationWidgetComposer, StagePanelState, ToolbarComposer, ToolbarHelper, ToolWidgetComposer,
} from "@itwin/appui-react";
import { AppTools } from "../../tools/ToolSpecifications";
import { PopupTestDialog } from "../dialogs/PopupTest";
import { SampleModalDialog } from "../dialogs/SampleModalDialog";
import { SampleModelessDialog } from "../dialogs/SampleModelessDialog";
import { SpinnerTestDialog } from "../dialogs/SpinnerTestDialog";
import { TestModalDialog } from "../dialogs/TestModalDialog";
import { TestModalDialog2 } from "../dialogs/TestModalDialog2";
import { TestRadialMenu } from "../dialogs/TestRadialMenu";
import { TestUiProvider } from "../dialogs/TestUiProviderDialog";
import { AppToolbarUtilities } from "./NestedFrontstage1";
import { IconHelper } from "@itwin/core-react";

class DynamicModalUiDataProvider extends DialogLayoutDataProvider {
  public currentPageIndex = 0;
  public numberOfPages = 2;
  public static userPropertyName = "username";
  private static _getUserDescription = (): PropertyDescription => {
    return {
      name: DynamicModalUiDataProvider.userPropertyName,
      displayLabel: "User",
      typename: StandardTypeNames.String,
    };
  };

  private _userValue: DialogItemValue = { value: "unknown" };
  private get user(): string {
    return this._userValue.value as string;
  }
  private set user(option: string) {
    this._userValue.value = option;
  }

  public static cityPropertyName = "city";
  private static _getCityDescription = (): PropertyDescription => {
    return {
      name: DynamicModalUiDataProvider.cityPropertyName,
      displayLabel: "City",
      typename: StandardTypeNames.String,
    };
  };

  private _cityValue: DialogItemValue = { value: "unknown" };
  private get city(): string {
    return this._cityValue.value as string;
  }
  private set city(option: string) {
    this._cityValue.value = option;
  }

  // called to apply a single property value change.
  public override applyUiPropertyChange = (updatedValue: DialogPropertySyncItem): void => {
    this.processChangesInUi([updatedValue]);
  };

  /** Called by UI to inform data provider of changes.  */
  public override processChangesInUi(properties: DialogPropertyItem[]): PropertyChangeResult {
    if (properties.length > 0) {
      for (const prop of properties) {
        if (prop.propertyName === DynamicModalUiDataProvider.userPropertyName) {
          this.user = prop.value.value ? prop.value.value as string : "";
          continue;
        } else if (prop.propertyName === DynamicModalUiDataProvider.cityPropertyName) {
          this.city = prop.value.value ? prop.value.value as string : "";
          continue;
        }
      }
    }

    this.fireDialogButtonsReloadEvent();
    return { status: PropertyChangeStatus.Success };
  }

  /** Used Called by UI to request available properties when UI is manually created. */
  public override supplyDialogItems(): DialogItem[] | undefined {
    const items: DialogItem[] = [];

    items.push({ value: this._userValue, property: DynamicModalUiDataProvider._getUserDescription(), editorPosition: { rowPriority: 1, columnIndex: 1 } });
    if (this.currentPageIndex > 0) {
      items.push({ value: this._cityValue, property: DynamicModalUiDataProvider._getCityDescription(), editorPosition: { rowPriority: 2, columnIndex: 1 } });
    }
    return items;
  }

  public handleNext = () => {
    if (this.currentPageIndex < this.numberOfPages) {
      this.currentPageIndex++;
      this.reloadDialogItems();
    }
  };

  public handlePrevious = () => {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
      this.reloadDialogItems();
    }
  };

  public override supplyButtonData(): DialogButtonDef[] | undefined {
    const buttons: DialogButtonDef[] = [];

    if (this.currentPageIndex > 0 && this.currentPageIndex < this.numberOfPages)
      buttons.push({ type: DialogButtonType.Previous, onClick: this.handlePrevious });

    if (this.currentPageIndex < this.numberOfPages - 1)
      buttons.push({ type: DialogButtonType.Next, onClick: this.handleNext });

    if (this.currentPageIndex === this.numberOfPages - 1) {
      buttons.push({ type: DialogButtonType.OK, onClick: () => { }, disabled: (this.user === "unknown" || this.city === "unknown") });
    }

    buttons.push({ type: DialogButtonType.Cancel, onClick: () => { } });
    return buttons;
  }
}

export class Frontstage4 extends FrontstageProvider {
  public static stageId = "ui-test-app:Test4";

  public override get id(): string {
    return Frontstage4.stageId;
  }

  public override frontstageConfig(): FrontstageConfig {
    const contentGroup = new ContentGroup(
      {
        id: "CubeContent",
        layout: StandardContentLayouts.singleView,
        contents: [
          {
            id: "navigationCube",
            classId: "CubeContent",
          },
        ],
      },
    );

    return {
      id: this.id,
      version: 1,
      contentGroup,
      contentManipulation: {
        id: "contentManipulation",
        content: this.getToolWidget(),
      },
      toolSettings: {
        id: "toolSettings",
      },
      viewNavigation: {
        id: "viewNavigation",
        content: this.getNavigationWidget(),
      },
      rightPanel: {
        defaultState: StagePanelState.Minimized,
        sections: {
          start: [
            { id: "w1", icon: "icon-placeholder", labelKey: "SampleApp:widgets.NavigationTree" },
            { id: "w2", icon: "icon-placeholder", labelKey: "SampleApp:widgets.TreeSelectionDemo" },
          ],
          end: [
            { id: "VerticalPropertyGrid", defaultState: WidgetState.Hidden, icon: "icon-placeholder", labelKey: "SampleApp:widgets.VerticalPropertyGrid" },
            { id: "w3", defaultState: WidgetState.Open, icon: "icon-placeholder", labelKey: "SampleApp:widgets.HorizontalPropertyGrid" },
            { id: "w4", defaultState: WidgetState.Open, icon: "icon-placeholder", labelKey: "SampleApp:widgets.HorizontalPropertyGrid" },
          ],
        },
      },
      statusBar: {
        id: "statusBar",
      },
    };
  }

  /** Define a ToolWidget with Buttons to display in the TopLeft zone. */
  private getToolWidget(): React.ReactNode {
    const horizontalItems: CommonToolbarItem[] = [
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.tool2),
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
      ToolbarItemUtilities.createGroupButton("SampleApp:buttons.anotherGroup", 10, "icon-placeholder", IModelApp.localization.getLocalizedString("SampleApp:buttons.anotherGroup"), [
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.tool1),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.tool2),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item3),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item4),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item5),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item6),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item7),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item8),
      ]),
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.activityMessageItem),
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.addMessageCommand),
    ];

    return (
      <ToolWidgetComposer
        cornerItem={<BackstageAppButton />}
        verticalToolbar={<ToolbarComposer items={verticalItems} usage={ToolbarUsage.ContentManipulation} orientation={ToolbarOrientation.Vertical} />}
        horizontalToolbar={<ToolbarComposer items={horizontalItems} usage={ToolbarUsage.ContentManipulation} orientation={ToolbarOrientation.Horizontal} />}
      />
    );
  }

  private modalDialog(): React.ReactNode {
    return (
      <TestModalDialog />
    );
  }

  private modalDialog2(): React.ReactNode {
    return (
      <TestModalDialog2
        opened={true}
      />
    );
  }

  private testPopup(): React.ReactNode {
    return (
      <PopupTestDialog
        opened={true}
      />
    );
  }

  private radialMenu(): React.ReactNode {
    return (
      <TestRadialMenu
        opened={true} onClose={this._closeModal} />
    );
  }

  private _closeModal = () => {
    ModalDialogManager.closeDialog();
  };

  private get _spinnerTestDialogItem() {
    const id = "spinners";
    return new CommandItemDef({
      iconSpec: "icon-placeholder", labelKey: "SampleApp:buttons.spinnerTestDialog",
      execute: () => { ModelessDialogManager.openDialog(<SpinnerTestDialog opened={true} onClose={() => ModelessDialogManager.closeDialog(id)} />, id); },
    });
  }

  private get _sampleModelessDialogItem() {
    const dialogId = "sample";
    return new CommandItemDef({
      iconSpec: "icon-placeholder",
      labelKey: "SampleApp:buttons.sampleModelessDialog",
      execute: () => {
        ModelessDialogManager.openDialog(
          <SampleModelessDialog
            dialogId={dialogId}
            onClose={() => this._handleModelessClose(dialogId)}
          />, dialogId);
      },
    });
  }

  private _handleModelessClose = (dialogId: string) => {
    ModelessDialogManager.closeDialog(dialogId);
    IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, `Closed modeless dialog: ${dialogId}`));
  };

  private get _sampleModalDialogItem() {
    return new CommandItemDef({
      iconSpec: "icon-placeholder",
      labelKey: "SampleApp:buttons.sampleModalDialog",
      // eslint-disable-next-line no-console
      execute: () => {
        ModalDialogManager.openDialog(
          <SampleModalDialog
            onResult={(result) => this._handleModalResult(result)}
          />);
      },
    });
  }

  private _handleModalResult(result: DialogButtonType) {
    ModalDialogManager.closeDialog();
    IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, `Modal dialog result: ${result}`));
  }

  private handleOpenUiProviderDialogModal = () => {
    IModelApp.uiAdmin.openDialog(new TestUiProvider(), "Test UiProvider", true, "TestUiProvider", {
      movable: true,
      width: "auto",
    });
  };

  private handleOpenDynamicModal = () => {
    IModelApp.uiAdmin.openDialog(new DynamicModalUiDataProvider(), "Dynamic Model", true, "SampleApp:DynamicModal", {
      movable: true, width: 280, minWidth: 280,
    });
  };

  /** Define a NavigationWidget with Buttons to display in the TopRight zone.
   */
  private getNavigationWidget(): React.ReactNode {
    const horizontalItems: CommonToolbarItem[] = [
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item6),
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item5),
      ToolbarItemUtilities.createGroupButton("SampleApp:buttons.toolGroup", 10, "icon-placeholder", IModelApp.localization.getLocalizedString("SampleApp:buttons.toolGroup"), [
        ToolbarItemUtilities.createActionButton("openDialog", 10, "open modal", IconHelper.getIconData("icon-placeholder"), () => ModalDialogManager.openDialog(this.modalDialog())),
        ToolbarItemUtilities.createActionButton("openDialog2", 10, "open modal 2", IconHelper.getIconData("icon-placeholder"), () => ModalDialogManager.openDialog(this.modalDialog2())),
        ToolbarItemUtilities.createActionButton("openDynamicModal", 10, "open dynamic modal", IconHelper.getIconData("icon-tools"), this.handleOpenDynamicModal),
        ToolbarItemUtilities.createActionButton("openRadial", 10, "open radial", IconHelper.getIconData("icon-placeholder"), () => ModalDialogManager.openDialog(this.radialMenu())),
        ToolbarItemUtilities.createActionButton("popupTest", 10, "open popup", IconHelper.getIconData("icon-placeholder"), () => ModalDialogManager.openDialog(this.testPopup())),
        ToolbarItemUtilities.createActionButton("uiProviderModalTest", 10, "open provider modal", IconHelper.getIconData("icon-placeholder"), this.handleOpenUiProviderDialogModal),
        ToolbarItemUtilities.createActionButton("reactSelectModalTest", 10, "open modal", IconHelper.getIconData("icon-placeholder"), this.handleOpenUiProviderDialogModal),

      ]),
    ];

    const verticalItems: CommonToolbarItem[] = [
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item8),
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item7),
      ToolbarItemUtilities.createGroupButton("SampleApp:buttons.toolGroup", 10, "icon-placeholder", IModelApp.localization.getLocalizedString("SampleApp:buttons.toolGroup"), [
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.noIconMessageBoxCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.successMessageBoxCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.informationMessageBoxCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.questionMessageBoxCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.warningMessageBoxCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.errorMessageBoxCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.openMessageBoxCommand),
        AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.openMessageBoxCommand2),
        AppToolbarUtilities.createActionButtonFromItemDef(10, this._spinnerTestDialogItem),
        AppToolbarUtilities.createActionButtonFromItemDef(10, this._sampleModelessDialogItem),
        AppToolbarUtilities.createActionButtonFromItemDef(10, this._sampleModalDialogItem),

      ]),
    ];

    return (
      <NavigationWidgetComposer
        navigationAidHost={<NavigationAidHost />} // CubeNavigationAid
        horizontalToolbar={<ToolbarComposer items={horizontalItems} usage={ToolbarUsage.ViewNavigation} orientation={ToolbarOrientation.Horizontal} />}
        verticalToolbar={<ToolbarComposer items={verticalItems} usage={ToolbarUsage.ViewNavigation} orientation={ToolbarOrientation.Vertical} />}
      />
    );
  }
}
