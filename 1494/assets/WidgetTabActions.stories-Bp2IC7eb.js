import { j as jsxRuntimeExports } from "./iframe-BTOKt8sb.js";
import { A as AppUiDecorator } from "./Decorators-D0L63dT9.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-DWrXMzNt.js";
import { H as PreviewFeaturesProvider, u as StagePanelState } from "./appui-react-nOGh2M21.js";
import { c as createFrontstage, a as createWidget } from "./Utils-DSy70KJB.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DdwJ-Wkg.js";
import "./blocks-D95ser5u.js";
import "./index-C8w0C_Xr.js";
import "./client-BuoZTSzj.js";
function PreviewStory() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PreviewFeaturesProvider,
    {
      features: {
        controlWidgetVisibility: true,
        widgetTabActions: true
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppUiStory,
        {
          itemProviders: [
            {
              id: "widgets",
              getWidgets: () => {
                return [
                  createWidget(1),
                  createWidget(2),
                  createWidget(3),
                  createWidget(4),
                  createWidget(5)
                ];
              }
            }
          ],
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
PreviewStory.__docgenInfo = { "description": "`widgetTabActions` preview feature. Widget tab actions are displayed for individual tabs instead of the default behavior where only active tab actions are exposed.", "methods": [], "displayName": "PreviewStory" };
const meta = {
  title: "PreviewFeatures/WidgetTabActions",
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
