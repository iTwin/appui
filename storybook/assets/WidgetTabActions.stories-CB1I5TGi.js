import { j as jsxRuntimeExports } from "./iframe-D6etZYKx.js";
import { A as AppUiDecorator } from "./Decorators-DZ6kqoP-.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Cke2SHqr.js";
import { s as PreviewFeaturesProvider, p as StagePanelState } from "./appui-react-DQPnIqIU.js";
import { c as createFrontstage, a as createWidget } from "./Utils-WX8e-cwd.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DxiaZ4K2.js";
import "./components-react-CcAoSHHf.js";
import "./client-8d8O9vwT.js";
import "./blocks-C98UqoJ1.js";
import "./index-D6OYgiXS.js";
import "./Dialog-CnMxc27J.js";
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
