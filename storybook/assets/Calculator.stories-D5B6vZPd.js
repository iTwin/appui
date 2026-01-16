import { C as Calculator } from "./appui-react-C_1Z-tb4.js";
import { A as AppUiDecorator } from "./Decorators-CLX66_jE.js";
import "./iframe-Bw_N4eUI.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-D-1rx8MU.js";
import "./client-CKwtnCjo.js";
import "./index-Btv7an_F.js";
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
