var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { a as StandardContentLayouts } from "./Key.enum-BB2gw-WQ.js";
import { U as UiFramework, T as ToolbarItemUtilities, g as ConditionalIconItem, a$ as SyncUiEventId, ax as ConditionalStringValue, aU as ConditionalBooleanValue, d as IModelViewportControl } from "./DefaultToolSettingsProvider-B6B80iEN.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import { S as Svg2D } from "./2D-BxdbF6B_.js";
import { S as Svg3D } from "./3D-DAP4mQ8M.js";
import { S as SvgAirplane } from "./Airplane-nk1HFfHW.js";
import { S as SvgClipboard } from "./Clipboard-DybwOk7j.js";
import "./index-EDRsojbr.js";
import { A as AppUiDecorator } from "./Decorators-CU-vvLY2.js";
import { A as AppUiStory, P as Page, r as removeProperty, c as createFrontstage } from "./AppUiStory-oEM4RWbs.js";
import "./iframe-C1TMdbVu.js";
import "../sb-preview/runtime.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-B47T7vRo.js";
import "./index-n0FlVOjm.js";
import "./index-Cp4dr_sK.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-DuWsADYF.js";
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
try {
  SplitViewportStory.displayName = "SplitViewportStory";
  SplitViewportStory.__docgenInfo = { "description": "This story shows two separate views. Depending on which view is active, the tools in the toolbars will change", "displayName": "SplitViewportStory", "props": { "frontstages": { "defaultValue": null, "description": "", "name": "frontstages", "required": false, "type": { "name": "FrontstageConfig[] | (() => FrontstageConfig[])" } }, "itemProviders": { "defaultValue": null, "description": "", "name": "itemProviders", "required": false, "type": { "name": "UiItemsProvider[]" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
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
      provideToolbarItems: () => [ToolbarItemUtilities.createActionItem(`Test1and2`, 0, new ConditionalIconItem(testIcon1, [SyncUiEventId.ActiveContentChanged]), new ConditionalStringValue(() => leftViewportActive ? "Test 1" : "Test 2", [SyncUiEventId.ActiveContentChanged]), () => void 0), ToolbarItemUtilities.createActionItem(`Test3and4`, 1, new ConditionalIconItem(testIcon2, [SyncUiEventId.ActiveContentChanged]), new ConditionalStringValue(() => leftViewportActive ? "Test 3" : "Test 4", [SyncUiEventId.ActiveContentChanged]), () => void 0, {
        isDisabled: new ConditionalBooleanValue(() => leftViewportActive ? true : false, [SyncUiEventId.ActiveContentChanged])
      }), ToolbarItemUtilities.createActionItem(`Test5and6`, 2, new ConditionalIconItem(testIcon3, [SyncUiEventId.ActiveContentChanged]), new ConditionalStringValue(() => leftViewportActive ? "Test 5" : "Test 6", [SyncUiEventId.ActiveContentChanged]), () => void 0, {
        isHidden: new ConditionalBooleanValue(() => leftViewportActive ? true : false, [SyncUiEventId.ActiveContentChanged])
      })]
    }]
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    frontstages: [createFrontstage({\n      contentGroupProps: {\n        id: "split-vertical-group",\n        layout: StandardContentLayouts.twoVerticalSplit,\n        contents: contentPropsArray\n      }\n    })],\n    itemProviders: [{\n      id: "toolbar",\n      provideToolbarItems: () => [ToolbarItemUtilities.createActionItem(`Test1and2`, 0, new ConditionalIconItem(testIcon1, [SyncUiEventId.ActiveContentChanged]), new ConditionalStringValue(() => leftViewportActive ? "Test 1" : "Test 2", [SyncUiEventId.ActiveContentChanged]), () => undefined), ToolbarItemUtilities.createActionItem(`Test3and4`, 1, new ConditionalIconItem(testIcon2, [SyncUiEventId.ActiveContentChanged]), new ConditionalStringValue(() => leftViewportActive ? "Test 3" : "Test 4", [SyncUiEventId.ActiveContentChanged]), () => undefined, {\n        isDisabled: new ConditionalBooleanValue(() => leftViewportActive ? true : false, [SyncUiEventId.ActiveContentChanged])\n      }), ToolbarItemUtilities.createActionItem(`Test5and6`, 2, new ConditionalIconItem(testIcon3, [SyncUiEventId.ActiveContentChanged]), new ConditionalStringValue(() => leftViewportActive ? "Test 5" : "Test 6", [SyncUiEventId.ActiveContentChanged]), () => undefined, {\n        isHidden: new ConditionalBooleanValue(() => leftViewportActive ? true : false, [SyncUiEventId.ActiveContentChanged])\n      })]\n    }]\n  }\n}',
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
