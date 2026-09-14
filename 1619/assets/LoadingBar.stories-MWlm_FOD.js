import { n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CkWPhb8P.js";
import { n as init_LoadingBar, t as LoadingBar } from "./LoadingBar-D8QZam96.js";
//#region src/deprecated/LoadingBar.stories.tsx
var meta, Basic, __namedExportsOrder;
function init_LoadingBar_stories() {
	return (init_LoadingBar_stories = __esmMin((() => {
		init_LoadingBar();
		init_Decorators();
		meta = {
			title: "Deprecated/LoadingBar",
			component: LoadingBar,
			tags: ["autodocs"],
			decorators: [AppUiDecorator]
		};
		Basic = {};
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
		__namedExportsOrder = ["Basic"];
	})))();
}
//#endregion
init_LoadingBar_stories();
export { Basic, __namedExportsOrder, meta as default };
