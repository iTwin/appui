import { n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { Nn as init_core_frontend, er as QuantityType, t as init_appui_react, v as QuantityFormatSettingsPage } from "./appui-react-p-O3mm3j.js";
import { i as init_Utils, r as enumArgType } from "./Utils-bQd6hcpG.js";
import { n as InitializerDecorator, r as init_Decorators, t as AppUiDecorator } from "./Decorators-CkWPhb8P.js";
//#region src/components/QuantityFormat.tsx
function QuantityFormatStory(props) {
	const { availableUnitSystems, ...rest } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuantityFormatSettingsPage, {
		availableUnitSystems: new Set(availableUnitSystems),
		...rest
	}, rest.initialQuantityType);
}
var import_jsx_runtime;
function init_QuantityFormat() {
	return (init_QuantityFormat = __esmMin((() => {
		init_appui_react();
		import_jsx_runtime = require_jsx_runtime();
		QuantityFormatStory.__docgenInfo = {
			"description": "",
			"methods": [],
			"displayName": "QuantityFormatStory",
			"props": { "availableUnitSystems": {
				"required": true,
				"tsType": {
					"name": "Array",
					"elements": [{ "name": "UnitSystemKey" }],
					"raw": "UnitSystemKey[]"
				},
				"description": ""
			} },
			"composes": ["Omit"]
		};
	})))();
}
//#endregion
//#region src/components/QuantityFormat.stories.tsx
var meta, Default, __namedExportsOrder;
function init_QuantityFormat_stories() {
	return (init_QuantityFormat_stories = __esmMin((() => {
		init_core_frontend();
		init_Decorators();
		init_Utils();
		init_QuantityFormat();
		meta = {
			title: "Components/QuantityFormat",
			component: QuantityFormatStory,
			tags: ["autodocs"],
			decorators: [AppUiDecorator, InitializerDecorator],
			args: {
				initialQuantityType: QuantityType.Length,
				availableUnitSystems: [
					"metric",
					"imperial",
					"usCustomary",
					"usSurvey"
				]
			},
			argTypes: { initialQuantityType: enumArgType(QuantityType) }
		};
		Default = {};
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
		__namedExportsOrder = ["Default"];
	})))();
}
//#endregion
init_QuantityFormat_stories();
export { Default, __namedExportsOrder, meta as default };
