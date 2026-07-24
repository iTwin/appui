import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Jt as ToolbarOrientation, St as ModalFrontstage, Yt as ToolbarUsage, i as ToolbarItemUtilities, st as UiFramework, t as init_appui_react, wt as ModalFrontstageButton } from "./appui-react-CpKk3CrH.js";
import { Vr as init_esm, Wi as SvgPlaceholder } from "./components-react-DigDa1CF.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { i as init_Utils, t as createFrontstage } from "./Utils-BkeALKzH.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region src/frontstage/Modal.tsx
/** [openModalFrontstage](https://www.itwinjs.org/reference/appui-react/frontstage/frameworkfrontstages/#openmodalfrontstage) can be used to open a modal frontstage. */
function ModalFrontstageStory(props) {
	const { renderModalFrontstage, hideHeader, ...rest } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
		layout: "fullscreen",
		onInitialize: async () => {
			UiFramework.visibility.autoHideUi = false;
		},
		frontstages: () => [createFrontstage()],
		itemProviders: [{
			id: "toolbar",
			getToolbarItems: () => [ToolbarItemUtilities.createActionItem({
				id: "open",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SvgPlaceholder, {}),
				label: "Open modal frontstage",
				execute: () => {
					UiFramework.frontstages.openModalFrontstage({
						id: "my-modal-frontstage",
						content: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(import_jsx_runtime$1.Fragment, { children: "Modal frontstage content" }),
						title: "My Modal Frontstage",
						...rest
					});
				},
				layouts: { standard: {
					orientation: ToolbarOrientation.Horizontal,
					usage: ToolbarUsage.ContentManipulation
				} }
			})]
		}],
		renderModalFrontstage: renderModalFrontstage ? (args) => {
			return renderModalFrontstage(args, props);
		} : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ModalFrontstageEvents, {})
	});
}
function ModalFrontstageEvents() {
	import_react.useEffect(() => {
		return UiFramework.frontstages.onModalFrontstageChangedEvent.addListener(action("onModalFrontstageChangedEvent"));
	}, []);
	import_react.useEffect(() => {
		return UiFramework.frontstages.onCloseModalFrontstageRequestedEvent.addListener((args) => {
			action("onCloseModalFrontstageRequestedEvent (close after 2s)")(args);
			setTimeout(args.stageCloseFunc, 2e3);
		});
	}, []);
	import_react.useEffect(() => {
		return UiFramework.frontstages.onModalFrontstageClosedEvent.addListener(action("onModalFrontstageClosedEvent"));
	}, []);
	return null;
}
var import_react, import_jsx_runtime$1, action;
var init_Modal = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	init_esm();
	init_AppUiStory();
	init_Utils();
	import_jsx_runtime$1 = require_jsx_runtime();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	ModalFrontstageStory.__docgenInfo = {
		"description": "[openModalFrontstage](https://www.itwinjs.org/reference/appui-react/frontstage/frameworkfrontstages/#openmodalfrontstage) can be used to open a modal frontstage.",
		"methods": [],
		"displayName": "ModalFrontstageStory",
		"props": { "renderModalFrontstage": {
			"required": false,
			"tsType": {
				"name": "signature",
				"type": "function",
				"raw": "(\n  args: RenderModalFrontstageArgs,\n  storyProps: ModalFrontstageStoryProps\n) => React.ReactNode",
				"signature": {
					"arguments": [{
						"type": {
							"name": "Parameters[0]",
							"raw": "Parameters<\n  NonNullable<AppUiStoryProps[\"renderModalFrontstage\"]>\n>[0]"
						},
						"name": "args"
					}, {
						"type": { "name": "ModalFrontstageStoryProps" },
						"name": "storyProps"
					}],
					"return": {
						"name": "ReactReactNode",
						"raw": "React.ReactNode"
					}
				}
			},
			"description": ""
		} },
		"composes": ["Pick"]
	};
}));
//#endregion
//#region src/frontstage/Modal.stories.tsx
var import_jsx_runtime, meta, Basic, BackButton, AppBarRight, NotifyCloseRequest, CustomLayout, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_AppUiStory();
	init_Modal();
	init_appui_react();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Frontstage/ModalFrontstage",
		component: ModalFrontstageStory,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		parameters: {
			docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) },
			layout: "fullscreen"
		},
		args: { notifyCloseRequest: false }
	};
	Basic = {};
	BackButton = { args: { backButton: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalFrontstageButton, { onClick: () => {
		if (!confirm("Are you sure you want to go back?")) return;
		UiFramework.frontstages.closeModalFrontstage();
	} }) } };
	AppBarRight = { args: { appBarRight: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "appBarRight" }) } };
	NotifyCloseRequest = { args: { notifyCloseRequest: true } };
	CustomLayout = { args: {
		renderModalFrontstage: ({ info, isOpen }, storyProps) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalFrontstage, {
			isOpen,
			title: info.title,
			navigateBack: () => {
				UiFramework.frontstages.closeModalFrontstage();
			},
			style: { backgroundColor: "var(--background-3)" },
			hideHeader: storyProps.hideHeader,
			children: [info.content, " (custom layout)"]
		}),
		hideHeader: false
	} };
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	BackButton.parameters = {
		...BackButton.parameters,
		docs: {
			...BackButton.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    backButton: <ModalFrontstageButton onClick={() => {\n      const result = confirm(\"Are you sure you want to go back?\");\n      if (!result) return;\n      UiFramework.frontstages.closeModalFrontstage();\n    }} />\n  }\n}",
				...BackButton.parameters?.docs?.source
			}
		}
	};
	AppBarRight.parameters = {
		...AppBarRight.parameters,
		docs: {
			...AppBarRight.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    appBarRight: <>appBarRight</>\n  }\n}",
				...AppBarRight.parameters?.docs?.source
			}
		}
	};
	NotifyCloseRequest.parameters = {
		...NotifyCloseRequest.parameters,
		docs: {
			...NotifyCloseRequest.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    notifyCloseRequest: true\n  }\n}",
				...NotifyCloseRequest.parameters?.docs?.source
			}
		}
	};
	CustomLayout.parameters = {
		...CustomLayout.parameters,
		docs: {
			...CustomLayout.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    renderModalFrontstage: ({\n      info,\n      isOpen\n    }, storyProps) => <ModalFrontstage isOpen={isOpen} title={info.title} navigateBack={() => {\n      UiFramework.frontstages.closeModalFrontstage();\n    }} style={{\n      backgroundColor: \"var(--background-3)\"\n    }} hideHeader={storyProps.hideHeader}>\n        {info.content} (custom layout)\n      </ModalFrontstage>,\n    hideHeader: false\n  }\n}",
				...CustomLayout.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Basic",
		"BackButton",
		"AppBarRight",
		"NotifyCloseRequest",
		"CustomLayout"
	];
}))();
export { AppBarRight, BackButton, Basic, CustomLayout, NotifyCloseRequest, __namedExportsOrder, meta as default };
