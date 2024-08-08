import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { r as reactExports } from "./index-DM9bPmif.js";
const withOnOutsideClick = (Component, defaultOnOutsideClick, useCapture = true, usePointerEvents = true) => {
  return class WithOnOutsideClick extends reactExports.PureComponent {
    constructor() {
      super(...arguments);
      this.outsideClickContainerDiv = null;
      this.isDownOutside = false;
      this.handleDocumentClick = (e) => {
        if (!this.outsideClickContainerDiv || !(e.target instanceof Node) || this.outsideClickContainerDiv.contains(e.target))
          return;
        return this.onOutsideClick(e);
      };
      this.handleDocumentPointerDown = (e) => {
        this.isDownOutside = true;
        if (this.outsideClickContainerDiv) {
          this.isDownOutside = !!e.target && !this.outsideClickContainerDiv.contains(e.target);
        }
      };
      this.handleDocumentPointerUp = (e) => {
        let isUpOutside = true;
        if (this.outsideClickContainerDiv) {
          isUpOutside = !!e.target && !this.outsideClickContainerDiv.contains(e.target);
        }
        const isOutsideClick = isUpOutside && this.isDownOutside;
        this.isDownOutside = false;
        isOutsideClick && this.onOutsideClick(e);
      };
      this.handleOutsideClickContainerDivSet = (outsideClickContainerDiv) => {
        this.outsideClickContainerDiv = outsideClickContainerDiv;
      };
    }
    /** @internal */
    isInCorePopup(element) {
      if (element.nodeName === "DIV") {
        if (element.classList && element.classList.contains("core-popup"))
          return true;
        if (element.parentElement && this.isInCorePopup(element.parentElement))
          return true;
      } else {
        if (element.parentElement && this.isInCorePopup(element.parentElement))
          return true;
      }
      return false;
    }
    /** @internal */
    onOutsideClick(e) {
      if (e.target instanceof Node && e.target.nodeType === Node.ELEMENT_NODE) {
        if (!this.props.closeOnNestedPopupOutsideClick && this.isInCorePopup(e.target))
          return;
      }
      if (this.props.onOutsideClick)
        return this.props.onOutsideClick(e);
      else if (defaultOnOutsideClick)
        return defaultOnOutsideClick(e);
    }
    getParentDocument() {
      var _a;
      return ((_a = this.outsideClickContainerDiv) == null ? void 0 : _a.ownerDocument) ?? document;
    }
    componentDidMount() {
      const outsideClickParentDocument = this.getParentDocument();
      if (usePointerEvents) {
        outsideClickParentDocument.addEventListener(
          "pointerdown",
          this.handleDocumentPointerDown,
          useCapture
        );
        outsideClickParentDocument.addEventListener(
          "pointerup",
          this.handleDocumentPointerUp,
          useCapture
        );
      } else
        outsideClickParentDocument.addEventListener(
          "click",
          this.handleDocumentClick,
          useCapture
        );
    }
    componentWillUnmount() {
      const outsideClickParentDocument = this.getParentDocument();
      if (usePointerEvents) {
        outsideClickParentDocument.removeEventListener(
          "pointerdown",
          this.handleDocumentPointerDown,
          useCapture
        );
        outsideClickParentDocument.removeEventListener(
          "pointerup",
          this.handleDocumentPointerUp,
          useCapture
        );
      } else
        outsideClickParentDocument.removeEventListener(
          "click",
          this.handleDocumentClick,
          useCapture
        );
    }
    render() {
      const { onOutsideClick, closeOnNestedPopupOutsideClick, ...props } = this.props;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: this.handleOutsideClickContainerDivSet, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Component, { ...props }) });
    }
  };
};
try {
  withOnOutsideClick.displayName = "withOnOutsideClick";
  withOnOutsideClick.__docgenInfo = { "description": "withOnOutsideClick is a React higher-order component that adds outside click support.", "displayName": "withOnOutsideClick", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
const DivWithOutsideClick = withOnOutsideClick(
  (props) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...props })
  // eslint-disable-line deprecation/deprecation
);
try {
  DivWithOutsideClick.displayName = "DivWithOutsideClick";
  DivWithOutsideClick.__docgenInfo = { "description": "Div element with Outside Click behavior", "displayName": "DivWithOutsideClick", "props": { "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "onOutsideClick": { "defaultValue": null, "description": "Outside click callback function", "name": "onOutsideClick", "required": false, "type": { "name": "((event: MouseEvent) => any)" } }, "closeOnNestedPopupOutsideClick": { "defaultValue": null, "description": "If false outside click processing and closing are skipped if click occurs in another Popup component, default to false.", "name": "closeOnNestedPopupOutsideClick", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
export {
  DivWithOutsideClick as D
};
