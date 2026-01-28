import { C as Calculator } from "./appui-react-nOGh2M21.js";
import { A as AppUiDecorator } from "./Decorators-D0L63dT9.js";
import "./iframe-BTOKt8sb.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DdwJ-Wkg.js";
import "./client-BuoZTSzj.js";
import "./index-C8w0C_Xr.js";
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
