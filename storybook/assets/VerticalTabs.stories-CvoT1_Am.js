import { j as jsxRuntimeExports } from "./iframe-BMMt6Qh8.js";
import { A as AppUiDecorator } from "./Decorators-dFT355_j.js";
import { T as Tabs } from "./Tabs-BeZ2B-Pu.js";
import { O as Orientation } from "./Orientation-6E0suNXD.js";
import { S as Svg2D } from "./2D-CRkBmqDH.js";
import "./preload-helper-UZRgTS1n.js";
import "./appui-react-Cz4Q9cY4.js";
import "./Key.enum-DpqfsKm8.js";
import "./client-BZ3qZmlJ.js";
import "./index-B0PW13ef.js";
import "./IconComponent-Digkd5hp.js";
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
VerticalTabs.__docgenInfo = { "description": "Vertical tabs meant to represent the current position in a page/section\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/tabs#vertical iTwinUI Tabs} instead.", "methods": [], "displayName": "VerticalTabs" };
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
