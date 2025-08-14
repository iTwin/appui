var _a, _b, _c;
import { j as jsxRuntimeExports } from "./iframe-D3FK7mSC.js";
import { R as RadialMenu, v as RadialButton } from "./appui-react-BDcfJuOl.js";
import { S as Svg2D } from "./2D-N15KRXHr.js";
import { S as Svg3D } from "./3D-BFPrd3ME.js";
import { S as SvgActivity } from "./Activity-DZPMIEY9.js";
import { A as AppUiDecorator } from "./Decorators-D5g_H2Fw.js";
import "./Key.enum-BcIdq5Js.js";
import "./client-C7YmLogp.js";
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
