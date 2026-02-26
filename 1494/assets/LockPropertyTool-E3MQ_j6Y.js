import { S as StandardTypeNames } from "./Key.enum-szt-ThaG.js";
import { P as PropertyDescriptionHelper } from "./appui-react-CwKstaKu.js";
import { S as StoryPrimitiveTool } from "./StoryTool-BnD4dGwH.js";
const { action } = __STORYBOOK_MODULE_ACTIONS__;
function createLockPropertyTool(args) {
  const {
    lockLabel,
    disabled,
    propertyOverrides,
    initialValue = false,
    properties
  } = args ?? {};
  return class LockPropertyTool extends StoryPrimitiveTool {
    static toolId = "LockPropertyTool";
    _myPropertyValue = initialValue;
    _myLockPropertyValue = true;
    supplyToolSettingsProperties() {
      const lockPropertyDescription = PropertyDescriptionHelper.buildLockPropertyDescription(
        "myLockProperty"
      );
      if (lockLabel) {
        lockPropertyDescription.displayLabel = lockLabel;
      }
      const typename = propertyOverrides?.typename ?? StandardTypeNames.Boolean;
      return properties ?? [
        {
          property: {
            name: "myProperty",
            displayLabel: "My Property",
            ...propertyOverrides,
            typename
          },
          value: {
            value: this._myPropertyValue
          },
          editorPosition: {
            columnIndex: 0,
            rowPriority: 0
          },
          isDisabled: !this._myLockPropertyValue,
          lockProperty: {
            value: {
              value: this._myLockPropertyValue
            },
            property: lockPropertyDescription,
            isDisabled: disabled
          }
        }
      ];
    }
    async applyToolSettingPropertyChange(updatedValue) {
      action("applyToolSettingPropertyChange")(updatedValue);
      switch (updatedValue.propertyName) {
        case "myProperty": {
          this._myPropertyValue = updatedValue.value.value;
          return true;
        }
        case "myLockProperty": {
          this._myLockPropertyValue = updatedValue.value.value;
          return true;
        }
      }
      return false;
    }
  };
}
const LockPropertyTool = createLockPropertyTool();
export {
  LockPropertyTool as L,
  createLockPropertyTool as c
};
