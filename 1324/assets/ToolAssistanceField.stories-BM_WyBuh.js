var _a, _b, _c, _d, _e, _f, _g, _h, _i;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { r as reactExports } from "./index-DVOlmhHI.js";
import { g as StatusBarItemUtilities, T as ToolAssistance, h as ToolAssistanceImage, M as MessageManager, U as UiFramework, i as Tool } from "./appui-react-D5ydBozH.js";
import "./Dialog-DTkGrnAC.js";
import { A as AppUiStory } from "./AppUiStory-br0Sk89N.js";
import { c as createFrontstage } from "./Utils-C4-wvUma.js";
import { T as ToolAssistanceField } from "./ToolAssistanceField-DbG07Xme.js";
import "./index-CdGyBOBZ.js";
import "./iframe-BrzIzMCe.js";
import "./SvgCloseSmall-Bu3Oy4Gr.js";
import "./client-DmvY241V.js";
import "./index-DzWEwk9c.js";
import "./index-XG6mIJUL.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-selgNRA5.js";
import "./Tabs-D-wnJwh7.js";
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
