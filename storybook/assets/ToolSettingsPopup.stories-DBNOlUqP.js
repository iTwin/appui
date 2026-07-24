import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { st as UiFramework, t as init_appui_react } from "./appui-react-CpKk3CrH.js";
import { M as PropertyChangeStatus, R as StandardTypeNames, k as DialogLayoutDataProvider, r as init_appui_abstract } from "./Key.enum-DhBIjxOv.js";
import { r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { n as InitializerDecorator, r as init_Decorators } from "./Decorators-CA-ZE0kv.js";
//#region src/components/ToolSettingsPopup.stories.tsx
function ToolSettingsPopupComponent({ dataProvider, location, offset, onCancel, placement }) {
	const containerRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id: "container-ref",
		ref: containerRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppUiStory, { onInitialize: async () => {
			UiFramework.openToolSettingsPopup(dataProvider, location, offset, onCancel, placement, containerRef.current ?? void 0);
		} })
	});
}
var import_react, import_jsx_runtime, action, TestUiDataProvider, testDataProvider, meta, EscapeClosesPopup, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_appui_abstract();
	init_appui_react();
	init_AppUiStory();
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	import_jsx_runtime = require_jsx_runtime();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	TestUiDataProvider = class TestUiDataProvider extends DialogLayoutDataProvider {
		static _sourcePropertyName = "source";
		static _getSourceDescription = () => {
			return {
				name: TestUiDataProvider._sourcePropertyName,
				displayLabel: "Source",
				typename: StandardTypeNames.String
			};
		};
		_sourceValue = { value: "unknown" };
		_onUpdate = action("onUpdate");
		get source() {
			return this._sourceValue.value;
		}
		set source(option) {
			this._sourceValue.value = option;
		}
		applyUiPropertyChange = (updatedValue) => {
			if (updatedValue.propertyName === TestUiDataProvider._sourcePropertyName) {
				this.source = updatedValue.value.value ? updatedValue.value.value : "";
				this._onUpdate();
			}
		};
		processChangesInUi(properties) {
			if (properties.length > 0) for (const prop of properties) this.applyUiPropertyChange(prop);
			return { status: PropertyChangeStatus.Success };
		}
		supplyDialogItems() {
			return [{
				value: this._sourceValue,
				property: TestUiDataProvider._getSourceDescription(),
				editorPosition: {
					rowPriority: 1,
					columnIndex: 1
				}
			}];
		}
	};
	testDataProvider = new TestUiDataProvider();
	meta = {
		title: "Components/ToolSettingsPopup",
		component: ToolSettingsPopupComponent,
		tags: ["autodocs"],
		decorators: [InitializerDecorator],
		args: {
			dataProvider: testDataProvider,
			location: {
				x: 300,
				y: 200
			},
			offset: {
				x: 0,
				y: 0
			},
			placement: "top"
		}
	};
	EscapeClosesPopup = { render: (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolSettingsPopupComponent, {
		...props,
		onCancel: action("onCancel")
	}) };
	EscapeClosesPopup.parameters = {
		...EscapeClosesPopup.parameters,
		docs: {
			...EscapeClosesPopup.parameters?.docs,
			source: {
				originalSource: "{\n  render: props => <ToolSettingsPopupComponent {...props} onCancel={action(\"onCancel\")} />\n}",
				...EscapeClosesPopup.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["EscapeClosesPopup"];
}))();
export { EscapeClosesPopup, __namedExportsOrder, meta as default };
