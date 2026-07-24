import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { qt as require_classnames } from "./iframe-DrBiZGmV.js";
import { pr as require_throttle } from "./components-react-DigDa1CF.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { n as useTranslation, t as init_useTranslation } from "./useTranslation-XlH0aG5I.js";
import { n as init_Orientation, t as Orientation } from "./Orientation-BU7ZHVnF.js";
//#region ../../ui/core-react/src/core-react/elementseparator/ElementSeparator.scss
var init_ElementSeparator$1 = __esmMin((() => {}));
//#endregion
//#region ../../ui/core-react/src/core-react/utils/hooks/useThrottledFn.tsx
/** Used to throttle function calls
* @internal
*/
function useThrottledFn(functionToThrottle, waitTime, dependencies, options = defaultOptions) {
	const throttledFunction = (0, import_throttle.default)(functionToThrottle, waitTime, options);
	return import_react$2.useCallback(throttledFunction, dependencies);
}
var import_react$2, import_throttle, defaultOptions;
var init_useThrottledFn = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_throttle = /* @__PURE__ */ __toESM(require_throttle(), 1);
	defaultOptions = {
		leading: false,
		trailing: true
	};
}));
//#endregion
//#region ../../ui/core-react/src/core-react/elementseparator/ElementSeparator.tsx
function getCurrentGlobalPosition(orientation, e) {
	return orientation === Orientation.Horizontal ? e.clientX : e.clientY;
}
function getStyle(orientation, separatorSize) {
	separatorSize = separatorSize || 30;
	if (orientation === Orientation.Horizontal) return {
		width: separatorSize,
		margin: `0px ${-Math.floor(separatorSize / 2)}px`
	};
	return {
		height: separatorSize,
		margin: `${-Math.floor(separatorSize / 2)}px 1px`
	};
}
var import_react$1, import_classnames, import_jsx_runtime, useConditionalCleanup, useElementSeparatorPointerHandler, ElementSeparator;
var init_ElementSeparator = __esmMin((() => {
	init_ElementSeparator$1();
	require_react();
	import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_Orientation();
	init_useThrottledFn();
	init_useTranslation();
	import_jsx_runtime = require_jsx_runtime();
	useConditionalCleanup = (condition, cleanup) => {
		const conditionRef = (0, import_react$1.useRef)(condition);
		const cleanupRef = (0, import_react$1.useRef)(cleanup);
		conditionRef.current = condition;
		cleanupRef.current = cleanup;
		(0, import_react$1.useEffect)(() => {
			return () => {
				if (conditionRef.current) cleanupRef.current();
			};
		}, []);
	};
	useElementSeparatorPointerHandler = ({ onResizeHandleDragChanged, onResizeHandleHoverChanged, isResizeHandleBeingDragged, isResizeHandleHovered, movableArea, ratio, orientation, onRatioChanged }) => {
		const globalPosition = (0, import_react$1.useRef)(0);
		const pointerOutOfBounds = (0, import_react$1.useRef)(false);
		const [isElementDragged, setIsDragged] = (0, import_react$1.useState)(false);
		const [isElementHovered, setIsHovered] = (0, import_react$1.useState)(false);
		const isGroupDragged = isResizeHandleBeingDragged ?? isElementDragged;
		const isGroupHovered = isResizeHandleHovered ?? isElementHovered;
		useConditionalCleanup(isElementDragged && !!onResizeHandleDragChanged, () => onResizeHandleDragChanged(false));
		useConditionalCleanup(isElementHovered && !!onResizeHandleHoverChanged, () => onResizeHandleHoverChanged(false));
		if (isGroupHovered && pointerOutOfBounds.current) pointerOutOfBounds.current = false;
		const stopDrag = (0, import_react$1.useCallback)(() => {
			if (isGroupDragged) {
				setIsDragged(false);
				if (onResizeHandleDragChanged) onResizeHandleDragChanged(false);
			}
		}, [isGroupDragged, onResizeHandleDragChanged]);
		const startDrag = (0, import_react$1.useCallback)((e) => {
			globalPosition.current = getCurrentGlobalPosition(orientation, e);
			if (!isGroupDragged) {
				setIsDragged(true);
				if (onResizeHandleDragChanged) onResizeHandleDragChanged(true);
			}
		}, [
			isGroupDragged,
			orientation,
			onResizeHandleDragChanged
		]);
		const onPointerUp = (0, import_react$1.useCallback)(() => {
			stopDrag();
		}, [stopDrag]);
		const onThrottledPointerMove = useThrottledFn((e) => {
			if (!movableArea) {
				stopDrag();
				return;
			}
			const currentPosition = getCurrentGlobalPosition(orientation, e);
			const positionChange = currentPosition - globalPosition.current;
			if (Math.abs(positionChange) < 1) return;
			const newRatio = (movableArea * ratio + positionChange) / movableArea;
			globalPosition.current = currentPosition;
			if (pointerOutOfBounds.current || !onRatioChanged) return;
			const result = onRatioChanged(newRatio);
			if (result && result.ratio === ratio && !isGroupHovered && !pointerOutOfBounds.current) pointerOutOfBounds.current = true;
		}, 16, [
			stopDrag,
			isGroupHovered,
			ratio,
			movableArea,
			onRatioChanged,
			orientation
		]);
		(0, import_react$1.useEffect)(() => {
			return () => onThrottledPointerMove.cancel();
		}, [onThrottledPointerMove]);
		(0, import_react$1.useLayoutEffect)(() => {
			if (isElementDragged) {
				document.addEventListener("pointerup", onPointerUp);
				document.addEventListener("pointermove", onThrottledPointerMove);
			}
			return () => {
				document.removeEventListener("pointerup", onPointerUp);
				document.removeEventListener("pointermove", onThrottledPointerMove);
			};
		}, [
			isElementDragged,
			onPointerUp,
			onThrottledPointerMove
		]);
		return {
			isHovered: isGroupHovered,
			isDragged: isGroupDragged,
			onPointerDown: (0, import_react$1.useCallback)((e) => {
				if (!isGroupDragged) startDrag(e);
				else stopDrag();
			}, [
				isGroupDragged,
				startDrag,
				stopDrag
			]),
			onPointerOver: (0, import_react$1.useCallback)(() => {
				if (isGroupHovered) return;
				setIsHovered(true);
				if (onResizeHandleHoverChanged) onResizeHandleHoverChanged(true);
			}, [isGroupHovered, onResizeHandleHoverChanged]),
			onPointerOut: (0, import_react$1.useCallback)(() => {
				if (!isGroupHovered) return;
				setIsHovered(false);
				if (onResizeHandleHoverChanged) onResizeHandleHoverChanged(false);
			}, [isGroupHovered, onResizeHandleHoverChanged])
		};
	};
	ElementSeparator = (props) => {
		const { translate } = useTranslation();
		const [hasHoverHappened, setHasHoverHappened] = (0, import_react$1.useState)(false);
		const { isDragged, isHovered, onPointerDown, onPointerOver, onPointerOut } = useElementSeparatorPointerHandler(props);
		const isHoverNeeded = isHovered || isDragged;
		if (!hasHoverHappened && isHoverNeeded) setHasHoverHappened(isHoverNeeded);
		const unhoverClass = hasHoverHappened ? "core-element-separator-group-unhovered" : "";
		const classNames = (0, import_classnames.default)("core-element-separator", props.orientation === Orientation.Horizontal ? "core-element-separator--horizontal" : "core-element-separator--vertical", props.className, isHoverNeeded ? "core-element-separator-group-hovered" : unhoverClass);
		const orientation = props.orientation;
		const separatorSize = props.separatorSize;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			style: {
				...(0, import_react$1.useMemo)(() => getStyle(orientation, separatorSize), [orientation, separatorSize]),
				...props.style
			},
			className: classNames,
			onPointerDown,
			onPointerOver,
			onPointerOut,
			"aria-label": translate("elementSeparator.label"),
			tabIndex: -1
		});
	};
	ElementSeparator.__docgenInfo = {
		"description": "A movable button, which allows to change the ratio between left element and right element\n@public\n@deprecated in 4.12.0. Basic components that need to be user-resized support this out of the box. Use {@link https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent pointer events} API to implement a custom resizer.",
		"methods": [],
		"displayName": "ElementSeparator",
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
			},
			"orientation": {
				"required": true,
				"tsType": { "name": "Orientation" },
				"description": "Separator orientation"
			},
			"ratio": {
				"required": true,
				"tsType": { "name": "number" },
				"description": "Ratio between left cell and right cell"
			},
			"movableArea": {
				"required": false,
				"tsType": { "name": "number" },
				"description": "Area width or height (depending on orientation) in pixels"
			},
			"separatorSize": {
				"required": false,
				"tsType": { "name": "number" },
				"description": "Separator width or height in pixels. 30 by default"
			},
			"onRatioChanged": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(ratio: number) => void | RatioChangeResult",
					"signature": {
						"arguments": [{
							"type": { "name": "number" },
							"name": "ratio"
						}],
						"return": {
							"name": "union",
							"raw": "void | RatioChangeResult",
							"elements": [{ "name": "void" }, { "name": "RatioChangeResult" }]
						}
					}
				},
				"description": "Callback to ratio changed event"
			},
			"isResizeHandleHovered": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Is resize handle hovered"
			},
			"onResizeHandleHoverChanged": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(isHovered: boolean) => void",
					"signature": {
						"arguments": [{
							"type": { "name": "boolean" },
							"name": "isHovered"
						}],
						"return": { "name": "void" }
					}
				},
				"description": "Callback to hover event change"
			},
			"isResizeHandleBeingDragged": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Is resize handle being dragged"
			},
			"onResizeHandleDragChanged": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(isDragStarted: boolean) => void",
					"signature": {
						"arguments": [{
							"type": { "name": "boolean" },
							"name": "isDragStarted"
						}],
						"return": { "name": "void" }
					}
				},
				"description": "Callback to drag event change"
			}
		}
	};
}));
//#endregion
//#region src/deprecated/ElementSeparator.stories.tsx
var meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_ElementSeparator();
	meta = {
		title: "Deprecated/ElementSeparator",
		component: ElementSeparator,
		tags: ["autodocs"],
		decorators: [AppUiDecorator]
	};
	Basic = {};
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Basic"];
}))();
export { Basic, __namedExportsOrder, meta as default };
