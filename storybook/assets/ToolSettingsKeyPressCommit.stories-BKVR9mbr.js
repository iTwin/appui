import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { An as IModelApp, Fn as LengthDescription, U as IModelViewportControl, an as PreviewFeaturesProvider, q as StandardContentLayouts, st as UiFramework, t as init_appui_react, xn as init_core_frontend } from "./appui-react-CpKk3CrH.js";
import { W as DialogProperty, f as PropertyDescriptionHelper, r as init_appui_abstract } from "./Key.enum-DhBIjxOv.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { a as removeProperty, i as init_Utils, t as createFrontstage } from "./Utils-BkeALKzH.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { n as init_StoryTool, t as StoryPrimitiveTool } from "./StoryTool-qhHGyJI5.js";
//#region src/preview/ToolSettingsKeyPressCommit.tsx
/** `toolSettingsKeyPressCommit` preview feature. When enabled the input-like editors rendered in the tool settings will commit the entered value on key press. */
function PreviewStory(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewFeaturesProvider, {
		features: {
			toolSettingsKeyPressCommit: props.toolSettingsKeyPressCommit,
			toolSettingsNewEditors: props.toolSettingsNewEditors
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
			layout: "fullscreen",
			demoIModel: { default: "blank" },
			frontstages: [createFrontstage({
				contentGroupProps: {
					id: "ViewportContentGroup",
					layout: StandardContentLayouts.singleView,
					contents: [{
						id: "ViewportContent",
						classId: IModelViewportControl
					}]
				},
				hideToolSettings: false
			})],
			onInitialize: props.onInitialize,
			onFrontstageActivated: props.onFrontstageActivated
		})
	});
}
var import_jsx_runtime$1;
var init_ToolSettingsKeyPressCommit = __esmMin((() => {
	init_appui_react();
	init_AppUiStory();
	init_Utils();
	import_jsx_runtime$1 = require_jsx_runtime();
	PreviewStory.__docgenInfo = {
		"description": "`toolSettingsKeyPressCommit` preview feature. When enabled the input-like editors rendered in the tool settings will commit the entered value on key press.",
		"methods": [],
		"displayName": "PreviewStory"
	};
}));
//#endregion
//#region src/preview/ToolSettingsKeyPressCommit.stories.tsx
var import_jsx_runtime, action, meta, DefaultTool, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_AppUiStory();
	init_ToolSettingsKeyPressCommit();
	init_Utils();
	init_StoryTool();
	init_core_frontend();
	init_appui_react();
	init_appui_abstract();
	import_jsx_runtime = require_jsx_runtime();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	meta = {
		title: "PreviewFeatures/ToolSettingsKeyPressCommit",
		component: PreviewStory,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		parameters: { docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) } },
		argTypes: {
			onInitialize: removeProperty(),
			onFrontstageActivated: removeProperty()
		},
		args: {
			toolSettingsKeyPressCommit: true,
			toolSettingsNewEditors: false
		}
	};
	DefaultTool = class extends StoryPrimitiveTool {
		static toolId = "DefaultStoryTool";
		_text = "Hello";
		_number = 2;
		_customNumber = 4;
		supplyToolSettingsProperties() {
			return [
				new DialogProperty(PropertyDescriptionHelper.buildTextEditorDescription("text", "Text"), this._text).toDialogItem({
					columnIndex: 0,
					rowPriority: 0
				}),
				new DialogProperty(PropertyDescriptionHelper.buildNumberEditorDescription("numeric", "Numeric"), this._number).toDialogItem({
					columnIndex: 0,
					rowPriority: 1
				}),
				new DialogProperty(new LengthDescription("customNumber", "Custom number"), this._customNumber).toDialogItem({
					columnIndex: 0,
					rowPriority: 2
				})
			];
		}
		async applyToolSettingPropertyChange(updatedValue) {
			action("applyToolSettingPropertyChange")(updatedValue);
			if (updatedValue.propertyName === "text") {
				this._text = updatedValue.value.value;
				return true;
			}
			if (updatedValue.propertyName === "numeric") {
				this._number = updatedValue.value.value;
				return true;
			}
			if (updatedValue.propertyName === "customNumber") {
				this._customNumber = updatedValue.value.value;
				return true;
			}
			return false;
		}
	};
	Default = { args: {
		onInitialize: async () => {
			IModelApp.tools.register(DefaultTool, UiFramework.localizationNamespace);
		},
		onFrontstageActivated: async () => {
			await IModelApp.tools.run(DefaultTool.toolId);
		}
	} };
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    onInitialize: async () => {\n      IModelApp.tools.register(DefaultTool, UiFramework.localizationNamespace);\n    },\n    onFrontstageActivated: async () => {\n      await IModelApp.tools.run(DefaultTool.toolId);\n    }\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
