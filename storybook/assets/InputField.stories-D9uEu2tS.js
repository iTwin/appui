var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import { A as AppUiStory, c as createFrontstage } from "./AppUiStory-oEM4RWbs.js";
import { M as MessageManager } from "./DefaultToolSettingsProvider-B6B80iEN.js";
import "./Key.enum-BB2gw-WQ.js";
import "./index-EDRsojbr.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./index-n0FlVOjm.js";
import "./iframe-C1TMdbVu.js";
import "../sb-preview/runtime.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-Cp4dr_sK.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-DuWsADYF.js";
import "./index-B47T7vRo.js";
function Component() {
  return null;
}
function Content() {
  const targetRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    const target = targetRef.current;
    if (!target)
      return;
    MessageManager.displayInputFieldMessage(target, "My message", "My detailed message");
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    ref: (el) => {
      targetRef.current = el ?? void 0;
    },
    style: {
      position: "absolute",
      top: 200,
      left: 300
    },
    children: "Message target"
  });
}
const StoryDecorator = (_Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, {
    frontstages: [createFrontstage({
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(Content, {})
    })]
  });
};
const meta = {
  title: "Frontstage/Notifications/InputField",
  component: Component,
  tags: ["autodocs"],
  decorators: [StoryDecorator]
};
const Default = {};
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
const __namedExportsOrder = ["Default"];
export {
  Default,
  __namedExportsOrder,
  meta as default
};
