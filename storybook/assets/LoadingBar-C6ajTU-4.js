import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { qt as require_classnames } from "./iframe-DrBiZGmV.js";
//#region ../../ui/core-react/src/core-react/loading/LoadingBar.scss
var init_LoadingBar$1 = __esmMin((() => {}));
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
var init_LoadingBar = __esmMin((() => {
	init_LoadingBar$1();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	import_jsx_runtime = require_jsx_runtime();
	LoadingBar = class extends import_react.PureComponent {
		static defaultProps = { barHeight: 4 };
		render() {
			const percent = `${percentInRange(this.props.percent)}%`;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: (0, import_classnames.default)(this.props.className, "core-lb"),
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
}));
//#endregion
export { init_LoadingBar as n, LoadingBar as t };
