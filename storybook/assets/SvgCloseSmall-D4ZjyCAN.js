const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./styles-stOW5RFO.css"])))=>i.map(i=>d[i]);
import { a as __toESM, n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-htSClZ5J.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-BeSU7fTM.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { t as require_react_dom } from "./react-dom-COAM6TrF.js";
//#region ../../node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js
var require_classnames = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
	*/
	(function() {
		"use strict";
		var hasOwn = {}.hasOwnProperty;
		function classNames() {
			var classes = "";
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (arg) classes = appendClass(classes, parseValue(arg));
			}
			return classes;
		}
		function parseValue(arg) {
			if (typeof arg === "string" || typeof arg === "number") return arg;
			if (typeof arg !== "object") return "";
			if (Array.isArray(arg)) return classNames.apply(null, arg);
			if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) return arg.toString();
			var classes = "";
			for (var key in arg) if (hasOwn.call(arg, key) && arg[key]) classes = appendClass(classes, key);
			return classes;
		}
		function appendClass(value, newClass) {
			if (!newClass) return value;
			if (value) return value + " " + newClass;
			return value + newClass;
		}
		if (typeof module !== "undefined" && module.exports) {
			classNames.default = classNames;
			module.exports = classNames;
		} else if (typeof define === "function" && typeof define.amd === "object" && define.amd) define("classnames", [], function() {
			return classNames;
		});
		else window.classNames = classNames;
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/dom.js
var getWindow$1, mergeEventHandlers, getTranslateValuesFromElement, getTranslateValues;
function init_dom() {
	return (init_dom = __esmMin((() => {
		getWindow$1 = () => "undefined" == typeof window ? void 0 : window;
		mergeEventHandlers = (...callbacks) => (event) => {
			for (let cb of callbacks) {
				cb?.(event);
				if (event?.defaultPrevented) return;
			}
		};
		getTranslateValuesFromElement = (element) => {
			if (!element) return [];
			let transformValue = getComputedStyle(element).getPropertyValue("transform");
			return getTranslateValues(transformValue);
		};
		getTranslateValues = (transformValue) => {
			let matrix = new DOMMatrix(transformValue);
			return [matrix.m41, matrix.m42];
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/numbers.js
var getBoundedValue, getRandomValue;
function init_numbers() {
	return (init_numbers = __esmMin((() => {
		getBoundedValue = (val, min, max) => Math.min(max, Math.max(min, val));
		getRandomValue = (length = 21) => {
			let alphabet = "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
			let id = "";
			for (let i = 0; i < length; i++) id += alphabet[64 * Math.random() | 0];
			return id;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useMergedRefs.js
var import_react$40, mergeRefs, useMergedRefs;
function init_useMergedRefs() {
	return (init_useMergedRefs = __esmMin((() => {
		import_react$40 = /* @__PURE__ */ __toESM(require_react(), 1);
		mergeRefs = (...refs) => (instance) => {
			refs.forEach((ref) => {
				if ("function" == typeof ref) ref(instance);
				else if (ref) ref.current = instance;
			});
		};
		useMergedRefs = (...refs) => import_react$40.useCallback(mergeRefs(...refs), [...refs]);
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useResizeObserver.js
var import_react$39, useResizeObserver;
function init_useResizeObserver() {
	return (init_useResizeObserver = __esmMin((() => {
		import_react$39 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_dom();
		useResizeObserver = (onResize) => {
			let resizeObserver = import_react$39.useRef(void 0);
			return [import_react$39.useCallback((element) => {
				if (!getWindow$1()?.ResizeObserver) return;
				resizeObserver.current?.disconnect?.();
				if (element) {
					resizeObserver.current = new ResizeObserver((entries) => {
						window.requestAnimationFrame(() => {
							if (!Array.isArray(entries) || !entries.length) return;
							let [{ contentRect }] = entries;
							return onResize(contentRect);
						});
					});
					resizeObserver.current?.observe?.(element);
				}
			}, [onResize]), resizeObserver.current];
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ThemeProvider/ThemeContext.js
var import_react$38, ThemeContext;
function init_ThemeContext() {
	return (init_ThemeContext = __esmMin((() => {
		import_react$38 = /* @__PURE__ */ __toESM(require_react(), 1);
		ThemeContext = import_react$38.createContext(void 0);
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/dev.js
var isJest, isCypress, isMocha, isVitest, isUnitTest;
function init_dev() {
	return (init_dev = __esmMin((() => {
		isJest = "undefined" != typeof jest;
		isCypress = void 0 !== globalThis.Cypress;
		isMocha = void 0 !== globalThis.beforeEach && "function(name,fn){suites[0].beforeEach(name,fn);}" === `${globalThis.beforeEach}`.replace(/\s/g, "") && !isCypress;
		isVitest = void 0 !== globalThis.__vitest_index__;
		isUnitTest = isJest || isVitest || isMocha;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useGlobals.js
var import_react$37, useGlobals, useThemeProviderWarning, useRootFontSizeWarning;
function init_useGlobals() {
	return (init_useGlobals = __esmMin((() => {
		import_react$37 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_ThemeContext();
		useGlobals = () => {
			let themeContext = import_react$37.useContext(ThemeContext);
			useThemeProviderWarning(themeContext);
			useRootFontSizeWarning();
			return themeContext;
		};
		useThemeProviderWarning = (themeContext) => {
			import_react$37.useEffect(() => {}, [themeContext]);
		};
		useRootFontSizeWarning = () => {
			import_react$37.useEffect(() => {}, []);
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useSyncExternalStore.js
function useSyncExternalStoreShim(subscribe, getSnapshot) {
	let value = getSnapshot();
	let [{ instance }, forceUpdate] = import_react$36.useState({ instance: {
		value,
		getSnapshot
	} });
	import_react$36.useLayoutEffect(() => {
		instance.value = value;
		instance.getSnapshot = getSnapshot;
		if (!Object.is(value, getSnapshot())) forceUpdate({ instance });
	}, [
		subscribe,
		value,
		getSnapshot
	]);
	import_react$36.useEffect(() => {
		let synchronize = () => {
			if (!Object.is(instance.value, instance.getSnapshot())) forceUpdate({ instance });
		};
		synchronize();
		return subscribe(synchronize);
	}, [subscribe]);
	return value;
}
var import_react$36, _React$1, useSyncExternalStore;
function init_useSyncExternalStore() {
	return (init_useSyncExternalStore = __esmMin((() => {
		import_react$36 = /* @__PURE__ */ __toESM(require_react(), 1);
		_React$1 = import_react$36;
		useSyncExternalStore = _React$1.useSyncExternalStore || useSyncExternalStoreShim;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useMediaQuery.js
var import_react$35, useMediaQuery;
function init_useMediaQuery() {
	return (init_useMediaQuery = __esmMin((() => {
		import_react$35 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_useSyncExternalStore();
		useMediaQuery = (queryString) => {
			let getSnapshot = import_react$35.useCallback(() => "undefined" != typeof window ? window.matchMedia?.(queryString).matches : void 0, [queryString]);
			let subscribe = import_react$35.useCallback((onChange) => {
				let mediaQueryList = window.matchMedia?.(queryString);
				mediaQueryList?.addEventListener?.("change", onChange);
				return () => mediaQueryList?.removeEventListener?.("change", onChange);
			}, [queryString]);
			return useSyncExternalStore(subscribe, getSnapshot, () => void 0);
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useSafeContext.js
var import_react$34, useSafeContext;
function init_useSafeContext() {
	return (init_useSafeContext = __esmMin((() => {
		import_react$34 = /* @__PURE__ */ __toESM(require_react(), 1);
		useSafeContext = (context) => {
			let value = import_react$34.useContext(context);
			if (!value) throw new Error(`${context.displayName || "Context"} is undefined`);
			return value;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useLatestRef.js
var import_react$33, useLatestRef$2;
function init_useLatestRef() {
	return (init_useLatestRef = __esmMin((() => {
		import_react$33 = /* @__PURE__ */ __toESM(require_react(), 1);
		useLatestRef$2 = (value) => {
			let valueRef = import_react$33.useRef(value);
			import_react$33.useEffect(() => {
				valueRef.current = value;
			}, [value]);
			return valueRef;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useIsomorphicLayoutEffect.js
var import_react$32, useIsomorphicLayoutEffect;
function init_useIsomorphicLayoutEffect() {
	return (init_useIsomorphicLayoutEffect = __esmMin((() => {
		import_react$32 = /* @__PURE__ */ __toESM(require_react(), 1);
		useIsomorphicLayoutEffect = "undefined" != typeof window ? import_react$32.useLayoutEffect : import_react$32.useEffect;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useIsClient.js
var import_react$31, useIsClient;
function init_useIsClient() {
	return (init_useIsClient = __esmMin((() => {
		import_react$31 = /* @__PURE__ */ __toESM(require_react(), 1);
		useIsClient = () => {
			let [isClient, setIsClient] = import_react$31.useState(false);
			import_react$31.useEffect(() => {
				setIsClient(true);
			}, []);
			return isClient;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useId.js
var import_react$30, useId$1, useUniqueValue;
function init_useId() {
	return (init_useId = __esmMin((() => {
		import_react$30 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_numbers();
		useId$1 = () => {
			let uniqueValue = useUniqueValue();
			return import_react$30.useMemo(() => `iui-${uniqueValue}`, [uniqueValue]);
		};
		useUniqueValue = import_react$30.useId ?? (() => import_react$30.useMemo(() => getRandomValue(10), []));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useControlledState.js
var import_react$29, useControlledState;
function init_useControlledState() {
	return (init_useControlledState = __esmMin((() => {
		import_react$29 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_useLatestRef();
		useControlledState = (initialValue, controlledState, setControlledState) => {
			let [uncontrolledState, setUncontrolledState] = import_react$29.useState(initialValue);
			let state = import_react$29.useMemo(() => void 0 !== controlledState ? controlledState : uncontrolledState, [controlledState, uncontrolledState]);
			let oldState = useLatestRef$2(state);
			return [state, import_react$29.useCallback((value) => {
				if (value === oldState.current) return;
				oldState.current = value;
				setUncontrolledState(value);
				setControlledState?.(value);
			}, [oldState, setControlledState])];
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useWarningLogger.js
var useWarningLogger;
function init_useWarningLogger() {
	return (init_useWarningLogger = __esmMin((() => {
		require_react();
		useWarningLogger = () => () => {};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useStableCallback.js
function useStableCallback(callback) {
	let latestCallback = useLatestRef$2(callback);
	return import_react$27.useCallback((...args) => latestCallback.current?.(...args), [latestCallback]);
}
var import_react$27;
function init_useStableCallback() {
	return (init_useStableCallback = __esmMin((() => {
		import_react$27 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_useLatestRef();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/styles.js
var t, u;
function init_styles() {
	return (init_styles = __esmMin((() => {
		t = "3.20.2";
		u = new Proxy({}, {
			get(e, i) {
				if (typeof i == "string" && i.startsWith("iui-")) return i.replace("iui-", `_iui${t.replace(/\./g, "")}-`);
			},
			has(e, i) {
				return typeof i == "string" && i.startsWith("iui-");
			}
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/polymorphic.js
var import_react$26, import_classnames$9, _base, polymorphic, getScopedClassName;
function init_polymorphic() {
	return (init_polymorphic = __esmMin((() => {
		import_react$26 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$9 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_useGlobals();
		init_styles();
		_base = (defaultElement) => (className, attrs) => {
			return import_react$26.forwardRef(({ as = defaultElement, ...props }, ref) => {
				props = {
					...attrs,
					...props,
					className: getScopedClassName((0, import_classnames$9.default)(className, attrs?.className, props.className))
				};
				let Element = as || "div";
				if ("button" === Element || "a" === Element || "input" === Element && "checkbox" === props.type) {
					var _props;
					(_props = props).tabIndex ?? (_props.tabIndex = 0);
				}
				useGlobals();
				return import_react$26.createElement(Element, {
					ref,
					...props
				});
			});
		};
		polymorphic = new Proxy({}, { get: (target, prop) => {
			if ("string" == typeof prop) return _base(prop);
			return Reflect.get(target, prop);
		} });
		getScopedClassName = (className = "") => className.split(" ").map((c) => c in u ? u[c] : c).join(" ") || null;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/import.js
var importCss;
function init_import() {
	return (init_import = __esmMin((() => {
		importCss = async (url) => {
			try {
				return await new Function(`return import("${url}", { with: { type: "css" } })`)();
			} catch {
				try {
					return await new Function(`return import("${url}", { assert: { type: "css" } })`)();
				} catch {
					return await fetch(url).then((res) => res.text()).then((cssText) => {
						let stylesheet = new CSSStyleSheet();
						stylesheet.replaceSync(cssText);
						return { default: stylesheet };
					});
				}
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/react.js
var import_react$25, _React, isReact17or18, cloneElementWithRef;
function init_react() {
	return (init_react = __esmMin((() => {
		import_react$25 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_useMergedRefs();
		_React = import_react$25;
		isReact17or18 = (() => {
			let version = _React.version?.split(".")?.[0];
			return ["17", "18"].includes(version);
		})();
		cloneElementWithRef = (children, getProps) => {
			if (!children) return null;
			if (!import_react$25.isValidElement(children)) return children;
			let childrenRef = isReact17or18 ? children?.ref : children.props?.ref;
			let props = getProps(children);
			let ref = mergeRefs(...[childrenRef, "ref" in props ? props.ref : null].filter(Boolean));
			return import_react$25.cloneElement(children, {
				...props,
				ref
			});
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/Box.js
var Box;
function init_Box() {
	return (init_Box = __esmMin((() => {
		init_polymorphic();
		Box = polymorphic.div("");
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
	return typeof window !== "undefined";
}
function getNodeName(node) {
	if (isNode(node)) return (node.nodeName || "").toLowerCase();
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
	if (!hasWindow()) return false;
	return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
	if (!hasWindow()) return false;
	return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
	if (!hasWindow()) return false;
	return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
	if (!hasWindow() || typeof ShadowRoot === "undefined") return false;
	return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
	const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element);
	return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
	return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
	try {
		if (element.matches(":popover-open")) return true;
	} catch (_e) {}
	try {
		return element.matches(":modal");
	} catch (_e) {
		return false;
	}
}
function isContainingBlock(elementOrCss) {
	const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
	return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
	let currentNode = getParentNode(element);
	while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
		if (isContainingBlock(currentNode)) return currentNode;
		else if (isTopLayer(currentNode)) return null;
		currentNode = getParentNode(currentNode);
	}
	return null;
}
function isWebKit() {
	if (isWebKitValue == null) isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
	return isWebKitValue;
}
function isLastTraversableNode(node) {
	return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
	return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
	if (isElement(element)) return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
	return {
		scrollLeft: element.scrollX,
		scrollTop: element.scrollY
	};
}
function getParentNode(node) {
	if (getNodeName(node) === "html") return node;
	const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
	return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
	const parentNode = getParentNode(node);
	if (isLastTraversableNode(parentNode)) return node.ownerDocument ? node.ownerDocument.body : node.body;
	if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) return parentNode;
	return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
	var _node$ownerDocument2;
	if (list === void 0) list = [];
	if (traverseIframes === void 0) traverseIframes = true;
	const scrollableAncestor = getNearestOverflowAncestor(node);
	const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
	const win = getWindow(scrollableAncestor);
	if (isBody) {
		const frameElement = getFrameElement(win);
		return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
	} else return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
	return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
var willChangeRe, containRe, isNotNone, isWebKitValue;
function init_floating_ui_utils_dom() {
	return (init_floating_ui_utils_dom = __esmMin((() => {
		willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
		containRe = /paint|layout|strict|content/;
		isNotNone = (value) => !!value && value !== "none";
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
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
	const firstChar = placement[0];
	return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
	return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
	if (rtl === void 0) rtl = false;
	const alignment = getAlignment(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const length = getAxisLength(alignmentAxis);
	let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
	if (rects.reference[length] > rects.floating[length]) mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
	return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
	const oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeAlignmentPlacement(placement),
		oppositePlacement,
		getOppositeAlignmentPlacement(oppositePlacement)
	];
}
function getOppositeAlignmentPlacement(placement) {
	return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
function getSideList(side, isStart, rtl) {
	switch (side) {
		case "top":
		case "bottom":
			if (rtl) return isStart ? rlPlacement : lrPlacement;
			return isStart ? lrPlacement : rlPlacement;
		case "left":
		case "right": return isStart ? tbPlacement : btPlacement;
		default: return [];
	}
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
	const alignment = getAlignment(placement);
	let list = getSideList(getSide(placement), direction === "start", rtl);
	if (alignment) {
		list = list.map((side) => side + "-" + alignment);
		if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement));
	}
	return list;
}
function getOppositePlacement(placement) {
	const side = getSide(placement);
	return oppositeSideMap[side] + placement.slice(side.length);
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
	const { x, y, width, height } = rect;
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
var sides, alignments, placements, min, max, round, floor, createCoords, oppositeSideMap, lrPlacement, rlPlacement, tbPlacement, btPlacement;
function init_floating_ui_utils() {
	return (init_floating_ui_utils = __esmMin((() => {
		sides = [
			"top",
			"right",
			"bottom",
			"left"
		];
		alignments = ["start", "end"];
		placements = /*#__PURE__*/ sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
		min = Math.min;
		max = Math.max;
		round = Math.round;
		floor = Math.floor;
		createCoords = (v) => ({
			x: v,
			y: v
		});
		oppositeSideMap = {
			left: "right",
			right: "left",
			bottom: "top",
			top: "bottom"
		};
		lrPlacement = ["left", "right"];
		rlPlacement = ["right", "left"];
		tbPlacement = ["top", "bottom"];
		btPlacement = ["bottom", "top"];
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/tabbable@6.4.0/node_modules/tabbable/dist/index.esm.js
var candidateSelectors, candidateSelector, NoElement, matches, getRootNode, _isInert, isContentEditable, getCandidates, _getCandidatesIteratively, hasTabIndex, getTabIndex, getSortOrderTabIndex, sortOrderedTabbables, isInput, isHiddenInput, isDetailsWithSummary, getCheckedRadio, isTabbableRadio, isRadio, isNonTabbableRadio, isNodeAttached, isZeroArea, isHidden, isDisabledFromFieldset, isNodeMatchingSelectorFocusable, isNodeMatchingSelectorTabbable, isShadowRootTabbable, _sortByOrder, tabbable, focusable, isTabbable;
function init_index_esm() {
	return (init_index_esm = __esmMin((() => {
		candidateSelectors = [
			"input:not([inert]):not([inert] *)",
			"select:not([inert]):not([inert] *)",
			"textarea:not([inert]):not([inert] *)",
			"a[href]:not([inert]):not([inert] *)",
			"button:not([inert]):not([inert] *)",
			"[tabindex]:not(slot):not([inert]):not([inert] *)",
			"audio[controls]:not([inert]):not([inert] *)",
			"video[controls]:not([inert]):not([inert] *)",
			"[contenteditable]:not([contenteditable=\"false\"]):not([inert]):not([inert] *)",
			"details>summary:first-of-type:not([inert]):not([inert] *)",
			"details:not([inert]):not([inert] *)"
		];
		candidateSelector = /* #__PURE__ */ candidateSelectors.join(",");
		NoElement = typeof Element === "undefined";
		matches = NoElement ? function() {
			/*!
			* tabbable 6.4.0
			* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
			*/
		} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
		getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
			var _element$getRootNode;
			return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
		} : function(element) {
			return element === null || element === void 0 ? void 0 : element.ownerDocument;
		};
		_isInert = function isInert(node, lookUp) {
			var _node$getAttribute;
			if (lookUp === void 0) lookUp = true;
			var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
			return inertAtt === "" || inertAtt === "true" || lookUp && node && (typeof node.closest === "function" ? node.closest("[inert]") : _isInert(node.parentNode));
		};
		isContentEditable = function isContentEditable(node) {
			var _node$getAttribute2;
			var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
			return attValue === "" || attValue === "true";
		};
		getCandidates = function getCandidates(el, includeContainer, filter) {
			if (_isInert(el)) return [];
			var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
			if (includeContainer && matches.call(el, candidateSelector)) candidates.unshift(el);
			candidates = candidates.filter(filter);
			return candidates;
		};
		_getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
			var candidates = [];
			var elementsToCheck = Array.from(elements);
			while (elementsToCheck.length) {
				var element = elementsToCheck.shift();
				if (_isInert(element, false)) continue;
				if (element.tagName === "SLOT") {
					var assigned = element.assignedElements();
					var nestedCandidates = _getCandidatesIteratively(assigned.length ? assigned : element.children, true, options);
					if (options.flatten) candidates.push.apply(candidates, nestedCandidates);
					else candidates.push({
						scopeParent: element,
						candidates: nestedCandidates
					});
				} else {
					if (matches.call(element, candidateSelector) && options.filter(element) && (includeContainer || !elements.includes(element))) candidates.push(element);
					var shadowRoot = element.shadowRoot || typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
					var validShadowRoot = !_isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
					if (shadowRoot && validShadowRoot) {
						var _nestedCandidates = _getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);
						if (options.flatten) candidates.push.apply(candidates, _nestedCandidates);
						else candidates.push({
							scopeParent: element,
							candidates: _nestedCandidates
						});
					} else elementsToCheck.unshift.apply(elementsToCheck, element.children);
				}
			}
			return candidates;
		};
		hasTabIndex = function hasTabIndex(node) {
			return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
		};
		getTabIndex = function getTabIndex(node) {
			if (!node) throw new Error("No node provided");
			if (node.tabIndex < 0) {
				if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) return 0;
			}
			return node.tabIndex;
		};
		getSortOrderTabIndex = function getSortOrderTabIndex(node, isScope) {
			var tabIndex = getTabIndex(node);
			if (tabIndex < 0 && isScope && !hasTabIndex(node)) return 0;
			return tabIndex;
		};
		sortOrderedTabbables = function sortOrderedTabbables(a, b) {
			return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
		};
		isInput = function isInput(node) {
			return node.tagName === "INPUT";
		};
		isHiddenInput = function isHiddenInput(node) {
			return isInput(node) && node.type === "hidden";
		};
		isDetailsWithSummary = function isDetailsWithSummary(node) {
			return node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
				return child.tagName === "SUMMARY";
			});
		};
		getCheckedRadio = function getCheckedRadio(nodes, form) {
			for (var i = 0; i < nodes.length; i++) if (nodes[i].checked && nodes[i].form === form) return nodes[i];
		};
		isTabbableRadio = function isTabbableRadio(node) {
			if (!node.name) return true;
			var radioScope = node.form || getRootNode(node);
			var queryRadios = function queryRadios(name) {
				return radioScope.querySelectorAll("input[type=\"radio\"][name=\"" + name + "\"]");
			};
			var radioSet;
			if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") radioSet = queryRadios(window.CSS.escape(node.name));
			else try {
				radioSet = queryRadios(node.name);
			} catch (err) {
				console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
				return false;
			}
			var checked = getCheckedRadio(radioSet, node.form);
			return !checked || checked === node;
		};
		isRadio = function isRadio(node) {
			return isInput(node) && node.type === "radio";
		};
		isNonTabbableRadio = function isNonTabbableRadio(node) {
			return isRadio(node) && !isTabbableRadio(node);
		};
		isNodeAttached = function isNodeAttached(node) {
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
		isZeroArea = function isZeroArea(node) {
			var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
			return width === 0 && height === 0;
		};
		isHidden = function isHidden(node, _ref) {
			var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
			if (displayCheck === "full-native") {
				if ("checkVisibility" in node) return !node.checkVisibility({
					checkOpacity: false,
					opacityProperty: false,
					contentVisibilityAuto: true,
					visibilityProperty: true,
					checkVisibilityCSS: true
				});
			}
			if (getComputedStyle(node).visibility === "hidden") return true;
			var nodeUnderDetails = matches.call(node, "details>summary:first-of-type") ? node.parentElement : node;
			if (matches.call(nodeUnderDetails, "details:not([open]) *")) return true;
			if (!displayCheck || displayCheck === "full" || displayCheck === "full-native" || displayCheck === "legacy-full") {
				if (typeof getShadowRoot === "function") {
					var originalNode = node;
					while (node) {
						var parentElement = node.parentElement;
						var rootNode = getRootNode(node);
						if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) return isZeroArea(node);
						else if (node.assignedSlot) node = node.assignedSlot;
						else if (!parentElement && rootNode !== node.ownerDocument) node = rootNode.host;
						else node = parentElement;
					}
					node = originalNode;
				}
				if (isNodeAttached(node)) return !node.getClientRects().length;
				if (displayCheck !== "legacy-full") return true;
			} else if (displayCheck === "non-zero-area") return isZeroArea(node);
			return false;
		};
		isDisabledFromFieldset = function isDisabledFromFieldset(node) {
			if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
				var parentNode = node.parentElement;
				while (parentNode) {
					if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
						for (var i = 0; i < parentNode.children.length; i++) {
							var child = parentNode.children.item(i);
							if (child.tagName === "LEGEND") return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
						}
						return true;
					}
					parentNode = parentNode.parentElement;
				}
			}
			return false;
		};
		isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
			if (node.disabled || isHiddenInput(node) || isHidden(node, options) || isDetailsWithSummary(node) || isDisabledFromFieldset(node)) return false;
			return true;
		};
		isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
			if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) return false;
			return true;
		};
		isShadowRootTabbable = function isShadowRootTabbable(shadowHostNode) {
			var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
			if (isNaN(tabIndex) || tabIndex >= 0) return true;
			return false;
		};
		_sortByOrder = function sortByOrder(candidates) {
			var regularTabbables = [];
			var orderedTabbables = [];
			candidates.forEach(function(item, i) {
				var isScope = !!item.scopeParent;
				var element = isScope ? item.scopeParent : item;
				var candidateTabindex = getSortOrderTabIndex(element, isScope);
				var elements = isScope ? _sortByOrder(item.candidates) : element;
				if (candidateTabindex === 0) isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
				else orderedTabbables.push({
					documentOrder: i,
					tabIndex: candidateTabindex,
					item,
					isScope,
					content: elements
				});
			});
			return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
				sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
				return acc;
			}, []).concat(regularTabbables);
		};
		tabbable = function tabbable(container, options) {
			options = options || {};
			var candidates;
			if (options.getShadowRoot) candidates = _getCandidatesIteratively([container], options.includeContainer, {
				filter: isNodeMatchingSelectorTabbable.bind(null, options),
				flatten: false,
				getShadowRoot: options.getShadowRoot,
				shadowRootFilter: isShadowRootTabbable
			});
			else candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
			return _sortByOrder(candidates);
		};
		focusable = function focusable(container, options) {
			options = options || {};
			var candidates;
			if (options.getShadowRoot) candidates = _getCandidatesIteratively([container], options.includeContainer, {
				filter: isNodeMatchingSelectorFocusable.bind(null, options),
				flatten: true,
				getShadowRoot: options.getShadowRoot
			});
			else candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
			return candidates;
		};
		isTabbable = function isTabbable(node, options) {
			options = options || {};
			if (!node) throw new Error("No node provided");
			if (matches.call(node, candidateSelector) === false) return false;
			return isNodeMatchingSelectorTabbable(options, node);
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+react@0.27.19_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/@floating-ui/react/dist/floating-ui.react.utils.mjs
function getPlatform() {
	const uaData = navigator.userAgentData;
	if (uaData != null && uaData.platform) return uaData.platform;
	return navigator.platform;
}
function getUserAgent() {
	const uaData = navigator.userAgentData;
	if (uaData && Array.isArray(uaData.brands)) return uaData.brands.map((_ref) => {
		let { brand, version } = _ref;
		return brand + "/" + version;
	}).join(" ");
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
function activeElement(doc) {
	let activeElement = doc.activeElement;
	while (((_activeElement = activeElement) == null || (_activeElement = _activeElement.shadowRoot) == null ? void 0 : _activeElement.activeElement) != null) {
		var _activeElement;
		activeElement = activeElement.shadowRoot.activeElement;
	}
	return activeElement;
}
function contains$1(parent, child) {
	if (!parent || !child) return false;
	const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();
	if (parent.contains(child)) return true;
	if (rootNode && isShadowRoot(rootNode)) {
		let next = child;
		while (next) {
			if (parent === next) return true;
			next = next.parentNode || next.host;
		}
	}
	return false;
}
function getTarget$1(event) {
	if ("composedPath" in event) return event.composedPath()[0];
	return event.target;
}
function isEventTargetWithin(event, node) {
	if (node == null) return false;
	if ("composedPath" in event) return event.composedPath().includes(node);
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
	if (!floatingElement) return null;
	return floatingElement.hasAttribute(FOCUSABLE_ATTRIBUTE$1) ? floatingElement : floatingElement.querySelector("[" + FOCUSABLE_ATTRIBUTE$1 + "]") || floatingElement;
}
function getNodeChildren$1(nodes, id, onlyOpenChildren) {
	if (onlyOpenChildren === void 0) onlyOpenChildren = true;
	return nodes.filter((node) => {
		var _node$context;
		return node.parentId === id && (!onlyOpenChildren || ((_node$context = node.context) == null ? void 0 : _node$context.open));
	}).flatMap((child) => [child, ...getNodeChildren$1(nodes, child.id, onlyOpenChildren)]);
}
function getDeepestNode(nodes, id) {
	let deepestNodeId;
	let maxDepth = -1;
	function findDeepest(nodeId, depth) {
		if (depth > maxDepth) {
			deepestNodeId = nodeId;
			maxDepth = depth;
		}
		getNodeChildren$1(nodes, nodeId).forEach((child) => {
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
		if (currentNode) allAncestors = allAncestors.concat(currentNode);
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
	if (event.mozInputSource === 0 && event.isTrusted) return true;
	if (isAndroid() && event.pointerType) return event.type === "click" && event.buttons === 1;
	return event.detail === 0 && !event.pointerType;
}
function isVirtualPointerEvent(event) {
	if (isJSDOM()) return false;
	return !isAndroid() && event.width === 0 && event.height === 0 || isAndroid() && event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "mouse" || event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "touch";
}
function isMouseLikePointerType(pointerType, strict) {
	const values = ["mouse", "pen"];
	if (!strict) values.push("", void 0);
	return values.includes(pointerType);
}
function useLatestRef$1(value) {
	const ref = import_react$23.useRef(value);
	index$1(() => {
		ref.current = value;
	});
	return ref;
}
function useEffectEvent(callback) {
	const ref = import_react$23.useRef(() => {});
	useSafeInsertionEffect(() => {
		ref.current = callback;
	});
	return import_react$23.useCallback(function() {
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		return ref.current == null ? void 0 : ref.current(...args);
	}, []);
}
function isDifferentGridRow(index, cols, prevRow) {
	return Math.floor(index / cols) !== prevRow;
}
function isIndexOutOfListBounds(listRef, index) {
	return index < 0 || index >= listRef.current.length;
}
function getMinListIndex(listRef, disabledIndices) {
	return findNonDisabledListIndex(listRef, { disabledIndices });
}
function getMaxListIndex(listRef, disabledIndices) {
	return findNonDisabledListIndex(listRef, {
		decrement: true,
		startingIndex: listRef.current.length,
		disabledIndices
	});
}
function findNonDisabledListIndex(listRef, _temp) {
	let { startingIndex = -1, decrement = false, disabledIndices, amount = 1 } = _temp === void 0 ? {} : _temp;
	let index = startingIndex;
	do
		index += decrement ? -amount : amount;
	while (index >= 0 && index <= listRef.current.length - 1 && isListIndexDisabled(listRef, index, disabledIndices));
	return index;
}
function getGridNavigatedIndex(listRef, _ref) {
	let { event, orientation, loop, rtl, cols, disabledIndices, minIndex, maxIndex, prevIndex, stopEvent: stop = false } = _ref;
	let nextIndex = prevIndex;
	if (event.key === ARROW_UP$1) {
		stop && stopEvent(event);
		if (prevIndex === -1) nextIndex = maxIndex;
		else {
			nextIndex = findNonDisabledListIndex(listRef, {
				startingIndex: nextIndex,
				amount: cols,
				decrement: true,
				disabledIndices
			});
			if (loop && (prevIndex - cols < minIndex || nextIndex < 0)) {
				const col = prevIndex % cols;
				const maxCol = maxIndex % cols;
				const offset = maxIndex - (maxCol - col);
				if (maxCol === col) nextIndex = maxIndex;
				else nextIndex = maxCol > col ? offset : offset - cols;
			}
		}
		if (isIndexOutOfListBounds(listRef, nextIndex)) nextIndex = prevIndex;
	}
	if (event.key === ARROW_DOWN$1) {
		stop && stopEvent(event);
		if (prevIndex === -1) nextIndex = minIndex;
		else {
			nextIndex = findNonDisabledListIndex(listRef, {
				startingIndex: prevIndex,
				amount: cols,
				disabledIndices
			});
			if (loop && prevIndex + cols > maxIndex) nextIndex = findNonDisabledListIndex(listRef, {
				startingIndex: prevIndex % cols - cols,
				amount: cols,
				disabledIndices
			});
		}
		if (isIndexOutOfListBounds(listRef, nextIndex)) nextIndex = prevIndex;
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
				if (loop && isDifferentGridRow(nextIndex, cols, prevRow)) nextIndex = findNonDisabledListIndex(listRef, {
					startingIndex: prevIndex - prevIndex % cols - 1,
					disabledIndices
				});
			} else if (loop) nextIndex = findNonDisabledListIndex(listRef, {
				startingIndex: prevIndex - prevIndex % cols - 1,
				disabledIndices
			});
			if (isDifferentGridRow(nextIndex, cols, prevRow)) nextIndex = prevIndex;
		}
		if (event.key === (rtl ? ARROW_RIGHT$1 : ARROW_LEFT$1)) {
			stop && stopEvent(event);
			if (prevIndex % cols !== 0) {
				nextIndex = findNonDisabledListIndex(listRef, {
					startingIndex: prevIndex,
					decrement: true,
					disabledIndices
				});
				if (loop && isDifferentGridRow(nextIndex, cols, prevRow)) nextIndex = findNonDisabledListIndex(listRef, {
					startingIndex: prevIndex + (cols - prevIndex % cols),
					decrement: true,
					disabledIndices
				});
			} else if (loop) nextIndex = findNonDisabledListIndex(listRef, {
				startingIndex: prevIndex + (cols - prevIndex % cols),
				decrement: true,
				disabledIndices
			});
			if (isDifferentGridRow(nextIndex, cols, prevRow)) nextIndex = prevIndex;
		}
		const lastRow = floor(maxIndex / cols) === prevRow;
		if (isIndexOutOfListBounds(listRef, nextIndex)) {
			if (loop && lastRow) nextIndex = event.key === (rtl ? ARROW_RIGHT$1 : ARROW_LEFT$1) ? maxIndex : findNonDisabledListIndex(listRef, {
				startingIndex: prevIndex - prevIndex % cols - 1,
				disabledIndices
			});
			else nextIndex = prevIndex;
		}
	}
	return nextIndex;
}
/** For each cell index, gets the item index that occupies that cell */
function createGridCellMap(sizes, cols, dense) {
	const cellMap = [];
	let startIndex = 0;
	sizes.forEach((_ref2, index) => {
		let { width, height } = _ref2;
		if (width > cols) {}
		let itemPlaced = false;
		if (dense) startIndex = 0;
		while (!itemPlaced) {
			const targetCells = [];
			for (let i = 0; i < width; i++) for (let j = 0; j < height; j++) targetCells.push(startIndex + i + j * cols);
			if (startIndex % cols + width <= cols && targetCells.every((cell) => cellMap[cell] == null)) {
				targetCells.forEach((cell) => {
					cellMap[cell] = index;
				});
				itemPlaced = true;
			} else startIndex++;
		}
	});
	return [...cellMap];
}
/** Gets cell index of an item's corner or -1 when index is -1. */
function getGridCellIndexOfCorner(index, sizes, cellMap, cols, corner) {
	if (index === -1) return -1;
	const firstCellIndex = cellMap.indexOf(index);
	const sizeItem = sizes[index];
	switch (corner) {
		case "tl": return firstCellIndex;
		case "tr":
			if (!sizeItem) return firstCellIndex;
			return firstCellIndex + sizeItem.width - 1;
		case "bl":
			if (!sizeItem) return firstCellIndex;
			return firstCellIndex + (sizeItem.height - 1) * cols;
		case "br": return cellMap.lastIndexOf(index);
	}
}
/** Gets all cell indices that correspond to the specified indices */
function getGridCellIndices(indices, cellMap) {
	return cellMap.flatMap((index, cellIndex) => indices.includes(index) ? [cellIndex] : []);
}
function isListIndexDisabled(listRef, index, disabledIndices) {
	if (typeof disabledIndices === "function") return disabledIndices(index);
	else if (disabledIndices) return disabledIndices.includes(index);
	const element = listRef.current[index];
	return element == null || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";
}
function getTabbableIn(container, dir) {
	const list = tabbable(container, getTabbableOptions());
	const len = list.length;
	if (len === 0) return;
	const active = activeElement(getDocument$1(container));
	const index = list.indexOf(active);
	return list[index === -1 ? dir === 1 ? 0 : len - 1 : index + dir];
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
	tabbable(container, getTabbableOptions()).forEach((element) => {
		element.dataset.tabindex = element.getAttribute("tabindex") || "";
		element.setAttribute("tabindex", "-1");
	});
}
function enableFocusInside(container) {
	container.querySelectorAll("[data-tabindex]").forEach((element) => {
		const tabindex = element.dataset.tabindex;
		delete element.dataset.tabindex;
		if (tabindex) element.setAttribute("tabindex", tabindex);
		else element.removeAttribute("tabindex");
	});
}
var import_react$23, import_react$24, FOCUSABLE_ATTRIBUTE$1, TYPEABLE_SELECTOR, ARROW_LEFT$1, ARROW_RIGHT$1, ARROW_UP$1, ARROW_DOWN$1, index$1, SafeReact$1, useSafeInsertionEffect, getTabbableOptions;
function init_floating_ui_react_utils() {
	return (init_floating_ui_react_utils = __esmMin((() => {
		init_floating_ui_utils_dom();
		import_react$23 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react$24 = require_react();
		init_floating_ui_utils();
		init_index_esm();
		FOCUSABLE_ATTRIBUTE$1 = "data-floating-ui-focusable";
		TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
		ARROW_LEFT$1 = "ArrowLeft";
		ARROW_RIGHT$1 = "ArrowRight";
		ARROW_UP$1 = "ArrowUp";
		ARROW_DOWN$1 = "ArrowDown";
		index$1 = typeof document !== "undefined" ? import_react$24.useLayoutEffect : function noop() {};
		SafeReact$1 = { ...import_react$23 };
		useSafeInsertionEffect = SafeReact$1.useInsertionEffect || ((fn) => fn());
		getTabbableOptions = () => ({
			getShadowRoot: true,
			displayCheck: typeof ResizeObserver === "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+core@1.7.5/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
	let { reference, floating } = _ref;
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
		default: coords = {
			x: reference.x,
			y: reference.y
		};
	}
	switch (getAlignment(placement)) {
		case "start":
			coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
			break;
		case "end": coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
	}
	return coords;
}
/**
* Resolves with an object of overflow side offsets that determine how much the
* element is overflowing a given clipping boundary on each side.
* - positive = overflowing the boundary by that number of pixels
* - negative = how many pixels left before it will overflow
* - 0 = lies flush with the boundary
* @see https://floating-ui.com/docs/detectOverflow
*/
async function detectOverflow(state, options) {
	var _await$platform$isEle;
	if (options === void 0) options = {};
	const { x, y, platform, rects, elements, strategy } = state;
	const { boundary = "clippingAncestors", rootBoundary = "viewport", elementContext = "floating", altBoundary = false, padding = 0 } = evaluate(options, state);
	const paddingObject = getPaddingObject(padding);
	const element = elements[altBoundary ? elementContext === "floating" ? "reference" : "floating" : elementContext];
	const clippingClientRect = rectToClientRect(await platform.getClippingRect({
		element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating)),
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
	const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
	const offsetScale = await (platform.isElement == null ? void 0 : platform.isElement(offsetParent)) ? await (platform.getScale == null ? void 0 : platform.getScale(offsetParent)) || {
		x: 1,
		y: 1
	} : {
		x: 1,
		y: 1
	};
	const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
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
	return (alignment ? [...allowedPlacements.filter((placement) => getAlignment(placement) === alignment), ...allowedPlacements.filter((placement) => getAlignment(placement) !== alignment)] : allowedPlacements.filter((placement) => getSide(placement) === placement)).filter((placement) => {
		if (alignment) return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
		return true;
	});
}
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
		if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) groups.push([rect]);
		else groups[groups.length - 1].push(rect);
		prevRect = rect;
	}
	return groups.map((rect) => rectToClientRect(getBoundingRect(rect)));
}
async function convertValueToCoords(state, options) {
	const { placement, platform, elements } = state;
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
	const side = getSide(placement);
	const alignment = getAlignment(placement);
	const isVertical = getSideAxis(placement) === "y";
	const mainAxisMulti = originSides.has(side) ? -1 : 1;
	const crossAxisMulti = rtl && isVertical ? -1 : 1;
	const rawValue = evaluate(options, state);
	let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === "number" ? {
		mainAxis: rawValue,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: rawValue.mainAxis || 0,
		crossAxis: rawValue.crossAxis || 0,
		alignmentAxis: rawValue.alignmentAxis
	};
	if (alignment && typeof alignmentAxis === "number") crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
	return isVertical ? {
		x: crossAxis * crossAxisMulti,
		y: mainAxis * mainAxisMulti
	} : {
		x: mainAxis * mainAxisMulti,
		y: crossAxis * crossAxisMulti
	};
}
var MAX_RESET_COUNT, computePosition$1, autoPlacement$2, flip$2, hide$2, inline$2, originSides, offset$2, shift$2, size$2;
function init_floating_ui_core() {
	return (init_floating_ui_core = __esmMin((() => {
		init_floating_ui_utils();
		MAX_RESET_COUNT = 50;
		computePosition$1 = async (reference, floating, config) => {
			const { placement = "bottom", strategy = "absolute", middleware = [], platform } = config;
			const platformWithDetectOverflow = platform.detectOverflow ? platform : {
				...platform,
				detectOverflow
			};
			const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
			let rects = await platform.getElementRects({
				reference,
				floating,
				strategy
			});
			let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
			let statefulPlacement = placement;
			let resetCount = 0;
			const middlewareData = {};
			for (let i = 0; i < middleware.length; i++) {
				const currentMiddleware = middleware[i];
				if (!currentMiddleware) continue;
				const { name, fn } = currentMiddleware;
				const { x: nextX, y: nextY, data, reset } = await fn({
					x,
					y,
					initialPlacement: placement,
					placement: statefulPlacement,
					strategy,
					middlewareData,
					rects,
					platform: platformWithDetectOverflow,
					elements: {
						reference,
						floating
					}
				});
				x = nextX != null ? nextX : x;
				y = nextY != null ? nextY : y;
				middlewareData[name] = {
					...middlewareData[name],
					...data
				};
				if (reset && resetCount < MAX_RESET_COUNT) {
					resetCount++;
					if (typeof reset === "object") {
						if (reset.placement) statefulPlacement = reset.placement;
						if (reset.rects) rects = reset.rects === true ? await platform.getElementRects({
							reference,
							floating,
							strategy
						}) : reset.rects;
						({x, y} = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
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
		autoPlacement$2 = function(options) {
			if (options === void 0) options = {};
			return {
				name: "autoPlacement",
				options,
				async fn(state) {
					var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
					const { rects, middlewareData, placement, platform, elements } = state;
					const { crossAxis = false, alignment, allowedPlacements = placements, autoAlignment = true, ...detectOverflowOptions } = evaluate(options, state);
					const placements$1 = alignment !== void 0 || allowedPlacements === placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
					const overflow = await platform.detectOverflow(state, detectOverflowOptions);
					const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
					const currentPlacement = placements$1[currentIndex];
					if (currentPlacement == null) return {};
					const alignmentSides = getAlignmentSides(currentPlacement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));
					if (placement !== currentPlacement) return { reset: { placement: placements$1[0] } };
					const currentOverflows = [
						overflow[getSide(currentPlacement)],
						overflow[alignmentSides[0]],
						overflow[alignmentSides[1]]
					];
					const allOverflows = [...((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || [], {
						placement: currentPlacement,
						overflows: currentOverflows
					}];
					const nextPlacement = placements$1[currentIndex + 1];
					if (nextPlacement) return {
						data: {
							index: currentIndex + 1,
							overflows: allOverflows
						},
						reset: { placement: nextPlacement }
					};
					const placementsSortedByMostSpace = allOverflows.map((d) => {
						const alignment = getAlignment(d.placement);
						return [
							d.placement,
							alignment && crossAxis ? d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0) : d.overflows[0],
							d.overflows
						];
					}).sort((a, b) => a[1] - b[1]);
					const resetPlacement = ((_placementsThatFitOnE = placementsSortedByMostSpace.filter((d) => d[2].slice(0, getAlignment(d[0]) ? 2 : 3).every((v) => v <= 0))[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
					if (resetPlacement !== placement) return {
						data: {
							index: currentIndex + 1,
							overflows: allOverflows
						},
						reset: { placement: resetPlacement }
					};
					return {};
				}
			};
		};
		flip$2 = function(options) {
			if (options === void 0) options = {};
			return {
				name: "flip",
				options,
				async fn(state) {
					var _middlewareData$arrow, _middlewareData$flip;
					const { placement, middlewareData, rects, initialPlacement, platform, elements } = state;
					const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = "bestFit", fallbackAxisSideDirection = "none", flipAlignment = true, ...detectOverflowOptions } = evaluate(options, state);
					if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
					const side = getSide(placement);
					const initialSideAxis = getSideAxis(initialPlacement);
					const isBasePlacement = getSide(initialPlacement) === initialPlacement;
					const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
					const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
					const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
					if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
					const placements = [initialPlacement, ...fallbackPlacements];
					const overflow = await platform.detectOverflow(state, detectOverflowOptions);
					const overflows = [];
					let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
					if (checkMainAxis) overflows.push(overflow[side]);
					if (checkCrossAxis) {
						const sides = getAlignmentSides(placement, rects, rtl);
						overflows.push(overflow[sides[0]], overflow[sides[1]]);
					}
					overflowsData = [...overflowsData, {
						placement,
						overflows
					}];
					if (!overflows.every((side) => side <= 0)) {
						var _middlewareData$flip2, _overflowsData$filter;
						const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
						const nextPlacement = placements[nextIndex];
						if (nextPlacement) {
							if (!(checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false) || overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) return {
								data: {
									index: nextIndex,
									overflows: overflowsData
								},
								reset: { placement: nextPlacement }
							};
						}
						let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
						if (!resetPlacement) switch (fallbackStrategy) {
							case "bestFit": {
								var _overflowsData$filter2;
								const placement = (_overflowsData$filter2 = overflowsData.filter((d) => {
									if (hasFallbackAxisSideDirection) {
										const currentSideAxis = getSideAxis(d.placement);
										return currentSideAxis === initialSideAxis || currentSideAxis === "y";
									}
									return true;
								}).map((d) => [d.placement, d.overflows.filter((overflow) => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
								if (placement) resetPlacement = placement;
								break;
							}
							case "initialPlacement": resetPlacement = initialPlacement;
						}
						if (placement !== resetPlacement) return { reset: { placement: resetPlacement } };
					}
					return {};
				}
			};
		};
		hide$2 = function(options) {
			if (options === void 0) options = {};
			return {
				name: "hide",
				options,
				async fn(state) {
					const { rects, platform } = state;
					const { strategy = "referenceHidden", ...detectOverflowOptions } = evaluate(options, state);
					switch (strategy) {
						case "referenceHidden": {
							const offsets = getSideOffsets(await platform.detectOverflow(state, {
								...detectOverflowOptions,
								elementContext: "reference"
							}), rects.reference);
							return { data: {
								referenceHiddenOffsets: offsets,
								referenceHidden: isAnySideFullyClipped(offsets)
							} };
						}
						case "escaped": {
							const offsets = getSideOffsets(await platform.detectOverflow(state, {
								...detectOverflowOptions,
								altBoundary: true
							}), rects.floating);
							return { data: {
								escapedOffsets: offsets,
								escaped: isAnySideFullyClipped(offsets)
							} };
						}
						default: return {};
					}
				}
			};
		};
		inline$2 = function(options) {
			if (options === void 0) options = {};
			return {
				name: "inline",
				options,
				async fn(state) {
					const { placement, elements, rects, platform, strategy } = state;
					const { padding = 2, x, y } = evaluate(options, state);
					const nativeClientRects = Array.from(await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference)) || []);
					const clientRects = getRectsByLine(nativeClientRects);
					const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
					const paddingObject = getPaddingObject(padding);
					function getBoundingClientRect() {
						if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) return clientRects.find((rect) => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
						if (clientRects.length >= 2) {
							if (getSideAxis(placement) === "y") {
								const firstRect = clientRects[0];
								const lastRect = clientRects[clientRects.length - 1];
								const isTop = getSide(placement) === "top";
								const top = firstRect.top;
								const bottom = lastRect.bottom;
								const left = isTop ? firstRect.left : lastRect.left;
								const right = isTop ? firstRect.right : lastRect.right;
								return {
									top,
									bottom,
									left,
									right,
									width: right - left,
									height: bottom - top,
									x: left,
									y: top
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
							return {
								top,
								bottom,
								left,
								right,
								width: right - left,
								height: bottom - top,
								x: left,
								y: top
							};
						}
						return fallback;
					}
					const resetRects = await platform.getElementRects({
						reference: { getBoundingClientRect },
						floating: elements.floating,
						strategy
					});
					if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) return { reset: { rects: resetRects } };
					return {};
				}
			};
		};
		originSides = /*#__PURE__*/ new Set(["left", "top"]);
		offset$2 = function(options) {
			if (options === void 0) options = 0;
			return {
				name: "offset",
				options,
				async fn(state) {
					var _middlewareData$offse, _middlewareData$arrow;
					const { x, y, placement, middlewareData } = state;
					const diffCoords = await convertValueToCoords(state, options);
					if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
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
		shift$2 = function(options) {
			if (options === void 0) options = {};
			return {
				name: "shift",
				options,
				async fn(state) {
					const { x, y, placement, platform } = state;
					const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = { fn: (_ref) => {
						let { x, y } = _ref;
						return {
							x,
							y
						};
					} }, ...detectOverflowOptions } = evaluate(options, state);
					const coords = {
						x,
						y
					};
					const overflow = await platform.detectOverflow(state, detectOverflowOptions);
					const crossAxis = getSideAxis(getSide(placement));
					const mainAxis = getOppositeAxis(crossAxis);
					let mainAxisCoord = coords[mainAxis];
					let crossAxisCoord = coords[crossAxis];
					if (checkMainAxis) {
						const minSide = mainAxis === "y" ? "top" : "left";
						const maxSide = mainAxis === "y" ? "bottom" : "right";
						const min = mainAxisCoord + overflow[minSide];
						const max = mainAxisCoord - overflow[maxSide];
						mainAxisCoord = clamp(min, mainAxisCoord, max);
					}
					if (checkCrossAxis) {
						const minSide = crossAxis === "y" ? "top" : "left";
						const maxSide = crossAxis === "y" ? "bottom" : "right";
						const min = crossAxisCoord + overflow[minSide];
						const max = crossAxisCoord - overflow[maxSide];
						crossAxisCoord = clamp(min, crossAxisCoord, max);
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
		size$2 = function(options) {
			if (options === void 0) options = {};
			return {
				name: "size",
				options,
				async fn(state) {
					var _state$middlewareData, _state$middlewareData2;
					const { placement, rects, platform, elements } = state;
					const { apply = () => {}, ...detectOverflowOptions } = evaluate(options, state);
					const overflow = await platform.detectOverflow(state, detectOverflowOptions);
					const side = getSide(placement);
					const alignment = getAlignment(placement);
					const isYAxis = getSideAxis(placement) === "y";
					const { width, height } = rects.floating;
					let heightSide;
					let widthSide;
					if (side === "top" || side === "bottom") {
						heightSide = side;
						widthSide = alignment === (await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
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
					if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) availableWidth = maximumClippingWidth;
					if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) availableHeight = maximumClippingHeight;
					if (noShift && !alignment) {
						const xMin = max(overflow.left, 0);
						const xMax = max(overflow.right, 0);
						const yMin = max(overflow.top, 0);
						const yMax = max(overflow.bottom, 0);
						if (isYAxis) availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
						else availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
					}
					await apply({
						...state,
						availableWidth,
						availableHeight
					});
					const nextDimensions = await platform.getDimensions(elements.floating);
					if (width !== nextDimensions.width || height !== nextDimensions.height) return { reset: { rects: true } };
					return {};
				}
			};
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+dom@1.7.6/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
	const css = getComputedStyle$1(element);
	let width = parseFloat(css.width) || 0;
	let height = parseFloat(css.height) || 0;
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
	if (!isHTMLElement(domElement)) return createCoords(1);
	const rect = domElement.getBoundingClientRect();
	const { width, height, $ } = getCssDimensions(domElement);
	let x = ($ ? round(rect.width) : rect.width) / width;
	let y = ($ ? round(rect.height) : rect.height) / height;
	if (!x || !Number.isFinite(x)) x = 1;
	if (!y || !Number.isFinite(y)) y = 1;
	return {
		x,
		y
	};
}
function getVisualOffsets(element) {
	const win = getWindow(element);
	if (!isWebKit() || !win.visualViewport) return noOffsets;
	return {
		x: win.visualViewport.offsetLeft,
		y: win.visualViewport.offsetTop
	};
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
	if (isFixed === void 0) isFixed = false;
	if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) return false;
	return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	const clientRect = element.getBoundingClientRect();
	const domElement = unwrapElement(element);
	let scale = createCoords(1);
	if (includeScale) {
		if (offsetParent) {
			if (isElement(offsetParent)) scale = getScale(offsetParent);
		} else scale = getScale(element);
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
			const css = getComputedStyle$1(currentIFrame);
			const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
			const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
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
	if (!rect) return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
	return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
	const htmlRect = documentElement.getBoundingClientRect();
	return {
		x: htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect),
		y: htmlRect.top + scroll.scrollTop
	};
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
	let { elements, rect, offsetParent, strategy } = _ref;
	const isFixed = strategy === "fixed";
	const documentElement = getDocumentElement(offsetParent);
	const topLayer = elements ? isTopLayer(elements.floating) : false;
	if (offsetParent === documentElement || topLayer && isFixed) return rect;
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	let scale = createCoords(1);
	const offsets = createCoords(0);
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent);
			scale = getScale(offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
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
	if (getComputedStyle$1(body).direction === "rtl") x += max(html.clientWidth, body.clientWidth) - width;
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
	const windowScrollbarX = getWindowScrollBarX(html);
	if (windowScrollbarX <= 0) {
		const doc = html.ownerDocument;
		const body = doc.body;
		const bodyStyles = getComputedStyle(body);
		const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
		const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
		if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) width -= clippingStableScrollbarWidth;
	} else if (windowScrollbarX <= SCROLLBAR_MAX) width += windowScrollbarX;
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
	return {
		width: element.clientWidth * scale.x,
		height: element.clientHeight * scale.y,
		x: left * scale.x,
		y: top * scale.y
	};
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
	let rect;
	if (clippingAncestor === "viewport") rect = getViewportRect(element, strategy);
	else if (clippingAncestor === "document") rect = getDocumentRect(getDocumentElement(element));
	else if (isElement(clippingAncestor)) rect = getInnerBoundingClientRect(clippingAncestor, strategy);
	else {
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
	if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) return false;
	return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
	const cachedResult = cache.get(element);
	if (cachedResult) return cachedResult;
	let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
	let currentContainingBlockComputedStyle = null;
	const elementIsFixed = getComputedStyle$1(element).position === "fixed";
	let currentNode = elementIsFixed ? getParentNode(element) : element;
	while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
		const computedStyle = getComputedStyle$1(currentNode);
		const currentNodeIsContaining = isContainingBlock(currentNode);
		if (!currentNodeIsContaining && computedStyle.position === "fixed") currentContainingBlockComputedStyle = null;
		if (elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode)) result = result.filter((ancestor) => ancestor !== currentNode);
		else currentContainingBlockComputedStyle = computedStyle;
		currentNode = getParentNode(currentNode);
	}
	cache.set(element, result);
	return result;
}
function getClippingRect(_ref) {
	let { element, boundary, rootBoundary, strategy } = _ref;
	const clippingAncestors = [...boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary), rootBoundary];
	const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
	let top = firstRect.top;
	let right = firstRect.right;
	let bottom = firstRect.bottom;
	let left = firstRect.left;
	for (let i = 1; i < clippingAncestors.length; i++) {
		const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
		top = max(rect.top, top);
		right = min(rect.right, right);
		bottom = min(rect.bottom, bottom);
		left = max(rect.left, left);
	}
	return {
		width: right - left,
		height: bottom - top,
		x: left,
		y: top
	};
}
function getDimensions(element) {
	const { width, height } = getCssDimensions(element);
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
	function setLeftRTLScrollbarOffset() {
		offsets.x = getWindowScrollBarX(documentElement);
	}
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		} else if (documentElement) setLeftRTLScrollbarOffset();
	}
	if (isFixed && !isOffsetParentAnElement && documentElement) setLeftRTLScrollbarOffset();
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
		y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
		width: rect.width,
		height: rect.height
	};
}
function isStaticPositioned(element) {
	return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
	if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") return null;
	if (polyfill) return polyfill(element);
	let rawOffsetParent = element.offsetParent;
	if (getDocumentElement(element) === rawOffsetParent) rawOffsetParent = rawOffsetParent.ownerDocument.body;
	return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
	const win = getWindow(element);
	if (isTopLayer(element)) return win;
	if (!isHTMLElement(element)) {
		let svgOffsetParent = getParentNode(element);
		while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
			if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) return svgOffsetParent;
			svgOffsetParent = getParentNode(svgOffsetParent);
		}
		return win;
	}
	let offsetParent = getTrueOffsetParent(element, polyfill);
	while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) offsetParent = getTrueOffsetParent(offsetParent, polyfill);
	if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) return win;
	return offsetParent || getContainingBlock(element) || win;
}
function isRTL(element) {
	return getComputedStyle$1(element).direction === "rtl";
}
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
		if (skip === void 0) skip = false;
		if (threshold === void 0) threshold = 1;
		cleanup();
		const elementRectForRootMargin = element.getBoundingClientRect();
		const { left, top, width, height } = elementRectForRootMargin;
		if (!skip) onMove();
		if (!width || !height) return;
		const insetTop = floor(top);
		const insetRight = floor(root.clientWidth - (left + width));
		const insetBottom = floor(root.clientHeight - (top + height));
		const insetLeft = floor(left);
		const options = {
			rootMargin: -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px",
			threshold: max(0, min(1, threshold)) || 1
		};
		let isFirstUpdate = true;
		function handleObserve(entries) {
			const ratio = entries[0].intersectionRatio;
			if (ratio !== threshold) {
				if (!isFirstUpdate) return refresh();
				if (!ratio) timeoutId = setTimeout(() => {
					refresh(false, 1e-7);
				}, 1e3);
				else refresh(false, ratio);
			}
			if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) refresh();
			isFirstUpdate = false;
		}
		try {
			io = new IntersectionObserver(handleObserve, {
				...options,
				root: root.ownerDocument
			});
		} catch (_e) {
			io = new IntersectionObserver(handleObserve, options);
		}
		io.observe(element);
	}
	refresh(true);
	return cleanup;
}
/**
* Automatically updates the position of the floating element when necessary.
* Should only be called when the floating element is mounted on the DOM or
* visible on the screen.
* @returns cleanup function that should be invoked when the floating element is
* removed from the DOM or hidden from the screen.
* @see https://floating-ui.com/docs/autoUpdate
*/
function autoUpdate(reference, floating, update, options) {
	if (options === void 0) options = {};
	const { ancestorScroll = true, ancestorResize = true, elementResize = typeof ResizeObserver === "function", layoutShift = typeof IntersectionObserver === "function", animationFrame = false } = options;
	const referenceEl = unwrapElement(reference);
	const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
	ancestors.forEach((ancestor) => {
		ancestorScroll && ancestor.addEventListener("scroll", update, { passive: true });
		ancestorResize && ancestor.addEventListener("resize", update);
	});
	const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
	let reobserveFrame = -1;
	let resizeObserver = null;
	if (elementResize) {
		resizeObserver = new ResizeObserver((_ref) => {
			let [firstEntry] = _ref;
			if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
				resizeObserver.unobserve(floating);
				cancelAnimationFrame(reobserveFrame);
				reobserveFrame = requestAnimationFrame(() => {
					var _resizeObserver;
					(_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
				});
			}
			update();
		});
		if (referenceEl && !animationFrame) resizeObserver.observe(referenceEl);
		if (floating) resizeObserver.observe(floating);
	}
	let frameId;
	let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
	if (animationFrame) frameLoop();
	function frameLoop() {
		const nextRefRect = getBoundingClientRect(reference);
		if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) update();
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
		cleanupIo?.();
		(_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
		resizeObserver = null;
		if (animationFrame) cancelAnimationFrame(frameId);
	};
}
var noOffsets, SCROLLBAR_MAX, getElementRects, platform, offset$1, autoPlacement$1, shift$1, flip$1, size$1, hide$1, inline$1, computePosition;
function init_floating_ui_dom() {
	return (init_floating_ui_dom = __esmMin((() => {
		init_floating_ui_core();
		init_floating_ui_utils();
		init_floating_ui_utils_dom();
		noOffsets = /*#__PURE__*/ createCoords(0);
		SCROLLBAR_MAX = 25;
		getElementRects = async function(data) {
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
		platform = {
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
		offset$1 = offset$2;
		autoPlacement$1 = autoPlacement$2;
		shift$1 = shift$2;
		flip$1 = flip$2;
		size$1 = size$2;
		hide$1 = hide$2;
		inline$1 = inline$2;
		computePosition = (reference, floating, options) => {
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
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+react-dom@2.1.8_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
function deepEqual(a, b) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (typeof a === "function" && a.toString() === b.toString()) return true;
	let length;
	let i;
	let keys;
	if (a && b && typeof a === "object") {
		if (Array.isArray(a)) {
			length = a.length;
			if (length !== b.length) return false;
			for (i = length; i-- !== 0;) if (!deepEqual(a[i], b[i])) return false;
			return true;
		}
		keys = Object.keys(a);
		length = keys.length;
		if (length !== Object.keys(b).length) return false;
		for (i = length; i-- !== 0;) if (!{}.hasOwnProperty.call(b, keys[i])) return false;
		for (i = length; i-- !== 0;) {
			const key = keys[i];
			if (key === "_owner" && a.$$typeof) continue;
			if (!deepEqual(a[key], b[key])) return false;
		}
		return true;
	}
	return a !== a && b !== b;
}
function getDPR(element) {
	if (typeof window === "undefined") return 1;
	return (element.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function roundByDPR(element, value) {
	const dpr = getDPR(element);
	return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
	const ref = import_react$21.useRef(value);
	index(() => {
		ref.current = value;
	});
	return ref;
}
/**
* Provides data to position a floating element.
* @see https://floating-ui.com/docs/useFloating
*/
function useFloating$1(options) {
	if (options === void 0) options = {};
	const { placement = "bottom", strategy = "absolute", middleware = [], platform, elements: { reference: externalReference, floating: externalFloating } = {}, transform = true, whileElementsMounted, open } = options;
	const [data, setData] = import_react$21.useState({
		x: 0,
		y: 0,
		strategy,
		placement,
		middlewareData: {},
		isPositioned: false
	});
	const [latestMiddleware, setLatestMiddleware] = import_react$21.useState(middleware);
	if (!deepEqual(latestMiddleware, middleware)) setLatestMiddleware(middleware);
	const [_reference, _setReference] = import_react$21.useState(null);
	const [_floating, _setFloating] = import_react$21.useState(null);
	const setReference = import_react$21.useCallback((node) => {
		if (node !== referenceRef.current) {
			referenceRef.current = node;
			_setReference(node);
		}
	}, []);
	const setFloating = import_react$21.useCallback((node) => {
		if (node !== floatingRef.current) {
			floatingRef.current = node;
			_setFloating(node);
		}
	}, []);
	const referenceEl = externalReference || _reference;
	const floatingEl = externalFloating || _floating;
	const referenceRef = import_react$21.useRef(null);
	const floatingRef = import_react$21.useRef(null);
	const dataRef = import_react$21.useRef(data);
	const hasWhileElementsMounted = whileElementsMounted != null;
	const whileElementsMountedRef = useLatestRef(whileElementsMounted);
	const platformRef = useLatestRef(platform);
	const openRef = useLatestRef(open);
	const update = import_react$21.useCallback(() => {
		if (!referenceRef.current || !floatingRef.current) return;
		const config = {
			placement,
			strategy,
			middleware: latestMiddleware
		};
		if (platformRef.current) config.platform = platformRef.current;
		computePosition(referenceRef.current, floatingRef.current, config).then((data) => {
			const fullData = {
				...data,
				isPositioned: openRef.current !== false
			};
			if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
				dataRef.current = fullData;
				import_react_dom$4.flushSync(() => {
					setData(fullData);
				});
			}
		});
	}, [
		latestMiddleware,
		placement,
		strategy,
		platformRef,
		openRef
	]);
	index(() => {
		if (open === false && dataRef.current.isPositioned) {
			dataRef.current.isPositioned = false;
			setData((data) => ({
				...data,
				isPositioned: false
			}));
		}
	}, [open]);
	const isMountedRef = import_react$21.useRef(false);
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
			if (whileElementsMountedRef.current) return whileElementsMountedRef.current(referenceEl, floatingEl, update);
			update();
		}
	}, [
		referenceEl,
		floatingEl,
		update,
		whileElementsMountedRef,
		hasWhileElementsMounted
	]);
	const refs = import_react$21.useMemo(() => ({
		reference: referenceRef,
		floating: floatingRef,
		setReference,
		setFloating
	}), [setReference, setFloating]);
	const elements = import_react$21.useMemo(() => ({
		reference: referenceEl,
		floating: floatingEl
	}), [referenceEl, floatingEl]);
	const floatingStyles = import_react$21.useMemo(() => {
		const initialStyles = {
			position: strategy,
			left: 0,
			top: 0
		};
		if (!elements.floating) return initialStyles;
		const x = roundByDPR(elements.floating, data.x);
		const y = roundByDPR(elements.floating, data.y);
		if (transform) return {
			...initialStyles,
			transform: "translate(" + x + "px, " + y + "px)",
			...getDPR(elements.floating) >= 1.5 && { willChange: "transform" }
		};
		return {
			position: strategy,
			left: x,
			top: y
		};
	}, [
		strategy,
		transform,
		elements.floating,
		data.x,
		data.y
	]);
	return import_react$21.useMemo(() => ({
		...data,
		update,
		refs,
		elements,
		floatingStyles
	}), [
		data,
		update,
		refs,
		elements,
		floatingStyles
	]);
}
var import_react$21, import_react$22, import_react_dom$4, index, offset, shift, flip, size, autoPlacement, hide, inline;
function init_floating_ui_react_dom() {
	return (init_floating_ui_react_dom = __esmMin((() => {
		init_floating_ui_dom();
		import_react$21 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react$22 = require_react();
		import_react_dom$4 = /* @__PURE__ */ __toESM(require_react_dom(), 1);
		index = typeof document !== "undefined" ? import_react$22.useLayoutEffect : function noop() {};
		offset = (options, deps) => {
			const result = offset$1(options);
			return {
				name: result.name,
				fn: result.fn,
				options: [options, deps]
			};
		};
		shift = (options, deps) => {
			const result = shift$1(options);
			return {
				name: result.name,
				fn: result.fn,
				options: [options, deps]
			};
		};
		flip = (options, deps) => {
			const result = flip$1(options);
			return {
				name: result.name,
				fn: result.fn,
				options: [options, deps]
			};
		};
		size = (options, deps) => {
			const result = size$1(options);
			return {
				name: result.name,
				fn: result.fn,
				options: [options, deps]
			};
		};
		autoPlacement = (options, deps) => {
			const result = autoPlacement$1(options);
			return {
				name: result.name,
				fn: result.fn,
				options: [options, deps]
			};
		};
		hide = (options, deps) => {
			const result = hide$1(options);
			return {
				name: result.name,
				fn: result.fn,
				options: [options, deps]
			};
		};
		inline = (options, deps) => {
			const result = inline$1(options);
			return {
				name: result.name,
				fn: result.fn,
				options: [options, deps]
			};
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+react@0.27.19_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/@floating-ui/react/dist/floating-ui.react.mjs
/**
* Merges an array of refs into a single memoized callback ref or `null`.
* @see https://floating-ui.com/docs/react-utils#usemergerefs
*/
function useMergeRefs(refs) {
	const cleanupRef = import_react$20.useRef(void 0);
	const refEffect = import_react$20.useCallback((instance) => {
		const cleanups = refs.map((ref) => {
			if (ref == null) return;
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
	return import_react$20.useMemo(() => {
		if (refs.every((ref) => ref == null)) return null;
		return (value) => {
			if (cleanupRef.current) {
				cleanupRef.current();
				cleanupRef.current = void 0;
			}
			if (value != null) cleanupRef.current = refEffect(value);
		};
	}, refs);
}
function sortByDocumentPosition(a, b) {
	const position = a.compareDocumentPosition(b);
	if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) return -1;
	if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) return 1;
	return 0;
}
/**
* Provides context for a list of items within the floating element.
* @see https://floating-ui.com/docs/FloatingList
*/
function FloatingList(props) {
	const { children, elementsRef, labelsRef } = props;
	const [nodes, setNodes] = import_react$20.useState(() => /* @__PURE__ */ new Set());
	const register = import_react$20.useCallback((node) => {
		setNodes((prevSet) => new Set(prevSet).add(node));
	}, []);
	const unregister = import_react$20.useCallback((node) => {
		setNodes((prevSet) => {
			const set = new Set(prevSet);
			set.delete(node);
			return set;
		});
	}, []);
	const map = import_react$20.useMemo(() => {
		const newMap = /* @__PURE__ */ new Map();
		Array.from(nodes.keys()).sort(sortByDocumentPosition).forEach((node, index) => {
			newMap.set(node, index);
		});
		return newMap;
	}, [nodes]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingListContext.Provider, {
		value: import_react$20.useMemo(() => ({
			register,
			unregister,
			map,
			elementsRef,
			labelsRef
		}), [
			register,
			unregister,
			map,
			elementsRef,
			labelsRef
		]),
		children
	});
}
/**
* Used to register a list item and its index (DOM position) in the
* `FloatingList`.
* @see https://floating-ui.com/docs/FloatingList#uselistitem
*/
function useListItem(props) {
	if (props === void 0) props = {};
	const { label } = props;
	const { register, unregister, map, elementsRef, labelsRef } = import_react$20.useContext(FloatingListContext);
	const [index, setIndex] = import_react$20.useState(null);
	const componentRef = import_react$20.useRef(null);
	const ref = import_react$20.useCallback((node) => {
		componentRef.current = node;
		if (index !== null) {
			elementsRef.current[index] = node;
			if (labelsRef) {
				var _node$textContent;
				const isLabelDefined = label !== void 0;
				labelsRef.current[index] = isLabelDefined ? label : (_node$textContent = node == null ? void 0 : node.textContent) != null ? _node$textContent : null;
			}
		}
	}, [
		index,
		elementsRef,
		labelsRef,
		label
	]);
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
		const index = componentRef.current ? map.get(componentRef.current) : null;
		if (index != null) setIndex(index);
	}, [map]);
	return import_react$20.useMemo(() => ({
		ref,
		index: index == null ? -1 : index
	}), [index, ref]);
}
function renderJsx(render, computedProps) {
	if (typeof render === "function") return render(computedProps);
	if (render) return /*#__PURE__*/ import_react$20.cloneElement(render, computedProps);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", { ...computedProps });
}
function useFloatingId() {
	const [id, setId] = import_react$20.useState(() => serverHandoffComplete ? genId() : void 0);
	index$1(() => {
		if (id == null) setId(genId());
	}, []);
	import_react$20.useEffect(() => {
		serverHandoffComplete = true;
	}, []);
	return id;
}
function createEventEmitter() {
	const map = /* @__PURE__ */ new Map();
	return {
		emit(event, data) {
			var _map$get;
			(_map$get = map.get(event)) == null || _map$get.forEach((listener) => listener(data));
		},
		on(event, listener) {
			if (!map.has(event)) map.set(event, /* @__PURE__ */ new Set());
			map.get(event).add(listener);
		},
		off(event, listener) {
			var _map$get2;
			(_map$get2 = map.get(event)) == null || _map$get2.delete(listener);
		}
	};
}
/**
* Registers a node into the `FloatingTree`, returning its id.
* @see https://floating-ui.com/docs/FloatingTree
*/
function useFloatingNodeId(customParentId) {
	const id = useId();
	const tree = useFloatingTree();
	const reactParentId = useFloatingParentNodeId();
	const parentId = customParentId || reactParentId;
	index$1(() => {
		if (!id) return;
		const node = {
			id,
			parentId
		};
		tree?.addNode(node);
		return () => {
			tree?.removeNode(node);
		};
	}, [
		tree,
		id,
		parentId
	]);
	return id;
}
/**
* Provides parent node context for nested floating elements.
* @see https://floating-ui.com/docs/FloatingTree
*/
function FloatingNode(props) {
	const { children, id } = props;
	const parentId = useFloatingParentNodeId();
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingNodeContext.Provider, {
		value: import_react$20.useMemo(() => ({
			id,
			parentId
		}), [id, parentId]),
		children
	});
}
/**
* Provides context for nested floating elements when they are not children of
* each other on the DOM.
* This is not necessary in all cases, except when there must be explicit communication between parent and child floating elements. It is necessary for:
* - The `bubbles` option in the `useDismiss()` Hook
* - Nested virtual list navigation
* - Nested floating elements that each open on hover
* - Custom communication between parent and child floating elements
* @see https://floating-ui.com/docs/FloatingTree
*/
function FloatingTree(props) {
	const { children } = props;
	const nodesRef = import_react$20.useRef([]);
	const addNode = import_react$20.useCallback((node) => {
		nodesRef.current = [...nodesRef.current, node];
	}, []);
	const removeNode = import_react$20.useCallback((node) => {
		nodesRef.current = nodesRef.current.filter((n) => n !== node);
	}, []);
	const [events] = import_react$20.useState(() => createEventEmitter());
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingTreeContext.Provider, {
		value: import_react$20.useMemo(() => ({
			nodesRef,
			addNode,
			removeNode,
			events
		}), [
			addNode,
			removeNode,
			events
		]),
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
function getDelay(value, prop, pointerType) {
	if (pointerType && !isMouseLikePointerType(pointerType)) return 0;
	if (typeof value === "number") return value;
	if (typeof value === "function") {
		const result = value();
		if (typeof result === "number") return result;
		return result == null ? void 0 : result[prop];
	}
	return value == null ? void 0 : value[prop];
}
function getRestMs(value) {
	if (typeof value === "function") return value();
	return value;
}
/**
* Opens the floating element while hovering over the reference element, like
* CSS `:hover`.
* @see https://floating-ui.com/docs/useHover
*/
function useHover(context, props) {
	if (props === void 0) props = {};
	const { open, onOpenChange, dataRef, events, elements } = context;
	const { enabled = true, delay = 0, handleClose = null, mouseOnly = false, restMs = 0, move = true } = props;
	const tree = useFloatingTree();
	const parentId = useFloatingParentNodeId();
	const handleCloseRef = useLatestRef$1(handleClose);
	const delayRef = useLatestRef$1(delay);
	const openRef = useLatestRef$1(open);
	const restMsRef = useLatestRef$1(restMs);
	const pointerTypeRef = import_react$20.useRef();
	const timeoutRef = import_react$20.useRef(-1);
	const handlerRef = import_react$20.useRef();
	const restTimeoutRef = import_react$20.useRef(-1);
	const blockMouseMoveRef = import_react$20.useRef(true);
	const performedPointerEventsMutationRef = import_react$20.useRef(false);
	const unbindMouseMoveRef = import_react$20.useRef(() => {});
	const restTimeoutPendingRef = import_react$20.useRef(false);
	const isHoverOpen = useEffectEvent(() => {
		var _dataRef$current$open;
		const type = (_dataRef$current$open = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open.type;
		return (type == null ? void 0 : type.includes("mouse")) && type !== "mousedown";
	});
	import_react$20.useEffect(() => {
		if (!enabled) return;
		function onOpenChange(_ref) {
			let { open } = _ref;
			if (!open) {
				clearTimeoutIfSet(timeoutRef);
				clearTimeoutIfSet(restTimeoutRef);
				blockMouseMoveRef.current = true;
				restTimeoutPendingRef.current = false;
			}
		}
		events.on("openchange", onOpenChange);
		return () => {
			events.off("openchange", onOpenChange);
		};
	}, [enabled, events]);
	import_react$20.useEffect(() => {
		if (!enabled) return;
		if (!handleCloseRef.current) return;
		if (!open) return;
		function onLeave(event) {
			if (isHoverOpen()) onOpenChange(false, event, "hover");
		}
		const html = getDocument$1(elements.floating).documentElement;
		html.addEventListener("mouseleave", onLeave);
		return () => {
			html.removeEventListener("mouseleave", onLeave);
		};
	}, [
		elements.floating,
		open,
		onOpenChange,
		enabled,
		handleCloseRef,
		isHoverOpen
	]);
	const closeWithDelay = import_react$20.useCallback(function(event, runElseBranch, reason) {
		if (runElseBranch === void 0) runElseBranch = true;
		if (reason === void 0) reason = "hover";
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
	import_react$20.useEffect(() => {
		if (!enabled) return;
		function onReferenceMouseEnter(event) {
			clearTimeoutIfSet(timeoutRef);
			blockMouseMoveRef.current = false;
			if (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current) || getRestMs(restMsRef.current) > 0 && !getDelay(delayRef.current, "open")) return;
			const openDelay = getDelay(delayRef.current, "open", pointerTypeRef.current);
			if (openDelay) timeoutRef.current = window.setTimeout(() => {
				if (!openRef.current) onOpenChange(true, event, "hover");
			}, openDelay);
			else if (!open) onOpenChange(true, event, "hover");
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
				if (!open) clearTimeoutIfSet(timeoutRef);
				handlerRef.current = handleCloseRef.current({
					...dataRef.current.floatingContext,
					tree,
					x: event.clientX,
					y: event.clientY,
					onClose() {
						clearPointerEvents();
						cleanupMouseMoveHandler();
						if (!isClickLikeOpenEvent()) closeWithDelay(event, true, "safe-polygon");
					}
				});
				const handler = handlerRef.current;
				doc.addEventListener("mousemove", handler);
				unbindMouseMoveRef.current = () => {
					doc.removeEventListener("mousemove", handler);
				};
				return;
			}
			if (pointerTypeRef.current === "touch" ? !contains$1(elements.floating, event.relatedTarget) : true) closeWithDelay(event);
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
					if (!isClickLikeOpenEvent()) closeWithDelay(event);
				}
			})(event);
		}
		function onFloatingMouseEnter() {
			clearTimeoutIfSet(timeoutRef);
		}
		function onFloatingMouseLeave(event) {
			if (!isClickLikeOpenEvent()) closeWithDelay(event, false);
		}
		if (isElement(elements.domReference)) {
			const reference = elements.domReference;
			const floating = elements.floating;
			if (open) reference.addEventListener("mouseleave", onScrollMouseLeave);
			if (move) reference.addEventListener("mousemove", onReferenceMouseEnter, { once: true });
			reference.addEventListener("mouseenter", onReferenceMouseEnter);
			reference.addEventListener("mouseleave", onReferenceMouseLeave);
			if (floating) {
				floating.addEventListener("mouseleave", onScrollMouseLeave);
				floating.addEventListener("mouseenter", onFloatingMouseEnter);
				floating.addEventListener("mouseleave", onFloatingMouseLeave);
			}
			return () => {
				if (open) reference.removeEventListener("mouseleave", onScrollMouseLeave);
				if (move) reference.removeEventListener("mousemove", onReferenceMouseEnter);
				reference.removeEventListener("mouseenter", onReferenceMouseEnter);
				reference.removeEventListener("mouseleave", onReferenceMouseLeave);
				if (floating) {
					floating.removeEventListener("mouseleave", onScrollMouseLeave);
					floating.removeEventListener("mouseenter", onFloatingMouseEnter);
					floating.removeEventListener("mouseleave", onFloatingMouseLeave);
				}
			};
		}
	}, [
		elements,
		enabled,
		context,
		mouseOnly,
		move,
		closeWithDelay,
		cleanupMouseMoveHandler,
		clearPointerEvents,
		onOpenChange,
		open,
		openRef,
		tree,
		delayRef,
		handleCloseRef,
		dataRef,
		isClickLikeOpenEvent,
		restMsRef
	]);
	index$1(() => {
		var _handleCloseRef$curre;
		if (!enabled) return;
		if (open && (_handleCloseRef$curre = handleCloseRef.current) != null && (_handleCloseRef$curre = _handleCloseRef$curre.__options) != null && _handleCloseRef$curre.blockPointerEvents && isHoverOpen()) {
			performedPointerEventsMutationRef.current = true;
			const floatingEl = elements.floating;
			if (isElement(elements.domReference) && floatingEl) {
				var _tree$nodesRef$curren;
				const body = getDocument$1(elements.floating).body;
				body.setAttribute(safePolygonIdentifier, "");
				const ref = elements.domReference;
				const parentFloating = tree == null || (_tree$nodesRef$curren = tree.nodesRef.current.find((node) => node.id === parentId)) == null || (_tree$nodesRef$curren = _tree$nodesRef$curren.context) == null ? void 0 : _tree$nodesRef$curren.elements.floating;
				if (parentFloating) parentFloating.style.pointerEvents = "";
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
	}, [
		enabled,
		open,
		parentId,
		elements,
		tree,
		handleCloseRef,
		isHoverOpen
	]);
	index$1(() => {
		if (!open) {
			pointerTypeRef.current = void 0;
			restTimeoutPendingRef.current = false;
			cleanupMouseMoveHandler();
			clearPointerEvents();
		}
	}, [
		open,
		cleanupMouseMoveHandler,
		clearPointerEvents
	]);
	import_react$20.useEffect(() => {
		return () => {
			cleanupMouseMoveHandler();
			clearTimeoutIfSet(timeoutRef);
			clearTimeoutIfSet(restTimeoutRef);
			clearPointerEvents();
		};
	}, [
		enabled,
		elements.domReference,
		cleanupMouseMoveHandler,
		clearPointerEvents
	]);
	const reference = import_react$20.useMemo(() => {
		function setPointerRef(event) {
			pointerTypeRef.current = event.pointerType;
		}
		return {
			onPointerDown: setPointerRef,
			onPointerEnter: setPointerRef,
			onMouseMove(event) {
				const { nativeEvent } = event;
				function handleMouseMove() {
					if (!blockMouseMoveRef.current && !openRef.current) onOpenChange(true, nativeEvent, "hover");
				}
				if (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current)) return;
				if (open || getRestMs(restMsRef.current) === 0) return;
				if (restTimeoutPendingRef.current && event.movementX ** 2 + event.movementY ** 2 < 2) return;
				clearTimeoutIfSet(restTimeoutRef);
				if (pointerTypeRef.current === "touch") handleMouseMove();
				else {
					restTimeoutPendingRef.current = true;
					restTimeoutRef.current = window.setTimeout(handleMouseMove, getRestMs(restMsRef.current));
				}
			}
		};
	}, [
		mouseOnly,
		onOpenChange,
		open,
		openRef,
		restMsRef
	]);
	return import_react$20.useMemo(() => enabled ? { reference } : {}, [enabled, reference]);
}
/**
* Provides context for a group of floating elements that should share a
* `delay`.
* @see https://floating-ui.com/docs/FloatingDelayGroup
*/
function FloatingDelayGroup(props) {
	const { children, delay, timeoutMs = 0 } = props;
	const [state, setState] = import_react$20.useReducer((prev, next) => ({
		...prev,
		...next
	}), {
		delay,
		timeoutMs,
		initialDelay: delay,
		currentId: null,
		isInstantPhase: false
	});
	const initialCurrentIdRef = import_react$20.useRef(null);
	const setCurrentId = import_react$20.useCallback((currentId) => {
		setState({ currentId });
	}, []);
	index$1(() => {
		if (state.currentId) {
			if (initialCurrentIdRef.current === null) initialCurrentIdRef.current = state.currentId;
			else if (!state.isInstantPhase) setState({ isInstantPhase: true });
		} else {
			if (state.isInstantPhase) setState({ isInstantPhase: false });
			initialCurrentIdRef.current = null;
		}
	}, [state.currentId, state.isInstantPhase]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingDelayGroupContext.Provider, {
		value: import_react$20.useMemo(() => ({
			...state,
			setState,
			setCurrentId
		}), [state, setCurrentId]),
		children
	});
}
/**
* Enables grouping when called inside a component that's a child of a
* `FloatingDelayGroup`.
* @see https://floating-ui.com/docs/FloatingDelayGroup
*/
function useDelayGroup(context, options) {
	if (options === void 0) options = {};
	const { open, onOpenChange, floatingId } = context;
	const { id: optionId, enabled = true } = options;
	const id = optionId != null ? optionId : floatingId;
	const groupContext = useDelayGroupContext();
	const { currentId, setCurrentId, initialDelay, setState, timeoutMs } = groupContext;
	index$1(() => {
		if (!enabled) return;
		if (!currentId) return;
		setState({ delay: {
			open: 1,
			close: getDelay(initialDelay, "close")
		} });
		if (currentId !== id) onOpenChange(false);
	}, [
		enabled,
		id,
		onOpenChange,
		setState,
		currentId,
		initialDelay
	]);
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
	}, [
		enabled,
		open,
		setState,
		currentId,
		id,
		onOpenChange,
		initialDelay,
		timeoutMs
	]);
	index$1(() => {
		if (!enabled) return;
		if (setCurrentId === NOOP || !open) return;
		setCurrentId(id);
	}, [
		enabled,
		open,
		setCurrentId,
		id
	]);
	return groupContext;
}
function enqueueFocus(el, options) {
	if (options === void 0) options = {};
	const { preventScroll = false, cancelPrevious = true, sync = false } = options;
	cancelPrevious && cancelAnimationFrame(rafId);
	const exec = () => el == null ? void 0 : el.focus({ preventScroll });
	if (sync) exec();
	else rafId = requestAnimationFrame(exec);
}
function contains(parent, child) {
	if (!parent || !child) return false;
	const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();
	if (parent.contains(child)) return true;
	if (rootNode && isShadowRoot(rootNode)) {
		let next = child;
		while (next) {
			if (parent === next) return true;
			next = next.parentNode || next.host;
		}
	}
	return false;
}
function getTarget(event) {
	if ("composedPath" in event) return event.composedPath()[0];
	return event.target;
}
function getDocument(node) {
	return (node == null ? void 0 : node.ownerDocument) || document;
}
function getCounterMap(control) {
	if (control === "inert") return counters.inert;
	if (control === "aria-hidden") return counters["aria-hidden"];
	return counters.none;
}
function unwrapHost(node) {
	if (!node) return null;
	return isShadowRoot(node) ? node.host : unwrapHost(node.parentNode);
}
function applyAttributeToOthers(uncorrectedAvoidElements, body, ariaHidden, inert) {
	const markerName = "data-floating-ui-inert";
	const controlAttribute = inert ? "inert" : ariaHidden ? "aria-hidden" : null;
	const avoidElements = correctElements(body, uncorrectedAvoidElements);
	const elementsToKeep = /* @__PURE__ */ new Set();
	const elementsToStop = new Set(avoidElements);
	const hiddenElements = [];
	if (!markerMap[markerName]) markerMap[markerName] = /* @__PURE__ */ new WeakMap();
	const markerCounter = markerMap[markerName];
	avoidElements.forEach(keep);
	deep(body);
	elementsToKeep.clear();
	function keep(el) {
		if (!el || elementsToKeep.has(el)) return;
		elementsToKeep.add(el);
		el.parentNode && keep(el.parentNode);
	}
	function deep(parent) {
		if (!parent || elementsToStop.has(parent)) return;
		[].forEach.call(parent.children, (node) => {
			if (getNodeName(node) === "script") return;
			if (elementsToKeep.has(node)) deep(node);
			else {
				const attr = controlAttribute ? node.getAttribute(controlAttribute) : null;
				const alreadyHidden = attr !== null && attr !== "false";
				const counterMap = getCounterMap(controlAttribute);
				const counterValue = (counterMap.get(node) || 0) + 1;
				const markerValue = (markerCounter.get(node) || 0) + 1;
				counterMap.set(node, counterValue);
				markerCounter.set(node, markerValue);
				hiddenElements.push(node);
				if (counterValue === 1 && alreadyHidden) uncontrolledElementsSet.add(node);
				if (markerValue === 1) node.setAttribute(markerName, "");
				if (!alreadyHidden && controlAttribute) node.setAttribute(controlAttribute, controlAttribute === "inert" ? "" : "true");
			}
		});
	}
	lockCount$1++;
	return () => {
		hiddenElements.forEach((element) => {
			const counterMap = getCounterMap(controlAttribute);
			const counterValue = (counterMap.get(element) || 0) - 1;
			const markerValue = (markerCounter.get(element) || 0) - 1;
			counterMap.set(element, counterValue);
			markerCounter.set(element, markerValue);
			if (!counterValue) {
				if (!uncontrolledElementsSet.has(element) && controlAttribute) element.removeAttribute(controlAttribute);
				uncontrolledElementsSet.delete(element);
			}
			if (!markerValue) element.removeAttribute(markerName);
		});
		lockCount$1--;
		if (!lockCount$1) {
			counters.inert = /* @__PURE__ */ new WeakMap();
			counters["aria-hidden"] = /* @__PURE__ */ new WeakMap();
			counters.none = /* @__PURE__ */ new WeakMap();
			uncontrolledElementsSet = /* @__PURE__ */ new WeakSet();
			markerMap = {};
		}
	};
}
function markOthers(avoidElements, ariaHidden, inert) {
	if (ariaHidden === void 0) ariaHidden = false;
	if (inert === void 0) inert = false;
	const body = getDocument(avoidElements[0]).body;
	return applyAttributeToOthers(avoidElements.concat(Array.from(body.querySelectorAll("[aria-live],[role=\"status\"],output"))), body, ariaHidden, inert);
}
/**
* @see https://floating-ui.com/docs/FloatingPortal#usefloatingportalnode
*/
function useFloatingPortalNode(props) {
	if (props === void 0) props = {};
	const { id, root } = props;
	const uniqueId = useId();
	const portalContext = usePortalContext();
	const [portalNode, setPortalNode] = import_react$20.useState(null);
	const portalNodeRef = import_react$20.useRef(null);
	index$1(() => {
		return () => {
			portalNode?.remove();
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
		if (container && !isNode(container)) container = container.current;
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
	}, [
		id,
		root,
		uniqueId,
		portalContext
	]);
	return portalNode;
}
/**
* Portals the floating element into a given container element — by default,
* outside of the app root and into the body.
* This is necessary to ensure the floating element can appear outside any
* potential parent containers that cause clipping (such as `overflow: hidden`),
* while retaining its location in the React tree.
* @see https://floating-ui.com/docs/FloatingPortal
*/
function FloatingPortal(props) {
	const { children, id, root, preserveTabOrder = true } = props;
	const portalNode = useFloatingPortalNode({
		id,
		root
	});
	const [focusManagerState, setFocusManagerState] = import_react$20.useState(null);
	const beforeOutsideRef = import_react$20.useRef(null);
	const afterOutsideRef = import_react$20.useRef(null);
	const beforeInsideRef = import_react$20.useRef(null);
	const afterInsideRef = import_react$20.useRef(null);
	const modal = focusManagerState == null ? void 0 : focusManagerState.modal;
	const open = focusManagerState == null ? void 0 : focusManagerState.open;
	const shouldRenderGuards = !!focusManagerState && !focusManagerState.modal && focusManagerState.open && preserveTabOrder && !!(root || portalNode);
	import_react$20.useEffect(() => {
		if (!portalNode || !preserveTabOrder || modal) return;
		function onFocus(event) {
			if (portalNode && isOutsideEvent(event)) (event.type === "focusin" ? enableFocusInside : disableFocusInside)(portalNode);
		}
		portalNode.addEventListener("focusin", onFocus, true);
		portalNode.addEventListener("focusout", onFocus, true);
		return () => {
			portalNode.removeEventListener("focusin", onFocus, true);
			portalNode.removeEventListener("focusout", onFocus, true);
		};
	}, [
		portalNode,
		preserveTabOrder,
		modal
	]);
	import_react$20.useEffect(() => {
		if (!portalNode) return;
		if (open) return;
		enableFocusInside(portalNode);
	}, [open, portalNode]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PortalContext.Provider, {
		value: import_react$20.useMemo(() => ({
			preserveTabOrder,
			beforeOutsideRef,
			afterOutsideRef,
			beforeInsideRef,
			afterInsideRef,
			portalNode,
			setFocusManagerState
		}), [preserveTabOrder, portalNode]),
		children: [
			shouldRenderGuards && portalNode && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusGuard, {
				"data-type": "outside",
				ref: beforeOutsideRef,
				onFocus: (event) => {
					if (isOutsideEvent(event, portalNode)) {
						var _beforeInsideRef$curr;
						(_beforeInsideRef$curr = beforeInsideRef.current) == null || _beforeInsideRef$curr.focus();
					} else getPreviousTabbable(focusManagerState ? focusManagerState.domReference : null)?.focus();
				}
			}),
			shouldRenderGuards && portalNode && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
				"aria-owns": portalNode.id,
				style: HIDDEN_OWNER_STYLES
			}),
			portalNode && /*#__PURE__*/ import_react_dom$3.createPortal(children, portalNode),
			shouldRenderGuards && portalNode && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusGuard, {
				"data-type": "outside",
				ref: afterOutsideRef,
				onFocus: (event) => {
					if (isOutsideEvent(event, portalNode)) {
						var _afterInsideRef$curre;
						(_afterInsideRef$curre = afterInsideRef.current) == null || _afterInsideRef$curre.focus();
					} else {
						getNextTabbable(focusManagerState ? focusManagerState.domReference : null)?.focus();
						focusManagerState != null && focusManagerState.closeOnFocusOut && focusManagerState?.onOpenChange(false, event.nativeEvent, "focus-out");
					}
				}
			})
		]
	});
}
function useLiteMergeRefs(refs) {
	return import_react$20.useMemo(() => {
		return (value) => {
			refs.forEach((ref) => {
				if (ref) ref.current = value;
			});
		};
	}, refs);
}
function clearDisconnectedPreviouslyFocusedElements() {
	previouslyFocusedElements = previouslyFocusedElements.filter((elementRef) => {
		var _elementRef$deref;
		return (_elementRef$deref = elementRef.deref()) == null ? void 0 : _elementRef$deref.isConnected;
	});
}
function addPreviouslyFocusedElement(element) {
	clearDisconnectedPreviouslyFocusedElements();
	if (element && getNodeName(element) !== "body") {
		previouslyFocusedElements.push(new WeakRef(element));
		if (previouslyFocusedElements.length > LIST_LIMIT) previouslyFocusedElements = previouslyFocusedElements.slice(-20);
	}
}
function getPreviouslyFocusedElement() {
	clearDisconnectedPreviouslyFocusedElements();
	const elementRef = previouslyFocusedElements[previouslyFocusedElements.length - 1];
	return elementRef == null ? void 0 : elementRef.deref();
}
function getFirstTabbableElement(container) {
	const tabbableOptions = getTabbableOptions();
	if (isTabbable(container, tabbableOptions)) return container;
	return tabbable(container, tabbableOptions)[0] || container;
}
function handleTabIndex(floatingFocusElement, orderRef) {
	var _floatingFocusElement;
	if (!orderRef.current.includes("floating") && !((_floatingFocusElement = floatingFocusElement.getAttribute("role")) != null && _floatingFocusElement.includes("dialog"))) return;
	const options = getTabbableOptions();
	const tabbableContent = focusable(floatingFocusElement, options).filter((element) => {
		const dataTabIndex = element.getAttribute("data-tabindex") || "";
		return isTabbable(element, options) || element.hasAttribute("data-tabindex") && !dataTabIndex.startsWith("-");
	});
	const tabIndex = floatingFocusElement.getAttribute("tabindex");
	if (orderRef.current.includes("floating") || tabbableContent.length === 0) {
		if (tabIndex !== "0") floatingFocusElement.setAttribute("tabindex", "0");
	} else if (tabIndex !== "-1" || floatingFocusElement.hasAttribute("data-tabindex") && floatingFocusElement.getAttribute("data-tabindex") !== "-1") {
		floatingFocusElement.setAttribute("tabindex", "-1");
		floatingFocusElement.setAttribute("data-tabindex", "-1");
	}
}
/**
* Provides focus management for the floating element.
* @see https://floating-ui.com/docs/FloatingFocusManager
*/
function FloatingFocusManager(props) {
	const { context, children, disabled = false, order = ["content"], guards: _guards = true, initialFocus = 0, returnFocus = true, restoreFocus = false, modal = true, visuallyHiddenDismiss = false, closeOnFocusOut = true, outsideElementsInert = false, getInsideElements: _getInsideElements = () => [] } = props;
	const { open, onOpenChange, events, dataRef, elements: { domReference, floating } } = context;
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
	const startDismissButtonRef = import_react$20.useRef(null);
	const endDismissButtonRef = import_react$20.useRef(null);
	const preventReturnFocusRef = import_react$20.useRef(false);
	const isPointerDownRef = import_react$20.useRef(false);
	const tabbableIndexRef = import_react$20.useRef(-1);
	const blurTimeoutRef = import_react$20.useRef(-1);
	const isInsidePortal = portalContext != null;
	const floatingFocusElement = getFloatingFocusElement(floating);
	const getTabbableContent = useEffectEvent(function(container) {
		if (container === void 0) container = floatingFocusElement;
		return container ? tabbable(container, getTabbableOptions()) : [];
	});
	const getTabbableElements = useEffectEvent((container) => {
		const content = getTabbableContent(container);
		return orderRef.current.map((type) => {
			if (domReference && type === "reference") return domReference;
			if (floatingFocusElement && type === "floating") return floatingFocusElement;
			return content;
		}).filter(Boolean).flat();
	});
	import_react$20.useEffect(() => {
		if (disabled) return;
		if (!modal) return;
		function onKeyDown(event) {
			if (event.key === "Tab") {
				if (contains$1(floatingFocusElement, activeElement(getDocument$1(floatingFocusElement))) && getTabbableContent().length === 0 && !isUntrappedTypeableCombobox) stopEvent(event);
				const els = getTabbableElements();
				const target = getTarget$1(event);
				if (orderRef.current[0] === "reference" && target === domReference) {
					stopEvent(event);
					if (event.shiftKey) enqueueFocus(els[els.length - 1]);
					else enqueueFocus(els[1]);
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
	}, [
		disabled,
		domReference,
		floatingFocusElement,
		modal,
		orderRef,
		isUntrappedTypeableCombobox,
		getTabbableContent,
		getTabbableElements
	]);
	import_react$20.useEffect(() => {
		if (disabled) return;
		if (!floating) return;
		function handleFocusIn(event) {
			const target = getTarget$1(event);
			const tabbableIndex = getTabbableContent().indexOf(target);
			if (tabbableIndex !== -1) tabbableIndexRef.current = tabbableIndex;
		}
		floating.addEventListener("focusin", handleFocusIn);
		return () => {
			floating.removeEventListener("focusin", handleFocusIn);
		};
	}, [
		disabled,
		floating,
		getTabbableContent
	]);
	import_react$20.useEffect(() => {
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
			const target = getTarget$1(event);
			queueMicrotask(() => {
				const nodeId = getNodeId();
				const movedToUnrelatedNode = !(contains$1(domReference, relatedTarget) || contains$1(floating, relatedTarget) || contains$1(relatedTarget, floating) || contains$1(portalContext == null ? void 0 : portalContext.portalNode, relatedTarget) || relatedTarget != null && relatedTarget.hasAttribute(createAttribute("focus-guard")) || tree && (getNodeChildren$1(tree.nodesRef.current, nodeId).find((node) => {
					var _node$context, _node$context2;
					return contains$1((_node$context = node.context) == null ? void 0 : _node$context.elements.floating, relatedTarget) || contains$1((_node$context2 = node.context) == null ? void 0 : _node$context2.elements.domReference, relatedTarget);
				}) || getNodeAncestors(tree.nodesRef.current, nodeId).find((node) => {
					var _node$context3, _node$context4, _node$context5;
					return [(_node$context3 = node.context) == null ? void 0 : _node$context3.elements.floating, getFloatingFocusElement((_node$context4 = node.context) == null ? void 0 : _node$context4.elements.floating)].includes(relatedTarget) || ((_node$context5 = node.context) == null ? void 0 : _node$context5.elements.domReference) === relatedTarget;
				})));
				if (currentTarget === domReference && floatingFocusElement) handleTabIndex(floatingFocusElement, orderRef);
				if (restoreFocus && currentTarget !== domReference && !(target != null && target.isConnected) && activeElement(getDocument$1(floatingFocusElement)) === getDocument$1(floatingFocusElement).body) {
					if (isHTMLElement(floatingFocusElement)) floatingFocusElement.focus();
					const prevTabbableIndex = tabbableIndexRef.current;
					const tabbableContent = getTabbableContent();
					const nodeToFocus = tabbableContent[prevTabbableIndex] || tabbableContent[tabbableContent.length - 1] || floatingFocusElement;
					if (isHTMLElement(nodeToFocus)) nodeToFocus.focus();
				}
				if (dataRef.current.insideReactTree) {
					dataRef.current.insideReactTree = false;
					return;
				}
				if ((isUntrappedTypeableCombobox ? true : !modal) && relatedTarget && movedToUnrelatedNode && !isPointerDownRef.current && relatedTarget !== getPreviouslyFocusedElement()) {
					preventReturnFocusRef.current = true;
					onOpenChange(false, event, "focus-out");
				}
			});
		}
		const shouldHandleBlurCapture = Boolean(!tree && portalContext);
		function markInsideReactTree() {
			clearTimeoutIfSet(blurTimeoutRef);
			dataRef.current.insideReactTree = true;
			blurTimeoutRef.current = window.setTimeout(() => {
				dataRef.current.insideReactTree = false;
			});
		}
		if (floating && isHTMLElement(domReference)) {
			domReference.addEventListener("focusout", handleFocusOutside);
			domReference.addEventListener("pointerdown", handlePointerDown);
			floating.addEventListener("focusout", handleFocusOutside);
			if (shouldHandleBlurCapture) floating.addEventListener("focusout", markInsideReactTree, true);
			return () => {
				domReference.removeEventListener("focusout", handleFocusOutside);
				domReference.removeEventListener("pointerdown", handlePointerDown);
				floating.removeEventListener("focusout", handleFocusOutside);
				if (shouldHandleBlurCapture) floating.removeEventListener("focusout", markInsideReactTree, true);
			};
		}
	}, [
		disabled,
		domReference,
		floating,
		floatingFocusElement,
		modal,
		tree,
		portalContext,
		onOpenChange,
		closeOnFocusOut,
		restoreFocus,
		getTabbableContent,
		isUntrappedTypeableCombobox,
		getNodeId,
		orderRef,
		dataRef
	]);
	const beforeGuardRef = import_react$20.useRef(null);
	const afterGuardRef = import_react$20.useRef(null);
	const mergedBeforeGuardRef = useLiteMergeRefs([beforeGuardRef, portalContext == null ? void 0 : portalContext.beforeInsideRef]);
	const mergedAfterGuardRef = useLiteMergeRefs([afterGuardRef, portalContext == null ? void 0 : portalContext.afterInsideRef]);
	import_react$20.useEffect(() => {
		var _portalContext$portal, _ancestors$find;
		if (disabled) return;
		if (!floating) return;
		const portalNodes = Array.from((portalContext == null || (_portalContext$portal = portalContext.portalNode) == null ? void 0 : _portalContext$portal.querySelectorAll("[" + createAttribute("portal") + "]")) || []);
		const rootAncestorComboboxDomReference = (_ancestors$find = (tree ? getNodeAncestors(tree.nodesRef.current, getNodeId()) : []).find((node) => {
			var _node$context6;
			return isTypeableCombobox(((_node$context6 = node.context) == null ? void 0 : _node$context6.elements.domReference) || null);
		})) == null || (_ancestors$find = _ancestors$find.context) == null ? void 0 : _ancestors$find.elements.domReference;
		const insideElements = [
			floating,
			rootAncestorComboboxDomReference,
			...portalNodes,
			...getInsideElements(),
			startDismissButtonRef.current,
			endDismissButtonRef.current,
			beforeGuardRef.current,
			afterGuardRef.current,
			portalContext == null ? void 0 : portalContext.beforeOutsideRef.current,
			portalContext == null ? void 0 : portalContext.afterOutsideRef.current,
			orderRef.current.includes("reference") || isUntrappedTypeableCombobox ? domReference : null
		].filter((x) => x != null);
		const cleanup = modal || isUntrappedTypeableCombobox ? markOthers(insideElements, !useInert, useInert) : markOthers(insideElements);
		return () => {
			cleanup();
		};
	}, [
		disabled,
		domReference,
		floating,
		modal,
		orderRef,
		portalContext,
		isUntrappedTypeableCombobox,
		guards,
		useInert,
		tree,
		getNodeId,
		getInsideElements
	]);
	index$1(() => {
		if (disabled || !isHTMLElement(floatingFocusElement)) return;
		const previouslyFocusedElement = activeElement(getDocument$1(floatingFocusElement));
		queueMicrotask(() => {
			const focusableElements = getTabbableElements(floatingFocusElement);
			const initialFocusValue = initialFocusRef.current;
			const elToFocus = (typeof initialFocusValue === "number" ? focusableElements[initialFocusValue] : initialFocusValue.current) || floatingFocusElement;
			const focusAlreadyInsideFloatingEl = contains$1(floatingFocusElement, previouslyFocusedElement);
			if (!ignoreInitialFocus && !focusAlreadyInsideFloatingEl && open) enqueueFocus(elToFocus, { preventScroll: elToFocus === floatingFocusElement });
		});
	}, [
		disabled,
		open,
		floatingFocusElement,
		ignoreInitialFocus,
		getTabbableElements,
		initialFocusRef
	]);
	index$1(() => {
		if (disabled || !floatingFocusElement) return;
		const doc = getDocument$1(floatingFocusElement);
		addPreviouslyFocusedElement(activeElement(doc));
		function onOpenChange(_ref) {
			let { reason, event, nested } = _ref;
			if (["hover", "safe-polygon"].includes(reason) && event.type === "mouseleave") preventReturnFocusRef.current = true;
			if (reason !== "outside-press") return;
			if (nested) preventReturnFocusRef.current = false;
			else if (isVirtualClick(event) || isVirtualPointerEvent(event)) preventReturnFocusRef.current = false;
			else {
				let isPreventScrollSupported = false;
				document.createElement("div").focus({ get preventScroll() {
					isPreventScrollSupported = true;
					return false;
				} });
				if (isPreventScrollSupported) preventReturnFocusRef.current = false;
				else preventReturnFocusRef.current = true;
			}
		}
		events.on("openchange", onOpenChange);
		const fallbackEl = doc.createElement("span");
		fallbackEl.setAttribute("tabindex", "-1");
		fallbackEl.setAttribute("aria-hidden", "true");
		Object.assign(fallbackEl.style, HIDDEN_STYLES);
		if (isInsidePortal && domReference) domReference.insertAdjacentElement("afterend", fallbackEl);
		function getReturnElement() {
			if (typeof returnFocusRef.current === "boolean") {
				const el = domReference || getPreviouslyFocusedElement();
				return el && el.isConnected ? el : fallbackEl;
			}
			return returnFocusRef.current.current || fallbackEl;
		}
		return () => {
			events.off("openchange", onOpenChange);
			const activeEl = activeElement(doc);
			const isFocusInsideFloatingTree = contains$1(floating, activeEl) || tree && getNodeChildren$1(tree.nodesRef.current, getNodeId(), false).some((node) => {
				var _node$context7;
				return contains$1((_node$context7 = node.context) == null ? void 0 : _node$context7.elements.floating, activeEl);
			});
			const returnElement = getReturnElement();
			queueMicrotask(() => {
				const tabbableReturnElement = getFirstTabbableElement(returnElement);
				if (returnFocusRef.current && !preventReturnFocusRef.current && isHTMLElement(tabbableReturnElement) && (tabbableReturnElement !== activeEl && activeEl !== doc.body ? isFocusInsideFloatingTree : true)) tabbableReturnElement.focus({ preventScroll: true });
				fallbackEl.remove();
			});
		};
	}, [
		disabled,
		floating,
		floatingFocusElement,
		returnFocusRef,
		dataRef,
		events,
		tree,
		isInsidePortal,
		domReference,
		getNodeId
	]);
	import_react$20.useEffect(() => {
		queueMicrotask(() => {
			preventReturnFocusRef.current = false;
		});
		return () => {
			queueMicrotask(clearDisconnectedPreviouslyFocusedElements);
		};
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
	}, [
		disabled,
		portalContext,
		modal,
		open,
		onOpenChange,
		closeOnFocusOut,
		domReference
	]);
	index$1(() => {
		if (disabled) return;
		if (!floatingFocusElement) return;
		handleTabIndex(floatingFocusElement, orderRef);
	}, [
		disabled,
		floatingFocusElement,
		orderRef
	]);
	function renderDismissButton(location) {
		if (disabled || !visuallyHiddenDismiss || !modal) return null;
		return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(VisuallyHiddenDismiss, {
			ref: location === "start" ? startDismissButtonRef : endDismissButtonRef,
			onClick: (event) => onOpenChange(false, event.nativeEvent),
			children: typeof visuallyHiddenDismiss === "string" ? visuallyHiddenDismiss : "Dismiss"
		});
	}
	const shouldRenderGuards = !disabled && guards && (modal ? !isUntrappedTypeableCombobox : true) && (isInsidePortal || modal);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		shouldRenderGuards && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusGuard, {
			"data-type": "inside",
			ref: mergedBeforeGuardRef,
			onFocus: (event) => {
				if (modal) {
					const els = getTabbableElements();
					enqueueFocus(order[0] === "reference" ? els[0] : els[els.length - 1]);
				} else if (portalContext != null && portalContext.preserveTabOrder && portalContext.portalNode) {
					preventReturnFocusRef.current = false;
					if (isOutsideEvent(event, portalContext.portalNode)) getNextTabbable(domReference)?.focus();
					else {
						var _portalContext$before;
						(_portalContext$before = portalContext.beforeOutsideRef.current) == null || _portalContext$before.focus();
					}
				}
			}
		}),
		!isUntrappedTypeableCombobox && renderDismissButton("start"),
		children,
		renderDismissButton("end"),
		shouldRenderGuards && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusGuard, {
			"data-type": "inside",
			ref: mergedAfterGuardRef,
			onFocus: (event) => {
				if (modal) enqueueFocus(getTabbableElements()[0]);
				else if (portalContext != null && portalContext.preserveTabOrder && portalContext.portalNode) {
					if (closeOnFocusOut) preventReturnFocusRef.current = true;
					if (isOutsideEvent(event, portalContext.portalNode)) getPreviousTabbable(domReference)?.focus();
					else {
						var _portalContext$afterO;
						(_portalContext$afterO = portalContext.afterOutsideRef.current) == null || _portalContext$afterO.focus();
					}
				}
			}
		})
	] });
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
/**
* Opens or closes the floating element when clicking the reference element.
* @see https://floating-ui.com/docs/useClick
*/
function useClick(context, props) {
	if (props === void 0) props = {};
	const { open, onOpenChange, dataRef, elements: { domReference } } = context;
	const { enabled = true, event: eventOption = "click", toggle = true, ignoreMouse = false, keyboardHandlers = true, stickIfOpen = true } = props;
	const pointerTypeRef = import_react$20.useRef();
	const didKeyDownRef = import_react$20.useRef(false);
	const reference = import_react$20.useMemo(() => ({
		onPointerDown(event) {
			pointerTypeRef.current = event.pointerType;
		},
		onMouseDown(event) {
			const pointerType = pointerTypeRef.current;
			if (event.button !== 0) return;
			if (eventOption === "click") return;
			if (isMouseLikePointerType(pointerType, true) && ignoreMouse) return;
			if (open && toggle && (dataRef.current.openEvent && stickIfOpen ? dataRef.current.openEvent.type === "mousedown" : true)) onOpenChange(false, event.nativeEvent, "click");
			else {
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
			if (open && toggle && (dataRef.current.openEvent && stickIfOpen ? dataRef.current.openEvent.type === "click" : true)) onOpenChange(false, event.nativeEvent, "click");
			else onOpenChange(true, event.nativeEvent, "click");
		},
		onKeyDown(event) {
			pointerTypeRef.current = void 0;
			if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event)) return;
			if (event.key === " " && !isSpaceIgnored(domReference)) {
				event.preventDefault();
				didKeyDownRef.current = true;
			}
			if (isAnchorTarget(event)) return;
			if (event.key === "Enter") {
				if (open && toggle) onOpenChange(false, event.nativeEvent, "click");
				else onOpenChange(true, event.nativeEvent, "click");
			}
		},
		onKeyUp(event) {
			if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event) || isSpaceIgnored(domReference)) return;
			if (event.key === " " && didKeyDownRef.current) {
				didKeyDownRef.current = false;
				if (open && toggle) onOpenChange(false, event.nativeEvent, "click");
				else onOpenChange(true, event.nativeEvent, "click");
			}
		}
	}), [
		dataRef,
		domReference,
		eventOption,
		ignoreMouse,
		keyboardHandlers,
		onOpenChange,
		open,
		stickIfOpen,
		toggle
	]);
	return import_react$20.useMemo(() => enabled ? { reference } : {}, [enabled, reference]);
}
/**
* Closes the floating element when a dismissal is requested — by default, when
* the user presses the `escape` key or outside of the floating element.
* @see https://floating-ui.com/docs/useDismiss
*/
function useDismiss(context, props) {
	if (props === void 0) props = {};
	const { open, onOpenChange, elements, dataRef } = context;
	const { enabled = true, escapeKey = true, outsidePress: unstable_outsidePress = true, outsidePressEvent = "pointerdown", referencePress = false, referencePressEvent = "pointerdown", ancestorScroll = false, bubbles, capture } = props;
	const tree = useFloatingTree();
	const outsidePressFn = useEffectEvent(typeof unstable_outsidePress === "function" ? unstable_outsidePress : () => false);
	const outsidePress = typeof unstable_outsidePress === "function" ? outsidePressFn : unstable_outsidePress;
	const endedOrStartedInsideRef = import_react$20.useRef(false);
	const { escapeKey: escapeKeyBubbles, outsidePress: outsidePressBubbles } = normalizeProp(bubbles);
	const { escapeKey: escapeKeyCapture, outsidePress: outsidePressCapture } = normalizeProp(capture);
	const isComposingRef = import_react$20.useRef(false);
	const closeOnEscapeKeyDown = useEffectEvent((event) => {
		var _dataRef$current$floa;
		if (!open || !enabled || !escapeKey || event.key !== "Escape") return;
		if (isComposingRef.current) return;
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
				if (!shouldDismiss) return;
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
		const insideReactTree = dataRef.current.insideReactTree;
		dataRef.current.insideReactTree = false;
		const endedOrStartedInside = endedOrStartedInsideRef.current;
		endedOrStartedInsideRef.current = false;
		if (outsidePressEvent === "click" && endedOrStartedInside) return;
		if (insideReactTree) return;
		if (typeof outsidePress === "function" && !outsidePress(event)) return;
		const target = getTarget$1(event);
		const inertSelector = "[" + createAttribute("inert") + "]";
		const markers = getDocument$1(elements.floating).querySelectorAll(inertSelector);
		let targetRootAncestor = isElement(target) ? target : null;
		while (targetRootAncestor && !isLastTraversableNode(targetRootAncestor)) {
			const nextParent = getParentNode(targetRootAncestor);
			if (isLastTraversableNode(nextParent) || !isElement(nextParent)) break;
			targetRootAncestor = nextParent;
		}
		if (markers.length && isElement(target) && !isRootElement(target) && !contains$1(target, elements.floating) && Array.from(markers).every((marker) => !contains$1(targetRootAncestor, marker))) return;
		if (isHTMLElement(target) && floating) {
			const lastTraversableNode = isLastTraversableNode(target);
			const style = getComputedStyle$1(target);
			const scrollRe = /auto|scroll/;
			const isScrollableX = lastTraversableNode || scrollRe.test(style.overflowX);
			const isScrollableY = lastTraversableNode || scrollRe.test(style.overflowY);
			const canScrollX = isScrollableX && target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
			const canScrollY = isScrollableY && target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
			const isRTL = style.direction === "rtl";
			const pressedVerticalScrollbar = canScrollY && (isRTL ? event.offsetX <= target.offsetWidth - target.clientWidth : event.offsetX > target.clientWidth);
			const pressedHorizontalScrollbar = canScrollX && event.offsetY > target.clientHeight;
			if (pressedVerticalScrollbar || pressedHorizontalScrollbar) return;
		}
		const nodeId = (_dataRef$current$floa2 = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa2.nodeId;
		const targetIsInsideChildren = tree && getNodeChildren$1(tree.nodesRef.current, nodeId).some((node) => {
			var _node$context;
			return isEventTargetWithin(event, (_node$context = node.context) == null ? void 0 : _node$context.elements.floating);
		});
		if (isEventTargetWithin(event, elements.floating) || isEventTargetWithin(event, elements.domReference) || targetIsInsideChildren) return;
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
			if (!shouldDismiss) return;
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
	import_react$20.useEffect(() => {
		if (!open || !enabled) return;
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
			compositionTimeout = window.setTimeout(() => {
				isComposingRef.current = false;
			}, isWebKit() ? 5 : 0);
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
			if (isElement(elements.domReference)) ancestors = getOverflowAncestors(elements.domReference);
			if (isElement(elements.floating)) ancestors = ancestors.concat(getOverflowAncestors(elements.floating));
			if (!isElement(elements.reference) && elements.reference && elements.reference.contextElement) ancestors = ancestors.concat(getOverflowAncestors(elements.reference.contextElement));
		}
		ancestors = ancestors.filter((ancestor) => {
			var _doc$defaultView;
			return ancestor !== ((_doc$defaultView = doc.defaultView) == null ? void 0 : _doc$defaultView.visualViewport);
		});
		ancestors.forEach((ancestor) => {
			ancestor.addEventListener("scroll", onScroll, { passive: true });
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
	}, [
		dataRef,
		elements,
		escapeKey,
		outsidePress,
		outsidePressEvent,
		open,
		onOpenChange,
		ancestorScroll,
		enabled,
		escapeKeyBubbles,
		outsidePressBubbles,
		closeOnEscapeKeyDown,
		escapeKeyCapture,
		closeOnEscapeKeyDownCapture,
		closeOnPressOutside,
		outsidePressCapture,
		closeOnPressOutsideCapture
	]);
	import_react$20.useEffect(() => {
		dataRef.current.insideReactTree = false;
	}, [
		dataRef,
		outsidePress,
		outsidePressEvent
	]);
	const reference = import_react$20.useMemo(() => ({
		onKeyDown: closeOnEscapeKeyDown,
		...referencePress && {
			[bubbleHandlerKeys[referencePressEvent]]: (event) => {
				onOpenChange(false, event.nativeEvent, "reference-press");
			},
			...referencePressEvent !== "click" && { onClick(event) {
				onOpenChange(false, event.nativeEvent, "reference-press");
			} }
		}
	}), [
		closeOnEscapeKeyDown,
		onOpenChange,
		referencePress,
		referencePressEvent
	]);
	const floating = import_react$20.useMemo(() => {
		function setMouseDownOrUpInside(event) {
			if (event.button !== 0) return;
			endedOrStartedInsideRef.current = true;
		}
		return {
			onKeyDown: closeOnEscapeKeyDown,
			onMouseDown: setMouseDownOrUpInside,
			onMouseUp: setMouseDownOrUpInside,
			[captureHandlerKeys[outsidePressEvent]]: () => {
				dataRef.current.insideReactTree = true;
			}
		};
	}, [
		closeOnEscapeKeyDown,
		outsidePressEvent,
		dataRef
	]);
	return import_react$20.useMemo(() => enabled ? {
		reference,
		floating
	} : {}, [
		enabled,
		reference,
		floating
	]);
}
function useFloatingRootContext(options) {
	const { open = false, onOpenChange: onOpenChangeProp, elements: elementsProp } = options;
	const floatingId = useId();
	const dataRef = import_react$20.useRef({});
	const [events] = import_react$20.useState(() => createEventEmitter());
	const nested = useFloatingParentNodeId() != null;
	const [positionReference, setPositionReference] = import_react$20.useState(elementsProp.reference);
	const onOpenChange = useEffectEvent((open, event, reason) => {
		dataRef.current.openEvent = open ? event : void 0;
		events.emit("openchange", {
			open,
			event,
			reason,
			nested
		});
		onOpenChangeProp?.(open, event, reason);
	});
	const refs = import_react$20.useMemo(() => ({ setPositionReference }), []);
	const elements = import_react$20.useMemo(() => ({
		reference: positionReference || elementsProp.reference || null,
		floating: elementsProp.floating || null,
		domReference: elementsProp.reference
	}), [
		positionReference,
		elementsProp.reference,
		elementsProp.floating
	]);
	return import_react$20.useMemo(() => ({
		dataRef,
		open,
		onOpenChange,
		elements,
		events,
		floatingId,
		refs
	}), [
		open,
		onOpenChange,
		elements,
		events,
		floatingId,
		refs
	]);
}
/**
* Provides data to position a floating element and context to add interactions.
* @see https://floating-ui.com/docs/useFloating
*/
function useFloating(options) {
	if (options === void 0) options = {};
	const { nodeId } = options;
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
	const [_domReference, setDomReference] = import_react$20.useState(null);
	const [positionReference, _setPositionReference] = import_react$20.useState(null);
	const domReference = (computedElements == null ? void 0 : computedElements.domReference) || _domReference;
	const domReferenceRef = import_react$20.useRef(null);
	const tree = useFloatingTree();
	index$1(() => {
		if (domReference) domReferenceRef.current = domReference;
	}, [domReference]);
	const position = useFloating$1({
		...options,
		elements: {
			...computedElements,
			...positionReference && { reference: positionReference }
		}
	});
	const setPositionReference = import_react$20.useCallback((node) => {
		const computedPositionReference = isElement(node) ? {
			getBoundingClientRect: () => node.getBoundingClientRect(),
			getClientRects: () => node.getClientRects(),
			contextElement: node
		} : node;
		_setPositionReference(computedPositionReference);
		position.refs.setReference(computedPositionReference);
	}, [position.refs]);
	const setReference = import_react$20.useCallback((node) => {
		if (isElement(node) || node === null) {
			domReferenceRef.current = node;
			setDomReference(node);
		}
		if (isElement(position.refs.reference.current) || position.refs.reference.current === null || node !== null && !isElement(node)) position.refs.setReference(node);
	}, [position.refs]);
	const refs = import_react$20.useMemo(() => ({
		...position.refs,
		setReference,
		setPositionReference,
		domReference: domReferenceRef
	}), [
		position.refs,
		setReference,
		setPositionReference
	]);
	const elements = import_react$20.useMemo(() => ({
		...position.elements,
		domReference
	}), [position.elements, domReference]);
	const context = import_react$20.useMemo(() => ({
		...position,
		...rootContext,
		refs,
		elements,
		nodeId
	}), [
		position,
		refs,
		elements,
		nodeId,
		rootContext
	]);
	index$1(() => {
		rootContext.dataRef.current.floatingContext = context;
		const node = tree == null ? void 0 : tree.nodesRef.current.find((node) => node.id === nodeId);
		if (node) node.context = context;
	});
	return import_react$20.useMemo(() => ({
		...position,
		context,
		refs,
		elements
	}), [
		position,
		refs,
		elements,
		context
	]);
}
function isMacSafari() {
	return isMac() && isSafari();
}
/**
* Opens the floating element while the reference element has focus, like CSS
* `:focus`.
* @see https://floating-ui.com/docs/useFocus
*/
function useFocus(context, props) {
	if (props === void 0) props = {};
	const { open, onOpenChange, events, dataRef, elements } = context;
	const { enabled = true, visibleOnly = true } = props;
	const blockFocusRef = import_react$20.useRef(false);
	const timeoutRef = import_react$20.useRef(-1);
	const keyboardModalityRef = import_react$20.useRef(true);
	import_react$20.useEffect(() => {
		if (!enabled) return;
		const win = getWindow(elements.domReference);
		function onBlur() {
			if (!open && isHTMLElement(elements.domReference) && elements.domReference === activeElement(getDocument$1(elements.domReference))) blockFocusRef.current = true;
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
	}, [
		elements.domReference,
		open,
		enabled
	]);
	import_react$20.useEffect(() => {
		if (!enabled) return;
		function onOpenChange(_ref) {
			let { reason } = _ref;
			if (reason === "reference-press" || reason === "escape-key") blockFocusRef.current = true;
		}
		events.on("openchange", onOpenChange);
		return () => {
			events.off("openchange", onOpenChange);
		};
	}, [events, enabled]);
	import_react$20.useEffect(() => {
		return () => {
			clearTimeoutIfSet(timeoutRef);
		};
	}, []);
	const reference = import_react$20.useMemo(() => ({
		onMouseLeave() {
			blockFocusRef.current = false;
		},
		onFocus(event) {
			if (blockFocusRef.current) return;
			const target = getTarget$1(event.nativeEvent);
			if (visibleOnly && isElement(target)) {
				if (isMacSafari() && !event.relatedTarget) {
					if (!keyboardModalityRef.current && !isTypeableElement(target)) return;
				} else if (!matchesFocusVisible(target)) return;
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
				if (contains$1((_dataRef$current$floa = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa.refs.floating.current, activeEl) || contains$1(elements.domReference, activeEl) || movedToFocusGuard) return;
				onOpenChange(false, nativeEvent, "focus");
			});
		}
	}), [
		dataRef,
		elements.domReference,
		onOpenChange,
		visibleOnly
	]);
	return import_react$20.useMemo(() => enabled ? { reference } : {}, [enabled, reference]);
}
function mergeProps(userProps, propsList, elementKey) {
	const map = /* @__PURE__ */ new Map();
	const isItem = elementKey === "item";
	let domUserProps = userProps;
	if (isItem && userProps) {
		const { [ACTIVE_KEY]: _, [SELECTED_KEY]: __, ...validProps } = userProps;
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
			if (typeof propsOrGetProps === "function") return userProps ? propsOrGetProps(userProps) : null;
			return propsOrGetProps;
		}).concat(userProps).reduce((acc, props) => {
			if (!props) return acc;
			Object.entries(props).forEach((_ref) => {
				let [key, value] = _ref;
				if (isItem && [ACTIVE_KEY, SELECTED_KEY].includes(key)) return;
				if (key.indexOf("on") === 0) {
					if (!map.has(key)) map.set(key, []);
					if (typeof value === "function") {
						var _map$get;
						(_map$get = map.get(key)) == null || _map$get.push(value);
						acc[key] = function() {
							var _map$get2;
							for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
							return (_map$get2 = map.get(key)) == null ? void 0 : _map$get2.map((fn) => fn(...args)).find((val) => val !== void 0);
						};
					}
				} else acc[key] = value;
			});
			return acc;
		}, {})
	};
}
/**
* Merges an array of interaction hooks' props into prop getters, allowing
* event handler functions to be composed together without overwriting one
* another.
* @see https://floating-ui.com/docs/useInteractions
*/
function useInteractions(propsList) {
	if (propsList === void 0) propsList = [];
	const referenceDeps = propsList.map((key) => key == null ? void 0 : key.reference);
	const floatingDeps = propsList.map((key) => key == null ? void 0 : key.floating);
	const itemDeps = propsList.map((key) => key == null ? void 0 : key.item);
	const getReferenceProps = import_react$20.useCallback((userProps) => mergeProps(userProps, propsList, "reference"), referenceDeps);
	const getFloatingProps = import_react$20.useCallback((userProps) => mergeProps(userProps, propsList, "floating"), floatingDeps);
	const getItemProps = import_react$20.useCallback((userProps) => mergeProps(userProps, propsList, "item"), itemDeps);
	return import_react$20.useMemo(() => ({
		getReferenceProps,
		getFloatingProps,
		getItemProps
	}), [
		getReferenceProps,
		getFloatingProps,
		getItemProps
	]);
}
function doSwitch(orientation, vertical, horizontal) {
	switch (orientation) {
		case "vertical": return vertical;
		case "horizontal": return horizontal;
		default: return vertical || horizontal;
	}
}
function isMainOrientationKey(key, orientation) {
	return doSwitch(orientation, key === ARROW_UP || key === ARROW_DOWN, key === ARROW_LEFT || key === ARROW_RIGHT);
}
function isMainOrientationToEndKey(key, orientation, rtl) {
	return doSwitch(orientation, key === ARROW_DOWN, rtl ? key === ARROW_LEFT : key === ARROW_RIGHT) || key === "Enter" || key === " " || key === "";
}
function isCrossOrientationOpenKey(key, orientation, rtl) {
	return doSwitch(orientation, rtl ? key === ARROW_LEFT : key === ARROW_RIGHT, key === ARROW_DOWN);
}
function isCrossOrientationCloseKey(key, orientation, rtl, cols) {
	const vertical = rtl ? key === ARROW_RIGHT : key === ARROW_LEFT;
	const horizontal = key === ARROW_UP;
	if (orientation === "both" || orientation === "horizontal" && cols && cols > 1) return key === ESCAPE;
	return doSwitch(orientation, vertical, horizontal);
}
/**
* Adds arrow key-based navigation of a list of items, either using real DOM
* focus or virtual focus.
* @see https://floating-ui.com/docs/useListNavigation
*/
function useListNavigation(context, props) {
	const { open, onOpenChange, elements, floatingId } = context;
	const { listRef, activeIndex, onNavigate: unstable_onNavigate = () => {}, enabled = true, selectedIndex = null, allowEscape = false, loop = false, nested = false, rtl = false, virtual = false, focusItemOnOpen = "auto", focusItemOnHover = true, openOnArrowKeyDown = true, disabledIndices = void 0, orientation = "vertical", parentOrientation, cols = 1, scrollItemIntoView = true, virtualItemRef, itemSizes, dense = false } = props;
	const floatingFocusElementRef = useLatestRef$1(getFloatingFocusElement(elements.floating));
	const parentId = useFloatingParentNodeId();
	const tree = useFloatingTree();
	index$1(() => {
		context.dataRef.current.orientation = orientation;
	}, [context, orientation]);
	const onNavigate = useEffectEvent(() => {
		unstable_onNavigate(indexRef.current === -1 ? null : indexRef.current);
	});
	const typeableComboboxReference = isTypeableCombobox(elements.domReference);
	const focusItemOnOpenRef = import_react$20.useRef(focusItemOnOpen);
	const indexRef = import_react$20.useRef(selectedIndex != null ? selectedIndex : -1);
	const keyRef = import_react$20.useRef(null);
	const isPointerModalityRef = import_react$20.useRef(true);
	const previousOnNavigateRef = import_react$20.useRef(onNavigate);
	const previousMountedRef = import_react$20.useRef(!!elements.floating);
	const previousOpenRef = import_react$20.useRef(open);
	const forceSyncFocusRef = import_react$20.useRef(false);
	const forceScrollIntoViewRef = import_react$20.useRef(false);
	const disabledIndicesRef = useLatestRef$1(disabledIndices);
	const latestOpenRef = useLatestRef$1(open);
	const scrollItemIntoViewRef = useLatestRef$1(scrollItemIntoView);
	const selectedIndexRef = useLatestRef$1(selectedIndex);
	const [activeId, setActiveId] = import_react$20.useState();
	const [virtualId, setVirtualId] = import_react$20.useState();
	const focusItem = useEffectEvent(() => {
		function runFocus(item) {
			if (virtual) {
				var _item$id;
				if ((_item$id = item.id) != null && _item$id.endsWith("-fui-option")) item.id = floatingId + "-" + Math.random().toString(16).slice(2, 10);
				setActiveId(item.id);
				tree?.events.emit("virtualfocus", item);
				if (virtualItemRef) virtualItemRef.current = item;
			} else enqueueFocus(item, {
				sync: forceSyncFocusRef.current,
				preventScroll: true
			});
		}
		const initialItem = listRef.current[indexRef.current];
		const forceScrollIntoView = forceScrollIntoViewRef.current;
		if (initialItem) runFocus(initialItem);
		(forceSyncFocusRef.current ? (v) => v() : requestAnimationFrame)(() => {
			const waitedItem = listRef.current[indexRef.current] || initialItem;
			if (!waitedItem) return;
			if (!initialItem) runFocus(waitedItem);
			const scrollIntoViewOptions = scrollItemIntoViewRef.current;
			if (scrollIntoViewOptions && item && (forceScrollIntoView || !isPointerModalityRef.current)) waitedItem.scrollIntoView == null || waitedItem.scrollIntoView(typeof scrollIntoViewOptions === "boolean" ? {
				block: "nearest",
				inline: "nearest"
			} : scrollIntoViewOptions);
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
	}, [
		enabled,
		open,
		elements.floating,
		selectedIndex,
		onNavigate
	]);
	index$1(() => {
		if (!enabled) return;
		if (!open) return;
		if (!elements.floating) return;
		if (activeIndex == null) {
			forceSyncFocusRef.current = false;
			if (selectedIndexRef.current != null) return;
			if (previousMountedRef.current) {
				indexRef.current = -1;
				focusItem();
			}
			if ((!previousOpenRef.current || !previousMountedRef.current) && focusItemOnOpenRef.current && (keyRef.current != null || focusItemOnOpenRef.current === true && keyRef.current == null)) {
				let runs = 0;
				const waitForListPopulated = () => {
					if (listRef.current[0] == null) {
						if (runs < 2) (runs ? requestAnimationFrame : queueMicrotask)(waitForListPopulated);
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
	}, [
		enabled,
		open,
		elements.floating,
		activeIndex,
		selectedIndexRef,
		nested,
		listRef,
		orientation,
		rtl,
		onNavigate,
		focusItem,
		disabledIndicesRef
	]);
	index$1(() => {
		var _nodes$find;
		if (!enabled || elements.floating || !tree || virtual || !previousMountedRef.current) return;
		const nodes = tree.nodesRef.current;
		const parent = (_nodes$find = nodes.find((node) => node.id === parentId)) == null || (_nodes$find = _nodes$find.context) == null ? void 0 : _nodes$find.elements.floating;
		const activeEl = activeElement(getDocument$1(elements.floating));
		const treeContainsActiveEl = nodes.some((node) => node.context && contains$1(node.context.elements.floating, activeEl));
		if (parent && !treeContainsActiveEl && isPointerModalityRef.current) parent.focus({ preventScroll: true });
	}, [
		enabled,
		elements.floating,
		tree,
		parentId,
		virtual
	]);
	index$1(() => {
		if (!enabled) return;
		if (!tree) return;
		if (!virtual) return;
		if (parentId) return;
		function handleVirtualFocus(item) {
			setVirtualId(item.id);
			if (virtualItemRef) virtualItemRef.current = item;
		}
		tree.events.on("virtualfocus", handleVirtualFocus);
		return () => {
			tree.events.off("virtualfocus", handleVirtualFocus);
		};
	}, [
		enabled,
		tree,
		virtual,
		parentId,
		virtualItemRef
	]);
	index$1(() => {
		previousOnNavigateRef.current = onNavigate;
		previousOpenRef.current = open;
		previousMountedRef.current = !!elements.floating;
	});
	index$1(() => {
		if (!open) {
			keyRef.current = null;
			focusItemOnOpenRef.current = focusItemOnOpen;
		}
	}, [open, focusItemOnOpen]);
	const hasActiveIndex = activeIndex != null;
	const item = import_react$20.useMemo(() => {
		function syncCurrentTarget(currentTarget) {
			if (!latestOpenRef.current) return;
			const index = listRef.current.indexOf(currentTarget);
			if (index !== -1 && indexRef.current !== index) {
				indexRef.current = index;
				onNavigate();
			}
		}
		return {
			onFocus(_ref) {
				let { currentTarget } = _ref;
				forceSyncFocusRef.current = true;
				syncCurrentTarget(currentTarget);
			},
			onClick: (_ref2) => {
				let { currentTarget } = _ref2;
				return currentTarget.focus({ preventScroll: true });
			},
			onMouseMove(_ref3) {
				let { currentTarget } = _ref3;
				forceSyncFocusRef.current = true;
				forceScrollIntoViewRef.current = false;
				if (focusItemOnHover) syncCurrentTarget(currentTarget);
			},
			onPointerLeave(_ref4) {
				let { pointerType } = _ref4;
				if (!isPointerModalityRef.current || pointerType === "touch") return;
				forceSyncFocusRef.current = true;
				if (!focusItemOnHover) return;
				indexRef.current = -1;
				onNavigate();
				if (!virtual) {
					var _floatingFocusElement;
					(_floatingFocusElement = floatingFocusElementRef.current) == null || _floatingFocusElement.focus({ preventScroll: true });
				}
			}
		};
	}, [
		latestOpenRef,
		floatingFocusElementRef,
		focusItemOnHover,
		listRef,
		onNavigate,
		virtual
	]);
	const getParentOrientation = import_react$20.useCallback(() => {
		var _tree$nodesRef$curren;
		return parentOrientation != null ? parentOrientation : tree == null || (_tree$nodesRef$curren = tree.nodesRef.current.find((node) => node.id === parentId)) == null || (_tree$nodesRef$curren = _tree$nodesRef$curren.context) == null || (_tree$nodesRef$curren = _tree$nodesRef$curren.dataRef) == null ? void 0 : _tree$nodesRef$curren.current.orientation;
	}, [
		parentId,
		tree,
		parentOrientation
	]);
	const commonOnKeyDown = useEffectEvent((event) => {
		isPointerModalityRef.current = false;
		forceSyncFocusRef.current = true;
		if (event.which === 229) return;
		if (!latestOpenRef.current && event.currentTarget === floatingFocusElementRef.current) return;
		if (nested && isCrossOrientationCloseKey(event.key, orientation, rtl, cols)) {
			if (!isMainOrientationKey(event.key, getParentOrientation())) stopEvent(event);
			onOpenChange(false, event.nativeEvent, "list-navigation");
			if (isHTMLElement(elements.domReference)) {
				if (virtual) tree?.events.emit("virtualfocus", elements.domReference);
				else elements.domReference.focus();
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
			const sizes = itemSizes || Array.from({ length: listRef.current.length }, () => ({
				width: 1,
				height: 1
			}));
			const cellMap = createGridCellMap(sizes, cols, dense);
			const minGridIndex = cellMap.findIndex((index) => index != null && !isListIndexDisabled(listRef, index, disabledIndices));
			const maxGridIndex = cellMap.reduce((foundIndex, index, cellIndex) => index != null && !isListIndexDisabled(listRef, index, disabledIndices) ? cellIndex : foundIndex, -1);
			const index = cellMap[getGridNavigatedIndex({ current: cellMap.map((itemIndex) => itemIndex != null ? listRef.current[itemIndex] : null) }, {
				event,
				orientation,
				loop,
				rtl,
				cols,
				disabledIndices: getGridCellIndices([...(typeof disabledIndices !== "function" ? disabledIndices : null) || listRef.current.map((_, index) => isListIndexDisabled(listRef, index, disabledIndices) ? index : void 0), void 0], cellMap),
				minIndex: minGridIndex,
				maxIndex: maxGridIndex,
				prevIndex: getGridCellIndexOfCorner(indexRef.current > maxIndex ? minIndex : indexRef.current, sizes, cellMap, cols, event.key === ARROW_DOWN ? "bl" : event.key === (rtl ? ARROW_LEFT : ARROW_RIGHT) ? "tr" : "tl"),
				stopEvent: true
			})];
			if (index != null) {
				indexRef.current = index;
				onNavigate();
			}
			if (orientation === "both") return;
		}
		if (isMainOrientationKey(event.key, orientation)) {
			stopEvent(event);
			if (open && !virtual && activeElement(event.currentTarget.ownerDocument) === event.currentTarget) {
				indexRef.current = isMainOrientationToEndKey(event.key, orientation, rtl) ? minIndex : maxIndex;
				onNavigate();
				return;
			}
			if (isMainOrientationToEndKey(event.key, orientation, rtl)) {
				if (loop) indexRef.current = currentIndex >= maxIndex ? allowEscape && currentIndex !== listRef.current.length ? -1 : minIndex : findNonDisabledListIndex(listRef, {
					startingIndex: currentIndex,
					disabledIndices
				});
				else indexRef.current = Math.min(maxIndex, findNonDisabledListIndex(listRef, {
					startingIndex: currentIndex,
					disabledIndices
				}));
			} else if (loop) indexRef.current = currentIndex <= minIndex ? allowEscape && currentIndex !== -1 ? listRef.current.length : maxIndex : findNonDisabledListIndex(listRef, {
				startingIndex: currentIndex,
				decrement: true,
				disabledIndices
			});
			else indexRef.current = Math.max(minIndex, findNonDisabledListIndex(listRef, {
				startingIndex: currentIndex,
				decrement: true,
				disabledIndices
			}));
			if (isIndexOutOfListBounds(listRef, indexRef.current)) indexRef.current = -1;
			onNavigate();
		}
	});
	const ariaActiveDescendantProp = import_react$20.useMemo(() => {
		return virtual && open && hasActiveIndex && { "aria-activedescendant": virtualId || activeId };
	}, [
		virtual,
		open,
		hasActiveIndex,
		virtualId,
		activeId
	]);
	const floating = import_react$20.useMemo(() => {
		return {
			"aria-orientation": orientation === "both" ? void 0 : orientation,
			...!typeableComboboxReference ? ariaActiveDescendantProp : {},
			onKeyDown: commonOnKeyDown,
			onPointerMove() {
				isPointerModalityRef.current = true;
			}
		};
	}, [
		ariaActiveDescendantProp,
		commonOnKeyDown,
		orientation,
		typeableComboboxReference
	]);
	const reference = import_react$20.useMemo(() => {
		function checkVirtualMouse(event) {
			if (focusItemOnOpen === "auto" && isVirtualClick(event.nativeEvent)) focusItemOnOpenRef.current = true;
		}
		function checkVirtualPointer(event) {
			focusItemOnOpenRef.current = focusItemOnOpen;
			if (focusItemOnOpen === "auto" && isVirtualPointerEvent(event.nativeEvent)) focusItemOnOpenRef.current = true;
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
							const dispatchItem = isCrossCloseKey && !isCurrentTarget ? (_deepestNode$context2 = deepestNode.context) == null ? void 0 : _deepestNode$context2.elements.domReference : isCrossOpenKey ? listRef.current.find((item) => (item == null ? void 0 : item.id) === activeId) : null;
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
				if (!open && !openOnArrowKeyDown && isArrowKey) return;
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
						} else onOpenChange(true, event.nativeEvent, "list-navigation");
					}
					return;
				}
				if (isMainKey) {
					if (selectedIndex != null) indexRef.current = selectedIndex;
					stopEvent(event);
					if (!open && openOnArrowKeyDown) onOpenChange(true, event.nativeEvent, "list-navigation");
					else commonOnKeyDown(event);
					if (open) onNavigate();
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
	}, [
		activeId,
		ariaActiveDescendantProp,
		cols,
		commonOnKeyDown,
		disabledIndicesRef,
		focusItemOnOpen,
		listRef,
		nested,
		onNavigate,
		onOpenChange,
		open,
		openOnArrowKeyDown,
		orientation,
		getParentOrientation,
		rtl,
		selectedIndex,
		tree,
		virtual,
		virtualItemRef
	]);
	return import_react$20.useMemo(() => enabled ? {
		reference,
		floating,
		item
	} : {}, [
		enabled,
		reference,
		floating,
		item
	]);
}
/**
* Adds base screen reader props to the reference and floating elements for a
* given floating element `role`.
* @see https://floating-ui.com/docs/useRole
*/
function useRole(context, props) {
	var _elements$domReferenc, _componentRoleToAriaR;
	if (props === void 0) props = {};
	const { open, elements, floatingId: defaultFloatingId } = context;
	const { enabled = true, role = "dialog" } = props;
	const defaultReferenceId = useId();
	const referenceId = ((_elements$domReferenc = elements.domReference) == null ? void 0 : _elements$domReferenc.id) || defaultReferenceId;
	const floatingId = import_react$20.useMemo(() => {
		var _getFloatingFocusElem;
		return ((_getFloatingFocusElem = getFloatingFocusElement(elements.floating)) == null ? void 0 : _getFloatingFocusElem.id) || defaultFloatingId;
	}, [elements.floating, defaultFloatingId]);
	const ariaRole = (_componentRoleToAriaR = componentRoleToAriaRoleMap.get(role)) != null ? _componentRoleToAriaR : role;
	const isNested = useFloatingParentNodeId() != null;
	const reference = import_react$20.useMemo(() => {
		if (ariaRole === "tooltip" || role === "label") return { ["aria-" + (role === "label" ? "labelledby" : "describedby")]: open ? floatingId : void 0 };
		return {
			"aria-expanded": open ? "true" : "false",
			"aria-haspopup": ariaRole === "alertdialog" ? "dialog" : ariaRole,
			"aria-controls": open ? floatingId : void 0,
			...ariaRole === "listbox" && { role: "combobox" },
			...ariaRole === "menu" && { id: referenceId },
			...ariaRole === "menu" && isNested && { role: "menuitem" },
			...role === "select" && { "aria-autocomplete": "none" },
			...role === "combobox" && { "aria-autocomplete": "list" }
		};
	}, [
		ariaRole,
		floatingId,
		isNested,
		open,
		referenceId,
		role
	]);
	const floating = import_react$20.useMemo(() => {
		const floatingProps = {
			id: floatingId,
			...ariaRole && { role: ariaRole }
		};
		if (ariaRole === "tooltip" || role === "label") return floatingProps;
		return {
			...floatingProps,
			...ariaRole === "menu" && { "aria-labelledby": referenceId }
		};
	}, [
		ariaRole,
		floatingId,
		referenceId,
		role
	]);
	const item = import_react$20.useCallback((_ref) => {
		let { active, selected } = _ref;
		const commonProps = {
			role: "option",
			...active && { id: floatingId + "-fui-option" }
		};
		switch (role) {
			case "select":
			case "combobox": return {
				...commonProps,
				"aria-selected": selected
			};
		}
		return {};
	}, [floatingId, role]);
	return import_react$20.useMemo(() => enabled ? {
		reference,
		floating,
		item
	} : {}, [
		enabled,
		reference,
		floating,
		item
	]);
}
function getNodeChildren(nodes, id, onlyOpenChildren) {
	if (onlyOpenChildren === void 0) onlyOpenChildren = true;
	return nodes.filter((node) => {
		var _node$context;
		return node.parentId === id && (!onlyOpenChildren || ((_node$context = node.context) == null ? void 0 : _node$context.open));
	}).flatMap((child) => [child, ...getNodeChildren(nodes, child.id, onlyOpenChildren)]);
}
function isPointInPolygon(point, polygon) {
	const [x, y] = point;
	let isInside = false;
	const length = polygon.length;
	for (let i = 0, j = length - 1; i < length; j = i++) {
		const [xi, yi] = polygon[i] || [0, 0];
		const [xj, yj] = polygon[j] || [0, 0];
		if (yi >= y !== yj >= y && x <= (xj - xi) * (y - yi) / (yj - yi) + xi) isInside = !isInside;
	}
	return isInside;
}
function isInside(point, rect) {
	return point[0] >= rect.x && point[0] <= rect.x + rect.width && point[1] >= rect.y && point[1] <= rect.y + rect.height;
}
/**
* Generates a safe polygon area that the user can traverse without closing the
* floating element once leaving the reference element.
* @see https://floating-ui.com/docs/useHover#safepolygon
*/
function safePolygon(options) {
	if (options === void 0) options = {};
	const { buffer = .5, blockPointerEvents = false, requireIntent = true } = options;
	const timeoutRef = { current: -1 };
	let hasLanded = false;
	let lastX = null;
	let lastY = null;
	let lastCursorTime = typeof performance !== "undefined" ? performance.now() : 0;
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
		const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / elapsedTime;
		lastX = x;
		lastY = y;
		lastCursorTime = currentTime;
		return speed;
	}
	const fn = (_ref) => {
		let { x, y, placement, elements, onClose, nodeId, tree } = _ref;
		return function onMouseMove(event) {
			function close() {
				clearTimeoutIfSet(timeoutRef);
				onClose();
			}
			clearTimeoutIfSet(timeoutRef);
			if (!elements.domReference || !elements.floating || placement == null || x == null || y == null) return;
			const { clientX, clientY } = event;
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
				if (!isLeave) return;
			}
			if (isOverReferenceEl) hasLanded = false;
			if (isOverReferenceEl && !isLeave) {
				hasLanded = true;
				return;
			}
			if (isLeave && isElement(event.relatedTarget) && contains(elements.floating, event.relatedTarget)) return;
			if (tree && getNodeChildren(tree.nodesRef.current, nodeId).length) return;
			if (side === "top" && y >= refRect.bottom - 1 || side === "bottom" && y <= refRect.top + 1 || side === "left" && x >= refRect.right - 1 || side === "right" && x <= refRect.left + 1) return close();
			let rectPoly = [];
			switch (side) {
				case "top":
					rectPoly = [
						[left, refRect.top + 1],
						[left, rect.bottom - 1],
						[right, rect.bottom - 1],
						[right, refRect.top + 1]
					];
					break;
				case "bottom":
					rectPoly = [
						[left, rect.top + 1],
						[left, refRect.bottom - 1],
						[right, refRect.bottom - 1],
						[right, rect.top + 1]
					];
					break;
				case "left":
					rectPoly = [
						[rect.right - 1, bottom],
						[rect.right - 1, top],
						[refRect.left + 1, top],
						[refRect.left + 1, bottom]
					];
					break;
				case "right": rectPoly = [
					[refRect.right - 1, bottom],
					[refRect.right - 1, top],
					[rect.left + 1, top],
					[rect.left + 1, bottom]
				];
			}
			function getPolygon(_ref2) {
				let [x, y] = _ref2;
				switch (side) {
					case "top": return [
						[isFloatingWider ? x + buffer / 2 : cursorLeaveFromRight ? x + buffer * 4 : x - buffer * 4, y + buffer + 1],
						[isFloatingWider ? x - buffer / 2 : cursorLeaveFromRight ? x + buffer * 4 : x - buffer * 4, y + buffer + 1],
						...[[rect.left, cursorLeaveFromRight ? rect.bottom - buffer : isFloatingWider ? rect.bottom - buffer : rect.top], [rect.right, cursorLeaveFromRight ? isFloatingWider ? rect.bottom - buffer : rect.top : rect.bottom - buffer]]
					];
					case "bottom": return [
						[isFloatingWider ? x + buffer / 2 : cursorLeaveFromRight ? x + buffer * 4 : x - buffer * 4, y - buffer],
						[isFloatingWider ? x - buffer / 2 : cursorLeaveFromRight ? x + buffer * 4 : x - buffer * 4, y - buffer],
						...[[rect.left, cursorLeaveFromRight ? rect.top + buffer : isFloatingWider ? rect.top + buffer : rect.bottom], [rect.right, cursorLeaveFromRight ? isFloatingWider ? rect.top + buffer : rect.bottom : rect.top + buffer]]
					];
					case "left": {
						const cursorPointOne = [x + buffer + 1, isFloatingTaller ? y + buffer / 2 : cursorLeaveFromBottom ? y + buffer * 4 : y - buffer * 4];
						const cursorPointTwo = [x + buffer + 1, isFloatingTaller ? y - buffer / 2 : cursorLeaveFromBottom ? y + buffer * 4 : y - buffer * 4];
						return [
							...[[cursorLeaveFromBottom ? rect.right - buffer : isFloatingTaller ? rect.right - buffer : rect.left, rect.top], [cursorLeaveFromBottom ? isFloatingTaller ? rect.right - buffer : rect.left : rect.right - buffer, rect.bottom]],
							cursorPointOne,
							cursorPointTwo
						];
					}
					case "right": return [
						[x - buffer, isFloatingTaller ? y + buffer / 2 : cursorLeaveFromBottom ? y + buffer * 4 : y - buffer * 4],
						[x - buffer, isFloatingTaller ? y - buffer / 2 : cursorLeaveFromBottom ? y + buffer * 4 : y - buffer * 4],
						...[[cursorLeaveFromBottom ? rect.left + buffer : isFloatingTaller ? rect.left + buffer : rect.right, rect.top], [cursorLeaveFromBottom ? isFloatingTaller ? rect.left + buffer : rect.right : rect.left + buffer, rect.bottom]]
					];
				}
			}
			if (isPointInPolygon([clientX, clientY], rectPoly)) return;
			if (hasLanded && !isOverReferenceRect) return close();
			if (!isLeave && requireIntent) {
				const cursorSpeed = getCursorSpeed(event.clientX, event.clientY);
				if (cursorSpeed !== null && cursorSpeed < .1) return close();
			}
			if (!isPointInPolygon([clientX, clientY], getPolygon([x, y]))) close();
			else if (!hasLanded && requireIntent) timeoutRef.current = window.setTimeout(close, 40);
		};
	};
	fn.__options = { blockPointerEvents };
	return fn;
}
var import_react$20, import_jsx_runtime, import_react_dom$3, FloatingListContext, FOCUSABLE_ATTRIBUTE, ACTIVE_KEY, SELECTED_KEY, ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ARROW_DOWN, CompositeContext, horizontalKeys, verticalKeys, allKeys, Composite, CompositeItem, SafeReact, serverHandoffComplete, count, genId, useId, FloatingNodeContext, FloatingTreeContext, useFloatingParentNodeId, useFloatingTree, safePolygonIdentifier, NOOP, FloatingDelayGroupContext, useDelayGroupContext, rafId, counters, uncontrolledElementsSet, markerMap, lockCount$1, supportsInert, correctElements, HIDDEN_STYLES, FocusGuard, HIDDEN_OWNER_STYLES, PortalContext, attr, usePortalContext, LIST_LIMIT, previouslyFocusedElements, VisuallyHiddenDismiss, bubbleHandlerKeys, captureHandlerKeys, normalizeProp, ESCAPE, componentRoleToAriaRoleMap;
function init_floating_ui_react() {
	return (init_floating_ui_react = __esmMin((() => {
		import_react$20 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_floating_ui_react_utils();
		import_jsx_runtime = require_jsx_runtime();
		init_floating_ui_utils_dom();
		init_index_esm();
		import_react_dom$3 = /* @__PURE__ */ __toESM(require_react_dom(), 1);
		init_floating_ui_react_dom();
		FloatingListContext = /*#__PURE__*/ import_react$20.createContext({
			register: () => {},
			unregister: () => {},
			map: /*#__PURE__*/ new Map(),
			elementsRef: { current: [] }
		});
		FOCUSABLE_ATTRIBUTE = "data-floating-ui-focusable";
		ACTIVE_KEY = "active";
		SELECTED_KEY = "selected";
		ARROW_LEFT = "ArrowLeft";
		ARROW_RIGHT = "ArrowRight";
		ARROW_UP = "ArrowUp";
		ARROW_DOWN = "ArrowDown";
		CompositeContext = /*#__PURE__*/ import_react$20.createContext({
			activeIndex: 0,
			onNavigate: () => {}
		});
		horizontalKeys = [ARROW_LEFT, ARROW_RIGHT];
		verticalKeys = [ARROW_UP, ARROW_DOWN];
		allKeys = [...horizontalKeys, ...verticalKeys];
		Composite = /*#__PURE__*/ import_react$20.forwardRef(function Composite(props, forwardedRef) {
			const { render, orientation = "both", loop = true, rtl = false, cols = 1, disabledIndices, activeIndex: externalActiveIndex, onNavigate: externalSetActiveIndex, itemSizes, dense = false, ...domProps } = props;
			const [internalActiveIndex, internalSetActiveIndex] = import_react$20.useState(0);
			const activeIndex = externalActiveIndex != null ? externalActiveIndex : internalActiveIndex;
			const onNavigate = useEffectEvent(externalSetActiveIndex != null ? externalSetActiveIndex : internalSetActiveIndex);
			const elementsRef = import_react$20.useRef([]);
			const renderElementProps = render && typeof render !== "function" ? render.props : {};
			const contextValue = import_react$20.useMemo(() => ({
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
					const sizes = itemSizes || Array.from({ length: elementsRef.current.length }, () => ({
						width: 1,
						height: 1
					}));
					const cellMap = createGridCellMap(sizes, cols, dense);
					const minGridIndex = cellMap.findIndex((index) => index != null && !isListIndexDisabled(elementsRef, index, disabledIndices));
					const maxGridIndex = cellMap.reduce((foundIndex, index, cellIndex) => index != null && !isListIndexDisabled(elementsRef, index, disabledIndices) ? cellIndex : foundIndex, -1);
					const maybeNextIndex = cellMap[getGridNavigatedIndex({ current: cellMap.map((itemIndex) => itemIndex ? elementsRef.current[itemIndex] : null) }, {
						event,
						orientation,
						loop,
						rtl,
						cols,
						disabledIndices: getGridCellIndices([...(typeof disabledIndices !== "function" ? disabledIndices : null) || elementsRef.current.map((_, index) => isListIndexDisabled(elementsRef, index, disabledIndices) ? index : void 0), void 0], cellMap),
						minIndex: minGridIndex,
						maxIndex: maxGridIndex,
						prevIndex: getGridCellIndexOfCorner(activeIndex > maxIndex ? minIndex : activeIndex, sizes, cellMap, cols, event.key === ARROW_DOWN ? "bl" : event.key === horizontalEndKey ? "tr" : "tl")
					})];
					if (maybeNextIndex != null) nextIndex = maybeNextIndex;
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
					if (loop && nextIndex === maxIndex && toEndKeys.includes(event.key)) nextIndex = minIndex;
					else if (loop && nextIndex === minIndex && toStartKeys.includes(event.key)) nextIndex = maxIndex;
					else nextIndex = findNonDisabledListIndex(elementsRef, {
						startingIndex: nextIndex,
						decrement: toStartKeys.includes(event.key),
						disabledIndices
					});
				}
				if (nextIndex !== activeIndex && !isIndexOutOfListBounds(elementsRef, nextIndex)) {
					var _elementsRef$current$;
					event.stopPropagation();
					if (preventedKeys.includes(event.key)) event.preventDefault();
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
			return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CompositeContext.Provider, {
				value: contextValue,
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingList, {
					elementsRef,
					children: renderJsx(render, computedProps)
				})
			});
		});
		CompositeItem = /*#__PURE__*/ import_react$20.forwardRef(function CompositeItem(props, forwardedRef) {
			const { render, ...domProps } = props;
			const renderElementProps = render && typeof render !== "function" ? render.props : {};
			const { activeIndex, onNavigate } = import_react$20.useContext(CompositeContext);
			const { ref, index } = useListItem();
			const mergedRef = useMergeRefs([
				ref,
				forwardedRef,
				renderElementProps.ref
			]);
			const isActive = activeIndex === index;
			return renderJsx(render, {
				...domProps,
				...renderElementProps,
				ref: mergedRef,
				tabIndex: isActive ? 0 : -1,
				"data-active": isActive ? "" : void 0,
				onFocus(e) {
					domProps.onFocus == null || domProps.onFocus(e);
					renderElementProps.onFocus == null || renderElementProps.onFocus(e);
					onNavigate(index);
				}
			});
		});
		SafeReact = { ...import_react$20 };
		serverHandoffComplete = false;
		count = 0;
		genId = () => "floating-ui-" + Math.random().toString(36).slice(2, 6) + count++;
		useId = SafeReact.useId || useFloatingId;
		FloatingNodeContext = /*#__PURE__*/ import_react$20.createContext(null);
		FloatingTreeContext = /*#__PURE__*/ import_react$20.createContext(null);
		useFloatingParentNodeId = () => {
			var _React$useContext;
			return ((_React$useContext = import_react$20.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
		};
		useFloatingTree = () => import_react$20.useContext(FloatingTreeContext);
		safePolygonIdentifier = /*#__PURE__*/ createAttribute("safe-polygon");
		NOOP = () => {};
		FloatingDelayGroupContext = /*#__PURE__*/ import_react$20.createContext({
			delay: 0,
			initialDelay: 0,
			timeoutMs: 0,
			currentId: null,
			setCurrentId: NOOP,
			setState: NOOP,
			isInstantPhase: false
		});
		useDelayGroupContext = () => import_react$20.useContext(FloatingDelayGroupContext);
		rafId = 0;
		counters = {
			inert: /*#__PURE__*/ new WeakMap(),
			"aria-hidden": /*#__PURE__*/ new WeakMap(),
			none: /*#__PURE__*/ new WeakMap()
		};
		uncontrolledElementsSet = /*#__PURE__*/ new WeakSet();
		markerMap = {};
		lockCount$1 = 0;
		supportsInert = () => typeof HTMLElement !== "undefined" && "inert" in HTMLElement.prototype;
		correctElements = (parent, targets) => targets.map((target) => {
			if (parent.contains(target)) return target;
			const correctedTarget = unwrapHost(target);
			if (parent.contains(correctedTarget)) return correctedTarget;
			return null;
		}).filter((x) => x != null);
		HIDDEN_STYLES = {
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
		FocusGuard = /*#__PURE__*/ import_react$20.forwardRef(function FocusGuard(props, ref) {
			const [role, setRole] = import_react$20.useState();
			index$1(() => {
				if (isSafari()) setRole("button");
			}, []);
			const restProps = {
				ref,
				tabIndex: 0,
				role,
				"aria-hidden": role ? void 0 : true,
				[createAttribute("focus-guard")]: "",
				style: HIDDEN_STYLES
			};
			return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
				...props,
				...restProps
			});
		});
		HIDDEN_OWNER_STYLES = {
			clipPath: "inset(50%)",
			position: "fixed",
			top: 0,
			left: 0
		};
		PortalContext = /*#__PURE__*/ import_react$20.createContext(null);
		attr = /*#__PURE__*/ createAttribute("portal");
		usePortalContext = () => import_react$20.useContext(PortalContext);
		LIST_LIMIT = 20;
		previouslyFocusedElements = [];
		VisuallyHiddenDismiss = /*#__PURE__*/ import_react$20.forwardRef(function VisuallyHiddenDismiss(props, ref) {
			return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("button", {
				...props,
				type: "button",
				ref,
				tabIndex: -1,
				style: HIDDEN_STYLES
			});
		});
		bubbleHandlerKeys = {
			pointerdown: "onPointerDown",
			mousedown: "onMouseDown",
			click: "onClick"
		};
		captureHandlerKeys = {
			pointerdown: "onPointerDownCapture",
			mousedown: "onMouseDownCapture",
			click: "onClickCapture"
		};
		normalizeProp = (normalizable) => {
			var _normalizable$escapeK, _normalizable$outside;
			return {
				escapeKey: typeof normalizable === "boolean" ? normalizable : (_normalizable$escapeK = normalizable == null ? void 0 : normalizable.escapeKey) != null ? _normalizable$escapeK : false,
				outsidePress: typeof normalizable === "boolean" ? normalizable : (_normalizable$outside = normalizable == null ? void 0 : normalizable.outsidePress) != null ? _normalizable$outside : true
			};
		};
		ESCAPE = "Escape";
		componentRoleToAriaRoleMap = /*#__PURE__*/ new Map([
			["select", "listbox"],
			["combobox", "listbox"],
			["label", false]
		]);
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Tooltip/Tooltip.js
var import_react$19, import_classnames$8, defaultTooltipDelay, useTooltip, Tooltip;
function init_Tooltip() {
	return (init_Tooltip = __esmMin((() => {
		import_react$19 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$8 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_floating_ui_react();
		init_Box(), init_Portal(), init_react(), init_useControlledState(), init_useId(), init_useStableCallback(), init_useMergedRefs();
		defaultTooltipDelay = {
			open: 200,
			close: 200
		};
		useTooltip = (options = {}) => {
			let uniqueId = useId$1();
			let { placement = "top", visible, onVisibleChange, middleware = {
				flip: true,
				shift: true
			}, autoUpdateOptions = {}, reference, ariaStrategy = "description", id = uniqueId, ...props } = options;
			let [open, onOpenChange] = useControlledState(false, visible, onVisibleChange);
			let syncWithControlledState = import_react$19.useCallback((element) => {
				queueMicrotask(() => {
					try {
						element?.togglePopover?.(open);
					} catch {}
				});
			}, [open]);
			let floating = useFloating({
				placement,
				open,
				onOpenChange,
				strategy: "fixed",
				whileElementsMounted: import_react$19.useMemo(() => open ? (...args) => autoUpdate(...args, autoUpdateOptions) : void 0, [autoUpdateOptions, open]),
				middleware: import_react$19.useMemo(() => [
					void 0 !== middleware.offset ? offset(middleware.offset) : offset(4),
					middleware.flip && flip({ padding: 4 }),
					middleware.shift && shift({ padding: 4 }),
					middleware.size && size({ padding: 4 }),
					middleware.autoPlacement && autoPlacement({ padding: 4 }),
					middleware.inline && inline(),
					middleware.hide && hide({ padding: 4 })
				].filter(Boolean), [middleware]),
				...reference && { elements: { reference } }
			});
			let ariaProps = import_react$19.useMemo(() => "description" === ariaStrategy ? { "aria-describedby": id } : "label" === ariaStrategy ? { "aria-labelledby": id } : {}, [ariaStrategy, id]);
			let { delay } = useDelayGroup(floating.context, { id: useId$1() });
			let interactions = useInteractions([
				useHover(floating.context, {
					delay: 0 !== delay ? delay : defaultTooltipDelay,
					handleClose: safePolygon({ buffer: -1 / 0 }),
					move: false
				}),
				useFocus(floating.context),
				useDismiss(floating.context, {
					referencePress: true,
					referencePressEvent: "click"
				})
			]);
			import_react$19.useEffect(() => {
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
						if ("function" == typeof value) reference.removeEventListener(domEventName(key), value);
						else if (value) reference.setAttribute(key, value);
						else reference.removeAttribute(key);
					});
				};
			}, [
				ariaProps,
				reference,
				interactions
			]);
			let getReferenceProps = import_react$19.useCallback((userProps) => interactions.getReferenceProps({
				...userProps,
				...ariaProps
			}), [interactions, ariaProps]);
			let floatingProps = import_react$19.useMemo(() => ({
				...interactions.getFloatingProps({
					hidden: !open,
					"aria-hidden": "true",
					...props,
					id
				}),
				popover: "manual"
			}), [
				interactions,
				props,
				id,
				open
			]);
			let _setFloating = useStableCallback(floating.refs.setFloating);
			let setFloating = import_react$19.useCallback((element) => {
				_setFloating(element);
				syncWithControlledState(element);
			}, [_setFloating, syncWithControlledState]);
			let setReference = useStableCallback(floating.refs.setReference);
			let setPositionReference = useStableCallback(floating.refs.setPositionReference);
			return import_react$19.useMemo(() => ({
				getReferenceProps,
				floatingProps,
				...floating,
				refs: {
					...floating.refs,
					setFloating,
					setReference,
					setPositionReference
				},
				floatingStyles: floating.context.open ? floating.floatingStyles : {}
			}), [
				getReferenceProps,
				floatingProps,
				floating,
				setFloating,
				setReference,
				setPositionReference
			]);
		};
		Tooltip = import_react$19.forwardRef((props, forwardedRef) => {
			let { content, children, portal = true, className, style, ...rest } = props;
			let tooltip = useTooltip(rest);
			let refs = useMergedRefs(tooltip.refs.setFloating, forwardedRef);
			return import_react$19.createElement(import_react$19.Fragment, null, cloneElementWithRef(children, (children) => ({
				...tooltip.getReferenceProps(children.props),
				ref: tooltip.refs.setReference
			})), "none" !== props.ariaStrategy || tooltip.context.open ? import_react$19.createElement(Portal, { portal }, import_react$19.createElement(Box, {
				className: (0, import_classnames$8.default)("iui-tooltip", className),
				ref: refs,
				style: {
					...tooltip.floatingStyles,
					...style
				},
				...tooltip.floatingProps
			}, content)) : null);
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/VisuallyHidden/VisuallyHidden.js
var import_react$18, import_classnames$7, VisuallyHidden, css;
function init_VisuallyHidden() {
	return (init_VisuallyHidden = __esmMin((() => {
		import_react$18 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$7 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_Box(), init_ShadowRoot(), init_HydrationProvider();
		VisuallyHidden = import_react$18.forwardRef((props, ref) => {
			let { as: asProp = "span", className, unhideOnFocus = true, children: childrenProp, ...rest } = props;
			let isHydrated = "hydrated" === useHydration();
			let children = [
				"div",
				"span",
				"p"
			].includes(asProp) ? import_react$18.createElement(import_react$18.Fragment, null, import_react$18.createElement(ShadowRoot$1, { css }, import_react$18.createElement("slot", null)), isHydrated && childrenProp) : childrenProp;
			return import_react$18.createElement(Box, {
				as: asProp,
				className: (0, import_classnames$7.default)("iui-visually-hidden", className),
				"data-iui-unhide-on-focus": unhideOnFocus ? true : void 0,
				ref,
				...rest
			}, children);
		});
		css = `
  :host(:where(:not([data-iui-unhide-on-focus]:is(:focus-within, :active)))) {
    clip-path: inset(50%) !important;
    overflow: hidden !important;
    position: absolute !important;
    white-space: nowrap !important;
    block-size: 1px !important;
    inline-size: 1px !important;
  }
`;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ButtonGroup/ButtonGroup.js
var import_react$17, import_classnames$6, ButtonGroupContext, ButtonGroup, BaseGroup, OverflowGroup, OverflowGroupContent;
function init_ButtonGroup() {
	return (init_ButtonGroup = __esmMin((() => {
		import_react$17 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$6 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_Box(), init_OverflowContainer();
		init_floating_ui_react();
		init_Tooltip();
		ButtonGroupContext = import_react$17.createContext(void 0);
		ButtonGroup = import_react$17.forwardRef((props, forwardedRef) => {
			let { children: childrenProp, overflowButton, overflowPlacement = "end", orientation = "horizontal", ...rest } = props;
			let children = import_react$17.useMemo(() => {
				if ("toolbar" !== props.role) return childrenProp;
				return import_react$17.Children.map(childrenProp, (child, index) => import_react$17.isValidElement(child) ? import_react$17.createElement(CompositeItem, {
					key: index,
					render: child
				}) : child);
			}, [childrenProp, props.role]);
			let node = overflowButton ? import_react$17.createElement(OverflowGroup, {
				orientation,
				overflowButton,
				overflowPlacement,
				ref: forwardedRef,
				...rest
			}, children) : import_react$17.createElement(BaseGroup, {
				orientation,
				ref: forwardedRef,
				...rest
			}, children);
			return import_react$17.createElement(FloatingDelayGroup, { delay: defaultTooltipDelay }, import_react$17.createElement(ButtonGroupContext.Provider, { value: orientation }, "toolbar" === props.role ? import_react$17.createElement(Composite, {
				orientation,
				render: node,
				disabledIndices: []
			}) : node));
		});
		BaseGroup = import_react$17.forwardRef((props, forwardedRef) => {
			let { orientation, className, ...rest } = props;
			return import_react$17.createElement(Box, {
				className: (0, import_classnames$6.default)("iui-button-group", className),
				"data-iui-orientation": "vertical" === orientation ? orientation : void 0,
				ref: forwardedRef,
				...rest
			});
		});
		OverflowGroup = import_react$17.forwardRef((props, forwardedRef) => {
			let { children: childrenProp, orientation, overflowButton, overflowPlacement, ...rest } = props;
			let items = import_react$17.useMemo(() => import_react$17.Children.toArray(childrenProp).filter(Boolean), [childrenProp]);
			return import_react$17.createElement(OverflowContainer, {
				as: BaseGroup,
				itemsCount: items.length,
				overflowOrientation: orientation,
				orientation,
				...rest,
				className: (0, import_classnames$6.default)({ "iui-button-group-overflow-x": !!overflowButton && "horizontal" === orientation }, props.className),
				ref: forwardedRef
			}, import_react$17.createElement(OverflowGroupContent, {
				overflowButton,
				overflowPlacement,
				items
			}));
		});
		OverflowGroupContent = (props) => {
			let { overflowButton, overflowPlacement, items } = props;
			let { visibleCount } = OverflowContainer.useContext();
			let overflowStart = "start" === overflowPlacement ? items.length - visibleCount : visibleCount - 1;
			if (!(visibleCount < items.length)) return items;
			return import_react$17.createElement(import_react$17.Fragment, null, overflowButton && "start" === overflowPlacement && overflowButton(overflowStart), "start" === overflowPlacement ? items.slice(overflowStart + 1) : items.slice(0, Math.max(0, overflowStart)), overflowButton && "end" === overflowPlacement && overflowButton(overflowStart));
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/Portal.js
var import_react$16, import_react_dom$2, PortalContainerContext, Portal, usePortalTo;
function init_Portal() {
	return (init_Portal = __esmMin((() => {
		import_react$16 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react_dom$2 = /* @__PURE__ */ __toESM(require_react_dom(), 1);
		init_useIsClient();
		PortalContainerContext = import_react$16.createContext(null);
		Portal = (props) => {
			let { portal = true, children } = props;
			let isClient = useIsClient();
			let portalTo = usePortalTo(portal);
			if (!isClient) return null;
			return portalTo ? import_react_dom$2.createPortal(children, portalTo) : children;
		};
		usePortalTo = (portal) => {
			let portalContainer = import_react$16.useContext(PortalContainerContext);
			if ("boolean" == typeof portal) return portal ? portalContainer : null;
			return ("function" == typeof portal.to ? portal.to() : portal.to) ?? portalContainer;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Toast/Toast.js
var import_react$15, import_classnames$5, Toast, ToastPresentation, useAnimateToastBasedOnVisibility;
function init_Toast() {
	return (init_Toast = __esmMin((() => {
		import_react$15 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$5 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_dom(), init_StatusIconMap(), init_SvgCloseSmall(), init_Box(), init_useSafeContext(), init_ButtonBase(), init_useMediaQuery(), init_useLatestRef();
		init_IconButton();
		init_Toaster();
		Toast = (props) => {
			let { content, category, type = "temporary", isVisible: isVisibleProp, link, duration = 7e3, hasCloseButton, onRemove, animateOutTo, domProps } = props;
			let closeTimeout = import_react$15.useRef(0);
			let { placement } = useSafeContext(ToasterStateContext).settings;
			let placementPosition = placement.startsWith("top") ? "top" : "bottom";
			let [visible, setVisible] = import_react$15.useState(isVisibleProp ?? true);
			let isVisible = isVisibleProp ?? visible;
			let [height, setHeight] = import_react$15.useState(0);
			let thisElement = import_react$15.useRef(null);
			let [margin, setMargin] = import_react$15.useState(0);
			let marginStyle = () => {
				if ("top" === placementPosition) return { marginBlockEnd: margin };
				return { marginBlockStart: margin };
			};
			import_react$15.useEffect(() => {
				if ("temporary" === type) setCloseTimeout(duration);
				return () => {
					clearCloseTimeout();
				};
			}, [duration, type]);
			import_react$15.useEffect(() => {
				if (!isVisible && !animateOutTo) setMargin(-height);
			}, [
				isVisible,
				animateOutTo,
				setMargin,
				height
			]);
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
				getWindow$1()?.clearTimeout(closeTimeout.current);
			};
			let onRef = (ref) => {
				if (ref) {
					let { height } = ref.getBoundingClientRect();
					setHeight(height);
				}
			};
			return useAnimateToastBasedOnVisibility(isVisible, {
				thisElement,
				animateOutTo,
				onRemove
			}) ? import_react$15.createElement(Box, {
				ref: thisElement,
				className: "iui-toast-all",
				style: {
					height,
					...marginStyle()
				}
			}, import_react$15.createElement("div", { ref: onRef }, import_react$15.createElement(ToastPresentation, {
				as: "div",
				category,
				content,
				link,
				type,
				hasCloseButton,
				onClose: close,
				...domProps?.toastProps,
				contentProps: domProps?.contentProps
			}))) : null;
		};
		ToastPresentation = import_react$15.forwardRef((props, forwardedRef) => {
			let { content, category, type = "temporary", link, hasCloseButton, onClose, className, contentProps, ...rest } = props;
			let StatusIcon = StatusIconMap[category];
			return import_react$15.createElement(Box, {
				className: (0, import_classnames$5.default)(`iui-toast iui-${category}`, className),
				ref: forwardedRef,
				...rest
			}, import_react$15.createElement(Box, { className: "iui-status-area" }, import_react$15.createElement(StatusIcon, { className: "iui-icon" })), import_react$15.createElement(Box, {
				as: "div",
				...contentProps,
				className: (0, import_classnames$5.default)("iui-message", contentProps?.className)
			}, content), link && import_react$15.createElement(ButtonBase, {
				...link,
				className: (0, import_classnames$5.default)("iui-anchor", "iui-toast-anchor", link.className),
				title: void 0,
				"data-iui-status": category,
				"data-iui-underline": true
			}, link.title), ("persisting" === type || hasCloseButton) && import_react$15.createElement(IconButton, {
				size: "small",
				styleType: "borderless",
				onClick: onClose,
				"aria-label": "Close"
			}, import_react$15.createElement(SvgCloseSmall, null)));
		});
		useAnimateToastBasedOnVisibility = (isVisible, args) => {
			let { thisElement, animateOutTo, onRemove } = args;
			let [shouldBeMounted, setShouldBeMounted] = import_react$15.useState(isVisible);
			let motionOk = useMediaQuery("(prefers-reduced-motion: no-preference)");
			let onRemoveRef = useLatestRef$2(onRemove);
			let [prevIsVisible, setPrevIsVisible] = import_react$15.useState(void 0);
			import_react$15.useEffect(() => {
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
					if (motionOk) animateOut()?.addEventListener("finish", () => {
						setShouldBeMounted(false);
						onRemoveRef.current?.();
					});
					else {
						setShouldBeMounted(false);
						onRemoveRef.current?.();
					}
				}
				function animateIn() {
					if (!motionOk) return;
					thisElement.current?.animate?.([{ transform: "translateY(15%)" }, { transform: "translateY(0)" }], {
						duration: 240,
						fill: "forwards"
					});
				}
				function animateOut() {
					if (null == thisElement.current || !motionOk) return;
					let { translateX, translateY } = calculateOutAnimation(thisElement.current);
					let animationDuration = animateOutTo ? 400 : 120;
					return thisElement.current?.animate?.([{
						transform: animateOutTo ? `scale(0.9) translate(${translateX}px,${translateY}px)` : "scale(0.9)",
						opacity: 0,
						transitionDuration: `${animationDuration}ms`,
						transitionTimingFunction: "cubic-bezier(0.4, 0, 1, 1)"
					}], {
						duration: animationDuration,
						iterations: 1,
						fill: "forwards"
					});
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
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Toast/Toaster.js
var import_react$14, import_classnames$4, useToaster, Toaster, ToastProvider, toastReducer, ToasterStateContext, ToasterDispatchContext, nextId;
function init_Toaster() {
	return (init_Toaster = __esmMin((() => {
		import_react$14 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$4 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_Box(), init_useSafeContext();
		init_Toast();
		useToaster = () => {
			let dispatch = useSafeContext(ToasterDispatchContext);
			return import_react$14.useMemo(() => {
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
					return { close: () => dispatch({
						type: "remove",
						id
					}) };
				};
				return {
					positive: showToast("positive"),
					informational: showToast("informational"),
					negative: showToast("negative"),
					warning: showToast("warning"),
					closeAll: () => {
						dispatch({ type: "close-all" });
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
		Toaster = () => {
			let { toasts, settings } = useSafeContext(ToasterStateContext);
			return import_react$14.createElement(Box, { className: (0, import_classnames$4.default)("iui-toast-wrapper", `iui-placement-${settings.placement}`) }, toasts.map((toastProps) => import_react$14.createElement(Toast, {
				key: toastProps.id,
				...toastProps
			})));
		};
		ToastProvider = ({ children, inherit = false }) => {
			let [toasterState, dispatch] = import_react$14.useReducer(toastReducer, {
				toasts: [],
				settings: {
					order: "auto",
					placement: "top"
				}
			});
			let toasterDispatchContext = import_react$14.useContext(ToasterDispatchContext);
			let toasterStateContext = import_react$14.useContext(ToasterStateContext);
			let shouldReuse = toasterStateContext && inherit;
			let toasterDispatchContextValue = shouldReuse ? toasterDispatchContext : dispatch;
			let toasterStateContextValue = shouldReuse ? toasterStateContext : toasterState;
			return import_react$14.createElement(ToasterDispatchContext.Provider, { value: toasterDispatchContextValue }, import_react$14.createElement(ToasterStateContext.Provider, { value: toasterStateContextValue }, children));
		};
		toastReducer = (state, action) => {
			if ("add" === action.type) {
				let order = state.settings.order;
				if ("auto" === order) order = state.settings.placement.startsWith("top") ? "descending" : "ascending";
				return {
					...state,
					toasts: [
						..."ascending" === order ? state.toasts : [],
						action.toast,
						..."descending" === order ? state.toasts : []
					]
				};
			}
			if ("remove" === action.type) return {
				...state,
				toasts: state.toasts.filter((toast) => toast.id !== action.id)
			};
			if ("close-all" === action.type) return {
				...state,
				toasts: state.toasts.map((toast) => ({
					...toast,
					isVisible: false
				}))
			};
			if ("settings" === action.type) return {
				...state,
				settings: {
					...state.settings,
					...action.settings
				}
			};
			return state;
		};
		ToasterStateContext = import_react$14.createContext(void 0);
		ToasterDispatchContext = import_react$14.createContext(void 0);
		nextId = (() => {
			let count = 0;
			return () => ++count;
		})();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/meta.js
var _moduleType, meta;
function init_meta() {
	return (init_meta = __esmMin((() => {
		init_styles();
		_moduleType = "ESM";
		meta = {
			version: t,
			module: _moduleType
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ThemeProvider/ThemeProvider.js
var import_react$13, import_react_dom$1, import_classnames$3, versionWithoutDots, OwnerDocumentContext, ThemeProvider, MainRoot, Root, useParentThemeAndContext, PortalContainer, FallbackStyles, useIuiDebugRef, useInertPolyfill;
function init_ThemeProvider() {
	return (init_ThemeProvider = __esmMin((() => {
		import_react$13 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom(), 1);
		import_classnames$3 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_useMediaQuery(), init_useMergedRefs(), init_Box(), init_useIsomorphicLayoutEffect(), init_useLatestRef(), init_import(), init_dev(), init_HydrationProvider(), init_Portal(), init_useId(), init_FutureFlagsProvider();
		init_ThemeContext();
		init_Toaster();
		init_meta();
		init_preload_helper();
		versionWithoutDots = meta.version.replace(/\./g, "");
		OwnerDocumentContext = import_react$13.createContext(void 0);
		ThemeProvider = import_react$13.forwardRef((props, forwardedRef) => {
			var _themeOptions, _themeOptions1;
			let { theme: themeProp = "inherit", children, themeOptions = {}, portalContainer: portalContainerProp, includeCss = "inherit" === themeProp, future: futureProp = {}, ...rest } = props;
			useInertPolyfill();
			let [rootElement, setRootElement] = import_react$13.useState(null);
			let parent = useParentThemeAndContext(rootElement);
			let theme = "inherit" === themeProp ? parent.theme || "light" : themeProp;
			(_themeOptions = themeOptions).applyBackground ?? (_themeOptions.applyBackground = !parent.theme);
			(_themeOptions1 = themeOptions).highContrast ?? (_themeOptions1.highContrast = "inherit" === themeProp ? parent.highContrast : void 0);
			let portalContainerFromParent = import_react$13.useContext(PortalContainerContext);
			let themeContextValue = import_react$13.useMemo(() => ({
				theme,
				themeOptions
			}), [theme, JSON.stringify(themeOptions)]);
			let [portalContainer, setPortalContainer] = import_react$13.useState(portalContainerProp || null);
			return import_react$13.createElement(FutureFlagsProvider, { value: futureProp }, import_react$13.createElement(PortalContainerContext.Provider, { value: portalContainer }, import_react$13.createElement(HydrationProvider, null, import_react$13.createElement(ThemeContext.Provider, { value: themeContextValue }, import_react$13.createElement(ToastProvider, { inherit: "inherit" === themeProp && !portalContainerProp }, includeCss && rootElement ? import_react$13.createElement(FallbackStyles, { root: rootElement }) : null, import_react$13.createElement(MainRoot, {
				theme,
				themeOptions,
				ref: useMergedRefs(forwardedRef, setRootElement, useIuiDebugRef),
				...rest
			}, children, import_react$13.createElement(PortalContainer, {
				theme,
				themeOptions,
				portalContainerProp,
				portalContainerFromParent,
				setPortalContainer,
				isInheritingTheme: "inherit" === themeProp
			})))))));
		});
		MainRoot = import_react$13.forwardRef((props, forwardedRef) => {
			let [ownerDocument, setOwnerDocument] = import_react$13.useState(void 0);
			let findOwnerDocumentFromRef = import_react$13.useCallback((el) => {
				if (el && el.ownerDocument !== ownerDocument) setOwnerDocument(el.ownerDocument);
			}, [ownerDocument, setOwnerDocument]);
			return import_react$13.createElement(OwnerDocumentContext.Provider, { value: ownerDocument }, import_react$13.createElement(Root, {
				...props,
				ref: useMergedRefs(findOwnerDocumentFromRef, forwardedRef)
			}));
		});
		Root = import_react$13.forwardRef((props, forwardedRef) => {
			let { theme, children, themeOptions, className, ...rest } = props;
			let prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
			let prefersHighContrast = useMediaQuery("(prefers-contrast: more)");
			let shouldApplyDark = "dark" === theme || "os" === theme && prefersDark;
			let shouldApplyHC = themeOptions?.highContrast ?? prefersHighContrast;
			let shouldApplyBackground = themeOptions?.applyBackground;
			let themeBridge = useFutureFlag("themeBridge");
			return import_react$13.createElement(Box, {
				className: (0, import_classnames$3.default)("iui-root", { "iui-root-background": shouldApplyBackground }, className),
				"data-iui-theme": shouldApplyDark ? "dark" : "light",
				"data-iui-contrast": shouldApplyHC ? "high" : "default",
				"data-iui-bridge": themeBridge ? "true" : void 0,
				ref: forwardedRef,
				...rest
			}, children);
		});
		useParentThemeAndContext = (rootElement) => {
			let parentContext = import_react$13.useContext(ThemeContext);
			let [parentThemeState, setParentTheme] = import_react$13.useState(parentContext?.theme);
			let [parentHighContrastState, setParentHighContrastState] = import_react$13.useState(parentContext?.themeOptions?.highContrast);
			let parentThemeRef = useLatestRef$2(parentContext?.theme);
			useIsomorphicLayoutEffect(() => {
				if (parentThemeRef.current) return;
				let closestRoot = rootElement?.parentElement?.closest("[data-iui-theme]");
				if (!closestRoot) return;
				let synchronizeTheme = () => {
					setParentTheme(closestRoot?.getAttribute("data-iui-theme"));
					setParentHighContrastState(closestRoot?.getAttribute("data-iui-contrast") === "high");
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
				theme: parentContext?.theme ?? parentThemeState,
				highContrast: parentContext?.themeOptions?.highContrast ?? parentHighContrastState,
				context: parentContext
			};
		};
		PortalContainer = import_react$13.memo(({ portalContainerProp, portalContainerFromParent, setPortalContainer, isInheritingTheme, theme, themeOptions }) => {
			let ownerDocument = import_react$13.useContext(OwnerDocumentContext);
			let shouldSetupPortalContainer = !portalContainerProp && (!isInheritingTheme || !portalContainerFromParent || !!ownerDocument && portalContainerFromParent.ownerDocument !== ownerDocument);
			let id = useId$1();
			import_react$13.useEffect(() => {
				if (shouldSetupPortalContainer) return;
				let portalTarget = portalContainerProp || portalContainerFromParent;
				if (portalTarget) setPortalContainer(portalTarget);
			}, [
				portalContainerProp,
				portalContainerFromParent,
				shouldSetupPortalContainer,
				setPortalContainer
			]);
			if (!("hydrated" === useHydration())) return null;
			if (shouldSetupPortalContainer && ownerDocument) return import_react_dom$1.createPortal(import_react$13.createElement(Root, {
				theme,
				themeOptions: {
					...themeOptions,
					applyBackground: false
				},
				"data-iui-portal": true,
				style: { display: "contents" },
				ref: setPortalContainer,
				id
			}, import_react$13.createElement(Toaster, null)), ownerDocument.body);
			if (portalContainerProp) return import_react_dom$1.createPortal(import_react$13.createElement(Toaster, null), portalContainerProp);
			return null;
		});
		FallbackStyles = ({ root }) => {
			useIsomorphicLayoutEffect(() => {
				if ("yes" === getComputedStyle(root).getPropertyValue(`--_iui-v${versionWithoutDots}`)) return;
				if (isUnitTest) return;
				(async () => {
					try {
						await __vitePreload(() => Promise.resolve({}), __vite__mapDeps([0]), import.meta.url);
					} catch (error) {
						console.log("Error loading styles.css locally", error);
						let css = await importCss(`https://cdn.jsdelivr.net/npm/@itwin/itwinui-react@${meta.version}/styles.css`);
						document.adoptedStyleSheets = [...document.adoptedStyleSheets, css.default];
					}
				})();
			}, [root]);
			return import_react$13.createElement(import_react$13.Fragment, null);
		};
		useIuiDebugRef = () => {
			var _globalThis;
			let _globalThis1 = globalThis;
			(_globalThis = _globalThis1).__iui || (_globalThis.__iui = { versions: /* @__PURE__ */ new Set() });
			_globalThis1.__iui.versions.add(JSON.stringify(meta));
		};
		useInertPolyfill = () => {
			let loaded = import_react$13.useRef(false);
			let modulePath = "https://cdn.jsdelivr.net/npm/wicg-inert@3.1.2/dist/inert.min.js";
			import_react$13.useEffect(() => {
				(async () => {
					if (!HTMLElement.prototype.hasOwnProperty("inert") && !loaded.current && !isUnitTest) {
						await new Function("url", "return import(url)")(modulePath);
						loaded.current = true;
					}
				})();
			}, []);
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Popover/Popover.js
var import_react$12, import_classnames$2, PopoverOpenContext, PopoverInitialFocusContext, usePopover, Popover, PopoverPortal, DisplayContents;
function init_Popover() {
	return (init_Popover = __esmMin((() => {
		import_react$12 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$2 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_floating_ui_react();
		init_Box(), init_ShadowRoot(), init_react(), init_dev(), init_dom(), init_useControlledState(), init_useId(), init_useStableCallback(), init_useIsomorphicLayoutEffect(), init_useMergedRefs();
		init_Portal();
		init_ThemeProvider();
		PopoverOpenContext = import_react$12.createContext(void 0);
		PopoverInitialFocusContext = import_react$12.createContext(void 0);
		usePopover = (options) => {
			let { placement = "bottom-start", visible, onVisibleChange, closeOnOutsideClick, autoUpdateOptions, matchWidth, interactions: interactionsProp, role, ...rest } = options;
			let mergedInteractions = import_react$12.useMemo(() => ({
				...interactionsProp,
				click: interactionsProp?.click ?? true,
				dismiss: interactionsProp?.dismiss ?? true,
				hover: interactionsProp?.hover ?? false,
				focus: interactionsProp?.focus ?? false
			}), [interactionsProp]);
			let tree = useFloatingTree();
			let middleware = import_react$12.useMemo(() => ({
				...options.middleware,
				flip: options.middleware?.flip ?? true,
				shift: options.middleware?.shift ?? true,
				size: options.middleware?.size ?? true,
				hide: options.middleware?.hide || !isUnitTest
			}), [options.middleware]);
			let maxHeight = "boolean" == typeof middleware.size ? "400px" : middleware.size?.maxHeight;
			let [open, onOpenChange] = useControlledState(false, visible, onVisibleChange);
			let floating = useFloating({
				placement,
				open,
				onOpenChange,
				strategy: "fixed",
				whileElementsMounted: import_react$12.useMemo(() => open ? (...args) => autoUpdate(...args, autoUpdateOptions) : void 0, [autoUpdateOptions, open]),
				...rest,
				middleware: import_react$12.useMemo(() => [
					void 0 !== middleware.offset && offset(middleware.offset),
					middleware.flip && flip({ padding: 5 }),
					middleware.shift && shift({ padding: 4 }),
					(matchWidth || middleware.size) && size({
						padding: 4,
						apply: ({ rects, availableHeight }) => {
							if (middleware.size) setAvailableHeight(Math.round(availableHeight));
							if (matchWidth) setReferenceWidth(rects.reference.width);
						}
					}),
					middleware.autoPlacement && autoPlacement({ padding: 4 }),
					middleware.inline && inline(),
					middleware.hide && hide({ padding: 4 })
				].filter(Boolean), [matchWidth, middleware])
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
			let [referenceWidth, setReferenceWidth] = import_react$12.useState();
			let [availableHeight, setAvailableHeight] = import_react$12.useState();
			let getFloatingProps = import_react$12.useCallback((userProps) => interactions.getFloatingProps({
				...userProps,
				style: {
					...floating.floatingStyles,
					...middleware.size && availableHeight && { maxBlockSize: `min(${availableHeight}px, ${maxHeight})` },
					zIndex: 999,
					...matchWidth && referenceWidth ? {
						minInlineSize: `${referenceWidth}px`,
						maxInlineSize: `min(${2 * referenceWidth}px, 90vw)`
					} : {},
					...middleware.hide && floating.middlewareData.hide?.referenceHidden && { visibility: "hidden" },
					...userProps?.style
				}
			}), [
				interactions,
				floating.floatingStyles,
				floating.middlewareData.hide?.referenceHidden,
				middleware.size,
				middleware.hide,
				availableHeight,
				maxHeight,
				matchWidth,
				referenceWidth
			]);
			let getReferenceProps = import_react$12.useCallback((userProps) => interactions.getReferenceProps({
				...userProps,
				onClick: mergeEventHandlers(userProps?.onClick, () => {
					if (!!mergedInteractions.click && visible) onOpenChange(false);
				})
			}), [
				interactions,
				mergedInteractions.click,
				visible,
				onOpenChange
			]);
			let setFloating = useStableCallback(floating.refs.setFloating);
			let setReference = useStableCallback(floating.refs.setReference);
			let setPositionReference = useStableCallback(floating.refs.setPositionReference);
			return import_react$12.useMemo(() => ({
				open,
				onOpenChange,
				getReferenceProps,
				getFloatingProps,
				...floating,
				refs: {
					...floating.refs,
					setFloating,
					setReference,
					setPositionReference
				}
			}), [
				open,
				onOpenChange,
				getFloatingProps,
				floating,
				getReferenceProps,
				setFloating,
				setReference,
				setPositionReference
			]);
		};
		Popover = import_react$12.forwardRef((props, forwardedRef) => {
			let { portal = true, visible, placement = "bottom-start", onVisibleChange, closeOnOutsideClick = true, middleware, positionReference, className, children, content, applyBackground = false, ...rest } = props;
			let popover = usePopover({
				visible,
				placement,
				onVisibleChange,
				closeOnOutsideClick,
				role: "dialog",
				middleware,
				transform: false
			});
			let [popoverElement, setPopoverElement] = import_react$12.useState(null);
			let popoverRef = useMergedRefs(popover.refs.setFloating, forwardedRef, setPopoverElement);
			let triggerId = `${useId$1()}-trigger`;
			let hasAriaLabel = !!props["aria-labelledby"] || !!props["aria-label"];
			useIsomorphicLayoutEffect(() => {
				if (!positionReference) return;
				let setPositionReference = popover.refs.setPositionReference;
				setPositionReference(positionReference);
				return () => void setPositionReference(null);
			}, [popover.refs.setPositionReference, positionReference]);
			let [initialFocus, setInitialFocus] = import_react$12.useState();
			let initialFocusContextValue = import_react$12.useMemo(() => ({ setInitialFocus }), []);
			return import_react$12.createElement(import_react$12.Fragment, null, import_react$12.createElement(PopoverOpenContext.Provider, { value: popover.open }, cloneElementWithRef(children, (children) => ({
				id: children.props.id || triggerId,
				...popover.getReferenceProps(children.props),
				ref: popover.refs.setReference
			}))), popover.open ? import_react$12.createElement(PopoverInitialFocusContext.Provider, { value: initialFocusContextValue }, import_react$12.createElement(PopoverPortal, { portal }, import_react$12.createElement(ThemeProvider, null, import_react$12.createElement(PortalContainerContext.Provider, { value: popoverElement }, import_react$12.createElement(DisplayContents, null), import_react$12.createElement(FloatingFocusManager, {
				context: popover.context,
				modal: false,
				initialFocus
			}, import_react$12.createElement(Box, {
				className: (0, import_classnames$2.default)("iui-popover", { "iui-popover-surface": applyBackground }, className),
				"aria-labelledby": hasAriaLabel ? void 0 : popover.refs.domReference.current?.id,
				...popover.getFloatingProps(rest),
				ref: popoverRef
			}, content)))))) : null);
		});
		PopoverPortal = ({ children, portal = true }) => {
			let portalTo = usePortalTo(portal);
			return import_react$12.createElement(FloatingPortal, {
				key: portalTo?.id,
				root: portalTo ?? void 0
			}, import_react$12.createElement(DisplayContents, null), children);
		};
		DisplayContents = import_react$12.memo(() => import_react$12.createElement(ShadowRoot$1, { css: `
        :host {
          display: contents;
        }
      ` }, import_react$12.createElement("slot", null)));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Buttons/IconButton.js
var import_classnames$1, import_react$11, IconButton;
function init_IconButton() {
	return (init_IconButton = __esmMin((() => {
		import_classnames$1 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		import_react$11 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Box(), init_ButtonBase(), init_useWarningLogger();
		init_Tooltip();
		init_VisuallyHidden();
		init_ButtonGroup();
		init_Popover();
		IconButton = import_react$11.forwardRef((props, ref) => {
			let { isActive, children, styleType = "default", size, className, title, label = title, iconProps, labelProps, ...rest } = props;
			let buttonGroupOrientation = import_react$11.useContext(ButtonGroupContext);
			let hasPopoverOpen = import_react$11.useContext(PopoverOpenContext);
			useWarningLogger();
			let button = import_react$11.createElement(ButtonBase, {
				ref,
				className: (0, import_classnames$1.default)("iui-button", "iui-field", className),
				"data-iui-variant": "default" !== styleType ? styleType : void 0,
				"data-iui-size": size,
				"data-iui-active": isActive,
				"data-iui-has-popover": hasPopoverOpen ? "open" : void 0,
				"aria-pressed": isActive,
				...rest
			}, import_react$11.createElement(Box, {
				as: "span",
				"aria-hidden": true,
				...iconProps,
				className: (0, import_classnames$1.default)("iui-button-icon", iconProps?.className)
			}, children), label ? import_react$11.createElement(VisuallyHidden, null, label) : null);
			return label ? import_react$11.createElement(Tooltip, {
				placement: "vertical" === buttonGroupOrientation ? "right" : "top",
				...labelProps,
				content: label,
				ariaStrategy: "none"
			}, button) : button;
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/OverflowContainer.js
function useOverflowContainerContext() {
	return useSafeContext(OverflowContainerContext);
}
var import_react$10, OverflowContainerMain, OverflowContainerOverflowNode, OverflowContainerComponent, OverflowContainer, OverflowContainerContext, useOverflow, STARTING_MAX_ITEMS_COUNT, overflowGuessReducerInitialState, overflowGuessReducer;
function init_OverflowContainer() {
	return (init_OverflowContainer = __esmMin((() => {
		import_react$10 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_useMergedRefs();
		init_Box();
		init_useIsomorphicLayoutEffect();
		init_useSafeContext();
		init_dev();
		init_useResizeObserver();
		OverflowContainerMain = import_react$10.forwardRef((props, forwardedRef) => {
			let { itemsCount, children, overflowOrientation, ...rest } = props;
			let [containerRef, visibleCount] = useOverflow(itemsCount, overflowOrientation);
			let overflowContainerContextValue = import_react$10.useMemo(() => ({
				visibleCount,
				itemsCount
			}), [itemsCount, visibleCount]);
			return import_react$10.createElement(OverflowContainerContext.Provider, { value: overflowContainerContextValue }, import_react$10.createElement(Box, {
				ref: useMergedRefs(forwardedRef, containerRef),
				...rest
			}, children));
		});
		OverflowContainerOverflowNode = (props) => {
			let { children } = props;
			let { visibleCount, itemsCount } = useOverflowContainerContext();
			return visibleCount < itemsCount ? children : null;
		};
		OverflowContainerComponent = import_react$10.forwardRef((props, forwardedRef) => {
			let { itemsCount, overflowOrientation = "horizontal", ...rest } = props;
			let [size, setSize] = import_react$10.useState(null);
			let [resizeRef] = useResizeObserver(setSize);
			let ref = useMergedRefs(resizeRef, forwardedRef);
			let key = `${itemsCount}${"vertical" === overflowOrientation ? size?.height : size?.width}`;
			return import_react$10.createElement(OverflowContainerMain, {
				...rest,
				key,
				ref,
				itemsCount,
				overflowOrientation
			});
		});
		OverflowContainer = Object.assign(OverflowContainerComponent, {
			OverflowNode: OverflowContainerOverflowNode,
			useContext: useOverflowContainerContext
		});
		OverflowContainerContext = import_react$10.createContext(void 0);
		useOverflow = (itemsCount, orientation = "horizontal") => {
			let [guessState, dispatch] = import_react$10.useReducer(overflowGuessReducer, { itemsCount }, overflowGuessReducerInitialState);
			let containerRef = import_react$10.useRef(null);
			let isGuessing = import_react$10.useRef(false);
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
						let isOverflowing = containerRef.current[`offset${dimension}`] < containerRef.current[`scroll${dimension}`];
						if (0 === itemsCount || 1 === visibleCount && isOverflowing || visibleCount === itemsCount && !isOverflowing || maxGuess - minGuess === 1 && visibleCount === minGuess) return void dispatch({ type: "stabilize" });
						if (maxGuess === visibleCount && !isOverflowing) return void dispatch({ type: "shiftGuessRangeForward" });
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
			}, [
				guessState,
				itemsCount,
				orientation
			]);
			return [containerRef, guessState.visibleCount];
		};
		STARTING_MAX_ITEMS_COUNT = 32;
		overflowGuessReducerInitialState = ({ itemsCount }) => {
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
		overflowGuessReducer = (state, action) => {
			let getSafeVisibleCount = ({ visibleCount, itemsCount }) => Math.min(itemsCount, visibleCount);
			switch (action.type) {
				case "decreaseMaxGuess":
				case "increaseMinGuess":
					if (state.isStabilized) return state;
					let newMinGuess = state.minGuess;
					let newMaxGuess = state.maxGuess;
					if ("decreaseMaxGuess" === action.type) newMaxGuess = action.currentState.visibleCount;
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
				case "stabilize": return {
					...state,
					isStabilized: true,
					minGuess: null,
					maxGuess: null
				};
				default: return state;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/providers/FutureFlagsProvider.js
function useFutureFlag(key) {
	return useSafeContext(FutureFlagsContext)[key];
}
var import_react$9, FutureFlagsContext, FutureFlagsProvider;
function init_FutureFlagsProvider() {
	return (init_FutureFlagsProvider = __esmMin((() => {
		import_react$9 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_useSafeContext();
		FutureFlagsContext = import_react$9.createContext({});
		FutureFlagsProvider = ({ children, value }) => {
			if (true === value) value = { themeBridge: true };
			let combinedValue = {
				...import_react$9.useContext(FutureFlagsContext),
				...value
			};
			return import_react$9.createElement(FutureFlagsContext.Provider, { value: import_react$9.useMemo(() => combinedValue, [JSON.stringify(combinedValue)]) }, children);
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/providers/HydrationProvider.js
var import_react$8, HydrationContext, noopSubscribe, isServer, useHydration, HydrationProvider, HydrationCheck;
function init_HydrationProvider() {
	return (init_HydrationProvider = __esmMin((() => {
		import_react$8 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_useSyncExternalStore(), init_useIsClient();
		HydrationContext = import_react$8.createContext(false);
		noopSubscribe = () => () => {};
		isServer = "undefined" == typeof window;
		useHydration = () => {
			let hydrating = useSyncExternalStore(noopSubscribe, () => false, () => !isServer);
			let hydrated = import_react$8.useContext(HydrationContext);
			let hydratedFallback = useIsClient();
			if (hydrated || hydratedFallback) return "hydrated";
			if (hydrating) return "hydrating";
		};
		HydrationProvider = ({ children }) => {
			let [isHydrated, setIsHydrated] = import_react$8.useState(import_react$8.useContext(HydrationContext));
			let onHydrate = import_react$8.useCallback(() => setIsHydrated(true), []);
			return import_react$8.createElement(HydrationContext.Provider, { value: isHydrated }, isHydrated ? null : import_react$8.createElement(HydrationCheck, { onHydrate }), children);
		};
		HydrationCheck = ({ onHydrate }) => {
			import_react$8.useEffect(() => void onHydrate(), [onHydrate]);
			return null;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/ShadowRoot.js
function useShadowRoot(templateRef, { css = "", flush = true }) {
	let [shadowRoot, setShadowRoot] = import_react$7.useState(null);
	let styleSheet = import_react$7.useRef(void 0);
	let latestCss = useLatestRef$2(css);
	let latestShadowRoot = useLatestRef$2(shadowRoot);
	let createStyleSheet = import_react$7.useCallback((shadow) => {
		if (shadow && supportsAdoptedStylesheets) {
			let currentWindow = shadow.ownerDocument.defaultView || globalThis;
			if (styleSheet.current instanceof currentWindow.CSSStyleSheet) return;
			styleSheet.current = new currentWindow.CSSStyleSheet();
			shadow.adoptedStyleSheets.push(styleSheet.current);
			if (latestCss.current) styleSheet.current.replaceSync(latestCss.current);
		}
	}, [latestCss]);
	useIsomorphicLayoutEffect(() => {
		let parent = templateRef.current?.parentElement;
		if (!parent) return;
		let setupOrReuseShadowRoot = () => {
			if (parent.shadowRoot && null === latestShadowRoot.current) parent.shadowRoot.replaceChildren();
			let shadow = parent.shadowRoot || parent.attachShadow({ mode: "open" });
			createStyleSheet(shadow);
			if (flush) import_react_dom.flushSync(() => setShadowRoot(shadow));
			else setShadowRoot(shadow);
		};
		if (flush) queueMicrotask(() => setupOrReuseShadowRoot());
		else setupOrReuseShadowRoot();
		return () => void setShadowRoot(null);
	}, [
		templateRef,
		createStyleSheet,
		latestShadowRoot,
		flush
	]);
	useIsomorphicLayoutEffect(() => {
		if (css && supportsAdoptedStylesheets) styleSheet.current?.replaceSync(css);
	}, [css]);
	import_react$7.useEffect(() => {
		let listener = () => createStyleSheet(latestShadowRoot.current);
		window.addEventListener("appui:reparent", listener);
		return () => {
			window.removeEventListener("appui:reparent", listener);
		};
	}, [createStyleSheet, latestShadowRoot]);
	return shadowRoot;
}
var import_react$7, import_react_dom, isBrowser, supportsDSD, supportsAdoptedStylesheets, ShadowRoot$1, ClientShadowRoot;
function init_ShadowRoot() {
	return (init_ShadowRoot = __esmMin((() => {
		import_react$7 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
		init_useLatestRef(), init_useIsomorphicLayoutEffect();
		init_HydrationProvider();
		isBrowser = "undefined" != typeof document;
		supportsDSD = isBrowser && "shadowRootMode" in HTMLTemplateElement.prototype;
		supportsAdoptedStylesheets = isBrowser && "adoptedStyleSheets" in Document.prototype;
		ShadowRoot$1 = ({ children, css, flush = true }) => {
			let isHydrating = "hydrating" === useHydration();
			if (!isBrowser) return import_react$7.createElement("template", { shadowrootmode: "open" }, css && import_react$7.createElement("style", null, css), children);
			if (supportsDSD && isHydrating) return null;
			return import_react$7.createElement(ClientShadowRoot, {
				css,
				flush
			}, children);
		};
		ClientShadowRoot = ({ children, css, flush = true }) => {
			let templateRef = import_react$7.useRef(null);
			let shadowRoot = useShadowRoot(templateRef, {
				css,
				flush
			});
			let fallbackCss = !supportsAdoptedStylesheets && css ? import_react$7.createElement("style", null, css) : null;
			return shadowRoot ? import_react_dom.createPortal(import_react$7.createElement(import_react$7.Fragment, null, fallbackCss, children), shadowRoot) : import_react$7.createElement("template", { ref: templateRef });
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/ButtonBase.js
var import_react$6, import_classnames, ButtonBase;
function init_ButtonBase() {
	return (init_ButtonBase = __esmMin((() => {
		import_react$6 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_Box();
		init_useIsClient();
		ButtonBase = import_react$6.forwardRef((props, forwardedRef) => {
			let { as: asProp = "button", disabled: disabledProp, htmlDisabled, type: typeProp = "button" === asProp ? "button" : void 0, ...rest } = props;
			let isClient = useIsClient();
			let ariaDisabled = disabledProp && !htmlDisabled && isClient && "button" === asProp;
			let handleIfEnabled = (handler) => (e) => {
				if (disabledProp) return;
				handler?.(e);
			};
			let type = "button" === asProp && disabledProp ? "button" : typeProp;
			return import_react$6.createElement(Box, {
				as: asProp,
				type,
				ref: forwardedRef,
				"aria-disabled": ariaDisabled ? "true" : void 0,
				"data-iui-disabled": disabledProp ? "true" : void 0,
				disabled: htmlDisabled ?? (!isClient && disabledProp) ? true : void 0,
				...rest,
				className: (0, import_classnames.default)("iui-button-base", props.className),
				onClick: handleIfEnabled(props.onClick),
				onPointerDown: handleIfEnabled(props.onPointerDown),
				onPointerUp: handleIfEnabled(props.onPointerUp)
			});
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/Svg.js
var Svg;
function init_Svg() {
	return (init_Svg = __esmMin((() => {
		init_polymorphic();
		Svg = polymorphic.svg("", {
			viewBox: "0 0 16 16",
			width: 16,
			height: 16
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgInfoCircular.js
var import_react$5, SvgInfoCircular;
function init_SvgInfoCircular() {
	return (init_SvgInfoCircular = __esmMin((() => {
		import_react$5 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Svg();
		SvgInfoCircular = (props) => import_react$5.createElement(Svg, props, import_react$5.createElement("path", { d: "M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm1.2 3.2a.923.923 0 0 1 .997.843l.003.057a1.31 1.31 0 0 1-1.3 1.2.945.945 0 0 1-1-1 1.228 1.228 0 0 1 1.3-1.1zm-2 9.6c-.5 0-.9-.3-.5-1.7l.6-2.4c.1-.4.1-.5 0-.5-.2-.1-.9.2-1.3.5l-.2-.5a6.497 6.497 0 0 1 3.3-1.6c.5 0 .6.6.3 1.6l-.7 2.6c-.1.5-.1.6.1.6a2.003 2.003 0 0 0 1.1-.6l.3.4a5.769 5.769 0 0 1-3 1.6z" }));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgStatusError.js
var import_react$4, SvgStatusError;
function init_SvgStatusError() {
	return (init_SvgStatusError = __esmMin((() => {
		import_react$4 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Svg();
		SvgStatusError = (props) => import_react$4.createElement(Svg, props, import_react$4.createElement("path", { d: "M9 12H7v-2h2v2Zm0-3H7V4h2v5Zm2.314-9H4.686L0 4.686v6.628L4.686 16h6.628L16 11.314V4.686L11.314 0Z" }));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgStatusSuccess.js
var import_react$3, SvgStatusSuccess;
function init_SvgStatusSuccess() {
	return (init_SvgStatusSuccess = __esmMin((() => {
		import_react$3 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Svg();
		SvgStatusSuccess = (props) => import_react$3.createElement(Svg, props, import_react$3.createElement("path", { d: "m8 0a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm-1.35 12-3.65-3.41 1.4-1.3 2.36 2.2 4.83-4.49 1.41 1.29z" }));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgStatusWarning.js
var import_react$2, SvgStatusWarning;
function init_SvgStatusWarning() {
	return (init_SvgStatusWarning = __esmMin((() => {
		import_react$2 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Svg();
		SvgStatusWarning = (props) => import_react$2.createElement(Svg, props, import_react$2.createElement("path", { d: "m15.86807 13.26721-6.77-11.62a1.15 1.15 0 0 0 -1.1-.67 1.17 1.17 0 0 0 -1.1.69l-6.77 11.59a1.2 1.2 0 0 0 1.1 1.72h13.45a1.19 1.19 0 0 0 1.19-1.71zm-6.87-.29h-2v-2h2zm0-3h-2v-5h2z" }));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/StatusIconMap.js
var import_react$1, StatusIconMap;
function init_StatusIconMap() {
	return (init_StatusIconMap = __esmMin((() => {
		import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_SvgInfoCircular();
		init_SvgStatusError();
		init_SvgStatusSuccess();
		init_SvgStatusWarning();
		StatusIconMap = {
			negative: (args) => import_react$1.createElement(SvgStatusError, {
				"aria-hidden": true,
				...args
			}),
			positive: (args) => import_react$1.createElement(SvgStatusSuccess, {
				"aria-hidden": true,
				...args
			}),
			warning: (args) => import_react$1.createElement(SvgStatusWarning, {
				"aria-hidden": true,
				...args
			}),
			informational: (args) => import_react$1.createElement(SvgInfoCircular, {
				"aria-hidden": true,
				...args
			})
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgCloseSmall.js
var import_react, SvgCloseSmall;
function init_SvgCloseSmall() {
	return (init_SvgCloseSmall = __esmMin((() => {
		import_react = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Svg();
		SvgCloseSmall = (props) => import_react.createElement(Svg, props, import_react.createElement("path", { d: "m12.5 2-4.5 4.5-4.5-4.5-1.5 1.5 4.5 4.5-4.5 4.5 1.5 1.5 4.5-4.5 4.5 4.5 1.5-1.5-4.5-4.5 4.5-4.5z" }));
	})))();
}
//#endregion
export { polymorphic as $, init_ButtonGroup as A, mergeEventHandlers as At, FloatingTree as B, init_ThemeProvider as C, mergeRefs as Ct, PortalContainerContext as D, getTranslateValuesFromElement as Dt, Portal as E, init_numbers as Et, init_Tooltip as F, useInteractions as G, useFloatingNodeId as H, Composite as I, init_Box as J, useListNavigation as K, CompositeItem as L, init_VisuallyHidden as M, Tooltip as N, init_Portal as O, getWindow$1 as Ot, defaultTooltipDelay as P, init_polymorphic as Q, FloatingDelayGroup as R, ThemeProvider as S, init_useMergedRefs as St, useToaster as T, getBoundedValue as Tt, useFloatingParentNodeId as U, init_floating_ui_react as V, useFloatingTree as W, init_react as X, cloneElementWithRef as Y, isReact17or18 as Z, Popover as _, useSyncExternalStore as _t, Svg as a, useControlledState as at, init_Popover as b, init_useResizeObserver as bt, init_ButtonBase as c, init_useIsClient as ct, init_FutureFlagsProvider as d, useIsomorphicLayoutEffect as dt, init_styles as et, useFutureFlag as f, init_useLatestRef as ft, init_IconButton as g, init_useSyncExternalStore as gt, IconButton as h, useSafeContext as ht, init_StatusIconMap as i, init_useControlledState as it, VisuallyHidden as j, require_classnames as jt, ButtonGroup as k, init_dom as kt, ShadowRoot$1 as l, useIsClient as lt, init_OverflowContainer as m, init_useSafeContext as mt, init_SvgCloseSmall as n, init_useWarningLogger as nt, init_Svg as o, init_useId as ot, OverflowContainer as p, useLatestRef$2 as pt, Box as q, StatusIconMap as r, useWarningLogger as rt, ButtonBase as s, useId$1 as st, SvgCloseSmall as t, u as tt, init_ShadowRoot as u, init_useIsomorphicLayoutEffect as ut, PopoverInitialFocusContext as v, init_useGlobals as vt, init_Toaster as w, useMergedRefs as wt, usePopover as x, useResizeObserver as xt, PopoverOpenContext as y, useGlobals as yt, FloatingNode as z };
