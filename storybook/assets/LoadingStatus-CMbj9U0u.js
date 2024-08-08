import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { c as classnames } from "./Key.enum-BB2gw-WQ.js";
import { r as reactExports } from "./index-DM9bPmif.js";
const _LoadingStatus = class _LoadingStatus extends reactExports.PureComponent {
  // sanity check to keep percentage between 0 & 100
  inRange(percent) {
    let value = Math.min(percent, 100);
    value = Math.max(value, 0);
    return value;
  }
  render() {
    const percent = `${this.inRange(this.props.percent)}%`;
    const containerClass = classnames(
      this.props.className,
      "loading-status-container"
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: containerClass, style: this.props.style, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "loading-status-message", children: this.props.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "loading-status-percent", children: percent })
    ] });
  }
};
_LoadingStatus.defaultProps = {
  message: "",
  percent: 0
};
let LoadingStatus = _LoadingStatus;
try {
  LoadingStatus.displayName = "LoadingStatus";
  LoadingStatus.__docgenInfo = { "description": "A loading indicator that shows status text along with the percentage.", "displayName": "LoadingStatus", "props": { "message": { "defaultValue": { value: "" }, "description": "Message (text) displayed", "name": "message", "required": false, "type": { "name": "string" } }, "percent": { "defaultValue": { value: "0" }, "description": "Percent displayed (as text)", "name": "percent", "required": false, "type": { "name": "number" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
export {
  LoadingStatus as L
};
