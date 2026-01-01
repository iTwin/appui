import { j as jsxRuntimeExports } from "./iframe-MZ9GDAUV.js";
import { x as useBackstageManager, y as useIsBackstageOpen, I as IModelViewportControl, U as UiFramework } from "./appui-react-CxqBCL1K.js";
import { A as AppUiStory } from "./AppUiStory-BbgzA-a2.js";
import { c as createFrontstage, S as StandardContentLayouts } from "./Utils-65SDZWWd.js";
import { B as BackstageComposer } from "./BackstageComposer-DpyUDep4.js";
import { B as BackstageAppButton } from "./BackstageAppButton-Co_9jlKh.js";
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
