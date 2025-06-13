var _a, _b, _c;
import { j as jsxRuntimeExports } from "./iframe-DMCF11ZE.js";
import { A as AppUiDecorator } from "./Decorators-CaBmzxJR.js";
import { T as Tabs } from "./Tabs-BrUjXXU1.js";
import { O as Orientation } from "./Orientation-6E0suNXD.js";
import { S as Svg2D } from "./2D-5OsS98-R.js";
import "./appui-react-Cn73l-Bp.js";
import "./Key.enum-jv_2YNFv.js";
import "./client-DS_KHKKa.js";
import "./IconComponent-ZllOcSna.js";
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
