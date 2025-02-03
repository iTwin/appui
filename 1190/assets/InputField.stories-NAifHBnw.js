var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { r as reactExports } from "./index-DDLqOySG.js";
import { A as AppUiStory, c as createFrontstage } from "./AppUiStory-BpxNsLqU.js";
import { M as MessageManager } from "./appui-react-B5h8zH31.js";
import "./index-DmYFrQoH.js";
import "./iframe-B7dBYAR1.js";
import "../sb-preview/runtime.js";
import "./index-BwI9SQDf.js";
import "./index-DLlB04eo.js";
import "./_commonjs-dynamic-modules-6KCvujNB.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./index-BZDuRpLS.js";
import "./index-BdOSk9or.js";
import "./Dialog-nxFiu5af.js";
import "./DemoIModel-B8H6_QN-.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
import "./debounce-BQf5aemw.js";
function Component() {
  return null;
}
function Content() {
  const targetRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    MessageManager.displayInputFieldMessage(target, "My message", "My detailed message");
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: (el) => {
    targetRef.current = el ?? void 0;
  }, style: {
    position: "absolute",
    top: 200,
    left: 300
  }, children: "Message target" });
}
const StoryDecorator = (_Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { frontstages: [createFrontstage({
    content: /* @__PURE__ */ jsxRuntimeExports.jsx(Content, {})
  })] });
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
