import { n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { _n as init_core_react, el as Input, rr as InputStatus, tl as init_Input, tr as InputLabel } from "./components-react-C5rmBlCW.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-gJe5HnZg.js";
//#region src/deprecated/InputLabel.stories.tsx
var import_jsx_runtime, meta, Basic, Status, __namedExportsOrder;
function init_InputLabel_stories() {
	return (init_InputLabel_stories = __esmMin((() => {
		init_core_react();
		init_Input();
		init_Decorators();
		import_jsx_runtime = require_jsx_runtime();
		meta = {
			title: "Deprecated/InputLabel",
			component: InputLabel,
			tags: ["autodocs"],
			decorators: [AppUiDecorator],
			args: {
				label: "Label",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {})
			}
		};
		Basic = {};
		Status = { args: { status: InputStatus.Success } };
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
		Status.parameters = {
			...Status.parameters,
			docs: {
				...Status.parameters?.docs,
				source: {
					originalSource: "{\n  args: {\n    status: InputStatus.Success\n  }\n}",
					...Status.parameters?.docs?.source
				}
			}
		};
		__namedExportsOrder = ["Basic", "Status"];
	})))();
}
//#endregion
init_InputLabel_stories();
export { Basic, Status, __namedExportsOrder, meta as default };
