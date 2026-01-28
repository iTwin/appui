import { j as jsxRuntimeExports, r as reactExports } from "./iframe-BBMVhVSb.js";
import { A as AppUiStory } from "./AppUiStory-DqdiOs5F.js";
import { M as MessageManager } from "./appui-react-CuxmpMO6.js";
import { c as createFrontstage } from "./Utils-CeaEC1n-.js";
import "./preload-helper-UZRgTS1n.js";
import "./blocks-_USzMXUQ.js";
import "./index-DGG_u3yd.js";
import "./Key.enum-OlB0m7Wi.js";
import "./client-X93GHqP6.js";
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
