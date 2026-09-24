import { a as __toESM, n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { Uc as Input, Wc as init_Input, il as init_Text, rl as Text } from "./components-react-CHXB-2a9.js";
import { cn as init_Button, sn as Button } from "./Key.enum-1tPeVDEH.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-DVMw3I-C.js";
import { A as BackstageAppButton, Ft as useActiveFrontstageId, Jt as UiItemsManager, dn as PreviewFeaturesProvider, pt as BackstageItemUtilities, rn as StagePanelLocation, t as init_appui_react, tn as StagePanelSection, tt as BackstageComposer, zt as StagePanelState } from "./appui-react-B4bFXMth.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-BjKYoeqO.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-DbQYdZs9.js";
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
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewFeaturesProvider, {
		features: { stableContentLayout },
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
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
		})
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
