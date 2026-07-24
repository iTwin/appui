import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Jt as init_Resizer, Yt as withResizer } from "./iframe-DrBiZGmV.js";
import { Kt as StatusBarSection, Lt as StatusBarComposer, On as SnapMode, f as SelectionCountField, g as StatusBarItemUtilities, m as MessageCenterField, t as init_appui_react, u as SnapModeField, xn as init_core_frontend } from "./appui-react-CpKk3CrH.js";
import { Ko as SvgCamera, Vr as init_esm, cs as SvgAirplane, es as SvgBolt, fs as SvgActivity, gs as Svg2D, is as SvgAttach, ms as Svg3D, os as SvgAndroid, us as SvgAdd } from "./components-react-DigDa1CF.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region src/components/StatusBarComposer.tsx
function StatusBarComposerStory(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		style: {
			height: "36px",
			display: "flex"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StatusBarComposer, { ...props })
	});
}
var import_jsx_runtime$1;
var init_StatusBarComposer = __esmMin((() => {
	require_react();
	init_appui_react();
	import_jsx_runtime$1 = require_jsx_runtime();
	StatusBarComposerStory.__docgenInfo = {
		"description": "",
		"methods": [],
		"displayName": "StatusBarComposerStory"
	};
}));
//#endregion
//#region src/components/StatusBarComposer.stories.tsx
function createItems() {
	const action1 = StatusBarItemUtilities.createActionItem("item1", StatusBarSection.Left, 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg2D, {}), "Item 1", action("Item 1"));
	const action2 = StatusBarItemUtilities.createActionItem("item2", StatusBarSection.Center, 120, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg3D, {}), "Item 2", action("Item 2"));
	const action3 = StatusBarItemUtilities.createActionItem("item3", StatusBarSection.Right, 150, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgAndroid, {}), "Item 3", action("Item 3"));
	const label1 = StatusBarItemUtilities.createLabelItem("item4", StatusBarSection.Left, 110, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgAttach, {}), "Label 1");
	const label2 = StatusBarItemUtilities.createLabelItem("item5", StatusBarSection.Center, 130, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgActivity, {}), "Label 2");
	const label3 = StatusBarItemUtilities.createLabelItem("item6", StatusBarSection.Right, 160, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgAirplane, {}), "Label 3");
	const custom1 = StatusBarItemUtilities.createCustomItem("item7", StatusBarSection.Left, 10, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCenterField, {}));
	const custom2 = StatusBarItemUtilities.createCustomItem("item8", StatusBarSection.Center, 30, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionCountField, { count: 5 }));
	const custom3 = StatusBarItemUtilities.createCustomItem("item9", StatusBarSection.Right, 10, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SnapModeField, {}));
	const availableSnapModes = [
		SnapMode.NearestKeypoint,
		SnapMode.Center,
		SnapMode.Nearest
	];
	return {
		action1,
		action2,
		action3,
		label1,
		label2,
		label3,
		custom1,
		custom2,
		custom3,
		custom4: StatusBarItemUtilities.createCustomItem("item10", StatusBarSection.Right, 10, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SnapModeField, { availableSnapModes }))
	};
}
function createItemsForOverflow() {
	return {
		label1: StatusBarItemUtilities.createLabelItem("item101", StatusBarSection.Left, 200, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgAdd, {}), "Long label 1"),
		label2: StatusBarItemUtilities.createLabelItem("item102", StatusBarSection.Center, 200, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgBolt, {}), "Long label 2"),
		label3: StatusBarItemUtilities.createLabelItem("item103", StatusBarSection.Right, 200, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgCamera, {}), "Long label 3")
	};
}
var import_jsx_runtime, action, PageLayout, AlignComponent, meta, items, ActionItem, LabelItem, CustomItem, Full, itemsForOverflow, Overflow, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_appui_react();
	init_esm();
	init_Resizer();
	init_StatusBarComposer();
	init_core_frontend();
	import_jsx_runtime = require_jsx_runtime();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	PageLayout = (Story) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: { height: "60vh" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {})
		});
	};
	AlignComponent = (Story) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "end",
				paddingInline: "5%",
				paddingBlock: "2em",
				boxSizing: "border-box",
				minWidth: "200px"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {})
		});
	};
	meta = {
		title: "Components/StatusBarComposer",
		component: StatusBarComposerStory,
		tags: ["autodocs"],
		decorators: [
			AlignComponent,
			AppUiDecorator,
			PageLayout,
			withResizer
		]
	};
	items = createItems();
	ActionItem = { args: { items: [
		items.action1,
		items.action2,
		items.action3
	] } };
	LabelItem = { args: { items: [
		items.label1,
		items.label2,
		items.label3
	] } };
	CustomItem = { args: { items: [
		items.custom1,
		items.custom2,
		items.custom4
	] } };
	Full = { args: { items: [
		items.action1,
		items.action2,
		items.action3,
		items.label1,
		items.label2,
		items.label3,
		items.custom1,
		items.custom2,
		items.custom3
	] } };
	itemsForOverflow = createItemsForOverflow();
	Overflow = {
		args: { items: [
			items.action1,
			items.action2,
			items.action3,
			items.label1,
			items.label2,
			items.label3,
			items.custom1,
			items.custom2,
			items.custom3,
			itemsForOverflow.label1,
			itemsForOverflow.label2,
			itemsForOverflow.label3
		] },
		parameters: { layout: "centered" }
	};
	ActionItem.parameters = {
		...ActionItem.parameters,
		docs: {
			...ActionItem.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: [items.action1, items.action2, items.action3]\n  }\n}",
				...ActionItem.parameters?.docs?.source
			}
		}
	};
	LabelItem.parameters = {
		...LabelItem.parameters,
		docs: {
			...LabelItem.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: [items.label1, items.label2, items.label3]\n  }\n}",
				...LabelItem.parameters?.docs?.source
			}
		}
	};
	CustomItem.parameters = {
		...CustomItem.parameters,
		docs: {
			...CustomItem.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: [items.custom1, items.custom2, items.custom4]\n  }\n}",
				...CustomItem.parameters?.docs?.source
			}
		}
	};
	Full.parameters = {
		...Full.parameters,
		docs: {
			...Full.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: [items.action1, items.action2, items.action3, items.label1, items.label2, items.label3, items.custom1, items.custom2, items.custom3]\n  }\n}",
				...Full.parameters?.docs?.source
			}
		}
	};
	Overflow.parameters = {
		...Overflow.parameters,
		docs: {
			...Overflow.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: [items.action1, items.action2, items.action3, items.label1, items.label2, items.label3, items.custom1, items.custom2, items.custom3, itemsForOverflow.label1, itemsForOverflow.label2, itemsForOverflow.label3]\n  },\n  parameters: {\n    layout: \"centered\"\n  }\n}",
				...Overflow.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"ActionItem",
		"LabelItem",
		"CustomItem",
		"Full",
		"Overflow"
	];
}))();
export { ActionItem, CustomItem, Full, LabelItem, Overflow, __namedExportsOrder, meta as default };
