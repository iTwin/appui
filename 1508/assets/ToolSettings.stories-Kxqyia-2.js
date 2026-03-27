import { r as reactExports, B as Box, c as classnames, j as jsxRuntimeExports } from "./iframe-BnF7kxuI.js";
import { bs as StandardLayout, p as StagePanelSection, q as StagePanelLocation, W as WidgetState, I as IModelViewportControl, r as PrimitiveTool, bt as EventHandled, bu as PropertyEditorBase, bv as Tag, j as IModelApp, U as UiFramework, bw as PropertyEditorManager } from "./appui-react-B7iNJbV5.js";
import { g as PropertyValueFormat } from "./Key.enum-B3pThNWo.js";
import { A as AppUiDecorator } from "./Decorators-CwkwcaGG.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-C8_Xb5kX.js";
import { c as createFrontstage, S as StandardContentLayouts, r as removeProperty } from "./Utils-IR3EMk7M.js";
import { L as LockPropertyTool } from "./LockPropertyTool-DVukU_8r.js";
import { S as StoryPrimitiveTool } from "./StoryTool-1iFqE-Nf.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-DYbOg5lC.js";
import "./index-CptIXb7J.js";
import "./blocks-BPELq9PS.js";
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
  static toolId = "example:CustomTool";
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
  static toolId = "CustomEditorTool";
  // All tags are active initially
  _activeTagIds = tagsStore.map((tag) => tag.id);
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
      if (!propertyRecord) return [];
      const params = propertyRecord.property.editor?.params;
      const tagsParam = params?.find((param) => {
        return param.type === createTagsParam.type;
      });
      return tagsParam?.tags ?? [];
    }, [propertyRecord]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TagContainer, { ref: elRef, children: tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tag,
      {
        style: {
          blockSize: "var(--iui-size-l)"
        },
        onRemove: () => {
          if (!props.propertyRecord) return;
          const tagIds = tags.map((t) => t.id);
          const newTagIds = tagIds.filter((id) => id !== tag.id);
          props.onCommit?.({
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
    ...Default.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Default.parameters?.docs?.source
    }
  }
};
LockProperty.parameters = {
  ...LockProperty.parameters,
  docs: {
    ...LockProperty.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    onInitialize: async () => {\n      IModelApp.tools.register(LockPropertyTool, UiFramework.localizationNamespace);\n    },\n    onFrontstageActivated: async () => {\n      await IModelApp.tools.run(LockPropertyTool.toolId);\n    }\n  }\n}",
      ...LockProperty.parameters?.docs?.source
    }
  }
};
CustomEditor.parameters = {
  ...CustomEditor.parameters,
  docs: {
    ...CustomEditor.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    onInitialize: async () => {\n      PropertyEditorManager.registerEditor("custom-tags", CustomTagsPropertyEditor);\n      IModelApp.tools.register(CustomEditorTool, UiFramework.localizationNamespace);\n    },\n    onFrontstageActivated: async () => {\n      await IModelApp.tools.run(CustomEditorTool.toolId);\n    }\n  }\n}',
      ...CustomEditor.parameters?.docs?.source
    }
  }
};
Widget.parameters = {
  ...Widget.parameters,
  docs: {
    ...Widget.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    mode: "widget"\n  }\n}',
      ...Widget.parameters?.docs?.source
    }
  }
};
Floating.parameters = {
  ...Floating.parameters,
  docs: {
    ...Floating.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    mode: "floating"\n  }\n}',
      ...Floating.parameters?.docs?.source
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
