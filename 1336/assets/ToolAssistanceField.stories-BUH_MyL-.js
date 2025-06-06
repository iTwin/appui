var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { r as reactExports } from "./index-DVOlmhHI.js";
import { g as StatusBarItemUtilities, T as ToolAssistance, h as ToolAssistanceImage, M as MessageManager, U as UiFramework, i as Tool, j as ToggleSwitch } from "./appui-react-BkfSqS8X.js";
import { a as BeEvent } from "./Dialog-DgXpX9Dj.js";
import { A as AppUiStory } from "./AppUiStory-GBbbQo2J.js";
import { c as createFrontstage } from "./Utils-B1WGcpM1.js";
import { a as action } from "./index-6lyHBX71.js";
import { T as ToolAssistanceField } from "./ToolAssistanceField-DDUp2koS.js";
import "./index-CdGyBOBZ.js";
import "./iframe-C1WTrjKK.js";
import "./SvgCloseSmall-XFYEkVPL.js";
import "./client-DmvY241V.js";
import "./index-CXp8466e.js";
import "./index-XG6mIJUL.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-selgNRA5.js";
import "./v4-CjlX8hrF.js";
import "./Tabs-RaydKyh_.js";
const StoryDecorator = (Story, {
  parameters
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { frontstages: [createFrontstage({
    content: parameters.content,
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
const store = (() => {
  let state = {
    visible: false,
    pinned: false
  };
  const onChange = new BeEvent();
  return {
    state,
    onChange,
    setVisible: (visible) => {
      state.visible = visible;
      onChange.raiseEvent();
    },
    setPinned: (pinned) => {
      state.pinned = pinned;
      onChange.raiseEvent();
    }
  };
})();
function ControlledContent() {
  const [visible, setVisible] = reactExports.useState(store.state.visible);
  const [pinned, setPinned] = reactExports.useState(store.state.pinned);
  reactExports.useEffect(() => {
    return store.onChange.addListener(() => {
      setVisible(store.state.visible);
      setPinned(store.state.pinned);
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Visible", checked: visible, onChange: () => {
      store.setVisible(!visible);
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Pinned", checked: pinned, onChange: () => {
      store.setPinned(!pinned);
    } })
  ] });
}
function ControlledField(props) {
  const [visible, setVisible] = reactExports.useState(store.state.visible);
  const [pinned, setPinned] = reactExports.useState(store.state.pinned);
  reactExports.useEffect(() => {
    return store.onChange.addListener(() => {
      setVisible(store.state.visible);
      setPinned(store.state.pinned);
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ToolAssistanceField, { ...props, visible, onVisibleChange: action("onVisibleChange"), pinned, onPinnedChange: action("onPinnedChange") });
}
const Controlled = {
  parameters: {
    content: /* @__PURE__ */ jsxRuntimeExports.jsx(ControlledContent, {})
  },
  render: (props) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ControlledField, { ...props });
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
Controlled.parameters = {
  ...Controlled.parameters,
  docs: {
    ...(_j = Controlled.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: "{\n  parameters: {\n    content: <ControlledContent />\n  },\n  render: props => {\n    return <ControlledField {...props} />;\n  }\n}",
      ...(_l = (_k = Controlled.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
const __namedExportsOrder = ["Default", "AlwaysVisible", "PromptAtContent", "Controlled"];
export {
  AlwaysVisible,
  Controlled,
  Default,
  PromptAtContent,
  __namedExportsOrder,
  meta as default
};
