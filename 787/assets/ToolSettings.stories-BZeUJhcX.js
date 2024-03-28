var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-_iMjpMZ4.js";
import { a9 as PrimitiveTool, i as IModelApp, U as UiFramework, aa as StandardContentLayouts, ab as IModelViewportControl } from "./DefaultToolSettingsProvider-DnwPMY8p.js";
import "./index-DlkhCVTf.js";
import "./index-Cm_5MPU1.js";
import { A as AppUiDecorator } from "./Decorators-C3AIcKoW.js";
import { A as AppUiStory, P as Page, r as removeProperty, c as createFrontstageProvider } from "./AppUiStory-BtwpH1aH.js";
import "./getPrototypeOf-BmmMfuHC.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./iframe-DDgUOPmj.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
import "./index-Dr-11776.js";
import "./index-Cp4dr_sK.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./ToolbarComposer-BHflxGDg.js";
import "./DemoIModel-4Lmk67sy.js";
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
try {
  ToolSettingsStory.displayName = "ToolSettingsStory";
  ToolSettingsStory.__docgenInfo = { "description": "[FrontstageProvider](https://www.itwinjs.org/reference/appui-react/frontstage/frontstageprovider/) can be used to configure a frontstage.", "displayName": "ToolSettingsStory", "props": { "frontstageProviders": { "defaultValue": null, "description": "", "name": "frontstageProviders", "required": false, "type": { "name": "FrontstageProvider[] | (() => FrontstageProvider[])" } }, "onFrontstageActivated": { "defaultValue": null, "description": "", "name": "onFrontstageActivated", "required": false, "type": { "name": "(() => void)" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
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
try {
  CustomTool.toolId.displayName = "CustomTool.toolId";
  CustomTool.toolId.__docgenInfo = { "description": "The unique string that identifies this tool. This must be overridden in every subclass.", "displayName": "CustomTool.toolId", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
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
  argTypes: {
    frontstageProviders: removeProperty(),
    onFrontstageActivated: removeProperty()
  }
};
const Default = {
  args: {
    frontstageProviders: [createFrontstageProvider({
      contentGroupProps: {
        id: "ViewportContentGroup",
        layout: StandardContentLayouts.singleView,
        contents: [{
          id: "ViewportContent",
          classId: IModelViewportControl
        }]
      },
      hideToolSettings: false
    })],
    onFrontstageActivated: async () => {
      IModelApp.tools.register(CustomTool, UiFramework.localizationNamespace);
      IModelApp.tools.run(CustomTool.toolId);
    }
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    frontstageProviders: [createFrontstageProvider({\n      contentGroupProps: {\n        id: "ViewportContentGroup",\n        layout: StandardContentLayouts.singleView,\n        contents: [{\n          id: "ViewportContent",\n          classId: IModelViewportControl\n        }]\n      },\n      hideToolSettings: false\n    })],\n    onFrontstageActivated: async () => {\n      IModelApp.tools.register(CustomTool, UiFramework.localizationNamespace);\n      IModelApp.tools.run(CustomTool.toolId);\n    }\n  }\n}',
      ...(_c = (_b = Default.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Default"];
export {
  Default,
  __namedExportsOrder,
  meta as default
};
