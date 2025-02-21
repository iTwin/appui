var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b, _c, _d, _e, _f;
import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
import { b7 as PrimitiveTool, b8 as PropertyDescriptionHelper, I as IModelApp, U as UiFramework, m as StandardContentLayouts, e as IModelViewportControl } from "./appui-react-BIGfyRyB.js";
import "./Dialog-G-zkgOIV.js";
import { A as AppUiDecorator } from "./Decorators-BsFrox4c.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-D7VdQcAK.js";
import { c as createFrontstage, r as removeProperty } from "./Utils-DOW3fYw3.js";
import { a as action } from "./chunk-D5ZWXAHU-CHda0_Q5.js";
import "./index-R26Bfrts.js";
import "./_commonjs-dynamic-modules-lq-lihFa.js";
import "./iframe-ClLUjPXt.js";
import "../sb-preview/runtime.js";
import "./SvgCloseSmall-2ldVV_sh.js";
import "./index-CHBBkG1-.js";
import "./index-oY8aizO2.js";
import "./client-DRUEp2wC.js";
import "./debounce-CTTNlY27.js";
import "./index-CBpxrBZN.js";
import "./index-DLlB04eo.js";
import "./index-Brmgc-W4.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-zibz9A5r.js";
import "./v4-BL5qiJc1.js";
function ToolSettingsStory(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      layout: "fullscreen",
      demoIModel: { default: "blank" },
      ...props
    }
  );
}
ToolSettingsStory.__docgenInfo = { "description": "[FrontstageProvider](https://www.itwinjs.org/reference/appui-react/frontstage/frontstageprovider/) can be used to configure a frontstage.", "methods": [], "displayName": "ToolSettingsStory" };
class CustomTool extends PrimitiveTool {
  requireWriteableTarget() {
    return false;
  }
  onRestartTool() {
    return this.exitTool();
  }
  supplyToolSettingsProperties() {
    return [
      {
        property: {
          displayLabel: "My Property",
          name: "myProperty",
          typename: "string"
        },
        value: {
          displayValue: "My Value"
        },
        editorPosition: {
          columnIndex: 0,
          rowPriority: 0
        }
      }
    ];
  }
}
__publicField(CustomTool, "toolId", "example:CustomTool");
class LockPropertyTool extends PrimitiveTool {
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
          property: PropertyDescriptionHelper.buildLockPropertyDescription(
            "myLockProperty"
          )
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
}
__publicField(LockPropertyTool, "toolId", "LockPropertyTool");
const meta = {
  title: "Frontstage/ToolSettings",
  component: ToolSettingsStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    },
    layout: "fullscreen"
  },
  args: {
    frontstages: [createFrontstage({
      contentGroupProps: {
        id: "ViewportContentGroup",
        layout: StandardContentLayouts.singleView,
        contents: [{
          id: "ViewportContent",
          classId: IModelViewportControl
        }]
      },
      hideToolSettings: false
    })]
  },
  argTypes: {
    frontstages: removeProperty(),
    onFrontstageActivated: removeProperty()
  }
};
const Default = {
  args: {
    onFrontstageActivated: async () => {
      IModelApp.tools.register(CustomTool, UiFramework.localizationNamespace);
      IModelApp.tools.run(CustomTool.toolId);
    }
  }
};
const LockProperty = {
  args: {
    onFrontstageActivated: async () => {
      IModelApp.tools.register(LockPropertyTool, UiFramework.localizationNamespace);
      IModelApp.tools.run(LockPropertyTool.toolId);
    }
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  args: {\n    onFrontstageActivated: async () => {\n      IModelApp.tools.register(CustomTool, UiFramework.localizationNamespace);\n      IModelApp.tools.run(CustomTool.toolId);\n    }\n  }\n}",
      ...(_c = (_b = Default.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
LockProperty.parameters = {
  ...LockProperty.parameters,
  docs: {
    ...(_d = LockProperty.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    onFrontstageActivated: async () => {\n      IModelApp.tools.register(LockPropertyTool, UiFramework.localizationNamespace);\n      IModelApp.tools.run(LockPropertyTool.toolId);\n    }\n  }\n}",
      ...(_f = (_e = LockProperty.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
const __namedExportsOrder = ["Default", "LockProperty"];
export {
  Default,
  LockProperty,
  __namedExportsOrder,
  meta as default
};
