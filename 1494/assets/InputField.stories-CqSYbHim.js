import { j as jsxRuntimeExports, r as reactExports } from "./iframe-BTOKt8sb.js";
import { A as AppUiStory } from "./AppUiStory-DWrXMzNt.js";
import { M as MessageManager } from "./appui-react-nOGh2M21.js";
import { c as createFrontstage } from "./Utils-DSy70KJB.js";
import "./preload-helper-UZRgTS1n.js";
import "./blocks-D95ser5u.js";
import "./index-C8w0C_Xr.js";
import "./Key.enum-DdwJ-Wkg.js";
import "./client-BuoZTSzj.js";
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
