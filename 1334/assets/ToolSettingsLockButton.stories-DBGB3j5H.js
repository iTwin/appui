var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { A as AppUiDecorator } from "./Decorators-Dzk7d-J6.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Qg8ERM2E.js";
import { e as PropertyEditorParamTypes, f as StandardEditorNames } from "./Dialog-DI2PG4iL.js";
import { a1 as PreviewFeaturesProvider, I as IModelApp, U as UiFramework, e as IModelViewportControl, l as StandardContentLayouts, a5 as DialogProperty, P as PropertyDescriptionHelper, a6 as LengthDescription } from "./appui-react-BhnF3Zrq.js";
import { c as createFrontstage, r as removeProperty } from "./Utils-CBjlEOQk.js";
import { L as LockPropertyTool, c as createLockPropertyTool } from "./LockPropertyTool-DoNUFLRy.js";
import "./index-DVOlmhHI.js";
import "./index-CdGyBOBZ.js";
import "./index-fGVRtO9K.js";
import "./iframe-D__3V3e7.js";
import "./index-XG6mIJUL.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-selgNRA5.js";
import "./SvgCloseSmall-CRuBXn0_.js";
import "./client-DmvY241V.js";
import "./index-6lyHBX71.js";
import "./v4-CjlX8hrF.js";
import "./StoryTool-D4uHNrwf.js";
function PreviewStory(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PreviewFeaturesProvider,
    {
      features: {
        toolSettingsLockButton: props.toolSettingsLockButton,
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
          onInitialize: async () => {
            IModelApp.tools.register(
              createLockPropertyTool({
                lockLabel: props.lockLabel,
                disabled: props.disabled,
                initialValue: props.propertyType === "number" ? 1 : void 0,
                propertyOverrides: {
                  typename: props.propertyType,
                  ...props.propertyType === "number" ? {
                    editor: {
                      name: StandardEditorNames.NumberCustom,
                      params: [
                        {
                          type: PropertyEditorParamTypes.CustomFormattedNumber,
                          formatFunction: (x) => x.toString(),
                          parseFunction: (x) => ({
                            value: Number(x),
                            parseError: void 0
                          })
                        }
                      ]
                    }
                  } : {}
                },
                properties: props.properties
              }),
              UiFramework.localizationNamespace
            );
          },
          onFrontstageActivated: async () => {
            await IModelApp.tools.run(LockPropertyTool.toolId);
          }
        }
      )
    }
  );
}
PreviewStory.__docgenInfo = { "description": "`toolSettingsLockButton` preview feature. Displays the default tool settings lock editor as an icon button rather than a checkbox.", "methods": [], "displayName": "PreviewStory", "props": { "lockLabel": { "required": false, "tsType": { "name": "string" }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" }, "propertyType": { "required": false, "tsType": { "name": "union", "raw": "`${StandardTypeNames.Boolean}` | `${StandardTypeNames.Number}`", "elements": [{ "name": "literal", "value": "`${StandardTypeNames.Boolean}`" }, { "name": "literal", "value": "`${StandardTypeNames.Number}`" }] }, "description": "" }, "properties": { "required": false, "tsType": { "name": "Array", "elements": [{ "name": "DialogItem" }], "raw": "DialogItem[]" }, "description": "" } } };
const meta = {
  title: "PreviewFeatures/ToolSettingsLockButton",
  component: PreviewStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    }
  },
  argTypes: {
    propertyType: removeProperty()
  },
  args: {
    toolSettingsLockButton: true,
    toolSettingsNewEditors: false
  }
};
const Default = {};
const DisplayLabel = {
  args: {
    lockLabel: "Toggle myProperty lock"
  }
};
const Disabled = {
  args: {
    disabled: true
  }
};
const Input = {
  args: {
    propertyType: "number"
  }
};
const EditorGroup = {
  args: {
    properties: (() => {
      const useRadius = new DialogProperty(PropertyDescriptionHelper.buildLockPropertyDescription("useRadius"), false);
      useRadius.description.displayLabel = "Lock radius property";
      const radius = new DialogProperty(PropertyDescriptionHelper.buildToggleDescription("radius", "Radius"), 1);
      const useLength = new DialogProperty(PropertyDescriptionHelper.buildLockPropertyDescription("useLength"), false);
      useLength.description.displayLabel = "Lock length property";
      const length = new DialogProperty(new LengthDescription("length", "Length"), 1);
      return [radius.toDialogItem({
        columnIndex: 0,
        rowPriority: 1
      }, useRadius.toDialogItem({
        columnIndex: 0,
        rowPriority: 1
      })), length.toDialogItem({
        columnIndex: 0,
        rowPriority: 1
      }, useLength.toDialogItem({
        columnIndex: 0,
        rowPriority: 1
      }))];
    })()
  }
};
const DefaultEditors = {
  args: {
    properties: (() => {
      let rowPriority = 1;
      function createDialogItem(dialogProperty) {
        rowPriority++;
        const lock = new DialogProperty(PropertyDescriptionHelper.buildLockPropertyDescription(`use${dialogProperty.name}`), false);
        lock.description.displayLabel = `Lock ${dialogProperty.description.displayLabel} property`;
        return dialogProperty.toDialogItem({
          columnIndex: 0,
          rowPriority
        }, lock.toDialogItem({
          columnIndex: 0,
          rowPriority
        }));
      }
      return [createDialogItem(new DialogProperty(PropertyDescriptionHelper.buildTextEditorDescription("text", "Text"), "Hello")), createDialogItem(new DialogProperty(PropertyDescriptionHelper.buildNumberEditorDescription("numeric", "Numeric"), 10)), createDialogItem(new DialogProperty(new LengthDescription("customNumber", "Custom number"), 10))];
    })()
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
DisplayLabel.parameters = {
  ...DisplayLabel.parameters,
  docs: {
    ...(_d = DisplayLabel.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: '{\n  args: {\n    lockLabel: "Toggle myProperty lock"\n  }\n}',
      ...(_f = (_e = DisplayLabel.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
Disabled.parameters = {
  ...Disabled.parameters,
  docs: {
    ...(_g = Disabled.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: "{\n  args: {\n    disabled: true\n  }\n}",
      ...(_i = (_h = Disabled.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
Input.parameters = {
  ...Input.parameters,
  docs: {
    ...(_j = Input.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: '{\n  args: {\n    propertyType: "number"\n  }\n}',
      ...(_l = (_k = Input.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
EditorGroup.parameters = {
  ...EditorGroup.parameters,
  docs: {
    ...(_m = EditorGroup.parameters) == null ? void 0 : _m.docs,
    source: {
      originalSource: '{\n  args: {\n    properties: (() => {\n      const useRadius = new DialogProperty(PropertyDescriptionHelper.buildLockPropertyDescription("useRadius"), false);\n      useRadius.description.displayLabel = "Lock radius property";\n      const radius = new DialogProperty(PropertyDescriptionHelper.buildToggleDescription("radius", "Radius"), 1);\n      const useLength = new DialogProperty(PropertyDescriptionHelper.buildLockPropertyDescription("useLength"), false);\n      useLength.description.displayLabel = "Lock length property";\n      const length = new DialogProperty(new LengthDescription("length", "Length"), 1);\n      return [radius.toDialogItem({\n        columnIndex: 0,\n        rowPriority: 1\n      }, useRadius.toDialogItem({\n        columnIndex: 0,\n        rowPriority: 1\n      })), length.toDialogItem({\n        columnIndex: 0,\n        rowPriority: 1\n      }, useLength.toDialogItem({\n        columnIndex: 0,\n        rowPriority: 1\n      }))];\n    })()\n  }\n}',
      ...(_o = (_n = EditorGroup.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
    }
  }
};
DefaultEditors.parameters = {
  ...DefaultEditors.parameters,
  docs: {
    ...(_p = DefaultEditors.parameters) == null ? void 0 : _p.docs,
    source: {
      originalSource: '{\n  args: {\n    properties: (() => {\n      let rowPriority = 1;\n      function createDialogItem<T>(dialogProperty: DialogProperty<T>) {\n        rowPriority++;\n        const lock = new DialogProperty(PropertyDescriptionHelper.buildLockPropertyDescription(`use${dialogProperty.name}`), false);\n        lock.description.displayLabel = `Lock ${dialogProperty.description.displayLabel} property`;\n        return dialogProperty.toDialogItem({\n          columnIndex: 0,\n          rowPriority\n        }, lock.toDialogItem({\n          columnIndex: 0,\n          rowPriority\n        }));\n      }\n      return [createDialogItem(new DialogProperty(PropertyDescriptionHelper.buildTextEditorDescription("text", "Text"), "Hello")), createDialogItem(new DialogProperty(PropertyDescriptionHelper.buildNumberEditorDescription("numeric", "Numeric"), 10)), createDialogItem(new DialogProperty(new LengthDescription("customNumber", "Custom number"), 10))];\n    })()\n  }\n}',
      ...(_r = (_q = DefaultEditors.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
    }
  }
};
const __namedExportsOrder = ["Default", "DisplayLabel", "Disabled", "Input", "EditorGroup", "DefaultEditors"];
export {
  Default,
  DefaultEditors,
  Disabled,
  DisplayLabel,
  EditorGroup,
  Input,
  __namedExportsOrder,
  meta as default
};
