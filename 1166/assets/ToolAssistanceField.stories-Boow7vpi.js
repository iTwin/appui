var _a, _b, _c, _d, _e, _f, _g, _h, _i;
import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
import { r as reactExports } from "./index-R26Bfrts.js";
import { T as ToolAssistanceField, g as StatusBarItemUtilities, h as ToolAssistance, i as ToolAssistanceImage, M as MessageManager, U as UiFramework, j as Tool } from "./appui-react-BIGfyRyB.js";
import "./Dialog-G-zkgOIV.js";
import { A as AppUiStory } from "./AppUiStory-D7VdQcAK.js";
import { c as createFrontstage } from "./Utils-DOW3fYw3.js";
import "./_commonjs-dynamic-modules-lq-lihFa.js";
import "./iframe-ClLUjPXt.js";
import "../sb-preview/runtime.js";
import "./SvgCloseSmall-2ldVV_sh.js";
import "./index-CHBBkG1-.js";
import "./index-oY8aizO2.js";
import "./client-DRUEp2wC.js";
import "./debounce-CTTNlY27.js";
import "./index-CBpxrBZN.js";
import "./index-DLlB04eo.js";
import "./index-Brmgc-W4.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-zibz9A5r.js";
const StoryDecorator = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { frontstages: [createFrontstage({
    hideStatusBar: false
  })], itemProviders: [{
    id: "provider-1",
    getStatusBarItems: () => [StatusBarItemUtilities.createCustomItem({
      id: "tool-assistance",
      content: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Setup, {})
      ] })
    })]
  }] });
};
function Setup() {
  reactExports.useEffect(() => {
    const mainInstruction = ToolAssistance.createInstruction(ToolAssistanceImage.CursorClick, "Main instruction of a tool");
    const cursorSection = ToolAssistance.createSection([ToolAssistance.createInstruction(ToolAssistanceImage.LeftClick, "Left click to select a point"), ToolAssistance.createInstruction(ToolAssistanceImage.RightClick, "Right click to cancel")], ToolAssistance.inputsLabel);
    const touchSection = ToolAssistance.createSection([ToolAssistance.createInstruction(ToolAssistanceImage.OneTouchTap, "Touch to select a point")], ToolAssistance.inputsLabel);
    const instructions = ToolAssistance.createInstructions(mainInstruction, [cursorSection, touchSection]);
    MessageManager.setToolAssistance(instructions);
    UiFramework.frontstages.setActiveTool(new class extends Tool {
      get iconSpec() {
        return "icon-placeholder";
      }
    }());
  }, []);
  return null;
}
const meta = {
  title: "Components/Status fields/ToolAssistanceField",
  component: ToolAssistanceField,
  tags: ["autodocs"],
  decorators: [StoryDecorator],
  args: {
    includePromptAtCursor: true,
    cursorPromptTimeout: 5e3,
    fadeOutCursorPrompt: true,
    defaultPromptAtCursor: true
  }
};
const Default = {};
const AlwaysVisible = {
  args: {
    cursorPromptTimeout: Number.POSITIVE_INFINITY
  }
};
const PromptAtContent = {
  args: {
    cursorPromptTimeout: Number.POSITIVE_INFINITY,
    promptAtContent: true
  }
};
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
AlwaysVisible.parameters = {
  ...AlwaysVisible.parameters,
  docs: {
    ...(_d = AlwaysVisible.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    cursorPromptTimeout: Number.POSITIVE_INFINITY\n  }\n}",
      ...(_f = (_e = AlwaysVisible.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
PromptAtContent.parameters = {
  ...PromptAtContent.parameters,
  docs: {
    ...(_g = PromptAtContent.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: "{\n  args: {\n    cursorPromptTimeout: Number.POSITIVE_INFINITY,\n    promptAtContent: true\n  }\n}",
      ...(_i = (_h = PromptAtContent.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
const __namedExportsOrder = ["Default", "AlwaysVisible", "PromptAtContent"];
export {
  AlwaysVisible,
  Default,
  PromptAtContent,
  __namedExportsOrder,
  meta as default
};
