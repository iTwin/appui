import { a as __toESM, n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { cn as init_Button, sn as Button } from "./Key.enum-1tPeVDEH.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-DVMw3I-C.js";
import { It as useSpecificWidgetDef, Ut as WidgetState, t as init_appui_react, zt as StagePanelState } from "./appui-react-B4bFXMth.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-BjKYoeqO.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-DbQYdZs9.js";
//#region src/widget/EmptyState.tsx
/** Showcases different strategies to display widgets in an empty state.
* A combination of [useSpecificWidgetDef](https://www.itwinjs.org/reference/appui-react/frontstage/usespecificwidgetdef/) and
* [setWidgetState](https://www.itwinjs.org/reference/appui-react/widget/widgetdef/#setwidgetstate) APIs can be used to
* hide widgets in an empty state.
*/
function EmptyStateStory(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
		itemProviders: [{
			id: "widgets",
			getWidgets: () => [createWidget(1, { content: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Widget, { hideOnEmptyState: props.hideOnEmptyState }) })]
		}],
		frontstages: [createFrontstage({ leftPanelProps: { defaultState: StagePanelState.Open } })]
	});
}
function Widget(props) {
	const [data, resetData] = useWidgetData();
	useHideWidget(props.hideOnEmptyState, data);
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		style: { padding: "0.5em" },
		children: !data ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", { children: "No data" }) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", { children: data }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
			onClick: resetData,
			styleType: "cta",
			size: "small",
			children: "Reset data"
		})] })
	});
}
function useHideWidget(enabled, data) {
	const widgetDef = useSpecificWidgetDef("w1");
	import_react.useEffect(() => {
		if (!enabled) return;
		widgetDef?.setWidgetState(data ? WidgetState.Open : WidgetState.Hidden);
	}, [
		data,
		enabled,
		widgetDef
	]);
}
function useWidgetData() {
	const [data, setData] = import_react.useState();
	import_react.useEffect(() => {
		if (data) return;
		setTimeout(() => {
			setData("Widget data");
		}, 2e3);
	}, [data]);
	const reset = () => {
		setData(void 0);
	};
	return [data, reset];
}
var import_react, import_jsx_runtime$1;
function init_EmptyState() {
	return (init_EmptyState = __esmMin((() => {
		import_react = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		init_Button();
		init_AppUiStory();
		init_Utils();
		import_jsx_runtime$1 = require_jsx_runtime();
		EmptyStateStory.__docgenInfo = {
			"description": "Showcases different strategies to display widgets in an empty state.\nA combination of [useSpecificWidgetDef](https://www.itwinjs.org/reference/appui-react/frontstage/usespecificwidgetdef/) and\n[setWidgetState](https://www.itwinjs.org/reference/appui-react/widget/widgetdef/#setwidgetstate) APIs can be used to\nhide widgets in an empty state.",
			"methods": [],
			"displayName": "EmptyStateStory",
			"props": { "hideOnEmptyState": {
				"required": true,
				"tsType": { "name": "boolean" },
				"description": "Toggle this on to hide the widget when there is no data to display."
			} }
		};
	})))();
}
//#endregion
//#region src/widget/EmptyState.stories.tsx
var import_jsx_runtime, meta, HideWidget, ShowEmptyState, __namedExportsOrder;
function init_EmptyState_stories() {
	return (init_EmptyState_stories = __esmMin((() => {
		init_EmptyState();
		init_Decorators();
		init_AppUiStory();
		import_jsx_runtime = require_jsx_runtime();
		meta = {
			title: "Widget/Empty State",
			component: EmptyStateStory,
			tags: ["autodocs"],
			decorators: [AppUiDecorator],
			parameters: { docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) } },
			args: { hideOnEmptyState: true }
		};
		HideWidget = {};
		ShowEmptyState = { args: { hideOnEmptyState: false } };
		HideWidget.parameters = {
			...HideWidget.parameters,
			docs: {
				...HideWidget.parameters?.docs,
				source: {
					originalSource: "{}",
					...HideWidget.parameters?.docs?.source
				}
			}
		};
		ShowEmptyState.parameters = {
			...ShowEmptyState.parameters,
			docs: {
				...ShowEmptyState.parameters?.docs,
				source: {
					originalSource: "{\n  args: {\n    hideOnEmptyState: false\n  }\n}",
					...ShowEmptyState.parameters?.docs?.source
				}
			}
		};
		__namedExportsOrder = ["HideWidget", "ShowEmptyState"];
	})))();
}
//#endregion
init_EmptyState_stories();
export { HideWidget, ShowEmptyState, __namedExportsOrder, meta as default };
