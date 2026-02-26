import { j as jsxRuntimeExports, r as reactExports } from "./iframe-DNdoMX4Q.js";
import { A as AppUiStory } from "./AppUiStory-BWJJvhLI.js";
import { M as MessageManager } from "./appui-react-glMK-yaN.js";
import { c as createFrontstage } from "./Utils-CtqzyU6g.js";
import "./preload-helper-UZRgTS1n.js";
import "./blocks-C7SkmsIk.js";
import "./index-C9p5eh_j.js";
import "./Key.enum-YmMvjtrc.js";
import "./client-7SU87-Ux.js";
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
    ...Default.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Default.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Default"];
export {
  Default,
  __namedExportsOrder,
  meta as default
};
