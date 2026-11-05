import { a as __toESM, n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { cn as init_Button, sn as Button } from "./Key.enum-BSNY_TRy.js";
import { el as Input, hl as init_Text, ml as Text, tl as init_Input } from "./components-react-DvtW35c_.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-BaJUIUEH.js";
import { $ as BackstageComposer, $t as StagePanelSection, Kt as UiItemsManager, Lt as StagePanelState, Nt as useActiveFrontstageId, O as BackstageAppButton, dt as BackstageItemUtilities, t as init_appui_react, tn as StagePanelLocation } from "./appui-react-a1NnM8XT.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-DkWgLQwP.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-Bt2xyOFQ.js";
//#region src/frontstage/Active.tsx
function AppContent() {
	const [count, setCount] = import_react.useState(0);
	const activeFrontstageId = useActiveFrontstageId();
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		style: {
			display: "grid",
			justifyContent: "center",
			alignContent: "center",
			gap: 8,
			height: "100%"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Text, { children: activeFrontstageId }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Input, {}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(Button, {
				onClick: () => setCount((prev) => ++prev),
				children: [count, "++"]
			})
		]
	});
}
function ActiveFrontstageStory(props) {
	const { stableContentLayout } = props;
	const frontstage1 = createFrontstage({
		id: "frontstage1",
		content: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppContent, {}),
		hideStatusBar: true,
		hideToolSettings: true,
		cornerButton: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(BackstageAppButton, {}),
		leftPanelProps: {
			defaultState: StagePanelState.Open,
			pinned: true
		}
	});
	const frontstage2 = createFrontstage({
		id: "frontstage2",
		content: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppContent, {}),
		hideStatusBar: true,
		hideToolSettings: true,
		cornerButton: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(BackstageAppButton, {}),
		rightPanelProps: {
			defaultState: StagePanelState.Open,
			pinned: true
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
		features: { stableContentLayout },
		appBackstage: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(BackstageComposer, {}),
		layout: "fullscreen",
		frontstages: [frontstage1, frontstage2],
		itemProviders: [{
			id: "backstage-items",
			getBackstageItems: () => [BackstageItemUtilities.createStageLauncher({
				stageId: frontstage1.id,
				label: "Frontstage 1"
			}), BackstageItemUtilities.createStageLauncher({
				stageId: frontstage2.id,
				label: "Frontstage 2"
			})]
		}],
		onInitialize: async () => {
			UiItemsManager.register({
				id: "frontstage1-widgets",
				getWidgets: () => [createWidget(1)]
			}, { stageIds: [frontstage1.id] });
			UiItemsManager.register({
				id: "frontstage2-widgets",
				getWidgets: () => [createWidget(2, { layouts: { standard: {
					location: StagePanelLocation.Right,
					section: StagePanelSection.Start
				} } })]
			}, { stageIds: [frontstage2.id] });
		}
	});
}
var import_react, import_jsx_runtime$1;
function init_Active() {
	return (init_Active = __esmMin((() => {
		import_react = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		init_AppUiStory();
		init_Utils();
		init_Button(), init_Input(), init_Text();
		import_jsx_runtime$1 = require_jsx_runtime();
		ActiveFrontstageStory.__docgenInfo = {
			"description": "",
			"methods": [],
			"displayName": "ActiveFrontstageStory"
		};
	})))();
}
//#endregion
//#region src/frontstage/Active.stories.tsx
var import_jsx_runtime, meta, Basic, __namedExportsOrder;
function init_Active_stories() {
	return (init_Active_stories = __esmMin((() => {
		init_Decorators();
		init_AppUiStory();
		init_Active();
		import_jsx_runtime = require_jsx_runtime();
		meta = {
			title: "Frontstage/Active",
			component: ActiveFrontstageStory,
			tags: ["autodocs"],
			decorators: [AppUiDecorator],
			args: { stableContentLayout: true },
			parameters: {
				docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) },
				layout: "fullscreen"
			}
		};
		Basic = {};
		Basic.parameters = {
			...Basic.parameters,
			docs: {
				...Basic.parameters?.docs,
				source: {
					originalSource: "{}",
					...Basic.parameters?.docs?.source
				}
			}
		};
		__namedExportsOrder = ["Basic"];
	})))();
}
//#endregion
init_Active_stories();
export { Basic, __namedExportsOrder, meta as default };
