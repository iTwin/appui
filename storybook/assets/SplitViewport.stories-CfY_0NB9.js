import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Jt as ToolbarOrientation, Yt as ToolbarUsage, i as ToolbarItemUtilities, rn as SyncUiEventId, st as UiFramework, t as init_appui_react } from "./appui-react-CpKk3CrH.js";
import { K as StandardContentLayouts, r as init_appui_abstract, w as ConditionalBooleanValue } from "./Key.enum-DhBIjxOv.js";
import { Hr as SvgWindow, Vr as init_esm, Wr as SvgWindowSplitVertical } from "./components-react-DigDa1CF.js";
import { i as init_appui_test_providers, n as Page, r as init_AppUiStory, s as ViewportContent, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { a as removeProperty, i as init_Utils, t as createFrontstage } from "./Utils-BkeALKzH.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region src/frontstage/SplitViewport.tsx
/** This story shows two separate views. Depending on which view is active, the tools in the toolbars will change*/
function SplitViewportStory(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
		layout: "fullscreen",
		...props
	});
}
var import_jsx_runtime$1;
var init_SplitViewport = __esmMin((() => {
	init_AppUiStory();
	import_jsx_runtime$1 = require_jsx_runtime();
	SplitViewportStory.__docgenInfo = {
		"description": "This story shows two separate views. Depending on which view is active, the tools in the toolbars will change",
		"methods": [],
		"displayName": "SplitViewportStory"
	};
}));
//#endregion
//#region src/frontstage/SplitViewport.stories.tsx
var import_jsx_runtime, meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_appui_abstract();
	init_appui_react();
	init_esm();
	init_Decorators();
	init_AppUiStory();
	init_Utils();
	init_SplitViewport();
	init_appui_test_providers();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Frontstage/SplitViewport",
		component: SplitViewportStory,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		parameters: {
			docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) },
			layout: "fullscreen"
		},
		argTypes: {
			frontstages: removeProperty(),
			itemProviders: removeProperty()
		}
	};
	Default = { args: {
		frontstages: [createFrontstage({ contentGroupProps: {
			id: "split-vertical-group",
			layout: StandardContentLayouts.twoVerticalSplit,
			contents: [{
				id: "view-0",
				classId: "",
				content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewportContent, {})
			}, {
				id: "view-1",
				classId: "",
				content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewportContent, {})
			}]
		} })],
		itemProviders: [{
			id: "toolbar",
			getToolbarItems: () => {
				const layouts = { standard: {
					usage: ToolbarUsage.ContentManipulation,
					orientation: ToolbarOrientation.Horizontal
				} };
				return [ToolbarItemUtilities.createActionItem({
					id: "action1",
					label: "Action 1",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgWindow, {}),
					isHidden: new ConditionalBooleanValue(() => UiFramework.content.getActiveId() === "view-0" ? false : true, [SyncUiEventId.ActiveContentChanged]),
					layouts
				}), ToolbarItemUtilities.createActionItem({
					id: "action2",
					label: "Action 2",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgWindowSplitVertical, {}),
					isHidden: new ConditionalBooleanValue(() => UiFramework.content.getActiveId() === "view-1" ? false : true, [SyncUiEventId.ActiveContentChanged]),
					layouts
				})];
			}
		}]
	} };
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    frontstages: [createFrontstage({\n      contentGroupProps: {\n        id: \"split-vertical-group\",\n        layout: StandardContentLayouts.twoVerticalSplit,\n        contents: [{\n          id: \"view-0\",\n          classId: \"\",\n          content: <ViewportContent />\n        }, {\n          id: \"view-1\",\n          classId: \"\",\n          content: <ViewportContent />\n        }]\n      }\n    })],\n    itemProviders: [{\n      id: \"toolbar\",\n      getToolbarItems: () => {\n        const layouts = {\n          standard: {\n            usage: ToolbarUsage.ContentManipulation,\n            orientation: ToolbarOrientation.Horizontal\n          }\n        };\n        return [ToolbarItemUtilities.createActionItem({\n          id: \"action1\",\n          label: \"Action 1\",\n          icon: <SvgWindow />,\n          isHidden: new ConditionalBooleanValue(() => UiFramework.content.getActiveId() === \"view-0\" ? false : true, [SyncUiEventId.ActiveContentChanged]),\n          layouts\n        }), ToolbarItemUtilities.createActionItem({\n          id: \"action2\",\n          label: \"Action 2\",\n          icon: <SvgWindowSplitVertical />,\n          isHidden: new ConditionalBooleanValue(() => UiFramework.content.getActiveId() === \"view-1\" ? false : true, [SyncUiEventId.ActiveContentChanged]),\n          layouts\n        })];\n      }\n    }]\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
