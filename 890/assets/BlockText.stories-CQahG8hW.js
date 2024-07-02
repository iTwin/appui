var _a, _b, _c;
import { A as AppUiDecorator } from "./Decorators-DcOwcMQU.js";
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { S as StyledText } from "./StyledText-D9XNUIRK.js";
import "./index-DM9bPmif.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./DefaultToolSettingsProvider-CLwhashG.js";
import "./Key.enum-B7uESc6p.js";
import "./iframe-C9wXFbML.js";
import "../sb-preview/runtime.js";
import "./index-EDRsojbr.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-B47T7vRo.js";
function BlockText(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StyledText, { ...props, mainClassName: "uicore-text-block" });
}
try {
  BlockText.displayName = "BlockText";
  BlockText.__docgenInfo = { "description": "Styled block text React functional component", "displayName": "BlockText", "props": { "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
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
