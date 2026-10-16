import { C as Calculator } from "./appui-react-glMK-yaN.js";
import { A as AppUiDecorator } from "./Decorators-DePPLJKx.js";
import "./iframe-DNdoMX4Q.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-YmMvjtrc.js";
import "./client-7SU87-Ux.js";
import "./index-C9p5eh_j.js";
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
