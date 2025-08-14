var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
import { r as reactExports, B as Box, c as classnames, j as jsxRuntimeExports } from "./iframe-CxthnN3M.js";
import { bg as StandardLayout, q as StagePanelSection, r as StagePanelLocation, W as WidgetState, e as IModelViewportControl, n as StandardContentLayouts, y as PrimitiveTool, bh as EventHandled, bi as PropertyEditorBase, bj as Tag, I as IModelApp, U as UiFramework, bk as PropertyEditorManager } from "./appui-react-ARYPQBMf.js";
import { g as PropertyValueFormat } from "./Key.enum-DoKni0Tv.js";
import { A as AppUiDecorator } from "./Decorators-B5hwbz68.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-C4ZFYGXQ.js";
import { c as createFrontstage, r as removeProperty } from "./Utils-CNFWIpMY.js";
import { L as LockPropertyTool } from "./LockPropertyTool-x6eEbYqA.js";
import { S as StoryPrimitiveTool } from "./StoryTool-CYMsBjZ7.js";
import "./client-CRBvtWy6.js";
import "./blocks-C_Wwc0G-.js";
import "./Divider-BPouWLfT.js";
const TagContainer = reactExports.forwardRef((props, forwardedRef) => {
  let { className, children, overflow, background = "none", ...rest } = props;
  return reactExports.createElement(
    Box,
    {
      className: classnames(
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
  const { mode, ...rest } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
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
          hideToolSettings: false,
          toolSettings: {
            id: "toolSettings",
            defaultState: mode === "floating" ? WidgetState.Floating : void 0
          },
          layout: /* @__PURE__ */ jsxRuntimeExports.jsx(
            StandardLayout,
            {
              toolSettings: {
                defaultLocation: mode === void 0 ? void 0 : {
                  location: StagePanelLocation.Right,
                  section: StagePanelSection.Start
                }
              }
            }
          )
        })
      ],
      ...rest
    }
  );
}
ToolSettingsStory.__docgenInfo = { "description": "[FrontstageProvider](https://www.itwinjs.org/reference/appui-react/frontstage/frontstageprovider/) can be used to configure a frontstage.", "methods": [], "displayName": "ToolSettingsStory", "props": { "mode": { "required": false, "tsType": { "name": "union", "raw": '"widget" | "floating"', "elements": [{ "name": "literal", "value": '"widget"' }, { "name": "literal", "value": '"floating"' }] }, "description": "" } }, "composes": ["Pick"] };
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
class CustomEditorTool extends StoryPrimitiveTool {
  constructor() {
    super(...arguments);
    // All tags are active initially
    __publicField(this, "_activeTagIds", tagsStore.map((tag) => tag.id));
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
    onInitialize: async () => {
      IModelApp.tools.register(CustomTool, UiFramework.localizationNamespace);
    },
    onFrontstageActivated: async () => {
      await IModelApp.tools.run(CustomTool.toolId);
    }
  },
  argTypes: {
    mode: removeProperty(),
    onFrontstageActivated: removeProperty(),
    onInitialize: removeProperty()
  }
};
const Default = {};
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
const Widget = {
  args: {
    mode: "widget"
  }
};
const Floating = {
  args: {
    mode: "floating"
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
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
Widget.parameters = {
  ...Widget.parameters,
  docs: {
    ...(_j = Widget.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: '{\n  args: {\n    mode: "widget"\n  }\n}',
      ...(_l = (_k = Widget.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
Floating.parameters = {
  ...Floating.parameters,
  docs: {
    ...(_m = Floating.parameters) == null ? void 0 : _m.docs,
    source: {
      originalSource: '{\n  args: {\n    mode: "floating"\n  }\n}',
      ...(_o = (_n = Floating.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
    }
  }
};
const __namedExportsOrder = ["Default", "LockProperty", "CustomEditor", "Widget", "Floating"];
export {
  CustomEditor,
  Default,
  Floating,
  LockProperty,
  Widget,
  __namedExportsOrder,
  meta as default
};
