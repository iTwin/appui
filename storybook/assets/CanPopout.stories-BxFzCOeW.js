import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Ft as StagePanelState, t as init_appui_react } from "./appui-react-CpKk3CrH.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { i as init_Utils, n as createWidget } from "./Utils-BkeALKzH.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region src/widget/CanPopout.tsx
function createProvider(props) {
	return {
		id: "widgets",
		getWidgets: () => [createWidget(1, { canPopout: props.canPopout })]
	};
}
/** [canPopout](https://www.itwinjs.org/reference/appui-react/widget/widget/#canpopout) property can be used to enable user to pop the widget out to a separate window. */
function CanPopoutStory(props) {
	const provider = createProvider(props);
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
		frontstage: { leftPanelProps: { defaultState: StagePanelState.Open } },
		itemProviders: [provider]
	});
}
var import_jsx_runtime$1;
var init_CanPopout = __esmMin((() => {
	init_appui_react();
	init_AppUiStory();
	init_Utils();
	import_jsx_runtime$1 = require_jsx_runtime();
	CanPopoutStory.__docgenInfo = {
		"description": "[canPopout](https://www.itwinjs.org/reference/appui-react/widget/widget/#canpopout) property can be used to enable user to pop the widget out to a separate window.",
		"methods": [],
		"displayName": "CanPopoutStory"
	};
}));
//#endregion
//#region src/widget/CanPopout.stories.tsx
var import_jsx_runtime, meta, Enabled, Disabled, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_CanPopout();
	init_Decorators();
	init_AppUiStory();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Widget/canPopout",
		component: CanPopoutStory,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		parameters: { docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) } }
	};
	Enabled = { args: { canPopout: true } };
	Disabled = { args: { canPopout: false } };
	Enabled.parameters = {
		...Enabled.parameters,
		docs: {
			...Enabled.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    canPopout: true\n  }\n}",
				...Enabled.parameters?.docs?.source
			}
		}
	};
	Disabled.parameters = {
		...Disabled.parameters,
		docs: {
			...Disabled.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    canPopout: false\n  }\n}",
				...Disabled.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Enabled", "Disabled"];
}))();
export { Disabled, Enabled, __namedExportsOrder, meta as default };
