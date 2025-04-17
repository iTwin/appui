var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
import { e as StandardContentLayouts } from "./Dialog-DRJza1Fj.js";
import { e as IModelViewportControl, U as UiFramework, x as ToolbarOrientation, y as ToolbarUsage, w as ToolbarItemUtilities, P as ConditionalIconItem, b4 as SyncUiEventId, Q as ConditionalStringValue, V as ConditionalBooleanValue } from "./appui-react-CmTEbVJu.js";
import { S as Svg2D } from "./2D-DzQW5YkV.js";
import { S as Svg3D } from "./3D-B4v4RUSy.js";
import { r as reactExports } from "./index-R26Bfrts.js";
import { S as SvgAirplane } from "./Airplane-CQfUjDO3.js";
import { S as SvgClipboard } from "./Clipboard-CBc4SDLB.js";
import { A as AppUiDecorator } from "./Decorators-Dl0WF0ZJ.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Bv90zLv2.js";
import { r as removeProperty, c as createFrontstage } from "./Utils-BpDcsy7c.js";
import "./SvgCloseSmall-QhdYiNU4.js";
import "./index-CHBBkG1-.js";
import "./iframe-B_Ok6LzO.js";
import "../sb-preview/runtime.js";
import "./_commonjs-dynamic-modules-lq-lihFa.js";
import "./index-oY8aizO2.js";
import "./client-DRUEp2wC.js";
import "./debounce-CTTNlY27.js";
import "./index-Dcibj7eN.js";
import "./index-DLlB04eo.js";
import "./index-Brmgc-W4.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-zibz9A5r.js";
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
const contentPropsArray = [];
contentPropsArray.push({
  id: "imodel-view-0",
  classId: IModelViewportControl.id
});
contentPropsArray.push({
  id: "imodel-view-1",
  classId: IModelViewportControl.id
});
let leftViewportActive = false;
const testIcon1 = () => {
  return leftViewportActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgWindowSplitVertical, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(SvgWindow, {});
};
const testIcon2 = () => {
  return leftViewportActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(Svg2D, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Svg3D, {});
};
const testIcon3 = () => {
  return leftViewportActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgClipboard, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(SvgAirplane, {});
};
UiFramework.content.onActiveContentChangedEvent.addListener(() => {
  leftViewportActive = !leftViewportActive;
});
const Default = {
  args: {
    frontstages: [createFrontstage({
      contentGroupProps: {
        id: "split-vertical-group",
        layout: StandardContentLayouts.twoVerticalSplit,
        contents: contentPropsArray
      }
    })],
    itemProviders: [{
      id: "toolbar",
      getToolbarItems: () => {
        return [...getToolbarItems(ToolbarUsage.ContentManipulation, ToolbarOrientation.Horizontal), ...getToolbarItems(ToolbarUsage.ContentManipulation, ToolbarOrientation.Vertical), ...getToolbarItems(ToolbarUsage.ViewNavigation, ToolbarOrientation.Horizontal), ...getToolbarItems(ToolbarUsage.ViewNavigation, ToolbarOrientation.Vertical)];
      }
    }]
  }
};
function getToolbarItems(usage, orientation) {
  const layouts = {
    standard: {
      usage,
      orientation
    }
  };
  return [ToolbarItemUtilities.createActionItem(`Test1and2`, 0, new ConditionalIconItem(testIcon1, [SyncUiEventId.ActiveContentChanged]), new ConditionalStringValue(() => leftViewportActive ? "Test 1" : "Test 2", [SyncUiEventId.ActiveContentChanged]), () => void 0, {
    layouts
  }), ToolbarItemUtilities.createActionItem(`Test3and4`, 1, new ConditionalIconItem(testIcon2, [SyncUiEventId.ActiveContentChanged]), new ConditionalStringValue(() => leftViewportActive ? "Test 3" : "Test 4", [SyncUiEventId.ActiveContentChanged]), () => void 0, {
    isDisabled: new ConditionalBooleanValue(() => leftViewportActive ? true : false, [SyncUiEventId.ActiveContentChanged]),
    layouts
  }), ToolbarItemUtilities.createActionItem(`Test5and6`, 2, new ConditionalIconItem(testIcon3, [SyncUiEventId.ActiveContentChanged]), new ConditionalStringValue(() => leftViewportActive ? "Test 5" : "Test 6", [SyncUiEventId.ActiveContentChanged]), () => void 0, {
    isHidden: new ConditionalBooleanValue(() => leftViewportActive ? true : false, [SyncUiEventId.ActiveContentChanged]),
    layouts
  })];
}
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    frontstages: [createFrontstage({\n      contentGroupProps: {\n        id: "split-vertical-group",\n        layout: StandardContentLayouts.twoVerticalSplit,\n        contents: contentPropsArray\n      }\n    })],\n    itemProviders: [{\n      id: "toolbar",\n      getToolbarItems: () => {\n        return [...getToolbarItems(ToolbarUsage.ContentManipulation, ToolbarOrientation.Horizontal), ...getToolbarItems(ToolbarUsage.ContentManipulation, ToolbarOrientation.Vertical), ...getToolbarItems(ToolbarUsage.ViewNavigation, ToolbarOrientation.Horizontal), ...getToolbarItems(ToolbarUsage.ViewNavigation, ToolbarOrientation.Vertical)];\n      }\n    }]\n  }\n}',
      ...(_c = (_b = Default.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Default"];
export {
  Default,
  __namedExportsOrder,
  meta as default
};
