import { j as jsxRuntimeExports } from "./iframe-BMMt6Qh8.js";
import { A as AppUiDecorator } from "./Decorators-dFT355_j.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Dny5S618.js";
import { K as PreviewFeaturesProvider, w as StagePanelState, p as StagePanelSection, q as StagePanelLocation, W as WidgetState } from "./appui-react-Cz4Q9cY4.js";
import { c as createFrontstage, a as createWidget } from "./Utils-7SBuMPvL.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DpqfsKm8.js";
import "./blocks-KaRYsgKH.js";
import "./index-B0PW13ef.js";
import "./client-BZ3qZmlJ.js";
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
PreviewStory.__docgenInfo = { "description": '`enableMaximizedFloatingWidget` and `enableMaximizedPanelWidget` preview features. When enabled the widget will have a "maximize" button.', "methods": [], "displayName": "PreviewStory" };
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
