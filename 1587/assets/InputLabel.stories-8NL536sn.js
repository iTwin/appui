import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Rr as Input, zn as init_esm } from "./Key.enum-C3db3aye.js";
import { Ci as InputLabel, Ti as InputStatus, pi as init_core_react } from "./iframe-CKDG0E56.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-B-VEjdoW.js";
//#region src/deprecated/InputLabel.stories.tsx
var import_jsx_runtime, meta, Basic, Status, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_core_react();
	init_esm();
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
}))();
export { Basic, Status, __namedExportsOrder, meta as default };
