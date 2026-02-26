import { j as jsxRuntimeExports } from "./iframe-BENp4d1r.js";
import { x as useBackstageManager, y as useIsBackstageOpen, I as IModelViewportControl, U as UiFramework } from "./appui-react-CEufDDhs.js";
import { A as AppUiStory } from "./AppUiStory-1k4NCfid.js";
import { c as createFrontstage, S as StandardContentLayouts } from "./Utils-B8gUJSzA.js";
import { B as BackstageComposer } from "./BackstageComposer-C5Dw2njM.js";
import { B as BackstageAppButton } from "./BackstageAppButton-Ba6pIfc7.js";
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
