var _a, _b, _c;
import { a as Calculator } from "./DefaultToolSettingsProvider-B6B80iEN.js";
import "./Key.enum-BB2gw-WQ.js";
import "./index-DM9bPmif.js";
import "./index-EDRsojbr.js";
import { a as action } from "./chunk-WFFRPTHA-B_pzO8uN.js";
import { A as AppUiDecorator } from "./Decorators-CU-vvLY2.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./iframe-C1TMdbVu.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
import "./preview-errors-C1TokqVJ.js";
import "./index-BdOSk9or.js";
import "./jsx-runtime-D2-sc1j1.js";
const meta = {
  title: "Components/Calculator",
  component: Calculator,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Default = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    engine: void 0,
    // set via defaultProps
    onOk: action("onOk"),
    onCancel: action("onCancel")
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion\n    engine: undefined!,\n    // set via defaultProps\n    onOk: action("onOk"),\n    onCancel: action("onCancel")\n  }\n}',
      ...(_c = (_b = Default.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Default"];
export {
  Default,
  __namedExportsOrder,
  meta as default
};
