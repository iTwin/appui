import { r as reactExports, j as jsxRuntimeExports, c as classnames } from "./iframe-MZ9GDAUV.js";
import { L as LoadingBar } from "./LoadingBar-CMjO7AV_.js";
import { L as LoadingSpinner } from "./LoadingSpinner-DHV2tGAO.js";
import { L as LoadingStatus } from "./LoadingStatus-BK8I6lCb.js";
import { b2 as ProgressLinear } from "./appui-react-CxqBCL1K.js";
import { B as Button } from "./Key.enum-BlUwKc_n.js";
import { A as AppUiDecorator } from "./Decorators-ByA6YP1P.js";
import "./client-CdcWlIUh.js";
class LoadingPrompt extends reactExports.PureComponent {
  static defaultProps = {
    showPercentage: false,
    showStatus: false,
    showCancel: false,
    isDeterminate: false,
    showIndeterminateBar: false,
    percent: 0,
    status: ""
  };
  render() {
    const isDeterminate = this.props.isDeterminate;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: classnames("core-loadingprompt", this.props.className),
        style: this.props.style,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "title", children: this.props.title }),
          this.props.message && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "message", children: this.props.message }),
          isDeterminate && /* @__PURE__ */ jsxRuntimeExports.jsx(
            LoadingBar,
            {
              style: { width: "100%" },
              percent: this.props.percent,
              showPercentage: this.props.showPercentage
            }
          ),
          isDeterminate && this.props.showStatus && /* @__PURE__ */ jsxRuntimeExports.jsx(
            LoadingStatus,
            {
              style: { marginTop: ".5em", width: "100%", fontSize: ".75em" },
              percent: this.props.percent,
              message: this.props.status
            }
          ),
          !isDeterminate && (this.props.showIndeterminateBar ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressLinear, { indeterminate: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {})),
          this.props.showCancel && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "loading-prompt-cancel",
              onClick: this.props.onCancel,
              children: "Cancel"
            }
          )
        ]
      }
    );
  }
}
LoadingPrompt.__docgenInfo = { "description": "A component to display during loading that optionally shows percentage, status text and a cancel button.\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/progressindicator iTwinUI progress indicator} instead.", "methods": [], "displayName": "LoadingPrompt", "props": { "title": { "required": true, "tsType": { "name": "string" }, "description": "Title" }, "message": { "required": false, "tsType": { "name": "string" }, "description": "Message displayed below the title (optional)" }, "isDeterminate": { "required": false, "tsType": { "name": "boolean" }, "description": "Determine if a percentage bar is displayed (isDeterminate=true), otherwise a loading spinner or indeterminate progress bar is shown.", "defaultValue": { "value": "false", "computed": false } }, "showStatus": { "required": false, "tsType": { "name": "boolean" }, "description": "Show current status and percentage. Default is false (not shown)", "defaultValue": { "value": "false", "computed": false } }, "showCancel": { "required": false, "tsType": { "name": "boolean" }, "description": "Show cancel button. Default is false (not shown)", "defaultValue": { "value": "false", "computed": false } }, "status": { "required": false, "tsType": { "name": "string" }, "description": "Current loading status text (optional). Only shown if showStatus=true and isDeterminate=true", "defaultValue": { "value": '""', "computed": false } }, "percent": { "required": false, "tsType": { "name": "number" }, "description": "Current percentage.  Only used if isDeterminate=true", "defaultValue": { "value": "0", "computed": false } }, "showPercentage": { "required": false, "tsType": { "name": "boolean" }, "description": "Show percentage at the end of the loading bar (optional). Only shown if isDeterminate=true and showStatus=false", "defaultValue": { "value": "false", "computed": false } }, "showIndeterminateBar": { "required": false, "tsType": { "name": "boolean" }, "description": "Show indeterminate progress bar instead of loading spinner", "defaultValue": { "value": "false", "computed": false } }, "onCancel": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Function called when Cancel button is clicked." } }, "composes": ["CommonProps"] };
const meta = {
  title: "Deprecated/LoadingPrompt",
  component: LoadingPrompt,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...Basic.parameters?.docs,
    source: {
      originalSource: "{}",
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
