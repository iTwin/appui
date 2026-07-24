import { j as jsxRuntimeExports } from "./iframe-CpRh-TYa.js";
import { A as AppUiDecorator } from "./Decorators-Bz_dH9pg.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Be3BgbZq.js";
import { s as PreviewFeaturesProvider, p as StagePanelState, g as StagePanelSection, h as StagePanelLocation, W as WidgetState } from "./appui-react-BtU_mNFj.js";
import { c as createFrontstage, a as createWidget } from "./Utils-BFxNE3WT.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DCghlnp9.js";
import "./components-react-Dj8XcCyt.js";
import "./client-Cvp-1q-B.js";
import "./blocks-DE0lqga4.js";
import "./index-_JpHN5Jx.js";
import "./Dialog-BycrGCvo.js";
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
