import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Jt as init_Resizer, Yt as withResizer } from "./iframe-DrBiZGmV.js";
import { Dt as useConditionalValue, Jt as ToolbarOrientation, Yt as ToolbarUsage, at as ToolItemDef, i as ToolbarItemUtilities, mn as CommandItemDef, o as ToolbarHelper, st as UiFramework, t as init_appui_react, z as ToolbarComposer } from "./appui-react-CpKk3CrH.js";
import { S as ConditionalStringValue, r as init_appui_abstract, w as ConditionalBooleanValue } from "./Key.enum-DhBIjxOv.js";
import { Hs as BadgeType, Pi as SvgRemove, Rn as IconHelper, Vr as init_esm, Wa as SvgExport, Wi as SvgPlaceholder, bn as init_core_react, cs as SvgAirplane, fs as SvgActivity, gs as Svg2D, ms as Svg3D, os as SvgAndroid, us as SvgAdd, vo as SvgClipboard, ws as ConditionalIconItem } from "./components-react-DigDa1CF.js";
import { i as init_Utils, r as enumArgType } from "./Utils-BkeALKzH.js";
import { n as InitializerDecorator, r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { n as init_createBumpEvent, t as createBumpEvent } from "./createBumpEvent-DV-wBqFK.js";
//#region ../../node_modules/.pnpm/@bentley+icons-generic@1.0.34/node_modules/@bentley/icons-generic/icons/placeholder.svg
var placeholder_default;
var init_placeholder = __esmMin((() => {
	placeholder_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20enable-background='new%200%200%2016%2016'%3e%3cpath%20d='M1,1v14h14V1H1z%20M14,2.7v10.6L8.7,8L14,2.7z%20M8,7.3L2.7,2h10.6L8,7.3z%20M7.3,8L2,13.3V2.7L7.3,8z%20M8,8.7l5.3,5.3H2.7L8,8.7z'/%3e%3c/svg%3e";
}));
//#endregion
//#region src/components/ToolbarComposer.tsx
function ToolbarComposerStory(props) {
	const { activeToolId, ...rest } = props;
	import_react.useEffect(() => {
		if (!activeToolId) return;
		UiFramework.frontstages.setActiveToolId(activeToolId);
	}, [activeToolId]);
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ToolbarComposer, { ...rest });
}
var import_react, import_jsx_runtime$1;
var init_ToolbarComposer = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	import_jsx_runtime$1 = require_jsx_runtime();
	ToolbarComposerStory.__docgenInfo = {
		"description": "",
		"methods": [],
		"displayName": "ToolbarComposerStory",
		"props": { "activeToolId": {
			"required": false,
			"tsType": { "name": "string" },
			"description": "Storybook only prop to simulate the active tool id."
		} }
	};
}));
//#endregion
//#region src/components/ToolbarComposer.stories.tsx
function ConditionalReactIcon() {
	return useConditionalValue(getVal, [eventId]) % 2 === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgAdd, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgRemove, {});
}
function createAbstractReactIcon() {
	const internalData = /* @__PURE__ */ new Map();
	return {
		internalData,
		icon: IconHelper.getIconData(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgExport, {}), internalData)
	};
}
function createAbstractConditionalIcon() {
	const internalData = /* @__PURE__ */ new Map();
	return {
		internalData,
		icon: IconHelper.getIconData(new ConditionalIconItem(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgExport, {}), [], /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgExport, {})), internalData)
	};
}
function createItemFactory() {
	let i = 0;
	function createActionItem(overrides) {
		const id = `item${++i}`;
		const label = `Item ${i}`;
		return ToolbarItemUtilities.createActionItem({
			id,
			label,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}),
			execute: () => action(label)(),
			...overrides
		});
	}
	function createGroupItem(overrides) {
		const id = `group${++i}`;
		const label = `Group ${i}`;
		return ToolbarItemUtilities.createGroupItem({
			id,
			label,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}),
			...overrides
		});
	}
	return {
		createActionItem,
		createGroupItem
	};
}
function createItems() {
	const action1 = ToolbarItemUtilities.createActionItem("item1", 100, "", "Item 1", action("Item 1"), { iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg2D, {}) });
	const action2 = ToolbarItemUtilities.createActionItem("item2", 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg3D, {}), "Item 2", action("Item 2"));
	const action3 = ToolbarItemUtilities.createActionItem("item3", 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgAndroid, {}), "Item 3", action("Item 3"));
	const action4 = ToolbarItemUtilities.createActionItem("item4", 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgAdd, {}), "Item 4", action("Item 4"));
	const group1 = ToolbarItemUtilities.createGroupItem("group1", 100, "", "Group 1", [action1, action2], { iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgActivity, {}) });
	const group2_2 = ToolbarItemUtilities.createGroupItem("group2_2", 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgAirplane, {}), "Group 2_2", [action2]);
	const group2_1 = ToolbarItemUtilities.createGroupItem("group2_1", 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgAndroid, {}), "Group 2_1", [action1, group2_2]);
	return {
		action1,
		action2,
		action3,
		action4,
		/** Group item. */
		group1,
		/** Group item with nested groups. */
		group2: ToolbarItemUtilities.createGroupItem("group2", 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgClipboard, {}), "Group 2", [
			action1,
			action2,
			group2_1
		]),
		/** Group item with multiple columns. */
		group3: ToolbarItemUtilities.createGroupItem("group3", 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgExport, {}), "Group 3", Array.from({ length: 10 }, (_, i) => {
			const item = [
				action1,
				action2,
				action3
			][i % 3];
			return {
				...item,
				id: `${item.id}_${i}`,
				label: `${item.label} (${i})`,
				itemPriority: i
			};
		})),
		custom1: ToolbarItemUtilities.createCustomItem("custom1", 100, "", "Custom 1", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Custom panel content 1" }), { iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg2D, {}) }),
		custom2: ToolbarItemUtilities.createCustomItem("custom2", 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg3D, {}), "Custom 2", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Custom panel content 2" })),
		custom3: ToolbarItemUtilities.createCustomItem("custom3", 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgActivity, {}), "Custom 3", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Custom panel content 3" }))
	};
}
var import_jsx_runtime, action, meta, items, Empty, ActionItem, GroupItem, CustomItem, Badge, Disabled, Hidden, getVal, bump, eventId, Conditional, ItemDef, Icons, GroupIcons, Separators, ActiveToolId, ActiveItemIds, Overflow, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_appui_abstract();
	init_appui_react();
	init_core_react();
	init_esm();
	init_placeholder();
	init_Decorators();
	init_Resizer();
	init_createBumpEvent();
	init_Utils();
	init_ToolbarComposer();
	import_jsx_runtime = require_jsx_runtime();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	meta = {
		title: "Components/ToolbarComposer",
		component: ToolbarComposerStory,
		tags: ["autodocs"],
		decorators: [
			withResizer,
			AppUiDecorator,
			InitializerDecorator
		],
		args: {
			orientation: ToolbarOrientation.Horizontal,
			usage: ToolbarUsage.ContentManipulation
		},
		argTypes: {
			orientation: enumArgType(ToolbarOrientation),
			usage: enumArgType(ToolbarUsage)
		},
		parameters: { layout: "centered" }
	};
	items = createItems();
	Empty = { args: { items: [] } };
	ActionItem = { args: { items: [
		items.action1,
		items.action2,
		items.action3
	] } };
	GroupItem = { args: { items: [
		items.group1,
		items.group2,
		items.group3
	] } };
	CustomItem = { args: { items: [
		items.custom1,
		items.custom2,
		items.custom3
	] } };
	Badge = { args: { items: [
		{
			...items.action1,
			description: "TechnicalPreview badge",
			badge: BadgeType.TechnicalPreview
		},
		{
			...items.group1,
			description: "TechnicalPreview badge",
			badge: BadgeType.TechnicalPreview
		},
		{
			...items.custom1,
			description: "TechnicalPreview badge",
			badge: BadgeType.TechnicalPreview
		},
		{
			...items.action2,
			description: "New badge",
			badge: BadgeType.New
		},
		{
			...items.group2,
			description: "New badge",
			badge: BadgeType.New,
			items: items.group2.items.map((item, index) => {
				const badges = [
					BadgeType.New,
					BadgeType.TechnicalPreview,
					"deprecated"
				];
				const badge = badges[index % badges.length];
				return {
					...item,
					badge: typeof badge === "string" ? void 0 : badge,
					badgeKind: typeof badge === "string" ? badge : void 0
				};
			})
		},
		{
			...items.custom2,
			description: "New badge",
			badge: BadgeType.New
		},
		{
			...items.action3,
			description: "Deprecated badge",
			badgeKind: "deprecated"
		},
		{
			...items.group3,
			description: "Deprecated badge",
			badgeKind: "deprecated"
		},
		{
			...items.custom3,
			description: "Deprecated badge",
			badgeKind: "deprecated"
		},
		{
			...items.action4,
			description: "No badge",
			badge: BadgeType.None
		}
	] } };
	Disabled = { args: { items: [
		{
			...items.action1,
			isDisabled: true
		},
		{
			...items.group1,
			isDisabled: true
		},
		{
			...items.group2,
			items: items.group2.items.map((item) => ({
				...item,
				isDisabled: true
			}))
		},
		{
			...items.custom1,
			isDisabled: true
		}
	] } };
	Hidden = { args: { items: [
		items.action1,
		items.action2,
		{
			...items.action3,
			isHidden: true
		},
		items.group1,
		items.group2,
		{
			...items.group3,
			isHidden: true
		},
		items.custom1,
		items.custom2,
		{
			...items.custom3,
			isHidden: true
		}
	] } };
	({getVal, bump, eventId} = createBumpEvent());
	Conditional = { args: { items: (() => {
		const factory = createItemFactory();
		return [
			factory.createActionItem({
				isActiveCondition: new ConditionalBooleanValue(() => getVal() % 2 === 1, [eventId]),
				execute: () => {
					bump();
				}
			}),
			{
				...factory.createActionItem({
					label: new ConditionalStringValue(() => `Item 2 (${getVal()})`, [eventId]),
					isDisabled: new ConditionalBooleanValue(() => getVal() % 2 === 1, [eventId]),
					description: new ConditionalStringValue(() => `Conditional item. Click 'Item 1' to toggle. (${getVal()}).`, [eventId])
				}),
				iconNode: void 0,
				icon: new ConditionalIconItem(() => getVal() % 2 === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg3D, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg2D, {}), [eventId])
			},
			factory.createActionItem({ iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionalReactIcon, {}) }),
			factory.createGroupItem({ items: [factory.createActionItem({ label: new ConditionalStringValue(() => `Item 4 (${getVal()})`, [eventId]) }), factory.createGroupItem({ items: [factory.createActionItem({ isActiveCondition: new ConditionalBooleanValue(() => getVal() % 2 === 0, [eventId]) })] })] })
		];
	})() } };
	ItemDef = { args: { items: [
		ToolbarHelper.createToolbarItemFromItemDef(125, new CommandItemDef({
			iconSpec: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgActivity, {}),
			label: "Item 1",
			execute: () => {
				bump();
				action("Item 1")();
			}
		})),
		ToolbarHelper.createToolbarItemFromItemDef(127, new CommandItemDef({
			iconSpec: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgClipboard, {}),
			label: "Item 2",
			execute: action("Item 2")
		}), { ...createAbstractReactIcon() }),
		ToolbarHelper.createToolbarItemFromItemDef(130, new CommandItemDef({
			iconSpec: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgAirplane, {}),
			label: "Item 3",
			execute: action("Item 3")
		}), {
			description: "Conditional icon overrides.",
			isDisabled: true,
			...createAbstractConditionalIcon()
		}),
		...ToolbarHelper.createToolbarItemsFromItemDefs([new CommandItemDef({
			iconSpec: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgActivity, {}),
			label: "Item 4",
			execute: action("Item 4")
		}), new CommandItemDef({
			iconSpec: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgClipboard, {}),
			label: "Item 5",
			execute: action("Item 5")
		})], 200),
		ToolbarHelper.createToolbarItemFromItemDef(250, new ToolItemDef({
			toolId: "item6",
			execute: action("Item 6"),
			iconSpec: new ConditionalIconItem(() => getVal() % 2 === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg3D, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg2D, {}), [eventId])
		}))
	] } };
	Icons = { args: { items: [
		ToolbarItemUtilities.createActionItem({
			id: "node",
			label: "Icon Node",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {})
		}),
		ToolbarItemUtilities.createActionItem("spec-node", 0, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}), "Icon Spec Node", () => {}),
		ToolbarItemUtilities.createActionItem("svg-loader", 0, placeholder_default, "SVG Loader", () => {}),
		ToolbarItemUtilities.createActionItem("font-icon", 0, "icon-placeholder", "Font Icon", () => {})
	] } };
	GroupIcons = { args: { items: [
		ToolbarItemUtilities.createGroupItem({
			id: "group-node",
			label: "Icon Node",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}),
			items: [...Icons.args.items]
		}),
		ToolbarItemUtilities.createGroupItem("group-spec-node", 0, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}), "Icon Spec Node", [...Icons.args.items]),
		ToolbarItemUtilities.createGroupItem("group-svg-loader", 0, placeholder_default, "SVG Loader", [...Icons.args.items]),
		ToolbarItemUtilities.createGroupItem("group-font-icon", 0, "icon-placeholder", "Font Icon", [...Icons.args.items])
	] } };
	Separators = { args: { items: (() => {
		const factory = createItemFactory();
		let groupPriority = 0;
		return [
			factory.createActionItem({
				groupPriority: ++groupPriority,
				isHidden: true
			}),
			factory.createActionItem({ groupPriority: ++groupPriority }),
			factory.createActionItem({ groupPriority: ++groupPriority }),
			factory.createActionItem({ groupPriority: ++groupPriority }),
			factory.createActionItem({ groupPriority }),
			factory.createActionItem({
				groupPriority: ++groupPriority,
				isHidden: true
			}),
			factory.createActionItem({ groupPriority: ++groupPriority }),
			factory.createActionItem({
				groupPriority,
				isHidden: true
			}),
			factory.createActionItem({
				groupPriority: ++groupPriority,
				isHidden: true
			}),
			factory.createActionItem({
				groupPriority: ++groupPriority,
				isHidden: true
			})
		];
	})() } };
	ActiveToolId = { args: {
		activeToolId: "item3",
		items: (() => {
			const factory = createItemFactory();
			return [
				factory.createActionItem(),
				factory.createGroupItem({ items: [
					factory.createActionItem(),
					factory.createGroupItem({ items: [factory.createActionItem(), factory.createGroupItem({ items: [factory.createActionItem()] })] }),
					factory.createActionItem()
				] }),
				factory.createActionItem()
			];
		})()
	} };
	ActiveItemIds = { args: {
		activeItemIds: ["item3", "item10"],
		items: (() => {
			const factory = createItemFactory();
			return [
				factory.createActionItem(),
				factory.createGroupItem({ items: [
					factory.createActionItem(),
					factory.createGroupItem({ items: [factory.createActionItem(), factory.createGroupItem({ items: [factory.createActionItem()] })] }),
					factory.createActionItem()
				] }),
				factory.createActionItem(),
				factory.createActionItem()
			];
		})()
	} };
	Overflow = { args: { items: (() => {
		const factory = createItemFactory();
		const createItems = () => Array.from({ length: 8 }).map(() => factory.createActionItem());
		return [
			...createItems(),
			factory.createGroupItem({ items: [
				...createItems(),
				factory.createGroupItem({ items: [
					...createItems(),
					factory.createGroupItem({ items: [...createItems(), ...createItems()] }),
					...createItems()
				] }),
				...createItems()
			] }),
			...createItems()
		];
	})() } };
	Empty.parameters = {
		...Empty.parameters,
		docs: {
			...Empty.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: []\n  }\n}",
				...Empty.parameters?.docs?.source
			}
		}
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
	GroupItem.parameters = {
		...GroupItem.parameters,
		docs: {
			...GroupItem.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: [items.group1, items.group2, items.group3]\n  }\n}",
				...GroupItem.parameters?.docs?.source
			}
		}
	};
	CustomItem.parameters = {
		...CustomItem.parameters,
		docs: {
			...CustomItem.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: [items.custom1, items.custom2, items.custom3]\n  }\n}",
				...CustomItem.parameters?.docs?.source
			}
		}
	};
	Badge.parameters = {
		...Badge.parameters,
		docs: {
			...Badge.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: [{\n      ...items.action1,\n      description: \"TechnicalPreview badge\",\n      badge: BadgeType.TechnicalPreview\n    }, {\n      ...items.group1,\n      description: \"TechnicalPreview badge\",\n      badge: BadgeType.TechnicalPreview\n    }, {\n      ...items.custom1,\n      description: \"TechnicalPreview badge\",\n      badge: BadgeType.TechnicalPreview\n    }, {\n      ...items.action2,\n      description: \"New badge\",\n      badge: BadgeType.New\n    }, {\n      ...items.group2,\n      description: \"New badge\",\n      badge: BadgeType.New,\n      items: items.group2.items.map((item, index) => {\n        const badges = [BadgeType.New, BadgeType.TechnicalPreview, \"deprecated\"];\n        const badgeIndex = index % badges.length;\n        const badge = badges[badgeIndex];\n        return {\n          ...item,\n          badge: typeof badge === \"string\" ? undefined : badge,\n          badgeKind: typeof badge === \"string\" ? badge : undefined\n        };\n      })\n    }, {\n      ...items.custom2,\n      description: \"New badge\",\n      badge: BadgeType.New\n    }, {\n      ...items.action3,\n      description: \"Deprecated badge\",\n      badgeKind: \"deprecated\"\n    }, {\n      ...items.group3,\n      description: \"Deprecated badge\",\n      badgeKind: \"deprecated\"\n    }, {\n      ...items.custom3,\n      description: \"Deprecated badge\",\n      badgeKind: \"deprecated\"\n    }, {\n      ...items.action4,\n      description: \"No badge\",\n      badge: BadgeType.None\n    }]\n  }\n}",
				...Badge.parameters?.docs?.source
			}
		}
	};
	Disabled.parameters = {
		...Disabled.parameters,
		docs: {
			...Disabled.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: [{\n      ...items.action1,\n      isDisabled: true\n    }, {\n      ...items.group1,\n      isDisabled: true\n    }, {\n      ...items.group2,\n      items: items.group2.items.map(item => ({\n        ...item,\n        isDisabled: true\n      }))\n    }, {\n      ...items.custom1,\n      isDisabled: true\n    }]\n  }\n}",
				...Disabled.parameters?.docs?.source
			}
		}
	};
	Hidden.parameters = {
		...Hidden.parameters,
		docs: {
			...Hidden.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: [items.action1, items.action2, {\n      ...items.action3,\n      isHidden: true\n    }, items.group1, items.group2, {\n      ...items.group3,\n      isHidden: true\n    }, items.custom1, items.custom2, {\n      ...items.custom3,\n      isHidden: true\n    }]\n  }\n}",
				...Hidden.parameters?.docs?.source
			}
		}
	};
	Conditional.parameters = {
		...Conditional.parameters,
		docs: {
			...Conditional.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: (() => {\n      const factory = createItemFactory();\n      return [factory.createActionItem({\n        isActiveCondition: new ConditionalBooleanValue(() => getVal() % 2 === 1, [eventId]),\n        execute: () => {\n          bump();\n        }\n      }), {\n        ...factory.createActionItem({\n          label: new ConditionalStringValue(() => `Item 2 (${getVal()})`, [eventId]),\n          isDisabled: new ConditionalBooleanValue(() => getVal() % 2 === 1, [eventId]),\n          description: new ConditionalStringValue(() => `Conditional item. Click 'Item 1' to toggle. (${getVal()}).`, [eventId])\n        }),\n        iconNode: undefined,\n        icon: new ConditionalIconItem(() => getVal() % 2 === 0 ? <Svg3D /> : <Svg2D />, [eventId])\n      }, factory.createActionItem({\n        iconNode: <ConditionalReactIcon />\n      }), factory.createGroupItem({\n        items: [factory.createActionItem({\n          label: new ConditionalStringValue(() => `Item 4 (${getVal()})`, [eventId])\n        }), factory.createGroupItem({\n          items: [factory.createActionItem({\n            isActiveCondition: new ConditionalBooleanValue(() => getVal() % 2 === 0, [eventId])\n          })]\n        })]\n      })];\n    })()\n  }\n}",
				...Conditional.parameters?.docs?.source
			}
		}
	};
	ItemDef.parameters = {
		...ItemDef.parameters,
		docs: {
			...ItemDef.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: [ToolbarHelper.createToolbarItemFromItemDef(125, new CommandItemDef({\n      iconSpec: <SvgActivity />,\n      label: \"Item 1\",\n      execute: () => {\n        bump();\n        action(\"Item 1\")();\n      }\n    })), ToolbarHelper.createToolbarItemFromItemDef(127, new CommandItemDef({\n      iconSpec: <SvgClipboard />,\n      label: \"Item 2\",\n      execute: action(\"Item 2\")\n    }), {\n      ...createAbstractReactIcon()\n    }), ToolbarHelper.createToolbarItemFromItemDef(130, new CommandItemDef({\n      iconSpec: <SvgAirplane />,\n      label: \"Item 3\",\n      execute: action(\"Item 3\")\n    }), {\n      description: \"Conditional icon overrides.\",\n      isDisabled: true,\n      ...createAbstractConditionalIcon()\n    }), ...ToolbarHelper.createToolbarItemsFromItemDefs([new CommandItemDef({\n      iconSpec: <SvgActivity />,\n      label: \"Item 4\",\n      execute: action(\"Item 4\")\n    }), new CommandItemDef({\n      iconSpec: <SvgClipboard />,\n      label: \"Item 5\",\n      execute: action(\"Item 5\")\n    })], 200), ToolbarHelper.createToolbarItemFromItemDef(250, new ToolItemDef({\n      toolId: \"item6\",\n      execute: action(\"Item 6\"),\n      iconSpec: new ConditionalIconItem(() => getVal() % 2 === 0 ? <Svg3D /> : <Svg2D />, [eventId])\n    }))]\n  }\n}",
				...ItemDef.parameters?.docs?.source
			}
		}
	};
	Icons.parameters = {
		...Icons.parameters,
		docs: {
			...Icons.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: [ToolbarItemUtilities.createActionItem({\n      id: \"node\",\n      label: \"Icon Node\",\n      icon: <SvgPlaceholder />\n    }), ToolbarItemUtilities.createActionItem(\"spec-node\", 0, <SvgPlaceholder />, \"Icon Spec Node\", () => {}), ToolbarItemUtilities.createActionItem(\"svg-loader\", 0, placeholderIcon, \"SVG Loader\", () => {}), ToolbarItemUtilities.createActionItem(\"font-icon\", 0, \"icon-placeholder\", \"Font Icon\", () => {})]\n  }\n} satisfies Story",
				...Icons.parameters?.docs?.source
			}
		}
	};
	GroupIcons.parameters = {
		...GroupIcons.parameters,
		docs: {
			...GroupIcons.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: [ToolbarItemUtilities.createGroupItem({\n      id: \"group-node\",\n      label: \"Icon Node\",\n      icon: <SvgPlaceholder />,\n      items: [...Icons.args.items]\n    }), ToolbarItemUtilities.createGroupItem(\"group-spec-node\", 0, <SvgPlaceholder />, \"Icon Spec Node\", [...Icons.args.items]), ToolbarItemUtilities.createGroupItem(\"group-svg-loader\", 0, placeholderIcon, \"SVG Loader\", [...Icons.args.items]), ToolbarItemUtilities.createGroupItem(\"group-font-icon\", 0, \"icon-placeholder\", \"Font Icon\", [...Icons.args.items])]\n  }\n}",
				...GroupIcons.parameters?.docs?.source
			}
		}
	};
	Separators.parameters = {
		...Separators.parameters,
		docs: {
			...Separators.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: (() => {\n      const factory = createItemFactory();\n      let groupPriority = 0;\n      return [\n      // All items of first group are hidden\n      factory.createActionItem({\n        groupPriority: ++groupPriority,\n        isHidden: true\n      }),\n      // Single item in a group\n      factory.createActionItem({\n        groupPriority: ++groupPriority\n      }),\n      // Single item in a group\n      factory.createActionItem({\n        groupPriority: ++groupPriority\n      }),\n      // Multiple items in a group\n      factory.createActionItem({\n        groupPriority: ++groupPriority\n      }), factory.createActionItem({\n        groupPriority: groupPriority\n      }),\n      // All items in a group are hidden\n      factory.createActionItem({\n        groupPriority: ++groupPriority,\n        isHidden: true\n      }),\n      // Last item of a group is hidden\n      factory.createActionItem({\n        groupPriority: ++groupPriority\n      }), factory.createActionItem({\n        groupPriority: groupPriority,\n        isHidden: true\n      }),\n      // All items in a group are hidden\n      factory.createActionItem({\n        groupPriority: ++groupPriority,\n        isHidden: true\n      }),\n      // All items of last group are hidden\n      factory.createActionItem({\n        groupPriority: ++groupPriority,\n        isHidden: true\n      })];\n    })()\n  }\n}",
				...Separators.parameters?.docs?.source
			}
		}
	};
	ActiveToolId.parameters = {
		...ActiveToolId.parameters,
		docs: {
			...ActiveToolId.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    activeToolId: \"item3\",\n    items: (() => {\n      const factory = createItemFactory();\n      return [factory.createActionItem(), factory.createGroupItem({\n        items: [factory.createActionItem(), factory.createGroupItem({\n          items: [factory.createActionItem(), factory.createGroupItem({\n            items: [factory.createActionItem()]\n          })]\n        }), factory.createActionItem()]\n      }), factory.createActionItem()];\n    })()\n  }\n}",
				...ActiveToolId.parameters?.docs?.source
			}
		}
	};
	ActiveItemIds.parameters = {
		...ActiveItemIds.parameters,
		docs: {
			...ActiveItemIds.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    activeItemIds: [\"item3\", \"item10\"],\n    items: (() => {\n      const factory = createItemFactory();\n      return [factory.createActionItem(), factory.createGroupItem({\n        items: [factory.createActionItem(), factory.createGroupItem({\n          items: [factory.createActionItem(), factory.createGroupItem({\n            items: [factory.createActionItem()]\n          })]\n        }), factory.createActionItem()]\n      }), factory.createActionItem(), factory.createActionItem()];\n    })()\n  }\n}",
				...ActiveItemIds.parameters?.docs?.source
			}
		}
	};
	Overflow.parameters = {
		...Overflow.parameters,
		docs: {
			...Overflow.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: (() => {\n      const factory = createItemFactory();\n      const createItems = () => Array.from({\n        length: 8\n      }).map(() => factory.createActionItem());\n      return [...createItems(), factory.createGroupItem({\n        items: [...createItems(), factory.createGroupItem({\n          items: [...createItems(), factory.createGroupItem({\n            items: [...createItems(), ...createItems()]\n          }), ...createItems()]\n        }), ...createItems()]\n      }), ...createItems()];\n    })()\n  }\n}",
				...Overflow.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Empty",
		"ActionItem",
		"GroupItem",
		"CustomItem",
		"Badge",
		"Disabled",
		"Hidden",
		"Conditional",
		"ItemDef",
		"Icons",
		"GroupIcons",
		"Separators",
		"ActiveToolId",
		"ActiveItemIds",
		"Overflow"
	];
}))();
export { ActionItem, ActiveItemIds, ActiveToolId, Badge, Conditional, CustomItem, Disabled, Empty, GroupIcons, GroupItem, Hidden, Icons, ItemDef, Overflow, Separators, __namedExportsOrder, meta as default };
