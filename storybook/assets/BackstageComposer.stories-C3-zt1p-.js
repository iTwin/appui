import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { $ as BackstageComposer, dt as BackstageItemUtilities, st as UiFramework, t as init_appui_react } from "./appui-react-CpKk3CrH.js";
import { Vr as init_esm, Wi as SvgPlaceholder } from "./components-react-DigDa1CF.js";
import { r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
//#region src/components/BackstageComposer.stories.tsx
function createOpenBackstage(itemProvider) {
	return (Story) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppUiStory, {
			onFrontstageActivated: () => {
				UiFramework.backstage.open();
			},
			appBackstage: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}),
			itemProviders: [itemProvider]
		});
	};
}
var import_jsx_runtime, action, meta, Icons, Subtitle, Badges, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_appui_react();
	init_AppUiStory();
	init_esm();
	import_jsx_runtime = require_jsx_runtime();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	meta = {
		title: "Components/BackstageComposer",
		component: BackstageComposer,
		tags: ["autodocs"],
		args: {
			header: void 0,
			showOverlay: true
		}
	};
	Icons = {
		args: {},
		decorators: [createOpenBackstage({
			id: "p1",
			getBackstageItems: () => [
				BackstageItemUtilities.createActionItem("item1", 0, 0, action("item1"), "CSS Icon (deprecated)", void 0, "icon-placeholder"),
				BackstageItemUtilities.createActionItem("item2", 0, 0, action("item2"), "IconSpec ReactNode (deprecated)", void 0, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {})),
				BackstageItemUtilities.createActionItem("item3", 0, 0, action("item3"), "`iconNode` property (deprecated helper)", void 0, void 0, { iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}) }),
				BackstageItemUtilities.createActionItem({
					id: "item4",
					execute: action("item4"),
					label: "`iconNode` property",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {})
				}),
				BackstageItemUtilities.createActionItem({
					id: "item5",
					execute: action("item5"),
					label: "`iconNode` property",
					icon: "X"
				}),
				BackstageItemUtilities.createActionItem({
					id: "item6",
					execute: action("item6"),
					label: "No icon"
				})
			]
		})]
	};
	Subtitle = {
		args: {},
		decorators: [createOpenBackstage({
			id: "p1",
			getBackstageItems: () => [BackstageItemUtilities.createActionItem({
				id: "item1",
				execute: action("item1"),
				label: "Item 1",
				subtitle: "Item 1 subtitle",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {})
			}), BackstageItemUtilities.createActionItem({
				id: "item2",
				execute: action("item2"),
				label: "Item 2",
				subtitle: "Item 2 subtitle"
			})]
		})]
	};
	Badges = {
		args: {},
		decorators: [createOpenBackstage({
			id: "p1",
			getBackstageItems: () => [
				BackstageItemUtilities.createActionItem({
					id: "new",
					execute: action("new"),
					label: "New",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}),
					badgeKind: "new"
				}),
				BackstageItemUtilities.createActionItem({
					id: "deprecated",
					execute: action("deprecated"),
					label: "Deprecated",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}),
					badgeKind: "deprecated"
				}),
				BackstageItemUtilities.createActionItem({
					id: "technical-preview",
					execute: action("technical-preview"),
					label: "Technical Preview",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}),
					badgeKind: "technical-preview"
				})
			]
		})]
	};
	Icons.parameters = {
		...Icons.parameters,
		docs: {
			...Icons.parameters?.docs,
			source: {
				originalSource: "{\n  args: {},\n  decorators: [createOpenBackstage({\n    id: \"p1\",\n    getBackstageItems: () => [BackstageItemUtilities.createActionItem(\"item1\", 0, 0, action(\"item1\"), \"CSS Icon (deprecated)\", undefined, \"icon-placeholder\"), BackstageItemUtilities.createActionItem(\"item2\", 0, 0, action(\"item2\"), \"IconSpec ReactNode (deprecated)\", undefined, <SvgPlaceholder />), BackstageItemUtilities.createActionItem(\"item3\", 0, 0, action(\"item3\"), \"`iconNode` property (deprecated helper)\", undefined, undefined, {\n      iconNode: <SvgPlaceholder />\n    }), BackstageItemUtilities.createActionItem({\n      id: \"item4\",\n      execute: action(\"item4\"),\n      label: \"`iconNode` property\",\n      icon: <SvgPlaceholder />\n    }), BackstageItemUtilities.createActionItem({\n      id: \"item5\",\n      execute: action(\"item5\"),\n      label: \"`iconNode` property\",\n      icon: \"X\"\n    }), BackstageItemUtilities.createActionItem({\n      id: \"item6\",\n      execute: action(\"item6\"),\n      label: \"No icon\"\n    })]\n  })]\n}",
				...Icons.parameters?.docs?.source
			}
		}
	};
	Subtitle.parameters = {
		...Subtitle.parameters,
		docs: {
			...Subtitle.parameters?.docs,
			source: {
				originalSource: "{\n  args: {},\n  decorators: [createOpenBackstage({\n    id: \"p1\",\n    getBackstageItems: () => [BackstageItemUtilities.createActionItem({\n      id: \"item1\",\n      execute: action(\"item1\"),\n      label: \"Item 1\",\n      subtitle: \"Item 1 subtitle\",\n      icon: <SvgPlaceholder />\n    }), BackstageItemUtilities.createActionItem({\n      id: \"item2\",\n      execute: action(\"item2\"),\n      label: \"Item 2\",\n      subtitle: \"Item 2 subtitle\"\n    })]\n  })]\n}",
				...Subtitle.parameters?.docs?.source
			}
		}
	};
	Badges.parameters = {
		...Badges.parameters,
		docs: {
			...Badges.parameters?.docs,
			source: {
				originalSource: "{\n  args: {},\n  decorators: [createOpenBackstage({\n    id: \"p1\",\n    getBackstageItems: () => [BackstageItemUtilities.createActionItem({\n      id: \"new\",\n      execute: action(\"new\"),\n      label: \"New\",\n      icon: <SvgPlaceholder />,\n      badgeKind: \"new\"\n    }), BackstageItemUtilities.createActionItem({\n      id: \"deprecated\",\n      execute: action(\"deprecated\"),\n      label: \"Deprecated\",\n      icon: <SvgPlaceholder />,\n      badgeKind: \"deprecated\"\n    }), BackstageItemUtilities.createActionItem({\n      id: \"technical-preview\",\n      execute: action(\"technical-preview\"),\n      label: \"Technical Preview\",\n      icon: <SvgPlaceholder />,\n      badgeKind: \"technical-preview\"\n    })]\n  })]\n}",
				...Badges.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Icons",
		"Subtitle",
		"Badges"
	];
}))();
export { Badges, Icons, Subtitle, __namedExportsOrder, meta as default };
