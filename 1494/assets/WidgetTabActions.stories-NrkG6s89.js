import { j as jsxRuntimeExports } from "./iframe-BmX5H014.js";
import { A as AppUiDecorator } from "./Decorators-BplH5p6g.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Cv85Pvas.js";
import { H as PreviewFeaturesProvider, u as StagePanelState } from "./appui-react-DXkFctUx.js";
import { c as createFrontstage, a as createWidget } from "./Utils-C4oq2jmg.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DvCHltQ0.js";
import "./blocks-CrcdVEJ9.js";
import "./index-D95LU0cB.js";
import "./client-M2bM1T3-.js";
function PreviewStory(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PreviewFeaturesProvider,
    {
      features: {
        controlWidgetVisibility: true,
        widgetTabActions: true,
        ...props
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
    enableMaximizedFloatingWidget: false,
    enableMaximizedPanelWidget: false
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
