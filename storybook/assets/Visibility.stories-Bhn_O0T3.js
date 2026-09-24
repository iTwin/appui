import { n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { Mr as init_esm, Vi as SvgPlaceholder } from "./components-react-CHXB-2a9.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-DVMw3I-C.js";
import { $t as ToolbarUsage, Qt as ToolbarOrientation, Ut as WidgetState, i as ToolbarItemUtilities, lt as UiFramework, t as init_appui_react, zt as StagePanelState } from "./appui-react-B4bFXMth.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-BjKYoeqO.js";
//#region src/frontstage/Visibility.stories.tsx
function Component(_props) {
	return null;
}
var import_jsx_runtime, action, StoryDecorator, meta, Default, AutoHideUI, InactivityTime, __namedExportsOrder;
function init_Visibility_stories() {
	return (init_Visibility_stories = __esmMin((() => {
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
	})))();
}
//#endregion
init_Visibility_stories();
export { AutoHideUI, Default, InactivityTime, __namedExportsOrder, meta as default };
