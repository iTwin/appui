var _a, _b, _c;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { a as action } from "./index-6lyHBX71.js";
import { R as RadialMenu, t as RadialButton } from "./appui-react-CshDS9F4.js";
import { S as Svg2D } from "./2D-ZNhc8clb.js";
import { S as Svg3D } from "./3D-C5S9_bua.js";
import { S as SvgActivity } from "./Activity-Ch6ifQvb.js";
import "./index-DVOlmhHI.js";
import { A as AppUiDecorator } from "./Decorators-_fBFu_1E.js";
import "./index-CdGyBOBZ.js";
import "./v4-CjlX8hrF.js";
import "./Dialog-B4AlSohG.js";
import "./SvgCloseSmall-D3lYHYdV.js";
import "./iframe-CY2-t6FD.js";
import "./client-DmvY241V.js";
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
