import { a as __toESM, n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { jt as require_classnames } from "./SvgCloseSmall-D4ZjyCAN.js";
//#endregion
//#region ../../ui/core-react/src/core-react/loading/LoadingStatus.tsx
var import_classnames, import_react, import_jsx_runtime, LoadingStatus;
function init_LoadingStatus$1() {
	return (init_LoadingStatus$1 = __esmMin((() => {
		import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
		import_react = /* @__PURE__ */ __toESM(require_react(), 1);
		import_jsx_runtime = require_jsx_runtime();
		LoadingStatus = class extends import_react.PureComponent {
			static defaultProps = {
				message: "",
				percent: 0
			};
			inRange(percent) {
				let value = Math.min(percent, 100);
				value = Math.max(value, 0);
				return value;
			}
			render() {
				const percent = `${this.inRange(this.props.percent)}%`;
				const containerClass = (0, import_classnames.default)(this.props.className, "loading-status-container");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: containerClass,
					style: this.props.style,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "loading-status-message",
						children: this.props.message
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "loading-status-percent",
						children: percent
					})]
				});
			}
		};
		LoadingStatus.__docgenInfo = {
			"description": "A loading indicator that shows status text along with the percentage.\n@public\n@deprecated in 4.12.0. Use labeled {@link https://itwinui.bentley.com/docs/progressindicator iTwinUI progress indicator} instead.",
			"methods": [],
			"displayName": "LoadingStatus",
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
				"message": {
					"required": false,
					"tsType": { "name": "string" },
					"description": "Message (text) displayed",
					"defaultValue": {
						"value": "\"\"",
						"computed": false
					}
				},
				"percent": {
					"required": false,
					"tsType": { "name": "number" },
					"description": "Percent displayed (as text)",
					"defaultValue": {
						"value": "0",
						"computed": false
					}
				}
			}
		};
	})))();
}
//#endregion
export { init_LoadingStatus$1 as n, LoadingStatus as t };
