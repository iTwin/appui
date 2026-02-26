import { r as reactExports, j as jsxRuntimeExports, c as classnames } from "./iframe-DNdoMX4Q.js";
import { c as Dialog$1, K as Key_enumExports, b as DialogButtonType, B as Button } from "./Key.enum-YmMvjtrc.js";
import { D as DivWithOutsideClick } from "./DivWithOutsideClick-CsbLvJKx.js";
import { u as useTranslation } from "./useTranslation-CYVV2OaB.js";
class Dialog extends reactExports.Component {
  _parentDocument = document;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static defaultProps = {
    maxWidth: "100%",
    width: "50%",
    hideHeader: false,
    resizable: false,
    movable: false,
    modal: true,
    inset: true,
    trapFocus: false
  };
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(props) {
    super(props);
  }
  componentWillUnmount() {
    this._parentDocument.removeEventListener("keyup", this._handleKeyUp, true);
  }
  componentDidMount() {
    this._parentDocument.addEventListener("keyup", this._handleKeyUp, true);
  }
  handleRefSet = (containerDiv) => {
    if (containerDiv) this._parentDocument = containerDiv.ownerDocument;
  };
  render() {
    const {
      opened,
      title,
      footer,
      buttonCluster,
      onClose,
      onEscape,
      onOutsideClick,
      minWidth,
      minHeight,
      x,
      y,
      width,
      height,
      maxHeight,
      maxWidth,
      backgroundStyle,
      titleStyle,
      footerStyle,
      style,
      contentStyle,
      contentClassName,
      modal,
      resizable,
      movable,
      className,
      alignment,
      inset,
      trapFocus,
      modelessId,
      onModelessPointerDown,
      hideHeader,
      header,
      as,
      ...props
    } = this.props;
    let initialOffset = {};
    if (x || y) {
      initialOffset = {
        left: x ?? 0,
        top: y ?? 0,
        transform: "none"
      };
    }
    const containerStyle = {
      ...initialOffset,
      margin: "",
      width,
      height
    };
    const minMaxStyle = {
      minWidth,
      minHeight,
      maxWidth,
      maxHeight
    };
    const dialogBaseContainerStyle = {
      ...containerStyle,
      ...minMaxStyle
    };
    const buttons = this.getFooterButtons(
      buttonCluster,
      "high-visibility",
      true
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Dialog$1,
      {
        isOpen: opened,
        onClose,
        closeOnExternalClick: false,
        closeOnEsc: false,
        style,
        className: classnames("core-dialog", className),
        isDraggable: movable,
        isResizable: resizable,
        trapFocus: trapFocus && modal,
        preventDocumentScroll: true,
        "data-testid": "core-dialog-root",
        ...props,
        children: [
          modal && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog$1.Backdrop, { style: backgroundStyle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DivWithOutsideClick, { onOutsideClick, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Dialog$1.Main,
            {
              className: classnames(
                "core-dialog-main",
                alignment && this.getCSSClassNameFromAlignment(alignment)
              ),
              "data-testid": "core-dialog-container",
              style: dialogBaseContainerStyle,
              onPointerDown: this._handleContainerPointerDown,
              children: [
                !hideHeader && (header || /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Dialog$1.TitleBar,
                  {
                    titleText: title,
                    style: titleStyle,
                    "data-testid": "core-dialog-head"
                  }
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Dialog$1.Content,
                  {
                    className: contentClassName,
                    style: { padding: inset ? void 0 : 0, ...contentStyle },
                    children: this.props.children
                  }
                ),
                footer || buttons && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog$1.ButtonBar, { style: footerStyle, children: buttons })
              ]
            }
          ) })
        ]
      }
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  getCSSClassNameFromAlignment(alignment) {
    switch (alignment) {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      case "top-left":
        return "core-align-top-left";
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      case "top":
        return "core-align-top";
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      case "top-right":
        return "core-align-top-right";
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      case "left":
        return "core-align-left";
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      case "center":
        return "core-align-center";
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      case "right":
        return "core-align-right";
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      case "bottom-left":
        return "core-align-bottom-left";
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      case "bottom":
        return "core-align-bottom";
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      case "bottom-right":
        return "core-align-bottom-right";
    }
  }
  /** @deprecated in 4.12.0. Use iTwinUI Button instead. */
  getFooterButtons(buttonCluster, primaryStyleType = "cta", noCoreButtonClasses = false) {
    if (buttonCluster === void 0) return void 0;
    const buttons = [];
    buttonCluster.forEach((button, index) => {
      buttons.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DialogButton,
          {
            button,
            primaryStyleType,
            noCoreButtonClasses
          },
          index.toString()
        )
      );
    });
    return buttons;
  }
  _handleKeyUp = (event) => {
    if (event.key === Key_enumExports.Key.Escape.valueOf() && this.props.opened && this.props.onEscape) {
      this.props.onEscape();
    }
  };
  _handleContainerPointerDown = (event) => {
    if (!this.props.modal) {
      if (this.props.onModelessPointerDown && this.props.modelessId)
        this.props.onModelessPointerDown(event, this.props.modelessId);
    }
  };
}
function DialogButton({
  button,
  primaryStyleType,
  noCoreButtonClasses
}) {
  const { translate } = useTranslation();
  let buttonText = "";
  let buttonClass = classnames(
    !noCoreButtonClasses && "core-dialog-button",
    !noCoreButtonClasses && `dialog-button-${button.type}`,
    button.className
  );
  let usePrimaryStyleType = false;
  switch (button.type) {
    case DialogButtonType.OK:
      buttonText = translate("dialog.ok");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Retry:
      buttonText = translate("dialog.retry");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Yes:
      buttonText = translate("dialog.yes");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.No:
      buttonText = translate("dialog.no");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      break;
    case DialogButtonType.Cancel:
      buttonText = translate("dialog.cancel");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      break;
    case DialogButtonType.Close:
      buttonText = translate("dialog.close");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      break;
    case DialogButtonType.Next:
      buttonText = translate("dialog.next");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Previous:
      buttonText = translate("dialog.previous");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
  }
  buttonText = button.label || buttonText;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      className: buttonClass,
      disabled: button.disabled,
      styleType: usePrimaryStyleType ? primaryStyleType : void 0,
      onClick: button.onClick,
      children: buttonText
    }
  );
}
Dialog.__docgenInfo = { "description": "Dialog React component with optional resizing and dragging functionality\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/dialog iTwinUI dialog} instead.", "methods": [{ "name": "handleRefSet", "docblock": null, "modifiers": [], "params": [{ "name": "containerDiv", "optional": false, "type": { "name": "union", "raw": "HTMLDivElement | null", "elements": [{ "name": "HTMLDivElement" }, { "name": "null" }] } }], "returns": null }, { "name": "getFooterButtons", "docblock": "@deprecated in 4.12.0. Use iTwinUI Button instead.", "modifiers": [], "params": [{ "name": "buttonCluster", "optional": false, "type": { "name": "union", "raw": "DialogButtonDef[] | undefined", "elements": [{ "name": "Array", "elements": [{ "name": "DialogButtonDef" }], "raw": "DialogButtonDef[]" }, { "name": "undefined" }] } }, { "name": "primaryStyleType", "optional": true }, { "name": "noCoreButtonClasses", "optional": true }], "returns": { "type": { "name": "union", "raw": "React.ReactNode[] | undefined", "elements": [{ "name": "Array", "elements": [{ "name": "ReactReactNode", "raw": "React.ReactNode" }], "raw": "React.ReactNode[]" }, { "name": "undefined" }] } }, "description": null }, { "name": "_handleContainerPointerDown", "docblock": null, "modifiers": [], "params": [{ "name": "event", "optional": false, "type": { "name": "ReactPointerEvent", "raw": "React.PointerEvent", "alias": "React.PointerEvent" } }], "returns": { "type": { "name": "void" } } }], "displayName": "Dialog", "props": { "opened": { "required": true, "tsType": { "name": "boolean" }, "description": "Indicates whether to show dialog or not" }, "resizable": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the user can resize dialog with cursor. Default: false", "defaultValue": { "value": "false", "computed": false } }, "movable": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the user can move dialog with cursor. Default: false", "defaultValue": { "value": "false", "computed": false } }, "inset": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the content should be inset. Default: true", "defaultValue": { "value": "true", "computed": false } }, "trapFocus": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the focus should be trapped within the dialog. Default: false", "defaultValue": { "value": "false", "computed": false } }, "hideHeader": { "required": false, "tsType": { "name": "boolean" }, "description": "Whether the hide the header. Default: false", "defaultValue": { "value": "false", "computed": false } }, "header": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Override for the header" }, "title": { "required": false, "tsType": { "name": "union", "raw": "string | React.ReactElement", "elements": [{ "name": "string" }, { "name": "ReactReactElement", "raw": "React.ReactElement" }] }, "description": "Title to show in title bar of dialog" }, "footer": { "required": false, "tsType": { "name": "union", "raw": "string | React.ReactElement", "elements": [{ "name": "string" }, { "name": "ReactReactElement", "raw": "React.ReactElement" }] }, "description": "Footer to show at bottom of dialog. Note: will override buttonCluster" }, "buttonCluster": { "required": false, "tsType": { "name": "Array", "elements": [{ "name": "DialogButtonDef" }], "raw": "DialogButtonDef[]" }, "description": "List of DialogButtonDef objects specifying buttons and associated onClick events" }, "alignment": { "required": false, "tsType": { "name": "DialogAlignment" }, "description": "Default alignment of dialog." }, "x": { "required": false, "tsType": { "name": "number" }, "description": "Initial x/left position of dialog in px." }, "y": { "required": false, "tsType": { "name": "number" }, "description": "Initial y/top position of dialog in px." }, "onClose": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "onClick event for X button for dialog" }, "onEscape": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "'keyup' event for Esc key" }, "onOutsideClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(event: MouseEvent) => any", "signature": { "arguments": [{ "type": { "name": "MouseEvent" }, "name": "event" }], "return": { "name": "any" } } }, "description": "Triggered when a click is triggered outside of this dialog." }, "width": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": 'Initial width of dialog. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: "50%"', "defaultValue": { "value": '"50%"', "computed": false } }, "height": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "Initial height of dialog. Displayed in px if value is a number; otherwise, displayed in specified CSS unit." }, "minWidth": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "Minimum width that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 300px" }, "minHeight": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "Minimum height that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 135px" }, "maxWidth": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "Maximum width that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 100%", "defaultValue": { "value": '"100%"', "computed": false } }, "maxHeight": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "Maximum height that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit." }, "modal": { "required": false, "tsType": { "name": "boolean" }, "description": "Whether to show background overlay. Default: true.\n@note Modeless dialogs require an id and an implementation of onModelessPointerDown.", "defaultValue": { "value": "true", "computed": false } }, "modelessId": { "required": false, "tsType": { "name": "string" }, "description": "An id for a modeless dialog" }, "onModelessPointerDown": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(event: React.PointerEvent, id: string) => void", "signature": { "arguments": [{ "type": { "name": "ReactPointerEvent", "raw": "React.PointerEvent" }, "name": "event" }, { "type": { "name": "string" }, "name": "id" }], "return": { "name": "void" } } }, "description": "Pointer Down event handler when modeless (modal = false)" }, "backgroundStyle": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS Style for overlay" }, "titleStyle": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS Style for title" }, "footerStyle": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS Style for footer" }, "contentClassName": { "required": false, "tsType": { "name": "string" }, "description": "Custom CSS class name for the content" }, "contentStyle": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS Style for the content" } }, "composes": ["Omit", "CommonProps"] };
export {
  Dialog as D
};
