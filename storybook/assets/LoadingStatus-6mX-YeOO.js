import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
import { c as cx } from "./SvgCloseSmall-QhdYiNU4.js";
import { r as reactExports } from "./index-R26Bfrts.js";
const _LoadingStatus = class _LoadingStatus extends reactExports.PureComponent {
  // sanity check to keep percentage between 0 & 100
  inRange(percent) {
    let value = Math.min(percent, 100);
    value = Math.max(value, 0);
    return value;
  }
  render() {
    const percent = `${this.inRange(this.props.percent)}%`;
    const containerClass = cx(
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
LoadingStatus.__docgenInfo = { "description": "A loading indicator that shows status text along with the percentage.\n@public\n@deprecated in 4.12.0. Use labeled {@link https://itwinui.bentley.com/docs/progressindicator iTwinUI progress indicator} instead.", "methods": [], "displayName": "LoadingStatus", "props": { "message": { "required": false, "tsType": { "name": "string" }, "description": "Message (text) displayed", "defaultValue": { "value": '""', "computed": false } }, "percent": { "required": false, "tsType": { "name": "number" }, "description": "Percent displayed (as text)", "defaultValue": { "value": "0", "computed": false } } }, "composes": ["CommonProps"] };
export {
  LoadingStatus as L
};
