var _a, _b, _c;
import { j as jsxRuntimeExports } from "./iframe-DDsloJCs.js";
import { R as RadialMenu, v as RadialButton } from "./appui-react-CJ4WPLAk.js";
import { S as Svg2D } from "./2D-BRYUDf2r.js";
import { S as Svg3D } from "./3D-BpmrIFDP.js";
import { S as SvgActivity } from "./Activity-ByDgdKVj.js";
import { A as AppUiDecorator } from "./Decorators-C4xQSAog.js";
import "./Key.enum-IWU58BJQ.js";
import "./client-DPW9UKYs.js";
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
