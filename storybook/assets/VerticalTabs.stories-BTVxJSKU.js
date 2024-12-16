var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { A as AppUiDecorator } from "./Decorators-BLQEll2y.js";
import { T as Tabs } from "./Tabs--IL_KcPq.js";
import { O as Orientation } from "./Orientation-6E0suNXD.js";
import { S as Svg2D } from "./2D-DLlBlgPB.js";
import "./index-DDLqOySG.js";
import "./appui-react-DrPGZjg1.js";
import "./Dialog-BGs6GPuC.js";
import "./index-BwI9SQDf.js";
import "./iframe-CBzQXS_Y.js";
import "../sb-preview/runtime.js";
import "./inheritsLoose-HEqISCW8.js";
import "./_commonjs-dynamic-modules-DTCOR0lh.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
import "./IconComponent-DPtXhOtE.js";
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
