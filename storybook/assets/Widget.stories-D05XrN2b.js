import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Qi as SvgPlaceholder, Sn as init_core_react, Ur as init_esm, ec as BadgeType } from "./components-react-DtrU8Xn8.js";
import { n as init_ThemeBridge, o as Icon, r as init_dist, t as ThemeBridgeContext } from "./iframe-Bo56kGAO.js";
import { Ut as WidgetState, dn as PreviewFeaturesProvider, t as init_appui_react, zt as StagePanelState } from "./appui-react-B8HksdGF.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-DA36o4ka.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-kIad8GmL.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CVdf4bPx.js";
//#region .storybook/addons/theme-bridge/StrataKitIcon.tsx
function StrataKitIcon(props) {
	if (!import_react$1.useContext(ThemeBridgeContext)) return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(SvgPlaceholder, {});
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Icon, { href: props.href });
}
var import_react$1, import_jsx_runtime$2;
var init_StrataKitIcon = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_esm();
	init_dist();
	init_ThemeBridge();
	import_jsx_runtime$2 = require_jsx_runtime();
	StrataKitIcon.__docgenInfo = {
		"description": "",
		"methods": [],
		"displayName": "StrataKitIcon",
		"props": { "href": {
			"required": true,
			"tsType": { "name": "string" },
			"description": ""
		} }
	};
}));
//#endregion
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
//#region ../../node_modules/.pnpm/@stratakit+icons@0.4.3/node_modules/@stratakit/icons/icons/placeholder.svg
var placeholder_default;
var init_placeholder = __esmMin((() => {
	placeholder_default = "" + new URL("placeholder-DKNetxeO.svg", import.meta.url).href;
}));
//#endregion
//#region src/widget/Widget.stories.tsx
var import_jsx_runtime, meta, Default, Unloaded, Floating, Badge, Icons, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_appui_react();
	init_core_react();
	init_esm();
	init_StrataKitIcon();
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
			widgets: [{}, {}],
			widgetTabActions: false
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
			label: "iTwinUI icon"
		},
		{
			iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StrataKitIcon, { href: placeholder_default }),
			label: "StrataKit icon"
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}),
			label: "iTwinUI icon spec (deprecated)"
		},
		{
			icon: "icon-placeholder",
			label: "Font icon spec (deprecated)"
		},
		{
			iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "icon icon-placeholder" }),
			label: "Font icon (deprecated)"
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
				originalSource: "{\n  args: {\n    widgets: [{\n      iconNode: <SvgPlaceholder />,\n      label: \"iTwinUI icon\"\n    }, {\n      iconNode: <StrataKitIcon href={placeholderIcon} />,\n      label: \"StrataKit icon\"\n    }, {\n      icon: <SvgPlaceholder />,\n      label: \"iTwinUI icon spec (deprecated)\"\n    }, {\n      icon: \"icon-placeholder\",\n      label: \"Font icon spec (deprecated)\"\n    }, {\n      iconNode: <i className=\"icon icon-placeholder\" />,\n      label: \"Font icon (deprecated)\"\n    }]\n  }\n}",
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
