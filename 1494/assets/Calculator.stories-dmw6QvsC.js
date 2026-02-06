import { C as Calculator } from "./appui-react-DXkFctUx.js";
import { A as AppUiDecorator } from "./Decorators-BplH5p6g.js";
import "./iframe-BmX5H014.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DvCHltQ0.js";
import "./client-M2bM1T3-.js";
import "./index-D95LU0cB.js";
const { action } = __STORYBOOK_MODULE_ACTIONS__;
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
    ...Default.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    engine: undefined!,\n    // set via defaultProps\n    onOk: action("onOk"),\n    onCancel: action("onCancel")\n  }\n}',
      ...Default.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Default"];
export {
  Default,
  __namedExportsOrder,
  meta as default
};
