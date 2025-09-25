var _a, _b, _c;
import { j as jsxRuntimeExports } from "./iframe-DE_hZcVj.js";
import { G as useBackstageManager, H as useIsBackstageOpen, e as IModelViewportControl, l as StandardContentLayouts, U as UiFramework } from "./appui-react-BJc9EwXU.js";
import { A as AppUiStory } from "./AppUiStory-Bwtc4HcF.js";
import { c as createFrontstage } from "./Utils-Cnp_Uj8B.js";
import { B as BackstageComposer } from "./BackstageComposer-Cy_AaxA_.js";
import { B as BackstageAppButton } from "./BackstageAppButton-vfz8onP4.js";
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
