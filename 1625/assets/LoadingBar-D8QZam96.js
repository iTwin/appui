import { a as __toESM, n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { jt as require_classnames } from "./SvgCloseSmall-D4ZjyCAN.js";
//#endregion
//#region ../../ui/core-react/src/core-react/loading/LoadingBar.tsx
/** Sanity check to keep percentage between 0 & 100
* @internal
*/
function percentInRange(percent) {
	let value = Math.min(percent, 100);
	value = Math.max(value, 0);
	return value;
}
var import_classnames, import_react, import_jsx_runtime, LoadingBar;
function init_LoadingBar$1() {
	return (init_LoadingBar$1 = __esmMin((() => {
		import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
		import_react = /* @__PURE__ */ __toESM(require_react(), 1);
		import_jsx_runtime = require_jsx_runtime();
		LoadingBar = class extends import_react.PureComponent {
			static defaultProps = { barHeight: 4 };
			render() {
				const percent = `${percentInRange(this.props.percent)}%`;
				const containerClass = (0, import_classnames.default)(this.props.className, "core-lb");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: containerClass,
					style: this.props.style,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lb-container",
						style: { height: this.props.barHeight },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fill",
							style: { width: percent }
						})
					}), this.props.showPercentage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "percent",
						children: percent
					})]
				});
			}
		};
		LoadingBar.__docgenInfo = {
			"description": "A loading bar with optional percentage text.\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/progressindicator#progress-linear iTwinUI progress indicator} instead.",
			"methods": [],
			"displayName": "LoadingBar",
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
				"percent": {
					"required": true,
					"tsType": { "name": "number" },
					"description": "Percent"
				},
				"showPercentage": {
					"required": false,
					"tsType": { "name": "boolean" },
					"description": "Show percentage (optional)"
				},
				"barHeight": {
					"required": false,
					"tsType": { "name": "number" },
					"description": "Height (in pixels) of the loading bar",
					"defaultValue": {
						"value": "4",
						"computed": false
					}
				}
			}
		};
	})))();
}
//#endregion
export { init_LoadingBar$1 as n, LoadingBar as t };
