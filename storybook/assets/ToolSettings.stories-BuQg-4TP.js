import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { d as TagContainer, i as init_esm, q as Tag } from "./iframe-DrBiZGmV.js";
import { $t as StagePanelLocation, An as IModelApp, U as IModelViewportControl, Un as EventHandled, Vn as PrimitiveTool, Zt as StagePanelSection, bt as StandardLayout, q as StandardContentLayouts, st as UiFramework, t as init_appui_react, xn as init_core_frontend, zt as WidgetState } from "./appui-react-CpKk3CrH.js";
import { I as PropertyValueFormat, r as init_appui_abstract } from "./Key.enum-DhBIjxOv.js";
import { It as createEditorSpec, Nt as isPropertyRecordEditorMetadata, Rt as EditorsRegistryProvider, Ut as isText, bt as PropertyEditorManager, t as init_components_react, yt as PropertyEditorBase } from "./components-react-DigDa1CF.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { a as removeProperty, i as init_Utils, t as createFrontstage } from "./Utils-BkeALKzH.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { n as init_StoryTool, t as StoryPrimitiveTool } from "./StoryTool-qhHGyJI5.js";
import { r as init_LockPropertyTool, t as LockPropertyTool } from "./LockPropertyTool-BlHn_X4U.js";
//#region src/tools/CustomEditorTool.tsx
function createTagsProperty(tags) {
	return {
		typename: "custom-tags",
		name: properties.tags,
		displayLabel: "Custom Property",
		editor: { params: [createTagsParam(tags)] }
	};
}
function createTagsParam(tags) {
	return {
		type: createTagsParam.type,
		tags
	};
}
var properties, CustomEditorTool, tagsStore;
var init_CustomEditorTool = __esmMin((() => {
	init_core_frontend();
	init_StoryTool();
	properties = { tags: "tagsProperty" };
	CustomEditorTool = class extends StoryPrimitiveTool {
		static toolId = "CustomEditorTool";
		_activeTagIds = tagsStore.map((tag) => tag.id);
		async onDataButtonDown() {
			this._activeTagIds = tagsStore.map((tag) => tag.id);
			this.syncToolSettingsProperties([{
				propertyName: properties.tags,
				property: createTagsProperty(tagsStore),
				value: {}
			}]);
			return EventHandled.Yes;
		}
		supplyToolSettingsProperties() {
			return [{
				property: createTagsProperty(tagsStore.filter((tag) => this._activeTagIds.includes(tag.id))),
				value: {},
				editorPosition: {
					columnIndex: 0,
					rowPriority: 0
				}
			}];
		}
		async applyToolSettingPropertyChange(updatedValue) {
			switch (updatedValue.propertyName) {
				case properties.tags: {
					const tagIdsStr = updatedValue.value.value;
					if (typeof tagIdsStr !== "string") return false;
					this._activeTagIds = JSON.parse(tagIdsStr);
					return true;
				}
			}
			return false;
		}
	};
	createTagsParam.type = "custom-tags-param";
	tagsStore = [
		{
			id: "1",
			label: "Tag 1"
		},
		{
			id: "2",
			label: "Tag 2"
		},
		{
			id: "3",
			label: "Tag 3"
		}
	];
}));
//#endregion
//#region src/tools/TagEditorNew.tsx
function TagsEditor({ metadata, onChange }) {
	const tags = import_react$1.useMemo(() => {
		return (metadata.params?.find((param) => {
			return param.type === createTagsParam.type;
		}))?.tags ?? [];
	}, [metadata]);
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(TagContainer, { children: tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tag, {
		style: { blockSize: "var(--iui-size-l)" },
		onRemove: () => {
			const newTagIds = tags.map((t) => t.id).filter((id) => id !== tag.id);
			onChange({ value: JSON.stringify(newTagIds) });
		},
		children: tag.label
	}, tag.id)) });
}
var import_react$1, import_jsx_runtime$3, TagsEditorSpec;
var init_TagEditorNew = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_esm();
	init_components_react();
	init_CustomEditorTool();
	import_jsx_runtime$3 = require_jsx_runtime();
	TagsEditorSpec = createEditorSpec({
		Editor: TagsEditor,
		isMetadataSupported: isPropertyRecordEditorMetadata,
		isValueSupported: isText
	});
}));
//#endregion
//#region src/frontstage/ToolSettings.tsx
/** [FrontstageProvider](https://www.itwinjs.org/reference/appui-react/frontstage/frontstageprovider/) can be used to configure a frontstage. */
function ToolSettingsStory(props) {
	const { mode, ...rest } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(EditorsRegistryProvider, {
		editors,
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AppUiStory, {
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
				hideToolSettings: false,
				toolSettings: {
					id: "toolSettings",
					defaultState: mode === "floating" ? WidgetState.Floating : void 0
				},
				layout: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(StandardLayout, { toolSettings: { defaultLocation: mode === void 0 ? void 0 : {
					location: StagePanelLocation.Right,
					section: StagePanelSection.Start
				} } })
			})],
			...rest
		})
	});
}
var import_jsx_runtime$2, editors;
var init_ToolSettings = __esmMin((() => {
	init_Utils();
	init_AppUiStory();
	init_appui_react();
	init_TagEditorNew();
	init_components_react();
	import_jsx_runtime$2 = require_jsx_runtime();
	editors = [TagsEditorSpec];
	ToolSettingsStory.__docgenInfo = {
		"description": "[FrontstageProvider](https://www.itwinjs.org/reference/appui-react/frontstage/frontstageprovider/) can be used to configure a frontstage.",
		"methods": [],
		"displayName": "ToolSettingsStory",
		"props": { "mode": {
			"required": false,
			"tsType": {
				"name": "union",
				"raw": "\"widget\" | \"floating\"",
				"elements": [{
					"name": "literal",
					"value": "\"widget\""
				}, {
					"name": "literal",
					"value": "\"floating\""
				}]
			},
			"description": ""
		} },
		"composes": ["Pick"]
	};
}));
//#endregion
//#region src/tools/CustomTool.ts
var CustomTool;
var init_CustomTool = __esmMin((() => {
	init_core_frontend();
	CustomTool = class extends PrimitiveTool {
		static toolId = "example:CustomTool";
		requireWriteableTarget() {
			return false;
		}
		onRestartTool() {
			return this.exitTool();
		}
		supplyToolSettingsProperties() {
			return [{
				property: {
					displayLabel: "My Property",
					name: "myProperty",
					typename: "string"
				},
				value: { displayValue: "My Value" },
				editorPosition: {
					columnIndex: 0,
					rowPriority: 0
				}
			}];
		}
	};
}));
//#endregion
//#region src/tools/TagEditorLegacy.tsx
var import_react, import_jsx_runtime$1, TagsPropertyEditorLegacy, CustomTagsEditor;
var init_TagEditorLegacy = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_abstract();
	init_esm();
	init_components_react();
	init_CustomEditorTool();
	import_jsx_runtime$1 = require_jsx_runtime();
	TagsPropertyEditorLegacy = class extends PropertyEditorBase {
		get reactNode() {
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CustomTagsEditor, {});
		}
	};
	CustomTagsEditor = import_react.forwardRef((props, ref) => {
		const { propertyRecord } = props;
		const elRef = import_react.useRef(null);
		import_react.useImperativeHandle(ref, () => ({
			getPropertyValue: async () => {},
			htmlElement: null,
			hasFocus: false
		}), []);
		const tags = import_react.useMemo(() => {
			if (!propertyRecord) return [];
			return ((propertyRecord.property.editor?.params)?.find((param) => {
				return param.type === createTagsParam.type;
			}))?.tags ?? [];
		}, [propertyRecord]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TagContainer, {
			ref: elRef,
			children: tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tag, {
				style: { blockSize: "var(--iui-size-l)" },
				onRemove: () => {
					if (!props.propertyRecord) return;
					const newTagIds = tags.map((t) => t.id).filter((id) => id !== tag.id);
					props.onCommit?.({
						propertyRecord: props.propertyRecord,
						newValue: {
							valueFormat: PropertyValueFormat.Primitive,
							value: JSON.stringify(newTagIds)
						}
					});
				},
				children: tag.label
			}, tag.id))
		});
	});
}));
//#endregion
//#region src/frontstage/ToolSettings.stories.tsx
var import_jsx_runtime, meta, Default, LockProperty, CustomEditor, Widget, Floating, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_appui_react();
	init_core_frontend();
	init_Decorators();
	init_AppUiStory();
	init_Utils();
	init_ToolSettings();
	init_CustomTool();
	init_LockPropertyTool();
	init_CustomEditorTool();
	init_components_react();
	init_TagEditorLegacy();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Frontstage/ToolSettings",
		component: ToolSettingsStory,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		parameters: {
			docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) },
			layout: "fullscreen"
		},
		args: {
			onInitialize: async () => {
				IModelApp.tools.register(CustomTool, UiFramework.localizationNamespace);
			},
			onFrontstageActivated: async () => {
				await IModelApp.tools.run(CustomTool.toolId);
			}
		},
		argTypes: {
			mode: removeProperty(),
			onFrontstageActivated: removeProperty(),
			onInitialize: removeProperty()
		}
	};
	Default = {};
	LockProperty = { args: {
		onInitialize: async () => {
			IModelApp.tools.register(LockPropertyTool, UiFramework.localizationNamespace);
		},
		onFrontstageActivated: async () => {
			await IModelApp.tools.run(LockPropertyTool.toolId);
		}
	} };
	CustomEditor = { args: {
		onInitialize: async () => {
			PropertyEditorManager.registerEditor("custom-tags", TagsPropertyEditorLegacy);
			IModelApp.tools.register(CustomEditorTool, UiFramework.localizationNamespace);
		},
		onFrontstageActivated: async () => {
			await IModelApp.tools.run(CustomEditorTool.toolId);
		}
	} };
	Widget = { args: { mode: "widget" } };
	Floating = { args: { mode: "floating" } };
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
	LockProperty.parameters = {
		...LockProperty.parameters,
		docs: {
			...LockProperty.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    onInitialize: async () => {\n      IModelApp.tools.register(LockPropertyTool, UiFramework.localizationNamespace);\n    },\n    onFrontstageActivated: async () => {\n      await IModelApp.tools.run(LockPropertyTool.toolId);\n    }\n  }\n}",
				...LockProperty.parameters?.docs?.source
			}
		}
	};
	CustomEditor.parameters = {
		...CustomEditor.parameters,
		docs: {
			...CustomEditor.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    onInitialize: async () => {\n      PropertyEditorManager.registerEditor(\"custom-tags\", TagsPropertyEditorLegacy);\n      IModelApp.tools.register(CustomEditorTool, UiFramework.localizationNamespace);\n    },\n    onFrontstageActivated: async () => {\n      await IModelApp.tools.run(CustomEditorTool.toolId);\n    }\n  }\n}",
				...CustomEditor.parameters?.docs?.source
			}
		}
	};
	Widget.parameters = {
		...Widget.parameters,
		docs: {
			...Widget.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    mode: \"widget\"\n  }\n}",
				...Widget.parameters?.docs?.source
			}
		}
	};
	Floating.parameters = {
		...Floating.parameters,
		docs: {
			...Floating.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    mode: \"floating\"\n  }\n}",
				...Floating.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Default",
		"LockProperty",
		"CustomEditor",
		"Widget",
		"Floating"
	];
}))();
export { CustomEditor, Default, Floating, LockProperty, Widget, __namedExportsOrder, meta as default };
