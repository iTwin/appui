var _a, _b, _c, _d, _e, _f, _g, _h, _i;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { aa as PreviewFeaturesProvider, e as IModelViewportControl, k as StandardContentLayouts, I as IModelApp, U as UiFramework } from "./appui-react-LueifSWM.js";
import "./Dialog-CN-4EM2U.js";
import { A as AppUiDecorator } from "./Decorators-CcQMf0yo.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-DOwBaQxa.js";
import { c as createFrontstage, r as removeProperty } from "./Utils-ByW3no5g.js";
import { L as LockPropertyTool, c as createLockPropertyTool } from "./LockPropertyTool-nwgGDvD4.js";
import "./index-DVOlmhHI.js";
import "./index-CdGyBOBZ.js";
import "./iframe-DF9vPGyf.js";
import "./SvgCloseSmall-C39sWAi9.js";
import "./client-DmvY241V.js";
import "./index-CYeXNEdh.js";
import "./index-XG6mIJUL.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-selgNRA5.js";
import "./index-6lyHBX71.js";
import "./v4-CjlX8hrF.js";
function PreviewStory(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PreviewFeaturesProvider,
    {
      features: {
        toolSettingsLockButton: props.toolSettingsLockButton
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
          ...props
        }
      )
    }
  );
}
PreviewStory.__docgenInfo = { "description": "`toolSettingsLockButton` preview feature. Displays the default tool settings lock editor as an icon button rather than a checkbox.", "methods": [], "displayName": "PreviewStory" };
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
    onFrontstageActivated: removeProperty(),
    onInitialize: removeProperty()
  },
  args: {
    toolSettingsLockButton: true
  }
};
const Default = {
  args: {
    onInitialize: async () => {
      IModelApp.tools.register(LockPropertyTool, UiFramework.localizationNamespace);
    },
    onFrontstageActivated: async () => {
      await IModelApp.tools.run(LockPropertyTool.toolId);
    }
  }
};
const DisplayLabel = {
  args: {
    onInitialize: async () => {
      IModelApp.tools.register(createLockPropertyTool({
        lockLabel: "Toggle myProperty lock"
      }), UiFramework.localizationNamespace);
    },
    onFrontstageActivated: async () => {
      await IModelApp.tools.run(LockPropertyTool.toolId);
    }
  }
};
const Disabled = {
  args: {
    onInitialize: async () => {
      IModelApp.tools.register(createLockPropertyTool({
        disabled: true
      }), UiFramework.localizationNamespace);
    },
    onFrontstageActivated: async () => {
      await IModelApp.tools.run(LockPropertyTool.toolId);
    }
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  args: {\n    onInitialize: async () => {\n      IModelApp.tools.register(LockPropertyTool, UiFramework.localizationNamespace);\n    },\n    onFrontstageActivated: async () => {\n      await IModelApp.tools.run(LockPropertyTool.toolId);\n    }\n  }\n}",
      ...(_c = (_b = Default.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
DisplayLabel.parameters = {
  ...DisplayLabel.parameters,
  docs: {
    ...(_d = DisplayLabel.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: '{\n  args: {\n    onInitialize: async () => {\n      IModelApp.tools.register(createLockPropertyTool({\n        lockLabel: "Toggle myProperty lock"\n      }), UiFramework.localizationNamespace);\n    },\n    onFrontstageActivated: async () => {\n      await IModelApp.tools.run(LockPropertyTool.toolId);\n    }\n  }\n}',
      ...(_f = (_e = DisplayLabel.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
Disabled.parameters = {
  ...Disabled.parameters,
  docs: {
    ...(_g = Disabled.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: "{\n  args: {\n    onInitialize: async () => {\n      IModelApp.tools.register(createLockPropertyTool({\n        disabled: true\n      }), UiFramework.localizationNamespace);\n    },\n    onFrontstageActivated: async () => {\n      await IModelApp.tools.run(LockPropertyTool.toolId);\n    }\n  }\n}",
      ...(_i = (_h = Disabled.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
const __namedExportsOrder = ["Default", "DisplayLabel", "Disabled"];
export {
  Default,
  Disabled,
  DisplayLabel,
  __namedExportsOrder,
  meta as default
};
