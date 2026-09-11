import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { gi as SearchBox, pi as init_core_react } from "./iframe-CKDG0E56.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-B-VEjdoW.js";
//#region src/deprecated/SearchBox.stories.tsx
var action, meta, Basic, WithDelay, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_core_react();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	meta = {
		title: "Deprecated/SearchBox",
		component: SearchBox,
		tags: ["autodocs"],
		decorators: [AppUiDecorator],
		args: {
			onValueChanged: action("onValueChanged"),
			onClear: action("onClear"),
			onEnterPressed: action("onEnterPressed"),
			onEscPressed: action("onEscPressed")
		}
	};
	Basic = {};
	WithDelay = { args: {
		...meta.args,
		valueChangedDelay: 1e3
	} };
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
	WithDelay.parameters = {
		...WithDelay.parameters,
		docs: {
			...WithDelay.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    ...meta.args,\n    valueChangedDelay: 1000\n  }\n}",
				...WithDelay.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Basic", "WithDelay"];
}))();
export { Basic, WithDelay, __namedExportsOrder, meta as default };
