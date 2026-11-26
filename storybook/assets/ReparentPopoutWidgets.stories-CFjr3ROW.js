import { a as __toESM, n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { cn as init_Button, sn as Button } from "./Key.enum-BiJiZj1R.js";
import { Al as Label, Mc as MenuItem, Nc as init_MenuItem, dl as init_DropdownMenu, el as Input, jl as init_Label, tl as init_Input, ul as DropdownMenu } from "./components-react-DcvXYDI3.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-655zXjGl.js";
import { Lt as StagePanelState, Vt as WidgetState, t as init_appui_react } from "./appui-react-DA_Ac8MK.js";
import { a as Button$1, i as init_Menu, n as init_MenuItem$1, o as init_Button$1, r as Menu, t as MenuItem$1 } from "./MenuItem-BOH8HjiH.js";
import { n as ThemeBridgeContext, r as init_ThemeBridge } from "./iframe-CAGNeKUC.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-CdadktrU.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-C3CpQq4J.js";
//#region src/preview/ReparentPopoutWidgets.tsx
function Content({ id }) {
	const [count, setCount] = import_react.useState(0);
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		style: {
			padding: "var(--iui-size-xs)",
			display: "flex",
			flexDirection: "column",
			gap: "var(--iui-size-xs)",
			alignItems: "flex-start"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(Label, { children: [
				"Widget ",
				id,
				" content"
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(Button, {
				onClick: () => setCount((prev) => ++prev),
				children: [count, "++"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Input, {}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DropdownMenu, {
				menuItems: (close) => [...Array(6)].map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(MenuItem, {
					onClick: close,
					children: ["Item ", index + 1]
				}, index + 1)),
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, { children: "DropdownMenu (iTwinUI)" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StrataKitMenu, {})
		]
	});
}
function StrataKitMenu() {
	const [anchorEl, setAnchorEl] = import_react.useState(null);
	const open = Boolean(anchorEl);
	const handleClose = () => {
		setAnchorEl(null);
	};
	if (!(import_react.useContext(ThemeBridgeContext) === "useStrataKit")) return void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button$1, {
		"aria-haspopup": "true",
		"aria-expanded": open ? "true" : "false",
		onClick: (event) => setAnchorEl(event.currentTarget),
		children: "User actions"
	}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(Menu, {
		anchorEl,
		open,
		onClose: handleClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MenuItem$1, {
				onClick: handleClose,
				children: "Profile"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MenuItem$1, {
				onClick: handleClose,
				children: "My account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MenuItem$1, {
				onClick: handleClose,
				children: "Logout"
			})
		]
	})] });
}
function createProvider() {
	return {
		id: "widgets",
		getWidgets: () => {
			return [
				createWidget(1, {
					canPopout: true,
					content: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Content, { id: "1" }),
					defaultState: WidgetState.Floating
				}),
				createWidget(2, {
					canPopout: true,
					content: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Content, { id: "2" })
				}),
				createWidget(3, {
					canPopout: true,
					content: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Content, { id: "3" })
				})
			];
		}
	};
}
/** `reparentPopoutWidgets` preview feature. When enabled widget content will be reparented to a popout content container. */
function PreviewStory(props) {
	const provider = createProvider();
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
		features: props,
		itemProviders: [provider],
		frontstages: [createFrontstage({ leftPanelProps: {
			defaultState: StagePanelState.Open,
			pinned: true
		} })]
	});
}
var import_react, import_jsx_runtime$1;
function init_ReparentPopoutWidgets() {
	return (init_ReparentPopoutWidgets = __esmMin((() => {
		import_react = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		init_Button(), init_DropdownMenu(), init_Input(), init_Label(), init_MenuItem();
		init_Button$1();
		init_Menu();
		init_MenuItem$1();
		init_ThemeBridge();
		init_AppUiStory();
		init_Utils();
		import_jsx_runtime$1 = require_jsx_runtime();
		PreviewStory.__docgenInfo = {
			"description": "`reparentPopoutWidgets` preview feature. When enabled widget content will be reparented to a popout content container.",
			"methods": [],
			"displayName": "PreviewStory"
		};
	})))();
}
//#endregion
//#region src/preview/ReparentPopoutWidgets.stories.tsx
var import_jsx_runtime, meta, Default, SpecifedIds, __namedExportsOrder;
function init_ReparentPopoutWidgets_stories() {
	return (init_ReparentPopoutWidgets_stories = __esmMin((() => {
		init_Decorators();
		init_AppUiStory();
		init_ReparentPopoutWidgets();
		import_jsx_runtime = require_jsx_runtime();
		meta = {
			title: "PreviewFeatures/ReparentPopoutWidgets",
			component: PreviewStory,
			tags: ["autodocs"],
			decorators: [AppUiDecorator],
			parameters: { docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) } },
			args: { reparentPopoutWidgets: true }
		};
		Default = {};
		SpecifedIds = { args: { reparentPopoutWidgets: ["w1", "w2"] } };
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
		SpecifedIds.parameters = {
			...SpecifedIds.parameters,
			docs: {
				...SpecifedIds.parameters?.docs,
				source: {
					originalSource: "{\n  args: {\n    reparentPopoutWidgets: [\"w1\", \"w2\"]\n  }\n}",
					...SpecifedIds.parameters?.docs?.source
				}
			}
		};
		__namedExportsOrder = ["Default", "SpecifedIds"];
	})))();
}
//#endregion
init_ReparentPopoutWidgets_stories();
export { Default, SpecifedIds, __namedExportsOrder, meta as default };
