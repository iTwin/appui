var _a, _b, _c;
import { a as Calculator } from "./appui-react-CT2sxVtp.js";
import { a as action } from "./index-6lyHBX71.js";
import { A as AppUiDecorator } from "./Decorators-B5yidANR.js";
import "./index-DVOlmhHI.js";
import "./Dialog-BV9UAzoZ.js";
import "./SvgCloseSmall-CP75iWqY.js";
import "./index-C8SlDwFz.js";
import "./index-CdGyBOBZ.js";
import "./iframe-ynsT90Jp.js";
import "./client-DmvY241V.js";
import "./v4-CjlX8hrF.js";
const meta = {
  title: "Components/Calculator",
  component: Calculator,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Default = {
  args: {
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
      originalSource: '{\n  args: {\n    engine: undefined!,\n    // set via defaultProps\n    onOk: action("onOk"),\n    onCancel: action("onCancel")\n  }\n}',
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
