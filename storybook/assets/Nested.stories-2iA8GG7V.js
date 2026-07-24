import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Jt as ToolbarOrientation, O as NestedFrontstageAppButton, Yt as ToolbarUsage, i as ToolbarItemUtilities, st as UiFramework, t as init_appui_react } from "./appui-react-CpKk3CrH.js";
import { Vr as init_esm, Wi as SvgPlaceholder } from "./components-react-DigDa1CF.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { i as init_Utils, t as createFrontstage } from "./Utils-BkeALKzH.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region src/frontstage/Nested.tsx
function createNestedFrontstage() {
	return createFrontstage({
		id: createNestedFrontstage.id,
		content: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h1", {
			style: {
				display: "flex",
				height: "100%",
				justifyContent: "center",
				alignItems: "center"
			},
			children: "Nested Content"
		}),
		cornerButton: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(NestedFrontstageAppButton, {})
	});
}
/** [openNestedFrontstage](https://www.itwinjs.org/reference/appui-react/frontstage/frameworkfrontstages/#opennestedfrontstage) can be used to open a nested frontstage. */
function NestedFrontstageStory() {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
		layout: "fullscreen",
		frontstages: () => [createFrontstage(), createNestedFrontstage()],
		itemProviders: [{
			id: "toolbar",
			getToolbarItems: () => [ToolbarItemUtilities.createActionItem({
				id: "open",
				icon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SvgPlaceholder, {}),
				label: "Open nested frontstage",
				execute: async () => {
					const frontstageDef = await UiFramework.frontstages.getFrontstageDef(createNestedFrontstage.id);
					if (!frontstageDef) return;
					UiFramework.frontstages.openNestedFrontstage(frontstageDef);
				},
				layouts: { standard: {
					orientation: ToolbarOrientation.Horizontal,
					usage: ToolbarUsage.ContentManipulation
				} }
			})]
		}]
	});
}
var import_jsx_runtime$1;
var init_Nested = __esmMin((() => {
	init_appui_react();
	init_esm();
	init_AppUiStory();
	init_Utils();
	import_jsx_runtime$1 = require_jsx_runtime();
	createNestedFrontstage.id = "nested-frontstage";
	NestedFrontstageStory.__docgenInfo = {
		"description": "[openNestedFrontstage](https://www.itwinjs.org/reference/appui-react/frontstage/frameworkfrontstages/#opennestedfrontstage) can be used to open a nested frontstage.",
		"methods": [],
		"displayName": "NestedFrontstageStory"
	};
}));
//#endregion
//#region src/frontstage/Nested.stories.tsx
var import_jsx_runtime, meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_AppUiStory();
	init_Nested();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Frontstage/NestedFrontstage",
		component: NestedFrontstageStory,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
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
}))();
export { Basic, __namedExportsOrder, meta as default };
