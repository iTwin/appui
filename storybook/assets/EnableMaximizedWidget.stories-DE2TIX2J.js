import { j as jsxRuntimeExports } from "./iframe-B3XUloxp.js";
import { A as AppUiDecorator } from "./Decorators-DmHZSOgx.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Cinq1ex4.js";
import { s as PreviewFeaturesProvider, p as StagePanelState, g as StagePanelSection, h as StagePanelLocation, W as WidgetState } from "./appui-react-D3IO1OPE.js";
import { c as createFrontstage, a as createWidget } from "./Utils-BxprqsbE.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-xIiRVwX2.js";
import "./components-react-B80bIHbV.js";
import "./client-Cds6Vsas.js";
import "./blocks-DE9a-9P3.js";
import "./index-BGWDsXqX.js";
import "./Dialog-DNSDpcXN.js";
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
