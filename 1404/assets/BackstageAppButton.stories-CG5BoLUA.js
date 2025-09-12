var _a, _b, _c, _d, _e, _f, _g, _h, _i;
import { r as reactExports, j as jsxRuntimeExports } from "./iframe-CFDVpAw4.js";
import "./appui-react-DH8at8DD.js";
import { A as AppUiDecorator, I as InitializerDecorator } from "./Decorators-MQWVt01I.js";
import { B as BackstageAppButton } from "./BackstageAppButton-GJN41cVQ.js";
import "./Key.enum-oRjsNWTu.js";
import "./client-CJ1zPzO-.js";
const SvgBentleySystems = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M4.09 9.491c1.051 0 6.231.341 6.333 1.505.164 1.866-3.538 2.357-5.82 2.38-.82 0-2.845-.27-2.845-1.236 0-.47.563-.965.897-1.28zm8.75-9.49H16v1.146A4.83 4.83 0 0012.84 0zM16 3.885V16H.005L0 14.524a12.567 12.567 0 004.448.814c4.417.164 8.88-1.264 8.802-4.4-.054-2.155-4.851-3.015-7.792-3.094l.212-.228c4.941.122 9.02-.587 10.33-3.73zM.005 10.542V0h8.849a17.695 17.695 0 00-4.27.86A17.664 17.664 0 001.52 2.115C.834 2.533.018 3.228.199 3.98c.174.725 2.238-.18 3.121-.437a52.186 52.186 0 017.15-1.414c2.974-.18 3.693.606 3.718 1.1-.061.737-1.308 2.133-7.103 2.828 2.129-2.178 2.308-2.47 2.488-2.85-2.564 0-3.749 1.482-5.415 2.897a6.678 6.678 0 00-3.113.88c-.349.282-.847.545-.548 1.037.215.355 1.132.188 1.445.208-.71.82-1.536 1.818-1.937 2.313z" })
  );
};
const { action } = __STORYBOOK_MODULE_ACTIONS__;
const meta = {
  title: "Components/BackstageAppButton",
  component: BackstageAppButton,
  tags: ["autodocs"],
  decorators: [AppUiDecorator, InitializerDecorator],
  args: {
    execute: action("execute")
  }
};
const Default = {};
const Icon = {
  args: {
    iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgBentleySystems, {})
  }
};
const IconSpec = {
  name: "Icon Spec (deprecated)",
  args: {
    icon: "icon-bentley-systems"
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
      ...(_c = (_b = Default.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
Icon.parameters = {
  ...Icon.parameters,
  docs: {
    ...(_d = Icon.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    iconNode: <SvgBentleySystems />\n  }\n}",
      ...(_f = (_e = Icon.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
IconSpec.parameters = {
  ...IconSpec.parameters,
  docs: {
    ...(_g = IconSpec.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: '{\n  name: "Icon Spec (deprecated)",\n  args: {\n    icon: "icon-bentley-systems"\n  }\n}',
      ...(_i = (_h = IconSpec.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
const __namedExportsOrder = ["Default", "Icon", "IconSpec"];
export {
  Default,
  Icon,
  IconSpec,
  __namedExportsOrder,
  meta as default
};
