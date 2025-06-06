var _a, _b, _c;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { r as reactExports } from "./index-DVOlmhHI.js";
import { aU as SvgStatusWarning, aV as SvgStatusSuccess, aW as SvgStatusError, aX as InputStatus$1, _ as Input } from "./appui-react-BkfSqS8X.js";
import { c as cx } from "./SvgCloseSmall-XFYEkVPL.js";
import { I as Icon } from "./IconComponent-NLdOCJVO.js";
import { A as AppUiDecorator } from "./Decorators-B6cHw9Aj.js";
import "./index-CdGyBOBZ.js";
import "./Dialog-DgXpX9Dj.js";
import "./iframe-C1WTrjKK.js";
import "./client-DmvY241V.js";
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
        className: cx(
          "uicore-inputs-labeled-input",
          this.props.disabled && "uicore-disabled",
          status,
          className
        ),
        children: [
          label && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cx("uicore-label", labelClassName),
              style: labelStyle,
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cx("input", { "with-icon": !!status }), children: [
            this.props.children,
            status && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "icon", iconSpec: inputLabelIconSpec[`{status}`] })
          ] }),
          message && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cx("uicore-message", messageClassName),
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
