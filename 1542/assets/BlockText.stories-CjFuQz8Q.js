import { A as AppUiDecorator } from "./Decorators-u4oHvOsN.js";
import { j as jsxRuntimeExports } from "./iframe-CiskuaAf.js";
import { S as StyledText } from "./StyledText-B1hLa8Cw.js";
import "./appui-react-CRF-9igQ.js";
import "./Key.enum-DEi28OI6.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-DpXMbJf5.js";
import "./index-CkgzJ0FA.js";
function BlockText(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StyledText, { ...props, mainClassName: "uicore-text-block" });
}
BlockText.__docgenInfo = { "description": "Styled block text React functional component\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/typography#text iTwinUI Text} instead.", "methods": [], "displayName": "BlockText", "props": { "className": { "required": false, "tsType": { "name": "string" }, "description": "Custom CSS class name" }, "style": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS style properties" }, "itemId": { "required": false, "tsType": { "name": "string" }, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id" } } };
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
