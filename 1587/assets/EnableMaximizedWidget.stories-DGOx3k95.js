import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { $t as StagePanelLocation, Ft as StagePanelState, Zt as StagePanelSection, mn as PreviewFeaturesProvider, t as init_appui_react, zt as WidgetState } from "./appui-react-CMpxCalk.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-DMmWpSU8.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-CWhnYRMe.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-C-D2pPn8.js";
//#region src/preview/EnableMaximizedWidget.tsx
function createProvider() {
	return {
		id: "widgets",
		getWidgets: () => {
			return [createWidget(1, {
				canPopout: true,
				layouts: { standard: {
					location: StagePanelLocation.Bottom,
					section: StagePanelSection.Start
				} }
			}), createWidget(2, { defaultState: WidgetState.Floating })];
		}
	};
}
/** `enableMaximizedFloatingWidget` and `enableMaximizedPanelWidget` preview features. When enabled the widget will have a "maximize" button. */
function PreviewStory(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewFeaturesProvider, {
		features: props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
			itemProviders: [createProvider()],
			frontstages: [createFrontstage({ leftPanelProps: {
				defaultState: StagePanelState.Open,
				pinned: true
			} })]
		})
	});
}
var import_jsx_runtime$1;
var init_EnableMaximizedWidget = __esmMin((() => {
	init_appui_react();
	init_AppUiStory();
	init_Utils();
	import_jsx_runtime$1 = require_jsx_runtime();
	PreviewStory.__docgenInfo = {
		"description": "`enableMaximizedFloatingWidget` and `enableMaximizedPanelWidget` preview features. When enabled the widget will have a \"maximize\" button.",
		"methods": [],
		"displayName": "PreviewStory"
	};
}));
//#endregion
//#region src/preview/EnableMaximizedWidget.stories.tsx
var import_jsx_runtime, meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_AppUiStory();
	init_EnableMaximizedWidget();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "PreviewFeatures/EnableMaximizedWidget",
		component: PreviewStory,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		parameters: { docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) } },
		args: {
			enableMaximizedFloatingWidget: true,
			enableMaximizedPanelWidget: true
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
