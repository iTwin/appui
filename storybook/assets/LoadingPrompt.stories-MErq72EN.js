import { a as __toESM, n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { jt as require_classnames } from "./SvgCloseSmall-D4ZjyCAN.js";
import { gc as init_ProgressLinear, hc as ProgressLinear } from "./components-react-CHXB-2a9.js";
import { cn as init_Button, sn as Button } from "./Key.enum-1tPeVDEH.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-DbQYdZs9.js";
import { n as init_LoadingBar, t as LoadingBar } from "./LoadingBar-D8QZam96.js";
import { n as init_LoadingSpinner, t as LoadingSpinner } from "./LoadingSpinner-DmqXl9Id.js";
import { n as init_LoadingStatus, t as LoadingStatus } from "./LoadingStatus-BgBzq2at.js";
//#endregion
//#region ../../ui/core-react/src/core-react/loading/LoadingPrompt.tsx
var import_classnames, import_react, import_jsx_runtime, LoadingPrompt;
function init_LoadingPrompt$1() {
	return (init_LoadingPrompt$1 = __esmMin((() => {
		import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
		import_react = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Button(), init_ProgressLinear();
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
	})))();
}
//#endregion
//#region src/deprecated/LoadingPrompt.stories.tsx
var meta, Basic, __namedExportsOrder;
function init_LoadingPrompt_stories() {
	return (init_LoadingPrompt_stories = __esmMin((() => {
		init_LoadingPrompt$1();
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
	})))();
}
//#endregion
init_LoadingPrompt_stories();
export { Basic, __namedExportsOrder, meta as default };
