import { n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CkWPhb8P.js";
import { n as init_LoadingStatus, t as LoadingStatus } from "./LoadingStatus-BgBzq2at.js";
//#region src/deprecated/LoadingStatus.stories.tsx
var meta, Basic, __namedExportsOrder;
function init_LoadingStatus_stories() {
	return (init_LoadingStatus_stories = __esmMin((() => {
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
	})))();
}
//#endregion
init_LoadingStatus_stories();
export { Basic, __namedExportsOrder, meta as default };
