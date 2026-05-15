import { j as jsxRuntimeExports } from "./iframe-D6etZYKx.js";
import { u as useBackstageManager, q as useIsBackstageOpen, I as IModelViewportControl, U as UiFramework } from "./appui-react-DQPnIqIU.js";
import { A as AppUiStory } from "./AppUiStory-Cke2SHqr.js";
import { c as createFrontstage, S as StandardContentLayouts } from "./Utils-WX8e-cwd.js";
import { B as BackstageComposer } from "./BackstageComposer-OJPFF2MX.js";
import { B as BackstageAppButton } from "./BackstageAppButton-Mlddb59v.js";
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
    ...Basic.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Basic.parameters?.docs?.source
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
