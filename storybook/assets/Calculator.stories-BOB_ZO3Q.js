import { C as Calculator } from "./appui-react-Cz4Q9cY4.js";
import { A as AppUiDecorator } from "./Decorators-dFT355_j.js";
import "./iframe-BMMt6Qh8.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DpqfsKm8.js";
import "./client-BZ3qZmlJ.js";
import "./index-B0PW13ef.js";
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
