import { n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-cZ7dbGZU.js";
import { Ut as WidgetState, rn as StagePanelLocation, t as init_appui_react, tn as StagePanelSection, xt as ConfigurableUiContent } from "./appui-react-p-O3mm3j.js";
import { i as init_Utils, n as createWidget, t as createFrontstage } from "./Utils-bQd6hcpG.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CkWPhb8P.js";
//#region src/frontstage/ConfigurableUiContent.stories.tsx
function StoryComponent(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppUiStory, {
		frontstages: [createFrontstage()],
		itemProviders: [{
			id: "widgets",
			getWidgets: () => {
				const layouts = { standard: {
					location: StagePanelLocation.Right,
					section: StagePanelSection.Start
				} };
				return [
					createWidget(1, {
						defaultState: WidgetState.Floating,
						canFloat: {
							defaultPosition: {
								x: 20,
								y: 50
							},
							defaultSize: {
								width: 300,
								height: 200
							},
							isResizable: true
						},
						layouts
					}),
					createWidget(2, { layouts }),
					createWidget(3, { layouts }),
					createWidget(4, { layouts })
				];
			}
		}],
		displayChildrenOnly: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigurableUiContent, {
			style: { height: "calc(100vh - 2rem)" },
			widgetOpacity: props.widgetOpacity,
			toolbarOpacity: props.toolbarOpacity,
			widgetIcon: props.widgetIcon,
			showActiveWidgetLabel: props.showActiveWidgetLabel
		})
	});
}
var import_jsx_runtime, meta, Default, TransparentWidgets, ShowActiveWidgetLabel, HideWidgetIcons, MixedStyles, __namedExportsOrder;
function init_ConfigurableUiContent_stories() {
	return (init_ConfigurableUiContent_stories = __esmMin((() => {
		require_react();
		init_Decorators();
		init_AppUiStory();
		init_appui_react();
		init_Utils();
		import_jsx_runtime = require_jsx_runtime();
		meta = {
			title: "Frontstage/ConfigurableUiContent",
			component: StoryComponent,
			tags: ["autodocs"],
			decorators: [AppUiDecorator],
			parameters: {
				docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) },
				layout: "fullscreen"
			}
		};
		Default = { args: {
			widgetIcon: true,
			showActiveWidgetLabel: false,
			widgetOpacity: 1
		} };
		TransparentWidgets = {
			name: "Transparent Widgets (deprecated)",
			args: { widgetOpacity: .5 }
		};
		ShowActiveWidgetLabel = { args: { showActiveWidgetLabel: true } };
		HideWidgetIcons = { args: { widgetIcon: false } };
		MixedStyles = { args: {
			widgetOpacity: .7,
			showActiveWidgetLabel: true,
			widgetIcon: true
		} };
		Default.parameters = {
			...Default.parameters,
			docs: {
				...Default.parameters?.docs,
				source: {
					originalSource: "{\n  args: {\n    widgetIcon: true,\n    showActiveWidgetLabel: false,\n    widgetOpacity: 1\n  }\n}",
					...Default.parameters?.docs?.source
				}
			}
		};
		TransparentWidgets.parameters = {
			...TransparentWidgets.parameters,
			docs: {
				...TransparentWidgets.parameters?.docs,
				source: {
					originalSource: "{\n  name: \"Transparent Widgets (deprecated)\",\n  args: {\n    widgetOpacity: 0.5\n  }\n}",
					...TransparentWidgets.parameters?.docs?.source
				}
			}
		};
		ShowActiveWidgetLabel.parameters = {
			...ShowActiveWidgetLabel.parameters,
			docs: {
				...ShowActiveWidgetLabel.parameters?.docs,
				source: {
					originalSource: "{\n  args: {\n    showActiveWidgetLabel: true\n  }\n}",
					...ShowActiveWidgetLabel.parameters?.docs?.source
				}
			}
		};
		HideWidgetIcons.parameters = {
			...HideWidgetIcons.parameters,
			docs: {
				...HideWidgetIcons.parameters?.docs,
				source: {
					originalSource: "{\n  args: {\n    widgetIcon: false\n  }\n}",
					...HideWidgetIcons.parameters?.docs?.source
				}
			}
		};
		MixedStyles.parameters = {
			...MixedStyles.parameters,
			docs: {
				...MixedStyles.parameters?.docs,
				source: {
					originalSource: "{\n  args: {\n    widgetOpacity: 0.7,\n    showActiveWidgetLabel: true,\n    widgetIcon: true\n  }\n}",
					...MixedStyles.parameters?.docs?.source
				}
			}
		};
		__namedExportsOrder = [
			"Default",
			"TransparentWidgets",
			"ShowActiveWidgetLabel",
			"HideWidgetIcons",
			"MixedStyles"
		];
	})))();
}
//#endregion
init_ConfigurableUiContent_stories();
export { Default, HideWidgetIcons, MixedStyles, ShowActiveWidgetLabel, TransparentWidgets, __namedExportsOrder, meta as default };
