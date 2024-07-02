import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { c as classnames } from "./Key.enum-Nky5yUvk.js";
import { r as reactExports } from "./index-DM9bPmif.js";
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
try {
  percentInRange.displayName = "percentInRange";
  percentInRange.__docgenInfo = { "description": "Sanity check to keep percentage between 0 & 100", "displayName": "percentInRange", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  LoadingBar.displayName = "LoadingBar";
  LoadingBar.__docgenInfo = { "description": "A loading bar with optional percentage text.", "displayName": "LoadingBar", "props": { "percent": { "defaultValue": null, "description": "Percent", "name": "percent", "required": true, "type": { "name": "number" } }, "showPercentage": { "defaultValue": null, "description": "Show percentage (optional)", "name": "showPercentage", "required": false, "type": { "name": "boolean" } }, "barHeight": { "defaultValue": { value: "4" }, "description": "Height (in pixels) of the loading bar", "name": "barHeight", "required": false, "type": { "name": "number" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
export {
  LoadingBar as L
};
