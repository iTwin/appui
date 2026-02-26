import { r as reactExports, j as jsxRuntimeExports, c as classnames } from "./iframe-MZ9GDAUV.js";
import { a_ as SvgStatusWarning, a$ as SvgStatusSuccess, b0 as SvgStatusError, b1 as InputStatus$1, X as Input } from "./appui-react-CxqBCL1K.js";
import { I as Icon } from "./IconComponent-DKWxpRRL.js";
import { A as AppUiDecorator } from "./Decorators-ByA6YP1P.js";
import "./Key.enum-BlUwKc_n.js";
import "./client-CdcWlIUh.js";
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
InputLabel.__docgenInfo = { "description": "Text input wrapper that provides additional styling and labeling\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/input iTwinUI input} instead.", "methods": [], "displayName": "InputLabel", "props": { "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" }, "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Labeled content" } }, "composes": ["LabeledComponentProps", "MessagedComponentProps", "CommonProps"] };
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
