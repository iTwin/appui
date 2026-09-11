import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { M as init_appui_react, Ro as init_core_frontend, Y as QuantityFormatSettingsPage, as as QuantityType } from "./iframe-CKDG0E56.js";
import { i as init_Utils, r as enumArgType } from "./Utils-gMkMQFsJ.js";
import { n as InitializerDecorator, r as init_Decorators, t as AppUiDecorator } from "./Decorators-B-VEjdoW.js";
//#region src/components/QuantityFormat.tsx
function QuantityFormatStory(props) {
	const { availableUnitSystems, ...rest } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuantityFormatSettingsPage, {
		availableUnitSystems: new Set(availableUnitSystems),
		...rest
	}, rest.initialQuantityType);
}
var import_jsx_runtime;
var init_QuantityFormat = __esmMin((() => {
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
}));
//#endregion
//#region src/components/QuantityFormat.stories.tsx
var meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
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
}))();
export { Default, __namedExportsOrder, meta as default };
