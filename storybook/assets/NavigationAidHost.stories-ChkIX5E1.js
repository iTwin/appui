import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { _t as Button, i as init_esm } from "./iframe-DrBiZGmV.js";
import { I as NavigationAidHost, L as NavigationWidgetComposer, U as IModelViewportControl, ln as NavigationAidControl, st as UiFramework, t as init_appui_react } from "./appui-react-CpKk3CrH.js";
import { i as init_appui_test_providers, r as init_AppUiStory, s as ViewportContent, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { i as init_Utils, t as createFrontstage } from "./Utils-BkeALKzH.js";
//#region src/components/NavigationAidHost.stories.tsx
function createStoryDecorator({ contentProps } = {}) {
	return ((Story) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppUiStory, {
			demoIModel: { default: "blank" },
			frontstages: [createFrontstage({
				content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewportContent, {}),
				contentManipulation: {
					id: "content-manipulation",
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavigationWidgetComposer, {
						style: { gridColumn: 2 },
						navigationAidHost: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {})
					})
				},
				contentProps
			})]
		});
	});
}
var import_jsx_runtime, meta, Default, DefaultControl, EmptyControl, CustomNavigationControl, CustomControl, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_appui_react();
	init_AppUiStory();
	init_Utils();
	init_appui_test_providers();
	init_esm();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Components/NavigationAidHost",
		component: NavigationAidHost,
		tags: ["autodocs"]
	};
	Default = { decorators: [createStoryDecorator()] };
	DefaultControl = {
		name: "Default Control (deprecated)",
		decorators: [createStoryDecorator({ contentProps: {
			content: void 0,
			classId: IModelViewportControl
		} })]
	};
	EmptyControl = {
		name: "Empty Control (deprecated)",
		decorators: [createStoryDecorator({ contentProps: {
			content: void 0,
			classId: class extends IModelViewportControl {
				get navigationAidControl() {
					return "";
				}
			}
		} })]
	};
	CustomNavigationControl = class extends NavigationAidControl {
		static navigationAidId = "CustomNavigationControl";
		constructor(info, options) {
			super(info, options);
			this.reactNode = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Custom" });
		}
	};
	UiFramework.controls.register(CustomNavigationControl.navigationAidId, CustomNavigationControl);
	CustomControl = {
		name: "Custom Control (deprecated)",
		decorators: [createStoryDecorator({ contentProps: {
			content: void 0,
			classId: class extends IModelViewportControl {
				get navigationAidControl() {
					return CustomNavigationControl.navigationAidId;
				}
			}
		} })]
	};
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  decorators: [createStoryDecorator()]\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	DefaultControl.parameters = {
		...DefaultControl.parameters,
		docs: {
			...DefaultControl.parameters?.docs,
			source: {
				originalSource: "{\n  name: \"Default Control (deprecated)\",\n  decorators: [createStoryDecorator({\n    contentProps: {\n      content: undefined,\n      classId: IModelViewportControl\n    }\n  })]\n}",
				...DefaultControl.parameters?.docs?.source
			}
		}
	};
	EmptyControl.parameters = {
		...EmptyControl.parameters,
		docs: {
			...EmptyControl.parameters?.docs,
			source: {
				originalSource: "{\n  name: \"Empty Control (deprecated)\",\n  decorators: [createStoryDecorator({\n    contentProps: {\n      content: undefined,\n      classId: class extends IModelViewportControl {\n        public override get navigationAidControl() {\n          return \"\"; // no navigation aid\n        }\n      }\n    }\n  })]\n}",
				...EmptyControl.parameters?.docs?.source
			}
		}
	};
	CustomControl.parameters = {
		...CustomControl.parameters,
		docs: {
			...CustomControl.parameters?.docs,
			source: {
				originalSource: "{\n  name: \"Custom Control (deprecated)\",\n  decorators: [createStoryDecorator({\n    contentProps: {\n      content: undefined,\n      classId: class extends IModelViewportControl {\n        public override get navigationAidControl() {\n          return CustomNavigationControl.navigationAidId;\n        }\n      }\n    }\n  })]\n}",
				...CustomControl.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Default",
		"DefaultControl",
		"EmptyControl",
		"CustomControl"
	];
}))();
export { CustomControl, Default, DefaultControl, EmptyControl, __namedExportsOrder, meta as default };
