/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ColorByName, ColorDef } from "@itwin/core-common";
import {
  IModelApp,
  LengthDescription,
  NotifyMessageDetails,
  OutputMessagePriority,
} from "@itwin/core-frontend";
import {
  ColorEditorParams,
  DialogButtonDef,
  DialogButtonType,
  DialogItem,
  DialogItemValue,
  DialogLayoutDataProvider,
  DialogPropertySyncItem,
  InputEditorSizeParams,
  PropertyDescription,
  PropertyEditorParamTypes,
  StandardEditorNames,
  StandardTypeNames,
  SuppressLabelEditorParams,
} from "@itwin/appui-abstract";

enum ColorOptions {
  Red,
  White,
  Blue,
  Yellow,
  Orange,
}

export class AbstractDialogDataProvider extends DialogLayoutDataProvider {
  public override supplyButtonData(): DialogButtonDef[] | undefined {
    const buttons: DialogButtonDef[] = [];
    buttons.push({ type: DialogButtonType.OK, onClick: () => {} });
    buttons.push({ type: DialogButtonType.Cancel, onClick: () => {} });
    return buttons;
  }

  private static _optionsName = "enumAsPicklist";
  private static _getEnumAsPicklistDescription = (): PropertyDescription => {
    return {
      name: AbstractDialogDataProvider._optionsName,
      displayLabel: "Options",
      typename: "enum",
      editor: {
        name: "themed-enum",
      },
      enum: {
        choices: [
          { label: "Red", value: ColorOptions.Red },
          { label: "White", value: ColorOptions.White },
          { label: "Blue", value: ColorOptions.Blue },
          { label: "Yellow", value: ColorOptions.Yellow },
          { label: "Orange", value: ColorOptions.Orange },
        ],
      },
    };
  };

  private _optionsValue: DialogItemValue = {
    value: ColorOptions.Blue as number,
  };

  public get option(): ColorOptions {
    return this._optionsValue.value as ColorOptions;
  }

  public set option(option: ColorOptions) {
    this._optionsValue = { value: option };
  }

  // ------------- Color ---------------
  private static _colorName = "color";
  private static _getColorDescription = (): PropertyDescription => {
    return {
      name: AbstractDialogDataProvider._colorName,
      displayLabel: "Color",
      typename: "number",
      editor: {
        name: "color-picker",
        params: [
          {
            type: PropertyEditorParamTypes.ColorData,
            colorValues: [
              ColorByName.blue,
              ColorByName.red,
              ColorByName.green,
              ColorByName.yellow,
              ColorByName.black,
              ColorByName.gray,
              ColorByName.purple,
              ColorByName.pink,
            ],
            numColumns: 3,
          } as ColorEditorParams,
        ],
      },
    };
  };

  private _colorValue: DialogItemValue = { value: ColorByName.blue };

  public get colorValue(): number {
    return this._colorValue.value as number;
  }

  public set colorValue(newValue: number) {
    this._colorValue.value = newValue;
  }

  public get colorDef(): ColorDef {
    return ColorDef.create(this._optionsValue.value as number);
  }

  public set colorDef(colorValue: ColorDef) {
    this._optionsValue.value = colorValue.tbgr;
  }

  // ------------- use length toggle  ---------------
  private static _useLengthName = "useLength";
  private static _getUseLengthDescription = (): PropertyDescription => {
    return {
      name: AbstractDialogDataProvider._useLengthName,
      displayLabel: "",
      typename: "boolean",
      editor: {
        params: [
          {
            type: PropertyEditorParamTypes.SuppressEditorLabel,
            suppressLabelPlaceholder: true,
          } as SuppressLabelEditorParams,
        ],
      },
    };
  };

  public get useLength(): boolean {
    return this._useLengthValue.value as boolean;
  }

  public set useLength(option: boolean) {
    this._useLengthValue.value = option;
  }

  // ------------- Length ---------------
  private _useLengthValue: DialogItemValue = { value: true };

  private _lengthDescription = new LengthDescription();
  private static _lengthName = "length";

  // if _lengthValue also sets up display value then the "number-custom" type editor would not need to format the value before initially displaying it.
  private _lengthValue: DialogItemValue = { value: 1.5 }; // value in meters

  public get length(): number {
    return this._lengthValue.value as number;
  }

  public set length(option: number) {
    this._lengthValue.value = option;
  }

  // ------------- Weight ---------------
  private static _weightName = "weight";
  private static _getWeightDescription = (): PropertyDescription => {
    return {
      name: AbstractDialogDataProvider._weightName,
      displayLabel: "Weight",
      typename: StandardTypeNames.Number,
      editor: {
        name: StandardEditorNames.WeightPicker,
      },
    };
  };

  private _weightValue: DialogItemValue = { value: 3 };

  public get weight(): number {
    return this._weightValue.value as number;
  }

  public set weight(weightValue: number) {
    this._weightValue.value = weightValue;
  }

  // ------------- boolean based toggle button ---------------
  private static _lockToggleName = "lockToggle";
  private static _getLockToggleDescription = (): PropertyDescription => {
    return {
      name: AbstractDialogDataProvider._lockToggleName,
      displayLabel: "Lock",
      typename: StandardTypeNames.Boolean,
      editor: { name: StandardEditorNames.Toggle },
    };
  };

  private _lockValue: DialogItemValue = { value: true };

  public get lock(): boolean {
    return this._lockValue.value as boolean;
  }

  public set lock(option: boolean) {
    this._lockValue.value = option;
  }

  // ------------- text based edit field ---------------
  private static _cityName = "city";
  private static _getCityDescription = (): PropertyDescription => {
    return {
      name: AbstractDialogDataProvider._cityName,
      displayLabel: "City",
      typename: "string",
    };
  };

