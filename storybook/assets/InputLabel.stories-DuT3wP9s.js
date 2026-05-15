import { r as reactExports, j as jsxRuntimeExports, c as classnames } from "./iframe-D6etZYKx.js";
import { J as SvgStatusWarning, K as SvgStatusSuccess, N as SvgStatusError, Q as InputStatus$1, I as Input } from "./components-react-CcAoSHHf.js";
import { I as Icon } from "./IconComponent-T2rUGpBL.js";
import { A as AppUiDecorator } from "./Decorators-DZ6kqoP-.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DxiaZ4K2.js";
import "./client-8d8O9vwT.js";
import "./appui-react-DQPnIqIU.js";
import "./index-D6OYgiXS.js";
import "./Dialog-CnMxc27J.js";
var InputStatus = /* @__PURE__ */ ((InputStatus2) => {
  InputStatus2["Success"] = "success";
  InputStatus2["Warning"] = "warning";
  InputStatus2["Error"] = "error";
  return InputStatus2;
})(InputStatus || {});
const inputLabelIconSpec = {
  [InputStatus.Error]: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgStatusError, {}),
  [InputStatus.Success]: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgStatusSuccess, {}),
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
          label && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: classnames("uicore-label", labelClassName),
              style: labelStyle,
              children: label
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
InputLabel.__docgenInfo = { "description": "Text input wrapper that provides additional styling and labeling\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/input iTwinUI input} instead.", "methods": [], "displayName": "InputLabel", "props": { "label": { "required": false, "tsType": { "name": "string" }, "description": "Text that will be shown next to or above the input." }, "status": { "required": false, "tsType": { "name": "InputStatus" }, "description": 'Input status like: "Success", "Warning" or "Error"' }, "inputClassName": { "required": false, "tsType": { "name": "string" }, "description": "Custom CSS class name for the checkbox input element" }, "inputStyle": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS Style for the checkbox input element" }, "labelClassName": { "required": false, "tsType": { "name": "string" }, "description": "Custom CSS class name for the label" }, "labelStyle": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS Style for the label" }, "message": { "required": false, "tsType": { "name": "string" }, "description": "Optional text shown below the input." }, "messageClassName": { "required": false, "tsType": { "name": "string" }, "description": "Custom CSS class name for the message" }, "messageStyle": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS Style for the message" }, "className": { "required": false, "tsType": { "name": "string" }, "description": "Custom CSS class name" }, "style": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS style properties" }, "itemId": { "required": false, "tsType": { "name": "string" }, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" }, "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Labeled content" } } };
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
    ...Basic.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    label: "Label",\n    status: InputStatus.Success,\n    children: <Input />\n  }\n}',
      ...Basic.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
