var _a, _b, _c;
import { A as AppUiDecorator } from "./Decorators-C4xQSAog.js";
import { j as jsxRuntimeExports } from "./iframe-DDsloJCs.js";
import { S as StyledText } from "./StyledText-BPgPOY6K.js";
import "./appui-react-CJ4WPLAk.js";
import "./Key.enum-IWU58BJQ.js";
import "./client-DPW9UKYs.js";
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
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    children: "This is a block of text"\n  }\n}',
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
