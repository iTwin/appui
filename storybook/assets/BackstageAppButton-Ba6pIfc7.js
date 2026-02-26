import { G as useTranslation, U as UiFramework, H as Icon, J as Surface } from "./appui-react-CEufDDhs.js";
import { r as reactExports, I as IconButton } from "./iframe-BENp4d1r.js";
const SvgHome = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M2 14.6s0 .4.3.4H7v-4h2v4h4.5c.5 0 .5-.4.5-.4V8.5L8 4 2 8.5zm12-9.3V2h-2v1.8L8 1 0 6.7 1 8l7-5 7 5 1-1.3z" })
  );
};
function BackstageAppButton({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  icon: iconSpec,
  iconNode,
  label,
  execute
}) {
  const { translate } = useTranslation();
  label = label ?? translate("buttons.openBackstageMenu");
  const handleClick = reactExports.useCallback(() => {
    if (execute) {
      execute();
      return;
    }
    UiFramework.backstage.toggle();
  }, [execute]);
  const iconSpecElement = iconSpec ? (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    reactExports.createElement(Icon, { iconSpec })
  ) : void 0;
  const icon = iconNode ?? iconSpecElement ?? reactExports.createElement(SvgHome, null);
  return reactExports.createElement(
    Surface,
    { orientation: "horizontal" },
    reactExports.createElement(
      IconButton,
      { className: "uifw-widget-backstageAppButton", styleType: "borderless", onClick: handleClick, iconProps: { className: "uifw-widget-backstageAppButton_icon" }, label, labelProps: {
        placement: "right",
        className: "uifw-widget-backstageAppButton_label"
      } },
      icon,
      reactExports.createElement(
        "div",
        { className: "uifw-widget-backstageAppButton_bars" },
        reactExports.createElement("div", { className: "uifw-bar" }),
        reactExports.createElement("div", { className: "uifw-bar" }),
        reactExports.createElement("div", { className: "uifw-bar" })
      )
    )
  );
}
export {
  BackstageAppButton as B
};
