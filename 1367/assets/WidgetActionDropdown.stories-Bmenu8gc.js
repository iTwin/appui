var _a, _b, _c;
import { j as jsxRuntimeExports } from "./iframe-CxthnN3M.js";
import { A as AppUiDecorator } from "./Decorators-B5hwbz68.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-C4ZFYGXQ.js";
import { ab as PreviewFeaturesProvider, H as StagePanelState, q as StagePanelSection, r as StagePanelLocation, W as WidgetState } from "./appui-react-ARYPQBMf.js";
import { c as createFrontstage, a as createWidget } from "./Utils-CNFWIpMY.js";
import "./Key.enum-DoKni0Tv.js";
import "./blocks-C_Wwc0G-.js";
import "./Divider-BPouWLfT.js";
import "./client-CRBvtWy6.js";
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
PreviewStory.__docgenInfo = { "description": "`widgetActionDropdown` preview feature. When widget title bar buttons exceed the specified threshold a drop down menu is rendered instead.", "methods": [], "displayName": "PreviewStory" };
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
