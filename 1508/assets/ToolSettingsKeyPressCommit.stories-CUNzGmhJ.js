import { j as jsxRuntimeExports } from "./iframe-BnF7kxuI.js";
import { A as AppUiDecorator } from "./Decorators-CwkwcaGG.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-C8_Xb5kX.js";
import { K as PreviewFeaturesProvider, I as IModelViewportControl, j as IModelApp, U as UiFramework, a4 as DialogProperty, P as PropertyDescriptionHelper, a5 as LengthDescription } from "./appui-react-B7iNJbV5.js";
import { c as createFrontstage, S as StandardContentLayouts, r as removeProperty } from "./Utils-IR3EMk7M.js";
import { S as StoryPrimitiveTool } from "./StoryTool-1iFqE-Nf.js";
import "./Key.enum-B3pThNWo.js";
import "./preload-helper-UZRgTS1n.js";
import "./blocks-BPELq9PS.js";
import "./index-CptIXb7J.js";
import "./client-DYbOg5lC.js";
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
  static toolId = "DefaultStoryTool";
  _text = "Hello";
  _number = 2;
  _customNumber = 4;
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
    ...Default.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    onInitialize: async () => {\n      IModelApp.tools.register(DefaultTool, UiFramework.localizationNamespace);\n    },\n    onFrontstageActivated: async () => {\n      await IModelApp.tools.run(DefaultTool.toolId);\n    }\n  }\n}",
      ...Default.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Default"];
export {
  Default,
  __namedExportsOrder,
  meta as default
};
