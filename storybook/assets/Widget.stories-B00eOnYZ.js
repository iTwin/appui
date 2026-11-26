import { a as __toESM, n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { cn as init_Button, sn as Button } from "./Key.enum-BiJiZj1R.js";
import { Mc as MenuItem, Nc as init_MenuItem, Rr as init_esm, Yi as SvgPlaceholder, _n as init_core_react, dl as init_DropdownMenu, ec as BadgeType, ul as DropdownMenu } from "./components-react-DcvXYDI3.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-655zXjGl.js";
import { Lt as StagePanelState, Vt as WidgetState, t as init_appui_react } from "./appui-react-DA_Ac8MK.js";
import { a as Button$1, i as init_Menu, n as init_MenuItem$1, o as init_Button$1, r as Menu, t as MenuItem$1 } from "./MenuItem-BOH8HjiH.js";
import { n as ThemeBridgeContext, r as init_ThemeBridge, v as init_placeholder, y as placeholder_default } from "./iframe-CAGNeKUC.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-CdadktrU.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-C3CpQq4J.js";
import { n as init_StrataKitIcon, t as StrataKitIcon } from "./StrataKitIcon-BNmTRcQ6.js";
//#region src/widget/Widget.tsx
function StoryWidget({ id }) {
	import_react$1.useEffect(() => {
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
var import_react$1, import_jsx_runtime$1, action;
function init_Widget() {
	return (init_Widget = __esmMin((() => {
		import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
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
function PortalledContent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			padding: "var(--iui-size-xs)",
			display: "flex",
			flexDirection: "column",
			gap: "var(--iui-size-xs)",
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenu, {
			closeOnItemClick: true,
			menuItems: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, { children: "Item #1" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, { children: "Item #2" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
					disabled: true,
					children: "Item #3"
				})
			] }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "DropdownMenu (iTwinUI)" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StrataKitMenu, {})]
	});
}
function StrataKitMenu() {
	const [anchorEl, setAnchorEl] = import_react.useState(null);
	const open = Boolean(anchorEl);
	const handleClose = () => {
		setAnchorEl(null);
	};
	if (!(import_react.useContext(ThemeBridgeContext) === "useStrataKit")) return void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		"aria-haspopup": "true",
		"aria-expanded": open ? "true" : "false",
		onClick: (event) => setAnchorEl(event.currentTarget),
		children: "User actions"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, {
		anchorEl,
		open,
		onClose: handleClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem$1, {
				onClick: handleClose,
				children: "Profile"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem$1, {
				onClick: handleClose,
				children: "My account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem$1, {
				onClick: handleClose,
				children: "Logout"
			})
		]
	})] });
}
var import_react, import_jsx_runtime, meta, Default, Unloaded, Floating, Badge, Icons, Content, __namedExportsOrder;
function init_Widget_stories() {
	return (init_Widget_stories = __esmMin((() => {
		import_react = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		init_core_react();
		init_esm();
		init_Button$1();
		init_Menu();
		init_MenuItem$1();
		init_StrataKitIcon();
		init_Decorators();
		init_AppUiStory();
		init_Widget();
		init_placeholder();
		init_Button(), init_DropdownMenu(), init_MenuItem();
		init_ThemeBridge();
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
		Content = { args: { widgets: [{
			iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StrataKitIcon, { href: placeholder_default }),
			label: "Portalled",
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalledContent, {}),
			canPopout: true,
			defaultState: WidgetState.Floating
		}, {}] } };
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
		Content.parameters = {
			...Content.parameters,
			docs: {
				...Content.parameters?.docs,
				source: {
					originalSource: "{\n  args: {\n    widgets: [{\n      iconNode: <StrataKitIcon href={placeholderIcon} />,\n      label: \"Portalled\",\n      content: <PortalledContent />,\n      canPopout: true,\n      defaultState: WidgetState.Floating\n    }, {}]\n  }\n}",
					...Content.parameters?.docs?.source
				}
			}
		};
		__namedExportsOrder = [
			"Default",
			"Unloaded",
			"Floating",
			"Badge",
			"Icons",
			"Content"
		];
	})))();
}
//#endregion
init_Widget_stories();
export { Badge, Content, Default, Floating, Icons, Unloaded, __namedExportsOrder, meta as default };
