var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { A as AppUiDecorator } from "./Decorators-CXFrraVc.js";
import { T as Tabs } from "./Tabs-C_YAbWIt.js";
import { O as Orientation } from "./Orientation-6E0suNXD.js";
import { S as Svg2D } from "./2D-BxdbF6B_.js";
import "./index-DM9bPmif.js";
import "./DefaultToolSettingsProvider-BeaL6ll4.js";
import "./Key.enum-Nky5yUvk.js";
import "./iframe-vMT8xG5O.js";
import "../sb-preview/runtime.js";
import "./index-EDRsojbr.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-B47T7vRo.js";
import "./IconComponent-DxMcMd2c.js";
function VerticalTabs(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Tabs,
    {
      mainClassName: "uicore-tabs-vertical",
      orientation: Orientation.Vertical,
      ...props
    }
  );
}
try {
  VerticalTabs.displayName = "VerticalTabs";
  VerticalTabs.__docgenInfo = { "description": "Vertical tabs meant to represent the current position in a page/section", "displayName": "VerticalTabs", "props": { "labels": { "defaultValue": null, "description": "Text shown for each tab", "name": "labels", "required": true, "type": { "name": "(string | TabLabel)[]" } }, "onActivateTab": { "defaultValue": null, "description": "Handler for activating a tab", "name": "onActivateTab", "required": false, "type": { "name": "((index: number) => any)" } }, "activeIndex": { "defaultValue": null, "description": "Index of the initial active tab", "name": "activeIndex", "required": false, "type": { "name": "number" } }, "green": { "defaultValue": null, "description": "Indicates whether the bar on the active tab is green instead of the default blue", "name": "green", "required": false, "type": { "name": "boolean" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "Deprecated/VerticalTabs",
  component: VerticalTabs,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  args: {
    labels: [{
      label: "Tab 1",
      tabId: "tab1",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Svg2D, {}),
      subLabel: "Sublabel 1",
      tooltip: "Tooltip 1"
    }, "Tab 2", "Tab 3"]
  }
};
const Basic = {};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
