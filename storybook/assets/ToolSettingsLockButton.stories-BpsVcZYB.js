import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { An as IModelApp, Fn as LengthDescription, U as IModelViewportControl, an as PreviewFeaturesProvider, q as StandardContentLayouts, st as UiFramework, t as init_appui_react, xn as init_core_frontend } from "./appui-react-CpKk3CrH.js";
import { V as PropertyEditorParamTypes, W as DialogProperty, f as PropertyDescriptionHelper, m as StandardEditorNames, r as init_appui_abstract } from "./Key.enum-DhBIjxOv.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { a as removeProperty, i as init_Utils, t as createFrontstage } from "./Utils-BkeALKzH.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { n as createLockPropertyTool, r as init_LockPropertyTool, t as LockPropertyTool } from "./LockPropertyTool-BlHn_X4U.js";
//#region src/preview/ToolSettingsLockButton.tsx
/** `toolSettingsLockButton` preview feature. Displays the default tool settings lock editor as an icon button rather than a checkbox. */
function PreviewStory(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewFeaturesProvider, {
		features: {
			toolSettingsLockButton: props.toolSettingsLockButton,
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
			onInitialize: async () => {
				IModelApp.tools.register(createLockPropertyTool({
					lockLabel: props.lockLabel,
					disabled: props.disabled,
					initialValue: props.propertyType === "number" ? 1 : void 0,
					propertyOverrides: {
						typename: props.propertyType,
						...props.propertyType === "number" ? { editor: {
							name: StandardEditorNames.NumberCustom,
							params: [{
								type: PropertyEditorParamTypes.CustomFormattedNumber,
								formatFunction: (x) => x.toString(),
								parseFunction: (x) => ({
									value: Number(x),
									parseError: void 0
								})
							}]
						} } : {}
					},
					properties: props.properties
				}), UiFramework.localizationNamespace);
			},
			onFrontstageActivated: async () => {
				await IModelApp.tools.run(LockPropertyTool.toolId);
			}
		})
	});
}
var import_jsx_runtime$1;
var init_ToolSettingsLockButton = __esmMin((() => {
	init_appui_abstract();
	init_appui_react();
	init_core_frontend();
	init_AppUiStory();
	init_Utils();
	init_LockPropertyTool();
	import_jsx_runtime$1 = require_jsx_runtime();
	PreviewStory.__docgenInfo = {
		"description": "`toolSettingsLockButton` preview feature. Displays the default tool settings lock editor as an icon button rather than a checkbox.",
		"methods": [],
		"displayName": "PreviewStory",
		"props": {
			"lockLabel": {
				"required": false,
				"tsType": { "name": "string" },
				"description": ""
			},
			"disabled": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": ""
			},
			"propertyType": {
				"required": false,
				"tsType": {
					"name": "union",
					"raw": "`${StandardTypeNames.Boolean}` | `${StandardTypeNames.Number}`",
					"elements": [{
						"name": "literal",
						"value": "`${StandardTypeNames.Boolean}`"
					}, {
						"name": "literal",
						"value": "`${StandardTypeNames.Number}`"
					}]
				},
				"description": ""
			},
			"properties": {
				"required": false,
				"tsType": {
					"name": "Array",
					"elements": [{ "name": "DialogItem" }],
					"raw": "DialogItem[]"
				},
				"description": ""
			}
		}
	};
}));
//#endregion
//#region src/preview/ToolSettingsLockButton.stories.tsx
var import_jsx_runtime, meta, Default, DisplayLabel, Disabled, Input, EditorGroup, DefaultEditors, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_AppUiStory();
	init_ToolSettingsLockButton();
	init_Utils();
	init_appui_abstract();
	init_core_frontend();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "PreviewFeatures/ToolSettingsLockButton",
		component: PreviewStory,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		parameters: { docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) } },
		argTypes: { propertyType: removeProperty() },
		args: {
			toolSettingsLockButton: true,
			toolSettingsNewEditors: false
		}
	};
	Default = {};
	DisplayLabel = { args: { lockLabel: "Toggle myProperty lock" } };
	Disabled = { args: { disabled: true } };
	Input = { args: { propertyType: "number" } };
	EditorGroup = { args: { properties: (() => {
		const useRadius = new DialogProperty(PropertyDescriptionHelper.buildLockPropertyDescription("useRadius"), false);
		useRadius.description.displayLabel = "Lock radius property";
		const radius = new DialogProperty(PropertyDescriptionHelper.buildToggleDescription("radius", "Radius"), 1);
		const useLength = new DialogProperty(PropertyDescriptionHelper.buildLockPropertyDescription("useLength"), false);
		useLength.description.displayLabel = "Lock length property";
		const length = new DialogProperty(new LengthDescription("length", "Length"), 1);
		return [radius.toDialogItem({
			columnIndex: 0,
			rowPriority: 1
		}, useRadius.toDialogItem({
			columnIndex: 0,
			rowPriority: 1
		})), length.toDialogItem({
			columnIndex: 0,
			rowPriority: 1
		}, useLength.toDialogItem({
			columnIndex: 0,
			rowPriority: 1
		}))];
	})() } };
	DefaultEditors = { args: { properties: (() => {
		let rowPriority = 1;
		function createDialogItem(dialogProperty) {
			rowPriority++;
			const lock = new DialogProperty(PropertyDescriptionHelper.buildLockPropertyDescription(`use${dialogProperty.name}`), false);
			lock.description.displayLabel = `Lock ${dialogProperty.description.displayLabel} property`;
			return dialogProperty.toDialogItem({
				columnIndex: 0,
				rowPriority
			}, lock.toDialogItem({
				columnIndex: 0,
				rowPriority
			}));
		}
		return [
			createDialogItem(new DialogProperty(PropertyDescriptionHelper.buildTextEditorDescription("text", "Text"), "Hello")),
			createDialogItem(new DialogProperty(PropertyDescriptionHelper.buildNumberEditorDescription("numeric", "Numeric"), 10)),
			createDialogItem(new DialogProperty(new LengthDescription("customNumber", "Custom number"), 10))
		];
	})() } };
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
	DisplayLabel.parameters = {
		...DisplayLabel.parameters,
		docs: {
			...DisplayLabel.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    lockLabel: \"Toggle myProperty lock\"\n  }\n}",
				...DisplayLabel.parameters?.docs?.source
			}
		}
	};
	Disabled.parameters = {
		...Disabled.parameters,
		docs: {
			...Disabled.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    disabled: true\n  }\n}",
				...Disabled.parameters?.docs?.source
			}
		}
	};
	Input.parameters = {
		...Input.parameters,
		docs: {
			...Input.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    propertyType: \"number\"\n  }\n}",
				...Input.parameters?.docs?.source
			}
		}
	};
	EditorGroup.parameters = {
		...EditorGroup.parameters,
		docs: {
			...EditorGroup.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    properties: (() => {\n      const useRadius = new DialogProperty(PropertyDescriptionHelper.buildLockPropertyDescription(\"useRadius\"), false);\n      useRadius.description.displayLabel = \"Lock radius property\";\n      const radius = new DialogProperty(PropertyDescriptionHelper.buildToggleDescription(\"radius\", \"Radius\"), 1);\n      const useLength = new DialogProperty(PropertyDescriptionHelper.buildLockPropertyDescription(\"useLength\"), false);\n      useLength.description.displayLabel = \"Lock length property\";\n      const length = new DialogProperty(new LengthDescription(\"length\", \"Length\"), 1);\n      return [radius.toDialogItem({\n        columnIndex: 0,\n        rowPriority: 1\n      }, useRadius.toDialogItem({\n        columnIndex: 0,\n        rowPriority: 1\n      })), length.toDialogItem({\n        columnIndex: 0,\n        rowPriority: 1\n      }, useLength.toDialogItem({\n        columnIndex: 0,\n        rowPriority: 1\n      }))];\n    })()\n  }\n}",
				...EditorGroup.parameters?.docs?.source
			}
		}
	};
	DefaultEditors.parameters = {
		...DefaultEditors.parameters,
		docs: {
			...DefaultEditors.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    properties: (() => {\n      let rowPriority = 1;\n      function createDialogItem<T>(dialogProperty: DialogProperty<T>) {\n        rowPriority++;\n        const lock = new DialogProperty(PropertyDescriptionHelper.buildLockPropertyDescription(`use${dialogProperty.name}`), false);\n        lock.description.displayLabel = `Lock ${dialogProperty.description.displayLabel} property`;\n        return dialogProperty.toDialogItem({\n          columnIndex: 0,\n          rowPriority\n        }, lock.toDialogItem({\n          columnIndex: 0,\n          rowPriority\n        }));\n      }\n      return [createDialogItem(new DialogProperty(PropertyDescriptionHelper.buildTextEditorDescription(\"text\", \"Text\"), \"Hello\")), createDialogItem(new DialogProperty(PropertyDescriptionHelper.buildNumberEditorDescription(\"numeric\", \"Numeric\"), 10)), createDialogItem(new DialogProperty(new LengthDescription(\"customNumber\", \"Custom number\"), 10))];\n    })()\n  }\n}",
				...DefaultEditors.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Default",
		"DisplayLabel",
		"Disabled",
		"Input",
		"EditorGroup",
		"DefaultEditors"
	];
}))();
export { Default, DefaultEditors, Disabled, DisplayLabel, EditorGroup, Input, __namedExportsOrder, meta as default };
