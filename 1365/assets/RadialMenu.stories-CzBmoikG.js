var _a, _b, _c;
import { j as jsxRuntimeExports } from "./iframe-JYBMU7ZD.js";
import { R as RadialMenu, v as RadialButton } from "./appui-react-Bkdl7eTp.js";
import { S as Svg2D } from "./2D-CWseDY2u.js";
import { S as Svg3D } from "./3D-CzAG2fyO.js";
import { S as SvgActivity } from "./Activity-CQg3lo2k.js";
import { A as AppUiDecorator } from "./Decorators-bqwLT6vP.js";
import "./Key.enum-D8YSRJHT.js";
import "./client-CxV4gkpD.js";
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
