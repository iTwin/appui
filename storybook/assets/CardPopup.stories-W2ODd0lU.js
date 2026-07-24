import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Ct as Text, i as init_esm } from "./iframe-DrBiZGmV.js";
import { i as ToolbarItemUtilities, st as UiFramework, t as init_appui_react } from "./appui-react-CpKk3CrH.js";
import { Ai as SvgSaveAs, Ei as SvgSaveUpdate, Oi as SvgSaveSettings, Qi as SvgPasteHollow, Vr as init_esm$1, oo as SvgCut, wa as SvgInfo, wi as SvgSave } from "./components-react-DigDa1CF.js";
import { r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
//#region src/components/CardPopup.tsx
/** [showCard](https://www.itwinjs.org/reference/appui-react/admin/frameworkuiadmin/showcard/) API can be used to show a card-at-cursor popup. */
function CardPopupStory({ title, toolbarProps, location, offset, placement }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, { onInitialize: async () => {
		UiFramework.showCard(/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "auto 1fr",
				columnGap: 10
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Text, {
					isMuted: true,
					style: { textAlign: "end" },
					children: "Model:"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Text, { children: "A613 V02" }),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Text, {
					isMuted: true,
					style: { textAlign: "end" },
					children: "Category:"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Text, { children: "A-43CB-EZT" })
			]
		}), title, toolbarProps, location, offset, action$1("onItemExecuted"), action$1("onCancel"), placement);
	} });
}
var import_jsx_runtime$1, action$1;
var init_CardPopup = __esmMin((() => {
	init_appui_react();
	init_esm();
	init_AppUiStory();
	import_jsx_runtime$1 = require_jsx_runtime();
	({action: action$1} = __STORYBOOK_MODULE_ACTIONS__);
	CardPopupStory.__docgenInfo = {
		"description": "[showCard](https://www.itwinjs.org/reference/appui-react/admin/frameworkuiadmin/showcard/) API can be used to show a card-at-cursor popup.",
		"methods": [],
		"displayName": "CardPopupStory",
		"props": {
			"title": {
				"required": false,
				"tsType": { "name": "string" },
				"description": ""
			},
			"toolbarProps": {
				"required": true,
				"tsType": {
					"name": "Parameters[2]",
					"raw": "ShowCardParams[2]"
				},
				"description": ""
			},
			"location": {
				"required": true,
				"tsType": {
					"name": "Parameters[3]",
					"raw": "ShowCardParams[3]"
				},
				"description": ""
			},
			"offset": {
				"required": true,
				"tsType": {
					"name": "Parameters[4]",
					"raw": "ShowCardParams[4]"
				},
				"description": ""
			},
			"placement": {
				"required": true,
				"tsType": {
					"name": "Parameters[7]",
					"raw": "ShowCardParams[7]"
				},
				"description": ""
			}
		}
	};
}));
//#endregion
//#region src/components/CardPopup.stories.tsx
var import_jsx_runtime, action, meta, Basic, Overflow, NoTitle, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_CardPopup();
	init_appui_react();
	init_esm$1();
	import_jsx_runtime = require_jsx_runtime();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	meta = {
		title: "Components/CardPopup",
		component: CardPopupStory,
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
	Overflow = { args: { toolbarProps: { items: [...meta.args.toolbarProps.items, ToolbarItemUtilities.createActionItem("item4", 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPasteHollow, {}), "Item 4", action("Item 4"))] } } };
	NoTitle = { args: { title: void 0 } };
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
	Overflow.parameters = {
		...Overflow.parameters,
		docs: {
			...Overflow.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    toolbarProps: {\n      items: [...meta.args.toolbarProps.items, ToolbarItemUtilities.createActionItem(\"item4\", 100, <SvgPasteHollow />, \"Item 4\", action(\"Item 4\"))]\n    }\n  }\n}",
				...Overflow.parameters?.docs?.source
			}
		}
	};
	NoTitle.parameters = {
		...NoTitle.parameters,
		docs: {
			...NoTitle.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    title: undefined\n  }\n}",
				...NoTitle.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Basic",
		"Overflow",
		"NoTitle"
	];
}))();
export { Basic, NoTitle, Overflow, __namedExportsOrder, meta as default };
