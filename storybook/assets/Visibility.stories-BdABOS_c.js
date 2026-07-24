import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Ft as StagePanelState, Jt as ToolbarOrientation, Yt as ToolbarUsage, i as ToolbarItemUtilities, st as UiFramework, t as init_appui_react, zt as WidgetState } from "./appui-react-CpKk3CrH.js";
import { Vr as init_esm, Wi as SvgPlaceholder } from "./components-react-DigDa1CF.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-BkeALKzH.js";
//#region src/frontstage/Visibility.stories.tsx
function Component(_props) {
	return null;
}
var import_jsx_runtime, action, StoryDecorator, meta, Default, AutoHideUI, InactivityTime, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_appui_react();
	init_esm();
	init_AppUiStory();
	init_Utils();
	import_jsx_runtime = require_jsx_runtime();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	StoryDecorator = (_Story, context) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppUiStory, {
			onInitialize: async () => {
				UiFramework.visibility.autoHideUi = context.args.autoHideUi;
				UiFramework.visibility.inactivityTime = context.args.inactivityTime;
			},
			frontstages: [createFrontstage({ leftPanelProps: {
				pinned: true,
				defaultState: StagePanelState.Open
			} })],
			itemProviders: [{
				id: "p1",
				getToolbarItems: () => {
					const item = ToolbarItemUtilities.createActionItem("item1", 100, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}), "Item", action("Item"), { layouts: { standard: {
						orientation: ToolbarOrientation.Horizontal,
						usage: ToolbarUsage.ContentManipulation
					} } });
					return [item, {
						...item,
						id: "item2",
						layouts: { standard: {
							orientation: ToolbarOrientation.Horizontal,
							usage: ToolbarUsage.ViewNavigation
						} }
					}];
				},
				getWidgets: () => [createWidget(1), createWidget(2, { defaultState: WidgetState.Floating })]
			}]
		});
	};
	meta = {
		title: "Frontstage/Visibility",
		component: Component,
		tags: ["autodocs"],
		decorators: [StoryDecorator],
		parameters: {
			docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) },
			layout: "fullscreen"
		},
		args: {
			autoHideUi: UiFramework.visibility.autoHideUi,
			inactivityTime: UiFramework.visibility.inactivityTime
		}
	};
	Default = {};
	AutoHideUI = { args: { autoHideUi: true } };
	InactivityTime = { args: {
		autoHideUi: true,
		inactivityTime: 1e3
	} };
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{}",
				...Default.parameters?.docs?.source
			}
		}
	};
	AutoHideUI.parameters = {
		...AutoHideUI.parameters,
		docs: {
			...AutoHideUI.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    autoHideUi: true\n  }\n}",
				...AutoHideUI.parameters?.docs?.source
			}
		}
	};
	InactivityTime.parameters = {
		...InactivityTime.parameters,
		docs: {
			...InactivityTime.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    autoHideUi: true,\n    inactivityTime: 1000\n  }\n}",
				...InactivityTime.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Default",
		"AutoHideUI",
		"InactivityTime"
	];
}))();
export { AutoHideUI, Default, InactivityTime, __namedExportsOrder, meta as default };
