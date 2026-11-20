import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
//#region ../../ui/core-react/src/core-react/hocs/withOnOutsideClick.tsx
var import_react$1, import_jsx_runtime$1, withOnOutsideClick;
var init_withOnOutsideClick = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_jsx_runtime$1 = require_jsx_runtime();
	withOnOutsideClick = (Component, defaultOnOutsideClick, useCapture = true, usePointerEvents = true) => {
		return class WithOnOutsideClick extends import_react$1.PureComponent {
			/** @internal */
			outsideClickContainerDiv = null;
			/** @internal */
			isDownOutside = false;
			/** @internal */
			isInCorePopup(element) {
				if (element.nodeName === "DIV") {
					if (element.classList && element.classList.contains("core-popup")) return true;
					if (element.parentElement && this.isInCorePopup(element.parentElement)) return true;
				} else if (element.parentElement && this.isInCorePopup(element.parentElement)) return true;
				return false;
			}
			/** @internal */
			onOutsideClick(e) {
				if (e.target instanceof Node && e.target.nodeType === Node.ELEMENT_NODE) {
					if (!this.props.closeOnNestedPopupOutsideClick && this.isInCorePopup(e.target)) return;
				}
				if (this.props.onOutsideClick) return this.props.onOutsideClick(e);
				else if (defaultOnOutsideClick) return defaultOnOutsideClick(e);
			}
			/** @internal */
			handleDocumentClick = (e) => {
				if (!this.outsideClickContainerDiv || !(e.target instanceof Node) || this.outsideClickContainerDiv.contains(e.target)) return;
				return this.onOutsideClick(e);
			};
			/** @internal */
			handleDocumentPointerDown = (e) => {
				this.isDownOutside = true;
				if (this.outsideClickContainerDiv) this.isDownOutside = !!e.target && !this.outsideClickContainerDiv.contains(e.target);
			};
			/** @internal */
			handleDocumentPointerUp = (e) => {
				let isUpOutside = true;
				if (this.outsideClickContainerDiv) isUpOutside = !!e.target && !this.outsideClickContainerDiv.contains(e.target);
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
					outsideClickParentDocument.addEventListener("pointerdown", this.handleDocumentPointerDown, useCapture);
					outsideClickParentDocument.addEventListener("pointerup", this.handleDocumentPointerUp, useCapture);
				} else outsideClickParentDocument.addEventListener("click", this.handleDocumentClick, useCapture);
			}
			componentWillUnmount() {
				const outsideClickParentDocument = this.getParentDocument();
				if (usePointerEvents) {
					outsideClickParentDocument.removeEventListener("pointerdown", this.handleDocumentPointerDown, useCapture);
					outsideClickParentDocument.removeEventListener("pointerup", this.handleDocumentPointerUp, useCapture);
				} else outsideClickParentDocument.removeEventListener("click", this.handleDocumentClick, useCapture);
			}
			render() {
				const { onOutsideClick, closeOnNestedPopupOutsideClick, ...props } = this.props;
				return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					ref: this.handleOutsideClickContainerDivSet,
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Component, { ...props })
				});
			}
		};
	};
})), import_jsx_runtime, DivWithOutsideClick;
var init_DivWithOutsideClick = __esmMin((() => {
	require_react();
	init_withOnOutsideClick();
	import_jsx_runtime = require_jsx_runtime();
	DivWithOutsideClick = withOnOutsideClick((props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...props }));
	DivWithOutsideClick.__docgenInfo = {
		"description": "Div element with Outside Click behavior\n@public\n@deprecated in 4.12.0. Use props of a basic component, like {@link https://itwinui.bentley.com/docs/popover iTwinUI popover `closeOnOutsideClick`} or {@link useOnOutsideClick} hook.",
		"methods": [],
		"displayName": "DivWithOutsideClick",
		"props": {
			"className": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Custom CSS class name"
			},
			"style": {
				"required": false,
				"tsType": {
					"name": "ReactCSSProperties",
					"raw": "React.CSSProperties"
				},
				"description": "Custom CSS style properties"
			},
			"itemId": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id"
			}
		}
	};
}));
//#endregion
export { init_DivWithOutsideClick as n, DivWithOutsideClick as t };
