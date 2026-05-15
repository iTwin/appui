import { A as AppUiDecorator } from "./Decorators-DZ6kqoP-.js";
import { j as jsxRuntimeExports } from "./iframe-D6etZYKx.js";
import { S as StyledText } from "./StyledText-DIY1uZxO.js";
import "./appui-react-DQPnIqIU.js";
import "./Key.enum-DxiaZ4K2.js";
import "./components-react-CcAoSHHf.js";
import "./client-8d8O9vwT.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-D6OYgiXS.js";
import "./Dialog-CnMxc27J.js";
function DisabledText(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StyledText, { ...props, mainClassName: "uicore-text-disabled" });
}
DisabledText.__docgenInfo = { "description": "Styled disabled text React functional component\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/typography#text iTwinUI Text} instead.", "methods": [], "displayName": "DisabledText", "props": { "className": { "required": false, "tsType": { "name": "string" }, "description": "Custom CSS class name" }, "style": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS style properties" }, "itemId": { "required": false, "tsType": { "name": "string" }, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id" } } };
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
