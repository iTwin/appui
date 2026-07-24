import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Ft as StagePanelState, an as PreviewFeaturesProvider, t as init_appui_react } from "./appui-react-CpKk3CrH.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-BkeALKzH.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region src/preview/WidgetTabActions.tsx
/** `widgetTabActions` preview feature. Widget tab actions are displayed for individual tabs instead of the default behavior where only active tab actions are exposed. */
function PreviewStory(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewFeaturesProvider, {
		features: {
			controlWidgetVisibility: true,
			widgetTabActions: true,
			...props
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
			itemProviders: [{
				id: "widgets",
				getWidgets: () => {
					return [
						createWidget(1),
						createWidget(2),
						createWidget(3),
						createWidget(4),
						createWidget(5)
					];
				}
			}],
			frontstages: [createFrontstage({ leftPanelProps: {
				defaultState: StagePanelState.Open,
				pinned: true
			} })]
		})
	});
}
var import_jsx_runtime$1;
var init_WidgetTabActions = __esmMin((() => {
	init_appui_react();
	init_AppUiStory();
	init_Utils();
	import_jsx_runtime$1 = require_jsx_runtime();
	PreviewStory.__docgenInfo = {
		"description": "`widgetTabActions` preview feature. Widget tab actions are displayed for individual tabs instead of the default behavior where only active tab actions are exposed.",
		"methods": [],
		"displayName": "PreviewStory"
	};
}));
//#endregion
//#region src/preview/WidgetTabActions.stories.tsx
var import_jsx_runtime, meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_AppUiStory();
	init_WidgetTabActions();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "PreviewFeatures/WidgetTabActions",
		component: PreviewStory,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		parameters: { docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) } },
		args: {
			enableMaximizedFloatingWidget: false,
			enableMaximizedPanelWidget: false
		}
	};
	Default = {};
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
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
