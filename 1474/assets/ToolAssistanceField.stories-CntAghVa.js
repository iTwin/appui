import { j as jsxRuntimeExports, r as reactExports } from "./iframe-MZ9GDAUV.js";
import { e as StatusBarItemUtilities, T as ToolAssistance, f as ToolAssistanceImage, M as MessageManager, U as UiFramework, g as Tool, h as ToggleSwitch, S as SvgPlaceholder } from "./appui-react-CxqBCL1K.js";
import { a as BeEvent } from "./Key.enum-BlUwKc_n.js";
import { A as AppUiStory } from "./AppUiStory-BbgzA-a2.js";
import { c as createFrontstage } from "./Utils-65SDZWWd.js";
import { T as ToolAssistanceField } from "./ToolAssistanceField-BCfJLCOL.js";
import "./client-CdcWlIUh.js";
import "./blocks-w2bBkgKV.js";
import "./Tabs-B0G2K9Ma.js";
const { action } = __STORYBOOK_MODULE_ACTIONS__;
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
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {})
    })]
  }] });
};
function Instructions(props) {
  reactExports.useEffect(() => {
    const mainInstruction = ToolAssistance.createInstruction(ToolAssistanceImage.CursorClick, "Main instruction of a tool");
    const cursorSection = ToolAssistance.createSection([ToolAssistance.createInstruction(ToolAssistanceImage.LeftClick, "Left click to select a point"), ToolAssistance.createInstruction(ToolAssistanceImage.RightClick, "Right click to cancel")], ToolAssistance.inputsLabel);
    const touchSection = ToolAssistance.createSection([ToolAssistance.createInstruction(ToolAssistanceImage.OneTouchTap, "Touch to select a point")], ToolAssistance.inputsLabel);
    const instructions = ToolAssistance.createInstructions(mainInstruction, [cursorSection, touchSection]);
    MessageManager.setToolAssistance(props.instructions ?? instructions);
    UiFramework.frontstages.setActiveTool(new class extends Tool {
      get iconSpec() {
        return "icon-placeholder";
      }
    }());
  }, [props.instructions]);
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
  },
  render: (props) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolAssistanceField, { ...props }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Instructions, {})
    ] });
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
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ControlledField, { ...props }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Instructions, {})
    ] });
  }
};
const Icons = {
  args: {
    cursorPromptTimeout: Number.POSITIVE_INFINITY,
    defaultPromptAtCursor: false
  },
  render: (props) => {
    const mainInstruction = ToolAssistance.createInstruction(ToolAssistanceImage.CursorClick, "Main instruction of a tool");
    const customIcon = ToolAssistance.createInstruction("", "React iconElement");
    customIcon.iconElement = /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {});
    const iconsSection = ToolAssistance.createSection([ToolAssistance.createInstruction(ToolAssistanceImage.LeftClick, "ToolAssistanceImage enum"), ToolAssistance.createInstruction("icon-placeholder", "CSS icon"), customIcon], "Icons");
    const instructions = ToolAssistance.createInstructions(mainInstruction, [iconsSection]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolAssistanceField, { ...props }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Instructions, { instructions })
    ] });
  }
};
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
AlwaysVisible.parameters = {
  ...AlwaysVisible.parameters,
  docs: {
    ...AlwaysVisible.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    cursorPromptTimeout: Number.POSITIVE_INFINITY\n  }\n}",
      ...AlwaysVisible.parameters?.docs?.source
    }
  }
};
PromptAtContent.parameters = {
  ...PromptAtContent.parameters,
  docs: {
    ...PromptAtContent.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    cursorPromptTimeout: Number.POSITIVE_INFINITY,\n    promptAtContent: true\n  }\n}",
      ...PromptAtContent.parameters?.docs?.source
    }
  }
};
Controlled.parameters = {
  ...Controlled.parameters,
  docs: {
    ...Controlled.parameters?.docs,
    source: {
      originalSource: "{\n  parameters: {\n    content: <ControlledContent />\n  },\n  render: props => {\n    return <>\n        <ControlledField {...props} />\n        <Instructions />\n      </>;\n  }\n}",
      ...Controlled.parameters?.docs?.source
    }
  }
};
Icons.parameters = {
  ...Icons.parameters,
  docs: {
    ...Icons.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    cursorPromptTimeout: Number.POSITIVE_INFINITY,\n    defaultPromptAtCursor: false\n  },\n  render: props => {\n    const mainInstruction = ToolAssistance.createInstruction(ToolAssistanceImage.CursorClick, "Main instruction of a tool");\n    const customIcon = ToolAssistance.createInstruction("", "React iconElement");\n    customIcon.iconElement = <SvgPlaceholder />;\n    const iconsSection = ToolAssistance.createSection([ToolAssistance.createInstruction(ToolAssistanceImage.LeftClick, "ToolAssistanceImage enum"), ToolAssistance.createInstruction("icon-placeholder", "CSS icon"), customIcon], "Icons");\n    const instructions = ToolAssistance.createInstructions(mainInstruction, [iconsSection]);\n    return <>\n        <ToolAssistanceField {...props} />\n        <Instructions instructions={instructions} />\n      </>;\n  }\n}',
      ...Icons.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Default", "AlwaysVisible", "PromptAtContent", "Controlled", "Icons"];
export {
  AlwaysVisible,
  Controlled,
  Default,
  Icons,
  PromptAtContent,
  __namedExportsOrder,
  meta as default
};
