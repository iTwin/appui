import { j as jsxRuntimeExports } from "./iframe-D6etZYKx.js";
import { A as AppUiDecorator } from "./Decorators-DZ6kqoP-.js";
import { T as Tabs } from "./Tabs-Dvwcv1Oc.js";
import { O as Orientation } from "./Orientation-6E0suNXD.js";
import { S as Svg2D } from "./2D-DWEYfKQ3.js";
import "./preload-helper-UZRgTS1n.js";
import "./appui-react-DQPnIqIU.js";
import "./Key.enum-DxiaZ4K2.js";
import "./components-react-CcAoSHHf.js";
import "./client-8d8O9vwT.js";
import "./index-D6OYgiXS.js";
import "./Dialog-CnMxc27J.js";
import "./IconComponent-T2rUGpBL.js";
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
VerticalTabs.__docgenInfo = { "description": "Vertical tabs meant to represent the current position in a page/section\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/tabs#vertical iTwinUI Tabs} instead.", "methods": [], "displayName": "VerticalTabs", "props": { "className": { "required": false, "tsType": { "name": "string" }, "description": "Custom CSS class name" }, "style": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS style properties" }, "itemId": { "required": false, "tsType": { "name": "string" }, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id" }, "labels": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "union", "raw": "string | TabLabel", "elements": [{ "name": "string" }, { "name": "TabLabel" }] }], "raw": "Array<string | TabLabel>" }, "description": "Text shown for each tab" }, "onActivateTab": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(index: number) => any", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "index" }], "return": { "name": "any" } } }, "description": "Handler for activating a tab" }, "activeIndex": { "required": false, "tsType": { "name": "number" }, "description": "Index of the initial active tab" }, "green": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the bar on the active tab is green instead of the default blue" } } };
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
    ...Basic.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Basic.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
