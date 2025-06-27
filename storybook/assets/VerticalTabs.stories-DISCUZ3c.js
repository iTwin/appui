var _a, _b, _c;
import { j as jsxRuntimeExports } from "./iframe-DqVel35l.js";
import { A as AppUiDecorator } from "./Decorators-CuZoHGwj.js";
import { T as Tabs } from "./Tabs-X7CxTUX9.js";
import { O as Orientation } from "./Orientation-6E0suNXD.js";
import { S as Svg2D } from "./2D-DLeoN63m.js";
import "./appui-react-DMgRmWeu.js";
import "./Key.enum-DIxXXS_n.js";
import "./client-BghBGm9p.js";
import "./IconComponent-Bfhcukrz.js";
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
