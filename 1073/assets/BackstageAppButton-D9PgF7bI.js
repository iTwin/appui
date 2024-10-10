import { r as reactExports } from "./index-DDLqOySG.js";
import { c as classnames } from "./Dialog-CbndJo45.js";
import { aF as ToolbarIcon, aG as useTranslation, aH as useWidgetOpacityContext, U as UiFramework, aI as ProcessDetector, j as Icon } from "./appui-react-CPNs2Zzo.js";
const SvgHome = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M2 14.6s0 .4.3.4H7v-4h2v4h4.5c.5 0 .5-.4.5-.4V8.5L8 4 2 8.5zm12-9.3V2h-2v1.8L8 1 0 6.7 1 8l7-5 7 5 1-1.3z" })
  );
};
class AppButton extends reactExports.PureComponent {
  render() {
    const { className, small, ...props } = this.props;
    const buttonClassName = small ? classnames("nz-toolbar-button-app-small", className) : classnames("nz-toolbar-button-app", className);
    return reactExports.createElement(
      ToolbarIcon,
      { className: buttonClassName, icon: this.props.icon, small: !!small, ...props },
      reactExports.createElement(
        "div",
        { className: "nz-bars" },
        reactExports.createElement("div", { className: "nz-bar" }),
        reactExports.createElement("div", { className: "nz-bar" }),
        reactExports.createElement("div", { className: "nz-bar" })
      )
    );
  }
}
function BackstageAppButton({
  // eslint-disable-next-line deprecation/deprecation
  icon,
  iconNode,
  label,
  execute
}) {
  const { translate } = useTranslation();
  label = label ?? translate("commands.openBackstage");
  const isInitialMount = reactExports.useRef(true);
  const { onElementRef, proximityScale } = useWidgetOpacityContext();
  const ref = reactExports.useRef(null);
  const handleClick = reactExports.useCallback(() => {
    if (execute) {
      execute();
      return;
    }
    UiFramework.backstage.toggle();
  }, [execute]);
  reactExports.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      onElementRef(ref);
    }
  }, [onElementRef]);
  let buttonProximityScale;
  if ((UiFramework.visibility.useProximityOpacity || // eslint-disable-line deprecation/deprecation
  UiFramework.visibility.snapWidgetOpacity) && !ProcessDetector.isMobileBrowser) {
    buttonProximityScale = proximityScale;
  }
  const specIcon = icon ? reactExports.createElement(Icon, { iconSpec: icon }) : void 0;
  return reactExports.createElement(
    "div",
    { ref, className: "uifw-app-button-small" },
    reactExports.createElement(AppButton, { small: true, mouseProximity: buttonProximityScale, onClick: handleClick, icon: iconNode ?? specIcon ?? reactExports.createElement(SvgHome, null), title: label })
  );
}
export {
  BackstageAppButton as B
};
