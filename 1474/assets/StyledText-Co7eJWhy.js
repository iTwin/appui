import { j as jsxRuntimeExports, c as classnames } from "./iframe-MZ9GDAUV.js";
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
StyledText.__docgenInfo = { "description": "The base component for other text components that pass a main CSS class name.\n@public\n@deprecated in 4.0.0. Use \\<Text /\\> component from iTwinUI-react library.", "methods": [], "displayName": "StyledText", "props": { "mainClassName": { "required": true, "tsType": { "name": "string" }, "description": "Main CSS class name" } }, "composes": ["TextProps"] };
export {
  StyledText as S
};
