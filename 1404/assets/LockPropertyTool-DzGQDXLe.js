var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { S as StandardTypeNames } from "./Key.enum-D1wYTD-A.js";
import { P as PropertyDescriptionHelper } from "./appui-react-B5el9kXP.js";
import { S as StoryPrimitiveTool } from "./StoryTool-CJzvYnBM.js";
const { action } = __STORYBOOK_MODULE_ACTIONS__;
function createLockPropertyTool(args) {
  var _a;
  const {
    lockLabel,
    disabled,
    propertyOverrides,
    initialValue = false,
    properties
  } = args ?? {};
  return _a = class extends StoryPrimitiveTool {
    constructor() {
      super(...arguments);
      __publicField(this, "_myPropertyValue", initialValue);
      __publicField(this, "_myLockPropertyValue", true);
    }
    supplyToolSettingsProperties() {
      const lockPropertyDescription = PropertyDescriptionHelper.buildLockPropertyDescription(
        "myLockProperty"
      );
      if (lockLabel) {
        lockPropertyDescription.displayLabel = lockLabel;
      }
      const typename = (propertyOverrides == null ? void 0 : propertyOverrides.typename) ?? StandardTypeNames.Boolean;
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
  }, __publicField(_a, "toolId", "LockPropertyTool"), _a;
}
const LockPropertyTool = createLockPropertyTool();
export {
  LockPropertyTool as L,
  createLockPropertyTool as c
};
