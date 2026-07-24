import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { n as Icon$1, t as init_dist } from "./iframe-DrBiZGmV.js";
import { Ft as StagePanelState, t as init_appui_react, zt as WidgetState } from "./appui-react-CpKk3CrH.js";
import { Hs as BadgeType, Vr as init_esm, Wi as SvgPlaceholder, bn as init_core_react } from "./components-react-DigDa1CF.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-BkeALKzH.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
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
		frontstages: [createFrontstage({ leftPanelProps: {
			defaultState: StagePanelState.Open,
			pinned: true
		} })],
		itemProviders: [provider],
		...props
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
		} }
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@stratakit+icons@0.2.2/node_modules/@stratakit/icons/icons/placeholder.svg
var placeholder_default;
var init_placeholder = __esmMin((() => {
	placeholder_default = "" + new URL("placeholder-DKNetxeO.svg", import.meta.url).href;
}));
//#endregion
//#region src/widget/Widget.stories.tsx
var import_jsx_runtime, meta, Default, Unloaded, Floating, Badge, Icon, IconStrataKit, CSSIcon, IconSpec, IconSpecNode, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_appui_react();
	init_core_react();
	init_esm();
	init_dist();
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
		args: { widgets: [{}, {}] }
	};
	Default = {};
	Unloaded = { args: { widgets: [{ defaultState: WidgetState.Unloaded }, {}] } };
	Floating = { args: { widgets: [{ defaultState: WidgetState.Floating }, {}] } };
	Badge = { args: { widgets: [
		{ badge: BadgeType.TechnicalPreview },
		{ badgeKind: "deprecated" },
		{}
	] } };
	Icon = {
		name: "Icon (iTwinUI)",
		args: { widgets: [
			{ iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}) },
			{},
			{},
			{},
			{}
		] }
	};
	IconStrataKit = {
		name: "Icon (StrataKit)",
		args: { widgets: [
			{ iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon$1, { href: placeholder_default }) },
			{ iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon$1, { href: placeholder_default }) },
			{ iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon$1, { href: placeholder_default }) },
			{ iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon$1, { href: placeholder_default }) },
			{ iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon$1, { href: placeholder_default }) }
		] }
	};
	CSSIcon = { args: { widgets: [
		{ iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "icon icon-placeholder" }) },
		{},
		{},
		{},
		{}
	] } };
	IconSpec = {
		name: "Icon Spec (deprecated)",
		args: { widgets: [
			{ icon: "icon-placeholder" },
			{},
			{},
			{},
			{}
		] }
	};
	IconSpecNode = {
		name: "Icon Spec Node (deprecated)",
		args: { widgets: [
			{ icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}) },
			{},
			{},
			{},
			{}
		] }
	};
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
	Icon.parameters = {
		...Icon.parameters,
		docs: {
			...Icon.parameters?.docs,
			source: {
				originalSource: "{\n  name: \"Icon (iTwinUI)\",\n  args: {\n    widgets: [{\n      iconNode: <SvgPlaceholder />\n    }, {}, {}, {}, {}]\n  }\n}",
				...Icon.parameters?.docs?.source
			}
		}
	};
	IconStrataKit.parameters = {
		...IconStrataKit.parameters,
		docs: {
			...IconStrataKit.parameters?.docs,
			source: {
				originalSource: "{\n  name: \"Icon (StrataKit)\",\n  args: {\n    widgets: [{\n      iconNode: <SKIcon href={placeholderIcon} />\n    }, {\n      iconNode: <SKIcon href={placeholderIcon} />\n    }, {\n      iconNode: <SKIcon href={placeholderIcon} />\n    }, {\n      iconNode: <SKIcon href={placeholderIcon} />\n    }, {\n      iconNode: <SKIcon href={placeholderIcon} />\n    }]\n  }\n}",
				...IconStrataKit.parameters?.docs?.source
			}
		}
	};
	CSSIcon.parameters = {
		...CSSIcon.parameters,
		docs: {
			...CSSIcon.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    widgets: [{\n      iconNode: <i className=\"icon icon-placeholder\" />\n    }, {}, {}, {}, {}]\n  }\n}",
				...CSSIcon.parameters?.docs?.source
			}
		}
	};
	IconSpec.parameters = {
		...IconSpec.parameters,
		docs: {
			...IconSpec.parameters?.docs,
			source: {
				originalSource: "{\n  name: \"Icon Spec (deprecated)\",\n  args: {\n    widgets: [{\n      icon: \"icon-placeholder\"\n    }, {}, {}, {}, {}]\n  }\n}",
				...IconSpec.parameters?.docs?.source
			}
		}
	};
	IconSpecNode.parameters = {
		...IconSpecNode.parameters,
		docs: {
			...IconSpecNode.parameters?.docs,
			source: {
				originalSource: "{\n  name: \"Icon Spec Node (deprecated)\",\n  args: {\n    widgets: [{\n      icon: <SvgPlaceholder />\n    }, {}, {}, {}, {}]\n  }\n}",
				...IconSpecNode.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Default",
		"Unloaded",
		"Floating",
		"Badge",
		"Icon",
		"IconStrataKit",
		"CSSIcon",
		"IconSpec",
		"IconSpecNode"
	];
}))();
export { Badge, CSSIcon, Default, Floating, Icon, IconSpec, IconSpecNode, IconStrataKit, Unloaded, __namedExportsOrder, meta as default };
