import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { t as init_appui_react, zt as WidgetState } from "./appui-react-CpKk3CrH.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { i as init_Utils, n as createWidget } from "./Utils-BkeALKzH.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region src/widget/CanFloat.tsx
function createProvider(props) {
	return {
		id: "widgets",
		getWidgets: () => {
			return [createWidget(1, {
				defaultState: WidgetState.Floating,
				canFloat: props
			}), createWidget(2, {
				defaultState: props.containerId ? WidgetState.Floating : void 0,
				canFloat: props.containerId ? { containerId: props.containerId } : void 0
			})];
		}
	};
}
/** [canFloat](https://www.itwinjs.org/reference/appui-react/widget/widget/canfloat) property can be used to configure a floating widget. */
function CanFloatStory(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
		itemProviders: [createProvider(props)],
		...props
	});
}
var import_jsx_runtime$1;
var init_CanFloat = __esmMin((() => {
	init_appui_react();
	init_AppUiStory();
	init_Utils();
	import_jsx_runtime$1 = require_jsx_runtime();
	CanFloatStory.__docgenInfo = {
		"description": "[canFloat](https://www.itwinjs.org/reference/appui-react/widget/widget/canfloat) property can be used to configure a floating widget.",
		"methods": [],
		"displayName": "CanFloatStory"
	};
}));
//#endregion
//#region src/widget/CanFloat.stories.tsx
var import_jsx_runtime, meta, Default, NotResizable, Position, Size, HideWithUI, ContainerId, MultipleOptions, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_CanFloat();
	init_Decorators();
	init_AppUiStory();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Widget/canFloat",
		component: CanFloatStory,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		parameters: { docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) } }
	};
	Default = {};
	NotResizable = { args: { isResizable: false } };
	Position = { args: { defaultPosition: {
		x: 10,
		y: 200
	} } };
	Size = { args: { defaultSize: {
		height: 100,
		width: 100
	} } };
	HideWithUI = { args: { hideWithUi: true } };
	ContainerId = { args: { containerId: "container-1" } };
	MultipleOptions = { args: {
		...Position.args,
		...Size.args,
		...HideWithUI.args,
		...ContainerId.args
	} };
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
	NotResizable.parameters = {
		...NotResizable.parameters,
		docs: {
			...NotResizable.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    isResizable: false\n  }\n}",
				...NotResizable.parameters?.docs?.source
			}
		}
	};
	Position.parameters = {
		...Position.parameters,
		docs: {
			...Position.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    defaultPosition: {\n      x: 10,\n      y: 200\n    }\n  }\n}",
				...Position.parameters?.docs?.source
			}
		}
	};
	Size.parameters = {
		...Size.parameters,
		docs: {
			...Size.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    defaultSize: {\n      height: 100,\n      width: 100\n    }\n  }\n}",
				...Size.parameters?.docs?.source
			}
		}
	};
	HideWithUI.parameters = {
		...HideWithUI.parameters,
		docs: {
			...HideWithUI.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    hideWithUi: true\n  }\n}",
				...HideWithUI.parameters?.docs?.source
			}
		}
	};
	ContainerId.parameters = {
		...ContainerId.parameters,
		docs: {
			...ContainerId.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    containerId: \"container-1\"\n  }\n}",
				...ContainerId.parameters?.docs?.source
			}
		}
	};
	MultipleOptions.parameters = {
		...MultipleOptions.parameters,
		docs: {
			...MultipleOptions.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    ...Position.args,\n    ...Size.args,\n    ...HideWithUI.args,\n    ...ContainerId.args\n  }\n}",
				...MultipleOptions.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Default",
		"NotResizable",
		"Position",
		"Size",
		"HideWithUI",
		"ContainerId",
		"MultipleOptions"
	];
}))();
export { ContainerId, Default, HideWithUI, MultipleOptions, NotResizable, Position, Size, __namedExportsOrder, meta as default };
