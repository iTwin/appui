import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { c as classnames } from "./Key.enum-BB2gw-WQ.js";
function StyledText(props) {
  const { mainClassName, className, style, children, ...spanProps } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      ...spanProps,
      className: classnames(mainClassName, className),
      style,
      children
    }
  );
}
try {
  StyledText.displayName = "StyledText";
  StyledText.__docgenInfo = { "description": "The base component for other text components that pass a main CSS class name.", "displayName": "StyledText", "props": { "mainClassName": { "defaultValue": null, "description": "Main CSS class name", "name": "mainClassName", "required": true, "type": { "name": "string" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
export {
  StyledText as S
};
