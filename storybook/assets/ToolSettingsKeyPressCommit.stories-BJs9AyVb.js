var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b, _c;
import { j as jsxRuntimeExports } from "./iframe-JYBMU7ZD.js";
import { A as AppUiDecorator } from "./Decorators-bqwLT6vP.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-DiVjAxvm.js";
import { a1 as PreviewFeaturesProvider, e as IModelViewportControl, l as StandardContentLayouts, I as IModelApp, U as UiFramework, a5 as DialogProperty, P as PropertyDescriptionHelper, a6 as LengthDescription } from "./appui-react-Bkdl7eTp.js";
import { c as createFrontstage, r as removeProperty } from "./Utils-CTNbv4Q7.js";
import { S as StoryPrimitiveTool } from "./StoryTool-l0BaILc5.js";
import "./Key.enum-D8YSRJHT.js";
import "./blocks-RORET1q_.js";
import "./client-CxV4gkpD.js";
function PreviewStory(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PreviewFeaturesProvider,
    {
      features: {
        toolSettingsKeyPressCommit: props.toolSettingsKeyPressCommit,
        toolSettingsNewEditors: props.toolSettingsNewEditors
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppUiStory,
        {
          layout: "fullscreen",
          demoIModel: { default: "blank" },
          frontstages: [
            createFrontstage({
              contentGroupProps: {
                id: "ViewportContentGroup",
                layout: StandardContentLayouts.singleView,
                contents: [
                  {
                    id: "ViewportContent",
                    classId: IModelViewportControl
                  }
                ]
              },
              hideToolSettings: false
            })
          ],
          onInitialize: props.onInitialize,
          onFrontstageActivated: props.onFrontstageActivated
        }
      )
    }
  );
}
PreviewStory.__docgenInfo = { "description": "`toolSettingsKeyPressCommit` preview feature. When enabled the input-like editors rendered in the tool settings will commit the entered value on key press.", "methods": [], "displayName": "PreviewStory" };
const { action } = __STORYBOOK_MODULE_ACTIONS__;
const meta = {
  title: "PreviewFeatures/ToolSettingsKeyPressCommit",
  component: PreviewStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    }
  },
  argTypes: {
    onInitialize: removeProperty(),
    onFrontstageActivated: removeProperty()
  },
  args: {
    toolSettingsKeyPressCommit: true,
    toolSettingsNewEditors: false
  }
};
class DefaultTool extends StoryPrimitiveTool {
  constructor() {
    super(...arguments);
    __publicField(this, "_text", "Hello");
    __publicField(this, "_number", 2);
    __publicField(this, "_customNumber", 4);
  }
  supplyToolSettingsProperties() {
    return [new DialogProperty(PropertyDescriptionHelper.buildTextEditorDescription("text", "Text"), this._text).toDialogItem({
      columnIndex: 0,
      rowPriority: 0
    }), new DialogProperty(PropertyDescriptionHelper.buildNumberEditorDescription("numeric", "Numeric"), this._number).toDialogItem({
      columnIndex: 0,
      rowPriority: 1
    }), new DialogProperty(new LengthDescription("customNumber", "Custom number"), this._customNumber).toDialogItem({
      columnIndex: 0,
      rowPriority: 2
    })];
  }
  async applyToolSettingPropertyChange(updatedValue) {
    action("applyToolSettingPropertyChange")(updatedValue);
    if (updatedValue.propertyName === "text") {
      this._text = updatedValue.value.value;
      return true;
    }
    if (updatedValue.propertyName === "numeric") {
      this._number = updatedValue.value.value;
      return true;
    }
    if (updatedValue.propertyName === "customNumber") {
      this._customNumber = updatedValue.value.value;
      return true;
    }
    return false;
  }
}
__publicField(DefaultTool, "toolId", "DefaultStoryTool");
const Default = {
  args: {
    onInitialize: async () => {
      IModelApp.tools.register(DefaultTool, UiFramework.localizationNamespace);
    },
    onFrontstageActivated: async () => {
      await IModelApp.tools.run(DefaultTool.toolId);
    }
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  args: {\n    onInitialize: async () => {\n      IModelApp.tools.register(DefaultTool, UiFramework.localizationNamespace);\n    },\n    onFrontstageActivated: async () => {\n      await IModelApp.tools.run(DefaultTool.toolId);\n    }\n  }\n}",
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
