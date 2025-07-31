import { r as reactExports, B as Box, c as classnames } from "./iframe-CLuD2P-S.js";
const Divider = reactExports.forwardRef((props, ref) => {
  let { className, orientation = "horizontal", ...rest } = props;
  return reactExports.createElement(Box, {
    as: "hr",
    className: classnames("iui-divider", className),
    "aria-orientation": "vertical" === orientation ? "vertical" : void 0,
    ref,
    ...rest
  });
});
export {
  Divider as D
};
