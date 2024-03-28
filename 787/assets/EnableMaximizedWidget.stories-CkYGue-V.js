var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-_iMjpMZ4.js";
import { A as AppUiDecorator } from "./Decorators-C3AIcKoW.js";
import { A as AppUiStory, c as createFrontstageProvider, P as Page } from "./AppUiStory-BtwpH1aH.js";
import { P as PreviewFeaturesProvider, S as StagePanelState, a as StagePanelLocation, b as StagePanelSection, W as WidgetState } from "./DefaultToolSettingsProvider-DnwPMY8p.js";
import "./index-DlkhCVTf.js";
import "./index-Cm_5MPU1.js";
import "./index-Dr-11776.js";
import "./iframe-DDgUOPmj.js";
import "../sb-preview/runtime.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BmmMfuHC.js";
import "./index-Cp4dr_sK.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./ToolbarComposer-BHflxGDg.js";
import "./DemoIModel-4Lmk67sy.js";
import "./index-B47T7vRo.js";
function createProvider() {
  return {
    id: "widgets",
    getWidgets: () => {
      return [
        {
          id: "w1",
          label: "Widget 1",
          canPopout: true,
          layouts: {
            standard: {
              location: StagePanelLocation.Bottom,
              section: StagePanelSection.Start
            }
          }
        },
        {
          id: "w2",
          label: "Widget 2",
          defaultState: WidgetState.Floating,
          layouts: {
            standard: {
              location: StagePanelLocation.Left,
              section: StagePanelSection.Start
            }
          }
        }
      ];
    }
  };
}
function PreviewStory(props) {
  const provider = createProvider();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewFeaturesProvider, { features: props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      itemProviders: [provider],
      frontstageProviders: [
        createFrontstageProvider({
          leftPanelProps: {
            defaultState: StagePanelState.Open,
            pinned: true
          }
        })
      ]
    }
  ) });
}
try {
  PreviewStory.displayName = "PreviewStory";
  PreviewStory.__docgenInfo = { "description": '`enableMaximizedFloatingWidget` and `enableMaximizedPanelWidget` preview features. When enabled the widget will have a "maximize" button.', "displayName": "PreviewStory", "props": { "enableMaximizedFloatingWidget": { "defaultValue": null, "description": 'If true, the floating widget will have a "maximize" button. Use `enableMaximizedPanelWidget` to enable the feature for panel widgets.\n\nDiscuss or upvote this feature: https://github.com/iTwin/appui/discussions/673', "name": "enableMaximizedFloatingWidget", "required": true, "type": { "name": "boolean" } }, "enableMaximizedPanelWidget": { "defaultValue": null, "description": 'If true, the panel widget will have a "maximize" button. Use `enableMaximizedFloatingWidget` to enable the feature for floating widgets.\n\nDiscuss or upvote this feature: https://github.com/iTwin/appui/discussions/673', "name": "enableMaximizedPanelWidget", "required": true, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "preview features/EnableMaximizedWidget",
  component: PreviewStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    }
  },
  args: {
    enableMaximizedFloatingWidget: true,
    enableMaximizedPanelWidget: true
  }
};
const Default = {};
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
const __namedExportsOrder = ["Default"];
export {
  Default,
  __namedExportsOrder,
  meta as default
};
