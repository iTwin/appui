import { j as jsxRuntimeExports } from "./iframe-BIXwoC80.js";
import { A as AppUiDecorator } from "./Decorators-CZIShNLG.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-DrM_MNQm.js";
import { Y as PreviewFeaturesProvider, G as StagePanelState, r as StagePanelSection, s as StagePanelLocation, W as WidgetState } from "./appui-react-CNLcJNb9.js";
import { c as createFrontstage, a as createWidget } from "./Utils-CICO5XQv.js";
import "./Key.enum-B-WhjwuV.js";
import "./blocks-DA_2Rxbk.js";
import "./client-dvjUKoP6.js";
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
    ...Default.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Default.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Default"];
export {
  Default,
  __namedExportsOrder,
  meta as default
};
