var _a, _b, _c;
import { j as jsxRuntimeExports } from "./iframe-CPf_22bH.js";
import { R as RadialMenu, x as RadialButton } from "./appui-react-DM43Y0g2.js";
import { S as Svg2D } from "./2D-C692CGT4.js";
import { S as Svg3D } from "./3D-BVBUjVTq.js";
import { S as SvgActivity } from "./Activity-C0ZwFSMb.js";
import { A as AppUiDecorator } from "./Decorators-CJLjmAjN.js";
import "./Key.enum-xgF-LmbB.js";
import "./client-AY0nUbTQ.js";
const { action } = __STORYBOOK_MODULE_ACTIONS__;
const meta = {
  title: "Deprecated/RadialMenu",
  component: RadialMenu,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  args: {
    opened: true,
    innerRadius: 150,
    outerRadius: 220,
    left: "50%",
    top: "50%",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx(RadialButton, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Svg2D, {}), onSelect: action("Item 1"), children: "Item 1" }), /* @__PURE__ */ jsxRuntimeExports.jsx(RadialButton, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Svg3D, {}), onSelect: action("Item 2"), children: "Item 2" }), /* @__PURE__ */ jsxRuntimeExports.jsx(RadialButton, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgActivity, {}), onSelect: action("Item 3"), children: "Item 3" })]
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
