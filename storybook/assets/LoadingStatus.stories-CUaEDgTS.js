import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { n as init_LoadingStatus, t as LoadingStatus } from "./LoadingStatus-BduZD1l_.js";
//#region src/deprecated/LoadingStatus.stories.tsx
var meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_LoadingStatus();
	init_Decorators();
	meta = {
		title: "Deprecated/LoadingStatus",
		component: LoadingStatus,
		tags: ["autodocs"],
		decorators: [AppUiDecorator]
	};
	Basic = { args: {
		message: "Loading...",
		percent: 33
	} };
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    message: \"Loading...\",\n    percent: 33\n  }\n}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Basic"];
}))();
export { Basic, __namedExportsOrder, meta as default };
