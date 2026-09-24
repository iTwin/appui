import { r as reactExports, c as classnames, j as jsxRuntimeExports } from "./iframe-DNdoMX4Q.js";
class LoadingBar extends reactExports.PureComponent {
  static defaultProps = {
    barHeight: 4
  };
  render() {
    const percent = `${percentInRange(this.props.percent)}%`;
    const containerClass = classnames(this.props.className, "core-lb");
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: containerClass, style: this.props.style, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lb-container", style: { height: this.props.barHeight }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fill", style: { width: percent } }) }),
      this.props.showPercentage && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "percent", children: percent })
    ] });
  }
}
function percentInRange(percent) {
  let value = Math.min(percent, 100);
  value = Math.max(value, 0);
  return value;
}
LoadingBar.__docgenInfo = { "description": "A loading bar with optional percentage text.\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/progressindicator#progress-linear iTwinUI progress indicator} instead.", "methods": [], "displayName": "LoadingBar", "props": { "percent": { "required": true, "tsType": { "name": "number" }, "description": "Percent" }, "showPercentage": { "required": false, "tsType": { "name": "boolean" }, "description": "Show percentage (optional)" }, "barHeight": { "required": false, "tsType": { "name": "number" }, "description": "Height (in pixels) of the loading bar", "defaultValue": { "value": "4", "computed": false } } }, "composes": ["CommonProps"] };
export {
  LoadingBar as L
};
