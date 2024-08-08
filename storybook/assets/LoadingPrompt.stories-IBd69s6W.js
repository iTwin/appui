var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { c as classnames, B as Button } from "./Key.enum-BB2gw-WQ.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import { L as LoadingBar } from "./LoadingBar-D5pwtUDb.js";
import { L as LoadingSpinner } from "./LoadingSpinner-pqwsoQG4.js";
import { L as LoadingStatus } from "./LoadingStatus-CMbj9U0u.js";
import { aF as ProgressLinear } from "./DefaultToolSettingsProvider-B6B80iEN.js";
import { A as AppUiDecorator } from "./Decorators-CU-vvLY2.js";
import "./iframe-C1TMdbVu.js";
import "../sb-preview/runtime.js";
import "./index-EDRsojbr.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-B47T7vRo.js";
const _LoadingPrompt = class _LoadingPrompt extends reactExports.PureComponent {
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
};
_LoadingPrompt.defaultProps = {
  showPercentage: false,
  showStatus: false,
  showCancel: false,
  isDeterminate: false,
  showIndeterminateBar: false,
  percent: 0,
  status: ""
};
let LoadingPrompt = _LoadingPrompt;
try {
  LoadingPrompt.displayName = "LoadingPrompt";
  LoadingPrompt.__docgenInfo = { "description": "A component to display during loading that optionally shows percentage, status text and a cancel button.", "displayName": "LoadingPrompt", "props": { "title": { "defaultValue": null, "description": "Title", "name": "title", "required": true, "type": { "name": "string" } }, "message": { "defaultValue": null, "description": "Message displayed below the title (optional)", "name": "message", "required": false, "type": { "name": "string" } }, "isDeterminate": { "defaultValue": { value: "false" }, "description": "Determine if a percentage bar is displayed (isDeterminate=true), otherwise a loading spinner or indeterminate progress bar is shown.", "name": "isDeterminate", "required": false, "type": { "name": "boolean" } }, "showStatus": { "defaultValue": { value: "false" }, "description": "Show current status and percentage. Default is false (not shown)", "name": "showStatus", "required": false, "type": { "name": "boolean" } }, "showCancel": { "defaultValue": { value: "false" }, "description": "Show cancel button. Default is false (not shown)", "name": "showCancel", "required": false, "type": { "name": "boolean" } }, "status": { "defaultValue": { value: "" }, "description": "Current loading status text (optional). Only shown if showStatus=true and isDeterminate=true", "name": "status", "required": false, "type": { "name": "string" } }, "percent": { "defaultValue": { value: "0" }, "description": "Current percentage.  Only used if isDeterminate=true", "name": "percent", "required": false, "type": { "name": "number" } }, "showPercentage": { "defaultValue": { value: "false" }, "description": "Show percentage at the end of the loading bar (optional). Only shown if isDeterminate=true and showStatus=false", "name": "showPercentage", "required": false, "type": { "name": "boolean" } }, "showIndeterminateBar": { "defaultValue": { value: "false" }, "description": "Show indeterminate progress bar instead of loading spinner", "name": "showIndeterminateBar", "required": false, "type": { "name": "boolean" } }, "onCancel": { "defaultValue": null, "description": "Function called when Cancel button is clicked.", "name": "onCancel", "required": false, "type": { "name": "(() => void)" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
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
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
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
