var _a, _b, _c;
import { a as Calculator } from "./appui-react-BkfSqS8X.js";
import { a as action } from "./index-6lyHBX71.js";
import { A as AppUiDecorator } from "./Decorators-B6cHw9Aj.js";
import "./index-DVOlmhHI.js";
import "./Dialog-DgXpX9Dj.js";
import "./SvgCloseSmall-XFYEkVPL.js";
import "./index-C8SlDwFz.js";
import "./index-CdGyBOBZ.js";
import "./iframe-C1WTrjKK.js";
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
