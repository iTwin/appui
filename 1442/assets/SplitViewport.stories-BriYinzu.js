import { r as reactExports, j as jsxRuntimeExports } from "./iframe-BIXwoC80.js";
import { h as StandardContentLayouts } from "./Key.enum-B-WhjwuV.js";
import { E as ToolbarOrientation, z as ToolbarUsage, y as ToolbarItemUtilities, b5 as ConditionalBooleanValue, U as UiFramework, b6 as SyncUiEventId } from "./appui-react-CNLcJNb9.js";
import { A as AppUiDecorator } from "./Decorators-CZIShNLG.js";
import { A as AppUiStory, P as Page, V as ViewportContent } from "./AppUiStory-DrM_MNQm.js";
import { r as removeProperty, c as createFrontstage } from "./Utils-CICO5XQv.js";
import "./client-dvjUKoP6.js";
import "./blocks-DA_2Rxbk.js";
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
