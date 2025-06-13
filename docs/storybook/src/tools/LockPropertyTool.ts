/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from "storybook/actions";
import {
  DialogItem,
  DialogItemValue,
  DialogPropertySyncItem,
  PropertyDescription,
  PropertyDescriptionHelper,
  StandardTypeNames,
} from "@itwin/appui-abstract";
import { StoryPrimitiveTool } from "./StoryTool";

interface CreateLockPropertyToolArgs {
  lockLabel?: string;
  disabled?: boolean;
  propertyOverrides?: Partial<PropertyDescription>;
  initialValue?: DialogItemValue["value"];
  properties?: DialogItem[];
}

export function createLockPropertyTool(args?: CreateLockPropertyToolArgs) {
  const {
    lockLabel,
    disabled,
    propertyOverrides,
    initialValue = false,
    properties,
  } = args ?? {};
  return class LockPropertyTool extends StoryPrimitiveTool {
    public static override toolId = "LockPropertyTool";

    private _myPropertyValue = initialValue;
    private _myLockPropertyValue = true;

    public override supplyToolSettingsProperties(): DialogItem[] | undefined {
      const lockPropertyDescription =
        PropertyDescriptionHelper.buildLockPropertyDescription(
          "myLockProperty"
        );
      if (lockLabel) {
        lockPropertyDescription.displayLabel = lockLabel;
      }

      const typename = propertyOverrides?.typename ?? StandardTypeNames.Boolean;
      return (
        properties ?? [
          {
            property: {
              name: "myProperty",
              displayLabel: "My Property",
              ...propertyOverrides,
              typename,
            },
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
              property: lockPropertyDescription,
              isDisabled: disabled,
            },
          },
        ]
      );
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
  };
}

export const LockPropertyTool = createLockPropertyTool();
