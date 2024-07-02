var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import { am as SvgStatusError, an as SvgStatusSuccess, ao as SvgStatusWarning, ap as InputStatus$1, h as Input } from "./DefaultToolSettingsProvider-DIShliKp.js";
import { c as classnames } from "./Key.enum-BpJjJDFT.js";
import { I as Icon } from "./IconComponent-B0G3fWXo.js";
import { A as AppUiDecorator } from "./Decorators-CzmLt7AA.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./index-EDRsojbr.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./iframe-pWcJHFO-.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
var InputStatus = /* @__PURE__ */ ((InputStatus2) => {
  InputStatus2["Success"] = "success";
  InputStatus2["Warning"] = "warning";
  InputStatus2["Error"] = "error";
  return InputStatus2;
})(InputStatus || {});
const inputLabelIconSpec = {
  // eslint-disable-next-line deprecation/deprecation
  [InputStatus.Error]: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgStatusError, {}),
  // eslint-disable-next-line deprecation/deprecation
  [InputStatus.Success]: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgStatusSuccess, {}),
  // eslint-disable-next-line deprecation/deprecation
  [InputStatus.Warning]: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgStatusWarning, {})
};
class InputLabel extends reactExports.PureComponent {
  render() {
    const {
      label,
      status,
      className,
      style,
      labelClassName,
      labelStyle,
      message,
      messageClassName,
      messageStyle
    } = this.props;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        style,
        className: classnames(
          "uicore-inputs-labeled-input",
          this.props.disabled && "uicore-disabled",
          status,
          className
        ),
        children: [
          label && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: classnames("uicore-label", labelClassName),
              style: labelStyle,
              children: [
                " ",
                label,
                " "
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: classnames("input", { "with-icon": !!status }), children: [
            this.props.children,
            status && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "icon", iconSpec: inputLabelIconSpec[`{status}`] })
          ] }),
          message && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: classnames("uicore-message", messageClassName),
              style: messageStyle,
              children: message
            }
          )
        ]
      }
    );
  }
}
try {
  InputLabel.displayName = "InputLabel";
  InputLabel.__docgenInfo = { "description": "Text input wrapper that provides additional styling and labeling", "displayName": "InputLabel", "props": { "disabled": { "defaultValue": null, "description": "", "name": "disabled", "required": false, "type": { "name": "boolean" } }, "children": { "defaultValue": null, "description": "Labeled content", "name": "children", "required": false, "type": { "name": "ReactNode" } }, "label": { "defaultValue": null, "description": "Text that will be shown next to or above the input.", "name": "label", "required": false, "type": { "name": "string" } }, "status": { "defaultValue": null, "description": 'Input status like: "Success", "Warning" or "Error"', "name": "status", "required": false, "type": { "name": "enum", "value": [{ "value": '"success"' }, { "value": '"warning"' }, { "value": '"error"' }] } }, "inputClassName": { "defaultValue": null, "description": "Custom CSS class name for the checkbox input element", "name": "inputClassName", "required": false, "type": { "name": "string" } }, "inputStyle": { "defaultValue": null, "description": "Custom CSS Style for the checkbox input element", "name": "inputStyle", "required": false, "type": { "name": "CSSProperties" } }, "labelClassName": { "defaultValue": null, "description": "Custom CSS class name for the label", "name": "labelClassName", "required": false, "type": { "name": "string" } }, "labelStyle": { "defaultValue": null, "description": "Custom CSS Style for the label", "name": "labelStyle", "required": false, "type": { "name": "CSSProperties" } }, "message": { "defaultValue": null, "description": "Optional text shown below the input.", "name": "message", "required": false, "type": { "name": "string" } }, "messageClassName": { "defaultValue": null, "description": "Custom CSS class name for the message", "name": "messageClassName", "required": false, "type": { "name": "string" } }, "messageStyle": { "defaultValue": null, "description": "Custom CSS Style for the message", "name": "messageStyle", "required": false, "type": { "name": "CSSProperties" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "Deprecated/InputLabel",
  component: InputLabel,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {
  args: {
    label: "Label",
    status: InputStatus$1.Success,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {})
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    label: "Label",\n    status: InputStatus.Success,\n    children: <Input />\n  }\n}',
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
