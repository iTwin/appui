import { r as reactExports, j as jsxRuntimeExports } from "./iframe-D6etZYKx.js";
import { i as StandardContentLayouts } from "./Key.enum-DxiaZ4K2.js";
import { a1 as ConditionalBooleanValue } from "./components-react-CcAoSHHf.js";
import { o as ToolbarOrientation, n as ToolbarUsage, m as ToolbarItemUtilities, U as UiFramework, az as SyncUiEventId } from "./appui-react-DQPnIqIU.js";
import { A as AppUiDecorator } from "./Decorators-DZ6kqoP-.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Cke2SHqr.js";
import { c as createFrontstage, r as removeProperty } from "./Utils-WX8e-cwd.js";
import { V as ViewportContent } from "./ViewportContent-DdbXomyu.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-8d8O9vwT.js";
import "./index-D6OYgiXS.js";
import "./Dialog-CnMxc27J.js";
import "./blocks-C98UqoJ1.js";
const SvgWindowSplitVertical = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M0 0v16h16V0zm12 1h1v1h-1zM1 4h6v11H1zm14 11H8V4h7zM14 2V1h1v1z" })
  );
};
const SvgWindow = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M0 0v16h16V0zm12 1h1v1h-1zM1 15V4h14v11zM14 2V1h1v1z" })
  );
};
function SplitViewportStory(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { layout: "fullscreen", ...props });
}
SplitViewportStory.__docgenInfo = { "description": "This story shows two separate views. Depending on which view is active, the tools in the toolbars will change", "methods": [], "displayName": "SplitViewportStory" };
const meta = {
  title: "Frontstage/SplitViewport",
  component: SplitViewportStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    },
    layout: "fullscreen"
  },
  argTypes: {
    frontstages: removeProperty(),
    itemProviders: removeProperty()
  }
};
const Default = {
  args: {
    frontstages: [createFrontstage({
      contentGroupProps: {
        id: "split-vertical-group",
        layout: StandardContentLayouts.twoVerticalSplit,
        contents: [{
          id: "view-0",
          classId: "",
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(ViewportContent, {})
        }, {
          id: "view-1",
          classId: "",
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(ViewportContent, {})
        }]
      }
    })],
    itemProviders: [{
      id: "toolbar",
      getToolbarItems: () => {
        const layouts = {
          standard: {
            usage: ToolbarUsage.ContentManipulation,
            orientation: ToolbarOrientation.Horizontal
          }
        };
        return [ToolbarItemUtilities.createActionItem({
          id: "action1",
          label: "Action 1",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgWindow, {}),
          isHidden: new ConditionalBooleanValue(() => UiFramework.content.getActiveId() === "view-0" ? false : true, [SyncUiEventId.ActiveContentChanged]),
          layouts
        }), ToolbarItemUtilities.createActionItem({
          id: "action2",
          label: "Action 2",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgWindowSplitVertical, {}),
          isHidden: new ConditionalBooleanValue(() => UiFramework.content.getActiveId() === "view-1" ? false : true, [SyncUiEventId.ActiveContentChanged]),
          layouts
        })];
      }
    }]
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...Default.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    frontstages: [createFrontstage({\n      contentGroupProps: {\n        id: "split-vertical-group",\n        layout: StandardContentLayouts.twoVerticalSplit,\n        contents: [{\n          id: "view-0",\n          classId: "",\n          content: <ViewportContent />\n        }, {\n          id: "view-1",\n          classId: "",\n          content: <ViewportContent />\n        }]\n      }\n    })],\n    itemProviders: [{\n      id: "toolbar",\n      getToolbarItems: () => {\n        const layouts = {\n          standard: {\n            usage: ToolbarUsage.ContentManipulation,\n            orientation: ToolbarOrientation.Horizontal\n          }\n        };\n        return [ToolbarItemUtilities.createActionItem({\n          id: "action1",\n          label: "Action 1",\n          icon: <SvgWindow />,\n          isHidden: new ConditionalBooleanValue(() => UiFramework.content.getActiveId() === "view-0" ? false : true, [SyncUiEventId.ActiveContentChanged]),\n          layouts\n        }), ToolbarItemUtilities.createActionItem({\n          id: "action2",\n          label: "Action 2",\n          icon: <SvgWindowSplitVertical />,\n          isHidden: new ConditionalBooleanValue(() => UiFramework.content.getActiveId() === "view-1" ? false : true, [SyncUiEventId.ActiveContentChanged]),\n          layouts\n        })];\n      }\n    }]\n  }\n}',
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
