var _a, _b, _c;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { r as reactExports } from "./index-DVOlmhHI.js";
import { A as AppUiStory } from "./AppUiStory-CV1Zw4VQ.js";
import { M as MessageManager } from "./appui-react-CDe2sd1_.js";
import { c as createFrontstage } from "./Utils-Zzjm0Wv2.js";
import "./index-CdGyBOBZ.js";
import "./index-D3RNTJPL.js";
import "./iframe-mQ2fpQex.js";
import "./index-XG6mIJUL.js";
import "./index-BdOSk9or.js";
import "./Dialog-BMqOLAkC.js";
import "./SvgCloseSmall-DV74BlAu.js";
import "./DemoIModel-selgNRA5.js";
import "./client-DmvY241V.js";
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
