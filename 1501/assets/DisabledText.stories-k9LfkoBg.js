import { A as AppUiDecorator } from "./Decorators-D8CF4g__.js";
import { j as jsxRuntimeExports } from "./iframe-A-daL9dH.js";
import { S as StyledText } from "./StyledText-BVx6bTBb.js";
import "./appui-react-DFr32jNI.js";
import "./Key.enum-CiB4OVGn.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-BinWtdfJ.js";
import "./index-Cv1bF3Cl.js";
function DisabledText(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StyledText, { ...props, mainClassName: "uicore-text-disabled" });
}
DisabledText.__docgenInfo = { "description": "Styled disabled text React functional component\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/typography#text iTwinUI Text} instead.", "methods": [], "displayName": "DisabledText" };
const meta = {
  title: "Deprecated/DisabledText",
  component: DisabledText,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {
  args: {
    children: "This is a disabled text"
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...Basic.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    children: "This is a disabled text"\n  }\n}',
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
