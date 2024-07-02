var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { a as action } from "./chunk-WFFRPTHA-B_pzO8uN.js";
import { R as RadialMenu, c as RadialButton } from "./DefaultToolSettingsProvider-BeaL6ll4.js";
import { S as Svg2D } from "./2D-BxdbF6B_.js";
import { S as Svg3D } from "./3D-DAP4mQ8M.js";
import { S as SvgActivity } from "./Activity-C9dEWSdZ.js";
import "./index-DM9bPmif.js";
import { A as AppUiDecorator } from "./Decorators-CXFrraVc.js";
import "./preview-errors-C1TokqVJ.js";
import "./index-BdOSk9or.js";
import "./Key.enum-Nky5yUvk.js";
import "./iframe-vMT8xG5O.js";
import "../sb-preview/runtime.js";
import "./index-EDRsojbr.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-B47T7vRo.js";
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
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx(RadialButton, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Svg2D, {}),
      onSelect: action("Item 1"),
      children: "Item 1"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(RadialButton, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Svg3D, {}),
      onSelect: action("Item 2"),
      children: "Item 2"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(RadialButton, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgActivity, {}),
      onSelect: action("Item 3"),
      children: "Item 3"
    })]
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
