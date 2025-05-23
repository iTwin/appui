const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./styles-BUBXhwWV.css"])))=>i.map(i=>d[i]);
import { g as getDefaultExportFromCjs, r as reactExports, a as React3, R as React } from "./index-DVOlmhHI.js";
import { r as reactDomExports, j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { _ as __vitePreload } from "./iframe-gwwAaeJc.js";
var classnames = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
var hasRequiredClassnames;
function requireClassnames() {
  if (hasRequiredClassnames) return classnames.exports;
  hasRequiredClassnames = 1;
  (function(module) {
    (function() {
      var hasOwn = {}.hasOwnProperty;
      function classNames() {
        var classes = "";
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (arg) {
            classes = appendClass(classes, parseValue(arg));
          }
        }
        return classes;
      }
      function parseValue(arg) {
        if (typeof arg === "string" || typeof arg === "number") {
          return arg;
        }
        if (typeof arg !== "object") {
          return "";
        }
        if (Array.isArray(arg)) {
          return classNames.apply(null, arg);
        }
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
          return arg.toString();
        }
        var classes = "";
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes = appendClass(classes, key);
          }
        }
        return classes;
      }
      function appendClass(value, newClass) {
        if (!newClass) {
          return value;
        }
        if (value) {
          return value + " " + newClass;
        }
        return value + newClass;
      }
      if (module.exports) {
        classNames.default = classNames;
        module.exports = classNames;
      } else {
        window.classNames = classNames;
      }
    })();
  })(classnames);
  return classnames.exports;
}
var classnamesExports = requireClassnames();
const cx = /* @__PURE__ */ getDefaultExportFromCjs(classnamesExports);
const getWindow$1 = () => "undefined" == typeof window ? void 0 : window;
const mergeEventHandlers = (...callbacks) => (event) => {
  for (let cb of callbacks) {
    cb == null ? void 0 : cb(event);
    if (event == null ? void 0 : event.defaultPrevented) return;
  }
};
const getTranslateValuesFromElement = (element) => {
  if (!element) return [];
  let transformValue = getComputedStyle(element).getPropertyValue("transform");
  return getTranslateValues(transformValue);
};
const getTranslateValues = (transformValue) => {
  let matrix = new DOMMatrix(transformValue);
  return [matrix.m41, matrix.m42];
};
const getBoundedValue = (val, min2, max2) => Math.min(max2, Math.max(min2, val));
const getRandomValue = (length = 21) => {
  let alphabet = "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = "";
  for (let i = 0; i < length; i++) id += alphabet[64 * Math.random() | 0];
  return id;
};
const mergeRefs = (...refs) => (instance) => {
  refs.forEach((ref) => {
    if ("function" == typeof ref) ref(instance);
    else if (ref) ref.current = instance;
  });
};
const useMergedRefs = (...refs) => reactExports.useCallback(mergeRefs(...refs), [...refs]);
const useResizeObserver = (onResize) => {
  let resizeObserver = reactExports.useRef(void 0);
  let elementRef = reactExports.useCallback(
    (element) => {
      var _a, _b, _c, _d, _e;
      if (!((_a = getWindow$1()) == null ? void 0 : _a.ResizeObserver)) return;
      (_c = (_b = resizeObserver.current) == null ? void 0 : _b.disconnect) == null ? void 0 : _c.call(_b);
      if (element) {
        resizeObserver.current = new ResizeObserver((entries) => {
          window.requestAnimationFrame(() => {
            if (!Array.isArray(entries) || !entries.length) return;
            let [{ contentRect }] = entries;
            return onResize(contentRect);
          });
        });
        (_e = (_d = resizeObserver.current) == null ? void 0 : _d.observe) == null ? void 0 : _e.call(_d, element);
      }
    },
    [onResize]
  );
  return [elementRef, resizeObserver.current];
};
const ThemeContext = reactExports.createContext(void 0);
let isJest = "undefined" != typeof jest;
let isCypress = void 0 !== globalThis.Cypress;
let isMocha = void 0 !== globalThis.beforeEach && "function(name,fn){suites[0].beforeEach(name,fn);}" === `${globalThis.beforeEach}`.replace(/\s/g, "") && !isCypress;
let isVitest = void 0 !== globalThis.__vitest_index__;
let isUnitTest = isJest || isVitest || isMocha;
const useGlobals = () => {
  let themeContext = reactExports.useContext(ThemeContext);
  useThemeProviderWarning(themeContext);
  useRootFontSizeWarning();
  return themeContext;
};
const useThemeProviderWarning = (themeContext) => {
  reactExports.useEffect(() => {
  }, [themeContext]);
};
let useRootFontSizeWarning = () => {
  reactExports.useEffect(() => {
  }, []);
};
let _React$1 = React3;
const useSyncExternalStore = _React$1.useSyncExternalStore || useSyncExternalStoreShim;
function useSyncExternalStoreShim(subscribe, getSnapshot) {
  let value = getSnapshot();
  let [{ instance }, forceUpdate] = reactExports.useState({
    instance: {
      value,
      getSnapshot
    }
  });
  reactExports.useLayoutEffect(() => {
    instance.value = value;
    instance.getSnapshot = getSnapshot;
    if (!Object.is(value, getSnapshot()))
      forceUpdate({
        instance
      });
  }, [subscribe, value, getSnapshot]);
  reactExports.useEffect(() => {
    let synchronize = () => {
      if (!Object.is(instance.value, instance.getSnapshot()))
        forceUpdate({
          instance
        });
    };
    synchronize();
    return subscribe(synchronize);
  }, [subscribe]);
  return value;
}
const useMediaQuery = (queryString) => {
  let getSnapshot = reactExports.useCallback(
    () => {
      var _a;
      return "undefined" != typeof window ? (_a = window.matchMedia) == null ? void 0 : _a.call(window, queryString).matches : void 0;
    },
    [queryString]
  );
  let subscribe = reactExports.useCallback(
    (onChange) => {
      var _a, _b;
      let mediaQueryList = (_a = window.matchMedia) == null ? void 0 : _a.call(window, queryString);
      (_b = mediaQueryList == null ? void 0 : mediaQueryList.addEventListener) == null ? void 0 : _b.call(mediaQueryList, "change", onChange);
      return () => {
        var _a2;
        return (_a2 = mediaQueryList == null ? void 0 : mediaQueryList.removeEventListener) == null ? void 0 : _a2.call(mediaQueryList, "change", onChange);
      };
    },
    [queryString]
  );
  return useSyncExternalStore(subscribe, getSnapshot, () => void 0);
};
const useSafeContext = (context) => {
  let value = reactExports.useContext(context);
  if (!value)
    throw new Error(`${context.displayName || "Context"} is undefined`);
  return value;
};
const useLatestRef$2 = (value) => {
  let valueRef = reactExports.useRef(value);
  reactExports.useEffect(() => {
    valueRef.current = value;
  }, [value]);
  return valueRef;
};
let useIsomorphicLayoutEffect = "undefined" != typeof window ? reactExports.useLayoutEffect : reactExports.useEffect;
const useIsClient = () => {
  let [isClient, setIsClient] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
};
const useId$1 = () => {
  let uniqueValue = useUniqueValue();
  return reactExports.useMemo(() => `iui-${uniqueValue}`, [uniqueValue]);
};
let _React = React3;
let useUniqueValue = _React.useId ?? (() => reactExports.useMemo(() => getRandomValue(10), []));
const useControlledState = (initialValue, controlledState, setControlledState) => {
  let [uncontrolledState, setUncontrolledState] = reactExports.useState(initialValue);
  let state = reactExports.useMemo(
    () => void 0 !== controlledState ? controlledState : uncontrolledState,
    [controlledState, uncontrolledState]
  );
  let setState = reactExports.useCallback(
    (value) => {
      setUncontrolledState(value);
      setControlledState == null ? void 0 : setControlledState(value);
    },
    [setControlledState, setUncontrolledState]
  );
  return [state, setState];
};
const t = "3.18.1";
const u = new Proxy(
  {},
  {
    get(e, i) {
      if (typeof i == "string" && i.startsWith("iui-"))
        return i.replace("iui-", `_iui${t.replace(/\./g, "")}-`);
    },
    has(e, i) {
      return typeof i == "string" && i.startsWith("iui-");
    }
  }
);
let _base = (defaultElement) => (className, attrs) => {
  let Comp = reactExports.forwardRef(({ as = defaultElement, ...props }, ref) => {
    props = {
      ...attrs,
      ...props,
      className: getScopedClassName(
        cx(className, attrs == null ? void 0 : attrs.className, props.className)
      )
    };
    let Element2 = as || "div";
    if ("button" === Element2 || "a" === Element2 || "input" === Element2 && "checkbox" === props.type) {
      var _props;
      (_props = props).tabIndex ?? (_props.tabIndex = 0);
    }
    useGlobals();
    return reactExports.createElement(Element2, {
      ref,
      ...props
    });
  });
  return Comp;
};
const polymorphic = new Proxy(
  {},
  {
    get: (target, prop) => {
      if ("string" == typeof prop) return _base(prop);
      return Reflect.get(target, prop);
    }
  }
);
let getScopedClassName = (className = "") => className.split(" ").map((c) => c in u ? u[c] : c).join(" ") || null;
const importCss = async (url) => {
  try {
    return await new Function(
      `return import("${url}", { with: { type: "css" } })`
    )();
  } catch {
    try {
      return await new Function(
        `return import("${url}", { assert: { type: "css" } })`
      )();
    } catch {
      return await fetch(url).then((res) => res.text()).then((cssText) => {
        let stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(cssText);
        return {
          default: stylesheet
        };
      });
    }
  }
};
const cloneElementWithRef = (children, getProps) => {
  var _a;
  if (!children) return null;
  if (!reactExports.isValidElement(children)) return children;
  let childrenRef = ((_a = children.props) == null ? void 0 : _a.ref) || (children == null ? void 0 : children.ref);
  let props = getProps(children);
  let ref = mergeRefs(
    ...[childrenRef, "ref" in props ? props.ref : null].filter(Boolean)
  );
  return reactExports.cloneElement(children, {
    ...props,
    ref
  });
};
const Box = polymorphic.div("");
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css2 = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((value) => css2[value] ? css2[value] !== "none" : false) || (css2.containerType ? css2.containerType !== "normal" : false) || !webkit && (css2.backdropFilter ? css2.backdropFilter !== "none" : false) || !webkit && (css2.filter ? css2.filter !== "none" : false) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((value) => (css2.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css2.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
const sides = ["top", "right", "bottom", "left"];
const alignments = ["start", "end"];
const placements = /* @__PURE__ */ sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v) => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
const oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var isInert = function isInert2(node, lookUp) {
  var _node$getAttribute;
  if (lookUp === void 0) {
    lookUp = true;
  }
  var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
  var inert = inertAtt === "" || inertAtt === "true";
  var result = inert || lookUp && node && isInert2(node.parentNode);
  return result;
};
var isContentEditable = function isContentEditable2(node) {
  var _node$getAttribute2;
  var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
  return attValue === "" || attValue === "true";
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  if (isInert(el)) {
    return [];
  }
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (isInert(element, false)) {
      continue;
    }
    if (element.tagName === "SLOT") {
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively2(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }
      var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
      var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var hasTabIndex = function hasTabIndex2(node) {
  return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
};
var getTabIndex = function getTabIndex2(node) {
  if (!node) {
    throw new Error("No node provided");
  }
  if (node.tabIndex < 0) {
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
};
var getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
  var tabIndex = getTabIndex(node);
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0;
  }
  return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached2(node) {
  var _nodeRoot;
  var nodeRoot = node && getRootNode(node);
  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
  var attached = false;
  if (nodeRoot && nodeRoot !== node) {
    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
      nodeRoot = getRootNode(nodeRootHost);
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
    }
  }
  return attached;
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  if (!displayCheck || displayCheck === "full" || displayCheck === "legacy-full") {
    if (typeof getShadowRoot === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (isNodeAttached(node)) {
      return !node.getClientRects().length;
    }
    if (displayCheck !== "legacy-full") {
      return true;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === "LEGEND") {
            return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  isInert(node) || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var sortByOrder = function sortByOrder2(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function(item, i) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getSortOrderTabIndex(element, isScope);
    var elements = isScope ? sortByOrder2(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusable = function focusable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
function getPlatform() {
  const uaData = navigator.userAgentData;
  if (uaData != null && uaData.platform) {
    return uaData.platform;
  }
  return navigator.platform;
}
function getUserAgent() {
  const uaData = navigator.userAgentData;
  if (uaData && Array.isArray(uaData.brands)) {
    return uaData.brands.map((_ref) => {
      let {
        brand,
        version
      } = _ref;
      return brand + "/" + version;
    }).join(" ");
  }
  return navigator.userAgent;
}
function isSafari() {
  return /apple/i.test(navigator.vendor);
}
function isAndroid() {
  const re = /android/i;
  return re.test(getPlatform()) || re.test(getUserAgent());
}
function isMac() {
  return getPlatform().toLowerCase().startsWith("mac") && !navigator.maxTouchPoints;
}
function isJSDOM() {
  return getUserAgent().includes("jsdom/");
}
const FOCUSABLE_ATTRIBUTE$1 = "data-floating-ui-focusable";
const TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
const ARROW_LEFT$1 = "ArrowLeft";
const ARROW_RIGHT$1 = "ArrowRight";
const ARROW_UP$1 = "ArrowUp";
const ARROW_DOWN$1 = "ArrowDown";
function activeElement(doc) {
  let activeElement2 = doc.activeElement;
  while (((_activeElement = activeElement2) == null || (_activeElement = _activeElement.shadowRoot) == null ? void 0 : _activeElement.activeElement) != null) {
    var _activeElement;
    activeElement2 = activeElement2.shadowRoot.activeElement;
  }
  return activeElement2;
}
function contains$1(parent, child) {
  if (!parent || !child) {
    return false;
  }
  const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();
  if (parent.contains(child)) {
    return true;
  }
  if (rootNode && isShadowRoot(rootNode)) {
    let next = child;
    while (next) {
      if (parent === next) {
        return true;
      }
      next = next.parentNode || next.host;
    }
  }
  return false;
}
function getTarget$1(event) {
  if ("composedPath" in event) {
    return event.composedPath()[0];
  }
  return event.target;
}
function isEventTargetWithin(event, node) {
  if (node == null) {
    return false;
  }
  if ("composedPath" in event) {
    return event.composedPath().includes(node);
  }
  const e = event;
  return e.target != null && node.contains(e.target);
}
function isRootElement(element) {
  return element.matches("html,body");
}
function getDocument$1(node) {
  return (node == null ? void 0 : node.ownerDocument) || document;
}
function isTypeableElement(element) {
  return isHTMLElement(element) && element.matches(TYPEABLE_SELECTOR);
}
function isTypeableCombobox(element) {
  if (!element) return false;
  return element.getAttribute("role") === "combobox" && isTypeableElement(element);
}
function matchesFocusVisible(element) {
  if (!element || isJSDOM()) return true;
  try {
    return element.matches(":focus-visible");
  } catch (_e) {
    return true;
  }
}
function getFloatingFocusElement(floatingElement) {
  if (!floatingElement) {
    return null;
  }
  return floatingElement.hasAttribute(FOCUSABLE_ATTRIBUTE$1) ? floatingElement : floatingElement.querySelector("[" + FOCUSABLE_ATTRIBUTE$1 + "]") || floatingElement;
}
function getNodeChildren$1(nodes, id, onlyOpenChildren) {
  if (onlyOpenChildren === void 0) {
    onlyOpenChildren = true;
  }
  let allChildren = nodes.filter((node) => {
    var _node$context;
    return node.parentId === id && ((_node$context = node.context) == null ? void 0 : _node$context.open);
  });
  let currentChildren = allChildren;
  while (currentChildren.length) {
    currentChildren = onlyOpenChildren ? nodes.filter((node) => {
      var _currentChildren;
      return (_currentChildren = currentChildren) == null ? void 0 : _currentChildren.some((n) => {
        var _node$context2;
        return node.parentId === n.id && ((_node$context2 = node.context) == null ? void 0 : _node$context2.open);
      });
    }) : nodes;
    allChildren = allChildren.concat(currentChildren);
  }
  return allChildren;
}
function getDeepestNode(nodes, id) {
  let deepestNodeId;
  let maxDepth = -1;
  function findDeepest(nodeId, depth) {
    if (depth > maxDepth) {
      deepestNodeId = nodeId;
      maxDepth = depth;
    }
    const children = getNodeChildren$1(nodes, nodeId);
    children.forEach((child) => {
      findDeepest(child.id, depth + 1);
    });
  }
  findDeepest(id, 0);
  return nodes.find((node) => node.id === deepestNodeId);
}
function getNodeAncestors(nodes, id) {
  var _nodes$find;
  let allAncestors = [];
  let currentParentId = (_nodes$find = nodes.find((node) => node.id === id)) == null ? void 0 : _nodes$find.parentId;
  while (currentParentId) {
    const currentNode = nodes.find((node) => node.id === currentParentId);
    currentParentId = currentNode == null ? void 0 : currentNode.parentId;
    if (currentNode) {
      allAncestors = allAncestors.concat(currentNode);
    }
  }
  return allAncestors;
}
function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}
function isReactEvent(event) {
  return "nativeEvent" in event;
}
function isVirtualClick(event) {
  if (event.mozInputSource === 0 && event.isTrusted) {
    return true;
  }
  if (isAndroid() && event.pointerType) {
    return event.type === "click" && event.buttons === 1;
  }
  return event.detail === 0 && !event.pointerType;
}
function isVirtualPointerEvent(event) {
  if (isJSDOM()) return false;
  return !isAndroid() && event.width === 0 && event.height === 0 || isAndroid() && event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "touch";
}
function isMouseLikePointerType(pointerType, strict) {
  const values = ["mouse", "pen"];
  if (!strict) {
    values.push("", void 0);
  }
  return values.includes(pointerType);
}
var index$1 = typeof document !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
const SafeReact$1 = {
  ...React3
};
function useLatestRef$1(value) {
  const ref = reactExports.useRef(value);
  index$1(() => {
    ref.current = value;
  });
  return ref;
}
const useInsertionEffect = SafeReact$1.useInsertionEffect;
const useSafeInsertionEffect = useInsertionEffect || ((fn) => fn());
function useEffectEvent(callback) {
  const ref = reactExports.useRef(() => {
  });
  useSafeInsertionEffect(() => {
    ref.current = callback;
  });
  return reactExports.useCallback(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return ref.current == null ? void 0 : ref.current(...args);
  }, []);
}
function isDifferentGridRow(index2, cols, prevRow) {
  return Math.floor(index2 / cols) !== prevRow;
}
function isIndexOutOfListBounds(listRef, index2) {
  return index2 < 0 || index2 >= listRef.current.length;
}
function getMinListIndex(listRef, disabledIndices) {
  return findNonDisabledListIndex(listRef, {
    disabledIndices
  });
}
function getMaxListIndex(listRef, disabledIndices) {
  return findNonDisabledListIndex(listRef, {
    decrement: true,
    startingIndex: listRef.current.length,
    disabledIndices
  });
}
function findNonDisabledListIndex(listRef, _temp) {
  let {
    startingIndex = -1,
    decrement = false,
    disabledIndices,
    amount = 1
  } = _temp === void 0 ? {} : _temp;
  let index2 = startingIndex;
  do {
    index2 += decrement ? -amount : amount;
  } while (index2 >= 0 && index2 <= listRef.current.length - 1 && isListIndexDisabled(listRef, index2, disabledIndices));
  return index2;
}
function getGridNavigatedIndex(listRef, _ref) {
  let {
    event,
    orientation,
    loop,
    rtl,
    cols,
    disabledIndices,
    minIndex,
    maxIndex,
    prevIndex,
    stopEvent: stop = false
  } = _ref;
  let nextIndex = prevIndex;
  if (event.key === ARROW_UP$1) {
    stop && stopEvent(event);
    if (prevIndex === -1) {
      nextIndex = maxIndex;
    } else {
      nextIndex = findNonDisabledListIndex(listRef, {
        startingIndex: nextIndex,
        amount: cols,
        decrement: true,
        disabledIndices
      });
      if (loop && (prevIndex - cols < minIndex || nextIndex < 0)) {
        const col = prevIndex % cols;
        const maxCol = maxIndex % cols;
        const offset2 = maxIndex - (maxCol - col);
        if (maxCol === col) {
          nextIndex = maxIndex;
        } else {
          nextIndex = maxCol > col ? offset2 : offset2 - cols;
        }
      }
    }
    if (isIndexOutOfListBounds(listRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }
  if (event.key === ARROW_DOWN$1) {
    stop && stopEvent(event);
    if (prevIndex === -1) {
      nextIndex = minIndex;
    } else {
      nextIndex = findNonDisabledListIndex(listRef, {
        startingIndex: prevIndex,
        amount: cols,
        disabledIndices
      });
      if (loop && prevIndex + cols > maxIndex) {
        nextIndex = findNonDisabledListIndex(listRef, {
          startingIndex: prevIndex % cols - cols,
          amount: cols,
          disabledIndices
        });
      }
    }
    if (isIndexOutOfListBounds(listRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }
  if (orientation === "both") {
    const prevRow = floor(prevIndex / cols);
    if (event.key === (rtl ? ARROW_LEFT$1 : ARROW_RIGHT$1)) {
      stop && stopEvent(event);
      if (prevIndex % cols !== cols - 1) {
        nextIndex = findNonDisabledListIndex(listRef, {
          startingIndex: prevIndex,
          disabledIndices
        });
        if (loop && isDifferentGridRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledListIndex(listRef, {
            startingIndex: prevIndex - prevIndex % cols - 1,
            disabledIndices
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledListIndex(listRef, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
      }
      if (isDifferentGridRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    if (event.key === (rtl ? ARROW_RIGHT$1 : ARROW_LEFT$1)) {
      stop && stopEvent(event);
      if (prevIndex % cols !== 0) {
        nextIndex = findNonDisabledListIndex(listRef, {
          startingIndex: prevIndex,
          decrement: true,
          disabledIndices
        });
        if (loop && isDifferentGridRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledListIndex(listRef, {
            startingIndex: prevIndex + (cols - prevIndex % cols),
            decrement: true,
            disabledIndices
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledListIndex(listRef, {
          startingIndex: prevIndex + (cols - prevIndex % cols),
          decrement: true,
          disabledIndices
        });
      }
      if (isDifferentGridRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    const lastRow = floor(maxIndex / cols) === prevRow;
    if (isIndexOutOfListBounds(listRef, nextIndex)) {
      if (loop && lastRow) {
        nextIndex = event.key === (rtl ? ARROW_RIGHT$1 : ARROW_LEFT$1) ? maxIndex : findNonDisabledListIndex(listRef, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
      } else {
        nextIndex = prevIndex;
      }
    }
  }
  return nextIndex;
}
function createGridCellMap(sizes, cols, dense) {
  const cellMap = [];
  let startIndex = 0;
  sizes.forEach((_ref2, index2) => {
    let {
      width,
      height
    } = _ref2;
    let itemPlaced = false;
    if (dense) {
      startIndex = 0;
    }
    while (!itemPlaced) {
      const targetCells = [];
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          targetCells.push(startIndex + i + j * cols);
        }
      }
      if (startIndex % cols + width <= cols && targetCells.every((cell) => cellMap[cell] == null)) {
        targetCells.forEach((cell) => {
          cellMap[cell] = index2;
        });
        itemPlaced = true;
      } else {
        startIndex++;
      }
    }
  });
  return [...cellMap];
}
function getGridCellIndexOfCorner(index2, sizes, cellMap, cols, corner) {
  if (index2 === -1) return -1;
  const firstCellIndex = cellMap.indexOf(index2);
  const sizeItem = sizes[index2];
  switch (corner) {
    case "tl":
      return firstCellIndex;
    case "tr":
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + sizeItem.width - 1;
    case "bl":
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + (sizeItem.height - 1) * cols;
    case "br":
      return cellMap.lastIndexOf(index2);
  }
}
function getGridCellIndices(indices, cellMap) {
  return cellMap.flatMap((index2, cellIndex) => indices.includes(index2) ? [cellIndex] : []);
}
function isListIndexDisabled(listRef, index2, disabledIndices) {
  if (disabledIndices) {
    return disabledIndices.includes(index2);
  }
  const element = listRef.current[index2];
  return element == null || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";
}
const getTabbableOptions = () => ({
  getShadowRoot: true,
  displayCheck: (
    // JSDOM does not support the `tabbable` library. To solve this we can
    // check if `ResizeObserver` is a real function (not polyfilled), which
    // determines if the current environment is JSDOM-like.
    typeof ResizeObserver === "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
  )
});
function getTabbableIn(container, dir) {
  const list = tabbable(container, getTabbableOptions());
  const len = list.length;
  if (len === 0) return;
  const active = activeElement(getDocument$1(container));
  const index2 = list.indexOf(active);
  const nextIndex = index2 === -1 ? dir === 1 ? 0 : len - 1 : index2 + dir;
  return list[nextIndex];
}
function getNextTabbable(referenceElement) {
  return getTabbableIn(getDocument$1(referenceElement).body, 1) || referenceElement;
}
function getPreviousTabbable(referenceElement) {
  return getTabbableIn(getDocument$1(referenceElement).body, -1) || referenceElement;
}
function isOutsideEvent(event, container) {
  const containerElement = container || event.currentTarget;
  const relatedTarget = event.relatedTarget;
  return !relatedTarget || !contains$1(containerElement, relatedTarget);
}
function disableFocusInside(container) {
  const tabbableElements = tabbable(container, getTabbableOptions());
  tabbableElements.forEach((element) => {
    element.dataset.tabindex = element.getAttribute("tabindex") || "";
    element.setAttribute("tabindex", "-1");
  });
}
function enableFocusInside(container) {
  const elements = container.querySelectorAll("[data-tabindex]");
  elements.forEach((element) => {
    const tabindex = element.dataset.tabindex;
    delete element.dataset.tabindex;
    if (tabindex) {
      element.setAttribute("tabindex", tabindex);
    } else {
      element.removeAttribute("tabindex");
    }
  });
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter((placement) => getAlignment(placement) === alignment), ...allowedPlacements.filter((placement) => getAlignment(placement) !== alignment)] : allowedPlacements.filter((placement) => getSide(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter((placement) => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }
    return true;
  });
}
const autoPlacement$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "autoPlacement",
    options,
    async fn(state) {
      var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
      const {
        rects,
        middlewareData,
        placement,
        platform: platform2,
        elements
      } = state;
      const {
        crossAxis = false,
        alignment,
        allowedPlacements = placements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      const placements$1 = alignment !== void 0 || allowedPlacements === placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
      const currentPlacement = placements$1[currentIndex];
      if (currentPlacement == null) {
        return {};
      }
      const alignmentSides = getAlignmentSides(currentPlacement, rects, await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)));
      if (placement !== currentPlacement) {
        return {
          reset: {
            placement: placements$1[0]
          }
        };
      }
      const currentOverflows = [overflow[getSide(currentPlacement)], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
      const allOverflows = [...((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || [], {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements$1[currentIndex + 1];
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByMostSpace = allOverflows.map((d) => {
        const alignment2 = getAlignment(d.placement);
        return [d.placement, alignment2 && crossAxis ? (
          // Check along the mainAxis and main crossAxis side.
          d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0)
        ) : (
          // Check only the mainAxis.
          d.overflows[0]
        ), d.overflows];
      }).sort((a, b) => a[1] - b[1]);
      const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter((d) => d[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        getAlignment(d[0]) ? 2 : 3
      ).every((v) => v <= 0));
      const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};
const flip$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
const hide$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state) {
      const {
        rects
      } = state;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
function getBoundingRect(rects) {
  const minX = min(...rects.map((rect) => rect.left));
  const minY = min(...rects.map((rect) => rect.top));
  const maxX = max(...rects.map((rect) => rect.right));
  const maxY = max(...rects.map((rect) => rect.bottom));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function getRectsByLine(rects) {
  const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
  const groups = [];
  let prevRect = null;
  for (let i = 0; i < sortedRects.length; i++) {
    const rect = sortedRects[i];
    if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
      groups.push([rect]);
    } else {
      groups[groups.length - 1].push(rect);
    }
    prevRect = rect;
  }
  return groups.map((rect) => rectToClientRect(getBoundingRect(rect)));
}
const inline$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "inline",
    options,
    async fn(state) {
      const {
        placement,
        elements,
        rects,
        platform: platform2,
        strategy
      } = state;
      const {
        padding = 2,
        x,
        y
      } = evaluate(options, state);
      const nativeClientRects = Array.from(await (platform2.getClientRects == null ? void 0 : platform2.getClientRects(elements.reference)) || []);
      const clientRects = getRectsByLine(nativeClientRects);
      const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
      const paddingObject = getPaddingObject(padding);
      function getBoundingClientRect2() {
        if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
          return clientRects.find((rect) => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
        }
        if (clientRects.length >= 2) {
          if (getSideAxis(placement) === "y") {
            const firstRect = clientRects[0];
            const lastRect = clientRects[clientRects.length - 1];
            const isTop = getSide(placement) === "top";
            const top2 = firstRect.top;
            const bottom2 = lastRect.bottom;
            const left2 = isTop ? firstRect.left : lastRect.left;
            const right2 = isTop ? firstRect.right : lastRect.right;
            const width2 = right2 - left2;
            const height2 = bottom2 - top2;
            return {
              top: top2,
              bottom: bottom2,
              left: left2,
              right: right2,
              width: width2,
              height: height2,
              x: left2,
              y: top2
            };
          }
          const isLeftSide = getSide(placement) === "left";
          const maxRight = max(...clientRects.map((rect) => rect.right));
          const minLeft = min(...clientRects.map((rect) => rect.left));
          const measureRects = clientRects.filter((rect) => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
          const top = measureRects[0].top;
          const bottom = measureRects[measureRects.length - 1].bottom;
          const left = minLeft;
          const right = maxRight;
          const width = right - left;
          const height = bottom - top;
          return {
            top,
            bottom,
            left,
            right,
            width,
            height,
            x: left,
            y: top
          };
        }
        return fallback;
      }
      const resetRects = await platform2.getElementRects({
        reference: {
          getBoundingClientRect: getBoundingClientRect2
        },
        floating: elements.floating,
        strategy
      });
      if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
        return {
          reset: {
            rects: resetRects
          }
        };
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset$2 = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
const shift$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
const size$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};
function getCssDimensions(element) {
  const css2 = getComputedStyle$1(element);
  let width = parseFloat(css2.width) || 0;
  let height = parseFloat(css2.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css2 = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css2.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css2.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
  if (ignoreScrollbarX === void 0) {
    ignoreScrollbarX = false;
  }
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 : (
    // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect)
  ));
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
const getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle$1(element).direction === "rtl";
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const offset$1 = offset$2;
const autoPlacement$1 = autoPlacement$2;
const shift$1 = shift$2;
const flip$1 = flip$2;
const size$1 = size$2;
const hide$1 = hide$2;
const inline$1 = inline$2;
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
var index = typeof document !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
  const ref = reactExports.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating$1(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = reactExports.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = reactExports.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = reactExports.useState(null);
  const [_floating, _setFloating] = reactExports.useState(null);
  const setReference = reactExports.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = reactExports.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = reactExports.useRef(null);
  const floatingRef = reactExports.useRef(null);
  const dataRef = reactExports.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform2);
  const openRef = useLatestRef(open);
  const update = reactExports.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition(referenceRef.current, floatingRef.current, config).then((data2) => {
      const fullData = {
        ...data2,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: openRef.current !== false
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        reactDomExports.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = reactExports.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = reactExports.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = reactExports.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = reactExports.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...getDPR(elements.floating) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return reactExports.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}
const offset = (options, deps) => ({
  ...offset$1(options),
  options: [options, deps]
});
const shift = (options, deps) => ({
  ...shift$1(options),
  options: [options, deps]
});
const flip = (options, deps) => ({
  ...flip$1(options),
  options: [options, deps]
});
const size = (options, deps) => ({
  ...size$1(options),
  options: [options, deps]
});
const autoPlacement = (options, deps) => ({
  ...autoPlacement$1(options),
  options: [options, deps]
});
const hide = (options, deps) => ({
  ...hide$1(options),
  options: [options, deps]
});
const inline = (options, deps) => ({
  ...inline$1(options),
  options: [options, deps]
});
function useMergeRefs(refs) {
  const cleanupRef = reactExports.useRef(void 0);
  const refEffect = reactExports.useCallback((instance) => {
    const cleanups = refs.map((ref) => {
      if (ref == null) {
        return;
      }
      if (typeof ref === "function") {
        const refCallback = ref;
        const refCleanup = refCallback(instance);
        return typeof refCleanup === "function" ? refCleanup : () => {
          refCallback(null);
        };
      }
      ref.current = instance;
      return () => {
        ref.current = null;
      };
    });
    return () => {
      cleanups.forEach((refCleanup) => refCleanup == null ? void 0 : refCleanup());
    };
  }, refs);
  return reactExports.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (value) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = void 0;
      }
      if (value != null) {
        cleanupRef.current = refEffect(value);
      }
    };
  }, refs);
}
function sortByDocumentPosition(a, b) {
  const position = a.compareDocumentPosition(b);
  if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
    return -1;
  }
  if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) {
    return 1;
  }
  return 0;
}
const FloatingListContext = /* @__PURE__ */ reactExports.createContext({
  register: () => {
  },
  unregister: () => {
  },
  map: /* @__PURE__ */ new Map(),
  elementsRef: {
    current: []
  }
});
function FloatingList(props) {
  const {
    children,
    elementsRef,
    labelsRef
  } = props;
  const [nodes, setNodes] = reactExports.useState(() => /* @__PURE__ */ new Set());
  const register = reactExports.useCallback((node) => {
    setNodes((prevSet) => new Set(prevSet).add(node));
  }, []);
  const unregister = reactExports.useCallback((node) => {
    setNodes((prevSet) => {
      const set = new Set(prevSet);
      set.delete(node);
      return set;
    });
  }, []);
  const map = reactExports.useMemo(() => {
    const newMap = /* @__PURE__ */ new Map();
    const sortedNodes = Array.from(nodes.keys()).sort(sortByDocumentPosition);
    sortedNodes.forEach((node, index2) => {
      newMap.set(node, index2);
    });
    return newMap;
  }, [nodes]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingListContext.Provider, {
    value: reactExports.useMemo(() => ({
      register,
      unregister,
      map,
      elementsRef,
      labelsRef
    }), [register, unregister, map, elementsRef, labelsRef]),
    children
  });
}
function useListItem(props) {
  if (props === void 0) {
    props = {};
  }
  const {
    label
  } = props;
  const {
    register,
    unregister,
    map,
    elementsRef,
    labelsRef
  } = reactExports.useContext(FloatingListContext);
  const [index2, setIndex] = reactExports.useState(null);
  const componentRef = reactExports.useRef(null);
  const ref = reactExports.useCallback((node) => {
    componentRef.current = node;
    if (index2 !== null) {
      elementsRef.current[index2] = node;
      if (labelsRef) {
        var _node$textContent;
        const isLabelDefined = label !== void 0;
        labelsRef.current[index2] = isLabelDefined ? label : (_node$textContent = node == null ? void 0 : node.textContent) != null ? _node$textContent : null;
      }
    }
  }, [index2, elementsRef, labelsRef, label]);
  index$1(() => {
    const node = componentRef.current;
    if (node) {
      register(node);
      return () => {
        unregister(node);
      };
    }
  }, [register, unregister]);
  index$1(() => {
    const index22 = componentRef.current ? map.get(componentRef.current) : null;
    if (index22 != null) {
      setIndex(index22);
    }
  }, [map]);
  return reactExports.useMemo(() => ({
    ref,
    index: index2 == null ? -1 : index2
  }), [index2, ref]);
}
const FOCUSABLE_ATTRIBUTE = "data-floating-ui-focusable";
const ACTIVE_KEY = "active";
const SELECTED_KEY = "selected";
const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";
const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";
function renderJsx(render, computedProps) {
  if (typeof render === "function") {
    return render(computedProps);
  }
  if (render) {
    return /* @__PURE__ */ reactExports.cloneElement(render, computedProps);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    ...computedProps
  });
}
const CompositeContext = /* @__PURE__ */ reactExports.createContext({
  activeIndex: 0,
  onNavigate: () => {
  }
});
const horizontalKeys = [ARROW_LEFT, ARROW_RIGHT];
const verticalKeys = [ARROW_UP, ARROW_DOWN];
const allKeys = [...horizontalKeys, ...verticalKeys];
const Composite = /* @__PURE__ */ reactExports.forwardRef(function Composite2(props, forwardedRef) {
  const {
    render,
    orientation = "both",
    loop = true,
    rtl = false,
    cols = 1,
    disabledIndices,
    activeIndex: externalActiveIndex,
    onNavigate: externalSetActiveIndex,
    itemSizes,
    dense = false,
    ...domProps
  } = props;
  const [internalActiveIndex, internalSetActiveIndex] = reactExports.useState(0);
  const activeIndex = externalActiveIndex != null ? externalActiveIndex : internalActiveIndex;
  const onNavigate = useEffectEvent(externalSetActiveIndex != null ? externalSetActiveIndex : internalSetActiveIndex);
  const elementsRef = reactExports.useRef([]);
  const renderElementProps = render && typeof render !== "function" ? render.props : {};
  const contextValue = reactExports.useMemo(() => ({
    activeIndex,
    onNavigate
  }), [activeIndex, onNavigate]);
  const isGrid = cols > 1;
  function handleKeyDown(event) {
    if (!allKeys.includes(event.key)) return;
    let nextIndex = activeIndex;
    const minIndex = getMinListIndex(elementsRef, disabledIndices);
    const maxIndex = getMaxListIndex(elementsRef, disabledIndices);
    const horizontalEndKey = rtl ? ARROW_LEFT : ARROW_RIGHT;
    const horizontalStartKey = rtl ? ARROW_RIGHT : ARROW_LEFT;
    if (isGrid) {
      const sizes = itemSizes || Array.from({
        length: elementsRef.current.length
      }, () => ({
        width: 1,
        height: 1
      }));
      const cellMap = createGridCellMap(sizes, cols, dense);
      const minGridIndex = cellMap.findIndex((index2) => index2 != null && !isListIndexDisabled(elementsRef, index2, disabledIndices));
      const maxGridIndex = cellMap.reduce((foundIndex, index2, cellIndex) => index2 != null && !isListIndexDisabled(elementsRef, index2, disabledIndices) ? cellIndex : foundIndex, -1);
      const maybeNextIndex = cellMap[getGridNavigatedIndex({
        current: cellMap.map((itemIndex) => itemIndex ? elementsRef.current[itemIndex] : null)
      }, {
        event,
        orientation,
        loop,
        rtl,
        cols,
        // treat undefined (empty grid spaces) as disabled indices so we
        // don't end up in them
        disabledIndices: getGridCellIndices([...disabledIndices || elementsRef.current.map((_, index2) => isListIndexDisabled(elementsRef, index2) ? index2 : void 0), void 0], cellMap),
        minIndex: minGridIndex,
        maxIndex: maxGridIndex,
        prevIndex: getGridCellIndexOfCorner(
          activeIndex > maxIndex ? minIndex : activeIndex,
          sizes,
          cellMap,
          cols,
          // use a corner matching the edge closest to the direction we're
          // moving in so we don't end up in the same item. Prefer
          // top/left over bottom/right.
          event.key === ARROW_DOWN ? "bl" : event.key === horizontalEndKey ? "tr" : "tl"
        )
      })];
      if (maybeNextIndex != null) {
        nextIndex = maybeNextIndex;
      }
    }
    const toEndKeys = {
      horizontal: [horizontalEndKey],
      vertical: [ARROW_DOWN],
      both: [horizontalEndKey, ARROW_DOWN]
    }[orientation];
    const toStartKeys = {
      horizontal: [horizontalStartKey],
      vertical: [ARROW_UP],
      both: [horizontalStartKey, ARROW_UP]
    }[orientation];
    const preventedKeys = isGrid ? allKeys : {
      horizontal: horizontalKeys,
      vertical: verticalKeys,
      both: allKeys
    }[orientation];
    if (nextIndex === activeIndex && [...toEndKeys, ...toStartKeys].includes(event.key)) {
      if (loop && nextIndex === maxIndex && toEndKeys.includes(event.key)) {
        nextIndex = minIndex;
      } else if (loop && nextIndex === minIndex && toStartKeys.includes(event.key)) {
        nextIndex = maxIndex;
      } else {
        nextIndex = findNonDisabledListIndex(elementsRef, {
          startingIndex: nextIndex,
          decrement: toStartKeys.includes(event.key),
          disabledIndices
        });
      }
    }
    if (nextIndex !== activeIndex && !isIndexOutOfListBounds(elementsRef, nextIndex)) {
      var _elementsRef$current$;
      event.stopPropagation();
      if (preventedKeys.includes(event.key)) {
        event.preventDefault();
      }
      onNavigate(nextIndex);
      (_elementsRef$current$ = elementsRef.current[nextIndex]) == null || _elementsRef$current$.focus();
    }
  }
  const computedProps = {
    ...domProps,
    ...renderElementProps,
    ref: forwardedRef,
    "aria-orientation": orientation === "both" ? void 0 : orientation,
    onKeyDown(e) {
      domProps.onKeyDown == null || domProps.onKeyDown(e);
      renderElementProps.onKeyDown == null || renderElementProps.onKeyDown(e);
      handleKeyDown(e);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingList, {
      elementsRef,
      children: renderJsx(render, computedProps)
    })
  });
});
const CompositeItem = /* @__PURE__ */ reactExports.forwardRef(function CompositeItem2(props, forwardedRef) {
  const {
    render,
    ...domProps
  } = props;
  const renderElementProps = render && typeof render !== "function" ? render.props : {};
  const {
    activeIndex,
    onNavigate
  } = reactExports.useContext(CompositeContext);
  const {
    ref,
    index: index2
  } = useListItem();
  const mergedRef = useMergeRefs([ref, forwardedRef, renderElementProps.ref]);
  const isActive = activeIndex === index2;
  const computedProps = {
    ...domProps,
    ...renderElementProps,
    ref: mergedRef,
    tabIndex: isActive ? 0 : -1,
    "data-active": isActive ? "" : void 0,
    onFocus(e) {
      domProps.onFocus == null || domProps.onFocus(e);
      renderElementProps.onFocus == null || renderElementProps.onFocus(e);
      onNavigate(index2);
    }
  };
  return renderJsx(render, computedProps);
});
const SafeReact = {
  ...React3
};
let serverHandoffComplete = false;
let count = 0;
const genId = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + count++
);
function useFloatingId() {
  const [id, setId] = reactExports.useState(() => serverHandoffComplete ? genId() : void 0);
  index$1(() => {
    if (id == null) {
      setId(genId());
    }
  }, []);
  reactExports.useEffect(() => {
    serverHandoffComplete = true;
  }, []);
  return id;
}
const useReactId = SafeReact.useId;
const useId = useReactId || useFloatingId;
function createEventEmitter() {
  const map = /* @__PURE__ */ new Map();
  return {
    emit(event, data) {
      var _map$get;
      (_map$get = map.get(event)) == null || _map$get.forEach((listener) => listener(data));
    },
    on(event, listener) {
      if (!map.has(event)) {
        map.set(event, /* @__PURE__ */ new Set());
      }
      map.get(event).add(listener);
    },
    off(event, listener) {
      var _map$get2;
      (_map$get2 = map.get(event)) == null || _map$get2.delete(listener);
    }
  };
}
const FloatingNodeContext = /* @__PURE__ */ reactExports.createContext(null);
const FloatingTreeContext = /* @__PURE__ */ reactExports.createContext(null);
const useFloatingParentNodeId = () => {
  var _React$useContext;
  return ((_React$useContext = reactExports.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
};
const useFloatingTree = () => reactExports.useContext(FloatingTreeContext);
function useFloatingNodeId(customParentId) {
  const id = useId();
  const tree = useFloatingTree();
  const reactParentId = useFloatingParentNodeId();
  const parentId = reactParentId;
  index$1(() => {
    if (!id) return;
    const node = {
      id,
      parentId
    };
    tree == null || tree.addNode(node);
    return () => {
      tree == null || tree.removeNode(node);
    };
  }, [tree, id, parentId]);
  return id;
}
function FloatingNode(props) {
  const {
    children,
    id
  } = props;
  const parentId = useFloatingParentNodeId();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingNodeContext.Provider, {
    value: reactExports.useMemo(() => ({
      id,
      parentId
    }), [id, parentId]),
    children
  });
}
function FloatingTree(props) {
  const {
    children
  } = props;
  const nodesRef = reactExports.useRef([]);
  const addNode = reactExports.useCallback((node) => {
    nodesRef.current = [...nodesRef.current, node];
  }, []);
  const removeNode = reactExports.useCallback((node) => {
    nodesRef.current = nodesRef.current.filter((n) => n !== node);
  }, []);
  const [events] = reactExports.useState(() => createEventEmitter());
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingTreeContext.Provider, {
    value: reactExports.useMemo(() => ({
      nodesRef,
      addNode,
      removeNode,
      events
    }), [addNode, removeNode, events]),
    children
  });
}
function createAttribute(name) {
  return "data-floating-ui-" + name;
}
function clearTimeoutIfSet(timeoutRef) {
  if (timeoutRef.current !== -1) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = -1;
  }
}
const safePolygonIdentifier = /* @__PURE__ */ createAttribute("safe-polygon");
function getDelay(value, prop, pointerType) {
  if (pointerType && !isMouseLikePointerType(pointerType)) {
    return 0;
  }
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "function") {
    const result = value();
    if (typeof result === "number") {
      return result;
    }
    return result == null ? void 0 : result[prop];
  }
  return value == null ? void 0 : value[prop];
}
function getRestMs(value) {
  if (typeof value === "function") {
    return value();
  }
  return value;
}
function useHover(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    dataRef,
    events,
    elements
  } = context;
  const {
    enabled = true,
    delay = 0,
    handleClose = null,
    mouseOnly = false,
    restMs = 0,
    move = true
  } = props;
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();
  const handleCloseRef = useLatestRef$1(handleClose);
  const delayRef = useLatestRef$1(delay);
  const openRef = useLatestRef$1(open);
  const restMsRef = useLatestRef$1(restMs);
  const pointerTypeRef = reactExports.useRef();
  const timeoutRef = reactExports.useRef(-1);
  const handlerRef = reactExports.useRef();
  const restTimeoutRef = reactExports.useRef(-1);
  const blockMouseMoveRef = reactExports.useRef(true);
  const performedPointerEventsMutationRef = reactExports.useRef(false);
  const unbindMouseMoveRef = reactExports.useRef(() => {
  });
  const restTimeoutPendingRef = reactExports.useRef(false);
  const isHoverOpen = reactExports.useCallback(() => {
    var _dataRef$current$open;
    const type = (_dataRef$current$open = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open.type;
    return (type == null ? void 0 : type.includes("mouse")) && type !== "mousedown";
  }, [dataRef]);
  reactExports.useEffect(() => {
    if (!enabled) return;
    function onOpenChange2(_ref) {
      let {
        open: open2
      } = _ref;
      if (!open2) {
        clearTimeoutIfSet(timeoutRef);
        clearTimeoutIfSet(restTimeoutRef);
        blockMouseMoveRef.current = true;
        restTimeoutPendingRef.current = false;
      }
    }
    events.on("openchange", onOpenChange2);
    return () => {
      events.off("openchange", onOpenChange2);
    };
  }, [enabled, events]);
  reactExports.useEffect(() => {
    if (!enabled) return;
    if (!handleCloseRef.current) return;
    if (!open) return;
    function onLeave(event) {
      if (isHoverOpen()) {
        onOpenChange(false, event, "hover");
      }
    }
    const html = getDocument$1(elements.floating).documentElement;
    html.addEventListener("mouseleave", onLeave);
    return () => {
      html.removeEventListener("mouseleave", onLeave);
    };
  }, [elements.floating, open, onOpenChange, enabled, handleCloseRef, isHoverOpen]);
  const closeWithDelay = reactExports.useCallback(function(event, runElseBranch, reason) {
    if (runElseBranch === void 0) {
      runElseBranch = true;
    }
    if (reason === void 0) {
      reason = "hover";
    }
    const closeDelay = getDelay(delayRef.current, "close", pointerTypeRef.current);
    if (closeDelay && !handlerRef.current) {
      clearTimeoutIfSet(timeoutRef);
      timeoutRef.current = window.setTimeout(() => onOpenChange(false, event, reason), closeDelay);
    } else if (runElseBranch) {
      clearTimeoutIfSet(timeoutRef);
      onOpenChange(false, event, reason);
    }
  }, [delayRef, onOpenChange]);
  const cleanupMouseMoveHandler = useEffectEvent(() => {
    unbindMouseMoveRef.current();
    handlerRef.current = void 0;
  });
  const clearPointerEvents = useEffectEvent(() => {
    if (performedPointerEventsMutationRef.current) {
      const body = getDocument$1(elements.floating).body;
      body.style.pointerEvents = "";
      body.removeAttribute(safePolygonIdentifier);
      performedPointerEventsMutationRef.current = false;
    }
  });
  const isClickLikeOpenEvent = useEffectEvent(() => {
    return dataRef.current.openEvent ? ["click", "mousedown"].includes(dataRef.current.openEvent.type) : false;
  });
  reactExports.useEffect(() => {
    if (!enabled) return;
    function onReferenceMouseEnter(event) {
      clearTimeoutIfSet(timeoutRef);
      blockMouseMoveRef.current = false;
      if (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current) || getRestMs(restMsRef.current) > 0 && !getDelay(delayRef.current, "open")) {
        return;
      }
      const openDelay = getDelay(delayRef.current, "open", pointerTypeRef.current);
      if (openDelay) {
        timeoutRef.current = window.setTimeout(() => {
          if (!openRef.current) {
            onOpenChange(true, event, "hover");
          }
        }, openDelay);
      } else if (!open) {
        onOpenChange(true, event, "hover");
      }
    }
    function onReferenceMouseLeave(event) {
      if (isClickLikeOpenEvent()) {
        clearPointerEvents();
        return;
      }
      unbindMouseMoveRef.current();
      const doc = getDocument$1(elements.floating);
      clearTimeoutIfSet(restTimeoutRef);
      restTimeoutPendingRef.current = false;
      if (handleCloseRef.current && dataRef.current.floatingContext) {
        if (!open) {
          clearTimeoutIfSet(timeoutRef);
        }
        handlerRef.current = handleCloseRef.current({
          ...dataRef.current.floatingContext,
          tree,
          x: event.clientX,
          y: event.clientY,
          onClose() {
            clearPointerEvents();
            cleanupMouseMoveHandler();
            if (!isClickLikeOpenEvent()) {
              closeWithDelay(event, true, "safe-polygon");
            }
          }
        });
        const handler = handlerRef.current;
        doc.addEventListener("mousemove", handler);
        unbindMouseMoveRef.current = () => {
          doc.removeEventListener("mousemove", handler);
        };
        return;
      }
      const shouldClose = pointerTypeRef.current === "touch" ? !contains$1(elements.floating, event.relatedTarget) : true;
      if (shouldClose) {
        closeWithDelay(event);
      }
    }
    function onScrollMouseLeave(event) {
      if (isClickLikeOpenEvent()) return;
      if (!dataRef.current.floatingContext) return;
      handleCloseRef.current == null || handleCloseRef.current({
        ...dataRef.current.floatingContext,
        tree,
        x: event.clientX,
        y: event.clientY,
        onClose() {
          clearPointerEvents();
          cleanupMouseMoveHandler();
          if (!isClickLikeOpenEvent()) {
            closeWithDelay(event);
          }
        }
      })(event);
    }
    function onFloatingMouseEnter() {
      clearTimeoutIfSet(timeoutRef);
    }
    function onFloatingMouseLeave(event) {
      if (!isClickLikeOpenEvent()) {
        closeWithDelay(event, false);
      }
    }
    if (isElement(elements.domReference)) {
      const reference2 = elements.domReference;
      const floating = elements.floating;
      if (open) {
        reference2.addEventListener("mouseleave", onScrollMouseLeave);
      }
      if (move) {
        reference2.addEventListener("mousemove", onReferenceMouseEnter, {
          once: true
        });
      }
      reference2.addEventListener("mouseenter", onReferenceMouseEnter);
      reference2.addEventListener("mouseleave", onReferenceMouseLeave);
      if (floating) {
        floating.addEventListener("mouseleave", onScrollMouseLeave);
        floating.addEventListener("mouseenter", onFloatingMouseEnter);
        floating.addEventListener("mouseleave", onFloatingMouseLeave);
      }
      return () => {
        if (open) {
          reference2.removeEventListener("mouseleave", onScrollMouseLeave);
        }
        if (move) {
          reference2.removeEventListener("mousemove", onReferenceMouseEnter);
        }
        reference2.removeEventListener("mouseenter", onReferenceMouseEnter);
        reference2.removeEventListener("mouseleave", onReferenceMouseLeave);
        if (floating) {
          floating.removeEventListener("mouseleave", onScrollMouseLeave);
          floating.removeEventListener("mouseenter", onFloatingMouseEnter);
          floating.removeEventListener("mouseleave", onFloatingMouseLeave);
        }
      };
    }
  }, [elements, enabled, context, mouseOnly, move, closeWithDelay, cleanupMouseMoveHandler, clearPointerEvents, onOpenChange, open, openRef, tree, delayRef, handleCloseRef, dataRef, isClickLikeOpenEvent, restMsRef]);
  index$1(() => {
    var _handleCloseRef$curre;
    if (!enabled) return;
    if (open && (_handleCloseRef$curre = handleCloseRef.current) != null && _handleCloseRef$curre.__options.blockPointerEvents && isHoverOpen()) {
      performedPointerEventsMutationRef.current = true;
      const floatingEl = elements.floating;
      if (isElement(elements.domReference) && floatingEl) {
        var _tree$nodesRef$curren;
        const body = getDocument$1(elements.floating).body;
        body.setAttribute(safePolygonIdentifier, "");
        const ref = elements.domReference;
        const parentFloating = tree == null || (_tree$nodesRef$curren = tree.nodesRef.current.find((node) => node.id === parentId)) == null || (_tree$nodesRef$curren = _tree$nodesRef$curren.context) == null ? void 0 : _tree$nodesRef$curren.elements.floating;
        if (parentFloating) {
          parentFloating.style.pointerEvents = "";
        }
        body.style.pointerEvents = "none";
        ref.style.pointerEvents = "auto";
        floatingEl.style.pointerEvents = "auto";
        return () => {
          body.style.pointerEvents = "";
          ref.style.pointerEvents = "";
          floatingEl.style.pointerEvents = "";
        };
      }
    }
  }, [enabled, open, parentId, elements, tree, handleCloseRef, isHoverOpen]);
  index$1(() => {
    if (!open) {
      pointerTypeRef.current = void 0;
      restTimeoutPendingRef.current = false;
      cleanupMouseMoveHandler();
      clearPointerEvents();
    }
  }, [open, cleanupMouseMoveHandler, clearPointerEvents]);
  reactExports.useEffect(() => {
    return () => {
      cleanupMouseMoveHandler();
      clearTimeoutIfSet(timeoutRef);
      clearTimeoutIfSet(restTimeoutRef);
      clearPointerEvents();
    };
  }, [enabled, elements.domReference, cleanupMouseMoveHandler, clearPointerEvents]);
  const reference = reactExports.useMemo(() => {
    function setPointerRef(event) {
      pointerTypeRef.current = event.pointerType;
    }
    return {
      onPointerDown: setPointerRef,
      onPointerEnter: setPointerRef,
      onMouseMove(event) {
        const {
          nativeEvent
        } = event;
        function handleMouseMove() {
          if (!blockMouseMoveRef.current && !openRef.current) {
            onOpenChange(true, nativeEvent, "hover");
          }
        }
        if (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current)) {
          return;
        }
        if (open || getRestMs(restMsRef.current) === 0) {
          return;
        }
        if (restTimeoutPendingRef.current && event.movementX ** 2 + event.movementY ** 2 < 2) {
          return;
        }
        clearTimeoutIfSet(restTimeoutRef);
        if (pointerTypeRef.current === "touch") {
          handleMouseMove();
        } else {
          restTimeoutPendingRef.current = true;
          restTimeoutRef.current = window.setTimeout(handleMouseMove, getRestMs(restMsRef.current));
        }
      }
    };
  }, [mouseOnly, onOpenChange, open, openRef, restMsRef]);
  return reactExports.useMemo(() => enabled ? {
    reference
  } : {}, [enabled, reference]);
}
const NOOP = () => {
};
const FloatingDelayGroupContext = /* @__PURE__ */ reactExports.createContext({
  delay: 0,
  initialDelay: 0,
  timeoutMs: 0,
  currentId: null,
  setCurrentId: NOOP,
  setState: NOOP,
  isInstantPhase: false
});
const useDelayGroupContext = () => reactExports.useContext(FloatingDelayGroupContext);
function FloatingDelayGroup(props) {
  const {
    children,
    delay,
    timeoutMs = 0
  } = props;
  const [state, setState] = reactExports.useReducer((prev, next) => ({
    ...prev,
    ...next
  }), {
    delay,
    timeoutMs,
    initialDelay: delay,
    currentId: null,
    isInstantPhase: false
  });
  const initialCurrentIdRef = reactExports.useRef(null);
  const setCurrentId = reactExports.useCallback((currentId) => {
    setState({
      currentId
    });
  }, []);
  index$1(() => {
    if (state.currentId) {
      if (initialCurrentIdRef.current === null) {
        initialCurrentIdRef.current = state.currentId;
      } else if (!state.isInstantPhase) {
        setState({
          isInstantPhase: true
        });
      }
    } else {
      if (state.isInstantPhase) {
        setState({
          isInstantPhase: false
        });
      }
      initialCurrentIdRef.current = null;
    }
  }, [state.currentId, state.isInstantPhase]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingDelayGroupContext.Provider, {
    value: reactExports.useMemo(() => ({
      ...state,
      setState,
      setCurrentId
    }), [state, setCurrentId]),
    children
  });
}
function useDelayGroup(context, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    open,
    onOpenChange,
    floatingId
  } = context;
  const {
    id: optionId,
    enabled = true
  } = options;
  const id = optionId != null ? optionId : floatingId;
  const groupContext = useDelayGroupContext();
  const {
    currentId,
    setCurrentId,
    initialDelay,
    setState,
    timeoutMs
  } = groupContext;
  index$1(() => {
    if (!enabled) return;
    if (!currentId) return;
    setState({
      delay: {
        open: 1,
        close: getDelay(initialDelay, "close")
      }
    });
    if (currentId !== id) {
      onOpenChange(false);
    }
  }, [enabled, id, onOpenChange, setState, currentId, initialDelay]);
  index$1(() => {
    function unset() {
      onOpenChange(false);
      setState({
        delay: initialDelay,
        currentId: null
      });
    }
    if (!enabled) return;
    if (!currentId) return;
    if (!open && currentId === id) {
      if (timeoutMs) {
        const timeout = window.setTimeout(unset, timeoutMs);
        return () => {
          clearTimeout(timeout);
        };
      }
      unset();
    }
  }, [enabled, open, setState, currentId, id, onOpenChange, initialDelay, timeoutMs]);
  index$1(() => {
    if (!enabled) return;
    if (setCurrentId === NOOP || !open) return;
    setCurrentId(id);
  }, [enabled, open, setCurrentId, id]);
  return groupContext;
}
let rafId = 0;
function enqueueFocus(el, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    preventScroll = false,
    cancelPrevious = true,
    sync = false
  } = options;
  cancelPrevious && cancelAnimationFrame(rafId);
  const exec = () => el == null ? void 0 : el.focus({
    preventScroll
  });
  if (sync) {
    exec();
  } else {
    rafId = requestAnimationFrame(exec);
  }
}
function contains(parent, child) {
  if (!parent || !child) {
    return false;
  }
  const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();
  if (parent.contains(child)) {
    return true;
  }
  if (rootNode && isShadowRoot(rootNode)) {
    let next = child;
    while (next) {
      if (parent === next) {
        return true;
      }
      next = next.parentNode || next.host;
    }
  }
  return false;
}
function getTarget(event) {
  if ("composedPath" in event) {
    return event.composedPath()[0];
  }
  return event.target;
}
function getDocument(node) {
  return (node == null ? void 0 : node.ownerDocument) || document;
}
let counterMap = /* @__PURE__ */ new WeakMap();
let uncontrolledElementsSet = /* @__PURE__ */ new WeakSet();
let markerMap = {};
let lockCount$1 = 0;
const supportsInert = () => typeof HTMLElement !== "undefined" && "inert" in HTMLElement.prototype;
const unwrapHost = (node) => node && (node.host || unwrapHost(node.parentNode));
const correctElements = (parent, targets) => targets.map((target) => {
  if (parent.contains(target)) {
    return target;
  }
  const correctedTarget = unwrapHost(target);
  if (parent.contains(correctedTarget)) {
    return correctedTarget;
  }
  return null;
}).filter((x) => x != null);
function applyAttributeToOthers(uncorrectedAvoidElements, body, ariaHidden, inert) {
  const markerName = "data-floating-ui-inert";
  const controlAttribute = inert ? "inert" : ariaHidden ? "aria-hidden" : null;
  const avoidElements = correctElements(body, uncorrectedAvoidElements);
  const elementsToKeep = /* @__PURE__ */ new Set();
  const elementsToStop = new Set(avoidElements);
  const hiddenElements = [];
  if (!markerMap[markerName]) {
    markerMap[markerName] = /* @__PURE__ */ new WeakMap();
  }
  const markerCounter = markerMap[markerName];
  avoidElements.forEach(keep);
  deep(body);
  elementsToKeep.clear();
  function keep(el) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    el.parentNode && keep(el.parentNode);
  }
  function deep(parent) {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }
    [].forEach.call(parent.children, (node) => {
      if (getNodeName(node) === "script") return;
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        const attr2 = controlAttribute ? node.getAttribute(controlAttribute) : null;
        const alreadyHidden = attr2 !== null && attr2 !== "false";
        const currentCounterValue = counterMap.get(node) || 0;
        const counterValue = controlAttribute ? currentCounterValue + 1 : currentCounterValue;
        const markerValue = (markerCounter.get(node) || 0) + 1;
        counterMap.set(node, counterValue);
        markerCounter.set(node, markerValue);
        hiddenElements.push(node);
        if (counterValue === 1 && alreadyHidden) {
          uncontrolledElementsSet.add(node);
        }
        if (markerValue === 1) {
          node.setAttribute(markerName, "");
        }
        if (!alreadyHidden && controlAttribute) {
          node.setAttribute(controlAttribute, controlAttribute === "inert" ? "" : "true");
        }
      }
    });
  }
  lockCount$1++;
  return () => {
    hiddenElements.forEach((element) => {
      const currentCounterValue = counterMap.get(element) || 0;
      const counterValue = controlAttribute ? currentCounterValue - 1 : currentCounterValue;
      const markerValue = (markerCounter.get(element) || 0) - 1;
      counterMap.set(element, counterValue);
      markerCounter.set(element, markerValue);
      if (!counterValue) {
        if (!uncontrolledElementsSet.has(element) && controlAttribute) {
          element.removeAttribute(controlAttribute);
        }
        uncontrolledElementsSet.delete(element);
      }
      if (!markerValue) {
        element.removeAttribute(markerName);
      }
    });
    lockCount$1--;
    if (!lockCount$1) {
      counterMap = /* @__PURE__ */ new WeakMap();
      counterMap = /* @__PURE__ */ new WeakMap();
      uncontrolledElementsSet = /* @__PURE__ */ new WeakSet();
      markerMap = {};
    }
  };
}
function markOthers(avoidElements, ariaHidden, inert) {
  if (ariaHidden === void 0) {
    ariaHidden = false;
  }
  if (inert === void 0) {
    inert = false;
  }
  const body = getDocument(avoidElements[0]).body;
  return applyAttributeToOthers(avoidElements.concat(Array.from(body.querySelectorAll("[aria-live]"))), body, ariaHidden, inert);
}
const HIDDEN_STYLES = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "fixed",
  whiteSpace: "nowrap",
  width: "1px",
  top: 0,
  left: 0
};
const FocusGuard = /* @__PURE__ */ reactExports.forwardRef(function FocusGuard2(props, ref) {
  const [role, setRole] = reactExports.useState();
  index$1(() => {
    if (isSafari()) {
      setRole("button");
    }
  }, []);
  const restProps = {
    ref,
    tabIndex: 0,
    // Role is only for VoiceOver
    role,
    "aria-hidden": role ? void 0 : true,
    [createAttribute("focus-guard")]: "",
    style: HIDDEN_STYLES
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
    ...props,
    ...restProps
  });
});
const PortalContext = /* @__PURE__ */ reactExports.createContext(null);
const attr = /* @__PURE__ */ createAttribute("portal");
function useFloatingPortalNode(props) {
  if (props === void 0) {
    props = {};
  }
  const {
    id,
    root
  } = props;
  const uniqueId = useId();
  const portalContext = usePortalContext();
  const [portalNode, setPortalNode] = reactExports.useState(null);
  const portalNodeRef = reactExports.useRef(null);
  index$1(() => {
    return () => {
      portalNode == null || portalNode.remove();
      queueMicrotask(() => {
        portalNodeRef.current = null;
      });
    };
  }, [portalNode]);
  index$1(() => {
    if (!uniqueId) return;
    if (portalNodeRef.current) return;
    const existingIdRoot = id ? document.getElementById(id) : null;
    if (!existingIdRoot) return;
    const subRoot = document.createElement("div");
    subRoot.id = uniqueId;
    subRoot.setAttribute(attr, "");
    existingIdRoot.appendChild(subRoot);
    portalNodeRef.current = subRoot;
    setPortalNode(subRoot);
  }, [id, uniqueId]);
  index$1(() => {
    if (root === null) return;
    if (!uniqueId) return;
    if (portalNodeRef.current) return;
    let container = root || (portalContext == null ? void 0 : portalContext.portalNode);
    if (container && !isElement(container)) container = container.current;
    container = container || document.body;
    let idWrapper = null;
    if (id) {
      idWrapper = document.createElement("div");
      idWrapper.id = id;
      container.appendChild(idWrapper);
    }
    const subRoot = document.createElement("div");
    subRoot.id = uniqueId;
    subRoot.setAttribute(attr, "");
    container = idWrapper || container;
    container.appendChild(subRoot);
    portalNodeRef.current = subRoot;
    setPortalNode(subRoot);
  }, [id, root, uniqueId, portalContext]);
  return portalNode;
}
function FloatingPortal(props) {
  const {
    children,
    id,
    root,
    preserveTabOrder = true
  } = props;
  const portalNode = useFloatingPortalNode({
    id,
    root
  });
  const [focusManagerState, setFocusManagerState] = reactExports.useState(null);
  const beforeOutsideRef = reactExports.useRef(null);
  const afterOutsideRef = reactExports.useRef(null);
  const beforeInsideRef = reactExports.useRef(null);
  const afterInsideRef = reactExports.useRef(null);
  const modal = focusManagerState == null ? void 0 : focusManagerState.modal;
  const open = focusManagerState == null ? void 0 : focusManagerState.open;
  const shouldRenderGuards = (
    // The FocusManager and therefore floating element are currently open/
    // rendered.
    !!focusManagerState && // Guards are only for non-modal focus management.
    !focusManagerState.modal && // Don't render if unmount is transitioning.
    focusManagerState.open && preserveTabOrder && !!(root || portalNode)
  );
  reactExports.useEffect(() => {
    if (!portalNode || !preserveTabOrder || modal) {
      return;
    }
    function onFocus(event) {
      if (portalNode && isOutsideEvent(event)) {
        const focusing = event.type === "focusin";
        const manageFocus = focusing ? enableFocusInside : disableFocusInside;
        manageFocus(portalNode);
      }
    }
    portalNode.addEventListener("focusin", onFocus, true);
    portalNode.addEventListener("focusout", onFocus, true);
    return () => {
      portalNode.removeEventListener("focusin", onFocus, true);
      portalNode.removeEventListener("focusout", onFocus, true);
    };
  }, [portalNode, preserveTabOrder, modal]);
  reactExports.useEffect(() => {
    if (!portalNode) return;
    if (open) return;
    enableFocusInside(portalNode);
  }, [open, portalNode]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PortalContext.Provider, {
    value: reactExports.useMemo(() => ({
      preserveTabOrder,
      beforeOutsideRef,
      afterOutsideRef,
      beforeInsideRef,
      afterInsideRef,
      portalNode,
      setFocusManagerState
    }), [preserveTabOrder, portalNode]),
    children: [shouldRenderGuards && portalNode && /* @__PURE__ */ jsxRuntimeExports.jsx(FocusGuard, {
      "data-type": "outside",
      ref: beforeOutsideRef,
      onFocus: (event) => {
        if (isOutsideEvent(event, portalNode)) {
          var _beforeInsideRef$curr;
          (_beforeInsideRef$curr = beforeInsideRef.current) == null || _beforeInsideRef$curr.focus();
        } else {
          const domReference = focusManagerState ? focusManagerState.domReference : null;
          const prevTabbable = getPreviousTabbable(domReference);
          prevTabbable == null || prevTabbable.focus();
        }
      }
    }), shouldRenderGuards && portalNode && /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
      "aria-owns": portalNode.id,
      style: HIDDEN_STYLES
    }), portalNode && /* @__PURE__ */ reactDomExports.createPortal(children, portalNode), shouldRenderGuards && portalNode && /* @__PURE__ */ jsxRuntimeExports.jsx(FocusGuard, {
      "data-type": "outside",
      ref: afterOutsideRef,
      onFocus: (event) => {
        if (isOutsideEvent(event, portalNode)) {
          var _afterInsideRef$curre;
          (_afterInsideRef$curre = afterInsideRef.current) == null || _afterInsideRef$curre.focus();
        } else {
          const domReference = focusManagerState ? focusManagerState.domReference : null;
          const nextTabbable = getNextTabbable(domReference);
          nextTabbable == null || nextTabbable.focus();
          (focusManagerState == null ? void 0 : focusManagerState.closeOnFocusOut) && (focusManagerState == null ? void 0 : focusManagerState.onOpenChange(false, event.nativeEvent, "focus-out"));
        }
      }
    })]
  });
}
const usePortalContext = () => reactExports.useContext(PortalContext);
function useLiteMergeRefs(refs) {
  return reactExports.useMemo(() => {
    return (value) => {
      refs.forEach((ref) => {
        if (ref) {
          ref.current = value;
        }
      });
    };
  }, refs);
}
const LIST_LIMIT = 20;
let previouslyFocusedElements = [];
function addPreviouslyFocusedElement(element) {
  previouslyFocusedElements = previouslyFocusedElements.filter((el) => el.isConnected);
  if (element && getNodeName(element) !== "body") {
    previouslyFocusedElements.push(element);
    if (previouslyFocusedElements.length > LIST_LIMIT) {
      previouslyFocusedElements = previouslyFocusedElements.slice(-20);
    }
  }
}
function getPreviouslyFocusedElement() {
  return previouslyFocusedElements.slice().reverse().find((el) => el.isConnected);
}
function getFirstTabbableElement(container) {
  const tabbableOptions = getTabbableOptions();
  if (isTabbable(container, tabbableOptions)) {
    return container;
  }
  return tabbable(container, tabbableOptions)[0] || container;
}
function handleTabIndex(floatingFocusElement, orderRef) {
  var _floatingFocusElement;
  if (!orderRef.current.includes("floating") && !((_floatingFocusElement = floatingFocusElement.getAttribute("role")) != null && _floatingFocusElement.includes("dialog"))) {
    return;
  }
  const options = getTabbableOptions();
  const focusableElements = focusable(floatingFocusElement, options);
  const tabbableContent = focusableElements.filter((element) => {
    const dataTabIndex = element.getAttribute("data-tabindex") || "";
    return isTabbable(element, options) || element.hasAttribute("data-tabindex") && !dataTabIndex.startsWith("-");
  });
  const tabIndex = floatingFocusElement.getAttribute("tabindex");
  if (orderRef.current.includes("floating") || tabbableContent.length === 0) {
    if (tabIndex !== "0") {
      floatingFocusElement.setAttribute("tabindex", "0");
    }
  } else if (tabIndex !== "-1" || floatingFocusElement.hasAttribute("data-tabindex") && floatingFocusElement.getAttribute("data-tabindex") !== "-1") {
    floatingFocusElement.setAttribute("tabindex", "-1");
    floatingFocusElement.setAttribute("data-tabindex", "-1");
  }
}
const VisuallyHiddenDismiss = /* @__PURE__ */ reactExports.forwardRef(function VisuallyHiddenDismiss2(props, ref) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
    ...props,
    type: "button",
    ref,
    tabIndex: -1,
    style: HIDDEN_STYLES
  });
});
function FloatingFocusManager(props) {
  const {
    context,
    children,
    disabled = false,
    order = ["content"],
    guards: _guards = true,
    initialFocus = 0,
    returnFocus = true,
    restoreFocus = false,
    modal = true,
    visuallyHiddenDismiss = false,
    closeOnFocusOut = true,
    outsideElementsInert = false,
    getInsideElements: _getInsideElements = () => []
  } = props;
  const {
    open,
    onOpenChange,
    events,
    dataRef,
    elements: {
      domReference,
      floating
    }
  } = context;
  const getNodeId = useEffectEvent(() => {
    var _dataRef$current$floa;
    return (_dataRef$current$floa = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa.nodeId;
  });
  const getInsideElements = useEffectEvent(_getInsideElements);
  const ignoreInitialFocus = typeof initialFocus === "number" && initialFocus < 0;
  const isUntrappedTypeableCombobox = isTypeableCombobox(domReference) && ignoreInitialFocus;
  const inertSupported = supportsInert();
  const guards = inertSupported ? _guards : true;
  const useInert = !guards || inertSupported && outsideElementsInert;
  const orderRef = useLatestRef$1(order);
  const initialFocusRef = useLatestRef$1(initialFocus);
  const returnFocusRef = useLatestRef$1(returnFocus);
  const tree = useFloatingTree();
  const portalContext = usePortalContext();
  const startDismissButtonRef = reactExports.useRef(null);
  const endDismissButtonRef = reactExports.useRef(null);
  const preventReturnFocusRef = reactExports.useRef(false);
  const isPointerDownRef = reactExports.useRef(false);
  const tabbableIndexRef = reactExports.useRef(-1);
  const isInsidePortal = portalContext != null;
  const floatingFocusElement = getFloatingFocusElement(floating);
  const getTabbableContent = useEffectEvent(function(container) {
    if (container === void 0) {
      container = floatingFocusElement;
    }
    return container ? tabbable(container, getTabbableOptions()) : [];
  });
  const getTabbableElements = useEffectEvent((container) => {
    const content = getTabbableContent(container);
    return orderRef.current.map((type) => {
      if (domReference && type === "reference") {
        return domReference;
      }
      if (floatingFocusElement && type === "floating") {
        return floatingFocusElement;
      }
      return content;
    }).filter(Boolean).flat();
  });
  reactExports.useEffect(() => {
    if (disabled) return;
    if (!modal) return;
    function onKeyDown(event) {
      if (event.key === "Tab") {
        if (contains$1(floatingFocusElement, activeElement(getDocument$1(floatingFocusElement))) && getTabbableContent().length === 0 && !isUntrappedTypeableCombobox) {
          stopEvent(event);
        }
        const els = getTabbableElements();
        const target = getTarget$1(event);
        if (orderRef.current[0] === "reference" && target === domReference) {
          stopEvent(event);
          if (event.shiftKey) {
            enqueueFocus(els[els.length - 1]);
          } else {
            enqueueFocus(els[1]);
          }
        }
        if (orderRef.current[1] === "floating" && target === floatingFocusElement && event.shiftKey) {
          stopEvent(event);
          enqueueFocus(els[0]);
        }
      }
    }
    const doc = getDocument$1(floatingFocusElement);
    doc.addEventListener("keydown", onKeyDown);
    return () => {
      doc.removeEventListener("keydown", onKeyDown);
    };
  }, [disabled, domReference, floatingFocusElement, modal, orderRef, isUntrappedTypeableCombobox, getTabbableContent, getTabbableElements]);
  reactExports.useEffect(() => {
    if (disabled) return;
    if (!floating) return;
    function handleFocusIn(event) {
      const target = getTarget$1(event);
      const tabbableContent = getTabbableContent();
      const tabbableIndex = tabbableContent.indexOf(target);
      if (tabbableIndex !== -1) {
        tabbableIndexRef.current = tabbableIndex;
      }
    }
    floating.addEventListener("focusin", handleFocusIn);
    return () => {
      floating.removeEventListener("focusin", handleFocusIn);
    };
  }, [disabled, floating, getTabbableContent]);
  reactExports.useEffect(() => {
    if (disabled) return;
    if (!closeOnFocusOut) return;
    function handlePointerDown() {
      isPointerDownRef.current = true;
      setTimeout(() => {
        isPointerDownRef.current = false;
      });
    }
    function handleFocusOutside(event) {
      const relatedTarget = event.relatedTarget;
      const currentTarget = event.currentTarget;
      queueMicrotask(() => {
        const nodeId = getNodeId();
        const movedToUnrelatedNode = !(contains$1(domReference, relatedTarget) || contains$1(floating, relatedTarget) || contains$1(relatedTarget, floating) || contains$1(portalContext == null ? void 0 : portalContext.portalNode, relatedTarget) || relatedTarget != null && relatedTarget.hasAttribute(createAttribute("focus-guard")) || tree && (getNodeChildren$1(tree.nodesRef.current, nodeId).find((node) => {
          var _node$context, _node$context2;
          return contains$1((_node$context = node.context) == null ? void 0 : _node$context.elements.floating, relatedTarget) || contains$1((_node$context2 = node.context) == null ? void 0 : _node$context2.elements.domReference, relatedTarget);
        }) || getNodeAncestors(tree.nodesRef.current, nodeId).find((node) => {
          var _node$context3, _node$context4, _node$context5;
          return [(_node$context3 = node.context) == null ? void 0 : _node$context3.elements.floating, getFloatingFocusElement((_node$context4 = node.context) == null ? void 0 : _node$context4.elements.floating)].includes(relatedTarget) || ((_node$context5 = node.context) == null ? void 0 : _node$context5.elements.domReference) === relatedTarget;
        })));
        if (currentTarget === domReference && floatingFocusElement) {
          handleTabIndex(floatingFocusElement, orderRef);
        }
        if (restoreFocus && movedToUnrelatedNode && activeElement(getDocument$1(floatingFocusElement)) === getDocument$1(floatingFocusElement).body) {
          if (isHTMLElement(floatingFocusElement)) {
            floatingFocusElement.focus();
          }
          const prevTabbableIndex = tabbableIndexRef.current;
          const tabbableContent = getTabbableContent();
          const nodeToFocus = tabbableContent[prevTabbableIndex] || tabbableContent[tabbableContent.length - 1] || floatingFocusElement;
          if (isHTMLElement(nodeToFocus)) {
            nodeToFocus.focus();
          }
        }
        if ((isUntrappedTypeableCombobox ? true : !modal) && relatedTarget && movedToUnrelatedNode && !isPointerDownRef.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
        relatedTarget !== getPreviouslyFocusedElement()) {
          preventReturnFocusRef.current = true;
          onOpenChange(false, event, "focus-out");
        }
      });
    }
    if (floating && isHTMLElement(domReference)) {
      domReference.addEventListener("focusout", handleFocusOutside);
      domReference.addEventListener("pointerdown", handlePointerDown);
      floating.addEventListener("focusout", handleFocusOutside);
      return () => {
        domReference.removeEventListener("focusout", handleFocusOutside);
        domReference.removeEventListener("pointerdown", handlePointerDown);
        floating.removeEventListener("focusout", handleFocusOutside);
      };
    }
  }, [disabled, domReference, floating, floatingFocusElement, modal, tree, portalContext, onOpenChange, closeOnFocusOut, restoreFocus, getTabbableContent, isUntrappedTypeableCombobox, getNodeId, orderRef]);
  const beforeGuardRef = reactExports.useRef(null);
  const afterGuardRef = reactExports.useRef(null);
  const mergedBeforeGuardRef = useLiteMergeRefs([beforeGuardRef, portalContext == null ? void 0 : portalContext.beforeInsideRef]);
  const mergedAfterGuardRef = useLiteMergeRefs([afterGuardRef, portalContext == null ? void 0 : portalContext.afterInsideRef]);
  reactExports.useEffect(() => {
    var _portalContext$portal, _ancestors$find;
    if (disabled) return;
    if (!floating) return;
    const portalNodes = Array.from((portalContext == null || (_portalContext$portal = portalContext.portalNode) == null ? void 0 : _portalContext$portal.querySelectorAll("[" + createAttribute("portal") + "]")) || []);
    const ancestors = tree ? getNodeAncestors(tree.nodesRef.current, getNodeId()) : [];
    const ancestorFloatingNodes = tree && !modal ? ancestors.map((node) => {
      var _node$context6;
      return (_node$context6 = node.context) == null ? void 0 : _node$context6.elements.floating;
    }) : [];
    const rootAncestorComboboxDomReference = (_ancestors$find = ancestors.find((node) => {
      var _node$context7;
      return isTypeableCombobox(((_node$context7 = node.context) == null ? void 0 : _node$context7.elements.domReference) || null);
    })) == null || (_ancestors$find = _ancestors$find.context) == null ? void 0 : _ancestors$find.elements.domReference;
    const insideElements = [floating, rootAncestorComboboxDomReference, ...portalNodes, ...ancestorFloatingNodes, ...getInsideElements(), startDismissButtonRef.current, endDismissButtonRef.current, beforeGuardRef.current, afterGuardRef.current, portalContext == null ? void 0 : portalContext.beforeOutsideRef.current, portalContext == null ? void 0 : portalContext.afterOutsideRef.current, orderRef.current.includes("reference") || isUntrappedTypeableCombobox ? domReference : null].filter((x) => x != null);
    const cleanup2 = modal || isUntrappedTypeableCombobox ? markOthers(insideElements, !useInert, useInert) : markOthers(insideElements);
    return () => {
      cleanup2();
    };
  }, [disabled, domReference, floating, modal, orderRef, portalContext, isUntrappedTypeableCombobox, guards, useInert, tree, getNodeId, getInsideElements]);
  index$1(() => {
    if (disabled || !isHTMLElement(floatingFocusElement)) return;
    const doc = getDocument$1(floatingFocusElement);
    const previouslyFocusedElement = activeElement(doc);
    queueMicrotask(() => {
      const focusableElements = getTabbableElements(floatingFocusElement);
      const initialFocusValue = initialFocusRef.current;
      const elToFocus = (typeof initialFocusValue === "number" ? focusableElements[initialFocusValue] : initialFocusValue.current) || floatingFocusElement;
      const focusAlreadyInsideFloatingEl = contains$1(floatingFocusElement, previouslyFocusedElement);
      if (!ignoreInitialFocus && !focusAlreadyInsideFloatingEl && open) {
        enqueueFocus(elToFocus, {
          preventScroll: elToFocus === floatingFocusElement
        });
      }
    });
  }, [disabled, open, floatingFocusElement, ignoreInitialFocus, getTabbableElements, initialFocusRef]);
  index$1(() => {
    if (disabled || !floatingFocusElement) return;
    let preventReturnFocusScroll = false;
    const doc = getDocument$1(floatingFocusElement);
    const previouslyFocusedElement = activeElement(doc);
    addPreviouslyFocusedElement(previouslyFocusedElement);
    function onOpenChange2(_ref) {
      let {
        reason,
        event,
        nested
      } = _ref;
      if (["hover", "safe-polygon"].includes(reason) && event.type === "mouseleave") {
        preventReturnFocusRef.current = true;
      }
      if (reason !== "outside-press") return;
      if (nested) {
        preventReturnFocusRef.current = false;
        preventReturnFocusScroll = true;
      } else if (isVirtualClick(event) || isVirtualPointerEvent(event)) {
        preventReturnFocusRef.current = false;
      } else {
        let isPreventScrollSupported = false;
        document.createElement("div").focus({
          get preventScroll() {
            isPreventScrollSupported = true;
            return false;
          }
        });
        if (isPreventScrollSupported) {
          preventReturnFocusRef.current = false;
          preventReturnFocusScroll = true;
        } else {
          preventReturnFocusRef.current = true;
        }
      }
    }
    events.on("openchange", onOpenChange2);
    const fallbackEl = doc.createElement("span");
    fallbackEl.setAttribute("tabindex", "-1");
    fallbackEl.setAttribute("aria-hidden", "true");
    Object.assign(fallbackEl.style, HIDDEN_STYLES);
    if (isInsidePortal && domReference) {
      domReference.insertAdjacentElement("afterend", fallbackEl);
    }
    function getReturnElement() {
      if (typeof returnFocusRef.current === "boolean") {
        const el = domReference || getPreviouslyFocusedElement();
        return el && el.isConnected ? el : fallbackEl;
      }
      return returnFocusRef.current.current || fallbackEl;
    }
    return () => {
      events.off("openchange", onOpenChange2);
      const activeEl = activeElement(doc);
      const isFocusInsideFloatingTree = contains$1(floating, activeEl) || tree && getNodeChildren$1(tree.nodesRef.current, getNodeId()).some((node) => {
        var _node$context8;
        return contains$1((_node$context8 = node.context) == null ? void 0 : _node$context8.elements.floating, activeEl);
      });
      const returnElement = getReturnElement();
      queueMicrotask(() => {
        const tabbableReturnElement = getFirstTabbableElement(returnElement);
        if (
          // eslint-disable-next-line react-hooks/exhaustive-deps
          returnFocusRef.current && !preventReturnFocusRef.current && isHTMLElement(tabbableReturnElement) && // If the focus moved somewhere else after mount, avoid returning focus
          // since it likely entered a different element which should be
          // respected: https://github.com/floating-ui/floating-ui/issues/2607
          (tabbableReturnElement !== activeEl && activeEl !== doc.body ? isFocusInsideFloatingTree : true)
        ) {
          tabbableReturnElement.focus({
            preventScroll: preventReturnFocusScroll
          });
        }
        fallbackEl.remove();
      });
    };
  }, [disabled, floating, floatingFocusElement, returnFocusRef, dataRef, events, tree, isInsidePortal, domReference, getNodeId]);
  reactExports.useEffect(() => {
    queueMicrotask(() => {
      preventReturnFocusRef.current = false;
    });
  }, [disabled]);
  index$1(() => {
    if (disabled) return;
    if (!portalContext) return;
    portalContext.setFocusManagerState({
      modal,
      closeOnFocusOut,
      open,
      onOpenChange,
      domReference
    });
    return () => {
      portalContext.setFocusManagerState(null);
    };
  }, [disabled, portalContext, modal, open, onOpenChange, closeOnFocusOut, domReference]);
  index$1(() => {
    if (disabled) return;
    if (!floatingFocusElement) return;
    handleTabIndex(floatingFocusElement, orderRef);
  }, [disabled, floatingFocusElement, orderRef]);
  function renderDismissButton(location) {
    if (disabled || !visuallyHiddenDismiss || !modal) {
      return null;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(VisuallyHiddenDismiss, {
      ref: location === "start" ? startDismissButtonRef : endDismissButtonRef,
      onClick: (event) => onOpenChange(false, event.nativeEvent),
      children: typeof visuallyHiddenDismiss === "string" ? visuallyHiddenDismiss : "Dismiss"
    });
  }
  const shouldRenderGuards = !disabled && guards && (modal ? !isUntrappedTypeableCombobox : true) && (isInsidePortal || modal);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
    children: [shouldRenderGuards && /* @__PURE__ */ jsxRuntimeExports.jsx(FocusGuard, {
      "data-type": "inside",
      ref: mergedBeforeGuardRef,
      onFocus: (event) => {
        if (modal) {
          const els = getTabbableElements();
          enqueueFocus(order[0] === "reference" ? els[0] : els[els.length - 1]);
        } else if (portalContext != null && portalContext.preserveTabOrder && portalContext.portalNode) {
          preventReturnFocusRef.current = false;
          if (isOutsideEvent(event, portalContext.portalNode)) {
            const nextTabbable = getNextTabbable(domReference);
            nextTabbable == null || nextTabbable.focus();
          } else {
            var _portalContext$before;
            (_portalContext$before = portalContext.beforeOutsideRef.current) == null || _portalContext$before.focus();
          }
        }
      }
    }), !isUntrappedTypeableCombobox && renderDismissButton("start"), children, renderDismissButton("end"), shouldRenderGuards && /* @__PURE__ */ jsxRuntimeExports.jsx(FocusGuard, {
      "data-type": "inside",
      ref: mergedAfterGuardRef,
      onFocus: (event) => {
        if (modal) {
          enqueueFocus(getTabbableElements()[0]);
        } else if (portalContext != null && portalContext.preserveTabOrder && portalContext.portalNode) {
          if (closeOnFocusOut) {
            preventReturnFocusRef.current = true;
          }
          if (isOutsideEvent(event, portalContext.portalNode)) {
            const prevTabbable = getPreviousTabbable(domReference);
            prevTabbable == null || prevTabbable.focus();
          } else {
            var _portalContext$afterO;
            (_portalContext$afterO = portalContext.afterOutsideRef.current) == null || _portalContext$afterO.focus();
          }
        }
      }
    })]
  });
}
function isButtonTarget(event) {
  return isHTMLElement(event.target) && event.target.tagName === "BUTTON";
}
function isAnchorTarget(event) {
  return isHTMLElement(event.target) && event.target.tagName === "A";
}
function isSpaceIgnored(element) {
  return isTypeableElement(element);
}
function useClick(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    dataRef,
    elements: {
      domReference
    }
  } = context;
  const {
    enabled = true,
    event: eventOption = "click",
    toggle = true,
    ignoreMouse = false,
    keyboardHandlers = true,
    stickIfOpen = true
  } = props;
  const pointerTypeRef = reactExports.useRef();
  const didKeyDownRef = reactExports.useRef(false);
  const reference = reactExports.useMemo(() => ({
    onPointerDown(event) {
      pointerTypeRef.current = event.pointerType;
    },
    onMouseDown(event) {
      const pointerType = pointerTypeRef.current;
      if (event.button !== 0) return;
      if (eventOption === "click") return;
      if (isMouseLikePointerType(pointerType, true) && ignoreMouse) return;
      if (open && toggle && (dataRef.current.openEvent && stickIfOpen ? dataRef.current.openEvent.type === "mousedown" : true)) {
        onOpenChange(false, event.nativeEvent, "click");
      } else {
        event.preventDefault();
        onOpenChange(true, event.nativeEvent, "click");
      }
    },
    onClick(event) {
      const pointerType = pointerTypeRef.current;
      if (eventOption === "mousedown" && pointerTypeRef.current) {
        pointerTypeRef.current = void 0;
        return;
      }
      if (isMouseLikePointerType(pointerType, true) && ignoreMouse) return;
      if (open && toggle && (dataRef.current.openEvent && stickIfOpen ? dataRef.current.openEvent.type === "click" : true)) {
        onOpenChange(false, event.nativeEvent, "click");
      } else {
        onOpenChange(true, event.nativeEvent, "click");
      }
    },
    onKeyDown(event) {
      pointerTypeRef.current = void 0;
      if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event)) {
        return;
      }
      if (event.key === " " && !isSpaceIgnored(domReference)) {
        event.preventDefault();
        didKeyDownRef.current = true;
      }
      if (isAnchorTarget(event)) {
        return;
      }
      if (event.key === "Enter") {
        if (open && toggle) {
          onOpenChange(false, event.nativeEvent, "click");
        } else {
          onOpenChange(true, event.nativeEvent, "click");
        }
      }
    },
    onKeyUp(event) {
      if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event) || isSpaceIgnored(domReference)) {
        return;
      }
      if (event.key === " " && didKeyDownRef.current) {
        didKeyDownRef.current = false;
        if (open && toggle) {
          onOpenChange(false, event.nativeEvent, "click");
        } else {
          onOpenChange(true, event.nativeEvent, "click");
        }
      }
    }
  }), [dataRef, domReference, eventOption, ignoreMouse, keyboardHandlers, onOpenChange, open, stickIfOpen, toggle]);
  return reactExports.useMemo(() => enabled ? {
    reference
  } : {}, [enabled, reference]);
}
const bubbleHandlerKeys = {
  pointerdown: "onPointerDown",
  mousedown: "onMouseDown",
  click: "onClick"
};
const captureHandlerKeys = {
  pointerdown: "onPointerDownCapture",
  mousedown: "onMouseDownCapture",
  click: "onClickCapture"
};
const normalizeProp = (normalizable) => {
  var _normalizable$escapeK, _normalizable$outside;
  return {
    escapeKey: typeof normalizable === "boolean" ? normalizable : (_normalizable$escapeK = normalizable == null ? void 0 : normalizable.escapeKey) != null ? _normalizable$escapeK : false,
    outsidePress: typeof normalizable === "boolean" ? normalizable : (_normalizable$outside = normalizable == null ? void 0 : normalizable.outsidePress) != null ? _normalizable$outside : true
  };
};
function useDismiss(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    elements,
    dataRef
  } = context;
  const {
    enabled = true,
    escapeKey = true,
    outsidePress: unstable_outsidePress = true,
    outsidePressEvent = "pointerdown",
    referencePress = false,
    referencePressEvent = "pointerdown",
    ancestorScroll = false,
    bubbles,
    capture
  } = props;
  const tree = useFloatingTree();
  const outsidePressFn = useEffectEvent(typeof unstable_outsidePress === "function" ? unstable_outsidePress : () => false);
  const outsidePress = typeof unstable_outsidePress === "function" ? outsidePressFn : unstable_outsidePress;
  const insideReactTreeRef = reactExports.useRef(false);
  const endedOrStartedInsideRef = reactExports.useRef(false);
  const {
    escapeKey: escapeKeyBubbles,
    outsidePress: outsidePressBubbles
  } = normalizeProp(bubbles);
  const {
    escapeKey: escapeKeyCapture,
    outsidePress: outsidePressCapture
  } = normalizeProp(capture);
  const isComposingRef = reactExports.useRef(false);
  const closeOnEscapeKeyDown = useEffectEvent((event) => {
    var _dataRef$current$floa;
    if (!open || !enabled || !escapeKey || event.key !== "Escape") {
      return;
    }
    if (isComposingRef.current) {
      return;
    }
    const nodeId = (_dataRef$current$floa = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa.nodeId;
    const children = tree ? getNodeChildren$1(tree.nodesRef.current, nodeId) : [];
    if (!escapeKeyBubbles) {
      event.stopPropagation();
      if (children.length > 0) {
        let shouldDismiss = true;
        children.forEach((child) => {
          var _child$context;
          if ((_child$context = child.context) != null && _child$context.open && !child.context.dataRef.current.__escapeKeyBubbles) {
            shouldDismiss = false;
            return;
          }
        });
        if (!shouldDismiss) {
          return;
        }
      }
    }
    onOpenChange(false, isReactEvent(event) ? event.nativeEvent : event, "escape-key");
  });
  const closeOnEscapeKeyDownCapture = useEffectEvent((event) => {
    var _getTarget2;
    const callback = () => {
      var _getTarget;
      closeOnEscapeKeyDown(event);
      (_getTarget = getTarget$1(event)) == null || _getTarget.removeEventListener("keydown", callback);
    };
    (_getTarget2 = getTarget$1(event)) == null || _getTarget2.addEventListener("keydown", callback);
  });
  const closeOnPressOutside = useEffectEvent((event) => {
    var _dataRef$current$floa2;
    const insideReactTree = insideReactTreeRef.current;
    insideReactTreeRef.current = false;
    const endedOrStartedInside = endedOrStartedInsideRef.current;
    endedOrStartedInsideRef.current = false;
    if (outsidePressEvent === "click" && endedOrStartedInside) {
      return;
    }
    if (insideReactTree) {
      return;
    }
    if (typeof outsidePress === "function" && !outsidePress(event)) {
      return;
    }
    const target = getTarget$1(event);
    const inertSelector = "[" + createAttribute("inert") + "]";
    const markers = getDocument$1(elements.floating).querySelectorAll(inertSelector);
    let targetRootAncestor = isElement(target) ? target : null;
    while (targetRootAncestor && !isLastTraversableNode(targetRootAncestor)) {
      const nextParent = getParentNode(targetRootAncestor);
      if (isLastTraversableNode(nextParent) || !isElement(nextParent)) {
        break;
      }
      targetRootAncestor = nextParent;
    }
    if (markers.length && isElement(target) && !isRootElement(target) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
    !contains$1(target, elements.floating) && // If the target root element contains none of the markers, then the
    // element was injected after the floating element rendered.
    Array.from(markers).every((marker) => !contains$1(targetRootAncestor, marker))) {
      return;
    }
    if (isHTMLElement(target) && floating) {
      const lastTraversableNode = isLastTraversableNode(target);
      const style = getComputedStyle$1(target);
      const scrollRe = /auto|scroll/;
      const isScrollableX = lastTraversableNode || scrollRe.test(style.overflowX);
      const isScrollableY = lastTraversableNode || scrollRe.test(style.overflowY);
      const canScrollX = isScrollableX && target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
      const canScrollY = isScrollableY && target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
      const isRTL2 = style.direction === "rtl";
      const pressedVerticalScrollbar = canScrollY && (isRTL2 ? event.offsetX <= target.offsetWidth - target.clientWidth : event.offsetX > target.clientWidth);
      const pressedHorizontalScrollbar = canScrollX && event.offsetY > target.clientHeight;
      if (pressedVerticalScrollbar || pressedHorizontalScrollbar) {
        return;
      }
    }
    const nodeId = (_dataRef$current$floa2 = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa2.nodeId;
    const targetIsInsideChildren = tree && getNodeChildren$1(tree.nodesRef.current, nodeId).some((node) => {
      var _node$context;
      return isEventTargetWithin(event, (_node$context = node.context) == null ? void 0 : _node$context.elements.floating);
    });
    if (isEventTargetWithin(event, elements.floating) || isEventTargetWithin(event, elements.domReference) || targetIsInsideChildren) {
      return;
    }
    const children = tree ? getNodeChildren$1(tree.nodesRef.current, nodeId) : [];
    if (children.length > 0) {
      let shouldDismiss = true;
      children.forEach((child) => {
        var _child$context2;
        if ((_child$context2 = child.context) != null && _child$context2.open && !child.context.dataRef.current.__outsidePressBubbles) {
          shouldDismiss = false;
          return;
        }
      });
      if (!shouldDismiss) {
        return;
      }
    }
    onOpenChange(false, event, "outside-press");
  });
  const closeOnPressOutsideCapture = useEffectEvent((event) => {
    var _getTarget4;
    const callback = () => {
      var _getTarget3;
      closeOnPressOutside(event);
      (_getTarget3 = getTarget$1(event)) == null || _getTarget3.removeEventListener(outsidePressEvent, callback);
    };
    (_getTarget4 = getTarget$1(event)) == null || _getTarget4.addEventListener(outsidePressEvent, callback);
  });
  reactExports.useEffect(() => {
    if (!open || !enabled) {
      return;
    }
    dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
    dataRef.current.__outsidePressBubbles = outsidePressBubbles;
    let compositionTimeout = -1;
    function onScroll(event) {
      onOpenChange(false, event, "ancestor-scroll");
    }
    function handleCompositionStart() {
      window.clearTimeout(compositionTimeout);
      isComposingRef.current = true;
    }
    function handleCompositionEnd() {
      compositionTimeout = window.setTimeout(
        () => {
          isComposingRef.current = false;
        },
        // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
        // Only apply to WebKit for the test to remain 0ms.
        isWebKit() ? 5 : 0
      );
    }
    const doc = getDocument$1(elements.floating);
    if (escapeKey) {
      doc.addEventListener("keydown", escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
      doc.addEventListener("compositionstart", handleCompositionStart);
      doc.addEventListener("compositionend", handleCompositionEnd);
    }
    outsidePress && doc.addEventListener(outsidePressEvent, outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
    let ancestors = [];
    if (ancestorScroll) {
      if (isElement(elements.domReference)) {
        ancestors = getOverflowAncestors(elements.domReference);
      }
      if (isElement(elements.floating)) {
        ancestors = ancestors.concat(getOverflowAncestors(elements.floating));
      }
      if (!isElement(elements.reference) && elements.reference && elements.reference.contextElement) {
        ancestors = ancestors.concat(getOverflowAncestors(elements.reference.contextElement));
      }
    }
    ancestors = ancestors.filter((ancestor) => {
      var _doc$defaultView;
      return ancestor !== ((_doc$defaultView = doc.defaultView) == null ? void 0 : _doc$defaultView.visualViewport);
    });
    ancestors.forEach((ancestor) => {
      ancestor.addEventListener("scroll", onScroll, {
        passive: true
      });
    });
    return () => {
      if (escapeKey) {
        doc.removeEventListener("keydown", escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
        doc.removeEventListener("compositionstart", handleCompositionStart);
        doc.removeEventListener("compositionend", handleCompositionEnd);
      }
      outsidePress && doc.removeEventListener(outsidePressEvent, outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
      ancestors.forEach((ancestor) => {
        ancestor.removeEventListener("scroll", onScroll);
      });
      window.clearTimeout(compositionTimeout);
    };
  }, [dataRef, elements, escapeKey, outsidePress, outsidePressEvent, open, onOpenChange, ancestorScroll, enabled, escapeKeyBubbles, outsidePressBubbles, closeOnEscapeKeyDown, escapeKeyCapture, closeOnEscapeKeyDownCapture, closeOnPressOutside, outsidePressCapture, closeOnPressOutsideCapture]);
  reactExports.useEffect(() => {
    insideReactTreeRef.current = false;
  }, [outsidePress, outsidePressEvent]);
  const reference = reactExports.useMemo(() => ({
    onKeyDown: closeOnEscapeKeyDown,
    ...referencePress && {
      [bubbleHandlerKeys[referencePressEvent]]: (event) => {
        onOpenChange(false, event.nativeEvent, "reference-press");
      },
      ...referencePressEvent !== "click" && {
        onClick(event) {
          onOpenChange(false, event.nativeEvent, "reference-press");
        }
      }
    }
  }), [closeOnEscapeKeyDown, onOpenChange, referencePress, referencePressEvent]);
  const floating = reactExports.useMemo(() => ({
    onKeyDown: closeOnEscapeKeyDown,
    onMouseDown() {
      endedOrStartedInsideRef.current = true;
    },
    onMouseUp() {
      endedOrStartedInsideRef.current = true;
    },
    [captureHandlerKeys[outsidePressEvent]]: () => {
      insideReactTreeRef.current = true;
    }
  }), [closeOnEscapeKeyDown, outsidePressEvent]);
  return reactExports.useMemo(() => enabled ? {
    reference,
    floating
  } : {}, [enabled, reference, floating]);
}
function useFloatingRootContext(options) {
  const {
    open = false,
    onOpenChange: onOpenChangeProp,
    elements: elementsProp
  } = options;
  const floatingId = useId();
  const dataRef = reactExports.useRef({});
  const [events] = reactExports.useState(() => createEventEmitter());
  const nested = useFloatingParentNodeId() != null;
  const [positionReference, setPositionReference] = reactExports.useState(elementsProp.reference);
  const onOpenChange = useEffectEvent((open2, event, reason) => {
    dataRef.current.openEvent = open2 ? event : void 0;
    events.emit("openchange", {
      open: open2,
      event,
      reason,
      nested
    });
    onOpenChangeProp == null || onOpenChangeProp(open2, event, reason);
  });
  const refs = reactExports.useMemo(() => ({
    setPositionReference
  }), []);
  const elements = reactExports.useMemo(() => ({
    reference: positionReference || elementsProp.reference || null,
    floating: elementsProp.floating || null,
    domReference: elementsProp.reference
  }), [positionReference, elementsProp.reference, elementsProp.floating]);
  return reactExports.useMemo(() => ({
    dataRef,
    open,
    onOpenChange,
    elements,
    events,
    floatingId,
    refs
  }), [open, onOpenChange, elements, events, floatingId, refs]);
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    nodeId
  } = options;
  const internalRootContext = useFloatingRootContext({
    ...options,
    elements: {
      reference: null,
      floating: null,
      ...options.elements
    }
  });
  const rootContext = options.rootContext || internalRootContext;
  const computedElements = rootContext.elements;
  const [_domReference, setDomReference] = reactExports.useState(null);
  const [positionReference, _setPositionReference] = reactExports.useState(null);
  const optionDomReference = computedElements == null ? void 0 : computedElements.domReference;
  const domReference = optionDomReference || _domReference;
  const domReferenceRef = reactExports.useRef(null);
  const tree = useFloatingTree();
  index$1(() => {
    if (domReference) {
      domReferenceRef.current = domReference;
    }
  }, [domReference]);
  const position = useFloating$1({
    ...options,
    elements: {
      ...computedElements,
      ...positionReference && {
        reference: positionReference
      }
    }
  });
  const setPositionReference = reactExports.useCallback((node) => {
    const computedPositionReference = isElement(node) ? {
      getBoundingClientRect: () => node.getBoundingClientRect(),
      getClientRects: () => node.getClientRects(),
      contextElement: node
    } : node;
    _setPositionReference(computedPositionReference);
    position.refs.setReference(computedPositionReference);
  }, [position.refs]);
  const setReference = reactExports.useCallback((node) => {
    if (isElement(node) || node === null) {
      domReferenceRef.current = node;
      setDomReference(node);
    }
    if (isElement(position.refs.reference.current) || position.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    node !== null && !isElement(node)) {
      position.refs.setReference(node);
    }
  }, [position.refs]);
  const refs = reactExports.useMemo(() => ({
    ...position.refs,
    setReference,
    setPositionReference,
    domReference: domReferenceRef
  }), [position.refs, setReference, setPositionReference]);
  const elements = reactExports.useMemo(() => ({
    ...position.elements,
    domReference
  }), [position.elements, domReference]);
  const context = reactExports.useMemo(() => ({
    ...position,
    ...rootContext,
    refs,
    elements,
    nodeId
  }), [position, refs, elements, nodeId, rootContext]);
  index$1(() => {
    rootContext.dataRef.current.floatingContext = context;
    const node = tree == null ? void 0 : tree.nodesRef.current.find((node2) => node2.id === nodeId);
    if (node) {
      node.context = context;
    }
  });
  return reactExports.useMemo(() => ({
    ...position,
    context,
    refs,
    elements
  }), [position, refs, elements, context]);
}
function isMacSafari() {
  return isMac() && isSafari();
}
function useFocus(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    events,
    dataRef,
    elements
  } = context;
  const {
    enabled = true,
    visibleOnly = true
  } = props;
  const blockFocusRef = reactExports.useRef(false);
  const timeoutRef = reactExports.useRef(-1);
  const keyboardModalityRef = reactExports.useRef(true);
  reactExports.useEffect(() => {
    if (!enabled) return;
    const win = getWindow(elements.domReference);
    function onBlur() {
      if (!open && isHTMLElement(elements.domReference) && elements.domReference === activeElement(getDocument$1(elements.domReference))) {
        blockFocusRef.current = true;
      }
    }
    function onKeyDown() {
      keyboardModalityRef.current = true;
    }
    function onPointerDown() {
      keyboardModalityRef.current = false;
    }
    win.addEventListener("blur", onBlur);
    if (isMacSafari()) {
      win.addEventListener("keydown", onKeyDown, true);
      win.addEventListener("pointerdown", onPointerDown, true);
    }
    return () => {
      win.removeEventListener("blur", onBlur);
      if (isMacSafari()) {
        win.removeEventListener("keydown", onKeyDown, true);
        win.removeEventListener("pointerdown", onPointerDown, true);
      }
    };
  }, [elements.domReference, open, enabled]);
  reactExports.useEffect(() => {
    if (!enabled) return;
    function onOpenChange2(_ref) {
      let {
        reason
      } = _ref;
      if (reason === "reference-press" || reason === "escape-key") {
        blockFocusRef.current = true;
      }
    }
    events.on("openchange", onOpenChange2);
    return () => {
      events.off("openchange", onOpenChange2);
    };
  }, [events, enabled]);
  reactExports.useEffect(() => {
    return () => {
      clearTimeoutIfSet(timeoutRef);
    };
  }, []);
  const reference = reactExports.useMemo(() => ({
    onMouseLeave() {
      blockFocusRef.current = false;
    },
    onFocus(event) {
      if (blockFocusRef.current) return;
      const target = getTarget$1(event.nativeEvent);
      if (visibleOnly && isElement(target)) {
        if (isMacSafari() && !event.relatedTarget) {
          if (!keyboardModalityRef.current && !isTypeableElement(target)) {
            return;
          }
        } else if (!matchesFocusVisible(target)) {
          return;
        }
      }
      onOpenChange(true, event.nativeEvent, "focus");
    },
    onBlur(event) {
      blockFocusRef.current = false;
      const relatedTarget = event.relatedTarget;
      const nativeEvent = event.nativeEvent;
      const movedToFocusGuard = isElement(relatedTarget) && relatedTarget.hasAttribute(createAttribute("focus-guard")) && relatedTarget.getAttribute("data-type") === "outside";
      timeoutRef.current = window.setTimeout(() => {
        var _dataRef$current$floa;
        const activeEl = activeElement(elements.domReference ? elements.domReference.ownerDocument : document);
        if (!relatedTarget && activeEl === elements.domReference) return;
        if (contains$1((_dataRef$current$floa = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa.refs.floating.current, activeEl) || contains$1(elements.domReference, activeEl) || movedToFocusGuard) {
          return;
        }
        onOpenChange(false, nativeEvent, "focus");
      });
    }
  }), [dataRef, elements.domReference, onOpenChange, visibleOnly]);
  return reactExports.useMemo(() => enabled ? {
    reference
  } : {}, [enabled, reference]);
}
function mergeProps(userProps, propsList, elementKey) {
  const map = /* @__PURE__ */ new Map();
  const isItem = elementKey === "item";
  let domUserProps = userProps;
  if (isItem && userProps) {
    const {
      [ACTIVE_KEY]: _,
      [SELECTED_KEY]: __,
      ...validProps
    } = userProps;
    domUserProps = validProps;
  }
  return {
    ...elementKey === "floating" && {
      tabIndex: -1,
      [FOCUSABLE_ATTRIBUTE]: ""
    },
    ...domUserProps,
    ...propsList.map((value) => {
      const propsOrGetProps = value ? value[elementKey] : null;
      if (typeof propsOrGetProps === "function") {
        return userProps ? propsOrGetProps(userProps) : null;
      }
      return propsOrGetProps;
    }).concat(userProps).reduce((acc, props) => {
      if (!props) {
        return acc;
      }
      Object.entries(props).forEach((_ref) => {
        let [key, value] = _ref;
        if (isItem && [ACTIVE_KEY, SELECTED_KEY].includes(key)) {
          return;
        }
        if (key.indexOf("on") === 0) {
          if (!map.has(key)) {
            map.set(key, []);
          }
          if (typeof value === "function") {
            var _map$get;
            (_map$get = map.get(key)) == null || _map$get.push(value);
            acc[key] = function() {
              var _map$get2;
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              return (_map$get2 = map.get(key)) == null ? void 0 : _map$get2.map((fn) => fn(...args)).find((val) => val !== void 0);
            };
          }
        } else {
          acc[key] = value;
        }
      });
      return acc;
    }, {})
  };
}
function useInteractions(propsList) {
  if (propsList === void 0) {
    propsList = [];
  }
  const referenceDeps = propsList.map((key) => key == null ? void 0 : key.reference);
  const floatingDeps = propsList.map((key) => key == null ? void 0 : key.floating);
  const itemDeps = propsList.map((key) => key == null ? void 0 : key.item);
  const getReferenceProps = reactExports.useCallback(
    (userProps) => mergeProps(userProps, propsList, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    referenceDeps
  );
  const getFloatingProps = reactExports.useCallback(
    (userProps) => mergeProps(userProps, propsList, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    floatingDeps
  );
  const getItemProps = reactExports.useCallback(
    (userProps) => mergeProps(userProps, propsList, "item"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    itemDeps
  );
  return reactExports.useMemo(() => ({
    getReferenceProps,
    getFloatingProps,
    getItemProps
  }), [getReferenceProps, getFloatingProps, getItemProps]);
}
const ESCAPE = "Escape";
function doSwitch(orientation, vertical, horizontal) {
  switch (orientation) {
    case "vertical":
      return vertical;
    case "horizontal":
      return horizontal;
    default:
      return vertical || horizontal;
  }
}
function isMainOrientationKey(key, orientation) {
  const vertical = key === ARROW_UP || key === ARROW_DOWN;
  const horizontal = key === ARROW_LEFT || key === ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal);
}
function isMainOrientationToEndKey(key, orientation, rtl) {
  const vertical = key === ARROW_DOWN;
  const horizontal = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal) || key === "Enter" || key === " " || key === "";
}
function isCrossOrientationOpenKey(key, orientation, rtl) {
  const vertical = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
  const horizontal = key === ARROW_DOWN;
  return doSwitch(orientation, vertical, horizontal);
}
function isCrossOrientationCloseKey(key, orientation, rtl, cols) {
  const vertical = rtl ? key === ARROW_RIGHT : key === ARROW_LEFT;
  const horizontal = key === ARROW_UP;
  if (orientation === "both" || orientation === "horizontal" && cols && cols > 1) {
    return key === ESCAPE;
  }
  return doSwitch(orientation, vertical, horizontal);
}
function useListNavigation(context, props) {
  const {
    open,
    onOpenChange,
    elements,
    floatingId
  } = context;
  const {
    listRef,
    activeIndex,
    onNavigate: unstable_onNavigate = () => {
    },
    enabled = true,
    selectedIndex = null,
    allowEscape = false,
    loop = false,
    nested = false,
    rtl = false,
    virtual = false,
    focusItemOnOpen = "auto",
    focusItemOnHover = true,
    openOnArrowKeyDown = true,
    disabledIndices = void 0,
    orientation = "vertical",
    parentOrientation,
    cols = 1,
    scrollItemIntoView = true,
    virtualItemRef,
    itemSizes,
    dense = false
  } = props;
  const floatingFocusElement = getFloatingFocusElement(elements.floating);
  const floatingFocusElementRef = useLatestRef$1(floatingFocusElement);
  const parentId = useFloatingParentNodeId();
  const tree = useFloatingTree();
  index$1(() => {
    context.dataRef.current.orientation = orientation;
  }, [context, orientation]);
  const onNavigate = useEffectEvent(() => {
    unstable_onNavigate(indexRef.current === -1 ? null : indexRef.current);
  });
  const typeableComboboxReference = isTypeableCombobox(elements.domReference);
  const focusItemOnOpenRef = reactExports.useRef(focusItemOnOpen);
  const indexRef = reactExports.useRef(selectedIndex != null ? selectedIndex : -1);
  const keyRef = reactExports.useRef(null);
  const isPointerModalityRef = reactExports.useRef(true);
  const previousOnNavigateRef = reactExports.useRef(onNavigate);
  const previousMountedRef = reactExports.useRef(!!elements.floating);
  const previousOpenRef = reactExports.useRef(open);
  const forceSyncFocusRef = reactExports.useRef(false);
  const forceScrollIntoViewRef = reactExports.useRef(false);
  const disabledIndicesRef = useLatestRef$1(disabledIndices);
  const latestOpenRef = useLatestRef$1(open);
  const scrollItemIntoViewRef = useLatestRef$1(scrollItemIntoView);
  const selectedIndexRef = useLatestRef$1(selectedIndex);
  const [activeId, setActiveId] = reactExports.useState();
  const [virtualId, setVirtualId] = reactExports.useState();
  const focusItem = useEffectEvent(() => {
    function runFocus(item2) {
      if (virtual) {
        var _item$id;
        if ((_item$id = item2.id) != null && _item$id.endsWith("-fui-option")) {
          item2.id = floatingId + "-" + Math.random().toString(16).slice(2, 10);
        }
        setActiveId(item2.id);
        tree == null || tree.events.emit("virtualfocus", item2);
        if (virtualItemRef) {
          virtualItemRef.current = item2;
        }
      } else {
        enqueueFocus(item2, {
          sync: forceSyncFocusRef.current,
          preventScroll: true
        });
      }
    }
    const initialItem = listRef.current[indexRef.current];
    const forceScrollIntoView = forceScrollIntoViewRef.current;
    if (initialItem) {
      runFocus(initialItem);
    }
    const scheduler = forceSyncFocusRef.current ? (v) => v() : requestAnimationFrame;
    scheduler(() => {
      const waitedItem = listRef.current[indexRef.current] || initialItem;
      if (!waitedItem) return;
      if (!initialItem) {
        runFocus(waitedItem);
      }
      const scrollIntoViewOptions = scrollItemIntoViewRef.current;
      const shouldScrollIntoView = scrollIntoViewOptions && item && (forceScrollIntoView || !isPointerModalityRef.current);
      if (shouldScrollIntoView) {
        waitedItem.scrollIntoView == null || waitedItem.scrollIntoView(typeof scrollIntoViewOptions === "boolean" ? {
          block: "nearest",
          inline: "nearest"
        } : scrollIntoViewOptions);
      }
    });
  });
  index$1(() => {
    if (!enabled) return;
    if (open && elements.floating) {
      if (focusItemOnOpenRef.current && selectedIndex != null) {
        forceScrollIntoViewRef.current = true;
        indexRef.current = selectedIndex;
        onNavigate();
      }
    } else if (previousMountedRef.current) {
      indexRef.current = -1;
      previousOnNavigateRef.current();
    }
  }, [enabled, open, elements.floating, selectedIndex, onNavigate]);
  index$1(() => {
    if (!enabled) return;
    if (!open) return;
    if (!elements.floating) return;
    if (activeIndex == null) {
      forceSyncFocusRef.current = false;
      if (selectedIndexRef.current != null) {
        return;
      }
      if (previousMountedRef.current) {
        indexRef.current = -1;
        focusItem();
      }
      if ((!previousOpenRef.current || !previousMountedRef.current) && focusItemOnOpenRef.current && (keyRef.current != null || focusItemOnOpenRef.current === true && keyRef.current == null)) {
        let runs = 0;
        const waitForListPopulated = () => {
          if (listRef.current[0] == null) {
            if (runs < 2) {
              const scheduler = runs ? requestAnimationFrame : queueMicrotask;
              scheduler(waitForListPopulated);
            }
            runs++;
          } else {
            indexRef.current = keyRef.current == null || isMainOrientationToEndKey(keyRef.current, orientation, rtl) || nested ? getMinListIndex(listRef, disabledIndicesRef.current) : getMaxListIndex(listRef, disabledIndicesRef.current);
            keyRef.current = null;
            onNavigate();
          }
        };
        waitForListPopulated();
      }
    } else if (!isIndexOutOfListBounds(listRef, activeIndex)) {
      indexRef.current = activeIndex;
      focusItem();
      forceScrollIntoViewRef.current = false;
    }
  }, [enabled, open, elements.floating, activeIndex, selectedIndexRef, nested, listRef, orientation, rtl, onNavigate, focusItem, disabledIndicesRef]);
  index$1(() => {
    var _nodes$find;
    if (!enabled || elements.floating || !tree || virtual || !previousMountedRef.current) {
      return;
    }
    const nodes = tree.nodesRef.current;
    const parent = (_nodes$find = nodes.find((node) => node.id === parentId)) == null || (_nodes$find = _nodes$find.context) == null ? void 0 : _nodes$find.elements.floating;
    const activeEl = activeElement(getDocument$1(elements.floating));
    const treeContainsActiveEl = nodes.some((node) => node.context && contains$1(node.context.elements.floating, activeEl));
    if (parent && !treeContainsActiveEl && isPointerModalityRef.current) {
      parent.focus({
        preventScroll: true
      });
    }
  }, [enabled, elements.floating, tree, parentId, virtual]);
  index$1(() => {
    if (!enabled) return;
    if (!tree) return;
    if (!virtual) return;
    if (parentId) return;
    function handleVirtualFocus(item2) {
      setVirtualId(item2.id);
      if (virtualItemRef) {
        virtualItemRef.current = item2;
      }
    }
    tree.events.on("virtualfocus", handleVirtualFocus);
    return () => {
      tree.events.off("virtualfocus", handleVirtualFocus);
    };
  }, [enabled, tree, virtual, parentId, virtualItemRef]);
  index$1(() => {
    previousOnNavigateRef.current = onNavigate;
    previousOpenRef.current = open;
    previousMountedRef.current = !!elements.floating;
  });
  index$1(() => {
    if (!open) {
      keyRef.current = null;
    }
  }, [open]);
  const hasActiveIndex = activeIndex != null;
  const item = reactExports.useMemo(() => {
    function syncCurrentTarget(currentTarget) {
      if (!open) return;
      const index2 = listRef.current.indexOf(currentTarget);
      if (index2 !== -1 && indexRef.current !== index2) {
        indexRef.current = index2;
        onNavigate();
      }
    }
    const props2 = {
      onFocus(_ref) {
        let {
          currentTarget
        } = _ref;
        forceSyncFocusRef.current = true;
        syncCurrentTarget(currentTarget);
      },
      onClick: (_ref2) => {
        let {
          currentTarget
        } = _ref2;
        return currentTarget.focus({
          preventScroll: true
        });
      },
      // Safari
      ...focusItemOnHover && {
        onMouseMove(_ref3) {
          let {
            currentTarget
          } = _ref3;
          forceSyncFocusRef.current = true;
          forceScrollIntoViewRef.current = false;
          syncCurrentTarget(currentTarget);
        },
        onPointerLeave(_ref4) {
          let {
            pointerType
          } = _ref4;
          if (!isPointerModalityRef.current || pointerType === "touch") {
            return;
          }
          forceSyncFocusRef.current = true;
          indexRef.current = -1;
          onNavigate();
          if (!virtual) {
            var _floatingFocusElement;
            (_floatingFocusElement = floatingFocusElementRef.current) == null || _floatingFocusElement.focus({
              preventScroll: true
            });
          }
        }
      }
    };
    return props2;
  }, [open, floatingFocusElementRef, focusItemOnHover, listRef, onNavigate, virtual]);
  const getParentOrientation = reactExports.useCallback(() => {
    var _tree$nodesRef$curren;
    return parentOrientation != null ? parentOrientation : tree == null || (_tree$nodesRef$curren = tree.nodesRef.current.find((node) => node.id === parentId)) == null || (_tree$nodesRef$curren = _tree$nodesRef$curren.context) == null || (_tree$nodesRef$curren = _tree$nodesRef$curren.dataRef) == null ? void 0 : _tree$nodesRef$curren.current.orientation;
  }, [parentId, tree, parentOrientation]);
  const commonOnKeyDown = useEffectEvent((event) => {
    isPointerModalityRef.current = false;
    forceSyncFocusRef.current = true;
    if (event.which === 229) {
      return;
    }
    if (!latestOpenRef.current && event.currentTarget === floatingFocusElementRef.current) {
      return;
    }
    if (nested && isCrossOrientationCloseKey(event.key, orientation, rtl, cols)) {
      if (!isMainOrientationKey(event.key, getParentOrientation())) {
        stopEvent(event);
      }
      onOpenChange(false, event.nativeEvent, "list-navigation");
      if (isHTMLElement(elements.domReference)) {
        if (virtual) {
          tree == null || tree.events.emit("virtualfocus", elements.domReference);
        } else {
          elements.domReference.focus();
        }
      }
      return;
    }
    const currentIndex = indexRef.current;
    const minIndex = getMinListIndex(listRef, disabledIndices);
    const maxIndex = getMaxListIndex(listRef, disabledIndices);
    if (!typeableComboboxReference) {
      if (event.key === "Home") {
        stopEvent(event);
        indexRef.current = minIndex;
        onNavigate();
      }
      if (event.key === "End") {
        stopEvent(event);
        indexRef.current = maxIndex;
        onNavigate();
      }
    }
    if (cols > 1) {
      const sizes = itemSizes || Array.from({
        length: listRef.current.length
      }, () => ({
        width: 1,
        height: 1
      }));
      const cellMap = createGridCellMap(sizes, cols, dense);
      const minGridIndex = cellMap.findIndex((index22) => index22 != null && !isListIndexDisabled(listRef, index22, disabledIndices));
      const maxGridIndex = cellMap.reduce((foundIndex, index22, cellIndex) => index22 != null && !isListIndexDisabled(listRef, index22, disabledIndices) ? cellIndex : foundIndex, -1);
      const index2 = cellMap[getGridNavigatedIndex({
        current: cellMap.map((itemIndex) => itemIndex != null ? listRef.current[itemIndex] : null)
      }, {
        event,
        orientation,
        loop,
        rtl,
        cols,
        // treat undefined (empty grid spaces) as disabled indices so we
        // don't end up in them
        disabledIndices: getGridCellIndices([...disabledIndices || listRef.current.map((_, index22) => isListIndexDisabled(listRef, index22) ? index22 : void 0), void 0], cellMap),
        minIndex: minGridIndex,
        maxIndex: maxGridIndex,
        prevIndex: getGridCellIndexOfCorner(
          indexRef.current > maxIndex ? minIndex : indexRef.current,
          sizes,
          cellMap,
          cols,
          // use a corner matching the edge closest to the direction
          // we're moving in so we don't end up in the same item. Prefer
          // top/left over bottom/right.
          event.key === ARROW_DOWN ? "bl" : event.key === (rtl ? ARROW_LEFT : ARROW_RIGHT) ? "tr" : "tl"
        ),
        stopEvent: true
      })];
      if (index2 != null) {
        indexRef.current = index2;
        onNavigate();
      }
      if (orientation === "both") {
        return;
      }
    }
    if (isMainOrientationKey(event.key, orientation)) {
      stopEvent(event);
      if (open && !virtual && activeElement(event.currentTarget.ownerDocument) === event.currentTarget) {
        indexRef.current = isMainOrientationToEndKey(event.key, orientation, rtl) ? minIndex : maxIndex;
        onNavigate();
        return;
      }
      if (isMainOrientationToEndKey(event.key, orientation, rtl)) {
        if (loop) {
          indexRef.current = currentIndex >= maxIndex ? allowEscape && currentIndex !== listRef.current.length ? -1 : minIndex : findNonDisabledListIndex(listRef, {
            startingIndex: currentIndex,
            disabledIndices
          });
        } else {
          indexRef.current = Math.min(maxIndex, findNonDisabledListIndex(listRef, {
            startingIndex: currentIndex,
            disabledIndices
          }));
        }
      } else {
        if (loop) {
          indexRef.current = currentIndex <= minIndex ? allowEscape && currentIndex !== -1 ? listRef.current.length : maxIndex : findNonDisabledListIndex(listRef, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices
          });
        } else {
          indexRef.current = Math.max(minIndex, findNonDisabledListIndex(listRef, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices
          }));
        }
      }
      if (isIndexOutOfListBounds(listRef, indexRef.current)) {
        indexRef.current = -1;
      }
      onNavigate();
    }
  });
  const ariaActiveDescendantProp = reactExports.useMemo(() => {
    return virtual && open && hasActiveIndex && {
      "aria-activedescendant": virtualId || activeId
    };
  }, [virtual, open, hasActiveIndex, virtualId, activeId]);
  const floating = reactExports.useMemo(() => {
    return {
      "aria-orientation": orientation === "both" ? void 0 : orientation,
      ...!typeableComboboxReference ? ariaActiveDescendantProp : {},
      onKeyDown: commonOnKeyDown,
      onPointerMove() {
        isPointerModalityRef.current = true;
      }
    };
  }, [ariaActiveDescendantProp, commonOnKeyDown, orientation, typeableComboboxReference]);
  const reference = reactExports.useMemo(() => {
    function checkVirtualMouse(event) {
      if (focusItemOnOpen === "auto" && isVirtualClick(event.nativeEvent)) {
        focusItemOnOpenRef.current = true;
      }
    }
    function checkVirtualPointer(event) {
      focusItemOnOpenRef.current = focusItemOnOpen;
      if (focusItemOnOpen === "auto" && isVirtualPointerEvent(event.nativeEvent)) {
        focusItemOnOpenRef.current = true;
      }
    }
    return {
      ...ariaActiveDescendantProp,
      onKeyDown(event) {
        isPointerModalityRef.current = false;
        const isArrowKey = event.key.startsWith("Arrow");
        const isHomeOrEndKey = ["Home", "End"].includes(event.key);
        const isMoveKey = isArrowKey || isHomeOrEndKey;
        const isCrossOpenKey = isCrossOrientationOpenKey(event.key, orientation, rtl);
        const isCrossCloseKey = isCrossOrientationCloseKey(event.key, orientation, rtl, cols);
        const isParentCrossOpenKey = isCrossOrientationOpenKey(event.key, getParentOrientation(), rtl);
        const isMainKey = isMainOrientationKey(event.key, orientation);
        const isNavigationKey = (nested ? isParentCrossOpenKey : isMainKey) || event.key === "Enter" || event.key.trim() === "";
        if (virtual && open) {
          const rootNode = tree == null ? void 0 : tree.nodesRef.current.find((node) => node.parentId == null);
          const deepestNode = tree && rootNode ? getDeepestNode(tree.nodesRef.current, rootNode.id) : null;
          if (isMoveKey && deepestNode && virtualItemRef) {
            const eventObject = new KeyboardEvent("keydown", {
              key: event.key,
              bubbles: true
            });
            if (isCrossOpenKey || isCrossCloseKey) {
              var _deepestNode$context, _deepestNode$context2;
              const isCurrentTarget = ((_deepestNode$context = deepestNode.context) == null ? void 0 : _deepestNode$context.elements.domReference) === event.currentTarget;
              const dispatchItem = isCrossCloseKey && !isCurrentTarget ? (_deepestNode$context2 = deepestNode.context) == null ? void 0 : _deepestNode$context2.elements.domReference : isCrossOpenKey ? listRef.current.find((item2) => (item2 == null ? void 0 : item2.id) === activeId) : null;
              if (dispatchItem) {
                stopEvent(event);
                dispatchItem.dispatchEvent(eventObject);
                setVirtualId(void 0);
              }
            }
            if ((isMainKey || isHomeOrEndKey) && deepestNode.context) {
              if (deepestNode.context.open && deepestNode.parentId && event.currentTarget !== deepestNode.context.elements.domReference) {
                var _deepestNode$context$;
                stopEvent(event);
                (_deepestNode$context$ = deepestNode.context.elements.domReference) == null || _deepestNode$context$.dispatchEvent(eventObject);
                return;
              }
            }
          }
          return commonOnKeyDown(event);
        }
        if (!open && !openOnArrowKeyDown && isArrowKey) {
          return;
        }
        if (isNavigationKey) {
          const isParentMainKey = isMainOrientationKey(event.key, getParentOrientation());
          keyRef.current = nested && isParentMainKey ? null : event.key;
        }
        if (nested) {
          if (isParentCrossOpenKey) {
            stopEvent(event);
            if (open) {
              indexRef.current = getMinListIndex(listRef, disabledIndicesRef.current);
              onNavigate();
            } else {
              onOpenChange(true, event.nativeEvent, "list-navigation");
            }
          }
          return;
        }
        if (isMainKey) {
          if (selectedIndex != null) {
            indexRef.current = selectedIndex;
          }
          stopEvent(event);
          if (!open && openOnArrowKeyDown) {
            onOpenChange(true, event.nativeEvent, "list-navigation");
          } else {
            commonOnKeyDown(event);
          }
          if (open) {
            onNavigate();
          }
        }
      },
      onFocus() {
        if (open && !virtual) {
          indexRef.current = -1;
          onNavigate();
        }
      },
      onPointerDown: checkVirtualPointer,
      onPointerEnter: checkVirtualPointer,
      onMouseDown: checkVirtualMouse,
      onClick: checkVirtualMouse
    };
  }, [activeId, ariaActiveDescendantProp, cols, commonOnKeyDown, disabledIndicesRef, focusItemOnOpen, listRef, nested, onNavigate, onOpenChange, open, openOnArrowKeyDown, orientation, getParentOrientation, rtl, selectedIndex, tree, virtual, virtualItemRef]);
  return reactExports.useMemo(() => enabled ? {
    reference,
    floating,
    item
  } : {}, [enabled, reference, floating, item]);
}
const componentRoleToAriaRoleMap = /* @__PURE__ */ new Map([["select", "listbox"], ["combobox", "listbox"], ["label", false]]);
function useRole(context, props) {
  var _elements$domReferenc, _componentRoleToAriaR;
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    elements,
    floatingId: defaultFloatingId
  } = context;
  const {
    enabled = true,
    role = "dialog"
  } = props;
  const defaultReferenceId = useId();
  const referenceId = ((_elements$domReferenc = elements.domReference) == null ? void 0 : _elements$domReferenc.id) || defaultReferenceId;
  const floatingId = reactExports.useMemo(() => {
    var _getFloatingFocusElem;
    return ((_getFloatingFocusElem = getFloatingFocusElement(elements.floating)) == null ? void 0 : _getFloatingFocusElem.id) || defaultFloatingId;
  }, [elements.floating, defaultFloatingId]);
  const ariaRole = (_componentRoleToAriaR = componentRoleToAriaRoleMap.get(role)) != null ? _componentRoleToAriaR : role;
  const parentId = useFloatingParentNodeId();
  const isNested = parentId != null;
  const reference = reactExports.useMemo(() => {
    if (ariaRole === "tooltip" || role === "label") {
      return {
        ["aria-" + (role === "label" ? "labelledby" : "describedby")]: open ? floatingId : void 0
      };
    }
    return {
      "aria-expanded": open ? "true" : "false",
      "aria-haspopup": ariaRole === "alertdialog" ? "dialog" : ariaRole,
      "aria-controls": open ? floatingId : void 0,
      ...ariaRole === "listbox" && {
        role: "combobox"
      },
      ...ariaRole === "menu" && {
        id: referenceId
      },
      ...ariaRole === "menu" && isNested && {
        role: "menuitem"
      },
      ...role === "select" && {
        "aria-autocomplete": "none"
      },
      ...role === "combobox" && {
        "aria-autocomplete": "list"
      }
    };
  }, [ariaRole, floatingId, isNested, open, referenceId, role]);
  const floating = reactExports.useMemo(() => {
    const floatingProps = {
      id: floatingId,
      ...ariaRole && {
        role: ariaRole
      }
    };
    if (ariaRole === "tooltip" || role === "label") {
      return floatingProps;
    }
    return {
      ...floatingProps,
      ...ariaRole === "menu" && {
        "aria-labelledby": referenceId
      }
    };
  }, [ariaRole, floatingId, referenceId, role]);
  const item = reactExports.useCallback((_ref) => {
    let {
      active,
      selected
    } = _ref;
    const commonProps = {
      role: "option",
      ...active && {
        id: floatingId + "-fui-option"
      }
    };
    switch (role) {
      case "select":
        return {
          ...commonProps,
          "aria-selected": active && selected
        };
      case "combobox": {
        return {
          ...commonProps,
          "aria-selected": selected
        };
      }
    }
    return {};
  }, [floatingId, role]);
  return reactExports.useMemo(() => enabled ? {
    reference,
    floating,
    item
  } : {}, [enabled, reference, floating, item]);
}
function getNodeChildren(nodes, id, onlyOpenChildren) {
  if (onlyOpenChildren === void 0) {
    onlyOpenChildren = true;
  }
  let allChildren = nodes.filter((node) => {
    var _node$context;
    return node.parentId === id && ((_node$context = node.context) == null ? void 0 : _node$context.open);
  });
  let currentChildren = allChildren;
  while (currentChildren.length) {
    currentChildren = onlyOpenChildren ? nodes.filter((node) => {
      var _currentChildren;
      return (_currentChildren = currentChildren) == null ? void 0 : _currentChildren.some((n) => {
        var _node$context2;
        return node.parentId === n.id && ((_node$context2 = node.context) == null ? void 0 : _node$context2.open);
      });
    }) : nodes;
    allChildren = allChildren.concat(currentChildren);
  }
  return allChildren;
}
function isPointInPolygon(point, polygon) {
  const [x, y] = point;
  let isInside2 = false;
  const length = polygon.length;
  for (let i = 0, j = length - 1; i < length; j = i++) {
    const [xi, yi] = polygon[i] || [0, 0];
    const [xj, yj] = polygon[j] || [0, 0];
    const intersect = yi >= y !== yj >= y && x <= (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) {
      isInside2 = !isInside2;
    }
  }
  return isInside2;
}
function isInside(point, rect) {
  return point[0] >= rect.x && point[0] <= rect.x + rect.width && point[1] >= rect.y && point[1] <= rect.y + rect.height;
}
function safePolygon(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    buffer = 0.5,
    blockPointerEvents = false,
    requireIntent = true
  } = options;
  let timeoutId;
  let hasLanded = false;
  let lastX = null;
  let lastY = null;
  let lastCursorTime = performance.now();
  function getCursorSpeed(x, y) {
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastCursorTime;
    if (lastX === null || lastY === null || elapsedTime === 0) {
      lastX = x;
      lastY = y;
      lastCursorTime = currentTime;
      return null;
    }
    const deltaX = x - lastX;
    const deltaY = y - lastY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const speed = distance / elapsedTime;
    lastX = x;
    lastY = y;
    lastCursorTime = currentTime;
    return speed;
  }
  const fn = (_ref) => {
    let {
      x,
      y,
      placement,
      elements,
      onClose,
      nodeId,
      tree
    } = _ref;
    return function onMouseMove(event) {
      function close() {
        clearTimeout(timeoutId);
        onClose();
      }
      clearTimeout(timeoutId);
      if (!elements.domReference || !elements.floating || placement == null || x == null || y == null) {
        return;
      }
      const {
        clientX,
        clientY
      } = event;
      const clientPoint = [clientX, clientY];
      const target = getTarget(event);
      const isLeave = event.type === "mouseleave";
      const isOverFloatingEl = contains(elements.floating, target);
      const isOverReferenceEl = contains(elements.domReference, target);
      const refRect = elements.domReference.getBoundingClientRect();
      const rect = elements.floating.getBoundingClientRect();
      const side = placement.split("-")[0];
      const cursorLeaveFromRight = x > rect.right - rect.width / 2;
      const cursorLeaveFromBottom = y > rect.bottom - rect.height / 2;
      const isOverReferenceRect = isInside(clientPoint, refRect);
      const isFloatingWider = rect.width > refRect.width;
      const isFloatingTaller = rect.height > refRect.height;
      const left = (isFloatingWider ? refRect : rect).left;
      const right = (isFloatingWider ? refRect : rect).right;
      const top = (isFloatingTaller ? refRect : rect).top;
      const bottom = (isFloatingTaller ? refRect : rect).bottom;
      if (isOverFloatingEl) {
        hasLanded = true;
        if (!isLeave) {
          return;
        }
      }
      if (isOverReferenceEl) {
        hasLanded = false;
      }
      if (isOverReferenceEl && !isLeave) {
        hasLanded = true;
        return;
      }
      if (isLeave && isElement(event.relatedTarget) && contains(elements.floating, event.relatedTarget)) {
        return;
      }
      if (tree && getNodeChildren(tree.nodesRef.current, nodeId).some((_ref2) => {
        let {
          context
        } = _ref2;
        return context == null ? void 0 : context.open;
      })) {
        return;
      }
      if (side === "top" && y >= refRect.bottom - 1 || side === "bottom" && y <= refRect.top + 1 || side === "left" && x >= refRect.right - 1 || side === "right" && x <= refRect.left + 1) {
        return close();
      }
      let rectPoly = [];
      switch (side) {
        case "top":
          rectPoly = [[left, refRect.top + 1], [left, rect.bottom - 1], [right, rect.bottom - 1], [right, refRect.top + 1]];
          break;
        case "bottom":
          rectPoly = [[left, rect.top + 1], [left, refRect.bottom - 1], [right, refRect.bottom - 1], [right, rect.top + 1]];
          break;
        case "left":
          rectPoly = [[rect.right - 1, bottom], [rect.right - 1, top], [refRect.left + 1, top], [refRect.left + 1, bottom]];
          break;
        case "right":
          rectPoly = [[refRect.right - 1, bottom], [refRect.right - 1, top], [rect.left + 1, top], [rect.left + 1, bottom]];
          break;
      }
      function getPolygon(_ref3) {
        let [x2, y2] = _ref3;
        switch (side) {
          case "top": {
            const cursorPointOne = [isFloatingWider ? x2 + buffer / 2 : cursorLeaveFromRight ? x2 + buffer * 4 : x2 - buffer * 4, y2 + buffer + 1];
            const cursorPointTwo = [isFloatingWider ? x2 - buffer / 2 : cursorLeaveFromRight ? x2 + buffer * 4 : x2 - buffer * 4, y2 + buffer + 1];
            const commonPoints = [[rect.left, cursorLeaveFromRight ? rect.bottom - buffer : isFloatingWider ? rect.bottom - buffer : rect.top], [rect.right, cursorLeaveFromRight ? isFloatingWider ? rect.bottom - buffer : rect.top : rect.bottom - buffer]];
            return [cursorPointOne, cursorPointTwo, ...commonPoints];
          }
          case "bottom": {
            const cursorPointOne = [isFloatingWider ? x2 + buffer / 2 : cursorLeaveFromRight ? x2 + buffer * 4 : x2 - buffer * 4, y2 - buffer];
            const cursorPointTwo = [isFloatingWider ? x2 - buffer / 2 : cursorLeaveFromRight ? x2 + buffer * 4 : x2 - buffer * 4, y2 - buffer];
            const commonPoints = [[rect.left, cursorLeaveFromRight ? rect.top + buffer : isFloatingWider ? rect.top + buffer : rect.bottom], [rect.right, cursorLeaveFromRight ? isFloatingWider ? rect.top + buffer : rect.bottom : rect.top + buffer]];
            return [cursorPointOne, cursorPointTwo, ...commonPoints];
          }
          case "left": {
            const cursorPointOne = [x2 + buffer + 1, isFloatingTaller ? y2 + buffer / 2 : cursorLeaveFromBottom ? y2 + buffer * 4 : y2 - buffer * 4];
            const cursorPointTwo = [x2 + buffer + 1, isFloatingTaller ? y2 - buffer / 2 : cursorLeaveFromBottom ? y2 + buffer * 4 : y2 - buffer * 4];
            const commonPoints = [[cursorLeaveFromBottom ? rect.right - buffer : isFloatingTaller ? rect.right - buffer : rect.left, rect.top], [cursorLeaveFromBottom ? isFloatingTaller ? rect.right - buffer : rect.left : rect.right - buffer, rect.bottom]];
            return [...commonPoints, cursorPointOne, cursorPointTwo];
          }
          case "right": {
            const cursorPointOne = [x2 - buffer, isFloatingTaller ? y2 + buffer / 2 : cursorLeaveFromBottom ? y2 + buffer * 4 : y2 - buffer * 4];
            const cursorPointTwo = [x2 - buffer, isFloatingTaller ? y2 - buffer / 2 : cursorLeaveFromBottom ? y2 + buffer * 4 : y2 - buffer * 4];
            const commonPoints = [[cursorLeaveFromBottom ? rect.left + buffer : isFloatingTaller ? rect.left + buffer : rect.right, rect.top], [cursorLeaveFromBottom ? isFloatingTaller ? rect.left + buffer : rect.right : rect.left + buffer, rect.bottom]];
            return [cursorPointOne, cursorPointTwo, ...commonPoints];
          }
        }
      }
      if (isPointInPolygon([clientX, clientY], rectPoly)) {
        return;
      }
      if (hasLanded && !isOverReferenceRect) {
        return close();
      }
      if (!isLeave && requireIntent) {
        const cursorSpeed = getCursorSpeed(event.clientX, event.clientY);
        const cursorSpeedThreshold = 0.1;
        if (cursorSpeed !== null && cursorSpeed < cursorSpeedThreshold) {
          return close();
        }
      }
      if (!isPointInPolygon([clientX, clientY], getPolygon([x, y]))) {
        close();
      } else if (!hasLanded && requireIntent) {
        timeoutId = window.setTimeout(close, 40);
      }
    };
  };
  fn.__options = {
    blockPointerEvents
  };
  return fn;
}
const defaultTooltipDelay = {
  open: 200,
  close: 200
};
let useTooltip = (options = {}) => {
  let uniqueId = useId$1();
  let {
    placement = "top",
    visible,
    onVisibleChange,
    middleware = {
      flip: true,
      shift: true
    },
    autoUpdateOptions = {},
    reference,
    ariaStrategy = "description",
    id = uniqueId,
    ...props
  } = options;
  let [open, onOpenChange] = useControlledState(
    false,
    visible,
    onVisibleChange
  );
  let syncWithControlledState = reactExports.useCallback(
    (element) => {
      queueMicrotask(() => {
        var _a;
        try {
          (_a = element == null ? void 0 : element.togglePopover) == null ? void 0 : _a.call(element, open);
        } catch {
        }
      });
    },
    [open]
  );
  let floating = useFloating({
    placement,
    open,
    onOpenChange,
    strategy: "fixed",
    whileElementsMounted: reactExports.useMemo(
      () => open ? (...args) => autoUpdate(...args, autoUpdateOptions) : void 0,
      [autoUpdateOptions, open]
    ),
    middleware: reactExports.useMemo(
      () => [
        void 0 !== middleware.offset ? offset(middleware.offset) : offset(4),
        middleware.flip && flip({
          padding: 4
        }),
        middleware.shift && shift({
          padding: 4
        }),
        middleware.size && size({
          padding: 4
        }),
        middleware.autoPlacement && autoPlacement({
          padding: 4
        }),
        middleware.inline && inline(),
        middleware.hide && hide({
          padding: 4
        })
      ].filter(Boolean),
      [middleware]
    ),
    ...reference && {
      elements: {
        reference
      }
    }
  });
  let ariaProps = reactExports.useMemo(
    () => "description" === ariaStrategy ? {
      "aria-describedby": id
    } : "label" === ariaStrategy ? {
      "aria-labelledby": id
    } : {},
    [ariaStrategy, id]
  );
  let { delay } = useDelayGroup(floating.context, {
    id: useId$1()
  });
  let interactions = useInteractions([
    useHover(floating.context, {
      delay: 0 !== delay ? delay : defaultTooltipDelay,
      handleClose: safePolygon({
        buffer: -1 / 0
      }),
      move: false
    }),
    useFocus(floating.context),
    useDismiss(floating.context, {
      referencePress: true,
      referencePressEvent: "click"
    })
  ]);
  reactExports.useEffect(() => {
    if (!reference) return;
    let domEventName = (e) => e.toLowerCase().substring(2);
    let cleanupValues = {};
    Object.entries({
      ...ariaProps,
      ...interactions.getReferenceProps()
    }).forEach(([key, value]) => {
      if ("function" == typeof value) {
        let patchedHandler = (event) => {
          value({
            ...event,
            nativeEvent: event
          });
        };
        reference.addEventListener(domEventName(key), patchedHandler);
        cleanupValues[key] = patchedHandler;
      } else if (value) {
        cleanupValues[key] = reference.getAttribute(key);
        reference.setAttribute(key, value);
      }
    });
    return () => {
      Object.entries(cleanupValues).forEach(([key, value]) => {
        if ("function" == typeof value)
          reference.removeEventListener(domEventName(key), value);
        else if (value) reference.setAttribute(key, value);
        else reference.removeAttribute(key);
      });
    };
  }, [ariaProps, reference, interactions]);
  let getReferenceProps = reactExports.useCallback(
    (userProps) => interactions.getReferenceProps({
      ...userProps,
      ...ariaProps
    }),
    [interactions, ariaProps]
  );
  let floatingProps = reactExports.useMemo(
    () => ({
      ...interactions.getFloatingProps({
        hidden: !open,
        "aria-hidden": "true",
        ...props,
        id
      }),
      popover: "manual"
    }),
    [interactions, props, id, open]
  );
  return reactExports.useMemo(
    () => ({
      getReferenceProps,
      floatingProps,
      ...floating,
      refs: {
        ...floating.refs,
        setFloating: (element) => {
          floating.refs.setFloating(element);
          syncWithControlledState(element);
        }
      },
      floatingStyles: floating.context.open ? floating.floatingStyles : {}
    }),
    [getReferenceProps, floatingProps, floating, syncWithControlledState]
  );
};
const Tooltip = reactExports.forwardRef((props, forwardedRef) => {
  let { content, children, portal = true, className, style, ...rest } = props;
  let tooltip = useTooltip(rest);
  let refs = useMergedRefs(tooltip.refs.setFloating, forwardedRef);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    cloneElementWithRef(children, (children2) => ({
      ...tooltip.getReferenceProps(children2.props),
      ref: tooltip.refs.setReference
    })),
    "none" !== props.ariaStrategy || tooltip.context.open ? reactExports.createElement(
      Portal,
      {
        portal
      },
      reactExports.createElement(
        Box,
        {
          className: cx("iui-tooltip", className),
          ref: refs,
          style: {
            ...tooltip.floatingStyles,
            ...style
          },
          ...tooltip.floatingProps
        },
        content
      )
    ) : null
  );
});
const VisuallyHidden = reactExports.forwardRef((props, ref) => {
  let {
    as: asProp = "span",
    className,
    unhideOnFocus = true,
    children: childrenProp,
    ...rest
  } = props;
  let isHydrated = "hydrated" === useHydration();
  let children = ["div", "span", "p"].includes(asProp) ? reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(
      ShadowRoot$1,
      {
        css
      },
      reactExports.createElement("slot", null)
    ),
    isHydrated && childrenProp
  ) : childrenProp;
  return reactExports.createElement(
    Box,
    {
      as: asProp,
      className: cx("iui-visually-hidden", className),
      "data-iui-unhide-on-focus": unhideOnFocus ? true : void 0,
      ref,
      ...rest
    },
    children
  );
});
let css = `
  :host(:where(:not([data-iui-unhide-on-focus]:is(:focus-within, :active)))) {
    clip-path: inset(50%) !important;
    overflow: hidden !important;
    position: absolute !important;
    white-space: nowrap !important;
    block-size: 1px !important;
    inline-size: 1px !important;
  }
`;
const ButtonGroupContext = reactExports.createContext(void 0);
const ButtonGroup = reactExports.forwardRef((props, forwardedRef) => {
  let {
    children: childrenProp,
    overflowButton,
    overflowPlacement = "end",
    orientation = "horizontal",
    ...rest
  } = props;
  let children = reactExports.useMemo(() => {
    if ("toolbar" !== props.role) return childrenProp;
    return reactExports.Children.map(
      childrenProp,
      (child, index2) => reactExports.isValidElement(child) ? reactExports.createElement(CompositeItem, {
        key: index2,
        render: child
      }) : child
    );
  }, [childrenProp, props.role]);
  let node = overflowButton ? reactExports.createElement(
    OverflowGroup,
    {
      orientation,
      overflowButton,
      overflowPlacement,
      ref: forwardedRef,
      ...rest
    },
    children
  ) : reactExports.createElement(
    BaseGroup,
    {
      orientation,
      ref: forwardedRef,
      ...rest
    },
    children
  );
  return reactExports.createElement(
    FloatingDelayGroup,
    {
      delay: defaultTooltipDelay
    },
    reactExports.createElement(
      ButtonGroupContext.Provider,
      {
        value: orientation
      },
      "toolbar" === props.role ? reactExports.createElement(Composite, {
        orientation,
        render: node,
        disabledIndices: []
      }) : node
    )
  );
});
let BaseGroup = reactExports.forwardRef((props, forwardedRef) => {
  let { orientation, className, ...rest } = props;
  return reactExports.createElement(Box, {
    className: cx("iui-button-group", className),
    "data-iui-orientation": "vertical" === orientation ? orientation : void 0,
    ref: forwardedRef,
    ...rest
  });
});
let OverflowGroup = reactExports.forwardRef((props, forwardedRef) => {
  let {
    children: childrenProp,
    orientation,
    overflowButton,
    overflowPlacement,
    ...rest
  } = props;
  let items = reactExports.useMemo(
    () => reactExports.Children.toArray(childrenProp).filter(Boolean),
    [childrenProp]
  );
  return reactExports.createElement(
    OverflowContainer,
    {
      as: BaseGroup,
      itemsCount: items.length,
      overflowOrientation: orientation,
      orientation,
      ...rest,
      className: cx(
        {
          "iui-button-group-overflow-x": !!overflowButton && "horizontal" === orientation
        },
        props.className
      ),
      ref: forwardedRef
    },
    reactExports.createElement(OverflowGroupContent, {
      overflowButton,
      overflowPlacement,
      items
    })
  );
});
let OverflowGroupContent = (props) => {
  let { overflowButton, overflowPlacement, items } = props;
  let { visibleCount } = OverflowContainer.useContext();
  let overflowStart = "start" === overflowPlacement ? items.length - visibleCount : visibleCount - 1;
  if (!(visibleCount < items.length)) return items;
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    overflowButton && "start" === overflowPlacement && overflowButton(overflowStart),
    "start" === overflowPlacement ? items.slice(overflowStart + 1) : items.slice(0, Math.max(0, overflowStart)),
    overflowButton && "end" === overflowPlacement && overflowButton(overflowStart)
  );
};
const PortalContainerContext = reactExports.createContext(null);
const Portal = (props) => {
  let { portal = true, children } = props;
  let isClient = useIsClient();
  let portalTo = usePortalTo(portal);
  if (!isClient) return null;
  return portalTo ? reactDomExports.createPortal(children, portalTo) : children;
};
const usePortalTo = (portal) => {
  let portalContainer = reactExports.useContext(PortalContainerContext);
  if ("boolean" == typeof portal) return portal ? portalContainer : null;
  let portalTo = "function" == typeof portal.to ? portal.to() : portal.to;
  return portalTo ?? portalContainer;
};
const Toast = (props) => {
  let {
    content,
    category,
    type = "temporary",
    isVisible: isVisibleProp,
    link,
    duration = 7e3,
    hasCloseButton,
    onRemove,
    animateOutTo,
    domProps
  } = props;
  let closeTimeout = reactExports.useRef(0);
  let { placement } = useSafeContext(ToasterStateContext).settings;
  let placementPosition = placement.startsWith("top") ? "top" : "bottom";
  let [visible, setVisible] = reactExports.useState(isVisibleProp ?? true);
  let isVisible = isVisibleProp ?? visible;
  let [height, setHeight] = reactExports.useState(0);
  let thisElement = reactExports.useRef(null);
  let [margin, setMargin] = reactExports.useState(0);
  let marginStyle = () => {
    if ("top" === placementPosition)
      return {
        marginBlockEnd: margin
      };
    return {
      marginBlockStart: margin
    };
  };
  reactExports.useEffect(() => {
    if ("temporary" === type) setCloseTimeout(duration);
    return () => {
      clearCloseTimeout();
    };
  }, [duration, type]);
  reactExports.useEffect(() => {
    if (!isVisible && !animateOutTo) setMargin(-height);
  }, [isVisible, animateOutTo, setMargin, height]);
  let close = () => {
    clearCloseTimeout();
    setMargin(-height);
    setVisible(false);
  };
  let setCloseTimeout = (timeout) => {
    let definedWindow = getWindow$1();
    if (!definedWindow) return;
    closeTimeout.current = definedWindow.setTimeout(() => {
      close();
    }, timeout);
  };
  let clearCloseTimeout = () => {
    var _a;
    (_a = getWindow$1()) == null ? void 0 : _a.clearTimeout(closeTimeout.current);
  };
  let onRef = (ref) => {
    if (ref) {
      let { height: height2 } = ref.getBoundingClientRect();
      setHeight(height2);
    }
  };
  let shouldBeMounted = useAnimateToastBasedOnVisibility(isVisible, {
    thisElement,
    animateOutTo,
    onRemove
  });
  return shouldBeMounted ? reactExports.createElement(
    Box,
    {
      ref: thisElement,
      className: "iui-toast-all",
      style: {
        height,
        ...marginStyle()
      }
    },
    reactExports.createElement(
      "div",
      {
        ref: onRef
      },
      reactExports.createElement(ToastPresentation, {
        as: "div",
        category,
        content,
        link,
        type,
        hasCloseButton,
        onClose: close,
        ...domProps == null ? void 0 : domProps.toastProps,
        contentProps: domProps == null ? void 0 : domProps.contentProps
      })
    )
  ) : null;
};
const ToastPresentation = reactExports.forwardRef((props, forwardedRef) => {
  let {
    content,
    category,
    type = "temporary",
    link,
    hasCloseButton,
    onClose,
    className,
    contentProps,
    ...rest
  } = props;
  let StatusIcon = StatusIconMap[category];
  return reactExports.createElement(
    Box,
    {
      className: cx(`iui-toast iui-${category}`, className),
      ref: forwardedRef,
      ...rest
    },
    reactExports.createElement(
      Box,
      {
        className: "iui-status-area"
      },
      reactExports.createElement(StatusIcon, {
        className: "iui-icon"
      })
    ),
    reactExports.createElement(
      Box,
      {
        as: "div",
        ...contentProps,
        className: cx("iui-message", contentProps == null ? void 0 : contentProps.className)
      },
      content
    ),
    link && reactExports.createElement(
      ButtonBase,
      {
        ...link,
        className: cx("iui-anchor", "iui-toast-anchor", link.className),
        title: void 0,
        "data-iui-status": category,
        "data-iui-underline": true
      },
      link.title
    ),
    ("persisting" === type || hasCloseButton) && reactExports.createElement(
      IconButton,
      {
        size: "small",
        styleType: "borderless",
        onClick: onClose,
        "aria-label": "Close"
      },
      reactExports.createElement(SvgCloseSmall, null)
    )
  );
});
let useAnimateToastBasedOnVisibility = (isVisible, args) => {
  let { thisElement, animateOutTo, onRemove } = args;
  let [shouldBeMounted, setShouldBeMounted] = reactExports.useState(isVisible);
  let motionOk = useMediaQuery("(prefers-reduced-motion: no-preference)");
  let onRemoveRef = useLatestRef$2(onRemove);
  let [prevIsVisible, setPrevIsVisible] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    if (prevIsVisible !== isVisible) {
      setPrevIsVisible(isVisible);
      if (isVisible) safeAnimateIn();
      else safeAnimateOut();
    }
    function calculateOutAnimation(node) {
      let translateX = 0;
      let translateY = 0;
      if (animateOutTo && node) {
        let { x: startX, y: startY } = node.getBoundingClientRect();
        let { x: endX, y: endY } = animateOutTo.getBoundingClientRect();
        translateX = endX - startX;
        translateY = endY - startY;
      }
      return {
        translateX,
        translateY
      };
    }
    function safeAnimateIn() {
      setShouldBeMounted(true);
      queueMicrotask(() => {
        animateIn();
      });
    }
    function safeAnimateOut() {
      var _a;
      if (motionOk) {
        let animation = animateOut();
        animation == null ? void 0 : animation.addEventListener("finish", () => {
          var _a2;
          setShouldBeMounted(false);
          (_a2 = onRemoveRef.current) == null ? void 0 : _a2.call(onRemoveRef);
        });
      } else {
        setShouldBeMounted(false);
        (_a = onRemoveRef.current) == null ? void 0 : _a.call(onRemoveRef);
      }
    }
    function animateIn() {
      var _a, _b;
      if (!motionOk) return;
      (_b = (_a = thisElement.current) == null ? void 0 : _a.animate) == null ? void 0 : _b.call(
        _a,
        [
          {
            transform: "translateY(15%)"
          },
          {
            transform: "translateY(0)"
          }
        ],
        {
          duration: 240,
          fill: "forwards"
        }
      );
    }
    function animateOut() {
      var _a, _b;
      if (null == thisElement.current || !motionOk) return;
      let { translateX, translateY } = calculateOutAnimation(
        thisElement.current
      );
      let animationDuration = animateOutTo ? 400 : 120;
      let animation = (_b = (_a = thisElement.current) == null ? void 0 : _a.animate) == null ? void 0 : _b.call(
        _a,
        [
          {
            transform: animateOutTo ? `scale(0.9) translate(${translateX}px,${translateY}px)` : "scale(0.9)",
            opacity: 0,
            transitionDuration: `${animationDuration}ms`,
            transitionTimingFunction: "cubic-bezier(0.4, 0, 1, 1)"
          }
        ],
        {
          duration: animationDuration,
          iterations: 1,
          fill: "forwards"
        }
      );
      return animation;
    }
  }, [
    isVisible,
    prevIsVisible,
    animateOutTo,
    motionOk,
    thisElement,
    setShouldBeMounted,
    onRemoveRef
  ]);
  return shouldBeMounted;
};
const useToaster = () => {
  let dispatch = useSafeContext(ToasterDispatchContext);
  return reactExports.useMemo(() => {
    let showToast = (category) => (content, options) => {
      let id = nextId();
      dispatch({
        type: "add",
        toast: {
          ...options,
          id,
          content,
          category
        }
      });
      return {
        close: () => dispatch({
          type: "remove",
          id
        })
      };
    };
    return {
      positive: showToast("positive"),
      informational: showToast("informational"),
      negative: showToast("negative"),
      warning: showToast("warning"),
      closeAll: () => {
        dispatch({
          type: "close-all"
        });
      },
      setSettings: (settings) => {
        dispatch({
          type: "settings",
          settings
        });
      }
    };
  }, [dispatch]);
};
const Toaster = () => {
  let { toasts, settings } = useSafeContext(ToasterStateContext);
  return reactExports.createElement(
    Box,
    {
      className: cx("iui-toast-wrapper", `iui-placement-${settings.placement}`)
    },
    toasts.map(
      (toastProps) => reactExports.createElement(Toast, {
        key: toastProps.id,
        ...toastProps
      })
    )
  );
};
const ToastProvider = ({ children, inherit = false }) => {
  let [toasterState, dispatch] = reactExports.useReducer(toastReducer, {
    toasts: [],
    settings: {
      order: "auto",
      placement: "top"
    }
  });
  let toasterDispatchContext = reactExports.useContext(ToasterDispatchContext);
  let toasterStateContext = reactExports.useContext(ToasterStateContext);
  let shouldReuse = toasterStateContext && inherit;
  let toasterDispatchContextValue = shouldReuse ? toasterDispatchContext : dispatch;
  let toasterStateContextValue = shouldReuse ? toasterStateContext : toasterState;
  return reactExports.createElement(
    ToasterDispatchContext.Provider,
    {
      value: toasterDispatchContextValue
    },
    reactExports.createElement(
      ToasterStateContext.Provider,
      {
        value: toasterStateContextValue
      },
      children
    )
  );
};
let toastReducer = (state, action) => {
  if ("add" === action.type) {
    let order = state.settings.order;
    if ("auto" === order)
      order = state.settings.placement.startsWith("top") ? "descending" : "ascending";
    return {
      ...state,
      toasts: [
        ..."ascending" === order ? state.toasts : [],
        action.toast,
        ..."descending" === order ? state.toasts : []
      ]
    };
  }
  if ("remove" === action.type)
    return {
      ...state,
      toasts: state.toasts.filter((toast) => toast.id !== action.id)
    };
  if ("close-all" === action.type)
    return {
      ...state,
      toasts: state.toasts.map((toast) => ({
        ...toast,
        isVisible: false
      }))
    };
  if ("settings" === action.type)
    return {
      ...state,
      settings: {
        ...state.settings,
        ...action.settings
      }
    };
  return state;
};
const ToasterStateContext = reactExports.createContext(void 0);
let ToasterDispatchContext = reactExports.createContext(void 0);
let nextId = /* @__PURE__ */ (() => {
  let count2 = 0;
  return () => ++count2;
})();
let _moduleType = "ESM";
const meta = {
  version: t,
  module: _moduleType
};
let versionWithoutDots = meta.version.replace(/\./g, "");
let OwnerDocumentContext = reactExports.createContext(void 0);
const ThemeProvider = reactExports.forwardRef((props, forwardedRef) => {
  var _a, _b;
  var _themeOptions, _themeOptions1, _future;
  let {
    theme: themeProp = "inherit",
    children,
    themeOptions = {},
    portalContainer: portalContainerProp,
    includeCss = "inherit" === themeProp,
    future = {},
    ...rest
  } = props;
  useInertPolyfill();
  let [rootElement, setRootElement] = reactExports.useState(null);
  let parent = useParentThemeAndContext(rootElement);
  let theme = "inherit" === themeProp ? parent.theme || "light" : themeProp;
  (_themeOptions = themeOptions).applyBackground ?? (_themeOptions.applyBackground = !parent.theme);
  (_themeOptions1 = themeOptions).highContrast ?? (_themeOptions1.highContrast = "inherit" === themeProp ? parent.highContrast : void 0);
  (_future = future).themeBridge ?? (_future.themeBridge = (_b = (_a = parent.context) == null ? void 0 : _a.future) == null ? void 0 : _b.themeBridge);
  let portalContainerFromParent = reactExports.useContext(PortalContainerContext);
  let contextValue = reactExports.useMemo(
    () => ({
      theme,
      themeOptions,
      future
    }),
    [theme, JSON.stringify(themeOptions), JSON.stringify(future)]
  );
  let [portalContainer, setPortalContainer] = reactExports.useState(
    portalContainerProp || null
  );
  return reactExports.createElement(
    PortalContainerContext.Provider,
    {
      value: portalContainer
    },
    reactExports.createElement(
      HydrationProvider,
      null,
      reactExports.createElement(
        ThemeContext.Provider,
        {
          value: contextValue
        },
        reactExports.createElement(
          ToastProvider,
          {
            inherit: "inherit" === themeProp && !portalContainerProp
          },
          includeCss && rootElement ? reactExports.createElement(FallbackStyles, {
            root: rootElement
          }) : null,
          reactExports.createElement(
            MainRoot,
            {
              theme,
              themeOptions,
              future,
              ref: useMergedRefs(forwardedRef, setRootElement, useIuiDebugRef),
              ...rest
            },
            children,
            reactExports.createElement(PortalContainer, {
              theme,
              themeOptions,
              future,
              portalContainerProp,
              portalContainerFromParent,
              setPortalContainer,
              isInheritingTheme: "inherit" === themeProp
            })
          )
        )
      )
    )
  );
});
let MainRoot = reactExports.forwardRef((props, forwardedRef) => {
  let [ownerDocument, setOwnerDocument] = reactExports.useState(void 0);
  let findOwnerDocumentFromRef = reactExports.useCallback(
    (el) => {
      if (el && el.ownerDocument !== ownerDocument)
        setOwnerDocument(el.ownerDocument);
    },
    [ownerDocument, setOwnerDocument]
  );
  return reactExports.createElement(
    OwnerDocumentContext.Provider,
    {
      value: ownerDocument
    },
    reactExports.createElement(Root, {
      ...props,
      ref: useMergedRefs(findOwnerDocumentFromRef, forwardedRef)
    })
  );
});
let Root = reactExports.forwardRef((props, forwardedRef) => {
  let { theme, children, themeOptions, className, future, ...rest } = props;
  let prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  let prefersHighContrast = useMediaQuery("(prefers-contrast: more)");
  let shouldApplyDark = "dark" === theme || "os" === theme && prefersDark;
  let shouldApplyHC = (themeOptions == null ? void 0 : themeOptions.highContrast) ?? prefersHighContrast;
  let shouldApplyBackground = themeOptions == null ? void 0 : themeOptions.applyBackground;
  return reactExports.createElement(
    Box,
    {
      className: cx(
        "iui-root",
        {
          "iui-root-background": shouldApplyBackground
        },
        className
      ),
      "data-iui-theme": shouldApplyDark ? "dark" : "light",
      "data-iui-contrast": shouldApplyHC ? "high" : "default",
      "data-iui-bridge": (future == null ? void 0 : future.themeBridge) ? true : void 0,
      ref: forwardedRef,
      ...rest
    },
    children
  );
});
let useParentThemeAndContext = (rootElement) => {
  var _a, _b;
  let parentContext = reactExports.useContext(ThemeContext);
  let [parentThemeState, setParentTheme] = reactExports.useState(parentContext == null ? void 0 : parentContext.theme);
  let [parentHighContrastState, setParentHighContrastState] = reactExports.useState(
    (_a = parentContext == null ? void 0 : parentContext.themeOptions) == null ? void 0 : _a.highContrast
  );
  let parentThemeRef = useLatestRef$2(parentContext == null ? void 0 : parentContext.theme);
  useIsomorphicLayoutEffect(() => {
    var _a2;
    if (parentThemeRef.current) return;
    let closestRoot = (_a2 = rootElement == null ? void 0 : rootElement.parentElement) == null ? void 0 : _a2.closest("[data-iui-theme]");
    if (!closestRoot) return;
    let synchronizeTheme = () => {
      setParentTheme(closestRoot == null ? void 0 : closestRoot.getAttribute("data-iui-theme"));
      setParentHighContrastState(
        (closestRoot == null ? void 0 : closestRoot.getAttribute("data-iui-contrast")) === "high"
      );
    };
    synchronizeTheme();
    let observer = new MutationObserver(() => synchronizeTheme());
    observer.observe(closestRoot, {
      attributes: true,
      attributeFilter: ["data-iui-theme", "data-iui-contrast"]
    });
    return () => {
      observer.disconnect();
    };
  }, [rootElement, parentThemeRef]);
  return {
    theme: (parentContext == null ? void 0 : parentContext.theme) ?? parentThemeState,
    highContrast: ((_b = parentContext == null ? void 0 : parentContext.themeOptions) == null ? void 0 : _b.highContrast) ?? parentHighContrastState,
    context: parentContext
  };
};
let PortalContainer = reactExports.memo(
  ({
    portalContainerProp,
    portalContainerFromParent,
    setPortalContainer,
    isInheritingTheme,
    theme,
    themeOptions,
    future
  }) => {
    let ownerDocument = reactExports.useContext(OwnerDocumentContext);
    let shouldSetupPortalContainer = !portalContainerProp && (!isInheritingTheme || !portalContainerFromParent || !!ownerDocument && portalContainerFromParent.ownerDocument !== ownerDocument);
    let id = useId$1();
    reactExports.useEffect(() => {
      if (shouldSetupPortalContainer) return;
      let portalTarget = portalContainerProp || portalContainerFromParent;
      if (portalTarget) setPortalContainer(portalTarget);
    }, [
      portalContainerProp,
      portalContainerFromParent,
      shouldSetupPortalContainer,
      setPortalContainer
    ]);
    let isHydrated = "hydrated" === useHydration();
    if (!isHydrated) return null;
    if (shouldSetupPortalContainer && ownerDocument)
      return reactDomExports.createPortal(
        reactExports.createElement(
          Root,
          {
            theme,
            themeOptions: {
              ...themeOptions,
              applyBackground: false
            },
            future,
            "data-iui-portal": true,
            style: {
              display: "contents"
            },
            ref: setPortalContainer,
            id
          },
          reactExports.createElement(Toaster, null)
        ),
        ownerDocument.body
      );
    if (portalContainerProp)
      return reactDomExports.createPortal(
        reactExports.createElement(Toaster, null),
        portalContainerProp
      );
    return null;
  }
);
let FallbackStyles = ({ root }) => {
  useIsomorphicLayoutEffect(() => {
    if ("yes" === getComputedStyle(root).getPropertyValue(`--_iui-v${versionWithoutDots}`))
      return;
    if (isUnitTest) return;
    (async () => {
      try {
        await __vitePreload(() => Promise.resolve({}), true ? __vite__mapDeps([0]) : void 0, import.meta.url);
      } catch (error) {
        console.log("Error loading styles.css locally", error);
        let css2 = await importCss(
          `https://cdn.jsdelivr.net/npm/@itwin/itwinui-react@${meta.version}/styles.css`
        );
        document.adoptedStyleSheets = [
          ...document.adoptedStyleSheets,
          css2.default
        ];
      }
    })();
  }, [root]);
  return reactExports.createElement(reactExports.Fragment, null);
};
let useIuiDebugRef = () => {
  var _globalThis;
  let _globalThis1 = globalThis;
  (_globalThis = _globalThis1).__iui || (_globalThis.__iui = {
    versions: /* @__PURE__ */ new Set()
  });
  _globalThis1.__iui.versions.add(JSON.stringify(meta));
};
let useInertPolyfill = () => {
  let loaded = reactExports.useRef(false);
  let modulePath = "https://cdn.jsdelivr.net/npm/wicg-inert@3.1.2/dist/inert.min.js";
  reactExports.useEffect(() => {
    (async () => {
      if (!HTMLElement.prototype.hasOwnProperty("inert") && !loaded.current && !isUnitTest) {
        await new Function("url", "return import(url)")(modulePath);
        loaded.current = true;
      }
    })();
  }, []);
};
const PopoverOpenContext = reactExports.createContext(void 0);
const PopoverInitialFocusContext = reactExports.createContext(void 0);
const usePopover = (options) => {
  var _a, _b;
  let {
    placement = "bottom-start",
    visible,
    onVisibleChange,
    closeOnOutsideClick,
    autoUpdateOptions,
    matchWidth,
    interactions: interactionsProp,
    role,
    ...rest
  } = options;
  let mergedInteractions = reactExports.useMemo(
    () => ({
      ...interactionsProp,
      ...{
        click: (interactionsProp == null ? void 0 : interactionsProp.click) ?? true,
        dismiss: (interactionsProp == null ? void 0 : interactionsProp.dismiss) ?? true,
        hover: (interactionsProp == null ? void 0 : interactionsProp.hover) ?? false,
        focus: (interactionsProp == null ? void 0 : interactionsProp.focus) ?? false
      }
    }),
    [interactionsProp]
  );
  let tree = useFloatingTree();
  let middleware = reactExports.useMemo(
    () => {
      var _a2, _b2, _c, _d;
      return {
        ...options.middleware,
        flip: ((_a2 = options.middleware) == null ? void 0 : _a2.flip) ?? true,
        shift: ((_b2 = options.middleware) == null ? void 0 : _b2.shift) ?? true,
        size: ((_c = options.middleware) == null ? void 0 : _c.size) ?? true,
        hide: ((_d = options.middleware) == null ? void 0 : _d.hide) || !isUnitTest
      };
    },
    [options.middleware]
  );
  let maxHeight = "boolean" == typeof middleware.size ? "400px" : (_a = middleware.size) == null ? void 0 : _a.maxHeight;
  let [open, onOpenChange] = useControlledState(
    false,
    visible,
    onVisibleChange
  );
  let floating = useFloating({
    placement,
    open,
    onOpenChange,
    strategy: "fixed",
    transform: false,
    whileElementsMounted: reactExports.useMemo(
      () => open ? (...args) => autoUpdate(...args, autoUpdateOptions) : void 0,
      [autoUpdateOptions, open]
    ),
    ...rest,
    middleware: reactExports.useMemo(
      () => [
        void 0 !== middleware.offset && offset(middleware.offset),
        middleware.flip && flip({
          padding: 4
        }),
        middleware.shift && shift({
          padding: 4
        }),
        (matchWidth || middleware.size) && size({
          padding: 4,
          apply: ({ rects, availableHeight: availableHeight2 }) => {
            if (middleware.size)
              setAvailableHeight(Math.round(availableHeight2));
            if (matchWidth) setReferenceWidth(rects.reference.width);
          }
        }),
        middleware.autoPlacement && autoPlacement({
          padding: 4
        }),
        middleware.inline && inline(),
        middleware.hide && hide({
          padding: 4
        })
      ].filter(Boolean),
      [matchWidth, middleware]
    )
  });
  let interactions = useInteractions([
    useClick(floating.context, {
      enabled: !!mergedInteractions.click,
      ...mergedInteractions.click
    }),
    useDismiss(floating.context, {
      enabled: !!mergedInteractions.dismiss,
      outsidePress: closeOnOutsideClick,
      bubbles: null != tree,
      ...mergedInteractions.dismiss
    }),
    useHover(floating.context, {
      enabled: !!mergedInteractions.hover,
      delay: 100,
      handleClose: safePolygon({
        buffer: 1,
        blockPointerEvents: true
      }),
      move: false,
      ...mergedInteractions.hover
    }),
    useFocus(floating.context, {
      enabled: !!mergedInteractions.focus,
      ...mergedInteractions.focus
    }),
    useRole(floating.context, {
      role: "dialog",
      enabled: !!role
    })
  ]);
  let [referenceWidth, setReferenceWidth] = reactExports.useState();
  let [availableHeight, setAvailableHeight] = reactExports.useState();
  let getFloatingProps = reactExports.useCallback(
    (userProps) => {
      var _a2;
      return interactions.getFloatingProps({
        ...userProps,
        style: {
          ...floating.floatingStyles,
          ...middleware.size && availableHeight && {
            maxBlockSize: `min(${availableHeight}px, ${maxHeight})`
          },
          zIndex: 999,
          ...matchWidth && referenceWidth ? {
            minInlineSize: `${referenceWidth}px`,
            maxInlineSize: `min(${2 * referenceWidth}px, 90vw)`
          } : {},
          ...middleware.hide && ((_a2 = floating.middlewareData.hide) == null ? void 0 : _a2.referenceHidden) && {
            visibility: "hidden"
          },
          ...userProps == null ? void 0 : userProps.style
        }
      });
    },
    [
      interactions,
      floating.floatingStyles,
      (_b = floating.middlewareData.hide) == null ? void 0 : _b.referenceHidden,
      middleware.size,
      middleware.hide,
      availableHeight,
      maxHeight,
      matchWidth,
      referenceWidth
    ]
  );
  let getReferenceProps = reactExports.useCallback(
    (userProps) => interactions.getReferenceProps({
      ...userProps,
      onClick: mergeEventHandlers(userProps == null ? void 0 : userProps.onClick, () => {
        if (!!mergedInteractions.click && visible) onOpenChange(false);
      })
    }),
    [interactions, mergedInteractions.click, visible, onOpenChange]
  );
  return reactExports.useMemo(
    () => ({
      open,
      onOpenChange,
      getReferenceProps,
      getFloatingProps,
      ...floating
    }),
    [open, onOpenChange, getFloatingProps, floating, getReferenceProps]
  );
};
const Popover = reactExports.forwardRef((props, forwardedRef) => {
  var _a;
  let {
    portal = true,
    visible,
    placement = "bottom-start",
    onVisibleChange,
    closeOnOutsideClick = true,
    middleware,
    positionReference,
    className,
    children,
    content,
    applyBackground = false,
    ...rest
  } = props;
  let popover = usePopover({
    visible,
    placement,
    onVisibleChange,
    closeOnOutsideClick,
    role: "dialog",
    middleware
  });
  let [popoverElement, setPopoverElement] = reactExports.useState(null);
  let popoverRef = useMergedRefs(
    popover.refs.setFloating,
    forwardedRef,
    setPopoverElement
  );
  let triggerId = `${useId$1()}-trigger`;
  let hasAriaLabel = !!props["aria-labelledby"] || !!props["aria-label"];
  useIsomorphicLayoutEffect(() => {
    if (!positionReference) return;
    popover.refs.setPositionReference(positionReference);
    return () => void popover.refs.setPositionReference(null);
  }, [popover.refs, positionReference]);
  let [initialFocus, setInitialFocus] = reactExports.useState();
  let initialFocusContextValue = reactExports.useMemo(
    () => ({
      setInitialFocus
    }),
    []
  );
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(
      PopoverOpenContext.Provider,
      {
        value: popover.open
      },
      cloneElementWithRef(children, (children2) => ({
        id: children2.props.id || triggerId,
        ...popover.getReferenceProps(children2.props),
        ref: popover.refs.setReference
      }))
    ),
    popover.open ? reactExports.createElement(
      PopoverInitialFocusContext.Provider,
      {
        value: initialFocusContextValue
      },
      reactExports.createElement(
        PopoverPortal,
        {
          portal
        },
        reactExports.createElement(
          ThemeProvider,
          null,
          reactExports.createElement(
            PortalContainerContext.Provider,
            {
              value: popoverElement
            },
            reactExports.createElement(DisplayContents, null),
            reactExports.createElement(
              FloatingFocusManager,
              {
                context: popover.context,
                modal: false,
                initialFocus
              },
              reactExports.createElement(
                Box,
                {
                  className: cx(
                    {
                      "iui-popover-surface": applyBackground
                    },
                    className
                  ),
                  "aria-labelledby": hasAriaLabel ? void 0 : (_a = popover.refs.domReference.current) == null ? void 0 : _a.id,
                  ...popover.getFloatingProps(rest),
                  ref: popoverRef
                },
                content
              )
            )
          )
        )
      )
    ) : null
  );
});
let PopoverPortal = ({ children, portal = true }) => {
  let portalTo = usePortalTo(portal);
  return reactExports.createElement(
    FloatingPortal,
    {
      key: portalTo == null ? void 0 : portalTo.id,
      root: portalTo ?? void 0
    },
    reactExports.createElement(DisplayContents, null),
    children
  );
};
let DisplayContents = reactExports.memo(
  () => reactExports.createElement(
    ShadowRoot$1,
    {
      css: `
        :host {
          display: contents;
        }
      `
    },
    reactExports.createElement("slot", null)
  )
);
const IconButton = reactExports.forwardRef((props, ref) => {
  let {
    isActive,
    children,
    styleType = "default",
    size: size2,
    className,
    title,
    label = title,
    iconProps,
    labelProps,
    ...rest
  } = props;
  let buttonGroupOrientation = reactExports.useContext(ButtonGroupContext);
  let hasPopoverOpen = reactExports.useContext(PopoverOpenContext);
  let button = reactExports.createElement(
    ButtonBase,
    {
      ref,
      className: cx("iui-button", "iui-field", className),
      "data-iui-variant": "default" !== styleType ? styleType : void 0,
      "data-iui-size": size2,
      "data-iui-active": isActive,
      "data-iui-has-popover": hasPopoverOpen ? "open" : void 0,
      "aria-pressed": isActive,
      ...rest
    },
    reactExports.createElement(
      Box,
      {
        as: "span",
        "aria-hidden": true,
        ...iconProps,
        className: cx("iui-button-icon", iconProps == null ? void 0 : iconProps.className)
      },
      children
    ),
    label ? reactExports.createElement(VisuallyHidden, null, label) : null
  );
  return label ? reactExports.createElement(
    Tooltip,
    {
      placement: "vertical" === buttonGroupOrientation ? "right" : "top",
      ...labelProps,
      content: label,
      ariaStrategy: "none"
    },
    button
  ) : button;
});
let OverflowContainerMain = React.forwardRef((props, forwardedRef) => {
  let { itemsCount, children, overflowOrientation, ...rest } = props;
  let [containerRef, visibleCount] = useOverflow(
    itemsCount,
    overflowOrientation
  );
  let overflowContainerContextValue = React.useMemo(
    () => ({
      visibleCount,
      itemsCount
    }),
    [itemsCount, visibleCount]
  );
  return React.createElement(
    OverflowContainerContext.Provider,
    {
      value: overflowContainerContextValue
    },
    React.createElement(
      Box,
      {
        ref: useMergedRefs(forwardedRef, containerRef),
        ...rest
      },
      children
    )
  );
});
let OverflowContainerOverflowNode = (props) => {
  let { children } = props;
  let { visibleCount, itemsCount } = useOverflowContainerContext();
  let isOverflowing = visibleCount < itemsCount;
  return isOverflowing ? children : null;
};
let OverflowContainerComponent = React.forwardRef((props, forwardedRef) => {
  let { itemsCount, overflowOrientation = "horizontal", ...rest } = props;
  let [size2, setSize] = React.useState(null);
  let [resizeRef] = useResizeObserver(setSize);
  let ref = useMergedRefs(resizeRef, forwardedRef);
  let key = `${itemsCount}${"vertical" === overflowOrientation ? size2 == null ? void 0 : size2.height : size2 == null ? void 0 : size2.width}`;
  return React.createElement(OverflowContainerMain, {
    ...rest,
    key,
    ref,
    itemsCount,
    overflowOrientation
  });
});
const OverflowContainer = Object.assign(OverflowContainerComponent, {
  OverflowNode: OverflowContainerOverflowNode,
  useContext: useOverflowContainerContext
});
let OverflowContainerContext = React.createContext(void 0);
let useOverflow = (itemsCount, orientation = "horizontal") => {
  let [guessState, dispatch] = React.useReducer(
    overflowGuessReducer,
    {
      itemsCount
    },
    overflowGuessReducerInitialState
  );
  let containerRef = React.useRef(null);
  let isGuessing = React.useRef(false);
  useIsomorphicLayoutEffect(() => {
    let { minGuess, maxGuess, isStabilized, visibleCount } = guessState;
    if (isStabilized) return;
    guessVisibleCount();
    function guessVisibleCount() {
      if (isStabilized || isGuessing.current || isUnitTest) return;
      try {
        isGuessing.current = true;
        if (null == containerRef.current) return;
        let dimension = "horizontal" === orientation ? "Width" : "Height";
        let availableSize = containerRef.current[`offset${dimension}`];
        let requiredSize = containerRef.current[`scroll${dimension}`];
        let isOverflowing = availableSize < requiredSize;
        if (0 === itemsCount || 1 === visibleCount && isOverflowing || visibleCount === itemsCount && !isOverflowing || maxGuess - minGuess === 1 && visibleCount === minGuess)
          return void dispatch({
            type: "stabilize"
          });
        if (maxGuess === visibleCount && !isOverflowing)
          return void dispatch({
            type: "shiftGuessRangeForward"
          });
        isOverflowing ? dispatch({
          type: "decreaseMaxGuess",
          currentState: guessState
        }) : dispatch({
          type: "increaseMinGuess",
          currentState: guessState
        });
      } finally {
        isGuessing.current = false;
      }
    }
  }, [guessState, itemsCount, orientation]);
  return [containerRef, guessState.visibleCount];
};
let STARTING_MAX_ITEMS_COUNT = 32;
let overflowGuessReducerInitialState = ({ itemsCount }) => {
  let initialVisibleCount = Math.min(itemsCount, STARTING_MAX_ITEMS_COUNT);
  return isUnitTest ? {
    isStabilized: true,
    minGuess: null,
    maxGuess: null,
    itemsCount,
    visibleCount: itemsCount
  } : {
    isStabilized: false,
    minGuess: 0,
    maxGuess: initialVisibleCount,
    itemsCount,
    visibleCount: initialVisibleCount
  };
};
let overflowGuessReducer = (state, action) => {
  let getSafeVisibleCount = ({ visibleCount, itemsCount }) => Math.min(itemsCount, visibleCount);
  switch (action.type) {
    case "decreaseMaxGuess":
    case "increaseMinGuess":
      if (state.isStabilized) return state;
      let newMinGuess = state.minGuess;
      let newMaxGuess = state.maxGuess;
      if ("decreaseMaxGuess" === action.type)
        newMaxGuess = action.currentState.visibleCount;
      else newMinGuess = action.currentState.visibleCount;
      let newVisibleCount = Math.floor((newMinGuess + newMaxGuess) / 2);
      return {
        ...state,
        isStabilized: false,
        minGuess: newMinGuess,
        maxGuess: newMaxGuess,
        visibleCount: getSafeVisibleCount({
          visibleCount: newVisibleCount,
          itemsCount: state.itemsCount
        })
      };
    case "shiftGuessRangeForward":
      if (state.isStabilized) return state;
      let doubleOfMaxGuess = 2 * state.maxGuess;
      return {
        ...state,
        isStabilized: false,
        minGuess: state.maxGuess,
        maxGuess: doubleOfMaxGuess,
        visibleCount: getSafeVisibleCount({
          visibleCount: doubleOfMaxGuess,
          itemsCount: state.itemsCount
        })
      };
    case "stabilize":
      return {
        ...state,
        isStabilized: true,
        minGuess: null,
        maxGuess: null
      };
    default:
      return state;
  }
};
function useOverflowContainerContext() {
  let overflowContainerContext = useSafeContext(OverflowContainerContext);
  return overflowContainerContext;
}
let HydrationContext = reactExports.createContext(false);
let noopSubscribe = () => () => {
};
let isServer = "undefined" == typeof window;
const useHydration = () => {
  let hydrating = useSyncExternalStore(
    noopSubscribe,
    () => false,
    () => !isServer
  );
  let hydrated = reactExports.useContext(HydrationContext);
  let hydratedFallback = useIsClient();
  if (hydrated || hydratedFallback) return "hydrated";
  if (hydrating) return "hydrating";
};
const HydrationProvider = ({ children }) => {
  let [isHydrated, setIsHydrated] = reactExports.useState(
    reactExports.useContext(HydrationContext)
  );
  let onHydrate = reactExports.useCallback(() => setIsHydrated(true), []);
  return reactExports.createElement(
    HydrationContext.Provider,
    {
      value: isHydrated
    },
    isHydrated ? null : reactExports.createElement(HydrationCheck, {
      onHydrate
    }),
    children
  );
};
let HydrationCheck = ({ onHydrate }) => {
  reactExports.useEffect(() => void onHydrate(), [onHydrate]);
  return null;
};
let isBrowser = "undefined" != typeof document;
let supportsDSD = isBrowser && "shadowRootMode" in HTMLTemplateElement.prototype;
let supportsAdoptedStylesheets = isBrowser && "adoptedStyleSheets" in Document.prototype;
const ShadowRoot$1 = ({ children, css: css2, flush = true }) => {
  let isHydrating = "hydrating" === useHydration();
  if (!isBrowser)
    return reactExports.createElement(
      "template",
      {
        shadowrootmode: "open"
      },
      css2 && reactExports.createElement("style", null, css2),
      children
    );
  if (supportsDSD && isHydrating) return null;
  return reactExports.createElement(
    ClientShadowRoot,
    {
      css: css2,
      flush
    },
    children
  );
};
let ClientShadowRoot = ({ children, css: css2, flush = true }) => {
  let templateRef = reactExports.useRef(null);
  let shadowRoot = useShadowRoot(templateRef, {
    css: css2,
    flush
  });
  let fallbackCss = !supportsAdoptedStylesheets && css2 ? reactExports.createElement("style", null, css2) : null;
  return shadowRoot ? reactDomExports.createPortal(
    reactExports.createElement(reactExports.Fragment, null, fallbackCss, children),
    shadowRoot
  ) : reactExports.createElement("template", {
    ref: templateRef
  });
};
function useShadowRoot(templateRef, { css: css2 = "", flush = true }) {
  let [shadowRoot, setShadowRoot] = reactExports.useState(null);
  let styleSheet = reactExports.useRef(void 0);
  let latestCss = useLatestRef$2(css2);
  let latestShadowRoot = useLatestRef$2(shadowRoot);
  let createStyleSheet = reactExports.useCallback(
    (shadow) => {
      if (shadow && supportsAdoptedStylesheets) {
        let currentWindow = shadow.ownerDocument.defaultView || globalThis;
        if (styleSheet.current instanceof currentWindow.CSSStyleSheet) return;
        styleSheet.current = new currentWindow.CSSStyleSheet();
        shadow.adoptedStyleSheets.push(styleSheet.current);
        if (latestCss.current)
          styleSheet.current.replaceSync(latestCss.current);
      }
    },
    [latestCss]
  );
  useIsomorphicLayoutEffect(() => {
    var _a;
    let parent = (_a = templateRef.current) == null ? void 0 : _a.parentElement;
    if (!parent) return;
    let setupOrReuseShadowRoot = () => {
      if (parent.shadowRoot && null === latestShadowRoot.current)
        parent.shadowRoot.replaceChildren();
      let shadow = parent.shadowRoot || parent.attachShadow({
        mode: "open"
      });
      createStyleSheet(shadow);
      if (flush) reactDomExports.flushSync(() => setShadowRoot(shadow));
      else setShadowRoot(shadow);
    };
    if (flush) queueMicrotask(() => setupOrReuseShadowRoot());
    else setupOrReuseShadowRoot();
    return () => void setShadowRoot(null);
  }, [templateRef, createStyleSheet, latestShadowRoot, flush]);
  useIsomorphicLayoutEffect(() => {
    var _a;
    if (css2 && supportsAdoptedStylesheets) (_a = styleSheet.current) == null ? void 0 : _a.replaceSync(css2);
  }, [css2]);
  reactExports.useEffect(() => {
    let listener = () => createStyleSheet(latestShadowRoot.current);
    window.addEventListener("appui:reparent", listener);
    return () => {
      window.removeEventListener("appui:reparent", listener);
    };
  }, [createStyleSheet, latestShadowRoot]);
  return shadowRoot;
}
const ButtonBase = reactExports.forwardRef((props, forwardedRef) => {
  let {
    as: asProp = "button",
    disabled: disabledProp,
    htmlDisabled,
    type: typeProp = "button" === asProp ? "button" : void 0,
    ...rest
  } = props;
  let isClient = useIsClient();
  let ariaDisabled = disabledProp && !htmlDisabled && isClient && "button" === asProp;
  let handleIfEnabled = (handler) => (e) => {
    if (disabledProp) return;
    handler == null ? void 0 : handler(e);
  };
  let type = "button" === asProp && disabledProp ? "button" : typeProp;
  return reactExports.createElement(Box, {
    as: asProp,
    type,
    ref: forwardedRef,
    "aria-disabled": ariaDisabled ? "true" : void 0,
    "data-iui-disabled": disabledProp ? "true" : void 0,
    disabled: htmlDisabled ?? (!isClient && disabledProp) ? true : void 0,
    ...rest,
    className: cx("iui-button-base", props.className),
    onClick: handleIfEnabled(props.onClick),
    onPointerDown: handleIfEnabled(props.onPointerDown),
    onPointerUp: handleIfEnabled(props.onPointerUp)
  });
});
const Svg = polymorphic.svg("", {
  viewBox: "0 0 16 16",
  width: 16,
  height: 16
});
const SvgInfoCircular = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm1.2 3.2a.923.923 0 0 1 .997.843l.003.057a1.31 1.31 0 0 1-1.3 1.2.945.945 0 0 1-1-1 1.228 1.228 0 0 1 1.3-1.1zm-2 9.6c-.5 0-.9-.3-.5-1.7l.6-2.4c.1-.4.1-.5 0-.5-.2-.1-.9.2-1.3.5l-.2-.5a6.497 6.497 0 0 1 3.3-1.6c.5 0 .6.6.3 1.6l-.7 2.6c-.1.5-.1.6.1.6a2.003 2.003 0 0 0 1.1-.6l.3.4a5.769 5.769 0 0 1-3 1.6z"
  })
);
const SvgStatusError = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "M9 12H7v-2h2v2Zm0-3H7V4h2v5Zm2.314-9H4.686L0 4.686v6.628L4.686 16h6.628L16 11.314V4.686L11.314 0Z"
  })
);
const SvgStatusSuccess = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "m8 0a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm-1.35 12-3.65-3.41 1.4-1.3 2.36 2.2 4.83-4.49 1.41 1.29z"
  })
);
const SvgStatusWarning = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "m15.86807 13.26721-6.77-11.62a1.15 1.15 0 0 0 -1.1-.67 1.17 1.17 0 0 0 -1.1.69l-6.77 11.59a1.2 1.2 0 0 0 1.1 1.72h13.45a1.19 1.19 0 0 0 1.19-1.71zm-6.87-.29h-2v-2h2zm0-3h-2v-5h2z"
  })
);
const StatusIconMap = {
  negative: (args) => reactExports.createElement(SvgStatusError, {
    "aria-hidden": true,
    ...args
  }),
  positive: (args) => reactExports.createElement(SvgStatusSuccess, {
    "aria-hidden": true,
    ...args
  }),
  warning: (args) => reactExports.createElement(SvgStatusWarning, {
    "aria-hidden": true,
    ...args
  }),
  informational: (args) => reactExports.createElement(SvgInfoCircular, {
    "aria-hidden": true,
    ...args
  })
};
const SvgCloseSmall = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "m12.5 2-4.5 4.5-4.5-4.5-1.5 1.5 4.5 4.5-4.5 4.5 1.5 1.5 4.5-4.5 4.5 4.5 1.5-1.5-4.5-4.5 4.5-4.5z"
  })
);
export {
  useFloatingParentNodeId as A,
  Box as B,
  usePopover as C,
  useInteractions as D,
  useListNavigation as E,
  cloneElementWithRef as F,
  mergeRefs as G,
  FloatingNode as H,
  IconButton as I,
  FloatingTree as J,
  FloatingDelayGroup as K,
  defaultTooltipDelay as L,
  SvgCloseSmall as M,
  PopoverInitialFocusContext as N,
  OverflowContainer as O,
  Popover as P,
  CompositeItem as Q,
  Composite as R,
  Svg as S,
  ThemeProvider as T,
  ButtonGroup as U,
  VisuallyHidden as V,
  useToaster as W,
  useSafeContext as a,
  useIsomorphicLayoutEffect as b,
  cx as c,
  useLatestRef$2 as d,
  useMergedRefs as e,
  ButtonBase as f,
  useIsClient as g,
  useId$1 as h,
  Tooltip as i,
  useSyncExternalStore as j,
  getTranslateValuesFromElement as k,
  getBoundedValue as l,
  mergeEventHandlers as m,
  ShadowRoot$1 as n,
  PopoverOpenContext as o,
  polymorphic as p,
  useResizeObserver as q,
  getWindow$1 as r,
  Portal as s,
  PortalContainerContext as t,
  useControlledState as u,
  u as v,
  useGlobals as w,
  StatusIconMap as x,
  useFloatingTree as y,
  useFloatingNodeId as z
};
