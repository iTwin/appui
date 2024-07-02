var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { A as AppUiDecorator } from "./Decorators-CzmLt7AA.js";
import { A as AppUiStory, c as createFrontstage, a as createWidget, P as Page } from "./AppUiStory-nqk_Q9zz.js";
import { P as PreviewFeaturesProvider, g as StagePanelState, i as StagePanelLocation, j as StagePanelSection, W as WidgetState } from "./DefaultToolSettingsProvider-DIShliKp.js";
import "./Key.enum-BpJjJDFT.js";
import "./index-DM9bPmif.js";
import "./index-EDRsojbr.js";
import "./index-CUkxFfN0.js";
import "./iframe-pWcJHFO-.js";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PreviewFeaturesProvider,
    {
      features: {
        enableMaximizedFloatingWidget: true,
        horizontalPanelAlignment: true,
        widgetActionDropdown: { threshold: props.threshold }
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
      )
    }
  );
}
try {
  PreviewStory.displayName = "PreviewStory";
  PreviewStory.__docgenInfo = { "description": "`widgetActionDropdown` preview feature. When widget title bar buttons exceed the specified threshold a drop down menu is rendered instead.", "displayName": "PreviewStory", "props": { "threshold": { "defaultValue": null, "description": "", "name": "threshold", "required": true, "type": { "name": "number" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "PreviewFeatures/WidgetActionDropdown",
  component: PreviewStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    }
  },
  args: {
    threshold: 2
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
