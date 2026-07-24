import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { lt as Calculator, t as init_appui_react } from "./appui-react-CpKk3CrH.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region src/components/Calculator.stories.tsx
var action, meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_appui_react();
	init_Decorators();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	meta = {
		title: "Components/Calculator",
		component: Calculator,
		tags: ["autodocs"],
		decorators: [AppUiDecorator]
	};
	Default = { args: {
		engine: void 0,
		onOk: action("onOk"),
		onCancel: action("onCancel")
	} };
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    engine: undefined!,\n    // set via defaultProps\n    onOk: action(\"onOk\"),\n    onCancel: action(\"onCancel\")\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
