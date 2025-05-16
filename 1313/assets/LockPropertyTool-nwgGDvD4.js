var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { a as action } from "./index-6lyHBX71.js";
import "./Dialog-CN-4EM2U.js";
import { P as PrimitiveTool, v as PropertyDescriptionHelper } from "./appui-react-LueifSWM.js";
function createLockPropertyTool(args) {
  var _a;
  const { lockLabel, disabled } = args ?? {};
  return _a = class extends PrimitiveTool {
    constructor() {
      super(...arguments);
      __publicField(this, "_myPropertyValue", false);
      __publicField(this, "_myLockPropertyValue", true);
    }
    requireWriteableTarget() {
      return false;
    }
    onRestartTool() {
      return this.exitTool();
    }
    supplyToolSettingsProperties() {
      const lockPropertyDescription = PropertyDescriptionHelper.buildLockPropertyDescription(
        "myLockProperty"
      );
      if (lockLabel) {
        lockPropertyDescription.displayLabel = lockLabel;
      }
      return [
        {
          property: PropertyDescriptionHelper.buildCheckboxDescription(
            "myProperty",
            "My Property"
          ),
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
  }, __publicField(_a, "toolId", "LockPropertyTool"), _a;
}
const LockPropertyTool = createLockPropertyTool();
export {
  LockPropertyTool as L,
  createLockPropertyTool as c
};
