import { j as jsxRuntimeExports, c as classnames } from "./iframe-D6etZYKx.js";
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
StyledText.__docgenInfo = { "description": "The base component for other text components that pass a main CSS class name.\n@public\n@deprecated in 4.0.0. Use \\<Text /\\> component from iTwinUI-react library.", "methods": [], "displayName": "StyledText", "props": { "className": { "required": false, "tsType": { "name": "string" }, "description": "Custom CSS class name" }, "style": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS style properties" }, "itemId": { "required": false, "tsType": { "name": "string" }, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id" }, "mainClassName": { "required": true, "tsType": { "name": "string" }, "description": "Main CSS class name" } } };
export {
  StyledText as S
};
