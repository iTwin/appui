var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b, _c, _d, _e, _f, _g, _h, _i;
import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
import { b7 as PrimitiveTool, b8 as PropertyDescriptionHelper, b9 as Tag, ba as EventHandled, bb as PropertyEditorBase, I as IModelApp, U as UiFramework, bc as PropertyEditorManager, m as StandardContentLayouts, e as IModelViewportControl } from "./appui-react-B8l5O-cG.js";
import { d as PropertyValueFormat } from "./Dialog-B8k0cTki.js";
import { A as AppUiDecorator } from "./Decorators-rza5Znwg.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-VYq-5L56.js";
import { c as createFrontstage, r as removeProperty } from "./Utils-a6ON6Qq2.js";
import { a as action } from "./chunk-D5ZWXAHU-CHda0_Q5.js";
import { r as reactExports } from "./index-R26Bfrts.js";
import { B as Box, c as cx } from "./SvgCloseSmall-DYo6SMv6.js";
import "./_commonjs-dynamic-modules-lq-lihFa.js";
import "./iframe-DDTx9BNf.js";
import "../sb-preview/runtime.js";
import "./index-CHBBkG1-.js";
import "./index-oY8aizO2.js";
import "./client-DRUEp2wC.js";
import "./debounce-CTTNlY27.js";
import "./index-BNstr0aO.js";
import "./index-DLlB04eo.js";
import "./index-Brmgc-W4.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-zibz9A5r.js";
import "./v4-BL5qiJc1.js";
const TagContainer = reactExports.forwardRef((props, forwardedRef) => {
  let { className, children, overflow, background = "none", ...rest } = props;
  return reactExports.createElement(
    Box,
    {
      className: cx(
        "iui-tag-container",
        {
          [`iui-${overflow}`]: !!overflow,
          "iui-visible": "none" !== background
        },
        className
      ),
      ref: forwardedRef,
      ...rest
    },
    children
  );
});
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
const properties = {
  tags: "tagsProperty"
};
function createTagsProperty(tags) {
  return {
    typename: "custom-tags",
    name: properties.tags,
    displayLabel: "Custom Property",
    editor: {
      // Provide tag data to the custom property editor component
      params: [createTagsParam(tags)]
    }
  };
}
class CustomEditorTool extends PrimitiveTool {
  constructor() {
    super(...arguments);
    // All tags are active initially
    __publicField(this, "_activeTagIds", tagsStore.map((tag) => tag.id));
  }
  requireWriteableTarget() {
    return false;
  }
  onRestartTool() {
    return this.exitTool();
  }
  async onDataButtonDown() {
    this._activeTagIds = tagsStore.map((tag) => tag.id);
    this.syncToolSettingsProperties([
      {
        propertyName: properties.tags,
        property: createTagsProperty(tagsStore),
        value: {}
      }
    ]);
    return EventHandled.Yes;
  }
  supplyToolSettingsProperties() {
    const activeTags = tagsStore.filter(
      (tag) => this._activeTagIds.includes(tag.id)
    );
    return [
      {
        property: createTagsProperty(activeTags),
        // We are using params to pass active tag data to the component
        value: {},
        editorPosition: {
          columnIndex: 0,
          rowPriority: 0
        }
      }
    ];
  }
  async applyToolSettingPropertyChange(updatedValue) {
    switch (updatedValue.propertyName) {
      case properties.tags: {
        const tagIdsStr = updatedValue.value.value;
        if (typeof tagIdsStr !== "string") return false;
        this._activeTagIds = JSON.parse(tagIdsStr);
        return true;
      }
    }
    return false;
  }
}
__publicField(CustomEditorTool, "toolId", "CustomEditorTool");
class CustomTagsPropertyEditor extends PropertyEditorBase {
  get reactNode() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTagsEditor, {});
  }
}
const tagsStore = [
  {
    id: "1",
    label: "Tag 1"
  },
  {
    id: "2",
    label: "Tag 2"
  },
  {
    id: "3",
    label: "Tag 3"
  }
];
function createTagsParam(tags) {
  return {
    type: createTagsParam.type,
    tags
  };
}
createTagsParam.type = "custom-tags-param";
const CustomTagsEditor = reactExports.forwardRef(
  (props, ref) => {
    const { propertyRecord } = props;
    const elRef = reactExports.useRef(null);
    reactExports.useImperativeHandle(
      ref,
      () => ({
        getPropertyValue: async () => {
          return void 0;
        },
        htmlElement: null,
        hasFocus: false
      }),
      []
    );
    const tags = reactExports.useMemo(() => {
      var _a2;
      if (!propertyRecord) return [];
      const params = (_a2 = propertyRecord.property.editor) == null ? void 0 : _a2.params;
      const tagsParam = params == null ? void 0 : params.find((param) => {
        return param.type === createTagsParam.type;
      });
      return (tagsParam == null ? void 0 : tagsParam.tags) ?? [];
    }, [propertyRecord]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TagContainer, { ref: elRef, children: tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tag,
      {
        style: {
          blockSize: "var(--iui-size-l)"
        },
        onRemove: () => {
          var _a2;
          if (!props.propertyRecord) return;
          const tagIds = tags.map((t) => t.id);
          const newTagIds = tagIds.filter((id) => id !== tag.id);
          (_a2 = props.onCommit) == null ? void 0 : _a2.call(props, {
            propertyRecord: props.propertyRecord,
            newValue: {
              valueFormat: PropertyValueFormat.Primitive,
              value: JSON.stringify(newTagIds)
            }
          });
        },
        children: tag.label
      },
      tag.id
    )) });
  }
);
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
    onFrontstageActivated: removeProperty(),
    onInitialize: removeProperty()
  }
};
const Default = {
  args: {
    onInitialize: async () => {
      IModelApp.tools.register(CustomTool, UiFramework.localizationNamespace);
    },
    onFrontstageActivated: async () => {
      await IModelApp.tools.run(CustomTool.toolId);
    }
  }
};
const LockProperty = {
  args: {
    onInitialize: async () => {
      IModelApp.tools.register(LockPropertyTool, UiFramework.localizationNamespace);
    },
    onFrontstageActivated: async () => {
      await IModelApp.tools.run(LockPropertyTool.toolId);
    }
  }
};
const CustomEditor = {
  args: {
    onInitialize: async () => {
      PropertyEditorManager.registerEditor("custom-tags", CustomTagsPropertyEditor);
      IModelApp.tools.register(CustomEditorTool, UiFramework.localizationNamespace);
    },
    onFrontstageActivated: async () => {
      await IModelApp.tools.run(CustomEditorTool.toolId);
    }
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  args: {\n    onInitialize: async () => {\n      IModelApp.tools.register(CustomTool, UiFramework.localizationNamespace);\n    },\n    onFrontstageActivated: async () => {\n      await IModelApp.tools.run(CustomTool.toolId);\n    }\n  }\n}",
      ...(_c = (_b = Default.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
LockProperty.parameters = {
  ...LockProperty.parameters,
  docs: {
    ...(_d = LockProperty.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    onInitialize: async () => {\n      IModelApp.tools.register(LockPropertyTool, UiFramework.localizationNamespace);\n    },\n    onFrontstageActivated: async () => {\n      await IModelApp.tools.run(LockPropertyTool.toolId);\n    }\n  }\n}",
      ...(_f = (_e = LockProperty.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
CustomEditor.parameters = {
  ...CustomEditor.parameters,
  docs: {
    ...(_g = CustomEditor.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: '{\n  args: {\n    onInitialize: async () => {\n      PropertyEditorManager.registerEditor("custom-tags", CustomTagsPropertyEditor);\n      IModelApp.tools.register(CustomEditorTool, UiFramework.localizationNamespace);\n    },\n    onFrontstageActivated: async () => {\n      await IModelApp.tools.run(CustomEditorTool.toolId);\n    }\n  }\n}',
      ...(_i = (_h = CustomEditor.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
const __namedExportsOrder = ["Default", "LockProperty", "CustomEditor"];
export {
  CustomEditor,
  Default,
  LockProperty,
  __namedExportsOrder,
  meta as default
};
