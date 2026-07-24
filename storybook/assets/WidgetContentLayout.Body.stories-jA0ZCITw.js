import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { E as WidgetContentLayout, Ft as StagePanelState, t as init_appui_react } from "./appui-react-CpKk3CrH.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-BkeALKzH.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region src/widget/WidgetContentLayout/WidgetContentLayout.Body.tsx
/**
* Showcases the WidgetContentLayout component with its Header, Body, and Footer sections.
* The WidgetContentLayout provides a flexible layout structure for widgets with optional header controls,
* scrollable content area, and footer actions.
*/
function WidgetContentLayoutBody(props) {
	const widgetContent = /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(WidgetContentLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WidgetContentLayout.Header, { title: "Header" }),
		/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WidgetContentLayout.Body, {
			...props,
			children: "Body"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WidgetContentLayout.Footer, { children: "Footer" })
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
		itemProviders: [{
			id: "widget-layout-provider",
			getWidgets: () => [createWidget(1, {
				content: widgetContent,
				label: "Widget Layout Demo"
			})]
		}],
		frontstages: [createFrontstage({ leftPanelProps: {
			defaultState: StagePanelState.Open,
			pinned: true
		} })]
	});
}
var import_jsx_runtime$1;
var init_WidgetContentLayout_Body = __esmMin((() => {
	init_appui_react();
	init_AppUiStory();
	init_Utils();
	import_jsx_runtime$1 = require_jsx_runtime();
	WidgetContentLayoutBody.__docgenInfo = {
		"description": "Showcases the WidgetContentLayout component with its Header, Body, and Footer sections.\nThe WidgetContentLayout provides a flexible layout structure for widgets with optional header controls,\nscrollable content area, and footer actions.",
		"methods": [],
		"displayName": "WidgetContentLayoutBody"
	};
}));
//#endregion
//#region src/widget/WidgetContentLayout/WidgetContentLayout.Body.stories.tsx
var import_jsx_runtime, meta, Default, BlockingLoading, NonBlockingLoading, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_AppUiStory();
	init_WidgetContentLayout_Body();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Widget/Layout/Body",
		component: WidgetContentLayoutBody,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		parameters: { docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) } }
	};
	Default = { args: {
		isLoading: false,
		isNonBlockingLoading: false
	} };
	BlockingLoading = { args: { isLoading: true } };
	NonBlockingLoading = { args: { isNonBlockingLoading: true } };
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    isLoading: false,\n    isNonBlockingLoading: false\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	BlockingLoading.parameters = {
		...BlockingLoading.parameters,
		docs: {
			...BlockingLoading.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    isLoading: true\n  }\n}",
				...BlockingLoading.parameters?.docs?.source
			}
		}
	};
	NonBlockingLoading.parameters = {
		...NonBlockingLoading.parameters,
		docs: {
			...NonBlockingLoading.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    isNonBlockingLoading: true\n  }\n}",
				...NonBlockingLoading.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Default",
		"BlockingLoading",
		"NonBlockingLoading"
	];
}))();
export { BlockingLoading, Default, NonBlockingLoading, __namedExportsOrder, meta as default };
