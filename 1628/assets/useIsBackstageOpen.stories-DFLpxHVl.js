import { n as __esmMin, r as __exportAll } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-DRXHrubV.js";
import { $ as BackstageComposer, G as StandardContentLayouts, O as BackstageAppButton, V as IModelViewportControl, st as UiFramework, t as init_appui_react, vn as useBackstageManager, yn as useIsBackstageOpen } from "./appui-react-DEjUvYNz.js";
import { i as init_Utils, t as createFrontstage } from "./Utils-CDQEKFFq.js";
//#region src/hooks/useIsBackstageOpen.stories.tsx
var useIsBackstageOpen_stories_exports = /* @__PURE__ */ __exportAll({
	Basic: () => Basic,
	__namedExportsOrder: () => __namedExportsOrder,
	default: () => meta
});
function HookStory() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppUiStory, {
		appBackstage: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackstageComposer, {}),
		frontstages: () => [createFrontstage({
			contentGroupProps: {
				id: "ViewportContentGroup",
				layout: StandardContentLayouts.singleView,
				contents: [{
					id: "ViewportContent",
					classId: IModelViewportControl
				}]
			},
			cornerButton: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackstageAppButton, {
				label: "Toggle Backstage",
				icon: "icon-bentley-systems",
				execute: () => {
					UiFramework.backstage.getBackstageToggleCommand().execute();
				}
			})
		})],
		demoIModel: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Initialized, {})
	});
}
function Initialized() {
	const manager = useBackstageManager();
	const isOpen = useIsBackstageOpen(manager);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", { children: ["isOpen: ", String(isOpen)] }) });
}
var import_jsx_runtime, meta, Basic, __namedExportsOrder;
function init_useIsBackstageOpen_stories() {
	return (init_useIsBackstageOpen_stories = __esmMin((() => {
		init_appui_react();
		init_AppUiStory();
		init_Utils();
		import_jsx_runtime = require_jsx_runtime();
		meta = {
			title: "Hooks/useIsBackstageOpen",
			component: HookStory
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
export { init_useIsBackstageOpen_stories as n, useIsBackstageOpen_stories_exports as r, Basic as t };
