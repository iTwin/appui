import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { R as StandardTypeNames, f as PropertyDescriptionHelper, r as init_appui_abstract } from "./Key.enum-DhBIjxOv.js";
import { n as init_StoryTool, t as StoryPrimitiveTool } from "./StoryTool-qhHGyJI5.js";
//#region src/tools/LockPropertyTool.ts
function createLockPropertyTool(args) {
	const { lockLabel, disabled, propertyOverrides, initialValue = false, properties } = args ?? {};
	return class LockPropertyTool extends StoryPrimitiveTool {
		static toolId = "LockPropertyTool";
		_myPropertyValue = initialValue;
		_myLockPropertyValue = true;
		supplyToolSettingsProperties() {
			const lockPropertyDescription = PropertyDescriptionHelper.buildLockPropertyDescription("myLockProperty");
			if (lockLabel) lockPropertyDescription.displayLabel = lockLabel;
			const typename = propertyOverrides?.typename ?? StandardTypeNames.Boolean;
			return properties ?? [{
				property: {
					name: "myProperty",
					displayLabel: "My Property",
					...propertyOverrides,
					typename
				},
				value: { value: this._myPropertyValue },
				editorPosition: {
					columnIndex: 0,
					rowPriority: 0
				},
				isDisabled: !this._myLockPropertyValue,
				lockProperty: {
					value: { value: this._myLockPropertyValue },
					property: lockPropertyDescription,
					isDisabled: disabled
				}
			}];
		}
		async applyToolSettingPropertyChange(updatedValue) {
			action("applyToolSettingPropertyChange")(updatedValue);
			switch (updatedValue.propertyName) {
				case "myProperty":
					this._myPropertyValue = updatedValue.value.value;
					return true;
				case "myLockProperty":
					this._myLockPropertyValue = updatedValue.value.value;
					return true;
			}
			return false;
		}
	};
}
var action, LockPropertyTool;
var init_LockPropertyTool = __esmMin((() => {
	init_appui_abstract();
	init_StoryTool();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	LockPropertyTool = createLockPropertyTool();
}));
//#endregion
export { createLockPropertyTool as n, init_LockPropertyTool as r, LockPropertyTool as t };
