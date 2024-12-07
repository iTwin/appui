import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { r as reactExports } from "./index-DDLqOySG.js";
import { d as ProgressRadial } from "./Dialog-B2XlJZNt.js";
const _LoadingSpinner = class _LoadingSpinner extends reactExports.PureComponent {
  render() {
    const { message, messageOnTop, size, ...rest } = this.props;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "core-ls", children: [
      message && messageOnTop && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ls-message-top", children: message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressRadial, { size, ...rest, indeterminate: true }),
      message && !messageOnTop && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ls-message-bottom", children: message })
    ] });
  }
};
_LoadingSpinner.defaultProps = {
  messageOnTop: false
};
let LoadingSpinner = _LoadingSpinner;
LoadingSpinner.__docgenInfo = { "description": "A loading spinner component that optionally shows a text message.\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/progressindicator#progress-radial iTwinUI progress indicator} instead.", "methods": [], "displayName": "LoadingSpinner", "props": { "message": { "required": false, "tsType": { "name": "string" }, "description": "Message (text) displayed" }, "messageOnTop": { "required": false, "tsType": { "name": "boolean" }, "description": "Position the message above or below the spinner (defaults to bottom)", "defaultValue": { "value": "false", "computed": false } }, "size": { "required": false, "tsType": { "name": 'ReactComponentPropsWithoutRef["size"]', "raw": 'ProgressRadialProps["size"]' }, "description": "Size of the progress indicator. Defaults to medium size.\n@default ''" } }, "composes": ["Omit"] };
export {
  LoadingSpinner as L
};
