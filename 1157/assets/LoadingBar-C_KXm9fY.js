import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { c as classnames } from "./Dialog-9BWhrN4d.js";
import { r as reactExports } from "./index-DDLqOySG.js";
const _LoadingBar = class _LoadingBar extends reactExports.PureComponent {
  render() {
    const percent = `${percentInRange(this.props.percent)}%`;
    const containerClass = classnames(this.props.className, "core-lb");
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: containerClass, style: this.props.style, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lb-container", style: { height: this.props.barHeight }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fill", style: { width: percent } }) }),
      this.props.showPercentage && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "percent", children: percent })
    ] });
  }
};
_LoadingBar.defaultProps = {
  barHeight: 4
};
let LoadingBar = _LoadingBar;
function percentInRange(percent) {
  let value = Math.min(percent, 100);
  value = Math.max(value, 0);
  return value;
}
LoadingBar.__docgenInfo = { "description": "A loading bar with optional percentage text.\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/progressindicator#progress-linear iTwinUI progress indicator} instead.", "methods": [], "displayName": "LoadingBar", "props": { "percent": { "required": true, "tsType": { "name": "number" }, "description": "Percent" }, "showPercentage": { "required": false, "tsType": { "name": "boolean" }, "description": "Show percentage (optional)" }, "barHeight": { "required": false, "tsType": { "name": "number" }, "description": "Height (in pixels) of the loading bar", "defaultValue": { "value": "4", "computed": false } } }, "composes": ["CommonProps"] };
export {
  LoadingBar as L
};