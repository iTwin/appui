import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { _t as Button, h as ProgressLinear, i as init_esm, qt as require_classnames } from "./iframe-DrBiZGmV.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { n as init_LoadingBar, t as LoadingBar } from "./LoadingBar-C6ajTU-4.js";
import { n as init_LoadingSpinner, t as LoadingSpinner } from "./LoadingSpinner-CL-rSnHo.js";
import { n as init_LoadingStatus, t as LoadingStatus } from "./LoadingStatus-BduZD1l_.js";
//#region ../../ui/core-react/src/core-react/loading/LoadingPrompt.scss
var init_LoadingPrompt$1 = __esmMin((() => {}));
//#endregion
//#region ../../ui/core-react/src/core-react/loading/LoadingPrompt.tsx
var import_classnames, import_react, import_jsx_runtime, LoadingPrompt;
var init_LoadingPrompt = __esmMin((() => {
	init_LoadingPrompt$1();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_esm();
	init_LoadingBar();
	init_LoadingSpinner();
	init_LoadingStatus();
	import_jsx_runtime = require_jsx_runtime();
	LoadingPrompt = class extends import_react.PureComponent {
		static defaultProps = {
			showPercentage: false,
			showStatus: false,
			showCancel: false,
			isDeterminate: false,
			showIndeterminateBar: false,
			percent: 0,
			status: ""
		};
		render() {
			const isDeterminate = this.props.isDeterminate;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: (0, import_classnames.default)("core-loadingprompt", this.props.className),
				style: this.props.style,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "title",
						children: this.props.title
					}),
					this.props.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "message",
						children: this.props.message
					}),
					isDeterminate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingBar, {
						style: { width: "100%" },
						percent: this.props.percent,
						showPercentage: this.props.showPercentage
					}),
					isDeterminate && this.props.showStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingStatus, {
						style: {
							marginTop: ".5em",
							width: "100%",
							fontSize: ".75em"
						},
						percent: this.props.percent,
						message: this.props.status
					}),
					!isDeterminate && (this.props.showIndeterminateBar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressLinear, { indeterminate: true }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSpinner, {})),
					this.props.showCancel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "loading-prompt-cancel",
						onClick: this.props.onCancel,
						children: "Cancel"
					})
				]
			});
		}
	};
	LoadingPrompt.__docgenInfo = {
		"description": "A component to display during loading that optionally shows percentage, status text and a cancel button.\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/progressindicator iTwinUI progress indicator} instead.",
		"methods": [],
		"displayName": "LoadingPrompt",
		"props": {
			"className": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Custom CSS class name"
			},
			"style": {
				"required": false,
				"tsType": {
					"name": "ReactCSSProperties",
					"raw": "React.CSSProperties"
				},
				"description": "Custom CSS style properties"
			},
			"itemId": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id"
			},
			"title": {
				"required": true,
				"tsType": { "name": "string" },
				"description": "Title"
			},
			"message": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Message displayed below the title (optional)"
			},
			"isDeterminate": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Determine if a percentage bar is displayed (isDeterminate=true), otherwise a loading spinner or indeterminate progress bar is shown.",
				"defaultValue": {
					"value": "false",
					"computed": false
				}
			},
			"showStatus": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Show current status and percentage. Default is false (not shown)",
				"defaultValue": {
					"value": "false",
					"computed": false
				}
			},
			"showCancel": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Show cancel button. Default is false (not shown)",
				"defaultValue": {
					"value": "false",
					"computed": false
				}
			},
			"status": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Current loading status text (optional). Only shown if showStatus=true and isDeterminate=true",
				"defaultValue": {
					"value": "\"\"",
					"computed": false
				}
			},
			"percent": {
				"required": false,
				"tsType": { "name": "number" },
				"description": "Current percentage.  Only used if isDeterminate=true",
				"defaultValue": {
					"value": "0",
					"computed": false
				}
			},
			"showPercentage": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Show percentage at the end of the loading bar (optional). Only shown if isDeterminate=true and showStatus=false",
				"defaultValue": {
					"value": "false",
					"computed": false
				}
			},
			"showIndeterminateBar": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Show indeterminate progress bar instead of loading spinner",
				"defaultValue": {
					"value": "false",
					"computed": false
				}
			},
			"onCancel": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "() => void",
					"signature": {
						"arguments": [],
						"return": { "name": "void" }
					}
				},
				"description": "Function called when Cancel button is clicked."
			}
		}
	};
}));
//#endregion
//#region src/deprecated/LoadingPrompt.stories.tsx
var meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_LoadingPrompt();
	init_Decorators();
	meta = {
		title: "Deprecated/LoadingPrompt",
		component: LoadingPrompt,
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
}))();
export { Basic, __namedExportsOrder, meta as default };
