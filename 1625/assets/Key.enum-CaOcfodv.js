const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./styles-stOW5RFO.css"])))=>i.map(i=>d[i]);
import { a as __toESM, n as __esmMin, r as __exportAll, t as __commonJSMin } from "./rolldown-runtime-htSClZ5J.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-BeSU7fTM.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import "./components-react-F6uXi_eU.js";
import { t as require_react_dom } from "./react-dom-COAM6TrF.js";
import { Br as init_TypedArrayBuilder, Hr as init_ProcessDetector, Vr as init_Time } from "./appui-react-BSVj6MVy.js";
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
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useEventListener.js
var import_react$58, useEventListener;
function init_useEventListener() {
	return (init_useEventListener = __esmMin((() => {
		import_react$58 = /* @__PURE__ */ __toESM(require_react(), 1);
		useEventListener = (eventName, handler, element) => {
			let savedHandler = import_react$58.useRef(void 0);
			import_react$58.useEffect(() => {
				savedHandler.current = handler;
			}, [handler]);
			import_react$58.useEffect(() => {
				if (!element) return;
				let eventListener = (event) => savedHandler.current?.(event);
				element.addEventListener(eventName, eventListener);
				return () => {
					element.removeEventListener(eventName, eventListener);
				};
			}, [eventName, element]);
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useMergedRefs.js
var import_react$57, mergeRefs, useMergedRefs;
function init_useMergedRefs() {
	return (init_useMergedRefs = __esmMin((() => {
		import_react$57 = /* @__PURE__ */ __toESM(require_react(), 1);
		mergeRefs = (...refs) => (instance) => {
			refs.forEach((ref) => {
				if ("function" == typeof ref) ref(instance);
				else if (ref) ref.current = instance;
			});
		};
		useMergedRefs = (...refs) => import_react$57.useCallback(mergeRefs(...refs), [...refs]);
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useResizeObserver.js
var import_react$56, useResizeObserver;
function init_useResizeObserver() {
	return (init_useResizeObserver = __esmMin((() => {
		import_react$56 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_dom();
		useResizeObserver = (onResize) => {
			let resizeObserver = import_react$56.useRef(void 0);
			return [import_react$56.useCallback((element) => {
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
var import_react$55, ThemeContext;
function init_ThemeContext() {
	return (init_ThemeContext = __esmMin((() => {
		import_react$55 = /* @__PURE__ */ __toESM(require_react(), 1);
		ThemeContext = import_react$55.createContext(void 0);
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
var import_react$54, useGlobals, useThemeProviderWarning, useRootFontSizeWarning;
function init_useGlobals() {
	return (init_useGlobals = __esmMin((() => {
		import_react$54 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_ThemeContext();
		useGlobals = () => {
			let themeContext = import_react$54.useContext(ThemeContext);
			useThemeProviderWarning(themeContext);
			useRootFontSizeWarning();
			return themeContext;
		};
		useThemeProviderWarning = (themeContext) => {
			import_react$54.useEffect(() => {}, [themeContext]);
		};
		useRootFontSizeWarning = () => {
			import_react$54.useEffect(() => {}, []);
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useSyncExternalStore.js
function useSyncExternalStoreShim(subscribe, getSnapshot) {
	let value = getSnapshot();
	let [{ instance }, forceUpdate] = import_react$53.useState({ instance: {
		value,
		getSnapshot
	} });
	import_react$53.useLayoutEffect(() => {
		instance.value = value;
		instance.getSnapshot = getSnapshot;
		if (!Object.is(value, getSnapshot())) forceUpdate({ instance });
	}, [
		subscribe,
		value,
		getSnapshot
	]);
	import_react$53.useEffect(() => {
		let synchronize = () => {
			if (!Object.is(instance.value, instance.getSnapshot())) forceUpdate({ instance });
		};
		synchronize();
		return subscribe(synchronize);
	}, [subscribe]);
	return value;
}
var import_react$53, _React$1, useSyncExternalStore;
function init_useSyncExternalStore() {
	return (init_useSyncExternalStore = __esmMin((() => {
		import_react$53 = /* @__PURE__ */ __toESM(require_react(), 1);
		_React$1 = import_react$53;
		useSyncExternalStore = _React$1.useSyncExternalStore || useSyncExternalStoreShim;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useMediaQuery.js
var import_react$52, useMediaQuery;
function init_useMediaQuery() {
	return (init_useMediaQuery = __esmMin((() => {
		import_react$52 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_useSyncExternalStore();
		useMediaQuery = (queryString) => {
			let getSnapshot = import_react$52.useCallback(() => "undefined" != typeof window ? window.matchMedia?.(queryString).matches : void 0, [queryString]);
			let subscribe = import_react$52.useCallback((onChange) => {
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
var import_react$51, useSafeContext;
function init_useSafeContext() {
	return (init_useSafeContext = __esmMin((() => {
		import_react$51 = /* @__PURE__ */ __toESM(require_react(), 1);
		useSafeContext = (context) => {
			let value = import_react$51.useContext(context);
			if (!value) throw new Error(`${context.displayName || "Context"} is undefined`);
			return value;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useLatestRef.js
var import_react$50, useLatestRef$2;
function init_useLatestRef() {
	return (init_useLatestRef = __esmMin((() => {
		import_react$50 = /* @__PURE__ */ __toESM(require_react(), 1);
		useLatestRef$2 = (value) => {
			let valueRef = import_react$50.useRef(value);
			import_react$50.useEffect(() => {
				valueRef.current = value;
			}, [value]);
			return valueRef;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useIsomorphicLayoutEffect.js
var import_react$49, useIsomorphicLayoutEffect;
function init_useIsomorphicLayoutEffect() {
	return (init_useIsomorphicLayoutEffect = __esmMin((() => {
		import_react$49 = /* @__PURE__ */ __toESM(require_react(), 1);
		useIsomorphicLayoutEffect = "undefined" != typeof window ? import_react$49.useLayoutEffect : import_react$49.useEffect;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useIsClient.js
var import_react$48, useIsClient;
function init_useIsClient() {
	return (init_useIsClient = __esmMin((() => {
		import_react$48 = /* @__PURE__ */ __toESM(require_react(), 1);
		useIsClient = () => {
			let [isClient, setIsClient] = import_react$48.useState(false);
			import_react$48.useEffect(() => {
				setIsClient(true);
			}, []);
			return isClient;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useId.js
var import_react$47, useId$1, useUniqueValue;
function init_useId() {
	return (init_useId = __esmMin((() => {
		import_react$47 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_numbers();
		useId$1 = () => {
			let uniqueValue = useUniqueValue();
			return import_react$47.useMemo(() => `iui-${uniqueValue}`, [uniqueValue]);
		};
		useUniqueValue = import_react$47.useId ?? (() => import_react$47.useMemo(() => getRandomValue(10), []));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useControlledState.js
var import_react$46, useControlledState;
function init_useControlledState() {
	return (init_useControlledState = __esmMin((() => {
		import_react$46 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_useLatestRef();
		useControlledState = (initialValue, controlledState, setControlledState) => {
			let [uncontrolledState, setUncontrolledState] = import_react$46.useState(initialValue);
			let state = import_react$46.useMemo(() => void 0 !== controlledState ? controlledState : uncontrolledState, [controlledState, uncontrolledState]);
			let oldState = useLatestRef$2(state);
			return [state, import_react$46.useCallback((value) => {
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
	return import_react$44.useCallback((...args) => latestCallback.current?.(...args), [latestCallback]);
}
var import_react$44;
function init_useStableCallback() {
	return (init_useStableCallback = __esmMin((() => {
		import_react$44 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_useLatestRef();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/focusable.js
function useFocusableElements(root, extraOptions) {
	let focusableElementsRef = import_react$43.useRef([]);
	let [focusableElements, setFocusableElements] = import_react$43.useState(focusableElementsRef.current);
	let setFocusableElementsRefAndState = (newFocusableElements) => {
		focusableElementsRef.current = newFocusableElements;
		setFocusableElements(newFocusableElements);
	};
	let { filter: filterProp } = extraOptions ?? {};
	let filter = useLatestRef$2(filterProp);
	let returnValue = import_react$43.useMemo(() => ({
		focusableElementsRef,
		focusableElements
	}), [focusableElementsRef, focusableElements]);
	return useSyncExternalStore(import_react$43.useCallback(() => {
		if (!root) {
			setFocusableElementsRefAndState([]);
			return () => {};
		}
		updateFocusableElements();
		let observer = new MutationObserver(() => updateFocusableElements());
		observer.observe(root, {
			childList: true,
			subtree: true
		});
		return () => observer.disconnect();
		function updateFocusableElements() {
			let newFocusableElements = getFocusableElements(root);
			if (filter.current) newFocusableElements = filter.current?.(newFocusableElements);
			setFocusableElementsRefAndState(newFocusableElements);
		}
	}, [root, filter]), () => returnValue, () => returnValue);
}
var import_react$43, tabbableElementsSelector, getTabbableElements, getFocusableElements;
function init_focusable() {
	return (init_focusable = __esmMin((() => {
		import_react$43 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_useSyncExternalStore(), init_useLatestRef();
		tabbableElementsSelector = "a[href], button, input, textarea, select, details, audio[controls], video[controls], [contenteditable]:not([contenteditable=\"false\"]), [tabindex]:not([tabindex=\"-1\"])";
		getTabbableElements = (container) => {
			if (!container) return [];
			let elements = container.querySelectorAll(tabbableElementsSelector);
			return Array.from(elements).filter((el) => !el.hasAttribute("disabled") && !el.classList.contains("iui-disabled") && "true" !== el.getAttribute("aria-disabled"));
		};
		getFocusableElements = (container) => {
			if (!container) return [];
			let elements = container.querySelectorAll(`${tabbableElementsSelector}, [tabindex="-1"]`);
			return Array.from(elements).filter((el) => !el.hasAttribute("disabled") && !el.classList.contains("iui-disabled") && "true" !== el.getAttribute("aria-disabled"));
		};
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
var import_react$42, import_classnames$16, _base, polymorphic, getScopedClassName;
function init_polymorphic() {
	return (init_polymorphic = __esmMin((() => {
		import_react$42 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$16 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_useGlobals();
		init_styles();
		_base = (defaultElement) => (className, attrs) => {
			return import_react$42.forwardRef(({ as = defaultElement, ...props }, ref) => {
				props = {
					...attrs,
					...props,
					className: getScopedClassName((0, import_classnames$16.default)(className, attrs?.className, props.className))
				};
				let Element = as || "div";
				if ("button" === Element || "a" === Element || "input" === Element && "checkbox" === props.type) {
					var _props;
					(_props = props).tabIndex ?? (_props.tabIndex = 0);
				}
				useGlobals();
				return import_react$42.createElement(Element, {
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
var import_react$41, _React, isReact17or18, cloneElementWithRef;
function init_react() {
	return (init_react = __esmMin((() => {
		import_react$41 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_useMergedRefs();
		_React = import_react$41;
		isReact17or18 = (() => {
			let version = _React.version?.split(".")?.[0];
			return ["17", "18"].includes(version);
		})();
		cloneElementWithRef = (children, getProps) => {
			if (!children) return null;
			if (!import_react$41.isValidElement(children)) return children;
			let childrenRef = isReact17or18 ? children?.ref : children.props?.ref;
			let props = getProps(children);
			let ref = mergeRefs(...[childrenRef, "ref" in props ? props.ref : null].filter(Boolean));
			return import_react$41.cloneElement(children, {
				...props,
				ref
			});
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/Resizer.js
var import_react$40, Resizer, Resizers, ResizerStyles, resizerStyles;
function init_Resizer() {
	return (init_Resizer = __esmMin((() => {
		import_react$40 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_numbers(), init_dom();
		Resizer = (props) => import_react$40.createElement("div", { style: {
			position: "absolute",
			inset: -6,
			display: "grid",
			pointerEvents: "none"
		} }, import_react$40.createElement(ResizerStyles, null), import_react$40.createElement(Resizers, props));
		Resizers = (props) => {
			let { elementRef, containerRef, onResizeStart, onResizeEnd } = props;
			let isResizing = import_react$40.useRef(false);
			let onResizePointerDown = (event) => {
				if (!elementRef.current || 0 !== event.button) return;
				let initialPointerX = event.clientX;
				let initialPointerY = event.clientY;
				let [initialTranslateX, initialTranslateY] = getTranslateValuesFromElement(elementRef.current);
				let { width: initialWidth, height: initialHeight } = elementRef.current.getBoundingClientRect();
				let width = `${initialWidth}px`;
				let height = `${initialHeight}px`;
				let translateX = initialTranslateX;
				let translateY = initialTranslateY;
				let minWidth = parseFloat(getComputedStyle(elementRef.current).minWidth);
				if (Number.isNaN(minWidth)) minWidth = 380;
				let minHeight = parseFloat(getComputedStyle(elementRef.current).minHeight);
				let resizer = event.currentTarget.dataset.iuiResizer;
				let ownerDocument = elementRef.current.ownerDocument || document;
				let originalUserSelect = ownerDocument.body.style.userSelect;
				ownerDocument.body.style.userSelect = "none";
				let onResizePointerMove = (event) => {
					if (!elementRef.current) return;
					if (!isResizing.current) {
						isResizing.current = true;
						onResizeStart?.();
					}
					let containerRect = containerRef?.current?.getBoundingClientRect();
					let clientX = getBoundedValue(event.clientX, containerRect?.left ?? 0, containerRect?.right ?? ownerDocument.documentElement.clientWidth ?? 0);
					let clientY = getBoundedValue(event.clientY, containerRect?.top ?? 0, containerRect?.bottom ?? ownerDocument.documentElement.clientHeight ?? 0);
					let diffX = initialPointerX - clientX;
					let diffY = initialPointerY - clientY;
					switch (resizer) {
						case "top-left": {
							let newHeight = initialHeight + diffY;
							if (newHeight >= minHeight) {
								height = elementRef.current.style.height = `${newHeight}px`;
								translateY = initialTranslateY - diffY;
							}
							let newWidth = initialWidth + diffX;
							if (newWidth >= minWidth) {
								width = elementRef.current.style.width = `${newWidth}px`;
								translateX = initialTranslateX - diffX;
							}
							elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
							break;
						}
						case "top": {
							let newHeight = initialHeight + diffY;
							if (newHeight < minHeight) break;
							height = elementRef.current.style.height = `${newHeight}px`;
							translateY = initialTranslateY - diffY;
							elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
							break;
						}
						case "top-right": {
							let newHeight = initialHeight + diffY;
							if (newHeight >= minHeight) {
								height = elementRef.current.style.height = `${newHeight}px`;
								translateY = initialTranslateY - diffY;
							}
							width = elementRef.current.style.width = `${initialWidth - diffX}px`;
							elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
							break;
						}
						case "right":
							width = elementRef.current.style.width = `${initialWidth - diffX}px`;
							height = elementRef.current.style.height = `${initialHeight}px`;
							elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
							break;
						case "bottom-right":
							width = elementRef.current.style.width = `${initialWidth - diffX}px`;
							height = elementRef.current.style.height = `${initialHeight - diffY}px`;
							elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
							break;
						case "bottom":
							height = elementRef.current.style.height = `${initialHeight - diffY}px`;
							elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
							break;
						case "bottom-left": {
							let newWidth = initialWidth + diffX;
							if (newWidth >= minWidth) {
								width = elementRef.current.style.width = `${newWidth}px`;
								translateX = initialTranslateX - diffX;
							}
							height = elementRef.current.style.height = `${initialHeight - diffY}px`;
							elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
							break;
						}
						case "left": {
							let newWidth = initialWidth + diffX;
							if (newWidth < minWidth) break;
							width = elementRef.current.style.width = `${newWidth}px`;
							height = elementRef.current.style.height = `${initialHeight}px`;
							translateX = initialTranslateX - diffX;
							elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
							break;
						}
					}
				};
				ownerDocument.addEventListener("pointermove", onResizePointerMove);
				ownerDocument.addEventListener("pointerup", () => {
					ownerDocument.removeEventListener("pointermove", onResizePointerMove);
					if (elementRef.current) {
						ownerDocument.body.style.userSelect = originalUserSelect;
						isResizing.current = false;
						onResizeEnd?.({
							width,
							height,
							transform: `translate(${translateX}px, ${translateY}px)`
						});
					}
				}, { once: true });
			};
			return import_react$40.createElement(import_react$40.Fragment, null, import_react$40.createElement("div", {
				"data-iui-resizer": "top-left",
				onPointerDown: onResizePointerDown,
				style: { cursor: "nw-resize" }
			}), import_react$40.createElement("div", {
				"data-iui-resizer": "top",
				onPointerDown: onResizePointerDown,
				style: { cursor: "n-resize" }
			}), import_react$40.createElement("div", {
				"data-iui-resizer": "top-right",
				onPointerDown: onResizePointerDown,
				style: { cursor: "ne-resize" }
			}), import_react$40.createElement("div", {
				"data-iui-resizer": "right",
				onPointerDown: onResizePointerDown,
				style: { cursor: "e-resize" }
			}), import_react$40.createElement("div", {
				"data-iui-resizer": "bottom-right",
				onPointerDown: onResizePointerDown,
				style: { cursor: "se-resize" }
			}), import_react$40.createElement("div", {
				"data-iui-resizer": "bottom",
				onPointerDown: onResizePointerDown,
				style: { cursor: "s-resize" }
			}), import_react$40.createElement("div", {
				"data-iui-resizer": "bottom-left",
				onPointerDown: onResizePointerDown,
				style: { cursor: "sw-resize" }
			}), import_react$40.createElement("div", {
				"data-iui-resizer": "left",
				onPointerDown: onResizePointerDown,
				style: { cursor: "w-resize" }
			}));
		};
		ResizerStyles = import_react$40.memo(() => import_react$40.createElement("style", null, resizerStyles));
		resizerStyles = `
[data-iui-resizer] {
  pointer-events: auto;
  grid-area: 1 / 1 / -1 / -1;
  width: 12px;
  height: 12px;
  z-index: 1;
}
[data-iui-resizer='top'],
[data-iui-resizer='bottom'] {
  height: 8px;
  width: auto;
  z-index: 0;
}
[data-iui-resizer='left'],
[data-iui-resizer='right'] {
  height: auto;
  width: 8px;
  z-index: 0;
}
[data-iui-resizer^='top'] {
  align-self: start;
}
[data-iui-resizer^='bottom'] {
  align-self: end;
}
[data-iui-resizer$='left'] {
  justify-self: start;
}
[data-iui-resizer$='right'] {
  justify-self: end;
}`;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/FocusTrap.js
var import_react$39, FocusTrap;
function init_FocusTrap() {
	return (init_FocusTrap = __esmMin((() => {
		import_react$39 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_focusable();
		FocusTrap = (props) => {
			let { children } = props;
			let firstFocusTrapRef = import_react$39.useRef(null);
			let getFirstLastFocusables = import_react$39.useCallback(() => {
				let childrenElement = firstFocusTrapRef.current?.nextElementSibling;
				let elements = getTabbableElements(childrenElement);
				return [elements[0], elements[(elements.length || 1) - 1]];
			}, []);
			let onFirstFocus = import_react$39.useCallback((event) => {
				let [firstElement, lastElement] = getFirstLastFocusables();
				if (event.relatedTarget === firstElement) lastElement?.focus();
				else firstElement?.focus();
			}, [getFirstLastFocusables]);
			let onLastFocus = import_react$39.useCallback((event) => {
				let [firstElement, lastElement] = getFirstLastFocusables();
				if (event.relatedTarget === lastElement) firstElement?.focus();
				else lastElement?.focus();
			}, [getFirstLastFocusables]);
			return import_react$39.createElement(import_react$39.Fragment, null, import_react$39.createElement("div", {
				ref: firstFocusTrapRef,
				tabIndex: 0,
				onFocus: onFirstFocus,
				"aria-hidden": true
			}), children, import_react$39.createElement("div", {
				tabIndex: 0,
				onFocus: onLastFocus,
				"aria-hidden": true
			}));
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
	const ref = import_react$37.useRef(value);
	index$1(() => {
		ref.current = value;
	});
	return ref;
}
function useEffectEvent(callback) {
	const ref = import_react$37.useRef(() => {});
	useSafeInsertionEffect(() => {
		ref.current = callback;
	});
	return import_react$37.useCallback(function() {
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
var import_react$37, import_react$38, FOCUSABLE_ATTRIBUTE$1, TYPEABLE_SELECTOR, ARROW_LEFT$1, ARROW_RIGHT$1, ARROW_UP$1, ARROW_DOWN$1, index$1, SafeReact$1, useSafeInsertionEffect, getTabbableOptions;
function init_floating_ui_react_utils() {
	return (init_floating_ui_react_utils = __esmMin((() => {
		init_floating_ui_utils_dom();
		import_react$37 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react$38 = require_react();
		init_floating_ui_utils();
		init_index_esm();
		FOCUSABLE_ATTRIBUTE$1 = "data-floating-ui-focusable";
		TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
		ARROW_LEFT$1 = "ArrowLeft";
		ARROW_RIGHT$1 = "ArrowRight";
		ARROW_UP$1 = "ArrowUp";
		ARROW_DOWN$1 = "ArrowDown";
		index$1 = typeof document !== "undefined" ? import_react$38.useLayoutEffect : function noop() {};
		SafeReact$1 = { ...import_react$37 };
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
	const ref = import_react$35.useRef(value);
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
	const [data, setData] = import_react$35.useState({
		x: 0,
		y: 0,
		strategy,
		placement,
		middlewareData: {},
		isPositioned: false
	});
	const [latestMiddleware, setLatestMiddleware] = import_react$35.useState(middleware);
	if (!deepEqual(latestMiddleware, middleware)) setLatestMiddleware(middleware);
	const [_reference, _setReference] = import_react$35.useState(null);
	const [_floating, _setFloating] = import_react$35.useState(null);
	const setReference = import_react$35.useCallback((node) => {
		if (node !== referenceRef.current) {
			referenceRef.current = node;
			_setReference(node);
		}
	}, []);
	const setFloating = import_react$35.useCallback((node) => {
		if (node !== floatingRef.current) {
			floatingRef.current = node;
			_setFloating(node);
		}
	}, []);
	const referenceEl = externalReference || _reference;
	const floatingEl = externalFloating || _floating;
	const referenceRef = import_react$35.useRef(null);
	const floatingRef = import_react$35.useRef(null);
	const dataRef = import_react$35.useRef(data);
	const hasWhileElementsMounted = whileElementsMounted != null;
	const whileElementsMountedRef = useLatestRef(whileElementsMounted);
	const platformRef = useLatestRef(platform);
	const openRef = useLatestRef(open);
	const update = import_react$35.useCallback(() => {
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
	const isMountedRef = import_react$35.useRef(false);
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
	const refs = import_react$35.useMemo(() => ({
		reference: referenceRef,
		floating: floatingRef,
		setReference,
		setFloating
	}), [setReference, setFloating]);
	const elements = import_react$35.useMemo(() => ({
		reference: referenceEl,
		floating: floatingEl
	}), [referenceEl, floatingEl]);
	const floatingStyles = import_react$35.useMemo(() => {
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
	return import_react$35.useMemo(() => ({
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
var import_react$35, import_react$36, import_react_dom$4, index, offset, shift, flip, size, autoPlacement, hide, inline;
function init_floating_ui_react_dom() {
	return (init_floating_ui_react_dom = __esmMin((() => {
		init_floating_ui_dom();
		import_react$35 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react$36 = require_react();
		import_react_dom$4 = /* @__PURE__ */ __toESM(require_react_dom(), 1);
		index = typeof document !== "undefined" ? import_react$36.useLayoutEffect : function noop() {};
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
	const cleanupRef = import_react$34.useRef(void 0);
	const refEffect = import_react$34.useCallback((instance) => {
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
	return import_react$34.useMemo(() => {
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
	const [nodes, setNodes] = import_react$34.useState(() => /* @__PURE__ */ new Set());
	const register = import_react$34.useCallback((node) => {
		setNodes((prevSet) => new Set(prevSet).add(node));
	}, []);
	const unregister = import_react$34.useCallback((node) => {
		setNodes((prevSet) => {
			const set = new Set(prevSet);
			set.delete(node);
			return set;
		});
	}, []);
	const map = import_react$34.useMemo(() => {
		const newMap = /* @__PURE__ */ new Map();
		Array.from(nodes.keys()).sort(sortByDocumentPosition).forEach((node, index) => {
			newMap.set(node, index);
		});
		return newMap;
	}, [nodes]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingListContext.Provider, {
		value: import_react$34.useMemo(() => ({
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
	const { register, unregister, map, elementsRef, labelsRef } = import_react$34.useContext(FloatingListContext);
	const [index, setIndex] = import_react$34.useState(null);
	const componentRef = import_react$34.useRef(null);
	const ref = import_react$34.useCallback((node) => {
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
	return import_react$34.useMemo(() => ({
		ref,
		index: index == null ? -1 : index
	}), [index, ref]);
}
function renderJsx(render, computedProps) {
	if (typeof render === "function") return render(computedProps);
	if (render) return /*#__PURE__*/ import_react$34.cloneElement(render, computedProps);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", { ...computedProps });
}
function useFloatingId() {
	const [id, setId] = import_react$34.useState(() => serverHandoffComplete ? genId() : void 0);
	index$1(() => {
		if (id == null) setId(genId());
	}, []);
	import_react$34.useEffect(() => {
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
		value: import_react$34.useMemo(() => ({
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
	const nodesRef = import_react$34.useRef([]);
	const addNode = import_react$34.useCallback((node) => {
		nodesRef.current = [...nodesRef.current, node];
	}, []);
	const removeNode = import_react$34.useCallback((node) => {
		nodesRef.current = nodesRef.current.filter((n) => n !== node);
	}, []);
	const [events] = import_react$34.useState(() => createEventEmitter());
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingTreeContext.Provider, {
		value: import_react$34.useMemo(() => ({
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
	const pointerTypeRef = import_react$34.useRef();
	const timeoutRef = import_react$34.useRef(-1);
	const handlerRef = import_react$34.useRef();
	const restTimeoutRef = import_react$34.useRef(-1);
	const blockMouseMoveRef = import_react$34.useRef(true);
	const performedPointerEventsMutationRef = import_react$34.useRef(false);
	const unbindMouseMoveRef = import_react$34.useRef(() => {});
	const restTimeoutPendingRef = import_react$34.useRef(false);
	const isHoverOpen = useEffectEvent(() => {
		var _dataRef$current$open;
		const type = (_dataRef$current$open = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open.type;
		return (type == null ? void 0 : type.includes("mouse")) && type !== "mousedown";
	});
	import_react$34.useEffect(() => {
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
	import_react$34.useEffect(() => {
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
	const closeWithDelay = import_react$34.useCallback(function(event, runElseBranch, reason) {
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
	import_react$34.useEffect(() => {
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
	import_react$34.useEffect(() => {
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
	const reference = import_react$34.useMemo(() => {
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
	return import_react$34.useMemo(() => enabled ? { reference } : {}, [enabled, reference]);
}
/**
* Provides context for a group of floating elements that should share a
* `delay`.
* @see https://floating-ui.com/docs/FloatingDelayGroup
*/
function FloatingDelayGroup(props) {
	const { children, delay, timeoutMs = 0 } = props;
	const [state, setState] = import_react$34.useReducer((prev, next) => ({
		...prev,
		...next
	}), {
		delay,
		timeoutMs,
		initialDelay: delay,
		currentId: null,
		isInstantPhase: false
	});
	const initialCurrentIdRef = import_react$34.useRef(null);
	const setCurrentId = import_react$34.useCallback((currentId) => {
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
		value: import_react$34.useMemo(() => ({
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
	const [portalNode, setPortalNode] = import_react$34.useState(null);
	const portalNodeRef = import_react$34.useRef(null);
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
	const [focusManagerState, setFocusManagerState] = import_react$34.useState(null);
	const beforeOutsideRef = import_react$34.useRef(null);
	const afterOutsideRef = import_react$34.useRef(null);
	const beforeInsideRef = import_react$34.useRef(null);
	const afterInsideRef = import_react$34.useRef(null);
	const modal = focusManagerState == null ? void 0 : focusManagerState.modal;
	const open = focusManagerState == null ? void 0 : focusManagerState.open;
	const shouldRenderGuards = !!focusManagerState && !focusManagerState.modal && focusManagerState.open && preserveTabOrder && !!(root || portalNode);
	import_react$34.useEffect(() => {
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
	import_react$34.useEffect(() => {
		if (!portalNode) return;
		if (open) return;
		enableFocusInside(portalNode);
	}, [open, portalNode]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PortalContext.Provider, {
		value: import_react$34.useMemo(() => ({
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
	return import_react$34.useMemo(() => {
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
	const startDismissButtonRef = import_react$34.useRef(null);
	const endDismissButtonRef = import_react$34.useRef(null);
	const preventReturnFocusRef = import_react$34.useRef(false);
	const isPointerDownRef = import_react$34.useRef(false);
	const tabbableIndexRef = import_react$34.useRef(-1);
	const blurTimeoutRef = import_react$34.useRef(-1);
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
	import_react$34.useEffect(() => {
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
	import_react$34.useEffect(() => {
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
	import_react$34.useEffect(() => {
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
	const beforeGuardRef = import_react$34.useRef(null);
	const afterGuardRef = import_react$34.useRef(null);
	const mergedBeforeGuardRef = useLiteMergeRefs([beforeGuardRef, portalContext == null ? void 0 : portalContext.beforeInsideRef]);
	const mergedAfterGuardRef = useLiteMergeRefs([afterGuardRef, portalContext == null ? void 0 : portalContext.afterInsideRef]);
	import_react$34.useEffect(() => {
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
	import_react$34.useEffect(() => {
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
	const pointerTypeRef = import_react$34.useRef();
	const didKeyDownRef = import_react$34.useRef(false);
	const reference = import_react$34.useMemo(() => ({
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
	return import_react$34.useMemo(() => enabled ? { reference } : {}, [enabled, reference]);
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
	const endedOrStartedInsideRef = import_react$34.useRef(false);
	const { escapeKey: escapeKeyBubbles, outsidePress: outsidePressBubbles } = normalizeProp(bubbles);
	const { escapeKey: escapeKeyCapture, outsidePress: outsidePressCapture } = normalizeProp(capture);
	const isComposingRef = import_react$34.useRef(false);
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
	import_react$34.useEffect(() => {
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
	import_react$34.useEffect(() => {
		dataRef.current.insideReactTree = false;
	}, [
		dataRef,
		outsidePress,
		outsidePressEvent
	]);
	const reference = import_react$34.useMemo(() => ({
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
	const floating = import_react$34.useMemo(() => {
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
	return import_react$34.useMemo(() => enabled ? {
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
	const dataRef = import_react$34.useRef({});
	const [events] = import_react$34.useState(() => createEventEmitter());
	const nested = useFloatingParentNodeId() != null;
	const [positionReference, setPositionReference] = import_react$34.useState(elementsProp.reference);
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
	const refs = import_react$34.useMemo(() => ({ setPositionReference }), []);
	const elements = import_react$34.useMemo(() => ({
		reference: positionReference || elementsProp.reference || null,
		floating: elementsProp.floating || null,
		domReference: elementsProp.reference
	}), [
		positionReference,
		elementsProp.reference,
		elementsProp.floating
	]);
	return import_react$34.useMemo(() => ({
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
	const [_domReference, setDomReference] = import_react$34.useState(null);
	const [positionReference, _setPositionReference] = import_react$34.useState(null);
	const domReference = (computedElements == null ? void 0 : computedElements.domReference) || _domReference;
	const domReferenceRef = import_react$34.useRef(null);
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
	const setPositionReference = import_react$34.useCallback((node) => {
		const computedPositionReference = isElement(node) ? {
			getBoundingClientRect: () => node.getBoundingClientRect(),
			getClientRects: () => node.getClientRects(),
			contextElement: node
		} : node;
		_setPositionReference(computedPositionReference);
		position.refs.setReference(computedPositionReference);
	}, [position.refs]);
	const setReference = import_react$34.useCallback((node) => {
		if (isElement(node) || node === null) {
			domReferenceRef.current = node;
			setDomReference(node);
		}
		if (isElement(position.refs.reference.current) || position.refs.reference.current === null || node !== null && !isElement(node)) position.refs.setReference(node);
	}, [position.refs]);
	const refs = import_react$34.useMemo(() => ({
		...position.refs,
		setReference,
		setPositionReference,
		domReference: domReferenceRef
	}), [
		position.refs,
		setReference,
		setPositionReference
	]);
	const elements = import_react$34.useMemo(() => ({
		...position.elements,
		domReference
	}), [position.elements, domReference]);
	const context = import_react$34.useMemo(() => ({
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
	return import_react$34.useMemo(() => ({
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
	const blockFocusRef = import_react$34.useRef(false);
	const timeoutRef = import_react$34.useRef(-1);
	const keyboardModalityRef = import_react$34.useRef(true);
	import_react$34.useEffect(() => {
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
	import_react$34.useEffect(() => {
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
	import_react$34.useEffect(() => {
		return () => {
			clearTimeoutIfSet(timeoutRef);
		};
	}, []);
	const reference = import_react$34.useMemo(() => ({
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
	return import_react$34.useMemo(() => enabled ? { reference } : {}, [enabled, reference]);
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
	const getReferenceProps = import_react$34.useCallback((userProps) => mergeProps(userProps, propsList, "reference"), referenceDeps);
	const getFloatingProps = import_react$34.useCallback((userProps) => mergeProps(userProps, propsList, "floating"), floatingDeps);
	const getItemProps = import_react$34.useCallback((userProps) => mergeProps(userProps, propsList, "item"), itemDeps);
	return import_react$34.useMemo(() => ({
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
	const focusItemOnOpenRef = import_react$34.useRef(focusItemOnOpen);
	const indexRef = import_react$34.useRef(selectedIndex != null ? selectedIndex : -1);
	const keyRef = import_react$34.useRef(null);
	const isPointerModalityRef = import_react$34.useRef(true);
	const previousOnNavigateRef = import_react$34.useRef(onNavigate);
	const previousMountedRef = import_react$34.useRef(!!elements.floating);
	const previousOpenRef = import_react$34.useRef(open);
	const forceSyncFocusRef = import_react$34.useRef(false);
	const forceScrollIntoViewRef = import_react$34.useRef(false);
	const disabledIndicesRef = useLatestRef$1(disabledIndices);
	const latestOpenRef = useLatestRef$1(open);
	const scrollItemIntoViewRef = useLatestRef$1(scrollItemIntoView);
	const selectedIndexRef = useLatestRef$1(selectedIndex);
	const [activeId, setActiveId] = import_react$34.useState();
	const [virtualId, setVirtualId] = import_react$34.useState();
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
	const item = import_react$34.useMemo(() => {
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
	const getParentOrientation = import_react$34.useCallback(() => {
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
	const ariaActiveDescendantProp = import_react$34.useMemo(() => {
		return virtual && open && hasActiveIndex && { "aria-activedescendant": virtualId || activeId };
	}, [
		virtual,
		open,
		hasActiveIndex,
		virtualId,
		activeId
	]);
	const floating = import_react$34.useMemo(() => {
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
	const reference = import_react$34.useMemo(() => {
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
	return import_react$34.useMemo(() => enabled ? {
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
	const floatingId = import_react$34.useMemo(() => {
		var _getFloatingFocusElem;
		return ((_getFloatingFocusElem = getFloatingFocusElement(elements.floating)) == null ? void 0 : _getFloatingFocusElem.id) || defaultFloatingId;
	}, [elements.floating, defaultFloatingId]);
	const ariaRole = (_componentRoleToAriaR = componentRoleToAriaRoleMap.get(role)) != null ? _componentRoleToAriaR : role;
	const isNested = useFloatingParentNodeId() != null;
	const reference = import_react$34.useMemo(() => {
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
	const floating = import_react$34.useMemo(() => {
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
	const item = import_react$34.useCallback((_ref) => {
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
	return import_react$34.useMemo(() => enabled ? {
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
var import_react$34, import_jsx_runtime, import_react_dom$3, FloatingListContext, FOCUSABLE_ATTRIBUTE, ACTIVE_KEY, SELECTED_KEY, ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ARROW_DOWN, CompositeContext, horizontalKeys, verticalKeys, allKeys, Composite, CompositeItem, SafeReact, serverHandoffComplete, count, genId, useId, FloatingNodeContext, FloatingTreeContext, useFloatingParentNodeId, useFloatingTree, safePolygonIdentifier, NOOP, FloatingDelayGroupContext, useDelayGroupContext, rafId, counters, uncontrolledElementsSet, markerMap, lockCount$1, supportsInert, correctElements, HIDDEN_STYLES, FocusGuard, HIDDEN_OWNER_STYLES, PortalContext, attr, usePortalContext, LIST_LIMIT, previouslyFocusedElements, VisuallyHiddenDismiss, bubbleHandlerKeys, captureHandlerKeys, normalizeProp, ESCAPE, componentRoleToAriaRoleMap;
function init_floating_ui_react() {
	return (init_floating_ui_react = __esmMin((() => {
		import_react$34 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_floating_ui_react_utils();
		import_jsx_runtime = require_jsx_runtime();
		init_floating_ui_utils_dom();
		init_index_esm();
		import_react_dom$3 = /* @__PURE__ */ __toESM(require_react_dom(), 1);
		init_floating_ui_react_dom();
		FloatingListContext = /*#__PURE__*/ import_react$34.createContext({
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
		CompositeContext = /*#__PURE__*/ import_react$34.createContext({
			activeIndex: 0,
			onNavigate: () => {}
		});
		horizontalKeys = [ARROW_LEFT, ARROW_RIGHT];
		verticalKeys = [ARROW_UP, ARROW_DOWN];
		allKeys = [...horizontalKeys, ...verticalKeys];
		Composite = /*#__PURE__*/ import_react$34.forwardRef(function Composite(props, forwardedRef) {
			const { render, orientation = "both", loop = true, rtl = false, cols = 1, disabledIndices, activeIndex: externalActiveIndex, onNavigate: externalSetActiveIndex, itemSizes, dense = false, ...domProps } = props;
			const [internalActiveIndex, internalSetActiveIndex] = import_react$34.useState(0);
			const activeIndex = externalActiveIndex != null ? externalActiveIndex : internalActiveIndex;
			const onNavigate = useEffectEvent(externalSetActiveIndex != null ? externalSetActiveIndex : internalSetActiveIndex);
			const elementsRef = import_react$34.useRef([]);
			const renderElementProps = render && typeof render !== "function" ? render.props : {};
			const contextValue = import_react$34.useMemo(() => ({
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
		CompositeItem = /*#__PURE__*/ import_react$34.forwardRef(function CompositeItem(props, forwardedRef) {
			const { render, ...domProps } = props;
			const renderElementProps = render && typeof render !== "function" ? render.props : {};
			const { activeIndex, onNavigate } = import_react$34.useContext(CompositeContext);
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
		SafeReact = { ...import_react$34 };
		serverHandoffComplete = false;
		count = 0;
		genId = () => "floating-ui-" + Math.random().toString(36).slice(2, 6) + count++;
		useId = SafeReact.useId || useFloatingId;
		FloatingNodeContext = /*#__PURE__*/ import_react$34.createContext(null);
		FloatingTreeContext = /*#__PURE__*/ import_react$34.createContext(null);
		useFloatingParentNodeId = () => {
			var _React$useContext;
			return ((_React$useContext = import_react$34.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
		};
		useFloatingTree = () => import_react$34.useContext(FloatingTreeContext);
		safePolygonIdentifier = /*#__PURE__*/ createAttribute("safe-polygon");
		NOOP = () => {};
		FloatingDelayGroupContext = /*#__PURE__*/ import_react$34.createContext({
			delay: 0,
			initialDelay: 0,
			timeoutMs: 0,
			currentId: null,
			setCurrentId: NOOP,
			setState: NOOP,
			isInstantPhase: false
		});
		useDelayGroupContext = () => import_react$34.useContext(FloatingDelayGroupContext);
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
		FocusGuard = /*#__PURE__*/ import_react$34.forwardRef(function FocusGuard(props, ref) {
			const [role, setRole] = import_react$34.useState();
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
		PortalContext = /*#__PURE__*/ import_react$34.createContext(null);
		attr = /*#__PURE__*/ createAttribute("portal");
		usePortalContext = () => import_react$34.useContext(PortalContext);
		LIST_LIMIT = 20;
		previouslyFocusedElements = [];
		VisuallyHiddenDismiss = /*#__PURE__*/ import_react$34.forwardRef(function VisuallyHiddenDismiss(props, ref) {
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
var import_react$33, import_classnames$15, defaultTooltipDelay, useTooltip, Tooltip;
function init_Tooltip() {
	return (init_Tooltip = __esmMin((() => {
		import_react$33 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$15 = /* @__PURE__ */ __toESM(require_classnames(), 1);
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
			let syncWithControlledState = import_react$33.useCallback((element) => {
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
				whileElementsMounted: import_react$33.useMemo(() => open ? (...args) => autoUpdate(...args, autoUpdateOptions) : void 0, [autoUpdateOptions, open]),
				middleware: import_react$33.useMemo(() => [
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
			let ariaProps = import_react$33.useMemo(() => "description" === ariaStrategy ? { "aria-describedby": id } : "label" === ariaStrategy ? { "aria-labelledby": id } : {}, [ariaStrategy, id]);
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
			import_react$33.useEffect(() => {
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
			let getReferenceProps = import_react$33.useCallback((userProps) => interactions.getReferenceProps({
				...userProps,
				...ariaProps
			}), [interactions, ariaProps]);
			let floatingProps = import_react$33.useMemo(() => ({
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
			let setFloating = import_react$33.useCallback((element) => {
				_setFloating(element);
				syncWithControlledState(element);
			}, [_setFloating, syncWithControlledState]);
			let setReference = useStableCallback(floating.refs.setReference);
			let setPositionReference = useStableCallback(floating.refs.setPositionReference);
			return import_react$33.useMemo(() => ({
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
		Tooltip = import_react$33.forwardRef((props, forwardedRef) => {
			let { content, children, portal = true, className, style, ...rest } = props;
			let tooltip = useTooltip(rest);
			let refs = useMergedRefs(tooltip.refs.setFloating, forwardedRef);
			return import_react$33.createElement(import_react$33.Fragment, null, cloneElementWithRef(children, (children) => ({
				...tooltip.getReferenceProps(children.props),
				ref: tooltip.refs.setReference
			})), "none" !== props.ariaStrategy || tooltip.context.open ? import_react$33.createElement(Portal, { portal }, import_react$33.createElement(Box, {
				className: (0, import_classnames$15.default)("iui-tooltip", className),
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
var import_react$32, import_classnames$14, VisuallyHidden, css;
function init_VisuallyHidden() {
	return (init_VisuallyHidden = __esmMin((() => {
		import_react$32 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$14 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_Box(), init_ShadowRoot(), init_HydrationProvider();
		VisuallyHidden = import_react$32.forwardRef((props, ref) => {
			let { as: asProp = "span", className, unhideOnFocus = true, children: childrenProp, ...rest } = props;
			let isHydrated = "hydrated" === useHydration();
			let children = [
				"div",
				"span",
				"p"
			].includes(asProp) ? import_react$32.createElement(import_react$32.Fragment, null, import_react$32.createElement(ShadowRoot$1, { css }, import_react$32.createElement("slot", null)), isHydrated && childrenProp) : childrenProp;
			return import_react$32.createElement(Box, {
				as: asProp,
				className: (0, import_classnames$14.default)("iui-visually-hidden", className),
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
var import_react$31, import_classnames$13, ButtonGroupContext, ButtonGroup, BaseGroup, OverflowGroup, OverflowGroupContent;
function init_ButtonGroup() {
	return (init_ButtonGroup = __esmMin((() => {
		import_react$31 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$13 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_Box(), init_OverflowContainer();
		init_floating_ui_react();
		init_Tooltip();
		ButtonGroupContext = import_react$31.createContext(void 0);
		ButtonGroup = import_react$31.forwardRef((props, forwardedRef) => {
			let { children: childrenProp, overflowButton, overflowPlacement = "end", orientation = "horizontal", ...rest } = props;
			let children = import_react$31.useMemo(() => {
				if ("toolbar" !== props.role) return childrenProp;
				return import_react$31.Children.map(childrenProp, (child, index) => import_react$31.isValidElement(child) ? import_react$31.createElement(CompositeItem, {
					key: index,
					render: child
				}) : child);
			}, [childrenProp, props.role]);
			let node = overflowButton ? import_react$31.createElement(OverflowGroup, {
				orientation,
				overflowButton,
				overflowPlacement,
				ref: forwardedRef,
				...rest
			}, children) : import_react$31.createElement(BaseGroup, {
				orientation,
				ref: forwardedRef,
				...rest
			}, children);
			return import_react$31.createElement(FloatingDelayGroup, { delay: defaultTooltipDelay }, import_react$31.createElement(ButtonGroupContext.Provider, { value: orientation }, "toolbar" === props.role ? import_react$31.createElement(Composite, {
				orientation,
				render: node,
				disabledIndices: []
			}) : node));
		});
		BaseGroup = import_react$31.forwardRef((props, forwardedRef) => {
			let { orientation, className, ...rest } = props;
			return import_react$31.createElement(Box, {
				className: (0, import_classnames$13.default)("iui-button-group", className),
				"data-iui-orientation": "vertical" === orientation ? orientation : void 0,
				ref: forwardedRef,
				...rest
			});
		});
		OverflowGroup = import_react$31.forwardRef((props, forwardedRef) => {
			let { children: childrenProp, orientation, overflowButton, overflowPlacement, ...rest } = props;
			let items = import_react$31.useMemo(() => import_react$31.Children.toArray(childrenProp).filter(Boolean), [childrenProp]);
			return import_react$31.createElement(OverflowContainer, {
				as: BaseGroup,
				itemsCount: items.length,
				overflowOrientation: orientation,
				orientation,
				...rest,
				className: (0, import_classnames$13.default)({ "iui-button-group-overflow-x": !!overflowButton && "horizontal" === orientation }, props.className),
				ref: forwardedRef
			}, import_react$31.createElement(OverflowGroupContent, {
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
			return import_react$31.createElement(import_react$31.Fragment, null, overflowButton && "start" === overflowPlacement && overflowButton(overflowStart), "start" === overflowPlacement ? items.slice(overflowStart + 1) : items.slice(0, Math.max(0, overflowStart)), overflowButton && "end" === overflowPlacement && overflowButton(overflowStart));
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/Portal.js
var import_react$30, import_react_dom$2, PortalContainerContext, Portal, usePortalTo;
function init_Portal() {
	return (init_Portal = __esmMin((() => {
		import_react$30 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react_dom$2 = /* @__PURE__ */ __toESM(require_react_dom(), 1);
		init_useIsClient();
		PortalContainerContext = import_react$30.createContext(null);
		Portal = (props) => {
			let { portal = true, children } = props;
			let isClient = useIsClient();
			let portalTo = usePortalTo(portal);
			if (!isClient) return null;
			return portalTo ? import_react_dom$2.createPortal(children, portalTo) : children;
		};
		usePortalTo = (portal) => {
			let portalContainer = import_react$30.useContext(PortalContainerContext);
			if ("boolean" == typeof portal) return portal ? portalContainer : null;
			return ("function" == typeof portal.to ? portal.to() : portal.to) ?? portalContainer;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Toast/Toast.js
var import_react$29, import_classnames$12, Toast, ToastPresentation, useAnimateToastBasedOnVisibility;
function init_Toast() {
	return (init_Toast = __esmMin((() => {
		import_react$29 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$12 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_dom(), init_StatusIconMap(), init_SvgCloseSmall(), init_Box(), init_useSafeContext(), init_ButtonBase(), init_useMediaQuery(), init_useLatestRef();
		init_IconButton();
		init_Toaster();
		Toast = (props) => {
			let { content, category, type = "temporary", isVisible: isVisibleProp, link, duration = 7e3, hasCloseButton, onRemove, animateOutTo, domProps } = props;
			let closeTimeout = import_react$29.useRef(0);
			let { placement } = useSafeContext(ToasterStateContext).settings;
			let placementPosition = placement.startsWith("top") ? "top" : "bottom";
			let [visible, setVisible] = import_react$29.useState(isVisibleProp ?? true);
			let isVisible = isVisibleProp ?? visible;
			let [height, setHeight] = import_react$29.useState(0);
			let thisElement = import_react$29.useRef(null);
			let [margin, setMargin] = import_react$29.useState(0);
			let marginStyle = () => {
				if ("top" === placementPosition) return { marginBlockEnd: margin };
				return { marginBlockStart: margin };
			};
			import_react$29.useEffect(() => {
				if ("temporary" === type) setCloseTimeout(duration);
				return () => {
					clearCloseTimeout();
				};
			}, [duration, type]);
			import_react$29.useEffect(() => {
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
			}) ? import_react$29.createElement(Box, {
				ref: thisElement,
				className: "iui-toast-all",
				style: {
					height,
					...marginStyle()
				}
			}, import_react$29.createElement("div", { ref: onRef }, import_react$29.createElement(ToastPresentation, {
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
		ToastPresentation = import_react$29.forwardRef((props, forwardedRef) => {
			let { content, category, type = "temporary", link, hasCloseButton, onClose, className, contentProps, ...rest } = props;
			let StatusIcon = StatusIconMap[category];
			return import_react$29.createElement(Box, {
				className: (0, import_classnames$12.default)(`iui-toast iui-${category}`, className),
				ref: forwardedRef,
				...rest
			}, import_react$29.createElement(Box, { className: "iui-status-area" }, import_react$29.createElement(StatusIcon, { className: "iui-icon" })), import_react$29.createElement(Box, {
				as: "div",
				...contentProps,
				className: (0, import_classnames$12.default)("iui-message", contentProps?.className)
			}, content), link && import_react$29.createElement(ButtonBase, {
				...link,
				className: (0, import_classnames$12.default)("iui-anchor", "iui-toast-anchor", link.className),
				title: void 0,
				"data-iui-status": category,
				"data-iui-underline": true
			}, link.title), ("persisting" === type || hasCloseButton) && import_react$29.createElement(IconButton, {
				size: "small",
				styleType: "borderless",
				onClick: onClose,
				"aria-label": "Close"
			}, import_react$29.createElement(SvgCloseSmall, null)));
		});
		useAnimateToastBasedOnVisibility = (isVisible, args) => {
			let { thisElement, animateOutTo, onRemove } = args;
			let [shouldBeMounted, setShouldBeMounted] = import_react$29.useState(isVisible);
			let motionOk = useMediaQuery("(prefers-reduced-motion: no-preference)");
			let onRemoveRef = useLatestRef$2(onRemove);
			let [prevIsVisible, setPrevIsVisible] = import_react$29.useState(void 0);
			import_react$29.useEffect(() => {
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
var import_react$28, import_classnames$11, useToaster, Toaster, ToastProvider, toastReducer, ToasterStateContext, ToasterDispatchContext, nextId;
function init_Toaster() {
	return (init_Toaster = __esmMin((() => {
		import_react$28 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$11 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_Box(), init_useSafeContext();
		init_Toast();
		useToaster = () => {
			let dispatch = useSafeContext(ToasterDispatchContext);
			return import_react$28.useMemo(() => {
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
			return import_react$28.createElement(Box, { className: (0, import_classnames$11.default)("iui-toast-wrapper", `iui-placement-${settings.placement}`) }, toasts.map((toastProps) => import_react$28.createElement(Toast, {
				key: toastProps.id,
				...toastProps
			})));
		};
		ToastProvider = ({ children, inherit = false }) => {
			let [toasterState, dispatch] = import_react$28.useReducer(toastReducer, {
				toasts: [],
				settings: {
					order: "auto",
					placement: "top"
				}
			});
			let toasterDispatchContext = import_react$28.useContext(ToasterDispatchContext);
			let toasterStateContext = import_react$28.useContext(ToasterStateContext);
			let shouldReuse = toasterStateContext && inherit;
			let toasterDispatchContextValue = shouldReuse ? toasterDispatchContext : dispatch;
			let toasterStateContextValue = shouldReuse ? toasterStateContext : toasterState;
			return import_react$28.createElement(ToasterDispatchContext.Provider, { value: toasterDispatchContextValue }, import_react$28.createElement(ToasterStateContext.Provider, { value: toasterStateContextValue }, children));
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
		ToasterStateContext = import_react$28.createContext(void 0);
		ToasterDispatchContext = import_react$28.createContext(void 0);
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
var import_react$27, import_react_dom$1, import_classnames$10, versionWithoutDots, OwnerDocumentContext, ThemeProvider, MainRoot, Root, useParentThemeAndContext, PortalContainer, FallbackStyles, useIuiDebugRef, useInertPolyfill;
function init_ThemeProvider() {
	return (init_ThemeProvider = __esmMin((() => {
		import_react$27 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom(), 1);
		import_classnames$10 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_useMediaQuery(), init_useMergedRefs(), init_Box(), init_useIsomorphicLayoutEffect(), init_useLatestRef(), init_import(), init_dev(), init_HydrationProvider(), init_Portal(), init_useId(), init_FutureFlagsProvider();
		init_ThemeContext();
		init_Toaster();
		init_meta();
		init_preload_helper();
		versionWithoutDots = meta.version.replace(/\./g, "");
		OwnerDocumentContext = import_react$27.createContext(void 0);
		ThemeProvider = import_react$27.forwardRef((props, forwardedRef) => {
			var _themeOptions, _themeOptions1;
			let { theme: themeProp = "inherit", children, themeOptions = {}, portalContainer: portalContainerProp, includeCss = "inherit" === themeProp, future: futureProp = {}, ...rest } = props;
			useInertPolyfill();
			let [rootElement, setRootElement] = import_react$27.useState(null);
			let parent = useParentThemeAndContext(rootElement);
			let theme = "inherit" === themeProp ? parent.theme || "light" : themeProp;
			(_themeOptions = themeOptions).applyBackground ?? (_themeOptions.applyBackground = !parent.theme);
			(_themeOptions1 = themeOptions).highContrast ?? (_themeOptions1.highContrast = "inherit" === themeProp ? parent.highContrast : void 0);
			let portalContainerFromParent = import_react$27.useContext(PortalContainerContext);
			let themeContextValue = import_react$27.useMemo(() => ({
				theme,
				themeOptions
			}), [theme, JSON.stringify(themeOptions)]);
			let [portalContainer, setPortalContainer] = import_react$27.useState(portalContainerProp || null);
			return import_react$27.createElement(FutureFlagsProvider, { value: futureProp }, import_react$27.createElement(PortalContainerContext.Provider, { value: portalContainer }, import_react$27.createElement(HydrationProvider, null, import_react$27.createElement(ThemeContext.Provider, { value: themeContextValue }, import_react$27.createElement(ToastProvider, { inherit: "inherit" === themeProp && !portalContainerProp }, includeCss && rootElement ? import_react$27.createElement(FallbackStyles, { root: rootElement }) : null, import_react$27.createElement(MainRoot, {
				theme,
				themeOptions,
				ref: useMergedRefs(forwardedRef, setRootElement, useIuiDebugRef),
				...rest
			}, children, import_react$27.createElement(PortalContainer, {
				theme,
				themeOptions,
				portalContainerProp,
				portalContainerFromParent,
				setPortalContainer,
				isInheritingTheme: "inherit" === themeProp
			})))))));
		});
		MainRoot = import_react$27.forwardRef((props, forwardedRef) => {
			let [ownerDocument, setOwnerDocument] = import_react$27.useState(void 0);
			let findOwnerDocumentFromRef = import_react$27.useCallback((el) => {
				if (el && el.ownerDocument !== ownerDocument) setOwnerDocument(el.ownerDocument);
			}, [ownerDocument, setOwnerDocument]);
			return import_react$27.createElement(OwnerDocumentContext.Provider, { value: ownerDocument }, import_react$27.createElement(Root, {
				...props,
				ref: useMergedRefs(findOwnerDocumentFromRef, forwardedRef)
			}));
		});
		Root = import_react$27.forwardRef((props, forwardedRef) => {
			let { theme, children, themeOptions, className, ...rest } = props;
			let prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
			let prefersHighContrast = useMediaQuery("(prefers-contrast: more)");
			let shouldApplyDark = "dark" === theme || "os" === theme && prefersDark;
			let shouldApplyHC = themeOptions?.highContrast ?? prefersHighContrast;
			let shouldApplyBackground = themeOptions?.applyBackground;
			let themeBridge = useFutureFlag("themeBridge");
			return import_react$27.createElement(Box, {
				className: (0, import_classnames$10.default)("iui-root", { "iui-root-background": shouldApplyBackground }, className),
				"data-iui-theme": shouldApplyDark ? "dark" : "light",
				"data-iui-contrast": shouldApplyHC ? "high" : "default",
				"data-iui-bridge": themeBridge ? "true" : void 0,
				ref: forwardedRef,
				...rest
			}, children);
		});
		useParentThemeAndContext = (rootElement) => {
			let parentContext = import_react$27.useContext(ThemeContext);
			let [parentThemeState, setParentTheme] = import_react$27.useState(parentContext?.theme);
			let [parentHighContrastState, setParentHighContrastState] = import_react$27.useState(parentContext?.themeOptions?.highContrast);
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
		PortalContainer = import_react$27.memo(({ portalContainerProp, portalContainerFromParent, setPortalContainer, isInheritingTheme, theme, themeOptions }) => {
			let ownerDocument = import_react$27.useContext(OwnerDocumentContext);
			let shouldSetupPortalContainer = !portalContainerProp && (!isInheritingTheme || !portalContainerFromParent || !!ownerDocument && portalContainerFromParent.ownerDocument !== ownerDocument);
			let id = useId$1();
			import_react$27.useEffect(() => {
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
			if (shouldSetupPortalContainer && ownerDocument) return import_react_dom$1.createPortal(import_react$27.createElement(Root, {
				theme,
				themeOptions: {
					...themeOptions,
					applyBackground: false
				},
				"data-iui-portal": true,
				style: { display: "contents" },
				ref: setPortalContainer,
				id
			}, import_react$27.createElement(Toaster, null)), ownerDocument.body);
			if (portalContainerProp) return import_react_dom$1.createPortal(import_react$27.createElement(Toaster, null), portalContainerProp);
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
			return import_react$27.createElement(import_react$27.Fragment, null);
		};
		useIuiDebugRef = () => {
			var _globalThis;
			let _globalThis1 = globalThis;
			(_globalThis = _globalThis1).__iui || (_globalThis.__iui = { versions: /* @__PURE__ */ new Set() });
			_globalThis1.__iui.versions.add(JSON.stringify(meta));
		};
		useInertPolyfill = () => {
			let loaded = import_react$27.useRef(false);
			let modulePath = "https://cdn.jsdelivr.net/npm/wicg-inert@3.1.2/dist/inert.min.js";
			import_react$27.useEffect(() => {
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
var import_react$26, import_classnames$9, PopoverOpenContext, PopoverInitialFocusContext, usePopover, Popover, PopoverPortal, DisplayContents;
function init_Popover() {
	return (init_Popover = __esmMin((() => {
		import_react$26 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$9 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_floating_ui_react();
		init_Box(), init_ShadowRoot(), init_react(), init_dev(), init_dom(), init_useControlledState(), init_useId(), init_useStableCallback(), init_useIsomorphicLayoutEffect(), init_useMergedRefs();
		init_Portal();
		init_ThemeProvider();
		PopoverOpenContext = import_react$26.createContext(void 0);
		PopoverInitialFocusContext = import_react$26.createContext(void 0);
		usePopover = (options) => {
			let { placement = "bottom-start", visible, onVisibleChange, closeOnOutsideClick, autoUpdateOptions, matchWidth, interactions: interactionsProp, role, ...rest } = options;
			let mergedInteractions = import_react$26.useMemo(() => ({
				...interactionsProp,
				click: interactionsProp?.click ?? true,
				dismiss: interactionsProp?.dismiss ?? true,
				hover: interactionsProp?.hover ?? false,
				focus: interactionsProp?.focus ?? false
			}), [interactionsProp]);
			let tree = useFloatingTree();
			let middleware = import_react$26.useMemo(() => ({
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
				whileElementsMounted: import_react$26.useMemo(() => open ? (...args) => autoUpdate(...args, autoUpdateOptions) : void 0, [autoUpdateOptions, open]),
				...rest,
				middleware: import_react$26.useMemo(() => [
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
			let [referenceWidth, setReferenceWidth] = import_react$26.useState();
			let [availableHeight, setAvailableHeight] = import_react$26.useState();
			let getFloatingProps = import_react$26.useCallback((userProps) => interactions.getFloatingProps({
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
			let getReferenceProps = import_react$26.useCallback((userProps) => interactions.getReferenceProps({
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
			return import_react$26.useMemo(() => ({
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
		Popover = import_react$26.forwardRef((props, forwardedRef) => {
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
			let [popoverElement, setPopoverElement] = import_react$26.useState(null);
			let popoverRef = useMergedRefs(popover.refs.setFloating, forwardedRef, setPopoverElement);
			let triggerId = `${useId$1()}-trigger`;
			let hasAriaLabel = !!props["aria-labelledby"] || !!props["aria-label"];
			useIsomorphicLayoutEffect(() => {
				if (!positionReference) return;
				let setPositionReference = popover.refs.setPositionReference;
				setPositionReference(positionReference);
				return () => void setPositionReference(null);
			}, [popover.refs.setPositionReference, positionReference]);
			let [initialFocus, setInitialFocus] = import_react$26.useState();
			let initialFocusContextValue = import_react$26.useMemo(() => ({ setInitialFocus }), []);
			return import_react$26.createElement(import_react$26.Fragment, null, import_react$26.createElement(PopoverOpenContext.Provider, { value: popover.open }, cloneElementWithRef(children, (children) => ({
				id: children.props.id || triggerId,
				...popover.getReferenceProps(children.props),
				ref: popover.refs.setReference
			}))), popover.open ? import_react$26.createElement(PopoverInitialFocusContext.Provider, { value: initialFocusContextValue }, import_react$26.createElement(PopoverPortal, { portal }, import_react$26.createElement(ThemeProvider, null, import_react$26.createElement(PortalContainerContext.Provider, { value: popoverElement }, import_react$26.createElement(DisplayContents, null), import_react$26.createElement(FloatingFocusManager, {
				context: popover.context,
				modal: false,
				initialFocus
			}, import_react$26.createElement(Box, {
				className: (0, import_classnames$9.default)("iui-popover", { "iui-popover-surface": applyBackground }, className),
				"aria-labelledby": hasAriaLabel ? void 0 : popover.refs.domReference.current?.id,
				...popover.getFloatingProps(rest),
				ref: popoverRef
			}, content)))))) : null);
		});
		PopoverPortal = ({ children, portal = true }) => {
			let portalTo = usePortalTo(portal);
			return import_react$26.createElement(FloatingPortal, {
				key: portalTo?.id,
				root: portalTo ?? void 0
			}, import_react$26.createElement(DisplayContents, null), children);
		};
		DisplayContents = import_react$26.memo(() => import_react$26.createElement(ShadowRoot$1, { css: `
        :host {
          display: contents;
        }
      ` }, import_react$26.createElement("slot", null)));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Buttons/IconButton.js
var import_classnames$8, import_react$25, IconButton;
function init_IconButton() {
	return (init_IconButton = __esmMin((() => {
		import_classnames$8 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		import_react$25 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Box(), init_ButtonBase(), init_useWarningLogger();
		init_Tooltip();
		init_VisuallyHidden();
		init_ButtonGroup();
		init_Popover();
		IconButton = import_react$25.forwardRef((props, ref) => {
			let { isActive, children, styleType = "default", size, className, title, label = title, iconProps, labelProps, ...rest } = props;
			let buttonGroupOrientation = import_react$25.useContext(ButtonGroupContext);
			let hasPopoverOpen = import_react$25.useContext(PopoverOpenContext);
			useWarningLogger();
			let button = import_react$25.createElement(ButtonBase, {
				ref,
				className: (0, import_classnames$8.default)("iui-button", "iui-field", className),
				"data-iui-variant": "default" !== styleType ? styleType : void 0,
				"data-iui-size": size,
				"data-iui-active": isActive,
				"data-iui-has-popover": hasPopoverOpen ? "open" : void 0,
				"aria-pressed": isActive,
				...rest
			}, import_react$25.createElement(Box, {
				as: "span",
				"aria-hidden": true,
				...iconProps,
				className: (0, import_classnames$8.default)("iui-button-icon", iconProps?.className)
			}, children), label ? import_react$25.createElement(VisuallyHidden, null, label) : null);
			return label ? import_react$25.createElement(Tooltip, {
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
var import_react$24, OverflowContainerMain, OverflowContainerOverflowNode, OverflowContainerComponent, OverflowContainer, OverflowContainerContext, useOverflow, STARTING_MAX_ITEMS_COUNT, overflowGuessReducerInitialState, overflowGuessReducer;
function init_OverflowContainer() {
	return (init_OverflowContainer = __esmMin((() => {
		import_react$24 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_useMergedRefs();
		init_Box();
		init_useIsomorphicLayoutEffect();
		init_useSafeContext();
		init_dev();
		init_useResizeObserver();
		OverflowContainerMain = import_react$24.forwardRef((props, forwardedRef) => {
			let { itemsCount, children, overflowOrientation, ...rest } = props;
			let [containerRef, visibleCount] = useOverflow(itemsCount, overflowOrientation);
			let overflowContainerContextValue = import_react$24.useMemo(() => ({
				visibleCount,
				itemsCount
			}), [itemsCount, visibleCount]);
			return import_react$24.createElement(OverflowContainerContext.Provider, { value: overflowContainerContextValue }, import_react$24.createElement(Box, {
				ref: useMergedRefs(forwardedRef, containerRef),
				...rest
			}, children));
		});
		OverflowContainerOverflowNode = (props) => {
			let { children } = props;
			let { visibleCount, itemsCount } = useOverflowContainerContext();
			return visibleCount < itemsCount ? children : null;
		};
		OverflowContainerComponent = import_react$24.forwardRef((props, forwardedRef) => {
			let { itemsCount, overflowOrientation = "horizontal", ...rest } = props;
			let [size, setSize] = import_react$24.useState(null);
			let [resizeRef] = useResizeObserver(setSize);
			let ref = useMergedRefs(resizeRef, forwardedRef);
			let key = `${itemsCount}${"vertical" === overflowOrientation ? size?.height : size?.width}`;
			return import_react$24.createElement(OverflowContainerMain, {
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
		OverflowContainerContext = import_react$24.createContext(void 0);
		useOverflow = (itemsCount, orientation = "horizontal") => {
			let [guessState, dispatch] = import_react$24.useReducer(overflowGuessReducer, { itemsCount }, overflowGuessReducerInitialState);
			let containerRef = import_react$24.useRef(null);
			let isGuessing = import_react$24.useRef(false);
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
var import_react$23, FutureFlagsContext, FutureFlagsProvider;
function init_FutureFlagsProvider() {
	return (init_FutureFlagsProvider = __esmMin((() => {
		import_react$23 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_useSafeContext();
		FutureFlagsContext = import_react$23.createContext({});
		FutureFlagsProvider = ({ children, value }) => {
			if (true === value) value = { themeBridge: true };
			let combinedValue = {
				...import_react$23.useContext(FutureFlagsContext),
				...value
			};
			return import_react$23.createElement(FutureFlagsContext.Provider, { value: import_react$23.useMemo(() => combinedValue, [JSON.stringify(combinedValue)]) }, children);
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/providers/HydrationProvider.js
var import_react$22, HydrationContext, noopSubscribe, isServer, useHydration, HydrationProvider, HydrationCheck;
function init_HydrationProvider() {
	return (init_HydrationProvider = __esmMin((() => {
		import_react$22 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_useSyncExternalStore(), init_useIsClient();
		HydrationContext = import_react$22.createContext(false);
		noopSubscribe = () => () => {};
		isServer = "undefined" == typeof window;
		useHydration = () => {
			let hydrating = useSyncExternalStore(noopSubscribe, () => false, () => !isServer);
			let hydrated = import_react$22.useContext(HydrationContext);
			let hydratedFallback = useIsClient();
			if (hydrated || hydratedFallback) return "hydrated";
			if (hydrating) return "hydrating";
		};
		HydrationProvider = ({ children }) => {
			let [isHydrated, setIsHydrated] = import_react$22.useState(import_react$22.useContext(HydrationContext));
			let onHydrate = import_react$22.useCallback(() => setIsHydrated(true), []);
			return import_react$22.createElement(HydrationContext.Provider, { value: isHydrated }, isHydrated ? null : import_react$22.createElement(HydrationCheck, { onHydrate }), children);
		};
		HydrationCheck = ({ onHydrate }) => {
			import_react$22.useEffect(() => void onHydrate(), [onHydrate]);
			return null;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/ShadowRoot.js
function useShadowRoot(templateRef, { css = "", flush = true }) {
	let [shadowRoot, setShadowRoot] = import_react$21.useState(null);
	let styleSheet = import_react$21.useRef(void 0);
	let latestCss = useLatestRef$2(css);
	let latestShadowRoot = useLatestRef$2(shadowRoot);
	let createStyleSheet = import_react$21.useCallback((shadow) => {
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
	import_react$21.useEffect(() => {
		let listener = () => createStyleSheet(latestShadowRoot.current);
		window.addEventListener("appui:reparent", listener);
		return () => {
			window.removeEventListener("appui:reparent", listener);
		};
	}, [createStyleSheet, latestShadowRoot]);
	return shadowRoot;
}
var import_react$21, import_react_dom, isBrowser, supportsDSD, supportsAdoptedStylesheets, ShadowRoot$1, ClientShadowRoot;
function init_ShadowRoot() {
	return (init_ShadowRoot = __esmMin((() => {
		import_react$21 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
		init_useLatestRef(), init_useIsomorphicLayoutEffect();
		init_HydrationProvider();
		isBrowser = "undefined" != typeof document;
		supportsDSD = isBrowser && "shadowRootMode" in HTMLTemplateElement.prototype;
		supportsAdoptedStylesheets = isBrowser && "adoptedStyleSheets" in Document.prototype;
		ShadowRoot$1 = ({ children, css, flush = true }) => {
			let isHydrating = "hydrating" === useHydration();
			if (!isBrowser) return import_react$21.createElement("template", { shadowrootmode: "open" }, css && import_react$21.createElement("style", null, css), children);
			if (supportsDSD && isHydrating) return null;
			return import_react$21.createElement(ClientShadowRoot, {
				css,
				flush
			}, children);
		};
		ClientShadowRoot = ({ children, css, flush = true }) => {
			let templateRef = import_react$21.useRef(null);
			let shadowRoot = useShadowRoot(templateRef, {
				css,
				flush
			});
			let fallbackCss = !supportsAdoptedStylesheets && css ? import_react$21.createElement("style", null, css) : null;
			return shadowRoot ? import_react_dom.createPortal(import_react$21.createElement(import_react$21.Fragment, null, fallbackCss, children), shadowRoot) : import_react$21.createElement("template", { ref: templateRef });
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/ButtonBase.js
var import_react$20, import_classnames$7, ButtonBase;
function init_ButtonBase() {
	return (init_ButtonBase = __esmMin((() => {
		import_react$20 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$7 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_Box();
		init_useIsClient();
		ButtonBase = import_react$20.forwardRef((props, forwardedRef) => {
			let { as: asProp = "button", disabled: disabledProp, htmlDisabled, type: typeProp = "button" === asProp ? "button" : void 0, ...rest } = props;
			let isClient = useIsClient();
			let ariaDisabled = disabledProp && !htmlDisabled && isClient && "button" === asProp;
			let handleIfEnabled = (handler) => (e) => {
				if (disabledProp) return;
				handler?.(e);
			};
			let type = "button" === asProp && disabledProp ? "button" : typeProp;
			return import_react$20.createElement(Box, {
				as: asProp,
				type,
				ref: forwardedRef,
				"aria-disabled": ariaDisabled ? "true" : void 0,
				"data-iui-disabled": disabledProp ? "true" : void 0,
				disabled: htmlDisabled ?? (!isClient && disabledProp) ? true : void 0,
				...rest,
				className: (0, import_classnames$7.default)("iui-button-base", props.className),
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
var import_react$19, SvgInfoCircular;
function init_SvgInfoCircular() {
	return (init_SvgInfoCircular = __esmMin((() => {
		import_react$19 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Svg();
		SvgInfoCircular = (props) => import_react$19.createElement(Svg, props, import_react$19.createElement("path", { d: "M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm1.2 3.2a.923.923 0 0 1 .997.843l.003.057a1.31 1.31 0 0 1-1.3 1.2.945.945 0 0 1-1-1 1.228 1.228 0 0 1 1.3-1.1zm-2 9.6c-.5 0-.9-.3-.5-1.7l.6-2.4c.1-.4.1-.5 0-.5-.2-.1-.9.2-1.3.5l-.2-.5a6.497 6.497 0 0 1 3.3-1.6c.5 0 .6.6.3 1.6l-.7 2.6c-.1.5-.1.6.1.6a2.003 2.003 0 0 0 1.1-.6l.3.4a5.769 5.769 0 0 1-3 1.6z" }));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgStatusError.js
var import_react$18, SvgStatusError;
function init_SvgStatusError() {
	return (init_SvgStatusError = __esmMin((() => {
		import_react$18 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Svg();
		SvgStatusError = (props) => import_react$18.createElement(Svg, props, import_react$18.createElement("path", { d: "M9 12H7v-2h2v2Zm0-3H7V4h2v5Zm2.314-9H4.686L0 4.686v6.628L4.686 16h6.628L16 11.314V4.686L11.314 0Z" }));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgStatusSuccess.js
var import_react$17, SvgStatusSuccess;
function init_SvgStatusSuccess() {
	return (init_SvgStatusSuccess = __esmMin((() => {
		import_react$17 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Svg();
		SvgStatusSuccess = (props) => import_react$17.createElement(Svg, props, import_react$17.createElement("path", { d: "m8 0a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm-1.35 12-3.65-3.41 1.4-1.3 2.36 2.2 4.83-4.49 1.41 1.29z" }));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgStatusWarning.js
var import_react$16, SvgStatusWarning;
function init_SvgStatusWarning() {
	return (init_SvgStatusWarning = __esmMin((() => {
		import_react$16 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Svg();
		SvgStatusWarning = (props) => import_react$16.createElement(Svg, props, import_react$16.createElement("path", { d: "m15.86807 13.26721-6.77-11.62a1.15 1.15 0 0 0 -1.1-.67 1.17 1.17 0 0 0 -1.1.69l-6.77 11.59a1.2 1.2 0 0 0 1.1 1.72h13.45a1.19 1.19 0 0 0 1.19-1.71zm-6.87-.29h-2v-2h2zm0-3h-2v-5h2z" }));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/StatusIconMap.js
var import_react$15, StatusIconMap;
function init_StatusIconMap() {
	return (init_StatusIconMap = __esmMin((() => {
		import_react$15 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_SvgInfoCircular();
		init_SvgStatusError();
		init_SvgStatusSuccess();
		init_SvgStatusWarning();
		StatusIconMap = {
			negative: (args) => import_react$15.createElement(SvgStatusError, {
				"aria-hidden": true,
				...args
			}),
			positive: (args) => import_react$15.createElement(SvgStatusSuccess, {
				"aria-hidden": true,
				...args
			}),
			warning: (args) => import_react$15.createElement(SvgStatusWarning, {
				"aria-hidden": true,
				...args
			}),
			informational: (args) => import_react$15.createElement(SvgInfoCircular, {
				"aria-hidden": true,
				...args
			})
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgClose.js
var import_react$14, SvgClose;
function init_SvgClose() {
	return (init_SvgClose = __esmMin((() => {
		import_react$14 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Svg();
		SvgClose = (props) => import_react$14.createElement(Svg, props, import_react$14.createElement("path", { d: "m14 0-6 6-6-6-2 2 6 6-6 6 2 2 6-6 6 6 2-2-6-6 6-6" }));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgCloseSmall.js
var import_react$13, SvgCloseSmall;
function init_SvgCloseSmall() {
	return (init_SvgCloseSmall = __esmMin((() => {
		import_react$13 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Svg();
		SvgCloseSmall = (props) => import_react$13.createElement(Svg, props, import_react$13.createElement("path", { d: "m12.5 2-4.5 4.5-4.5-4.5-1.5 1.5 4.5 4.5-4.5 4.5 1.5 1.5 4.5-4.5 4.5 4.5 1.5-1.5-4.5-4.5 4.5-4.5z" }));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgCheckmarkSmall.js
var import_react$12, SvgCheckmarkSmall;
function init_SvgCheckmarkSmall() {
	return (init_SvgCheckmarkSmall = __esmMin((() => {
		import_react$12 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Svg();
		SvgCheckmarkSmall = (props) => import_react$12.createElement(Svg, props, import_react$12.createElement("path", { d: "m6 13.4-4.7-4.7 1.4-1.4 3.3 3.3 7.3-7.3 1.4 1.4z" }));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgImportantSmall.js
var import_react$11, SvgImportantSmall;
function init_SvgImportantSmall() {
	return (init_SvgImportantSmall = __esmMin((() => {
		import_react$11 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Svg();
		SvgImportantSmall = (props) => import_react$11.createElement(Svg, props, import_react$11.createElement("path", { d: "M6.25 1h3.5v3.19l-.676 6.408H6.91L6.25 4.19zm.12 10.572h3.268V15H6.37z" }));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Backdrop/Backdrop.js
var import_react$10, import_classnames$6, Backdrop;
function init_Backdrop() {
	return (init_Backdrop = __esmMin((() => {
		import_react$10 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$6 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_Box();
		Backdrop = import_react$10.forwardRef((props, ref) => {
			let { isVisible = true, className, ...rest } = props;
			return import_react$10.createElement(Box, {
				className: (0, import_classnames$6.default)("iui-backdrop", { "iui-backdrop-visible": isVisible }, className),
				ref,
				...rest
			});
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ProgressIndicators/ProgressRadial.js
var import_classnames$5, import_react$9, ProgressRadial;
function init_ProgressRadial() {
	return (init_ProgressRadial = __esmMin((() => {
		import_classnames$5 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		import_react$9 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_SvgCheckmarkSmall(), init_SvgImportantSmall(), init_Box(), init_numbers(), init_ShadowRoot();
		init_VisuallyHidden();
		ProgressRadial = import_react$9.forwardRef((props, forwardedRef) => {
			let { value, indeterminate = void 0 === value, status, size, className, style, children, ...rest } = props;
			let statusMap = {
				negative: import_react$9.createElement(SvgImportantSmall, { "aria-hidden": true }),
				positive: import_react$9.createElement(SvgCheckmarkSmall, { "aria-hidden": true }),
				warning: import_react$9.createElement(SvgImportantSmall, { "aria-hidden": true })
			};
			return import_react$9.createElement(Box, {
				className: (0, import_classnames$5.default)("iui-progress-indicator-radial", className),
				"data-iui-size": size,
				"data-iui-status": status,
				"data-iui-indeterminate": indeterminate ? "true" : void 0,
				ref: forwardedRef,
				style: {
					...void 0 !== value && { "--iui-progress-percentage": `${getBoundedValue(value, 0, 100)}%` },
					...style
				},
				...rest
			}, import_react$9.createElement(ShadowRoot$1, null, 100 !== value && import_react$9.createElement(VisuallyHidden, null, "Loading."), import_react$9.createElement("slot", null)), "x-small" !== size ? children ?? (status ? statusMap[status] : null) : null);
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Buttons/Button.js
var import_classnames$4, import_react$8, Button;
function init_Button() {
	return (init_Button = __esmMin((() => {
		import_classnames$4 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		import_react$8 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Box(), init_ButtonBase();
		init_ProgressRadial();
		init_Popover();
		Button = import_react$8.forwardRef((props, ref) => {
			let { children, className, size, styleType = "default", startIcon, endIcon, labelProps, startIconProps, endIconProps, stretched, loading, disabled: disabledProp, ...rest } = props;
			let hasPopoverOpen = import_react$8.useContext(PopoverOpenContext);
			return import_react$8.createElement(ButtonBase, {
				ref,
				className: (0, import_classnames$4.default)("iui-button", "iui-field", className),
				"data-iui-variant": "default" !== styleType ? styleType : void 0,
				"data-iui-size": size,
				"data-iui-loading": loading ? "true" : void 0,
				"data-iui-has-popover": hasPopoverOpen ? "open" : void 0,
				disabled: disabledProp || loading,
				...rest,
				style: {
					"--_iui-width": stretched ? "100%" : void 0,
					...props.style
				}
			}, startIcon && import_react$8.createElement(Box, {
				as: "span",
				"aria-hidden": true,
				...startIconProps,
				className: (0, import_classnames$4.default)("iui-button-icon", startIconProps?.className)
			}, startIcon), children && import_react$8.createElement(Box, {
				as: "span",
				...labelProps,
				className: (0, import_classnames$4.default)("iui-button-label", labelProps?.className)
			}, children), endIcon && import_react$8.createElement(Box, {
				as: "span",
				"aria-hidden": true,
				...endIconProps,
				className: (0, import_classnames$4.default)("iui-button-icon", endIconProps?.className)
			}, endIcon), loading && import_react$8.createElement(ProgressRadial, {
				size: "small" === size ? "x-small" : "small",
				className: "iui-button-spinner",
				"aria-hidden": true
			}));
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogContext.js
var import_react$7, DialogContext, useDialogContext;
function init_DialogContext() {
	return (init_DialogContext = __esmMin((() => {
		import_react$7 = /* @__PURE__ */ __toESM(require_react(), 1);
		DialogContext = import_react$7.createContext(void 0);
		useDialogContext = () => import_react$7.useContext(DialogContext);
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogMainContext.js
var import_react$6, DialogMainContext, useDialogMainContext;
function init_DialogMainContext() {
	return (init_DialogMainContext = __esmMin((() => {
		import_react$6 = /* @__PURE__ */ __toESM(require_react(), 1);
		DialogMainContext = import_react$6.createContext(null);
		useDialogMainContext = () => import_react$6.useContext(DialogMainContext);
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogTitleBarTitle.js
var DialogTitleBarTitle;
function init_DialogTitleBarTitle() {
	return (init_DialogTitleBarTitle = __esmMin((() => {
		init_polymorphic();
		DialogTitleBarTitle = polymorphic.h2("iui-dialog-title");
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogDragContext.js
var import_react$5, DialogDragContext, useDialogDragContext;
function init_DialogDragContext() {
	return (init_DialogDragContext = __esmMin((() => {
		import_react$5 = /* @__PURE__ */ __toESM(require_react(), 1);
		DialogDragContext = import_react$5.createContext(void 0);
		useDialogDragContext = () => {
			return { ...import_react$5.useContext(DialogDragContext) };
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogTitleBar.js
var import_react$4, import_classnames$3, DialogTitleBar;
function init_DialogTitleBar() {
	return (init_DialogTitleBar = __esmMin((() => {
		import_react$4 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$3 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_SvgClose(), init_dom(), init_Box();
		init_IconButton();
		init_DialogContext();
		init_DialogMainContext();
		init_DialogTitleBarTitle();
		init_DialogDragContext();
		DialogTitleBar = Object.assign(import_react$4.forwardRef((props, ref) => {
			let dialogContext = useDialogContext();
			let dialogMainContext = useDialogMainContext();
			let { children, titleText, isDismissible = dialogContext?.isDismissible, onClose = dialogContext?.onClose, isDraggable = dialogContext?.isDraggable, className, onPointerDown: onPointerDownProp, ...rest } = props;
			let { onPointerDown } = useDialogDragContext();
			let onClick = import_react$4.useCallback((e) => {
				dialogMainContext?.beforeClose();
				onClose?.(e);
			}, [dialogMainContext, onClose]);
			return import_react$4.createElement(Box, {
				className: (0, import_classnames$3.default)("iui-dialog-title-bar", className, { "iui-dialog-title-bar-filled": isDraggable }),
				ref,
				onPointerDown: mergeEventHandlers(onPointerDownProp, onPointerDown),
				...rest
			}, children ? children : import_react$4.createElement(import_react$4.Fragment, null, import_react$4.createElement(DialogTitleBarTitle, null, titleText), isDismissible && import_react$4.createElement(IconButton, {
				size: "small",
				styleType: "borderless",
				onClick,
				"aria-label": "Close",
				"data-iui-shift": "right"
			}, import_react$4.createElement(SvgClose, null))));
		}), { Title: DialogTitleBarTitle });
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogContent.js
var DialogContent;
function init_DialogContent() {
	return (init_DialogContent = __esmMin((() => {
		init_polymorphic();
		DialogContent = polymorphic.div("iui-dialog-content");
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogBackdrop.js
var import_react$3, import_classnames$2, DialogBackdrop;
function init_DialogBackdrop() {
	return (init_DialogBackdrop = __esmMin((() => {
		import_react$3 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Backdrop();
		init_useMergedRefs();
		init_DialogContext();
		init_DialogMainContext();
		import_classnames$2 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		DialogBackdrop = import_react$3.forwardRef((props, ref) => {
			let dialogContext = useDialogContext();
			let dialogMainContext = useDialogMainContext();
			let { isVisible = dialogContext?.isOpen, isDismissible = dialogContext?.isDismissible, onClose = dialogContext?.onClose, closeOnExternalClick = dialogContext?.closeOnExternalClick, relativeTo = dialogContext?.relativeTo, onMouseDown, className, style, ...rest } = props;
			let backdropRef = import_react$3.useRef(null);
			let refs = useMergedRefs(backdropRef, ref);
			let handleMouseDown = (event) => {
				event.persist();
				if (event.target !== backdropRef.current) return;
				if (isDismissible && closeOnExternalClick && onClose) {
					dialogMainContext?.beforeClose();
					onClose(event);
				}
				onMouseDown?.(event);
			};
			return import_react$3.createElement(Backdrop, {
				isVisible,
				className: (0, import_classnames$2.default)({ "iui-backdrop-fixed": "viewport" === relativeTo }, className),
				ref: refs,
				onMouseDown: handleMouseDown,
				style: {
					pointerEvents: "auto",
					...style
				},
				...rest
			});
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogButtonBar.js
var DialogButtonBar;
function init_DialogButtonBar() {
	return (init_DialogButtonBar = __esmMin((() => {
		init_polymorphic();
		DialogButtonBar = polymorphic.div("iui-dialog-button-bar");
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useDragAndDrop.js
var import_react$2, getContainerRect, useDragAndDrop;
function init_useDragAndDrop() {
	return (init_useDragAndDrop = __esmMin((() => {
		import_react$2 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_dom();
		init_useEventListener();
		init_useResizeObserver();
		getContainerRect = (containerRef) => {
			let containerRect = containerRef?.current?.getBoundingClientRect();
			return {
				top: containerRect?.top ?? 0,
				right: containerRect?.right ?? getWindow$1()?.innerWidth ?? 0,
				bottom: containerRect?.bottom ?? getWindow$1()?.innerHeight ?? 0,
				left: containerRect?.left ?? 0
			};
		};
		useDragAndDrop = (elementRef, containerRef, enabled = true) => {
			let grabOffsetX = import_react$2.useRef(0);
			let grabOffsetY = import_react$2.useRef(0);
			let translateX = import_react$2.useRef(void 0);
			let translateY = import_react$2.useRef(void 0);
			let containerRectRef = import_react$2.useRef(getContainerRect(containerRef));
			let adjustTransform = import_react$2.useCallback(() => {
				if (!elementRef.current || !enabled) return;
				let { top, right, bottom, left } = elementRef.current?.getBoundingClientRect();
				let [newTranslateX, newTranslateY] = getTranslateValuesFromElement(elementRef.current);
				containerRectRef.current = getContainerRect(containerRef);
				if (bottom > containerRectRef.current.bottom) newTranslateY -= bottom - containerRectRef.current.bottom;
				if (top < containerRectRef.current.top) newTranslateY += containerRectRef.current.top - top;
				if (right > containerRectRef.current.right) newTranslateX -= right - containerRectRef.current.right;
				if (left < containerRectRef.current.left) newTranslateX += containerRectRef.current.left - left;
				translateX.current = newTranslateX;
				translateY.current = newTranslateY;
				elementRef.current.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
			}, [
				containerRef,
				elementRef,
				enabled
			]);
			let [resizeRef, resizeObserver] = useResizeObserver(adjustTransform);
			resizeRef(containerRef?.current);
			import_react$2.useEffect(() => () => {
				resizeObserver?.disconnect();
			}, [resizeObserver]);
			useEventListener("resize", () => {
				adjustTransform();
				if (null != translateX.current && null != translateY.current) setTransform(`translate(${translateX.current}px, ${translateY.current}px)`);
			}, getWindow$1());
			let [transform, setTransform] = import_react$2.useState("");
			let onPointerMove = import_react$2.useRef((event) => {
				if (!elementRef.current) return;
				let newTranslateX = event.clientX - grabOffsetX.current;
				let newTranslateY = event.clientY - grabOffsetY.current;
				elementRef.current.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
				adjustTransform();
			});
			let originalUserSelect = import_react$2.useRef("");
			return {
				onPointerDown: import_react$2.useCallback((e) => {
					if (!elementRef.current || 0 !== e.button || !enabled) return;
					let [x, y] = getTranslateValuesFromElement(elementRef.current);
					grabOffsetX.current = e.clientX - x;
					grabOffsetY.current = e.clientY - y;
					originalUserSelect.current = elementRef.current.style.userSelect;
					elementRef.current.style.userSelect = "none";
					let ownerDocument = elementRef.current.ownerDocument || document;
					ownerDocument.addEventListener("pointermove", onPointerMove.current);
					ownerDocument.addEventListener("pointerup", () => {
						setTransform(`translate(${translateX.current}px, ${translateY.current}px)`);
						ownerDocument.removeEventListener("pointermove", onPointerMove.current);
						if (elementRef.current) elementRef.current.style.userSelect = originalUserSelect.current;
					}, { once: true });
				}, [elementRef, enabled]),
				transform
			};
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogMain.js
var import_react$1, import_classnames$1, DialogMain;
function init_DialogMain() {
	return (init_DialogMain = __esmMin((() => {
		import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$1 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_FocusTrap(), init_dom(), init_Resizer(), init_useMergedRefs(), init_useIsomorphicLayoutEffect(), init_Box(), init_ShadowRoot();
		init_DialogContext();
		init_DialogDragContext();
		init_useDragAndDrop();
		init_DialogMainContext();
		DialogMain = import_react$1.forwardRef((props, forwardedRef) => {
			let dialogContext = useDialogContext();
			let { className, children, styleType = "default", isOpen = dialogContext?.isOpen, isDismissible = dialogContext?.isDismissible, onClose = dialogContext?.onClose, closeOnEsc = dialogContext?.closeOnEsc, trapFocus = dialogContext?.trapFocus, setFocus = dialogContext?.setFocus, preventDocumentScroll = dialogContext?.preventDocumentScroll, onKeyDown, isDraggable = dialogContext?.isDraggable, isResizable = dialogContext?.isResizable, style: propStyle, placement = dialogContext?.placement, ...rest } = props;
			let { dialogRootRef, setDialogElement } = dialogContext || {};
			let dialogRef = import_react$1.useRef(null);
			let previousFocusedElement = import_react$1.useRef(null);
			let [style, setStyle] = import_react$1.useState();
			let hasBeenResized = import_react$1.useRef(false);
			let originalBodyOverflow = import_react$1.useRef("");
			useIsomorphicLayoutEffect(() => {
				if (isOpen) originalBodyOverflow.current = document.body.style.overflow;
			}, [isOpen]);
			import_react$1.useEffect(() => {
				let ownerDocument = dialogRef.current?.ownerDocument;
				if (!ownerDocument || !preventDocumentScroll || "hidden" === originalBodyOverflow.current) return;
				if (isOpen) ownerDocument.body.style.overflow = "hidden";
				else ownerDocument.body.style.overflow = originalBodyOverflow.current;
				return () => {
					ownerDocument.body.style.overflow = originalBodyOverflow.current;
				};
			}, [
				dialogRef,
				isOpen,
				preventDocumentScroll
			]);
			let handleKeyDown = (event) => {
				if (event.altKey) return;
				event.persist();
				if (isDismissible && closeOnEsc && "Escape" === event.key && onClose) {
					beforeClose();
					onClose(event);
				}
				onKeyDown?.(event);
			};
			let { onPointerDown, transform } = useDragAndDrop(dialogRef, dialogRootRef, isDraggable);
			let handlePointerDown = import_react$1.useCallback((event) => {
				if (isDraggable) onPointerDown(event);
			}, [isDraggable, onPointerDown]);
			useIsomorphicLayoutEffect(() => {
				if (!isDraggable || !isOpen) return;
				let [translateX, translateY] = getTranslateValuesFromElement(dialogRef.current);
				setStyle((oldStyle) => ({
					...oldStyle,
					insetInlineStart: dialogRef.current?.offsetLeft,
					insetBlockStart: dialogRef.current?.offsetTop,
					transform: `translate(${translateX}px,${translateY}px)`
				}));
			}, [
				dialogRef,
				isDraggable,
				isOpen
			]);
			let setResizeStyle = import_react$1.useCallback((newStyle) => {
				setStyle((oldStyle) => ({
					...oldStyle,
					...newStyle
				}));
			}, []);
			let onEnter = import_react$1.useCallback(() => {
				previousFocusedElement.current = dialogRef.current?.ownerDocument.activeElement;
				if (setFocus) dialogRef.current?.focus({ preventScroll: true });
			}, [setFocus]);
			let beforeClose = import_react$1.useCallback(() => {
				if (dialogRef.current?.contains(dialogRef.current?.ownerDocument.activeElement)) previousFocusedElement.current?.focus();
			}, [dialogRef, previousFocusedElement]);
			let mountRef = import_react$1.useCallback((element) => {
				if (element) onEnter();
			}, [onEnter]);
			let content = import_react$1.createElement(Box, {
				className: (0, import_classnames$1.default)("iui-dialog", {
					"iui-dialog-default": "default" === styleType,
					"iui-dialog-full-page": "fullPage" === styleType,
					"iui-dialog-visible": isOpen,
					"iui-dialog-draggable": isDraggable
				}, className),
				role: "dialog",
				ref: useMergedRefs(dialogRef, mountRef, setDialogElement, forwardedRef),
				onKeyDown: handleKeyDown,
				tabIndex: -1,
				"data-iui-placement": placement,
				style: {
					transform,
					...style,
					...propStyle
				},
				...rest
			}, import_react$1.createElement(ShadowRoot$1, null, import_react$1.createElement("slot", null), isResizable && import_react$1.createElement(Resizer, {
				elementRef: dialogRef,
				containerRef: dialogRootRef,
				onResizeStart: () => {
					if (!hasBeenResized.current) {
						hasBeenResized.current = true;
						setResizeStyle({ maxInlineSize: "100%" });
					}
				},
				onResizeEnd: setResizeStyle
			})), children);
			return import_react$1.createElement(DialogMainContext.Provider, { value: import_react$1.useMemo(() => ({ beforeClose }), [beforeClose]) }, import_react$1.createElement(DialogDragContext.Provider, { value: { onPointerDown: handlePointerDown } }, trapFocus && import_react$1.createElement(FocusTrap, null, content), !trapFocus && content));
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/Dialog.js
var import_react, import_classnames, DialogComponent, Dialog;
function init_Dialog() {
	return (init_Dialog = __esmMin((() => {
		import_react = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_DialogTitleBar();
		init_DialogContent();
		init_DialogBackdrop();
		init_DialogContext();
		init_DialogButtonBar();
		init_DialogMain();
		init_useMergedRefs(), init_Box(), init_Portal();
		DialogComponent = import_react.forwardRef((props, forwardedRef) => {
			let { trapFocus = false, setFocus = trapFocus, preventDocumentScroll = false, isOpen = false, isDismissible = true, closeOnEsc = true, closeOnExternalClick = false, onClose, isDraggable = false, isResizable = false, relativeTo = "viewport", placement, className, portal = false, ...rest } = props;
			let dialogRootRef = import_react.useRef(null);
			let [dialogElement, setDialogElement] = import_react.useState(null);
			let mergedRefs = useMergedRefs(forwardedRef, dialogRootRef);
			return isOpen ? import_react.createElement(DialogContext.Provider, { value: {
				isOpen,
				onClose,
				closeOnEsc,
				closeOnExternalClick,
				isDismissible,
				preventDocumentScroll,
				trapFocus,
				setFocus,
				isDraggable,
				isResizable,
				relativeTo,
				placement,
				dialogRootRef,
				setDialogElement
			} }, import_react.createElement(Portal, { portal }, import_react.createElement(PortalContainerContext.Provider, { value: dialogElement }, import_react.createElement(Box, {
				className: (0, import_classnames.default)("iui-dialog-wrapper", className),
				"data-iui-relative": "container" === relativeTo,
				ref: mergedRefs,
				...rest
			})))) : null;
		});
		Dialog = Object.assign(DialogComponent, {
			Backdrop: DialogBackdrop,
			Main: DialogMain,
			TitleBar: DialogTitleBar,
			Content: DialogContent,
			ButtonBar: DialogButtonBar
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/Assert.js
/** Asserts that a condition is `true` and - when enabled - throws an error if it is not.
* Assertions are enabled only if the build configuration defines `process.env.NODE_ENV` as `development` at build time.
*
* Assertions exist solely to assist programmers during development, in the following ways:
*  1 They allow the programmer to declare conditions that they believe cannot possibly occur. If such conditions occur, they indicate
*    a serious flaw in the programmer's logic.
*  2 They allow the programmer to assure the TypeScript compiler of the truth of some condition that the compiler cannot itself infer.
*  3 They allow the author of an API to indicate to consumers of the API a serious misuse that should be corrected during development.
*
* Assertions should **never** be used to test for conditions - however unlikely - that could be expected to occur at run-time,
* such as failing to write to a file or load a resource over the network. If the condition asserted ever fails in a production environment,
* the programmer has made a serious mistake.
*
* Note that even when assertions are disabled, calls to `assert` remain in the code and their arguments will be evaluated at run-time.
* Therefore, if your condition or message requires computation, prefer to pass it as a function to prevent it from being evaluated when assertions are disabled.
*
* @param condition The condition that is asserted to be `true`. If the condition is more complex than a simple `boolean` variable, pass it as a function to prevent it from being evaluated when assertions are disabled.
* @param message An optional description of the condition being asserted, to be included in the exception if `condition` is `false`. If the message must be computed, pass it as a function to prevent it from being evaluated when assertions are disabled. Defaults to "Programmer Error".
* @throws Error containing the specified `message` if `condition` is `false`.
* @public
*/
function assert(condition, message) {}
function init_Assert() {
	return (init_Assert = __esmMin((() => {})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/BeSQLite.js
var OpenMode, DbOpcode, DbResult;
function init_BeSQLite() {
	return (init_BeSQLite = __esmMin((() => {
		(function(OpenMode) {
			OpenMode[OpenMode["Readonly"] = 1] = "Readonly";
			OpenMode[OpenMode["ReadWrite"] = 2] = "ReadWrite";
		})(OpenMode || (OpenMode = {}));
		(function(DbOpcode) {
			/** A row was deleted. */
			DbOpcode[DbOpcode["Delete"] = 9] = "Delete";
			/** A new row was inserted. */
			DbOpcode[DbOpcode["Insert"] = 18] = "Insert";
			/** Some columns of an existing row were updated. */
			DbOpcode[DbOpcode["Update"] = 23] = "Update";
		})(DbOpcode || (DbOpcode = {}));
		(function(DbResult) {
			/** Success */
			DbResult[DbResult["BE_SQLITE_OK"] = 0] = "BE_SQLITE_OK";
			/** SQL error or missing database */
			DbResult[DbResult["BE_SQLITE_ERROR"] = 1] = "BE_SQLITE_ERROR";
			/** Internal logic error */
			DbResult[DbResult["BE_SQLITE_INTERNAL"] = 2] = "BE_SQLITE_INTERNAL";
			/** Access permission denied */
			DbResult[DbResult["BE_SQLITE_PERM"] = 3] = "BE_SQLITE_PERM";
			/** Callback routine requested an abort */
			DbResult[DbResult["BE_SQLITE_ABORT"] = 4] = "BE_SQLITE_ABORT";
			/** The database file is locked */
			DbResult[DbResult["BE_SQLITE_BUSY"] = 5] = "BE_SQLITE_BUSY";
			/** A table in the database is locked */
			DbResult[DbResult["BE_SQLITE_LOCKED"] = 6] = "BE_SQLITE_LOCKED";
			/** A malloc() failed */
			DbResult[DbResult["BE_SQLITE_NOMEM"] = 7] = "BE_SQLITE_NOMEM";
			/** Attempt to write a readonly database */
			DbResult[DbResult["BE_SQLITE_READONLY"] = 8] = "BE_SQLITE_READONLY";
			/** Operation terminated by interrupt */
			DbResult[DbResult["BE_SQLITE_INTERRUPT"] = 9] = "BE_SQLITE_INTERRUPT";
			/** Some kind of disk I/O error occurred */
			DbResult[DbResult["BE_SQLITE_IOERR"] = 10] = "BE_SQLITE_IOERR";
			/** The database disk image is malformed */
			DbResult[DbResult["BE_SQLITE_CORRUPT"] = 11] = "BE_SQLITE_CORRUPT";
			/** NOT USED. Table or record not found */
			DbResult[DbResult["BE_SQLITE_NOTFOUND"] = 12] = "BE_SQLITE_NOTFOUND";
			/** Insertion failed because database is full or write operation failed because disk is full */
			DbResult[DbResult["BE_SQLITE_FULL"] = 13] = "BE_SQLITE_FULL";
			/** Unable to open the database file */
			DbResult[DbResult["BE_SQLITE_CANTOPEN"] = 14] = "BE_SQLITE_CANTOPEN";
			/** Database lock protocol error */
			DbResult[DbResult["BE_SQLITE_PROTOCOL"] = 15] = "BE_SQLITE_PROTOCOL";
			/** Database is empty */
			DbResult[DbResult["BE_SQLITE_EMPTY"] = 16] = "BE_SQLITE_EMPTY";
			/** The database schema changed */
			DbResult[DbResult["BE_SQLITE_SCHEMA"] = 17] = "BE_SQLITE_SCHEMA";
			/** String or BLOB exceeds size limit */
			DbResult[DbResult["BE_SQLITE_TOOBIG"] = 18] = "BE_SQLITE_TOOBIG";
			/** Abort due to constraint violation. See extended error values. */
			DbResult[DbResult["BE_SQLITE_CONSTRAINT_BASE"] = 19] = "BE_SQLITE_CONSTRAINT_BASE";
			/** Data type mismatch */
			DbResult[DbResult["BE_SQLITE_MISMATCH"] = 20] = "BE_SQLITE_MISMATCH";
			/** Library used incorrectly */
			DbResult[DbResult["BE_SQLITE_MISUSE"] = 21] = "BE_SQLITE_MISUSE";
			/** Uses OS features not supported on host */
			DbResult[DbResult["BE_SQLITE_NOLFS"] = 22] = "BE_SQLITE_NOLFS";
			/** Authorization denied */
			DbResult[DbResult["BE_SQLITE_AUTH"] = 23] = "BE_SQLITE_AUTH";
			/** Auxiliary database format error */
			DbResult[DbResult["BE_SQLITE_FORMAT"] = 24] = "BE_SQLITE_FORMAT";
			/** 2nd parameter to Bind out of range */
			DbResult[DbResult["BE_SQLITE_RANGE"] = 25] = "BE_SQLITE_RANGE";
			/** File opened that is not a database file */
			DbResult[DbResult["BE_SQLITE_NOTADB"] = 26] = "BE_SQLITE_NOTADB";
			/** Step() has another row ready */
			DbResult[DbResult["BE_SQLITE_ROW"] = 100] = "BE_SQLITE_ROW";
			/** Step() has finished executing */
			DbResult[DbResult["BE_SQLITE_DONE"] = 101] = "BE_SQLITE_DONE";
			DbResult[DbResult["BE_SQLITE_IOERR_READ"] = 266] = "BE_SQLITE_IOERR_READ";
			DbResult[DbResult["BE_SQLITE_IOERR_SHORT_READ"] = 522] = "BE_SQLITE_IOERR_SHORT_READ";
			DbResult[DbResult["BE_SQLITE_IOERR_WRITE"] = 778] = "BE_SQLITE_IOERR_WRITE";
			DbResult[DbResult["BE_SQLITE_IOERR_FSYNC"] = 1034] = "BE_SQLITE_IOERR_FSYNC";
			DbResult[DbResult["BE_SQLITE_IOERR_DIR_FSYNC"] = 1290] = "BE_SQLITE_IOERR_DIR_FSYNC";
			DbResult[DbResult["BE_SQLITE_IOERR_TRUNCATE"] = 1546] = "BE_SQLITE_IOERR_TRUNCATE";
			DbResult[DbResult["BE_SQLITE_IOERR_FSTAT"] = 1802] = "BE_SQLITE_IOERR_FSTAT";
			DbResult[DbResult["BE_SQLITE_IOERR_UNLOCK"] = 2058] = "BE_SQLITE_IOERR_UNLOCK";
			DbResult[DbResult["BE_SQLITE_IOERR_RDLOCK"] = 2314] = "BE_SQLITE_IOERR_RDLOCK";
			DbResult[DbResult["BE_SQLITE_IOERR_DELETE"] = 2570] = "BE_SQLITE_IOERR_DELETE";
			DbResult[DbResult["BE_SQLITE_IOERR_BLOCKED"] = 2826] = "BE_SQLITE_IOERR_BLOCKED";
			DbResult[DbResult["BE_SQLITE_IOERR_NOMEM"] = 3082] = "BE_SQLITE_IOERR_NOMEM";
			DbResult[DbResult["BE_SQLITE_IOERR_ACCESS"] = 3338] = "BE_SQLITE_IOERR_ACCESS";
			DbResult[DbResult["BE_SQLITE_IOERR_CHECKRESERVEDLOCK"] = 3594] = "BE_SQLITE_IOERR_CHECKRESERVEDLOCK";
			DbResult[DbResult["BE_SQLITE_IOERR_LOCK"] = 3850] = "BE_SQLITE_IOERR_LOCK";
			DbResult[DbResult["BE_SQLITE_IOERR_CLOSE"] = 4106] = "BE_SQLITE_IOERR_CLOSE";
			DbResult[DbResult["BE_SQLITE_IOERR_DIR_CLOSE"] = 4362] = "BE_SQLITE_IOERR_DIR_CLOSE";
			DbResult[DbResult["BE_SQLITE_IOERR_SHMOPEN"] = 4618] = "BE_SQLITE_IOERR_SHMOPEN";
			DbResult[DbResult["BE_SQLITE_IOERR_SHMSIZE"] = 4874] = "BE_SQLITE_IOERR_SHMSIZE";
			DbResult[DbResult["BE_SQLITE_IOERR_SHMLOCK"] = 5130] = "BE_SQLITE_IOERR_SHMLOCK";
			DbResult[DbResult["BE_SQLITE_IOERR_SHMMAP"] = 5386] = "BE_SQLITE_IOERR_SHMMAP";
			DbResult[DbResult["BE_SQLITE_IOERR_SEEK"] = 5642] = "BE_SQLITE_IOERR_SEEK";
			DbResult[DbResult["BE_SQLITE_IOERR_DELETE_NOENT"] = 5898] = "BE_SQLITE_IOERR_DELETE_NOENT";
			/** attempt to create a new file when a file by that name already exists */
			DbResult[DbResult["BE_SQLITE_ERROR_FileExists"] = 16777226] = "BE_SQLITE_ERROR_FileExists";
			/** attempt to open a BeSQLite::Db that is already in use somewhere. */
			DbResult[DbResult["BE_SQLITE_ERROR_AlreadyOpen"] = 33554442] = "BE_SQLITE_ERROR_AlreadyOpen";
			/** attempt to open a BeSQLite::Db that doesn't have a property table. */
			DbResult[DbResult["BE_SQLITE_ERROR_NoPropertyTable"] = 50331658] = "BE_SQLITE_ERROR_NoPropertyTable";
			/** the database name is not a file. */
			DbResult[DbResult["BE_SQLITE_ERROR_FileNotFound"] = 67108874] = "BE_SQLITE_ERROR_FileNotFound";
			/** there is no transaction active and the database was opened with AllowImplicitTransactions=false */
			DbResult[DbResult["BE_SQLITE_ERROR_NoTxnActive"] = 83886090] = "BE_SQLITE_ERROR_NoTxnActive";
			/** wrong BeSQLite profile version */
			DbResult[DbResult["BE_SQLITE_ERROR_BadDbProfile"] = 100663306] = "BE_SQLITE_ERROR_BadDbProfile";
			/** Profile of file could not be determined. */
			DbResult[DbResult["BE_SQLITE_ERROR_InvalidProfileVersion"] = 117440522] = "BE_SQLITE_ERROR_InvalidProfileVersion";
			/** Upgrade of profile of file failed. */
			DbResult[DbResult["BE_SQLITE_ERROR_ProfileUpgradeFailed"] = 134217738] = "BE_SQLITE_ERROR_ProfileUpgradeFailed";
			/** Profile of file is too old. Therefore file can only be opened read-only. */
			DbResult[DbResult["BE_SQLITE_ERROR_ProfileTooOldForReadWrite"] = 150994954] = "BE_SQLITE_ERROR_ProfileTooOldForReadWrite";
			/** Profile of file is too old. Therefore file cannot be opened. */
			DbResult[DbResult["BE_SQLITE_ERROR_ProfileTooOld"] = 167772170] = "BE_SQLITE_ERROR_ProfileTooOld";
			/** Profile of file is too new for read-write access. Therefore file can only be opened read-only. */
			DbResult[DbResult["BE_SQLITE_ERROR_ProfileTooNewForReadWrite"] = 184549386] = "BE_SQLITE_ERROR_ProfileTooNewForReadWrite";
			/** Profile of file is too new. Therefore file cannot be opened. */
			DbResult[DbResult["BE_SQLITE_ERROR_ProfileTooNew"] = 201326602] = "BE_SQLITE_ERROR_ProfileTooNew";
			/** attempt to commit with active changetrack */
			DbResult[DbResult["BE_SQLITE_ERROR_ChangeTrackError"] = 218103818] = "BE_SQLITE_ERROR_ChangeTrackError";
			/** invalid version of the revision file is being imported */
			DbResult[DbResult["BE_SQLITE_ERROR_InvalidChangeSetVersion"] = 234881034] = "BE_SQLITE_ERROR_InvalidChangeSetVersion";
			/** The schemas found in the database need to be upgraded */
			DbResult[DbResult["BE_SQLITE_ERROR_SchemaUpgradeRequired"] = 251658250] = "BE_SQLITE_ERROR_SchemaUpgradeRequired";
			/** The schemas found in the database are too new, and the application needs to be upgraded. */
			DbResult[DbResult["BE_SQLITE_ERROR_SchemaTooNew"] = 268435466] = "BE_SQLITE_ERROR_SchemaTooNew";
			/** The schemas found in the database are too old, and the DgnDb needs to be upgraded. */
			DbResult[DbResult["BE_SQLITE_ERROR_SchemaTooOld"] = 285212682] = "BE_SQLITE_ERROR_SchemaTooOld";
			/** Error acquiring a lock on the schemas before upgrade. */
			DbResult[DbResult["BE_SQLITE_ERROR_SchemaLockFailed"] = 301989898] = "BE_SQLITE_ERROR_SchemaLockFailed";
			/** Error upgrading the schemas in the database. */
			DbResult[DbResult["BE_SQLITE_ERROR_SchemaUpgradeFailed"] = 318767114] = "BE_SQLITE_ERROR_SchemaUpgradeFailed";
			/** Error importing the schemas into the database. */
			DbResult[DbResult["BE_SQLITE_ERROR_SchemaImportFailed"] = 335544330] = "BE_SQLITE_ERROR_SchemaImportFailed";
			/** Error acquiring locks or codes */
			DbResult[DbResult["BE_SQLITE_ERROR_CouldNotAcquireLocksOrCodes"] = 352321546] = "BE_SQLITE_ERROR_CouldNotAcquireLocksOrCodes";
			/** Recommended that the schemas found in the database be upgraded */
			DbResult[DbResult["BE_SQLITE_ERROR_SchemaUpgradeRecommended"] = 369098762] = "BE_SQLITE_ERROR_SchemaUpgradeRecommended";
			/** schema update require data transform */
			DbResult[DbResult["BE_SQLITE_ERROR_DataTransformRequired"] = 385875978] = "BE_SQLITE_ERROR_DataTransformRequired";
			/** Db not open */
			DbResult[DbResult["BE_SQLITE_ERROR_NOTOPEN"] = 16777217] = "BE_SQLITE_ERROR_NOTOPEN";
			/** Error propagating changes during commit */
			DbResult[DbResult["BE_SQLITE_ERROR_PropagateChangesFailed"] = 33554433] = "BE_SQLITE_ERROR_PropagateChangesFailed";
			DbResult[DbResult["BE_SQLITE_LOCKED_SHAREDCACHE"] = 262] = "BE_SQLITE_LOCKED_SHAREDCACHE";
			DbResult[DbResult["BE_SQLITE_BUSY_RECOVERY"] = 261] = "BE_SQLITE_BUSY_RECOVERY";
			DbResult[DbResult["BE_SQLITE_CANTOPEN_NOTEMPDIR"] = 270] = "BE_SQLITE_CANTOPEN_NOTEMPDIR";
			DbResult[DbResult["BE_SQLITE_CANTOPEN_ISDIR"] = 526] = "BE_SQLITE_CANTOPEN_ISDIR";
			DbResult[DbResult["BE_SQLITE_CANTOPEN_FULLPATH"] = 782] = "BE_SQLITE_CANTOPEN_FULLPATH";
			DbResult[DbResult["BE_SQLITE_CORRUPT_VTAB"] = 267] = "BE_SQLITE_CORRUPT_VTAB";
			DbResult[DbResult["BE_SQLITE_READONLY_RECOVERY"] = 264] = "BE_SQLITE_READONLY_RECOVERY";
			DbResult[DbResult["BE_SQLITE_READONLY_CANTLOCK"] = 520] = "BE_SQLITE_READONLY_CANTLOCK";
			DbResult[DbResult["BE_SQLITE_READONLY_ROLLBACK"] = 776] = "BE_SQLITE_READONLY_ROLLBACK";
			DbResult[DbResult["BE_SQLITE_ABORT_ROLLBACK"] = 516] = "BE_SQLITE_ABORT_ROLLBACK";
			DbResult[DbResult["BE_SQLITE_CONSTRAINT_CHECK"] = 275] = "BE_SQLITE_CONSTRAINT_CHECK";
			DbResult[DbResult["BE_SQLITE_CONSTRAINT_COMMITHOOK"] = 531] = "BE_SQLITE_CONSTRAINT_COMMITHOOK";
			DbResult[DbResult["BE_SQLITE_CONSTRAINT_FOREIGNKEY"] = 787] = "BE_SQLITE_CONSTRAINT_FOREIGNKEY";
			DbResult[DbResult["BE_SQLITE_CONSTRAINT_FUNCTION"] = 1043] = "BE_SQLITE_CONSTRAINT_FUNCTION";
			DbResult[DbResult["BE_SQLITE_CONSTRAINT_NOTNULL"] = 1299] = "BE_SQLITE_CONSTRAINT_NOTNULL";
			DbResult[DbResult["BE_SQLITE_CONSTRAINT_PRIMARYKEY"] = 1555] = "BE_SQLITE_CONSTRAINT_PRIMARYKEY";
			DbResult[DbResult["BE_SQLITE_CONSTRAINT_TRIGGER"] = 1811] = "BE_SQLITE_CONSTRAINT_TRIGGER";
			DbResult[DbResult["BE_SQLITE_CONSTRAINT_UNIQUE"] = 2067] = "BE_SQLITE_CONSTRAINT_UNIQUE";
			DbResult[DbResult["BE_SQLITE_CONSTRAINT_VTAB"] = 2323] = "BE_SQLITE_CONSTRAINT_VTAB";
		})(DbResult || (DbResult = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/internal/RepositoryStatus.js
var RepositoryStatus;
function init_RepositoryStatus() {
	return (init_RepositoryStatus = __esmMin((() => {
		(function(RepositoryStatus) {
			RepositoryStatus[RepositoryStatus["Success"] = 0] = "Success";
			/** The repository server did not respond to a request */
			RepositoryStatus[RepositoryStatus["ServerUnavailable"] = 86017] = "ServerUnavailable";
			/** A requested lock was already held by another briefcase */
			RepositoryStatus[RepositoryStatus["LockAlreadyHeld"] = 86018] = "LockAlreadyHeld";
			/** Failed to sync briefcase manager with server */
			RepositoryStatus[RepositoryStatus["SyncError"] = 86019] = "SyncError";
			/** Response from server not understood */
			RepositoryStatus[RepositoryStatus["InvalidResponse"] = 86020] = "InvalidResponse";
			/** An operation requires local changes to be committed or abandoned */
			RepositoryStatus[RepositoryStatus["PendingTransactions"] = 86021] = "PendingTransactions";
			/** A lock cannot be relinquished because the associated object has been modified */
			RepositoryStatus[RepositoryStatus["LockUsed"] = 86022] = "LockUsed";
			/** An operation required creation of a ChangeSet, which failed */
			RepositoryStatus[RepositoryStatus["CannotCreateChangeSet"] = 86023] = "CannotCreateChangeSet";
			/** Request to server not understood */
			RepositoryStatus[RepositoryStatus["InvalidRequest"] = 86024] = "InvalidRequest";
			/** A change set committed to the server must be integrated into the briefcase before the operation can be completed */
			RepositoryStatus[RepositoryStatus["ChangeSetRequired"] = 86025] = "ChangeSetRequired";
			/** A requested DgnCode is reserved by another briefcase or in use */
			RepositoryStatus[RepositoryStatus["CodeUnavailable"] = 86026] = "CodeUnavailable";
			/** A DgnCode cannot be released because it has not been reserved by the requesting briefcase */
			RepositoryStatus[RepositoryStatus["CodeNotReserved"] = 86027] = "CodeNotReserved";
			/** A DgnCode cannot be relinquished because it has been used locally */
			RepositoryStatus[RepositoryStatus["CodeUsed"] = 86028] = "CodeUsed";
			/** A required lock is not held by this briefcase */
			RepositoryStatus[RepositoryStatus["LockNotHeld"] = 86029] = "LockNotHeld";
			/** Repository is currently locked, no changes allowed */
			RepositoryStatus[RepositoryStatus["RepositoryIsLocked"] = 86030] = "RepositoryIsLocked";
			/** Channel write constraint violation, such as an attempt to write outside the designated channel. */
			RepositoryStatus[RepositoryStatus["ChannelConstraintViolation"] = 86031] = "ChannelConstraintViolation";
		})(RepositoryStatus || (RepositoryStatus = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/JsonUtils.js
var JsonUtils;
function init_JsonUtils() {
	return (init_JsonUtils = __esmMin((() => {
		(function(JsonUtils) {
			/** Get a value as a boolean.
			* @param json the input JSON object
			* @param defaultVal default value if json cannot be converted to boolean
			* @returns the value of json as a boolean, or default value
			*/
			function asBool(json, defaultVal = false) {
				return isNullOrUndefined(json) ? defaultVal : !!json;
			}
			JsonUtils.asBool = asBool;
			/** Get a value as an integer.
			* @param json the input JSON object
			* @param defaultVal default value if json cannot be converted to integer
			* @returns the value of json as an integer, or default value
			*/
			function asInt(json, defaultVal = 0) {
				return typeof json === "number" ? Math.trunc(json) : defaultVal;
			}
			JsonUtils.asInt = asInt;
			/** Get a value as a double.
			* @param json the input JSON object
			* @param defaultVal default value if json cannot be converted to double
			* @returns the value of json as a double, or default value
			*/
			function asDouble(json, defaultVal = 0) {
				return typeof json === "number" ? json : defaultVal;
			}
			JsonUtils.asDouble = asDouble;
			/** Get a value as a string.
			* @param json the input JSON object
			* @param defaultVal default value if json cannot be converted to string
			* @returns the value of json as a string, or default value
			*/
			function asString(json, defaultVal = "") {
				return isNullOrUndefined(json) ? defaultVal : json.toString();
			}
			JsonUtils.asString = asString;
			/** Get a value as an array.
			* @param json the input JSON object
			* @returns the input JSON object if it is an array, otherwise undefined
			*/
			function asArray(json) {
				return Array.isArray(json) ? json : void 0;
			}
			JsonUtils.asArray = asArray;
			/** Get a value as an object.
			* @param json the input JSON object
			* @returns the input JSON object if it is an object, otherwise undefined
			*/
			function asObject(json) {
				return "object" === typeof json ? json : void 0;
			}
			JsonUtils.asObject = asObject;
			/** Set or remove a number on a json object, given a key name, a value, and a default value. Sets `json[key] = val` if val is *not* equal to the default,
			* otherwise `delete json[key]`. This is used to omit values from JSON strings that are of known defaults.
			* @param json the JSON object to affect
			* @param key the name of the member to set or remove
			* @param val the value to set
			* @param defaultVal the default value.
			*/
			function setOrRemoveNumber(json, key, val, defaultVal) {
				if (val === defaultVal) delete json[key];
				else json[key] = val;
			}
			JsonUtils.setOrRemoveNumber = setOrRemoveNumber;
			/** Set or remove a boolean on a json object, given a key name, a value, and a default value. Sets `json[key] = val` if val is *not* equal to the default,
			* otherwise `delete json[key]`. This is used to omit values from JSON strings that are of known defaults.
			* @param json the JSON object to affect
			* @param key the name of the member to set or remove
			* @param val the value to set
			* @param defaultVal the default value.
			*/
			function setOrRemoveBoolean(json, key, val, defaultVal) {
				if (val === defaultVal) delete json[key];
				else json[key] = val;
			}
			JsonUtils.setOrRemoveBoolean = setOrRemoveBoolean;
			/** Returns `true` if `json` is a non-null object. */
			function isObject(json) {
				return json !== null && "object" === typeof json;
			}
			JsonUtils.isObject = isObject;
			/** Determine if a Javascript object is equivalent to `{}`.
			* @param json The JSON object to test.
			* @returns true if `json` is an Object with no keys.
			*/
			function isEmptyObject(json) {
				return isObject(json) && 0 === Object.keys(json).length;
			}
			JsonUtils.isEmptyObject = isEmptyObject;
			/** Determine if the input is undefined or an empty Javascript object.
			* @param json The JSON object to test.
			* @returns true if `json` is undefined or is an Object with no keys (equivalent to `{}`).
			*/
			function isEmptyObjectOrUndefined(json) {
				return void 0 === json || isEmptyObject(json);
			}
			JsonUtils.isEmptyObjectOrUndefined = isEmptyObjectOrUndefined;
			function isNullOrUndefined(json) {
				return null === json || void 0 === json;
			}
			/** Determine if the input is a non-empty Javascript object.
			* @param value The value to test.
			* @returns true if `value` is an Object with at least one key.
			*/
			function isNonEmptyObject(value) {
				return !isEmptyObjectOrUndefined(value);
			}
			JsonUtils.isNonEmptyObject = isNonEmptyObject;
			/**
			* Convert the input object into a "pure" JavaScript object, with only instances of "object" or primitives in the returned value.
			* Works recursively for object members, and over arrays entries. Calls "toJSON" on any members that implement it.
			*/
			function toObject(val) {
				if (typeof val === "boolean" || typeof val === "number" || typeof val === "string") return val;
				if (typeof val !== "object") return void 0;
				if (typeof val.toJSON !== "undefined") return toObject(val.toJSON());
				if (Array.isArray(val)) {
					const arr = new Array(val.length);
					val.forEach((el, i) => arr[i] = toObject(el));
					return arr;
				}
				const out = {};
				Object.getOwnPropertyNames(val).forEach((prop) => {
					const transformVal = toObject(val[prop]);
					if (transformVal !== void 0) out[prop] = transformVal;
				});
				return out;
			}
			JsonUtils.toObject = toObject;
		})(JsonUtils || (JsonUtils = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/BentleyError.js
var ITwinError, BentleyStatus, IModelStatus, BriefcaseStatus, RpcInterfaceStatus, ChangeSetStatus, HttpStatus, IModelHubStatus, GeoServiceStatus, RealityDataStatus, BentleyError;
function init_BentleyError() {
	return (init_BentleyError = __esmMin((() => {
		init_BeSQLite();
		init_RepositoryStatus();
		init_JsonUtils();
		(function(ITwinError) {
			/** Instantiate a new `ITwinError` or subtype thereof.
			* @see [[ITwinError.throwError]] to conveniently instantiate and throw the error.
			*/
			function create(args) {
				const err = new Error(args.message);
				Object.assign(err, args);
				err.name = args.iTwinErrorId.key;
				return err;
			}
			ITwinError.create = create;
			/** Instantiate and immediately throw an `ITwinError`.
			* @see [[ITwinError.create]] to instantiate an error without throwing it.
			*/
			function throwError(args) {
				throw create(args);
			}
			ITwinError.throwError = throwError;
			/**
			* Determine whether an error object was thrown by iTwin.js and has a specific scope and key.
			*
			* If the test succeeds, the type of `error` is coerced to `T`
			* @param error The error to ve verified.
			* @param scope value for `error.iTwinErrorId.scope`
			* @param key value for `error.iTwinErrorId.key`
			*/
			function isError(error, scope, key) {
				return JsonUtils.isObject(error) && "iTwinErrorId" in error && JsonUtils.isObject(error.iTwinErrorId) && error.iTwinErrorId.scope === scope && (void 0 === key || error.iTwinErrorId.key === key);
			}
			ITwinError.isError = isError;
		})(ITwinError || (ITwinError = {}));
		(function(BentleyStatus) {
			BentleyStatus[BentleyStatus["SUCCESS"] = 0] = "SUCCESS";
			BentleyStatus[BentleyStatus["ERROR"] = 32768] = "ERROR";
		})(BentleyStatus || (BentleyStatus = {}));
		(function(IModelStatus) {
			IModelStatus[IModelStatus["IMODEL_ERROR_BASE"] = 65536] = "IMODEL_ERROR_BASE";
			IModelStatus[IModelStatus["Success"] = 0] = "Success";
			IModelStatus[IModelStatus["AlreadyLoaded"] = 65537] = "AlreadyLoaded";
			IModelStatus[IModelStatus["AlreadyOpen"] = 65538] = "AlreadyOpen";
			IModelStatus[IModelStatus["BadArg"] = 65539] = "BadArg";
			IModelStatus[IModelStatus["BadElement"] = 65540] = "BadElement";
			IModelStatus[IModelStatus["BadModel"] = 65541] = "BadModel";
			IModelStatus[IModelStatus["BadRequest"] = 65542] = "BadRequest";
			IModelStatus[IModelStatus["BadSchema"] = 65543] = "BadSchema";
			IModelStatus[IModelStatus["CannotUndo"] = 65544] = "CannotUndo";
			IModelStatus[IModelStatus["CodeNotReserved"] = 65545] = "CodeNotReserved";
			IModelStatus[IModelStatus["DeletionProhibited"] = 65546] = "DeletionProhibited";
			IModelStatus[IModelStatus["DuplicateCode"] = 65547] = "DuplicateCode";
			IModelStatus[IModelStatus["DuplicateName"] = 65548] = "DuplicateName";
			IModelStatus[IModelStatus["ElementBlockedChange"] = 65549] = "ElementBlockedChange";
			IModelStatus[IModelStatus["FileAlreadyExists"] = 65550] = "FileAlreadyExists";
			IModelStatus[IModelStatus["FileNotFound"] = 65551] = "FileNotFound";
			IModelStatus[IModelStatus["FileNotLoaded"] = 65552] = "FileNotLoaded";
			IModelStatus[IModelStatus["ForeignKeyConstraint"] = 65553] = "ForeignKeyConstraint";
			IModelStatus[IModelStatus["IdExists"] = 65554] = "IdExists";
			IModelStatus[IModelStatus["InDynamicTransaction"] = 65555] = "InDynamicTransaction";
			IModelStatus[IModelStatus["InvalidCategory"] = 65556] = "InvalidCategory";
			IModelStatus[IModelStatus["InvalidCode"] = 65557] = "InvalidCode";
			IModelStatus[IModelStatus["InvalidCodeSpec"] = 65558] = "InvalidCodeSpec";
			IModelStatus[IModelStatus["InvalidId"] = 65559] = "InvalidId";
			IModelStatus[IModelStatus["InvalidName"] = 65560] = "InvalidName";
			IModelStatus[IModelStatus["InvalidParent"] = 65561] = "InvalidParent";
			IModelStatus[IModelStatus["InvalidProfileVersion"] = 65562] = "InvalidProfileVersion";
			IModelStatus[IModelStatus["IsCreatingChangeSet"] = 65563] = "IsCreatingChangeSet";
			IModelStatus[IModelStatus["LockNotHeld"] = 65564] = "LockNotHeld";
			IModelStatus[IModelStatus["Mismatch2d3d"] = 65565] = "Mismatch2d3d";
			IModelStatus[IModelStatus["MismatchGcs"] = 65566] = "MismatchGcs";
			IModelStatus[IModelStatus["MissingDomain"] = 65567] = "MissingDomain";
			IModelStatus[IModelStatus["MissingHandler"] = 65568] = "MissingHandler";
			IModelStatus[IModelStatus["MissingId"] = 65569] = "MissingId";
			IModelStatus[IModelStatus["NoGeometry"] = 65570] = "NoGeometry";
			IModelStatus[IModelStatus["NoMultiTxnOperation"] = 65571] = "NoMultiTxnOperation";
			IModelStatus[IModelStatus["NotEnabled"] = 65573] = "NotEnabled";
			IModelStatus[IModelStatus["NotFound"] = 65574] = "NotFound";
			IModelStatus[IModelStatus["NotOpen"] = 65575] = "NotOpen";
			IModelStatus[IModelStatus["NotOpenForWrite"] = 65576] = "NotOpenForWrite";
			IModelStatus[IModelStatus["NotSameUnitBase"] = 65577] = "NotSameUnitBase";
			IModelStatus[IModelStatus["NothingToRedo"] = 65578] = "NothingToRedo";
			IModelStatus[IModelStatus["NothingToUndo"] = 65579] = "NothingToUndo";
			IModelStatus[IModelStatus["ParentBlockedChange"] = 65580] = "ParentBlockedChange";
			IModelStatus[IModelStatus["ReadError"] = 65581] = "ReadError";
			IModelStatus[IModelStatus["ReadOnly"] = 65582] = "ReadOnly";
			IModelStatus[IModelStatus["ReadOnlyDomain"] = 65583] = "ReadOnlyDomain";
			IModelStatus[IModelStatus["RepositoryManagerError"] = 65584] = "RepositoryManagerError";
			IModelStatus[IModelStatus["SQLiteError"] = 65585] = "SQLiteError";
			IModelStatus[IModelStatus["TransactionActive"] = 65586] = "TransactionActive";
			IModelStatus[IModelStatus["UnitsMissing"] = 65587] = "UnitsMissing";
			IModelStatus[IModelStatus["UnknownFormat"] = 65588] = "UnknownFormat";
			IModelStatus[IModelStatus["UpgradeFailed"] = 65589] = "UpgradeFailed";
			IModelStatus[IModelStatus["ValidationFailed"] = 65590] = "ValidationFailed";
			IModelStatus[IModelStatus["VersionTooNew"] = 65591] = "VersionTooNew";
			IModelStatus[IModelStatus["VersionTooOld"] = 65592] = "VersionTooOld";
			IModelStatus[IModelStatus["ViewNotFound"] = 65593] = "ViewNotFound";
			IModelStatus[IModelStatus["WriteError"] = 65594] = "WriteError";
			IModelStatus[IModelStatus["WrongClass"] = 65595] = "WrongClass";
			IModelStatus[IModelStatus["WrongIModel"] = 65596] = "WrongIModel";
			IModelStatus[IModelStatus["WrongDomain"] = 65597] = "WrongDomain";
			IModelStatus[IModelStatus["WrongElement"] = 65598] = "WrongElement";
			IModelStatus[IModelStatus["WrongHandler"] = 65599] = "WrongHandler";
			IModelStatus[IModelStatus["WrongModel"] = 65600] = "WrongModel";
			IModelStatus[IModelStatus["ConstraintNotUnique"] = 65601] = "ConstraintNotUnique";
			IModelStatus[IModelStatus["NoGeoLocation"] = 65602] = "NoGeoLocation";
			IModelStatus[IModelStatus["ServerTimeout"] = 65603] = "ServerTimeout";
			IModelStatus[IModelStatus["NoContent"] = 65604] = "NoContent";
			IModelStatus[IModelStatus["NotRegistered"] = 65605] = "NotRegistered";
			IModelStatus[IModelStatus["FunctionNotFound"] = 65606] = "FunctionNotFound";
			IModelStatus[IModelStatus["NoActiveCommand"] = 65607] = "NoActiveCommand";
			IModelStatus[IModelStatus["Aborted"] = 65608] = "Aborted";
		})(IModelStatus || (IModelStatus = {}));
		(function(BriefcaseStatus) {
			BriefcaseStatus[BriefcaseStatus["BRIEFCASE_STATUS_BASE"] = 131072] = "BRIEFCASE_STATUS_BASE";
			BriefcaseStatus[BriefcaseStatus["CannotAcquire"] = 131072] = "CannotAcquire";
			BriefcaseStatus[BriefcaseStatus["CannotDownload"] = 131073] = "CannotDownload";
			BriefcaseStatus[BriefcaseStatus["CannotUpload"] = 131074] = "CannotUpload";
			BriefcaseStatus[BriefcaseStatus["CannotCopy"] = 131075] = "CannotCopy";
			BriefcaseStatus[BriefcaseStatus["CannotDelete"] = 131076] = "CannotDelete";
			BriefcaseStatus[BriefcaseStatus["VersionNotFound"] = 131077] = "VersionNotFound";
			BriefcaseStatus[BriefcaseStatus["CannotApplyChanges"] = 131078] = "CannotApplyChanges";
			BriefcaseStatus[BriefcaseStatus["DownloadCancelled"] = 131079] = "DownloadCancelled";
			BriefcaseStatus[BriefcaseStatus["ContainsDeletedChangeSets"] = 131080] = "ContainsDeletedChangeSets";
		})(BriefcaseStatus || (BriefcaseStatus = {}));
		(function(RpcInterfaceStatus) {
			RpcInterfaceStatus[RpcInterfaceStatus["Success"] = 0] = "Success";
			RpcInterfaceStatus[RpcInterfaceStatus["RPC_INTERFACE_ERROR_BASE"] = 135168] = "RPC_INTERFACE_ERROR_BASE";
			/** The RpcInterface implemented by the server is incompatible with the interface requested by the client. */
			RpcInterfaceStatus[RpcInterfaceStatus["IncompatibleVersion"] = 135168] = "IncompatibleVersion";
		})(RpcInterfaceStatus || (RpcInterfaceStatus = {}));
		(function(ChangeSetStatus) {
			ChangeSetStatus[ChangeSetStatus["Success"] = 0] = "Success";
			ChangeSetStatus[ChangeSetStatus["CHANGESET_ERROR_BASE"] = 90112] = "CHANGESET_ERROR_BASE";
			/** Error applying a change set when reversing or reinstating it */
			ChangeSetStatus[ChangeSetStatus["ApplyError"] = 90113] = "ApplyError";
			/** Change tracking has not been enabled. The ChangeSet API mandates this. */
			ChangeSetStatus[ChangeSetStatus["ChangeTrackingNotEnabled"] = 90114] = "ChangeTrackingNotEnabled";
			/** Contents of the change stream are corrupted and does not match the ChangeSet */
			ChangeSetStatus[ChangeSetStatus["CorruptedChangeStream"] = 90115] = "CorruptedChangeStream";
			/** File containing the changes to the change set is not found */
			ChangeSetStatus[ChangeSetStatus["FileNotFound"] = 90116] = "FileNotFound";
			/** Error writing the contents of the change set to the backing change stream file */
			ChangeSetStatus[ChangeSetStatus["FileWriteError"] = 90117] = "FileWriteError";
			/**  Cannot perform the operation since the Db has local changes */
			ChangeSetStatus[ChangeSetStatus["HasLocalChanges"] = 90118] = "HasLocalChanges";
			/**  Cannot perform the operation since current transaction has uncommitted changes */
			ChangeSetStatus[ChangeSetStatus["HasUncommittedChanges"] = 90119] = "HasUncommittedChanges";
			/**  Invalid ChangeSet Id */
			ChangeSetStatus[ChangeSetStatus["InvalidId"] = 90120] = "InvalidId";
			/**  Invalid version of the change set */
			ChangeSetStatus[ChangeSetStatus["InvalidVersion"] = 90121] = "InvalidVersion";
			/** Cannot perform the operation since system is in the middle of a dynamic transaction */
			ChangeSetStatus[ChangeSetStatus["InDynamicTransaction"] = 90122] = "InDynamicTransaction";
			/** Cannot perform operation since system is in the middle of a creating a change set */
			ChangeSetStatus[ChangeSetStatus["IsCreatingChangeSet"] = 90123] = "IsCreatingChangeSet";
			/** Cannot perform operation since the system is not creating a change set */
			ChangeSetStatus[ChangeSetStatus["IsNotCreatingChangeSet"] = 90124] = "IsNotCreatingChangeSet";
			/** Error propagating the changes after the merge */
			ChangeSetStatus[ChangeSetStatus["MergePropagationError"] = 90125] = "MergePropagationError";
			/** No change sets to merge */
			ChangeSetStatus[ChangeSetStatus["NothingToMerge"] = 90126] = "NothingToMerge";
			/** No transactions are available to create a change set */
			ChangeSetStatus[ChangeSetStatus["NoTransactions"] = 90127] = "NoTransactions";
			/** Parent change set of the Db does not match the parent id of the change set */
			ChangeSetStatus[ChangeSetStatus["ParentMismatch"] = 90128] = "ParentMismatch";
			/** Error performing a SQLite operation on the Db */
			ChangeSetStatus[ChangeSetStatus["SQLiteError"] = 90129] = "SQLiteError";
			/** ChangeSet originated in a different Db */
			ChangeSetStatus[ChangeSetStatus["WrongDgnDb"] = 90130] = "WrongDgnDb";
			/** Could not open the DgnDb to merge change set */
			ChangeSetStatus[ChangeSetStatus["CouldNotOpenDgnDb"] = 90131] = "CouldNotOpenDgnDb";
			/** Cannot merge changes in in an open DgnDb. Close the DgnDb, and process the operation when it is opened. */
			ChangeSetStatus[ChangeSetStatus["MergeSchemaChangesOnOpen"] = 90132] = "MergeSchemaChangesOnOpen";
			/** Cannot reverse or reinstate schema changes. */
			ChangeSetStatus[ChangeSetStatus["ReverseOrReinstateSchemaChanges"] = 90133] = "ReverseOrReinstateSchemaChanges";
			/** Cannot process changes schema changes in an open DgnDb. Close the DgnDb, and process the operation when it is opened. */
			ChangeSetStatus[ChangeSetStatus["ProcessSchemaChangesOnOpen"] = 90134] = "ProcessSchemaChangesOnOpen";
			/** Cannot merge changes into a Readonly DgnDb. */
			ChangeSetStatus[ChangeSetStatus["CannotMergeIntoReadonly"] = 90135] = "CannotMergeIntoReadonly";
			/**  Cannot merge changes into a Master DgnDb. */
			ChangeSetStatus[ChangeSetStatus["CannotMergeIntoMaster"] = 90136] = "CannotMergeIntoMaster";
			/** Cannot merge changes into a DgnDb that has reversed change sets. */
			ChangeSetStatus[ChangeSetStatus["CannotMergeIntoReversed"] = 90137] = "CannotMergeIntoReversed";
			/** ChangeSet(s) download was cancelled. */
			ChangeSetStatus[ChangeSetStatus["DownloadCancelled"] = 90138] = "DownloadCancelled";
		})(ChangeSetStatus || (ChangeSetStatus = {}));
		(function(HttpStatus) {
			/** 2xx Success */
			HttpStatus[HttpStatus["Success"] = 0] = "Success";
			/** 1xx Informational responses */
			HttpStatus[HttpStatus["Info"] = 94209] = "Info";
			/** 3xx Redirection */
			HttpStatus[HttpStatus["Redirection"] = 94210] = "Redirection";
			/** 4xx Client errors */
			HttpStatus[HttpStatus["ClientError"] = 94211] = "ClientError";
			/** 5xx Server errors */
			HttpStatus[HttpStatus["ServerError"] = 94212] = "ServerError";
		})(HttpStatus || (HttpStatus = {}));
		(function(IModelHubStatus) {
			IModelHubStatus[IModelHubStatus["Success"] = 0] = "Success";
			IModelHubStatus[IModelHubStatus["IMODELHUBERROR_BASE"] = 102400] = "IMODELHUBERROR_BASE";
			IModelHubStatus[IModelHubStatus["IMODELHUBERROR_REQUESTERRORBASE"] = 102656] = "IMODELHUBERROR_REQUESTERRORBASE";
			IModelHubStatus[IModelHubStatus["Unknown"] = 102401] = "Unknown";
			IModelHubStatus[IModelHubStatus["MissingRequiredProperties"] = 102402] = "MissingRequiredProperties";
			IModelHubStatus[IModelHubStatus["InvalidPropertiesValues"] = 102403] = "InvalidPropertiesValues";
			IModelHubStatus[IModelHubStatus["UserDoesNotHavePermission"] = 102404] = "UserDoesNotHavePermission";
			IModelHubStatus[IModelHubStatus["UserDoesNotHaveAccess"] = 102405] = "UserDoesNotHaveAccess";
			IModelHubStatus[IModelHubStatus["InvalidBriefcase"] = 102406] = "InvalidBriefcase";
			IModelHubStatus[IModelHubStatus["BriefcaseDoesNotExist"] = 102407] = "BriefcaseDoesNotExist";
			IModelHubStatus[IModelHubStatus["BriefcaseDoesNotBelongToUser"] = 102408] = "BriefcaseDoesNotBelongToUser";
			IModelHubStatus[IModelHubStatus["AnotherUserPushing"] = 102409] = "AnotherUserPushing";
			IModelHubStatus[IModelHubStatus["ChangeSetAlreadyExists"] = 102410] = "ChangeSetAlreadyExists";
			IModelHubStatus[IModelHubStatus["ChangeSetDoesNotExist"] = 102411] = "ChangeSetDoesNotExist";
			IModelHubStatus[IModelHubStatus["FileIsNotUploaded"] = 102412] = "FileIsNotUploaded";
			IModelHubStatus[IModelHubStatus["iModelIsNotInitialized"] = 102413] = "iModelIsNotInitialized";
			IModelHubStatus[IModelHubStatus["ChangeSetPointsToBadSeed"] = 102414] = "ChangeSetPointsToBadSeed";
			IModelHubStatus[IModelHubStatus["OperationFailed"] = 102415] = "OperationFailed";
			IModelHubStatus[IModelHubStatus["PullIsRequired"] = 102416] = "PullIsRequired";
			IModelHubStatus[IModelHubStatus["MaximumNumberOfBriefcasesPerUser"] = 102417] = "MaximumNumberOfBriefcasesPerUser";
			IModelHubStatus[IModelHubStatus["MaximumNumberOfBriefcasesPerUserPerMinute"] = 102418] = "MaximumNumberOfBriefcasesPerUserPerMinute";
			IModelHubStatus[IModelHubStatus["DatabaseTemporarilyLocked"] = 102419] = "DatabaseTemporarilyLocked";
			IModelHubStatus[IModelHubStatus["iModelIsLocked"] = 102420] = "iModelIsLocked";
			IModelHubStatus[IModelHubStatus["CodesExist"] = 102421] = "CodesExist";
			IModelHubStatus[IModelHubStatus["LocksExist"] = 102422] = "LocksExist";
			IModelHubStatus[IModelHubStatus["iModelAlreadyExists"] = 102423] = "iModelAlreadyExists";
			IModelHubStatus[IModelHubStatus["iModelDoesNotExist"] = 102424] = "iModelDoesNotExist";
			IModelHubStatus[IModelHubStatus["FileDoesNotExist"] = 102425] = "FileDoesNotExist";
			IModelHubStatus[IModelHubStatus["FileAlreadyExists"] = 102426] = "FileAlreadyExists";
			IModelHubStatus[IModelHubStatus["LockDoesNotExist"] = 102427] = "LockDoesNotExist";
			IModelHubStatus[IModelHubStatus["LockOwnedByAnotherBriefcase"] = 102428] = "LockOwnedByAnotherBriefcase";
			IModelHubStatus[IModelHubStatus["CodeStateInvalid"] = 102429] = "CodeStateInvalid";
			IModelHubStatus[IModelHubStatus["CodeReservedByAnotherBriefcase"] = 102430] = "CodeReservedByAnotherBriefcase";
			IModelHubStatus[IModelHubStatus["CodeDoesNotExist"] = 102431] = "CodeDoesNotExist";
			IModelHubStatus[IModelHubStatus["EventTypeDoesNotExist"] = 102432] = "EventTypeDoesNotExist";
			IModelHubStatus[IModelHubStatus["EventSubscriptionDoesNotExist"] = 102433] = "EventSubscriptionDoesNotExist";
			IModelHubStatus[IModelHubStatus["EventSubscriptionAlreadyExists"] = 102434] = "EventSubscriptionAlreadyExists";
			IModelHubStatus[IModelHubStatus["ITwinIdIsNotSpecified"] = 102435] = "ITwinIdIsNotSpecified";
			IModelHubStatus[IModelHubStatus["FailedToGetITwinPermissions"] = 102436] = "FailedToGetITwinPermissions";
			IModelHubStatus[IModelHubStatus["FailedToGetITwinMembers"] = 102437] = "FailedToGetITwinMembers";
			IModelHubStatus[IModelHubStatus["ChangeSetAlreadyHasVersion"] = 102438] = "ChangeSetAlreadyHasVersion";
			IModelHubStatus[IModelHubStatus["VersionAlreadyExists"] = 102439] = "VersionAlreadyExists";
			IModelHubStatus[IModelHubStatus["JobSchedulingFailed"] = 102440] = "JobSchedulingFailed";
			IModelHubStatus[IModelHubStatus["ConflictsAggregate"] = 102441] = "ConflictsAggregate";
			IModelHubStatus[IModelHubStatus["FailedToGetITwinById"] = 102442] = "FailedToGetITwinById";
			IModelHubStatus[IModelHubStatus["DatabaseOperationFailed"] = 102443] = "DatabaseOperationFailed";
			IModelHubStatus[IModelHubStatus["SeedFileInitializationFailed"] = 102444] = "SeedFileInitializationFailed";
			IModelHubStatus[IModelHubStatus["FailedToGetAssetPermissions"] = 102445] = "FailedToGetAssetPermissions";
			IModelHubStatus[IModelHubStatus["FailedToGetAssetMembers"] = 102446] = "FailedToGetAssetMembers";
			IModelHubStatus[IModelHubStatus["ITwinDoesNotExist"] = 102447] = "ITwinDoesNotExist";
			IModelHubStatus[IModelHubStatus["LockChunkDoesNotExist"] = 102449] = "LockChunkDoesNotExist";
			IModelHubStatus[IModelHubStatus["CheckpointAlreadyExists"] = 102450] = "CheckpointAlreadyExists";
			IModelHubStatus[IModelHubStatus["CheckpointDoesNotExist"] = 102451] = "CheckpointDoesNotExist";
			IModelHubStatus[IModelHubStatus["UndefinedArgumentError"] = 102657] = "UndefinedArgumentError";
			IModelHubStatus[IModelHubStatus["InvalidArgumentError"] = 102658] = "InvalidArgumentError";
			IModelHubStatus[IModelHubStatus["MissingDownloadUrlError"] = 102659] = "MissingDownloadUrlError";
			IModelHubStatus[IModelHubStatus["NotSupportedInBrowser"] = 102660] = "NotSupportedInBrowser";
			IModelHubStatus[IModelHubStatus["FileHandlerNotSet"] = 102661] = "FileHandlerNotSet";
			IModelHubStatus[IModelHubStatus["FileNotFound"] = 102662] = "FileNotFound";
			IModelHubStatus[IModelHubStatus["InitializationTimeout"] = 102663] = "InitializationTimeout";
		})(IModelHubStatus || (IModelHubStatus = {}));
		(function(GeoServiceStatus) {
			GeoServiceStatus[GeoServiceStatus["Success"] = 0] = "Success";
			GeoServiceStatus[GeoServiceStatus["GEOSERVICESTATUS_BASE"] = 147456] = "GEOSERVICESTATUS_BASE";
			GeoServiceStatus[GeoServiceStatus["NoGeoLocation"] = 65602] = "NoGeoLocation";
			GeoServiceStatus[GeoServiceStatus["OutOfUsefulRange"] = 147457] = "OutOfUsefulRange";
			GeoServiceStatus[GeoServiceStatus["OutOfMathematicalDomain"] = 147458] = "OutOfMathematicalDomain";
			GeoServiceStatus[GeoServiceStatus["NoDatumConverter"] = 147459] = "NoDatumConverter";
			GeoServiceStatus[GeoServiceStatus["VerticalDatumConvertError"] = 147460] = "VerticalDatumConvertError";
			GeoServiceStatus[GeoServiceStatus["CSMapError"] = 147461] = "CSMapError";
			/**
			* @deprecated in 5.0 - will not be removed until after 2026-06-13. This status is never returned.
			*/
			GeoServiceStatus[GeoServiceStatus["Pending"] = 147462] = "Pending";
		})(GeoServiceStatus || (GeoServiceStatus = {}));
		(function(RealityDataStatus) {
			RealityDataStatus[RealityDataStatus["Success"] = 0] = "Success";
			RealityDataStatus[RealityDataStatus["REALITYDATA_ERROR_BASE"] = 151552] = "REALITYDATA_ERROR_BASE";
			RealityDataStatus[RealityDataStatus["InvalidData"] = 151553] = "InvalidData";
		})(RealityDataStatus || (RealityDataStatus = {}));
		BentleyError = class BentleyError extends Error {
			errorNumber;
			static iTwinErrorScope = "bentley-error";
			_metaData;
			/**
			* @param errorNumber The a number that identifies of the problem.
			* @param message  message that describes the problem (should not be localized).
			* @param metaData metaData about the exception.
			*/
			constructor(errorNumber, message, metaData) {
				super(message);
				this.errorNumber = errorNumber;
				this.errorNumber = errorNumber;
				this._metaData = metaData;
				this.name = this._initName();
			}
			/** supply the value for iTwinErrorId  */
			get iTwinErrorId() {
				return {
					scope: BentleyError.iTwinErrorScope,
					key: this.name
				};
			}
			/** value for logging metadata */
			get loggingMetadata() {
				return this.getMetaData();
			}
			/**
			* Determine if an error object implements the `LegacyITwinErrorWithNumber` interface.
			*
			* If the test succeeds, the type of `error` is coerced to `T`
			* @note this method does *not* test that the object is an `instanceOf BentleyError`.
			* @beta
			*/
			static isError(error, errorNumber) {
				return ITwinError.isError(error, BentleyError.iTwinErrorScope) && typeof error.errorNumber === "number" && (errorNumber === void 0 || error.errorNumber === errorNumber);
			}
			/** Returns true if this BentleyError includes (optional) metadata. */
			get hasMetaData() {
				return void 0 !== this._metaData;
			}
			/** get the meta data associated with this BentleyError, if any. */
			getMetaData() {
				return BentleyError.getMetaData(this._metaData);
			}
			/** get the metadata object associated with an ExceptionMetaData, if any. */
			static getMetaData(metaData) {
				return typeof metaData === "function" ? metaData() : metaData;
			}
			/** This function returns the name of each error status. Override this method to handle more error status codes. */
			_initName() {
				return BentleyError.getErrorKey(this.errorNumber);
			}
			/** This function returns the name of each error status. */
			static getErrorKey(errorNumber) {
				switch (errorNumber) {
					case IModelStatus.AlreadyLoaded: return "Already Loaded";
					case IModelStatus.AlreadyOpen: return "Already Open";
					case IModelStatus.BadArg: return "Bad Arg";
					case IModelStatus.BadElement: return "Bad Element";
					case IModelStatus.BadModel: return "Bad Model";
					case IModelStatus.BadRequest: return "Bad Request";
					case IModelStatus.BadSchema: return "Bad Schema";
					case IModelStatus.CannotUndo: return "Can not Undo";
					case IModelStatus.CodeNotReserved: return "Code Not Reserved";
					case IModelStatus.DeletionProhibited: return "Deletion Prohibited";
					case IModelStatus.DuplicateCode: return "Duplicate Code";
					case IModelStatus.DuplicateName: return "Duplicate Name";
					case IModelStatus.ElementBlockedChange: return "Element Blocked Change";
					case IModelStatus.FileAlreadyExists: return "File Already Exists";
					case IModelStatus.FileNotFound: return "File Not Found";
					case IModelStatus.FileNotLoaded: return "File Not Loaded";
					case IModelStatus.ForeignKeyConstraint: return "ForeignKey Constraint";
					case IModelStatus.IdExists: return "Id Exists";
					case IModelStatus.InDynamicTransaction: return "InDynamicTransaction";
					case IModelStatus.InvalidCategory: return "Invalid Category";
					case IModelStatus.InvalidCode: return "Invalid Code";
					case IModelStatus.InvalidCodeSpec: return "Invalid CodeSpec";
					case IModelStatus.InvalidId: return "Invalid Id";
					case IModelStatus.InvalidName: return "Invalid Name";
					case IModelStatus.InvalidParent: return "Invalid Parent";
					case IModelStatus.InvalidProfileVersion: return "Invalid Profile Version";
					case IModelStatus.IsCreatingChangeSet: return "IsCreatingChangeSet";
					case IModelStatus.LockNotHeld: return "Lock Not Held";
					case IModelStatus.Mismatch2d3d: return "Mismatch 2d3d";
					case IModelStatus.MismatchGcs: return "Mismatch Gcs";
					case IModelStatus.MissingDomain: return "Missing Domain";
					case IModelStatus.MissingHandler: return "Missing Handler";
					case IModelStatus.MissingId: return "Missing Id";
					case IModelStatus.NoGeometry: return "No Geometry";
					case IModelStatus.NoMultiTxnOperation: return "NoMultiTxnOperation";
					case IModelStatus.NotEnabled: return "Not Enabled";
					case IModelStatus.NotFound: return "Not Found";
					case IModelStatus.NotOpen: return "Not Open";
					case IModelStatus.NotOpenForWrite: return "Not Open For Write";
					case IModelStatus.NotSameUnitBase: return "Not Same Unit Base";
					case IModelStatus.NothingToRedo: return "Nothing To Redo";
					case IModelStatus.NothingToUndo: return "Nothing To Undo";
					case IModelStatus.ParentBlockedChange: return "Parent Blocked Change";
					case IModelStatus.ReadError: return "Read Error";
					case IModelStatus.ReadOnly: return "ReadOnly";
					case IModelStatus.ReadOnlyDomain: return "ReadOnlyDomain";
					case IModelStatus.RepositoryManagerError: return "RepositoryManagerError";
					case IModelStatus.SQLiteError: return "SQLiteError";
					case IModelStatus.TransactionActive: return "Transaction Active";
					case IModelStatus.UnitsMissing: return "Units Missing";
					case IModelStatus.UnknownFormat: return "Unknown Format";
					case IModelStatus.UpgradeFailed: return "Upgrade Failed";
					case IModelStatus.ValidationFailed: return "Validation Failed";
					case IModelStatus.VersionTooNew: return "Version Too New";
					case IModelStatus.VersionTooOld: return "Version Too Old";
					case IModelStatus.ViewNotFound: return "View Not Found";
					case IModelStatus.WriteError: return "Write Error";
					case IModelStatus.WrongClass: return "Wrong Class";
					case IModelStatus.WrongIModel: return "Wrong IModel";
					case IModelStatus.WrongDomain: return "Wrong Domain";
					case IModelStatus.WrongElement: return "Wrong Element";
					case IModelStatus.WrongHandler: return "Wrong Handler";
					case IModelStatus.WrongModel: return "Wrong Model";
					case DbResult.BE_SQLITE_ERROR: return "BE_SQLITE_ERROR";
					case DbResult.BE_SQLITE_INTERNAL: return "BE_SQLITE_INTERNAL";
					case DbResult.BE_SQLITE_PERM: return "BE_SQLITE_PERM";
					case DbResult.BE_SQLITE_ABORT: return "BE_SQLITE_ABORT";
					case DbResult.BE_SQLITE_BUSY: return "Db is busy";
					case DbResult.BE_SQLITE_LOCKED: return "Db is Locked";
					case DbResult.BE_SQLITE_NOMEM: return "BE_SQLITE_NOMEM";
					case DbResult.BE_SQLITE_READONLY: return "Readonly";
					case DbResult.BE_SQLITE_INTERRUPT: return "BE_SQLITE_INTERRUPT";
					case DbResult.BE_SQLITE_IOERR: return "BE_SQLITE_IOERR";
					case DbResult.BE_SQLITE_CORRUPT: return "BE_SQLITE_CORRUPT";
					case DbResult.BE_SQLITE_NOTFOUND: return "Not Found";
					case DbResult.BE_SQLITE_FULL: return "BE_SQLITE_FULL";
					case DbResult.BE_SQLITE_CANTOPEN: return "Can't open";
					case DbResult.BE_SQLITE_PROTOCOL: return "BE_SQLITE_PROTOCOL";
					case DbResult.BE_SQLITE_EMPTY: return "BE_SQLITE_EMPTY";
					case DbResult.BE_SQLITE_SCHEMA: return "BE_SQLITE_SCHEMA";
					case DbResult.BE_SQLITE_TOOBIG: return "BE_SQLITE_TOOBIG";
					case DbResult.BE_SQLITE_MISMATCH: return "BE_SQLITE_MISMATCH";
					case DbResult.BE_SQLITE_MISUSE: return "BE_SQLITE_MISUSE";
					case DbResult.BE_SQLITE_NOLFS: return "BE_SQLITE_NOLFS";
					case DbResult.BE_SQLITE_AUTH: return "BE_SQLITE_AUTH";
					case DbResult.BE_SQLITE_FORMAT: return "BE_SQLITE_FORMAT";
					case DbResult.BE_SQLITE_RANGE: return "BE_SQLITE_RANGE";
					case DbResult.BE_SQLITE_NOTADB: return "Not a Database";
					case DbResult.BE_SQLITE_IOERR_READ: return "BE_SQLITE_IOERR_READ";
					case DbResult.BE_SQLITE_IOERR_SHORT_READ: return "BE_SQLITE_IOERR_SHORT_READ";
					case DbResult.BE_SQLITE_IOERR_WRITE: return "BE_SQLITE_IOERR_WRITE";
					case DbResult.BE_SQLITE_IOERR_FSYNC: return "BE_SQLITE_IOERR_FSYNC";
					case DbResult.BE_SQLITE_IOERR_DIR_FSYNC: return "BE_SQLITE_IOERR_DIR_FSYNC";
					case DbResult.BE_SQLITE_IOERR_TRUNCATE: return "BE_SQLITE_IOERR_TRUNCATE";
					case DbResult.BE_SQLITE_IOERR_FSTAT: return "BE_SQLITE_IOERR_FSTAT";
					case DbResult.BE_SQLITE_IOERR_UNLOCK: return "BE_SQLITE_IOERR_UNLOCK";
					case DbResult.BE_SQLITE_IOERR_RDLOCK: return "BE_SQLITE_IOERR_RDLOCK";
					case DbResult.BE_SQLITE_IOERR_DELETE: return "BE_SQLITE_IOERR_DELETE";
					case DbResult.BE_SQLITE_IOERR_BLOCKED: return "BE_SQLITE_IOERR_BLOCKED";
					case DbResult.BE_SQLITE_IOERR_NOMEM: return "BE_SQLITE_IOERR_NOMEM";
					case DbResult.BE_SQLITE_IOERR_ACCESS: return "BE_SQLITE_IOERR_ACCESS";
					case DbResult.BE_SQLITE_IOERR_CHECKRESERVEDLOCK: return "BE_SQLITE_IOERR_CHECKRESERVEDLOCK";
					case DbResult.BE_SQLITE_IOERR_LOCK: return "BE_SQLITE_IOERR_LOCK";
					case DbResult.BE_SQLITE_IOERR_CLOSE: return "BE_SQLITE_IOERR_CLOSE";
					case DbResult.BE_SQLITE_IOERR_DIR_CLOSE: return "BE_SQLITE_IOERR_DIR_CLOSE";
					case DbResult.BE_SQLITE_IOERR_SHMOPEN: return "BE_SQLITE_IOERR_SHMOPEN";
					case DbResult.BE_SQLITE_IOERR_SHMSIZE: return "BE_SQLITE_IOERR_SHMSIZE";
					case DbResult.BE_SQLITE_IOERR_SHMLOCK: return "BE_SQLITE_IOERR_SHMLOCK";
					case DbResult.BE_SQLITE_IOERR_SHMMAP: return "BE_SQLITE_IOERR_SHMMAP";
					case DbResult.BE_SQLITE_IOERR_SEEK: return "BE_SQLITE_IOERR_SEEK";
					case DbResult.BE_SQLITE_IOERR_DELETE_NOENT: return "BE_SQLITE_IOERR_DELETE_NOENT";
					case DbResult.BE_SQLITE_ERROR_DataTransformRequired: return "Schema update require to transform data";
					case DbResult.BE_SQLITE_ERROR_FileExists: return "File Exists";
					case DbResult.BE_SQLITE_ERROR_AlreadyOpen: return "Already Open";
					case DbResult.BE_SQLITE_ERROR_NoPropertyTable: return "No Property Table";
					case DbResult.BE_SQLITE_ERROR_FileNotFound: return "File Not Found";
					case DbResult.BE_SQLITE_ERROR_NoTxnActive: return "No Txn Active";
					case DbResult.BE_SQLITE_ERROR_BadDbProfile: return "Bad Db Profile";
					case DbResult.BE_SQLITE_ERROR_InvalidProfileVersion: return "Invalid Profile Version";
					case DbResult.BE_SQLITE_ERROR_ProfileUpgradeFailed: return "Profile Upgrade Failed";
					case DbResult.BE_SQLITE_ERROR_ProfileTooOldForReadWrite: return "Profile Too Old For ReadWrite";
					case DbResult.BE_SQLITE_ERROR_ProfileTooOld: return "Profile Too Old";
					case DbResult.BE_SQLITE_ERROR_ProfileTooNewForReadWrite: return "Profile Too New For ReadWrite";
					case DbResult.BE_SQLITE_ERROR_ProfileTooNew: return "Profile Too New";
					case DbResult.BE_SQLITE_ERROR_ChangeTrackError: return "ChangeTrack Error";
					case DbResult.BE_SQLITE_ERROR_InvalidChangeSetVersion: return "Invalid ChangeSet Version";
					case DbResult.BE_SQLITE_ERROR_SchemaUpgradeRequired: return "Schema Upgrade Required";
					case DbResult.BE_SQLITE_ERROR_SchemaTooNew: return "Schema Too New";
					case DbResult.BE_SQLITE_ERROR_SchemaTooOld: return "Schema Too Old";
					case DbResult.BE_SQLITE_ERROR_SchemaLockFailed: return "Schema Lock Failed";
					case DbResult.BE_SQLITE_ERROR_SchemaUpgradeFailed: return "Schema Upgrade Failed";
					case DbResult.BE_SQLITE_ERROR_SchemaImportFailed: return "Schema Import Failed";
					case DbResult.BE_SQLITE_ERROR_CouldNotAcquireLocksOrCodes: return "Could Not Acquire Locks Or Codes";
					case DbResult.BE_SQLITE_ERROR_SchemaUpgradeRecommended: return "Recommended that the schemas found in the database be upgraded";
					case DbResult.BE_SQLITE_LOCKED_SHAREDCACHE: return "BE_SQLITE_LOCKED_SHAREDCACHE";
					case DbResult.BE_SQLITE_BUSY_RECOVERY: return "BE_SQLITE_BUSY_RECOVERY";
					case DbResult.BE_SQLITE_CANTOPEN_NOTEMPDIR: return "SQLite No Temp Dir";
					case DbResult.BE_SQLITE_CANTOPEN_ISDIR: return "BE_SQLITE_CANTOPEN_ISDIR";
					case DbResult.BE_SQLITE_CANTOPEN_FULLPATH: return "BE_SQLITE_CANTOPEN_FULLPATH";
					case DbResult.BE_SQLITE_CORRUPT_VTAB: return "BE_SQLITE_CORRUPT_VTAB";
					case DbResult.BE_SQLITE_READONLY_RECOVERY: return "BE_SQLITE_READONLY_RECOVERY";
					case DbResult.BE_SQLITE_READONLY_CANTLOCK: return "BE_SQLITE_READONLY_CANTLOCK";
					case DbResult.BE_SQLITE_READONLY_ROLLBACK: return "BE_SQLITE_READONLY_ROLLBACK";
					case DbResult.BE_SQLITE_ABORT_ROLLBACK: return "BE_SQLITE_ABORT_ROLLBACK";
					case DbResult.BE_SQLITE_CONSTRAINT_CHECK: return "BE_SQLITE_CONSTRAINT_CHECK";
					case DbResult.BE_SQLITE_CONSTRAINT_COMMITHOOK: return "CommitHook Constraint Error";
					case DbResult.BE_SQLITE_CONSTRAINT_FOREIGNKEY: return "Foreign Key Constraint Error";
					case DbResult.BE_SQLITE_CONSTRAINT_FUNCTION: return "Function Constraint Error";
					case DbResult.BE_SQLITE_CONSTRAINT_NOTNULL: return "NotNull Constraint Error";
					case DbResult.BE_SQLITE_CONSTRAINT_PRIMARYKEY: return "Primary Key Constraint Error";
					case DbResult.BE_SQLITE_CONSTRAINT_TRIGGER: return "Trigger Constraint Error";
					case DbResult.BE_SQLITE_CONSTRAINT_UNIQUE: return "Unique Constraint Error";
					case DbResult.BE_SQLITE_CONSTRAINT_VTAB: return "VTable Constraint Error";
					case BentleyStatus.ERROR: return "Error";
					case BriefcaseStatus.CannotAcquire: return "CannotAcquire";
					case BriefcaseStatus.CannotDownload: return "CannotDownload";
					case BriefcaseStatus.CannotCopy: return "CannotCopy";
					case BriefcaseStatus.CannotDelete: return "CannotDelete";
					case BriefcaseStatus.VersionNotFound: return "VersionNotFound";
					case BriefcaseStatus.DownloadCancelled: return "DownloadCancelled";
					case BriefcaseStatus.ContainsDeletedChangeSets: return "ContainsDeletedChangeSets";
					case RpcInterfaceStatus.IncompatibleVersion: return "RpcInterfaceStatus.IncompatibleVersion";
					case ChangeSetStatus.ApplyError: return "Error applying a change set";
					case ChangeSetStatus.ChangeTrackingNotEnabled: return "Change tracking has not been enabled. The ChangeSet API mandates this";
					case ChangeSetStatus.CorruptedChangeStream: return "Contents of the change stream are corrupted and does not match the ChangeSet";
					case ChangeSetStatus.FileNotFound: return "File containing the changes was not found";
					case ChangeSetStatus.FileWriteError: return "Error writing the contents of the change set to the backing change stream file";
					case ChangeSetStatus.HasLocalChanges: return "Cannot perform the operation since the Db has local changes";
					case ChangeSetStatus.HasUncommittedChanges: return "Cannot perform the operation since current transaction has uncommitted changes";
					case ChangeSetStatus.InvalidId: return "Invalid ChangeSet Id";
					case ChangeSetStatus.InvalidVersion: return "Invalid version of the change set";
					case ChangeSetStatus.InDynamicTransaction: return "Cannot perform the operation since system is in the middle of a dynamic transaction";
					case ChangeSetStatus.IsCreatingChangeSet: return "Cannot perform operation since system is in the middle of a creating a change set";
					case ChangeSetStatus.IsNotCreatingChangeSet: return "Cannot perform operation since the system is not creating a change set";
					case ChangeSetStatus.MergePropagationError: return "Error propagating the changes after the merge";
					case ChangeSetStatus.NothingToMerge: return "No change sets to merge";
					case ChangeSetStatus.NoTransactions: return "No transactions are available to create a change set";
					case ChangeSetStatus.ParentMismatch: return "Parent change set of the Db does not match the parent id of the change set";
					case ChangeSetStatus.SQLiteError: return "Error performing a SQLite operation on the Db";
					case ChangeSetStatus.WrongDgnDb: return "ChangeSet originated in a different Db";
					case ChangeSetStatus.CouldNotOpenDgnDb: return "Could not open the DgnDb to merge change set";
					case ChangeSetStatus.MergeSchemaChangesOnOpen: return "Cannot merge changes in in an open DgnDb. Close the DgnDb, and process the operation when it is opened";
					case ChangeSetStatus.ReverseOrReinstateSchemaChanges: return "Cannot reverse or reinstate schema changes.";
					case ChangeSetStatus.ProcessSchemaChangesOnOpen: return "Cannot process changes schema changes in an open DgnDb. Close the DgnDb, and process the operation when it is opened";
					case ChangeSetStatus.CannotMergeIntoReadonly: return "Cannot merge changes into a Readonly DgnDb";
					case ChangeSetStatus.CannotMergeIntoMaster: return "Cannot merge changes into a Master DgnDb";
					case ChangeSetStatus.CannotMergeIntoReversed: return "Cannot merge changes into a DgnDb that has reversed change sets";
					case ChangeSetStatus.DownloadCancelled: return "ChangeSet(s) download was cancelled.";
					case RepositoryStatus.ServerUnavailable: return "ServerUnavailable";
					case RepositoryStatus.LockAlreadyHeld: return "LockAlreadyHeld";
					case RepositoryStatus.SyncError: return "SyncError";
					case RepositoryStatus.InvalidResponse: return "InvalidResponse";
					case RepositoryStatus.PendingTransactions: return "PendingTransactions";
					case RepositoryStatus.LockUsed: return "LockUsed";
					case RepositoryStatus.CannotCreateChangeSet: return "CannotCreateChangeSet";
					case RepositoryStatus.InvalidRequest: return "InvalidRequest";
					case RepositoryStatus.ChangeSetRequired: return "ChangeSetRequired";
					case RepositoryStatus.CodeUnavailable: return "CodeUnavailable";
					case RepositoryStatus.CodeNotReserved: return "CodeNotReserved";
					case RepositoryStatus.CodeUsed: return "CodeUsed";
					case RepositoryStatus.LockNotHeld: return "LockNotHeld";
					case RepositoryStatus.RepositoryIsLocked: return "RepositoryIsLocked";
					case RepositoryStatus.ChannelConstraintViolation: return "ChannelConstraintViolation";
					case HttpStatus.Info: return "HTTP Info";
					case HttpStatus.Redirection: return "HTTP Redirection";
					case HttpStatus.ClientError: return "HTTP Client error";
					case HttpStatus.ServerError: return "HTTP Server error";
					case IModelHubStatus.Unknown: return "Unknown error";
					case IModelHubStatus.MissingRequiredProperties: return "Missing required properties";
					case IModelHubStatus.InvalidPropertiesValues: return "Invalid properties values";
					case IModelHubStatus.UserDoesNotHavePermission: return "User does not have permission";
					case IModelHubStatus.UserDoesNotHaveAccess: return "User does not have access";
					case IModelHubStatus.InvalidBriefcase: return "Invalid briefcase";
					case IModelHubStatus.BriefcaseDoesNotExist: return "Briefcase does not exist";
					case IModelHubStatus.BriefcaseDoesNotBelongToUser: return "Briefcase does not belong to user";
					case IModelHubStatus.AnotherUserPushing: return "Another user pushing";
					case IModelHubStatus.ChangeSetAlreadyExists: return "ChangeSet already exists";
					case IModelHubStatus.ChangeSetDoesNotExist: return "ChangeSet does not exist";
					case IModelHubStatus.FileIsNotUploaded: return "File is not uploaded";
					case IModelHubStatus.iModelIsNotInitialized: return "iModel is not initialized";
					case IModelHubStatus.ChangeSetPointsToBadSeed: return "ChangeSet points to a bad seed file";
					case IModelHubStatus.OperationFailed: return "iModelHub operation has failed";
					case IModelHubStatus.PullIsRequired: return "Pull is required";
					case IModelHubStatus.MaximumNumberOfBriefcasesPerUser: return "Limit of briefcases per user was reached";
					case IModelHubStatus.MaximumNumberOfBriefcasesPerUserPerMinute: return "Limit of briefcases per user per minute was reached";
					case IModelHubStatus.DatabaseTemporarilyLocked: return "Database is temporarily locked";
					case IModelHubStatus.iModelIsLocked: return "iModel is locked";
					case IModelHubStatus.CodesExist: return "Code already exists";
					case IModelHubStatus.LocksExist: return "Lock already exists";
					case IModelHubStatus.iModelAlreadyExists: return "iModel already exists";
					case IModelHubStatus.iModelDoesNotExist: return "iModel does not exist";
					case IModelHubStatus.LockDoesNotExist: return "Lock does not exist";
					case IModelHubStatus.LockChunkDoesNotExist: return "Lock chunk does not exist";
					case IModelHubStatus.LockOwnedByAnotherBriefcase: return "Lock is owned by another briefcase";
					case IModelHubStatus.CodeStateInvalid: return "Code state is invalid";
					case IModelHubStatus.CodeReservedByAnotherBriefcase: return "Code is reserved by another briefcase";
					case IModelHubStatus.CodeDoesNotExist: return "Code does not exist";
					case IModelHubStatus.FileDoesNotExist: return "File does not exist";
					case IModelHubStatus.FileAlreadyExists: return "File already exists";
					case IModelHubStatus.EventTypeDoesNotExist: return "Event type does not exist";
					case IModelHubStatus.EventSubscriptionDoesNotExist: return "Event subscription does not exist";
					case IModelHubStatus.EventSubscriptionAlreadyExists: return "Event subscription already exists";
					case IModelHubStatus.ITwinIdIsNotSpecified: return "ITwin Id is not specified";
					case IModelHubStatus.FailedToGetITwinPermissions: return "Failed to get iTwin permissions";
					case IModelHubStatus.FailedToGetITwinMembers: return "Failed to get iTwin members";
					case IModelHubStatus.FailedToGetAssetPermissions: return "Failed to get asset permissions";
					case IModelHubStatus.FailedToGetAssetMembers: return "Failed to get asset members";
					case IModelHubStatus.ChangeSetAlreadyHasVersion: return "ChangeSet already has version";
					case IModelHubStatus.VersionAlreadyExists: return "Version already exists";
					case IModelHubStatus.JobSchedulingFailed: return "Failed to schedule a background job";
					case IModelHubStatus.ConflictsAggregate: return "Codes or locks are owned by another briefcase";
					case IModelHubStatus.FailedToGetITwinById: return "Failed to query iTwin by its id";
					case IModelHubStatus.DatabaseOperationFailed: return "Database operation has failed";
					case IModelHubStatus.ITwinDoesNotExist: return "ITwin does not exist";
					case IModelHubStatus.UndefinedArgumentError: return "Undefined argument";
					case IModelHubStatus.InvalidArgumentError: return "Invalid argument";
					case IModelHubStatus.MissingDownloadUrlError: return "Missing download url";
					case IModelHubStatus.NotSupportedInBrowser: return "Not supported in browser";
					case IModelHubStatus.FileHandlerNotSet: return "File handler is not set";
					case IModelHubStatus.FileNotFound: return "File not found";
					case GeoServiceStatus.NoGeoLocation: return "No GeoLocation";
					case GeoServiceStatus.OutOfUsefulRange: return "Out of useful range";
					case GeoServiceStatus.OutOfMathematicalDomain: return "Out of mathematical domain";
					case GeoServiceStatus.NoDatumConverter: return "No datum converter";
					case GeoServiceStatus.VerticalDatumConvertError: return "Vertical datum convert error";
					case GeoServiceStatus.CSMapError: return "CSMap error";
					case GeoServiceStatus.Pending: return "Pending";
					case RealityDataStatus.InvalidData: return "Invalid or unknown data";
					case DbResult.BE_SQLITE_OK:
					case DbResult.BE_SQLITE_ROW:
					case DbResult.BE_SQLITE_DONE:
					case BentleyStatus.SUCCESS: return "Success";
					default: return `Error (${errorNumber})`;
				}
			}
			/** Use run-time type checking to safely get a useful string summary of an unknown error value, or `""` if none exists.
			* @note It's recommended to use this function in `catch` clauses, where a caught value cannot be assumed to be `instanceof Error`
			* @public
			*/
			static getErrorMessage(error) {
				if (typeof error === "string") return error;
				if (error instanceof Error) return error.toString();
				if (JsonUtils.isObject(error)) {
					if (typeof error.message === "string") return error.message;
					if (typeof error.msg === "string") return error.msg;
					if (error.toString() !== "[object Object]") return error.toString();
				}
				return "";
			}
			/** Use run-time type checking to safely get the call stack of an unknown error value, if possible.
			* @note It's recommended to use this function in `catch` clauses, where a caught value cannot be assumed to be `instanceof Error`
			* @public
			*/
			static getErrorStack(error) {
				if (JsonUtils.isObject(error) && typeof error.stack === "string") return error.stack;
			}
			/** Use run-time type checking to safely get the metadata with an unknown error value, if possible.
			* @note It's recommended to use this function in `catch` clauses, where a caught value cannot be assumed to be `instanceof BentleyError`
			* @see [[BentleyError.getMetaData]]
			* @public
			*/
			static getErrorMetadata(error) {
				if (JsonUtils.isObject(error) && typeof error.getMetaData === "function") {
					const metadata = error.getMetaData();
					if (typeof metadata === "object" && metadata !== null) return metadata;
				}
			}
			/** Returns a new `ErrorProps` object representing an unknown error value.  Useful for logging or wrapping/re-throwing caught errors.
			* @note Unlike `Error` objects (which lose messages and call stacks when serialized to JSON), objects
			*       returned by this are plain old JavaScript objects, and can be easily logged/serialized to JSON.
			* @public
			*/
			static getErrorProps(error) {
				const serialized = { message: BentleyError.getErrorMessage(error) };
				const stack = BentleyError.getErrorStack(error);
				if (stack) serialized.stack = stack;
				const metadata = BentleyError.getErrorMetadata(error);
				if (metadata) serialized.metadata = metadata;
				return serialized;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/BentleyLoggerCategory.js
var BentleyLoggerCategory;
function init_BentleyLoggerCategory() {
	return (init_BentleyLoggerCategory = __esmMin((() => {
		(function(BentleyLoggerCategory) {
			/** The logger category used by common classes relating to ElementProps. */
			BentleyLoggerCategory["Performance"] = "Performance";
		})(BentleyLoggerCategory || (BentleyLoggerCategory = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/Logger.js
var LogLevel, Logger;
function init_Logger() {
	return (init_Logger = __esmMin((() => {
		init_BeEvent();
		init_BentleyError();
		init_BentleyLoggerCategory();
		(function(LogLevel) {
			/** Tracing and debugging - low level */
			LogLevel[LogLevel["Trace"] = 0] = "Trace";
			/** Information - mid level */
			LogLevel[LogLevel["Info"] = 1] = "Info";
			/** Warnings - high level */
			LogLevel[LogLevel["Warning"] = 2] = "Warning";
			/** Errors - highest level */
			LogLevel[LogLevel["Error"] = 3] = "Error";
			/** Higher than any real logging level. This is used to turn a category off. */
			LogLevel[LogLevel["None"] = 4] = "None";
		})(LogLevel || (LogLevel = {}));
		Logger = class Logger {
			static _logError;
			static _logWarning;
			static _logInfo;
			static _logTrace;
			static _onLogLevelChanged;
			static _staticMetaData = /* @__PURE__ */ new Map();
			/** An event raised whenever [[setLevel]] or [[setLevelDefault]] is called. */
			static get onLogLevelChanged() {
				if (void 0 === Logger._onLogLevelChanged) Logger._onLogLevelChanged = new BeEvent();
				return Logger._onLogLevelChanged;
			}
			static _categoryFilter = {};
			/** Maps category names to the least severe level at which messages in that category should be displayed,
			* or `undefined` if a minimum has not been defined.
			* @see [[setLevel]] to change the minimum logging level for a category.
			*/
			static get categoryFilter() {
				return this._categoryFilter;
			}
			static _minLevel;
			/** The least severe level at which messages should be displayed by default.
			* @see [[setLevelDefault]] to change this default.
			* @see [[setLevel]] to override this default for specific categories.
			*/
			static get minLevel() {
				return this._minLevel;
			}
			/** Should the call stack be included when an exception is logged?  */
			static logExceptionCallstacks = false;
			/** Contains metadata that should be included with every logged message.
			* @beta
			*/
			static get staticMetaData() {
				return this._staticMetaData;
			}
			/** Initialize the logger streams. Should be called at application initialization time. */
			static initialize(logError, logWarning, logInfo, logTrace) {
				Logger._logError = logError;
				Logger._logWarning = logWarning;
				Logger._logInfo = logInfo;
				Logger._logTrace = logTrace;
				Logger.turnOffLevelDefault();
				Logger.turnOffCategories();
			}
			/** Initialize the logger to output to the console. */
			static initializeToConsole() {
				const logConsole = (level) => (category, message, metaData) => console.log(`${level} | ${category} | ${message} ${Logger.stringifyMetaData(metaData)}`);
				Logger.initialize(logConsole("Error"), logConsole("Warning"), logConsole("Info"), logConsole("Trace"));
			}
			/** merge the supplied metadata with all static metadata into one object */
			static getMetaData(metaData) {
				const metaObj = {};
				for (const meta of this._staticMetaData) {
					const val = BentleyError.getMetaData(meta[1]);
					if (val) Object.assign(metaObj, val);
				}
				Object.assign(metaObj, BentleyError.getMetaData(metaData));
				return metaObj;
			}
			/** stringify the metadata for a log message by merging the supplied metadata with all static metadata into one object that is then `JSON.stringify`ed. */
			static stringifyMetaData(metaData) {
				const metaObj = this.getMetaData(metaData);
				return Object.keys(metaObj).length > 0 ? JSON.stringify(metaObj) : "";
			}
			/** Set the least severe level at which messages should be displayed by default. Call setLevel to override this default setting for specific categories. */
			static setLevelDefault(minLevel) {
				this._minLevel = minLevel;
				this.onLogLevelChanged.raiseEvent();
			}
			/** Set the minimum logging level for the specified category. The minimum level is least severe level at which messages in the
			* specified category should be displayed.
			*/
			static setLevel(category, minLevel) {
				Logger._categoryFilter[category] = minLevel;
				this.onLogLevelChanged.raiseEvent();
			}
			/** Interpret a string as the name of a LogLevel */
			static parseLogLevel(str) {
				switch (str.toUpperCase()) {
					case "EXCEPTION": return LogLevel.Error;
					case "FATAL": return LogLevel.Error;
					case "ERROR": return LogLevel.Error;
					case "WARNING": return LogLevel.Warning;
					case "INFO": return LogLevel.Info;
					case "TRACE": return LogLevel.Trace;
					case "DEBUG": return LogLevel.Trace;
				}
				return LogLevel.None;
			}
			/** Set the log level for multiple categories at once. Also see [[validateProps]] */
			static configureLevels(cfg) {
				Logger.validateProps(cfg);
				if (cfg.defaultLevel !== void 0) this.setLevelDefault(Logger.parseLogLevel(cfg.defaultLevel));
				if (cfg.categoryLevels !== void 0) for (const cl of cfg.categoryLevels) this.setLevel(cl.category, Logger.parseLogLevel(cl.logLevel));
			}
			static isLogLevel(v) {
				return LogLevel.hasOwnProperty(v);
			}
			/** Check that the specified object is a valid LoggerLevelsConfig. This is useful when reading a config from a .json file. */
			static validateProps(config) {
				const validProps = ["defaultLevel", "categoryLevels"];
				for (const prop of Object.keys(config)) {
					if (!validProps.includes(prop)) throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig - unrecognized property: ${prop}`);
					if (prop === "defaultLevel") {
						if (!Logger.isLogLevel(config.defaultLevel)) throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig.defaultLevel must be a LogLevel. Invalid value: ${JSON.stringify(config.defaultLevel)}`);
					} else if (prop === "categoryLevels") {
						const value = config[prop];
						if (!Array.isArray(value)) throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig.categoryLevels must be an array. Invalid value: ${JSON.stringify(value)}`);
						for (const item of config[prop]) {
							if (!item.hasOwnProperty("category") || !item.hasOwnProperty("logLevel")) throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig.categoryLevels - each item must be a LoggerCategoryAndLevel {category: logLevel:}. Invalid value: ${JSON.stringify(item)}`);
							if (!Logger.isLogLevel(item.logLevel)) throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig.categoryLevels - each item's logLevel property must be a LogLevel. Invalid value: ${JSON.stringify(item.logLevel)}`);
						}
					}
				}
			}
			/** Get the minimum logging level for the specified category. */
			static getLevel(category) {
				const minLevelForThisCategory = Logger.categoryFilter[category];
				if (minLevelForThisCategory !== void 0) return minLevelForThisCategory;
				const parent = category.lastIndexOf(".");
				if (parent !== -1) return Logger.getLevel(category.slice(0, parent));
				return Logger.minLevel;
			}
			/** Turns off the least severe level at which messages should be displayed by default.
			* This turns off logging for all messages for which no category minimum level is defined.
			*/
			static turnOffLevelDefault() {
				Logger._minLevel = void 0;
			}
			/** Turns off all category level filters previously defined with [[Logger.setLevel]].
			*/
			static turnOffCategories() {
				Logger._categoryFilter = {};
			}
			/** Check if messages in the specified category should be displayed at this level of severity. */
			static isEnabled(category, level) {
				const minLevel = Logger.getLevel(category);
				return minLevel !== void 0 && level >= minLevel;
			}
			static logError(category, messageOrError, metaData) {
				if (Logger._logError && Logger.isEnabled(category, LogLevel.Error)) {
					if (typeof messageOrError === "string") Logger._logError(category, messageOrError, metaData);
					else if (BentleyError.isError(messageOrError)) Logger._logError(category, Logger.getExceptionMessage(messageOrError), () => ({
						...BentleyError.getErrorMetadata(messageOrError),
						exceptionType: messageOrError?.constructor?.name ?? "<Unknown>",
						...BentleyError.getMetaData(metaData)
					}));
					else Logger._logError(category, Logger.getExceptionMessage(messageOrError), Logger.getExceptionMetaData(messageOrError, metaData));
				}
			}
			/**
			* Get a sting message for a given error.
			* For legacy [[BentleyError]] exceptions, this will include the error message and, optionally, the call stack.
			* For other exceptions, this will include the stringified version of the error.
			* @param error The error to get the message for
			* @returns A string message for the error
			*/
			static getExceptionMessage(error) {
				if (error === void 0) return "Error: error is undefined.";
				if (error === null) return "Error: error is null.";
				const stack = Logger.logExceptionCallstacks ? `\n${BentleyError.getErrorStack(error)}` : "";
				return BentleyError.getErrorMessage(error) + stack;
			}
			/**
			* Merged passed metaData with error properties into one LoggingMetaData, with the passed metaData taking precedence in case of conflict.
			* @param error The error to be logged as metadata
			* @param metaData Optional metadata to be merged with the error
			* @returns A function returning the merged metadata
			*/
			static getExceptionMetaData(error, metaData) {
				const exceptionType = error?.constructor?.name ?? "<Unknown>";
				if (metaData === void 0) return () => ({
					exceptionType,
					...error
				});
				return () => ({
					exceptionType,
					...error,
					...BentleyError.getMetaData(metaData)
				});
			}
			/** Log the specified exception.
			* For legacy [[BentleyError]] exceptions, the special "exceptionType" property will be added as metadata. Otherwise, all enumerable members of the exception are logged as metadata.
			* @param category  The category of the message.
			* @param err  The exception object.
			* @param log The logger output function to use - defaults to Logger.logError
			* @deprecated in 5.6 - will not be removed until after 2027-03-03. Use logError(category, error, metaData) instead, which will log exceptions in the same way but is more flexible and easier to use.
			*/
			static logException(category, err, log = (_category, message, metaData) => Logger.logError(_category, message, metaData)) {
				log(category, Logger.getExceptionMessage(err), () => {
					if (BentleyError.isError(err)) return {
						...BentleyError.getErrorMetadata(err),
						exceptionType: err?.constructor?.name ?? "<Unknown>"
					};
					return { ...err };
				});
			}
			/** Log the specified message to the **warning** stream.
			* @param category  The category of the message.
			* @param message  The message.
			* @param metaData  Optional data for the message
			*/
			static logWarning(category, message, metaData) {
				if (Logger._logWarning && Logger.isEnabled(category, LogLevel.Warning)) Logger._logWarning(category, message, metaData);
			}
			/** Log the specified message to the **info** stream.
			* @param category  The category of the message.
			* @param message  The message.
			* @param metaData  Optional data for the message
			*/
			static logInfo(category, message, metaData) {
				if (Logger._logInfo && Logger.isEnabled(category, LogLevel.Info)) Logger._logInfo(category, message, metaData);
			}
			/** Log the specified message to the **trace** stream.
			* @param category  The category of the message.
			* @param message  The message.
			* @param metaData  Optional data for the message
			*/
			static logTrace(category, message, metaData) {
				if (Logger._logTrace && Logger.isEnabled(category, LogLevel.Trace)) Logger._logTrace(category, message, metaData);
			}
		};
		(class PerfLogger {
			static _severity = LogLevel.Info;
			_operation;
			_metaData;
			_startTimeStamp;
			constructor(operation, metaData) {
				this._operation = operation;
				this._metaData = metaData;
				if (!Logger.isEnabled(BentleyLoggerCategory.Performance, PerfLogger._severity)) {
					this._startTimeStamp = 0;
					return;
				}
				Logger.logInfo(BentleyLoggerCategory.Performance, `${this._operation},START`, this._metaData);
				this._startTimeStamp = (/* @__PURE__ */ new Date()).getTime();
			}
			logMessage() {
				const endTimeStamp = (/* @__PURE__ */ new Date()).getTime();
				if (!Logger.isEnabled(BentleyLoggerCategory.Performance, PerfLogger._severity)) return;
				Logger.logInfo(BentleyLoggerCategory.Performance, `${this._operation},END`, () => {
					return {
						...this._metaData ? BentleyError.getMetaData(this._metaData) : {},
						TimeElapsed: endTimeStamp - this._startTimeStamp
					};
				});
			}
			[Symbol.dispose]() {
				this.logMessage();
			}
			/** @deprecated in 5.0 - will not be removed until after 2026-06-13. Use [Symbol.dispose] instead. */
			dispose() {
				this[Symbol.dispose]();
			}
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/UnexpectedErrors.js
var UnexpectedErrors;
function init_UnexpectedErrors() {
	return (init_UnexpectedErrors = __esmMin((() => {
		init_Logger();
		UnexpectedErrors = class {
			/** handler for re-throwing exceptions directly */
			static reThrowImmediate = (e) => {
				throw e;
			};
			/** handler for re-throwing exceptions from an asynchronous interval (so the current call stack is not aborted) */
			static reThrowDeferred = (e) => setTimeout(() => {
				throw e;
			}, 0);
			/** handler for logging exception to console */
			static consoleLog = (e) => console.error(e);
			/** handler for logging exception with [[Logger]] */
			static errorLog = (e) => Logger.logError("unhandled", e);
			static _telemetry = [];
			static _handler = this.errorLog;
			constructor() {}
			/** Add a "telemetry tracker" for unexpected errors. Useful for tracking/reporting errors without changing handler.
			* @returns a method to remove the tracker
			*/
			static addTelemetry(tracker) {
				this._telemetry.push(tracker);
				return () => this._telemetry.splice(this._telemetry.indexOf(tracker), 1);
			}
			/** call this method when an unexpected error happens so the global handler can process it.
			* @param error the unexpected error
			* @param notifyTelemetry if false, don't notify telemetry trackers. Use this for exceptions from third-party code, for example.
			*/
			static handle(error, notifyTelemetry = true) {
				this._handler(error);
				if (notifyTelemetry) this._telemetry.forEach((telemetry) => {
					try {
						telemetry(error);
					} catch {}
				});
			}
			/** establish a new global *unexpected error* handler.
			* @param handler the new global handler. You may provide your own function or use one of the static members of this class.
			* The default is [[errorLog]].
			* @returns the previous handler. Useful to temporarily change the handler.
			*/
			static setHandler(handler) {
				const oldHandler = this._handler;
				this._handler = handler;
				return oldHandler;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/BeEvent.js
var BeEvent, BeUiEvent;
function init_BeEvent() {
	return (init_BeEvent = __esmMin((() => {
		init_UnexpectedErrors();
		BeEvent = class {
			_listeners = [];
			_insideRaiseEvent = false;
			/** The number of listeners currently subscribed to the event. */
			get numberOfListeners() {
				return this._listeners.length;
			}
			/**
			* Registers a Listener to be executed whenever this event is raised.
			* @param listener The function to be executed when the event is raised.
			* @param scope An optional object scope to serve as the 'this' pointer when listener is invoked.
			* @returns A function that will remove this event listener.
			* @see [[BeEvent.raiseEvent]], [[BeEvent.removeListener]]
			*/
			addListener(listener, scope) {
				this._listeners.push({
					listener,
					scope,
					once: false
				});
				return () => this.removeListener(listener, scope);
			}
			/**
			* Registers a callback function to be executed *only once* when the event is raised.
			* @param listener The function to be executed once when the event is raised.
			* @param scope An optional object scope to serve as the `this` pointer in which the listener function will execute.
			* @returns A function that will remove this event listener.
			* @see [[BeEvent.raiseEvent]], [[BeEvent.removeListener]]
			*/
			addOnce(listener, scope) {
				this._listeners.push({
					listener,
					scope,
					once: true
				});
				return () => this.removeListener(listener, scope);
			}
			/**
			* Un-register a previously registered listener.
			* @param listener The listener to be unregistered.
			* @param  scope The scope that was originally passed to addListener.
			* @returns 'true' if the listener was removed; 'false' if the listener and scope are not registered with the event.
			* @see [[BeEvent.raiseEvent]], [[BeEvent.addListener]]
			*/
			removeListener(listener, scope) {
				const listeners = this._listeners;
				for (let i = 0; i < listeners.length; ++i) {
					const context = listeners[i];
					if (context.listener === listener && context.scope === scope) {
						if (this._insideRaiseEvent) context.listener = void 0;
						else listeners.splice(i, 1);
						return true;
					}
				}
				return false;
			}
			/**
			* Raises the event by calling each registered listener with the supplied arguments.
			* @param args This method takes any number of parameters and passes them through to the listeners.
			* @see [[BeEvent.removeListener]], [[BeEvent.addListener]]
			*/
			raiseEvent(...args) {
				this._insideRaiseEvent = true;
				const listeners = this._listeners;
				const length = listeners.length;
				let dropped = false;
				for (let i = 0; i < length; ++i) {
					const context = listeners[i];
					if (!context.listener) dropped = true;
					else {
						try {
							context.listener.apply(context.scope, args);
						} catch (e) {
							UnexpectedErrors.handle(e);
						}
						if (context.once) {
							context.listener = void 0;
							dropped = true;
						}
					}
				}
				if (dropped) this._listeners = this._listeners.filter((ctx) => ctx.listener !== void 0);
				this._insideRaiseEvent = false;
			}
			/** Determine whether this BeEvent has a specified listener registered.
			* @param listener The listener to check.
			* @param scope optional scope argument to match call to addListener
			*/
			has(listener, scope) {
				for (const ctx of this._listeners) if (ctx.listener === listener && ctx.scope === scope) return true;
				return false;
			}
			/** Clear all Listeners from this BeEvent. */
			clear() {
				this._listeners.length = 0;
			}
		};
		BeUiEvent = class extends BeEvent {
			/** Raises event with single strongly typed argument. */
			emit(args) {
				this.raiseEvent(args);
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/StatusCategory.js
function lookupHttpStatusCategory(statusCode) {
	switch (statusCode) {
		case BentleyStatus.SUCCESS: return new Success();
		case BentleyStatus.ERROR: return new UnknownError();
		case IModelStatus.Success: return new Success();
		case IModelStatus.AlreadyLoaded: return new StateViolation();
		case IModelStatus.AlreadyOpen: return new StateViolation();
		case IModelStatus.BadArg: return new ValidationError();
		case IModelStatus.BadElement: return new ValidationError();
		case IModelStatus.BadModel: return new ValidationError();
		case IModelStatus.BadRequest: return new BadRequest();
		case IModelStatus.BadSchema: return new ValidationError();
		case IModelStatus.CannotUndo: return new OperationFailed();
		case IModelStatus.CodeNotReserved: return new StateViolation();
		case IModelStatus.DeletionProhibited: return new Forbidden();
		case IModelStatus.DuplicateCode: return new Conflict();
		case IModelStatus.DuplicateName: return new Conflict();
		case IModelStatus.ElementBlockedChange: return new ConstraintViolation();
		case IModelStatus.FileAlreadyExists: return new Conflict();
		case IModelStatus.FileNotFound: return new NotFound();
		case IModelStatus.FileNotLoaded: return new FileSystemError();
		case IModelStatus.ForeignKeyConstraint: return new ConstraintViolation();
		case IModelStatus.IdExists: return new Conflict();
		case IModelStatus.InDynamicTransaction: return new StateViolation();
		case IModelStatus.InvalidCategory: return new ValidationError();
		case IModelStatus.InvalidCode: return new ValidationError();
		case IModelStatus.InvalidCodeSpec: return new ValidationError();
		case IModelStatus.InvalidId: return new ValidationError();
		case IModelStatus.InvalidName: return new ValidationError();
		case IModelStatus.InvalidParent: return new Conflict();
		case IModelStatus.InvalidProfileVersion: return new InvalidData();
		case IModelStatus.IsCreatingChangeSet: return new StateViolation();
		case IModelStatus.LockNotHeld: return new Forbidden();
		case IModelStatus.Mismatch2d3d: return new ValidationError();
		case IModelStatus.MismatchGcs: return new ValidationError();
		case IModelStatus.MissingDomain: return new ValidationError();
		case IModelStatus.MissingHandler: return new ValidationError();
		case IModelStatus.MissingId: return new ValidationError();
		case IModelStatus.NoGeometry: return new NoContent();
		case IModelStatus.NoMultiTxnOperation: return new StateViolation();
		case IModelStatus.NotEnabled: return new NotEnabled();
		case IModelStatus.NotFound: return new NotFound();
		case IModelStatus.NotOpen: return new StateViolation();
		case IModelStatus.NotOpenForWrite: return new Forbidden();
		case IModelStatus.NotSameUnitBase: return new ValidationError();
		case IModelStatus.NothingToRedo: return new NothingToDo();
		case IModelStatus.NothingToUndo: return new NothingToDo();
		case IModelStatus.ParentBlockedChange: return new Forbidden();
		case IModelStatus.ReadError: return new FileSystemError();
		case IModelStatus.ReadOnly: return new ReadOnly();
		case IModelStatus.ReadOnlyDomain: return new ReadOnly();
		case IModelStatus.RepositoryManagerError: return new NetworkError();
		case IModelStatus.SQLiteError: return new InternalError();
		case IModelStatus.TransactionActive: return new StateViolation();
		case IModelStatus.UnitsMissing: return new ValidationError();
		case IModelStatus.UnknownFormat: return new InvalidData();
		case IModelStatus.UpgradeFailed: return new OperationFailed();
		case IModelStatus.ValidationFailed: return new ValidationError();
		case IModelStatus.VersionTooNew: return new VersioningViolation();
		case IModelStatus.VersionTooOld: return new VersioningViolation();
		case IModelStatus.ViewNotFound: return new NotFound();
		case IModelStatus.WriteError: return new FileSystemError();
		case IModelStatus.WrongClass: return new ValidationError();
		case IModelStatus.WrongIModel: return new ValidationError();
		case IModelStatus.WrongDomain: return new ValidationError();
		case IModelStatus.WrongElement: return new ValidationError();
		case IModelStatus.WrongHandler: return new ValidationError();
		case IModelStatus.WrongModel: return new ValidationError();
		case IModelStatus.ConstraintNotUnique: return new ConstraintViolation();
		case IModelStatus.NoGeoLocation: return new ValidationError();
		case IModelStatus.ServerTimeout: return new Timeout();
		case IModelStatus.NoContent: return new NoContent();
		case IModelStatus.NotRegistered: return new NotImplemented();
		case IModelStatus.FunctionNotFound: return new NotImplemented();
		case IModelStatus.NoActiveCommand: return new StateViolation();
		case IModelStatus.Aborted: return new Aborted();
		case BriefcaseStatus.CannotAcquire: return new OperationFailed();
		case BriefcaseStatus.CannotDownload: return new OperationFailed();
		case BriefcaseStatus.CannotUpload: return new OperationFailed();
		case BriefcaseStatus.CannotCopy: return new OperationFailed();
		case BriefcaseStatus.CannotDelete: return new OperationFailed();
		case BriefcaseStatus.VersionNotFound: return new NotFound();
		case BriefcaseStatus.CannotApplyChanges: return new OperationFailed();
		case BriefcaseStatus.DownloadCancelled: return new Cancelled();
		case BriefcaseStatus.ContainsDeletedChangeSets: return new ValidationError();
		case RpcInterfaceStatus.Success: return new Success();
		case RpcInterfaceStatus.IncompatibleVersion: return new VersioningViolation();
		case ChangeSetStatus.Success: return new Success();
		case ChangeSetStatus.ApplyError: return new OperationFailed();
		case ChangeSetStatus.ChangeTrackingNotEnabled: return new NotEnabled();
		case ChangeSetStatus.CorruptedChangeStream: return new Corruption();
		case ChangeSetStatus.FileNotFound: return new NotFound();
		case ChangeSetStatus.FileWriteError: return new FileSystemError();
		case ChangeSetStatus.HasLocalChanges: return new StateViolation();
		case ChangeSetStatus.HasUncommittedChanges: return new StateViolation();
		case ChangeSetStatus.InvalidId: return new Corruption();
		case ChangeSetStatus.InvalidVersion: return new Corruption();
		case ChangeSetStatus.InDynamicTransaction: return new StateViolation();
		case ChangeSetStatus.IsCreatingChangeSet: return new StateViolation();
		case ChangeSetStatus.IsNotCreatingChangeSet: return new StateViolation();
		case ChangeSetStatus.MergePropagationError: return new OperationFailed();
		case ChangeSetStatus.NothingToMerge: return new NothingToDo();
		case ChangeSetStatus.NoTransactions: return new OperationFailed();
		case ChangeSetStatus.ParentMismatch: return new ValidationError();
		case ChangeSetStatus.SQLiteError: return new InternalError();
		case ChangeSetStatus.WrongDgnDb: return new ValidationError();
		case ChangeSetStatus.CouldNotOpenDgnDb: return new OperationFailed();
		case ChangeSetStatus.MergeSchemaChangesOnOpen: return new BadRequest();
		case ChangeSetStatus.ReverseOrReinstateSchemaChanges: return new Conflict();
		case ChangeSetStatus.ProcessSchemaChangesOnOpen: return new BadRequest();
		case ChangeSetStatus.CannotMergeIntoReadonly: return new ValidationError();
		case ChangeSetStatus.CannotMergeIntoMaster: return new ValidationError();
		case ChangeSetStatus.CannotMergeIntoReversed: return new ValidationError();
		case RepositoryStatus.Success: return new Success();
		case RepositoryStatus.ServerUnavailable: return new NetworkError();
		case RepositoryStatus.LockAlreadyHeld: return new Conflict();
		case RepositoryStatus.SyncError: return new NetworkError();
		case RepositoryStatus.InvalidResponse: return new NetworkError();
		case RepositoryStatus.PendingTransactions: return new StateViolation();
		case RepositoryStatus.LockUsed: return new StateViolation();
		case RepositoryStatus.CannotCreateChangeSet: return new InternalError();
		case RepositoryStatus.InvalidRequest: return new NetworkError();
		case RepositoryStatus.ChangeSetRequired: return new StateViolation();
		case RepositoryStatus.CodeUnavailable: return new Conflict();
		case RepositoryStatus.CodeNotReserved: return new StateViolation();
		case RepositoryStatus.CodeUsed: return new StateViolation();
		case RepositoryStatus.LockNotHeld: return new Forbidden();
		case RepositoryStatus.RepositoryIsLocked: return new Locked();
		case RepositoryStatus.ChannelConstraintViolation: return new ConstraintViolation();
		case HttpStatus.Success: return new Success();
		case IModelHubStatus.Success: return new Success();
		case IModelHubStatus.Unknown: return new UnknownError();
		case IModelHubStatus.MissingRequiredProperties: return new ValidationError();
		case IModelHubStatus.InvalidPropertiesValues: return new ValidationError();
		case IModelHubStatus.UserDoesNotHavePermission: return new PermissionsViolation();
		case IModelHubStatus.UserDoesNotHaveAccess: return new PermissionsViolation();
		case IModelHubStatus.InvalidBriefcase: return new ValidationError();
		case IModelHubStatus.BriefcaseDoesNotExist: return new NotFound();
		case IModelHubStatus.BriefcaseDoesNotBelongToUser: return new PermissionsViolation();
		case IModelHubStatus.AnotherUserPushing: return new StateViolation();
		case IModelHubStatus.ChangeSetAlreadyExists: return new Conflict();
		case IModelHubStatus.ChangeSetDoesNotExist: return new NotFound();
		case IModelHubStatus.FileIsNotUploaded: return new StateViolation();
		case IModelHubStatus.iModelIsNotInitialized: return new StateViolation();
		case IModelHubStatus.ChangeSetPointsToBadSeed: return new InvalidData();
		case IModelHubStatus.OperationFailed: return new OperationFailed();
		case IModelHubStatus.PullIsRequired: return new StateViolation();
		case IModelHubStatus.MaximumNumberOfBriefcasesPerUser: return new Throttled();
		case IModelHubStatus.MaximumNumberOfBriefcasesPerUserPerMinute: return new Throttled();
		case IModelHubStatus.DatabaseTemporarilyLocked: return new Locked();
		case IModelHubStatus.iModelIsLocked: return new Locked();
		case IModelHubStatus.CodesExist: return new Conflict();
		case IModelHubStatus.LocksExist: return new Conflict();
		case IModelHubStatus.iModelAlreadyExists: return new Conflict();
		case IModelHubStatus.iModelDoesNotExist: return new NotFound();
		case IModelHubStatus.FileDoesNotExist: return new NotFound();
		case IModelHubStatus.FileAlreadyExists: return new Conflict();
		case IModelHubStatus.LockDoesNotExist: return new NotFound();
		case IModelHubStatus.LockOwnedByAnotherBriefcase: return new Conflict();
		case IModelHubStatus.CodeStateInvalid: return new StateViolation();
		case IModelHubStatus.CodeReservedByAnotherBriefcase: return new Conflict();
		case IModelHubStatus.CodeDoesNotExist: return new NotFound();
		case IModelHubStatus.EventTypeDoesNotExist: return new NotFound();
		case IModelHubStatus.EventSubscriptionDoesNotExist: return new NotFound();
		case IModelHubStatus.EventSubscriptionAlreadyExists: return new StateViolation();
		case IModelHubStatus.ITwinIdIsNotSpecified: return new ValidationError();
		case IModelHubStatus.FailedToGetITwinPermissions: return new OperationFailed();
		case IModelHubStatus.FailedToGetITwinMembers: return new OperationFailed();
		case IModelHubStatus.ChangeSetAlreadyHasVersion: return new Conflict();
		case IModelHubStatus.VersionAlreadyExists: return new Conflict();
		case IModelHubStatus.JobSchedulingFailed: return new InternalError();
		case IModelHubStatus.ConflictsAggregate: return new Conflict();
		case IModelHubStatus.FailedToGetITwinById: return new OperationFailed();
		case IModelHubStatus.DatabaseOperationFailed: return new OperationFailed();
		case IModelHubStatus.SeedFileInitializationFailed: return new OperationFailed();
		case IModelHubStatus.FailedToGetAssetPermissions: return new OperationFailed();
		case IModelHubStatus.FailedToGetAssetMembers: return new OperationFailed();
		case IModelHubStatus.ITwinDoesNotExist: return new NotFound();
		case IModelHubStatus.LockChunkDoesNotExist: return new NotFound();
		case IModelHubStatus.CheckpointAlreadyExists: return new Conflict();
		case IModelHubStatus.CheckpointDoesNotExist: return new NotFound();
		case IModelHubStatus.UndefinedArgumentError: return new ValidationError();
		case IModelHubStatus.InvalidArgumentError: return new ValidationError();
		case IModelHubStatus.MissingDownloadUrlError: return new ValidationError();
		case IModelHubStatus.NotSupportedInBrowser: return new NotSupported();
		case IModelHubStatus.FileHandlerNotSet: return new NotImplemented();
		case IModelHubStatus.FileNotFound: return new NotFound();
		case IModelHubStatus.InitializationTimeout: return new Timeout();
		case GeoServiceStatus.Success: return new Success();
		case GeoServiceStatus.NoGeoLocation: return new ValidationError();
		case GeoServiceStatus.OutOfUsefulRange: return new ValidationError();
		case GeoServiceStatus.OutOfMathematicalDomain: return new ValidationError();
		case GeoServiceStatus.NoDatumConverter: return new OperationFailed();
		case GeoServiceStatus.VerticalDatumConvertError: return new OperationFailed();
		case GeoServiceStatus.CSMapError: return new InternalError();
		case GeoServiceStatus.Pending: return new Pending();
		case RealityDataStatus.Success: return new Success();
		case RealityDataStatus.InvalidData: return new InvalidData();
		default: return new UnknownError();
	}
}
var StatusCategory, SuccessCategory, ErrorCategory, HTTP, Success, Pending, NoContent, NothingToDo, BadRequest, Forbidden, PermissionsViolation, ReadOnly, NotFound, NotEnabled, NotSupported, ValidationError, Timeout, Conflict, Cancelled, ConstraintViolation, VersioningViolation, Corruption, InvalidData, OperationFailed, StateViolation, Locked, NetworkError, Throttled, FileSystemError, InternalError, UnknownError, NotImplemented, Aborted;
function init_StatusCategory() {
	return (init_StatusCategory = __esmMin((() => {
		init_BentleyError();
		init_RepositoryStatus();
		StatusCategory = class {
			static handlers = /* @__PURE__ */ new Set();
			static for(error) {
				for (const handler of this.handlers) {
					const category = handler(error);
					if (category) return category;
				}
				const errorNumber = error.errorNumber;
				if (typeof errorNumber === "number") return lookupHttpStatusCategory(errorNumber);
				return new UnknownError();
			}
		};
		SuccessCategory = class extends StatusCategory {
			error = false;
		};
		ErrorCategory = class extends StatusCategory {
			error = true;
		};
		(function(HTTP) {
			class OK extends SuccessCategory {
				name = "OK";
				code = 200;
			}
			HTTP.OK = OK;
			class Accepted extends SuccessCategory {
				name = "Accepted";
				code = 202;
			}
			HTTP.Accepted = Accepted;
			class NoContent extends SuccessCategory {
				name = "NoContent";
				code = 204;
			}
			HTTP.NoContent = NoContent;
			class BadRequest extends ErrorCategory {
				name = "BadRequest";
				code = 400;
			}
			HTTP.BadRequest = BadRequest;
			class Unauthorized extends ErrorCategory {
				name = "Unauthorized";
				code = 401;
			}
			HTTP.Unauthorized = Unauthorized;
			class Forbidden extends ErrorCategory {
				name = "Forbidden";
				code = 403;
			}
			HTTP.Forbidden = Forbidden;
			class NotFound extends ErrorCategory {
				name = "NotFound";
				code = 404;
			}
			HTTP.NotFound = NotFound;
			class RequestTimeout extends ErrorCategory {
				name = "RequestTimeout";
				code = 408;
			}
			HTTP.RequestTimeout = RequestTimeout;
			class Conflict extends ErrorCategory {
				name = "Conflict";
				code = 409;
			}
			HTTP.Conflict = Conflict;
			class Gone extends ErrorCategory {
				name = "Gone";
				code = 410;
			}
			HTTP.Gone = Gone;
			class PreconditionFailed extends ErrorCategory {
				name = "PreconditionFailed";
				code = 412;
			}
			HTTP.PreconditionFailed = PreconditionFailed;
			class ExpectationFailed extends ErrorCategory {
				name = "ExpectationFailed";
				code = 417;
			}
			HTTP.ExpectationFailed = ExpectationFailed;
			class MisdirectedRequest extends ErrorCategory {
				name = "MisdirectedRequest";
				code = 421;
			}
			HTTP.MisdirectedRequest = MisdirectedRequest;
			class UnprocessableEntity extends ErrorCategory {
				name = "UnprocessableEntity";
				code = 422;
			}
			HTTP.UnprocessableEntity = UnprocessableEntity;
			class UpgradeRequired extends ErrorCategory {
				name = "UpgradeRequired";
				code = 426;
			}
			HTTP.UpgradeRequired = UpgradeRequired;
			class PreconditionRequired extends ErrorCategory {
				name = "PreconditionRequired";
				code = 428;
			}
			HTTP.PreconditionRequired = PreconditionRequired;
			class TooManyRequests extends ErrorCategory {
				name = "TooManyRequests";
				code = 429;
			}
			HTTP.TooManyRequests = TooManyRequests;
			class InternalServerError extends ErrorCategory {
				name = "InternalServerError";
				code = 500;
			}
			HTTP.InternalServerError = InternalServerError;
			class NotImplemented extends ErrorCategory {
				name = "NotImplemented";
				code = 501;
			}
			HTTP.NotImplemented = NotImplemented;
		})(HTTP || (HTTP = {}));
		Success = class extends HTTP.OK {};
		Pending = class extends HTTP.Accepted {};
		NoContent = class extends HTTP.NoContent {};
		NothingToDo = class extends HTTP.NoContent {};
		BadRequest = class extends HTTP.BadRequest {};
		Forbidden = class extends HTTP.Forbidden {};
		PermissionsViolation = class extends HTTP.Forbidden {};
		ReadOnly = class extends HTTP.Forbidden {};
		NotFound = class extends HTTP.NotFound {};
		NotEnabled = class extends HTTP.UnprocessableEntity {};
		NotSupported = class extends HTTP.UnprocessableEntity {};
		ValidationError = class extends HTTP.BadRequest {};
		Timeout = class extends HTTP.RequestTimeout {};
		Conflict = class extends HTTP.Conflict {};
		Cancelled = class extends HTTP.Gone {};
		ConstraintViolation = class extends HTTP.Forbidden {};
		VersioningViolation = class extends HTTP.Forbidden {};
		Corruption = class extends HTTP.InternalServerError {};
		InvalidData = class extends HTTP.InternalServerError {};
		OperationFailed = class extends HTTP.InternalServerError {};
		StateViolation = class extends HTTP.InternalServerError {};
		Locked = class extends HTTP.Conflict {};
		NetworkError = class extends HTTP.InternalServerError {};
		Throttled = class extends HTTP.TooManyRequests {};
		FileSystemError = class extends HTTP.InternalServerError {};
		InternalError = class extends HTTP.InternalServerError {};
		UnknownError = class extends HTTP.InternalServerError {};
		NotImplemented = class extends HTTP.NotImplemented {};
		Aborted = class extends HTTP.BadRequest {};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/Id.js
/** @packageDocumentation
* @module Ids
*/
function toHex(str) {
	const v = parseInt(str, 16);
	return Number.isNaN(v) ? 0 : v;
}
function isLowerCaseNonZeroHexDigit(str, index) {
	return isLowerCaseHexDigit(str, index, false);
}
function isLowerCaseHexDigit(str, index, allowZero = true) {
	const charCode = str.charCodeAt(index);
	return charCode >= (allowZero ? 48 : 49) && charCode <= 57 || charCode >= 97 && charCode <= 102;
}
function isValidHexString(id, startIndex, len) {
	if (len === 0) return false;
	if (!isLowerCaseNonZeroHexDigit(id, startIndex)) return false;
	for (let i = 1; i < len; i++) if (!isLowerCaseHexDigit(id, startIndex + i)) return false;
	return true;
}
function validateLocalId(num) {
	if (num < 0 || Math.round(num) !== num) throw new Error("Local Id must be a non-negative integer");
}
var Id64, TransientIdSequence, Guid;
function init_Id() {
	return (init_Id = __esmMin((() => {
		(function(Id64) {
			/** Extract the "local" Id portion of an Id64String, contained in the lower 40 bits of the 64-bit value. */
			function getLocalId(id) {
				if (isInvalid(id)) return 0;
				const len = id.length;
				const start = len > 12 ? len - 10 : 2;
				return toHex(id.slice(start));
			}
			Id64.getLocalId = getLocalId;
			/** Extract the briefcase Id portion of an Id64String, contained in the upper 24 bits of the 64-bit value. */
			function getBriefcaseId(id) {
				if (isInvalid(id)) return 0;
				const len = id.length;
				return len <= 12 ? 0 : toHex(id.slice(2, len - 10));
			}
			Id64.getBriefcaseId = getBriefcaseId;
			/** Create an Id64String from its JSON representation.
			* @param prop The JSON representation of an Id.
			* @returns A well-formed Id string.
			* @note if the input is undefined, the result is "0", indicating an invalid Id.
			* @note if the input is not undefined, the result is the same as that of [[Id64.fromString]].
			*/
			function fromJSON(prop) {
				return typeof prop === "string" ? Id64.fromString(prop) : Id64.invalid;
			}
			Id64.fromJSON = fromJSON;
			/** Given a string value, attempt to normalize it into a well-formed Id string.
			* If the input is already a well-formed Id string, it is returned unmodified.
			* Otherwise, the input is trimmed of leading and trailing whitespace, converted to lowercase, and an attempt is made to parse it as a 64-bit hexadecimal integer.
			* If parsing succeeds the normalized result is returned; otherwise the result is "0", indicating an invalid Id.
			*
			* For a description of "well-formed", see [Working with Ids]($docs/learning/common/Id64.md).
			*/
			function fromString(val) {
				if (typeof val !== "string") return Id64.invalid;
				if (Id64.isId64(val)) return val;
				val = val.toLowerCase().trim();
				const len = val.length;
				if (len < 2 || val[0] !== "0" || val[1] !== "x") return Id64.invalid;
				let low = 0;
				let high = 0;
				let start = 2;
				if (len > 12) {
					start = len - 10;
					high = toHex(val.slice(2, start));
				}
				low = toHex(val.slice(start));
				return fromLocalAndBriefcaseIds(low, high);
			}
			Id64.fromString = fromString;
			const _localIdPrefixByLocalIdLength = [
				"0000000000",
				"000000000",
				"00000000",
				"0000000",
				"000000",
				"00000",
				"0000",
				"000",
				"00",
				"0",
				""
			];
			/** Produce an Id string from a local and briefcase Id.
			* @param localId The non-zero local Id as an unsigned 40-bit integer.
			* @param briefcaseId The briefcase Id as an unsigned 24-bit integer.
			* @returns an Id64String containing the hexadecimal string representation of the unsigned 64-bit integer which would result from the
			* operation `localId | (briefcaseId << 40)`, or an invalid Id "0" if the inputs are invalid.
			*/
			function fromLocalAndBriefcaseIds(localId, briefcaseId) {
				if (typeof localId !== "number" || typeof briefcaseId !== "number") return Id64.invalid;
				localId = Math.floor(localId);
				if (0 === localId) return Id64.invalid;
				briefcaseId = Math.floor(briefcaseId);
				const lowStr = localId.toString(16);
				return `0x${briefcaseId === 0 ? lowStr : briefcaseId.toString(16) + (_localIdPrefixByLocalIdLength[lowStr.length] + lowStr)}`;
			}
			Id64.fromLocalAndBriefcaseIds = fromLocalAndBriefcaseIds;
			const scratchCharCodes = [
				48,
				120,
				48,
				48,
				48,
				48,
				48,
				48,
				48,
				48,
				48,
				48,
				48,
				48,
				48,
				48,
				48,
				48
			];
			function uint4ToCharCode(uint4) {
				return uint4 + (uint4 < 10 ? 48 : 87);
			}
			function charCodeToUint4(char) {
				return char - (char >= 87 ? 87 : 48);
			}
			function substringToUint32(id, start, end) {
				let uint32 = 0;
				for (let i = start; i < end; i++) {
					const mask = charCodeToUint4(id.charCodeAt(i)) << (end - i - 1 << 2);
					uint32 = (uint32 | mask) >>> 0;
				}
				return uint32;
			}
			/** Create an Id64String from a pair of unsigned 32-bit integers.
			* @param lowBytes The lower 4 bytes of the Id
			* @param highBytes The upper 4 bytes of the Id
			* @returns an Id64String containing the hexadecimal string representation of the unsigned 64-bit integer which would result from the
			* operation `lowBytes | (highBytes << 32)`.
			* @see [[Id64.fromUint32PairObject]] if you have a [[Id64.Uint32Pair]] object.
			*/
			function fromUint32Pair(lowBytes, highBytes) {
				if (0 === (lowBytes >>> 0) + (highBytes & 255) * 4294967296) return Id64.invalid;
				const buffer = scratchCharCodes;
				let index = 2;
				for (let i = 7; i >= 0; i--) {
					const shift = i << 2;
					const uint4 = (highBytes & 15 << shift) >>> shift;
					if (index > 2 || 0 !== uint4) buffer[index++] = uint4ToCharCode(uint4);
				}
				for (let i = 7; i >= 0; i--) {
					const shift = i << 2;
					const uint4 = (lowBytes & 15 << shift) >>> shift;
					if (index > 2 || 0 !== uint4) buffer[index++] = uint4ToCharCode(uint4);
				}
				if (buffer.length !== index) buffer.length = index;
				return String.fromCharCode(...scratchCharCodes);
			}
			Id64.fromUint32Pair = fromUint32Pair;
			/** Create an Id64String from a [[Id64.Uint32Pair]].
			* @see [[Id64.fromUint32Pair]].
			*/
			function fromUint32PairObject(pair) {
				return fromUint32Pair(pair.lower, pair.upper);
			}
			Id64.fromUint32PairObject = fromUint32PairObject;
			/** Returns true if the inputs represent two halves of a valid 64-bit Id.
			* @see [[Id64.Uint32Pair]].
			*/
			function isValidUint32Pair(lowBytes, highBytes) {
				return 0 !== lowBytes || 0 !== (highBytes & 255);
			}
			Id64.isValidUint32Pair = isValidUint32Pair;
			/** Convert an Id64String to a 64-bit unsigned integer represented as a pair of unsigned 32-bit integers.
			* @param id The well-formed string representation of a 64-bit Id.
			* @param out Used as the return value if supplied; otherwise a new object is returned.
			* @returns An object containing the parsed lower and upper 32-bit integers comprising the 64-bit Id.
			*/
			function getUint32Pair(id, out) {
				if (!out) out = {
					lower: 0,
					upper: 0
				};
				out.lower = getLowerUint32(id);
				out.upper = getUpperUint32(id);
				return out;
			}
			Id64.getUint32Pair = getUint32Pair;
			/** Extract an unsigned 32-bit integer from the lower 4 bytes of an Id64String. */
			function getLowerUint32(id) {
				if (isInvalid(id)) return 0;
				const end = id.length;
				return substringToUint32(id, end > 10 ? end - 8 : 2, end);
			}
			Id64.getLowerUint32 = getLowerUint32;
			/** Extract an unsigned 32-bit integer from the upper 4 bytes of an Id64String. */
			function getUpperUint32(id) {
				const len = id.length;
				if (len <= 10 || isInvalid(id)) return 0;
				return substringToUint32(id, 2, len - 8);
			}
			Id64.getUpperUint32 = getUpperUint32;
			/** Convert an [[Id64Arg]] into an [[Id64Set]].
			*
			* This method can be used by functions that accept an Id64Arg to conveniently process the value(s). For example:
			* ```ts
			*   public addCategories(arg: Id64Arg) { Id64.toIdSet(arg).forEach((id) => this.categories.add(id)); }
			* ```
			*
			* Alternatively, to avoid allocating a new Id64Set, use [[Id64.iterable]].
			*
			* @param arg The Ids to convert to an Id64Set.
			* @param makeCopy If true, and the input is already an Id64Set, returns a deep copy of the input.
			* @returns An Id64Set containing the set of [[Id64String]]s represented by the Id64Arg.
			*/
			function toIdSet(arg, makeCopy = false) {
				if (arg instanceof Set) return makeCopy ? new Set(arg) : arg;
				const ids = /* @__PURE__ */ new Set();
				if (typeof arg === "string") ids.add(arg);
				else if (Array.isArray(arg)) arg.forEach((id) => {
					if (typeof id === "string") ids.add(id);
				});
				return ids;
			}
			Id64.toIdSet = toIdSet;
			/** Obtain iterator over the specified Ids.
			* @see [[Id64.iterable]].
			*/
			function* iterator(ids) {
				if (typeof ids === "string") yield ids;
				else for (const id of ids) yield id;
			}
			Id64.iterator = iterator;
			/** Obtain an iterable over the specified Ids. Example usage:
			* ```ts
			*  const ids = ["0x123", "0xfed"];
			*  for (const id of Id64.iterable(ids))
			*    console.log(id);
			* ```
			*/
			function iterable(ids) {
				return { [Symbol.iterator]: () => iterator(ids) };
			}
			Id64.iterable = iterable;
			/** Return the first [[Id64String]] of an [[Id64Arg]]. */
			function getFirst(arg) {
				return typeof arg === "string" ? arg : (Array.isArray(arg) ? arg[0] : arg.values().next().value) ?? Id64.invalid;
			}
			Id64.getFirst = getFirst;
			/** Return the number of [[Id64String]]s represented by an [[Id64Arg]]. */
			function sizeOf(arg) {
				return typeof arg === "string" ? 1 : Array.isArray(arg) ? arg.length : arg.size;
			}
			Id64.sizeOf = sizeOf;
			/** Returns true if the [[Id64Arg]] contains the specified Id. */
			function has(arg, id) {
				if (typeof arg === "string") return arg === id;
				if (Array.isArray(arg)) return -1 !== arg.indexOf(id);
				return arg.has(id);
			}
			Id64.has = has;
			/** The string representation of an invalid Id. */
			Id64.invalid = "0";
			/** Determine if the supplied id string represents a transient Id.
			* @param id A well-formed Id string.
			* @returns true if the Id represents a transient Id.
			* @note This method assumes the input is a well-formed Id string.
			* @see [[Id64.isTransientId64]]
			* @see [[TransientIdSequence]]
			*/
			function isTransient(id) {
				return 18 === id.length && id.startsWith("0xffffff");
			}
			Id64.isTransient = isTransient;
			/** Determine if the input is a well-formed [[Id64String]] and represents a transient Id.
			* @see [[Id64.isTransient]]
			* @see [[Id64.isId64]]
			* @see [[TransientIdSequence]]
			*/
			function isTransientId64(id) {
				return isValidId64(id) && isTransient(id);
			}
			Id64.isTransientId64 = isTransientId64;
			/** Determine if the input is a well-formed [[Id64String]].
			*
			* For a description of "well-formed", see [Working with Ids]($docs/learning/common/Id64.md).
			* @see [[Id64.isValidId64]]
			*/
			function isId64(id) {
				const len = id.length;
				if (0 === len || 18 < len) return false;
				if ("0" !== id[0]) return false;
				if (1 === len) return true;
				if (2 === len || "x" !== id[1]) return false;
				let localIdStart = 2;
				if (len > 12) {
					localIdStart = len - 10;
					if (!isValidHexString(id, 2, localIdStart - 2)) return false;
					for (let i = localIdStart; i < len; i++) if (48 !== id.charCodeAt(i)) break;
					else localIdStart++;
					if (localIdStart >= len) return false;
				}
				return isValidHexString(id, localIdStart, len - localIdStart);
			}
			Id64.isId64 = isId64;
			/** Returns true if the input is not equal to the representation of an invalid Id.
			* @note This method assumes the input is a well-formed Id string.
			* @see [[Id64.isInvalid]]
			* @see [[Id64.isValidId64]]
			*/
			function isValid(id) {
				return Id64.invalid !== id;
			}
			Id64.isValid = isValid;
			/** Returns true if the input is a well-formed [[Id64String]] representing a valid Id.
			* @see [[Id64.isValid]]
			* @see [[Id64.isId64]]
			*/
			function isValidId64(id) {
				return Id64.invalid !== id && Id64.isId64(id);
			}
			Id64.isValidId64 = isValidId64;
			/** Returns true if the input is a well-formed [[Id64String]] representing an invalid Id.
			* @see [[Id64.isValid]]
			*/
			function isInvalid(id) {
				return Id64.invalid === id;
			}
			Id64.isInvalid = isInvalid;
			/** A specialized replacement for Set<Id64String> optimized for performance-critical code which represents large sets of [[Id64]]s as pairs of
			* 32-bit integers.
			* The internal representation is a Map<number, Set<number>> where the Map key is the upper 4 bytes of the IDs and the Set elements are the lower 4 bytes of the IDs.
			* Because the upper 4 bytes store the 24-bit briefcase ID plus the upper 8 bits of the local ID, there will be a very small distribution of unique Map keys.
			* To further optimize this data type, the following assumptions are made regarding the { lower, upper } inputs, and no validation is performed to confirm them:
			*  - The inputs are unsigned 32-bit integers;
			*  - The inputs represent a valid Id64String (e.g., local ID is not zero).
			* @see [[Id64.Uint32Map]] for a similarly-optimized replacement for Map<Id64String, T>
			* @public
			*/
			class Uint32Set {
				_map = /* @__PURE__ */ new Map();
				/** Construct a new Uint32Set.
				* @param ids If supplied, all of the specified Ids will be added to the new set.
				*/
				constructor(ids) {
					if (void 0 !== ids) this.addIds(ids);
				}
				/** Return true if `this` and `other` contain the same set of Ids. */
				equals(other) {
					if (this === other) return true;
					if (this.size !== other.size) return false;
					for (const [key, thisValue] of this._map) {
						const otherValue = other._map.get(key);
						if (!otherValue || thisValue.size !== otherValue.size) return false;
						for (const value of thisValue) if (!otherValue.has(value)) return false;
					}
					return true;
				}
				/** Remove all contents of this set. */
				clear() {
					this._map.clear();
				}
				/** Add an Id to the set. */
				addId(id) {
					this.add(Id64.getLowerUint32(id), Id64.getUpperUint32(id));
				}
				/** Add any number of Ids to the set. */
				addIds(ids) {
					for (const id of Id64.iterable(ids)) this.addId(id);
				}
				/** Returns true if the set contains the specified Id. */
				hasId(id) {
					return this.has(Id64.getLowerUint32(id), Id64.getUpperUint32(id));
				}
				/** Add an Id to the set. */
				add(low, high) {
					let set = this._map.get(high);
					if (void 0 === set) {
						set = /* @__PURE__ */ new Set();
						this._map.set(high, set);
					}
					set.add(low);
				}
				/** Remove an Id from the set. */
				deleteId(id) {
					this.delete(Id64.getLowerUint32(id), Id64.getUpperUint32(id));
				}
				/** Remove any number of Ids from the set. */
				deleteIds(ids) {
					for (const id of Id64.iterable(ids)) this.deleteId(id);
				}
				/** Remove an Id from the set. */
				delete(low, high) {
					const set = this._map.get(high);
					if (void 0 !== set) {
						set.delete(low);
						if (set.size === 0) this._map.delete(high);
					}
				}
				/** Returns true if the set contains the specified Id. */
				has(low, high) {
					const set = this._map.get(high);
					return void 0 !== set && set.has(low);
				}
				/** Returns true if the set contains the Id specified by `pair`. */
				hasPair(pair) {
					return this.has(pair.lower, pair.upper);
				}
				/** Returns true if the set contains no Ids. */
				get isEmpty() {
					return 0 === this._map.size;
				}
				/** Returns the number of Ids contained in the set. */
				get size() {
					let size = 0;
					for (const entry of this._map) size += entry[1].size;
					return size;
				}
				/** Populates and returns an array of all Ids contained in the set. */
				toId64Array() {
					const ids = [];
					for (const entry of this._map) for (const low of entry[1]) ids.push(Id64.fromUint32Pair(low, entry[0]));
					return ids;
				}
				/** Populates and returns a set of all Ids contained in the set. */
				toId64Set() {
					const ids = /* @__PURE__ */ new Set();
					for (const entry of this._map) for (const low of entry[1]) ids.add(Id64.fromUint32Pair(low, entry[0]));
					return ids;
				}
				/** Execute a function against each Id in this set. */
				forEach(func) {
					for (const entry of this._map) for (const lo of entry[1]) func(lo, entry[0]);
				}
			}
			Id64.Uint32Set = Uint32Set;
			/** A specialized replacement for Map<Id64String, T> optimized for performance-critical code.
			* @see [[Id64.Uint32Set]] for implementation details.
			* @public
			*/
			class Uint32Map {
				_map = /* @__PURE__ */ new Map();
				/** Remove all entries from the map. */
				clear() {
					this._map.clear();
				}
				/** Find an entry in the map by Id. */
				getById(id) {
					return this.get(Id64.getLowerUint32(id), Id64.getUpperUint32(id));
				}
				/** Set an entry in the map by Id. */
				setById(id, value) {
					this.set(Id64.getLowerUint32(id), Id64.getUpperUint32(id), value);
				}
				/** Set an entry in the map by Id components. */
				set(low, high, value) {
					let map = this._map.get(high);
					if (void 0 === map) {
						map = /* @__PURE__ */ new Map();
						this._map.set(high, map);
					}
					map.set(low, value);
				}
				/** Get an entry from the map by Id components. */
				get(low, high) {
					const map = this._map.get(high);
					return void 0 !== map ? map.get(low) : void 0;
				}
				/** Returns true if the map contains no entries. */
				get isEmpty() {
					return 0 === this._map.size;
				}
				/** Returns the number of entries in the map. */
				get size() {
					let size = 0;
					for (const entry of this._map) size += entry[1].size;
					return size;
				}
				/** Execute a function against each entry in this map. */
				forEach(func) {
					for (const outerEntry of this._map) for (const innerEntry of outerEntry[1]) func(innerEntry[0], outerEntry[0], innerEntry[1]);
				}
			}
			Id64.Uint32Map = Uint32Map;
		})(Id64 || (Id64 = {}));
		TransientIdSequence = class TransientIdSequence {
			/** The starting local Id provided to the constructor. The sequence begins at `initialLocalId + 1`. */
			initialLocalId;
			_localId;
			/** Constructor.
			* @param initialLocalId The starting local Id. The local Id of the first [[Id64String]] generated by [[getNext]] will be `initialLocalId + 1`.
			*/
			constructor(initialLocalId = 0) {
				validateLocalId(initialLocalId);
				this.initialLocalId = initialLocalId;
				this._localId = initialLocalId;
			}
			/** The maximum local Id generated by the sequence thus far. It is never less than [[initialLocalId]]. If it is equal to [[initialLocalId]], then the sequence has
			* not yet generated any Ids.
			* Each call to [[getNext]] increments this by 1 and uses it as the local Id of the generated [[Id64String]].
			*/
			get currentLocalId() {
				return this._localId;
			}
			/** Generate and return the next transient Id64String in the sequence. */
			getNext() {
				return Id64.fromLocalAndBriefcaseIds(++this._localId, 16777215);
			}
			/** Preview the transient Id64String that will be returned by the next call to [[getNext]].
			* This is primarily useful for tests.
			*/
			peekNext() {
				return Id64.fromLocalAndBriefcaseIds(this._localId + 1, 16777215);
			}
			/** Convert this sequence to its JSON representation. */
			toJSON() {
				return {
					initialLocalId: this.initialLocalId,
					currentLocalId: this.currentLocalId
				};
			}
			/** Create a sequence from its JSON representation. */
			static fromJSON(props) {
				validateLocalId(props.currentLocalId);
				const sequence = new TransientIdSequence(props.initialLocalId);
				sequence._localId = props.currentLocalId;
				return sequence;
			}
			/** Obtain the JSON representation of a new sequence that diverges from this sequence, with its [[initialLocalId]] set to this sequence's [[currentLocalId]].
			* The two sequences can generate Ids independently. Later, you can [[merge]] the sequences, resolving conflicts where the two sequences generated identical Ids.
			* This is chiefly useful when generating transient Ids on a [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker).
			*/
			fork() {
				return {
					initialLocalId: this.currentLocalId,
					currentLocalId: this.currentLocalId
				};
			}
			/** Integrate the Ids generated by a [[fork]] of this sequence. All of the Ids generated by `source` will be remapped to Ids at the end of this sequence.
			* This is chiefly useful when generating transient Ids on a [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker).
			* @param source The JSON representation of the [[fork]]ed sequence to be merged with this one.
			* @returns a function that permits you to remap the local Ids generated by `source` into the corresponding local Ids assigned by this sequence.
			* @throws Error if `source` is not a fork of this sequence or is malformed (e.g., contains negative and/or non-integer local Ids).
			*/
			merge(source) {
				const { initialLocalId, currentLocalId } = source;
				validateLocalId(initialLocalId);
				validateLocalId(currentLocalId);
				if (initialLocalId > this.currentLocalId) throw new Error("Transient Id sequences do not intersect");
				if (initialLocalId > currentLocalId) throw new Error("Current local Id cannot be less than initial local Id");
				const delta = this.currentLocalId - initialLocalId;
				this._localId += currentLocalId - initialLocalId;
				return (sourceLocalId) => {
					if (sourceLocalId > initialLocalId && sourceLocalId <= currentLocalId) return sourceLocalId + delta;
					return sourceLocalId;
				};
			}
		};
		(function(Guid) {
			const uuidPattern = /* @__PURE__ */ new RegExp("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");
			/** Represents the empty Guid 00000000-0000-0000-0000-000000000000 */
			Guid.empty = "00000000-0000-0000-0000-000000000000";
			/** Determine whether the input string is "guid-like". That is, it follows the 8-4-4-4-12 pattern. This does not enforce
			*  that the string is actually in valid UUID format.
			*/
			function isGuid(value) {
				return uuidPattern.test(value);
			}
			Guid.isGuid = isGuid;
			/** Determine whether the input string is a valid V4 Guid string */
			function isV4Guid(value) {
				return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(value);
			}
			Guid.isV4Guid = isV4Guid;
			/** Create a new V4 Guid value */
			function createValue() {
				return crypto.randomUUID();
			}
			Guid.createValue = createValue;
			/**
			* Normalize a Guid string if possible. Normalization consists of:
			* - Convert all characters to lower case
			* - Trim any leading or trailing whitespace
			* - Convert to the standard Guid format "8-4-4-4-12", repositioning the '-' characters as necessary, presuming there are exactly 32 hexadecimal digits.
			* @param value Input value that represents a Guid
			* @returns Normalized representation of the Guid string. If the normalization fails, return the *original* value unmodified (Note: it is *not* a valid Guid)
			*/
			function normalize(value) {
				const lowerValue = value.toLowerCase().trim();
				if (isGuid(lowerValue)) return lowerValue;
				const noDashValue = lowerValue.replace(/-/g, "");
				const noDashPattern = /^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/;
				if (noDashPattern.test(noDashValue)) return noDashValue.replace(noDashPattern, (_match, p1, p2, p3, p4, p5) => `${p1}-${p2}-${p3}-${p4}-${p5}`);
				return value;
			}
			Guid.normalize = normalize;
		})(Guid || (Guid = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/ByteStream.js
/** @packageDocumentation
* @module Utils
*/
var ByteStream;
function init_ByteStream() {
	return (init_ByteStream = __esmMin((() => {
		init_Id();
		ByteStream = class ByteStream {
			_view;
			_byteOffset;
			_curPos = 0;
			/** Construct a new ByteStream with the read position set to the beginning.
			* @param buffer The underlying buffer from which data is to be extracted.
			* @param subView If defined, specifies the subset of the underlying buffer's data to use.
			* This constructor is subject to two common mistakes:
			*
			* 1. Given `bytes: Uint8Array`, `new ByteStream(bytes)` will compile but at run-time will produce an error asserting that
			* the DataView constructor requires an ArrayBuffer. The correct usage is `new ByteStream(bytes.buffer)`.
			* 2. Given `bytes: Uint8Array`, `new ByteStream(bytes.buffer)` creates a stream for the entire range of bytes represented by the underlying
			* ArrayBuffer. If `bytes` represents only a **sub-range** of the underlying buffer's data, the results will be unexpected unless the optional `subView`
			* argument is supplied, with correct offset and length.
			*
			* For both of the above reasons, this constructor is private, and [[fromUint8Array]] or [[fromArrayBuffer]] should be used to create a ByteStream.
			*/
			constructor(buffer, subView) {
				if (void 0 !== subView) {
					this._view = new DataView(buffer, subView.byteOffset, subView.byteLength);
					this._byteOffset = subView.byteOffset;
				} else {
					this._view = new DataView(buffer);
					this._byteOffset = 0;
				}
			}
			/** Construct a new ByteStream for the range of bytes represented by `bytes`, which may be a subset of the range of bytes
			* represented by the underlying ArrayBuffer. The read position will be set to the beginning of the range of bytes.
			* @param bytes The Uint8Array from which data is to be extracted.
			*/
			static fromUint8Array(bytes) {
				const { byteOffset, byteLength } = bytes;
				return new ByteStream(bytes.buffer, {
					byteOffset,
					byteLength
				});
			}
			/** Construct a new ByteStream with the read position set to the beginning.
			* @param buffer The underlying buffer from which data is to be extracted.
			* @param subView If defined, specifies the subset of the underlying buffer's data to use.
			*/
			static fromArrayBuffer(buffer, subView) {
				return new ByteStream(buffer, subView);
			}
			/** The number of bytes in this stream */
			get length() {
				return this._view.byteLength;
			}
			/** The number of bytes remaining to be read, from [[curPos]] to the end of the stream. */
			get remainingLength() {
				return this.length - this.curPos;
			}
			/** Returns true if the current read position has been advanced past the end of the stream. This generally indicates that an attempt was made to read more data than is available.
			* @see [[isAtTheEnd]]
			*/
			get isPastTheEnd() {
				return this.curPos > this.length;
			}
			/** Returns true if the current read position has advanced precisely to the end of the stream, indicating all of the data has been consumed.
			* @see [[isPastTheEnd]].
			*/
			get isAtTheEnd() {
				return this.curPos === this.length;
			}
			/** The current read position as an index into the stream of bytes. */
			get curPos() {
				return this._curPos;
			}
			set curPos(pos) {
				this._curPos = pos;
				this.isPastTheEnd;
			}
			/** Adds the specified number of bytes to the current read position */
			advance(numBytes) {
				this.curPos = this.curPos + numBytes;
				return !this.isPastTheEnd;
			}
			/** Subtracts the specified number of bytes from the current read position */
			rewind(numBytes) {
				if (this.curPos - numBytes < 0) return false;
				this.curPos = this.curPos - numBytes;
				return true;
			}
			/** Resets the current read position to the beginning of the stream */
			reset() {
				this.curPos = 0;
			}
			/** Read a unsigned 8-bit integer from the current read position and advance by 1 byte. */
			readUint8() {
				return this.read(1, (view) => view.getUint8(this.curPos));
			}
			/** Read an unsigned 16-bit integer from the current read position and advance by 2 bytes. */
			readUint16() {
				return this.read(2, (view) => view.getUint16(this.curPos, true));
			}
			/** Read an unsigned 32-bit integer from the current read position and advance by 4 bytes. */
			readUint32() {
				return this.read(4, (view) => view.getUint32(this.curPos, true));
			}
			/** Read a signed 32-bit integer from the current read position and advance by 4 bytes. */
			readInt32() {
				return this.read(4, (view) => view.getInt32(this.curPos, true));
			}
			/** Read a 32-bit floating point number from the current read position and advance by 4 bytes. */
			readFloat32() {
				return this.read(4, (view) => view.getFloat32(this.curPos, true));
			}
			/** Read a 64-bit floating point number from the current read position and advance by 8 bytes. */
			readFloat64() {
				return this.read(8, (view) => view.getFloat64(this.curPos, true));
			}
			/** Read an unsigned 64-bit integer from the current read position, advance by 8 bytes, and return the 64-bit value as an Id64String. */
			readId64() {
				return Id64.fromUint32Pair(this.readUint32(), this.readUint32());
			}
			/** Read an unsigned 24-bit integer from the current read position and advance by 3 bytes. */
			readUint24() {
				return this.readUint8() | this.readUint8() << 8 | this.readUint8() << 16;
			}
			/** Read the specified number of bytes beginning at the current read position into a Uint8Array and advance by the specified number of byte.
			* @param numBytes The number of bytes to read.
			*/
			nextBytes(numBytes) {
				const bytes = new Uint8Array(this.arrayBuffer, this.curPos + this._byteOffset, numBytes);
				this.advance(numBytes);
				return bytes;
			}
			/** Read the specified number of bytes at the specified offset without changing the read position. */
			readBytes(readPos, numBytes) {
				return new Uint8Array(this.arrayBuffer, readPos + this._byteOffset, numBytes);
			}
			/** Read the specified number of unsigned 32-bit integers from the current read position and advance the read position. */
			nextUint32s(numUint32s) {
				const numBytes = numUint32s * 4;
				const uint32s = new Uint32Array(this.arrayBuffer, this.curPos + this._byteOffset, numUint32s);
				this.advance(numBytes);
				return uint32s;
			}
			/** Returns the underlying array buffer */
			get arrayBuffer() {
				return this._view.buffer;
			}
			read(numBytes, read) {
				const result = read(this._view);
				this.advance(numBytes);
				return result;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/OrderedId64Iterable.js
/** @packageDocumentation
* @module Ids
*/
var OrderedId64Iterable;
function init_OrderedId64Iterable() {
	return (init_OrderedId64Iterable = __esmMin((() => {
		(function(OrderedId64Iterable) {
			/** An ordered comparison of [[Id64String]]s suitable for use with sorting routines like
			* [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) and sorted containers
			* like [[SortedArray]] and [[Dictionary]]. The comparison compares the 64-bit numerical values of the two Ids, returning a negative number if lhs < rhs,
			* a positive number if lhs > rhs, or zero if lhs == rhs.
			* The default string comparison is fine (and more efficient) when numerical ordering is not required; use this instead if you want e.g., "0x100" to be greater than "0xf".
			* @see [[OrderedId64Iterable.sortArray]] for a convenient way to sort an array of Id64Strings.
			*/
			function compare(lhs, rhs) {
				if (lhs.length !== rhs.length) return lhs.length < rhs.length ? -1 : 1;
				if (lhs !== rhs) return lhs < rhs ? -1 : 1;
				return 0;
			}
			OrderedId64Iterable.compare = compare;
			/** Sort an array of [[Id64String]]s **in-place** in ascending order by their 64-bit numerical values.
			* @see [[OrderedId64Iterable.compare]] for the comparison routine used.
			* @returns the input array.
			* @note This function returns its input for consistency with Javascript's
			* [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method.
			* It **does not** create a **new** array.
			*/
			function sortArray(ids) {
				ids.sort((x, y) => compare(x, y));
				return ids;
			}
			OrderedId64Iterable.sortArray = sortArray;
			/** Given two ordered collections of [[Id64String]]s, determine whether they are identical sets. Duplicate Ids are ignored.
			* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
			*/
			function areEqualSets(ids1, ids2) {
				const leftIter = uniqueIterator(ids1);
				const rightIter = uniqueIterator(ids2);
				let leftState = leftIter.next();
				let rightState = rightIter.next();
				while (!leftState.done && !rightState.done) {
					const left = leftState.value;
					const right = rightState.value;
					if (0 !== compare(left, right)) return false;
					leftState = leftIter.next();
					rightState = rightIter.next();
				}
				if (leftState.done && rightState.done) return true;
				return false;
			}
			OrderedId64Iterable.areEqualSets = areEqualSets;
			/** Given an ordered collection of [[Id64String]]s, determine if it contains any Ids.
			* @param ids A well-formed, ordered collection of zero or more valid Ids.
			* @returns true if the input represents an empty set of Ids. The result is unspecified if the input does not meet the criteria for the input type.
			*/
			function isEmptySet(ids) {
				if (typeof ids === "string") return "" === ids;
				return true === ids[Symbol.iterator]().next().done;
			}
			OrderedId64Iterable.isEmptySet = isEmptySet;
			/** Given an ordered collection of [[Id64String]]s possibly containing duplicates, produce an ordered collection containing no duplicates.
			* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
			*/
			function unique(ids) {
				return { [Symbol.iterator]: () => uniqueIterator(ids) };
			}
			OrderedId64Iterable.unique = unique;
			/** Given an ordered collection of [[Id64String]]s possibly containing duplicates, produce an ordered iterator over the distinct Ids, eliminating duplicates.
			* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
			*/
			function* uniqueIterator(ids) {
				const iter = ids[Symbol.iterator]();
				let state = iter.next();
				let prev;
				while (!state.done) {
					const id = state.value;
					state = iter.next();
					if (id !== prev) {
						prev = id;
						yield id;
					}
				}
			}
			OrderedId64Iterable.uniqueIterator = uniqueIterator;
			/** Given two ordered collections of [[Id64String]]s, produce a collection representing their union - i.e., the Ids that are present in either or both collections.
			* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
			*/
			function union(ids1, ids2) {
				return { [Symbol.iterator]: () => unionIterator(ids1, ids2) };
			}
			OrderedId64Iterable.union = union;
			/** Given two ordered collections of [[Id64String]]s, produce an iterator representing their intersection - i.e., the Ids that are present in both collections.
			* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
			*/
			function intersection(ids1, ids2) {
				return { [Symbol.iterator]: () => intersectionIterator(ids1, ids2) };
			}
			OrderedId64Iterable.intersection = intersection;
			/** Given two ordered collections of [[Id64String]]s, produce an iterator representing their difference - i.e., the Ids that are present in `ids1` but not present in `ids2`.
			* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
			*/
			function difference(ids1, ids2) {
				return { [Symbol.iterator]: () => differenceIterator(ids1, ids2) };
			}
			OrderedId64Iterable.difference = difference;
			/** Given two ordered collections of [[Id64String]]s, produce an iterator representing their union - i.e., the Ids that are present in either or both collections.
			* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
			*/
			function* unionIterator(ids1, ids2) {
				const leftIter = ids1[Symbol.iterator]();
				const rightIter = ids2[Symbol.iterator]();
				let leftState = leftIter.next();
				let rightState = rightIter.next();
				let prev;
				while (!leftState.done || !rightState.done) {
					const left = leftState.done ? void 0 : leftState.value;
					const right = rightState.done ? void 0 : rightState.value;
					if (void 0 === left && void 0 === right) break;
					let next;
					if (void 0 === left) {
						next = right;
						rightState = rightIter.next();
					} else if (void 0 === right) {
						next = left;
						leftState = leftIter.next();
					} else {
						const cmp = compare(left, right);
						if (cmp <= 0) {
							next = left;
							leftState = leftIter.next();
							if (0 === cmp) rightState = rightIter.next();
						} else {
							next = right;
							rightState = rightIter.next();
						}
					}
					if (prev === next) continue;
					prev = next;
					yield next;
				}
			}
			OrderedId64Iterable.unionIterator = unionIterator;
			/** Given two ordered collections of [[Id64String]]s, produce an iterator representing their intersection - i.e., the Ids that are present in both collections.
			* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
			*/
			function* intersectionIterator(ids1, ids2) {
				const leftIter = ids1[Symbol.iterator]();
				const rightIter = ids2[Symbol.iterator]();
				let leftState = leftIter.next();
				let rightState = rightIter.next();
				let prev;
				while (!leftState.done && !rightState.done) {
					const left = leftState.value;
					leftState = leftIter.next();
					if (left === prev) continue;
					prev = left;
					let right = rightState.value;
					let cmp = compare(left, right);
					while (cmp > 0) {
						rightState = rightIter.next();
						if (rightState.done) return;
						right = rightState.value;
						cmp = compare(left, right);
					}
					if (0 === cmp) yield left;
				}
			}
			OrderedId64Iterable.intersectionIterator = intersectionIterator;
			/** Given two ordered collections of [[Id64String]]s, produce an iterator representing their difference - i.e., the Ids that are present in `ids1` but not present in `ids2`.
			* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
			*/
			function* differenceIterator(ids1, ids2) {
				const leftIter = ids1[Symbol.iterator]();
				const rightIter = ids2[Symbol.iterator]();
				let leftState = leftIter.next();
				let rightState = rightIter.next();
				let prev;
				while (!leftState.done) {
					const left = leftState.value;
					leftState = leftIter.next();
					if (left === prev) continue;
					else if (rightState.done) {
						yield prev = left;
						continue;
					}
					let right = rightState.value;
					let cmp = compare(left, right);
					while (cmp > 0 && !rightState.done) {
						rightState = rightIter.next();
						if (rightState.done) {
							yield prev = left;
							continue;
						}
						right = rightState.value;
						cmp = compare(left, right);
					}
					if (cmp < 0) yield prev = left;
				}
			}
			OrderedId64Iterable.differenceIterator = differenceIterator;
		})(OrderedId64Iterable || (OrderedId64Iterable = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/SortedArray.js
/** @packageDocumentation
* @module Collections
*/
/**
* A [[CloneFunction]] that, given a value of type T, returns the same value.
* Useful as a default argument for functions that can alternatively accept custom logic for cloning values of object type.
* @param value The value to clone.
* @returns the input value.
* @public
*/
function shallowClone(value) {
	return value;
}
/**
* Given a sorted array, computes the position at which the specified value should be inserted into the array so that the array remains sorted.
* @param value The value whose position is to be computed.
* @param list An array of U already sorted according to the comparison criterion.
* @param compare The function used to compare the value with elements in `list`.
* @returns an object with 'index' corresponding to the computed position and 'equal' set to true if an equivalent element already exists at that index.
* @public
*/
function lowerBound(value, list, compare) {
	return lowerBoundOfEquivalent(list, (element) => compare(value, element));
}
function lowerBoundOfEquivalent(list, criterion) {
	let low = 0;
	let high = list.length;
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		const comp = criterion(list[mid]);
		if (0 === comp) return {
			index: mid,
			equal: true
		};
		else if (comp < 0) high = mid;
		else low = mid + 1;
	}
	return {
		index: low,
		equal: false
	};
}
var DuplicatePolicy, ReadonlySortedArray, SortedArray;
function init_SortedArray() {
	return (init_SortedArray = __esmMin((() => {
		(function(DuplicatePolicy) {
			/** The array allows duplicate values to be inserted. All duplicate values will be adjacent in the array, but the ordering between duplicate values is unspecified.
			* @note In the presence of duplicate values, functions like [[SortedArray.indexOf]] and [[SortedArray.findEqual]] will return one of the values - exactly which one is unspecified.
			*/
			DuplicatePolicy[DuplicatePolicy["Allow"] = 0] = "Allow";
			/** Duplicate values are forbidden - when attempting to insert a value equivalent to one already present, the already-present value is retained. */
			DuplicatePolicy[DuplicatePolicy["Retain"] = 1] = "Retain";
			/** Duplicate values are forbidden - when attempting to insert a value equivalent to one already present, the already-present value is replaced by the new value.
			* This can be useful when the value type carries additional data that is not evaluated by the comparison function.
			*/
			DuplicatePolicy[DuplicatePolicy["Replace"] = 2] = "Replace";
		})(DuplicatePolicy || (DuplicatePolicy = {}));
		ReadonlySortedArray = class ReadonlySortedArray {
			_array = [];
			_compare;
			_clone;
			_duplicatePolicy;
			/**
			* Construct a new ReadonlySortedArray<T>.
			* @param compare The function used to compare elements within the array.
			* @param duplicatePolicy Policy for handling attempts to insert a value when an equivalent value already exists. If the input is a boolean, then `true` indicates [[DuplicatePolicy.Allow]], and `false` indicates [[DuplicatePolicy.Retain]].
			* @param clone The function invoked to clone a new element for insertion into the array. The default implementation simply returns its input.
			*/
			constructor(compare, duplicatePolicy = false, clone = shallowClone) {
				this._compare = compare;
				this._clone = clone;
				if (typeof duplicatePolicy === "boolean") duplicatePolicy = duplicatePolicy ? DuplicatePolicy.Allow : DuplicatePolicy.Retain;
				this._duplicatePolicy = duplicatePolicy;
			}
			/** The number of elements in the array */
			get length() {
				return this._array.length;
			}
			/** Returns true if the array contains no elements. */
			get isEmpty() {
				return 0 === this.length;
			}
			/** Returns an iterator over the contents of the array in sorted order, suitable for use in `for-of` loops. */
			[Symbol.iterator]() {
				return this._array[Symbol.iterator]();
			}
			/**
			* Looks up the index of an element comparing equal to the specified value using binary search.
			* @param value The value to search for
			* @returns the index of the first equivalent element found in the array, or -1 if no such element exists.
			*/
			indexOf(value) {
				const bound = this.lowerBound(value);
				return bound.equal ? bound.index : -1;
			}
			/**
			* Returns true if this array contains at least one value comparing equal to the specified value.
			* @param value The value to search for
			* @returns true if an equivalent element exists in the array.
			*/
			contains(value) {
				return -1 !== this.indexOf(value);
			}
			/**
			* Looks up an element comparing equal to the specified value using binary search.
			* @param value The value to search for
			* @returns the first equivalent element found in the array, or undefined if no such element exists.
			*/
			findEqual(value) {
				const index = this.indexOf(value);
				return -1 !== index ? this._array[index] : void 0;
			}
			/** Find an element that compares as equivalent based on some criterion. If multiple elements are equivalent, the specific one returned is unspecified.
			* As an example, consider a `SortedArray<ModelState>` which uses `ModelState.id` as its ordering criterion. To find a model by its Id,
			* use `sortedArray.findEquivalent((element) => compareStrings(element.id, modelId))` where `modelId` is an [[Id64String]].
			* @param criterion A function accepting an element and returning 0 if it compares as equivalent, a negative number if it compares as "less-than", or a positive value if it compares as "greater-than".
			* @returns The first element found that meets the criterion, or `undefined` if no elements meet the criterion.
			* @see [[indexOfEquivalent]].
			* @public
			*/
			findEquivalent(criterion) {
				const index = this.indexOfEquivalent(criterion);
				return -1 !== index ? this._array[index] : void 0;
			}
			/** Find the index of an element that compares as equivalent based on some criterion. If multiple elements are equivalent, the specific one returned is unspecified.
			* As an example, consider a `SortedArray<ModelState>` which uses `ModelState.id` as its ordering criterion. To find the index of a model by its Id,
			* use `sortedArray.indexOfEquivalent((element) => compareStrings(element.id, modelId))` where `modelId` is an [[Id64String]].
			* @param criterion A function accepting an element and returning 0 if it compares as equivalent, a negative number if the element compares as "less-than", or a positive value if the element compares as "greater-than".
			* @returns The index of the first element found that meets the criterion, or -1 if no elements meet the criterion.
			* @public
			*/
			indexOfEquivalent(criterion) {
				const bound = lowerBoundOfEquivalent(this._array, (elem) => 0 - criterion(elem));
				return bound.equal ? bound.index : -1;
			}
			/**
			* Looks up an element by its index in the array.
			* @param index The array index
			* @returns the element corresponding to that position in the array, or undefined if the supplied index exceeds the length of the array.
			*/
			get(index) {
				return index < this.length ? this._array[index] : void 0;
			}
			/** Apply a function to each element in the array, in sorted order.
			* @param func The function to be applied.
			*/
			forEach(func) {
				for (let i = 0; i < this.length; i++) func(this._array[i]);
			}
			/** The equivalent of [Array.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice). */
			slice(start, end) {
				const slice = new ReadonlySortedArray(this._compare, this._duplicatePolicy, this._clone);
				slice._array = this._array.slice(start, end);
				return slice;
			}
			/**
			* Computes the position at which the specified value should be inserted to maintain sorted order.
			* @param value The value whose position is to be computed.
			* @returns an object with 'index' corresponding to the computed position and 'equal' set to true if an equivalent element already exists at that index.
			*/
			lowerBound(value) {
				return lowerBound(value, this._array, this._compare);
			}
			/** Clears the contents of the sorted array. */
			_clear() {
				this._array.length = 0;
			}
			/** Extracts the sorted array as a T[] and empties the contents of this ReadonlySortedArray.
			* @returns the contents of this ReadonlySortedArray as a T[].
			*/
			_extractArray() {
				const result = this._array;
				this._array = [];
				return result;
			}
			/**
			* Attempts to insert a new value into the array at a position determined by the ordering.
			* The behavior differs based on the array's [[DuplicatePolicy]]:
			* If duplicates are **not** permitted, then:
			*  - If an equivalent element already exists in the array:
			*    - [[DuplicatePolicy.Retain]]: nothing will be inserted and the index of the existing element will be returned.
			*    - [[DuplicatePolicy.Replace]]: the input value will overwrite the existing element at the same index and that index will be returned.
			*  - Otherwise, the element is inserted and its index is returned.
			* If duplicates **are** permitted, then:
			*  - The element will be inserted in a correct position based on the sorting criterion;
			*  - The position of the element relative to other elements comparing as equal to it is unspecified; and
			*  - The actual index of the newly-inserted element is returned.
			* If the element is to be inserted, then the supplied value will be passed to the clone function supplied to the constructor and the result will be inserted into the array.
			* @param value The value to insert
			* @param onInsert The optional callback method to call if insertion occurs with the inserted value
			* @returns the index in the array of the newly-inserted value, or, if duplicates are not permitted and an equivalent value already exists, the index of the equivalent value.
			*/
			_insert(value, onInsert) {
				const bound = this.lowerBound(value);
				if (bound.equal) switch (this._duplicatePolicy) {
					case DuplicatePolicy.Retain: return bound.index;
					case DuplicatePolicy.Replace:
						this._array[bound.index] = this._clone(value);
						if (onInsert) onInsert(value);
						return bound.index;
				}
				this._array.splice(bound.index, 0, this._clone(value));
				if (void 0 !== onInsert) onInsert(value);
				return bound.index;
			}
			/**
			* Removes the first occurrence of a value comparing equal to the specified value from the array.
			* @param value The value of the element to delete
			* @returns the index of the deleted value, or -1 if no such element exists.
			*/
			_remove(value) {
				const bound = this.lowerBound(value);
				if (bound.equal) {
					this._array.splice(bound.index, 1);
					return bound.index;
				} else return -1;
			}
		};
		SortedArray = class SortedArray extends ReadonlySortedArray {
			/**
			* Construct a new SortedArray<T>.
			* @param compare The function used to compare elements within the array.
			* @param duplicatePolicy Policy for handling attempts to insert a value when an equivalent value already exists. If the input is a boolean, then `true` indicates [[DuplicatePolicy.Allow]], and `false` indicates [[DuplicatePolicy.Retain]].
			* @param clone The function invoked to clone a new element for insertion into the array. The default implementation simply returns its input.
			*/
			constructor(compare, duplicatePolicy = false, clone = shallowClone) {
				super(compare, duplicatePolicy, clone);
			}
			/** Clears the contents of the sorted array. */
			clear() {
				this._clear();
			}
			/** Extracts the sorted array as a T[] and empties the contents of this SortedArray.
			* @returns the contents of this SortedArray as a T[].
			*/
			extractArray() {
				return this._extractArray();
			}
			/**
			* Attempts to insert a new value into the array at a position determined by the ordering.
			* The behavior differs based on whether or not duplicate elements are permitted.
			* If duplicates are **not** permitted, then:
			*  - If an equivalent element already exists in the array, nothing will be inserted and the index of the existing element will be returned.
			*  - Otherwise, the element is inserted and its index is returned.
			* If duplicates **are** permitted, then:
			*  - The element will be inserted in a correct position based on the sorting criterion;
			*  - The position of the element relative to other elements comparing as equal to it is unspecified; and
			*  - The actual index of the newly-inserted element is returned.
			* If the element is to be inserted, then the supplied value will be passed to the clone function supplied to the constructor and the result will be inserted into the array.
			* @param value The value to insert
			* @param onInsert The optional callback method to call if insertion occurs with the inserted value
			* @returns the index in the array of the newly-inserted value, or, if duplicates are not permitted and an equivalent value already exists, the index of the equivalent value.
			*/
			insert(value, onInsert) {
				return this._insert(value, onInsert);
			}
			/**
			* Removes the first occurrence of a value comparing equal to the specified value from the array.
			* @param value The value of the element to delete
			* @returns the index of the deleted value, or -1 if no such element exists.
			*/
			remove(value) {
				return this._remove(value);
			}
			/** The equivalent of [Array.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice). */
			slice(start, end) {
				const slice = new SortedArray(this._compare, this._duplicatePolicy, this._clone);
				slice._array = this._array.slice(start, end);
				return slice;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/CompressedId64Set.js
/** @packageDocumentation
* @module Ids
*/
var CompressedId64Set, OrderedId64Array, MutableCompressedId64Set;
function init_CompressedId64Set() {
	return (init_CompressedId64Set = __esmMin((() => {
		init_Id();
		init_OrderedId64Iterable();
		init_SortedArray();
		(function(CompressedId64Set) {
			function isHexDigit(ch) {
				return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70;
			}
			function compactRange(increment, length) {
				const inc = `+${increment.toString()}`;
				if (length <= 1) return inc;
				return `${inc}*${length.toString(16).toUpperCase()}`;
			}
			/** Given a set of [[Id64String]]s, produce a compact string representation. Useful when serializing potentially large sets of Ids.
			* @note Invalid Ids are ignored.
			* @see [[CompressedId64Set.sortAndCompress]] to compress any unordered collection of Ids.
			* @see [[CompressedId64Set.compressArray]] to perform the same operation on an [[Id64Array]].
			* @see [[CompressedId64Set.decompressSet]] to perform the inverse operation.
			*/
			function compressSet(ids) {
				return sortAndCompress(ids);
			}
			CompressedId64Set.compressSet = compressSet;
			/** Create a sorted array from `ids`, then return a compact string representation of those Ids.
			* @see [[CompressedId64Set.compressIds]] if `ids` is known to already be sorted.
			*/
			function sortAndCompress(ids) {
				const arr = typeof ids === "string" ? [ids] : Array.from(ids);
				OrderedId64Iterable.sortArray(arr);
				return compressArray(arr);
			}
			CompressedId64Set.sortAndCompress = sortAndCompress;
			/** Give a **numerically-ordered** array of [[Id64String]]s, produce a compact string representation. Useful when serializing potentially large sets of Ids.
			* Duplicate Ids are included only once in the string representation.
			* @throws Error if two consecutive Ids `x` and `y` exist such that the numerical value of `x` is greater than that of `y` - i.e., the array is not properly sorted.
			* @note The array must be sorted according to the 64-bit numerical value of each Id.
			* @note Invalid Ids are ignored.
			* @see [[CompressedId64Set.decompressArray]] to perform the inverse operation.
			* @see [[OrderedId64Iterable.sortArray]] to ensure the Ids are properly sorted.
			* @see [[CompressedId64Set.sortAndCompress]] to compress any unordered collection of Ids.
			*/
			function compressArray(ids) {
				return compressIds(ids);
			}
			CompressedId64Set.compressArray = compressArray;
			/** Give a **numerically-ordered** collection of [[Id64String]]s, produce a compact string representation. Useful when serializing potentially large sets of Ids.
			* Duplicate Ids are included only once in the string representation.
			* @throws Error if two consecutive Ids `x` and `y` exist such that the numerical value of `x` is greater than that of `y` - i.e., the collection is not properly sorted.
			* @note The collection must be sorted according to the 64-bit numerical value of each Id.
			* @note Invalid Ids are ignored.
			* @see [[CompressedId64Set.iterable]] to perform the inverse operation.
			* @see [[OrderedId64Iterable.sortArray]] or [[OrderedId64Iterable.compare]] to ensure the Ids are properly sorted.
			* @see [[CompressedId64Set.sortAndCompress]] to compress any unordered collection of Ids.
			*/
			function compressIds(ids) {
				if ("string" === typeof ids) return ids;
				let str = "";
				const prevId = new Uint64();
				const rangeIncrement = new Uint64();
				let rangeLen = 0;
				const curId = new Uint64();
				const curIncrement = new Uint64();
				for (const id of ids) {
					if (!Id64.isValidId64(id)) continue;
					curId.setFromId(id);
					curIncrement.setFromDifference(curId, prevId);
					const cmp = prevId.compare(curId);
					if (0 === cmp) continue;
					else if (cmp > 0) throw new Error("CompressedId64Set.compressArray requires a sorted array as input");
					prevId.copyFrom(curId);
					if (0 === rangeLen) {
						rangeIncrement.copyFrom(curIncrement);
						rangeLen = 1;
					} else if (curIncrement.equals(rangeIncrement)) ++rangeLen;
					else {
						str += compactRange(rangeIncrement, rangeLen);
						rangeIncrement.copyFrom(curIncrement);
						rangeLen = 1;
					}
				}
				if (0 < rangeLen) str += compactRange(rangeIncrement, rangeLen);
				return str;
			}
			CompressedId64Set.compressIds = compressIds;
			/** This exists strictly for the purposes of compressed sets of 64-bit Ids, to avoid the overhead of BigInt for handling 64-bit integers. */
			class Uint64 {
				lower;
				upper;
				static _base = 4294967296;
				static assertUint32(num) {
					Uint64._base;
				}
				assertConstraints() {
					Uint64.assertUint32(this.lower);
					Uint64.assertUint32(this.upper);
				}
				constructor(lower = 0, upper = 0) {
					this.lower = lower;
					this.upper = upper;
					this.assertConstraints();
				}
				compare(rhs) {
					const diff = this.upper - rhs.upper;
					return 0 === diff ? this.lower - rhs.lower : diff;
				}
				equals(rhs) {
					return 0 === this.compare(rhs);
				}
				isLessThan(rhs) {
					return this.compare(rhs) < 0;
				}
				isGreaterThan(rhs) {
					return this.compare(rhs) > 0;
				}
				get isZero() {
					return 0 === this.lower && 0 === this.upper;
				}
				setFromDifference(lhs, rhs) {
					rhs.isGreaterThan(lhs);
					this.lower = lhs.lower - rhs.lower;
					this.upper = lhs.upper - rhs.upper;
					if (this.lower < 0) {
						this.lower += Uint64._base;
						this.upper -= 1;
					}
				}
				add(rhs) {
					let lower = rhs.lower;
					let upper = rhs.upper;
					if (lower + this.lower >= Uint64._base) {
						lower -= Uint64._base;
						upper += 1;
					}
					this.lower += lower;
					this.upper += upper;
					this.assertConstraints();
				}
				setFromId(id) {
					Id64.getUint32Pair(id, this);
				}
				copyFrom(other) {
					this.lower = other.lower;
					this.upper = other.upper;
				}
				toString() {
					if (0 === this.upper) return this.lower.toString(16).toUpperCase();
					const upper = this.upper.toString(16);
					const lower = this.lower.toString(16).padStart(8, "0");
					lower.length;
					return `${upper}${lower}`.toUpperCase();
				}
				toId64String() {
					return Id64.fromUint32Pair(this.lower, this.upper);
				}
			}
			/** Supplies an iterator over the [[Id64String]]s in a [[CompressedId64Set]].
			* The Ids are iterated in ascending order based on their unsigned 64-bit integer values.
			*/
			function* iterator(ids) {
				if (0 === ids.length) return;
				if ("+" !== ids[0]) throw new Error("Invalid CompressedId64Set");
				let curIndex = 1;
				const curId = new Uint64();
				function parseUint32() {
					let value = 0;
					let nChars = 0;
					while (curIndex < ids.length && nChars < 8) {
						++nChars;
						const ch = ids.charCodeAt(curIndex);
						if (!isHexDigit(ch)) break;
						value <<= 4;
						value |= ch >= 65 ? ch - 65 + 10 : ch - 48;
						value = value >>> 0;
						++curIndex;
					}
					return value;
				}
				function parseUint64(uint64) {
					let lower = 0;
					let upper = 0;
					const startIndex = curIndex;
					const first = parseUint32();
					if (8 === curIndex - startIndex && curIndex + 1 < ids.length && isHexDigit(ids.charCodeAt(curIndex + 1))) {
						const secondIndex = curIndex;
						const second = parseUint32();
						const nSecondDigits = curIndex - secondIndex;
						const nDigitsToTransfer = 8 - nSecondDigits;
						upper = first >>> 4 * nDigitsToTransfer;
						lower = (second | first - (upper << 4 * nDigitsToTransfer >>> 0) << 4 * nSecondDigits >>> 0) >>> 0;
					} else lower = first;
					uint64.lower = lower;
					uint64.upper = upper;
				}
				const increment = new Uint64();
				while (curIndex < ids.length) {
					let multiplier = 1;
					parseUint64(increment);
					if (increment.isZero) throw new Error("Invalid CompressedId64Set");
					if (curIndex < ids.length) switch (ids[curIndex++]) {
						case "*":
							multiplier = parseUint32();
							if (0 === multiplier) throw new Error("Invalid CompressedId64Set");
							if (curIndex !== ids.length && ids[curIndex++] !== "+") return;
							break;
						case "+": break;
						default: throw new Error("Invalid CompressedId64Set");
					}
					for (let i = 0; i < multiplier; i++) {
						curId.add(increment);
						yield curId.toId64String();
					}
				}
			}
			CompressedId64Set.iterator = iterator;
			/** Supplies an iterable over the [[Id64String]]s in a [[CompressedId64Set]].
			* The Ids are iterated in ascending order based on their unsigned 64-bit integer values.
			*/
			function iterable(ids) {
				return { [Symbol.iterator]: () => iterator(ids) };
			}
			CompressedId64Set.iterable = iterable;
			/** Decompress the compact string representation of an [[Id64Set]] into an [[Id64Set]].
			* @param compressedIds The compact string representation.
			* @param out If supplied, the Ids will be inserted into this set rather than allocating and returning a new set.
			* @returns The set containing the decompressed Ids.
			* @throws Error if `compressedIds` is not a well-formed [[CompressedId64Set]].
			* @see [[CompressedId64Set.compressSet]] to perform the inverse operation.
			* @see [[CompressedId64Set.decompressArray]] to decompress as an [[Id64Array]] instead.
			* @see [[CompressedId64Set.iterable]] to efficiently iterate the Ids.
			*/
			function decompressSet(compressedIds, out) {
				const set = out ?? /* @__PURE__ */ new Set();
				for (const id of iterable(compressedIds)) set.add(id);
				return set;
			}
			CompressedId64Set.decompressSet = decompressSet;
			/** Decompress the compact string representation of an [[Id64Set]] into an [[Id64Array]].
			* @param compressedIds The compact string representation.
			* @param out If supplied, the Ids will be appended to this array rather than allocating and returning a new array.
			* @returns The array containing the decompressed Ids.
			* @throws Error if `compressedIds` is not a well-formed [[CompressedId64Set]].
			* @note The Ids are decompressed and appended to the array in ascending order based on their 64-bit numerical values.
			* @see [[CompressedId64Set.compressArray]] to perform the inverse operation.
			* @see [[CompressedId64Set.decompressSet]] to decompress as an [[Id64Set]] instead.
			* @see [[CompressedId64Set.iterable]] to efficiently iterate the Ids.
			*/
			function decompressArray(compressedIds, out) {
				const arr = out ?? [];
				for (const id of iterable(compressedIds)) arr.push(id);
				return arr;
			}
			CompressedId64Set.decompressArray = decompressArray;
		})(CompressedId64Set || (CompressedId64Set = {}));
		OrderedId64Array = class extends SortedArray {
			/** Construct a new, empty array. */
			constructor() {
				super((lhs, rhs) => OrderedId64Iterable.compare(lhs, rhs));
			}
			/** An iterable that iterates over the Ids in sorted order. */
			get ids() {
				return this._array;
			}
			/** The underlying array of Ids. */
			get array() {
				return this._array;
			}
		};
		MutableCompressedId64Set = class MutableCompressedId64Set {
			_ids;
			_inserted = new OrderedId64Array();
			_deleted = new OrderedId64Array();
			/** Construct a new set, optionally initialized to contain the Ids represented by `ids`. */
			constructor(ids) {
				this._ids = ids ?? "";
			}
			/** Obtain the compact string representation of the contents of this set. If any insertions or removals are pending, they will be applied and the string recomputed. */
			get ids() {
				this.updateIds();
				return this._ids;
			}
			/** Add the specified Id to the set.
			* @throws Error if `id` is not a valid [[Id64String]].
			*/
			add(id) {
				if (!Id64.isValidId64(id)) throw new Error("MutableCompressedId64Set.add: invalid Id");
				this._deleted.remove(id);
				this._inserted.insert(id);
			}
			/** Remove the specified Id from the set.
			* @throws Error if `id` is not a valid [[Id64String]].
			*/
			delete(id) {
				if (!Id64.isValidId64(id)) throw new Error("MutableCompressedId64Set.delete: invalid Id");
				this._inserted.remove(id);
				this._deleted.insert(id);
			}
			/** Remove all Ids from the set. */
			clear() {
				this._ids = "";
				this._inserted.clear();
				this._deleted.clear();
			}
			/** Remove all Ids from the set, then add the specified Ids. */
			reset(ids) {
				this.clear();
				this._ids = ids ?? "";
			}
			/** Obtain an iterator over the Ids in this set. The Ids are returned in ascending order based on their unsigned 64-bit integer values. */
			[Symbol.iterator]() {
				return CompressedId64Set.iterator(this.ids);
			}
			/** Compute a compact string representation of the union of this and another set of Ids - i.e., those Ids present in either this and/or the other set. */
			computeUnion(ids) {
				if (this.isEmpty) return CompressedId64Set.compressIds(ids);
				else if (OrderedId64Iterable.isEmptySet(ids) || this.equals(ids)) return this.ids;
				return CompressedId64Set.compressIds(OrderedId64Iterable.union(this, ids));
			}
			/** Compute a compact string representation of the intersection of this and another set of Ids - i.e., those Ids present in both this and the other set. */
			computeIntersection(ids) {
				if (this.equals(ids)) return this.ids;
				else if (this.isEmpty || OrderedId64Iterable.isEmptySet(ids)) return "";
				return CompressedId64Set.compressIds(OrderedId64Iterable.intersection(this, ids));
			}
			/** Compute a compact string representation of the difference between this and another set - i.e., those Ids present in this but not in the other set. */
			computeDifference(ids) {
				if (this.isEmpty || this.equals(ids)) return "";
				return CompressedId64Set.compressIds(OrderedId64Iterable.difference(this, ids));
			}
			/** Return true if this set contains no Ids. */
			get isEmpty() {
				return OrderedId64Iterable.isEmptySet(this.ids);
			}
			/** Return true if the set of Ids represented by `other` is identical to those in this set.
			* @note This considers only the **distinct** Ids in `other` - duplicates are ignored.
			*/
			equals(other) {
				if (other instanceof MutableCompressedId64Set) {
					if (other === this) return true;
					if (typeof other !== "string") other = other.ids;
				}
				if (typeof other === "string") return other === this.ids;
				this.updateIds();
				return OrderedId64Iterable.areEqualSets(this, other);
			}
			get _isDirty() {
				return !this._inserted.isEmpty || !this._deleted.isEmpty;
			}
			updateIds() {
				if (!this._isDirty) return;
				const difference = OrderedId64Iterable.difference(CompressedId64Set.iterable(this._ids), this._deleted.ids);
				const union = { [Symbol.iterator]: () => OrderedId64Iterable.unionIterator(difference, this._inserted.ids) };
				this._ids = CompressedId64Set.compressIds(union);
				this._inserted.clear();
				this._deleted.clear();
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/Dictionary.js
var DictionaryIterator, Dictionary;
function init_Dictionary() {
	return (init_Dictionary = __esmMin((() => {
		init_SortedArray();
		DictionaryIterator = class {
			_keys;
			_values;
			_curIndex = -1;
			constructor(keys, values) {
				this._keys = keys;
				this._values = values;
			}
			next() {
				if (++this._curIndex >= this._keys.length) return { done: true };
				else return {
					value: {
						key: this._keys[this._curIndex],
						value: this._values[this._curIndex]
					},
					done: false
				};
			}
		};
		Dictionary = class {
			_keys = [];
			_compareKeys;
			_cloneKey;
			_values = [];
			_cloneValue;
			/**
			* Construct a new Dictionary<K, V>.
			* @param compareKeys The function used to compare keys within the dictionary.
			* @param cloneKey The function invoked to clone a key for insertion into the dictionary. The default implementation simply returns its input.
			* @param cloneValue The function invoked to clone a value for insertion into the dictionary. The default implementation simply returns its input.
			*/
			constructor(compareKeys, cloneKey = shallowClone, cloneValue = shallowClone) {
				this._compareKeys = compareKeys;
				this._cloneKey = cloneKey;
				this._cloneValue = cloneValue;
			}
			/** The number of entries in the dictionary. */
			get size() {
				return this._keys.length;
			}
			/** Returns an iterator over the key-value pairs in the Dictionary suitable for use in `for-of` loops. Entries are returned in sorted order by key. */
			[Symbol.iterator]() {
				return new DictionaryIterator(this._keys, this._values);
			}
			/** Provides iteration over the keys in this Dictionary, in sorted order. */
			keys() {
				function* iterator(dict) {
					for (const entry of dict) yield entry.key;
				}
				return { [Symbol.iterator]: () => iterator(this) };
			}
			/** Provides iteration over the values in this Dictionary, in sorted order by the corresponding keys. */
			values() {
				function* iterator(dict) {
					for (const entry of dict) yield entry.value;
				}
				return { [Symbol.iterator]: () => iterator(this) };
			}
			/** Removes all entries from this dictionary */
			clear() {
				this._keys = [];
				this._values = [];
			}
			/**
			* Looks up a value by its key.
			* @param key The key to search for
			* @returns the value associated with the key, or undefined if the key is not present in the dictionary.
			*/
			get(key) {
				const bound = this.lowerBound(key);
				return bound.equal ? this._values[bound.index] : void 0;
			}
			/**
			* Determines if an entry exists for the specified key
			* @param key The key to search for
			* @returns true if an entry exists in this dictionary corresponding to the specified key.
			*/
			has(key) {
				return this.lowerBound(key).equal;
			}
			/**
			* Deletes a value using its key.
			* @param key The key to delete
			* @returns true if the key was found and deleted.
			*/
			delete(key) {
				const bound = this.lowerBound(key);
				if (bound.equal) {
					this._values.splice(bound.index, 1);
					this._keys.splice(bound.index, 1);
					return true;
				} else return false;
			}
			/**
			* Attempts to insert a new entry into the dictionary. If an entry with an equivalent key exists, the dictionary is unmodified.
			* If the new entry is in fact inserted, both the key and value will be cloned using the functions supplied to the dictionary's constructor.
			* @param key The key to associate with the value
			* @param value The value to associate with the key
			* @returns true if the new entry was inserted, false if an entry with an equivalent key already exists.
			*/
			insert(key, value) {
				return this.findOrInsert(key, value).inserted;
			}
			/** Obtains the value associated with the specified key, or inserts it if the specified key does not yet exist.
			* @param key The key to search for.
			* @param value The value to associate with `key` if `key` does not yet exist in the dictionary.
			* @returns The found or inserted value and a flag indicating whether the new value was inserted.
			*/
			findOrInsert(key, value) {
				const bound = this.lowerBound(key);
				if (bound.equal) return {
					value: this._values[bound.index],
					inserted: false
				};
				value = this._cloneValue(value);
				this._keys.splice(bound.index, 0, this._cloneKey(key));
				this._values.splice(bound.index, 0, this._cloneValue(value));
				return {
					value,
					inserted: true
				};
			}
			/**
			* Sets the value associated with the specified key in the dictionary.
			* If no such key already exists, this is equivalent to insert(key, value); otherwise, the existing value associated with the key is replaced.
			* In either case, the value will be cloned using the function supplied to the dictionary's constructor.
			*/
			set(key, value) {
				value = this._cloneValue(value);
				const bound = this.lowerBound(key);
				if (bound.equal) this._values[bound.index] = value;
				else {
					this._keys.splice(bound.index, 0, this._cloneKey(key));
					this._values.splice(bound.index, 0, value);
				}
			}
			/**
			* Extracts the contents of this dictionary as an array of { key, value } pairs, and empties this dictionary.
			* @returns An array of { key, value } pairs sorted by key.
			*/
			extractPairs() {
				const pairs = [];
				for (let i = 0; i < this.size; i++) pairs.push({
					key: this._keys[i],
					value: this._values[i]
				});
				this.clear();
				return pairs;
			}
			/**
			* Extracts the contents of this dictionary as a pair of { keys, values } arrays, and empties this dictionary.
			* The array of keys is sorted according to the comparison criterion.
			* The position of each value in the array of values corresponds the the position of the corresponding key in the array of keys.
			* @returns a pair of { keys, values } arrays in which key[i] corresponds to value[i] in this dictionary and the keys are in sorted order.
			*/
			extractArrays() {
				const result = {
					keys: this._keys,
					values: this._values
				};
				this.clear();
				return result;
			}
			/** Apply a function to each (key, value) pair in the dictionary, in sorted order.
			* @param func The function to be applied.
			*/
			forEach(func) {
				for (let i = 0; i < this.size; i++) func(this._keys[i], this._values[i]);
			}
			/**
			* Computes the position at which the specified key should be inserted to maintain sorted order.
			* @param key The key whose position is to be computed.
			* @returns an object with 'index' corresponding to the computed position and 'equal' set to true if an equivalent key already exists at that index.
			*/
			lowerBound(key) {
				return lowerBound(key, this._keys, this._compareKeys);
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/Disposable.js
function dispose(disposable) {
	if (void 0 !== disposable) {
		if (Symbol.dispose in disposable) disposable[Symbol.dispose]();
		else disposable.dispose();
	}
}
function disposeArray(list) {
	if (void 0 === list) return void 0;
	for (const entry of list) if (Symbol.dispose in entry) entry[Symbol.dispose]();
	else entry.dispose();
	list.length = 0;
}
function init_Disposable() {
	return (init_Disposable = __esmMin((() => {
		/** @packageDocumentation
		* @module Utils
		*/
		Symbol.dispose ??= Symbol("Symbol.dispose");
		Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose");
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/IndexMap.js
var IndexedValue, IndexMap;
function init_IndexMap() {
	return (init_IndexMap = __esmMin((() => {
		init_SortedArray();
		IndexedValue = class {
			value;
			index;
			constructor(value, index) {
				this.value = value;
				this.index = index;
			}
		};
		IndexMap = class {
			_array = [];
			_compareValues;
			_clone;
			_maximumSize;
			/**
			* Construct a new IndexMap<T>.
			* @param compare The function used to compare elements within the map.
			* @param maximumSize The maximum number of elements permitted in the IndexMap. The maximum index of an element is maximumSize-1.
			* @param clone The function invoked to clone a new element for insertion into the array. The default implementation simply returns its input.
			*/
			constructor(compare, maximumSize = Number.MAX_SAFE_INTEGER, clone = shallowClone) {
				this._compareValues = compare;
				this._clone = clone;
				this._maximumSize = maximumSize;
			}
			/** The number of elements in the map. */
			get length() {
				return this._array.length;
			}
			/** Returns true if the maximum number of elements have been inserted. */
			get isFull() {
				return this.length >= this._maximumSize;
			}
			/** Returns true if the map contains no elements. */
			get isEmpty() {
				return 0 === this.length;
			}
			/** Removes all elements from the map. */
			clear() {
				this._array = [];
			}
			/** Attempt to insert a new value into the map.
			* If an equivalent element already exists in the map, the corresponding index is returned.
			* If the map is full, nothing is inserted and -1 is returned.
			* Otherwise:
			*  The new element is mapped to the next-available index (that is, the length of the map prior to insertion of this new element);
			*  the value is cloned using the function supplied to the IndexMap constructor;
			*  the cloned result is inserted into the map; and
			*  the index of the new element is returned.
			* @param value The value to insert
			* @param onInsert The optional callback method to call if insertion occurs with the inserted value
			* @returns the index of the equivalent element in the map, or -1 if the map is full and no equivalent element exists.
			*/
			insert(value, onInsert) {
				const bound = this.lowerBound(value);
				if (bound.equal) return this._array[bound.index].index;
				else if (this.isFull) return -1;
				const entry = new IndexedValue(this._clone(value), this._array.length);
				if (void 0 !== onInsert) onInsert(entry.value);
				this._array.splice(bound.index, 0, entry);
				return entry.index;
			}
			/**
			* Finds the index of an element equivalent to the supplied value.
			* @param value the value to find
			* @returns the index of an equivalent element in the map, or -1 if no such element exists.
			*/
			indexOf(value) {
				const bound = this.lowerBound(value);
				return bound.equal ? this._array[bound.index].index : -1;
			}
			lowerBound(value) {
				return lowerBound(value, this._array, (lhs, rhs) => this._compareValues(lhs, rhs.value));
			}
			/** Return an array of the elements in this map in which the array index of each element corresponds to the index assigned to it by the map. */
			toArray() {
				const array = [];
				for (const entry of this._array) array[entry.index] = entry.value;
				return array;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/LRUMap.js
function init_LRUMap() {
	return (init_LRUMap = __esmMin((() => {
		init_Dictionary();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/ObservableSet.js
var ObservableSet;
function init_ObservableSet() {
	return (init_ObservableSet = __esmMin((() => {
		init_BeEvent();
		ObservableSet = class extends Set {
			/** Emitted after `item` is added to this set. */
			onAdded = new BeEvent();
			/** Emitted after `item` is deleted from this set. */
			onDeleted = new BeEvent();
			/** Emitted after this set's contents are cleared. */
			onCleared = new BeEvent();
			/** Emitted after multiple items are added to this set via [[addAll]]. */
			onBatchAdded = new BeEvent();
			/** Emitted after multiple items are deleted from this set via [[deleteAll]]. */
			onBatchDeleted = new BeEvent();
			/** Construct a new ObservableSet.
			* @param elements Optional elements with which to populate the new set.
			*/
			constructor(elements) {
				super(elements);
				this.add = (item) => {
					const prevSize = this.size;
					const ret = super.add(item);
					if (this.size !== prevSize) this.onAdded.raiseEvent(item);
					return ret;
				};
			}
			/** Invokes [Set.delete](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete), raising
			* the [[onDeleted]] event if the item was removed from the set.
			*/
			delete(item) {
				const ret = super.delete(item);
				if (ret) this.onDeleted.raiseEvent(item);
				return ret;
			}
			/** If this set is not already empty, invokes [Set.clear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear)
			* and raises the [[onCleared]] event.
			*/
			clear() {
				if (0 !== this.size) {
					super.clear();
					this.onCleared.raiseEvent();
				}
			}
			/** Add multiple items to the set, raising [[onBatchAdded]] only once after all items are added.
			* This is more efficient than calling [[add]] in a loop when listeners need not be notified of each individual addition.
			* @param items The items to add.
			* @returns The number of items that were actually added (i.e., were not already present).
			*/
			addAll(items) {
				const prevSize = this.size;
				for (const item of items) super.add(item);
				if (this.size !== prevSize) this.onBatchAdded.raiseEvent();
				return this.size - prevSize;
			}
			/** Delete multiple items from the set, raising [[onBatchDeleted]] only once after all items are deleted.
			* This is more efficient than calling [[delete]] in a loop when listeners need not be notified of each individual deletion.
			* @param items The items to delete.
			* @returns The number of items that were actually deleted (i.e., were present in the set).
			*/
			deleteAll(items) {
				const prevSize = this.size;
				for (const item of items) super.delete(item);
				if (this.size !== prevSize) this.onBatchDeleted.raiseEvent();
				return prevSize - this.size;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/OneAtATimeAction.js
var AbandonedError, PromiseWithAbandon, OneAtATimeAction;
function init_OneAtATimeAction() {
	return (init_OneAtATimeAction = __esmMin((() => {
		init_BentleyError();
		AbandonedError = class extends Error {};
		PromiseWithAbandon = class {
			_run;
			_args;
			/** Method to abandon the Promise created by [[init]] while it is outstanding. The promise will be rejected. */
			abandon;
			_resolve;
			/** Create a PromiseWithAbandon. After this call you must call [[init]] to create the underlying Promise.
			* @param _run The method that creates the underlying Promise.
			* @param _args An array of args to be passed to run when [[start]] is called.
			*/
			constructor(_run, _args) {
				this._run = _run;
				this._args = _args;
			}
			/** Create a Promise that is chained to the underlying Promise, but is connected to the abandon method. */
			async init(msg) {
				return new Promise((resolve, reject) => {
					this.abandon = (message) => reject(new AbandonedError(message ?? msg));
					this._resolve = resolve;
				});
			}
			/** Call the [[run]] method supplied to the ctor to start the underlying Promise. */
			async start() {
				try {
					this._resolve(await this._run(...this._args));
				} catch (err) {
					this.abandon(BentleyError.getErrorMessage(err));
				}
			}
		};
		OneAtATimeAction = class {
			_active;
			_pending;
			_run;
			msg;
			/** Ctor for OneAtATimePromise.
			* @param run The method that performs an action that creates the Promise.
			*/
			constructor(run, msg = "abandoned") {
				this._run = run;
				this.msg = msg;
			}
			/** Add a new request to this OneAtATimePromise. The request will only run when no other outstanding requests are active.
			* @note Callers of this method *must* handle AbandonedError rejections.
			*/
			async request(...args) {
				const entry = new PromiseWithAbandon(this._run, args);
				const promise = entry.init(this.msg);
				if (this._active !== void 0) {
					if (this._pending) this._pending.abandon();
					this._pending = entry;
				} else {
					this._active = entry;
					entry.start();
				}
				try {
					return await promise;
				} finally {
					if (this._active === entry) {
						this._active = this._pending;
						this._pending = void 0;
						if (this._active) this._active.start();
					}
				}
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/OrderedSet.js
var ReadonlyOrderedSet, OrderedSet;
function init_OrderedSet() {
	return (init_OrderedSet = __esmMin((() => {
		init_SortedArray();
		ReadonlyOrderedSet = class {
			_array;
			/** Construct a new ReadonlyOrderedSet<T>.
			* @param compare The function used to compare elements within the set, determining their ordering.
			* @param clone The function invoked to clone a new element for insertion into the set. The default implementation simply returns its input.
			*/
			constructor(compare, clone = shallowClone) {
				this._array = new SortedArray(compare, false, clone);
			}
			/** The number of elements in the set. */
			get size() {
				return this._array.length;
			}
			/** Returns true if `value` is present in the set. */
			has(value) {
				return -1 !== this._array.indexOf(value);
			}
			/** Iterate over the elements in sorted order (as opposed to `Set`'s iterator, which returns elements in insertion order). */
			[Symbol.iterator]() {
				return this._array[Symbol.iterator]();
			}
		};
		OrderedSet = class extends ReadonlyOrderedSet {
			/** Construct a new OrderedSet<T>.
			* @param compare The function used to compare elements within the set, determining their ordering.
			* @param clone The function invoked to clone a new element for insertion into the set. The default implementation simply returns its input.
			*/
			constructor(compare, clone = shallowClone) {
				super(compare, clone);
			}
			/** Remove all elements from the set. */
			clear() {
				this._array.clear();
			}
			/** Add the specified element to the set. Returns this set. */
			add(value) {
				this._array.insert(value);
				return this;
			}
			/** Removes the specified element from the set. Returns `true` if the element was present. */
			delete(value) {
				return -1 !== this._array.remove(value);
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/PriorityQueue.js
var PriorityQueue;
function init_PriorityQueue() {
	return (init_PriorityQueue = __esmMin((() => {
		init_SortedArray();
		PriorityQueue = class {
			_array = [];
			_compare;
			_clone;
			/**
			* Constructor
			* @param compare The function used to compare values in the queue. If `compare(x, y)` returns a negative value, then x is placed before y in the queue.
			* @param clone The function used to clone a value for insertion onto the queue. The default implementation simply returns its input.
			* @note If the criterion which control the result of the `compare` function changes, then [[PriorityQueue.sort]] should be used to reorder the queue according to the new criterion.
			*/
			constructor(compare, clone = shallowClone) {
				this._compare = compare;
				this._clone = clone;
			}
			/** The number of values in the queue. */
			get length() {
				return this._array.length;
			}
			/** Returns true if the queue contains no values. */
			get isEmpty() {
				return 0 === this.length;
			}
			/** Returns an iterator over the contents of the heap suitable for use in `for-of` loops. */
			[Symbol.iterator]() {
				return this._array[Symbol.iterator]();
			}
			_swap(a, b) {
				const temp = this._array[a];
				this._array[a] = this._array[b];
				this._array[b] = temp;
			}
			_heapify(index) {
				let candidate = -1;
				while (true) {
					const right = 2 * (index + 1);
					const left = right - 1;
					if (left < this.length && this._compare(this._array[left], this._array[index]) < 0) candidate = left;
					else candidate = index;
					if (right < this.length && this._compare(this._array[right], this._array[candidate]) < 0) candidate = right;
					if (candidate !== index) {
						this._swap(candidate, index);
						index = candidate;
					} else break;
				}
			}
			/**
			* Reorders the queue. This function should only (and *always*) be called when the criteria governing the ordering of items on the queue have changed.
			* For example, a priority queue containing graphics sorted by their distance from the camera would need to be reordered when the position of the camera changes.
			*/
			sort() {
				for (let i = Math.ceil(this.length / 2); i >= 0; i--) this._heapify(i);
			}
			/**
			* Pushes a value onto the queue according to the sorting criterion.
			* @param value The value to insert
			* @returns The inserted value, cloned according to the [[CloneFunction]] supplied to this queue's constructor.
			*/
			push(value) {
				const clone = this._clone(value);
				let index = this.length;
				this._array.push(clone);
				while (index !== 0) {
					const parent = Math.floor((index - 1) / 2);
					if (this._compare(this._array[index], this._array[parent]) < 0) {
						this._swap(index, parent);
						index = parent;
					} else break;
				}
				return clone;
			}
			/** Pushes a value onto the back of the queue without making any attempt to enforce ordering.
			* After using this function, you must manually invoke sort() to ensure the queue is sorted again.
			* @param value The value to append
			* @returns The appended value, cloned according to the [[CloneFunction]] supplied to this queue's constructor.
			*/
			append(value) {
				const clone = this._clone(value);
				this._array.push(clone);
				return clone;
			}
			/** Returns the element at the front of the queue, or `undefined` if the queue is empty. */
			get front() {
				return this._peek(0);
			}
			/**
			* Removes the front-most element off of the queue and returns it.
			* @returns The front-most element, or undefined if the queue is empty.
			*/
			pop() {
				return this._pop(0);
			}
			/** Removes all values from the queue. */
			clear() {
				this._array.length = 0;
			}
			/**
			* Removes the value at the specified index from the queue and reorders the queue.
			* @param index The index of the value to remove
			* @returns the value at the specified index, or undefined if the index is out of range.
			*/
			_pop(index) {
				if (index < 0 || index >= this.length) return void 0;
				const root = this._array[index];
				this._swap(index, this.length - 1);
				this._array.length--;
				this._heapify(index);
				return root;
			}
			/**
			* Returns the value at the specified index in the queue.
			* @param index The index of the value to retrieve
			* @returns the value at the specified index, or undefined if the index is out of range.
			*/
			_peek(index) {
				if (index < 0 || index >= this.length) return void 0;
				else return this._array[index];
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/Tracing.js
function isValidPrimitive(val) {
	return typeof val === "string" || typeof val === "number" || typeof val === "boolean";
}
function isValidPrimitiveArray(val) {
	if (!Array.isArray(val)) return false;
	let itemType;
	for (const x of val) {
		if (x === void 0 || x === null) continue;
		if (!itemType) {
			itemType = typeof x;
			if (!isValidPrimitive(x)) return false;
		}
		if (typeof x !== itemType) return false;
	}
	return true;
}
function isPlainObject(obj) {
	return typeof obj === "object" && obj !== null && Object.getPrototypeOf(obj) === Object.prototype;
}
function* getFlatEntries(obj, path = "") {
	if (isValidPrimitiveArray(obj)) {
		yield [path, obj];
		return;
	}
	if (!isPlainObject(obj) && !Array.isArray(obj)) {
		yield [path, isValidPrimitive(obj) ? obj : JSON.stringify(obj)];
		return;
	}
	const entries = Object.entries(obj);
	if (entries.length === 0) yield [path, []];
	for (const [key, val] of entries) yield* getFlatEntries(val, path === "" ? key : `${path}.${key}`);
}
function flattenObject(obj) {
	return Object.fromEntries(getFlatEntries(obj));
}
var SpanKind, Tracing;
function init_Tracing() {
	return (init_Tracing = __esmMin((() => {
		init_Logger();
		(function(SpanKind) {
			SpanKind[SpanKind["INTERNAL"] = 0] = "INTERNAL";
			SpanKind[SpanKind["SERVER"] = 1] = "SERVER";
			SpanKind[SpanKind["CLIENT"] = 2] = "CLIENT";
			SpanKind[SpanKind["PRODUCER"] = 3] = "PRODUCER";
			SpanKind[SpanKind["CONSUMER"] = 4] = "CONSUMER";
		})(SpanKind || (SpanKind = {}));
		Tracing = class Tracing {
			static _tracer;
			static _openTelemetry;
			/**
			* If OpenTelemetry tracing is enabled, creates a new span and runs the provided function in it.
			* If OpenTelemetry tracing is _not_ enabled, runs the provided function.
			* @param name name of the new span
			* @param fn function to run inside the new span
			* @param options span options
			* @param parentContext optional context used to retrieve parent span id
			*/
			static async withSpan(name, fn, options, parentContext) {
				if (Tracing._tracer === void 0 || Tracing._openTelemetry === void 0) return fn();
				const parent = parentContext === void 0 ? Tracing._openTelemetry.context.active() : Tracing._openTelemetry.trace.setSpanContext(Tracing._openTelemetry.context.active(), parentContext);
				return Tracing._openTelemetry.context.with(Tracing._openTelemetry.trace.setSpan(parent, Tracing._tracer.startSpan(name, options, Tracing._openTelemetry.context.active())), async () => {
					try {
						return await fn();
					} catch (err) {
						if (err instanceof Error) Tracing._openTelemetry?.trace.getSpan(Tracing._openTelemetry.context.active())?.setAttribute("error", true);
						throw err;
					} finally {
						Tracing._openTelemetry?.trace.getSpan(Tracing._openTelemetry.context.active())?.end();
					}
				});
			}
			/**
			* Adds a span event describing a runtime exception, as advised in OpenTelemetry documentation
			* @param e error (exception) object
			*/
			static recordException(e) {
				Tracing._openTelemetry?.trace.getSpan(Tracing._openTelemetry.context.active())?.recordException(e);
			}
			/**
			* Enable logging to OpenTelemetry. [[Tracing.withSpan]] will be enabled, all log entries will be attached to active span as span events.
			* [IModelHost.startup]($backend) will call this automatically if the `enableOpenTelemetry` option is enabled and it succeeds in requiring `@opentelemetry/api`.
			* @note Node.js OpenTelemetry SDK should be initialized by the user.
			*/
			static enableOpenTelemetry(tracer, api) {
				Tracing._tracer = tracer;
				Tracing._openTelemetry = api;
				Logger.logTrace = Tracing.withOpenTelemetry(LogLevel.Trace, Logger.logTrace.bind(Logger)).bind(Logger);
				Logger.logInfo = Tracing.withOpenTelemetry(LogLevel.Info, Logger.logInfo.bind(Logger)).bind(Logger);
				Logger.logWarning = Tracing.withOpenTelemetry(LogLevel.Warning, Logger.logWarning.bind(Logger)).bind(Logger);
				Logger.logError = Tracing.withOpenTelemetry(LogLevel.Error, Logger.logError.bind(Logger)).bind(Logger);
			}
			static withOpenTelemetry(level, base, isError = false) {
				return (category, message, metaData) => {
					const oTelContext = Tracing._openTelemetry?.context.active();
					if (Tracing._openTelemetry === void 0 || oTelContext === void 0) return base(category, message, metaData);
					const serializedMetadata = Logger.getMetaData(metaData);
					if (Logger.isEnabled(category, level)) {
						try {
							Tracing._openTelemetry?.trace.getSpan(Tracing._openTelemetry.context.active())?.addEvent(message, {
								...flattenObject(serializedMetadata),
								error: isError,
								loggerCategory: category
							});
						} catch {}
						const spanContext = Tracing._openTelemetry.trace.getSpan(oTelContext)?.spanContext();
						base(category, message, {
							...serializedMetadata,
							trace_id: spanContext?.traceId,
							span_id: spanContext?.spanId,
							trace_flags: spanContext?.traceFlags
						});
					}
				};
			}
			/** Set attributes on currently active openTelemetry span. Doesn't do anything if openTelemetry logging is not initialized.
			* @param attributes The attributes to set
			*/
			static setAttributes(attributes) {
				Tracing._openTelemetry?.trace.getSpan(Tracing._openTelemetry.context.active())?.setAttributes(attributes);
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/internal/BeSQLiteInternal.js
var DbChangeStage, DbValueType, DbConflictCause, DbConflictResolution;
function init_BeSQLiteInternal() {
	return (init_BeSQLiteInternal = __esmMin((() => {
		(function(DbChangeStage) {
			DbChangeStage[DbChangeStage["Old"] = 0] = "Old";
			DbChangeStage[DbChangeStage["New"] = 1] = "New";
		})(DbChangeStage || (DbChangeStage = {}));
		(function(DbValueType) {
			DbValueType[DbValueType["IntegerVal"] = 1] = "IntegerVal";
			DbValueType[DbValueType["FloatVal"] = 2] = "FloatVal";
			DbValueType[DbValueType["TextVal"] = 3] = "TextVal";
			DbValueType[DbValueType["BlobVal"] = 4] = "BlobVal";
			DbValueType[DbValueType["NullVal"] = 5] = "NullVal";
		})(DbValueType || (DbValueType = {}));
		(function(DbConflictCause) {
			DbConflictCause[DbConflictCause["Data"] = 1] = "Data";
			DbConflictCause[DbConflictCause["NotFound"] = 2] = "NotFound";
			DbConflictCause[DbConflictCause["Conflict"] = 3] = "Conflict";
			DbConflictCause[DbConflictCause["Constraint"] = 4] = "Constraint";
			DbConflictCause[DbConflictCause["ForeignKey"] = 5] = "ForeignKey";
		})(DbConflictCause || (DbConflictCause = {}));
		(function(DbConflictResolution) {
			/** Skip incoming change */
			DbConflictResolution[DbConflictResolution["Skip"] = 0] = "Skip";
			/** Replace local row with incoming changed row */
			DbConflictResolution[DbConflictResolution["Replace"] = 1] = "Replace";
			/** Abort apply changeset */
			DbConflictResolution[DbConflictResolution["Abort"] = 2] = "Abort";
		})(DbConflictResolution || (DbConflictResolution = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/internal/cross-package.js
function init_cross_package() {
	return (init_cross_package = __esmMin((() => {
		init_RepositoryStatus();
		init_BeSQLiteInternal();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/core-bentley.js
function init_core_bentley() {
	return (init_core_bentley = __esmMin((() => {
		init_BeEvent();
		init_BentleyError();
		init_BentleyLoggerCategory();
		init_StatusCategory();
		init_BeSQLite();
		init_ByteStream();
		init_CompressedId64Set();
		init_Dictionary();
		init_Disposable();
		init_Id();
		init_IndexMap();
		init_JsonUtils();
		init_Logger();
		init_LRUMap();
		init_ObservableSet();
		init_OneAtATimeAction();
		init_OrderedId64Iterable();
		init_OrderedSet();
		init_PriorityQueue();
		init_ProcessDetector();
		init_SortedArray();
		init_Time();
		init_Tracing();
		init_TypedArrayBuilder();
		init_UnexpectedErrors();
		init_cross_package();
	})))();
}
/** @docs-package-description
* The core-bentley package contains classes to solve problems that are common for both client and server use cases.
*/
/**
* @docs-group-description BeSQLite
* Classes for working with SQLite databases. SQLite underlies IModelDb and ECDb - see [Executing ECSQL]($docs/learning/ECSQL.md)
*/
/**
* @docs-group-description Errors
* Classes for working with errors.
*/
/**
* @docs-group-description Events
* Classes for raising and handling events.
*/
/**
* @docs-group-description Ids
* Classes for working with unique identifiers.
*/
/**
* @docs-group-description Logging
* Classes for configuring and logging diagnostic messages - see [Learning about Logging]($docs/learning/common/Logging.md)
*/
/**
* @docs-group-description Collections
* Specialized, customizable collection classes like priority queues.
*/
/**
* @docs-group-description Json
* utilities for dealing with Json strings and files.
*/
/**
* @docs-group-description Utils
* Miscellaneous utility classes.
*/
/**
* @docs-group-description ProcessDetector
* Functions for determining the type of the current JavaScript process.
*/
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/UiAdmin.js
var GenericUiEvent, UiAdmin;
function init_UiAdmin() {
	return (init_UiAdmin = __esmMin((() => {
		init_core_bentley();
		GenericUiEvent = class extends BeUiEvent {};
		UiAdmin = class UiAdmin {
			_featureFlags = {};
			static _messagePresenter;
			/** The MessagePresenter used to display messages. */
			static get messagePresenter() {
				if (!UiAdmin._messagePresenter) {
					const error = new BentleyError(BentleyStatus.ERROR, "UiAdmin.messagePresenter not set");
					error.category = "messagePresenter";
					throw error;
				}
				return UiAdmin._messagePresenter;
			}
			static set messagePresenter(mp) {
				UiAdmin._messagePresenter = mp;
			}
			get featureFlags() {
				return { ...this._featureFlags };
			}
			updateFeatureFlags(uiFlags) {
				this._featureFlags = {
					...this._featureFlags,
					...uiFlags
				};
			}
			/** @internal */
			onInitialized() {}
			/** Get the cursor X and Y position. */
			get cursorPosition() {
				return {
					x: 0,
					y: 0
				};
			}
			/** Create a PointProps object.
			* @deprecated in 4.2.0 - will not be removed until after 2026-06-13. Please use @core/geometry [[XAndY]] or a custom implementation.
			*/
			createXAndY(x, y) {
				return {
					x,
					y
				};
			}
			/** Determines if focus is set to Home */
			get isFocusOnHome() {
				return false;
			}
			/** Sets focus to Home */
			setFocusToHome() {}
			/** Show a context menu at a particular location.
			* @param _menuItemsProps Properties of the menu items to display.
			* @param _location Location of the context menu, relative to the origin of htmlElement or the window.
			* @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
			* @return true if the menu was displayed, false if the menu could not be displayed.
			*/
			showContextMenu(_menuItemsProps, _location, _htmlElement) {
				return false;
			}
			/** Show a Toolbar at a particular location.
			* @param _toolbarProps Properties of the Toolbar to display.
			* @param _location Location of the Toolbar, relative to the origin of htmlElement or the window.
			* @param _offset Offset of the Toolbar from the location.
			* @param _onItemExecuted Function invoked after a Toolbar item is executed
			* @param _onCancel Function invoked when the Escape key is pressed or a click occurs outside the Toolbar
			* @param _relativePosition Position relative to the given location. Defaults to TopRight.
			* @param _htmlElement The HTMLElement that anchors the Toolbar. If undefined, the location is relative to the overall window.
			* @return true if the Toolbar was displayed, false if the Toolbar could not be displayed.
			*/
			showToolbar(_toolbarProps, _location, _offset, _onItemExecuted, _onCancel, _relativePosition, _htmlElement) {
				return false;
			}
			/** Hides the toolbar. */
			hideToolbar() {
				return false;
			}
			/** Show a menu button at a particular location. A menu button opens a context menu.
			* @param _id Id of the menu button. Multiple menu buttons may be displayed.
			* @param _menuItemsProps Properties of the menu items to display.
			* @param _location Location of the context menu, relative to the origin of htmlElement or the window.
			* @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
			* @return true if the button was displayed, false if the button could not be displayed.
			*/
			showMenuButton(_id, _menuItemsProps, _location, _htmlElement) {
				return false;
			}
			/** Hides a menu button.
			* @param _id Id of the menu button. Multiple menu buttons may be displayed.
			* @return true if the menu was hidden, false if the menu could not be hidden.
			*/
			hideMenuButton(_id) {
				return false;
			}
			/** Show a calculator at a particular location.
			* @param _initialValue Value initially displayed in the calculator.
			* @param _resultIcon Icon displayed to the left of the value.
			* @param _location Location of the calculator, relative to the origin of htmlElement or the window.
			* @param _onCommit Function called when the OK button or the Enter key is pressed.
			* @param _onCancel Function called when the Cancel button or the Escape key  is pressed.
			* @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
			* @return true if the calculator was displayed, false if the calculator could not be displayed.
			*/
			showCalculator(_initialValue, _resultIcon, _location, _onCommit, _onCancel, _htmlElement) {
				return false;
			}
			/** Hides the calculator. */
			hideCalculator() {
				return false;
			}
			/** Show an input editor for an angle value at a particular location.
			* @param _initialValue Value initially displayed in the editor.
			* @param _location Location of the editor, relative to the origin of htmlElement or the window.
			* @param _onCommit Function called when the OK button or the Enter key is pressed.
			* @param _onCancel Function called when the Cancel button or the Escape key  is pressed.
			* @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
			* @return true if the editor was displayed, false if the editor could not be displayed.
			*/
			showAngleEditor(_initialValue, _location, _onCommit, _onCancel, _htmlElement) {
				return false;
			}
			/** Show an input editor for a length value at a particular location.
			* @param _initialValue Value initially displayed in the editor.
			* @param _location Location of the editor, relative to the origin of htmlElement or the window.
			* @param _onCommit Function called when the OK button or the Enter key is pressed.
			* @param _onCancel Function called when the Cancel button or the Escape key  is pressed.
			* @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
			* @return true if the editor was displayed, false if the editor could not be displayed.
			*/
			showLengthEditor(_initialValue, _location, _onCommit, _onCancel, _htmlElement) {
				return false;
			}
			/** Show an input editor for a height value at a particular location.
			* @param _initialValue Value initially displayed in the editor.
			* @param _location Location of the editor, relative to the origin of htmlElement or the window.
			* @param _onCommit Function called when the OK button or the Enter key is pressed.
			* @param _onCancel Function called when the Cancel button or the Escape key  is pressed.
			* @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
			* @return true if the editor was displayed, false if the editor could not be displayed.
			*/
			showHeightEditor(_initialValue, _location, _onCommit, _onCancel, _htmlElement) {
				return false;
			}
			/** Show an input editor for a primitive value at a particular location.
			* @param _initialValue Value initially displayed in the editor.
			* @param _propertyDescription Description of the primitive value property.
			* @param _location Location of the editor, relative to the origin of htmlElement or the window.
			* @param _onCommit Function called when the OK button or the Enter key is pressed.
			* @param _onCancel Function called when the Cancel button or the Escape key  is pressed.
			* @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
			* @return true if the editor was displayed, false if the editor could not be displayed.
			*/
			showInputEditor(_initialValue, _propertyDescription, _location, _onCommit, _onCancel, _htmlElement) {
				return false;
			}
			/** Hides the input editor. */
			hideInputEditor() {
				return false;
			}
			/** Show an HTML element at a particular location.
			* @param _displayElement The HTMLElement to display
			* @param _location Location of the tool settings, relative to the origin of anchorElement or the window
			* @param _offset Offset of the display element from the location
			* @param _onCancel Function invoked when the Escape key is pressed or a click occurs outside the display element
			* @param _relativePosition Position relative to the given location. Defaults to TopRight.
			* @param _anchorElement The HTMLElement that anchors the display element. If undefined, the location is relative to the overall window.
			* @return true if the display element was displayed, false if the display element could not be displayed.
			*/
			showHTMLElement(_displayElement, _location, _offset, _onCancel, _relativePosition, _anchorElement) {
				return false;
			}
			/** Hides the HTML Element. */
			hideHTMLElement() {
				return false;
			}
			/** Show a Card containing content, a title and a toolbar at a particular location.
			* @param _content The HTMLElement of the content to display
			* @param _title Title to display at the top of the card.
			* @param _toolbarProps Properties of the Toolbar to display.
			* @param _location Location of the Card, relative to the origin of anchorElement or the window.
			* @param _offset Offset of the Card from the location.
			* @param _onItemExecuted Function invoked after a Toolbar item is executed
			* @param _onCancel Function invoked when the Escape key is pressed or a click occurs outside the Card
			* @param _relativePosition Position relative to the given location. Defaults to TopRight.
			* @param _anchorElement The HTMLElement that anchors the Card. If undefined, the location is relative to the overall window.
			* @return true if the Card was displayed, false if the Card could not be displayed.
			*/
			showCard(_content, _title, _toolbarProps, _location, _offset, _onItemExecuted, _onCancel, _relativePosition, _anchorElement) {
				return false;
			}
			/** Hides the Card. */
			hideCard() {
				return false;
			}
			/** Opens a Tool Settings Ui popup at a particular location.
			* @param _dataProvider The UiDataProvider for the tool settings
			* @param _location Location of the tool settings, relative to the origin of anchorElement or the window
			* @param _offset Offset of the tool settings from the location
			* @param _onCancel Function invoked when the Escape key is pressed or a click occurs outside the tool settings
			* @param _relativePosition Position relative to the given location. Defaults to TopRight.
			* @param _anchorElement The HTMLElement that anchors the tool settings. If undefined, the location is relative to the overall window.
			* @return true if the tool settings were displayed, false if the tool settings could not be displayed.
			*/
			openToolSettingsPopup(_dataProvider, _location, _offset, _onCancel, _relativePosition, _anchorElement) {
				return false;
			}
			/** Closes the Tool Settings Ui popup. */
			closeToolSettingsPopup() {
				return false;
			}
			/** Show the Keyin Palette to display all support Tool key-ins.
			* @param _htmlElement The HTMLElement that anchors the Keyin Palette. If undefined, the location is relative to the overall window.
			* @return true if the Keyin Palette was displayed, false if it could not be displayed.
			*/
			showKeyinPalette(_htmlElement) {
				return false;
			}
			/** Hides the Keyin Palette. */
			hideKeyinPalette() {
				return false;
			}
			/** Send a UI event */
			static sendUiEvent(args) {
				UiAdmin.onGenericUiEvent.emit(args);
			}
			/** GenericUiEvent  */
			static onGenericUiEvent = new GenericUiEvent();
			/** Opens a Dialog and automatically populates it using the properties defined by the UiDataProvider.
			* @param _uiDataProvider The DialogLayoutDataProvider for the dialog
			* @param _title Specify title for dialog.
			* @param _isModal Specify if the dialog is opened as a modal or modeless.
			* @param _id Id of the dialog that is used to close it.
			* @param _optionalProps Optional props for Dialog construction.
			* @return true if the tool settings were displayed, false if the tool settings could not be displayed.
			*/
			openDialog(_uiDataProvider, _title, _isModal, _id, _optionalProps) {
				return false;
			}
			/** Closes the Dialog with a given Id. */
			closeDialog(_dialogId) {
				return false;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/common/KeyboardKey.js
/** Determines if a KeyboardEvent.key is an Arrow key
* @public @deprecated in 4.3 - will not be removed until after 2026-06-13. Please use a custom implementation moving forward.
*/
function isArrowKey(key) {
	return key === SpecialKey.ArrowLeft || key === SpecialKey.ArrowRight || key === SpecialKey.ArrowUp || key === SpecialKey.ArrowDown;
}
var FunctionKey, SpecialKey;
function init_KeyboardKey() {
	return (init_KeyboardKey = __esmMin((() => {
		(function(FunctionKey) {
			FunctionKey["F1"] = "F1";
			FunctionKey["F2"] = "F2";
			FunctionKey["F3"] = "F3";
			FunctionKey["F4"] = "F4";
			FunctionKey["F5"] = "F5";
			FunctionKey["F6"] = "F6";
			FunctionKey["F7"] = "F7";
			FunctionKey["F8"] = "F8";
			FunctionKey["F9"] = "F9";
			FunctionKey["F10"] = "F10";
			FunctionKey["F11"] = "F11";
			FunctionKey["F12"] = "F12";
		})(FunctionKey || (FunctionKey = {}));
		(function(SpecialKey) {
			SpecialKey["Home"] = "Home";
			SpecialKey["End"] = "End";
			SpecialKey["PageUp"] = "PageUp";
			SpecialKey["PageDown"] = "PageDown";
			SpecialKey["Escape"] = "Escape";
			SpecialKey["Delete"] = "Delete";
			SpecialKey["Insert"] = "Insert";
			SpecialKey["Tab"] = "Tab";
			SpecialKey["ArrowLeft"] = "ArrowLeft";
			SpecialKey["ArrowRight"] = "ArrowRight";
			SpecialKey["ArrowUp"] = "ArrowUp";
			SpecialKey["ArrowDown"] = "ArrowDown";
			SpecialKey["Enter"] = "Enter";
			SpecialKey["Return"] = "Enter";
			SpecialKey["Space"] = " ";
			SpecialKey["Backspace"] = "Backspace";
			SpecialKey["Clear"] = "Clear";
			SpecialKey["Divide"] = "Divide";
			SpecialKey["Multiply"] = "Multiply";
			SpecialKey["Subtract"] = "Subtract";
			SpecialKey["Add"] = "Add";
			SpecialKey["Decimal"] = "Decimal";
		})(SpecialKey || (SpecialKey = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/content/StandardContentLayouts.js
var StandardContentLayouts;
function init_StandardContentLayouts() {
	return (init_StandardContentLayouts = __esmMin((() => {
		StandardContentLayouts = class StandardContentLayouts {
			static singleView = {
				id: "uia:singleView",
				description: "Single Content View"
			};
			static fourQuadrants = {
				id: "uia:fourQuadrants",
				description: "Four Views, two stacked on the left, two stacked on the right",
				verticalSplit: {
					id: "uia:fourQuadrantVerticalSplit",
					percentage: .5,
					lock: false,
					minSizeLeft: 100,
					minSizeRight: 100,
					left: { horizontalSplit: {
						id: "uia:fourQuadrantsLeftHorizontal",
						percentage: .5,
						top: 0,
						bottom: 1,
						lock: false,
						minSizeTop: 50,
						minSizeBottom: 50
					} },
					right: { horizontalSplit: {
						id: "uia:fourQuadrantsRightHorizontal",
						percentage: .5,
						top: 2,
						bottom: 3,
						lock: false,
						minSizeTop: 50,
						minSizeBottom: 50
					} }
				}
			};
			static twoVerticalSplit = {
				id: "uia:twoVerticalSplit",
				description: "Two Views, side by side",
				verticalSplit: {
					id: "uia:twoViewsVerticalSplit",
					percentage: .5,
					left: 0,
					right: 1
				}
			};
			static twoHorizontalSplit = {
				id: "uia:twoHorizontalSplit",
				description: "Two views, stack one on top of the other",
				horizontalSplit: {
					id: "uia:twoViewsHorizontalSplit",
					percentage: .5,
					lock: false,
					top: 0,
					bottom: 1
				}
			};
			static threeViewsTwoOnLeft = {
				id: "uia:threeViewsTwoOnLeft",
				description: "Three views, one on the right with the two on the left stacked one of top of the other",
				verticalSplit: {
					id: "uia:twoViewsOnLeftSplit",
					percentage: .5,
					left: { horizontalSplit: {
						id: "uia:twoViewsOnLeftHorizontal",
						percentage: .5,
						top: 0,
						bottom: 1,
						lock: false,
						minSizeTop: 50,
						minSizeBottom: 50
					} },
					right: 2
				}
			};
			static threeViewsTwoOnRight = {
				id: "uia:threeViewsTwoOnRight",
				description: "Three views, one on the left with the two on the right stacked one of top of the other",
				verticalSplit: {
					id: "uia:twoViewsOnRightSplit",
					percentage: .5,
					left: 0,
					right: { horizontalSplit: {
						id: "uia:twoViewsOnRightHorizontal",
						percentage: .5,
						top: 1,
						bottom: 2,
						lock: false,
						minSizeTop: 50,
						minSizeBottom: 50
					} }
				}
			};
			static threeViewsTwoOnBottom = {
				id: "uia:threeViewsTwoOnBottom",
				description: "Three Views, one on top and two side by side on the bottom",
				horizontalSplit: {
					id: "uia:threeViewsTwoOnBottomHorizontal",
					percentage: .5,
					lock: false,
					top: 0,
					bottom: { verticalSplit: {
						id: "uia:twoViewsOnBottomVertical",
						percentage: .5,
						left: 1,
						right: 2,
						lock: false,
						minSizeLeft: 50,
						minSizeRight: 50
					} }
				}
			};
			static threeViewsTwoOnTop = {
				id: "uia:threeViewsTwoOnTop",
				description: "Three Views, two side by side on top and one on the bottom",
				horizontalSplit: {
					id: "uia:twoViewsOnTopHorizontal",
					percentage: .5,
					lock: false,
					top: { verticalSplit: {
						id: "uia:twoViewsOnTopVertical",
						percentage: .5,
						left: 0,
						right: 1,
						lock: false,
						minSizeLeft: 50,
						minSizeRight: 50
					} },
					bottom: 2
				}
			};
			static availableLayouts = [
				StandardContentLayouts.singleView,
				StandardContentLayouts.fourQuadrants,
				StandardContentLayouts.twoVerticalSplit,
				StandardContentLayouts.twoHorizontalSplit,
				StandardContentLayouts.threeViewsTwoOnLeft,
				StandardContentLayouts.threeViewsTwoOnRight,
				StandardContentLayouts.threeViewsTwoOnBottom,
				StandardContentLayouts.threeViewsTwoOnTop
			];
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/dialogs/DialogItem.js
var DialogProperty;
function init_DialogItem() {
	return (init_DialogItem = __esmMin((() => {
		DialogProperty = class {
			description;
			_value;
			_displayValue;
			_isDisabled;
			constructor(description, _value, _displayValue, _isDisabled) {
				this.description = description;
				this._value = _value;
				this._displayValue = _displayValue;
				this._isDisabled = _isDisabled;
			}
			get isDisabled() {
				return !!this._isDisabled;
			}
			set isDisabled(val) {
				this._isDisabled = val;
			}
			get value() {
				return this._value;
			}
			set value(val) {
				this._value = val;
			}
			get name() {
				return this.description.name;
			}
			set displayValue(val) {
				this._displayValue = val;
			}
			get displayValue() {
				return this._displayValue;
			}
			get dialogItemValue() {
				// istanbul ignore else
				if (typeof this._value === "string" || typeof this._value === "number" || typeof this._value === "undefined" || typeof this._value === "boolean" || this._value instanceof Date) return {
					value: this._value,
					displayValue: this._displayValue
				};
				// istanbul ignore next
				throw new Error("Not valid primitive type");
			}
			set dialogItemValue(val) {
				this._value = val.value;
				this._displayValue = val.displayValue;
			}
			get syncItem() {
				const isDisabled = this._isDisabled;
				return {
					propertyName: this.name,
					value: this.dialogItemValue,
					isDisabled
				};
			}
			get item() {
				return {
					propertyName: this.name,
					value: this.dialogItemValue
				};
			}
			toDialogItem(editorPosition, lockProperty) {
				return {
					value: this.dialogItemValue,
					property: this.description,
					editorPosition,
					isDisabled: this._isDisabled,
					lockProperty
				};
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/properties/EditorParams.js
var AlternateDateFormats, TimeDisplay, PropertyEditorParamTypes, isInputEditorSizeParams, isColorEditorParams, isIconListEditorParams, isButtonGroupEditorParams, isSuppressLabelEditorParams, isCustomFormattedNumberParams;
function init_EditorParams() {
	return (init_EditorParams = __esmMin((() => {
		(function(AlternateDateFormats) {
			AlternateDateFormats[AlternateDateFormats["None"] = 0] = "None";
			AlternateDateFormats[AlternateDateFormats["IsoShort"] = 1] = "IsoShort";
			AlternateDateFormats[AlternateDateFormats["IsoDateTime"] = 2] = "IsoDateTime";
			AlternateDateFormats[AlternateDateFormats["UtcShort"] = 3] = "UtcShort";
			AlternateDateFormats[AlternateDateFormats["UtcDateTime"] = 4] = "UtcDateTime";
			AlternateDateFormats[AlternateDateFormats["UtcShortWithDay"] = 5] = "UtcShortWithDay";
			AlternateDateFormats[AlternateDateFormats["UtcDateTimeWithDay"] = 6] = "UtcDateTimeWithDay";
		})(AlternateDateFormats || (AlternateDateFormats = {}));
		(function(TimeDisplay) {
			TimeDisplay["H12MC"] = "hh:mm aa";
			TimeDisplay["H12MSC"] = "hh:mm:ss aa";
			TimeDisplay["H24M"] = "hh:mm";
			TimeDisplay["H24MS"] = "hh:mm:ss";
		})(TimeDisplay || (TimeDisplay = {}));
		(function(PropertyEditorParamTypes) {
			PropertyEditorParamTypes["ButtonGroupData"] = "UiAbstract-ButtonGroupData";
			PropertyEditorParamTypes["CheckBoxIcons"] = "UiAbstract-CheckBoxIcons";
			PropertyEditorParamTypes["Icon"] = "UiAbstract-Icon";
			PropertyEditorParamTypes["InputEditorSize"] = "UiAbstract-InputEditorSize";
			PropertyEditorParamTypes["ColorData"] = "UiAbstract-ColorData";
			PropertyEditorParamTypes["CustomFormattedNumber"] = "UiAbstract-CustomFormattedNumber";
			PropertyEditorParamTypes["IconListData"] = "UiAbstract-IconListData";
			PropertyEditorParamTypes["MultilineText"] = "UiAbstract-MultilineText";
			PropertyEditorParamTypes["Range"] = "UiAbstract-Range";
			PropertyEditorParamTypes["Slider"] = "UiAbstract-Slider";
			PropertyEditorParamTypes["SuppressEditorLabel"] = "UiAbstract-SuppressEditorLabel";
			PropertyEditorParamTypes["CheckBoxImages"] = "UiAbstract-CheckBoxImages";
		})(PropertyEditorParamTypes || (PropertyEditorParamTypes = {}));
		isInputEditorSizeParams = (item) => {
			return item.type === PropertyEditorParamTypes.InputEditorSize;
		};
		isColorEditorParams = (item) => {
			return item.type === PropertyEditorParamTypes.ColorData;
		};
		isIconListEditorParams = (item) => {
			return item.type === PropertyEditorParamTypes.IconListData;
		};
		isButtonGroupEditorParams = (item) => {
			return item.type === PropertyEditorParamTypes.ButtonGroupData;
		};
		isSuppressLabelEditorParams = (item) => {
			return item.type === PropertyEditorParamTypes.SuppressEditorLabel;
		};
		isCustomFormattedNumberParams = (item) => {
			return item.type === PropertyEditorParamTypes.CustomFormattedNumber;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/properties/StandardTypeNames.js
var StandardTypeNames;
function init_StandardTypeNames() {
	return (init_StandardTypeNames = __esmMin((() => {
		(function(StandardTypeNames) {
			StandardTypeNames["Text"] = "text";
			StandardTypeNames["String"] = "string";
			StandardTypeNames["DateTime"] = "dateTime";
			StandardTypeNames["ShortDate"] = "shortdate";
			StandardTypeNames["Boolean"] = "boolean";
			StandardTypeNames["Bool"] = "bool";
			StandardTypeNames["Float"] = "float";
			StandardTypeNames["Double"] = "double";
			StandardTypeNames["Int"] = "int";
			StandardTypeNames["Integer"] = "integer";
			StandardTypeNames["Number"] = "number";
			StandardTypeNames["Hexadecimal"] = "hexadecimal";
			StandardTypeNames["Hex"] = "hex";
			StandardTypeNames["Enum"] = "enum";
			StandardTypeNames["Point2d"] = "point2d";
			StandardTypeNames["Point3d"] = "point3d";
			StandardTypeNames["Navigation"] = "navigation";
			StandardTypeNames["Composite"] = "composite";
			StandardTypeNames["Array"] = "array";
			StandardTypeNames["Struct"] = "struct";
			StandardTypeNames["URL"] = "url";
		})(StandardTypeNames || (StandardTypeNames = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/properties/Value.js
var PropertyValueFormat;
function init_Value() {
	return (init_Value = __esmMin((() => {
		(function(PropertyValueFormat) {
			PropertyValueFormat[PropertyValueFormat["Primitive"] = 0] = "Primitive";
			PropertyValueFormat[PropertyValueFormat["Array"] = 1] = "Array";
			PropertyValueFormat[PropertyValueFormat["Struct"] = 2] = "Struct";
		})(PropertyValueFormat || (PropertyValueFormat = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/properties/Record.js
function assignMemberIfExists(target, source, memberName) {
	if (source.hasOwnProperty(memberName)) target[memberName] = source[memberName];
}
var PropertyRecord;
function init_Record() {
	return (init_Record = __esmMin((() => {
		init_StandardTypeNames();
		init_Value();
		PropertyRecord = class PropertyRecord {
			/** Value for the property */
			value;
			/** The property description containing metadata for the property */
			property;
			/** Description for the property */
			description;
			/** Indicates if the property is read-only */
			isReadonly;
			/** Indicates if the property is disabled */
			isDisabled;
			/** Indicates if the property record represents merged properties */
			isMerged;
			/** Indicates if the property should be automatically expanded */
			autoExpand;
			/** Map containing any additional data */
			extendedData;
			/** Properties for link logic */
			links;
			/** Constructs a PropertyRecord instance */
			constructor(value, property) {
				this.value = value;
				this.property = property;
			}
			/** Creates a copy of this PropertyRecord with a new value and optionally a new PropertyDescription */
			copyWithNewValue(newValue, newDescription) {
				const rec = new PropertyRecord(newValue, newDescription ? newDescription : this.property);
				assignMemberIfExists(rec, this, "description");
				assignMemberIfExists(rec, this, "isReadonly");
				assignMemberIfExists(rec, this, "isDisabled");
				assignMemberIfExists(rec, this, "isMerged");
				assignMemberIfExists(rec, this, "autoExpand");
				assignMemberIfExists(rec, this, "extendedData");
				assignMemberIfExists(rec, this, "links");
				return rec;
			}
			/** Gets this property record value children records */
			getChildrenRecords() {
				switch (this.value.valueFormat) {
					case PropertyValueFormat.Primitive: return [];
					case PropertyValueFormat.Struct: return Object.values(this.value.members);
					case PropertyValueFormat.Array: return this.value.items;
				}
			}
			/** Creates a PropertyRecord based on a value string and an optional property description or name */
			static fromString(value, descriptionOrName) {
				let description;
				if (descriptionOrName && typeof descriptionOrName === "object") description = descriptionOrName;
				else if (descriptionOrName && typeof descriptionOrName === "string") description = {
					name: descriptionOrName,
					displayLabel: descriptionOrName,
					typename: StandardTypeNames.String
				};
				else description = {
					name: "string_value",
					displayLabel: "String Value",
					typename: StandardTypeNames.String
				};
				return new PropertyRecord({
					valueFormat: PropertyValueFormat.Primitive,
					value,
					displayValue: value
				}, description);
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/dialogs/UiDataProvider.js
var SyncPropertiesChangeEvent, UiDataProvider, PropertyChangeStatus;
function init_UiDataProvider() {
	return (init_UiDataProvider = __esmMin((() => {
		init_core_bentley();
		SyncPropertiesChangeEvent = class extends BeUiEvent {};
		UiDataProvider = class {
			/** Called by UI to inform data provider of changes. */
			processChangesInUi(_properties) {
				throw new Error("Derived UiDataProvider must implement this method to apply changes to a bulk set of properties.");
			}
			/** Get Sync UI Control Properties Event */
			onSyncPropertiesChangeEvent = new SyncPropertiesChangeEvent();
			onItemsReloadedEvent = new BeUiEvent();
			/** Called by UI to validate a property value */
			validateProperty(_item) {
				return { status: PropertyChangeStatus.Success };
			}
			/** Called to sync properties synchronously if a UiDataProvider is active for the UI */
			syncProperties(syncProperties) {
				this.fireSyncPropertiesEvent(syncProperties);
			}
			/** Called to inform listener that the UiDataProvider has updated values for the UI */
			fireSyncPropertiesEvent(syncProperties) {
				this.onSyncPropertiesChangeEvent.emit({ properties: syncProperties });
			}
			/** Called to inform listeners that new properties are ready for display in UI.
			*/
			fireItemsReloadedEvent() {
				this.onItemsReloadedEvent.emit();
			}
			/** Used to pass properties between a tool and an explicity defined UI dialog. See method supplyDialogItems in [[UiLayoutDataProvider]] for supplying
			* properties that will be used to dynamically create and layout control in a Dialog or Widget.
			*/
			supplyAvailableProperties() {
				throw new Error("Derived UiDataProvider that want to use DialogPropertyItems must implement this method. Not for use with dynamic UI controls.");
			}
		};
		(function(PropertyChangeStatus) {
			/** Property Change(s) Succeeded */
			PropertyChangeStatus[PropertyChangeStatus["Success"] = 0] = "Success";
			/** Error Processing Property Change(s) */
			PropertyChangeStatus[PropertyChangeStatus["Error"] = 2] = "Error";
		})(PropertyChangeStatus || (PropertyChangeStatus = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/dialogs/UiLayoutDataProvider.js
var DialogButtonType, DialogButtonStyle, UiLayoutDataProvider, DialogLayoutDataProvider;
function init_UiLayoutDataProvider() {
	return (init_UiLayoutDataProvider = __esmMin((() => {
		init_core_bentley();
		init_EditorParams();
		init_Record();
		init_Value();
		init_UiDataProvider();
		(function(DialogButtonType) {
			DialogButtonType["None"] = "";
			DialogButtonType["Close"] = "close";
			DialogButtonType["OK"] = "ok";
			DialogButtonType["Cancel"] = "cancel";
			DialogButtonType["Yes"] = "yes";
			DialogButtonType["No"] = "no";
			DialogButtonType["Retry"] = "retry";
			DialogButtonType["Next"] = "next";
			DialogButtonType["Previous"] = "previous";
		})(DialogButtonType || (DialogButtonType = {}));
		(function(DialogButtonStyle) {
			DialogButtonStyle["None"] = "";
			DialogButtonStyle["Primary"] = "iui-cta";
			DialogButtonStyle["Hollow"] = "iui-default";
			DialogButtonStyle["Blue"] = "iui-high-visibility";
		})(DialogButtonStyle || (DialogButtonStyle = {}));
		UiLayoutDataProvider = class UiLayoutDataProvider extends UiDataProvider {
			_items;
			/** Applies changes from one or more properties - some dialogs will use this to send a bulk set of changes back to the provider */
			processChangesInUi(properties) {
				properties.forEach((property) => this.applyUiPropertyChange(property));
				return { status: PropertyChangeStatus.Success };
			}
			/** Applies change of a single property - this is the default method used when property editors are dynamically generated. */
			// istanbul ignore next
			applyUiPropertyChange = (_updatedValue) => {
				throw new Error("Derived UiDataProvider should implement this to apply change to a single property.");
			};
			_rows;
			/** Array of dialog rows */
			get rows() {
				if (!this._rows) this._rows = this.layoutDialogRows();
				return this._rows;
			}
			loadItemsInternal(items) {
				this._items = items ? items : [];
				this._rows = this.layoutDialogRows();
			}
			/** Called by UI to request available properties that can be bound to user supplied UI components (See Tool1UiProvider for example). */
			// istanbul ignore next
			supplyDialogItems() {
				throw new Error("Derived UiDataProvider must implement this method to supply set of properties.");
			}
			get items() {
				if (void 0 === this._items) this.loadItemsInternal(this.supplyDialogItems());
				return this._items;
			}
			/** Called to inform listeners that new properties are ready for display in UI. */
			reloadDialogItems(emitEvent = true) {
				this.loadItemsInternal(this.supplyDialogItems());
				// istanbul ignore else
				if (emitEvent) this.fireItemsReloadedEvent();
			}
			/**
			* @internal
			*/
			layoutDialogRows() {
				const rows = [];
				this.items.forEach((item) => {
					const row = rows.find((value) => value.priority === item.editorPosition.rowPriority);
					if (row) row.items.push(item);
					else rows.push({
						priority: item.editorPosition.rowPriority,
						items: [item]
					});
				});
				rows.sort((a, b) => a.priority - b.priority);
				rows.forEach((row) => row.items.sort((a, b) => a.editorPosition.columnIndex - b.editorPosition.columnIndex));
				return rows;
			}
			/** Determines if a dialog item editor wants a label */
			static editorWantsLabel(item) {
				if (item.property.editor && item.property.editor.params) {
					// istanbul ignore else
					if (item.property.editor.params.find((param) => param.type === PropertyEditorParamTypes.SuppressEditorLabel)) return false;
				}
				return true;
			}
			/** Determines if a dialog items has an associated lock property */
			static hasAssociatedLockProperty(item) {
				return !!item.lockProperty;
			}
			/** Gets the disabled state for a given dialog item */
			static getItemDisabledState(baseDialogItem) {
				const dialogItem = baseDialogItem;
				// istanbul ignore else
				if (dialogItem === void 0 || dialogItem.lockProperty === void 0) return !!baseDialogItem.isDisabled;
				const value = dialogItem.lockProperty.value;
				// istanbul ignore next
				if (value === void 0) return !!baseDialogItem.isDisabled;
				return !value.value;
			}
			/** Gets a property record for a given dialog item */
			static getPropertyRecord = (dialogItem) => {
				const propertyValue = {
					valueFormat: PropertyValueFormat.Primitive,
					value: dialogItem.value.value,
					displayValue: dialogItem.value.displayValue
				};
				const record = new PropertyRecord(propertyValue, dialogItem.property);
				record.isDisabled = UiLayoutDataProvider.getItemDisabledState(dialogItem);
				return record;
			};
			/** Determines if a dialog row only contains button group editors */
			static onlyContainButtonGroupEditors(row) {
				for (const item of row.items)
 // istanbul ignore else
				if (UiLayoutDataProvider.hasAssociatedLockProperty(item) || void 0 === item.property.editor || "enum-buttongroup" !== item.property.editor.name || UiLayoutDataProvider.editorWantsLabel(item)) return false;
				return true;
			}
		};
		DialogLayoutDataProvider = class extends UiLayoutDataProvider {
			onButtonsReloadedEvent = new BeUiEvent();
			/** Called to inform listeners that modal dialog button data needs to be refreshed. */
			fireDialogButtonsReloadEvent() {
				this.onButtonsReloadedEvent.emit();
			}
			supplyButtonData() {
				const buttons = [];
				// istanbul ignore next
				buttons.push({
					type: DialogButtonType.OK,
					onClick: () => {}
				});
				// istanbul ignore next
				buttons.push({
					type: DialogButtonType.Cancel,
					onClick: () => {}
				});
				return buttons;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/items/BadgeType.js
var BadgeType;
function init_BadgeType() {
	return (init_BadgeType = __esmMin((() => {
		(function(BadgeType) {
			/** No badge. */
			BadgeType[BadgeType["None"] = 0] = "None";
			/** Standard Technical Preview badge. */
			BadgeType[BadgeType["TechnicalPreview"] = 1] = "TechnicalPreview";
			/** Standard New Feature badge. */
			BadgeType[BadgeType["New"] = 2] = "New";
		})(BadgeType || (BadgeType = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/items/ConditionalBooleanValue.js
var ConditionalBooleanValue;
function init_ConditionalBooleanValue() {
	return (init_ConditionalBooleanValue = __esmMin((() => {
		ConditionalBooleanValue = class ConditionalBooleanValue {
			testFunc;
			syncEventIds;
			_value;
			/**
			* Constructor for ConditionalBooleanValue. It is important that the same ConditionalBooleanValue instance is not used by multiple UI item definitions in order that the control's state is always rendered correctly.
			* @param testFunc Function to run to retrieve the value for the conditional. This function is run when refresh method is called or if the value is not defined in the constructor.
			* @param syncEventIds An array of eventId that should be monitored to determine when to run the refresh method.
			* @param value The default value for the conditional value. If not specified then the function is run to set the value when the value is retrieved.
			*/
			constructor(testFunc, syncEventIds, value) {
				this.testFunc = testFunc;
				this.syncEventIds = syncEventIds;
				this._value = value;
			}
			/** The current boolean value of the conditional. */
			get value() {
				if (void 0 !== this._value) return this._value;
				this._value = this.testFunc();
				return this._value;
			}
			/** Called to update the value by running the testFunc */
			refresh() {
				const newValue = this.testFunc();
				if (newValue !== this._value) {
					this._value = newValue;
					return true;
				}
				return false;
			}
			/** helper function to process properties defined as type ConditionalBooleanValue | boolean | undefined */
			static refreshValue(conditionalValue, eventIds) {
				if (void 0 === conditionalValue || !(conditionalValue instanceof ConditionalBooleanValue)) return false;
				if (conditionalValue.syncEventIds.some((value) => eventIds.has(value.toLowerCase()))) return conditionalValue.refresh();
				return false;
			}
			/** helper function to get boolean from a ConditionalBooleanValue | boolean | undefined */
			static getValue(conditionalValue) {
				if (void 0 === conditionalValue) return false;
				if (conditionalValue instanceof ConditionalBooleanValue) return conditionalValue.value;
				return conditionalValue;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/items/ConditionalStringValue.js
var ConditionalStringValue;
function init_ConditionalStringValue() {
	return (init_ConditionalStringValue = __esmMin((() => {
		ConditionalStringValue = class ConditionalStringValue {
			stringGetter;
			syncEventIds;
			_value;
			/**
			* Constructor for ConditionalStringValue. It is important that the same ConditionalStringValue instance is not used by multiple UI item definitions in order that the control's state is always rendered correctly.
			* @param stringGetter Function to run to retrieve the value for the conditional. This function is run when refresh method is called or if the value is not defined in the constructor.
			* @param syncEventIds An array of eventId that should be monitored to determine when to run the refresh method.
			* @param value The default value for the conditional value. If not specified then the function is run to set the value when the value is retrieved.
			*/
			constructor(stringGetter, syncEventIds, value) {
				this.stringGetter = stringGetter;
				this.syncEventIds = syncEventIds;
				this._value = value;
			}
			/** The current boolean value of the conditional. */
			get value() {
				if (void 0 !== this._value) return this._value;
				this._value = this.stringGetter();
				return this._value;
			}
			/** Called to update the value by running the stringGetter */
			refresh() {
				const newValue = this.stringGetter();
				if (newValue !== this._value) {
					this._value = newValue;
					return true;
				}
				return false;
			}
			/** helper function to process properties defined as type ConditionalStringValue | string | undefined
			* Return true if the value was updated.
			*/
			static refreshValue(conditionalValue, eventIds) {
				if (void 0 === conditionalValue || !(conditionalValue instanceof ConditionalStringValue)) return false;
				if (conditionalValue.syncEventIds.some((value) => eventIds.has(value.toLowerCase()))) return conditionalValue.refresh();
				return false;
			}
			/** helper function to get string from a ConditionalStringValue | string | undefined */
			static getValue(conditionalValue) {
				if (void 0 === conditionalValue) return void 0;
				if (conditionalValue instanceof ConditionalStringValue) return conditionalValue.value;
				return conditionalValue;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/items/RelativePosition.js
var RelativePosition;
function init_RelativePosition() {
	return (init_RelativePosition = __esmMin((() => {
		(function(RelativePosition) {
			RelativePosition[RelativePosition["Left"] = 0] = "Left";
			RelativePosition[RelativePosition["Top"] = 1] = "Top";
			RelativePosition[RelativePosition["Right"] = 2] = "Right";
			RelativePosition[RelativePosition["Bottom"] = 3] = "Bottom";
			RelativePosition[RelativePosition["TopLeft"] = 4] = "TopLeft";
			RelativePosition[RelativePosition["TopRight"] = 5] = "TopRight";
			RelativePosition[RelativePosition["BottomLeft"] = 6] = "BottomLeft";
			RelativePosition[RelativePosition["BottomRight"] = 7] = "BottomRight";
			RelativePosition[RelativePosition["RightTop"] = 8] = "RightTop";
			RelativePosition[RelativePosition["LeftTop"] = 9] = "LeftTop";
		})(RelativePosition || (RelativePosition = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/notification/MessagePresenter.js
var DisplayMessageType;
function init_MessagePresenter() {
	return (init_MessagePresenter = __esmMin((() => {
		(function(DisplayMessageType) {
			/** Temporary message that displays at the bottom of the screen. */
			DisplayMessageType[DisplayMessageType["Toast"] = 0] = "Toast";
			/** Message with a close button that displays at the bottom of the screen. */
			DisplayMessageType[DisplayMessageType["Sticky"] = 2] = "Sticky";
			/** Message that displays near a specified HTML element. */
			DisplayMessageType[DisplayMessageType["InputField"] = 3] = "InputField";
			/** Modal message box. */
			DisplayMessageType[DisplayMessageType["Alert"] = 4] = "Alert";
		})(DisplayMessageType || (DisplayMessageType = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/notification/MessageSeverity.js
var MessageSeverity;
function init_MessageSeverity() {
	return (init_MessageSeverity = __esmMin((() => {
		(function(MessageSeverity) {
			MessageSeverity[MessageSeverity["None"] = 0] = "None";
			MessageSeverity[MessageSeverity["Information"] = 1] = "Information";
			MessageSeverity[MessageSeverity["Question"] = 2] = "Question";
			MessageSeverity[MessageSeverity["Warning"] = 3] = "Warning";
			MessageSeverity[MessageSeverity["Error"] = 4] = "Error";
			MessageSeverity[MessageSeverity["Fatal"] = 5] = "Fatal";
			MessageSeverity[MessageSeverity["Success"] = 6] = "Success";
		})(MessageSeverity || (MessageSeverity = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/properties/StandardEditorNames.js
var StandardEditorNames;
function init_StandardEditorNames() {
	return (init_StandardEditorNames = __esmMin((() => {
		(function(StandardEditorNames) {
			StandardEditorNames["ColorPicker"] = "color-picker";
			StandardEditorNames["LongDate"] = "long-date-picker";
			StandardEditorNames["ShortDate"] = "short-date-picker";
			StandardEditorNames["EnumButtonGroup"] = "enum-buttongroup";
			StandardEditorNames["IconPicker"] = "icon-picker";
			StandardEditorNames["MultiLine"] = "multi-line";
			StandardEditorNames["NumberCustom"] = "number-custom";
			StandardEditorNames["NumericInput"] = "numeric-input";
			StandardEditorNames["Slider"] = "slider";
			StandardEditorNames["Toggle"] = "toggle";
			StandardEditorNames["WeightPicker"] = "weight-picker";
			StandardEditorNames["ImageCheckBox"] = "image-check-box";
			StandardEditorNames["ThemedEnum"] = "themed-enum";
		})(StandardEditorNames || (StandardEditorNames = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/properties/Description.js
var PropertyDescriptionHelper;
function init_Description() {
	return (init_Description = __esmMin((() => {
		init_EditorParams();
		init_StandardEditorNames();
		init_StandardTypeNames();
		PropertyDescriptionHelper = class {
			/** Builds a number description with a "weight-picker" editor name
			* @public
			*/
			static buildWeightPickerDescription(name, label, additionalParams = []) {
				return {
					name,
					displayLabel: label,
					typename: StandardTypeNames.Number,
					editor: {
						name: StandardEditorNames.WeightPicker,
						params: additionalParams
					}
				};
			}
			/** Builds an editor that uses [NumberInput]($core-react) control
			* @public
			*/
			static buildNumberEditorDescription(name, label, overrideParams, additionalParams = []) {
				const editorParams = [{
					type: PropertyEditorParamTypes.Range,
					step: 1,
					precision: 0,
					...overrideParams
				}, ...additionalParams];
				const editor = {
					name: StandardEditorNames.NumericInput,
					params: editorParams
				};
				return {
					name,
					displayLabel: label,
					typename: StandardTypeNames.Number,
					editor
				};
			}
			/** Builds a string description
			* @public
			*/
			static buildTextEditorDescription(name, label, additionalParams = []) {
				const editor = { params: additionalParams };
				return {
					name,
					displayLabel: label,
					typename: StandardTypeNames.String,
					editor
				};
			}
			/** Builds an enum description
			* @public
			*/
			static buildEnumPicklistEditorDescription(name, label, choices, additionalParams = []) {
				const editor = additionalParams.length ? { params: additionalParams } : void 0;
				return {
					name,
					displayLabel: label,
					typename: StandardTypeNames.Enum,
					editor,
					enum: { choices }
				};
			}
			/** Builds a number description for a tool settings or dialog property that will display a "color-picker" control.
			* @public
			*/
			static buildColorPickerDescription(name, label, colorValues, numColumns, additionalParams = []) {
				const editorParams = [{
					type: PropertyEditorParamTypes.ColorData,
					colorValues,
					numColumns
				}, ...additionalParams];
				return {
					name,
					displayLabel: label,
					typename: StandardTypeNames.Number,
					editor: {
						name: StandardEditorNames.ColorPicker,
						params: editorParams
					}
				};
			}
			/** Builds a boolean description for a tool settings or dialog property that will display a "toggle" control.
			* @public
			*/
			static buildToggleDescription(name, label, additionalParams = []) {
				return {
					name,
					displayLabel: label,
					typename: StandardTypeNames.Boolean,
					editor: {
						name: StandardEditorNames.Toggle,
						params: additionalParams
					}
				};
			}
			/** Builds a boolean description for a tool settings or dialog property that will display a "image-check-box" control.
			* @public
			*/
			static buildImageCheckBoxDescription(name, label, imageOff, imageOn, additionalParams = []) {
				const editorParams = [{
					type: PropertyEditorParamTypes.CheckBoxImages,
					imageOff,
					imageOn
				}, ...additionalParams];
				return {
					name,
					displayLabel: label,
					typename: StandardTypeNames.Boolean,
					editor: {
						name: StandardEditorNames.ImageCheckBox,
						params: editorParams
					}
				};
			}
			/** Builds a boolean description for a tool settings or dialog property that will display a checkbox control.
			* @public
			*/
			static buildCheckboxDescription(name, label, additionalParams = []) {
				const editor = { params: additionalParams };
				return {
					name,
					displayLabel: label,
					typename: StandardTypeNames.Boolean,
					editor
				};
			}
			/** Builds a property description for a tool settings or dialog `lock` property. This will create a checkbox control with no label.
			* @public
			*/
			static buildLockPropertyDescription(name, additionalParams = []) {
				const editor = { params: [{
					type: PropertyEditorParamTypes.SuppressEditorLabel,
					suppressLabelPlaceholder: true
				}, ...additionalParams] };
				return {
					name,
					displayLabel: "",
					typename: StandardTypeNames.Boolean,
					editor
				};
			}
			/** Bumps an enum property description value
			* @public
			*/
			static async bumpEnumProperty(description, value) {
				let choices;
				if (description.enum) {
					if (description.enum.choices instanceof Promise) choices = await description.enum.choices;
					else choices = description.enum.choices;
				}
				if (!choices || choices.length === 0) return value;
				let choiceIndex = choices.findIndex((choice) => choice.value === value);
				if (choiceIndex < 0) return value;
				choiceIndex++;
				if (choiceIndex >= choices.length) choiceIndex = 0;
				return choices[choiceIndex].value;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/quantity/BaseQuantityDescription.js
var BaseQuantityDescription;
function init_BaseQuantityDescription() {
	return (init_BaseQuantityDescription = __esmMin((() => {
		init_EditorParams();
		init_StandardTypeNames();
		init_StandardEditorNames();
		BaseQuantityDescription = class {
			name;
			displayLabel;
			typename;
			editor;
			kindOfQuantityName;
			constructor(name, displayLabel, iconSpec, kindOfQuantityName) {
				this.name = name;
				this.displayLabel = displayLabel;
				this.kindOfQuantityName = kindOfQuantityName;
				this.typename = StandardTypeNames.Number;
				this.editor = {
					name: StandardEditorNames.NumberCustom,
					params: [{
						type: PropertyEditorParamTypes.CustomFormattedNumber,
						formatFunction: this.format,
						parseFunction: this.parse
					}]
				};
				// istanbul ignore else
				if (iconSpec) {
					const params = {
						type: PropertyEditorParamTypes.Icon,
						definition: { iconSpec }
					};
					this.editor.params.push(params);
				}
			}
			format = (numberValue) => {
				return this.formatValue(numberValue);
			};
			parse = (userInput) => {
				return this.parseString(userInput);
			};
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/toolbars/ToolbarItem.js
var ToolbarItemUtilities;
function init_ToolbarItem() {
	return (init_ToolbarItem = __esmMin((() => {
		ToolbarItemUtilities = class {
			/** Creates an Action Button */
			static createActionButton = (id, itemPriority, icon, label, execute, overrides) => ({
				id,
				itemPriority,
				icon,
				label,
				execute,
				...overrides
			});
			/** Creates a Group button. */
			static createGroupButton = (id, itemPriority, icon, label, items, overrides) => ({
				id,
				itemPriority,
				icon,
				label,
				items,
				...overrides
			});
			/** ActionButton type guard. */
			static isActionButton(item) {
				return item.execute !== void 0;
			}
			/** GroupButton type guard. */
			static isGroupButton(item) {
				return item.items !== void 0;
			}
			/** CustomButtonDefinition type guard. */
			static isCustomDefinition(item) {
				return !!item.isCustom;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/utils/misc.js
var getClassName;
function init_misc() {
	return (init_misc = __esmMin((() => {
		getClassName = (obj) => {
			let className = "";
			if (obj) {
				if (obj.name) className = obj.name;
				else if (obj.constructor && obj.constructor.name) className = obj.constructor.name;
			}
			return className;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/utils/IconSpecUtilities.js
var IconSpecUtilities;
function init_IconSpecUtilities() {
	return (init_IconSpecUtilities = __esmMin((() => {
		IconSpecUtilities = class IconSpecUtilities {
			/** Prefix for an SVG IconSpec loaded with the Sprite loader */
			static SVG_PREFIX = "svg:";
			static WEB_COMPONENT_PREFIX = "webSvg:";
			/** Create an IconSpec for an SVG loaded into web component with svg-loader
			* @public @deprecated in 4.3 - will not be removed until after 2026-06-13. AppUI libraries > 4.7.x support loading SVGs sources without prefixes, eliminating the need for this utility.
			*/
			static createWebComponentIconSpec(srcString) {
				return `${IconSpecUtilities.WEB_COMPONENT_PREFIX}${srcString}`;
			}
			/** Get the SVG Source from an svg-loader IconSpec
			* @public @deprecated in 4.3 - will not be removed until after 2026-06-13. AppUI libraries > 4.7.x support loading SVGs sources without prefixes, eliminating the need for this utility.
			*/
			static getWebComponentSource(iconSpec) {
				if (iconSpec.startsWith(IconSpecUtilities.WEB_COMPONENT_PREFIX) && iconSpec.length > 7) return iconSpec.slice(7);
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/utils/UiError.js
var UiError;
function init_UiError() {
	return (init_UiError = __esmMin((() => {
		init_core_bentley();
		UiError = class extends BentleyError {
			category;
			/** Constructs UiError using BentleyError. */
			constructor(category, message, errorNumber = BentleyStatus.ERROR, getMetaData) {
				super(errorNumber, message, getMetaData);
				this.category = category;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/utils/UiEventDispatcher.js
var UiSyncEvent, UiEventDispatcher;
function init_UiEventDispatcher() {
	return (init_UiEventDispatcher = __esmMin((() => {
		init_core_bentley();
		UiSyncEvent = class extends BeUiEvent {};
		UiEventDispatcher = class {
			_syncEventTimerId;
			_eventIds;
			_eventIdAdded;
			_uiSyncEvent;
			_timeoutPeriod;
			_secondaryTimeoutPeriod;
			constructor() {
				this._eventIds = /* @__PURE__ */ new Set();
				this._eventIdAdded = false;
				this._uiSyncEvent = new UiSyncEvent();
				this._timeoutPeriod = 100;
				this._secondaryTimeoutPeriod = this._timeoutPeriod / 2;
			}
			/** @internal - used for testing only */
			/* istanbul ignore next */
			setTimeoutPeriod(period) {
				this._timeoutPeriod = period;
				this._secondaryTimeoutPeriod = Math.floor(this._timeoutPeriod / 2);
				if (this._secondaryTimeoutPeriod < 1) this._secondaryTimeoutPeriod = 1;
				if (this._syncEventTimerId) {
					window.clearTimeout(this._syncEventTimerId);
					this._syncEventTimerId = void 0;
				}
				if (this._eventIds) this._eventIds.clear();
				this._eventIdAdded = false;
			}
			/** The current timeout period */
			get timeoutPeriod() {
				return this._timeoutPeriod;
			}
			/** Return set of event ids that will be sent to listeners/. */
			get syncEventIds() {
				return this._eventIds;
			}
			/** Return UiSyncEvent so callers can register an event callback. */
			get onSyncUiEvent() {
				return this._uiSyncEvent;
			}
			/** Immediately trigger sync event processing. */
			dispatchImmediateSyncUiEvent(eventId) {
				const eventIds = /* @__PURE__ */ new Set();
				eventIds.add(eventId.toLowerCase());
				this.onSyncUiEvent.emit({ eventIds });
			}
			/** Save eventId in Set for processing. */
			dispatchSyncUiEvent(eventId) {
				// istanbul ignore if
				if (0 === this._timeoutPeriod) return;
				this.syncEventIds.add(eventId.toLowerCase());
				if (!this._syncEventTimerId) this._syncEventTimerId = window.setTimeout(() => {
					this.checkForAdditionalIds();
				}, this._timeoutPeriod);
				else this._eventIdAdded = true;
			}
			/** Save multiple eventIds in Set for processing. */
			dispatchSyncUiEvents(eventIds) {
				// istanbul ignore if
				if (0 === this._timeoutPeriod) return;
				eventIds.forEach((id) => this.syncEventIds.add(id.toLowerCase()));
				// istanbul ignore else
				if (!this._syncEventTimerId) this._syncEventTimerId = window.setTimeout(() => {
					this.checkForAdditionalIds();
				}, this._timeoutPeriod);
				else this._eventIdAdded = true;
			}
			/** Trigger registered event processing when timer has expired and no addition eventId are added. */
			checkForAdditionalIds() {
				/* istanbul ignore else */
				if (!this._eventIdAdded) {
					// istanbul ignore else
					if (this._syncEventTimerId) {
						window.clearTimeout(this._syncEventTimerId);
						this._syncEventTimerId = void 0;
					}
					this._eventIdAdded = false;
					// istanbul ignore else
					if (this.syncEventIds.size > 0) {
						const eventIds = /* @__PURE__ */ new Set();
						this.syncEventIds.forEach((value) => eventIds.add(value));
						this._eventIds.clear();
						this.onSyncUiEvent.emit({ eventIds });
					}
					return;
				}
				// istanbul ignore next
				if (this._syncEventTimerId) {
					window.clearTimeout(this._syncEventTimerId);
					this._syncEventTimerId = void 0;
				}
				// istanbul ignore next
				this._eventIdAdded = false;
				// istanbul ignore next
				this._syncEventTimerId = window.setTimeout(() => {
					this.checkForAdditionalIds();
				}, this._secondaryTimeoutPeriod);
			}
			/** Checks to see if an eventId of interest is contained in the set of eventIds */
			hasEventOfInterest(eventIds, idsOfInterest) {
				/* istanbul ignore else */
				if (idsOfInterest.length > 0 && idsOfInterest.some((value) => eventIds.has(value.toLowerCase()))) return true;
				return false;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/utils/UiEvent.js
var UiEvent;
function init_UiEvent() {
	return (init_UiEvent = __esmMin((() => {
		init_core_bentley();
		UiEvent = class extends BeUiEvent {};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/utils/filter/filters.js
function isWhitespace(code) {
	return code === CharCode.Space || code === CharCode.Tab || code === CharCode.LineFeed || code === CharCode.CarriageReturn;
}
function isWordSeparator(code) {
	return isWhitespace(code) || wordSeparators.has(code);
}
function charactersMatch(codeA, codeB) {
	return codeA === codeB || isWordSeparator(codeA) && isWordSeparator(codeB);
}
function join(head, tail) {
	if (tail.length === 0) tail = [head];
	else if (head.end === tail[0].start) tail[0].start = head.start;
	else tail.unshift(head);
	return tail;
}
/**
* Matches beginning of words supporting non-ASCII languages.
* @param word Filter string
* @param target String being searched
* @param contiguous - If true the filter string must be found "contiguous" in the searched string (E.g. "pul" will match "Git: Pull").
* Otherwise also matches sub string of the word with beginnings of the words in the target (e.g. "gp" or "g p" will match "Git: Pull").
* Useful in cases where the target is words (e.g. command labels)
* @internal @deprecated in 4.3 - will not be removed until after 2026-06-13. Use `matchesWords` from @itwin/core-react instead. Though internal, this requires deprecation due to known public usage in @itwin/core-react.
*/
function matchesWords(word, target, contiguous = false) {
	if (!target || target.length === 0) return null;
	let result = null;
	let i = 0;
	word = word.toLowerCase();
	target = target.toLowerCase();
	while (i < target.length && (result = _matchesWords(word, target, 0, i, contiguous)) === null) i = nextWord(target, i + 1);
	return result;
}
function _matchesWords(word, target, i, j, contiguous) {
	if (i === word.length) return [];
	else if (j === target.length) return null;
	else if (!charactersMatch(word.charCodeAt(i), target.charCodeAt(j))) return null;
	else {
		let result = null;
		let nextWordIndex = j + 1;
		result = _matchesWords(word, target, i + 1, j + 1, contiguous);
		// istanbul ignore else
		if (!contiguous) while (!result && (nextWordIndex = nextWord(target, nextWordIndex)) < target.length) {
			result = _matchesWords(word, target, i + 1, nextWordIndex, contiguous);
			nextWordIndex++;
		}
		return result === null ? null : join({
			start: j,
			end: j + 1
		}, result);
	}
}
function nextWord(word, start) {
	for (let i = start; i < word.length; i++) if (isWordSeparator(word.charCodeAt(i)) || i > 0 && isWordSeparator(word.charCodeAt(i - 1))) return i;
	return word.length;
}
var CharCode, wordSeparators;
function init_filters() {
	return (init_filters = __esmMin((() => {
		(function(CharCode) {
			CharCode[CharCode["Space"] = 32] = "Space";
			CharCode[CharCode["Tab"] = 9] = "Tab";
			CharCode[CharCode["LineFeed"] = 10] = "LineFeed";
			CharCode[CharCode["CarriageReturn"] = 13] = "CarriageReturn";
		})(CharCode || (CharCode = {}));
		wordSeparators = /* @__PURE__ */ new Set();
		"`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?".split("").forEach((s) => wordSeparators.add(s.charCodeAt(0)));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract.js
var appui_abstract_exports = /* @__PURE__ */ __exportAll({
	AlternateDateFormats: () => AlternateDateFormats,
	BadgeType: () => BadgeType,
	BaseQuantityDescription: () => BaseQuantityDescription,
	ConditionalBooleanValue: () => ConditionalBooleanValue,
	ConditionalStringValue: () => ConditionalStringValue,
	DialogButtonStyle: () => DialogButtonStyle,
	DialogButtonType: () => DialogButtonType,
	DialogLayoutDataProvider: () => DialogLayoutDataProvider,
	DialogProperty: () => DialogProperty,
	DisplayMessageType: () => DisplayMessageType,
	FunctionKey: () => FunctionKey,
	GenericUiEvent: () => GenericUiEvent,
	IconSpecUtilities: () => IconSpecUtilities,
	MessageSeverity: () => MessageSeverity,
	PropertyChangeStatus: () => PropertyChangeStatus,
	PropertyDescriptionHelper: () => PropertyDescriptionHelper,
	PropertyEditorParamTypes: () => PropertyEditorParamTypes,
	PropertyRecord: () => PropertyRecord,
	PropertyValueFormat: () => PropertyValueFormat,
	RelativePosition: () => RelativePosition,
	SpecialKey: () => SpecialKey,
	StandardContentLayouts: () => StandardContentLayouts,
	StandardEditorNames: () => StandardEditorNames,
	StandardTypeNames: () => StandardTypeNames,
	SyncPropertiesChangeEvent: () => SyncPropertiesChangeEvent,
	TimeDisplay: () => TimeDisplay,
	ToolbarItemUtilities: () => ToolbarItemUtilities,
	UiAdmin: () => UiAdmin,
	UiDataProvider: () => UiDataProvider,
	UiError: () => UiError,
	UiEvent: () => UiEvent,
	UiEventDispatcher: () => UiEventDispatcher,
	UiLayoutDataProvider: () => UiLayoutDataProvider,
	UiSyncEvent: () => UiSyncEvent,
	getClassName: () => getClassName,
	isArrowKey: () => isArrowKey,
	isButtonGroupEditorParams: () => isButtonGroupEditorParams,
	isColorEditorParams: () => isColorEditorParams,
	isCustomFormattedNumberParams: () => isCustomFormattedNumberParams,
	isIconListEditorParams: () => isIconListEditorParams,
	isInputEditorSizeParams: () => isInputEditorSizeParams,
	isSuppressLabelEditorParams: () => isSuppressLabelEditorParams,
	matchesWords: () => matchesWords
});
function init_appui_abstract() {
	return (init_appui_abstract = __esmMin((() => {
		init_UiAdmin();
		init_KeyboardKey();
		init_StandardContentLayouts();
		init_DialogItem();
		init_UiLayoutDataProvider();
		init_UiDataProvider();
		init_BadgeType();
		init_ConditionalBooleanValue();
		init_ConditionalStringValue();
		init_RelativePosition();
		init_MessagePresenter();
		init_MessageSeverity();
		init_Description();
		init_EditorParams();
		init_Record();
		init_StandardEditorNames();
		init_StandardTypeNames();
		init_Value();
		init_BaseQuantityDescription();
		init_ToolbarItem();
		init_misc();
		init_IconSpecUtilities();
		init_UiError();
		init_UiEventDispatcher();
		init_UiEvent();
		init_filters();
	})))();
}
/** @docs-package-description
* The appui-abstract package contains abstractions for UI controls, such as toolbars, buttons and menus.
* For more information, see [UI]($docs/ui/index.md).
*/
/**
* @docs-group-description ContentView
* Classes and interfaces used with Content Layouts.
*/
/**
* @docs-group-description Dialog
* Interfaces and classes for generating UI items for Dialogs.
*/
/**
* @docs-group-description Item
* Classes for working with an Item in a Toolbar, Widget, Backstage or Context Menu
*/
/**
* @docs-group-description Notification
* Interfaces and enums for working with a message
*/
/**
* @docs-group-description Properties
* Properties system for data input and formatting.
*/
/**
* @docs-group-description Toolbar
* Classes for creating and managing items in a toolbar.
*/
/**
* @docs-group-description UiAdmin
* Abstractions for UI controls, such as toolbars, buttons and menus and are callable from IModelApp.uiAdmin in core-frontend.
*/
/**
* @docs-group-description UiItemsProvider
* Interface for specifying UI items to be inserted at runtime.
*/
/**
* @docs-group-description Utilities
* Various utility classes for working with a UI.
*/
//#endregion
//#region ../../node_modules/.pnpm/ts-key-enum@2.0.13/node_modules/ts-key-enum/dist/js/Key.enum.js
var require_Key_enum = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	(function(Key) {
		/**
		* The user agent wasn't able to map the event's virtual keycode to a
		* specific key value.
		* This can happen due to hardware or software constraints, or because of
		* constraints around the platform on which the user agent is running.
		*/
		Key["Unidentified"] = "Unidentified";
		/** The Alt (Alternative) key. */
		Key["Alt"] = "Alt";
		/**
		* The AltGr or AltGraph (Alternate Graphics) key.
		* Enables the ISO Level 3 shift modifier (where Shift is the
		* level 2 modifier).
		*/
		Key["AltGraph"] = "AltGraph";
		/**
		* The Caps Lock key. Toggles the capital character lock on and
		* off for subsequent input.
		*/
		Key["CapsLock"] = "CapsLock";
		/**
		* The Control, Ctrl, or Ctl key. Allows
		* typing control characters.
		*/
		Key["Control"] = "Control";
		/**
		* The Fn (Function modifier) key. Used to allow generating
		* function key (F1–F15, for instance) characters on
		* keyboards without a dedicated function key area. Often handled in
		* hardware so that events aren't generated for this key.
		*/
		Key["Fn"] = "Fn";
		/**
		* The FnLock or F-Lock (Function Lock) key.Toggles
		* the function key mode described by "Fn" on and off. Often
		* handled in hardware so that events aren't generated for this key.
		*/
		Key["FnLock"] = "FnLock";
		/** The Hyper key. */
		Key["Hyper"] = "Hyper";
		/**
		* The Meta key. Allows issuing special command inputs. This is
		* the Windows logo key, or the Command or
		* ⌘ key on Mac keyboards.
		*/
		Key["Meta"] = "Meta";
		/**
		* The NumLock (Number Lock) key. Toggles the numeric keypad
		* between number entry some other mode (often directional arrows).
		*/
		Key["NumLock"] = "NumLock";
		/**
		* The Scroll Lock key. Toggles between scrolling and cursor
		* movement modes.
		*/
		Key["ScrollLock"] = "ScrollLock";
		/**
		* The Shift key. Modifies keystrokes to allow typing upper (or
		* other) case letters, and to support typing punctuation and other special
		* characters.
		*/
		Key["Shift"] = "Shift";
		/** The Super key. */
		Key["Super"] = "Super";
		/** The Symbol modifier key (found on certain virtual keyboards). */
		Key["Symbol"] = "Symbol";
		/** The Symbol Lock key. */
		Key["SymbolLock"] = "SymbolLock";
		/**
		* The Enter or ↵ key (sometimes labeled
		* Return).
		*/
		Key["Enter"] = "Enter";
		/** The Horizontal Tab key, Tab. */
		Key["Tab"] = "Tab";
		/** The down arrow key. */
		Key["ArrowDown"] = "ArrowDown";
		/** The left arrow key. */
		Key["ArrowLeft"] = "ArrowLeft";
		/** The right arrow key. */
		Key["ArrowRight"] = "ArrowRight";
		/** The up arrow key. */
		Key["ArrowUp"] = "ArrowUp";
		/** The End key. Moves to the end of content. */
		Key["End"] = "End";
		/** The Home key. Moves to the start of content. */
		Key["Home"] = "Home";
		/**
		* The Page Down (or PgDn) key. Scrolls down or
		* displays the next page of content.
		*/
		Key["PageDown"] = "PageDown";
		/**
		* The Page Up (or PgUp) key. Scrolls up or displays
		* the previous page of content.
		*/
		Key["PageUp"] = "PageUp";
		/**
		* The Backspace key. This key is labeled Delete on
		* Mac keyboards.
		*/
		Key["Backspace"] = "Backspace";
		/** The Clear key. Removes the currently selected input. */
		Key["Clear"] = "Clear";
		/** The Copy key (on certain extended keyboards). */
		Key["Copy"] = "Copy";
		/** The Cursor Select key, CrSel. */
		Key["CrSel"] = "CrSel";
		/** The Cut key (on certain extended keyboards). */
		Key["Cut"] = "Cut";
		/** The Delete key, Del. */
		Key["Delete"] = "Delete";
		/**
		* Erase to End of Field. Deletes all characters from the current cursor
		* position to the end of the current field.
		*/
		Key["EraseEof"] = "EraseEof";
		/** The ExSel (Extend Selection) key. */
		Key["ExSel"] = "ExSel";
		/**
		* The Insert key, Ins. Toggles between inserting and
		* overwriting text.
		*/
		Key["Insert"] = "Insert";
		/** Paste from the clipboard. */
		Key["Paste"] = "Paste";
		/** Redo the last action. */
		Key["Redo"] = "Redo";
		/** Undo the last action. */
		Key["Undo"] = "Undo";
		/**
		* The Accept, Commit, or OK key or
		* button. Accepts the currently selected option or input method sequence
		* conversion.
		*/
		Key["Accept"] = "Accept";
		/** The Again key. Redoes or repeats a previous action. */
		Key["Again"] = "Again";
		/** The Attn (Attention) key. */
		Key["Attn"] = "Attn";
		/** The Cancel key. */
		Key["Cancel"] = "Cancel";
		/**
		* Shows the context menu. Typically found between the
		* Windows (or OS) key and the Control key
		* on the right side of the keyboard.
		*/
		Key["ContextMenu"] = "ContextMenu";
		/**
		* The Esc (Escape) key. Typically used as an exit, cancel, or
		* "escape this operation" button. Historically, the Escape character was
		* used to signal the start of a special control sequence of characters
		* called an "escape sequence."
		*/
		Key["Escape"] = "Escape";
		/** The Execute key. */
		Key["Execute"] = "Execute";
		/**
		* The Find key. Opens an interface (typically a dialog box) for
		* performing a find/search operation.
		*/
		Key["Find"] = "Find";
		/** The Finish key. */
		Key["Finish"] = "Finish";
		/**
		* The Help key. Opens or toggles the display of help
		* information.
		*/
		Key["Help"] = "Help";
		/**
		* The Pause key. Pauses the current application or state, if
		* applicable.
		* Note: This shouldn't be confused with the
		* "MediaPause" key value, which is used for media
		* controllers, rather than to control applications and processes.
		*/
		Key["Pause"] = "Pause";
		/**
		* The Play key. Resumes a previously paused application, if
		* applicable.
		* Note: This shouldn't be confused with the
		* "MediaPlay" key value, which is used for media
		* controllers, rather than to control applications and processes.
		*/
		Key["Play"] = "Play";
		/** The Props (Properties) key. */
		Key["Props"] = "Props";
		/** The Select key. */
		Key["Select"] = "Select";
		/** The ZoomIn key. */
		Key["ZoomIn"] = "ZoomIn";
		/** The ZoomOut key. */
		Key["ZoomOut"] = "ZoomOut";
		/**
		* The Brightness Down key. Typically used to reduce the brightness of the
		* display.
		*/
		Key["BrightnessDown"] = "BrightnessDown";
		/**
		* The Brightness Up key. Typically increases the brightness of the
		* display.
		*/
		Key["BrightnessUp"] = "BrightnessUp";
		/**
		* The Eject key. Ejects removable media (or toggles an optical
		* storage device tray open and closed).
		*/
		Key["Eject"] = "Eject";
		/** The LogOff key. */
		Key["LogOff"] = "LogOff";
		/**
		* The Power button or key, to toggle power on and off.
		* Note: Not all systems pass this key through to the
		* user agent.
		*/
		Key["Power"] = "Power";
		/**
		* The PowerOff or PowerDown key. Shuts off the
		* system.
		*/
		Key["PowerOff"] = "PowerOff";
		/**
		* The PrintScreen or PrtScr key. Sometimes
		* SnapShot. Captures the screen and prints it or saves it to
		* disk.
		*/
		Key["PrintScreen"] = "PrintScreen";
		/**
		* The Hibernate key. This saves the state of the computer to
		* disk and then shuts down; the computer can be returned to its previous
		* state by restoring the saved state information.
		*/
		Key["Hibernate"] = "Hibernate";
		/**
		* The Standby key. (Also known as Suspend or
		* Sleep.) This turns off the display and puts the computer in a
		* low power consumption mode, without completely powering off.
		*/
		Key["Standby"] = "Standby";
		/**
		* The WakeUp key. Used to wake the computer from the
		* hibernation or standby modes.
		*/
		Key["WakeUp"] = "WakeUp";
		/**
		* The All Candidates key, which starts multi-candidate mode, in
		* which multiple candidates are displayed for the ongoing input.
		*/
		Key["AllCandidates"] = "AllCandidates";
		/** The Alphanumeric key. */
		Key["Alphanumeric"] = "Alphanumeric";
		/**
		* The Code Input key, which enables code input mode, which lets
		* the user enter characters by typing their code points (their Unicode
		* character numbers, typically).
		*/
		Key["CodeInput"] = "CodeInput";
		/** The Compose key. */
		Key["Compose"] = "Compose";
		/**
		* The Convert key, which instructs the IME to convert the
		* current input method sequence into the resulting character.
		*/
		Key["Convert"] = "Convert";
		/**
		* A dead "combining" key; that is, a key which is used in tandem with
		* other keys to generate accented and other modified characters. If
		* pressed by itself, it doesn't generate a character.
		* If you wish to identify which specific dead key was pressed (in cases
		* where more than one exists), you can do so by examining the
		* KeyboardEvent's associated
		* compositionupdate event's
		* data property.
		*/
		Key["Dead"] = "Dead";
		/**
		* The Final (Final Mode) key is used on some Asian keyboards to
		* enter final mode when using IMEs.
		*/
		Key["FinalMode"] = "FinalMode";
		/**
		* Switches to the first character group on an
		* ISO/IEC 9995 keyboard. Each key may have multiple groups of characters, each in its own
		* column. Pressing this key instructs the device to interpret keypresses
		* as coming from the first column on subsequent keystrokes.
		*/
		Key["GroupFirst"] = "GroupFirst";
		/**
		* Switches to the last character group on an
		* ISO/IEC 9995 keyboard.
		*/
		Key["GroupLast"] = "GroupLast";
		/**
		* Switches to the next character group on an
		* ISO/IEC 9995 keyboard.
		*/
		Key["GroupNext"] = "GroupNext";
		/**
		* Switches to the previous character group on an
		* ISO/IEC 9995 keyboard.
		*/
		Key["GroupPrevious"] = "GroupPrevious";
		/** The Mode Change key. Toggles or cycles among input modes of IMEs. */
		Key["ModeChange"] = "ModeChange";
		/**
		* The Next Candidate function key. Selects the next possible match for the
		* ongoing input.
		*/
		Key["NextCandidate"] = "NextCandidate";
		/**
		* The NonConvert ("Don't convert") key. This accepts the
		* current input method sequence without running conversion when using an
		* IME.
		*/
		Key["NonConvert"] = "NonConvert";
		/**
		* The Previous Candidate key. Selects the previous possible match for the
		* ongoing input.
		*/
		Key["PreviousCandidate"] = "PreviousCandidate";
		/** The Process key. Instructs the IME to process the conversion. */
		Key["Process"] = "Process";
		/**
		* The Single Candidate key. Enables single candidate mode (as opposed to
		* multi-candidate mode); in this mode, only one candidate is displayed at
		* a time.
		*/
		Key["SingleCandidate"] = "SingleCandidate";
		/**
		* The Hangul (Korean character set) mode key, which toggles
		* between Hangul and English entry modes.
		*/
		Key["HangulMode"] = "HangulMode";
		/**
		* Selects the Hanja mode, for converting Hangul characters to the more
		* specific Hanja characters.
		*/
		Key["HanjaMode"] = "HanjaMode";
		/**
		* Selects the Junja mode, in which Korean is represented using single-byte
		* Latin characters.
		*/
		Key["JunjaMode"] = "JunjaMode";
		/**
		* The Eisu key. This key's purpose is defined by the IME, but
		* may be used to close the IME.
		*/
		Key["Eisu"] = "Eisu";
		/** The Hankaku (half-width characters) key. */
		Key["Hankaku"] = "Hankaku";
		/** The Hiragana key; selects Kana characters mode. */
		Key["Hiragana"] = "Hiragana";
		/** Toggles between the Hiragana and Katakana writing systems. */
		Key["HiraganaKatakana"] = "HiraganaKatakana";
		/** The Kana Mode (Kana Lock) key. */
		Key["KanaMode"] = "KanaMode";
		/**
		* The Kanji Mode key. Enables entering Japanese text using the
		* ideographic characters of Chinese origin.
		*/
		Key["KanjiMode"] = "KanjiMode";
		/** The Katakana key. */
		Key["Katakana"] = "Katakana";
		/** The Romaji key; selects the Roman character set. */
		Key["Romaji"] = "Romaji";
		/** The Zenkaku (full width) characters key. */
		Key["Zenkaku"] = "Zenkaku";
		/** The Zenkaku/Hankaku (full width/half width) toggle key. */
		Key["ZenkakuHanaku"] = "ZenkakuHanaku";
		/** The first general-purpose function key, F1. */
		Key["F1"] = "F1";
		/** The F2 key. */
		Key["F2"] = "F2";
		/** The F3 key. */
		Key["F3"] = "F3";
		/** The F4 key. */
		Key["F4"] = "F4";
		/** The F5 key. */
		Key["F5"] = "F5";
		/** The F6 key. */
		Key["F6"] = "F6";
		/** The F7 key. */
		Key["F7"] = "F7";
		/** The F8 key. */
		Key["F8"] = "F8";
		/** The F9 key. */
		Key["F9"] = "F9";
		/** The F10 key. */
		Key["F10"] = "F10";
		/** The F11 key. */
		Key["F11"] = "F11";
		/** The F12 key. */
		Key["F12"] = "F12";
		/** The F13 key. */
		Key["F13"] = "F13";
		/** The F14 key. */
		Key["F14"] = "F14";
		/** The F15 key. */
		Key["F15"] = "F15";
		/** The F16 key. */
		Key["F16"] = "F16";
		/** The F17 key. */
		Key["F17"] = "F17";
		/** The F18 key. */
		Key["F18"] = "F18";
		/** The F19 key. */
		Key["F19"] = "F19";
		/** The F20 key. */
		Key["F20"] = "F20";
		/** The first general-purpose virtual function key. */
		Key["Soft1"] = "Soft1";
		/** The second general-purpose virtual function key. */
		Key["Soft2"] = "Soft2";
		/** The third general-purpose virtual function key. */
		Key["Soft3"] = "Soft3";
		/** The fourth general-purpose virtual function key. */
		Key["Soft4"] = "Soft4";
		/**
		* Presents a list of recently-used applications which lets the user change
		* apps quickly.
		*/
		Key["AppSwitch"] = "AppSwitch";
		/** The Call key. Dials the number which has been entered. */
		Key["Call"] = "Call";
		/** The Camera key. Activates the camera. */
		Key["Camera"] = "Camera";
		/** The Focus key. Focuses the camera. */
		Key["CameraFocus"] = "CameraFocus";
		/** The End Call or Hang Up button. */
		Key["EndCall"] = "EndCall";
		/** The Back button. */
		Key["GoBack"] = "GoBack";
		/**
		* The Home button. Returns the user to the phone's main screen
		* (usually an application launcher).
		*/
		Key["GoHome"] = "GoHome";
		/**
		* The Headset Hook key. This is typically actually a button on
		* the headset which is used to hang up calls and play or pause media.
		*/
		Key["HeadsetHook"] = "HeadsetHook";
		/** The Redial button. Redials the last-called number. */
		Key["LastNumberRedial"] = "LastNumberRedial";
		/** The Notification key. */
		Key["Notification"] = "Notification";
		/**
		* A button which cycles among the notification modes: silent, vibrate,
		* ring, and so forth.
		*/
		Key["MannerMode"] = "MannerMode";
		/** The Voice Dial key. Initiates voice dialing. */
		Key["VoiceDial"] = "VoiceDial";
		/** Switches to the previous channel. */
		Key["ChannelDown"] = "ChannelDown";
		/** Switches to the next channel. */
		Key["ChannelUp"] = "ChannelUp";
		/** Starts, continues, or increases the speed of fast forwarding the media. */
		Key["MediaFastForward"] = "MediaFastForward";
		/**
		* Pauses the currently playing media.
		* Note: Some older applications use
		* "Pause", but this is not correct.
		*/
		Key["MediaPause"] = "MediaPause";
		/**
		* Starts or continues playing media at normal speed, if not already doing
		* so. Has no effect otherwise.
		*/
		Key["MediaPlay"] = "MediaPlay";
		/** Toggles between playing and pausing the current media. */
		Key["MediaPlayPause"] = "MediaPlayPause";
		/** Starts or resumes recording media. */
		Key["MediaRecord"] = "MediaRecord";
		/** Starts, continues, or increases the speed of rewinding the media. */
		Key["MediaRewind"] = "MediaRewind";
		/**
		* Stops the current media activity (such as playing, recording, pausing,
		* forwarding, or rewinding). Has no effect if the media is currently
		* stopped already.
		*/
		Key["MediaStop"] = "MediaStop";
		/** Seeks to the next media or program track. */
		Key["MediaTrackNext"] = "MediaTrackNext";
		/** Seeks to the previous media or program track. */
		Key["MediaTrackPrevious"] = "MediaTrackPrevious";
		/** Adjusts audio balance toward the left. */
		Key["AudioBalanceLeft"] = "AudioBalanceLeft";
		/** Adjusts audio balance toward the right. */
		Key["AudioBalanceRight"] = "AudioBalanceRight";
		/** Decreases the amount of bass. */
		Key["AudioBassDown"] = "AudioBassDown";
		/**
		* Reduces bass boosting or cycles downward through bass boost modes or
		* states.
		*/
		Key["AudioBassBoostDown"] = "AudioBassBoostDown";
		/** Toggles bass boosting on and off. */
		Key["AudioBassBoostToggle"] = "AudioBassBoostToggle";
		/**
		* Increases the amount of bass boosting, or cycles upward through a set of
		* bass boost modes or states.
		*/
		Key["AudioBassBoostUp"] = "AudioBassBoostUp";
		/** Increases the amount of bass. */
		Key["AudioBassUp"] = "AudioBassUp";
		/** Adjusts the audio fader toward the front. */
		Key["AudioFaderFront"] = "AudioFaderFront";
		/** Adjusts the audio fader toward the rear. */
		Key["AudioFaderRear"] = "AudioFaderRear";
		/** Selects the next available surround sound mode. */
		Key["AudioSurroundModeNext"] = "AudioSurroundModeNext";
		/** Decreases the amount of treble. */
		Key["AudioTrebleDown"] = "AudioTrebleDown";
		/** Increases the amount of treble. */
		Key["AudioTrebleUp"] = "AudioTrebleUp";
		/** Decreases the audio volume. */
		Key["AudioVolumeDown"] = "AudioVolumeDown";
		/** Mutes the audio. */
		Key["AudioVolumeMute"] = "AudioVolumeMute";
		/** Increases the audio volume. */
		Key["AudioVolumeUp"] = "AudioVolumeUp";
		/** Toggles the microphone on and off. */
		Key["MicrophoneToggle"] = "MicrophoneToggle";
		/** Decreases the microphone's input volume. */
		Key["MicrophoneVolumeDown"] = "MicrophoneVolumeDown";
		/** Mutes the microphone input. */
		Key["MicrophoneVolumeMute"] = "MicrophoneVolumeMute";
		/** Increases the microphone's input volume. */
		Key["MicrophoneVolumeUp"] = "MicrophoneVolumeUp";
		/** Switches into TV viewing mode. */
		Key["TV"] = "TV";
		/** Toggles 3D TV mode on and off. */
		Key["TV3DMode"] = "TV3DMode";
		/** Toggles between antenna and cable inputs. */
		Key["TVAntennaCable"] = "TVAntennaCable";
		/** Toggles audio description mode on and off. */
		Key["TVAudioDescription"] = "TVAudioDescription";
		/**
		* Decreases the audio description's mixing volume; reduces the volume of
		* the audio descriptions relative to the program sound.
		*/
		Key["TVAudioDescriptionMixDown"] = "TVAudioDescriptionMixDown";
		/**
		* Increases the audio description's mixing volume; increases the volume of
		* the audio descriptions relative to the program sound.
		*/
		Key["TVAudioDescriptionMixUp"] = "TVAudioDescriptionMixUp";
		/**
		* Displays or hides the media contents available for playback (this may be
		* a channel guide showing the currently airing programs, or a list of
		* media files to play).
		*/
		Key["TVContentsMenu"] = "TVContentsMenu";
		/** Displays or hides the TV's data service menu. */
		Key["TVDataService"] = "TVDataService";
		/** Cycles the input mode on an external TV. */
		Key["TVInput"] = "TVInput";
		/** Switches to the input "Component 1." */
		Key["TVInputComponent1"] = "TVInputComponent1";
		/** Switches to the input "Component 2." */
		Key["TVInputComponent2"] = "TVInputComponent2";
		/** Switches to the input "Composite 1." */
		Key["TVInputComposite1"] = "TVInputComposite1";
		/** Switches to the input "Composite 2." */
		Key["TVInputComposite2"] = "TVInputComposite2";
		/** Switches to the input "HDMI 1." */
		Key["TVInputHDMI1"] = "TVInputHDMI1";
		/** Switches to the input "HDMI 2." */
		Key["TVInputHDMI2"] = "TVInputHDMI2";
		/** Switches to the input "HDMI 3." */
		Key["TVInputHDMI3"] = "TVInputHDMI3";
		/** Switches to the input "HDMI 4." */
		Key["TVInputHDMI4"] = "TVInputHDMI4";
		/** Switches to the input "VGA 1." */
		Key["TVInputVGA1"] = "TVInputVGA1";
		/** The Media Context menu key. */
		Key["TVMediaContext"] = "TVMediaContext";
		/** Toggle the TV's network connection on and off. */
		Key["TVNetwork"] = "TVNetwork";
		/** Put the TV into number entry mode. */
		Key["TVNumberEntry"] = "TVNumberEntry";
		/** The device's power button. */
		Key["TVPower"] = "TVPower";
		/** Radio button. */
		Key["TVRadioService"] = "TVRadioService";
		/** Satellite button. */
		Key["TVSatellite"] = "TVSatellite";
		/** Broadcast Satellite button. */
		Key["TVSatelliteBS"] = "TVSatelliteBS";
		/** Communication Satellite button. */
		Key["TVSatelliteCS"] = "TVSatelliteCS";
		/** Toggles among available satellites. */
		Key["TVSatelliteToggle"] = "TVSatelliteToggle";
		/**
		* Selects analog terrestrial television service (analog cable or antenna
		* reception).
		*/
		Key["TVTerrestrialAnalog"] = "TVTerrestrialAnalog";
		/**
		* Selects digital terrestrial television service (digital cable or antenna
		* reception).
		*/
		Key["TVTerrestrialDigital"] = "TVTerrestrialDigital";
		/** Timer programming button. */
		Key["TVTimer"] = "TVTimer";
		/** Changes the input mode on an external audio/video receiver (AVR) unit. */
		Key["AVRInput"] = "AVRInput";
		/** Toggles the power on an external AVR unit. */
		Key["AVRPower"] = "AVRPower";
		/**
		* General-purpose media function key, color-coded red. This has index
		* 0 among the colored keys.
		*/
		Key["ColorF0Red"] = "ColorF0Red";
		/**
		* General-purpose media function key, color-coded green. This has index
		* 1 among the colored keys.
		*/
		Key["ColorF1Green"] = "ColorF1Green";
		/**
		* General-purpose media function key, color-coded yellow. This has index
		* 2 among the colored keys.
		*/
		Key["ColorF2Yellow"] = "ColorF2Yellow";
		/**
		* General-purpose media function key, color-coded blue. This has index
		* 3 among the colored keys.
		*/
		Key["ColorF3Blue"] = "ColorF3Blue";
		/**
		* General-purpose media function key, color-coded grey. This has index
		* 4 among the colored keys.
		*/
		Key["ColorF4Grey"] = "ColorF4Grey";
		/**
		* General-purpose media function key, color-coded brown. This has index
		* 5 among the colored keys.
		*/
		Key["ColorF5Brown"] = "ColorF5Brown";
		/** Toggles closed captioning on and off. */
		Key["ClosedCaptionToggle"] = "ClosedCaptionToggle";
		/**
		* Adjusts the brightness of the device by toggling between two brightness
		* levels or by cycling among multiple brightness levels.
		*/
		Key["Dimmer"] = "Dimmer";
		/** Cycles among video sources. */
		Key["DisplaySwap"] = "DisplaySwap";
		/** Switches the input source to the Digital Video Recorder (DVR). */
		Key["DVR"] = "DVR";
		/** The Exit button, which exits the current application or menu. */
		Key["Exit"] = "Exit";
		/** Clears the program or content stored in the first favorites list slot. */
		Key["FavoriteClear0"] = "FavoriteClear0";
		/** Clears the program or content stored in the second favorites list slot. */
		Key["FavoriteClear1"] = "FavoriteClear1";
		/** Clears the program or content stored in the third favorites list slot. */
		Key["FavoriteClear2"] = "FavoriteClear2";
		/** Clears the program or content stored in the fourth favorites list slot. */
		Key["FavoriteClear3"] = "FavoriteClear3";
		/**
		* Selects (recalls) the program or content stored in the first favorites
		* list slot.
		*/
		Key["FavoriteRecall0"] = "FavoriteRecall0";
		/**
		* Selects (recalls) the program or content stored in the second favorites
		* list slot.
		*/
		Key["FavoriteRecall1"] = "FavoriteRecall1";
		/**
		* Selects (recalls) the program or content stored in the third favorites
		* list slot.
		*/
		Key["FavoriteRecall2"] = "FavoriteRecall2";
		/**
		* Selects (recalls) the program or content stored in the fourth favorites
		* list slot.
		*/
		Key["FavoriteRecall3"] = "FavoriteRecall3";
		/**
		* Stores the current program or content into the first favorites list
		* slot.
		*/
		Key["FavoriteStore0"] = "FavoriteStore0";
		/**
		* Stores the current program or content into the second favorites list
		* slot.
		*/
		Key["FavoriteStore1"] = "FavoriteStore1";
		/**
		* Stores the current program or content into the third favorites list
		* slot.
		*/
		Key["FavoriteStore2"] = "FavoriteStore2";
		/**
		* Stores the current program or content into the fourth favorites list
		* slot.
		*/
		Key["FavoriteStore3"] = "FavoriteStore3";
		/** Toggles the display of the program or content guide. */
		Key["Guide"] = "Guide";
		/**
		* If the guide is currently displayed, this button tells the guide to
		* display the next day's content.
		*/
		Key["GuideNextDay"] = "GuideNextDay";
		/**
		* If the guide is currently displayed, this button tells the guide to
		* display the previous day's content.
		*/
		Key["GuidePreviousDay"] = "GuidePreviousDay";
		/**
		* Toggles the display of information about the currently selected content,
		* program, or media.
		*/
		Key["Info"] = "Info";
		/**
		* Tells the device to perform an instant replay (typically some form of
		* jumping back a short amount of time then playing it again, possibly but
		* not usually in slow motion).
		*/
		Key["InstantReplay"] = "InstantReplay";
		/** Opens content linked to the current program, if available and possible. */
		Key["Link"] = "Link";
		/** Lists the current program. */
		Key["ListProgram"] = "ListProgram";
		/** Toggles a display listing currently available live content or programs. */
		Key["LiveContent"] = "LiveContent";
		/** Locks or unlocks the currently selected content or pgoram. */
		Key["Lock"] = "Lock";
		/**
		* Presents a list of media applications, such as photo viewers, audio and
		* video players, and games. [1]
		*/
		Key["MediaApps"] = "MediaApps";
		/** The Audio Track key. */
		Key["MediaAudioTrack"] = "MediaAudioTrack";
		/** Jumps back to the last-viewed content, program, or other media. */
		Key["MediaLast"] = "MediaLast";
		/** Skips backward to the previous content or program. */
		Key["MediaSkipBackward"] = "MediaSkipBackward";
		/** Skips forward to the next content or program. */
		Key["MediaSkipForward"] = "MediaSkipForward";
		/** Steps backward to the previous content or program. */
		Key["MediaStepBackward"] = "MediaStepBackward";
		/** Steps forward to the next content or program. */
		Key["MediaStepForward"] = "MediaStepForward";
		/**
		* Top Menu button. Opens the media's main menu (e.g., for a DVD or Blu-Ray
		* disc).
		*/
		Key["MediaTopMenu"] = "MediaTopMenu";
		/** Navigates into a submenu or option. */
		Key["NavigateIn"] = "NavigateIn";
		/** Navigates to the next item. */
		Key["NavigateNext"] = "NavigateNext";
		/** Navigates out of the current screen or menu. */
		Key["NavigateOut"] = "NavigateOut";
		/** Navigates to the previous item. */
		Key["NavigatePrevious"] = "NavigatePrevious";
		/** Cycles to the next channel in the favorites list. */
		Key["NextFavoriteChannel"] = "NextFavoriteChannel";
		/**
		* Cycles to the next saved user profile, if this feature is supported and
		* multiple profiles exist.
		*/
		Key["NextUserProfile"] = "NextUserProfile";
		/**
		* Opens the user interface for selecting on demand content or programs to
		* watch.
		*/
		Key["OnDemand"] = "OnDemand";
		/** Starts the process of pairing the remote with a device to be controlled. */
		Key["Pairing"] = "Pairing";
		/** A button to move the picture-in-picture view downward. */
		Key["PinPDown"] = "PinPDown";
		/** A button to control moving the picture-in-picture view. */
		Key["PinPMove"] = "PinPMove";
		/** Toggles display of the picture-in-picture view on and off. */
		Key["PinPToggle"] = "PinPToggle";
		/** A button to move the picture-in-picture view upward. */
		Key["PinPUp"] = "PinPUp";
		/** Decreases the media playback rate. */
		Key["PlaySpeedDown"] = "PlaySpeedDown";
		/** Returns the media playback rate to normal. */
		Key["PlaySpeedReset"] = "PlaySpeedReset";
		/** Increases the media playback rate. */
		Key["PlaySpeedUp"] = "PlaySpeedUp";
		/** Toggles random media (also known as "shuffle mode") on and off. */
		Key["RandomToggle"] = "RandomToggle";
		/**
		* A code sent when the remote control's battery is low. This doesn't
		* actually correspond to a physical key at all.
		*/
		Key["RcLowBattery"] = "RcLowBattery";
		/** Cycles among the available media recording speeds. */
		Key["RecordSpeedNext"] = "RecordSpeedNext";
		/**
		* Toggles radio frequency (RF) input bypass mode on and off. RF bypass
		* mode passes RF input directly to the RF output without any processing or
		* filtering.
		*/
		Key["RfBypass"] = "RfBypass";
		/**
		* Toggles the channel scan mode on and off. This is a mode which flips
		* through channels automatically until the user stops the scan.
		*/
		Key["ScanChannelsToggle"] = "ScanChannelsToggle";
		/** Cycles through the available screen display modes. */
		Key["ScreenModeNext"] = "ScreenModeNext";
		/** Toggles display of the device's settings screen on and off. */
		Key["Settings"] = "Settings";
		/** Toggles split screen display mode on and off. */
		Key["SplitScreenToggle"] = "SplitScreenToggle";
		/** Cycles among input modes on an external set-top box (STB). */
		Key["STBInput"] = "STBInput";
		/** Toggles on and off an external STB. */
		Key["STBPower"] = "STBPower";
		/** Toggles the display of subtitles on and off if they're available. */
		Key["Subtitle"] = "Subtitle";
		/**
		* Toggles display of teletext,
		* if available.
		*/
		Key["Teletext"] = "Teletext";
		/** Cycles through the available video modes. */
		Key["VideoModeNext"] = "VideoModeNext";
		/**
		* Causes the device to identify itself in some fashion, such as by
		* flashing a light, briefly changing the brightness of indicator lights,
		* or emitting a tone.
		*/
		Key["Wink"] = "Wink";
		/**
		* Toggles between fullscreen and scaled content display, or otherwise
		* change the magnification level.
		*/
		Key["ZoomToggle"] = "ZoomToggle";
		/**
		* Presents a list of possible corrections for a word which was incorrectly
		* identified.
		*/
		Key["SpeechCorrectionList"] = "SpeechCorrectionList";
		/**
		* Toggles between dictation mode and command/control mode. This lets the
		* speech engine know whether to interpret spoken words as input text or as
		* commands.
		*/
		Key["SpeechInputToggle"] = "SpeechInputToggle";
		/** Closes the current document or message. Must not exit the application. */
		Key["Close"] = "Close";
		/** Creates a new document or message. */
		Key["New"] = "New";
		/** Opens an existing document or message. */
		Key["Open"] = "Open";
		/** Prints the current document or message. */
		Key["Print"] = "Print";
		/** Saves the current document or message. */
		Key["Save"] = "Save";
		/** Starts spell checking the current document. */
		Key["SpellCheck"] = "SpellCheck";
		/** Opens the user interface to forward a message. */
		Key["MailForward"] = "MailForward";
		/** Opens the user interface to reply to a message. */
		Key["MailReply"] = "MailReply";
		/** Sends the current message. */
		Key["MailSend"] = "MailSend";
		/**
		* The Calculator key, often labeled with an icon. This is often
		* used as a generic application launcher key
		* (APPCOMMAND_LAUNCH_APP2).
		*/
		Key["LaunchCalculator"] = "LaunchCalculator";
		/** The Calendar key. Often labeled with an icon. */
		Key["LaunchCalendar"] = "LaunchCalendar";
		/** The Contacts key. */
		Key["LaunchContacts"] = "LaunchContacts";
		/** The Mail key. Often labeled with an icon. */
		Key["LaunchMail"] = "LaunchMail";
		/** The Media Player key. */
		Key["LaunchMediaPlayer"] = "LaunchMediaPlayer";
		/** The Music Player key. Often labeled with an icon. */
		Key["LaunchMusicPlayer"] = "LaunchMusicPlayer";
		/**
		* The My Computer key on Windows keyboards. This is often used
		* as a generic application launcher key
		* (APPCOMMAND_LAUNCH_APP1).
		*/
		Key["LaunchMyComputer"] = "LaunchMyComputer";
		/**
		* The Phone key. Opens the phone dialer application (if one is
		* present).
		*/
		Key["LaunchPhone"] = "LaunchPhone";
		/** The Screen Saver key. */
		Key["LaunchScreenSaver"] = "LaunchScreenSaver";
		/** The Spreadsheet key. This key may be labeled with an icon. */
		Key["LaunchSpreadsheet"] = "LaunchSpreadsheet";
		/**
		* The Web Browser key. This key is frequently labeled with an
		* icon.
		*/
		Key["LaunchWebBrowser"] = "LaunchWebBrowser";
		/** The WebCam key. Opens the webcam application. */
		Key["LaunchWebCam"] = "LaunchWebCam";
		/**
		* The Word Processor key. This may be an icon of a specific
		* word processor application, or a generic document icon.
		*/
		Key["LaunchWordProcessor"] = "LaunchWordProcessor";
		/** The first generic application launcher button. */
		Key["LaunchApplication1"] = "LaunchApplication1";
		/** The second generic application launcher button. */
		Key["LaunchApplication2"] = "LaunchApplication2";
		/** The third generic application launcher button. */
		Key["LaunchApplication3"] = "LaunchApplication3";
		/** The fourth generic application launcher button. */
		Key["LaunchApplication4"] = "LaunchApplication4";
		/** The fifth generic application launcher button. */
		Key["LaunchApplication5"] = "LaunchApplication5";
		/** The sixth generic application launcher button. */
		Key["LaunchApplication6"] = "LaunchApplication6";
		/** The seventh generic application launcher button. */
		Key["LaunchApplication7"] = "LaunchApplication7";
		/** The eighth generic application launcher button. */
		Key["LaunchApplication8"] = "LaunchApplication8";
		/** The ninth generic application launcher button. */
		Key["LaunchApplication9"] = "LaunchApplication9";
		/** The 10th generic application launcher button. */
		Key["LaunchApplication10"] = "LaunchApplication10";
		/** The 11th generic application launcher button. */
		Key["LaunchApplication11"] = "LaunchApplication11";
		/** The 12th generic application launcher button. */
		Key["LaunchApplication12"] = "LaunchApplication12";
		/** The 13th generic application launcher button. */
		Key["LaunchApplication13"] = "LaunchApplication13";
		/** The 14th generic application launcher button. */
		Key["LaunchApplication14"] = "LaunchApplication14";
		/** The 15th generic application launcher button. */
		Key["LaunchApplication15"] = "LaunchApplication15";
		/** The 16th generic application launcher button. */
		Key["LaunchApplication16"] = "LaunchApplication16";
		/**
		* Navigates to the previous content or page in the current Web view's
		* history.
		*/
		Key["BrowserBack"] = "BrowserBack";
		/** Opens the user's list of bookmarks/favorites. */
		Key["BrowserFavorites"] = "BrowserFavorites";
		/** Navigates to the next content or page in the current Web view's history. */
		Key["BrowserForward"] = "BrowserForward";
		/** Navigates to the user's preferred home page. */
		Key["BrowserHome"] = "BrowserHome";
		/** Refreshes the current page or content. */
		Key["BrowserRefresh"] = "BrowserRefresh";
		/**
		* Activates the user's preferred search engine or the search interface
		* within their browser.
		*/
		Key["BrowserSearch"] = "BrowserSearch";
		/** Stops loading the currently displayed Web view or content. */
		Key["BrowserStop"] = "BrowserStop";
		/**
		* The decimal point key (typically . or
		* , depending on the region).
		* In newer browsers, this value to be the character generated by the
		* decimal key (one of those two characters). [1]
		*/
		Key["Decimal"] = "Decimal";
		/** The 11 key found on certain media numeric keypads. */
		Key["Key11"] = "Key11";
		/** The 12 key found on certain media numeric keypads. */
		Key["Key12"] = "Key12";
		/** The numeric keypad's multiplication key, *. */
		Key["Multiply"] = "Multiply";
		/** The numeric keypad's addition key, +. */
		Key["Add"] = "Add";
		/** The numeric keypad's division key, /. */
		Key["Divide"] = "Divide";
		/** The numeric keypad's subtraction key, -. */
		Key["Subtract"] = "Subtract";
		/**
		* The numeric keypad's places separator character.
		* (In the United States this is a comma, but elsewhere it is frequently
		* a period.)
		*/
		Key["Separator"] = "Separator";
	})(exports.Key || (exports.Key = {}));
}));
//#endregion
export { PriorityQueue as $, useFloatingTree as $n, DbOpcode as $t, UiLayoutDataProvider as A, init_Popover as An, useGlobals as Ar, Id64 as At, AlternateDateFormats as B, VisuallyHidden as Bn, getWindow$1 as Br, LogLevel as Bt, init_ConditionalStringValue as C, OverflowContainer as Cn, init_useLatestRef as Cr, init_SortedArray as Ct, init_BadgeType as D, Popover as Dn, init_useSyncExternalStore as Dr, ByteStream as Dt, BadgeType as E, init_IconButton as En, useSafeContext as Er, init_OrderedId64Iterable as Et, init_Record as F, useToaster as Fn, useMergedRefs as Fr, BeEvent as Ft, init_DialogItem as G, Composite as Gn, GeoServiceStatus as Gt, TimeDisplay as H, Tooltip as Hn, mergeEventHandlers as Hr, init_Logger as Ht, PropertyValueFormat as I, Portal as In, init_useEventListener as Ir, BeUiEvent as It, UiAdmin as J, FloatingNode as Jn, RealityDataStatus as Jt, StandardContentLayouts as K, CompositeItem as Kn, IModelStatus as Kt, init_Value as L, init_Portal as Ln, useEventListener as Lr, init_BeEvent as Lt, PropertyChangeStatus as M, ThemeProvider as Mn, useResizeObserver as Mr, init_Id as Mt, init_UiDataProvider as N, init_ThemeProvider as Nn, init_useMergedRefs as Nr, StatusCategory as Nt, DialogButtonType as O, PopoverInitialFocusContext as On, useSyncExternalStore as Or, init_ByteStream as Ot, PropertyRecord as P, init_Toaster as Pn, mergeRefs as Pr, init_StatusCategory as Pt, init_Tracing as Q, useFloatingParentNodeId as Qn, init_JsonUtils as Qt, StandardTypeNames as R, ButtonGroup as Rn, getBoundedValue as Rr, UnexpectedErrors as Rt, ConditionalStringValue as S, useFutureFlag as Sn, useIsomorphicLayoutEffect as Sr, SortedArray as St, init_ConditionalBooleanValue as T, IconButton as Tn, init_useSafeContext as Tr, OrderedId64Iterable as Tt, init_EditorParams as U, defaultTooltipDelay as Un, require_classnames as Ur, BentleyError as Ut, PropertyEditorParamTypes as V, init_VisuallyHidden as Vn, init_dom as Vr, Logger as Vt, DialogProperty as W, init_Tooltip as Wn, BentleyStatus as Wt, init_core_bentley as X, init_floating_ui_react as Xn, init_BentleyError as Xt, init_UiAdmin as Y, FloatingTree as Yn, RpcInterfaceStatus as Yt, Tracing as Z, useFloatingNodeId as Zn, JsonUtils as Zt, init_MessageSeverity as _, ButtonBase as _n, init_useId as _r, MutableCompressedId64Set as _t, init_UiEvent as a, Dialog as an, init_react as ar, init_OneAtATimeAction as at, RelativePosition as b, init_ShadowRoot as bn, useIsClient as br, DuplicatePolicy as bt, ToolbarItemUtilities as c, init_Button as cn, polymorphic as cr, IndexMap as ct, init_BaseQuantityDescription as d, SvgCloseSmall as dn, init_focusable as dr, dispose as dt, DbResult as en, useInteractions as er, init_PriorityQueue as et, PropertyDescriptionHelper as f, init_SvgCloseSmall as fn, useFocusableElements as fr, disposeArray as ft, MessageSeverity as g, init_Svg as gn, useControlledState as gr, CompressedId64Set as gt, init_StandardEditorNames as h, Svg as hn, init_useControlledState as hr, init_Dictionary as ht, UiEvent as i, init_Assert as in, cloneElementWithRef as ir, OneAtATimeAction as it, init_UiLayoutDataProvider as j, usePopover as jn, init_useResizeObserver as jr, TransientIdSequence as jt, DialogLayoutDataProvider as k, PopoverOpenContext as kn, init_useGlobals as kr, Guid as kt, init_ToolbarItem as l, ProgressRadial as ln, init_styles as lr, IndexedValue as lt, StandardEditorNames as m, init_StatusIconMap as mn, useWarningLogger as mr, Dictionary as mt, appui_abstract_exports as n, init_BeSQLite as nn, Box as nr, init_OrderedSet as nt, UiError as o, init_Dialog as on, isReact17or18 as or, ObservableSet as ot, init_Description as p, StatusIconMap as pn, init_useWarningLogger as pr, init_Disposable as pt, init_StandardContentLayouts as q, FloatingDelayGroup as qn, ITwinError as qt, init_appui_abstract as r, assert as rn, init_Box as rr, AbandonedError as rt, init_UiError as s, Button as sn, init_polymorphic as sr, init_ObservableSet as st, require_Key_enum as t, OpenMode as tn, useListNavigation as tr, OrderedSet as tt, BaseQuantityDescription as u, init_ProgressRadial as un, u as ur, init_IndexMap as ut, DisplayMessageType as v, init_ButtonBase as vn, useId$1 as vr, OrderedId64Array as vt, ConditionalBooleanValue as w, init_OverflowContainer as wn, useLatestRef$2 as wr, lowerBound as wt, init_RelativePosition as x, init_FutureFlagsProvider as xn, init_useIsomorphicLayoutEffect as xr, ReadonlySortedArray as xt, init_MessagePresenter as y, ShadowRoot$1 as yn, init_useIsClient as yr, init_CompressedId64Set as yt, init_StandardTypeNames as z, init_ButtonGroup as zn, init_numbers as zr, init_UnexpectedErrors as zt };
