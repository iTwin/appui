import { A as AppUiDecorator } from "./Decorators-GSK_4PtH.js";
import { j as jsxRuntimeExports } from "./iframe-BBMVhVSb.js";
import { S as StyledText } from "./StyledText-DJ0CnAmW.js";
import "./appui-react-CuxmpMO6.js";
import "./Key.enum-OlB0m7Wi.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-X93GHqP6.js";
import "./index-DGG_u3yd.js";
function BlockText(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StyledText, { ...props, mainClassName: "uicore-text-block" });
}
BlockText.__docgenInfo = { "description": "Styled block text React functional component\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/typography#text iTwinUI Text} instead.", "methods": [], "displayName": "BlockText" };
const meta = {
  title: "Deprecated/BlockText",
  component: BlockText,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {
  args: {
    children: "This is a block of text"
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...Basic.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    children: "This is a block of text"\n  }\n}',
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
