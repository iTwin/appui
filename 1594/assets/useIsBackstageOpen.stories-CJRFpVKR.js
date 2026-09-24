import { a as __exportAll, i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { $ as BackstageComposer, A as BackstageAppButton, U as IModelViewportControl, fn as useBackstageManager, pn as useIsBackstageOpen, q as StandardContentLayouts, st as UiFramework, t as init_appui_react } from "./appui-react-DgmBJG-r.js";
import { r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-BUo9ei4d.js";
import { i as init_Utils, t as createFrontstage } from "./Utils-DVwHnkV9.js";
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
	const isOpen = useIsBackstageOpen(useBackstageManager());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", { children: ["isOpen: ", String(isOpen)] }) });
}
var import_jsx_runtime, meta, Basic, __namedExportsOrder;
var init_useIsBackstageOpen_stories = __esmMin((() => {
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
}));
//#endregion
init_useIsBackstageOpen_stories();
export { Basic, __namedExportsOrder, meta as default, useIsBackstageOpen_stories_exports as n, init_useIsBackstageOpen_stories as t };
