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

  public override requireWriteableTarget() {
    return false;
  }

  public override onRestartTool() {
    return this.exitTool();
  }

  public override supplyToolSettingsProperties(): DialogItem[] | undefined {
    return [
      {
        property: PropertyDescriptionHelper.buildTextEditorDescription(
          "myProperty",
          "My Property"
        ),
        value: {
          displayValue: "My Value",
        },
        editorPosition: {
          columnIndex: 0,
          rowPriority: 0,
        },
        lockProperty: {
          value: {
            value: false,
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
    return true;
  }
}
