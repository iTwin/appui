import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { M as init_appui_react, Rt as UiFramework, St as StandardContentLayouts, Z as IModelConnectedViewSelector, vt as IModelViewportControl } from "./iframe-CKDG0E56.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-CwSDgRNO.js";
import { i as init_Utils, t as createFrontstage } from "./Utils-gMkMQFsJ.js";
//#region src/components/ViewSelector.stories.tsx
var import_jsx_runtime, StoryDecorator, meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_appui_react();
	init_AppUiStory();
	init_Utils();
	import_jsx_runtime = require_jsx_runtime();
	StoryDecorator = (Story) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppUiStory, {
			layout: "fullscreen",
			demoIModel: { default: "blank" },
			onInitialize: async () => {
				UiFramework.visibility.autoHideUi = false;
			},
			frontstages: [createFrontstage({
				contentGroupProps: {
					id: "ViewportContentGroup",
					layout: StandardContentLayouts.singleView,
					contents: [{
						id: "ViewportContent",
						classId: IModelViewportControl
					}]
				},
				contentManipulation: {
					id: "content-manipulation",
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							pointerEvents: "all",
							width: 50,
							height: 50,
							background: "var(--iui-color-background)",
							zIndex: 1
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {})
					})
				}
			})]
		});
	};
	meta = {
		title: "Components/ViewSelector",
		component: IModelConnectedViewSelector,
		tags: ["autodocs"],
		decorators: [StoryDecorator],
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
