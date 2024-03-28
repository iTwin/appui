var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-_iMjpMZ4.js";
import { A as AppUiDecorator } from "./Decorators-CXFXT6hr.js";
import { A as AppUiStory, c as createFrontstageProvider, P as Page } from "./AppUiStory-D5E0VaUP.js";
import { P as PreviewFeaturesProvider, S as StagePanelState, a as StagePanelLocation, b as StagePanelSection, W as WidgetState } from "./DefaultToolSettingsProvider-Do4qbEAN.js";
import "./index-DlkhCVTf.js";
import "./index-Cm_5MPU1.js";
import "./index-D-MXbloY.js";
import "./iframe-kR_u1aqe.js";
import "../sb-preview/runtime.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BmmMfuHC.js";
import "./index-Cp4dr_sK.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./ToolbarComposer-BjvTER5Z.js";
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
          frontstageProviders: [
            createFrontstageProvider({
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
  title: "preview features/WidgetActionDropdown",
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
