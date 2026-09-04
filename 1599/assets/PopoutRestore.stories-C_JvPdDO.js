import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { _t as Button, i as init_esm } from "./iframe-_qH1B36V.js";
import { Ft as StagePanelState, Mt as useSpecificWidgetDef, t as init_appui_react, zt as WidgetState } from "./appui-react-DMQWBmH2.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-04nOHDfY.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-DKzqMgTq.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CQqzS3VT.js";
//#region src/widget/PopoutRestore.tsx
/** Demonstrates that a popped-out widget remains popped out after being hidden
* (e.g. because it has no content to display) and then shown again.
*
* The hide/show controls live outside of the widget (as `AppUiStory` children)
* since hiding the widget unmounts its content, which would otherwise take the
* "Show widget" button down with it.
*
* To reproduce: pop the widget out (drag its tab out, or use the "..." menu),
* then click "Hide widget" and "Show widget". Before the fix (AB#2024472) the
* widget would dock back into the panel instead of staying popped out.
*/
function PopoutRestoreStory() {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
		itemProviders: [{
			id: "widgets",
			getWidgets: () => [createWidget(1, {
				canPopout: true,
				content: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					style: { padding: "0.5em" },
					children: "Widget content"
				})
			})]
		}],
		frontstages: [createFrontstage({ leftPanelProps: { defaultState: StagePanelState.Open } })],
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WidgetVisibilityControls, {})
	});
}
function WidgetVisibilityControls() {
	const widgetDef = useSpecificWidgetDef("w1");
	const [visible, setVisible] = import_react.useState(true);
	const hide = () => {
		setVisible(false);
		widgetDef?.setWidgetState(WidgetState.Hidden);
	};
	const show = () => {
		setVisible(true);
		widgetDef?.setWidgetState(WidgetState.Open);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		style: {
			position: "absolute",
			bottom: 0,
			left: 0,
			zIndex: 1e3,
			padding: "0.5em",
			display: "flex",
			flexDirection: "column",
			gap: "0.5em"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", { children: ["Widget state: ", visible ? "Visible" : "Hidden"] }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			style: {
				display: "flex",
				gap: "0.5em"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
				onClick: hide,
				size: "small",
				children: "Hide widget"
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
				onClick: show,
				styleType: "cta",
				size: "small",
				children: "Show widget"
			})]
		})]
	});
}
var import_react, import_jsx_runtime$1;
var init_PopoutRestore = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	init_esm();
	init_AppUiStory();
	init_Utils();
	import_jsx_runtime$1 = require_jsx_runtime();
	PopoutRestoreStory.__docgenInfo = {
		"description": "Demonstrates that a popped-out widget remains popped out after being hidden\n(e.g. because it has no content to display) and then shown again.\n\nThe hide/show controls live outside of the widget (as `AppUiStory` children)\nsince hiding the widget unmounts its content, which would otherwise take the\n\"Show widget\" button down with it.\n\nTo reproduce: pop the widget out (drag its tab out, or use the \"...\" menu),\nthen click \"Hide widget\" and \"Show widget\". Before the fix (AB#2024472) the\nwidget would dock back into the panel instead of staying popped out.",
		"methods": [],
		"displayName": "PopoutRestoreStory"
	};
}));
//#endregion
//#region src/widget/PopoutRestore.stories.tsx
var import_jsx_runtime, meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_PopoutRestore();
	init_Decorators();
	init_AppUiStory();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Widget/PopoutRestore",
		component: PopoutRestoreStory,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		parameters: { docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) } }
	};
	Default = {};
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{}",
				...Default.parameters?.docs?.source
			},
			description: {
				story: "Steps to reproduce AB#2024472:\n1. Pop the widget out (drag its tab out of the panel, or use the tab's\n   \"...\" menu and click \"Pop out active widget tab\").\n2. Click \"Hide widget\".\n3. Click \"Show widget\".\n\nExpected: the widget re-appears in its popout window.\nBefore the fix it would instead dock back into the left panel.",
				...Default.parameters?.docs?.description
			}
		}
	};
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
