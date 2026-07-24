import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { i as init_esm, l as ToggleSwitch } from "./iframe-DrBiZGmV.js";
import { Mn as ToolAssistance, Nn as ToolAssistanceImage, Wn as Tool, c as ToolAssistanceField, g as StatusBarItemUtilities, sn as MessageManager, st as UiFramework, t as init_appui_react, xn as init_core_frontend } from "./appui-react-CpKk3CrH.js";
import { X as init_core_bentley, hn as BeEvent } from "./Key.enum-DhBIjxOv.js";
import { Vr as init_esm$1, Wi as SvgPlaceholder } from "./components-react-DigDa1CF.js";
import { r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { i as init_Utils, t as createFrontstage } from "./Utils-BkeALKzH.js";
//#region src/components/ToolAssistanceField.stories.tsx
function Instructions(props) {
	import_react.useEffect(() => {
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
function ControlledContent() {
	const [visible, setVisible] = import_react.useState(store.state.visible);
	const [pinned, setPinned] = import_react.useState(store.state.pinned);
	import_react.useEffect(() => {
		return store.onChange.addListener(() => {
			setVisible(store.state.visible);
			setPinned(store.state.pinned);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleSwitch, {
		label: "Visible",
		checked: visible,
		onChange: () => {
			store.setVisible(!visible);
		}
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleSwitch, {
		label: "Pinned",
		checked: pinned,
		onChange: () => {
			store.setPinned(!pinned);
		}
	})] });
}
function ControlledField(props) {
	const [visible, setVisible] = import_react.useState(store.state.visible);
	const [pinned, setPinned] = import_react.useState(store.state.pinned);
	import_react.useEffect(() => {
		return store.onChange.addListener(() => {
			setVisible(store.state.visible);
			setPinned(store.state.pinned);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolAssistanceField, {
		...props,
		visible,
		onVisibleChange: action("onVisibleChange"),
		pinned,
		onPinnedChange: action("onPinnedChange")
	});
}
var import_react, import_jsx_runtime, action, StoryDecorator, meta, Default, AlwaysVisible, PromptAtContent, store, Controlled, Icons, __namedExportsOrder;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	init_core_frontend();
	init_AppUiStory();
	init_Utils();
	init_esm();
	init_core_bentley();
	init_esm$1();
	import_jsx_runtime = require_jsx_runtime();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	StoryDecorator = (Story, { parameters }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppUiStory, {
			frontstages: [createFrontstage({
				content: parameters.content,
				hideStatusBar: false
			})],
			itemProviders: [{
				id: "provider-1",
				getStatusBarItems: () => [StatusBarItemUtilities.createCustomItem({
					id: "tool-assistance",
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {})
				})]
			}]
		});
	};
	meta = {
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
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolAssistanceField, { ...props }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instructions, {})] });
		}
	};
	Default = {};
	AlwaysVisible = { args: { cursorPromptTimeout: Number.POSITIVE_INFINITY } };
	PromptAtContent = { args: {
		cursorPromptTimeout: Number.POSITIVE_INFINITY,
		promptAtContent: true
	} };
	store = (() => {
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
	Controlled = {
		parameters: { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlledContent, {}) },
		render: (props) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlledField, { ...props }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instructions, {})] });
		}
	};
	Icons = {
		args: {
			cursorPromptTimeout: Number.POSITIVE_INFINITY,
			defaultPromptAtCursor: false
		},
		render: (props) => {
			const mainInstruction = ToolAssistance.createInstruction(ToolAssistanceImage.CursorClick, "Main instruction of a tool");
			const customIcon = ToolAssistance.createInstruction("", "React iconElement");
			customIcon.iconElement = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {});
			const iconsSection = ToolAssistance.createSection([
				ToolAssistance.createInstruction(ToolAssistanceImage.LeftClick, "ToolAssistanceImage enum"),
				ToolAssistance.createInstruction("icon-placeholder", "CSS icon"),
				customIcon
			], "Icons");
			const instructions = ToolAssistance.createInstructions(mainInstruction, [iconsSection]);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolAssistanceField, { ...props }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instructions, { instructions })] });
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
				originalSource: "{\n  args: {\n    cursorPromptTimeout: Number.POSITIVE_INFINITY,\n    defaultPromptAtCursor: false\n  },\n  render: props => {\n    const mainInstruction = ToolAssistance.createInstruction(ToolAssistanceImage.CursorClick, \"Main instruction of a tool\");\n    const customIcon = ToolAssistance.createInstruction(\"\", \"React iconElement\");\n    customIcon.iconElement = <SvgPlaceholder />;\n    const iconsSection = ToolAssistance.createSection([ToolAssistance.createInstruction(ToolAssistanceImage.LeftClick, \"ToolAssistanceImage enum\"), ToolAssistance.createInstruction(\"icon-placeholder\", \"CSS icon\"), customIcon], \"Icons\");\n    const instructions = ToolAssistance.createInstructions(mainInstruction, [iconsSection]);\n    return <>\n        <ToolAssistanceField {...props} />\n        <Instructions instructions={instructions} />\n      </>;\n  }\n}",
				...Icons.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Default",
		"AlwaysVisible",
		"PromptAtContent",
		"Controlled",
		"Icons"
	];
}))();
export { AlwaysVisible, Controlled, Default, Icons, PromptAtContent, __namedExportsOrder, meta as default };
