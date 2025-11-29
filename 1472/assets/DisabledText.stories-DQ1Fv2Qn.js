import { A as AppUiDecorator } from "./Decorators-C2zB1VJp.js";
import { j as jsxRuntimeExports } from "./iframe-D8YXFxh5.js";
import { S as StyledText } from "./StyledText-CNlkEuqY.js";
import "./appui-react-B4QxuTrb.js";
import "./Key.enum-CJ9HrJPR.js";
import "./client-DooKKsJi.js";
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
