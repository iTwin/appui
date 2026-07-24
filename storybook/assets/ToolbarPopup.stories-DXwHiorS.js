import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { i as ToolbarItemUtilities, st as UiFramework, t as init_appui_react } from "./appui-react-CpKk3CrH.js";
import { Ai as SvgSaveAs, Ei as SvgSaveUpdate, Oi as SvgSaveSettings, Vr as init_esm, oo as SvgCut, wa as SvgInfo, wi as SvgSave } from "./components-react-DigDa1CF.js";
import { r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
//#region src/components/ToolbarPopup.tsx
/** [UiFramework.showToolbar()](https://www.itwinjs.org/reference/appui-react/utilities/uiframework/showtoolbarstatic/) API can be used to show a toolbar popup. */
function ToolbarPopupStory({ toolbarProps, location, offset, placement }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, { onInitialize: async () => {
		UiFramework.showToolbar(toolbarProps, location, offset, action$1("onItemExecuted"), action$1("onCancel"), placement);
	} });
}
var import_jsx_runtime$1, action$1;
var init_ToolbarPopup = __esmMin((() => {
	init_appui_react();
	init_AppUiStory();
	import_jsx_runtime$1 = require_jsx_runtime();
	({action: action$1} = __STORYBOOK_MODULE_ACTIONS__);
	ToolbarPopupStory.__docgenInfo = {
		"description": "[UiFramework.showToolbar()](https://www.itwinjs.org/reference/appui-react/utilities/uiframework/showtoolbarstatic/) API can be used to show a toolbar popup.",
		"methods": [],
		"displayName": "ToolbarPopupStory",
		"props": {
			"title": {
				"required": false,
				"tsType": { "name": "string" },
				"description": ""
			},
			"toolbarProps": {
				"required": true,
				"tsType": {
					"name": "Parameters[0]",
					"raw": "ShowToolbarParams[0]"
				},
				"description": ""
			},
			"location": {
				"required": true,
				"tsType": {
					"name": "Parameters[1]",
					"raw": "ShowToolbarParams[1]"
				},
				"description": ""
			},
			"offset": {
				"required": true,
				"tsType": {
					"name": "Parameters[2]",
					"raw": "ShowToolbarParams[2]"
				},
				"description": ""
			},
			"placement": {
				"required": true,
				"tsType": {
					"name": "Parameters[5]",
					"raw": "ShowToolbarParams[5]"
				},
				"description": ""
			}
		}
	};
}));
//#endregion
//#region src/components/ToolbarPopup.stories.tsx
var import_jsx_runtime, action, meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_ToolbarPopup();
	init_appui_react();
	init_esm();
	import_jsx_runtime = require_jsx_runtime();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	meta = {
		title: "Components/ToolbarPopup",
		component: ToolbarPopupStory,
		tags: ["autodocs"],
		args: {
			title: "Platform ABC123",
			location: {
				x: 100,
				y: 100
			},
			offset: {
				x: 0,
				y: 0
			},
			toolbarProps: { items: [
				ToolbarItemUtilities.createActionItem("item1", 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgInfo, {}), "Item 1", action("Item 1")),
				ToolbarItemUtilities.createActionItem("item2", 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgCut, {}), "Item 2", action("Item 2")),
				ToolbarItemUtilities.createGroupItem("item3", 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgSaveSettings, {}), "Item 3", [
					ToolbarItemUtilities.createActionItem("item3_1", 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgSave, {}), "Item 3_1", action("Item 3_1")),
					ToolbarItemUtilities.createActionItem("item3_2", 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgSaveAs, {}), "Item 3_2", action("Item 3_2")),
					ToolbarItemUtilities.createActionItem("item3_3", 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgSaveUpdate, {}), "Item 3_3", action("Item 3_3"))
				])
			] },
			placement: "right-start"
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
