import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import { P as ProgressRadial } from "./Key.enum-BpJjJDFT.js";
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
try {
  LoadingSpinner.displayName = "LoadingSpinner";
  LoadingSpinner.__docgenInfo = { "description": "A loading spinner component that optionally shows a text message.", "displayName": "LoadingSpinner", "props": { "message": { "defaultValue": null, "description": "Message (text) displayed", "name": "message", "required": false, "type": { "name": "string" } }, "messageOnTop": { "defaultValue": { value: "false" }, "description": "Position the message above or below the spinner (defaults to bottom)", "name": "messageOnTop", "required": false, "type": { "name": "boolean" } }, "size": { "defaultValue": { value: "''" }, "description": "Size of the progress indicator. Defaults to medium size.", "name": "size", "required": false, "type": { "name": "enum", "value": [{ "value": '""' }, { "value": '"small"' }, { "value": '"x-small"' }, { "value": '"large"' }] } }, "value": { "defaultValue": null, "description": "Progress percentage. Should be a number between 0 and 100.", "name": "value", "required": false, "type": { "name": "number" } }, "status": { "defaultValue": null, "description": "Status of Progress. Positive status always has 100% value.", "name": "status", "required": false, "type": { "name": "enum", "value": [{ "value": '"positive"' }, { "value": '"negative"' }, { "value": '"warning"' }] } }, "children": { "defaultValue": null, "description": "Content shown inside progress indicator.", "name": "children", "required": false, "type": { "name": "ReactNode" } }, "as": { "defaultValue": null, "description": "", "name": "as", "required": false, "type": { "name": "enum", "value": [{ "value": '"div"' }] } }, "indeterminate": { "defaultValue": { value: "false if value is provided, true otherwise" }, "description": "Progress variant. If true, value will be ignored.", "name": "indeterminate", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
export {
  LoadingSpinner as L
};
