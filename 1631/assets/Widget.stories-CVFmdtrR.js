import { a as __toESM, n as __esmMin } from "./rolldown-runtime-BdGkqNEt.js";
import { t as require_react } from "./react-CQaVdgFc.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DXozJtVo.js";
import { Rr as init_esm, Yi as SvgPlaceholder, _n as init_core_react, ec as BadgeType } from "./components-react-BquuN1qO.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-XhWowmZI.js";
import { Lt as StagePanelState, Vt as WidgetState, t as init_appui_react } from "./appui-react-BuxNaod2.js";
import { _ as placeholder_default, g as init_placeholder } from "./iframe-BxpI6rwI.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-CfK2Rlri.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-R107BvvB.js";
import { n as init_StrataKitIcon, t as StrataKitIcon } from "./StrataKitIcon-B71sLsGq.js";
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
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
		features: { widgetTabActions: props.widgetTabActions },
		frontstages: [createFrontstage({ leftPanelProps: {
			defaultState: StagePanelState.Open,
			pinned: true
		} })],
		itemProviders: [provider],
		...props
	});
}
var import_react, import_jsx_runtime$1, action;
function init_Widget() {
	return (init_Widget = __esmMin((() => {
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
	})))();
}
//#endregion
//#region src/widget/Widget.stories.tsx
var import_jsx_runtime, meta, Default, Unloaded, Floating, Badge, Icons, __namedExportsOrder;
function init_Widget_stories() {
	return (init_Widget_stories = __esmMin((() => {
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
	})))();
}
//#endregion
init_Widget_stories();
export { Badge, Default, Floating, Icons, Unloaded, __namedExportsOrder, meta as default };
