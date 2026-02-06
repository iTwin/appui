import { j as jsxRuntimeExports } from "./iframe-BmX5H014.js";
import { A as AppUiDecorator } from "./Decorators-BplH5p6g.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Cv85Pvas.js";
import { H as PreviewFeaturesProvider, u as StagePanelState, o as StagePanelSection, p as StagePanelLocation, W as WidgetState } from "./appui-react-DXkFctUx.js";
import { c as createFrontstage, a as createWidget } from "./Utils-C4oq2jmg.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DvCHltQ0.js";
import "./blocks-CrcdVEJ9.js";
import "./index-D95LU0cB.js";
import "./client-M2bM1T3-.js";
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
