import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { D as MenuItem, _t as DropdownMenu, kt as IconButton, o as init_esm, qt as Label, rt as Input, yt as Button } from "./iframe-D5FjjYOk.js";
import { Ft as StagePanelState, mn as PreviewFeaturesProvider, t as init_appui_react, zt as WidgetState } from "./appui-react-CMpxCalk.js";
import { Vr as init_esm$1, ca as SvgMore } from "./components-react-DhUE__o_.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-DMmWpSU8.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-CWhnYRMe.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-C-D2pPn8.js";
//#region src/preview/ReparentPopoutWidgets.tsx
function Content({ id }) {
	const [count, setCount] = import_react.useState(0);
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", { children: [
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
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(IconButton, { children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SvgMore, {}) })
		})
	] });
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
var import_react, import_jsx_runtime$1;
var init_ReparentPopoutWidgets = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	init_esm$1();
	init_esm();
	init_AppUiStory();
	init_Utils();
	import_jsx_runtime$1 = require_jsx_runtime();
	PreviewStory.__docgenInfo = {
		"description": "`reparentPopoutWidgets` preview feature. When enabled widget content will be reparented to a popout content container.",
		"methods": [],
		"displayName": "PreviewStory"
	};
}));
//#endregion
//#region src/preview/ReparentPopoutWidgets.stories.tsx
var import_jsx_runtime, meta, Default, SpecifedIds, __namedExportsOrder;
//#endregion
__esmMin((() => {
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
}))();
export { Default, SpecifedIds, __namedExportsOrder, meta as default };
