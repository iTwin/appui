/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from "@storybook/addon-actions";
import {
  DialogItem,
  DialogPropertySyncItem,
  PropertyDescriptionHelper,
} from "@itwin/appui-abstract";
import { PrimitiveTool } from "@itwin/core-frontend";

export class LockPropertyTool extends PrimitiveTool {
  public static override toolId = "LockPropertyTool";

  private _myPropertyValue = false;
  private _myLockPropertyValue = true;

  public override requireWriteableTarget() {
    return false;
  }

  public override onRestartTool() {
    return this.exitTool();
  }

  public override supplyToolSettingsProperties(): DialogItem[] | undefined {
    return [
      {
        property: PropertyDescriptionHelper.buildCheckboxDescription(
          "myProperty",
          "My Property"
        ),
        value: {
          value: this._myPropertyValue,
        },
        editorPosition: {
          columnIndex: 0,
          rowPriority: 0,
        },
        isDisabled: !this._myLockPropertyValue,
        lockProperty: {
          value: {
            value: this._myLockPropertyValue,
          },
          property:
            PropertyDescriptionHelper.buildLockPropertyDescription(
              "myLockProperty"
            ),
        },
      },
    ];
  }

  public override async applyToolSettingPropertyChange(
    updatedValue: DialogPropertySyncItem
  ): Promise<boolean> {
    action("applyToolSettingPropertyChange")(updatedValue);
    switch (updatedValue.propertyName) {
      case "myProperty": {
        this._myPropertyValue = updatedValue.value.value as boolean;
        return true;
      }
      case "myLockProperty": {
        this._myLockPropertyValue = updatedValue.value.value as boolean;
        return true;
      }
    }

    return false;
  }
}
