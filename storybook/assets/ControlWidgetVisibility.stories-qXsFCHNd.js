import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Ft as StagePanelState, an as PreviewFeaturesProvider, t as init_appui_react, zt as WidgetState } from "./appui-react-CpKk3CrH.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-BkeALKzH.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region src/preview/ControlWidgetVisibility.tsx
function createProvider(visibleWidgets) {
	return {
		id: "widgets",
		getWidgets: () => {
			const count = Math.max(5, visibleWidgets + 3);
			return [...Array(count)].map((_, index) => {
				return createWidget(index + 1, { defaultState: index < visibleWidgets ? void 0 : WidgetState.Hidden });
			});
		}
	};
}
/** `enableMaximizedFloatingWidget` and `enableMaximizedPanelWidget` preview features. When enabled the widget will have a "maximize" button. */
function PreviewStory({ controlWidgetVisibility, dropdownThreshold, visibleWidgets }) {
	const provider = createProvider(visibleWidgets);
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewFeaturesProvider, {
		features: {
			controlWidgetVisibility,
			widgetActionDropdown: { threshold: dropdownThreshold }
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
			itemProviders: [provider],
			frontstages: [createFrontstage({ leftPanelProps: {
				defaultState: StagePanelState.Open,
				pinned: true
			} })]
		})
	});
}
var import_jsx_runtime$1;
var init_ControlWidgetVisibility = __esmMin((() => {
	init_appui_react();
	init_AppUiStory();
	init_Utils();
	import_jsx_runtime$1 = require_jsx_runtime();
	PreviewStory.__docgenInfo = {
		"description": "`enableMaximizedFloatingWidget` and `enableMaximizedPanelWidget` preview features. When enabled the widget will have a \"maximize\" button.",
		"methods": [],
		"displayName": "PreviewStory",
		"props": {
			"visibleWidgets": {
				"required": true,
				"tsType": { "name": "number" },
				"description": "Number of non-hidden widgets."
			},
			"dropdownThreshold": {
				"required": true,
				"tsType": { "name": "number" },
				"description": "Threshold of `widgetActionDropdown`."
			}
		},
		"composes": ["Pick"]
	};
}));
//#endregion
//#region src/preview/ControlWidgetVisibility.stories.tsx
var import_jsx_runtime, meta, Default, NoDropdown, AllHidden, SpecifiedIds, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_AppUiStory();
	init_ControlWidgetVisibility();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "PreviewFeatures/ControlWidgetVisibility",
		component: PreviewStory,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		parameters: { docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) } },
		args: {
			controlWidgetVisibility: true,
			visibleWidgets: 1,
			dropdownThreshold: 0
		}
	};
	Default = {};
	NoDropdown = { args: { dropdownThreshold: 10 } };
	AllHidden = { args: { visibleWidgets: 0 } };
	SpecifiedIds = { args: {
		controlWidgetVisibility: ["w1", "w2"],
		visibleWidgets: 5
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
	NoDropdown.parameters = {
		...NoDropdown.parameters,
		docs: {
			...NoDropdown.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    dropdownThreshold: 10\n  }\n}",
				...NoDropdown.parameters?.docs?.source
			}
		}
	};
	AllHidden.parameters = {
		...AllHidden.parameters,
		docs: {
			...AllHidden.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    visibleWidgets: 0\n  }\n}",
				...AllHidden.parameters?.docs?.source
			}
		}
	};
	SpecifiedIds.parameters = {
		...SpecifiedIds.parameters,
		docs: {
			...SpecifiedIds.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    controlWidgetVisibility: [\"w1\", \"w2\"],\n    visibleWidgets: 5\n  }\n}",
				...SpecifiedIds.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Default",
		"NoDropdown",
		"AllHidden",
		"SpecifiedIds"
	];
}))();
export { AllHidden, Default, NoDropdown, SpecifiedIds, __namedExportsOrder, meta as default };
