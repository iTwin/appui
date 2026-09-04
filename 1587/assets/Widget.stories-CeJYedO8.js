import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { i as Icon, n as useThemeBridge, r as init_dist, t as init_ThemeBridge } from "./iframe-D5FjjYOk.js";
import { Ft as StagePanelState, mn as PreviewFeaturesProvider, t as init_appui_react, zt as WidgetState } from "./appui-react-CMpxCalk.js";
import { Hs as BadgeType, Ki as SvgPlaceholder, Vr as init_esm, bn as init_core_react } from "./components-react-DhUE__o_.js";
import { a as init_placeholder, n as Page, o as placeholder_default, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-DMmWpSU8.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-CWhnYRMe.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-C-D2pPn8.js";
//#region src/widget/Widget.tsx
function StoryWidget({ id }) {
	import_react.useEffect(() => {
		action(`Widget ${id} mounted`)();
		return () => {
			action(`Widget ${id} unmounted`)();
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
		"Widget ",
		id,
		" content "
	] });
}
function createProvider(widgets) {
	return {
		id: "widgets",
		getWidgets: () => {
			return Array.from({ length: widgets.length }, (_, index) => {
				const widget = widgets[index];
				const id = index + 1;
				return createWidget(id, {
					content: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StoryWidget, { id: `${id}` }),
					...widget
				});
			});
		}
	};
}
/** [Widget](https://www.itwinjs.org/reference/appui-react/widget/widget) interface allows you to configure the widget. */
function WidgetStory(props) {
	const provider = createProvider(props.widgets);
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewFeaturesProvider, {
		features: { widgetTabActions: props.widgetTabActions },
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
			frontstages: [createFrontstage({ leftPanelProps: {
				defaultState: StagePanelState.Open,
				pinned: true
			} })],
			itemProviders: [provider],
			...props
		})
	});
}
var import_react, import_jsx_runtime$1, action;
var init_Widget = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	init_AppUiStory();
	init_Utils();
	import_jsx_runtime$1 = require_jsx_runtime();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	StoryWidget.__docgenInfo = {
		"description": "",
		"methods": [],
		"displayName": "StoryWidget",
		"props": { "id": {
			"required": true,
			"tsType": { "name": "string" },
			"description": ""
		} }
	};
	WidgetStory.__docgenInfo = {
		"description": "[Widget](https://www.itwinjs.org/reference/appui-react/widget/widget) interface allows you to configure the widget.",
		"methods": [],
		"displayName": "WidgetStory",
		"props": { "widgets": {
			"required": true,
			"tsType": {
				"name": "Array",
				"elements": [{
					"name": "Partial",
					"elements": [{ "name": "Widget" }],
					"raw": "Partial<Widget>"
				}],
				"raw": "Partial<Widget>[]"
			},
			"description": ""
		} },
		"composes": ["Pick"]
	};
}));
//#endregion
//#region src/widget/Widget.stories.tsx
function StrataKitIcon(props) {
	if (!useThemeBridge()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { href: props.href });
}
var import_jsx_runtime, meta, Default, Unloaded, Floating, Badge, Icons, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_appui_react();
	init_core_react();
	init_esm();
	init_dist();
	init_ThemeBridge();
	init_Decorators();
	init_AppUiStory();
	init_Widget();
	init_placeholder();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Widget/Widget",
		component: WidgetStory,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		parameters: { docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) } },
		args: {
			widgetTabActions: false,
			widgets: [{}, {}]
		}
	};
	Default = {};
	Unloaded = { args: { widgets: [{ defaultState: WidgetState.Unloaded }, {}] } };
	Floating = { args: { widgets: [{ defaultState: WidgetState.Floating }, {}] } };
	Badge = { args: { widgets: [
		{ badge: BadgeType.TechnicalPreview },
		{ badgeKind: "deprecated" },
		{}
	] } };
	Icons = { args: { widgets: [
		{
			iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}),
			label: "iTwinUI"
		},
		{
			iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StrataKitIcon, { href: placeholder_default }),
			label: "StrataKit"
		},
		{
			iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "icon icon-placeholder" }),
			label: "CSS Icon"
		},
		{
			icon: "icon-placeholder",
			label: "iconSpec (deprecated)"
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}),
			label: "iconSpec node (deprecated)"
		}
	] } };
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
	Unloaded.parameters = {
		...Unloaded.parameters,
		docs: {
			...Unloaded.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    widgets: [{\n      defaultState: WidgetState.Unloaded\n    }, {}]\n  }\n}",
				...Unloaded.parameters?.docs?.source
			}
		}
	};
	Floating.parameters = {
		...Floating.parameters,
		docs: {
			...Floating.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    widgets: [{\n      defaultState: WidgetState.Floating\n    }, {}]\n  }\n}",
				...Floating.parameters?.docs?.source
			}
		}
	};
	Badge.parameters = {
		...Badge.parameters,
		docs: {
			...Badge.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    widgets: [{\n      badge: BadgeType.TechnicalPreview\n    }, {\n      badgeKind: \"deprecated\"\n    }, {}]\n  }\n}",
				...Badge.parameters?.docs?.source
			}
		}
	};
	Icons.parameters = {
		...Icons.parameters,
		docs: {
			...Icons.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    widgets: [{\n      iconNode: <SvgPlaceholder />,\n      label: \"iTwinUI\"\n    }, {\n      iconNode: <StrataKitIcon href={placeholderIcon} />,\n      label: \"StrataKit\"\n    }, {\n      iconNode: <i className=\"icon icon-placeholder\" />,\n      label: \"CSS Icon\"\n    }, {\n      icon: \"icon-placeholder\",\n      label: \"iconSpec (deprecated)\"\n    }, {\n      icon: <SvgPlaceholder />,\n      label: \"iconSpec node (deprecated)\"\n    }]\n  }\n}",
				...Icons.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Default",
		"Unloaded",
		"Floating",
		"Badge",
		"Icons"
	];
}))();
export { Badge, Default, Floating, Icons, Unloaded, __namedExportsOrder, meta as default };
