import { r as reactExports, B as Box, c as classnames } from "./iframe-qZqPc1fv.js";
const NotificationMarker = reactExports.forwardRef((props, ref) => {
  let {
    className,
    children,
    status = "primary",
    pulsing = false,
    enabled = true,
    ...rest
  } = props;
  return reactExports.createElement(
    Box,
    {
      as: "span",
      ref,
      className: classnames(
        {
          "iui-notification-marker": enabled
        },
        className
      ),
      "data-iui-variant": enabled ? status : null,
      "data-iui-urgent": enabled ? pulsing : null,
      ...rest
    },
    children
  );
});
export {
  NotificationMarker as N
};
