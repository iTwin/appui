var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { A as AppUiDecorator } from "./Decorators-CXFrraVc.js";
import { A as AppUiStory, c as createFrontstage, a as createWidget, P as Page } from "./AppUiStory-4-AayLg_.js";
import { P as PreviewFeaturesProvider, g as StagePanelState, i as StagePanelLocation, j as StagePanelSection, W as WidgetState } from "./DefaultToolSettingsProvider-BeaL6ll4.js";
import "./Key.enum-Nky5yUvk.js";
import "./index-DM9bPmif.js";
import "./index-EDRsojbr.js";
import "./index-_WnuOxD8.js";
import "./iframe-vMT8xG5O.js";
import "../sb-preview/runtime.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-Cp4dr_sK.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-DuWsADYF.js";
import "./index-B47T7vRo.js";
function createProvider() {
  return {
    id: "widgets",
    getWidgets: () => {
      return [
        createWidget(1, {
          canPopout: true,
          layouts: {
            standard: {
              location: StagePanelLocation.Bottom,
              section: StagePanelSection.Start
            }
          }
        }),
        createWidget(2, {
          defaultState: WidgetState.Floating
        })
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
      frontstages: [
        createFrontstage({
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
  PreviewStory.__docgenInfo = { "description": '`enableMaximizedFloatingWidget` and `enableMaximizedPanelWidget` preview features. When enabled the widget will have a "maximize" button.', "displayName": "PreviewStory", "props": { "enableMaximizedFloatingWidget": { "defaultValue": null, "description": 'If `true`, the floating widget will have a "maximize" button. Use `enableMaximizedPanelWidget` to enable the feature for panel widgets.\n\nDiscuss or upvote this feature: https://github.com/iTwin/appui/discussions/673', "name": "enableMaximizedFloatingWidget", "required": true, "type": { "name": "boolean" } }, "enableMaximizedPanelWidget": { "defaultValue": null, "description": 'If `true`, the panel widget will have a "maximize" button. Use `enableMaximizedFloatingWidget` to enable the feature for floating widgets.\n\nDiscuss or upvote this feature: https://github.com/iTwin/appui/discussions/673', "name": "enableMaximizedPanelWidget", "required": true, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "PreviewFeatures/EnableMaximizedWidget",
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
