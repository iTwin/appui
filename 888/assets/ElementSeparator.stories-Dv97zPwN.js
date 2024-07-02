var _a, _b, _c;
import { A as AppUiDecorator } from "./Decorators-CzmLt7AA.js";
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import { c as classnames } from "./Key.enum-BpJjJDFT.js";
import { O as Orientation } from "./Orientation-6E0suNXD.js";
import { aJ as lodashExports } from "./DefaultToolSettingsProvider-DIShliKp.js";
import { u as useTranslation } from "./useTranslation-DTiiDgd7.js";
import "./index-EDRsojbr.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./iframe-pWcJHFO-.js";
import "../sb-preview/runtime.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-B47T7vRo.js";
import "./UiCore-CuzqhBtX.js";
const defaultOptions = {
  leading: false,
  trailing: true
};
function useThrottledFn(functionToThrottle, waitTime, dependencies, options = defaultOptions) {
  const throttledFunction = lodashExports.throttle(functionToThrottle, waitTime, options);
  return reactExports.useCallback(throttledFunction, dependencies);
}
try {
  useThrottledFn.displayName = "useThrottledFn";
  useThrottledFn.__docgenInfo = { "description": "Used to throttle function calls", "displayName": "useThrottledFn", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
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
      if (conditionRef.current)
        cleanupRef.current();
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
      if (onResizeHandleDragChanged)
        onResizeHandleDragChanged(false);
    }
  }, [isGroupDragged, onResizeHandleDragChanged]);
  const startDrag = reactExports.useCallback(
    (e) => {
      globalPosition.current = getCurrentGlobalPosition(orientation, e);
      if (!isGroupDragged) {
        setIsDragged(true);
        if (onResizeHandleDragChanged)
          onResizeHandleDragChanged(true);
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
      if (Math.abs(positionChange) < 1)
        return;
      const currentLocalPosition = movableArea * ratio + positionChange;
      const newRatio = currentLocalPosition / movableArea;
      globalPosition.current = currentPosition;
      if (pointerOutOfBounds.current || !onRatioChanged)
        return;
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
    if (isGroupHovered)
      return;
    setIsHovered(true);
    if (onResizeHandleHoverChanged)
      onResizeHandleHoverChanged(true);
  }, [isGroupHovered, onResizeHandleHoverChanged]);
  const onPointerOut = reactExports.useCallback(() => {
    if (!isGroupHovered)
      return;
    setIsHovered(false);
    if (onResizeHandleHoverChanged)
      onResizeHandleHoverChanged(false);
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
  if (!hasHoverHappened && isHoverNeeded)
    setHasHoverHappened(isHoverNeeded);
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
try {
  ElementSeparator.displayName = "ElementSeparator";
  ElementSeparator.__docgenInfo = { "description": "A movable button, which allows to change the ratio between left element and right element", "displayName": "ElementSeparator", "props": { "orientation": { "defaultValue": null, "description": "Separator orientation", "name": "orientation", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "ratio": { "defaultValue": null, "description": "Ratio between left cell and right cell", "name": "ratio", "required": true, "type": { "name": "number" } }, "movableArea": { "defaultValue": null, "description": "Area width or height (depending on orientation) in pixels", "name": "movableArea", "required": false, "type": { "name": "number" } }, "separatorSize": { "defaultValue": null, "description": "Separator width or height in pixels. 30 by default", "name": "separatorSize", "required": false, "type": { "name": "number" } }, "onRatioChanged": { "defaultValue": null, "description": "Callback to ratio changed event", "name": "onRatioChanged", "required": false, "type": { "name": "((ratio: number) => void | RatioChangeResult)" } }, "isResizeHandleHovered": { "defaultValue": null, "description": "Is resize handle hovered", "name": "isResizeHandleHovered", "required": false, "type": { "name": "boolean" } }, "onResizeHandleHoverChanged": { "defaultValue": null, "description": "Callback to hover event change", "name": "onResizeHandleHoverChanged", "required": false, "type": { "name": "((isHovered: boolean) => void)" } }, "isResizeHandleBeingDragged": { "defaultValue": null, "description": "Is resize handle being dragged", "name": "isResizeHandleBeingDragged", "required": false, "type": { "name": "boolean" } }, "onResizeHandleDragChanged": { "defaultValue": null, "description": "Callback to drag event change", "name": "onResizeHandleDragChanged", "required": false, "type": { "name": "((isDragStarted: boolean) => void)" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
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
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
