import { A as AppUiDecorator } from "./Decorators-DexZH3uj.js";
import { r as reactExports, c as classnames, j as jsxRuntimeExports } from "./iframe-BENp4d1r.js";
import { O as Orientation } from "./Orientation-6E0suNXD.js";
import { bi as throttle } from "./appui-react-CEufDDhs.js";
import { u as useTranslation } from "./useTranslation-Cp38LryN.js";
import "./Key.enum-CnwI7CFN.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-S7MnCWX8.js";
import "./index-CsG4pdOs.js";
import "./UiCore-Cb-FqcDW.js";
const defaultOptions = {
  leading: false,
  trailing: true
};
function useThrottledFn(functionToThrottle, waitTime, dependencies, options = defaultOptions) {
  const throttledFunction = throttle(functionToThrottle, waitTime, options);
  return reactExports.useCallback(throttledFunction, dependencies);
}
function getCurrentGlobalPosition(orientation, e) {
  return orientation === Orientation.Horizontal ? e.clientX : e.clientY;
}
const useConditionalCleanup = (condition, cleanup) => {
  const conditionRef = reactExports.useRef(condition);
  const cleanupRef = reactExports.useRef(cleanup);
  conditionRef.current = condition;
  cleanupRef.current = cleanup;
  reactExports.useEffect(() => {
    return () => {
      if (conditionRef.current) cleanupRef.current();
    };
  }, []);
};
const useElementSeparatorPointerHandler = ({
  onResizeHandleDragChanged,
  onResizeHandleHoverChanged,
  isResizeHandleBeingDragged,
  isResizeHandleHovered,
  movableArea,
  ratio,
  orientation,
  onRatioChanged
}) => {
  const globalPosition = reactExports.useRef(0);
  const pointerOutOfBounds = reactExports.useRef(false);
  const [isElementDragged, setIsDragged] = reactExports.useState(false);
  const [isElementHovered, setIsHovered] = reactExports.useState(false);
  const isGroupDragged = isResizeHandleBeingDragged ?? isElementDragged;
  const isGroupHovered = isResizeHandleHovered ?? isElementHovered;
  useConditionalCleanup(
    isElementDragged && !!onResizeHandleDragChanged,
    () => onResizeHandleDragChanged(false)
  );
  useConditionalCleanup(
    isElementHovered && !!onResizeHandleHoverChanged,
    () => onResizeHandleHoverChanged(false)
  );
  if (isGroupHovered && pointerOutOfBounds.current)
    pointerOutOfBounds.current = false;
  const stopDrag = reactExports.useCallback(() => {
    if (isGroupDragged) {
      setIsDragged(false);
      if (onResizeHandleDragChanged) onResizeHandleDragChanged(false);
    }
  }, [isGroupDragged, onResizeHandleDragChanged]);
  const startDrag = reactExports.useCallback(
    (e) => {
      globalPosition.current = getCurrentGlobalPosition(orientation, e);
      if (!isGroupDragged) {
        setIsDragged(true);
        if (onResizeHandleDragChanged) onResizeHandleDragChanged(true);
      }
    },
    [isGroupDragged, orientation, onResizeHandleDragChanged]
  );
  const onPointerUp = reactExports.useCallback(() => {
    stopDrag();
  }, [stopDrag]);
  const onThrottledPointerMove = useThrottledFn(
    (e) => {
      if (!movableArea) {
        stopDrag();
        return;
      }
      const currentPosition = getCurrentGlobalPosition(orientation, e);
      const positionChange = currentPosition - globalPosition.current;
      if (Math.abs(positionChange) < 1) return;
      const currentLocalPosition = movableArea * ratio + positionChange;
      const newRatio = currentLocalPosition / movableArea;
      globalPosition.current = currentPosition;
      if (pointerOutOfBounds.current || !onRatioChanged) return;
      const result = onRatioChanged(newRatio);
      if (result && result.ratio === ratio && !isGroupHovered && !pointerOutOfBounds.current)
        pointerOutOfBounds.current = true;
    },
    16,
    [stopDrag, isGroupHovered, ratio, movableArea, onRatioChanged, orientation]
  );
  reactExports.useEffect(() => {
    return () => onThrottledPointerMove.cancel();
  }, [onThrottledPointerMove]);
  reactExports.useLayoutEffect(() => {
    if (isElementDragged) {
      document.addEventListener("pointerup", onPointerUp);
      document.addEventListener("pointermove", onThrottledPointerMove);
    }
    return () => {
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointermove", onThrottledPointerMove);
    };
  }, [isElementDragged, onPointerUp, onThrottledPointerMove]);
  const onPointerDown = reactExports.useCallback(
    (e) => {
      if (!isGroupDragged) {
        startDrag(e);
      } else {
        stopDrag();
      }
    },
    [isGroupDragged, startDrag, stopDrag]
  );
  const onPointerOver = reactExports.useCallback(() => {
    if (isGroupHovered) return;
    setIsHovered(true);
    if (onResizeHandleHoverChanged) onResizeHandleHoverChanged(true);
  }, [isGroupHovered, onResizeHandleHoverChanged]);
  const onPointerOut = reactExports.useCallback(() => {
    if (!isGroupHovered) return;
    setIsHovered(false);
    if (onResizeHandleHoverChanged) onResizeHandleHoverChanged(false);
  }, [isGroupHovered, onResizeHandleHoverChanged]);
  return {
    isHovered: isGroupHovered,
    isDragged: isGroupDragged,
    onPointerDown,
    onPointerOver,
    onPointerOut
  };
};
function getStyle(orientation, separatorSize) {
  separatorSize = separatorSize || 30;
  if (orientation === Orientation.Horizontal)
    return {
      width: separatorSize,
      margin: `0px ${-Math.floor(separatorSize / 2)}px`
    };
  return {
    height: separatorSize,
    margin: `${-Math.floor(separatorSize / 2)}px 1px`
  };
}
const ElementSeparator = (props) => {
  const { translate } = useTranslation();
  const [hasHoverHappened, setHasHoverHappened] = reactExports.useState(false);
  const { isDragged, isHovered, onPointerDown, onPointerOver, onPointerOut } = useElementSeparatorPointerHandler(props);
  const isHoverNeeded = isHovered || isDragged;
  if (!hasHoverHappened && isHoverNeeded) setHasHoverHappened(isHoverNeeded);
  const unhoverClass = hasHoverHappened ? "core-element-separator-group-unhovered" : "";
  const classNames = classnames(
    "core-element-separator",
    props.orientation === Orientation.Horizontal ? "core-element-separator--horizontal" : "core-element-separator--vertical",
    props.className,
    isHoverNeeded ? "core-element-separator-group-hovered" : unhoverClass
  );
  const orientation = props.orientation;
  const separatorSize = props.separatorSize;
  const style = reactExports.useMemo(
    () => getStyle(orientation, separatorSize),
    [orientation, separatorSize]
  );
  const styles = {
    ...style,
    ...props.style
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      style: styles,
      className: classNames,
      onPointerDown,
      onPointerOver,
      onPointerOut,
      "aria-label": translate("elementSeparator.label"),
      tabIndex: -1
    }
  );
};
ElementSeparator.__docgenInfo = { "description": "A movable button, which allows to change the ratio between left element and right element\n@public\n@deprecated in 4.12.0. Basic components that need to be user-resized support this out of the box. Use {@link https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent pointer events} API to implement a custom resizer.", "methods": [], "displayName": "ElementSeparator", "props": { "orientation": { "required": true, "tsType": { "name": "Orientation" }, "description": "Separator orientation" }, "ratio": { "required": true, "tsType": { "name": "number" }, "description": "Ratio between left cell and right cell" }, "movableArea": { "required": false, "tsType": { "name": "number" }, "description": "Area width or height (depending on orientation) in pixels" }, "separatorSize": { "required": false, "tsType": { "name": "number" }, "description": "Separator width or height in pixels. 30 by default" }, "onRatioChanged": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(ratio: number) => void | RatioChangeResult", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "ratio" }], "return": { "name": "union", "raw": "void | RatioChangeResult", "elements": [{ "name": "void" }, { "name": "RatioChangeResult" }] } } }, "description": "Callback to ratio changed event" }, "isResizeHandleHovered": { "required": false, "tsType": { "name": "boolean" }, "description": "Is resize handle hovered" }, "onResizeHandleHoverChanged": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(isHovered: boolean) => void", "signature": { "arguments": [{ "type": { "name": "boolean" }, "name": "isHovered" }], "return": { "name": "void" } } }, "description": "Callback to hover event change" }, "isResizeHandleBeingDragged": { "required": false, "tsType": { "name": "boolean" }, "description": "Is resize handle being dragged" }, "onResizeHandleDragChanged": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(isDragStarted: boolean) => void", "signature": { "arguments": [{ "type": { "name": "boolean" }, "name": "isDragStarted" }], "return": { "name": "void" } } }, "description": "Callback to drag event change" } }, "composes": ["CommonProps"] };
const meta = {
  title: "Deprecated/ElementSeparator",
  component: ElementSeparator,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {};
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
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
