import { r as reactExports, j as jsxRuntimeExports } from "./iframe-DNdoMX4Q.js";
const withOnOutsideClick = (Component, defaultOnOutsideClick, useCapture = true, usePointerEvents = true) => {
  return class WithOnOutsideClick extends reactExports.PureComponent {
    /** @internal */
    outsideClickContainerDiv = null;
    /** @internal */
    isDownOutside = false;
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
      if (this.props.onOutsideClick) return this.props.onOutsideClick(e);
    }
    /** @internal */
    handleDocumentClick = (e) => {
      if (!this.outsideClickContainerDiv || !(e.target instanceof Node) || this.outsideClickContainerDiv.contains(e.target))
        return;
      return this.onOutsideClick(e);
    };
    /** @internal */
    handleDocumentPointerDown = (e) => {
      this.isDownOutside = true;
      if (this.outsideClickContainerDiv) {
        this.isDownOutside = !!e.target && !this.outsideClickContainerDiv.contains(e.target);
      }
    };
    /** @internal */
    handleDocumentPointerUp = (e) => {
      let isUpOutside = true;
      if (this.outsideClickContainerDiv) {
        isUpOutside = !!e.target && !this.outsideClickContainerDiv.contains(e.target);
      }
      const isOutsideClick = isUpOutside && this.isDownOutside;
      this.isDownOutside = false;
      isOutsideClick && this.onOutsideClick(e);
    };
    handleOutsideClickContainerDivSet = (outsideClickContainerDiv) => {
      this.outsideClickContainerDiv = outsideClickContainerDiv;
    };
    getParentDocument() {
      return this.outsideClickContainerDiv?.ownerDocument ?? document;
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
const DivWithOutsideClick = withOnOutsideClick(
  (props) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...props })
  // eslint-disable-line @typescript-eslint/no-deprecated
);
DivWithOutsideClick.__docgenInfo = { "description": "Div element with Outside Click behavior\n@public\n@deprecated in 4.12.0. Use props of a basic component, like {@link https://itwinui.bentley.com/docs/popover iTwinUI popover `closeOnOutsideClick`} or {@link useOnOutsideClick} hook.", "methods": [], "displayName": "DivWithOutsideClick" };
export {
  DivWithOutsideClick as D
};
