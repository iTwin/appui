var _a, _b, _c;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { z as useBackstageManager, E as useIsBackstageOpen, e as IModelViewportControl, k as StandardContentLayouts, U as UiFramework } from "./appui-react-D3H-yJBl.js";
import { A as AppUiStory } from "./AppUiStory-kFoCDOoZ.js";
import { c as createFrontstage } from "./Utils-BDo0-8WN.js";
import { B as BackstageComposer } from "./BackstageComposer-Co_GubcQ.js";
import { B as BackstageAppButton } from "./BackstageAppButton-BwAz5ppk.js";
function HookStory() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { appBackstage: /* @__PURE__ */ jsxRuntimeExports.jsx(BackstageComposer, {}), frontstages: () => [createFrontstage({
    contentGroupProps: {
      id: "ViewportContentGroup",
      layout: StandardContentLayouts.singleView,
      contents: [{
        id: "ViewportContent",
        classId: IModelViewportControl
      }]
    },
    cornerButton: /* @__PURE__ */ jsxRuntimeExports.jsx(BackstageAppButton, { label: "Toggle Backstage", icon: "icon-bentley-systems", execute: () => {
      UiFramework.backstage.getBackstageToggleCommand().execute();
    } })
  })], demoIModel: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Initialized, {}) });
}
function Initialized() {
  const manager = useBackstageManager();
  const isOpen = useIsBackstageOpen(manager);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { children: [
    "isOpen: ",
    String(isOpen)
  ] }) });
}
const meta = {
  title: "Hooks/useIsBackstageOpen",
  component: HookStory
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
const stories = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Basic,
  __namedExportsOrder,
  default: meta
}, Symbol.toStringTag, { value: "Module" }));
export {
  Basic as B,
  stories as s
};