  private _cityValue: DialogItemValue = { value: "Huntsville" };

  public get city(): string {
    return this._cityValue.value as string;
  }

  public set city(option: string) {
    this._cityValue.value = option;
  }

  // ------------- text based edit field ---------------
  private static _stateName = "stateName";
  private static _getStateDescription = (): PropertyDescription => {
    return {
      name: AbstractDialogDataProvider._stateName,
      displayLabel: "State",
      typename: StandardTypeNames.String,
      editor: {
        params: [
          {
            type: PropertyEditorParamTypes.InputEditorSize,
            size: 4,
            /* maxLength: 60,*/
          } as InputEditorSizeParams,
        ],
      },
    };
  };

  private _stateValue: DialogItemValue = { value: "AL" };

  public get stateName(): string {
    return this._stateValue.value as string;
  }

  public set stateName(option: string) {
    this._stateValue.value = option;
  }

  public override supplyDialogItems(): DialogItem[] {
    const dialogItems = new Array<DialogItem>();
    dialogItems.push({
      value: this._optionsValue,
      property: AbstractDialogDataProvider._getEnumAsPicklistDescription(),
      editorPosition: { rowPriority: 0, columnIndex: 2 },
    });
    dialogItems.push({
      value: this._colorValue,
      property: AbstractDialogDataProvider._getColorDescription(),
      editorPosition: { rowPriority: 0, columnIndex: 4 },
    });
    dialogItems.push({
      value: this._weightValue,
      property: AbstractDialogDataProvider._getWeightDescription(),
      editorPosition: { rowPriority: 3, columnIndex: 2 },
    });
    dialogItems.push({
      value: this._lockValue,
      property: AbstractDialogDataProvider._getLockToggleDescription(),
      editorPosition: { rowPriority: 5, columnIndex: 2 },
    });
    dialogItems.push({
      value: this._cityValue,
      property: AbstractDialogDataProvider._getCityDescription(),
      editorPosition: { rowPriority: 10, columnIndex: 2 },
    });
    dialogItems.push({
      value: this._stateValue,
      property: AbstractDialogDataProvider._getStateDescription(),
      editorPosition: { rowPriority: 10, columnIndex: 4 },
    });
    const lengthLock: DialogItem = {
      value: this._useLengthValue,
      property: AbstractDialogDataProvider._getUseLengthDescription(),
      editorPosition: { rowPriority: 20, columnIndex: 0 },
    };
    dialogItems.push({
      value: this._lengthValue,
      property: this._lengthDescription,
      editorPosition: { rowPriority: 20, columnIndex: 2 },
      isDisabled: false,
      lockProperty: lengthLock,
    });
    return dialogItems;
  }

  private showColorInfoFromUi(updatedValue: DialogPropertySyncItem) {
    const tempColorDef = ColorDef.create(updatedValue.value.value as number);
    const msg = `Property '${
      updatedValue.propertyName
    }' updated to value ${tempColorDef.toRgbString()}`;
    IModelApp.notifications.outputMessage(
      new NotifyMessageDetails(OutputMessagePriority.Info, msg)
    );
  }

  private showInfoFromUi(updatedValue: DialogPropertySyncItem) {
    const msg = `Property '${
      updatedValue.propertyName
    }' updated to value ${String(updatedValue.value.value)}`;
    IModelApp.notifications.outputMessage(
      new NotifyMessageDetails(OutputMessagePriority.Info, msg)
    );
  }

  private syncLengthState() {
    const syncItem: DialogPropertySyncItem = {
      value: this._lengthValue,
      propertyName: AbstractDialogDataProvider._lengthName,
      isDisabled: !this.useLength,
    };
    this.fireSyncPropertiesEvent([syncItem]);
  }

  /** Used to send changes from UI */
  public override applyUiPropertyChange = (
    updatedValue: DialogPropertySyncItem
  ): void => {
    if (
      updatedValue.propertyName === AbstractDialogDataProvider._useLengthName
    ) {
      this.useLength = updatedValue.value.value as boolean;
      this.showInfoFromUi(updatedValue);
      this.syncLengthState();
      return;
    }
    if (updatedValue.propertyName === AbstractDialogDataProvider._optionsName) {
      if (this._optionsValue.value !== updatedValue.value.value) {
        this.option = updatedValue.value.value as ColorOptions;
        this.showInfoFromUi(updatedValue);
      }
    } else if (
      updatedValue.propertyName === AbstractDialogDataProvider._lockToggleName
    ) {
      this.lock = updatedValue.value.value as boolean;
      this.showInfoFromUi(updatedValue);
    } else if (
      updatedValue.propertyName === AbstractDialogDataProvider._cityName
    ) {
      this.city = updatedValue.value.value as string;
      this.showInfoFromUi(updatedValue);
    } else if (
      updatedValue.propertyName === AbstractDialogDataProvider._stateName
    ) {
      this.stateName = updatedValue.value.value as string;
      this.showInfoFromUi(updatedValue);
    } else if (
      updatedValue.propertyName === AbstractDialogDataProvider._lengthName
    ) {
      this.length = updatedValue.value.value as number;
      this.showInfoFromUi(updatedValue);
    } else if (
      updatedValue.propertyName === AbstractDialogDataProvider._colorName
    ) {
      this.colorValue = updatedValue.value.value as number;
      this.showColorInfoFromUi(updatedValue);
    } else if (
      updatedValue.propertyName === AbstractDialogDataProvider._weightName
    ) {
      this.weight = updatedValue.value.value as number;
      this.showInfoFromUi(updatedValue);
    } else {
      // not an item we know about
      return;
    }
  };
}
