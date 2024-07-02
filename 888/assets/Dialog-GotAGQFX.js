import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { K as Key_enum, a as Dialog$1, c as classnames, D as DialogButtonType, B as Button } from "./Key.enum-BpJjJDFT.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import { D as DivWithOutsideClick } from "./DivWithOutsideClick-DwNV55q9.js";
import { u as useTranslation } from "./useTranslation-DTiiDgd7.js";
var DialogAlignment = /* @__PURE__ */ ((DialogAlignment2) => {
  DialogAlignment2["TopLeft"] = "top-left";
  DialogAlignment2["Top"] = "top";
  DialogAlignment2["TopRight"] = "top-right";
  DialogAlignment2["Left"] = "left";
  DialogAlignment2["Center"] = "center";
  DialogAlignment2["Right"] = "right";
  DialogAlignment2["BottomLeft"] = "bottom-left";
  DialogAlignment2["Bottom"] = "bottom";
  DialogAlignment2["BottomRight"] = "bottom-right";
  return DialogAlignment2;
})(DialogAlignment || {});
const _Dialog = class _Dialog extends reactExports.Component {
  // eslint-disable-next-line deprecation/deprecation
  constructor(props) {
    super(props);
    this._parentDocument = document;
    this.handleRefSet = (containerDiv) => {
      if (containerDiv)
        this._parentDocument = containerDiv.ownerDocument;
    };
    this._handleKeyUp = (event) => {
      if (event.key === Key_enum.Key.Escape.valueOf() && this.props.opened && this.props.onEscape) {
        this.props.onEscape();
      }
    };
    this._handleContainerPointerDown = (event) => {
      if (!this.props.modal) {
        if (this.props.onModelessPointerDown && this.props.modelessId)
          this.props.onModelessPointerDown(event, this.props.modelessId);
      }
    };
  }
  componentWillUnmount() {
    this._parentDocument.removeEventListener("keyup", this._handleKeyUp, true);
  }
  componentDidMount() {
    this._parentDocument.addEventListener("keyup", this._handleKeyUp, true);
  }
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
  // eslint-disable-next-line deprecation/deprecation
  getCSSClassNameFromAlignment(alignment) {
    switch (alignment) {
      case "top-left":
        return "core-align-top-left";
      case "top":
        return "core-align-top";
      case "top-right":
        return "core-align-top-right";
      case "left":
        return "core-align-left";
      case "center":
        return "core-align-center";
      case "right":
        return "core-align-right";
      case "bottom-left":
        return "core-align-bottom-left";
      case "bottom":
        return "core-align-bottom";
      case "bottom-right":
        return "core-align-bottom-right";
    }
  }
  /** @deprecated in 4.12.0. Use iTwinUI Button instead. */
  getFooterButtons(buttonCluster, primaryStyleType = "cta", noCoreButtonClasses = false) {
    if (buttonCluster === void 0)
      return void 0;
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
};
_Dialog.defaultProps = {
  maxWidth: "100%",
  width: "50%",
  hideHeader: false,
  resizable: false,
  movable: false,
  modal: true,
  inset: true,
  trapFocus: false
};
let Dialog = _Dialog;
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
try {
  DialogAlignment.displayName = "DialogAlignment";
  DialogAlignment.__docgenInfo = { "description": "Enum for dialog alignment", "displayName": "DialogAlignment", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  Dialog.displayName = "Dialog";
  Dialog.__docgenInfo = { "description": "Dialog React component with optional resizing and dragging functionality", "displayName": "Dialog", "props": { "opened": { "defaultValue": null, "description": "Indicates whether to show dialog or not", "name": "opened", "required": true, "type": { "name": "boolean" } }, "resizable": { "defaultValue": { value: "false" }, "description": "Indicates whether the user can resize dialog with cursor. Default: false", "name": "resizable", "required": false, "type": { "name": "boolean" } }, "movable": { "defaultValue": { value: "false" }, "description": "Indicates whether the user can move dialog with cursor. Default: false", "name": "movable", "required": false, "type": { "name": "boolean" } }, "inset": { "defaultValue": { value: "true" }, "description": "Indicates whether the content should be inset. Default: true", "name": "inset", "required": false, "type": { "name": "boolean" } }, "trapFocus": { "defaultValue": { value: "false" }, "description": "Indicates whether the focus should be trapped within the dialog. Default: false", "name": "trapFocus", "required": false, "type": { "name": "boolean" } }, "hideHeader": { "defaultValue": { value: "false" }, "description": "Whether the hide the header. Default: false", "name": "hideHeader", "required": false, "type": { "name": "boolean" } }, "header": { "defaultValue": null, "description": "Override for the header", "name": "header", "required": false, "type": { "name": "ReactNode" } }, "title": { "defaultValue": null, "description": "Title to show in title bar of dialog", "name": "title", "required": false, "type": { "name": "string | ReactElement<any, string | JSXElementConstructor<any>>" } }, "footer": { "defaultValue": null, "description": "Footer to show at bottom of dialog. Note: will override buttonCluster", "name": "footer", "required": false, "type": { "name": "string | ReactElement<any, string | JSXElementConstructor<any>>" } }, "buttonCluster": { "defaultValue": null, "description": "List of DialogButtonDef objects specifying buttons and associated onClick events", "name": "buttonCluster", "required": false, "type": { "name": "DialogButtonDef[]" } }, "alignment": { "defaultValue": null, "description": "Default alignment of dialog.", "name": "alignment", "required": false, "type": { "name": "enum", "value": [{ "value": '"top-left"' }, { "value": '"top"' }, { "value": '"top-right"' }, { "value": '"left"' }, { "value": '"center"' }, { "value": '"right"' }, { "value": '"bottom-left"' }, { "value": '"bottom"' }, { "value": '"bottom-right"' }] } }, "x": { "defaultValue": null, "description": "Initial x/left position of dialog in px.", "name": "x", "required": false, "type": { "name": "number" } }, "y": { "defaultValue": null, "description": "Initial y/top position of dialog in px.", "name": "y", "required": false, "type": { "name": "number" } }, "onClose": { "defaultValue": null, "description": "onClick event for X button for dialog", "name": "onClose", "required": false, "type": { "name": "(() => void)" } }, "onEscape": { "defaultValue": null, "description": "'keyup' event for Esc key", "name": "onEscape", "required": false, "type": { "name": "(() => void)" } }, "onOutsideClick": { "defaultValue": null, "description": "Triggered when a click is triggered outside of this dialog.", "name": "onOutsideClick", "required": false, "type": { "name": "((event: MouseEvent) => any)" } }, "width": { "defaultValue": { value: "50%" }, "description": 'Initial width of dialog. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: "50%"', "name": "width", "required": false, "type": { "name": "string | number" } }, "height": { "defaultValue": null, "description": "Initial height of dialog. Displayed in px if value is a number; otherwise, displayed in specified CSS unit.", "name": "height", "required": false, "type": { "name": "string | number" } }, "minWidth": { "defaultValue": null, "description": "Minimum width that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 300px", "name": "minWidth", "required": false, "type": { "name": "string | number" } }, "minHeight": { "defaultValue": null, "description": "Minimum height that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 135px", "name": "minHeight", "required": false, "type": { "name": "string | number" } }, "maxWidth": { "defaultValue": { value: "100%" }, "description": "Maximum width that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 100%", "name": "maxWidth", "required": false, "type": { "name": "string | number" } }, "maxHeight": { "defaultValue": null, "description": "Maximum height that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit.", "name": "maxHeight", "required": false, "type": { "name": "string | number" } }, "modal": { "defaultValue": { value: "true" }, "description": "Whether to show background overlay. Default: true.\n@note Modeless dialogs require an id and an implementation of onModelessPointerDown.", "name": "modal", "required": false, "type": { "name": "boolean" } }, "modelessId": { "defaultValue": null, "description": "An id for a modeless dialog", "name": "modelessId", "required": false, "type": { "name": "string" } }, "onModelessPointerDown": { "defaultValue": null, "description": "Pointer Down event handler when modeless (modal = false)", "name": "onModelessPointerDown", "required": false, "type": { "name": "((event: PointerEvent<Element>, id: string) => void)" } }, "backgroundStyle": { "defaultValue": null, "description": "Custom CSS Style for overlay", "name": "backgroundStyle", "required": false, "type": { "name": "CSSProperties" } }, "titleStyle": { "defaultValue": null, "description": "Custom CSS Style for title", "name": "titleStyle", "required": false, "type": { "name": "CSSProperties" } }, "footerStyle": { "defaultValue": null, "description": "Custom CSS Style for footer", "name": "footerStyle", "required": false, "type": { "name": "CSSProperties" } }, "contentClassName": { "defaultValue": null, "description": "Custom CSS class name for the content", "name": "contentClassName", "required": false, "type": { "name": "string" } }, "contentStyle": { "defaultValue": null, "description": "Custom CSS Style for the content", "name": "contentStyle", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
export {
  Dialog as D
};
