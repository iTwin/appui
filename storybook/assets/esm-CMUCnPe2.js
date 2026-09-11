const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./styles-stOW5RFO.css"])))=>i.map(i=>d[i]);
import { i as __esmMin, n as init_preload_helper, r as __commonJSMin, s as __toESM, t as __vitePreload } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { t as require_react_dom } from "./react-dom-13j8k41E.js";
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
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/date.js
var isBefore;
var init_date = __esmMin((() => {
	isBefore = (beforeDate, afterDate) => {
		if (!beforeDate || !afterDate) return false;
		let firstDate = new Date(beforeDate);
		let secondDate = new Date(afterDate);
		firstDate && firstDate.setHours(0, 0, 0, 0);
		secondDate && secondDate.setHours(0, 0, 0, 0);
		return firstDate < secondDate;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/dom.js
var getWindow$1, mergeEventHandlers, getTranslateValuesFromElement, getTranslateValues;
var init_dom = __esmMin((() => {
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
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/colors.js
var init_colors = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/numbers.js
var getBoundedValue, getRandomValue;
var init_numbers = __esmMin((() => {
	getBoundedValue = (val, min, max) => Math.min(max, Math.max(min, val));
	getRandomValue = (length = 21) => {
		let alphabet = "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let id = "";
		for (let i = 0; i < length; i++) id += alphabet[64 * Math.random() | 0];
		return id;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useEventListener.js
var import_react$155, useEventListener;
var init_useEventListener = __esmMin((() => {
	import_react$155 = /* @__PURE__ */ __toESM(require_react(), 1);
	useEventListener = (eventName, handler, element) => {
		let savedHandler = import_react$155.useRef(void 0);
		import_react$155.useEffect(() => {
			savedHandler.current = handler;
		}, [handler]);
		import_react$155.useEffect(() => {
			if (!element) return;
			let eventListener = (event) => savedHandler.current?.(event);
			element.addEventListener(eventName, eventListener);
			return () => {
				element.removeEventListener(eventName, eventListener);
			};
		}, [eventName, element]);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useMergedRefs.js
var import_react$154, mergeRefs, useMergedRefs;
var init_useMergedRefs = __esmMin((() => {
	import_react$154 = /* @__PURE__ */ __toESM(require_react(), 1);
	mergeRefs = (...refs) => (instance) => {
		refs.forEach((ref) => {
			if ("function" == typeof ref) ref(instance);
			else if (ref) ref.current = instance;
		});
	};
	useMergedRefs = (...refs) => import_react$154.useCallback(mergeRefs(...refs), [...refs]);
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useResizeObserver.js
var import_react$153, useResizeObserver;
var init_useResizeObserver = __esmMin((() => {
	import_react$153 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_dom();
	useResizeObserver = (onResize) => {
		let resizeObserver = import_react$153.useRef(void 0);
		return [import_react$153.useCallback((element) => {
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
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useContainerWidth.js
var import_react$152, useContainerWidth;
var init_useContainerWidth = __esmMin((() => {
	import_react$152 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_useMergedRefs();
	init_useResizeObserver();
	useContainerWidth = (watchResizes = true) => {
		let [contentWidth, setContentWidth] = import_react$152.useState(0);
		let ref = import_react$152.useCallback((element) => {
			if (!element) return;
			setContentWidth(element.getBoundingClientRect().width);
		}, []);
		let [resizeRef, resizeObserver] = useResizeObserver(import_react$152.useCallback(({ width }) => setContentWidth(width), []));
		if (!watchResizes) resizeObserver?.disconnect();
		return [useMergedRefs(ref, watchResizes ? resizeRef : void 0), contentWidth];
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ThemeProvider/ThemeContext.js
var import_react$151, ThemeContext;
var init_ThemeContext = __esmMin((() => {
	import_react$151 = /* @__PURE__ */ __toESM(require_react(), 1);
	ThemeContext = import_react$151.createContext(void 0);
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/dev.js
var isJest, isCypress, isMocha, isVitest, isUnitTest;
var init_dev = __esmMin((() => {
	isJest = "undefined" != typeof jest;
	isCypress = void 0 !== globalThis.Cypress;
	isMocha = void 0 !== globalThis.beforeEach && "function(name,fn){suites[0].beforeEach(name,fn);}" === `${globalThis.beforeEach}`.replace(/\s/g, "") && !isCypress;
	isVitest = void 0 !== globalThis.__vitest_index__;
	isUnitTest = isJest || isVitest || isMocha;
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useGlobals.js
var import_react$150, useGlobals, useThemeProviderWarning, useRootFontSizeWarning;
var init_useGlobals = __esmMin((() => {
	import_react$150 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_ThemeContext();
	useGlobals = () => {
		let themeContext = import_react$150.useContext(ThemeContext);
		useThemeProviderWarning(themeContext);
		useRootFontSizeWarning();
		return themeContext;
	};
	useThemeProviderWarning = (themeContext) => {
		import_react$150.useEffect(() => {}, [themeContext]);
	};
	useRootFontSizeWarning = () => {
		import_react$150.useEffect(() => {}, []);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useIntersection.js
var import_react$149, useIntersection;
var init_useIntersection = __esmMin((() => {
	import_react$149 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_dom();
	useIntersection = (onIntersect, options = {}, once = true) => {
		let { root, rootMargin, threshold } = options;
		let cleanupRef = import_react$149.useRef(() => {});
		return import_react$149.useCallback((node) => {
			cleanupRef.current?.();
			cleanupRef.current = () => {};
			if (!node || !getWindow$1()?.IntersectionObserver) return;
			let observer = new IntersectionObserver(([entry], obs) => {
				if (entry.isIntersecting) {
					if (once) obs.disconnect();
					onIntersect();
				}
			}, {
				root,
				rootMargin,
				threshold
			});
			observer.observe(node);
			cleanupRef.current = () => observer.disconnect();
		}, [
			onIntersect,
			once,
			root,
			rootMargin,
			threshold
		]);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useSyncExternalStore.js
function useSyncExternalStoreShim(subscribe, getSnapshot) {
	let value = getSnapshot();
	let [{ instance }, forceUpdate] = import_react$148.useState({ instance: {
		value,
		getSnapshot
	} });
	import_react$148.useLayoutEffect(() => {
		instance.value = value;
		instance.getSnapshot = getSnapshot;
		if (!Object.is(value, getSnapshot())) forceUpdate({ instance });
	}, [
		subscribe,
		value,
		getSnapshot
	]);
	import_react$148.useEffect(() => {
		let synchronize = () => {
			if (!Object.is(instance.value, instance.getSnapshot())) forceUpdate({ instance });
		};
		synchronize();
		return subscribe(synchronize);
	}, [subscribe]);
	return value;
}
var import_react$148, _React$1, useSyncExternalStore;
var init_useSyncExternalStore = __esmMin((() => {
	import_react$148 = /* @__PURE__ */ __toESM(require_react(), 1);
	_React$1 = import_react$148;
	useSyncExternalStore = _React$1.useSyncExternalStore || useSyncExternalStoreShim;
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useMediaQuery.js
var import_react$147, useMediaQuery;
var init_useMediaQuery = __esmMin((() => {
	import_react$147 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_useSyncExternalStore();
	useMediaQuery = (queryString) => {
		let getSnapshot = import_react$147.useCallback(() => "undefined" != typeof window ? window.matchMedia?.(queryString).matches : void 0, [queryString]);
		return useSyncExternalStore(import_react$147.useCallback((onChange) => {
			let mediaQueryList = window.matchMedia?.(queryString);
			mediaQueryList?.addEventListener?.("change", onChange);
			return () => mediaQueryList?.removeEventListener?.("change", onChange);
		}, [queryString]), getSnapshot, () => void 0);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useSafeContext.js
var import_react$146, useSafeContext;
var init_useSafeContext = __esmMin((() => {
	import_react$146 = /* @__PURE__ */ __toESM(require_react(), 1);
	useSafeContext = (context) => {
		let value = import_react$146.useContext(context);
		if (!value) throw new Error(`${context.displayName || "Context"} is undefined`);
		return value;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useLatestRef.js
var import_react$145, useLatestRef$2;
var init_useLatestRef = __esmMin((() => {
	import_react$145 = /* @__PURE__ */ __toESM(require_react(), 1);
	useLatestRef$2 = (value) => {
		let valueRef = import_react$145.useRef(value);
		import_react$145.useEffect(() => {
			valueRef.current = value;
		}, [value]);
		return valueRef;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useIsomorphicLayoutEffect.js
var import_react$144, useIsomorphicLayoutEffect$1;
var init_useIsomorphicLayoutEffect = __esmMin((() => {
	import_react$144 = /* @__PURE__ */ __toESM(require_react(), 1);
	useIsomorphicLayoutEffect$1 = "undefined" != typeof window ? import_react$144.useLayoutEffect : import_react$144.useEffect;
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useIsClient.js
var import_react$143, useIsClient;
var init_useIsClient = __esmMin((() => {
	import_react$143 = /* @__PURE__ */ __toESM(require_react(), 1);
	useIsClient = () => {
		let [isClient, setIsClient] = import_react$143.useState(false);
		import_react$143.useEffect(() => {
			setIsClient(true);
		}, []);
		return isClient;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useId.js
var import_react$142, useId$1, useUniqueValue;
var init_useId = __esmMin((() => {
	import_react$142 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_numbers();
	useId$1 = () => {
		let uniqueValue = useUniqueValue();
		return import_react$142.useMemo(() => `iui-${uniqueValue}`, [uniqueValue]);
	};
	useUniqueValue = import_react$142.useId ?? (() => import_react$142.useMemo(() => getRandomValue(10), []));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useControlledState.js
var import_react$141, useControlledState;
var init_useControlledState = __esmMin((() => {
	import_react$141 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_useLatestRef();
	useControlledState = (initialValue, controlledState, setControlledState) => {
		let [uncontrolledState, setUncontrolledState] = import_react$141.useState(initialValue);
		let state = import_react$141.useMemo(() => void 0 !== controlledState ? controlledState : uncontrolledState, [controlledState, uncontrolledState]);
		let oldState = useLatestRef$2(state);
		return [state, import_react$141.useCallback((value) => {
			if (value === oldState.current) return;
			oldState.current = value;
			setUncontrolledState(value);
			setControlledState?.(value);
		}, [oldState, setControlledState])];
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+virtual-core@3.13.23/node_modules/@tanstack/virtual-core/dist/esm/utils.js
function memo(getDeps, fn, opts) {
	let deps = opts.initialDeps ?? [];
	let result;
	let isInitial = true;
	function memoizedFunction() {
		var _a, _b, _c;
		let depTime;
		if (opts.key && ((_a = opts.debug) == null ? void 0 : _a.call(opts))) depTime = Date.now();
		const newDeps = getDeps();
		if (!(newDeps.length !== deps.length || newDeps.some((dep, index) => deps[index] !== dep))) return result;
		deps = newDeps;
		let resultTime;
		if (opts.key && ((_b = opts.debug) == null ? void 0 : _b.call(opts))) resultTime = Date.now();
		result = fn(...newDeps);
		if (opts.key && ((_c = opts.debug) == null ? void 0 : _c.call(opts))) {
			const depEndTime = Math.round((Date.now() - depTime) * 100) / 100;
			const resultEndTime = Math.round((Date.now() - resultTime) * 100) / 100;
			const resultFpsPercentage = resultEndTime / 16;
			const pad = (str, num) => {
				str = String(str);
				while (str.length < num) str = " " + str;
				return str;
			};
			console.info(`%c⏱ ${pad(resultEndTime, 5)} /${pad(depEndTime, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * resultFpsPercentage, 120))}deg 100% 31%);`, opts == null ? void 0 : opts.key);
		}
		if ((opts == null ? void 0 : opts.onChange) && !(isInitial && opts.skipInitialOnChange)) opts.onChange(result);
		isInitial = false;
		return result;
	}
	memoizedFunction.updateDeps = (newDeps) => {
		deps = newDeps;
	};
	return memoizedFunction;
}
function notUndefined(value, msg) {
	if (value === void 0) throw new Error(`Unexpected undefined${msg ? `: ${msg}` : ""}`);
	else return value;
}
var approxEqual, debounce;
var init_utils$2 = __esmMin((() => {
	approxEqual = (a, b) => Math.abs(a - b) < 1.01;
	debounce = (targetWindow, fn, ms) => {
		let timeoutId;
		return function(...args) {
			targetWindow.clearTimeout(timeoutId);
			timeoutId = targetWindow.setTimeout(() => fn.apply(this, args), ms);
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+virtual-core@3.13.23/node_modules/@tanstack/virtual-core/dist/esm/index.js
function calculateRange({ measurements, outerSize, scrollOffset, lanes }) {
	const lastIndex = measurements.length - 1;
	const getOffset = (index) => measurements[index].start;
	if (measurements.length <= lanes) return {
		startIndex: 0,
		endIndex: lastIndex
	};
	let startIndex = findNearestBinarySearch(0, lastIndex, getOffset, scrollOffset);
	let endIndex = startIndex;
	if (lanes === 1) while (endIndex < lastIndex && measurements[endIndex].end < scrollOffset + outerSize) endIndex++;
	else if (lanes > 1) {
		const endPerLane = Array(lanes).fill(0);
		while (endIndex < lastIndex && endPerLane.some((pos) => pos < scrollOffset + outerSize)) {
			const item = measurements[endIndex];
			endPerLane[item.lane] = item.end;
			endIndex++;
		}
		const startPerLane = Array(lanes).fill(scrollOffset + outerSize);
		while (startIndex >= 0 && startPerLane.some((pos) => pos >= scrollOffset)) {
			const item = measurements[startIndex];
			startPerLane[item.lane] = item.start;
			startIndex--;
		}
		startIndex = Math.max(0, startIndex - startIndex % lanes);
		endIndex = Math.min(lastIndex, endIndex + (lanes - 1 - endIndex % lanes));
	}
	return {
		startIndex,
		endIndex
	};
}
var getRect, defaultKeyExtractor, defaultRangeExtractor, observeElementRect, addEventListenerOptions, supportsScrollend, observeElementOffset, measureElement, elementScroll, Virtualizer, findNearestBinarySearch;
var init_esm$2 = __esmMin((() => {
	init_utils$2();
	getRect = (element) => {
		const { offsetWidth, offsetHeight } = element;
		return {
			width: offsetWidth,
			height: offsetHeight
		};
	};
	defaultKeyExtractor = (index) => index;
	defaultRangeExtractor = (range) => {
		const start = Math.max(range.startIndex - range.overscan, 0);
		const end = Math.min(range.endIndex + range.overscan, range.count - 1);
		const arr = [];
		for (let i = start; i <= end; i++) arr.push(i);
		return arr;
	};
	observeElementRect = (instance, cb) => {
		const element = instance.scrollElement;
		if (!element) return;
		const targetWindow = instance.targetWindow;
		if (!targetWindow) return;
		const handler = (rect) => {
			const { width, height } = rect;
			cb({
				width: Math.round(width),
				height: Math.round(height)
			});
		};
		handler(getRect(element));
		if (!targetWindow.ResizeObserver) return () => {};
		const observer = new targetWindow.ResizeObserver((entries) => {
			const run = () => {
				const entry = entries[0];
				if (entry == null ? void 0 : entry.borderBoxSize) {
					const box = entry.borderBoxSize[0];
					if (box) {
						handler({
							width: box.inlineSize,
							height: box.blockSize
						});
						return;
					}
				}
				handler(getRect(element));
			};
			instance.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(run) : run();
		});
		observer.observe(element, { box: "border-box" });
		return () => {
			observer.unobserve(element);
		};
	};
	addEventListenerOptions = { passive: true };
	supportsScrollend = typeof window == "undefined" ? true : "onscrollend" in window;
	observeElementOffset = (instance, cb) => {
		const element = instance.scrollElement;
		if (!element) return;
		const targetWindow = instance.targetWindow;
		if (!targetWindow) return;
		let offset = 0;
		const fallback = instance.options.useScrollendEvent && supportsScrollend ? () => void 0 : debounce(targetWindow, () => {
			cb(offset, false);
		}, instance.options.isScrollingResetDelay);
		const createHandler = (isScrolling) => () => {
			const { horizontal, isRtl } = instance.options;
			offset = horizontal ? element["scrollLeft"] * (isRtl && -1 || 1) : element["scrollTop"];
			fallback();
			cb(offset, isScrolling);
		};
		const handler = createHandler(true);
		const endHandler = createHandler(false);
		element.addEventListener("scroll", handler, addEventListenerOptions);
		const registerScrollendEvent = instance.options.useScrollendEvent && supportsScrollend;
		if (registerScrollendEvent) element.addEventListener("scrollend", endHandler, addEventListenerOptions);
		return () => {
			element.removeEventListener("scroll", handler);
			if (registerScrollendEvent) element.removeEventListener("scrollend", endHandler);
		};
	};
	measureElement = (element, entry, instance) => {
		if (entry == null ? void 0 : entry.borderBoxSize) {
			const box = entry.borderBoxSize[0];
			if (box) return Math.round(box[instance.options.horizontal ? "inlineSize" : "blockSize"]);
		}
		return element[instance.options.horizontal ? "offsetWidth" : "offsetHeight"];
	};
	elementScroll = (offset, { adjustments = 0, behavior }, instance) => {
		var _a, _b;
		const toOffset = offset + adjustments;
		(_b = (_a = instance.scrollElement) == null ? void 0 : _a.scrollTo) == null || _b.call(_a, {
			[instance.options.horizontal ? "left" : "top"]: toOffset,
			behavior
		});
	};
	Virtualizer = class {
		constructor(opts) {
			this.unsubs = [];
			this.scrollElement = null;
			this.targetWindow = null;
			this.isScrolling = false;
			this.scrollState = null;
			this.measurementsCache = [];
			this.itemSizeCache = /* @__PURE__ */ new Map();
			this.laneAssignments = /* @__PURE__ */ new Map();
			this.pendingMeasuredCacheIndexes = [];
			this.prevLanes = void 0;
			this.lanesChangedFlag = false;
			this.lanesSettling = false;
			this.scrollRect = null;
			this.scrollOffset = null;
			this.scrollDirection = null;
			this.scrollAdjustments = 0;
			this.elementsCache = /* @__PURE__ */ new Map();
			this.now = () => {
				var _a, _b, _c;
				return ((_c = (_b = (_a = this.targetWindow) == null ? void 0 : _a.performance) == null ? void 0 : _b.now) == null ? void 0 : _c.call(_b)) ?? Date.now();
			};
			this.observer = /* @__PURE__ */ (() => {
				let _ro = null;
				const get = () => {
					if (_ro) return _ro;
					if (!this.targetWindow || !this.targetWindow.ResizeObserver) return null;
					return _ro = new this.targetWindow.ResizeObserver((entries) => {
						entries.forEach((entry) => {
							const run = () => {
								const node = entry.target;
								const index = this.indexFromElement(node);
								if (!node.isConnected) {
									this.observer.unobserve(node);
									return;
								}
								if (this.shouldMeasureDuringScroll(index)) this.resizeItem(index, this.options.measureElement(node, entry, this));
							};
							this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(run) : run();
						});
					});
				};
				return {
					disconnect: () => {
						var _a;
						(_a = get()) == null || _a.disconnect();
						_ro = null;
					},
					observe: (target) => {
						var _a;
						return (_a = get()) == null ? void 0 : _a.observe(target, { box: "border-box" });
					},
					unobserve: (target) => {
						var _a;
						return (_a = get()) == null ? void 0 : _a.unobserve(target);
					}
				};
			})();
			this.range = null;
			this.setOptions = (opts2) => {
				Object.entries(opts2).forEach(([key, value]) => {
					if (typeof value === "undefined") delete opts2[key];
				});
				this.options = {
					debug: false,
					initialOffset: 0,
					overscan: 1,
					paddingStart: 0,
					paddingEnd: 0,
					scrollPaddingStart: 0,
					scrollPaddingEnd: 0,
					horizontal: false,
					getItemKey: defaultKeyExtractor,
					rangeExtractor: defaultRangeExtractor,
					onChange: () => {},
					measureElement,
					initialRect: {
						width: 0,
						height: 0
					},
					scrollMargin: 0,
					gap: 0,
					indexAttribute: "data-index",
					initialMeasurementsCache: [],
					lanes: 1,
					isScrollingResetDelay: 150,
					enabled: true,
					isRtl: false,
					useScrollendEvent: false,
					useAnimationFrameWithResizeObserver: false,
					...opts2
				};
			};
			this.notify = (sync) => {
				var _a, _b;
				(_b = (_a = this.options).onChange) == null || _b.call(_a, this, sync);
			};
			this.maybeNotify = memo(() => {
				this.calculateRange();
				return [
					this.isScrolling,
					this.range ? this.range.startIndex : null,
					this.range ? this.range.endIndex : null
				];
			}, (isScrolling) => {
				this.notify(isScrolling);
			}, {
				key: false,
				debug: () => this.options.debug,
				initialDeps: [
					this.isScrolling,
					this.range ? this.range.startIndex : null,
					this.range ? this.range.endIndex : null
				]
			});
			this.cleanup = () => {
				this.unsubs.filter(Boolean).forEach((d) => d());
				this.unsubs = [];
				this.observer.disconnect();
				if (this.rafId != null && this.targetWindow) {
					this.targetWindow.cancelAnimationFrame(this.rafId);
					this.rafId = null;
				}
				this.scrollState = null;
				this.scrollElement = null;
				this.targetWindow = null;
			};
			this._didMount = () => {
				return () => {
					this.cleanup();
				};
			};
			this._willUpdate = () => {
				var _a;
				const scrollElement = this.options.enabled ? this.options.getScrollElement() : null;
				if (this.scrollElement !== scrollElement) {
					this.cleanup();
					if (!scrollElement) {
						this.maybeNotify();
						return;
					}
					this.scrollElement = scrollElement;
					if (this.scrollElement && "ownerDocument" in this.scrollElement) this.targetWindow = this.scrollElement.ownerDocument.defaultView;
					else this.targetWindow = ((_a = this.scrollElement) == null ? void 0 : _a.window) ?? null;
					this.elementsCache.forEach((cached) => {
						this.observer.observe(cached);
					});
					this.unsubs.push(this.options.observeElementRect(this, (rect) => {
						this.scrollRect = rect;
						this.maybeNotify();
					}));
					this.unsubs.push(this.options.observeElementOffset(this, (offset, isScrolling) => {
						this.scrollAdjustments = 0;
						this.scrollDirection = isScrolling ? this.getScrollOffset() < offset ? "forward" : "backward" : null;
						this.scrollOffset = offset;
						this.isScrolling = isScrolling;
						if (this.scrollState) this.scheduleScrollReconcile();
						this.maybeNotify();
					}));
					this._scrollToOffset(this.getScrollOffset(), {
						adjustments: void 0,
						behavior: void 0
					});
				}
			};
			this.rafId = null;
			this.getSize = () => {
				if (!this.options.enabled) {
					this.scrollRect = null;
					return 0;
				}
				this.scrollRect = this.scrollRect ?? this.options.initialRect;
				return this.scrollRect[this.options.horizontal ? "width" : "height"];
			};
			this.getScrollOffset = () => {
				if (!this.options.enabled) {
					this.scrollOffset = null;
					return 0;
				}
				this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset === "function" ? this.options.initialOffset() : this.options.initialOffset);
				return this.scrollOffset;
			};
			this.getFurthestMeasurement = (measurements, index) => {
				const furthestMeasurementsFound = /* @__PURE__ */ new Map();
				const furthestMeasurements = /* @__PURE__ */ new Map();
				for (let m = index - 1; m >= 0; m--) {
					const measurement = measurements[m];
					if (furthestMeasurementsFound.has(measurement.lane)) continue;
					const previousFurthestMeasurement = furthestMeasurements.get(measurement.lane);
					if (previousFurthestMeasurement == null || measurement.end > previousFurthestMeasurement.end) furthestMeasurements.set(measurement.lane, measurement);
					else if (measurement.end < previousFurthestMeasurement.end) furthestMeasurementsFound.set(measurement.lane, true);
					if (furthestMeasurementsFound.size === this.options.lanes) break;
				}
				return furthestMeasurements.size === this.options.lanes ? Array.from(furthestMeasurements.values()).sort((a, b) => {
					if (a.end === b.end) return a.index - b.index;
					return a.end - b.end;
				})[0] : void 0;
			};
			this.getMeasurementOptions = memo(() => [
				this.options.count,
				this.options.paddingStart,
				this.options.scrollMargin,
				this.options.getItemKey,
				this.options.enabled,
				this.options.lanes
			], (count, paddingStart, scrollMargin, getItemKey, enabled, lanes) => {
				if (this.prevLanes !== void 0 && this.prevLanes !== lanes) this.lanesChangedFlag = true;
				this.prevLanes = lanes;
				this.pendingMeasuredCacheIndexes = [];
				return {
					count,
					paddingStart,
					scrollMargin,
					getItemKey,
					enabled,
					lanes
				};
			}, { key: false });
			this.getMeasurements = memo(() => [this.getMeasurementOptions(), this.itemSizeCache], ({ count, paddingStart, scrollMargin, getItemKey, enabled, lanes }, itemSizeCache) => {
				if (!enabled) {
					this.measurementsCache = [];
					this.itemSizeCache.clear();
					this.laneAssignments.clear();
					return [];
				}
				if (this.laneAssignments.size > count) {
					for (const index of this.laneAssignments.keys()) if (index >= count) this.laneAssignments.delete(index);
				}
				if (this.lanesChangedFlag) {
					this.lanesChangedFlag = false;
					this.lanesSettling = true;
					this.measurementsCache = [];
					this.itemSizeCache.clear();
					this.laneAssignments.clear();
					this.pendingMeasuredCacheIndexes = [];
				}
				if (this.measurementsCache.length === 0 && !this.lanesSettling) {
					this.measurementsCache = this.options.initialMeasurementsCache;
					this.measurementsCache.forEach((item) => {
						this.itemSizeCache.set(item.key, item.size);
					});
				}
				const min = this.lanesSettling ? 0 : this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
				this.pendingMeasuredCacheIndexes = [];
				if (this.lanesSettling && this.measurementsCache.length === count) this.lanesSettling = false;
				const measurements = this.measurementsCache.slice(0, min);
				const laneLastIndex = new Array(lanes).fill(void 0);
				for (let m = 0; m < min; m++) {
					const item = measurements[m];
					if (item) laneLastIndex[item.lane] = m;
				}
				for (let i = min; i < count; i++) {
					const key = getItemKey(i);
					const cachedLane = this.laneAssignments.get(i);
					let lane;
					let start;
					if (cachedLane !== void 0 && this.options.lanes > 1) {
						lane = cachedLane;
						const prevIndex = laneLastIndex[lane];
						const prevInLane = prevIndex !== void 0 ? measurements[prevIndex] : void 0;
						start = prevInLane ? prevInLane.end + this.options.gap : paddingStart + scrollMargin;
					} else {
						const furthestMeasurement = this.options.lanes === 1 ? measurements[i - 1] : this.getFurthestMeasurement(measurements, i);
						start = furthestMeasurement ? furthestMeasurement.end + this.options.gap : paddingStart + scrollMargin;
						lane = furthestMeasurement ? furthestMeasurement.lane : i % this.options.lanes;
						if (this.options.lanes > 1) this.laneAssignments.set(i, lane);
					}
					const measuredSize = itemSizeCache.get(key);
					const size = typeof measuredSize === "number" ? measuredSize : this.options.estimateSize(i);
					const end = start + size;
					measurements[i] = {
						index: i,
						start,
						size,
						end,
						key,
						lane
					};
					laneLastIndex[lane] = i;
				}
				this.measurementsCache = measurements;
				return measurements;
			}, {
				key: false,
				debug: () => this.options.debug
			});
			this.calculateRange = memo(() => [
				this.getMeasurements(),
				this.getSize(),
				this.getScrollOffset(),
				this.options.lanes
			], (measurements, outerSize, scrollOffset, lanes) => {
				return this.range = measurements.length > 0 && outerSize > 0 ? calculateRange({
					measurements,
					outerSize,
					scrollOffset,
					lanes
				}) : null;
			}, {
				key: false,
				debug: () => this.options.debug
			});
			this.getVirtualIndexes = memo(() => {
				let startIndex = null;
				let endIndex = null;
				const range = this.calculateRange();
				if (range) {
					startIndex = range.startIndex;
					endIndex = range.endIndex;
				}
				this.maybeNotify.updateDeps([
					this.isScrolling,
					startIndex,
					endIndex
				]);
				return [
					this.options.rangeExtractor,
					this.options.overscan,
					this.options.count,
					startIndex,
					endIndex
				];
			}, (rangeExtractor, overscan, count, startIndex, endIndex) => {
				return startIndex === null || endIndex === null ? [] : rangeExtractor({
					startIndex,
					endIndex,
					overscan,
					count
				});
			}, {
				key: false,
				debug: () => this.options.debug
			});
			this.indexFromElement = (node) => {
				const attributeName = this.options.indexAttribute;
				const indexStr = node.getAttribute(attributeName);
				if (!indexStr) {
					console.warn(`Missing attribute name '${attributeName}={index}' on measured element.`);
					return -1;
				}
				return parseInt(indexStr, 10);
			};
			this.shouldMeasureDuringScroll = (index) => {
				var _a;
				if (!this.scrollState || this.scrollState.behavior !== "smooth") return true;
				const scrollIndex = this.scrollState.index ?? ((_a = this.getVirtualItemForOffset(this.scrollState.lastTargetOffset)) == null ? void 0 : _a.index);
				if (scrollIndex !== void 0 && this.range) {
					const bufferSize = Math.max(this.options.overscan, Math.ceil((this.range.endIndex - this.range.startIndex) / 2));
					const minIndex = Math.max(0, scrollIndex - bufferSize);
					const maxIndex = Math.min(this.options.count - 1, scrollIndex + bufferSize);
					return index >= minIndex && index <= maxIndex;
				}
				return true;
			};
			this.measureElement = (node) => {
				if (!node) {
					this.elementsCache.forEach((cached, key2) => {
						if (!cached.isConnected) {
							this.observer.unobserve(cached);
							this.elementsCache.delete(key2);
						}
					});
					return;
				}
				const index = this.indexFromElement(node);
				const key = this.options.getItemKey(index);
				const prevNode = this.elementsCache.get(key);
				if (prevNode !== node) {
					if (prevNode) this.observer.unobserve(prevNode);
					this.observer.observe(node);
					this.elementsCache.set(key, node);
				}
				if ((!this.isScrolling || this.scrollState) && this.shouldMeasureDuringScroll(index)) this.resizeItem(index, this.options.measureElement(node, void 0, this));
			};
			this.resizeItem = (index, size) => {
				var _a;
				const item = this.measurementsCache[index];
				if (!item) return;
				const delta = size - (this.itemSizeCache.get(item.key) ?? item.size);
				if (delta !== 0) {
					if (((_a = this.scrollState) == null ? void 0 : _a.behavior) !== "smooth" && (this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(item, delta, this) : item.start < this.getScrollOffset() + this.scrollAdjustments)) this._scrollToOffset(this.getScrollOffset(), {
						adjustments: this.scrollAdjustments += delta,
						behavior: void 0
					});
					this.pendingMeasuredCacheIndexes.push(item.index);
					this.itemSizeCache = new Map(this.itemSizeCache.set(item.key, size));
					this.notify(false);
				}
			};
			this.getVirtualItems = memo(() => [this.getVirtualIndexes(), this.getMeasurements()], (indexes, measurements) => {
				const virtualItems = [];
				for (let k = 0, len = indexes.length; k < len; k++) {
					const measurement = measurements[indexes[k]];
					virtualItems.push(measurement);
				}
				return virtualItems;
			}, {
				key: false,
				debug: () => this.options.debug
			});
			this.getVirtualItemForOffset = (offset) => {
				const measurements = this.getMeasurements();
				if (measurements.length === 0) return;
				return notUndefined(measurements[findNearestBinarySearch(0, measurements.length - 1, (index) => notUndefined(measurements[index]).start, offset)]);
			};
			this.getMaxScrollOffset = () => {
				if (!this.scrollElement) return 0;
				if ("scrollHeight" in this.scrollElement) return this.options.horizontal ? this.scrollElement.scrollWidth - this.scrollElement.clientWidth : this.scrollElement.scrollHeight - this.scrollElement.clientHeight;
				else {
					const doc = this.scrollElement.document.documentElement;
					return this.options.horizontal ? doc.scrollWidth - this.scrollElement.innerWidth : doc.scrollHeight - this.scrollElement.innerHeight;
				}
			};
			this.getOffsetForAlignment = (toOffset, align, itemSize = 0) => {
				if (!this.scrollElement) return 0;
				const size = this.getSize();
				const scrollOffset = this.getScrollOffset();
				if (align === "auto") align = toOffset >= scrollOffset + size ? "end" : "start";
				if (align === "center") toOffset += (itemSize - size) / 2;
				else if (align === "end") toOffset -= size;
				const maxOffset = this.getMaxScrollOffset();
				return Math.max(Math.min(maxOffset, toOffset), 0);
			};
			this.getOffsetForIndex = (index, align = "auto") => {
				index = Math.max(0, Math.min(index, this.options.count - 1));
				const size = this.getSize();
				const scrollOffset = this.getScrollOffset();
				const item = this.measurementsCache[index];
				if (!item) return;
				if (align === "auto") if (item.end >= scrollOffset + size - this.options.scrollPaddingEnd) align = "end";
				else if (item.start <= scrollOffset + this.options.scrollPaddingStart) align = "start";
				else return [scrollOffset, align];
				if (align === "end" && index === this.options.count - 1) return [this.getMaxScrollOffset(), align];
				const toOffset = align === "end" ? item.end + this.options.scrollPaddingEnd : item.start - this.options.scrollPaddingStart;
				return [this.getOffsetForAlignment(toOffset, align, item.size), align];
			};
			this.scrollToOffset = (toOffset, { align = "start", behavior = "auto" } = {}) => {
				const offset = this.getOffsetForAlignment(toOffset, align);
				const now = this.now();
				this.scrollState = {
					index: null,
					align,
					behavior,
					startedAt: now,
					lastTargetOffset: offset,
					stableFrames: 0
				};
				this._scrollToOffset(offset, {
					adjustments: void 0,
					behavior
				});
				this.scheduleScrollReconcile();
			};
			this.scrollToIndex = (index, { align: initialAlign = "auto", behavior = "auto" } = {}) => {
				index = Math.max(0, Math.min(index, this.options.count - 1));
				const offsetInfo = this.getOffsetForIndex(index, initialAlign);
				if (!offsetInfo) return;
				const [offset, align] = offsetInfo;
				const now = this.now();
				this.scrollState = {
					index,
					align,
					behavior,
					startedAt: now,
					lastTargetOffset: offset,
					stableFrames: 0
				};
				this._scrollToOffset(offset, {
					adjustments: void 0,
					behavior
				});
				this.scheduleScrollReconcile();
			};
			this.scrollBy = (delta, { behavior = "auto" } = {}) => {
				const offset = this.getScrollOffset() + delta;
				const now = this.now();
				this.scrollState = {
					index: null,
					align: "start",
					behavior,
					startedAt: now,
					lastTargetOffset: offset,
					stableFrames: 0
				};
				this._scrollToOffset(offset, {
					adjustments: void 0,
					behavior
				});
				this.scheduleScrollReconcile();
			};
			this.getTotalSize = () => {
				var _a;
				const measurements = this.getMeasurements();
				let end;
				if (measurements.length === 0) end = this.options.paddingStart;
				else if (this.options.lanes === 1) end = ((_a = measurements[measurements.length - 1]) == null ? void 0 : _a.end) ?? 0;
				else {
					const endByLane = Array(this.options.lanes).fill(null);
					let endIndex = measurements.length - 1;
					while (endIndex >= 0 && endByLane.some((val) => val === null)) {
						const item = measurements[endIndex];
						if (endByLane[item.lane] === null) endByLane[item.lane] = item.end;
						endIndex--;
					}
					end = Math.max(...endByLane.filter((val) => val !== null));
				}
				return Math.max(end - this.options.scrollMargin + this.options.paddingEnd, 0);
			};
			this._scrollToOffset = (offset, { adjustments, behavior }) => {
				this.options.scrollToFn(offset, {
					behavior,
					adjustments
				}, this);
			};
			this.measure = () => {
				this.itemSizeCache = /* @__PURE__ */ new Map();
				this.laneAssignments = /* @__PURE__ */ new Map();
				this.notify(false);
			};
			this.setOptions(opts);
		}
		scheduleScrollReconcile() {
			if (!this.targetWindow) {
				this.scrollState = null;
				return;
			}
			if (this.rafId != null) return;
			this.rafId = this.targetWindow.requestAnimationFrame(() => {
				this.rafId = null;
				this.reconcileScroll();
			});
		}
		reconcileScroll() {
			if (!this.scrollState) return;
			if (!this.scrollElement) return;
			if (this.now() - this.scrollState.startedAt > 5e3) {
				this.scrollState = null;
				return;
			}
			const offsetInfo = this.scrollState.index != null ? this.getOffsetForIndex(this.scrollState.index, this.scrollState.align) : void 0;
			const targetOffset = offsetInfo ? offsetInfo[0] : this.scrollState.lastTargetOffset;
			const STABLE_FRAMES = 1;
			const targetChanged = targetOffset !== this.scrollState.lastTargetOffset;
			if (!targetChanged && approxEqual(targetOffset, this.getScrollOffset())) {
				this.scrollState.stableFrames++;
				if (this.scrollState.stableFrames >= STABLE_FRAMES) {
					this.scrollState = null;
					return;
				}
			} else {
				this.scrollState.stableFrames = 0;
				if (targetChanged) {
					this.scrollState.lastTargetOffset = targetOffset;
					this.scrollState.behavior = "auto";
					this._scrollToOffset(targetOffset, {
						adjustments: void 0,
						behavior: "auto"
					});
				}
			}
			this.scheduleScrollReconcile();
		}
	};
	findNearestBinarySearch = (low, high, getCurrentValue, value) => {
		while (low <= high) {
			const middle = (low + high) / 2 | 0;
			const currentValue = getCurrentValue(middle);
			if (currentValue < value) low = middle + 1;
			else if (currentValue > value) high = middle - 1;
			else return middle;
		}
		if (low > 0) return low - 1;
		else return 0;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+react-virtual@3.13.23_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/@tanstack/react-virtual/dist/esm/index.js
function useVirtualizerBase({ useFlushSync = true, ...options }) {
	const rerender = import_react$140.useReducer(() => ({}), {})[1];
	const resolvedOptions = {
		...options,
		onChange: (instance2, sync) => {
			var _a;
			if (useFlushSync && sync) (0, import_react_dom$5.flushSync)(rerender);
			else rerender();
			(_a = options.onChange) == null || _a.call(options, instance2, sync);
		}
	};
	const [instance] = import_react$140.useState(() => new Virtualizer(resolvedOptions));
	instance.setOptions(resolvedOptions);
	useIsomorphicLayoutEffect(() => {
		return instance._didMount();
	}, []);
	useIsomorphicLayoutEffect(() => {
		return instance._willUpdate();
	});
	return instance;
}
function useVirtualizer(options) {
	return useVirtualizerBase({
		observeElementRect,
		observeElementOffset,
		scrollToFn: elementScroll,
		...options
	});
}
var import_react$140, import_react_dom$5, useIsomorphicLayoutEffect;
var init_esm$1 = __esmMin((() => {
	import_react$140 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_react_dom$5 = /* @__PURE__ */ __toESM(require_react_dom(), 1);
	init_esm$2();
	init_esm$2();
	useIsomorphicLayoutEffect = typeof document !== "undefined" ? import_react$140.useLayoutEffect : import_react$140.useEffect;
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useVirtualScroll.js
var import_react$139, css$2, useVirtualScroll;
var init_useVirtualScroll = __esmMin((() => {
	init_esm$1();
	import_react$139 = /* @__PURE__ */ __toESM(require_react(), 1);
	css$2 = `
:host {
  contain: layout;
  background-color: var(--iui-color-background);
}
[data-iui-virtualizer='root'] {
  min-inline-size: 100%;
  position: relative;
}
::slotted([data-iui-virtualizer='item']) {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
}
`;
	useVirtualScroll = (params) => {
		let { ...rest } = params;
		let _virtualizer = useVirtualizer({
			indexAttribute: "data-iui-index",
			overscan: 10,
			...rest
		});
		let scrollToIndex = import_react$139.useCallback((index, options) => {
			setTimeout(() => {
				_virtualizer.scrollToIndex(index, {
					align: "auto",
					...options
				});
			});
		}, [_virtualizer]);
		let virtualizer = import_react$139.useMemo(() => ({
			..._virtualizer,
			scrollToIndex
		}), [_virtualizer, scrollToIndex]);
		return import_react$139.useMemo(() => ({
			virtualizer,
			css: css$2
		}), [virtualizer]);
	};
}));
var init_useInstance = __esmMin((() => {
	require_react();
})), useWarningLogger;
var init_useWarningLogger = __esmMin((() => {
	require_react();
	useWarningLogger = () => () => {};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useStableCallback.js
function useStableCallback(callback) {
	let latestCallback = useLatestRef$2(callback);
	return import_react$136.useCallback((...args) => latestCallback.current?.(...args), [latestCallback]);
}
var import_react$136;
var init_useStableCallback = __esmMin((() => {
	import_react$136 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_useLatestRef();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/index.js
var init_hooks$1 = __esmMin((() => {
	init_useEventListener();
	init_useMergedRefs();
	init_useResizeObserver();
	init_useContainerWidth();
	init_useGlobals();
	init_useIntersection();
	init_useMediaQuery();
	init_useSafeContext();
	init_useLatestRef();
	init_useIsomorphicLayoutEffect();
	init_useIsClient();
	init_useId();
	init_useControlledState();
	init_useSyncExternalStore();
	init_useVirtualScroll();
	init_useInstance();
	init_useWarningLogger();
	init_useStableCallback();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/focusable.js
function useFocusableElements(root, extraOptions) {
	let focusableElementsRef = import_react$135.useRef([]);
	let [focusableElements, setFocusableElements] = import_react$135.useState(focusableElementsRef.current);
	let setFocusableElementsRefAndState = (newFocusableElements) => {
		focusableElementsRef.current = newFocusableElements;
		setFocusableElements(newFocusableElements);
	};
	let { filter: filterProp } = extraOptions ?? {};
	let filter = useLatestRef$2(filterProp);
	let returnValue = import_react$135.useMemo(() => ({
		focusableElementsRef,
		focusableElements
	}), [focusableElementsRef, focusableElements]);
	return useSyncExternalStore(import_react$135.useCallback(() => {
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
var import_react$135, tabbableElementsSelector, getTabbableElements, getFocusableElements;
var init_focusable = __esmMin((() => {
	import_react$135 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_hooks$1();
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
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/supports.js
var supportsHas;
var init_supports = __esmMin((() => {
	init_dom();
	supportsHas = () => getWindow$1()?.CSS?.supports?.("selector(:has(+ *))");
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/styles.js
var t, u;
var init_styles = __esmMin((() => {
	t = "3.20.2";
	u = new Proxy({}, {
		get(e, i) {
			if (typeof i == "string" && i.startsWith("iui-")) return i.replace("iui-", `_iui${t.replace(/\./g, "")}-`);
		},
		has(e, i) {
			return typeof i == "string" && i.startsWith("iui-");
		}
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/polymorphic.js
var import_react$134, import_classnames$65, _base, polymorphic, getScopedClassName;
var init_polymorphic = __esmMin((() => {
	import_react$134 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$65 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_useGlobals();
	init_styles();
	_base = (defaultElement) => (className, attrs) => {
		return import_react$134.forwardRef(({ as = defaultElement, ...props }, ref) => {
			props = {
				...attrs,
				...props,
				className: getScopedClassName((0, import_classnames$65.default)(className, attrs?.className, props.className))
			};
			let Element = as || "div";
			if ("button" === Element || "a" === Element || "input" === Element && "checkbox" === props.type) {
				var _props;
				(_props = props).tabIndex ?? (_props.tabIndex = 0);
			}
			useGlobals();
			return import_react$134.createElement(Element, {
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
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/import.js
var importCss;
var init_import = __esmMin((() => {
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
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/react.js
var import_react$133, _React, isReact17or18, cloneElementWithRef;
var init_react = __esmMin((() => {
	import_react$133 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_useMergedRefs();
	_React = import_react$133;
	isReact17or18 = (() => {
		let version = _React.version?.split(".")?.[0];
		return ["17", "18"].includes(version);
	})();
	cloneElementWithRef = (children, getProps) => {
		if (!children) return null;
		if (!import_react$133.isValidElement(children)) return children;
		let childrenRef = isReact17or18 ? children?.ref : children.props?.ref;
		let props = getProps(children);
		let ref = mergeRefs(...[childrenRef, "ref" in props ? props.ref : null].filter(Boolean));
		return import_react$133.cloneElement(children, {
			...props,
			ref
		});
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/functions/index.js
var init_functions = __esmMin((() => {
	init_date();
	init_dom();
	init_colors();
	init_numbers();
	init_focusable();
	init_supports();
	init_polymorphic();
	init_import();
	init_react();
	init_dev();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/Resizer.js
var import_react$132, Resizer, Resizers, ResizerStyles, resizerStyles;
var init_Resizer = __esmMin((() => {
	import_react$132 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_functions();
	Resizer = (props) => import_react$132.createElement("div", { style: {
		position: "absolute",
		inset: -6,
		display: "grid",
		pointerEvents: "none"
	} }, import_react$132.createElement(ResizerStyles, null), import_react$132.createElement(Resizers, props));
	Resizers = (props) => {
		let { elementRef, containerRef, onResizeStart, onResizeEnd } = props;
		let isResizing = import_react$132.useRef(false);
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
					default: break;
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
		return import_react$132.createElement(import_react$132.Fragment, null, import_react$132.createElement("div", {
			"data-iui-resizer": "top-left",
			onPointerDown: onResizePointerDown,
			style: { cursor: "nw-resize" }
		}), import_react$132.createElement("div", {
			"data-iui-resizer": "top",
			onPointerDown: onResizePointerDown,
			style: { cursor: "n-resize" }
		}), import_react$132.createElement("div", {
			"data-iui-resizer": "top-right",
			onPointerDown: onResizePointerDown,
			style: { cursor: "ne-resize" }
		}), import_react$132.createElement("div", {
			"data-iui-resizer": "right",
			onPointerDown: onResizePointerDown,
			style: { cursor: "e-resize" }
		}), import_react$132.createElement("div", {
			"data-iui-resizer": "bottom-right",
			onPointerDown: onResizePointerDown,
			style: { cursor: "se-resize" }
		}), import_react$132.createElement("div", {
			"data-iui-resizer": "bottom",
			onPointerDown: onResizePointerDown,
			style: { cursor: "s-resize" }
		}), import_react$132.createElement("div", {
			"data-iui-resizer": "bottom-left",
			onPointerDown: onResizePointerDown,
			style: { cursor: "sw-resize" }
		}), import_react$132.createElement("div", {
			"data-iui-resizer": "left",
			onPointerDown: onResizePointerDown,
			style: { cursor: "w-resize" }
		}));
	};
	ResizerStyles = import_react$132.memo(() => import_react$132.createElement("style", null, resizerStyles));
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
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/FocusTrap.js
var import_react$131, FocusTrap;
var init_FocusTrap = __esmMin((() => {
	import_react$131 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_focusable();
	FocusTrap = (props) => {
		let { children } = props;
		let firstFocusTrapRef = import_react$131.useRef(null);
		let getFirstLastFocusables = import_react$131.useCallback(() => {
			let childrenElement = firstFocusTrapRef.current?.nextElementSibling;
			let elements = getTabbableElements(childrenElement);
			return [elements[0], elements[(elements.length || 1) - 1]];
		}, []);
		let onFirstFocus = import_react$131.useCallback((event) => {
			let [firstElement, lastElement] = getFirstLastFocusables();
			if (event.relatedTarget === firstElement) lastElement?.focus();
			else firstElement?.focus();
		}, [getFirstLastFocusables]);
		let onLastFocus = import_react$131.useCallback((event) => {
			let [firstElement, lastElement] = getFirstLastFocusables();
			if (event.relatedTarget === lastElement) firstElement?.focus();
			else lastElement?.focus();
		}, [getFirstLastFocusables]);
		return import_react$131.createElement(import_react$131.Fragment, null, import_react$131.createElement("div", {
			ref: firstFocusTrapRef,
			tabIndex: 0,
			onFocus: onFirstFocus,
			"aria-hidden": true
		}), children, import_react$131.createElement("div", {
			tabIndex: 0,
			onFocus: onLastFocus,
			"aria-hidden": true
		}));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/Box.js
var Box;
var init_Box = __esmMin((() => {
	init_polymorphic();
	Box = polymorphic.div("");
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Label/Label.js
var import_react$130, import_classnames$64, Label;
var init_Label = __esmMin((() => {
	import_react$130 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$64 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	Label = import_react$130.forwardRef((props, forwardedRef) => {
		let { displayStyle = "block", required, disabled, className, children, ...rest } = props;
		return import_react$130.createElement(Box, {
			as: "label",
			className: (0, import_classnames$64.default)("iui-input-label", {
				"iui-inline": "inline" === displayStyle,
				"iui-required": required
			}, className),
			"data-iui-disabled": disabled ? true : void 0,
			ref: forwardedRef,
			...rest
		}, children);
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Icon/Icon.js
var import_react$129, import_classnames$63, getSizeValue, Icon;
var init_Icon = __esmMin((() => {
	import_react$129 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$63 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_Box();
	getSizeValue = (size) => {
		switch (size) {
			case "small": return "s";
			case "medium": return "m";
			case "large": return "l";
			default: return size;
		}
	};
	Icon = import_react$129.forwardRef((props, ref) => {
		let { size = "medium", fill = "default", className, padded = false, ...rest } = props;
		return import_react$129.createElement(Box, {
			as: "span",
			className: (0, import_classnames$63.default)("iui-svg-icon", className),
			"data-iui-icon-size": getSizeValue(size),
			"data-iui-icon-color": fill,
			"data-iui-padded": padded ? "true" : void 0,
			ref,
			...rest
		});
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/StatusMessage/StatusMessage.js
var import_react$128, import_classnames$62, StatusMessage;
var init_StatusMessage = __esmMin((() => {
	import_react$128 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	import_classnames$62 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_Icon();
	StatusMessage = import_react$128.forwardRef((props, ref) => {
		let { children, startIcon: userStartIcon, status, className, iconProps, contentProps, ...rest } = props;
		let icon = userStartIcon ?? (status && StatusIconMap[status]());
		let shouldShowIcon = null !== userStartIcon && !!icon;
		return import_react$128.createElement(Box, {
			className: (0, import_classnames$62.default)("iui-status-message", className),
			"data-iui-status": status,
			ref,
			...rest
		}, shouldShowIcon ? import_react$128.createElement(Icon, {
			"aria-hidden": true,
			...iconProps
		}, icon) : null, import_react$128.createElement(Box, contentProps, children));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/InputContainer.js
var import_react$127, import_classnames$61, InputContainer;
var init_InputContainer = __esmMin((() => {
	import_react$127 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$61 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_Box();
	init_Label();
	init_StatusMessage();
	InputContainer = import_react$127.forwardRef((props, forwardedRef) => {
		let { label, disabled, required, status, message, icon, isLabelInline, children, className, style, statusMessage, inputId, labelId, ...rest } = props;
		return import_react$127.createElement(Box, {
			className: (0, import_classnames$61.default)("iui-input-grid", className),
			"data-iui-status": status,
			"data-iui-label-placement": isLabelInline ? "inline" : void 0,
			style,
			ref: forwardedRef,
			...rest
		}, label && import_react$127.createElement(Label, {
			as: inputId && "label" !== props.as ? "label" : "div",
			required,
			disabled,
			htmlFor: inputId,
			id: labelId
		}, label), children, statusMessage ? statusMessage : message && import_react$127.createElement(StatusMessage, {
			startIcon: icon,
			status
		}, message));
	});
}));
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
var init_floating_ui_utils_dom = __esmMin((() => {
	willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
	containRe = /paint|layout|strict|content/;
	isNotNone = (value) => !!value && value !== "none";
}));
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
var init_floating_ui_utils = __esmMin((() => {
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
}));
//#endregion
//#region ../../node_modules/.pnpm/tabbable@6.4.0/node_modules/tabbable/dist/index.esm.js
var candidateSelectors, candidateSelector, NoElement, matches, getRootNode, _isInert, isContentEditable, getCandidates, _getCandidatesIteratively, hasTabIndex, getTabIndex, getSortOrderTabIndex, sortOrderedTabbables, isInput, isHiddenInput, isDetailsWithSummary, getCheckedRadio, isTabbableRadio, isRadio, isNonTabbableRadio, isNodeAttached, isZeroArea, isHidden, isDisabledFromFieldset, isNodeMatchingSelectorFocusable, isNodeMatchingSelectorTabbable, isShadowRootTabbable, _sortByOrder, tabbable, focusable, isTabbable;
var init_index_esm = __esmMin((() => {
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
}));
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
	return floatingElement.hasAttribute(FOCUSABLE_ATTRIBUTE$1) ? floatingElement : floatingElement.querySelector("[data-floating-ui-focusable]") || floatingElement;
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
	const ref = import_react$125.useRef(value);
	index$1(() => {
		ref.current = value;
	});
	return ref;
}
function useEffectEvent(callback) {
	const ref = import_react$125.useRef(() => {});
	useSafeInsertionEffect(() => {
		ref.current = callback;
	});
	return import_react$125.useCallback(function() {
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
		if (isIndexOutOfListBounds(listRef, nextIndex)) if (loop && lastRow) nextIndex = event.key === (rtl ? ARROW_RIGHT$1 : ARROW_LEFT$1) ? maxIndex : findNonDisabledListIndex(listRef, {
			startingIndex: prevIndex - prevIndex % cols - 1,
			disabledIndices
		});
		else nextIndex = prevIndex;
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
var import_react$125, import_react$126, FOCUSABLE_ATTRIBUTE$1, TYPEABLE_SELECTOR, ARROW_LEFT$1, ARROW_RIGHT$1, ARROW_UP$1, ARROW_DOWN$1, index$1, SafeReact$1, useSafeInsertionEffect, getTabbableOptions;
var init_floating_ui_react_utils = __esmMin((() => {
	init_floating_ui_utils_dom();
	import_react$125 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_react$126 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_floating_ui_utils();
	init_index_esm();
	FOCUSABLE_ATTRIBUTE$1 = "data-floating-ui-focusable";
	TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
	ARROW_LEFT$1 = "ArrowLeft";
	ARROW_RIGHT$1 = "ArrowRight";
	ARROW_UP$1 = "ArrowUp";
	ARROW_DOWN$1 = "ArrowDown";
	index$1 = typeof document !== "undefined" ? import_react$126.useLayoutEffect : function noop() {};
	SafeReact$1 = { ...import_react$125 };
	useSafeInsertionEffect = SafeReact$1.useInsertionEffect || ((fn) => fn());
	getTabbableOptions = () => ({
		getShadowRoot: true,
		displayCheck: typeof ResizeObserver === "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
	});
}));
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
		case "end":
			coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
			break;
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
var init_floating_ui_core = __esmMin((() => {
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
						case "initialPlacement":
							resetPlacement = initialPlacement;
							break;
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
}));
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
	if (includeScale) if (offsetParent) {
		if (isElement(offsetParent)) scale = getScale(offsetParent);
	} else scale = getScale(element);
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
var init_floating_ui_dom = __esmMin((() => {
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
}));
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
	const ref = import_react$123.useRef(value);
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
	const [data, setData] = import_react$123.useState({
		x: 0,
		y: 0,
		strategy,
		placement,
		middlewareData: {},
		isPositioned: false
	});
	const [latestMiddleware, setLatestMiddleware] = import_react$123.useState(middleware);
	if (!deepEqual(latestMiddleware, middleware)) setLatestMiddleware(middleware);
	const [_reference, _setReference] = import_react$123.useState(null);
	const [_floating, _setFloating] = import_react$123.useState(null);
	const setReference = import_react$123.useCallback((node) => {
		if (node !== referenceRef.current) {
			referenceRef.current = node;
			_setReference(node);
		}
	}, []);
	const setFloating = import_react$123.useCallback((node) => {
		if (node !== floatingRef.current) {
			floatingRef.current = node;
			_setFloating(node);
		}
	}, []);
	const referenceEl = externalReference || _reference;
	const floatingEl = externalFloating || _floating;
	const referenceRef = import_react$123.useRef(null);
	const floatingRef = import_react$123.useRef(null);
	const dataRef = import_react$123.useRef(data);
	const hasWhileElementsMounted = whileElementsMounted != null;
	const whileElementsMountedRef = useLatestRef(whileElementsMounted);
	const platformRef = useLatestRef(platform);
	const openRef = useLatestRef(open);
	const update = import_react$123.useCallback(() => {
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
	const isMountedRef = import_react$123.useRef(false);
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
	const refs = import_react$123.useMemo(() => ({
		reference: referenceRef,
		floating: floatingRef,
		setReference,
		setFloating
	}), [setReference, setFloating]);
	const elements = import_react$123.useMemo(() => ({
		reference: referenceEl,
		floating: floatingEl
	}), [referenceEl, floatingEl]);
	const floatingStyles = import_react$123.useMemo(() => {
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
	return import_react$123.useMemo(() => ({
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
var import_react$123, import_react$124, import_react_dom$4, index, offset, shift, flip, size, autoPlacement, hide, inline;
var init_floating_ui_react_dom = __esmMin((() => {
	init_floating_ui_dom();
	import_react$123 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_react$124 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_react_dom$4 = /* @__PURE__ */ __toESM(require_react_dom(), 1);
	index = typeof document !== "undefined" ? import_react$124.useLayoutEffect : function noop() {};
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
}));
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+react@0.27.19_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/@floating-ui/react/dist/floating-ui.react.mjs
/**
* Merges an array of refs into a single memoized callback ref or `null`.
* @see https://floating-ui.com/docs/react-utils#usemergerefs
*/
function useMergeRefs(refs) {
	const cleanupRef = import_react$122.useRef(void 0);
	const refEffect = import_react$122.useCallback((instance) => {
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
	return import_react$122.useMemo(() => {
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
	const [nodes, setNodes] = import_react$122.useState(() => /* @__PURE__ */ new Set());
	const register = import_react$122.useCallback((node) => {
		setNodes((prevSet) => new Set(prevSet).add(node));
	}, []);
	const unregister = import_react$122.useCallback((node) => {
		setNodes((prevSet) => {
			const set = new Set(prevSet);
			set.delete(node);
			return set;
		});
	}, []);
	const map = import_react$122.useMemo(() => {
		const newMap = /* @__PURE__ */ new Map();
		Array.from(nodes.keys()).sort(sortByDocumentPosition).forEach((node, index) => {
			newMap.set(node, index);
		});
		return newMap;
	}, [nodes]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingListContext.Provider, {
		value: import_react$122.useMemo(() => ({
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
	const { register, unregister, map, elementsRef, labelsRef } = import_react$122.useContext(FloatingListContext);
	const [index, setIndex] = import_react$122.useState(null);
	const componentRef = import_react$122.useRef(null);
	const ref = import_react$122.useCallback((node) => {
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
	return import_react$122.useMemo(() => ({
		ref,
		index: index == null ? -1 : index
	}), [index, ref]);
}
function renderJsx(render, computedProps) {
	if (typeof render === "function") return render(computedProps);
	if (render) return /*#__PURE__*/ import_react$122.cloneElement(render, computedProps);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", { ...computedProps });
}
function useFloatingId() {
	const [id, setId] = import_react$122.useState(() => serverHandoffComplete ? genId() : void 0);
	index$1(() => {
		if (id == null) setId(genId());
	}, []);
	import_react$122.useEffect(() => {
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
		value: import_react$122.useMemo(() => ({
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
	const nodesRef = import_react$122.useRef([]);
	const addNode = import_react$122.useCallback((node) => {
		nodesRef.current = [...nodesRef.current, node];
	}, []);
	const removeNode = import_react$122.useCallback((node) => {
		nodesRef.current = nodesRef.current.filter((n) => n !== node);
	}, []);
	const [events] = import_react$122.useState(() => createEventEmitter());
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingTreeContext.Provider, {
		value: import_react$122.useMemo(() => ({
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
	const pointerTypeRef = import_react$122.useRef();
	const timeoutRef = import_react$122.useRef(-1);
	const handlerRef = import_react$122.useRef();
	const restTimeoutRef = import_react$122.useRef(-1);
	const blockMouseMoveRef = import_react$122.useRef(true);
	const performedPointerEventsMutationRef = import_react$122.useRef(false);
	const unbindMouseMoveRef = import_react$122.useRef(() => {});
	const restTimeoutPendingRef = import_react$122.useRef(false);
	const isHoverOpen = useEffectEvent(() => {
		var _dataRef$current$open;
		const type = (_dataRef$current$open = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open.type;
		return (type == null ? void 0 : type.includes("mouse")) && type !== "mousedown";
	});
	import_react$122.useEffect(() => {
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
	import_react$122.useEffect(() => {
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
	const closeWithDelay = import_react$122.useCallback(function(event, runElseBranch, reason) {
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
	import_react$122.useEffect(() => {
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
	import_react$122.useEffect(() => {
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
	const reference = import_react$122.useMemo(() => {
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
	return import_react$122.useMemo(() => enabled ? { reference } : {}, [enabled, reference]);
}
/**
* Provides context for a group of floating elements that should share a
* `delay`.
* @see https://floating-ui.com/docs/FloatingDelayGroup
*/
function FloatingDelayGroup(props) {
	const { children, delay, timeoutMs = 0 } = props;
	const [state, setState] = import_react$122.useReducer((prev, next) => ({
		...prev,
		...next
	}), {
		delay,
		timeoutMs,
		initialDelay: delay,
		currentId: null,
		isInstantPhase: false
	});
	const initialCurrentIdRef = import_react$122.useRef(null);
	const setCurrentId = import_react$122.useCallback((currentId) => {
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
		value: import_react$122.useMemo(() => ({
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
	const [portalNode, setPortalNode] = import_react$122.useState(null);
	const portalNodeRef = import_react$122.useRef(null);
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
	const [focusManagerState, setFocusManagerState] = import_react$122.useState(null);
	const beforeOutsideRef = import_react$122.useRef(null);
	const afterOutsideRef = import_react$122.useRef(null);
	const beforeInsideRef = import_react$122.useRef(null);
	const afterInsideRef = import_react$122.useRef(null);
	const modal = focusManagerState == null ? void 0 : focusManagerState.modal;
	const open = focusManagerState == null ? void 0 : focusManagerState.open;
	const shouldRenderGuards = !!focusManagerState && !focusManagerState.modal && focusManagerState.open && preserveTabOrder && !!(root || portalNode);
	import_react$122.useEffect(() => {
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
	import_react$122.useEffect(() => {
		if (!portalNode) return;
		if (open) return;
		enableFocusInside(portalNode);
	}, [open, portalNode]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PortalContext.Provider, {
		value: import_react$122.useMemo(() => ({
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
	return import_react$122.useMemo(() => {
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
	const startDismissButtonRef = import_react$122.useRef(null);
	const endDismissButtonRef = import_react$122.useRef(null);
	const preventReturnFocusRef = import_react$122.useRef(false);
	const isPointerDownRef = import_react$122.useRef(false);
	const tabbableIndexRef = import_react$122.useRef(-1);
	const blurTimeoutRef = import_react$122.useRef(-1);
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
	import_react$122.useEffect(() => {
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
	import_react$122.useEffect(() => {
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
	import_react$122.useEffect(() => {
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
	const beforeGuardRef = import_react$122.useRef(null);
	const afterGuardRef = import_react$122.useRef(null);
	const mergedBeforeGuardRef = useLiteMergeRefs([beforeGuardRef, portalContext == null ? void 0 : portalContext.beforeInsideRef]);
	const mergedAfterGuardRef = useLiteMergeRefs([afterGuardRef, portalContext == null ? void 0 : portalContext.afterInsideRef]);
	import_react$122.useEffect(() => {
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
	import_react$122.useEffect(() => {
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
	const pointerTypeRef = import_react$122.useRef();
	const didKeyDownRef = import_react$122.useRef(false);
	const reference = import_react$122.useMemo(() => ({
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
			if (event.key === "Enter") if (open && toggle) onOpenChange(false, event.nativeEvent, "click");
			else onOpenChange(true, event.nativeEvent, "click");
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
	return import_react$122.useMemo(() => enabled ? { reference } : {}, [enabled, reference]);
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
	const endedOrStartedInsideRef = import_react$122.useRef(false);
	const { escapeKey: escapeKeyBubbles, outsidePress: outsidePressBubbles } = normalizeProp(bubbles);
	const { escapeKey: escapeKeyCapture, outsidePress: outsidePressCapture } = normalizeProp(capture);
	const isComposingRef = import_react$122.useRef(false);
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
	import_react$122.useEffect(() => {
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
	import_react$122.useEffect(() => {
		dataRef.current.insideReactTree = false;
	}, [
		dataRef,
		outsidePress,
		outsidePressEvent
	]);
	const reference = import_react$122.useMemo(() => ({
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
	const floating = import_react$122.useMemo(() => {
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
	return import_react$122.useMemo(() => enabled ? {
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
	const dataRef = import_react$122.useRef({});
	const [events] = import_react$122.useState(() => createEventEmitter());
	const nested = useFloatingParentNodeId() != null;
	const [positionReference, setPositionReference] = import_react$122.useState(elementsProp.reference);
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
	const refs = import_react$122.useMemo(() => ({ setPositionReference }), []);
	const elements = import_react$122.useMemo(() => ({
		reference: positionReference || elementsProp.reference || null,
		floating: elementsProp.floating || null,
		domReference: elementsProp.reference
	}), [
		positionReference,
		elementsProp.reference,
		elementsProp.floating
	]);
	return import_react$122.useMemo(() => ({
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
	const [_domReference, setDomReference] = import_react$122.useState(null);
	const [positionReference, _setPositionReference] = import_react$122.useState(null);
	const domReference = (computedElements == null ? void 0 : computedElements.domReference) || _domReference;
	const domReferenceRef = import_react$122.useRef(null);
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
	const setPositionReference = import_react$122.useCallback((node) => {
		const computedPositionReference = isElement(node) ? {
			getBoundingClientRect: () => node.getBoundingClientRect(),
			getClientRects: () => node.getClientRects(),
			contextElement: node
		} : node;
		_setPositionReference(computedPositionReference);
		position.refs.setReference(computedPositionReference);
	}, [position.refs]);
	const setReference = import_react$122.useCallback((node) => {
		if (isElement(node) || node === null) {
			domReferenceRef.current = node;
			setDomReference(node);
		}
		if (isElement(position.refs.reference.current) || position.refs.reference.current === null || node !== null && !isElement(node)) position.refs.setReference(node);
	}, [position.refs]);
	const refs = import_react$122.useMemo(() => ({
		...position.refs,
		setReference,
		setPositionReference,
		domReference: domReferenceRef
	}), [
		position.refs,
		setReference,
		setPositionReference
	]);
	const elements = import_react$122.useMemo(() => ({
		...position.elements,
		domReference
	}), [position.elements, domReference]);
	const context = import_react$122.useMemo(() => ({
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
	return import_react$122.useMemo(() => ({
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
	const blockFocusRef = import_react$122.useRef(false);
	const timeoutRef = import_react$122.useRef(-1);
	const keyboardModalityRef = import_react$122.useRef(true);
	import_react$122.useEffect(() => {
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
	import_react$122.useEffect(() => {
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
	import_react$122.useEffect(() => {
		return () => {
			clearTimeoutIfSet(timeoutRef);
		};
	}, []);
	const reference = import_react$122.useMemo(() => ({
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
	return import_react$122.useMemo(() => enabled ? { reference } : {}, [enabled, reference]);
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
	const getReferenceProps = import_react$122.useCallback((userProps) => mergeProps(userProps, propsList, "reference"), referenceDeps);
	const getFloatingProps = import_react$122.useCallback((userProps) => mergeProps(userProps, propsList, "floating"), floatingDeps);
	const getItemProps = import_react$122.useCallback((userProps) => mergeProps(userProps, propsList, "item"), itemDeps);
	return import_react$122.useMemo(() => ({
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
	const focusItemOnOpenRef = import_react$122.useRef(focusItemOnOpen);
	const indexRef = import_react$122.useRef(selectedIndex != null ? selectedIndex : -1);
	const keyRef = import_react$122.useRef(null);
	const isPointerModalityRef = import_react$122.useRef(true);
	const previousOnNavigateRef = import_react$122.useRef(onNavigate);
	const previousMountedRef = import_react$122.useRef(!!elements.floating);
	const previousOpenRef = import_react$122.useRef(open);
	const forceSyncFocusRef = import_react$122.useRef(false);
	const forceScrollIntoViewRef = import_react$122.useRef(false);
	const disabledIndicesRef = useLatestRef$1(disabledIndices);
	const latestOpenRef = useLatestRef$1(open);
	const scrollItemIntoViewRef = useLatestRef$1(scrollItemIntoView);
	const selectedIndexRef = useLatestRef$1(selectedIndex);
	const [activeId, setActiveId] = import_react$122.useState();
	const [virtualId, setVirtualId] = import_react$122.useState();
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
	const item = import_react$122.useMemo(() => {
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
	const getParentOrientation = import_react$122.useCallback(() => {
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
			if (isHTMLElement(elements.domReference)) if (virtual) tree?.events.emit("virtualfocus", elements.domReference);
			else elements.domReference.focus();
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
			if (isMainOrientationToEndKey(event.key, orientation, rtl)) if (loop) indexRef.current = currentIndex >= maxIndex ? allowEscape && currentIndex !== listRef.current.length ? -1 : minIndex : findNonDisabledListIndex(listRef, {
				startingIndex: currentIndex,
				disabledIndices
			});
			else indexRef.current = Math.min(maxIndex, findNonDisabledListIndex(listRef, {
				startingIndex: currentIndex,
				disabledIndices
			}));
			else if (loop) indexRef.current = currentIndex <= minIndex ? allowEscape && currentIndex !== -1 ? listRef.current.length : maxIndex : findNonDisabledListIndex(listRef, {
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
	const ariaActiveDescendantProp = import_react$122.useMemo(() => {
		return virtual && open && hasActiveIndex && { "aria-activedescendant": virtualId || activeId };
	}, [
		virtual,
		open,
		hasActiveIndex,
		virtualId,
		activeId
	]);
	const floating = import_react$122.useMemo(() => {
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
	const reference = import_react$122.useMemo(() => {
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
	return import_react$122.useMemo(() => enabled ? {
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
	const floatingId = import_react$122.useMemo(() => {
		var _getFloatingFocusElem;
		return ((_getFloatingFocusElem = getFloatingFocusElement(elements.floating)) == null ? void 0 : _getFloatingFocusElem.id) || defaultFloatingId;
	}, [elements.floating, defaultFloatingId]);
	const ariaRole = (_componentRoleToAriaR = componentRoleToAriaRoleMap.get(role)) != null ? _componentRoleToAriaR : role;
	const isNested = useFloatingParentNodeId() != null;
	const reference = import_react$122.useMemo(() => {
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
	const floating = import_react$122.useMemo(() => {
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
	const item = import_react$122.useCallback((_ref) => {
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
	return import_react$122.useMemo(() => enabled ? {
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
				case "right":
					rectPoly = [
						[refRect.right - 1, bottom],
						[refRect.right - 1, top],
						[rect.left + 1, top],
						[rect.left + 1, bottom]
					];
					break;
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
var import_react$122, import_jsx_runtime, import_react_dom$3, FloatingListContext, FOCUSABLE_ATTRIBUTE, ACTIVE_KEY, SELECTED_KEY, ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ARROW_DOWN, CompositeContext, horizontalKeys, verticalKeys, allKeys, Composite, CompositeItem, SafeReact, serverHandoffComplete, count, genId, useId, FloatingNodeContext, FloatingTreeContext, useFloatingParentNodeId, useFloatingTree, safePolygonIdentifier, NOOP, FloatingDelayGroupContext, useDelayGroupContext, rafId, counters, uncontrolledElementsSet, markerMap, lockCount$1, supportsInert, correctElements, HIDDEN_STYLES, FocusGuard, HIDDEN_OWNER_STYLES, PortalContext, attr, usePortalContext, LIST_LIMIT, previouslyFocusedElements, VisuallyHiddenDismiss, bubbleHandlerKeys, captureHandlerKeys, normalizeProp, ESCAPE, componentRoleToAriaRoleMap;
var init_floating_ui_react = __esmMin((() => {
	import_react$122 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_floating_ui_react_utils();
	import_jsx_runtime = require_jsx_runtime();
	init_floating_ui_utils_dom();
	init_index_esm();
	import_react_dom$3 = /* @__PURE__ */ __toESM(require_react_dom(), 1);
	init_floating_ui_react_dom();
	FloatingListContext = /*#__PURE__*/ import_react$122.createContext({
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
	CompositeContext = /*#__PURE__*/ import_react$122.createContext({
		activeIndex: 0,
		onNavigate: () => {}
	});
	horizontalKeys = [ARROW_LEFT, ARROW_RIGHT];
	verticalKeys = [ARROW_UP, ARROW_DOWN];
	allKeys = [...horizontalKeys, ...verticalKeys];
	Composite = /*#__PURE__*/ import_react$122.forwardRef(function Composite(props, forwardedRef) {
		const { render, orientation = "both", loop = true, rtl = false, cols = 1, disabledIndices, activeIndex: externalActiveIndex, onNavigate: externalSetActiveIndex, itemSizes, dense = false, ...domProps } = props;
		const [internalActiveIndex, internalSetActiveIndex] = import_react$122.useState(0);
		const activeIndex = externalActiveIndex != null ? externalActiveIndex : internalActiveIndex;
		const onNavigate = useEffectEvent(externalSetActiveIndex != null ? externalSetActiveIndex : internalSetActiveIndex);
		const elementsRef = import_react$122.useRef([]);
		const renderElementProps = render && typeof render !== "function" ? render.props : {};
		const contextValue = import_react$122.useMemo(() => ({
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
			if (nextIndex === activeIndex && [...toEndKeys, ...toStartKeys].includes(event.key)) if (loop && nextIndex === maxIndex && toEndKeys.includes(event.key)) nextIndex = minIndex;
			else if (loop && nextIndex === minIndex && toStartKeys.includes(event.key)) nextIndex = maxIndex;
			else nextIndex = findNonDisabledListIndex(elementsRef, {
				startingIndex: nextIndex,
				decrement: toStartKeys.includes(event.key),
				disabledIndices
			});
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
	CompositeItem = /*#__PURE__*/ import_react$122.forwardRef(function CompositeItem(props, forwardedRef) {
		const { render, ...domProps } = props;
		const renderElementProps = render && typeof render !== "function" ? render.props : {};
		const { activeIndex, onNavigate } = import_react$122.useContext(CompositeContext);
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
	SafeReact = { ...import_react$122 };
	serverHandoffComplete = false;
	count = 0;
	genId = () => "floating-ui-" + Math.random().toString(36).slice(2, 6) + count++;
	useId = SafeReact.useId || useFloatingId;
	FloatingNodeContext = /*#__PURE__*/ import_react$122.createContext(null);
	FloatingTreeContext = /*#__PURE__*/ import_react$122.createContext(null);
	useFloatingParentNodeId = () => {
		var _React$useContext;
		return ((_React$useContext = import_react$122.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
	};
	useFloatingTree = () => import_react$122.useContext(FloatingTreeContext);
	safePolygonIdentifier = /*#__PURE__*/ createAttribute("safe-polygon");
	NOOP = () => {};
	FloatingDelayGroupContext = /*#__PURE__*/ import_react$122.createContext({
		delay: 0,
		initialDelay: 0,
		timeoutMs: 0,
		currentId: null,
		setCurrentId: NOOP,
		setState: NOOP,
		isInstantPhase: false
	});
	useDelayGroupContext = () => import_react$122.useContext(FloatingDelayGroupContext);
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
	FocusGuard = /*#__PURE__*/ import_react$122.forwardRef(function FocusGuard(props, ref) {
		const [role, setRole] = import_react$122.useState();
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
	PortalContext = /*#__PURE__*/ import_react$122.createContext(null);
	attr = /*#__PURE__*/ createAttribute("portal");
	usePortalContext = () => import_react$122.useContext(PortalContext);
	LIST_LIMIT = 20;
	previouslyFocusedElements = [];
	VisuallyHiddenDismiss = /*#__PURE__*/ import_react$122.forwardRef(function VisuallyHiddenDismiss(props, ref) {
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
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Tooltip/Tooltip.js
var import_react$121, import_classnames$60, defaultTooltipDelay, useTooltip, Tooltip;
var init_Tooltip = __esmMin((() => {
	import_react$121 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$60 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_floating_ui_react();
	init_utils$1();
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
		let syncWithControlledState = import_react$121.useCallback((element) => {
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
			whileElementsMounted: import_react$121.useMemo(() => open ? (...args) => autoUpdate(...args, autoUpdateOptions) : void 0, [autoUpdateOptions, open]),
			middleware: import_react$121.useMemo(() => [
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
		let ariaProps = import_react$121.useMemo(() => "description" === ariaStrategy ? { "aria-describedby": id } : "label" === ariaStrategy ? { "aria-labelledby": id } : {}, [ariaStrategy, id]);
		let { delay } = useDelayGroup(floating.context, { id: useId$1() });
		let interactions = useInteractions([
			useHover(floating.context, {
				delay: 0 !== delay ? delay : defaultTooltipDelay,
				handleClose: safePolygon({ buffer: -Infinity }),
				move: false
			}),
			useFocus(floating.context),
			useDismiss(floating.context, {
				referencePress: true,
				referencePressEvent: "click"
			})
		]);
		import_react$121.useEffect(() => {
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
		let getReferenceProps = import_react$121.useCallback((userProps) => interactions.getReferenceProps({
			...userProps,
			...ariaProps
		}), [interactions, ariaProps]);
		let floatingProps = import_react$121.useMemo(() => ({
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
		let setFloating = import_react$121.useCallback((element) => {
			_setFloating(element);
			syncWithControlledState(element);
		}, [_setFloating, syncWithControlledState]);
		let setReference = useStableCallback(floating.refs.setReference);
		let setPositionReference = useStableCallback(floating.refs.setPositionReference);
		return import_react$121.useMemo(() => ({
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
	Tooltip = import_react$121.forwardRef((props, forwardedRef) => {
		let { content, children, portal = true, className, style, ...rest } = props;
		let tooltip = useTooltip(rest);
		let refs = useMergedRefs(tooltip.refs.setFloating, forwardedRef);
		return import_react$121.createElement(import_react$121.Fragment, null, cloneElementWithRef(children, (children) => ({
			...tooltip.getReferenceProps(children.props),
			ref: tooltip.refs.setReference
		})), "none" !== props.ariaStrategy || tooltip.context.open ? import_react$121.createElement(Portal, { portal }, import_react$121.createElement(Box, {
			className: (0, import_classnames$60.default)("iui-tooltip", className),
			ref: refs,
			style: {
				...tooltip.floatingStyles,
				...style
			},
			...tooltip.floatingProps
		}, content)) : null);
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/VisuallyHidden/VisuallyHidden.js
var import_react$120, import_classnames$59, VisuallyHidden, css$1;
var init_VisuallyHidden = __esmMin((() => {
	import_react$120 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$59 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	VisuallyHidden = import_react$120.forwardRef((props, ref) => {
		let { as: asProp = "span", className, unhideOnFocus = true, children: childrenProp, ...rest } = props;
		let isHydrated = "hydrated" === useHydration();
		let children = [
			"div",
			"span",
			"p"
		].includes(asProp) ? import_react$120.createElement(import_react$120.Fragment, null, import_react$120.createElement(ShadowRoot$1, { css: css$1 }, import_react$120.createElement("slot", null)), isHydrated && childrenProp) : childrenProp;
		return import_react$120.createElement(Box, {
			as: asProp,
			className: (0, import_classnames$59.default)("iui-visually-hidden", className),
			"data-iui-unhide-on-focus": unhideOnFocus ? true : void 0,
			ref,
			...rest
		}, children);
	});
	css$1 = `
  :host(:where(:not([data-iui-unhide-on-focus]:is(:focus-within, :active)))) {
    clip-path: inset(50%) !important;
    overflow: hidden !important;
    position: absolute !important;
    white-space: nowrap !important;
    block-size: 1px !important;
    inline-size: 1px !important;
  }
`;
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ButtonGroup/ButtonGroup.js
var import_react$119, import_classnames$58, ButtonGroupContext, ButtonGroup, BaseGroup, OverflowGroup, OverflowGroupContent;
var init_ButtonGroup = __esmMin((() => {
	import_react$119 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$58 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	init_floating_ui_react();
	init_Tooltip();
	ButtonGroupContext = import_react$119.createContext(void 0);
	ButtonGroup = import_react$119.forwardRef((props, forwardedRef) => {
		let { children: childrenProp, overflowButton, overflowPlacement = "end", orientation = "horizontal", ...rest } = props;
		let children = import_react$119.useMemo(() => {
			if ("toolbar" !== props.role) return childrenProp;
			return import_react$119.Children.map(childrenProp, (child, index) => import_react$119.isValidElement(child) ? import_react$119.createElement(CompositeItem, {
				key: index,
				render: child
			}) : child);
		}, [childrenProp, props.role]);
		let node = overflowButton ? import_react$119.createElement(OverflowGroup, {
			orientation,
			overflowButton,
			overflowPlacement,
			ref: forwardedRef,
			...rest
		}, children) : import_react$119.createElement(BaseGroup, {
			orientation,
			ref: forwardedRef,
			...rest
		}, children);
		return import_react$119.createElement(FloatingDelayGroup, { delay: defaultTooltipDelay }, import_react$119.createElement(ButtonGroupContext.Provider, { value: orientation }, "toolbar" === props.role ? import_react$119.createElement(Composite, {
			orientation,
			render: node,
			disabledIndices: []
		}) : node));
	});
	BaseGroup = import_react$119.forwardRef((props, forwardedRef) => {
		let { orientation, className, ...rest } = props;
		return import_react$119.createElement(Box, {
			className: (0, import_classnames$58.default)("iui-button-group", className),
			"data-iui-orientation": "vertical" === orientation ? orientation : void 0,
			ref: forwardedRef,
			...rest
		});
	});
	OverflowGroup = import_react$119.forwardRef((props, forwardedRef) => {
		let { children: childrenProp, orientation, overflowButton, overflowPlacement, ...rest } = props;
		let items = import_react$119.useMemo(() => import_react$119.Children.toArray(childrenProp).filter(Boolean), [childrenProp]);
		return import_react$119.createElement(OverflowContainer, {
			as: BaseGroup,
			itemsCount: items.length,
			overflowOrientation: orientation,
			orientation,
			...rest,
			className: (0, import_classnames$58.default)({ "iui-button-group-overflow-x": !!overflowButton && "horizontal" === orientation }, props.className),
			ref: forwardedRef
		}, import_react$119.createElement(OverflowGroupContent, {
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
		return import_react$119.createElement(import_react$119.Fragment, null, overflowButton && "start" === overflowPlacement && overflowButton(overflowStart), "start" === overflowPlacement ? items.slice(overflowStart + 1) : items.slice(0, Math.max(0, overflowStart)), overflowButton && "end" === overflowPlacement && overflowButton(overflowStart));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/Portal.js
var import_react$118, import_react_dom$2, PortalContainerContext, Portal, usePortalTo;
var init_Portal = __esmMin((() => {
	import_react$118 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_react_dom$2 = /* @__PURE__ */ __toESM(require_react_dom(), 1);
	init_useIsClient();
	PortalContainerContext = import_react$118.createContext(null);
	Portal = (props) => {
		let { portal = true, children } = props;
		let isClient = useIsClient();
		let portalTo = usePortalTo(portal);
		if (!isClient) return null;
		return portalTo ? import_react_dom$2.createPortal(children, portalTo) : children;
	};
	usePortalTo = (portal) => {
		let portalContainer = import_react$118.useContext(PortalContainerContext);
		if ("boolean" == typeof portal) return portal ? portalContainer : null;
		return ("function" == typeof portal.to ? portal.to() : portal.to) ?? portalContainer;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Toast/Toast.js
var import_react$117, import_classnames$57, Toast, ToastPresentation, useAnimateToastBasedOnVisibility;
var init_Toast = __esmMin((() => {
	import_react$117 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$57 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	init_IconButton();
	init_Toaster();
	Toast = (props) => {
		let { content, category, type = "temporary", isVisible: isVisibleProp, link, duration = 7e3, hasCloseButton, onRemove, animateOutTo, domProps } = props;
		let closeTimeout = import_react$117.useRef(0);
		let { placement } = useSafeContext(ToasterStateContext).settings;
		let placementPosition = placement.startsWith("top") ? "top" : "bottom";
		let [visible, setVisible] = import_react$117.useState(isVisibleProp ?? true);
		let isVisible = isVisibleProp ?? visible;
		let [height, setHeight] = import_react$117.useState(0);
		let thisElement = import_react$117.useRef(null);
		let [margin, setMargin] = import_react$117.useState(0);
		let marginStyle = () => {
			if ("top" === placementPosition) return { marginBlockEnd: margin };
			return { marginBlockStart: margin };
		};
		import_react$117.useEffect(() => {
			if ("temporary" === type) setCloseTimeout(duration);
			return () => {
				clearCloseTimeout();
			};
		}, [duration, type]);
		import_react$117.useEffect(() => {
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
		}) ? import_react$117.createElement(Box, {
			ref: thisElement,
			className: "iui-toast-all",
			style: {
				height,
				...marginStyle()
			}
		}, import_react$117.createElement("div", { ref: onRef }, import_react$117.createElement(ToastPresentation, {
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
	ToastPresentation = import_react$117.forwardRef((props, forwardedRef) => {
		let { content, category, type = "temporary", link, hasCloseButton, onClose, className, contentProps, ...rest } = props;
		let StatusIcon = StatusIconMap[category];
		return import_react$117.createElement(Box, {
			className: (0, import_classnames$57.default)(`iui-toast iui-${category}`, className),
			ref: forwardedRef,
			...rest
		}, import_react$117.createElement(Box, { className: "iui-status-area" }, import_react$117.createElement(StatusIcon, { className: "iui-icon" })), import_react$117.createElement(Box, {
			as: "div",
			...contentProps,
			className: (0, import_classnames$57.default)("iui-message", contentProps?.className)
		}, content), link && import_react$117.createElement(ButtonBase, {
			...link,
			className: (0, import_classnames$57.default)("iui-anchor", "iui-toast-anchor", link.className),
			title: void 0,
			"data-iui-status": category,
			"data-iui-underline": true
		}, link.title), ("persisting" === type || hasCloseButton) && import_react$117.createElement(IconButton, {
			size: "small",
			styleType: "borderless",
			onClick: onClose,
			"aria-label": "Close"
		}, import_react$117.createElement(SvgCloseSmall, null)));
	});
	useAnimateToastBasedOnVisibility = (isVisible, args) => {
		let { thisElement, animateOutTo, onRemove } = args;
		let [shouldBeMounted, setShouldBeMounted] = import_react$117.useState(isVisible);
		let motionOk = useMediaQuery("(prefers-reduced-motion: no-preference)");
		let onRemoveRef = useLatestRef$2(onRemove);
		let [prevIsVisible, setPrevIsVisible] = import_react$117.useState(void 0);
		import_react$117.useEffect(() => {
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
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Toast/Toaster.js
var import_react$116, import_classnames$56, useToaster, Toaster, ToastProvider, toastReducer, ToasterStateContext, ToasterDispatchContext, nextId;
var init_Toaster = __esmMin((() => {
	import_react$116 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$56 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	init_Toast();
	useToaster = () => {
		let dispatch = useSafeContext(ToasterDispatchContext);
		return import_react$116.useMemo(() => {
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
		return import_react$116.createElement(Box, { className: (0, import_classnames$56.default)("iui-toast-wrapper", `iui-placement-${settings.placement}`) }, toasts.map((toastProps) => import_react$116.createElement(Toast, {
			key: toastProps.id,
			...toastProps
		})));
	};
	ToastProvider = ({ children, inherit = false }) => {
		let [toasterState, dispatch] = import_react$116.useReducer(toastReducer, {
			toasts: [],
			settings: {
				order: "auto",
				placement: "top"
			}
		});
		let toasterDispatchContext = import_react$116.useContext(ToasterDispatchContext);
		let toasterStateContext = import_react$116.useContext(ToasterStateContext);
		let shouldReuse = toasterStateContext && inherit;
		let toasterDispatchContextValue = shouldReuse ? toasterDispatchContext : dispatch;
		let toasterStateContextValue = shouldReuse ? toasterStateContext : toasterState;
		return import_react$116.createElement(ToasterDispatchContext.Provider, { value: toasterDispatchContextValue }, import_react$116.createElement(ToasterStateContext.Provider, { value: toasterStateContextValue }, children));
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
	ToasterStateContext = import_react$116.createContext(void 0);
	ToasterDispatchContext = import_react$116.createContext(void 0);
	nextId = (() => {
		let count = 0;
		return () => ++count;
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/meta.js
var _moduleType, meta;
var init_meta = __esmMin((() => {
	init_styles();
	_moduleType = "ESM";
	meta = {
		version: t,
		module: _moduleType
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ThemeProvider/ThemeProvider.js
var import_react$115, import_react_dom$1, import_classnames$55, versionWithoutDots, OwnerDocumentContext, ThemeProvider, MainRoot, Root, useParentThemeAndContext, PortalContainer, FallbackStyles, useIuiDebugRef, useInertPolyfill;
var init_ThemeProvider = __esmMin((() => {
	import_react$115 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom(), 1);
	import_classnames$55 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	init_ThemeContext();
	init_Toaster();
	init_meta();
	init_preload_helper();
	versionWithoutDots = meta.version.replace(/\./g, "");
	OwnerDocumentContext = import_react$115.createContext(void 0);
	ThemeProvider = import_react$115.forwardRef((props, forwardedRef) => {
		var _themeOptions, _themeOptions1;
		let { theme: themeProp = "inherit", children, themeOptions = {}, portalContainer: portalContainerProp, includeCss = "inherit" === themeProp, future: futureProp = {}, ...rest } = props;
		useInertPolyfill();
		let [rootElement, setRootElement] = import_react$115.useState(null);
		let parent = useParentThemeAndContext(rootElement);
		let theme = "inherit" === themeProp ? parent.theme || "light" : themeProp;
		(_themeOptions = themeOptions).applyBackground ?? (_themeOptions.applyBackground = !parent.theme);
		(_themeOptions1 = themeOptions).highContrast ?? (_themeOptions1.highContrast = "inherit" === themeProp ? parent.highContrast : void 0);
		let portalContainerFromParent = import_react$115.useContext(PortalContainerContext);
		let themeContextValue = import_react$115.useMemo(() => ({
			theme,
			themeOptions
		}), [theme, JSON.stringify(themeOptions)]);
		let [portalContainer, setPortalContainer] = import_react$115.useState(portalContainerProp || null);
		return import_react$115.createElement(FutureFlagsProvider, { value: futureProp }, import_react$115.createElement(PortalContainerContext.Provider, { value: portalContainer }, import_react$115.createElement(HydrationProvider, null, import_react$115.createElement(ThemeContext.Provider, { value: themeContextValue }, import_react$115.createElement(ToastProvider, { inherit: "inherit" === themeProp && !portalContainerProp }, includeCss && rootElement ? import_react$115.createElement(FallbackStyles, { root: rootElement }) : null, import_react$115.createElement(MainRoot, {
			theme,
			themeOptions,
			ref: useMergedRefs(forwardedRef, setRootElement, useIuiDebugRef),
			...rest
		}, children, import_react$115.createElement(PortalContainer, {
			theme,
			themeOptions,
			portalContainerProp,
			portalContainerFromParent,
			setPortalContainer,
			isInheritingTheme: "inherit" === themeProp
		})))))));
	});
	MainRoot = import_react$115.forwardRef((props, forwardedRef) => {
		let [ownerDocument, setOwnerDocument] = import_react$115.useState(void 0);
		let findOwnerDocumentFromRef = import_react$115.useCallback((el) => {
			if (el && el.ownerDocument !== ownerDocument) setOwnerDocument(el.ownerDocument);
		}, [ownerDocument, setOwnerDocument]);
		return import_react$115.createElement(OwnerDocumentContext.Provider, { value: ownerDocument }, import_react$115.createElement(Root, {
			...props,
			ref: useMergedRefs(findOwnerDocumentFromRef, forwardedRef)
		}));
	});
	Root = import_react$115.forwardRef((props, forwardedRef) => {
		let { theme, children, themeOptions, className, ...rest } = props;
		let prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
		let prefersHighContrast = useMediaQuery("(prefers-contrast: more)");
		let shouldApplyDark = "dark" === theme || "os" === theme && prefersDark;
		let shouldApplyHC = themeOptions?.highContrast ?? prefersHighContrast;
		let shouldApplyBackground = themeOptions?.applyBackground;
		let themeBridge = useFutureFlag("themeBridge");
		return import_react$115.createElement(Box, {
			className: (0, import_classnames$55.default)("iui-root", { "iui-root-background": shouldApplyBackground }, className),
			"data-iui-theme": shouldApplyDark ? "dark" : "light",
			"data-iui-contrast": shouldApplyHC ? "high" : "default",
			"data-iui-bridge": themeBridge ? "true" : void 0,
			ref: forwardedRef,
			...rest
		}, children);
	});
	useParentThemeAndContext = (rootElement) => {
		let parentContext = import_react$115.useContext(ThemeContext);
		let [parentThemeState, setParentTheme] = import_react$115.useState(parentContext?.theme);
		let [parentHighContrastState, setParentHighContrastState] = import_react$115.useState(parentContext?.themeOptions?.highContrast);
		let parentThemeRef = useLatestRef$2(parentContext?.theme);
		useIsomorphicLayoutEffect$1(() => {
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
	PortalContainer = import_react$115.memo(({ portalContainerProp, portalContainerFromParent, setPortalContainer, isInheritingTheme, theme, themeOptions }) => {
		let ownerDocument = import_react$115.useContext(OwnerDocumentContext);
		let shouldSetupPortalContainer = !portalContainerProp && (!isInheritingTheme || !portalContainerFromParent || !!ownerDocument && portalContainerFromParent.ownerDocument !== ownerDocument);
		let id = useId$1();
		import_react$115.useEffect(() => {
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
		if (shouldSetupPortalContainer && ownerDocument) return import_react_dom$1.createPortal(import_react$115.createElement(Root, {
			theme,
			themeOptions: {
				...themeOptions,
				applyBackground: false
			},
			"data-iui-portal": true,
			style: { display: "contents" },
			ref: setPortalContainer,
			id
		}, import_react$115.createElement(Toaster, null)), ownerDocument.body);
		if (portalContainerProp) return import_react_dom$1.createPortal(import_react$115.createElement(Toaster, null), portalContainerProp);
		return null;
	});
	FallbackStyles = ({ root }) => {
		useIsomorphicLayoutEffect$1(() => {
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
		return import_react$115.createElement(import_react$115.Fragment, null);
	};
	useIuiDebugRef = () => {
		var _globalThis;
		let _globalThis1 = globalThis;
		(_globalThis = _globalThis1).__iui || (_globalThis.__iui = { versions: /* @__PURE__ */ new Set() });
		_globalThis1.__iui.versions.add(JSON.stringify(meta));
	};
	useInertPolyfill = () => {
		let loaded = import_react$115.useRef(false);
		let modulePath = "https://cdn.jsdelivr.net/npm/wicg-inert@3.1.2/dist/inert.min.js";
		import_react$115.useEffect(() => {
			(async () => {
				if (!HTMLElement.prototype.hasOwnProperty("inert") && !loaded.current && !isUnitTest) {
					await new Function("url", "return import(url)")(modulePath);
					loaded.current = true;
				}
			})();
		}, []);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Popover/Popover.js
var import_react$114, import_classnames$54, PopoverOpenContext, PopoverInitialFocusContext, usePopover, Popover, PopoverPortal, DisplayContents;
var init_Popover = __esmMin((() => {
	import_react$114 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$54 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_floating_ui_react();
	init_utils$1();
	init_Portal();
	init_ThemeProvider();
	PopoverOpenContext = import_react$114.createContext(void 0);
	PopoverInitialFocusContext = import_react$114.createContext(void 0);
	usePopover = (options) => {
		let { placement = "bottom-start", visible, onVisibleChange, closeOnOutsideClick, autoUpdateOptions, matchWidth, interactions: interactionsProp, role, ...rest } = options;
		let mergedInteractions = import_react$114.useMemo(() => ({
			...interactionsProp,
			click: interactionsProp?.click ?? true,
			dismiss: interactionsProp?.dismiss ?? true,
			hover: interactionsProp?.hover ?? false,
			focus: interactionsProp?.focus ?? false
		}), [interactionsProp]);
		let tree = useFloatingTree();
		let middleware = import_react$114.useMemo(() => ({
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
			whileElementsMounted: import_react$114.useMemo(() => open ? (...args) => autoUpdate(...args, autoUpdateOptions) : void 0, [autoUpdateOptions, open]),
			...rest,
			middleware: import_react$114.useMemo(() => [
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
		let [referenceWidth, setReferenceWidth] = import_react$114.useState();
		let [availableHeight, setAvailableHeight] = import_react$114.useState();
		let getFloatingProps = import_react$114.useCallback((userProps) => interactions.getFloatingProps({
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
		let getReferenceProps = import_react$114.useCallback((userProps) => interactions.getReferenceProps({
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
		return import_react$114.useMemo(() => ({
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
	Popover = import_react$114.forwardRef((props, forwardedRef) => {
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
		let [popoverElement, setPopoverElement] = import_react$114.useState(null);
		let popoverRef = useMergedRefs(popover.refs.setFloating, forwardedRef, setPopoverElement);
		let triggerId = `${useId$1()}-trigger`;
		let hasAriaLabel = !!props["aria-labelledby"] || !!props["aria-label"];
		useIsomorphicLayoutEffect$1(() => {
			if (!positionReference) return;
			let setPositionReference = popover.refs.setPositionReference;
			setPositionReference(positionReference);
			return () => void setPositionReference(null);
		}, [popover.refs.setPositionReference, positionReference]);
		let [initialFocus, setInitialFocus] = import_react$114.useState();
		let initialFocusContextValue = import_react$114.useMemo(() => ({ setInitialFocus }), []);
		return import_react$114.createElement(import_react$114.Fragment, null, import_react$114.createElement(PopoverOpenContext.Provider, { value: popover.open }, cloneElementWithRef(children, (children) => ({
			id: children.props.id || triggerId,
			...popover.getReferenceProps(children.props),
			ref: popover.refs.setReference
		}))), popover.open ? import_react$114.createElement(PopoverInitialFocusContext.Provider, { value: initialFocusContextValue }, import_react$114.createElement(PopoverPortal, { portal }, import_react$114.createElement(ThemeProvider, null, import_react$114.createElement(PortalContainerContext.Provider, { value: popoverElement }, import_react$114.createElement(DisplayContents, null), import_react$114.createElement(FloatingFocusManager, {
			context: popover.context,
			modal: false,
			initialFocus
		}, import_react$114.createElement(Box, {
			className: (0, import_classnames$54.default)("iui-popover", { "iui-popover-surface": applyBackground }, className),
			"aria-labelledby": hasAriaLabel ? void 0 : popover.refs.domReference.current?.id,
			...popover.getFloatingProps(rest),
			ref: popoverRef
		}, content)))))) : null);
	});
	PopoverPortal = ({ children, portal = true }) => {
		let portalTo = usePortalTo(portal);
		return import_react$114.createElement(FloatingPortal, {
			key: portalTo?.id,
			root: portalTo ?? void 0
		}, import_react$114.createElement(DisplayContents, null), children);
	};
	DisplayContents = import_react$114.memo(() => import_react$114.createElement(ShadowRoot$1, { css: `
        :host {
          display: contents;
        }
      ` }, import_react$114.createElement("slot", null)));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Buttons/IconButton.js
var import_classnames$53, import_react$113, IconButton;
var init_IconButton = __esmMin((() => {
	import_classnames$53 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react$113 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	init_Tooltip();
	init_VisuallyHidden();
	init_ButtonGroup();
	init_Popover();
	IconButton = import_react$113.forwardRef((props, ref) => {
		let { isActive, children, styleType = "default", size, className, title, label = title, iconProps, labelProps, ...rest } = props;
		let buttonGroupOrientation = import_react$113.useContext(ButtonGroupContext);
		let hasPopoverOpen = import_react$113.useContext(PopoverOpenContext);
		useWarningLogger();
		let button = import_react$113.createElement(ButtonBase, {
			ref,
			className: (0, import_classnames$53.default)("iui-button", "iui-field", className),
			"data-iui-variant": "default" !== styleType ? styleType : void 0,
			"data-iui-size": size,
			"data-iui-active": isActive,
			"data-iui-has-popover": hasPopoverOpen ? "open" : void 0,
			"aria-pressed": isActive,
			...rest
		}, import_react$113.createElement(Box, {
			as: "span",
			"aria-hidden": true,
			...iconProps,
			className: (0, import_classnames$53.default)("iui-button-icon", iconProps?.className)
		}, children), label ? import_react$113.createElement(VisuallyHidden, null, label) : null);
		return label ? import_react$113.createElement(Tooltip, {
			placement: "vertical" === buttonGroupOrientation ? "right" : "top",
			...labelProps,
			content: label,
			ariaStrategy: "none"
		}, button) : button;
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/InputFlexContainer.js
var import_react$112, import_classnames$52, InputFlexContainer, InputFlexContainerButton, InputFlexContainerIcon;
var init_InputFlexContainer = __esmMin((() => {
	import_react$112 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$52 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_Box();
	init_Icon();
	init_IconButton();
	InputFlexContainer = import_react$112.forwardRef((props, ref) => {
		let { isDisabled, status, children, className, size, style, ...rest } = props;
		return import_react$112.createElement(Box, {
			className: (0, import_classnames$52.default)("iui-input-flex-container", className),
			"data-iui-status": status,
			"data-iui-size": size,
			"data-iui-disabled": isDisabled ? "true" : void 0,
			ref,
			style,
			...rest
		}, children);
	});
	InputFlexContainerButton = import_react$112.forwardRef((props, ref) => {
		let { className, ...rest } = props;
		return import_react$112.createElement(IconButton, {
			ref,
			className: (0, import_classnames$52.default)("iui-input-flex-container-icon", className),
			styleType: "borderless",
			...rest
		});
	});
	InputFlexContainerIcon = import_react$112.forwardRef((props, ref) => {
		let { className, ...rest } = props;
		return import_react$112.createElement(Icon, {
			ref,
			className: (0, import_classnames$52.default)("iui-input-flex-container-icon", className),
			padded: true,
			...rest
		});
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/InputWithIcon.js
var InputWithIcon;
var init_InputWithIcon = __esmMin((() => {
	init_polymorphic();
	InputWithIcon = polymorphic.div("iui-input-with-icon");
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/OverflowContainer.js
function useOverflowContainerContext() {
	return useSafeContext(OverflowContainerContext);
}
var import_react$111, OverflowContainerMain, OverflowContainerOverflowNode, OverflowContainerComponent, OverflowContainer, OverflowContainerContext, useOverflow, STARTING_MAX_ITEMS_COUNT, overflowGuessReducerInitialState, overflowGuessReducer;
var init_OverflowContainer = __esmMin((() => {
	import_react$111 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_useMergedRefs();
	init_Box();
	init_useIsomorphicLayoutEffect();
	init_useSafeContext();
	init_dev();
	init_useResizeObserver();
	OverflowContainerMain = import_react$111.forwardRef((props, forwardedRef) => {
		let { itemsCount, children, overflowOrientation, ...rest } = props;
		let [containerRef, visibleCount] = useOverflow(itemsCount, overflowOrientation);
		let overflowContainerContextValue = import_react$111.useMemo(() => ({
			visibleCount,
			itemsCount
		}), [itemsCount, visibleCount]);
		return import_react$111.createElement(OverflowContainerContext.Provider, { value: overflowContainerContextValue }, import_react$111.createElement(Box, {
			ref: useMergedRefs(forwardedRef, containerRef),
			...rest
		}, children));
	});
	OverflowContainerOverflowNode = (props) => {
		let { children } = props;
		let { visibleCount, itemsCount } = useOverflowContainerContext();
		return visibleCount < itemsCount ? children : null;
	};
	OverflowContainerComponent = import_react$111.forwardRef((props, forwardedRef) => {
		let { itemsCount, overflowOrientation = "horizontal", ...rest } = props;
		let [size, setSize] = import_react$111.useState(null);
		let [resizeRef] = useResizeObserver(setSize);
		let ref = useMergedRefs(resizeRef, forwardedRef);
		let key = `${itemsCount}${"vertical" === overflowOrientation ? size?.height : size?.width}`;
		return import_react$111.createElement(OverflowContainerMain, {
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
	OverflowContainerContext = import_react$111.createContext(void 0);
	useOverflow = (itemsCount, orientation = "horizontal") => {
		let [guessState, dispatch] = import_react$111.useReducer(overflowGuessReducer, { itemsCount }, overflowGuessReducerInitialState);
		let containerRef = import_react$111.useRef(null);
		let isGuessing = import_react$111.useRef(false);
		useIsomorphicLayoutEffect$1(() => {
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
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/providers/FutureFlagsProvider.js
function useFutureFlag(key) {
	return useSafeContext(FutureFlagsContext)[key];
}
var import_react$110, FutureFlagsContext, FutureFlagsProvider;
var init_FutureFlagsProvider = __esmMin((() => {
	import_react$110 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_useSafeContext();
	FutureFlagsContext = import_react$110.createContext({});
	FutureFlagsProvider = ({ children, value }) => {
		if (true === value) value = { themeBridge: true };
		let combinedValue = {
			...import_react$110.useContext(FutureFlagsContext),
			...value
		};
		return import_react$110.createElement(FutureFlagsContext.Provider, { value: import_react$110.useMemo(() => combinedValue, [JSON.stringify(combinedValue)]) }, children);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/providers/HydrationProvider.js
var import_react$109, HydrationContext, noopSubscribe, isServer, useHydration, HydrationProvider, HydrationCheck;
var init_HydrationProvider = __esmMin((() => {
	import_react$109 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_hooks$1();
	HydrationContext = import_react$109.createContext(false);
	noopSubscribe = () => () => {};
	isServer = "undefined" == typeof window;
	useHydration = () => {
		let hydrating = useSyncExternalStore(noopSubscribe, () => false, () => !isServer);
		let hydrated = import_react$109.useContext(HydrationContext);
		let hydratedFallback = useIsClient();
		if (hydrated || hydratedFallback) return "hydrated";
		if (hydrating) return "hydrating";
	};
	HydrationProvider = ({ children }) => {
		let [isHydrated, setIsHydrated] = import_react$109.useState(import_react$109.useContext(HydrationContext));
		let onHydrate = import_react$109.useCallback(() => setIsHydrated(true), []);
		return import_react$109.createElement(HydrationContext.Provider, { value: isHydrated }, isHydrated ? null : import_react$109.createElement(HydrationCheck, { onHydrate }), children);
	};
	HydrationCheck = ({ onHydrate }) => {
		import_react$109.useEffect(() => void onHydrate(), [onHydrate]);
		return null;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/providers/index.js
var init_providers = __esmMin((() => {
	init_FutureFlagsProvider();
	init_HydrationProvider();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/ShadowRoot.js
function useShadowRoot(templateRef, { css = "", flush = true }) {
	let [shadowRoot, setShadowRoot] = import_react$108.useState(null);
	let styleSheet = import_react$108.useRef(void 0);
	let latestCss = useLatestRef$2(css);
	let latestShadowRoot = useLatestRef$2(shadowRoot);
	let createStyleSheet = import_react$108.useCallback((shadow) => {
		if (shadow && supportsAdoptedStylesheets) {
			let currentWindow = shadow.ownerDocument.defaultView || globalThis;
			if (styleSheet.current instanceof currentWindow.CSSStyleSheet) return;
			styleSheet.current = new currentWindow.CSSStyleSheet();
			shadow.adoptedStyleSheets.push(styleSheet.current);
			if (latestCss.current) styleSheet.current.replaceSync(latestCss.current);
		}
	}, [latestCss]);
	useIsomorphicLayoutEffect$1(() => {
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
	useIsomorphicLayoutEffect$1(() => {
		if (css && supportsAdoptedStylesheets) styleSheet.current?.replaceSync(css);
	}, [css]);
	import_react$108.useEffect(() => {
		let listener = () => createStyleSheet(latestShadowRoot.current);
		window.addEventListener("appui:reparent", listener);
		return () => {
			window.removeEventListener("appui:reparent", listener);
		};
	}, [createStyleSheet, latestShadowRoot]);
	return shadowRoot;
}
var import_react$108, import_react_dom, isBrowser, supportsDSD, supportsAdoptedStylesheets, ShadowRoot$1, ClientShadowRoot;
var init_ShadowRoot = __esmMin((() => {
	import_react$108 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
	init_hooks$1();
	init_providers();
	isBrowser = "undefined" != typeof document;
	supportsDSD = isBrowser && "shadowRootMode" in HTMLTemplateElement.prototype;
	supportsAdoptedStylesheets = isBrowser && "adoptedStyleSheets" in Document.prototype;
	ShadowRoot$1 = ({ children, css, flush = true }) => {
		let isHydrating = "hydrating" === useHydration();
		if (!isBrowser) return import_react$108.createElement("template", { shadowrootmode: "open" }, css && import_react$108.createElement("style", null, css), children);
		if (supportsDSD && isHydrating) return null;
		return import_react$108.createElement(ClientShadowRoot, {
			css,
			flush
		}, children);
	};
	ClientShadowRoot = ({ children, css, flush = true }) => {
		let templateRef = import_react$108.useRef(null);
		let shadowRoot = useShadowRoot(templateRef, {
			css,
			flush
		});
		let fallbackCss = !supportsAdoptedStylesheets && css ? import_react$108.createElement("style", null, css) : null;
		return shadowRoot ? import_react_dom.createPortal(import_react$108.createElement(import_react$108.Fragment, null, fallbackCss, children), shadowRoot) : import_react$108.createElement("template", { ref: templateRef });
	};
}));
var init_MiddleTextTruncation = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/AutoclearingHiddenLiveRegion.js
var import_react$106, AutoclearingHiddenLiveRegion;
var init_AutoclearingHiddenLiveRegion = __esmMin((() => {
	import_react$106 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_VisuallyHidden();
	init_functions();
	AutoclearingHiddenLiveRegion = ({ text, ...props }) => {
		let [maybeText, setMaybeText] = import_react$106.useState(text);
		import_react$106.useEffect(() => {
			setMaybeText(text);
			let timeout = getWindow$1()?.setTimeout(() => setMaybeText(""), 5e3);
			return () => void getWindow$1()?.clearTimeout(timeout);
		}, [text]);
		return import_react$106.createElement(VisuallyHidden, {
			as: "div",
			"aria-live": "polite",
			"aria-atomic": "true",
			...props
		}, maybeText);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/ButtonBase.js
var import_react$105, import_classnames$51, ButtonBase;
var init_ButtonBase = __esmMin((() => {
	import_react$105 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$51 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_Box();
	init_useIsClient();
	ButtonBase = import_react$105.forwardRef((props, forwardedRef) => {
		let { as: asProp = "button", disabled: disabledProp, htmlDisabled, type: typeProp = "button" === asProp ? "button" : void 0, ...rest } = props;
		let isClient = useIsClient();
		let ariaDisabled = disabledProp && !htmlDisabled && isClient && "button" === asProp;
		let handleIfEnabled = (handler) => (e) => {
			if (disabledProp) return;
			handler?.(e);
		};
		let type = "button" === asProp && disabledProp ? "button" : typeProp;
		return import_react$105.createElement(Box, {
			as: asProp,
			type,
			ref: forwardedRef,
			"aria-disabled": ariaDisabled ? "true" : void 0,
			"data-iui-disabled": disabledProp ? "true" : void 0,
			disabled: htmlDisabled ?? (!isClient && disabledProp) ? true : void 0,
			...rest,
			className: (0, import_classnames$51.default)("iui-button-base", props.className),
			onClick: handleIfEnabled(props.onClick),
			onPointerDown: handleIfEnabled(props.onPointerDown),
			onPointerUp: handleIfEnabled(props.onPointerUp)
		});
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/lineClamp.js
var className, css, lineClamp;
var init_lineClamp = __esmMin((() => {
	className = "_iui-line-clamp";
	css = `
.${className} {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: var(--_iui-line-clamp, 3);
  -webkit-box-orient: vertical;
}
`;
	lineClamp = {
		css,
		className
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/FieldsetBase.js
var init_FieldsetBase = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/index.js
var init_components = __esmMin((() => {
	init_Resizer();
	init_FocusTrap();
	init_InputContainer();
	init_InputFlexContainer();
	init_InputWithIcon();
	init_MiddleTextTruncation();
	init_AutoclearingHiddenLiveRegion();
	init_Box();
	init_ButtonBase();
	init_Portal();
	init_ShadowRoot();
	init_lineClamp();
	init_FieldsetBase();
	init_OverflowContainer();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/props.js
var init_props = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@swc+helpers@0.5.21/node_modules/@swc/helpers/esm/_define_property.js
function _define_property(obj, key, value) {
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
var init__define_property = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/color/ColorValue.js
var scratchBytes, scratchUInt32, isRgbColor, isHslColor, isHsvColor, ColorValue;
var init_ColorValue = __esmMin((() => {
	init__define_property();
	init_numbers();
	scratchBytes = /* @__PURE__ */ new Uint8Array(4);
	scratchUInt32 = new Uint32Array(scratchBytes.buffer);
	isRgbColor = (value) => "string" != typeof value && "r" in value && "g" in value && "b" in value;
	isHslColor = (value) => "string" != typeof value && "h" in value && "s" in value && "l" in value;
	isHsvColor = (value) => "string" != typeof value && "h" in value && "s" in value && "v" in value;
	ColorValue = class ColorValue {
		static create(val) {
			if (!val) return ColorValue.fromTbgr(0);
			if (isRgbColor(val)) return ColorValue.fromRGB(val);
			if (isHslColor(val)) return ColorValue.fromHSL(val);
			if (isHsvColor(val)) return ColorValue.fromHSV(val);
			if ("string" == typeof val) return ColorValue.fromString(val, ColorValue.fromTbgr(0));
			return ColorValue.fromTbgr(0);
		}
		toTbgr() {
			return this._tbgr;
		}
		static fromTbgr(tbgr) {
			return new ColorValue(tbgr);
		}
		static fromRgbt(red, green, blue, transparency) {
			return this.fromTbgr(this.computeTbgrFromComponents(red, green, blue, transparency));
		}
		static computeTbgrFromComponents(red, green, blue, transparency) {
			scratchBytes[0] = red;
			scratchBytes[1] = green;
			scratchBytes[2] = blue;
			scratchBytes[3] = transparency || 0;
			return scratchUInt32[0];
		}
		static fromString(val, defaultColorIfNotParsed) {
			let [tbgr, hue] = this.computeTbgrFromString(val, defaultColorIfNotParsed?.toTbgr());
			return new ColorValue(tbgr, hue);
		}
		static fromHSL(hsl) {
			let alpha = hsl.a ?? 1;
			return new ColorValue(this.computeTbgrFromHSL(hsl.h / 360, hsl.s / 100, hsl.l / 100, Math.round((1 - alpha) * 255)), hsl.h);
		}
		static fromRGB(rgb) {
			let alpha = rgb.a ?? 1;
			return ColorValue.fromRgbt(rgb.r, rgb.g, rgb.b, Math.round((1 - alpha) * 255));
		}
		static fromHSV(hsv) {
			let alpha = hsv.a ?? 1;
			let transparency = Math.round((1 - alpha) * 255);
			if (!hsv.s || -1 === hsv.h) {
				let white = 255 & Math.floor(255 * hsv.v / 100 + .5 + 3e-14);
				return ColorValue.fromRgbt(white, white, white, 0);
			}
			let dhue = hsv.h, dsaturation = hsv.s, dvalue = hsv.v;
			if (360 === dhue) dhue = 0;
			dhue /= 60;
			let hueIntpart = Math.floor(dhue);
			let hueFractpart = dhue - hueIntpart;
			dvalue /= 100;
			dsaturation /= 100;
			let p = 255 & Math.floor(dvalue * (1 - dsaturation) * 255 + .5);
			let q = 255 & Math.floor(dvalue * (1 - dsaturation * hueFractpart) * 255 + .5);
			let t = 255 & Math.floor(dvalue * (1 - dsaturation * (1 - hueFractpart)) * 255 + .5);
			let v = 255 & Math.floor(255 * dvalue + .5);
			let r = 0, b = 0, g = 0;
			switch (hueIntpart) {
				case 0:
					r = v;
					g = t;
					b = p;
					break;
				case 1:
					r = q, g = v;
					b = p;
					break;
				case 2:
					r = p, g = v;
					b = t;
					break;
				case 3:
					r = p, g = q;
					b = v;
					break;
				case 4:
					r = t, g = p;
					b = v;
					break;
				case 5:
					r = v, g = p;
					b = q;
					break;
			}
			return new ColorValue(ColorValue.computeTbgrFromComponents(r, g, b, transparency), hsv.h);
		}
		static computeTbgrFromString(val, defaultColorIfNotParsed) {
			val = val.toLowerCase();
			let m = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(val);
			if (m) {
				let color;
				let name = m[1];
				let components = m[2];
				let hasPercent = (str) => "%" === str[str.length - 1];
				let floatOrPercent = (str) => {
					let v = parseFloat(str);
					return 255 * getBoundedValue(hasPercent(str) ? v / 100 : v, 0, 1);
				};
				let intOrPercent = (str) => {
					return getBoundedValue(hasPercent(str) ? parseFloat(str) / 100 * 255 : parseInt(str, 10), 0, 255);
				};
				switch (name) {
					case "rgb":
					case "rgba":
						color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components);
						if (color) return [this.computeTbgrFromComponents(intOrPercent(color[1]), intOrPercent(color[2]), intOrPercent(color[3]), "string" == typeof color[4] ? 255 - floatOrPercent(color[4]) : 0), void 0];
						break;
					case "hsl":
					case "hsla":
						color = /^(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components);
						if (color) {
							let h = parseFloat(color[1]);
							let s = parseInt(color[2], 10) / 100;
							let l = parseInt(color[3], 10) / 100;
							let t = "string" == typeof color[4] ? 255 - floatOrPercent(color[4]) : 0;
							return [this.computeTbgrFromHSL(h / 360, s, l, t), h];
						}
						break;
				}
			} else if (m = /^\#([A-Fa-f\d]+)$/.exec(val)) {
				let hex = m[1];
				let size = hex.length;
				if (3 === size) return [this.computeTbgrFromComponents(parseInt(hex.charAt(0) + hex.charAt(0), 16), parseInt(hex.charAt(1) + hex.charAt(1), 16), parseInt(hex.charAt(2) + hex.charAt(2), 16), 0), void 0];
				if (6 === size) return [this.computeTbgrFromComponents(parseInt(hex.charAt(0) + hex.charAt(1), 16), parseInt(hex.charAt(2) + hex.charAt(3), 16), parseInt(hex.charAt(4) + hex.charAt(5), 16), 0), void 0];
				if (8 === size) return [this.computeTbgrFromComponents(parseInt(hex.charAt(0) + hex.charAt(1), 16), parseInt(hex.charAt(2) + hex.charAt(3), 16), parseInt(hex.charAt(4) + hex.charAt(5), 16), 255 - parseInt(hex.charAt(6) + hex.charAt(7), 16)), void 0];
			}
			if (defaultColorIfNotParsed) return [defaultColorIfNotParsed, void 0];
			throw new Error("unable to parse string into ColorValue");
		}
		static getColors(tbgr) {
			scratchUInt32[0] = tbgr;
			return {
				b: scratchBytes[2],
				g: scratchBytes[1],
				r: scratchBytes[0],
				t: scratchBytes[3]
			};
		}
		getRgb(includeAlpha) {
			scratchUInt32[0] = this._tbgr;
			if (includeAlpha) return (scratchBytes[0] << 24) + (scratchBytes[1] << 16) + (scratchBytes[2] << 8) + (255 - scratchBytes[3]);
			return (scratchBytes[0] << 16) + (scratchBytes[1] << 8) + scratchBytes[2];
		}
		getAlpha() {
			return ColorValue.getAlpha(this._tbgr);
		}
		static getAlpha(tbgr) {
			scratchUInt32[0] = tbgr;
			return 255 - scratchBytes[3];
		}
		toHexString(includeAlpha) {
			if (includeAlpha) {
				let value = this.getRgb(includeAlpha);
				if (value < 0) value = 4294967295 + value + 1;
				return `#${`00000000${value.toString(16)}`.slice(-8)}`;
			}
			return `#${`000000${this.getRgb().toString(16)}`.slice(-6)}`;
		}
		static computeTbgrFromHSL(h, s, l, transparency = 0) {
			let torgb = (p1, q1, t) => {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1 / 6) return p1 + (q1 - p1) * 6 * t;
				if (t < .5) return q1;
				if (t < 2 / 3) return p1 + (q1 - p1) * 6 * (2 / 3 - t);
				return p1;
			};
			let hue2rgb = (p1, q1, t) => Math.round(255 * torgb(p1, q1, t));
			let modulo = (n, m) => (n % m + m) % m;
			h = modulo(h, 1);
			s = getBoundedValue(s, 0, 1);
			l = getBoundedValue(l, 0, 1);
			if (0 === s) {
				l *= 255;
				return this.computeTbgrFromComponents(l, l, l, transparency);
			}
			let p = l <= .5 ? l * (1 + s) : l + s - l * s;
			let q = 2 * l - p;
			return this.computeTbgrFromComponents(hue2rgb(q, p, h + 1 / 3), hue2rgb(q, p, h), hue2rgb(q, p, h - 1 / 3), transparency);
		}
		toHslColor() {
			return {
				...ColorValue.toHsl(this._tbgr),
				...void 0 != this._hue && { h: this._hue }
			};
		}
		static toHsl(tbgr) {
			let { r, g, b } = ColorValue.getColors(tbgr);
			let red = r / 255;
			let green = g / 255;
			let blue = b / 255;
			let cMin = Math.min(red, green, blue);
			let cMax = Math.max(red, green, blue);
			let delta = cMax - cMin;
			let hue = 0;
			let saturation = 0;
			hue = 0 === delta ? 0 : red === cMax ? (green - blue) / delta % 6 : green === cMax ? (blue - red) / delta + 2 : (red - green) / delta + 4;
			hue = Math.round(60 * hue);
			if (hue < 0) hue += 360;
			let lightness = (cMax + cMin) / 2;
			saturation = 0 === delta ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
			saturation = Number((100 * saturation).toFixed(1));
			lightness = Number((100 * lightness).toFixed(1));
			return {
				h: hue,
				s: saturation,
				l: lightness,
				a: this.getAlpha(tbgr) / 255
			};
		}
		toRgbColor() {
			let { r, g, b } = ColorValue.getColors(this._tbgr);
			return {
				r,
				g,
				b,
				a: this.getAlpha() / 255
			};
		}
		toHsvColor() {
			return {
				...ColorValue.toHsv(this._tbgr),
				...void 0 != this._hue && { h: this._hue }
			};
		}
		static toHsv(tbgr) {
			let { r, g, b } = ColorValue.getColors(tbgr);
			let red = r / 255;
			let green = g / 255;
			let blue = b / 255;
			let cMin = Math.min(red, green, blue);
			let cMax = Math.max(red, green, blue);
			let delta = cMax - cMin;
			let hue = 0;
			hue = 0 === delta ? 0 : red === cMax ? (green - blue) / delta % 6 : green === cMax ? (blue - red) / delta + 2 : (red - green) / delta + 4;
			hue = Math.round(60 * hue);
			if (hue < 0) hue += 360;
			let brightness = cMax;
			let saturation = 0 === cMax ? 0 : delta / cMax;
			saturation = Number((100 * saturation).toFixed(1));
			brightness = Number((100 * brightness).toFixed(1));
			return {
				h: hue,
				s: saturation,
				v: brightness,
				a: this.getAlpha(tbgr) / 255
			};
		}
		equals(other) {
			return this._tbgr === other._tbgr;
		}
		static getFormattedColorNumber(value, precision = 1) {
			if (0 === precision) Math.round(value).toString();
			return Number(value.toFixed(precision)).toString();
		}
		toRgbString(includeAlpha) {
			let rgb = this.toRgbColor();
			let rgbString = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
			if (includeAlpha) {
				let alpha = rgb.a ?? 1;
				return `rgba(${rgbString}, ${ColorValue.getFormattedColorNumber(alpha, 2)})`;
			}
			return `rgb(${rgbString})`;
		}
		toHslString(includeAlpha) {
			let hsl = this.toHslColor();
			let hslString = `${ColorValue.getFormattedColorNumber(this._hue ?? hsl.h)}, ${ColorValue.getFormattedColorNumber(hsl.s)}%, ${ColorValue.getFormattedColorNumber(hsl.l)}%`;
			if (includeAlpha) {
				let alpha = hsl.a ?? 1;
				return `hsla(${hslString}, ${ColorValue.getFormattedColorNumber(alpha, 2)})`;
			}
			return `hsl(${hslString})`;
		}
		toHsvString(includeAlpha) {
			let hsv = this.toHsvColor();
			let hsvString = `${this._hue ?? hsv.h}, ${hsv.s}%, ${hsv.v}%`;
			if (includeAlpha) {
				let alpha = hsv.a ?? 1;
				return `hsva(${hsvString}, ${ColorValue.getFormattedColorNumber(alpha, 2)})`;
			}
			return `hsv(${hsvString})`;
		}
		constructor(tbgr, hue) {
			_define_property(this, "_tbgr", void 0);
			_define_property(this, "_hue", void 0);
			scratchUInt32[0] = tbgr;
			this._tbgr = scratchUInt32[0];
			this._hue = hue;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/color/index.js
var init_color = __esmMin((() => {
	init_ColorValue();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/Svg.js
var Svg;
var init_Svg = __esmMin((() => {
	init_polymorphic();
	Svg = polymorphic.svg("", {
		viewBox: "0 0 16 16",
		width: 16,
		height: 16
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgInfoCircular.js
var import_react$104, SvgInfoCircular;
var init_SvgInfoCircular = __esmMin((() => {
	import_react$104 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgInfoCircular = (props) => import_react$104.createElement(Svg, props, import_react$104.createElement("path", { d: "M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm1.2 3.2a.923.923 0 0 1 .997.843l.003.057a1.31 1.31 0 0 1-1.3 1.2.945.945 0 0 1-1-1 1.228 1.228 0 0 1 1.3-1.1zm-2 9.6c-.5 0-.9-.3-.5-1.7l.6-2.4c.1-.4.1-.5 0-.5-.2-.1-.9.2-1.3.5l-.2-.5a6.497 6.497 0 0 1 3.3-1.6c.5 0 .6.6.3 1.6l-.7 2.6c-.1.5-.1.6.1.6a2.003 2.003 0 0 0 1.1-.6l.3.4a5.769 5.769 0 0 1-3 1.6z" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgStatusError.js
var import_react$103, SvgStatusError;
var init_SvgStatusError = __esmMin((() => {
	import_react$103 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgStatusError = (props) => import_react$103.createElement(Svg, props, import_react$103.createElement("path", { d: "M9 12H7v-2h2v2Zm0-3H7V4h2v5Zm2.314-9H4.686L0 4.686v6.628L4.686 16h6.628L16 11.314V4.686L11.314 0Z" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgStatusSuccess.js
var import_react$102, SvgStatusSuccess;
var init_SvgStatusSuccess = __esmMin((() => {
	import_react$102 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgStatusSuccess = (props) => import_react$102.createElement(Svg, props, import_react$102.createElement("path", { d: "m8 0a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm-1.35 12-3.65-3.41 1.4-1.3 2.36 2.2 4.83-4.49 1.41 1.29z" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgStatusWarning.js
var import_react$101, SvgStatusWarning;
var init_SvgStatusWarning = __esmMin((() => {
	import_react$101 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgStatusWarning = (props) => import_react$101.createElement(Svg, props, import_react$101.createElement("path", { d: "m15.86807 13.26721-6.77-11.62a1.15 1.15 0 0 0 -1.1-.67 1.17 1.17 0 0 0 -1.1.69l-6.77 11.59a1.2 1.2 0 0 0 1.1 1.72h13.45a1.19 1.19 0 0 0 1.19-1.71zm-6.87-.29h-2v-2h2zm0-3h-2v-5h2z" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/StatusIconMap.js
var import_react$100, StatusIconMap;
var init_StatusIconMap = __esmMin((() => {
	import_react$100 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_SvgInfoCircular();
	init_SvgStatusError();
	init_SvgStatusSuccess();
	init_SvgStatusWarning();
	StatusIconMap = {
		negative: (args) => import_react$100.createElement(SvgStatusError, {
			"aria-hidden": true,
			...args
		}),
		positive: (args) => import_react$100.createElement(SvgStatusSuccess, {
			"aria-hidden": true,
			...args
		}),
		warning: (args) => import_react$100.createElement(SvgStatusWarning, {
			"aria-hidden": true,
			...args
		}),
		informational: (args) => import_react$100.createElement(SvgInfoCircular, {
			"aria-hidden": true,
			...args
		})
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgClose.js
var import_react$99, SvgClose;
var init_SvgClose = __esmMin((() => {
	import_react$99 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgClose = (props) => import_react$99.createElement(Svg, props, import_react$99.createElement("path", { d: "m14 0-6 6-6-6-2 2 6 6-6 6 2 2 6-6 6 6 2-2-6-6 6-6" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgCloseSmall.js
var import_react$98, SvgCloseSmall;
var init_SvgCloseSmall = __esmMin((() => {
	import_react$98 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgCloseSmall = (props) => import_react$98.createElement(Svg, props, import_react$98.createElement("path", { d: "m12.5 2-4.5 4.5-4.5-4.5-1.5 1.5 4.5 4.5-4.5 4.5 1.5 1.5 4.5-4.5 4.5 4.5 1.5-1.5-4.5-4.5 4.5-4.5z" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgChevronLeft.js
var import_react$97, SvgChevronLeft;
var init_SvgChevronLeft = __esmMin((() => {
	import_react$97 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgChevronLeft = (props) => import_react$97.createElement(Svg, props, import_react$97.createElement("path", { d: "m11.3 0 1.4 1.4-6.6 6.6 6.6 6.6-1.4 1.4-8-8z" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgChevronRight.js
var import_react$96, SvgChevronRight;
var init_SvgChevronRight = __esmMin((() => {
	import_react$96 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgChevronRight = (props) => import_react$96.createElement(Svg, props, import_react$96.createElement("path", { d: "m4.7 0-1.4 1.4 6.6 6.6-6.6 6.6 1.4 1.4 8-8z" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgChevronRightSmall.js
var import_react$95, SvgChevronRightSmall;
var init_SvgChevronRightSmall = __esmMin((() => {
	import_react$95 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgChevronRightSmall = (props) => import_react$95.createElement(Svg, props, import_react$95.createElement("path", { d: "m5.525 2-1.05 1.05L9.425 8l-4.95 4.95L5.525 14l6-6-6-6Z" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgChevronLeftDouble.js
var import_react$94, SvgChevronLeftDouble;
var init_SvgChevronLeftDouble = __esmMin((() => {
	import_react$94 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgChevronLeftDouble = (props) => import_react$94.createElement(Svg, props, import_react$94.createElement("path", { d: "m14.6 0 1.4 1.4-6.6 6.6 6.6 6.6-1.4 1.4-8-8zm-6.6 0 1.4 1.4-6.6 6.6 6.6 6.6-1.4 1.4-8-8z" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgChevronRightDouble.js
var import_react$93, SvgChevronRightDouble;
var init_SvgChevronRightDouble = __esmMin((() => {
	import_react$93 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgChevronRightDouble = (props) => import_react$93.createElement(Svg, props, import_react$93.createElement("path", { d: "m1.4 0-1.4 1.4 6.6 6.6-6.6 6.6 1.4 1.4 8-8zm6.6 0-1.4 1.4 6.6 6.6-6.6 6.6 1.4 1.4 8-8z" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgCaretUpSmall.js
var import_react$92, SvgCaretUpSmall;
var init_SvgCaretUpSmall = __esmMin((() => {
	import_react$92 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgCaretUpSmall = (props) => import_react$92.createElement(Svg, props, import_react$92.createElement("path", { d: "M4.807 9.997h6.395a.28.28 0 0 0 .24-.443L8.27 6.097a.34.34 0 0 0-.48 0h-.001L4.566 9.554a.27.27 0 0 0 .24.443z" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgCaretDownSmall.js
var import_react$91, SvgCaretDownSmall;
var init_SvgCaretDownSmall = __esmMin((() => {
	import_react$91 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgCaretDownSmall = (props) => import_react$91.createElement(Svg, props, import_react$91.createElement("path", { d: "M4.807 6h6.395a.28.28 0 0 1 .24.443L8.27 9.9a.34.34 0 0 1-.481 0L4.566 6.443A.27.27 0 0 1 4.806 6z" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgCaretRightSmall.js
var import_react$90, SvgCaretRightSmall;
var init_SvgCaretRightSmall = __esmMin((() => {
	import_react$90 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgCaretRightSmall = (props) => import_react$90.createElement(Svg, props, import_react$90.createElement("path", { d: "M6.003 4.807v6.4a.28.28 0 0 0 .443.24L9.9 8.27a.34.34 0 0 0 0-.48L6.446 4.566a.269.269 0 0 0-.443.24z" }));
}));
var init_SvgSmileyHappy = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgSwap.js
var import_react$88, SvgSwap;
var init_SvgSwap = __esmMin((() => {
	import_react$88 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgSwap = (props) => import_react$88.createElement(Svg, props, import_react$88.createElement("path", { d: "m5 15-3.78125-3.5 3.78125-3.5v2h8v3h-8zm6-7 3.78125-3.5-3.78125-3.5v2h-8v3h8z" }));
}));
var init_SvgUpload = __esmMin((() => {
	require_react();
}));
var init_SvgMoreVertical = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgCheckmark.js
var import_react$85, SvgCheckmark;
var init_SvgCheckmark = __esmMin((() => {
	import_react$85 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgCheckmark = (props) => import_react$85.createElement(Svg, props, import_react$85.createElement("path", { d: "M6,14L0,8l2-2l4,4l8-8l2,2L6,14z" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgCheckmarkSmall.js
var import_react$84, SvgCheckmarkSmall;
var init_SvgCheckmarkSmall = __esmMin((() => {
	import_react$84 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgCheckmarkSmall = (props) => import_react$84.createElement(Svg, props, import_react$84.createElement("path", { d: "m6 13.4-4.7-4.7 1.4-1.4 3.3 3.3 7.3-7.3 1.4 1.4z" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgImportantSmall.js
var import_react$83, SvgImportantSmall;
var init_SvgImportantSmall = __esmMin((() => {
	import_react$83 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgImportantSmall = (props) => import_react$83.createElement(Svg, props, import_react$83.createElement("path", { d: "M6.25 1h3.5v3.19l-.676 6.408H6.91L6.25 4.19zm.12 10.572h3.268V15H6.37z" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgSortUp.js
var import_react$82, SvgSortUp;
var init_SvgSortUp = __esmMin((() => {
	import_react$82 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgSortUp = (props) => import_react$82.createElement(Svg, props, import_react$82.createElement("path", { d: "m9 16v-12.7l3.8 3.7 1.2-1.2-6-5.8-1.2 1.2-4.8 4.6 1.2 1.2 3.8-3.7v12.7z" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgSortDown.js
var import_react$81, SvgSortDown;
var init_SvgSortDown = __esmMin((() => {
	import_react$81 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgSortDown = (props) => import_react$81.createElement(Svg, props, import_react$81.createElement("path", { d: "m7 0v12.7l-3.8-3.7-1.2 1.2 6 5.8 1.2-1.2 4.8-4.6-1.2-1.2-3.8 3.7v-12.7z" }));
}));
var init_SvgColumnManager = __esmMin((() => {
	require_react();
}));
var init_SvgMore = __esmMin((() => {
	require_react();
}));
var init_SvgNew = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgSearch.js
var import_react$77, SvgSearch;
var init_SvgSearch = __esmMin((() => {
	import_react$77 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgSearch = (props) => import_react$77.createElement(Svg, props, import_react$77.createElement("path", { d: "m11 9.7c.7-1 1.1-2.2 1.1-3.5.1-3.5-2.7-6.2-6-6.2-3.4 0-6.1 2.7-6.1 6.1s2.7 6.1 6.1 6.1c1.3 0 2.5-.4 3.5-1.1l4.9 4.9 1.4-1.4zm-5 .5c-2.3 0-4.1-1.8-4.1-4.1s1.8-4.1 4.1-4.1 4.1 1.8 4.1 4.1-1.8 4.1-4.1 4.1" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgFilter.js
var import_react$76, SvgFilter;
var init_SvgFilter = __esmMin((() => {
	import_react$76 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgFilter = (props) => import_react$76.createElement(Svg, props, import_react$76.createElement("path", { d: "m0 0v2l6 5v9l4-3v-6l6-5v-2z" }));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgFilterHollow.js
var import_react$75, SvgFilterHollow;
var init_SvgFilterHollow = __esmMin((() => {
	import_react$75 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Svg();
	SvgFilterHollow = (props) => import_react$75.createElement(Svg, props, import_react$75.createElement("path", { d: "M15 1v.5L9.4 6.2l-.4.3v6L7 14V6.5l-.4-.3L1 1.5V1zm1-1H0v2l6 5v9l4-3V7l6-5z" }));
}));
var init_SvgCalendar = __esmMin((() => {
	require_react();
}));
var init_SvgDocument = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/index.js
var init_icons = __esmMin((() => {
	init_StatusIconMap();
	init_SvgStatusSuccess();
	init_SvgStatusWarning();
	init_SvgStatusError();
	init_SvgInfoCircular();
	init_SvgClose();
	init_SvgCloseSmall();
	init_SvgChevronLeft();
	init_SvgChevronRight();
	init_SvgChevronRightSmall();
	init_SvgChevronLeftDouble();
	init_SvgChevronRightDouble();
	init_SvgCaretUpSmall();
	init_SvgCaretDownSmall();
	init_SvgCaretRightSmall();
	init_SvgSmileyHappy();
	init_SvgSwap();
	init_SvgUpload();
	init_SvgMoreVertical();
	init_SvgCheckmark();
	init_SvgCheckmarkSmall();
	init_SvgImportantSmall();
	init_SvgSortUp();
	init_SvgSortDown();
	init_SvgColumnManager();
	init_SvgMore();
	init_SvgNew();
	init_SvgSearch();
	init_SvgFilter();
	init_SvgFilterHollow();
	init_SvgCalendar();
	init_SvgDocument();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/types.js
var init_types = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/index.js
var init_utils$1 = __esmMin((() => {
	init_functions();
	init_hooks$1();
	init_components();
	init_props();
	init_color();
	init_icons();
	init_types();
	init_providers();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Typography/Text.js
var import_classnames$50, import_react$72, Text, TextContext;
var init_Text = __esmMin((() => {
	import_classnames$50 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react$72 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	Text = import_react$72.forwardRef((props, ref) => {
		let { variant = "body", className, isMuted = false, isSkeleton = false, ...rest } = props;
		return import_react$72.createElement(TextContext.Provider, { value: true }, import_react$72.createElement(Box, {
			className: (0, import_classnames$50.default)({
				[`iui-text-${variant}`]: "body" !== variant,
				"iui-text-block": "body" === variant,
				"iui-text-muted": isMuted,
				"iui-skeleton": isSkeleton
			}, className),
			ref,
			...rest
		}));
	});
	TextContext = import_react$72.createContext(false);
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Typography/Anchor.js
var import_react$71, import_classnames$49, Anchor;
var init_Anchor = __esmMin((() => {
	import_react$71 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$49 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	init_VisuallyHidden();
	init_Text();
	Anchor = import_react$71.forwardRef((props, forwardedRef) => {
		let isInsideText = import_react$71.useContext(TextContext);
		let { isExternal, underline = isInsideText, children, ...rest } = props;
		return import_react$71.createElement(Box, {
			as: "a",
			"data-iui-underline": underline ? "true" : void 0,
			...rest,
			ref: forwardedRef,
			className: (0, import_classnames$49.default)("iui-anchor", { "iui-anchor-external": isExternal }, props.className)
		}, children, "_blank" === props.target && import_react$71.createElement(VisuallyHidden, null, " (opens in new tab)"));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Backdrop/Backdrop.js
var import_react$70, import_classnames$48, Backdrop;
var init_Backdrop = __esmMin((() => {
	import_react$70 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$48 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	Backdrop = import_react$70.forwardRef((props, ref) => {
		let { isVisible = true, className, ...rest } = props;
		return import_react$70.createElement(Box, {
			className: (0, import_classnames$48.default)("iui-backdrop", { "iui-backdrop-visible": isVisible }, className),
			ref,
			...rest
		});
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ProgressIndicators/ProgressRadial.js
var import_classnames$47, import_react$69, ProgressRadial;
var init_ProgressRadial = __esmMin((() => {
	import_classnames$47 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react$69 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	init_VisuallyHidden();
	ProgressRadial = import_react$69.forwardRef((props, forwardedRef) => {
		let { value, indeterminate = void 0 === value, status, size, className, style, children, ...rest } = props;
		let statusMap = {
			negative: import_react$69.createElement(SvgImportantSmall, { "aria-hidden": true }),
			positive: import_react$69.createElement(SvgCheckmarkSmall, { "aria-hidden": true }),
			warning: import_react$69.createElement(SvgImportantSmall, { "aria-hidden": true })
		};
		return import_react$69.createElement(Box, {
			className: (0, import_classnames$47.default)("iui-progress-indicator-radial", className),
			"data-iui-size": size,
			"data-iui-status": status,
			"data-iui-indeterminate": indeterminate ? "true" : void 0,
			ref: forwardedRef,
			style: {
				...void 0 !== value && { "--iui-progress-percentage": `${getBoundedValue(value, 0, 100)}%` },
				...style
			},
			...rest
		}, import_react$69.createElement(ShadowRoot$1, null, 100 !== value && import_react$69.createElement(VisuallyHidden, null, "Loading."), import_react$69.createElement("slot", null)), "x-small" !== size ? children ?? (status ? statusMap[status] : null) : null);
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Buttons/Button.js
var import_classnames$46, import_react$68, Button;
var init_Button = __esmMin((() => {
	import_classnames$46 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react$68 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	init_ProgressRadial();
	init_Popover();
	Button = import_react$68.forwardRef((props, ref) => {
		let { children, className, size, styleType = "default", startIcon, endIcon, labelProps, startIconProps, endIconProps, stretched, loading, disabled: disabledProp, ...rest } = props;
		let hasPopoverOpen = import_react$68.useContext(PopoverOpenContext);
		return import_react$68.createElement(ButtonBase, {
			ref,
			className: (0, import_classnames$46.default)("iui-button", "iui-field", className),
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
		}, startIcon && import_react$68.createElement(Box, {
			as: "span",
			"aria-hidden": true,
			...startIconProps,
			className: (0, import_classnames$46.default)("iui-button-icon", startIconProps?.className)
		}, startIcon), children && import_react$68.createElement(Box, {
			as: "span",
			...labelProps,
			className: (0, import_classnames$46.default)("iui-button-label", labelProps?.className)
		}, children), endIcon && import_react$68.createElement(Box, {
			as: "span",
			"aria-hidden": true,
			...endIconProps,
			className: (0, import_classnames$46.default)("iui-button-icon", endIconProps?.className)
		}, endIcon), loading && import_react$68.createElement(ProgressRadial, {
			size: "small" === size ? "x-small" : "small",
			className: "iui-button-spinner",
			"aria-hidden": true
		}));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Menu/Menu.js
var import_react$67, import_classnames$45, Menu, MenuContext, MenuPortalContext;
var init_Menu = __esmMin((() => {
	import_react$67 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$45 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	init_Popover();
	init_floating_ui_react();
	Menu = import_react$67.forwardRef((props, ref) => {
		let { className, trigger, positionReference, portal: portalProp, popoverProps: popoverPropsProp, children, ...rest } = props;
		let menuPortalContext = import_react$67.useContext(MenuPortalContext);
		let portal = portalProp ?? menuPortalContext;
		let tree = useFloatingTree();
		let nodeId = useFloatingNodeId();
		let parentId = useFloatingParentNodeId();
		let { interactions: interactionsProp, visible: visibleProp, onVisibleChange: onVisibleChangeProp, ...restPopoverProps } = popoverPropsProp ?? {};
		let { listNavigation: listNavigationPropsProp, hover: hoverProp, ...restInteractionsProps } = interactionsProp ?? {};
		let [visible, setVisible] = useControlledState(false, visibleProp, onVisibleChangeProp);
		let [hasFocusedNodeInSubmenu, setHasFocusedNodeInSubmenu] = import_react$67.useState(false);
		let [menuElement, setMenuElement] = import_react$67.useState(null);
		let { focusableElementsRef, focusableElements } = useFocusableElements(menuElement, { filter: (allElements) => allElements.filter((i) => !allElements?.some((p) => p.contains(i.parentElement))) });
		let [activeIndex, setActiveIndex] = import_react$67.useState(null);
		let popover = usePopover({
			nodeId,
			visible,
			onVisibleChange: (open) => open ? setVisible(true) : close(),
			interactions: {
				hover: null == tree ? hoverProp : {
					enabled: !!hoverProp && !hasFocusedNodeInSubmenu,
					...hoverProp
				},
				...restInteractionsProps
			},
			...restPopoverProps,
			middleware: {
				size: { maxHeight: "var(--iui-menu-max-height)" },
				...restPopoverProps.middleware
			}
		});
		let { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([useListNavigation(popover.context, {
			activeIndex,
			focusItemOnHover: false,
			listRef: focusableElementsRef,
			onNavigate: setActiveIndex,
			...listNavigationPropsProp
		})]);
		import_react$67.useEffect(() => {
			let setPositionReference = popover.refs.setPositionReference;
			if (void 0 !== positionReference) setPositionReference(positionReference);
		}, [popover.refs.setPositionReference, positionReference]);
		let refs = useMergedRefs(setMenuElement, ref, popover.refs.setFloating);
		let triggerRef = import_react$67.useRef(null);
		let close = import_react$67.useCallback(() => {
			setVisible(false);
			if (null == parentId) triggerRef.current?.focus({ preventScroll: true });
		}, [parentId, setVisible]);
		useSyncExternalStore(import_react$67.useCallback(() => {
			let closeUnrelatedMenus = (event) => {
				if (parentId === event.parentId && nodeId !== event.nodeId || parentId === event.nodeId) {
					setVisible(false);
					setHasFocusedNodeInSubmenu(false);
				}
			};
			tree?.events.on("onNodeFocused", closeUnrelatedMenus);
			return () => {
				tree?.events.off("onNodeFocused", closeUnrelatedMenus);
			};
		}, [
			nodeId,
			parentId,
			tree?.events,
			setVisible
		]), () => void 0, () => void 0);
		let popoverGetItemProps = import_react$67.useCallback(({ focusableItemIndex, userProps }) => getItemProps({
			...userProps,
			tabIndex: null != activeIndex && activeIndex >= 0 && null != focusableItemIndex && focusableItemIndex >= 0 && activeIndex === focusableItemIndex ? 0 : -1,
			onFocus: mergeEventHandlers(userProps?.onFocus, () => {
				queueMicrotask(() => {
					setHasFocusedNodeInSubmenu(true);
				});
				tree?.events.emit("onNodeFocused", {
					nodeId,
					parentId
				});
			}),
			onMouseEnter: mergeEventHandlers(userProps?.onMouseEnter, (event) => {
				if (null != focusableItemIndex && focusableItemIndex >= 0) setActiveIndex(focusableItemIndex);
				if (event.target === event.currentTarget) event.currentTarget.focus({ focusVisible: false });
			})
		}), [
			activeIndex,
			getItemProps,
			nodeId,
			parentId,
			tree?.events
		]);
		let reference = cloneElementWithRef(trigger, (triggerChild) => getReferenceProps(popover.getReferenceProps({
			"aria-haspopup": "menu",
			...triggerChild.props,
			"aria-expanded": popover.open,
			ref: mergeRefs(triggerRef, popover.refs.setReference)
		})));
		let floating = popover.open && import_react$67.createElement(Portal, { portal }, import_react$67.createElement(Box, {
			as: "div",
			className: (0, import_classnames$45.default)("iui-menu", className),
			ref: refs,
			...getFloatingProps(popover.getFloatingProps({
				role: "menu",
				...rest
			}))
		}, children));
		return import_react$67.createElement(import_react$67.Fragment, null, import_react$67.createElement(MenuContext.Provider, { value: import_react$67.useMemo(() => ({
			popoverGetItemProps,
			focusableElements
		}), [focusableElements, popoverGetItemProps]) }, import_react$67.createElement(MenuPortalContext.Provider, { value: portal }, import_react$67.createElement(PopoverOpenContext.Provider, { value: popover.open }, reference), null != tree ? import_react$67.createElement(FloatingNode, { id: nodeId }, floating) : floating)));
	});
	MenuContext = import_react$67.createContext(void 0);
	MenuPortalContext = import_react$67.createContext(void 0);
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/DropdownMenu/DropdownMenu.js
var import_react$66, DropdownMenu, DropdownMenuContent, DropdownMenuContext, DropdownMenuCloseOnClickContext;
var init_DropdownMenu = __esmMin((() => {
	import_react$66 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	init_Menu();
	init_floating_ui_react();
	DropdownMenu = import_react$66.forwardRef((props, forwardedRef) => import_react$66.createElement(FloatingTree, null, import_react$66.createElement(DropdownMenuContent, {
		ref: forwardedRef,
		...props
	})));
	DropdownMenuContent = import_react$66.forwardRef((props, forwardedRef) => {
		let { menuItems, children, role = "menu", visible: visibleProp, placement = "bottom-start", matchWidth = false, onVisibleChange, portal = true, middleware, closeOnItemClick = true, ...rest } = props;
		let [visible, setVisible] = useControlledState(false, visibleProp, onVisibleChange);
		let close = import_react$66.useCallback(() => {
			setVisible(false);
		}, [setVisible]);
		let menuContent = import_react$66.useMemo(() => {
			if ("function" == typeof menuItems) return menuItems(close);
			return menuItems;
		}, [close, menuItems]);
		let dropdownMenuContextValue = import_react$66.useMemo(() => ({ close }), [close]);
		return import_react$66.createElement(DropdownMenuCloseOnClickContext.Provider, { value: closeOnItemClick }, import_react$66.createElement(DropdownMenuContext.Provider, { value: dropdownMenuContextValue }, import_react$66.createElement(Menu, {
			trigger: children,
			onKeyDown: mergeEventHandlers(props.onKeyDown, (e) => {
				if (e.defaultPrevented) return;
				if ("Tab" === e.key) setVisible(false);
			}),
			role,
			ref: forwardedRef,
			portal,
			popoverProps: import_react$66.useMemo(() => ({
				placement,
				matchWidth,
				visible,
				onVisibleChange: setVisible,
				middleware
			}), [
				matchWidth,
				middleware,
				placement,
				setVisible,
				visible
			]),
			...rest
		}, menuContent)));
	});
	DropdownMenuContext = import_react$66.createContext(void 0);
	DropdownMenuCloseOnClickContext = import_react$66.createContext(void 0);
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Buttons/DropdownButton.js
var import_react$65, import_classnames$44, DropdownButton;
var init_DropdownButton = __esmMin((() => {
	import_react$65 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$44 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_Button();
	init_DropdownMenu();
	init_utils$1();
	DropdownButton = import_react$65.forwardRef((props, forwardedRef) => {
		let { menuItems, className, size, styleType, children, dropdownMenuProps, ...rest } = props;
		let [isMenuOpen, setIsMenuOpen] = import_react$65.useState(false);
		return import_react$65.createElement(DropdownMenu, {
			menuItems,
			matchWidth: true,
			visible: isMenuOpen,
			...dropdownMenuProps,
			onVisibleChange: (open) => {
				setIsMenuOpen(open);
				dropdownMenuProps?.onVisibleChange?.(open);
			}
		}, import_react$65.createElement(Button, {
			className: (0, import_classnames$44.default)("iui-button-dropdown", className),
			size,
			styleType,
			endIcon: isMenuOpen ? import_react$65.createElement(SvgCaretUpSmall, { "aria-hidden": true }) : import_react$65.createElement(SvgCaretDownSmall, { "aria-hidden": true }),
			ref: forwardedRef,
			...rest
		}, children));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Checkbox/Checkbox.js
var import_classnames$43, import_react$64, Checkbox;
var init_Checkbox = __esmMin((() => {
	import_classnames$43 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react$64 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_ProgressRadial();
	init_utils$1();
	Checkbox = import_react$64.forwardRef((props, ref) => {
		let { className, disabled = false, indeterminate = false, label, status, variant = "default", isLoading = false, wrapperProps = {}, labelProps = {}, style, ...rest } = props;
		let inputElementRef = import_react$64.useRef(null);
		let refs = useMergedRefs(inputElementRef, ref);
		import_react$64.useEffect(() => {
			if (inputElementRef.current) {
				inputElementRef.current.indeterminate = indeterminate;
				inputElementRef.current.checked = indeterminate ? false : inputElementRef.current.checked;
			}
		});
		let checkbox = import_react$64.createElement(import_react$64.Fragment, null, import_react$64.createElement(Box, {
			as: "input",
			className: (0, import_classnames$43.default)("iui-checkbox", { "iui-checkbox-visibility": "eyeball" === variant }, className),
			style,
			"data-iui-loading": isLoading ? "true" : void 0,
			disabled: disabled || isLoading,
			type: "checkbox",
			ref: refs,
			...rest
		}), isLoading && import_react$64.createElement(ProgressRadial, {
			size: "x-small",
			indeterminate: true
		}));
		let { className: wrapperClassName, ...restWrapperProps } = wrapperProps;
		let { className: labelClassName, ...restLabelProps } = labelProps;
		return label ? import_react$64.createElement(Box, {
			as: "label",
			className: (0, import_classnames$43.default)("iui-checkbox-wrapper", wrapperClassName),
			"data-iui-disabled": disabled ? "true" : void 0,
			"data-iui-status": status,
			"data-iui-loading": isLoading ? "true" : void 0,
			...restWrapperProps
		}, checkbox, label && import_react$64.createElement(Box, {
			as: "span",
			className: (0, import_classnames$43.default)("iui-checkbox-label", labelClassName),
			...restLabelProps
		}, label)) : checkbox;
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ColorPicker/ColorPickerContext.js
var import_react$63, ColorPickerContext, useColorPickerContext;
var init_ColorPickerContext = __esmMin((() => {
	import_react$63 = /* @__PURE__ */ __toESM(require_react(), 1);
	ColorPickerContext = import_react$63.createContext(void 0);
	useColorPickerContext = () => {
		let context = import_react$63.useContext(ColorPickerContext);
		if (void 0 == context) throw new Error("useColorPickerContext must be used within a ColorPickerContext.Provider");
		return context;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ColorPicker/ColorPicker.js
var import_react$62, import_classnames$42, getColorValue, ColorPicker;
var init_ColorPicker = __esmMin((() => {
	import_react$62 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	import_classnames$42 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_ColorPickerContext();
	getColorValue = (color) => {
		if (color instanceof ColorValue) return color;
		return ColorValue.create(color);
	};
	ColorPicker = import_react$62.forwardRef((props, forwardedRef) => {
		let { children, className, selectedColor, onChange, onChangeComplete, showAlpha = false, applyBackground = true, ...rest } = props;
		let ref = import_react$62.useRef(null);
		let inColor = import_react$62.useMemo(() => getColorValue(selectedColor), [selectedColor]);
		let activeColorTbgr = import_react$62.useRef(inColor.toTbgr());
		let [activeColor, setActiveColor] = import_react$62.useState(inColor);
		import_react$62.useEffect(() => {
			setActiveColor(inColor);
		}, [inColor]);
		let [hsvColor, setHsvColor] = import_react$62.useState(() => activeColor.toHsvColor());
		import_react$62.useEffect(() => {
			if (inColor.toTbgr() !== activeColorTbgr.current) {
				activeColorTbgr.current = inColor.toTbgr();
				setHsvColor(inColor.toHsvColor());
			}
		}, [inColor]);
		let applyHsvColorChange = import_react$62.useCallback((newColor, selectionChanged, newColorValue) => {
			setHsvColor(newColor);
			let newActiveColor = newColorValue ?? ColorValue.create(newColor);
			if (selectionChanged) onChangeComplete?.(newActiveColor);
			else onChange?.(newActiveColor);
			activeColorTbgr.current = newActiveColor.toTbgr();
			setActiveColor(newActiveColor);
		}, [onChange, onChangeComplete]);
		return import_react$62.createElement(Box, {
			className: (0, import_classnames$42.default)("iui-color-picker", { "iui-popover-surface": applyBackground }, className),
			ref: useMergedRefs(ref, forwardedRef),
			...rest
		}, import_react$62.createElement(ColorPickerContext.Provider, { value: {
			activeColor,
			setActiveColor,
			hsvColor,
			applyHsvColorChange,
			onChangeComplete,
			showAlpha
		} }, children));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ColorPicker/ColorSwatch.js
var import_react$61, import_classnames$41, ColorSwatch;
var init_ColorSwatch = __esmMin((() => {
	import_react$61 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$41 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	init_ColorPicker();
	init_VisuallyHidden();
	ColorSwatch = import_react$61.forwardRef((props, ref) => {
		let { color, style, onClick, isActive, className, ...rest } = props;
		let colorString = import_react$61.useMemo(() => "string" == typeof color ? color : getColorValue(color).toHslString(true), [color]);
		return import_react$61.createElement(Box, {
			as: onClick ? ButtonBase : "span",
			className: (0, import_classnames$41.default)("iui-color-swatch", { "iui-active": isActive }, className),
			style: {
				"--iui-color-swatch-background": colorString,
				...style
			},
			onClick,
			"aria-pressed": !!onClick && isActive ? "true" : void 0,
			ref,
			...rest
		}, props.children ?? import_react$61.createElement(VisuallyHidden, null, colorString.toUpperCase()));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Slider/Track.js
function shouldDisplaySegment(segmentIndex, mode) {
	if ("odd-segments" === mode && 0 === (segmentIndex + 1) % 2) return true;
	if ("even-segments" === mode && 0 === segmentIndex % 2) return true;
	return false;
}
function generateSegments(values, min, max) {
	let segments = [];
	let newValues = [...values];
	newValues.sort((a, b) => a - b);
	if (0 === newValues.length || newValues[0] < min || newValues[newValues.length - 1] > max || min === max) return [];
	let lastValue = min;
	for (let i = 0; i < newValues.length; i++) {
		segments.push({
			left: lastValue,
			right: newValues[i]
		});
		lastValue = newValues[i];
	}
	segments.push({
		left: lastValue,
		right: max
	});
	return segments;
}
var import_react$60, import_classnames$40, Track;
var init_Track = __esmMin((() => {
	import_react$60 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$40 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	Track = (props) => {
		let { className, trackDisplayMode, sliderMin, sliderMax, values, orientation } = props;
		let [segments, setSegments] = import_react$60.useState(() => generateSegments(values, sliderMin, sliderMax));
		import_react$60.useEffect(() => {
			setSegments(generateSegments(values, sliderMin, sliderMax));
		}, [
			values,
			sliderMin,
			sliderMax
		]);
		return import_react$60.createElement(import_react$60.Fragment, null, "none" !== trackDisplayMode && segments.map((segment, index) => {
			let lowPercent = segment.left >= sliderMin && sliderMax !== sliderMin ? 100 * (segment.left - sliderMin) / (sliderMax - sliderMin) : 0;
			let highPercent = segment.right >= sliderMin && sliderMax !== sliderMin ? 100 - 100 * (segment.right - sliderMin) / (sliderMax - sliderMin) : 100;
			return import_react$60.createElement(import_react$60.Fragment, { key: index }, shouldDisplaySegment(index, trackDisplayMode) ? import_react$60.createElement(Box, {
				className: (0, import_classnames$40.default)("iui-slider-track", className),
				style: { ..."horizontal" === orientation ? {
					insetInlineStart: `${lowPercent}%`,
					insetInlineEnd: `${highPercent}%`
				} : {
					insetBlockStart: `${highPercent}%`,
					insetBlockEnd: `${lowPercent}%`
				} }
			}) : null);
		}));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Slider/Thumb.js
var import_react$59, import_classnames$39, Thumb;
var init_Thumb = __esmMin((() => {
	import_react$59 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$39 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_Tooltip();
	init_utils$1();
	Thumb = (props) => {
		let { value, index, minVal, maxVal, step, sliderMin, sliderMax, isActive, onThumbActivated, onThumbValueChanged, tooltipProps, thumbProps, disabled } = props;
		let thumbRef = import_react$59.useRef(null);
		let handleOnKeyboardEvent = import_react$59.useCallback((event, keyboardReleased) => {
			if (disabled || event.altKey) return;
			switch (event.key) {
				case "ArrowLeft":
				case "ArrowDown":
					onThumbValueChanged(index, Math.max(value - step, minVal), keyboardReleased);
					break;
				case "ArrowRight":
				case "ArrowUp":
					onThumbValueChanged(index, Math.min(value + step, maxVal), keyboardReleased);
					break;
				case "Home":
					onThumbValueChanged(index, minVal, keyboardReleased);
					break;
				case "End":
					onThumbValueChanged(index, maxVal, keyboardReleased);
					break;
				default: return;
			}
			event.preventDefault();
		}, [
			disabled,
			onThumbValueChanged,
			index,
			value,
			step,
			minVal,
			maxVal
		]);
		let handlePointerDownOnThumb = import_react$59.useCallback(() => {
			disabled || onThumbActivated(index);
		}, [
			disabled,
			index,
			onThumbActivated
		]);
		let adjustedValue = import_react$59.useMemo(() => {
			if (value < sliderMin) return sliderMin;
			if (value > sliderMax) return sliderMax;
			return value;
		}, [
			sliderMax,
			sliderMin,
			value
		]);
		let lowPercent = import_react$59.useMemo(() => {
			if (sliderMax === sliderMin) return 0;
			return 100 * (adjustedValue - sliderMin) / (sliderMax - sliderMin);
		}, [
			adjustedValue,
			sliderMax,
			sliderMin
		]);
		let { style, className, ...rest } = thumbProps || {};
		return import_react$59.createElement(Tooltip, {
			placement: "top",
			autoUpdateOptions: { animationFrame: true },
			ariaStrategy: "none",
			...tooltipProps
		}, import_react$59.createElement(Box, {
			...rest,
			ref: useMergedRefs(thumbRef, thumbProps?.ref),
			style: {
				...style,
				"--iui-slider-thumb-position": `${lowPercent}%`
			},
			className: (0, import_classnames$39.default)("iui-slider-thumb", { "iui-active": isActive }, className),
			role: "slider",
			tabIndex: disabled ? void 0 : 0,
			"aria-valuemin": minVal,
			"aria-valuenow": value,
			"aria-valuemax": maxVal,
			"aria-disabled": disabled,
			onPointerDown: handlePointerDownOnThumb,
			onKeyDown: (event) => handleOnKeyboardEvent(event, false),
			onKeyUp: (event) => handleOnKeyboardEvent(event, true)
		}));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Slider/Slider.js
var import_classnames$38, import_react$58, getPercentageOfRectangle, getClosestValueIndex, getDefaultTrackDisplay, roundValueToClosestStep, formatNumberValue, focusThumb, Slider;
var init_Slider = __esmMin((() => {
	import_classnames$38 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react$58 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	init_Track();
	init_Thumb();
	init_floating_ui_react();
	init_Tooltip();
	getPercentageOfRectangle = (rect, pointerX, pointerY, orientation) => {
		if ("horizontal" === orientation) return (getBoundedValue(pointerX, rect.left, rect.right) - rect.left) / rect.width;
		let position = getBoundedValue(pointerY, rect.top, rect.bottom);
		return (rect.bottom - position) / rect.height;
	};
	getClosestValueIndex = (values, pointerValue) => {
		if (1 === values.length) return 0;
		let distances = values.map((value) => Math.abs(value - pointerValue));
		let smallest = Math.min(...distances);
		return distances.indexOf(smallest);
	};
	getDefaultTrackDisplay = (trackDisplayMode, values) => {
		if ("auto" !== trackDisplayMode) return trackDisplayMode;
		return values.length % 2 ? "even-segments" : "odd-segments";
	};
	roundValueToClosestStep = (value, step, min) => Math.round((value - min) / step) * step + min;
	formatNumberValue = (value, step, numDecimals) => {
		if (Number.isInteger(step)) return value.toFixed(0);
		return value.toFixed(numDecimals);
	};
	focusThumb = (sliderContainer, activeIndex) => {
		let doc = sliderContainer.ownerDocument;
		if (!sliderContainer.contains(doc.activeElement) || Number(doc.activeElement?.getAttribute("data-index")) !== activeIndex) {
			let thumbToFocus = sliderContainer.querySelector(`[data-index="${activeIndex}"]`);
			thumbToFocus && thumbToFocus.focus();
		}
	};
	Slider = import_react$58.forwardRef((props, ref) => {
		let { min = 0, max = 100, values, step = 1, tooltipProps, disabled = false, tickLabels, minLabel, maxLabel, trackDisplayMode = "auto", thumbMode = "inhibit-crossing", onChange, onUpdate, thumbProps, className, trackContainerProps, minProps, maxProps, trackProps, tickProps, ticksProps, orientation = "horizontal", ...rest } = props;
		let [currentValues, setCurrentValues] = import_react$58.useState(values);
		import_react$58.useEffect(() => {
			setCurrentValues(values);
		}, [values]);
		let [minValueLabel, setMinValueLabel] = import_react$58.useState(() => minLabel ?? min.toString());
		import_react$58.useEffect(() => {
			setMinValueLabel(minLabel ?? min.toString());
		}, [minLabel, min]);
		let [maxValueLabel, setMaxValueLabel] = import_react$58.useState(() => maxLabel ?? max.toString());
		import_react$58.useEffect(() => {
			setMaxValueLabel(maxLabel ?? max.toString());
		}, [maxLabel, max]);
		let [trackDisplay, setTrackDisplay] = import_react$58.useState(() => getDefaultTrackDisplay(trackDisplayMode, currentValues));
		import_react$58.useEffect(() => {
			setTrackDisplay(getDefaultTrackDisplay(trackDisplayMode, currentValues));
		}, [trackDisplayMode, currentValues]);
		let containerRef = import_react$58.useRef(null);
		let getNumDecimalPlaces = import_react$58.useMemo(() => {
			let stepString = step.toString();
			let decimalIndex = stepString.indexOf(".");
			return stepString.length - (decimalIndex + 1);
		}, [step]);
		let getAllowableThumbRange = import_react$58.useCallback((index) => {
			if ("inhibit-crossing" === thumbMode) return [0 === index ? min : currentValues[index - 1] + step, index < currentValues.length - 1 ? currentValues[index + 1] - step : max];
			return [min, max];
		}, [
			max,
			min,
			step,
			thumbMode,
			currentValues
		]);
		let [activeThumbIndex, setActiveThumbIndex] = import_react$58.useState(void 0);
		let updateThumbValue = import_react$58.useCallback((event, callbackType) => {
			if (containerRef.current && void 0 !== activeThumbIndex) {
				let percent = getPercentageOfRectangle(containerRef.current.getBoundingClientRect(), event.clientX, event.clientY, orientation);
				let pointerValue = min + (max - min) * percent;
				pointerValue = roundValueToClosestStep(pointerValue, step, min);
				let [minVal, maxVal] = getAllowableThumbRange(activeThumbIndex);
				pointerValue = getBoundedValue(pointerValue, minVal, maxVal);
				if (pointerValue !== currentValues[activeThumbIndex]) {
					let newValues = [...currentValues];
					newValues[activeThumbIndex] = pointerValue;
					setCurrentValues(newValues);
					"onChange" === callbackType ? onChange?.(newValues) : onUpdate?.(newValues);
				} else if ("onChange" === callbackType) onChange?.(currentValues);
			}
		}, [
			activeThumbIndex,
			min,
			max,
			step,
			getAllowableThumbRange,
			currentValues,
			onUpdate,
			onChange,
			orientation
		]);
		let handlePointerMove = import_react$58.useCallback((event) => {
			if (void 0 === activeThumbIndex) return;
			event.preventDefault();
			event.stopPropagation();
			updateThumbValue(event, "onUpdate");
		}, [activeThumbIndex, updateThumbValue]);
		let onThumbValueChanged = import_react$58.useCallback((index, value, keyboardReleased) => {
			if (currentValues[index] === value && !keyboardReleased) return;
			if (keyboardReleased) onChange?.(currentValues);
			else {
				let newValues = [...currentValues];
				newValues[index] = value;
				onUpdate?.(newValues);
				setCurrentValues(newValues);
			}
		}, [
			currentValues,
			onUpdate,
			onChange
		]);
		let onThumbActivated = import_react$58.useCallback((index) => {
			setActiveThumbIndex(index);
		}, []);
		let handlePointerUp = import_react$58.useCallback((event) => {
			if (void 0 === activeThumbIndex) return;
			updateThumbValue(event, "onChange");
			setActiveThumbIndex(void 0);
			event.preventDefault();
			event.stopPropagation();
		}, [activeThumbIndex, updateThumbValue]);
		let handlePointerDownOnSlider = import_react$58.useCallback((event) => {
			if (containerRef.current) {
				let percent = getPercentageOfRectangle(containerRef.current.getBoundingClientRect(), event.clientX, event.clientY, orientation);
				let pointerValue = min + (max - min) * percent;
				pointerValue = roundValueToClosestStep(pointerValue, step, min);
				let closestValueIndex = getClosestValueIndex(currentValues, pointerValue);
				let [minVal, maxVal] = getAllowableThumbRange(closestValueIndex);
				pointerValue = getBoundedValue(pointerValue, minVal, maxVal);
				if (pointerValue === currentValues[closestValueIndex]) return;
				let newValues = [...currentValues];
				newValues[closestValueIndex] = pointerValue;
				setCurrentValues(newValues);
				onChange?.(newValues);
				onUpdate?.(newValues);
				focusThumb(containerRef.current, closestValueIndex);
				event.preventDefault();
				event.stopPropagation();
			}
		}, [
			min,
			max,
			step,
			currentValues,
			getAllowableThumbRange,
			onChange,
			onUpdate,
			orientation
		]);
		useEventListener("pointermove", handlePointerMove, containerRef.current?.ownerDocument);
		useEventListener("pointerup", handlePointerUp, containerRef.current?.ownerDocument);
		let tickMarkArea = import_react$58.useMemo(() => {
			if (!tickLabels) return null;
			if (Array.isArray(tickLabels)) return import_react$58.createElement(Box, {
				as: "div",
				...ticksProps,
				className: (0, import_classnames$38.default)("iui-slider-ticks", ticksProps?.className)
			}, tickLabels.map((label, index) => import_react$58.createElement(Box, {
				as: "span",
				...tickProps,
				key: index,
				className: (0, import_classnames$38.default)("iui-slider-tick", tickProps?.className)
			}, label)));
			return tickLabels;
		}, [
			tickLabels,
			tickProps,
			ticksProps
		]);
		let generateTooltipProps = import_react$58.useCallback((index, val) => {
			let outProps = tooltipProps ? tooltipProps(index, val, step) : {};
			return {
				...outProps,
				content: outProps.content ? outProps.content : formatNumberValue(val, step, getNumDecimalPlaces)
			};
		}, [
			getNumDecimalPlaces,
			step,
			tooltipProps
		]);
		return import_react$58.createElement(Box, {
			ref,
			className: (0, import_classnames$38.default)("iui-slider-container", className),
			"data-iui-orientation": orientation,
			"data-iui-disabled": disabled ? "true" : void 0,
			...rest
		}, minValueLabel && import_react$58.createElement(Box, {
			as: "span",
			...minProps,
			className: (0, import_classnames$38.default)("iui-slider-min", minProps?.className)
		}, minValueLabel), import_react$58.createElement(FloatingDelayGroup, { delay: defaultTooltipDelay }, import_react$58.createElement(Box, {
			ref: containerRef,
			...trackContainerProps,
			className: (0, import_classnames$38.default)("iui-slider", { "iui-grabbing": void 0 !== activeThumbIndex }, trackContainerProps?.className),
			onPointerDown: handlePointerDownOnSlider
		}, currentValues.map((thumbValue, index) => {
			let [minVal, maxVal] = getAllowableThumbRange(index);
			let thisThumbProps = thumbProps?.(index);
			return import_react$58.createElement(Thumb, {
				key: thisThumbProps?.id ?? index,
				index,
				disabled,
				isActive: activeThumbIndex === index,
				onThumbActivated,
				onThumbValueChanged,
				minVal,
				maxVal,
				value: thumbValue,
				tooltipProps: generateTooltipProps(index, thumbValue),
				thumbProps: thisThumbProps,
				step,
				sliderMin: min,
				sliderMax: max
			});
		}), import_react$58.createElement(Track, {
			trackDisplayMode: trackDisplay,
			sliderMin: min,
			sliderMax: max,
			values: currentValues,
			orientation,
			...trackProps
		}))), tickMarkArea, maxValueLabel && import_react$58.createElement(Box, {
			as: "span",
			...maxProps,
			className: (0, import_classnames$38.default)("iui-slider-max", maxProps?.className)
		}, maxValueLabel));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ColorPicker/ColorBuilder.js
var import_react$57, import_classnames$37, getVerticalPercentageOfRectangle, getHorizontalPercentageOfRectangle, ColorBuilder;
var init_ColorBuilder = __esmMin((() => {
	import_react$57 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$37 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	init_Slider();
	init_ColorPickerContext();
	getVerticalPercentageOfRectangle = (rect, pointer) => {
		return (getBoundedValue(pointer, rect.top, rect.bottom) - rect.top) / rect.height * 100;
	};
	getHorizontalPercentageOfRectangle = (rect, pointer) => {
		return (getBoundedValue(pointer, rect.left, rect.right) - rect.left) / rect.width * 100;
	};
	ColorBuilder = import_react$57.forwardRef((props, ref) => {
		let { className, colorFieldProps, colorDotProps, opacitySliderProps, hueSliderProps, ...rest } = props;
		let builderRef = import_react$57.useRef(void 0);
		let refs = useMergedRefs(builderRef, ref);
		let { activeColor, hsvColor, onChangeComplete, applyHsvColorChange, showAlpha } = useColorPickerContext();
		let hueSliderColor = import_react$57.useMemo(() => ColorValue.create({
			h: hsvColor.h,
			s: 100,
			v: 100
		}), [hsvColor.h]);
		let sliderValue = import_react$57.useMemo(() => hsvColor.h, [hsvColor]);
		let alphaValue = import_react$57.useMemo(() => showAlpha ? hsvColor.a ?? 1 : 1, [hsvColor.a, showAlpha]);
		let dotColorString = import_react$57.useMemo(() => activeColor.toHexString(), [activeColor]);
		let [colorDotActive, setColorDotActive] = import_react$57.useState(false);
		let hueColorString = hueSliderColor.toHexString();
		let squareTop = 100 - hsvColor.v;
		let squareLeft = hsvColor.s;
		let updateHueSlider = import_react$57.useCallback((huePercent, selectionChanged) => {
			let newHsvColor = {
				h: Number(huePercent.toFixed(2)),
				s: hsvColor.s,
				v: hsvColor.v,
				a: hsvColor.a
			};
			applyHsvColorChange(newHsvColor, selectionChanged);
		}, [applyHsvColorChange, hsvColor]);
		let updateOpacitySlider = import_react$57.useCallback((alphaPercent, selectionChanged) => {
			let alpha = Number(alphaPercent.toFixed(2));
			let newHsvColor = {
				h: hsvColor.h,
				s: hsvColor.s,
				v: hsvColor.v,
				a: alpha
			};
			applyHsvColorChange(newHsvColor, selectionChanged);
		}, [applyHsvColorChange, hsvColor]);
		let squareRef = import_react$57.useRef(null);
		let colorDotRef = import_react$57.useRef(null);
		let updateColorDot = import_react$57.useCallback((x, y, selectionChanged) => {
			let newHsvColor = {
				h: hsvColor.h,
				s: x,
				v: 100 - y,
				a: hsvColor.a
			};
			applyHsvColorChange(newHsvColor, selectionChanged);
		}, [applyHsvColorChange, hsvColor]);
		let updateSquareValue = import_react$57.useCallback((event, callbackType) => {
			if (squareRef.current && colorDotActive || squareRef.current && "onClick" === callbackType) {
				let percentX = getHorizontalPercentageOfRectangle(squareRef.current.getBoundingClientRect(), event.clientX);
				let percentY = getVerticalPercentageOfRectangle(squareRef.current.getBoundingClientRect(), event.clientY);
				"onChange" === callbackType ? updateColorDot(percentX, percentY, true) : updateColorDot(percentX, percentY, false);
			}
		}, [colorDotActive, updateColorDot]);
		useEventListener("pointerup", import_react$57.useCallback((event) => {
			if (!colorDotActive) return;
			updateSquareValue(event, "onChange");
			setColorDotActive(false);
			event.preventDefault();
			event.stopPropagation();
		}, [colorDotActive, updateSquareValue]), builderRef.current?.ownerDocument);
		useEventListener("pointermove", import_react$57.useCallback((event) => {
			if (!colorDotActive) return;
			event.preventDefault();
			event.stopPropagation();
			updateSquareValue(event, "onUpdate");
		}, [colorDotActive, updateSquareValue]), builderRef.current?.ownerDocument);
		useEventListener("pointerleave", import_react$57.useCallback((event) => {
			if (!colorDotActive) return;
			updateSquareValue(event, "onChange");
			setColorDotActive(false);
		}, [colorDotActive, updateSquareValue]), builderRef.current?.ownerDocument);
		let keysPressed = import_react$57.useRef({});
		let handleColorDotKeyDown = (event) => {
			if (event.altKey) return;
			let x = squareLeft;
			let y = squareTop;
			keysPressed.current[event.key] = true;
			switch (event.key) {
				case "ArrowDown":
					y = Math.min(y + 1, 100);
					updateColorDot(x, y, false);
					break;
				case "ArrowUp":
					y = Math.max(y - 1, 0);
					updateColorDot(x, y, false);
					break;
				case "ArrowLeft":
					x = Math.max(x - 1, 0);
					updateColorDot(x, y, false);
					break;
				case "ArrowRight":
					x = Math.min(x + 1, 100);
					updateColorDot(x, y, false);
					break;
			}
		};
		let handleColorDotKeyUp = (event) => {
			keysPressed.current[event.key] = false;
			switch (event.key) {
				case "ArrowUp":
				case "ArrowDown":
				case "ArrowLeft":
				case "ArrowRight":
					if (keysPressed.current["ArrowUp"] || keysPressed.current["ArrowDown"] || keysPressed.current["ArrowLeft"] || keysPressed.current["ArrowRight"]) return;
					onChangeComplete?.(ColorValue.create(hsvColor));
					break;
			}
		};
		return import_react$57.createElement(Box, {
			className: (0, import_classnames$37.default)("iui-color-selection-wrapper", className),
			ref: refs,
			...rest
		}, import_react$57.createElement(Box, {
			as: "div",
			...colorFieldProps,
			className: (0, import_classnames$37.default)("iui-color-field", colorFieldProps?.className),
			style: {
				"--iui-color-field-hue": hueColorString,
				"--iui-color-picker-selected-color": dotColorString,
				...colorFieldProps?.style
			},
			ref: useMergedRefs(squareRef, colorFieldProps?.ref),
			onPointerDown: mergeEventHandlers(colorFieldProps?.onPointerDown, (event) => {
				event.preventDefault();
				updateSquareValue(event, "onClick");
				setColorDotActive(true);
				colorDotRef.current?.focus();
			})
		}, import_react$57.createElement(Box, {
			as: "div",
			...colorDotProps,
			className: (0, import_classnames$37.default)("iui-color-dot", colorDotProps?.className),
			style: {
				"--iui-color-dot-inset-block": `${squareTop.toString()}% auto`,
				"--iui-color-dot-inset-inline": `${squareLeft.toString()}% auto`,
				...colorDotProps?.style
			},
			onPointerDown: mergeEventHandlers(colorDotProps?.onPointerDown, () => {
				setColorDotActive(true);
				colorDotRef.current?.focus();
			}),
			onKeyDown: mergeEventHandlers(colorDotProps?.onKeyDown, handleColorDotKeyDown),
			onKeyUp: mergeEventHandlers(colorDotProps?.onKeyUp, handleColorDotKeyUp),
			tabIndex: 0,
			ref: useMergedRefs(colorDotRef, colorDotProps?.ref)
		})), import_react$57.createElement(Slider, {
			minLabel: "",
			maxLabel: "",
			values: [sliderValue],
			trackDisplayMode: "none",
			min: 0,
			max: 359,
			...hueSliderProps,
			className: (0, import_classnames$37.default)("iui-hue-slider", hueSliderProps?.className),
			tooltipProps: () => ({
				visible: false,
				...hueSliderProps?.tooltipProps
			}),
			onChange: (values) => {
				hueSliderProps?.onChange?.(values);
				updateHueSlider(values[0], true);
			},
			onUpdate: (values) => {
				hueSliderProps?.onUpdate?.(values);
				updateHueSlider(values[0], false);
			},
			thumbProps: () => ({
				"aria-label": "Hue",
				...hueSliderProps?.thumbProps
			})
		}), showAlpha && import_react$57.createElement(Slider, {
			minLabel: "",
			maxLabel: "",
			values: [alphaValue],
			trackDisplayMode: "none",
			min: 0,
			max: 1,
			step: .01,
			...opacitySliderProps,
			className: (0, import_classnames$37.default)("iui-opacity-slider", opacitySliderProps?.className),
			tooltipProps: () => ({
				visible: false,
				...opacitySliderProps?.tooltipProps
			}),
			onChange: (values) => {
				opacitySliderProps?.onChange?.(values);
				updateOpacitySlider(values[0], true);
			},
			onUpdate: (values) => {
				opacitySliderProps?.onUpdate?.(values);
				updateOpacitySlider(values[0], false);
			},
			style: {
				"--iui-color-picker-selected-color": hueColorString,
				...opacitySliderProps?.style
			},
			thumbProps: () => ({
				"aria-label": "Opacity",
				...opacitySliderProps?.thumbProps
			})
		}));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Input/Input.js
var import_classnames$36, import_react$56, Input;
var init_Input = __esmMin((() => {
	import_classnames$36 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react$56 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	Input = import_react$56.forwardRef((props, ref) => {
		let { size, htmlSize, status, className, ...rest } = props;
		let refs = useMergedRefs(import_react$56.useRef(null), ref);
		return import_react$56.createElement(Box, {
			as: "input",
			className: (0, import_classnames$36.default)("iui-input", "iui-field", className),
			"data-iui-size": size,
			"data-iui-status": status,
			size: htmlSize,
			ref: refs,
			...rest
		});
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ColorPicker/ColorInputPanel.js
var import_react$55, import_classnames$35, ColorInputPanel;
var init_ColorInputPanel = __esmMin((() => {
	import_react$55 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$35 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_IconButton();
	init_Input();
	init_utils$1();
	init_ColorPickerContext();
	ColorInputPanel = import_react$55.forwardRef((props, ref) => {
		let { defaultColorFormat, allowedColorFormats = [
			"hsl",
			"rgb",
			"hex"
		], className, colorInputContainerProps, panelLabelProps, inputFieldsGroupProps, swapColorFormatButtonProps, ...rest } = props;
		let inputsContainerRef = import_react$55.useRef(null);
		let { activeColor, applyHsvColorChange, hsvColor, showAlpha } = useColorPickerContext();
		let [currentFormat, setCurrentFormat] = import_react$55.useState(defaultColorFormat);
		import_react$55.useEffect(() => {
			setCurrentFormat(defaultColorFormat);
		}, [defaultColorFormat]);
		let [input, setInput] = import_react$55.useState([
			"",
			"",
			"",
			""
		]);
		import_react$55.useEffect(() => {
			if ("hsl" === currentFormat) {
				let hsl = activeColor.toHslColor();
				setInput([
					ColorValue.getFormattedColorNumber(hsvColor.h),
					ColorValue.getFormattedColorNumber(hsl.s),
					ColorValue.getFormattedColorNumber(hsl.l),
					ColorValue.getFormattedColorNumber(hsl.a ?? activeColor.getAlpha() / 255, 2)
				]);
			} else if ("rgb" === currentFormat) {
				let rgb = activeColor.toRgbColor();
				setInput([
					rgb.r.toString(),
					rgb.g.toString(),
					rgb.b.toString(),
					ColorValue.getFormattedColorNumber(rgb.a ?? activeColor.getAlpha() / 255, 2)
				]);
			} else {
				setInput([activeColor.toHexString(showAlpha)]);
				setValidHexInput(true);
			}
		}, [
			activeColor,
			hsvColor.h,
			currentFormat,
			showAlpha
		]);
		let [validHexInput, setValidHexInput] = import_react$55.useState(true);
		let swapColorFormat = import_react$55.useCallback(() => {
			let newFormat = allowedColorFormats[(allowedColorFormats.indexOf(currentFormat) + 1) % allowedColorFormats.length] ?? allowedColorFormats[0];
			setCurrentFormat(newFormat);
		}, [currentFormat, allowedColorFormats]);
		let isFocusInside = (focused) => !!(focused && inputsContainerRef.current && inputsContainerRef.current.contains(focused));
		let handleColorInputChange = () => {
			let color;
			if ("hex" === currentFormat) try {
				let value = input[0].replace(/ /g, "").toLowerCase();
				color = ColorValue.create(value);
				setValidHexInput(true);
				if (activeColor.toHexString(showAlpha).toLowerCase() === value) return;
			} catch (_e) {
				setValidHexInput(false);
				return;
			}
			if ("hsl" === currentFormat) {
				let [h, s, l, a] = input.map(Number);
				if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100 || a < 0 || a > 1) return;
				let hsl = activeColor.toHslColor();
				if (hsl.h === h && hsl.s === s && hsl.l === l && hsl.a === a) return;
				color = ColorValue.create({
					h,
					s,
					l,
					a
				});
			}
			if ("rgb" === currentFormat) {
				let [r, g, b, a] = input.map(Number);
				if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 || a < 0 || a > 1) return;
				let rgb = activeColor.toRgbColor();
				if (rgb.r === r && rgb.g === g && rgb.b === b && rgb.a === a) return;
				color = ColorValue.create({
					r,
					g,
					b,
					a
				});
			}
			if (color) applyHsvColorChange(color.toHsvColor(), true, color);
		};
		let hexInputField = import_react$55.createElement(Input, {
			size: "small",
			maxLength: showAlpha ? 9 : 7,
			minLength: 1,
			placeholder: "HEX",
			"aria-label": "Hex",
			value: input[0],
			onChange: (event) => {
				let value = event.target.value.startsWith("#") ? event.target.value : `#${event.target.value}`;
				setInput([value]);
			},
			onKeyDown: (event) => {
				if ("Enter" === event.key) {
					event.preventDefault();
					handleColorInputChange();
				}
			},
			onBlur: (event) => {
				event.preventDefault();
				handleColorInputChange();
			},
			status: validHexInput ? void 0 : "negative"
		});
		let hslInputs = import_react$55.createElement(import_react$55.Fragment, null, import_react$55.createElement(Input, {
			size: "small",
			type: "number",
			min: "0",
			max: "359",
			step: ".1",
			placeholder: "H",
			"aria-label": "Hue",
			value: input[0] ?? "",
			onChange: (event) => {
				setInput([
					event.target.value,
					input[1],
					input[2],
					input[3]
				]);
			},
			onKeyDown: (event) => {
				if ("Enter" === event.key) {
					event.preventDefault();
					handleColorInputChange();
				}
			},
			onBlur: (event) => {
				event.preventDefault();
				if (!isFocusInside(event.relatedTarget)) handleColorInputChange();
			},
			status: Number(input[0]) < 0 || Number(input[0]) > 360 ? "negative" : void 0
		}), import_react$55.createElement(Input, {
			size: "small",
			type: "number",
			min: "0",
			max: "100",
			step: ".1",
			placeholder: "S",
			"aria-label": "Saturation",
			value: input[1] ?? "",
			onChange: (event) => {
				setInput([
					input[0],
					event.target.value,
					input[2],
					input[3]
				]);
			},
			onKeyDown: (event) => {
				if ("Enter" === event.key) {
					event.preventDefault();
					handleColorInputChange();
				}
			},
			onBlur: (event) => {
				event.preventDefault();
				if (!isFocusInside(event.relatedTarget)) handleColorInputChange();
			},
			status: Number(input[1]) < 0 || Number(input[1]) > 100 ? "negative" : void 0
		}), import_react$55.createElement(Input, {
			size: "small",
			type: "number",
			min: "0",
			max: "100",
			step: ".1",
			placeholder: "L",
			"aria-label": "Lightness",
			value: input[2] ?? "",
			onChange: (event) => {
				setInput([
					input[0],
					input[1],
					event.target.value,
					input[3]
				]);
			},
			onKeyDown: (event) => {
				if ("Enter" === event.key) {
					event.preventDefault();
					handleColorInputChange();
				}
			},
			onBlur: (event) => {
				event.preventDefault();
				if (!isFocusInside(event.relatedTarget)) handleColorInputChange();
			},
			status: Number(input[2]) < 0 || Number(input[2]) > 100 ? "negative" : void 0
		}), showAlpha && import_react$55.createElement(Input, {
			size: "small",
			type: "number",
			min: "0",
			max: "1",
			step: ".01",
			placeholder: "A",
			"aria-label": "Alpha",
			value: input[3] ?? "",
			onChange: (event) => {
				setInput([
					input[0],
					input[1],
					input[2],
					event.target.value
				]);
			},
			onKeyDown: (event) => {
				if ("Enter" === event.key) {
					event.preventDefault();
					handleColorInputChange();
				}
			},
			onBlur: (event) => {
				event.preventDefault();
				if (!isFocusInside(event.relatedTarget)) handleColorInputChange();
			},
			status: Number(input[3]) < 0 || Number(input[3]) > 1 ? "negative" : void 0
		}));
		let rgbInputs = import_react$55.createElement(import_react$55.Fragment, null, import_react$55.createElement(Input, {
			size: "small",
			type: "number",
			min: "0",
			max: "255",
			placeholder: "R",
			"aria-label": "Red",
			value: input[0] ?? "",
			onChange: (event) => {
				setInput([
					event.target.value,
					input[1],
					input[2],
					input[3]
				]);
			},
			onKeyDown: (event) => {
				if ("Enter" === event.key) {
					event.preventDefault();
					handleColorInputChange();
				}
			},
			onBlur: (event) => {
				event.preventDefault();
				if (!isFocusInside(event.relatedTarget)) handleColorInputChange();
			},
			status: Number(input[0]) < 0 || Number(input[0]) > 255 ? "negative" : void 0
		}), import_react$55.createElement(Input, {
			size: "small",
			type: "number",
			min: "0",
			max: "255",
			placeholder: "G",
			"aria-label": "Green",
			value: input[1] ?? "",
			onChange: (event) => {
				setInput([
					input[0],
					event.target.value,
					input[2],
					input[3]
				]);
			},
			onKeyDown: (event) => {
				if ("Enter" === event.key) {
					event.preventDefault();
					handleColorInputChange();
				}
			},
			onBlur: (event) => {
				event.preventDefault();
				if (!isFocusInside(event.relatedTarget)) handleColorInputChange();
			},
			status: Number(input[1]) < 0 || Number(input[1]) > 255 ? "negative" : void 0
		}), import_react$55.createElement(Input, {
			size: "small",
			type: "number",
			min: "0",
			max: "255",
			placeholder: "B",
			"aria-label": "Blue",
			value: input[2] ?? "",
			onChange: (event) => {
				setInput([
					input[0],
					input[1],
					event.target.value,
					input[3]
				]);
			},
			onKeyDown: (event) => {
				if ("Enter" === event.key) {
					event.preventDefault();
					handleColorInputChange();
				}
			},
			onBlur: (event) => {
				event.preventDefault();
				if (!isFocusInside(event.relatedTarget)) handleColorInputChange();
			},
			status: Number(input[2]) < 0 || Number(input[2]) > 255 ? "negative" : void 0
		}), showAlpha && import_react$55.createElement(Input, {
			size: "small",
			type: "number",
			min: "0",
			max: "1",
			step: ".01",
			placeholder: "A",
			"aria-label": "Alpha",
			value: input[3] ?? "",
			onChange: (event) => {
				setInput([
					input[0],
					input[1],
					input[2],
					event.target.value
				]);
			},
			onKeyDown: (event) => {
				if ("Enter" === event.key) {
					event.preventDefault();
					handleColorInputChange();
				}
			},
			onBlur: (event) => {
				event.preventDefault();
				if (!isFocusInside(event.relatedTarget)) handleColorInputChange();
			},
			status: Number(input[3]) < 0 || Number(input[3]) > 1 ? "negative" : void 0
		}));
		let fallbackLabelId = useId$1();
		let labelId = panelLabelProps?.id ?? fallbackLabelId;
		return import_react$55.createElement(Box, {
			as: "div",
			className: (0, import_classnames$35.default)("iui-color-input-wrapper", className),
			ref,
			...rest
		}, import_react$55.createElement(Box, {
			as: "div",
			...panelLabelProps,
			className: (0, import_classnames$35.default)("iui-color-picker-section-label", panelLabelProps?.className),
			id: labelId
		}, showAlpha && "hex" !== currentFormat ? currentFormat.toUpperCase() + "A" : currentFormat.toUpperCase()), import_react$55.createElement(Box, {
			as: "div",
			...colorInputContainerProps,
			className: (0, import_classnames$35.default)("iui-color-input", colorInputContainerProps?.className)
		}, allowedColorFormats.length > 1 && import_react$55.createElement(IconButton, {
			size: "small",
			styleType: "borderless",
			label: "Switch format",
			...swapColorFormatButtonProps,
			onClick: mergeEventHandlers(swapColorFormatButtonProps?.onClick, swapColorFormat)
		}, import_react$55.createElement(SvgSwap, null)), import_react$55.createElement(Box, {
			as: "div",
			role: "hex" !== currentFormat ? "group" : void 0,
			"aria-labelledby": "hex" !== currentFormat ? labelId : void 0,
			...inputFieldsGroupProps,
			ref: useMergedRefs(inputsContainerRef, inputFieldsGroupProps?.ref),
			className: (0, import_classnames$35.default)("iui-color-input-fields", inputFieldsGroupProps?.className)
		}, "hex" === currentFormat && hexInputField, "rgb" === currentFormat && rgbInputs, "hsl" === currentFormat && hslInputs)));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ColorPicker/ColorPalette.js
var import_react$54, import_classnames$34, ColorPalette;
var init_ColorPalette = __esmMin((() => {
	import_react$54 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$34 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	init_ColorPicker();
	init_ColorSwatch();
	init_ColorPickerContext();
	ColorPalette = import_react$54.forwardRef((props, ref) => {
		let { colors, label, labelProps, className, children, paletteContainerProps, ...rest } = props;
		let { activeColor, setActiveColor, onChangeComplete } = useColorPickerContext();
		return import_react$54.createElement(Box, {
			className: (0, import_classnames$34.default)("iui-color-palette-wrapper", className),
			ref,
			...rest
		}, label && import_react$54.createElement(Box, {
			as: "div",
			...labelProps,
			className: (0, import_classnames$34.default)("iui-color-picker-section-label", labelProps?.className)
		}, label), import_react$54.createElement(Box, {
			as: "div",
			...paletteContainerProps,
			className: (0, import_classnames$34.default)("iui-color-palette", paletteContainerProps?.className)
		}, children, colors && colors.map((_color, index) => {
			let color = getColorValue(_color);
			return import_react$54.createElement(ColorSwatch, {
				key: index,
				color,
				onClick: () => {
					onChangeComplete?.(color);
					setActiveColor(color);
				},
				isActive: color.equals(activeColor)
			});
		})));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Menu/MenuExtraContent.js
var MenuExtraContent;
var init_MenuExtraContent = __esmMin((() => {
	init_utils$1();
	MenuExtraContent = polymorphic.div("iui-menu-content");
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/LinkAction/LinkAction.js
var import_react$53, import_classnames$33, LinkAction, LinkBox;
var init_LinkAction = __esmMin((() => {
	import_react$53 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$33 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_polymorphic();
	init_components();
	LinkAction = import_react$53.forwardRef((props, forwardedRef) => {
		let { as: asProp = !!props.href ? "a" : "button" } = props;
		return import_react$53.createElement(Box, {
			...props,
			as: asProp,
			className: (0, import_classnames$33.default)("iui-link-action", props.className),
			ref: forwardedRef
		});
	});
	LinkBox = polymorphic.div("iui-link-box");
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Tag/Tag.js
var import_classnames$32, import_react$52, Tag;
var init_Tag = __esmMin((() => {
	import_classnames$32 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react$52 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	init_IconButton();
	init_LinkAction();
	Tag = import_react$52.forwardRef((props, forwardedRef) => {
		let { className, variant = "default", children, onRemove, onClick, labelProps, removeButtonProps, ...rest } = props;
		let shouldUseLinkAction = !!onClick && !!onRemove;
		return import_react$52.createElement(Box, {
			as: shouldUseLinkAction ? LinkBox : onClick ? ButtonBase : "span",
			className: (0, import_classnames$32.default)({
				"iui-tag-basic": "basic" === variant,
				"iui-tag": "default" === variant
			}, className),
			ref: forwardedRef,
			onClick: shouldUseLinkAction ? void 0 : onClick,
			...rest
		}, "default" === variant ? import_react$52.createElement(Box, {
			as: shouldUseLinkAction ? LinkAction : "span",
			...labelProps,
			onClick: mergeEventHandlers(labelProps?.onClick, shouldUseLinkAction ? onClick : void 0),
			className: (0, import_classnames$32.default)("iui-tag-label", labelProps?.className)
		}, children) : children, onRemove && import_react$52.createElement(IconButton, {
			styleType: "borderless",
			size: "small",
			"aria-label": "Delete tag",
			...removeButtonProps,
			onClick: mergeEventHandlers(removeButtonProps?.onClick, onRemove),
			className: (0, import_classnames$32.default)("iui-tag-button", removeButtonProps?.className)
		}, import_react$52.createElement(SvgCloseSmall, { "aria-hidden": true })));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Select/SelectTag.js
var import_classnames$31, import_react$51, SelectTag;
var init_SelectTag = __esmMin((() => {
	import_classnames$31 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react$51 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Tag();
	SelectTag = import_react$51.forwardRef((props, forwardedRef) => {
		let { className, label, ...rest } = props;
		return import_react$51.createElement(Tag, {
			className: (0, import_classnames$31.default)("iui-select-tag", className),
			labelProps: { className: "iui-select-tag-label" },
			removeButtonProps: {
				className: "iui-select-tag-button",
				"aria-label": `Deselect ${label}`
			},
			ref: forwardedRef,
			...rest
		}, label);
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ComboBox/helpers.js
var import_react$50, ComboBoxRefsContext, ComboBoxStateContext;
var init_helpers = __esmMin((() => {
	import_react$50 = /* @__PURE__ */ __toESM(require_react(), 1);
	ComboBoxRefsContext = import_react$50.createContext(void 0);
	ComboBoxStateContext = import_react$50.createContext(void 0);
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ComboBox/ComboBoxEndIcon.js
var import_classnames$30, import_react$49, ComboBoxEndIcon;
var init_ComboBoxEndIcon = __esmMin((() => {
	import_classnames$30 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react$49 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	init_Icon();
	ComboBoxEndIcon = import_react$49.forwardRef((props, forwardedRef) => {
		let { className, children, disabled, isOpen, ...rest } = props;
		return import_react$49.createElement(Icon, {
			as: "span",
			ref: forwardedRef,
			className: (0, import_classnames$30.default)("iui-end-icon", {
				"iui-disabled": disabled,
				"iui-open": isOpen
			}, className),
			...rest
		}, children ?? import_react$49.createElement(SvgCaretDownSmall, { "aria-hidden": true }));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Select/SelectTagContainer.js
var import_react$48, import_classnames$29, SelectTagContainer, SelectTagContainerContent;
var init_SelectTagContainer = __esmMin((() => {
	import_react$48 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$29 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_SelectTag();
	init_utils$1();
	SelectTagContainer = import_react$48.forwardRef((props, forwardedRef) => {
		let { tags: tagsProp, className, ...rest } = props;
		let tags = import_react$48.useMemo(() => import_react$48.Children.toArray(tagsProp), [tagsProp]);
		return import_react$48.createElement(OverflowContainer, {
			itemsCount: tags.length,
			className: (0, import_classnames$29.default)("iui-select-tag-container", className),
			ref: forwardedRef,
			...rest
		}, import_react$48.createElement(SelectTagContainerContent, {
			...props,
			tags
		}));
	});
	SelectTagContainerContent = (props) => {
		let { tags } = props;
		let { visibleCount } = OverflowContainer.useContext();
		return import_react$48.createElement(import_react$48.Fragment, null, visibleCount < tags.length ? tags.slice(0, visibleCount - 1) : tags, import_react$48.createElement(OverflowContainer.OverflowNode, null, import_react$48.createElement(SelectTag, { label: `+${tags.length - visibleCount + 1} item(s)` })));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ComboBox/ComboBoxMultipleContainer.js
var import_react$47, ComboBoxMultipleContainer;
var init_ComboBoxMultipleContainer = __esmMin((() => {
	import_react$47 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_SelectTagContainer();
	ComboBoxMultipleContainer = import_react$47.forwardRef((props, ref) => {
		let { selectedItems = [], ...rest } = props;
		return import_react$47.createElement(SelectTagContainer, {
			ref,
			tags: selectedItems,
			...rest
		});
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ComboBox/ComboBoxInput.js
var import_react$46, ComboBoxInput;
var init_ComboBoxInput = __esmMin((() => {
	import_react$46 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Input();
	init_utils$1();
	init_ComboBoxMultipleContainer();
	init_helpers();
	ComboBoxInput = import_react$46.forwardRef((props, forwardedRef) => {
		let { selectTags, size, style, ...rest } = props;
		let { isOpen, id, focusedIndex, setFocusedIndex, enableVirtualization, multiple, onClickHandler, popover, show, hide } = useSafeContext(ComboBoxStateContext);
		let { inputRef, menuRef, optionsExtraInfo } = useSafeContext(ComboBoxRefsContext);
		let refs = useMergedRefs(inputRef, popover.refs.setReference, forwardedRef);
		let focusedIndexRef = useLatestRef$2(focusedIndex ?? -1);
		let getIdFromIndex = (index) => menuRef.current?.querySelector(`[data-iui-index="${index}"]`)?.id ?? "";
		let handleKeyDown = import_react$46.useCallback((event) => {
			let length = Object.keys(optionsExtraInfo).length ?? 0;
			if (event.altKey) return;
			switch (event.key) {
				case "ArrowDown": {
					event.preventDefault();
					if (!isOpen) return show();
					if (0 === length) return;
					if (-1 === focusedIndexRef.current) {
						let currentElement = menuRef.current?.querySelector("[data-iui-index]");
						return setFocusedIndex(Number(currentElement?.getAttribute("data-iui-index") ?? 0));
					}
					if (enableVirtualization && !menuRef.current?.querySelector(`[data-iui-index="${focusedIndexRef.current}"]`)?.nextElementSibling) return;
					let nextIndex = focusedIndexRef.current;
					do {
						let nextElement = (menuRef.current?.querySelector(`[data-iui-index="${nextIndex}"]`))?.nextElementSibling ?? menuRef.current?.querySelector("[data-iui-index]");
						nextIndex = Number(nextElement?.getAttribute("data-iui-index"));
						if (nextElement) return setFocusedIndex(nextIndex);
					} while (nextIndex !== focusedIndexRef.current);
					break;
				}
				case "ArrowUp": {
					event.preventDefault();
					if (!isOpen) return show();
					if (0 === length) return;
					if (enableVirtualization && !menuRef.current?.querySelector(`[data-iui-index="${focusedIndexRef.current}"]`)?.previousElementSibling) return;
					if (-1 === focusedIndexRef.current) return setFocusedIndex(Object.values(optionsExtraInfo)?.[length - 1].__originalIndex ?? -1);
					let prevIndex = focusedIndexRef.current;
					do {
						let prevElement = (menuRef.current?.querySelector(`[data-iui-index="${prevIndex}"]`))?.previousElementSibling ?? menuRef.current?.querySelector("[data-iui-index]:last-of-type");
						prevIndex = Number(prevElement?.getAttribute("data-iui-index"));
						if (prevElement) return setFocusedIndex(prevIndex);
					} while (prevIndex !== focusedIndexRef.current);
					break;
				}
				case "Enter":
					event.preventDefault();
					if (isOpen) {
						if (focusedIndexRef.current > -1) onClickHandler?.(focusedIndexRef.current);
					} else show();
					break;
				case "Escape":
					event.preventDefault();
					hide();
					break;
				case "Tab":
					hide();
					break;
			}
		}, [
			setFocusedIndex,
			enableVirtualization,
			focusedIndexRef,
			isOpen,
			menuRef,
			onClickHandler,
			optionsExtraInfo,
			show,
			hide
		]);
		let wasOpenBeforeClick = import_react$46.useRef(false);
		let handlePointerDown = import_react$46.useCallback(() => {
			wasOpenBeforeClick.current = isOpen;
		}, [isOpen]);
		let handleClick = import_react$46.useCallback(() => {
			if (wasOpenBeforeClick.current) hide();
			else show();
			wasOpenBeforeClick.current = false;
		}, [hide, show]);
		let [tagContainerWidthRef, tagContainerWidth] = useContainerWidth();
		return import_react$46.createElement(import_react$46.Fragment, null, import_react$46.createElement(Input, {
			ref: refs,
			"aria-expanded": isOpen,
			"aria-activedescendant": isOpen && void 0 != focusedIndex && focusedIndex > -1 ? getIdFromIndex(focusedIndex) : void 0,
			role: "combobox",
			"aria-controls": isOpen ? `${id}-list` : void 0,
			"aria-autocomplete": "list",
			spellCheck: false,
			autoCapitalize: "none",
			autoCorrect: "off",
			style: {
				...multiple && { paddingInlineStart: tagContainerWidth + 18 },
				...style
			},
			size,
			...popover.getReferenceProps({
				...rest,
				onPointerDown: mergeEventHandlers(props.onPointerDown, handlePointerDown),
				onClick: mergeEventHandlers(props.onClick, handleClick),
				onKeyDown: mergeEventHandlers(props.onKeyDown, handleKeyDown)
			})
		}), multiple && selectTags ? import_react$46.createElement(ComboBoxMultipleContainer, {
			ref: tagContainerWidthRef,
			selectedItems: selectTags
		}) : null);
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ComboBox/ComboBoxInputContainer.js
var import_react$45, ComboBoxInputContainer;
var init_ComboBoxInputContainer = __esmMin((() => {
	import_react$45 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_StatusMessage();
	init_utils$1();
	init_helpers();
	ComboBoxInputContainer = import_react$45.forwardRef((props, forwardedRef) => {
		let { className, status, message, children, ...rest } = props;
		let { id } = useSafeContext(ComboBoxStateContext);
		return import_react$45.createElement(InputContainer, {
			className,
			status,
			statusMessage: "string" == typeof message ? import_react$45.createElement(StatusMessage, { status }, message) : import_react$45.isValidElement(message) && import_react$45.cloneElement(message, { status }),
			ref: forwardedRef,
			...rest,
			id
		}, import_react$45.createElement(InputWithIcon, null, children));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/List/List.js
var import_react$44, import_classnames$28, List;
var init_List = __esmMin((() => {
	import_react$44 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	init_floating_ui_react();
	init_Tooltip();
	import_classnames$28 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	List = import_react$44.forwardRef((props, ref) => {
		let { className, ...rest } = props;
		return import_react$44.createElement(FloatingDelayGroup, { delay: defaultTooltipDelay }, import_react$44.createElement(Box, {
			as: "div",
			ref,
			role: "list",
			...rest,
			className: (0, import_classnames$28.default)("iui-list", className)
		}));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ComboBox/ComboBoxMenu.js
var import_react$43, import_classnames$27, VirtualizedComboBoxMenu, ComboBoxMenu;
var init_ComboBoxMenu = __esmMin((() => {
	import_react$43 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$27 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	init_helpers();
	init_List();
	VirtualizedComboBoxMenu = (props) => {
		let { children, ...rest } = props;
		let { filteredOptions, getMenuItem, focusedIndex } = useSafeContext(ComboBoxStateContext);
		let { menuRef } = useSafeContext(ComboBoxRefsContext);
		let mostlySubLabeled = import_react$43.useMemo(() => {
			let numberOfSubLabels = 0;
			for (let i = 0; i < Math.min(5, filteredOptions.length); i++) if (filteredOptions[i].sublabel) numberOfSubLabels++;
			return numberOfSubLabels >= Math.min(3, filteredOptions.length);
		}, [filteredOptions]);
		let focusedVisibleIndex = import_react$43.useMemo(() => {
			let currentElement = menuRef.current?.querySelector(`[data-iui-index="${focusedIndex}"]`);
			if (!currentElement) return focusedIndex;
			return Number(currentElement.getAttribute("data-iui-filtered-index") ?? focusedIndex);
		}, [focusedIndex, menuRef]);
		let { virtualizer, css: virtualizerCss } = useVirtualScroll({
			count: filteredOptions.length || 1,
			getScrollElement: () => menuRef.current,
			estimateSize: () => mostlySubLabeled ? 48 : 36,
			gap: -1
		});
		useIsomorphicLayoutEffect$1(() => {
			virtualizer.scrollToIndex(focusedVisibleIndex);
		}, [virtualizer, focusedVisibleIndex]);
		let virtualItemRenderer = import_react$43.useCallback((virtualItem) => {
			let menuItem = filteredOptions.length > 0 ? getMenuItem(filteredOptions[virtualItem.index], virtualItem.index) : children;
			return import_react$43.cloneElement(menuItem, {
				key: virtualItem.key,
				ref: virtualizer.measureElement,
				"data-iui-virtualizer": "item",
				style: {
					width: "100%",
					transform: `translateY(${virtualItem.start}px)`
				}
			});
		}, [
			filteredOptions,
			getMenuItem,
			children,
			virtualizer.measureElement
		]);
		return import_react$43.createElement("div", { style: { display: "contents" } }, import_react$43.createElement(ShadowRoot$1, { css: virtualizerCss }, import_react$43.createElement(Box, {
			as: "div",
			"data-iui-virtualizer": "root",
			...rest,
			style: {
				minBlockSize: virtualizer.getTotalSize(),
				...props.style
			}
		}, import_react$43.createElement("slot", null))), import_react$43.createElement(import_react$43.Fragment, null, virtualizer.getVirtualItems().map((virtualItem) => virtualItemRenderer(virtualItem))));
	};
	ComboBoxMenu = import_react$43.forwardRef((props, forwardedRef) => {
		let { className, children, style, portal = true, ...rest } = props;
		let { id, enableVirtualization, popover } = useSafeContext(ComboBoxStateContext);
		let { menuRef } = useSafeContext(ComboBoxRefsContext);
		let refs = useMergedRefs(popover.refs.setFloating, forwardedRef, menuRef);
		return popover.open && import_react$43.createElement(Portal, { portal }, import_react$43.createElement(List, {
			as: "div",
			className: (0, import_classnames$27.default)("iui-menu", className),
			id: `${id}-list`,
			role: "listbox",
			ref: refs,
			...popover.getFloatingProps({
				style: enableVirtualization ? {
					maxInlineSize: 0,
					...style
				} : style,
				...rest
			})
		}, enableVirtualization ? import_react$43.createElement(VirtualizedComboBoxMenu, null, children) : children));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/List/ListItem.js
var import_react$42, import_classnames$26, ListItemComponent, ListItemIcon, ListItemContent, ListItemDescription, ListItemAction, ListItem;
var init_ListItem = __esmMin((() => {
	import_react$42 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$26 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	init_LinkAction();
	ListItemComponent = import_react$42.forwardRef((props, ref) => {
		let { size = "default", disabled = false, active = false, actionable = false, focused = false, className, ...rest } = props;
		return import_react$42.createElement(Box, {
			role: "listitem",
			className: (0, import_classnames$26.default)("iui-list-item", className),
			"data-iui-active": active ? "true" : void 0,
			"data-iui-disabled": disabled ? "true" : void 0,
			"data-iui-size": "large" === size ? "large" : void 0,
			"data-iui-actionable": actionable ? "true" : void 0,
			"data-iui-focused": focused ? "true" : void 0,
			ref,
			...rest
		});
	});
	ListItemIcon = polymorphic.div("iui-list-item-icon");
	ListItemContent = polymorphic.div("iui-list-item-content");
	ListItemDescription = polymorphic.div("iui-list-item-description");
	ListItemAction = LinkAction;
	ListItem = Object.assign(ListItemComponent, {
		Icon: ListItemIcon,
		Content: ListItemContent,
		Description: ListItemDescription,
		Action: ListItemAction
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ComboBox/ComboBoxMenuItem.js
var import_react$41, ComboBoxMenuItem;
var init_ComboBoxMenuItem = __esmMin((() => {
	import_react$41 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	init_helpers();
	init_ListItem();
	ComboBoxMenuItem = import_react$41.memo(import_react$41.forwardRef((props, forwardedRef) => {
		let { children, isSelected, disabled, value, onClick, sublabel, size = !!sublabel ? "large" : "default", startIcon, endIcon, role = "option", index, ...rest } = props;
		let { focusedIndex, enableVirtualization } = useSafeContext(ComboBoxStateContext);
		let focusRef = (el) => {
			if (!enableVirtualization && focusedIndex === index) el?.scrollIntoView({ block: "nearest" });
		};
		let refs = useMergedRefs(forwardedRef, focusRef);
		return import_react$41.createElement(ListItem, {
			as: "div",
			actionable: true,
			size,
			active: isSelected,
			disabled,
			focused: focusedIndex === index,
			ref: refs,
			onClick: () => onClick?.(),
			role,
			tabIndex: "presentation" === role ? void 0 : -1,
			"aria-selected": isSelected,
			"aria-disabled": disabled,
			"data-iui-index": index,
			...rest
		}, startIcon && import_react$41.createElement(ListItem.Icon, {
			as: "span",
			"aria-hidden": true
		}, startIcon), import_react$41.createElement(ListItem.Content, null, children, sublabel && import_react$41.createElement(ListItem.Description, null, sublabel)), endIcon || isSelected && import_react$41.createElement(ListItem.Icon, {
			as: "span",
			"aria-hidden": true
		}, endIcon ?? import_react$41.createElement(SvgCheckmark, null)));
	}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ComboBox/ComboBox.js
var import_react$40, isMultipleEnabled$1, isSingleOnChange$2, getOptionId, ComboBox;
var init_ComboBox = __esmMin((() => {
	import_react$40 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_MenuExtraContent();
	init_SelectTag();
	init_Text();
	init_utils$1();
	init_Popover();
	init_helpers();
	init_ComboBoxEndIcon();
	init_ComboBoxInput();
	init_ComboBoxInputContainer();
	init_ComboBoxMenu();
	init_ComboBoxMenuItem();
	isMultipleEnabled$1 = (variable, multiple) => multiple && (Array.isArray(variable) || null == variable);
	isSingleOnChange$2 = (onChange, multiple) => !multiple;
	getOptionId = (option, idPrefix) => {
		if (option.id) return option.id;
		if ("string" == typeof option.value || "number" == typeof option.value) return `${idPrefix}-option-${option.value.toString().replace(/\s/g, "-")}`;
		return `${idPrefix}-option-${option.label.replace(/\s/g, "-")}`;
	};
	ComboBox = import_react$40.forwardRef((props, forwardedRef) => {
		let idPrefix = useId$1();
		let defaultFilterFunction = import_react$40.useCallback((options, inputValue) => options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase())), []);
		let { options, value: valueProp, onChange, filterFunction = defaultFilterFunction, inputProps, endIconProps, dropdownMenuProps: { middleware, ...dropdownMenuProps } = {}, emptyStateMessage = "No options found", itemRenderer, enableVirtualization = false, multiple = false, onShow: onShowProp, onHide: onHideProp, id = inputProps?.id ? `iui-${inputProps.id}-cb` : idPrefix, defaultValue, clearFilterOnOptionToggle = true, ...rest } = props;
		let inputRef = import_react$40.useRef(null);
		let menuRef = import_react$40.useRef(null);
		let onChangeProp = useLatestRef$2(onChange);
		let optionsRef = useLatestRef$2(options);
		let filterFunctionRef = useLatestRef$2(filterFunction);
		let optionsExtraInfo = import_react$40.useMemo(() => {
			let newOptionsExtraInfo = {};
			options.forEach((option, index) => {
				newOptionsExtraInfo[getOptionId(option, id)] = { __originalIndex: index };
			});
			return newOptionsExtraInfo;
		}, [id, options]);
		let getSelectedIndexes = import_react$40.useCallback((value) => {
			if (void 0 === value) return;
			if (!isMultipleEnabled$1(value, multiple)) return options.findIndex((option) => option.value === value);
			{
				let indexArray = [];
				value?.forEach((value) => {
					let indexToAdd = options.findIndex((option) => option.value === value);
					if (indexToAdd > -1) indexArray.push(indexToAdd);
				});
				return indexArray;
			}
		}, [multiple, options]);
		let [selectedIndexes, setSelectedIndexes] = useControlledState(getSelectedIndexes(defaultValue) ?? (multiple ? [] : -1), getSelectedIndexes(valueProp));
		let previousValue = import_react$40.useRef(valueProp);
		useIsomorphicLayoutEffect$1(() => {
			if (valueProp !== previousValue.current) {
				previousValue.current = valueProp;
				if (void 0 === valueProp) isMultipleEnabled$1(selectedIndexes, multiple) ? setSelectedIndexes([]) : setSelectedIndexes(-1);
			}
		}, [
			multiple,
			selectedIndexes,
			setSelectedIndexes,
			valueProp
		]);
		let [isOpen, setIsOpen] = import_react$40.useState(false);
		let [focusedIndex, setFocusedIndex] = import_react$40.useState(-1);
		let onShowRef = useLatestRef$2(onShowProp);
		let onHideRef = useLatestRef$2(onHideProp);
		let show = import_react$40.useCallback(() => {
			setIsOpen(true);
			onShowRef.current?.();
		}, [onShowRef]);
		let hide = import_react$40.useCallback(() => {
			setIsOpen(false);
			onHideRef.current?.();
		}, [onHideRef]);
		useIsomorphicLayoutEffect$1(() => {
			if (isOpen) {
				inputRef.current?.focus();
				if (!isMultipleEnabled$1(selectedIndexes, multiple)) setFocusedIndex(selectedIndexes ?? -1);
			} else {
				setFocusedIndex(-1);
				isMultipleEnabled$1(selectedIndexes, multiple) ? setInputValue("") : setInputValue(selectedIndexes >= 0 ? optionsRef.current[selectedIndexes]?.label ?? "" : "");
				setIsInputDirty(false);
			}
		}, [
			isOpen,
			multiple,
			optionsRef,
			selectedIndexes
		]);
		let previousOptions = import_react$40.useRef(options);
		import_react$40.useEffect(() => {
			if (options !== previousOptions.current) {
				previousOptions.current = options;
				onOptionsChange();
			}
			function onOptionsChange() {
				isMultipleEnabled$1(selectedIndexes, multiple) ? setFocusedIndex(-1) : setFocusedIndex(selectedIndexes);
				if (!isMultipleEnabled$1(selectedIndexes, multiple) && !isOpen) setInputValue(selectedIndexes >= 0 ? options[selectedIndexes]?.label : "");
			}
		}, [
			options,
			isOpen,
			multiple,
			selectedIndexes
		]);
		let [inputValue, setInputValue] = import_react$40.useState(inputProps?.value?.toString() ?? "");
		let [isInputDirty, setIsInputDirty] = import_react$40.useState(false);
		let filteredOptions = import_react$40.useMemo(() => {
			if (!isInputDirty) return options;
			return filterFunctionRef.current?.(options, inputValue);
		}, [
			filterFunctionRef,
			inputValue,
			options,
			isInputDirty
		]);
		let [liveRegionSelection, setLiveRegionSelection] = import_react$40.useState("");
		let handleOnInput = import_react$40.useCallback((event) => {
			let { value } = event.currentTarget;
			setInputValue(value);
			show();
			setIsInputDirty(true);
			if (-1 != focusedIndex) setFocusedIndex(-1);
			inputProps?.onChange?.(event);
		}, [
			focusedIndex,
			inputProps,
			show
		]);
		let isMenuItemSelected = import_react$40.useCallback((index) => {
			if (isMultipleEnabled$1(selectedIndexes, multiple)) return selectedIndexes.includes(index);
			return selectedIndexes === index;
		}, [multiple, selectedIndexes]);
		let selectedChangeHandler = import_react$40.useCallback((__originalIndex, action) => {
			if (!isMultipleEnabled$1(selectedIndexes, multiple)) return;
			if ("added" === action) return [...selectedIndexes, __originalIndex];
			return selectedIndexes?.filter((index) => index !== __originalIndex);
		}, [selectedIndexes, multiple]);
		let onChangeHandler = import_react$40.useCallback((__originalIndex, actionType, newSelectedIndexes) => {
			if (isSingleOnChange$2(onChangeProp.current, multiple)) onChangeProp.current?.(optionsRef.current[__originalIndex]?.value);
			else actionType && newSelectedIndexes && onChangeProp.current?.(newSelectedIndexes?.map((index) => optionsRef.current[index]?.value), {
				value: optionsRef.current[__originalIndex]?.value,
				type: actionType
			});
		}, [
			multiple,
			onChangeProp,
			optionsRef
		]);
		let handleOptionSelection = import_react$40.useCallback((__originalIndex) => {
			inputRef.current?.focus({ preventScroll: true });
			if (optionsRef.current[__originalIndex]?.disabled) return;
			if (multiple) {
				let actionType = isMenuItemSelected(__originalIndex) ? "removed" : "added";
				let newSelectedIndexes = selectedChangeHandler(__originalIndex, actionType);
				if (null == newSelectedIndexes) return;
				setSelectedIndexes(newSelectedIndexes);
				onChangeHandler(__originalIndex, actionType, newSelectedIndexes);
				setLiveRegionSelection(newSelectedIndexes.map((item) => optionsRef.current[item]?.label).filter(Boolean).join(", "));
				if (clearFilterOnOptionToggle) {
					setInputValue("");
					setIsInputDirty(false);
				}
			} else {
				setSelectedIndexes(__originalIndex);
				hide();
				onChangeHandler(__originalIndex);
			}
		}, [
			optionsRef,
			multiple,
			isMenuItemSelected,
			selectedChangeHandler,
			setSelectedIndexes,
			onChangeHandler,
			clearFilterOnOptionToggle,
			hide
		]);
		let getMenuItem = import_react$40.useCallback((option, filteredIndex) => {
			let optionId = getOptionId(option, id);
			let { __originalIndex } = optionsExtraInfo[optionId];
			let { icon, startIcon: startIconProp, label, ...restOptions } = option;
			let startIcon = startIconProp ?? icon;
			let customItem = itemRenderer ? itemRenderer(option, {
				isFocused: focusedIndex === __originalIndex,
				isSelected: isMenuItemSelected(__originalIndex),
				index: __originalIndex,
				id: optionId
			}) : null;
			return customItem ? import_react$40.cloneElement(customItem, {
				onClick: (e) => {
					handleOptionSelection(__originalIndex);
					customItem.props.onClick?.(e);
				},
				focused: focusedIndex === __originalIndex,
				"data-iui-index": __originalIndex,
				"data-iui-filtered-index": filteredIndex,
				ref: mergeRefs(customItem.props.ref, (el) => {
					if (!enableVirtualization && focusedIndex === __originalIndex) el?.scrollIntoView({ block: "nearest" });
				})
			}) : import_react$40.createElement(ComboBoxMenuItem, {
				key: optionId,
				id: optionId,
				startIcon,
				...restOptions,
				isSelected: isMenuItemSelected(__originalIndex),
				onClick: () => {
					handleOptionSelection(__originalIndex);
				},
				index: __originalIndex,
				"data-iui-filtered-index": filteredIndex
			}, label);
		}, [
			enableVirtualization,
			focusedIndex,
			id,
			isMenuItemSelected,
			itemRenderer,
			handleOptionSelection,
			optionsExtraInfo
		]);
		let emptyContent = import_react$40.useMemo(() => import_react$40.createElement(import_react$40.Fragment, null, import_react$40.isValidElement(emptyStateMessage) ? emptyStateMessage : import_react$40.createElement(MenuExtraContent, null, import_react$40.createElement(Text, { isMuted: true }, emptyStateMessage))), [emptyStateMessage]);
		let popover = usePopover({
			visible: isOpen,
			onVisibleChange: (open) => open ? show() : hide(),
			matchWidth: true,
			middleware: {
				size: { maxHeight: "var(--iui-menu-max-height)" },
				...middleware
			},
			closeOnOutsideClick: true,
			interactions: {
				click: false,
				focus: true
			}
		});
		return import_react$40.createElement(ComboBoxRefsContext.Provider, { value: import_react$40.useMemo(() => ({
			inputRef,
			menuRef,
			optionsExtraInfo
		}), [optionsExtraInfo]) }, import_react$40.createElement(ComboBoxStateContext.Provider, { value: import_react$40.useMemo(() => ({
			id,
			isOpen,
			focusedIndex,
			setFocusedIndex,
			onClickHandler: handleOptionSelection,
			enableVirtualization,
			filteredOptions,
			getMenuItem,
			multiple,
			popover,
			show,
			hide
		}), [
			enableVirtualization,
			filteredOptions,
			focusedIndex,
			getMenuItem,
			handleOptionSelection,
			hide,
			id,
			isOpen,
			multiple,
			popover,
			show
		]) }, import_react$40.createElement(ComboBoxInputContainer, {
			ref: forwardedRef,
			disabled: inputProps?.disabled,
			...rest
		}, import_react$40.createElement(ComboBoxInput, {
			value: inputValue,
			disabled: inputProps?.disabled,
			...inputProps,
			onChange: handleOnInput,
			"aria-describedby": [multiple ? `${id}-selected-live` : void 0, inputProps?.["aria-describedby"]].filter(Boolean).join(" "),
			selectTags: isMultipleEnabled$1(selectedIndexes, multiple) ? selectedIndexes?.map((index) => {
				let option = options[index];
				let optionId = getOptionId(option, id);
				let { __originalIndex } = optionsExtraInfo[optionId];
				return import_react$40.createElement(SelectTag, {
					key: option.label,
					label: option.label,
					onRemove: inputProps?.disabled ? void 0 : () => {
						handleOptionSelection(__originalIndex);
						hide();
					}
				});
			}).filter(Boolean) : void 0
		}), import_react$40.createElement(ComboBoxEndIcon, {
			...endIconProps,
			disabled: inputProps?.disabled,
			isOpen
		}), multiple ? import_react$40.createElement(AutoclearingHiddenLiveRegion, {
			text: liveRegionSelection,
			id: `${id}-selected-live`
		}) : null), import_react$40.createElement(ComboBoxMenu, {
			as: "div",
			...dropdownMenuProps
		}, filteredOptions.length > 0 && !enableVirtualization ? filteredOptions.map(getMenuItem) : emptyContent)));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/TimePicker/TimePicker.js
var import_classnames$25, import_react$39, isSameHour, isSameMinute, isSameSecond, isSameTime, isSameMeridiem, formatHourFrom12, setHours, defaultCombinedRenderer, TimePicker, TimePickerColumn;
var init_TimePicker = __esmMin((() => {
	import_classnames$25 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react$39 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	isSameHour = (date1, date2, meridiem) => {
		let adjustedHours = meridiem ? formatHourFrom12(date1.getHours(), meridiem) : date1.getHours();
		if (!!meridiem) return !!date2 && adjustedHours % 12 === date2.getHours() % 12;
		return !!date2 && adjustedHours === date2.getHours();
	};
	isSameMinute = (date1, date2) => !!date2 && date1.getMinutes() === date2.getMinutes();
	isSameSecond = (date1, date2) => !!date2 && date1.getSeconds() === date2.getSeconds();
	isSameTime = (date1, date2, precision, meridiem) => {
		let isSameTime = true;
		switch (precision) {
			case "seconds":
				isSameTime = isSameSecond(date1, date2);
				if (!isSameTime) break;
			case "minutes":
				isSameTime = isSameMinute(date1, date2);
				if (!isSameTime) break;
			case "hours": isSameTime = isSameHour(date1, date2, meridiem);
		}
		return isSameTime;
	};
	isSameMeridiem = (meridiem, date) => !!date && ("AM" === meridiem ? date.getHours() < 12 : date.getHours() >= 12);
	formatHourFrom12 = (hour, meridiem) => {
		let adjustedHour = hour % 12;
		return "PM" === meridiem ? adjustedHour + 12 : adjustedHour;
	};
	setHours = (hour, date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, date.getMinutes(), date.getSeconds());
	defaultCombinedRenderer = (date, precision) => {
		let dateString = "";
		switch (precision) {
			case "seconds": dateString = ":" + date.getSeconds().toLocaleString(void 0, { minimumIntegerDigits: 2 });
			case "minutes": dateString = ":" + date.getMinutes().toLocaleString(void 0, { minimumIntegerDigits: 2 }) + dateString;
			case "hours": dateString = date.getHours().toLocaleString(void 0, { minimumIntegerDigits: 2 }) + dateString;
		}
		return dateString;
	};
	TimePicker = import_react$39.forwardRef((props, forwardedRef) => {
		let { date, onChange, use12Hours = false, precision = "minutes", hourStep = 1, minuteStep = 1, secondStep = 1, setFocusHour = false, hourRenderer = (date) => date.getHours().toLocaleString(void 0, { minimumIntegerDigits: 2 }), minuteRenderer = (date) => date.getMinutes().toLocaleString(void 0, { minimumIntegerDigits: 2 }), secondRenderer = (date) => date.getSeconds().toLocaleString(void 0, { minimumIntegerDigits: 2 }), meridiemRenderer = (meridiem) => meridiem, useCombinedRenderer = false, combinedRenderer = defaultCombinedRenderer, className, ...rest } = props;
		let [selectedTime, setSelectedTime] = import_react$39.useState(date);
		let [focusedTime, setFocusedTime] = import_react$39.useState(selectedTime ?? /* @__PURE__ */ new Date());
		let [meridiem, setMeridiem] = import_react$39.useState(use12Hours ? focusedTime?.getHours() > 11 ? "PM" : "AM" : void 0);
		import_react$39.useEffect(() => {
			setFocusedTime(date ?? /* @__PURE__ */ new Date());
			setSelectedTime(date);
		}, [date]);
		let onHourClick = (date) => {
			let adjustedHour = use12Hours ? formatHourFrom12(date.getHours(), meridiem) : date.getHours();
			let adjustedSelectedTime = setHours(adjustedHour, selectedTime ?? /* @__PURE__ */ new Date());
			updateCurrentTime(adjustedSelectedTime);
		};
		let onTimeClick = (date) => {
			let adjustedHour = use12Hours ? formatHourFrom12(date.getHours(), meridiem) : date.getHours();
			let adjustedSelectedTime = setHours(adjustedHour, date);
			updateCurrentTime(adjustedSelectedTime);
		};
		let onMeridiemClick = (value) => {
			let adjustedSelectedTime = selectedTime ?? /* @__PURE__ */ new Date();
			let currentHours = adjustedSelectedTime.getHours();
			setMeridiem(value);
			if ("AM" === value && currentHours > 11) adjustedSelectedTime = setHours(currentHours - 12, adjustedSelectedTime);
			if ("PM" === value && currentHours <= 12) adjustedSelectedTime = setHours(currentHours + 12, adjustedSelectedTime);
			updateCurrentTime(adjustedSelectedTime);
		};
		let updateCurrentTime = (time) => {
			let adjustedTime = time;
			if ("hours" === precision) adjustedTime = new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours(), 0, 0);
			if ("minutes" === precision) adjustedTime = new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours(), time.getMinutes(), 0);
			setFocusedTime(adjustedTime);
			setSelectedTime(adjustedTime);
			onChange?.(adjustedTime);
		};
		let onHourFocus = (date) => {
			let adjustedHour = use12Hours ? formatHourFrom12(date.getHours(), meridiem) : date.getHours();
			setFocusedTime(setHours(adjustedHour, focusedTime));
		};
		let onTimeFocus = (date) => {
			let adjustedHour = use12Hours ? formatHourFrom12(date.getHours(), meridiem) : date.getHours();
			setFocusedTime(setHours(adjustedHour, date));
		};
		let onMeridiemFocus = (value) => {
			let adjustedSelectedTime = selectedTime ?? /* @__PURE__ */ new Date();
			let currentHours = adjustedSelectedTime.getHours();
			if ("AM" === value && currentHours > 11) {
				setMeridiem(value);
				adjustedSelectedTime = setHours(currentHours - 12, adjustedSelectedTime);
			}
			if ("PM" === value && currentHours <= 12) {
				setMeridiem(value);
				adjustedSelectedTime = setHours(currentHours + 12, adjustedSelectedTime);
			}
			setFocusedTime(adjustedSelectedTime);
		};
		let generateDataList = (size, value, step) => {
			let data = [];
			for (let i = 0; i < size; i++) if (i % step === 0) data.push(value(i));
			return data;
		};
		let time = import_react$39.useMemo(() => {
			let time = selectedTime ?? /* @__PURE__ */ new Date();
			let data = [];
			let hoursArray = Array.from(Array(use12Hours ? 12 : 24).keys()).filter((i) => i % hourStep === 0).map((i) => use12Hours && 0 === i ? 12 : i);
			let minutesArray = Array.from(Array(60).keys()).filter((i) => i % minuteStep === 0);
			let secondsArray = Array.from(Array(60).keys()).filter((i) => i % secondStep === 0);
			hoursArray.forEach((hour) => {
				if ("hours" === precision) data.push(new Date(time.getFullYear(), time.getMonth(), time.getDate(), hour, time.getMinutes(), time.getSeconds()));
				else minutesArray.forEach((minute) => {
					if ("minutes" === precision) data.push(new Date(time.getFullYear(), time.getMonth(), time.getDate(), hour, minute, time.getSeconds()));
					else secondsArray.forEach((second) => {
						data.push(new Date(time.getFullYear(), time.getMonth(), time.getDate(), hour, minute, second));
					});
				});
			});
			return data;
		}, [
			hourStep,
			minuteStep,
			secondStep,
			selectedTime,
			use12Hours,
			precision
		]);
		let hours = import_react$39.useMemo(() => {
			let time = selectedTime ?? /* @__PURE__ */ new Date();
			return generateDataList(use12Hours ? 12 : 24, (i) => new Date(time.getFullYear(), time.getMonth(), time.getDate(), use12Hours && 0 === i ? 12 : i, time.getMinutes(), time.getSeconds()), hourStep);
		}, [
			hourStep,
			selectedTime,
			use12Hours
		]);
		let minutes = import_react$39.useMemo(() => {
			let time = selectedTime ?? /* @__PURE__ */ new Date();
			return generateDataList(60, (i) => new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours(), i, time.getSeconds()), minuteStep);
		}, [minuteStep, selectedTime]);
		let seconds = import_react$39.useMemo(() => {
			let time = selectedTime ?? /* @__PURE__ */ new Date();
			return generateDataList(60, (i) => new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours(), time.getMinutes(), i), secondStep);
		}, [secondStep, selectedTime]);
		return import_react$39.createElement(Box, {
			className: (0, import_classnames$25.default)("iui-time-picker", className),
			ref: forwardedRef,
			...rest
		}, useCombinedRenderer ? import_react$39.createElement(TimePickerColumn, {
			data: time,
			isSameFocused: (val) => isSameTime(val, focusedTime, precision, use12Hours ? meridiem : void 0),
			isSameSelected: (val) => isSameTime(val, selectedTime, precision, use12Hours ? meridiem : void 0),
			onFocusChange: onTimeFocus,
			onSelectChange: onTimeClick,
			setFocus: setFocusHour,
			precision,
			valueRenderer: combinedRenderer
		}) : import_react$39.createElement(import_react$39.Fragment, null, import_react$39.createElement(TimePickerColumn, {
			data: hours,
			isSameFocused: (val) => isSameHour(val, focusedTime, use12Hours ? meridiem : void 0),
			isSameSelected: (val) => isSameHour(val, selectedTime, use12Hours ? meridiem : void 0),
			onFocusChange: onHourFocus,
			onSelectChange: onHourClick,
			setFocus: setFocusHour,
			valueRenderer: hourRenderer
		}), "hours" !== precision && import_react$39.createElement(TimePickerColumn, {
			data: minutes,
			isSameFocused: (val) => isSameMinute(val, focusedTime),
			isSameSelected: (val) => isSameMinute(val, selectedTime),
			onFocusChange: (date) => setFocusedTime(date),
			onSelectChange: (date) => updateCurrentTime(date),
			valueRenderer: minuteRenderer
		}), "seconds" === precision && import_react$39.createElement(TimePickerColumn, {
			data: seconds,
			isSameFocused: (val) => isSameSecond(val, focusedTime),
			isSameSelected: (val) => isSameSecond(val, selectedTime),
			onFocusChange: (date) => setFocusedTime(date),
			onSelectChange: (date) => updateCurrentTime(date),
			valueRenderer: secondRenderer
		})), use12Hours && import_react$39.createElement(TimePickerColumn, {
			data: ["AM", "PM"],
			isSameFocused: (val) => isSameMeridiem(val, focusedTime),
			isSameSelected: (val) => isSameMeridiem(val, selectedTime),
			onFocusChange: (date) => onMeridiemFocus(date),
			onSelectChange: (value) => onMeridiemClick(value),
			valueRenderer: meridiemRenderer,
			className: "iui-period"
		}));
	});
	TimePickerColumn = (props) => {
		let { data, onFocusChange, onSelectChange, isSameFocused, isSameSelected, setFocus = false, valueRenderer, precision = "minutes", className = "iui-time" } = props;
		let needFocus = import_react$39.useRef(setFocus);
		let handleTimeKeyDown = (event, maxValue, onFocus, onSelect, currentValue) => {
			if (event.altKey) return;
			switch (event.key) {
				case "ArrowDown":
					if (currentValue + 1 > maxValue) break;
					onFocus(currentValue + 1);
					needFocus.current = true;
					event.preventDefault();
					break;
				case "ArrowUp":
					if (currentValue - 1 < 0) break;
					onFocus(currentValue - 1);
					needFocus.current = true;
					event.preventDefault();
					break;
				case "Enter":
				case " ":
				case "Spacebar":
					onSelect(currentValue);
					event.preventDefault();
					break;
			}
		};
		return import_react$39.createElement(Box, { className: `${className}` }, import_react$39.createElement("ol", null, data.map((value, index) => {
			let isSameFocus = isSameFocused(value);
			return import_react$39.createElement(Box, {
				as: "li",
				onKeyDown: (event) => {
					handleTimeKeyDown(event, data.length - 1, (index) => onFocusChange(data[index]), (index) => onSelectChange(data[index]), index);
				},
				className: (0, import_classnames$25.default)({ "iui-selected": isSameSelected(value) }),
				key: index,
				tabIndex: isSameFocus ? 0 : void 0,
				ref: (ref) => {
					if (!ref || !isSameFocus) return;
					setTimeout(() => {
						ref.scrollIntoView({
							block: "nearest",
							inline: "nearest"
						});
						if (needFocus.current) {
							ref.focus();
							needFocus.current = false;
						}
					});
				},
				onClick: () => {
					onSelectChange(value);
				}
			}, valueRenderer(value, precision));
		})));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/DatePicker/DatePicker.js
var import_classnames$24, import_react$38, isSameDay, isInDateRange, isSingleOnChange$1, defaultMonths, defaultShortDays, defaultLongDays, DatePicker;
var init_DatePicker = __esmMin((() => {
	import_classnames$24 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react$38 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	init_IconButton();
	init_TimePicker();
	init_Popover();
	isSameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
	isInDateRange = (date, startDate, endDate) => {
		if (!date || !startDate || !endDate) return false;
		let minDate = new Date(startDate);
		let maxDate = new Date(endDate);
		let testDate = new Date(date);
		testDate && testDate.setHours(0, 0, 0, 0);
		minDate && minDate.setHours(0, 0, 0, 0);
		maxDate && maxDate.setHours(0, 0, 0, 0);
		return testDate > minDate && testDate < maxDate;
	};
	isSingleOnChange$1 = (onChange, enableRangeSelect) => !enableRangeSelect;
	defaultMonths = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	defaultShortDays = [
		"Su",
		"Mo",
		"Tu",
		"We",
		"Th",
		"Fr",
		"Sa"
	];
	defaultLongDays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];
	DatePicker = import_react$38.forwardRef((props, forwardedRef) => {
		let { date, onChange, localizedNames, className, setFocus = false, showTime = false, use12Hours = false, precision, hourStep, minuteStep, secondStep, useCombinedRenderer, combinedRenderer, hourRenderer, minuteRenderer, secondRenderer, meridiemRenderer, showYearSelection = false, enableRangeSelect = false, startDate, endDate, monthYearProps, calendarProps, monthProps, weekDayProps, dayProps, weekProps, isDateDisabled, applyBackground = true, showDatesOutsideMonth = true, ...rest } = props;
		useWarningLogger();
		let monthNames = localizedNames?.months ?? defaultMonths;
		let shortDays = localizedNames?.shortDays ?? defaultShortDays;
		let longDays = localizedNames?.days ?? defaultLongDays;
		let [selectedDay, setSelectedDay] = import_react$38.useState(date);
		let [selectedStartDay, setSelectedStartDay] = import_react$38.useState(startDate);
		let [selectedEndDay, setSelectedEndDay] = import_react$38.useState(endDate);
		let [focusedDay, setFocusedDay] = import_react$38.useState(selectedStartDay ?? selectedDay ?? /* @__PURE__ */ new Date());
		let [displayedMonthIndex, setDisplayedMonthIndex] = import_react$38.useState(selectedStartDay?.getMonth() ?? selectedDay?.getMonth() ?? (/* @__PURE__ */ new Date()).getMonth());
		let [displayedYear, setDisplayedYear] = import_react$38.useState(selectedStartDay?.getFullYear() ?? selectedDay?.getFullYear() ?? (/* @__PURE__ */ new Date()).getFullYear());
		let [isSelectingStartDate, setIsSelectingStartDate] = import_react$38.useState(true);
		let needFocus = import_react$38.useRef(setFocus);
		import_react$38.useEffect(() => {
			if (needFocus.current) needFocus.current = false;
		});
		let setMonthAndYear = import_react$38.useCallback((newMonth, newYear) => {
			setDisplayedMonthIndex(newMonth);
			setDisplayedYear(newYear);
		}, []);
		import_react$38.useEffect(() => {
			let currentDate = /* @__PURE__ */ new Date();
			setSelectedDay(date);
			setSelectedStartDay(startDate);
			setSelectedEndDay(endDate);
			if (!enableRangeSelect) setFocusedDay(date ?? currentDate);
			setMonthAndYear(startDate?.getMonth() ?? date?.getMonth() ?? currentDate.getMonth(), startDate?.getFullYear() ?? date?.getFullYear() ?? currentDate.getFullYear());
		}, [
			date,
			setMonthAndYear,
			startDate,
			endDate,
			enableRangeSelect
		]);
		let popoverInitialFocusContext = import_react$38.useContext(PopoverInitialFocusContext);
		useIsomorphicLayoutEffect$1(() => {
			if (setFocus && popoverInitialFocusContext) popoverInitialFocusContext.setInitialFocus(-1);
		}, [popoverInitialFocusContext, setFocus]);
		let days = import_react$38.useMemo(() => {
			let offsetToFirst = new Date(displayedYear, displayedMonthIndex, 1).getDay();
			if (0 === offsetToFirst && showDatesOutsideMonth) offsetToFirst = 7;
			let daysInMonth = [];
			for (let i = 1; i <= 42; i++) {
				let adjustedDay = i - offsetToFirst;
				daysInMonth.push(new Date(displayedYear, displayedMonthIndex, adjustedDay));
			}
			return daysInMonth;
		}, [
			displayedMonthIndex,
			displayedYear,
			showDatesOutsideMonth
		]);
		let weeks = import_react$38.useMemo(() => {
			let weeksInMonth = [];
			let weekCount = Math.ceil(days.length / 7);
			for (let i = 0; i < weekCount; i++) weeksInMonth.push(days.slice(7 * i, (i + 1) * 7));
			return weeksInMonth;
		}, [days]);
		let getNewFocusedDate = (newYear, newMonth) => {
			let currentDate = selectedStartDay ?? selectedDay ?? /* @__PURE__ */ new Date();
			return new Date(newYear, newMonth, currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
		};
		let handleMoveToPreviousYear = () => {
			let newYear = displayedYear - 1;
			setMonthAndYear(displayedMonthIndex, newYear);
			setFocusedDay(getNewFocusedDate(newYear, displayedMonthIndex));
		};
		let handleMoveToNextYear = () => {
			let newYear = displayedYear + 1;
			setMonthAndYear(displayedMonthIndex, newYear);
			setFocusedDay(getNewFocusedDate(newYear, displayedMonthIndex));
		};
		let handleMoveToPreviousMonth = () => {
			let newMonth = 0 !== displayedMonthIndex ? displayedMonthIndex - 1 : 11;
			let newYear = 0 !== displayedMonthIndex ? displayedYear : displayedYear - 1;
			setMonthAndYear(newMonth, newYear);
			setFocusedDay(getNewFocusedDate(newYear, newMonth));
		};
		let handleMoveToNextMonth = () => {
			let newMonth = 11 !== displayedMonthIndex ? displayedMonthIndex + 1 : 0;
			let newYear = 11 !== displayedMonthIndex ? displayedYear : displayedYear + 1;
			setMonthAndYear(newMonth, newYear);
			setFocusedDay(getNewFocusedDate(newYear, newMonth));
		};
		let onDayClick = (day) => {
			if (enableRangeSelect) if (isSelectingStartDate) {
				if (day.getMonth() !== selectedStartDay?.getMonth()) setMonthAndYear(day.getMonth(), day.getFullYear());
				let currentStartDate = selectedStartDay ?? /* @__PURE__ */ new Date();
				let newStartDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), currentStartDate.getHours(), currentStartDate.getMinutes(), currentStartDate.getSeconds());
				setSelectedStartDay(newStartDate);
				setFocusedDay(newStartDate);
				if (isBefore(newStartDate, selectedEndDay)) selectedEndDay && onChange?.(newStartDate, selectedEndDay);
				else {
					setSelectedEndDay(newStartDate);
					onChange?.(newStartDate, newStartDate);
				}
				setIsSelectingStartDate(false);
			} else {
				if (day.getMonth() !== selectedEndDay?.getMonth()) setMonthAndYear(day.getMonth(), day.getFullYear());
				let currentEndDate = selectedEndDay ?? /* @__PURE__ */ new Date();
				let newEndDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), currentEndDate.getHours(), currentEndDate.getMinutes(), currentEndDate.getSeconds());
				setFocusedDay(newEndDate);
				if (isBefore(newEndDate, selectedStartDay)) {
					setSelectedStartDay(newEndDate);
					selectedEndDay && onChange?.(newEndDate, selectedEndDay);
				} else {
					setSelectedEndDay(newEndDate);
					selectedStartDay && onChange?.(selectedStartDay, newEndDate);
					setIsSelectingStartDate(true);
				}
			}
			else {
				if (day.getMonth() !== selectedDay?.getMonth()) setMonthAndYear(day.getMonth(), day.getFullYear());
				let currentDate = selectedDay ?? /* @__PURE__ */ new Date();
				let newDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
				setSelectedDay(newDate);
				setFocusedDay(newDate);
				isSingleOnChange$1(onChange, enableRangeSelect) && onChange?.(newDate);
			}
		};
		let handleCalendarKeyDown = (event) => {
			if (event.altKey) return;
			if (!focusedDay) return;
			let adjustedFocusedDay = new Date(focusedDay);
			switch (event.key) {
				case "ArrowDown":
					adjustedFocusedDay.setDate(focusedDay.getDate() + 7);
					if (adjustedFocusedDay.getMonth() !== displayedMonthIndex) handleMoveToNextMonth();
					setFocusedDay(adjustedFocusedDay);
					needFocus.current = true;
					event.preventDefault();
					break;
				case "ArrowUp":
					adjustedFocusedDay.setDate(focusedDay.getDate() - 7);
					if (adjustedFocusedDay.getMonth() !== displayedMonthIndex) handleMoveToPreviousMonth();
					setFocusedDay(adjustedFocusedDay);
					needFocus.current = true;
					event.preventDefault();
					break;
				case "ArrowLeft":
					adjustedFocusedDay.setDate(focusedDay.getDate() - 1);
					if (adjustedFocusedDay.getMonth() !== displayedMonthIndex) handleMoveToPreviousMonth();
					setFocusedDay(adjustedFocusedDay);
					needFocus.current = true;
					event.preventDefault();
					break;
				case "ArrowRight":
					adjustedFocusedDay.setDate(focusedDay.getDate() + 1);
					if (adjustedFocusedDay.getMonth() !== displayedMonthIndex) handleMoveToNextMonth();
					setFocusedDay(adjustedFocusedDay);
					needFocus.current = true;
					event.preventDefault();
					break;
				case "Enter":
				case " ":
				case "Spacebar":
					if (!isDateDisabled?.(focusedDay)) onDayClick(focusedDay);
					event.preventDefault();
					break;
			}
		};
		let getDayClass = (day) => {
			if (day.getMonth() !== displayedMonthIndex) return "iui-calendar-day-outside-month";
			let dayClass = "iui-calendar-day";
			if (isSameDay(day, selectedDay) || isSameDay(day, selectedStartDay) && isSameDay(day, selectedEndDay)) dayClass += "-selected";
			else if (isSameDay(day, selectedStartDay)) dayClass += "-range-start";
			else if (isSameDay(day, selectedEndDay)) dayClass += "-range-end";
			if (selectedStartDay && selectedEndDay && isInDateRange(day, selectedStartDay, selectedEndDay)) dayClass += "-range";
			if (isSameDay(day, /* @__PURE__ */ new Date())) dayClass += "-today";
			return dayClass;
		};
		let dateTableId = useId$1();
		return import_react$38.createElement(Box, {
			className: (0, import_classnames$24.default)("iui-date-picker", { "iui-popover-surface": applyBackground }, className),
			ref: forwardedRef,
			...rest
		}, import_react$38.createElement("div", null, import_react$38.createElement(Box, {
			as: "div",
			...monthYearProps,
			className: (0, import_classnames$24.default)("iui-calendar-month-year", monthYearProps?.className)
		}, showYearSelection && import_react$38.createElement(IconButton, {
			styleType: "borderless",
			onClick: handleMoveToPreviousYear,
			"aria-label": "Previous year",
			size: "small"
		}, import_react$38.createElement(SvgChevronLeftDouble, null)), import_react$38.createElement(IconButton, {
			styleType: "borderless",
			onClick: handleMoveToPreviousMonth,
			"aria-label": "Previous month",
			size: "small"
		}, import_react$38.createElement(SvgChevronLeft, null)), import_react$38.createElement("span", { "aria-live": "polite" }, import_react$38.createElement(Box, {
			as: "span",
			id: dateTableId,
			title: monthNames[displayedMonthIndex],
			...monthProps,
			className: (0, import_classnames$24.default)("iui-calendar-month", monthProps?.className)
		}, monthNames[displayedMonthIndex]), "\xA0", displayedYear), import_react$38.createElement(IconButton, {
			styleType: "borderless",
			onClick: handleMoveToNextMonth,
			"aria-label": "Next month",
			size: "small"
		}, import_react$38.createElement(SvgChevronRight, null)), showYearSelection && import_react$38.createElement(IconButton, {
			styleType: "borderless",
			onClick: handleMoveToNextYear,
			"aria-label": "Next year",
			size: "small"
		}, import_react$38.createElement(SvgChevronRightDouble, null))), import_react$38.createElement(Box, {
			as: "div",
			...weekDayProps,
			className: (0, import_classnames$24.default)("iui-calendar-weekdays", weekDayProps?.className)
		}, shortDays.map((day, index) => import_react$38.createElement("div", {
			key: day,
			title: longDays[index]
		}, day))), import_react$38.createElement("div", {
			onKeyDown: handleCalendarKeyDown,
			role: "listbox",
			"aria-labelledby": dateTableId,
			...calendarProps
		}, weeks.map((weekDays, weekIndex) => import_react$38.createElement(Box, {
			as: "div",
			key: `week-${displayedMonthIndex}-${weekIndex}`,
			...weekProps,
			className: (0, import_classnames$24.default)("iui-calendar-week", weekProps?.className)
		}, weekDays.map((weekDay, dayIndex) => {
			let dateValue = weekDay.getDate();
			let isDisabled = isDateDisabled?.(weekDay);
			if (weekDay.getMonth() !== displayedMonthIndex && !showDatesOutsideMonth) return import_react$38.createElement(Box, {
				key: `day-${displayedMonthIndex}-${dayIndex}`,
				className: (0, import_classnames$24.default)(getDayClass(weekDay), dayProps?.className),
				"aria-hidden": true
			});
			return import_react$38.createElement(Box, {
				as: "div",
				key: `day-${displayedMonthIndex}-${dayIndex}`,
				onClick: () => !isDisabled && onDayClick(weekDay),
				role: "option",
				tabIndex: isSameDay(weekDay, focusedDay) ? 0 : -1,
				"aria-disabled": isDisabled ? "true" : void 0,
				ref: (element) => {
					if (isSameDay(weekDay, focusedDay) && needFocus.current) setTimeout(() => {
						element?.focus();
					});
				},
				...dayProps,
				className: (0, import_classnames$24.default)(getDayClass(weekDay), dayProps?.className)
			}, dateValue);
		}))))), showTime && import_react$38.createElement(TimePicker, {
			date: selectedStartDay ?? selectedDay,
			use12Hours,
			precision,
			hourStep,
			minuteStep,
			secondStep,
			useCombinedRenderer,
			combinedRenderer,
			hourRenderer,
			minuteRenderer,
			secondRenderer,
			meridiemRenderer,
			onChange: (date) => isSingleOnChange$1(onChange, enableRangeSelect) ? onChange?.(date) : onChange?.(new Date(selectedStartDay?.getFullYear() ?? date.getFullYear(), selectedStartDay?.getMonth() ?? date.getMonth(), selectedStartDay?.getDate() ?? date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()), new Date(selectedEndDay?.getFullYear() ?? date.getFullYear(), selectedEndDay?.getMonth() ?? date.getMonth(), selectedEndDay?.getDate() ?? date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()))
		}));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogContext.js
var import_react$37, DialogContext, useDialogContext;
var init_DialogContext = __esmMin((() => {
	import_react$37 = /* @__PURE__ */ __toESM(require_react(), 1);
	DialogContext = import_react$37.createContext(void 0);
	useDialogContext = () => import_react$37.useContext(DialogContext);
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogMainContext.js
var import_react$36, DialogMainContext, useDialogMainContext;
var init_DialogMainContext = __esmMin((() => {
	import_react$36 = /* @__PURE__ */ __toESM(require_react(), 1);
	DialogMainContext = import_react$36.createContext(null);
	useDialogMainContext = () => import_react$36.useContext(DialogMainContext);
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogTitleBarTitle.js
var DialogTitleBarTitle;
var init_DialogTitleBarTitle = __esmMin((() => {
	init_utils$1();
	DialogTitleBarTitle = polymorphic.h2("iui-dialog-title");
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogDragContext.js
var import_react$35, DialogDragContext, useDialogDragContext;
var init_DialogDragContext = __esmMin((() => {
	import_react$35 = /* @__PURE__ */ __toESM(require_react(), 1);
	DialogDragContext = import_react$35.createContext(void 0);
	useDialogDragContext = () => {
		return { ...import_react$35.useContext(DialogDragContext) };
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogTitleBar.js
var import_react$34, import_classnames$23, DialogTitleBar;
var init_DialogTitleBar = __esmMin((() => {
	import_react$34 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$23 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	init_IconButton();
	init_DialogContext();
	init_DialogMainContext();
	init_DialogTitleBarTitle();
	init_DialogDragContext();
	DialogTitleBar = Object.assign(import_react$34.forwardRef((props, ref) => {
		let dialogContext = useDialogContext();
		let dialogMainContext = useDialogMainContext();
		let { children, titleText, isDismissible = dialogContext?.isDismissible, onClose = dialogContext?.onClose, isDraggable = dialogContext?.isDraggable, className, onPointerDown: onPointerDownProp, ...rest } = props;
		let { onPointerDown } = useDialogDragContext();
		let onClick = import_react$34.useCallback((e) => {
			dialogMainContext?.beforeClose();
			onClose?.(e);
		}, [dialogMainContext, onClose]);
		return import_react$34.createElement(Box, {
			className: (0, import_classnames$23.default)("iui-dialog-title-bar", className, { "iui-dialog-title-bar-filled": isDraggable }),
			ref,
			onPointerDown: mergeEventHandlers(onPointerDownProp, onPointerDown),
			...rest
		}, children ? children : import_react$34.createElement(import_react$34.Fragment, null, import_react$34.createElement(DialogTitleBarTitle, null, titleText), isDismissible && import_react$34.createElement(IconButton, {
			size: "small",
			styleType: "borderless",
			onClick,
			"aria-label": "Close",
			"data-iui-shift": "right"
		}, import_react$34.createElement(SvgClose, null))));
	}), { Title: DialogTitleBarTitle });
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogContent.js
var DialogContent;
var init_DialogContent = __esmMin((() => {
	init_utils$1();
	DialogContent = polymorphic.div("iui-dialog-content");
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogBackdrop.js
var import_react$33, import_classnames$22, DialogBackdrop;
var init_DialogBackdrop = __esmMin((() => {
	import_react$33 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Backdrop();
	init_utils$1();
	init_DialogContext();
	init_DialogMainContext();
	import_classnames$22 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	DialogBackdrop = import_react$33.forwardRef((props, ref) => {
		let dialogContext = useDialogContext();
		let dialogMainContext = useDialogMainContext();
		let { isVisible = dialogContext?.isOpen, isDismissible = dialogContext?.isDismissible, onClose = dialogContext?.onClose, closeOnExternalClick = dialogContext?.closeOnExternalClick, relativeTo = dialogContext?.relativeTo, onMouseDown, className, style, ...rest } = props;
		let backdropRef = import_react$33.useRef(null);
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
		return import_react$33.createElement(Backdrop, {
			isVisible,
			className: (0, import_classnames$22.default)({ "iui-backdrop-fixed": "viewport" === relativeTo }, className),
			ref: refs,
			onMouseDown: handleMouseDown,
			style: {
				pointerEvents: "auto",
				...style
			},
			...rest
		});
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogButtonBar.js
var DialogButtonBar;
var init_DialogButtonBar = __esmMin((() => {
	init_utils$1();
	DialogButtonBar = polymorphic.div("iui-dialog-button-bar");
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useDragAndDrop.js
var import_react$32, getContainerRect, useDragAndDrop;
var init_useDragAndDrop = __esmMin((() => {
	import_react$32 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_functions();
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
		let grabOffsetX = import_react$32.useRef(0);
		let grabOffsetY = import_react$32.useRef(0);
		let translateX = import_react$32.useRef(void 0);
		let translateY = import_react$32.useRef(void 0);
		let containerRectRef = import_react$32.useRef(getContainerRect(containerRef));
		let adjustTransform = import_react$32.useCallback(() => {
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
		import_react$32.useEffect(() => () => {
			resizeObserver?.disconnect();
		}, [resizeObserver]);
		useEventListener("resize", () => {
			adjustTransform();
			if (null != translateX.current && null != translateY.current) setTransform(`translate(${translateX.current}px, ${translateY.current}px)`);
		}, getWindow$1());
		let [transform, setTransform] = import_react$32.useState("");
		let onPointerMove = import_react$32.useRef((event) => {
			if (!elementRef.current) return;
			let newTranslateX = event.clientX - grabOffsetX.current;
			let newTranslateY = event.clientY - grabOffsetY.current;
			elementRef.current.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
			adjustTransform();
		});
		let originalUserSelect = import_react$32.useRef("");
		return {
			onPointerDown: import_react$32.useCallback((e) => {
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
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/DialogMain.js
var import_react$31, import_classnames$21, DialogMain;
var init_DialogMain = __esmMin((() => {
	import_react$31 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$21 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	init_DialogContext();
	init_DialogDragContext();
	init_useDragAndDrop();
	init_DialogMainContext();
	DialogMain = import_react$31.forwardRef((props, forwardedRef) => {
		let dialogContext = useDialogContext();
		let { className, children, styleType = "default", isOpen = dialogContext?.isOpen, isDismissible = dialogContext?.isDismissible, onClose = dialogContext?.onClose, closeOnEsc = dialogContext?.closeOnEsc, trapFocus = dialogContext?.trapFocus, setFocus = dialogContext?.setFocus, preventDocumentScroll = dialogContext?.preventDocumentScroll, onKeyDown, isDraggable = dialogContext?.isDraggable, isResizable = dialogContext?.isResizable, style: propStyle, placement = dialogContext?.placement, ...rest } = props;
		let { dialogRootRef, setDialogElement } = dialogContext || {};
		let dialogRef = import_react$31.useRef(null);
		let previousFocusedElement = import_react$31.useRef(null);
		let [style, setStyle] = import_react$31.useState();
		let hasBeenResized = import_react$31.useRef(false);
		let originalBodyOverflow = import_react$31.useRef("");
		useIsomorphicLayoutEffect$1(() => {
			if (isOpen) originalBodyOverflow.current = document.body.style.overflow;
		}, [isOpen]);
		import_react$31.useEffect(() => {
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
		let handlePointerDown = import_react$31.useCallback((event) => {
			if (isDraggable) onPointerDown(event);
		}, [isDraggable, onPointerDown]);
		useIsomorphicLayoutEffect$1(() => {
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
		let setResizeStyle = import_react$31.useCallback((newStyle) => {
			setStyle((oldStyle) => ({
				...oldStyle,
				...newStyle
			}));
		}, []);
		let onEnter = import_react$31.useCallback(() => {
			previousFocusedElement.current = dialogRef.current?.ownerDocument.activeElement;
			if (setFocus) dialogRef.current?.focus({ preventScroll: true });
		}, [setFocus]);
		let beforeClose = import_react$31.useCallback(() => {
			if (dialogRef.current?.contains(dialogRef.current?.ownerDocument.activeElement)) previousFocusedElement.current?.focus();
		}, [dialogRef, previousFocusedElement]);
		let mountRef = import_react$31.useCallback((element) => {
			if (element) onEnter();
		}, [onEnter]);
		let content = import_react$31.createElement(Box, {
			className: (0, import_classnames$21.default)("iui-dialog", {
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
		}, import_react$31.createElement(ShadowRoot$1, null, import_react$31.createElement("slot", null), isResizable && import_react$31.createElement(Resizer, {
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
		return import_react$31.createElement(DialogMainContext.Provider, { value: import_react$31.useMemo(() => ({ beforeClose }), [beforeClose]) }, import_react$31.createElement(DialogDragContext.Provider, { value: { onPointerDown: handlePointerDown } }, trapFocus && import_react$31.createElement(FocusTrap, null, content), !trapFocus && content));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Dialog/Dialog.js
var import_react$30, import_classnames$20, DialogComponent, Dialog;
var init_Dialog = __esmMin((() => {
	import_react$30 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$20 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_DialogTitleBar();
	init_DialogContent();
	init_DialogBackdrop();
	init_DialogContext();
	init_DialogButtonBar();
	init_DialogMain();
	init_utils$1();
	DialogComponent = import_react$30.forwardRef((props, forwardedRef) => {
		let { trapFocus = false, setFocus = trapFocus, preventDocumentScroll = false, isOpen = false, isDismissible = true, closeOnEsc = true, closeOnExternalClick = false, onClose, isDraggable = false, isResizable = false, relativeTo = "viewport", placement, className, portal = false, ...rest } = props;
		let dialogRootRef = import_react$30.useRef(null);
		let [dialogElement, setDialogElement] = import_react$30.useState(null);
		let mergedRefs = useMergedRefs(forwardedRef, dialogRootRef);
		return isOpen ? import_react$30.createElement(DialogContext.Provider, { value: {
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
		} }, import_react$30.createElement(Portal, { portal }, import_react$30.createElement(PortalContainerContext.Provider, { value: dialogElement }, import_react$30.createElement(Box, {
			className: (0, import_classnames$20.default)("iui-dialog-wrapper", className),
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
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/NonIdealState/NonIdealState.js
var import_react$29, import_classnames$19, NonIdealState;
var init_NonIdealState = __esmMin((() => {
	import_react$29 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	import_classnames$19 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	NonIdealState = import_react$29.forwardRef((props, forwardedRef) => {
		let { className, svg, heading, description, actions, illustrationProps, titleProps, descriptionProps, actionsProps, ...rest } = props;
		return import_react$29.createElement(Box, {
			className: (0, import_classnames$19.default)("iui-non-ideal-state", className),
			ref: forwardedRef,
			...rest
		}, import_react$29.createElement(Box, {
			as: "div",
			...illustrationProps,
			className: (0, import_classnames$19.default)("iui-non-ideal-state-illustration", illustrationProps?.className)
		}, svg), heading && import_react$29.createElement(Box, {
			as: "div",
			...titleProps,
			className: (0, import_classnames$19.default)("iui-non-ideal-state-title", titleProps?.className)
		}, heading), description && import_react$29.createElement(Box, {
			as: "div",
			...descriptionProps,
			className: (0, import_classnames$19.default)("iui-non-ideal-state-description", descriptionProps?.className)
		}, description), actions && import_react$29.createElement(Box, {
			as: "div",
			...actionsProps,
			className: (0, import_classnames$19.default)("iui-non-ideal-state-actions", actionsProps?.className)
		}, actions));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ExpandableBlock/ExpandableBlock.js
var import_classnames$18, import_react$28, ExpandableBlockContext, ExpandableBlockComponent, ExpandableBlockWrapper, ExpandableBlockTrigger, ExpandableBlockExpandIcon, ExpandableBlockLabelArea, ExpandableBlockTitle, ExpandableBlockCaption, ExpandableBlockEndIcon, ExpandableBlockContent, ExpandableBlock;
var init_ExpandableBlock = __esmMin((() => {
	import_classnames$18 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react$28 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	init_Icon();
	init_LinkAction();
	ExpandableBlockContext = import_react$28.createContext(void 0);
	ExpandableBlockComponent = import_react$28.forwardRef((props, forwardedRef) => {
		let { children, title, caption, endIcon, ...rest } = props;
		return import_react$28.createElement(ExpandableBlock.Wrapper, {
			...rest,
			ref: forwardedRef
		}, import_react$28.createElement(ExpandableBlock.Trigger, {
			label: title,
			caption,
			endIcon
		}), import_react$28.createElement(ExpandableBlock.Content, null, children));
	});
	ExpandableBlockWrapper = import_react$28.forwardRef((props, forwardedRef) => {
		let { children, className, onToggle, style, isExpanded, status, size = "default", styleType = "default", disabled = false, ...rest } = props;
		let [expandedState, setExpanded] = import_react$28.useState(isExpanded ?? false);
		let expanded = isExpanded ?? expandedState;
		let [descriptionId, setDescriptionId] = import_react$28.useState(void 0);
		return import_react$28.createElement(ExpandableBlockContext.Provider, { value: {
			status,
			isExpanded: expanded,
			onToggle,
			size,
			styleType,
			disabled,
			setExpanded,
			children,
			descriptionId,
			setDescriptionId
		} }, import_react$28.createElement(Box, {
			className: (0, import_classnames$18.default)("iui-expandable-block", className),
			"data-iui-expanded": expanded,
			"data-iui-size": size,
			"data-iui-variant": "default" !== styleType ? styleType : void 0,
			style,
			ref: forwardedRef,
			...rest
		}, children));
	});
	ExpandableBlockTrigger = import_react$28.forwardRef((props, forwardedRef) => {
		let { className, children, label, caption, expandIcon, endIcon, ...rest } = props;
		let { disabled, status } = useSafeContext(ExpandableBlockContext);
		return import_react$28.createElement(LinkBox, {
			className: (0, import_classnames$18.default)("iui-expandable-header", className),
			"data-iui-disabled": disabled ? "true" : void 0,
			ref: forwardedRef,
			...rest
		}, children ?? import_react$28.createElement(import_react$28.Fragment, null, expandIcon ?? import_react$28.createElement(ExpandableBlock.ExpandIcon, null), import_react$28.createElement(ExpandableBlock.LabelArea, null, import_react$28.createElement(ExpandableBlock.Title, null, label), caption && import_react$28.createElement(ExpandableBlock.Caption, null, caption)), endIcon || status ? import_react$28.createElement(ExpandableBlock.EndIcon, null, endIcon) : null));
	});
	ExpandableBlockExpandIcon = import_react$28.forwardRef((props, forwardedRef) => {
		let { className, children, ...rest } = props;
		return import_react$28.createElement(Icon, {
			className: (0, import_classnames$18.default)("iui-expandable-block-icon", className),
			ref: forwardedRef,
			...rest
		}, children ?? import_react$28.createElement(SvgChevronRightSmall, { "aria-hidden": true }));
	});
	ExpandableBlockLabelArea = polymorphic.span("iui-expandable-block-label");
	ExpandableBlockTitle = import_react$28.forwardRef((props, forwardedRef) => {
		let { className, children, onClick: onClickProp, ...rest } = props;
		let { isExpanded, setExpanded, disabled, onToggle, descriptionId } = useSafeContext(ExpandableBlockContext);
		return import_react$28.createElement(ButtonBase, {
			className: (0, import_classnames$18.default)("iui-expandable-block-title", "iui-link-action", className),
			"aria-expanded": isExpanded,
			"aria-disabled": disabled,
			onClick: mergeEventHandlers(onClickProp, () => {
				if (disabled) return;
				setExpanded(!isExpanded);
				onToggle?.(!isExpanded);
			}),
			ref: forwardedRef,
			"aria-describedby": descriptionId,
			...rest
		}, children);
	});
	ExpandableBlockCaption = import_react$28.forwardRef((props, forwardedRef) => {
		let fallbackId = useId$1();
		let { setDescriptionId } = useSafeContext(ExpandableBlockContext);
		import_react$28.useEffect(() => {
			setDescriptionId(props.id || fallbackId);
			return () => setDescriptionId(void 0);
		}, [
			props.id,
			fallbackId,
			setDescriptionId
		]);
		return import_react$28.createElement(Box, {
			ref: forwardedRef,
			id: fallbackId,
			...props,
			className: (0, import_classnames$18.default)("iui-expandable-block-caption", props?.className)
		});
	});
	ExpandableBlockEndIcon = import_react$28.forwardRef((props, forwardedRef) => {
		let { children, ...rest } = props;
		let { status } = useSafeContext(ExpandableBlockContext);
		let icon = children ?? (status && StatusIconMap[status]());
		return import_react$28.createElement(Icon, {
			fill: status,
			ref: forwardedRef,
			...rest
		}, icon);
	});
	ExpandableBlockContent = import_react$28.forwardRef((props, forwardedRef) => {
		let { className, children, innerProps, ...rest } = props;
		return import_react$28.createElement(Box, {
			className: (0, import_classnames$18.default)("iui-expandable-content", className),
			ref: forwardedRef,
			...rest
		}, import_react$28.createElement(Box, innerProps, children));
	});
	ExpandableBlock = Object.assign(ExpandableBlockComponent, {
		Wrapper: ExpandableBlockWrapper,
		Trigger: ExpandableBlockTrigger,
		ExpandIcon: ExpandableBlockExpandIcon,
		LabelArea: ExpandableBlockLabelArea,
		Title: ExpandableBlockTitle,
		Caption: ExpandableBlockCaption,
		EndIcon: ExpandableBlockEndIcon,
		Content: ExpandableBlockContent
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Tabs/Tabs.js
var import_classnames$17, import_react$27, TabsWrapper, TabsWrapperPresentation, TabList, TabListPresentation, Tab, TabPresentation, TabIcon, TabLabel, TabDescription, TabsActions, TabsPanel, LegacyTabsComponent, LegacyTab, Tabs, TabsContext, TabListContext, useScrollbarGutter;
var init_Tabs = __esmMin((() => {
	import_classnames$17 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react$27 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	init_Icon();
	TabsWrapper = import_react$27.forwardRef((props, ref) => {
		let { children, orientation = "horizontal", type = "default", focusActivationMode = "auto", color = "blue", defaultValue, value: activeValueProp, onValueChange, ...rest } = props;
		let [activeValue, setActiveValue] = useControlledState(defaultValue, activeValueProp, onValueChange);
		let [stripeProperties, setStripeProperties] = import_react$27.useState({});
		let [hasSublabel, setHasSublabel] = import_react$27.useState(false);
		let idPrefix = useId$1();
		return import_react$27.createElement(TabsWrapperPresentation, {
			...rest,
			orientation,
			style: {
				...stripeProperties,
				...props?.style
			},
			ref
		}, import_react$27.createElement(TabsContext.Provider, { value: {
			orientation,
			type,
			activeValue,
			setActiveValue,
			setStripeProperties,
			idPrefix,
			focusActivationMode,
			hasSublabel,
			setHasSublabel,
			color
		} }, children));
	});
	TabsWrapperPresentation = import_react$27.forwardRef((props, forwardedRef) => {
		let { orientation = "horizontal", ...rest } = props;
		return import_react$27.createElement(Box, {
			...rest,
			className: (0, import_classnames$17.default)("iui-tabs-wrapper", props.className),
			"data-iui-orientation": orientation,
			ref: forwardedRef
		});
	});
	TabList = import_react$27.forwardRef((props, ref) => {
		let { className, children, ...rest } = props;
		let { type, hasSublabel, color, orientation } = useSafeContext(TabsContext);
		let isClient = useIsClient();
		let tablistRef = import_react$27.useRef(null);
		let [tablistSizeRef, tabsWidth] = useContainerWidth("default" !== type);
		let refs = useMergedRefs(ref, tablistRef, tablistSizeRef, useScrollbarGutter());
		return import_react$27.createElement(TabListPresentation, {
			className: (0, import_classnames$17.default)({ "iui-animated": "default" !== type && isClient }, className),
			"data-iui-orientation": orientation,
			role: "tablist",
			ref: refs,
			...rest,
			type,
			color,
			size: hasSublabel ? "large" : void 0,
			orientation
		}, import_react$27.createElement(TabListContext.Provider, { value: {
			tabsWidth,
			tablistRef
		} }, children));
	});
	TabListPresentation = import_react$27.forwardRef((props, forwardedRef) => {
		let { type = "default", color, size, orientation = "horizontal", ...rest } = props;
		return import_react$27.createElement(Box, {
			...rest,
			className: (0, import_classnames$17.default)("iui-tabs", `iui-${type}`, {
				"iui-green": "green" === color,
				"iui-large": "large" === size
			}, props.className),
			"data-iui-orientation": orientation,
			ref: forwardedRef
		});
	});
	Tab = import_react$27.forwardRef((props, forwardedRef) => {
		let { children, value, label, ...rest } = props;
		let { orientation, activeValue, setActiveValue, type, setStripeProperties, idPrefix, focusActivationMode } = useSafeContext(TabsContext);
		let { tabsWidth, tablistRef } = useSafeContext(TabListContext);
		let tabRef = import_react$27.useRef(void 0);
		let isActive = activeValue === value;
		let isActiveRef = useLatestRef$2(isActive);
		useIsomorphicLayoutEffect$1(() => {
			if (isActiveRef.current) tabRef.current?.parentElement?.scrollTo({
				["horizontal" === orientation ? "left" : "top"]: tabRef.current?.["horizontal" === orientation ? "offsetLeft" : "offsetTop"] - 4,
				behavior: "instant"
			});
		}, [isActiveRef, orientation]);
		useIsomorphicLayoutEffect$1(() => {
			let updateStripe = () => {
				let currentTabRect = tabRef.current?.getBoundingClientRect();
				let tabslistRect = tablistRef.current?.getBoundingClientRect();
				let currentTabLeftIncludingScroll = (currentTabRect?.x ?? 0) + (tablistRef.current?.scrollLeft ?? 0);
				let tabsStripePosition = null != currentTabRect && null != tabslistRect ? {
					horizontal: currentTabLeftIncludingScroll - tabslistRect.x,
					vertical: currentTabRect.y - tabslistRect.y
				} : {
					horizontal: 0,
					vertical: 0
				};
				setStripeProperties({
					"--iui-tabs-stripe-size": "horizontal" === orientation ? `${currentTabRect?.width}px` : `${currentTabRect?.height}px`,
					"--iui-tabs-stripe-position": "horizontal" === orientation ? `${tabsStripePosition.horizontal}px` : `${tabsStripePosition.vertical}px`
				});
			};
			if ("default" !== type && isActive) updateStripe();
		}, [
			type,
			orientation,
			isActive,
			tabsWidth,
			setStripeProperties,
			tablistRef,
			value
		]);
		let onKeyDown = (event) => {
			if (event.altKey) return;
			let allTabs = Array.from(event.currentTarget.parentElement?.children ?? []);
			let nextTab = tabRef.current?.nextElementSibling ?? allTabs.at(0);
			let previousTab = tabRef.current?.previousElementSibling ?? allTabs.at(-1);
			switch (event.key) {
				case "ArrowDown":
					if ("vertical" === orientation) {
						nextTab?.focus();
						event.preventDefault();
					}
					break;
				case "ArrowRight":
					if ("horizontal" === orientation) {
						nextTab?.focus();
						event.preventDefault();
					}
					break;
				case "ArrowUp":
					if ("vertical" === orientation) {
						previousTab?.focus();
						event.preventDefault();
					}
					break;
				case "ArrowLeft":
					if ("horizontal" === orientation) {
						previousTab?.focus();
						event.preventDefault();
					}
					break;
				default: break;
			}
		};
		let setInitialActiveRef = import_react$27.useCallback((element) => {
			if (void 0 !== activeValue) return;
			if (element?.matches(":first-of-type")) setActiveValue(value);
		}, [
			activeValue,
			setActiveValue,
			value
		]);
		return import_react$27.createElement(TabPresentation, {
			as: ButtonBase,
			role: "tab",
			tabIndex: isActive ? 0 : -1,
			"aria-selected": isActive,
			"aria-controls": `${idPrefix}-panel-${value.replaceAll(" ", "-")}`,
			ref: useMergedRefs(tabRef, forwardedRef, setInitialActiveRef),
			...rest,
			id: `${idPrefix}-tab-${value.replaceAll(" ", "-")}`,
			onClick: mergeEventHandlers(props.onClick, () => setActiveValue(value)),
			onKeyDown: mergeEventHandlers(props.onKeyDown, onKeyDown),
			onFocus: mergeEventHandlers(props.onFocus, () => {
				tabRef.current?.scrollIntoView({
					block: "nearest",
					inline: "nearest"
				});
				if ("auto" === focusActivationMode && !props.disabled) setActiveValue(value);
			}),
			"data-iui-orientation": orientation
		}, label ? import_react$27.createElement(Tabs.TabLabel, null, label) : children);
	});
	TabPresentation = import_react$27.forwardRef((props, forwardedRef) => import_react$27.createElement(Box, {
		as: "button",
		...props,
		className: (0, import_classnames$17.default)("iui-tab", props.className),
		ref: forwardedRef
	}));
	TabIcon = import_react$27.forwardRef((props, ref) => import_react$27.createElement(Icon, {
		...props,
		className: (0, import_classnames$17.default)("iui-tab-icon", props?.className),
		ref
	}));
	TabLabel = polymorphic.span("iui-tab-label");
	TabDescription = import_react$27.forwardRef((props, ref) => {
		let { className, children, ...rest } = props;
		let { hasSublabel, setHasSublabel } = useSafeContext(TabsContext);
		useIsomorphicLayoutEffect$1(() => {
			if (!hasSublabel) setHasSublabel(true);
		}, [hasSublabel, setHasSublabel]);
		return import_react$27.createElement(Box, {
			as: "span",
			className: (0, import_classnames$17.default)("iui-tab-description", className),
			ref,
			...rest
		}, children);
	});
	TabsActions = import_react$27.forwardRef((props, ref) => {
		let { wrapperProps, className, children, ...rest } = props;
		let { orientation } = useSafeContext(TabsContext);
		return import_react$27.createElement(Box, {
			...wrapperProps,
			className: (0, import_classnames$17.default)("iui-tabs-actions-wrapper", wrapperProps?.className),
			"data-iui-orientation": orientation
		}, import_react$27.createElement(Box, {
			className: (0, import_classnames$17.default)("iui-tabs-actions", className),
			ref,
			"data-iui-orientation": orientation,
			...rest
		}, children));
	});
	TabsPanel = import_react$27.forwardRef((props, ref) => {
		let { value, className, children, ...rest } = props;
		let { activeValue, idPrefix, orientation } = useSafeContext(TabsContext);
		return import_react$27.createElement(Box, {
			className: (0, import_classnames$17.default)("iui-tabs-content", className),
			"aria-labelledby": `${idPrefix}-tab-${value.replaceAll(" ", "-")}`,
			role: "tabpanel",
			hidden: activeValue !== value ? true : void 0,
			ref,
			...rest,
			id: `${idPrefix}-panel-${value.replaceAll(" ", "-")}`,
			"data-iui-orientation": orientation
		}, children);
	});
	LegacyTabsComponent = import_react$27.forwardRef((props, forwardedRef) => {
		let actions;
		if ("pill" !== props.type && props.actions) {
			actions = props.actions;
			props = { ...props };
			delete props.actions;
		}
		let { labels, onTabSelected, focusActivationMode, color, activeIndex: activeIndexProp, tabsClassName, contentClassName, wrapperClassName, children, ...rest } = props;
		let [activeIndex, setActiveIndex] = useControlledState(0, activeIndexProp, onTabSelected);
		return import_react$27.createElement(TabsWrapper, {
			className: wrapperClassName,
			focusActivationMode,
			color,
			value: `${activeIndex}`,
			onValueChange: (value) => setActiveIndex(Number(value)),
			...rest
		}, import_react$27.createElement(TabList, {
			className: tabsClassName,
			ref: forwardedRef
		}, labels.map((label, index) => {
			let tabValue = `${index}`;
			return import_react$27.isValidElement(label) ? import_react$27.cloneElement(label, { value: tabValue }) : import_react$27.createElement(LegacyTab, {
				key: index,
				value: tabValue,
				label
			});
		})), actions && import_react$27.createElement(TabsActions, null, actions), children && import_react$27.createElement(TabsPanel, {
			value: `${activeIndex}`,
			className: contentClassName
		}, children));
	});
	LegacyTab = import_react$27.forwardRef((props, forwardedRef) => {
		let { label, sublabel, startIcon, children, value, ...rest } = props;
		return import_react$27.createElement(import_react$27.Fragment, null, import_react$27.createElement(Tab, {
			...rest,
			value,
			ref: forwardedRef
		}, startIcon && import_react$27.createElement(TabIcon, null, startIcon), import_react$27.createElement(TabLabel, null, label), sublabel && import_react$27.createElement(TabDescription, null, sublabel), children));
	});
	Tabs = Object.assign(LegacyTabsComponent, {
		Wrapper: TabsWrapper,
		TabList,
		Tab,
		TabIcon,
		TabLabel,
		TabDescription,
		Actions: TabsActions,
		Panel: TabsPanel
	});
	TabsContext = import_react$27.createContext(void 0);
	TabListContext = import_react$27.createContext(void 0);
	useScrollbarGutter = () => import_react$27.useCallback((element) => {
		if (element) {
			if (element.scrollHeight > element.clientHeight) {
				element.style.scrollbarGutter = "stable";
				if (!CSS.supports("scrollbar-gutter: stable")) element.style.overflowY = "scroll";
			}
		}
	}, []);
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/InputWithDecorations/InputWithDecorations.js
var import_react$26, InputWithDecorationsContext, InputWithDecorationsComponent, InputWithDecorationsInput, InputWithDecorationsButton, InputWithDecorationsIcon, InputWithDecorations;
var init_InputWithDecorations = __esmMin((() => {
	import_react$26 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	InputWithDecorationsContext = import_react$26.createContext(void 0);
	InputWithDecorationsComponent = import_react$26.forwardRef((props, ref) => {
		let { children, size, isDisabled, ...rest } = props;
		return import_react$26.createElement(InputWithDecorationsContext.Provider, { value: {
			size,
			isDisabled
		} }, import_react$26.createElement(InputFlexContainer, {
			isDisabled,
			size,
			ref,
			...rest
		}, children));
	});
	InputWithDecorationsInput = import_react$26.forwardRef((props, ref) => {
		let { id: idProp, size, disabled: localDisabled, ...rest } = props;
		let { size: contextSize, isDisabled } = useSafeContext(InputWithDecorationsContext);
		return import_react$26.createElement(Box, {
			as: "input",
			ref,
			"data-iui-size": size ?? contextSize,
			disabled: localDisabled ?? isDisabled,
			id: idProp,
			...rest
		});
	});
	InputWithDecorationsButton = import_react$26.forwardRef((props, ref) => {
		let { children, size, disabled: localDisabled, ...rest } = props;
		let { size: contextSize, isDisabled } = useSafeContext(InputWithDecorationsContext);
		return import_react$26.createElement(InputFlexContainerButton, {
			ref,
			size: size ?? contextSize,
			disabled: localDisabled ?? isDisabled,
			...rest
		}, children);
	});
	InputWithDecorationsIcon = InputFlexContainerIcon;
	InputWithDecorations = Object.assign(InputWithDecorationsComponent, {
		Input: InputWithDecorationsInput,
		Button: InputWithDecorationsButton,
		Icon: InputWithDecorationsIcon
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Textarea/Textarea.js
var import_react$25, Textarea;
var init_Textarea = __esmMin((() => {
	import_react$25 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Input();
	Textarea = import_react$25.forwardRef((props, forwardedRef) => import_react$25.createElement(Input, {
		as: "textarea",
		rows: 3,
		ref: forwardedRef,
		...props
	}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Menu/MenuItem.js
var import_react$24, import_classnames$16, MenuItem;
var init_MenuItem = __esmMin((() => {
	import_react$24 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	init_Menu();
	init_ListItem();
	import_classnames$16 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_DropdownMenu();
	MenuItem = import_react$24.forwardRef((props, forwardedRef) => {
		let { className, children, isSelected, disabled, value, onClick: onClickProp, sublabel, size = !!sublabel ? "large" : "default", icon, startIcon = icon, badge, endIcon = badge, role = "menuitem", subMenuItems = [], ...rest } = props;
		useWarningLogger();
		let hasSubMenu = import_react$24.useMemo(() => subMenuItems.length > 0, [subMenuItems.length]);
		let parentMenu = import_react$24.useContext(MenuContext);
		let dropdownMenu = import_react$24.useContext(DropdownMenuContext);
		let shouldCloseMenuOnClick = import_react$24.useContext(DropdownMenuCloseOnClickContext) && !hasSubMenu;
		let menuItemRef = import_react$24.useRef(null);
		let submenuId = useId$1();
		let popoverProps = import_react$24.useMemo(() => ({
			placement: "right-start",
			interactions: {
				click: true,
				hover: true,
				listNavigation: {
					nested: hasSubMenu,
					openOnArrowKeyDown: true
				}
			}
		}), [hasSubMenu]);
		let onClick = (event) => {
			if (disabled) return;
			if (shouldCloseMenuOnClick) dropdownMenu?.close();
			onClickProp?.(value ?? event);
		};
		let focusableItemIndex = parentMenu?.focusableElements.findIndex((el) => el === menuItemRef.current);
		let trigger = import_react$24.createElement(ListItem, {
			as: "button",
			type: "button",
			className: (0, import_classnames$16.default)("iui-button-base", className),
			actionable: true,
			size,
			active: isSelected,
			disabled,
			ref: useMergedRefs(menuItemRef, forwardedRef),
			role,
			tabIndex: isSelected ? 0 : -1,
			"aria-selected": isSelected,
			"aria-haspopup": hasSubMenu ? "true" : void 0,
			"aria-controls": hasSubMenu ? submenuId : void 0,
			"aria-disabled": disabled,
			...parentMenu?.popoverGetItemProps != null ? parentMenu.popoverGetItemProps({
				focusableItemIndex,
				userProps: { onClick }
			}) : { onClick },
			...rest
		}, startIcon && import_react$24.createElement(ListItem.Icon, {
			as: "span",
			"aria-hidden": true
		}, startIcon), import_react$24.createElement(ListItem.Content, null, import_react$24.createElement("div", null, children), sublabel && import_react$24.createElement(ListItem.Description, null, sublabel)), !endIcon && hasSubMenu && import_react$24.createElement(ListItem.Icon, {
			as: "span",
			"aria-hidden": true
		}, import_react$24.createElement(SvgCaretRightSmall, null)), endIcon && import_react$24.createElement(ListItem.Icon, {
			as: "span",
			"aria-hidden": true
		}, endIcon));
		return import_react$24.createElement(import_react$24.Fragment, null, hasSubMenu && !disabled ? import_react$24.createElement(Menu, {
			id: submenuId,
			trigger,
			popoverProps
		}, subMenuItems) : trigger);
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Select/Select.js
var import_react$23, import_classnames$15, Select, NativeSelect, CustomSelect, isMultipleEnabled, isSingleOnChange, SelectButton, SelectEndIcon, SingleSelectButton, MultipleSelectButton, SelectListbox;
var init_Select = __esmMin((() => {
	import_react$23 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$15 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_MenuItem();
	init_utils$1();
	init_SelectTag();
	init_SelectTagContainer();
	init_Icon();
	init_Popover();
	init_List();
	init_floating_ui_react();
	Select = import_react$23.forwardRef((props, forwardedRef) => {
		let { native, ...rest } = props;
		let Component = native ? NativeSelect : CustomSelect;
		return import_react$23.createElement(Component, {
			...rest,
			ref: forwardedRef
		});
	});
	NativeSelect = import_react$23.forwardRef((props, forwardedRef) => {
		let { triggerProps, options, disabled, placeholder, defaultValue: defaultValueProp = void 0 !== placeholder ? "" : void 0, value: valueProp, onChange: onChangeProp, size, status, styleType, required, ...rest } = props;
		return import_react$23.createElement(InputWithIcon, {
			...rest,
			ref: forwardedRef
		}, import_react$23.createElement(SelectButton, {
			as: "select",
			size,
			status,
			styleType,
			disabled,
			defaultValue: void 0 === valueProp ? defaultValueProp : void 0,
			value: null === valueProp ? "" : valueProp,
			required,
			...triggerProps,
			onKeyDown: mergeEventHandlers(triggerProps?.onKeyDown, (event) => {
				if ("Enter" === event.key) event.currentTarget.showPicker?.();
			}),
			onChange: mergeEventHandlers(triggerProps?.onChange, (event) => {
				onChangeProp?.(event.currentTarget.value, event);
			})
		}, "borderless" !== styleType && void 0 !== placeholder ? import_react$23.createElement("option", {
			value: "",
			disabled: true
		}, placeholder) : null, options.map((option) => import_react$23.createElement("option", {
			key: option.value,
			...option
		}, option.label))), import_react$23.createElement(SelectEndIcon, { disabled }));
	});
	CustomSelect = import_react$23.forwardRef((props, forwardedRef) => {
		let uid = useId$1();
		let { options, value: valueProp, onChange: onChangeProp, placeholder, disabled = false, size, itemRenderer, selectedItemRenderer, menuClassName, menuStyle, multiple = false, triggerProps, status, popoverProps: { portal = true, ...popoverProps } = {}, styleType, ...rest } = props;
		let [isOpen, setIsOpen] = import_react$23.useState(false);
		let [liveRegionSelection, setLiveRegionSelection] = import_react$23.useState("");
		let [uncontrolledValue, setUncontrolledValue] = import_react$23.useState();
		let value = void 0 !== valueProp ? valueProp : uncontrolledValue;
		let onChangeRef = useLatestRef$2(onChangeProp);
		let selectRef = import_react$23.useRef(null);
		let show = import_react$23.useCallback(() => {
			if (disabled) return;
			setIsOpen(true);
			popoverProps?.onVisibleChange?.(true);
		}, [disabled, popoverProps]);
		let hide = import_react$23.useCallback(() => {
			setIsOpen(false);
			selectRef.current?.focus({ preventScroll: true });
			popoverProps?.onVisibleChange?.(false);
		}, [popoverProps]);
		let handleOptionSelection = import_react$23.useCallback((option, { isSelected = false } = {}) => {
			if (isSingleOnChange(onChangeRef.current, multiple)) {
				setUncontrolledValue(option.value);
				onChangeRef.current?.(option.value);
				hide();
			} else {
				setUncontrolledValue((prev) => isSelected ? prev?.filter((i) => option.value !== i) : [...prev ?? [], option.value]);
				onChangeRef.current?.(option.value, isSelected ? "removed" : "added");
			}
			if (isMultipleEnabled(value, multiple)) {
				let prevSelectedValue = value || [];
				let newSelectedValue = isSelected ? prevSelectedValue.filter((i) => option.value !== i) : [...prevSelectedValue, option.value];
				setLiveRegionSelection(options.filter((i) => newSelectedValue.includes(i.value)).map((item) => item.label).filter(Boolean).join(", "));
			}
		}, [
			hide,
			multiple,
			onChangeRef,
			options,
			value
		]);
		let menuItems = import_react$23.useMemo(() => options.map((option, index) => {
			let isSelected = isMultipleEnabled(value, multiple) ? value?.includes(option.value) ?? false : value === option.value;
			let menuItem = itemRenderer ? itemRenderer(option, {
				close: () => setIsOpen(false),
				isSelected
			}) : import_react$23.createElement(MenuItem, null, option.label);
			let { label, icon, startIcon: startIconProp, value: _, ...restOption } = option;
			let startIcon = startIconProp ?? icon;
			return import_react$23.cloneElement(menuItem, {
				key: `${label}-${index}`,
				isSelected,
				startIcon,
				endIcon: isSelected ? import_react$23.createElement(SvgCheckmark, { "aria-hidden": true }) : null,
				onClick: () => {
					if (option.disabled) return;
					handleOptionSelection(option, { isSelected });
				},
				ref: (el) => {
					if (isSelected && !multiple) el?.scrollIntoView({ block: "nearest" });
				},
				role: "option",
				...restOption,
				...menuItem.props
			});
		}), [
			handleOptionSelection,
			itemRenderer,
			multiple,
			options,
			value
		]);
		let selectedItems = import_react$23.useMemo(() => {
			if (null == value) return;
			return isMultipleEnabled(value, multiple) ? options.filter((option) => value.some((val) => val === option.value)) : options.find((option) => option.value === value);
		}, [
			multiple,
			options,
			value
		]);
		let defaultFocusedIndex = import_react$23.useMemo(() => {
			let index = 0;
			if (Array.isArray(value) && value.length > 0) index = options.findIndex((option) => option.value === value[0]);
			else if (value) index = options.findIndex((option) => option.value === value);
			return index >= 0 ? index : 0;
		}, [options, value]);
		let tagRenderer = import_react$23.useCallback((option) => import_react$23.createElement(SelectTag, {
			key: option.label,
			label: option.label,
			onRemove: disabled ? void 0 : () => {
				handleOptionSelection(option, { isSelected: true });
				selectRef.current?.focus();
			}
		}), [disabled, handleOptionSelection]);
		let popover = usePopover({
			visible: isOpen,
			matchWidth: true,
			closeOnOutsideClick: true,
			middleware: { size: { maxHeight: "var(--iui-menu-max-height)" } },
			...popoverProps,
			onVisibleChange: (open) => open ? show() : hide()
		});
		return import_react$23.createElement(import_react$23.Fragment, null, import_react$23.createElement(InputWithIcon, {
			...rest,
			ref: useMergedRefs(popover.refs.setPositionReference, forwardedRef)
		}, import_react$23.createElement(SelectButton, {
			...popover.getReferenceProps(),
			tabIndex: 0,
			role: "combobox",
			size,
			status,
			"aria-disabled": disabled ? "true" : void 0,
			"data-iui-disabled": disabled ? "true" : void 0,
			"aria-autocomplete": "none",
			"aria-expanded": isOpen,
			"aria-haspopup": "listbox",
			"aria-controls": `${uid}-menu`,
			styleType,
			...triggerProps,
			ref: useMergedRefs(selectRef, triggerProps?.ref, popover.refs.setReference),
			className: (0, import_classnames$15.default)({ "iui-placeholder": (!selectedItems || 0 === selectedItems.length) && !!placeholder }, triggerProps?.className),
			"data-iui-multi": multiple
		}, (!selectedItems || 0 === selectedItems.length) && import_react$23.createElement(Box, {
			as: "span",
			className: "iui-content"
		}, placeholder), isMultipleEnabled(selectedItems, multiple) ? import_react$23.createElement(AutoclearingHiddenLiveRegion, { text: liveRegionSelection }) : import_react$23.createElement(SingleSelectButton, {
			selectedItem: selectedItems,
			selectedItemRenderer
		})), import_react$23.createElement(SelectEndIcon, {
			disabled,
			isOpen
		}), isMultipleEnabled(selectedItems, multiple) ? import_react$23.createElement(MultipleSelectButton, {
			selectedItems,
			selectedItemsRenderer: selectedItemRenderer,
			tagRenderer,
			size: "small" === size ? "small" : void 0
		}) : null), popover.open && import_react$23.createElement(Portal, { portal }, import_react$23.createElement(SelectListbox, {
			defaultFocusedIndex,
			className: menuClassName,
			id: `${uid}-menu`,
			key: `${uid}-menu`,
			...popover.getFloatingProps({
				style: menuStyle,
				onKeyDown: ({ key }) => {
					if ("Tab" === key) hide();
				}
			}),
			ref: popover.refs.setFloating
		}, menuItems)));
	});
	isMultipleEnabled = (variable, multiple) => multiple;
	isSingleOnChange = (onChange, multiple) => !multiple;
	SelectButton = import_react$23.forwardRef((props, forwardedRef) => {
		let { size, status, styleType = "default", ...rest } = props;
		return import_react$23.createElement(Box, {
			"data-iui-size": size,
			"data-iui-status": status,
			"data-iui-variant": "default" !== styleType ? styleType : void 0,
			...rest,
			ref: forwardedRef,
			className: (0, import_classnames$15.default)("iui-select-button", "iui-field", props.className)
		});
	});
	SelectEndIcon = import_react$23.forwardRef((props, forwardedRef) => {
		let { disabled, isOpen, ...rest } = props;
		return import_react$23.createElement(Icon, {
			"aria-hidden": true,
			...rest,
			ref: forwardedRef,
			className: (0, import_classnames$15.default)("iui-end-icon", {
				"iui-disabled": disabled,
				"iui-open": isOpen
			}, props.className)
		}, import_react$23.createElement(SvgCaretDownSmall, null));
	});
	SingleSelectButton = ({ selectedItem, selectedItemRenderer }) => {
		let startIcon = selectedItem?.startIcon ?? selectedItem?.icon;
		return import_react$23.createElement(import_react$23.Fragment, null, selectedItem && selectedItemRenderer && selectedItemRenderer(selectedItem), selectedItem && !selectedItemRenderer && import_react$23.createElement(import_react$23.Fragment, null, startIcon && import_react$23.createElement(Box, {
			as: "span",
			className: "iui-icon",
			"aria-hidden": true
		}, startIcon), import_react$23.createElement(Box, {
			as: "span",
			className: "iui-content"
		}, selectedItem.label)));
	};
	MultipleSelectButton = ({ selectedItems, selectedItemsRenderer, tagRenderer, size }) => {
		let selectedItemsElements = import_react$23.useMemo(() => {
			if (!selectedItems) return [];
			return selectedItems.map((item) => tagRenderer(item));
		}, [selectedItems, tagRenderer]);
		return import_react$23.createElement(import_react$23.Fragment, null, selectedItems && import_react$23.createElement(Box, {
			as: "span",
			className: "iui-content"
		}, selectedItemsRenderer ? selectedItemsRenderer(selectedItems) : import_react$23.createElement(SelectTagContainer, {
			tags: selectedItemsElements,
			"data-iui-size": size
		})));
	};
	SelectListbox = import_react$23.forwardRef((props, forwardedRef) => {
		let { defaultFocusedIndex = 0, autoFocus = true, children: childrenProp, className, ...rest } = props;
		let [focusedIndex, setFocusedIndex] = import_react$23.useState(defaultFocusedIndex);
		let autoFocusRef = import_react$23.useCallback((element) => {
			queueMicrotask(() => {
				(element?.querySelector("[tabindex=\"0\"]"))?.focus();
			});
		}, []);
		let children = import_react$23.useMemo(() => import_react$23.Children.map(childrenProp, (child, index) => {
			if (import_react$23.isValidElement(child)) {
				let ref = isReact17or18 ? child.ref : child.props.ref;
				return import_react$23.createElement(CompositeItem, {
					key: index,
					ref,
					render: child
				});
			}
			return child;
		}), [childrenProp]);
		return import_react$23.createElement(Composite, {
			render: import_react$23.createElement(List, {
				as: "div",
				className: (0, import_classnames$15.default)("iui-menu", className)
			}),
			orientation: "vertical",
			role: "listbox",
			activeIndex: focusedIndex,
			onNavigate: setFocusedIndex,
			ref: useMergedRefs(forwardedRef, autoFocus ? autoFocusRef : void 0),
			...rest
		}, children);
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Menu/MenuDivider.js
var MenuDivider;
var init_MenuDivider = __esmMin((() => {
	init_utils$1();
	MenuDivider = polymorphic.div("iui-menu-divider", { role: "separator" });
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/NotificationMarker/NotificationMarker.js
var import_react$22, import_classnames$14, NotificationMarker;
var init_NotificationMarker = __esmMin((() => {
	import_react$22 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	import_classnames$14 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	NotificationMarker = import_react$22.forwardRef((props, ref) => {
		let { className, children, status = "primary", pulsing = false, enabled = true, ...rest } = props;
		return import_react$22.createElement(Box, {
			as: "span",
			ref,
			className: (0, import_classnames$14.default)({ "iui-notification-marker": enabled }, className),
			"data-iui-variant": enabled ? status : null,
			"data-iui-urgent": enabled ? pulsing : null,
			...rest
		}, children);
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Flex/Flex.js
var import_react$21, import_classnames$13, sizeTokens, getValueForToken, FlexComponent, FlexSpacer, FlexItem, Flex;
var init_Flex = __esmMin((() => {
	import_react$21 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$13 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_Box();
	sizeTokens = [
		"3xs",
		"2xs",
		"xs",
		"s",
		"m",
		"l",
		"xl",
		"2xl",
		"3xl"
	];
	getValueForToken = (token) => {
		if (sizeTokens.includes(token)) return `var(--iui-size-${token})`;
		return token;
	};
	FlexComponent = import_react$21.forwardRef((props, ref) => {
		let { display, flexDirection, justifyContent, alignItems, gap, flexWrap, className, style, ...rest } = props;
		return import_react$21.createElement(Box, {
			className: (0, import_classnames$13.default)("iui-flex", className),
			style: {
				"--iui-flex-display": display,
				"--iui-flex-direction": flexDirection,
				"--iui-flex-justify": justifyContent,
				"--iui-flex-align": alignItems,
				"--iui-flex-gap": getValueForToken(gap),
				"--iui-flex-wrap": flexWrap,
				...style
			},
			ref,
			...rest
		});
	});
	FlexSpacer = import_react$21.forwardRef((props, ref) => {
		let { flex, className, style, ...rest } = props;
		return import_react$21.createElement(Box, {
			className: (0, import_classnames$13.default)("iui-flex-spacer", className),
			style: {
				"--iui-flex-spacer-flex": flex,
				...style
			},
			ref,
			...rest
		});
	});
	FlexItem = import_react$21.forwardRef((props, ref) => {
		let { gapBefore, gapAfter, flex, alignSelf, className, style, ...rest } = props;
		let _style = {
			"--iui-flex-item-flex": flex,
			"--iui-flex-item-align": alignSelf,
			"--iui-flex-item-gap-before": getValueForToken(gapBefore),
			"--iui-flex-item-gap-after": getValueForToken(gapAfter),
			...void 0 !== gapBefore && { "--iui-flex-item-gap-before-toggle": "var(--iui-on)" },
			...void 0 !== gapAfter && { "--iui-flex-item-gap-after-toggle": "var(--iui-on)" },
			...style
		};
		return import_react$21.createElement(Box, {
			className: (0, import_classnames$13.default)("iui-flex-item", className),
			ref,
			style: _style,
			...rest
		});
	});
	Flex = Object.assign(FlexComponent, {
		Item: FlexItem,
		Spacer: FlexSpacer
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ProgressIndicators/ProgressLinear.js
var import_react$20, import_classnames$12, ProgressLinear;
var init_ProgressLinear = __esmMin((() => {
	import_react$20 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$12 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	init_VisuallyHidden();
	ProgressLinear = import_react$20.forwardRef((props, forwardedRef) => {
		let { value, indeterminate = void 0 === value, labels = [], isAnimated = false, status, className, labelGroupProps, ...rest } = props;
		let boundedValue = getBoundedValue(value ?? 100, 0, 100);
		return import_react$20.createElement(Box, {
			className: (0, import_classnames$12.default)("iui-progress-indicator-linear", className),
			ref: forwardedRef,
			"data-iui-status": status,
			"data-iui-indeterminate": indeterminate ? "true" : void 0,
			"data-iui-animated": isAnimated ? "true" : void 0,
			...rest,
			style: {
				"--iui-progress-percentage": `${boundedValue}%`,
				...props.style
			}
		}, import_react$20.createElement(ShadowRoot$1, null, 100 !== value && import_react$20.createElement(VisuallyHidden, null, "Loading."), import_react$20.createElement("slot", null)), labels.length > 0 && import_react$20.createElement(Box, {
			as: "div",
			...labelGroupProps,
			className: (0, import_classnames$12.default)("iui-progress-indicator-linear-label", labelGroupProps?.className)
		}, labels.map((label, index) => import_react$20.createElement("span", { key: index }, label))));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Surface/Surface.js
var import_react$19, import_classnames$11, getSurfaceElevationValue, getBorderValue, SurfaceHeader, SurfaceBody, Surface, SurfaceContext;
var init_Surface = __esmMin((() => {
	import_react$19 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$11 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	getSurfaceElevationValue = (elevation) => {
		switch (elevation) {
			case 0: return "none";
			case 1: return "var(--iui-shadow-1)";
			case 2: return "var(--iui-shadow-2)";
			case 3: return "var(--iui-shadow-3)";
			case 4: return "var(--iui-shadow-4)";
			case 5: return "var(--iui-shadow-5)";
			default: return;
		}
	};
	getBorderValue = (border) => {
		if ("string" == typeof border) return border;
		if (false === border) return "none";
	};
	SurfaceHeader = import_react$19.forwardRef((props, ref) => {
		let { children, className, ...rest } = props;
		let { setHasLayout } = useSafeContext(SurfaceContext);
		import_react$19.useEffect(() => {
			if (!supportsHas()) setHasLayout(true);
		}, [setHasLayout]);
		return import_react$19.createElement(Box, {
			className: (0, import_classnames$11.default)("iui-surface-header", className),
			ref,
			...rest
		}, children);
	});
	SurfaceBody = import_react$19.forwardRef((props, ref) => {
		let { children, className, isPadded = false, ...rest } = props;
		let { setHasLayout } = useSafeContext(SurfaceContext);
		import_react$19.useEffect(() => {
			if (!supportsHas()) setHasLayout(true);
		}, [setHasLayout]);
		return import_react$19.createElement(Box, {
			className: (0, import_classnames$11.default)("iui-surface-body", className),
			ref,
			"data-iui-padded": isPadded ? "true" : void 0,
			...rest
		}, children);
	});
	Surface = Object.assign(import_react$19.forwardRef((props, ref) => {
		let { elevation, border = true, className, style, children, ...rest } = props;
		let [hasLayout, setHasLayout] = import_react$19.useState(false);
		let _style = {
			"--iui-surface-elevation": getSurfaceElevationValue(elevation),
			"--iui-surface-border": getBorderValue(border),
			...style
		};
		return import_react$19.createElement(Box, {
			className: (0, import_classnames$11.default)("iui-surface", className),
			style: _style,
			ref,
			"data-iui-layout": hasLayout ? "true" : void 0,
			...rest
		}, import_react$19.createElement(SurfaceContext.Provider, { value: { setHasLayout } }, children));
	}), {
		Header: SurfaceHeader,
		Body: SurfaceBody
	});
	SurfaceContext = import_react$19.createContext(void 0);
}));
//#endregion
//#region ../../node_modules/.pnpm/react-table@7.8.0_react@19.2.5/node_modules/react-table/dist/react-table.production.min.js
var require_react_table_production_min = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? t(exports, require_react()) : "function" == typeof define && define.amd ? define(["exports", "react"], t) : t((e = e || self).ReactTable = {}, e.React);
	})(exports, (function(e, t) {
		"use strict";
		function n(e, t, n, o, r, i, u) {
			try {
				var l = e[i](u), s = l.value;
			} catch (e) {
				n(e);
				return;
			}
			l.done ? t(s) : Promise.resolve(s).then(o, r);
		}
		function o(e) {
			return function() {
				var t = this, o = arguments;
				return new Promise((function(r, i) {
					var u = e.apply(t, o);
					function l(e) {
						n(u, r, i, l, s, "next", e);
					}
					function s(e) {
						n(u, r, i, l, s, "throw", e);
					}
					l(void 0);
				}));
			};
		}
		function r() {
			return (r = Object.assign || function(e) {
				for (var t = 1; t < arguments.length; t++) {
					var n = arguments[t];
					for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
				}
				return e;
			}).apply(this, arguments);
		}
		function i(e, t) {
			if (null == e) return {};
			var n, o, r = {}, i = Object.keys(e);
			for (o = 0; o < i.length; o++) n = i[o], t.indexOf(n) >= 0 || (r[n] = e[n]);
			return r;
		}
		function u(e) {
			var t = function(e, t) {
				if ("object" != typeof e || null === e) return e;
				var n = e[Symbol.toPrimitive];
				if (void 0 !== n) {
					var o = n.call(e, t || "default");
					if ("object" != typeof o) return o;
					throw new TypeError("@@toPrimitive must return a primitive value.");
				}
				return ("string" === t ? String : Number)(e);
			}(e, "string");
			return "symbol" == typeof t ? t : String(t);
		}
		t = t && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
		var l = { init: "init" }, s = function(e) {
			var t = e.value;
			return void 0 === t ? "" : t;
		}, a = function() {
			return t.createElement(t.Fragment, null, "\xA0");
		}, c = {
			Cell: s,
			width: 150,
			minWidth: 0,
			maxWidth: Number.MAX_SAFE_INTEGER
		};
		function d() {
			for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
			return t.reduce((function(e, t) {
				var n = t.style, o = t.className;
				return e = r({}, e, {}, i(t, ["style", "className"])), n && (e.style = e.style ? r({}, e.style || {}, {}, n || {}) : n), o && (e.className = e.className ? e.className + " " + o : o), "" === e.className && delete e.className, e;
			}), {});
		}
		var f = function(e, t) {
			return void 0 === t && (t = {}), function(n) {
				return void 0 === n && (n = {}), [].concat(e, [n]).reduce((function(e, o) {
					return function e(t, n, o) {
						return "function" == typeof n ? e({}, n(t, o)) : Array.isArray(n) ? d.apply(void 0, [t].concat(n)) : d(t, n);
					}(e, o, r({}, t, { userProps: n }));
				}), {});
			};
		}, p = function(e, t, n, o) {
			return void 0 === n && (n = {}), e.reduce((function(e, t) {
				return t(e, n);
			}), t);
		}, g = function(e, t, n) {
			return void 0 === n && (n = {}), e.forEach((function(e) {
				e(t, n);
			}));
		};
		function v(e, t, n, o) {
			e.findIndex((function(e) {
				return e.pluginName === n;
			}));
			t.forEach((function(t) {
				e.findIndex((function(e) {
					return e.pluginName === t;
				}));
			}));
		}
		function m(e, t) {
			return "function" == typeof e ? e(t) : e;
		}
		function h(e) {
			var n = t.useRef();
			return n.current = e, t.useCallback((function() {
				return n.current;
			}), []);
		}
		var y = "undefined" != typeof document ? t.useLayoutEffect : t.useEffect;
		function w(e, n) {
			var o = t.useRef(!1);
			y((function() {
				o.current && e(), o.current = !0;
			}), n);
		}
		function R(e, t, n) {
			return void 0 === n && (n = {}), function(o, i) {
				void 0 === i && (i = {});
				var u = "string" == typeof o ? t[o] : o;
				if (void 0 === u) throw console.info(t), /* @__PURE__ */ new Error("Renderer Error ☝️");
				return b(u, r({}, e, { column: t }, n, {}, i));
			};
		}
		function b(e, n) {
			return function(e) {
				return "function" == typeof e && (t = Object.getPrototypeOf(e)).prototype && t.prototype.isReactComponent;
				var t;
			}(o = e) || "function" == typeof o || function(e) {
				return "object" == typeof e && "symbol" == typeof e.$$typeof && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
			}(o) ? t.createElement(e, n) : e;
			var o;
		}
		function S(e, t, n) {
			return void 0 === n && (n = 0), e.map((function(e) {
				return x(e = r({}, e, {
					parent: t,
					depth: n
				})), e.columns && (e.columns = S(e.columns, e, n + 1)), e;
			}));
		}
		function C(e) {
			return G(e, "columns");
		}
		function x(e) {
			var t = e.id, n = e.accessor, o = e.Header;
			if ("string" == typeof n) {
				t = t || n;
				var r = n.split(".");
				n = function(e) {
					return function(e, t, n) {
						if (!t) return e;
						var o, r = "function" == typeof t ? t : JSON.stringify(t), i = E.get(r) || function() {
							var e = function(e) {
								return function e(t, n) {
									void 0 === n && (n = []);
									if (Array.isArray(t)) for (var o = 0; o < t.length; o += 1) e(t[o], n);
									else n.push(t);
									return n;
								}(e).map((function(e) {
									return String(e).replace(".", "_");
								})).join(".").replace(T, ".").replace(O, "").split(".");
							}(t);
							return E.set(r, e), e;
						}();
						try {
							o = i.reduce((function(e, t) {
								return e[t];
							}), e);
						} catch (e) {}
						return void 0 !== o ? o : n;
					}(e, r);
				};
			}
			if (!t && "string" == typeof o && o && (t = o), !t && e.columns) throw console.error(e), /* @__PURE__ */ new Error("A column ID (or unique \"Header\" value) is required!");
			if (!t) throw console.error(e), /* @__PURE__ */ new Error("A column ID (or string accessor) is required!");
			return Object.assign(e, {
				id: t,
				accessor: n
			}), e;
		}
		function P(e, t) {
			if (!t) throw new Error();
			return Object.assign(e, r({
				Header: a,
				Footer: a
			}, c, {}, t, {}, e)), Object.assign(e, { originalWidth: e.width }), e;
		}
		function B(e, t, n) {
			void 0 === n && (n = function() {
				return {};
			});
			for (var o = [], i = e, u = 0, l = function() {
				return u++;
			}, s = function() {
				var e = { headers: [] }, u = [], s = i.some((function(e) {
					return e.parent;
				}));
				i.forEach((function(o) {
					var i, a = [].concat(u).reverse()[0];
					if (s) {
						if (o.parent) i = r({}, o.parent, {
							originalId: o.parent.id,
							id: o.parent.id + "_" + l(),
							headers: [o]
						}, n(o));
						else i = P(r({
							originalId: o.id + "_placeholder",
							id: o.id + "_placeholder_" + l(),
							placeholderOf: o,
							headers: [o]
						}, n(o)), t);
						a && a.originalId === i.originalId ? a.headers.push(o) : u.push(i);
					}
					e.headers.push(o);
				})), o.push(e), i = u;
			}; i.length;) s();
			return o.reverse();
		}
		var E = /* @__PURE__ */ new Map();
		function I() {
			for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
			for (var o = 0; o < t.length; o += 1) if (void 0 !== t[o]) return t[o];
		}
		function F(e) {
			if ("function" == typeof e) return e;
		}
		function G(e, t) {
			var n = [];
			return function e(o) {
				o.forEach((function(o) {
					o[t] ? e(o[t]) : n.push(o);
				}));
			}(e), n;
		}
		function A(e, t) {
			var n = t.manualExpandedKey, o = t.expanded, r = t.expandSubRows, i = void 0 === r || r, u = [];
			return e.forEach((function(e) {
				return function e(t, r) {
					void 0 === r && (r = !0), t.isExpanded = t.original && t.original[n] || o[t.id], t.canExpand = t.subRows && !!t.subRows.length, r && u.push(t), t.subRows && t.subRows.length && t.isExpanded && t.subRows.forEach((function(t) {
						return e(t, i);
					}));
				}(e);
			})), u;
		}
		function k(e, t, n) {
			return F(e) || t[e] || n[e] || n.text;
		}
		function H(e, t, n) {
			return e ? e(t, n) : void 0 === t;
		}
		function W() {
			throw new Error("React-Table: You have not called prepareRow(row) one or more rows you are attempting to render.");
		}
		var z = null;
		var T = /\[/g, O = /\]/g;
		var M = function(e) {
			return r({ role: "table" }, e);
		}, j = function(e) {
			return r({ role: "rowgroup" }, e);
		}, L = function(e, t) {
			var n = t.column;
			return r({
				key: "header_" + n.id,
				colSpan: n.totalVisibleHeaderCount,
				role: "columnheader"
			}, e);
		}, N = function(e, t) {
			var n = t.column;
			return r({
				key: "footer_" + n.id,
				colSpan: n.totalVisibleHeaderCount
			}, e);
		}, D = function(e, t) {
			return r({
				key: "headerGroup_" + t.index,
				role: "row"
			}, e);
		}, V = function(e, t) {
			return r({ key: "footerGroup_" + t.index }, e);
		}, _ = function(e, t) {
			return r({
				key: "row_" + t.row.id,
				role: "row"
			}, e);
		}, X = function(e, t) {
			var n = t.cell;
			return r({
				key: "cell_" + n.row.id + "_" + n.column.id,
				role: "cell"
			}, e);
		};
		function q() {
			return {
				useOptions: [],
				stateReducers: [],
				useControlledState: [],
				columns: [],
				columnsDeps: [],
				allColumns: [],
				allColumnsDeps: [],
				accessValue: [],
				materializedColumns: [],
				materializedColumnsDeps: [],
				useInstanceAfterData: [],
				visibleColumns: [],
				visibleColumnsDeps: [],
				headerGroups: [],
				headerGroupsDeps: [],
				useInstanceBeforeDimensions: [],
				useInstance: [],
				prepareRow: [],
				getTableProps: [M],
				getTableBodyProps: [j],
				getHeaderGroupProps: [D],
				getFooterGroupProps: [V],
				getHeaderProps: [L],
				getFooterProps: [N],
				getRowProps: [_],
				getCellProps: [X],
				useFinalInstance: []
			};
		}
		l.resetHiddenColumns = "resetHiddenColumns", l.toggleHideColumn = "toggleHideColumn", l.setHiddenColumns = "setHiddenColumns", l.toggleHideAllColumns = "toggleHideAllColumns";
		var K = function(e) {
			e.getToggleHiddenProps = [U], e.getToggleHideAllColumnsProps = [$], e.stateReducers.push(J), e.useInstanceBeforeDimensions.push(Y), e.headerGroupsDeps.push((function(e, t) {
				var n = t.instance;
				return [].concat(e, [n.state.hiddenColumns]);
			})), e.useInstance.push(Q);
		};
		K.pluginName = "useColumnVisibility";
		var U = function(e, t) {
			var n = t.column;
			return [e, {
				onChange: function(e) {
					n.toggleHidden(!e.target.checked);
				},
				style: { cursor: "pointer" },
				checked: n.isVisible,
				title: "Toggle Column Visible"
			}];
		}, $ = function(e, t) {
			var n = t.instance;
			return [e, {
				onChange: function(e) {
					n.toggleHideAllColumns(!e.target.checked);
				},
				style: { cursor: "pointer" },
				checked: !n.allColumnsHidden && !n.state.hiddenColumns.length,
				title: "Toggle All Columns Hidden",
				indeterminate: !n.allColumnsHidden && n.state.hiddenColumns.length
			}];
		};
		function J(e, t, n, o) {
			if (t.type === l.init) return r({ hiddenColumns: [] }, e);
			if (t.type === l.resetHiddenColumns) return r({}, e, { hiddenColumns: o.initialState.hiddenColumns || [] });
			if (t.type === l.toggleHideColumn) {
				var i = (void 0 !== t.value ? t.value : !e.hiddenColumns.includes(t.columnId)) ? [].concat(e.hiddenColumns, [t.columnId]) : e.hiddenColumns.filter((function(e) {
					return e !== t.columnId;
				}));
				return r({}, e, { hiddenColumns: i });
			}
			return t.type === l.setHiddenColumns ? r({}, e, { hiddenColumns: m(t.value, e.hiddenColumns) }) : t.type === l.toggleHideAllColumns ? r({}, e, { hiddenColumns: (void 0 !== t.value ? t.value : !e.hiddenColumns.length) ? o.allColumns.map((function(e) {
				return e.id;
			})) : [] }) : void 0;
		}
		function Y(e) {
			var n = e.headers, o = e.state.hiddenColumns;
			t.useRef(!1).current;
			var r = 0;
			n.forEach((function(e) {
				return r += function e(t, n) {
					t.isVisible = n && !o.includes(t.id);
					var r = 0;
					return t.headers && t.headers.length ? t.headers.forEach((function(n) {
						return r += e(n, t.isVisible);
					})) : r = t.isVisible ? 1 : 0, t.totalVisibleHeaderCount = r, r;
				}(e, !0);
			}));
		}
		function Q(e) {
			var n = e.columns, o = e.flatHeaders, r = e.dispatch, i = e.allColumns, u = e.getHooks, s = e.state.hiddenColumns, a = e.autoResetHiddenColumns, c = void 0 === a || a, d = h(e), p = i.length === s.length, g = t.useCallback((function(e, t) {
				return r({
					type: l.toggleHideColumn,
					columnId: e,
					value: t
				});
			}), [r]), v = t.useCallback((function(e) {
				return r({
					type: l.setHiddenColumns,
					value: e
				});
			}), [r]), m = t.useCallback((function(e) {
				return r({
					type: l.toggleHideAllColumns,
					value: e
				});
			}), [r]), y = f(u().getToggleHideAllColumnsProps, { instance: d() });
			o.forEach((function(e) {
				e.toggleHidden = function(t) {
					r({
						type: l.toggleHideColumn,
						columnId: e.id,
						value: t
					});
				}, e.getToggleHiddenProps = f(u().getToggleHiddenProps, {
					instance: d(),
					column: e
				});
			}));
			var R = h(c);
			w((function() {
				R() && r({ type: l.resetHiddenColumns });
			}), [r, n]), Object.assign(e, {
				allColumnsHidden: p,
				toggleHideColumn: g,
				setHiddenColumns: v,
				toggleHideAllColumns: m,
				getToggleHideAllColumnsProps: y
			});
		}
		var Z = {}, ee = {}, te = function(e, t, n) {
			return e;
		}, ne = function(e, t) {
			return e.subRows || [];
		}, oe = function(e, t, n) {
			return "" + (n ? [n.id, t].join(".") : t);
		}, re = function(e) {
			return e;
		};
		function ie(e) {
			var t = e.initialState, n = void 0 === t ? Z : t, o = e.defaultColumn, u = void 0 === o ? ee : o, l = e.getSubRows, s = void 0 === l ? ne : l, a = e.getRowId, c = void 0 === a ? oe : a, d = e.stateReducer, f = void 0 === d ? te : d, p = e.useControlledState, g = void 0 === p ? re : p;
			return r({}, i(e, [
				"initialState",
				"defaultColumn",
				"getSubRows",
				"getRowId",
				"stateReducer",
				"useControlledState"
			]), {
				initialState: n,
				defaultColumn: u,
				getSubRows: s,
				getRowId: c,
				stateReducer: f,
				useControlledState: g
			});
		}
		function ue(e, t) {
			void 0 === t && (t = 0);
			var n = 0, o = 0, r = 0, i = 0;
			return e.forEach((function(e) {
				var u = e.headers;
				if (e.totalLeft = t, u && u.length) {
					var l = ue(u, t), s = l[0], a = l[1], c = l[2], d = l[3];
					e.totalMinWidth = s, e.totalWidth = a, e.totalMaxWidth = c, e.totalFlexWidth = d;
				} else e.totalMinWidth = e.minWidth, e.totalWidth = Math.min(Math.max(e.minWidth, e.width), e.maxWidth), e.totalMaxWidth = e.maxWidth, e.totalFlexWidth = e.canResize ? e.totalWidth : 0;
				e.isVisible && (t += e.totalWidth, n += e.totalMinWidth, o += e.totalWidth, r += e.totalMaxWidth, i += e.totalFlexWidth);
			})), [
				n,
				o,
				r,
				i
			];
		}
		function le(e) {
			var t = e.data, n = e.rows, o = e.flatRows, r = e.rowsById, i = e.column, u = e.getRowId, l = e.getSubRows, s = e.accessValueHooks, a = e.getInstance;
			t.forEach((function(e, c) {
				return function e(n, c, d, f, g) {
					void 0 === d && (d = 0);
					var v = n, m = u(n, c, f), h = r[m];
					if (h) h.subRows && h.originalSubRows.forEach((function(t, n) {
						return e(t, n, d + 1, h);
					}));
					else if ((h = {
						id: m,
						original: v,
						index: c,
						depth: d,
						cells: [{}]
					}).cells.map = W, h.cells.filter = W, h.cells.forEach = W, h.cells[0].getCellProps = W, h.values = {}, g.push(h), o.push(h), r[m] = h, h.originalSubRows = l(n, c), h.originalSubRows) {
						var y = [];
						h.originalSubRows.forEach((function(t, n) {
							return e(t, n, d + 1, h, y);
						})), h.subRows = y;
					}
					i.accessor && (h.values[i.id] = i.accessor(n, c, h, g, t)), h.values[i.id] = p(s, h.values[i.id], {
						row: h,
						column: i,
						instance: a()
					});
				}(e, c, 0, void 0, n);
			}));
		}
		l.resetExpanded = "resetExpanded", l.toggleRowExpanded = "toggleRowExpanded", l.toggleAllRowsExpanded = "toggleAllRowsExpanded";
		var se = function(e) {
			e.getToggleAllRowsExpandedProps = [ae], e.getToggleRowExpandedProps = [ce], e.stateReducers.push(de), e.useInstance.push(fe), e.prepareRow.push(pe);
		};
		se.pluginName = "useExpanded";
		var ae = function(e, t) {
			var n = t.instance;
			return [e, {
				onClick: function(e) {
					n.toggleAllRowsExpanded();
				},
				style: { cursor: "pointer" },
				title: "Toggle All Rows Expanded"
			}];
		}, ce = function(e, t) {
			var n = t.row;
			return [e, {
				onClick: function() {
					n.toggleRowExpanded();
				},
				style: { cursor: "pointer" },
				title: "Toggle Row Expanded"
			}];
		};
		function de(e, t, n, o) {
			if (t.type === l.init) return r({ expanded: {} }, e);
			if (t.type === l.resetExpanded) return r({}, e, { expanded: o.initialState.expanded || {} });
			if (t.type === l.toggleAllRowsExpanded) {
				var s = t.value, a = o.rowsById, c = Object.keys(a).length === Object.keys(e.expanded).length;
				if (void 0 !== s ? s : !c) {
					var d = {};
					return Object.keys(a).forEach((function(e) {
						d[e] = !0;
					})), r({}, e, { expanded: d });
				}
				return r({}, e, { expanded: {} });
			}
			if (t.type === l.toggleRowExpanded) {
				var f, p = t.id, g = t.value, v = e.expanded[p], m = void 0 !== g ? g : !v;
				if (!v && m) return r({}, e, { expanded: r({}, e.expanded, (f = {}, f[p] = !0, f)) });
				if (v && !m) {
					var h = e.expanded;
					h[p];
					return r({}, e, { expanded: i(h, [p].map(u)) });
				}
				return e;
			}
		}
		function fe(e) {
			var n = e.data, o = e.rows, r = e.rowsById, i = e.manualExpandedKey, u = void 0 === i ? "expanded" : i, s = e.paginateExpandedRows, a = void 0 === s || s, c = e.expandSubRows, d = void 0 === c || c, p = e.autoResetExpanded, g = void 0 === p || p, m = e.getHooks, y = e.plugins, R = e.state.expanded, b = e.dispatch;
			v(y, [
				"useSortBy",
				"useGroupBy",
				"usePivotColumns",
				"useGlobalFilter"
			], "useExpanded");
			var S = h(g), C = Boolean(Object.keys(r).length && Object.keys(R).length);
			C && Object.keys(r).some((function(e) {
				return !R[e];
			})) && (C = !1), w((function() {
				S() && b({ type: l.resetExpanded });
			}), [b, n]);
			var x = t.useCallback((function(e, t) {
				b({
					type: l.toggleRowExpanded,
					id: e,
					value: t
				});
			}), [b]), P = t.useCallback((function(e) {
				return b({
					type: l.toggleAllRowsExpanded,
					value: e
				});
			}), [b]), B = t.useMemo((function() {
				return a ? A(o, {
					manualExpandedKey: u,
					expanded: R,
					expandSubRows: d
				}) : o;
			}), [
				a,
				o,
				u,
				R,
				d
			]), E = t.useMemo((function() {
				return function(e) {
					var t = 0;
					return Object.keys(e).forEach((function(e) {
						var n = e.split(".");
						t = Math.max(t, n.length);
					})), t;
				}(R);
			}), [R]), I = h(e), F = f(m().getToggleAllRowsExpandedProps, { instance: I() });
			Object.assign(e, {
				preExpandedRows: o,
				expandedRows: B,
				rows: B,
				expandedDepth: E,
				isAllRowsExpanded: C,
				toggleRowExpanded: x,
				toggleAllRowsExpanded: P,
				getToggleAllRowsExpandedProps: F
			});
		}
		function pe(e, t) {
			var n = t.instance.getHooks, o = t.instance;
			e.toggleRowExpanded = function(t) {
				return o.toggleRowExpanded(e.id, t);
			}, e.getToggleRowExpandedProps = f(n().getToggleRowExpandedProps, {
				instance: o,
				row: e
			});
		}
		var ge = function(e, t, n) {
			return e = e.filter((function(e) {
				return t.some((function(t) {
					var o = e.values[t];
					return String(o).toLowerCase().includes(String(n).toLowerCase());
				}));
			}));
		};
		ge.autoRemove = function(e) {
			return !e;
		};
		var ve = function(e, t, n) {
			return e.filter((function(e) {
				return t.some((function(t) {
					var o = e.values[t];
					return void 0 === o || String(o).toLowerCase() === String(n).toLowerCase();
				}));
			}));
		};
		ve.autoRemove = function(e) {
			return !e;
		};
		var me = function(e, t, n) {
			return e.filter((function(e) {
				return t.some((function(t) {
					var o = e.values[t];
					return void 0 === o || String(o) === String(n);
				}));
			}));
		};
		me.autoRemove = function(e) {
			return !e;
		};
		var he = function(e, t, n) {
			return e.filter((function(e) {
				return t.some((function(t) {
					return e.values[t].includes(n);
				}));
			}));
		};
		he.autoRemove = function(e) {
			return !e || !e.length;
		};
		var ye = function(e, t, n) {
			return e.filter((function(e) {
				return t.some((function(t) {
					var o = e.values[t];
					return o && o.length && n.every((function(e) {
						return o.includes(e);
					}));
				}));
			}));
		};
		ye.autoRemove = function(e) {
			return !e || !e.length;
		};
		var we = function(e, t, n) {
			return e.filter((function(e) {
				return t.some((function(t) {
					var o = e.values[t];
					return o && o.length && n.some((function(e) {
						return o.includes(e);
					}));
				}));
			}));
		};
		we.autoRemove = function(e) {
			return !e || !e.length;
		};
		var Re = function(e, t, n) {
			return e.filter((function(e) {
				return t.some((function(t) {
					var o = e.values[t];
					return n.includes(o);
				}));
			}));
		};
		Re.autoRemove = function(e) {
			return !e || !e.length;
		};
		var be = function(e, t, n) {
			return e.filter((function(e) {
				return t.some((function(t) {
					return e.values[t] === n;
				}));
			}));
		};
		be.autoRemove = function(e) {
			return void 0 === e;
		};
		var Se = function(e, t, n) {
			return e.filter((function(e) {
				return t.some((function(t) {
					return e.values[t] == n;
				}));
			}));
		};
		Se.autoRemove = function(e) {
			return null == e;
		};
		var Ce = function(e, t, n) {
			var o = n || [], r = o[0], i = o[1];
			if ((r = "number" == typeof r ? r : -Infinity) > (i = "number" == typeof i ? i : Infinity)) {
				var u = r;
				r = i, i = u;
			}
			return e.filter((function(e) {
				return t.some((function(t) {
					var n = e.values[t];
					return n >= r && n <= i;
				}));
			}));
		};
		Ce.autoRemove = function(e) {
			return !e || "number" != typeof e[0] && "number" != typeof e[1];
		};
		var xe = Object.freeze({
			__proto__: null,
			text: ge,
			exactText: ve,
			exactTextCase: me,
			includes: he,
			includesAll: ye,
			includesSome: we,
			includesValue: Re,
			exact: be,
			equals: Se,
			between: Ce
		});
		l.resetFilters = "resetFilters", l.setFilter = "setFilter", l.setAllFilters = "setAllFilters";
		var Pe = function(e) {
			e.stateReducers.push(Be), e.useInstance.push(Ee);
		};
		function Be(e, t, n, o) {
			if (t.type === l.init) return r({ filters: [] }, e);
			if (t.type === l.resetFilters) return r({}, e, { filters: o.initialState.filters || [] });
			if (t.type === l.setFilter) {
				var i = t.columnId, u = t.filterValue, s = o.allColumns, a = o.filterTypes, c = s.find((function(e) {
					return e.id === i;
				}));
				if (!c) throw new Error("React-Table: Could not find a column with id: " + i);
				var d = k(c.filter, a || {}, xe), f = e.filters.find((function(e) {
					return e.id === i;
				})), p = m(u, f && f.value);
				return H(d.autoRemove, p, c) ? r({}, e, { filters: e.filters.filter((function(e) {
					return e.id !== i;
				})) }) : r({}, e, f ? { filters: e.filters.map((function(e) {
					return e.id === i ? {
						id: i,
						value: p
					} : e;
				})) } : { filters: [].concat(e.filters, [{
					id: i,
					value: p
				}]) });
			}
			if (t.type === l.setAllFilters) {
				var g = t.filters, v = o.allColumns, h = o.filterTypes;
				return r({}, e, { filters: m(g, e.filters).filter((function(e) {
					var t = v.find((function(t) {
						return t.id === e.id;
					}));
					return !H(k(t.filter, h || {}, xe).autoRemove, e.value, t);
				})) });
			}
		}
		function Ee(e) {
			var n = e.data, o = e.rows, r = e.flatRows, i = e.rowsById, u = e.allColumns, s = e.filterTypes, a = e.manualFilters, c = e.defaultCanFilter, d = void 0 !== c && c, f = e.disableFilters, p = e.state.filters, g = e.dispatch, v = e.autoResetFilters, m = void 0 === v || v, y = t.useCallback((function(e, t) {
				g({
					type: l.setFilter,
					columnId: e,
					filterValue: t
				});
			}), [g]), R = t.useCallback((function(e) {
				g({
					type: l.setAllFilters,
					filters: e
				});
			}), [g]);
			u.forEach((function(e) {
				var t = e.id, n = e.accessor, o = e.defaultCanFilter, r = e.disableFilters;
				e.canFilter = n ? I(!0 !== r && void 0, !0 !== f && void 0, !0) : I(o, d, !1), e.setFilter = function(t) {
					return y(e.id, t);
				};
				var i = p.find((function(e) {
					return e.id === t;
				}));
				e.filterValue = i && i.value;
			}));
			var b = t.useMemo((function() {
				if (a || !p.length) return [
					o,
					r,
					i
				];
				var e = [], t = {};
				return [
					function n(o, r) {
						void 0 === r && (r = 0);
						var i = o;
						return (i = p.reduce((function(e, t) {
							var n = t.id, o = t.value, i = u.find((function(e) {
								return e.id === n;
							}));
							if (!i) return e;
							0 === r && (i.preFilteredRows = e);
							var l = k(i.filter, s || {}, xe);
							return l ? (i.filteredRows = l(e, [n], o), i.filteredRows) : (console.warn("Could not find a valid 'column.filter' for column with the ID: " + i.id + "."), e);
						}), o)).forEach((function(o) {
							e.push(o), t[o.id] = o, o.subRows && (o.subRows = o.subRows && o.subRows.length > 0 ? n(o.subRows, r + 1) : o.subRows);
						})), i;
					}(o),
					e,
					t
				];
			}), [
				a,
				p,
				o,
				r,
				i,
				u,
				s
			]), S = b[0], C = b[1], x = b[2];
			t.useMemo((function() {
				u.filter((function(e) {
					return !p.find((function(t) {
						return t.id === e.id;
					}));
				})).forEach((function(e) {
					e.preFilteredRows = S, e.filteredRows = S;
				}));
			}), [
				S,
				p,
				u
			]);
			var P = h(m);
			w((function() {
				P() && g({ type: l.resetFilters });
			}), [g, a ? null : n]), Object.assign(e, {
				preFilteredRows: o,
				preFilteredFlatRows: r,
				preFilteredRowsById: i,
				filteredRows: S,
				filteredFlatRows: C,
				filteredRowsById: x,
				rows: S,
				flatRows: C,
				rowsById: x,
				setFilter: y,
				setAllFilters: R
			});
		}
		Pe.pluginName = "useFilters", l.resetGlobalFilter = "resetGlobalFilter", l.setGlobalFilter = "setGlobalFilter";
		var Ie = function(e) {
			e.stateReducers.push(Fe), e.useInstance.push(Ge);
		};
		function Fe(e, t, n, o) {
			if (t.type === l.resetGlobalFilter) return r({}, e, { globalFilter: o.initialState.globalFilter || void 0 });
			if (t.type === l.setGlobalFilter) {
				var u = t.filterValue, s = o.userFilterTypes, a = k(o.globalFilter, s || {}, xe), c = m(u, e.globalFilter);
				if (H(a.autoRemove, c)) {
					e.globalFilter;
					return i(e, ["globalFilter"]);
				}
				return r({}, e, { globalFilter: c });
			}
		}
		function Ge(e) {
			var n = e.data, o = e.rows, r = e.flatRows, i = e.rowsById, u = e.allColumns, s = e.filterTypes, a = e.globalFilter, c = e.manualGlobalFilter, d = e.state.globalFilter, f = e.dispatch, p = e.autoResetGlobalFilter, g = void 0 === p || p, v = e.disableGlobalFilter, m = t.useCallback((function(e) {
				f({
					type: l.setGlobalFilter,
					filterValue: e
				});
			}), [f]), y = t.useMemo((function() {
				if (c || void 0 === d) return [
					o,
					r,
					i
				];
				var e = [], t = {}, n = k(a, s || {}, xe);
				if (!n) return console.warn("Could not find a valid 'globalFilter' option."), o;
				u.forEach((function(e) {
					var t = e.disableGlobalFilter;
					e.canFilter = I(!0 !== t && void 0, !0 !== v && void 0, !0);
				}));
				var l = u.filter((function(e) {
					return !0 === e.canFilter;
				}));
				return [
					function o(r) {
						return (r = n(r, l.map((function(e) {
							return e.id;
						})), d)).forEach((function(n) {
							e.push(n), t[n.id] = n, n.subRows = n.subRows && n.subRows.length ? o(n.subRows) : n.subRows;
						})), r;
					}(o),
					e,
					t
				];
			}), [
				c,
				d,
				a,
				s,
				u,
				o,
				r,
				i,
				v
			]), R = y[0], b = y[1], S = y[2], C = h(g);
			w((function() {
				C() && f({ type: l.resetGlobalFilter });
			}), [f, c ? null : n]), Object.assign(e, {
				preGlobalFilteredRows: o,
				preGlobalFilteredFlatRows: r,
				preGlobalFilteredRowsById: i,
				globalFilteredRows: R,
				globalFilteredFlatRows: b,
				globalFilteredRowsById: S,
				rows: R,
				flatRows: b,
				rowsById: S,
				setGlobalFilter: m,
				disableGlobalFilter: v
			});
		}
		function Ae(e, t) {
			return t.reduce((function(e, t) {
				return e + ("number" == typeof t ? t : 0);
			}), 0);
		}
		Ie.pluginName = "useGlobalFilter";
		var ke = Object.freeze({
			__proto__: null,
			sum: Ae,
			min: function(e) {
				var t = e[0] || 0;
				return e.forEach((function(e) {
					"number" == typeof e && (t = Math.min(t, e));
				})), t;
			},
			max: function(e) {
				var t = e[0] || 0;
				return e.forEach((function(e) {
					"number" == typeof e && (t = Math.max(t, e));
				})), t;
			},
			minMax: function(e) {
				var t = e[0] || 0, n = e[0] || 0;
				return e.forEach((function(e) {
					"number" == typeof e && (t = Math.min(t, e), n = Math.max(n, e));
				})), t + ".." + n;
			},
			average: function(e) {
				return Ae(0, e) / e.length;
			},
			median: function(e) {
				if (!e.length) return null;
				var t = Math.floor(e.length / 2), n = [].concat(e).sort((function(e, t) {
					return e - t;
				}));
				return e.length % 2 != 0 ? n[t] : (n[t - 1] + n[t]) / 2;
			},
			unique: function(e) {
				return Array.from(new Set(e).values());
			},
			uniqueCount: function(e) {
				return new Set(e).size;
			},
			count: function(e) {
				return e.length;
			}
		}), He = [], We = {};
		l.resetGroupBy = "resetGroupBy", l.setGroupBy = "setGroupBy", l.toggleGroupBy = "toggleGroupBy";
		var ze = function(e) {
			e.getGroupByToggleProps = [Te], e.stateReducers.push(Oe), e.visibleColumnsDeps.push((function(e, t) {
				var n = t.instance;
				return [].concat(e, [n.state.groupBy]);
			})), e.visibleColumns.push(Me), e.useInstance.push(Le), e.prepareRow.push(Ne);
		};
		ze.pluginName = "useGroupBy";
		var Te = function(e, t) {
			var n = t.header;
			return [e, {
				onClick: n.canGroupBy ? function(e) {
					e.persist(), n.toggleGroupBy();
				} : void 0,
				style: { cursor: n.canGroupBy ? "pointer" : void 0 },
				title: "Toggle GroupBy"
			}];
		};
		function Oe(e, t, n, o) {
			if (t.type === l.init) return r({ groupBy: [] }, e);
			if (t.type === l.resetGroupBy) return r({}, e, { groupBy: o.initialState.groupBy || [] });
			if (t.type === l.setGroupBy) return r({}, e, { groupBy: t.value });
			if (t.type === l.toggleGroupBy) {
				var i = t.columnId, u = t.value, s = void 0 !== u ? u : !e.groupBy.includes(i);
				return r({}, e, s ? { groupBy: [].concat(e.groupBy, [i]) } : { groupBy: e.groupBy.filter((function(e) {
					return e !== i;
				})) });
			}
		}
		function Me(e, t) {
			var n = t.instance.state.groupBy, o = n.map((function(t) {
				return e.find((function(e) {
					return e.id === t;
				}));
			})).filter(Boolean), r = e.filter((function(e) {
				return !n.includes(e.id);
			}));
			return (e = [].concat(o, r)).forEach((function(e) {
				e.isGrouped = n.includes(e.id), e.groupedIndex = n.indexOf(e.id);
			})), e;
		}
		var je = {};
		function Le(e) {
			var n = e.data, o = e.rows, i = e.flatRows, u = e.rowsById, s = e.allColumns, a = e.flatHeaders, c = e.groupByFn, d = void 0 === c ? De : c, p = e.manualGroupBy, g = e.aggregations, m = void 0 === g ? je : g, y = e.plugins, R = e.state.groupBy, b = e.dispatch, S = e.autoResetGroupBy, C = void 0 === S || S, x = e.disableGroupBy, P = e.defaultCanGroupBy, B = e.getHooks;
			v(y, ["useColumnOrder", "useFilters"], "useGroupBy");
			var E = h(e);
			s.forEach((function(t) {
				var n = t.accessor, o = t.defaultGroupBy, r = t.disableGroupBy;
				t.canGroupBy = n ? I(t.canGroupBy, !0 !== r && void 0, !0 !== x && void 0, !0) : I(t.canGroupBy, o, P, !1), t.canGroupBy && (t.toggleGroupBy = function() {
					return e.toggleGroupBy(t.id);
				}), t.Aggregated = t.Aggregated || t.Cell;
			}));
			var F = t.useCallback((function(e, t) {
				b({
					type: l.toggleGroupBy,
					columnId: e,
					value: t
				});
			}), [b]), A = t.useCallback((function(e) {
				b({
					type: l.setGroupBy,
					value: e
				});
			}), [b]);
			a.forEach((function(e) {
				e.getGroupByToggleProps = f(B().getGroupByToggleProps, {
					instance: E(),
					header: e
				});
			}));
			var k = t.useMemo((function() {
				if (p || !R.length) return [
					o,
					i,
					u,
					He,
					We,
					i,
					u
				];
				var e = R.filter((function(e) {
					return s.find((function(t) {
						return t.id === e;
					}));
				})), t = [], n = {}, l = [], a = {}, c = [], f = {}, g = function o(i, u, p) {
					if (void 0 === u && (u = 0), u === e.length) return i.map((function(e) {
						return r({}, e, { depth: u });
					}));
					var g = e[u], v = d(i, g);
					return Object.entries(v).map((function(r, i) {
						var d = r[0], v = r[1], h = g + ":" + d, y = o(v, u + 1, h = p ? p + ">" + h : h), w = u ? G(v, "leafRows") : v, R = function(t, n, o) {
							var r = {};
							return s.forEach((function(i) {
								if (e.includes(i.id)) r[i.id] = n[0] ? n[0].values[i.id] : null;
								else {
									var u = "function" == typeof i.aggregate ? i.aggregate : m[i.aggregate] || ke[i.aggregate];
									if (u) {
										var l = n.map((function(e) {
											return e.values[i.id];
										})), s = t.map((function(e) {
											var t = e.values[i.id];
											if (!o && i.aggregateValue) {
												var n = "function" == typeof i.aggregateValue ? i.aggregateValue : m[i.aggregateValue] || ke[i.aggregateValue];
												if (!n) throw console.info({ column: i }), /* @__PURE__ */ new Error("React Table: Invalid column.aggregateValue option for column listed above");
												t = n(t, e, i);
											}
											return t;
										}));
										r[i.id] = u(s, l);
									} else {
										if (i.aggregate) throw console.info({ column: i }), /* @__PURE__ */ new Error("React Table: Invalid column.aggregate option for column listed above");
										r[i.id] = null;
									}
								}
							})), r;
						}(w, v, u), b = {
							id: h,
							isGrouped: !0,
							groupByID: g,
							groupByVal: d,
							values: R,
							subRows: y,
							leafRows: w,
							depth: u,
							index: i
						};
						return y.forEach((function(e) {
							t.push(e), n[e.id] = e, e.isGrouped ? (l.push(e), a[e.id] = e) : (c.push(e), f[e.id] = e);
						})), b;
					}));
				}(o);
				return g.forEach((function(e) {
					t.push(e), n[e.id] = e, e.isGrouped ? (l.push(e), a[e.id] = e) : (c.push(e), f[e.id] = e);
				})), [
					g,
					t,
					n,
					l,
					a,
					c,
					f
				];
			}), [
				p,
				R,
				o,
				i,
				u,
				s,
				m,
				d
			]), H = k[0], W = k[1], z = k[2], T = k[3], O = k[4], M = k[5], j = k[6], L = h(C);
			w((function() {
				L() && b({ type: l.resetGroupBy });
			}), [b, p ? null : n]), Object.assign(e, {
				preGroupedRows: o,
				preGroupedFlatRow: i,
				preGroupedRowsById: u,
				groupedRows: H,
				groupedFlatRows: W,
				groupedRowsById: z,
				onlyGroupedFlatRows: T,
				onlyGroupedRowsById: O,
				nonGroupedFlatRows: M,
				nonGroupedRowsById: j,
				rows: H,
				flatRows: W,
				rowsById: z,
				toggleGroupBy: F,
				setGroupBy: A
			});
		}
		function Ne(e) {
			e.allCells.forEach((function(t) {
				var n;
				t.isGrouped = t.column.isGrouped && t.column.id === e.groupByID, t.isPlaceholder = !t.isGrouped && t.column.isGrouped, t.isAggregated = !t.isGrouped && !t.isPlaceholder && (null == (n = e.subRows) ? void 0 : n.length);
			}));
		}
		function De(e, t) {
			return e.reduce((function(e, n, o) {
				var r = "" + n.values[t];
				return e[r] = Array.isArray(e[r]) ? e[r] : [], e[r].push(n), e;
			}), {});
		}
		var Ve = /([0-9]+)/gm;
		function _e(e, t) {
			return e === t ? 0 : e > t ? 1 : -1;
		}
		function Xe(e, t, n) {
			return [e.values[n], t.values[n]];
		}
		function qe(e) {
			return "number" == typeof e ? isNaN(e) || e === Infinity || e === -Infinity ? "" : String(e) : "string" == typeof e ? e : "";
		}
		var Ke = Object.freeze({
			__proto__: null,
			alphanumeric: function(e, t, n) {
				var o = Xe(e, t, n), r = o[0], i = o[1];
				for (r = qe(r), i = qe(i), r = r.split(Ve).filter(Boolean), i = i.split(Ve).filter(Boolean); r.length && i.length;) {
					var u = r.shift(), l = i.shift(), s = parseInt(u, 10), a = parseInt(l, 10), c = [s, a].sort();
					if (isNaN(c[0])) {
						if (u > l) return 1;
						if (l > u) return -1;
					} else {
						if (isNaN(c[1])) return isNaN(s) ? -1 : 1;
						if (s > a) return 1;
						if (a > s) return -1;
					}
				}
				return r.length - i.length;
			},
			datetime: function(e, t, n) {
				var o = Xe(e, t, n), r = o[0], i = o[1];
				return _e(r = r.getTime(), i = i.getTime());
			},
			basic: function(e, t, n) {
				var o = Xe(e, t, n);
				return _e(o[0], o[1]);
			},
			string: function(e, t, n) {
				var o = Xe(e, t, n), r = o[0], i = o[1];
				for (r = r.split("").filter(Boolean), i = i.split("").filter(Boolean); r.length && i.length;) {
					var u = r.shift(), l = i.shift(), s = u.toLowerCase(), a = l.toLowerCase();
					if (s > a) return 1;
					if (a > s) return -1;
					if (u > l) return 1;
					if (l > u) return -1;
				}
				return r.length - i.length;
			},
			number: function(e, t, n) {
				var o = Xe(e, t, n), r = o[0], i = o[1], u = /[^0-9.]/gi;
				return _e(r = Number(String(r).replace(u, "")), i = Number(String(i).replace(u, "")));
			}
		});
		l.resetSortBy = "resetSortBy", l.setSortBy = "setSortBy", l.toggleSortBy = "toggleSortBy", l.clearSortBy = "clearSortBy", c.sortType = "alphanumeric", c.sortDescFirst = !1;
		var Ue = function(e) {
			e.getSortByToggleProps = [$e], e.stateReducers.push(Je), e.useInstance.push(Ye);
		};
		Ue.pluginName = "useSortBy";
		var $e = function(e, t) {
			var n = t.instance, o = t.column, r = n.isMultiSortEvent, i = void 0 === r ? function(e) {
				return e.shiftKey;
			} : r;
			return [e, {
				onClick: o.canSort ? function(e) {
					e.persist(), o.toggleSortBy(void 0, !n.disableMultiSort && i(e));
				} : void 0,
				style: { cursor: o.canSort ? "pointer" : void 0 },
				title: o.canSort ? "Toggle SortBy" : void 0
			}];
		};
		function Je(e, t, n, o) {
			if (t.type === l.init) return r({ sortBy: [] }, e);
			if (t.type === l.resetSortBy) return r({}, e, { sortBy: o.initialState.sortBy || [] });
			if (t.type === l.clearSortBy) return r({}, e, { sortBy: e.sortBy.filter((function(e) {
				return e.id !== t.columnId;
			})) });
			if (t.type === l.setSortBy) return r({}, e, { sortBy: t.sortBy });
			if (t.type === l.toggleSortBy) {
				var i, u = t.columnId, s = t.desc, a = t.multi, c = o.allColumns, d = o.disableMultiSort, f = o.disableSortRemove, p = o.disableMultiRemove, g = o.maxMultiSortColCount, v = void 0 === g ? Number.MAX_SAFE_INTEGER : g, m = e.sortBy, h = c.find((function(e) {
					return e.id === u;
				})).sortDescFirst, y = m.find((function(e) {
					return e.id === u;
				})), w = m.findIndex((function(e) {
					return e.id === u;
				})), R = null != s, b = [];
				return "toggle" !== (i = !d && a ? y ? "toggle" : "add" : w !== m.length - 1 || 1 !== m.length ? "replace" : y ? "toggle" : "replace") || f || R || a && p || !(y && y.desc && !h || !y.desc && h) || (i = "remove"), "replace" === i ? b = [{
					id: u,
					desc: R ? s : h
				}] : "add" === i ? (b = [].concat(m, [{
					id: u,
					desc: R ? s : h
				}])).splice(0, b.length - v) : "toggle" === i ? b = m.map((function(e) {
					return e.id === u ? r({}, e, { desc: R ? s : !y.desc }) : e;
				})) : "remove" === i && (b = m.filter((function(e) {
					return e.id !== u;
				}))), r({}, e, { sortBy: b });
			}
		}
		function Ye(e) {
			var n = e.data, o = e.rows, r = e.flatRows, i = e.allColumns, u = e.orderByFn, s = void 0 === u ? Qe : u, a = e.sortTypes, c = e.manualSortBy, d = e.defaultCanSort, p = e.disableSortBy, g = e.flatHeaders, m = e.state.sortBy, y = e.dispatch, R = e.plugins, b = e.getHooks, S = e.autoResetSortBy, C = void 0 === S || S;
			v(R, [
				"useFilters",
				"useGlobalFilter",
				"useGroupBy",
				"usePivotColumns"
			], "useSortBy");
			var x = t.useCallback((function(e) {
				y({
					type: l.setSortBy,
					sortBy: e
				});
			}), [y]), P = t.useCallback((function(e, t, n) {
				y({
					type: l.toggleSortBy,
					columnId: e,
					desc: t,
					multi: n
				});
			}), [y]), B = h(e);
			g.forEach((function(e) {
				var t = e.accessor, n = e.canSort, o = e.disableSortBy, r = e.id;
				e.canSort = t ? I(!0 !== o && void 0, !0 !== p && void 0, !0) : I(d, n, !1), e.canSort && (e.toggleSortBy = function(t, n) {
					return P(e.id, t, n);
				}, e.clearSortBy = function() {
					y({
						type: l.clearSortBy,
						columnId: e.id
					});
				}), e.getSortByToggleProps = f(b().getSortByToggleProps, {
					instance: B(),
					column: e
				});
				var u = m.find((function(e) {
					return e.id === r;
				}));
				e.isSorted = !!u, e.sortedIndex = m.findIndex((function(e) {
					return e.id === r;
				})), e.isSortedDesc = e.isSorted ? u.desc : void 0;
			}));
			var E = t.useMemo((function() {
				if (c || !m.length) return [o, r];
				var e = [], t = m.filter((function(e) {
					return i.find((function(t) {
						return t.id === e.id;
					}));
				}));
				return [function n(o) {
					var r = s(o, t.map((function(e) {
						var t = i.find((function(t) {
							return t.id === e.id;
						}));
						if (!t) throw new Error("React-Table: Could not find a column with id: " + e.id + " while sorting");
						var n = t.sortType, o = F(n) || (a || {})[n] || Ke[n];
						if (!o) throw new Error("React-Table: Could not find a valid sortType of '" + n + "' for column '" + e.id + "'.");
						return function(t, n) {
							return o(t, n, e.id, e.desc);
						};
					})), t.map((function(e) {
						var t = i.find((function(t) {
							return t.id === e.id;
						}));
						return t && t.sortInverted ? e.desc : !e.desc;
					})));
					return r.forEach((function(t) {
						e.push(t), t.subRows && 0 !== t.subRows.length && (t.subRows = n(t.subRows));
					})), r;
				}(o), e];
			}), [
				c,
				m,
				o,
				r,
				i,
				s,
				a
			]), G = E[0], A = E[1], k = h(C);
			w((function() {
				k() && y({ type: l.resetSortBy });
			}), [c ? null : n]), Object.assign(e, {
				preSortedRows: o,
				preSortedFlatRows: r,
				sortedRows: G,
				sortedFlatRows: A,
				rows: G,
				flatRows: A,
				setSortBy: x,
				toggleSortBy: P
			});
		}
		function Qe(e, t, n) {
			return [].concat(e).sort((function(e, o) {
				for (var r = 0; r < t.length; r += 1) {
					var i = t[r], u = !1 === n[r] || "desc" === n[r], l = i(e, o);
					if (0 !== l) return u ? -l : l;
				}
				return n[0] ? e.index - o.index : o.index - e.index;
			}));
		}
		l.resetPage = "resetPage", l.gotoPage = "gotoPage", l.setPageSize = "setPageSize";
		var Ze = function(e) {
			e.stateReducers.push(et), e.useInstance.push(tt);
		};
		function et(e, t, n, o) {
			if (t.type === l.init) return r({
				pageSize: 10,
				pageIndex: 0
			}, e);
			if (t.type === l.resetPage) return r({}, e, { pageIndex: o.initialState.pageIndex || 0 });
			if (t.type === l.gotoPage) {
				var i = o.pageCount, u = o.page, s = m(t.pageIndex, e.pageIndex), a = !1;
				return s > e.pageIndex ? a = -1 === i ? u.length >= e.pageSize : s < i : s < e.pageIndex && (a = s > -1), a ? r({}, e, { pageIndex: s }) : e;
			}
			if (t.type === l.setPageSize) {
				var c = t.pageSize, d = e.pageSize * e.pageIndex;
				return r({}, e, {
					pageIndex: Math.floor(d / c),
					pageSize: c
				});
			}
		}
		function tt(e) {
			var n = e.rows, o = e.autoResetPage, r = void 0 === o || o, i = e.manualExpandedKey, u = void 0 === i ? "expanded" : i, s = e.plugins, a = e.pageCount, c = e.paginateExpandedRows, d = void 0 === c || c, f = e.expandSubRows, p = void 0 === f || f, g = e.state, m = g.pageSize, y = g.pageIndex, R = g.expanded, b = g.globalFilter, S = g.filters, C = g.groupBy, x = g.sortBy, P = e.dispatch, B = e.data, E = e.manualPagination;
			v(s, [
				"useGlobalFilter",
				"useFilters",
				"useGroupBy",
				"useSortBy",
				"useExpanded"
			], "usePagination");
			var I = h(r);
			w((function() {
				I() && P({ type: l.resetPage });
			}), [
				P,
				E ? null : B,
				b,
				S,
				C,
				x
			]);
			var F = E ? a : Math.ceil(n.length / m), G = t.useMemo((function() {
				return F > 0 ? [].concat(new Array(F)).fill(null).map((function(e, t) {
					return t;
				})) : [];
			}), [F]), k = t.useMemo((function() {
				var e;
				if (E) e = n;
				else {
					var t = m * y, o = t + m;
					e = n.slice(t, o);
				}
				return d ? e : A(e, {
					manualExpandedKey: u,
					expanded: R,
					expandSubRows: p
				});
			}), [
				p,
				R,
				u,
				E,
				y,
				m,
				d,
				n
			]), H = y > 0, W = -1 === F ? k.length >= m : y < F - 1, z = t.useCallback((function(e) {
				P({
					type: l.gotoPage,
					pageIndex: e
				});
			}), [P]), T = t.useCallback((function() {
				return z((function(e) {
					return e - 1;
				}));
			}), [z]), O = t.useCallback((function() {
				return z((function(e) {
					return e + 1;
				}));
			}), [z]), M = t.useCallback((function(e) {
				P({
					type: l.setPageSize,
					pageSize: e
				});
			}), [P]);
			Object.assign(e, {
				pageOptions: G,
				pageCount: F,
				page: k,
				canPreviousPage: H,
				canNextPage: W,
				gotoPage: z,
				previousPage: T,
				nextPage: O,
				setPageSize: M
			});
		}
		Ze.pluginName = "usePagination", l.resetPivot = "resetPivot", l.togglePivot = "togglePivot";
		var nt = function(e) {
			e.getPivotToggleProps = [rt], e.stateReducers.push(it), e.useInstanceAfterData.push(ut), e.allColumns.push(lt), e.accessValue.push(st), e.materializedColumns.push(at), e.materializedColumnsDeps.push(ct), e.visibleColumns.push(dt), e.visibleColumnsDeps.push(ft), e.useInstance.push(pt), e.prepareRow.push(gt);
		};
		nt.pluginName = "usePivotColumns";
		var ot = [], rt = function(e, t) {
			var n = t.header;
			return [e, {
				onClick: n.canPivot ? function(e) {
					e.persist(), n.togglePivot();
				} : void 0,
				style: { cursor: n.canPivot ? "pointer" : void 0 },
				title: "Toggle Pivot"
			}];
		};
		function it(e, t, n, o) {
			if (t.type === l.init) return r({ pivotColumns: ot }, e);
			if (t.type === l.resetPivot) return r({}, e, { pivotColumns: o.initialState.pivotColumns || ot });
			if (t.type === l.togglePivot) {
				var i = t.columnId, u = t.value, s = void 0 !== u ? u : !e.pivotColumns.includes(i);
				return r({}, e, s ? { pivotColumns: [].concat(e.pivotColumns, [i]) } : { pivotColumns: e.pivotColumns.filter((function(e) {
					return e !== i;
				})) });
			}
		}
		function ut(e) {
			e.allColumns.forEach((function(t) {
				t.isPivotSource = e.state.pivotColumns.includes(t.id);
			}));
		}
		function lt(e, t) {
			var n = t.instance;
			return e.forEach((function(e) {
				e.isPivotSource = n.state.pivotColumns.includes(e.id), e.uniqueValues = /* @__PURE__ */ new Set();
			})), e;
		}
		function st(e, t) {
			var n = t.column;
			return n.uniqueValues && void 0 !== e && n.uniqueValues.add(e), e;
		}
		function at(e, t) {
			var n = t.instance, o = n.allColumns, i = n.state;
			if (!i.pivotColumns.length || !i.groupBy || !i.groupBy.length) return e;
			var u = i.pivotColumns.map((function(e) {
				return o.find((function(t) {
					return t.id === e;
				}));
			})).filter(Boolean), l = o.filter((function(e) {
				return !e.isPivotSource && !i.groupBy.includes(e.id) && !i.pivotColumns.includes(e.id);
			})), s = C(function e(t, n, o) {
				void 0 === t && (t = 0), void 0 === o && (o = []);
				var i = u[t];
				return i ? Array.from(i.uniqueValues).sort().map((function(u) {
					var l = r({}, i, {
						Header: i.PivotHeader || "string" == typeof i.header ? i.Header + ": " + u : u,
						isPivotGroup: !0,
						parent: n,
						depth: t,
						id: n ? n.id + "." + i.id + "." + u : i.id + "." + u,
						pivotValue: u
					});
					return l.columns = e(t + 1, l, [].concat(o, [function(e) {
						return e.values[i.id] === u;
					}])), l;
				})) : l.map((function(e) {
					return r({}, e, {
						canPivot: !1,
						isPivoted: !0,
						parent: n,
						depth: t,
						id: "" + (n ? n.id + "." + e.id : e.id),
						accessor: function(t, n, r) {
							if (o.every((function(e) {
								return e(r);
							}))) return r.values[e.id];
						}
					});
				}));
			}());
			return [].concat(e, s);
		}
		function ct(e, t) {
			var n = t.instance.state, o = n.pivotColumns, r = n.groupBy;
			return [].concat(e, [o, r]);
		}
		function dt(e, t) {
			var n = t.instance.state;
			return e = e.filter((function(e) {
				return !e.isPivotSource;
			})), n.pivotColumns.length && n.groupBy && n.groupBy.length && (e = e.filter((function(e) {
				return e.isGrouped || e.isPivoted;
			}))), e;
		}
		function ft(e, t) {
			var n = t.instance;
			return [].concat(e, [n.state.pivotColumns, n.state.groupBy]);
		}
		function pt(e) {
			var t = e.columns, n = e.allColumns, o = e.flatHeaders, r = e.getHooks, i = e.plugins, u = e.dispatch, s = e.autoResetPivot, a = void 0 === s || s, c = e.manaulPivot, d = e.disablePivot, p = e.defaultCanPivot;
			v(i, ["useGroupBy"], "usePivotColumns");
			var g = h(e);
			n.forEach((function(t) {
				var n = t.accessor, o = t.defaultPivot, r = t.disablePivot;
				t.canPivot = n ? I(t.canPivot, !0 !== r && void 0, !0 !== d && void 0, !0) : I(t.canPivot, o, p, !1), t.canPivot && (t.togglePivot = function() {
					return e.togglePivot(t.id);
				}), t.Aggregated = t.Aggregated || t.Cell;
			}));
			o.forEach((function(e) {
				e.getPivotToggleProps = f(r().getPivotToggleProps, {
					instance: g(),
					header: e
				});
			}));
			var m = h(a);
			w((function() {
				m() && u({ type: l.resetPivot });
			}), [u, c ? null : t]), Object.assign(e, { togglePivot: function(e, t) {
				u({
					type: l.togglePivot,
					columnId: e,
					value: t
				});
			} });
		}
		function gt(e) {
			e.allCells.forEach((function(e) {
				e.isPivoted = e.column.isPivoted;
			}));
		}
		l.resetSelectedRows = "resetSelectedRows", l.toggleAllRowsSelected = "toggleAllRowsSelected", l.toggleRowSelected = "toggleRowSelected", l.toggleAllPageRowsSelected = "toggleAllPageRowsSelected";
		var vt = function(e) {
			e.getToggleRowSelectedProps = [mt], e.getToggleAllRowsSelectedProps = [ht], e.getToggleAllPageRowsSelectedProps = [yt], e.stateReducers.push(wt), e.useInstance.push(Rt), e.prepareRow.push(bt);
		};
		vt.pluginName = "useRowSelect";
		var mt = function(e, t) {
			var n = t.instance, o = t.row, r = n.manualRowSelectedKey, i = void 0 === r ? "isSelected" : r;
			return [e, {
				onChange: function(e) {
					o.toggleRowSelected(e.target.checked);
				},
				style: { cursor: "pointer" },
				checked: !(!o.original || !o.original[i]) || o.isSelected,
				title: "Toggle Row Selected",
				indeterminate: o.isSomeSelected
			}];
		}, ht = function(e, t) {
			var n = t.instance;
			return [e, {
				onChange: function(e) {
					n.toggleAllRowsSelected(e.target.checked);
				},
				style: { cursor: "pointer" },
				checked: n.isAllRowsSelected,
				title: "Toggle All Rows Selected",
				indeterminate: Boolean(!n.isAllRowsSelected && Object.keys(n.state.selectedRowIds).length)
			}];
		}, yt = function(e, t) {
			var n = t.instance;
			return [e, {
				onChange: function(e) {
					n.toggleAllPageRowsSelected(e.target.checked);
				},
				style: { cursor: "pointer" },
				checked: n.isAllPageRowsSelected,
				title: "Toggle All Current Page Rows Selected",
				indeterminate: Boolean(!n.isAllPageRowsSelected && n.page.some((function(e) {
					var t = e.id;
					return n.state.selectedRowIds[t];
				})))
			}];
		};
		function wt(e, t, n, o) {
			if (t.type === l.init) return r({ selectedRowIds: {} }, e);
			if (t.type === l.resetSelectedRows) return r({}, e, { selectedRowIds: o.initialState.selectedRowIds || {} });
			if (t.type === l.toggleAllRowsSelected) {
				var i = t.value, u = o.isAllRowsSelected, s = o.rowsById, a = o.nonGroupedRowsById, c = void 0 === a ? s : a, d = void 0 !== i ? i : !u, f = Object.assign({}, e.selectedRowIds);
				return d ? Object.keys(c).forEach((function(e) {
					f[e] = !0;
				})) : Object.keys(c).forEach((function(e) {
					delete f[e];
				})), r({}, e, { selectedRowIds: f });
			}
			if (t.type === l.toggleRowSelected) {
				var p = t.id, g = t.value, v = o.rowsById, m = o.selectSubRows, h = void 0 === m || m, y = o.getSubRows, w = e.selectedRowIds[p], R = void 0 !== g ? g : !w;
				if (w === R) return e;
				var b = r({}, e.selectedRowIds);
				return function e(t) {
					var n = v[t];
					if (n && (n.isGrouped || (R ? b[t] = !0 : delete b[t]), h && y(n))) return y(n).forEach((function(t) {
						return e(t.id);
					}));
				}(p), r({}, e, { selectedRowIds: b });
			}
			if (t.type === l.toggleAllPageRowsSelected) {
				var S = t.value, C = o.page, x = o.rowsById, P = o.selectSubRows, B = void 0 === P || P, E = o.isAllPageRowsSelected, I = o.getSubRows, F = void 0 !== S ? S : !E, G = r({}, e.selectedRowIds);
				return C.forEach((function(e) {
					return function e(t) {
						var n = x[t];
						if (n.isGrouped || (F ? G[t] = !0 : delete G[t]), B && I(n)) return I(n).forEach((function(t) {
							return e(t.id);
						}));
					}(e.id);
				})), r({}, e, { selectedRowIds: G });
			}
			return e;
		}
		function Rt(e) {
			var n = e.data, o = e.rows, r = e.getHooks, i = e.plugins, u = e.rowsById, s = e.nonGroupedRowsById, a = void 0 === s ? u : s, c = e.autoResetSelectedRows, d = void 0 === c || c, p = e.state.selectedRowIds, g = e.selectSubRows, m = void 0 === g || g, y = e.dispatch, R = e.page, b = e.getSubRows;
			v(i, [
				"useFilters",
				"useGroupBy",
				"useSortBy",
				"useExpanded",
				"usePagination"
			], "useRowSelect");
			var S = t.useMemo((function() {
				var e = [];
				return o.forEach((function(t) {
					var n = m ? function e(t, n, o) {
						if (n[t.id]) return !0;
						var r = o(t);
						if (r && r.length) {
							var i = !0, u = !1;
							return r.forEach((function(t) {
								u && !i || (e(t, n, o) ? u = !0 : i = !1);
							})), !!i || !!u && null;
						}
						return !1;
					}(t, p, b) : !!p[t.id];
					t.isSelected = !!n, t.isSomeSelected = null === n, n && e.push(t);
				})), e;
			}), [
				o,
				m,
				p,
				b
			]), C = Boolean(Object.keys(a).length && Object.keys(p).length), x = C;
			C && Object.keys(a).some((function(e) {
				return !p[e];
			})) && (C = !1), C || R && R.length && R.some((function(e) {
				return !p[e.id];
			})) && (x = !1);
			var P = h(d);
			w((function() {
				P() && y({ type: l.resetSelectedRows });
			}), [y, n]);
			var B = t.useCallback((function(e) {
				return y({
					type: l.toggleAllRowsSelected,
					value: e
				});
			}), [y]), E = t.useCallback((function(e) {
				return y({
					type: l.toggleAllPageRowsSelected,
					value: e
				});
			}), [y]), I = t.useCallback((function(e, t) {
				return y({
					type: l.toggleRowSelected,
					id: e,
					value: t
				});
			}), [y]), F = h(e), G = f(r().getToggleAllRowsSelectedProps, { instance: F() }), A = f(r().getToggleAllPageRowsSelectedProps, { instance: F() });
			Object.assign(e, {
				selectedFlatRows: S,
				isAllRowsSelected: C,
				isAllPageRowsSelected: x,
				toggleRowSelected: I,
				toggleAllRowsSelected: B,
				getToggleAllRowsSelectedProps: G,
				getToggleAllPageRowsSelectedProps: A,
				toggleAllPageRowsSelected: E
			});
		}
		function bt(e, t) {
			var n = t.instance;
			e.toggleRowSelected = function(t) {
				return n.toggleRowSelected(e.id, t);
			}, e.getToggleRowSelectedProps = f(n.getHooks().getToggleRowSelectedProps, {
				instance: n,
				row: e
			});
		}
		var St = function(e) {
			return {};
		}, Ct = function(e) {
			return {};
		};
		l.setRowState = "setRowState", l.setCellState = "setCellState", l.resetRowState = "resetRowState";
		var xt = function(e) {
			e.stateReducers.push(Pt), e.useInstance.push(Bt), e.prepareRow.push(Et);
		};
		function Pt(e, t, n, o) {
			var i = o.initialRowStateAccessor, u = void 0 === i ? St : i, s = o.initialCellStateAccessor, a = void 0 === s ? Ct : s, c = o.rowsById;
			if (t.type === l.init) return r({ rowState: {} }, e);
			if (t.type === l.resetRowState) return r({}, e, { rowState: o.initialState.rowState || {} });
			if (t.type === l.setRowState) {
				var d, f = t.rowId, p = t.value, g = void 0 !== e.rowState[f] ? e.rowState[f] : u(c[f]);
				return r({}, e, { rowState: r({}, e.rowState, (d = {}, d[f] = m(p, g), d)) });
			}
			if (t.type === l.setCellState) {
				var v, h, y, w, R, b = t.rowId, S = t.columnId, C = t.value, x = void 0 !== e.rowState[b] ? e.rowState[b] : u(c[b]), P = void 0 !== (null == x ? void 0 : null == (v = x.cellState) ? void 0 : v[S]) ? x.cellState[S] : a(null == (h = c[b]) ? void 0 : null == (y = h.cells) ? void 0 : y.find((function(e) {
					return e.column.id === S;
				})));
				return r({}, e, { rowState: r({}, e.rowState, (R = {}, R[b] = r({}, x, { cellState: r({}, x.cellState || {}, (w = {}, w[S] = m(C, P), w)) }), R)) });
			}
		}
		function Bt(e) {
			var n = e.autoResetRowState, o = void 0 === n || n, r = e.data, i = e.dispatch, u = t.useCallback((function(e, t) {
				return i({
					type: l.setRowState,
					rowId: e,
					value: t
				});
			}), [i]), s = t.useCallback((function(e, t, n) {
				return i({
					type: l.setCellState,
					rowId: e,
					columnId: t,
					value: n
				});
			}), [i]), a = h(o);
			w((function() {
				a() && i({ type: l.resetRowState });
			}), [r]), Object.assign(e, {
				setRowState: u,
				setCellState: s
			});
		}
		function Et(e, t) {
			var n = t.instance, o = n.initialRowStateAccessor, r = void 0 === o ? St : o, i = n.initialCellStateAccessor, u = void 0 === i ? Ct : i, l = n.state.rowState;
			e && (e.state = void 0 !== l[e.id] ? l[e.id] : r(e), e.setState = function(t) {
				return n.setRowState(e.id, t);
			}, e.cells.forEach((function(t) {
				e.state.cellState || (e.state.cellState = {}), t.state = void 0 !== e.state.cellState[t.column.id] ? e.state.cellState[t.column.id] : u(t), t.setState = function(o) {
					return n.setCellState(e.id, t.column.id, o);
				};
			})));
		}
		xt.pluginName = "useRowState", l.resetColumnOrder = "resetColumnOrder", l.setColumnOrder = "setColumnOrder";
		var It = function(e) {
			e.stateReducers.push(Ft), e.visibleColumnsDeps.push((function(e, t) {
				var n = t.instance;
				return [].concat(e, [n.state.columnOrder]);
			})), e.visibleColumns.push(Gt), e.useInstance.push(At);
		};
		function Ft(e, t, n, o) {
			return t.type === l.init ? r({ columnOrder: [] }, e) : t.type === l.resetColumnOrder ? r({}, e, { columnOrder: o.initialState.columnOrder || [] }) : t.type === l.setColumnOrder ? r({}, e, { columnOrder: m(t.columnOrder, e.columnOrder) }) : void 0;
		}
		function Gt(e, t) {
			var n = t.instance.state.columnOrder;
			if (!n || !n.length) return e;
			for (var o = [].concat(n), r = [].concat(e), i = [], u = function() {
				var e = o.shift(), t = r.findIndex((function(t) {
					return t.id === e;
				}));
				t > -1 && i.push(r.splice(t, 1)[0]);
			}; r.length && o.length;) u();
			return [].concat(i, r);
		}
		function At(e) {
			var n = e.dispatch;
			e.setColumnOrder = t.useCallback((function(e) {
				return n({
					type: l.setColumnOrder,
					columnOrder: e
				});
			}), [n]);
		}
		It.pluginName = "useColumnOrder", c.canResize = !0, l.columnStartResizing = "columnStartResizing", l.columnResizing = "columnResizing", l.columnDoneResizing = "columnDoneResizing", l.resetResize = "resetResize";
		var kt = function(e) {
			e.getResizerProps = [Ht], e.getHeaderProps.push({ style: { position: "relative" } }), e.stateReducers.push(Wt), e.useInstance.push(Tt), e.useInstanceBeforeDimensions.push(zt);
		}, Ht = function(e, t) {
			var n = t.instance, o = t.header, r = n.dispatch, i = function(e, t) {
				var n = !1;
				if ("touchstart" === e.type) {
					if (e.touches && e.touches.length > 1) return;
					n = !0;
				}
				var o, i, u = function(e) {
					var t = [];
					return function e(n) {
						n.columns && n.columns.length && n.columns.map(e);
						t.push(n);
					}(e), t;
				}(t).map((function(e) {
					return [e.id, e.totalWidth];
				})), s = n ? Math.round(e.touches[0].clientX) : e.clientX, a = function() {
					window.cancelAnimationFrame(o), o = null, r({ type: l.columnDoneResizing });
				}, c = function() {
					window.cancelAnimationFrame(o), o = null, r({
						type: l.columnResizing,
						clientX: i
					});
				}, d = function(e) {
					i = e, o || (o = window.requestAnimationFrame(c));
				}, f = {
					mouse: {
						moveEvent: "mousemove",
						moveHandler: function(e) {
							return d(e.clientX);
						},
						upEvent: "mouseup",
						upHandler: function(e) {
							document.removeEventListener("mousemove", f.mouse.moveHandler), document.removeEventListener("mouseup", f.mouse.upHandler), a();
						}
					},
					touch: {
						moveEvent: "touchmove",
						moveHandler: function(e) {
							return e.cancelable && (e.preventDefault(), e.stopPropagation()), d(e.touches[0].clientX), !1;
						},
						upEvent: "touchend",
						upHandler: function(e) {
							document.removeEventListener(f.touch.moveEvent, f.touch.moveHandler), document.removeEventListener(f.touch.upEvent, f.touch.moveHandler), a();
						}
					}
				}, p = n ? f.touch : f.mouse, g = !!function() {
					if ("boolean" == typeof z) return z;
					var e = !1;
					try {
						var t = { get passive() {
							return e = !0, !1;
						} };
						window.addEventListener("test", null, t), window.removeEventListener("test", null, t);
					} catch (t) {
						e = !1;
					}
					return z = e;
				}() && { passive: !1 };
				document.addEventListener(p.moveEvent, p.moveHandler, g), document.addEventListener(p.upEvent, p.upHandler, g), r({
					type: l.columnStartResizing,
					columnId: t.id,
					columnWidth: t.totalWidth,
					headerIdWidths: u,
					clientX: s
				});
			};
			return [e, {
				onMouseDown: function(e) {
					return e.persist() || i(e, o);
				},
				onTouchStart: function(e) {
					return e.persist() || i(e, o);
				},
				style: { cursor: "col-resize" },
				draggable: !1,
				role: "separator"
			}];
		};
		function Wt(e, t) {
			if (t.type === l.init) return r({ columnResizing: { columnWidths: {} } }, e);
			if (t.type === l.resetResize) return r({}, e, { columnResizing: { columnWidths: {} } });
			if (t.type === l.columnStartResizing) {
				var n = t.clientX, o = t.columnId, i = t.columnWidth, u = t.headerIdWidths;
				return r({}, e, { columnResizing: r({}, e.columnResizing, {
					startX: n,
					headerIdWidths: u,
					columnWidth: i,
					isResizingColumn: o
				}) });
			}
			if (t.type === l.columnResizing) {
				var s = t.clientX, a = e.columnResizing, c = a.startX, d = a.columnWidth, f = a.headerIdWidths, p = (s - c) / d, g = {};
				return (void 0 === f ? [] : f).forEach((function(e) {
					var t = e[0], n = e[1];
					g[t] = Math.max(n + n * p, 0);
				})), r({}, e, { columnResizing: r({}, e.columnResizing, { columnWidths: r({}, e.columnResizing.columnWidths, {}, g) }) });
			}
			return t.type === l.columnDoneResizing ? r({}, e, { columnResizing: r({}, e.columnResizing, {
				startX: null,
				isResizingColumn: null
			}) }) : void 0;
		}
		kt.pluginName = "useResizeColumns";
		var zt = function(e) {
			var t = e.flatHeaders, n = e.disableResizing, o = e.getHooks, r = e.state.columnResizing, i = h(e);
			t.forEach((function(e) {
				var t = I(!0 !== e.disableResizing && void 0, !0 !== n && void 0, !0);
				e.canResize = t, e.width = r.columnWidths[e.id] || e.originalWidth || e.width, e.isResizing = r.isResizingColumn === e.id, t && (e.getResizerProps = f(o().getResizerProps, {
					instance: i(),
					header: e
				}));
			}));
		};
		function Tt(e) {
			var n = e.plugins, o = e.dispatch, r = e.autoResetResize, i = void 0 === r || r, u = e.columns;
			v(n, ["useAbsoluteLayout"], "useResizeColumns");
			var s = h(i);
			w((function() {
				s() && o({ type: l.resetResize });
			}), [u]);
			var a = t.useCallback((function() {
				return o({ type: l.resetResize });
			}), [o]);
			Object.assign(e, { resetResizing: a });
		}
		var Ot = {
			position: "absolute",
			top: 0
		}, Mt = function(e) {
			e.getTableBodyProps.push(jt), e.getRowProps.push(jt), e.getHeaderGroupProps.push(jt), e.getFooterGroupProps.push(jt), e.getHeaderProps.push((function(e, t) {
				var n = t.column;
				return [e, { style: r({}, Ot, {
					left: n.totalLeft + "px",
					width: n.totalWidth + "px"
				}) }];
			})), e.getCellProps.push((function(e, t) {
				var n = t.cell;
				return [e, { style: r({}, Ot, {
					left: n.column.totalLeft + "px",
					width: n.column.totalWidth + "px"
				}) }];
			})), e.getFooterProps.push((function(e, t) {
				var n = t.column;
				return [e, { style: r({}, Ot, {
					left: n.totalLeft + "px",
					width: n.totalWidth + "px"
				}) }];
			}));
		};
		Mt.pluginName = "useAbsoluteLayout";
		var jt = function(e, t) {
			return [e, { style: {
				position: "relative",
				width: t.instance.totalColumnsWidth + "px"
			} }];
		}, Lt = {
			display: "inline-block",
			boxSizing: "border-box"
		}, Nt = function(e, t) {
			return [e, { style: {
				display: "flex",
				width: t.instance.totalColumnsWidth + "px"
			} }];
		}, Dt = function(e) {
			e.getRowProps.push(Nt), e.getHeaderGroupProps.push(Nt), e.getFooterGroupProps.push(Nt), e.getHeaderProps.push((function(e, t) {
				var n = t.column;
				return [e, { style: r({}, Lt, { width: n.totalWidth + "px" }) }];
			})), e.getCellProps.push((function(e, t) {
				var n = t.cell;
				return [e, { style: r({}, Lt, { width: n.column.totalWidth + "px" }) }];
			})), e.getFooterProps.push((function(e, t) {
				var n = t.column;
				return [e, { style: r({}, Lt, { width: n.totalWidth + "px" }) }];
			}));
		};
		function Vt(e) {
			e.getTableProps.push(_t), e.getRowProps.push(Xt), e.getHeaderGroupProps.push(Xt), e.getFooterGroupProps.push(Xt), e.getHeaderProps.push(qt), e.getCellProps.push(Kt), e.getFooterProps.push(Ut);
		}
		Dt.pluginName = "useBlockLayout", Vt.pluginName = "useFlexLayout";
		var _t = function(e, t) {
			return [e, { style: { minWidth: t.instance.totalColumnsMinWidth + "px" } }];
		}, Xt = function(e, t) {
			return [e, { style: {
				display: "flex",
				flex: "1 0 auto",
				minWidth: t.instance.totalColumnsMinWidth + "px"
			} }];
		}, qt = function(e, t) {
			var n = t.column;
			return [e, { style: {
				boxSizing: "border-box",
				flex: n.totalFlexWidth ? n.totalFlexWidth + " 0 auto" : void 0,
				minWidth: n.totalMinWidth + "px",
				width: n.totalWidth + "px"
			} }];
		}, Kt = function(e, t) {
			var n = t.cell;
			return [e, { style: {
				boxSizing: "border-box",
				flex: n.column.totalFlexWidth + " 0 auto",
				minWidth: n.column.totalMinWidth + "px",
				width: n.column.totalWidth + "px"
			} }];
		}, Ut = function(e, t) {
			var n = t.column;
			return [e, { style: {
				boxSizing: "border-box",
				flex: n.totalFlexWidth ? n.totalFlexWidth + " 0 auto" : void 0,
				minWidth: n.totalMinWidth + "px",
				width: n.totalWidth + "px"
			} }];
		};
		function $t(e) {
			e.stateReducers.push(Zt), e.getTableProps.push(Jt), e.getHeaderProps.push(Yt), e.getRowProps.push(Qt);
		}
		l.columnStartResizing = "columnStartResizing", l.columnResizing = "columnResizing", l.columnDoneResizing = "columnDoneResizing", l.resetResize = "resetResize", $t.pluginName = "useGridLayout";
		var Jt = function(e, t) {
			var n = t.instance;
			return [e, { style: {
				display: "grid",
				gridTemplateColumns: n.visibleColumns.map((function(e) {
					var t;
					return n.state.gridLayout.columnWidths[e.id] ? n.state.gridLayout.columnWidths[e.id] + "px" : (null == (t = n.state.columnResizing) ? void 0 : t.isResizingColumn) ? n.state.gridLayout.startWidths[e.id] + "px" : "number" == typeof e.width ? e.width + "px" : e.width;
				})).join(" ")
			} }];
		}, Yt = function(e, t) {
			var n = t.column;
			return [e, {
				id: "header-cell-" + n.id,
				style: {
					position: "sticky",
					gridColumn: "span " + n.totalVisibleHeaderCount
				}
			}];
		}, Qt = function(e, t) {
			var n = t.row;
			return n.isExpanded ? [e, { style: { gridColumn: "1 / " + (n.cells.length + 1) } }] : [e, {}];
		};
		function Zt(e, t, n, o) {
			if (t.type === l.init) return r({ gridLayout: { columnWidths: {} } }, e);
			if (t.type === l.resetResize) return r({}, e, { gridLayout: { columnWidths: {} } });
			if (t.type === l.columnStartResizing) {
				var i = t.columnId, u = t.headerIdWidths, s = en(i);
				if (void 0 !== s) {
					var a = o.visibleColumns.reduce((function(e, t) {
						var n;
						return r({}, e, ((n = {})[t.id] = en(t.id), n));
					}), {}), c = o.visibleColumns.reduce((function(e, t) {
						var n;
						return r({}, e, ((n = {})[t.id] = t.minWidth, n));
					}), {}), d = o.visibleColumns.reduce((function(e, t) {
						var n;
						return r({}, e, ((n = {})[t.id] = t.maxWidth, n));
					}), {}), f = u.map((function(e) {
						var t = e[0];
						return [t, en(t)];
					}));
					return r({}, e, { gridLayout: r({}, e.gridLayout, {
						startWidths: a,
						minWidths: c,
						maxWidths: d,
						headerIdGridWidths: f,
						columnWidth: s
					}) });
				}
				return e;
			}
			if (t.type === l.columnResizing) {
				var p = t.clientX, g = e.columnResizing.startX, v = e.gridLayout, m = v.columnWidth, h = v.minWidths, y = v.maxWidths, w = v.headerIdGridWidths, R = (p - g) / m, b = {};
				return (void 0 === w ? [] : w).forEach((function(e) {
					var t = e[0], n = e[1];
					b[t] = Math.min(Math.max(h[t], n + n * R), y[t]);
				})), r({}, e, { gridLayout: r({}, e.gridLayout, { columnWidths: r({}, e.gridLayout.columnWidths, {}, b) }) });
			}
			return t.type === l.columnDoneResizing ? r({}, e, { gridLayout: r({}, e.gridLayout, {
				startWidths: {},
				minWidths: {},
				maxWidths: {}
			}) }) : void 0;
		}
		function en(e) {
			var t, n = null == (t = document.getElementById("header-cell-" + e)) ? void 0 : t.offsetWidth;
			if (void 0 !== n) return n;
		}
		e._UNSTABLE_usePivotColumns = nt, e.actions = l, e.defaultColumn = c, e.defaultGroupByFn = De, e.defaultOrderByFn = Qe, e.defaultRenderer = s, e.emptyRenderer = a, e.ensurePluginOrder = v, e.flexRender = b, e.functionalUpdate = m, e.loopHooks = g, e.makePropGetter = f, e.makeRenderer = R, e.reduceHooks = p, e.safeUseLayoutEffect = y, e.useAbsoluteLayout = Mt, e.useAsyncDebounce = function(e, n) {
			void 0 === n && (n = 0);
			var r = t.useRef({}), i = h(e), u = h(n);
			return t.useCallback(function() {
				var e = o(regeneratorRuntime.mark((function e() {
					var t, n, l, s = arguments;
					return regeneratorRuntime.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								for (t = s.length, n = new Array(t), l = 0; l < t; l++) n[l] = s[l];
								return r.current.promise || (r.current.promise = new Promise((function(e, t) {
									r.current.resolve = e, r.current.reject = t;
								}))), r.current.timeout && clearTimeout(r.current.timeout), r.current.timeout = setTimeout(o(regeneratorRuntime.mark((function e() {
									return regeneratorRuntime.wrap((function(e) {
										for (;;) switch (e.prev = e.next) {
											case 0: return delete r.current.timeout, e.prev = 1, e.t0 = r.current, e.next = 5, i().apply(void 0, n);
											case 5:
												e.t1 = e.sent, e.t0.resolve.call(e.t0, e.t1), e.next = 12;
												break;
											case 9: e.prev = 9, e.t2 = e.catch(1), r.current.reject(e.t2);
											case 12: return e.prev = 12, delete r.current.promise, e.finish(12);
											case 15:
											case "end": return e.stop();
										}
									}), e, null, [[
										1,
										9,
										12,
										15
									]]);
								}))), u()), e.abrupt("return", r.current.promise);
							case 5:
							case "end": return e.stop();
						}
					}), e);
				})));
				return function() {
					return e.apply(this, arguments);
				};
			}(), [i, u]);
		}, e.useBlockLayout = Dt, e.useColumnOrder = It, e.useExpanded = se, e.useFilters = Pe, e.useFlexLayout = Vt, e.useGetLatest = h, e.useGlobalFilter = Ie, e.useGridLayout = $t, e.useGroupBy = ze, e.useMountedLayoutEffect = w, e.usePagination = Ze, e.useResizeColumns = kt, e.useRowSelect = vt, e.useRowState = xt, e.useSortBy = Ue, e.useTable = function(e) {
			for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) o[i - 1] = arguments[i];
			e = ie(e), o = [K].concat(o);
			var s = h(t.useRef({}).current);
			Object.assign(s(), r({}, e, {
				plugins: o,
				hooks: q()
			})), o.filter(Boolean).forEach((function(e) {
				e(s().hooks);
			}));
			var a = h(s().hooks);
			s().getHooks = a, delete s().hooks, Object.assign(s(), p(a().useOptions, ie(e)));
			var c = s(), d = c.data, v = c.columns, m = c.initialState, y = c.defaultColumn, w = c.getSubRows, b = c.getRowId, E = c.stateReducer, I = c.useControlledState, F = h(E), G = t.useCallback((function(e, t) {
				if (!t.type) throw console.info({ action: t }), /* @__PURE__ */ new Error("Unknown Action 👆");
				return [].concat(a().stateReducers, Array.isArray(F()) ? F() : [F()]).reduce((function(n, o) {
					return o(n, t, e, s()) || n;
				}), e);
			}), [
				a,
				F,
				s
			]), A = t.useReducer(G, void 0, (function() {
				return G(m, { type: l.init });
			})), k = A[0], H = A[1], W = p([].concat(a().useControlledState, [I]), k, { instance: s() });
			Object.assign(s(), {
				state: W,
				dispatch: H
			});
			var z = t.useMemo((function() {
				return S(p(a().columns, v, { instance: s() }));
			}), [
				a,
				s,
				v
			].concat(p(a().columnsDeps, [], { instance: s() })));
			s().columns = z;
			var T = t.useMemo((function() {
				return p(a().allColumns, C(z), { instance: s() }).map(x);
			}), [
				z,
				a,
				s
			].concat(p(a().allColumnsDeps, [], { instance: s() })));
			s().allColumns = T;
			var O = t.useMemo((function() {
				for (var e = [], t = [], n = {}, o = [].concat(T); o.length;) le({
					data: d,
					rows: e,
					flatRows: t,
					rowsById: n,
					column: o.shift(),
					getRowId: b,
					getSubRows: w,
					accessValueHooks: a().accessValue,
					getInstance: s
				});
				return [
					e,
					t,
					n
				];
			}), [
				T,
				d,
				b,
				w,
				a,
				s
			]), M = O[0], j = O[1], L = O[2];
			Object.assign(s(), {
				rows: M,
				initialRows: [].concat(M),
				flatRows: j,
				rowsById: L
			}), g(a().useInstanceAfterData, s());
			var N = t.useMemo((function() {
				return p(a().visibleColumns, T, { instance: s() }).map((function(e) {
					return P(e, y);
				}));
			}), [
				a,
				T,
				s,
				y
			].concat(p(a().visibleColumnsDeps, [], { instance: s() })));
			T = t.useMemo((function() {
				var e = [].concat(N);
				return T.forEach((function(t) {
					e.find((function(e) {
						return e.id === t.id;
					})) || e.push(t);
				})), e;
			}), [T, N]), s().allColumns = T;
			var D = t.useMemo((function() {
				return p(a().headerGroups, B(N, y), s());
			}), [
				a,
				N,
				y,
				s
			].concat(p(a().headerGroupsDeps, [], { instance: s() })));
			s().headerGroups = D;
			var V = t.useMemo((function() {
				return D.length ? D[0].headers : [];
			}), [D]);
			s().headers = V, s().flatHeaders = D.reduce((function(e, t) {
				return [].concat(e, t.headers);
			}), []), g(a().useInstanceBeforeDimensions, s());
			var _ = N.filter((function(e) {
				return e.isVisible;
			})).map((function(e) {
				return e.id;
			})).sort().join("_");
			N = t.useMemo((function() {
				return N.filter((function(e) {
					return e.isVisible;
				}));
			}), [N, _]), s().visibleColumns = N;
			var X = ue(V), U = X[0], $ = X[1], J = X[2];
			return s().totalColumnsMinWidth = U, s().totalColumnsWidth = $, s().totalColumnsMaxWidth = J, g(a().useInstance, s()), [].concat(s().flatHeaders, s().allColumns).forEach((function(e) {
				e.render = R(s(), e), e.getHeaderProps = f(a().getHeaderProps, {
					instance: s(),
					column: e
				}), e.getFooterProps = f(a().getFooterProps, {
					instance: s(),
					column: e
				});
			})), s().headerGroups = t.useMemo((function() {
				return D.filter((function(e, t) {
					return e.headers = e.headers.filter((function(e) {
						return e.headers ? function e(t) {
							return t.filter((function(t) {
								return t.headers ? e(t.headers) : t.isVisible;
							})).length;
						}(e.headers) : e.isVisible;
					})), !!e.headers.length && (e.getHeaderGroupProps = f(a().getHeaderGroupProps, {
						instance: s(),
						headerGroup: e,
						index: t
					}), e.getFooterGroupProps = f(a().getFooterGroupProps, {
						instance: s(),
						headerGroup: e,
						index: t
					}), !0);
				}));
			}), [
				D,
				s,
				a
			]), s().footerGroups = [].concat(s().headerGroups).reverse(), s().prepareRow = t.useCallback((function(e) {
				e.getRowProps = f(a().getRowProps, {
					instance: s(),
					row: e
				}), e.allCells = T.map((function(t) {
					var n = e.values[t.id], o = {
						column: t,
						row: e,
						value: n
					};
					return o.getCellProps = f(a().getCellProps, {
						instance: s(),
						cell: o
					}), o.render = R(s(), t, {
						row: e,
						cell: o,
						value: n
					}), o;
				})), e.cells = N.map((function(t) {
					return e.allCells.find((function(e) {
						return e.column.id === t.id;
					}));
				})), g(a().prepareRow, e, { instance: s() });
			}), [
				a,
				s,
				T,
				N
			]), s().getTableProps = f(a().getTableProps, { instance: s() }), s().getTableBodyProps = f(a().getTableBodyProps, { instance: s() }), g(a().useFinalInstance, s()), s();
		}, Object.defineProperty(e, "__esModule", { value: !0 });
	}));
}));
//#endregion
//#region ../../node_modules/.pnpm/react-table@7.8.0_react@19.2.5/node_modules/react-table/index.js
var require_react_table = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_table_production_min();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/utils.js
var import_react$18, getCellStyle, getStickyStyle, getSubRowStyle, TableInstanceContext;
var init_utils = __esmMin((() => {
	import_react$18 = /* @__PURE__ */ __toESM(require_react(), 1);
	getCellStyle = (column, isTableResizing) => {
		let style = {};
		style.flex = "1 1 145px";
		if (column.width) {
			let width = "string" == typeof column.width ? column.width : `${column.width}px`;
			style.width = width;
			if (isTableResizing && column.canResize) style.flex = `${Number(column.width)} ${Number(column.width)} ${width}`;
			else style.flex = `0 0 ${width}`;
		}
		if (column.maxWidth) style.maxWidth = `${column.maxWidth}px`;
		if (column.minWidth) style.minWidth = `${column.minWidth}px`;
		return style;
	};
	getStickyStyle = (column, columnList) => {
		if (!column.sticky) return {};
		let left = 0;
		for (let col of columnList) {
			if (col.id === column.id) break;
			left += Number(col.width || col.resizeWidth || 0);
		}
		let right = 0;
		for (let col of [...columnList].reverse()) {
			if (col.id === column.id) break;
			right += Number(col.width || col.resizeWidth || 0);
		}
		return {
			"--iui-table-sticky-left": "left" === column.sticky ? `${left}px` : void 0,
			"--iui-table-sticky-right": "right" === column.sticky ? `${right}px` : void 0
		};
	};
	getSubRowStyle = ({ density = "default", depth = 1 }) => {
		let cellPadding = 16;
		let expanderMargin = 8;
		if ("condensed" === density) {
			cellPadding = 12;
			expanderMargin = 4;
		} else if ("extra-condensed" === density) {
			cellPadding = 8;
			expanderMargin = 4;
		}
		let multiplier = 26 + expanderMargin;
		return { paddingInlineStart: cellPadding + depth * multiplier };
	};
	TableInstanceContext = import_react$18.createContext(void 0);
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/SubRowExpander.js
var import_react$17, SubRowExpander;
var init_SubRowExpander = __esmMin((() => {
	import_react$17 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	init_IconButton();
	SubRowExpander = (props) => {
		let { cell, isDisabled, cellProps, expanderCell, density, ...rest } = props;
		return import_react$17.createElement(import_react$17.Fragment, null, expanderCell ? expanderCell(cellProps) : import_react$17.createElement(IconButton, {
			"aria-label": "Toggle sub row",
			"aria-expanded": cell.row.isExpanded ? "true" : "false",
			style: { marginInlineEnd: "default" === density || void 0 === density ? 8 : 4 },
			className: "iui-table-row-expander",
			styleType: "borderless",
			size: "small",
			onClick: (e) => {
				e.stopPropagation();
				cell.row.toggleRowExpanded();
			},
			disabled: isDisabled,
			...rest
		}, import_react$17.createElement(SvgChevronRightSmall, { style: { transform: cell.row.isExpanded ? "rotate(90deg)" : void 0 } })));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/cells/DefaultCell.js
var import_react$16, import_react_table$4, import_classnames$10, DefaultCellContext, DefaultCell;
var init_DefaultCell = __esmMin((() => {
	import_react$16 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_react_table$4 = require_react_table();
	import_classnames$10 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	init_utils();
	DefaultCellContext = import_react$16.createContext({});
	DefaultCell = (props) => {
		let instance = import_react$16.useContext(TableInstanceContext);
		let isCustomCell = import_react$16.useMemo(() => instance?.columns.find(({ id }) => props.cellProps.column.id === id)?.Cell !== import_react_table$4.defaultColumn.Cell, [instance, props.cellProps.column.id]);
		let defaultCellContext = import_react$16.useContext(DefaultCellContext);
		let isCellRendererChildrenCustom = defaultCellContext.children !== props.children;
		let isDefaultTextCell = "string" == typeof props.cellProps.value && !isCustomCell && !isCellRendererChildrenCustom;
		let { cellElementProps: { className: cellElementClassName, style: cellElementStyle, ...cellElementProps }, children, startIcon, endIcon, cellProps, isDisabled, className, style, status, text = isDefaultTextCell ? cellProps.value : void 0, clamp = !!text, ...rest } = props;
		let { key: cellElementKey, ...cellElementPropsRest } = cellElementProps;
		let decorations = {
			start: startIcon ? import_react$16.createElement(Box, {
				className: "iui-table-cell-start-icon",
				key: `${cellElementKey}-start`
			}, startIcon) : null,
			end: endIcon ? import_react$16.createElement(Box, {
				className: "iui-table-cell-end-icon",
				key: `${cellElementKey}-end`
			}, endIcon) : null
		};
		return import_react$16.createElement(Box, {
			...cellElementPropsRest,
			key: cellElementKey,
			...rest,
			className: (0, import_classnames$10.default)(cellElementClassName, className),
			"aria-disabled": isDisabled?.(cellProps.row.original) || void 0,
			"data-iui-status": status,
			style: {
				...cellElementStyle,
				...style
			}
		}, (() => {
			if (text) return import_react$16.createElement(import_react$16.Fragment, null, decorations.start, defaultCellContext.expander, import_react$16.createElement(Box, {
				className: "iui-table-cell-default-content",
				onClick: (e) => e.stopPropagation()
			}, clamp ? import_react$16.createElement(Box, { className: "iui-line-clamp" }, text) : text), decorations.end, defaultCellContext.shadows);
			return import_react$16.createElement(import_react$16.Fragment, null, decorations.start, children, decorations.end);
		})());
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/cells/index.js
var init_cells = __esmMin((() => {
	init_DefaultCell();
	init_utils$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/columns/selectionColumn.js
var import_react$15, SELECTION_CELL_ID, SelectionColumn;
var init_selectionColumn = __esmMin((() => {
	import_react$15 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Checkbox();
	init_cells();
	init_Table$1();
	SELECTION_CELL_ID = "iui-table-checkbox-selector";
	SelectionColumn = (props = {}) => {
		let { isDisabled, density } = props;
		let densityWidth = "condensed" === density ? 42 : "extra-condensed" === density ? 34 : 48;
		return {
			id: SELECTION_CELL_ID,
			disableResizing: true,
			disableGroupBy: true,
			disableReordering: true,
			minWidth: densityWidth,
			width: densityWidth,
			maxWidth: densityWidth,
			columnClassName: "iui-slot",
			cellClassName: "iui-slot",
			Header: ({ getToggleAllRowsSelectedProps, toggleAllRowsSelected, rows, preFilteredFlatRows, state }) => {
				let disabled = preFilteredFlatRows.every((row) => isDisabled?.(row.original));
				let checked = preFilteredFlatRows.every((row) => state.selectedRowIds[row.id] || isDisabled?.(row.original));
				let indeterminate = !checked && Object.keys(state.selectedRowIds).length > 0 && Object.values(state.selectedRowIds).some((v) => true === v);
				let nextToggleState = !rows.some((row) => row.isSelected);
				return import_react$15.createElement(Checkbox, {
					...getToggleAllRowsSelectedProps(),
					style: {},
					title: "",
					checked: checked && !disabled,
					indeterminate,
					disabled,
					"aria-label": `${nextToggleState ? "Select" : "Deselect"} all rows`,
					onChange: () => toggleAllRowsSelected(nextToggleState)
				});
			},
			Cell: ({ row, selectSubRows = true }) => import_react$15.createElement(Checkbox, {
				...row.getToggleRowSelectedProps(),
				style: {},
				title: "",
				disabled: isDisabled?.(row.original),
				onClick: (e) => e.stopPropagation(),
				"aria-label": `${row.isSelected ? "Deselect" : "Select"} row`,
				onChange: () => {
					if (row.subRows.length > 0 && selectSubRows && void 0 === row.initialSubRows[0].original[iuiId]) row.toggleRowSelected(!row.subRows.every((subRow) => subRow.isSelected || isDisabled?.(subRow.original)));
					else row.toggleRowSelected(!row.isSelected);
				}
			}),
			cellRenderer: (props) => import_react$15.createElement(DefaultCell, {
				...props,
				isDisabled: (rowData) => !!isDisabled?.(rowData)
			})
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/columns/expanderColumn.js
var import_react$14, EXPANDER_CELL_ID, ExpanderColumn;
var init_expanderColumn = __esmMin((() => {
	import_react$14 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	init_IconButton();
	init_cells();
	EXPANDER_CELL_ID = "iui-table-expander";
	ExpanderColumn = (props = {}) => {
		let { subComponent, isDisabled } = props;
		return {
			id: EXPANDER_CELL_ID,
			disableResizing: true,
			disableGroupBy: true,
			disableReordering: true,
			minWidth: 48,
			width: 48,
			maxWidth: 48,
			columnClassName: "iui-slot",
			cellClassName: "iui-slot",
			Cell: (props) => {
				let { row } = props;
				if (!subComponent?.(row)) return null;
				return import_react$14.createElement(IconButton, {
					"aria-label": "Toggle expandable content",
					className: "iui-table-row-expander",
					styleType: "borderless",
					size: "small",
					onClick: (e) => {
						e.stopPropagation();
						row.toggleRowExpanded();
					},
					disabled: isDisabled?.(props.row.original),
					"aria-expanded": row.isExpanded
				}, import_react$14.createElement(SvgChevronRightSmall, null));
			},
			cellRenderer: (props) => import_react$14.createElement(DefaultCell, {
				...props,
				isDisabled: (rowData) => !!isDisabled?.(rowData)
			})
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/columns/index.js
var init_columns = __esmMin((() => {
	init_Checkbox();
	init_utils$1();
	init_IconButton();
	init_Table$1();
	init_selectionColumn();
	init_expanderColumn();
	init_Popover();
	init_VisuallyHidden();
	init_Flex();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/TableCell.js
var import_react$13, import_classnames$9, TableCell;
var init_TableCell = __esmMin((() => {
	import_react$13 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$9 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils();
	init_SubRowExpander();
	init_columns();
	init_cells();
	init_utils$1();
	init_DefaultCell();
	TableCell = (props) => {
		let { cell, cellIndex, isDisabled, tableHasSubRows, tableInstance, expanderCell, density } = props;
		let hasSubRowExpander = cellIndex === cell.row.cells.findIndex((c) => c.column.id !== SELECTION_CELL_ID);
		let cellElementProps = cell.getCellProps({
			className: (0, import_classnames$9.default)("iui-table-cell", cell.column.cellClassName, { "iui-table-cell-sticky": !!cell.column.sticky }),
			style: {
				...getCellStyle(cell.column, !!tableInstance.state.isTableResizing),
				...tableHasSubRows && hasSubRowExpander && getSubRowStyle({
					density,
					depth: cell.row.depth + (cell.row.canExpand ? 0 : 1)
				}),
				...getStickyStyle(cell.column, tableInstance.visibleColumns)
			}
		});
		let cellProps = import_react$13.useMemo(() => ({
			...tableInstance,
			cell,
			row: cell.row,
			value: cell.value,
			column: cell.column
		}), [cell, tableInstance]);
		let expander = import_react$13.useMemo(() => tableHasSubRows && hasSubRowExpander && cell.row.canExpand ? import_react$13.createElement(SubRowExpander, {
			cell,
			isDisabled,
			cellProps,
			expanderCell,
			density,
			slot: "start"
		}) : null, [
			cell,
			cellProps,
			density,
			expanderCell,
			hasSubRowExpander,
			isDisabled,
			tableHasSubRows
		]);
		let cellContent = import_react$13.useMemo(() => cell.render("Cell"), [cell]);
		let shadows = import_react$13.useMemo(() => import_react$13.createElement(import_react$13.Fragment, null, "left" === cell.column.sticky && tableInstance.state.sticky.isScrolledToRight && import_react$13.createElement(Box, { className: "iui-table-cell-shadow-right" }), "right" === cell.column.sticky && tableInstance.state.sticky.isScrolledToLeft && import_react$13.createElement(Box, { className: "iui-table-cell-shadow-left" })), [
			cell.column.sticky,
			tableInstance.state.sticky.isScrolledToLeft,
			tableInstance.state.sticky.isScrolledToRight
		]);
		let defaultCellRendererChildren = import_react$13.useMemo(() => import_react$13.createElement(import_react$13.Fragment, null, expander, cellContent, shadows), [
			cellContent,
			expander,
			shadows
		]);
		let cellRendererProps = import_react$13.useMemo(() => ({
			cellElementProps,
			cellProps,
			children: defaultCellRendererChildren
		}), [
			cellElementProps,
			cellProps,
			defaultCellRendererChildren
		]);
		return import_react$13.createElement(import_react$13.Fragment, null, import_react$13.createElement(DefaultCellContext.Provider, { value: import_react$13.useMemo(() => ({
			children: defaultCellRendererChildren,
			expander,
			shadows
		}), [
			defaultCellRendererChildren,
			expander,
			shadows
		]) }, cell.column.cellRenderer ? cell.column.cellRenderer({
			...cellRendererProps,
			isDisabled: () => isDisabled
		}) : import_react$13.createElement(DefaultCell, {
			...cellRendererProps,
			isDisabled: () => isDisabled
		})));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/TableRowMemoized.js
var import_react$12, import_classnames$8, TableRow, hasAnySelectedSubRow, TableRowMemoized;
var init_TableRowMemoized = __esmMin((() => {
	import_react$12 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$8 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	init_TableCell();
	TableRow = (props) => {
		let { row, rowProps, isLast, onRowInViewport, onBottomReached, intersectionMargin, onClick, subComponent, isDisabled, tableHasSubRows, tableInstance, expanderCell, scrollContainerRef, tableRowRef, density, virtualItem, virtualizer } = props;
		let onIntersect = import_react$12.useCallback(() => {
			onRowInViewport.current?.(row.original);
			isLast && onBottomReached.current?.();
		}, [
			isLast,
			onBottomReached,
			onRowInViewport,
			row.original
		]);
		let intersectionRoot = import_react$12.useMemo(() => {
			if ((scrollContainerRef?.scrollHeight ?? 0) > (scrollContainerRef?.offsetHeight ?? 0)) return scrollContainerRef;
		}, [scrollContainerRef]);
		let intersectionRef = useIntersection(onIntersect, {
			rootMargin: `${intersectionMargin}px`,
			root: intersectionRoot
		});
		let userRowProps = rowProps?.(row) ?? {};
		let { status, isLoading, ...restUserRowProps } = userRowProps;
		let mergedProps = {
			...row.getRowProps({ style: {
				flex: "0 0 auto",
				minWidth: "100%",
				...null != virtualItem ? { transform: `translateY(${virtualItem.start}px)` } : {}
			} }),
			...restUserRowProps,
			className: (0, import_classnames$8.default)("iui-table-row", {
				"iui-table-row-expanded": row.isExpanded && subComponent,
				"iui-loading": isLoading
			}, userRowProps?.className),
			"aria-selected": row.isSelected || void 0,
			"aria-disabled": isDisabled || void 0,
			"data-iui-status": status,
			"data-iui-index": virtualItem?.index,
			...null != virtualItem && { "data-iui-virtualizer": "item" }
		};
		let refs = useMergedRefs(intersectionRef, mergedProps.ref, tableRowRef, virtualizer?.measureElement);
		return import_react$12.createElement(import_react$12.Fragment, null, import_react$12.createElement(Box, {
			...mergedProps,
			key: mergedProps.key,
			ref: refs,
			onClick: (event) => {
				mergedProps?.onClick?.(event);
				onClick?.(event, row);
			}
		}, row.cells.map((cell, index) => import_react$12.createElement(TableCell, {
			key: cell.getCellProps().key,
			cell,
			cellIndex: index,
			isDisabled,
			tableHasSubRows,
			tableInstance,
			expanderCell,
			density
		}))));
	};
	hasAnySelectedSubRow = (row, selectedRowIds) => {
		if (selectedRowIds?.[row.id]) return true;
		return row.subRows.some((subRow) => hasAnySelectedSubRow(subRow, selectedRowIds));
	};
	TableRowMemoized = import_react$12.memo(TableRow, (prevProp, nextProp) => prevProp.isLast === nextProp.isLast && prevProp.state.hiddenColumns?.length === nextProp.state.hiddenColumns?.length && !!prevProp.state.hiddenColumns?.every((column, index) => nextProp.state.hiddenColumns?.[index] === column) && prevProp.onRowInViewport === nextProp.onRowInViewport && prevProp.onBottomReached === nextProp.onBottomReached && prevProp.onClick === nextProp.onClick && prevProp.row.original === nextProp.row.original && prevProp.state.selectedRowIds?.[prevProp.row.id] === nextProp.state.selectedRowIds?.[nextProp.row.id] && prevProp.row.subRows.some((subRow) => hasAnySelectedSubRow(subRow, prevProp.state.selectedRowIds)) === nextProp.row.subRows.some((subRow) => hasAnySelectedSubRow(subRow, nextProp.state.selectedRowIds)) && prevProp.state.expanded?.[prevProp.row.id] === nextProp.state.expanded?.[nextProp.row.id] && prevProp.subComponent === nextProp.subComponent && prevProp.row.cells.every((cell, index) => nextProp.row.cells[index].column === cell.column) && prevProp.isDisabled === nextProp.isDisabled && prevProp.rowProps === nextProp.rowProps && prevProp.expanderCell === nextProp.expanderCell && prevProp.tableHasSubRows === nextProp.tableHasSubRows && prevProp.scrollContainerRef === nextProp.scrollContainerRef && prevProp.state.columnOrder === nextProp.state.columnOrder && !nextProp.state.columnResizing.isResizingColumn && prevProp.state.isTableResizing === nextProp.state.isTableResizing && prevProp.state.sticky.isScrolledToLeft === nextProp.state.sticky.isScrolledToLeft && prevProp.state.sticky.isScrolledToRight === nextProp.state.sticky.isScrolledToRight && prevProp.density === nextProp.density && prevProp.virtualizer === nextProp.virtualizer && prevProp.virtualItem?.index === nextProp.virtualItem?.index && prevProp.virtualItem?.start === nextProp.virtualItem?.start);
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/filters/customFilterFunctions.js
var isValidDate, betweenDate, customFilterFunctions;
var init_customFilterFunctions = __esmMin((() => {
	isValidDate = (date) => !!date && !isNaN(date.valueOf());
	betweenDate = (rows, ids, filterValue) => {
		let [min, max] = filterValue || [];
		let MAX_DATE_VALUE = 864e13;
		let minValue = isValidDate(min) ? min : /* @__PURE__ */ new Date(-864e13);
		let maxValue = isValidDate(max) ? max : /* @__PURE__ */ new Date(MAX_DATE_VALUE);
		return rows.filter((row) => ids.some((id) => {
			let rowValue = row.values[id];
			return rowValue.valueOf() >= minValue.valueOf() && rowValue.valueOf() <= maxValue.valueOf();
		}));
	};
	betweenDate.autoRemove = (val) => !val || !isValidDate(val[0]) && !isValidDate(val[1]);
	customFilterFunctions = { betweenDate };
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/hooks/useExpanderCell.js
var import_react$11, useExpanderCell;
var init_useExpanderCell = __esmMin((() => {
	import_react$11 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_columns();
	useExpanderCell = (subComponent, expanderCell, isRowDisabled) => (hooks) => {
		if (!subComponent) return;
		hooks.allColumns.push((columns) => {
			if (columns.find((c) => c.id === "iui-table-expander")) return columns;
			let expanderColumn = ExpanderColumn({
				subComponent,
				isDisabled: isRowDisabled
			});
			return [{
				...expanderColumn,
				Cell: expanderCell ? (cellProps) => import_react$11.createElement(import_react$11.Fragment, null, expanderCell(cellProps)) : expanderColumn.Cell
			}, ...columns];
		});
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/hooks/useSelectionCell.js
var useSelectionCell;
var init_useSelectionCell = __esmMin((() => {
	init_columns();
	useSelectionCell = (isSelectable, selectionMode, isRowDisabled, density = "default") => (hooks) => {
		if (!isSelectable) return;
		hooks.allColumns.push((columns) => "single" === selectionMode || columns.find((c) => c.id === "iui-table-checkbox-selector") ? columns : [SelectionColumn({
			isDisabled: isRowDisabled,
			density
		}), ...columns]);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/filters/defaultFilterFunctions.js
var text, exactText, exactTextCase, includes, includesAll, includesSome, includesValue, exact, equals, between, defaultFilterFunctions;
var init_defaultFilterFunctions = __esmMin((() => {
	text = (rows, ids, filterValue) => {
		rows = rows.filter((row) => ids.some((id) => {
			let rowValue = row.values[id];
			return String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase());
		}));
		return rows;
	};
	text.autoRemove = (val) => !val;
	exactText = (rows, ids, filterValue) => rows.filter((row) => ids.some((id) => {
		let rowValue = row.values[id];
		return void 0 !== rowValue ? String(rowValue).toLowerCase() === String(filterValue).toLowerCase() : true;
	}));
	exactText.autoRemove = (val) => !val;
	exactTextCase = (rows, ids, filterValue) => rows.filter((row) => ids.some((id) => {
		let rowValue = row.values[id];
		return void 0 !== rowValue ? String(rowValue) === String(filterValue) : true;
	}));
	exactTextCase.autoRemove = (val) => !val;
	includes = (rows, ids, filterValue) => rows.filter((row) => ids.some((id) => {
		return row.values[id].includes(filterValue);
	}));
	includes.autoRemove = (val) => !val || !val.length;
	includesAll = (rows, ids, filterValue) => rows.filter((row) => ids.some((id) => {
		let rowValue = row.values[id];
		return rowValue && rowValue.length && filterValue.every((val) => rowValue.includes(val));
	}));
	includesAll.autoRemove = (val) => !val || !val.length;
	includesSome = (rows, ids, filterValue) => rows.filter((row) => ids.some((id) => {
		let rowValue = row.values[id];
		return rowValue && rowValue.length && filterValue.some((val) => rowValue.includes(val));
	}));
	includesSome.autoRemove = (val) => !val || !val.length;
	includesValue = (rows, ids, filterValue) => rows.filter((row) => ids.some((id) => {
		let rowValue = row.values[id];
		return filterValue.includes(rowValue);
	}));
	includesValue.autoRemove = (val) => !val || !val.length;
	exact = (rows, ids, filterValue) => rows.filter((row) => ids.some((id) => {
		return row.values[id] === filterValue;
	}));
	exact.autoRemove = (val) => void 0 === val;
	equals = (rows, ids, filterValue) => rows.filter((row) => ids.some((id) => {
		return row.values[id] == filterValue;
	}));
	equals.autoRemove = (val) => null == val;
	between = (rows, ids, filterValue) => {
		let [min, max] = filterValue || [];
		min = "number" == typeof min ? min : -Infinity;
		max = "number" == typeof max ? max : Infinity;
		if (min > max) {
			let temp = min;
			min = max;
			max = temp;
		}
		return rows.filter((row) => ids.some((id) => {
			let rowValue = row.values[id];
			return rowValue >= min && rowValue <= max;
		}));
	};
	between.autoRemove = (val) => !val || "number" != typeof val[0] && "number" != typeof val[1];
	defaultFilterFunctions = {
		text,
		exactText,
		exactTextCase,
		includes,
		includesAll,
		includesSome,
		includesValue,
		between
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/hooks/useSubRowFiltering.js
var import_react$10, useSubRowFiltering, useInstance$3, handleRowFiltering;
var init_useSubRowFiltering = __esmMin((() => {
	import_react$10 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_defaultFilterFunctions();
	useSubRowFiltering = (hasAnySubRows) => (hooks) => {
		hooks.useInstance.push(useInstance$3.bind({}, hasAnySubRows));
	};
	useInstance$3 = (hasAnySubRows, instance) => {
		let setInitialSubRows = (rows) => {
			rows.forEach((row) => {
				if (!row.initialSubRows) row.initialSubRows = row.subRows;
				setInitialSubRows(row.subRows);
			});
		};
		setInitialSubRows(instance.initialRows);
		let { filteredRows = instance.filteredRows, filteredFlatRows = instance.filteredFlatRows, filteredRowsById = instance.filteredRowsById } = import_react$10.useMemo(() => {
			if (!hasAnySubRows) return {};
			let setSubRows = (rows) => {
				rows.forEach((row) => {
					row.subRows = row.initialSubRows ?? [];
					setSubRows(row.subRows);
				});
			};
			setSubRows(instance.initialRows);
			let currentlyFilteredRows = [...instance.initialRows];
			instance.state.filters.forEach(({ id: columnId, value: filterValue }) => {
				let column = instance.allColumns.find((c) => c.id === columnId);
				if (!column) return;
				let filterTypes = {
					...defaultFilterFunctions,
					...instance.filterTypes
				};
				let filterFn = "function" == typeof column.filter ? column.filter : filterTypes[column.filter ?? "text"];
				currentlyFilteredRows = currentlyFilteredRows.filter((row) => handleRowFiltering(row, filterFn, columnId, filterValue));
			});
			let filteredRows = [];
			let filteredFlatRows = [];
			let filteredRowsById = {};
			let populateRows = (row) => {
				if (0 === row.depth) filteredRows.push(row);
				filteredFlatRows.push(row);
				filteredRowsById[row.id] = row;
				if (row.subRows.length) row.subRows.forEach((r) => populateRows(r));
			};
			currentlyFilteredRows.forEach((row) => populateRows(row));
			return {
				filteredRows,
				filteredFlatRows,
				filteredRowsById
			};
		}, [
			instance.allColumns,
			instance.filterTypes,
			instance.initialRows,
			instance.state.filters,
			hasAnySubRows
		]);
		Object.assign(instance, {
			filteredRows,
			filteredFlatRows,
			filteredRowsById,
			rows: filteredRows,
			flatRows: filteredFlatRows,
			rowsById: filteredRowsById
		});
	};
	handleRowFiltering = (row, filterFn, columnId, filterValue) => {
		let hasFilteredSubRows = false;
		row.subRows = row.initialSubRows.filter((subRow) => {
			let result = handleRowFiltering(subRow, filterFn, columnId, filterValue);
			if (result) hasFilteredSubRows = true;
			return result;
		});
		if (hasFilteredSubRows) return true;
		return !!filterFn([row], [columnId], filterValue).length;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/hooks/useSubRowSelection.js
var import_react$9, useSubRowSelection, useInstance$2;
var init_useSubRowSelection = __esmMin((() => {
	import_react$9 = /* @__PURE__ */ __toESM(require_react(), 1);
	useSubRowSelection = (hooks) => {
		hooks.useInstance.push(useInstance$2);
	};
	useInstance$2 = (instance) => {
		let selectedFlatRows = import_react$9.useMemo(() => {
			let selectedFlatRows = [];
			let setSelectionState = (row, selectedRowIds) => {
				let isSomeSubRowsSelected = false;
				row.initialSubRows.forEach((subRow) => {
					setSelectionState(subRow, selectedRowIds);
					if (subRow.isSelected || subRow.isSomeSelected) isSomeSubRowsSelected = true;
				});
				if (selectedRowIds[row.id]) {
					row.isSelected = true;
					row.isSomeSelected = false;
					selectedFlatRows.push(row);
				} else {
					row.isSelected = false;
					row.isSomeSelected = isSomeSubRowsSelected;
				}
			};
			instance.rows.forEach((row) => setSelectionState(row, instance.state.selectedRowIds));
			return selectedFlatRows;
		}, [instance.rows, instance.state.selectedRowIds]);
		Object.assign(instance, { selectedFlatRows });
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/hooks/useResizeColumns.js
function getLeafHeaders(header) {
	let leafHeaders = [];
	let recurseHeader = (header) => {
		if (header.columns && header.columns.length) header.columns.map(recurseHeader);
		leafHeaders.push(header);
	};
	recurseHeader(header);
	return leafHeaders;
}
var import_react_table$3, useResizeColumns, isTouchEvent, defaultGetResizerProps, reducer$2, getColumnWidths, isNewColumnWidthsValid, isNewTableWidthValid, useInstanceBeforeDimensions, getPreviousResizableHeader, getNextResizableHeader, getHeaderWidth, calculateTableWidth, passiveSupported, passiveEventSupported;
var init_useResizeColumns = __esmMin((() => {
	import_react_table$3 = require_react_table();
	useResizeColumns = (ownerDocument) => (hooks) => {
		hooks.getResizerProps = [defaultGetResizerProps(ownerDocument)];
		hooks.stateReducers.push(reducer$2);
		hooks.useInstanceBeforeDimensions.push(useInstanceBeforeDimensions);
	};
	isTouchEvent = (event) => "touchstart" === event.type;
	defaultGetResizerProps = (ownerDocument) => (props, { instance, header, nextHeader }) => {
		let { dispatch } = instance;
		let onResizeStart = (e, header) => {
			if (isTouchEvent(e) && e.touches && e.touches.length > 1) return;
			let headerIdWidths = getLeafHeaders(header).map((d) => [d.id, getHeaderWidth(d)]);
			let nextHeaderIdWidths = nextHeader ? getLeafHeaders(nextHeader).map((d) => [d.id, getHeaderWidth(d)]) : [];
			let clientX = isTouchEvent(e) ? Math.round(e.touches[0].clientX) : e.clientX;
			let dispatchMove = (clientXPos) => dispatch({
				type: import_react_table$3.actions.columnResizing,
				clientX: clientXPos
			});
			let dispatchEnd = () => dispatch({ type: import_react_table$3.actions.columnDoneResizing });
			let handlersAndEvents = {
				mouse: {
					moveEvent: "mousemove",
					moveHandler: (e) => dispatchMove(e.clientX),
					upEvent: "mouseup",
					upHandler: () => {
						ownerDocument.current?.removeEventListener("mousemove", handlersAndEvents.mouse.moveHandler);
						ownerDocument.current?.removeEventListener("mouseup", handlersAndEvents.mouse.upHandler);
						ownerDocument.current?.removeEventListener("mouseleave", handlersAndEvents.mouse.upHandler);
						dispatchEnd();
					}
				},
				touch: {
					moveEvent: "touchmove",
					moveHandler: (e) => {
						if (e.cancelable) {
							e.preventDefault();
							e.stopPropagation();
						}
						dispatchMove(e.touches[0].clientX);
					},
					upEvent: "touchend",
					upHandler: () => {
						ownerDocument.current?.removeEventListener(handlersAndEvents.touch.moveEvent, handlersAndEvents.touch.moveHandler);
						ownerDocument.current?.removeEventListener(handlersAndEvents.touch.upEvent, handlersAndEvents.touch.moveHandler);
						dispatchEnd();
					}
				}
			};
			let events = isTouchEvent(e) ? handlersAndEvents.touch : handlersAndEvents.mouse;
			let passiveIfSupported = passiveEventSupported() ? { passive: false } : false;
			ownerDocument.current?.addEventListener(events.moveEvent, events.moveHandler, passiveIfSupported);
			ownerDocument.current?.addEventListener(events.upEvent, events.upHandler, passiveIfSupported);
			if (!isTouchEvent(e)) ownerDocument.current?.addEventListener("mouseleave", handlersAndEvents.mouse.upHandler, passiveIfSupported);
			dispatch({
				type: import_react_table$3.actions.columnStartResizing,
				columnId: header.id,
				columnWidth: getHeaderWidth(header),
				nextColumnWidth: getHeaderWidth(nextHeader),
				headerIdWidths,
				nextHeaderIdWidths,
				clientX
			});
		};
		return [props, {
			onClick: (e) => {
				e.stopPropagation();
			},
			onMouseDown: (e) => {
				e.persist();
				e.preventDefault();
				e.stopPropagation();
				onResizeStart(e, header);
			},
			onTouchStart: (e) => {
				e.persist();
				e.preventDefault();
				onResizeStart(e, header);
			},
			style: { cursor: "col-resize" },
			draggable: false,
			role: "separator"
		}];
	};
	useResizeColumns.pluginName = "useResizeColumns";
	reducer$2 = (newState, action, previousState, instance) => {
		if (action.type === import_react_table$3.actions.init) return {
			...newState,
			columnResizing: { columnWidths: {} }
		};
		if (action.type === import_react_table$3.actions.resetResize) return {
			...newState,
			columnResizing: { columnWidths: {} }
		};
		if (action.type === import_react_table$3.actions.columnStartResizing) {
			let { clientX, columnId, columnWidth, nextColumnWidth, headerIdWidths, nextHeaderIdWidths } = action;
			return {
				...newState,
				columnResizing: {
					...newState.columnResizing,
					startX: clientX,
					columnWidth,
					nextColumnWidth,
					headerIdWidths,
					nextHeaderIdWidths,
					isResizingColumn: columnId
				}
			};
		}
		if (action.type === import_react_table$3.actions.columnResizing) {
			let { clientX } = action;
			let { startX = 0, columnWidth = 1, nextColumnWidth = 1, headerIdWidths = [], nextHeaderIdWidths = [] } = newState.columnResizing;
			if (!instance) return newState;
			let deltaX = clientX - startX;
			let newColumnWidths = getColumnWidths(headerIdWidths, deltaX / columnWidth);
			let isTableWidthDecreasing = calculateTableWidth(newColumnWidths, instance.flatHeaders) < instance.tableWidth;
			let newNextColumnWidths = instance?.columnResizeMode === "fit" || instance?.columnResizeMode === "expand" && isTableWidthDecreasing ? getColumnWidths(nextHeaderIdWidths, -deltaX / nextColumnWidth) : {};
			if (!isNewColumnWidthsValid(newColumnWidths, instance.flatHeaders) || !isNewColumnWidthsValid(newNextColumnWidths, instance.flatHeaders) || !isNewTableWidthValid({
				...newColumnWidths,
				...newNextColumnWidths
			}, instance)) return newState;
			instance?.flatHeaders.forEach((h) => {
				if (!h.width) h.width = h.resizeWidth;
			});
			return {
				...newState,
				columnResizing: {
					...newState.columnResizing,
					columnWidths: {
						...newState.columnResizing.columnWidths,
						...newColumnWidths,
						...newNextColumnWidths
					}
				}
			};
		}
		if (action.type === import_react_table$3.actions.columnDoneResizing) return {
			...newState,
			columnResizing: {
				...newState.columnResizing,
				startX: void 0,
				isResizingColumn: void 0
			}
		};
		return newState;
	};
	getColumnWidths = (headerIdWidths, deltaPercentage) => {
		let columnWidths = {};
		headerIdWidths.forEach(([headerId, headerWidth]) => {
			columnWidths[headerId] = Math.max(headerWidth + headerWidth * deltaPercentage, 0);
		});
		return columnWidths;
	};
	isNewColumnWidthsValid = (columnWidths, headers) => {
		if (Object.values(columnWidths).some((width) => width <= 1)) return false;
		for (let [headerId, width] of Object.entries(columnWidths)) {
			let header = headers?.find((h) => h.id === headerId);
			if (!header) continue;
			let minWidth = header.minWidth || 0;
			let maxWidth = header.maxWidth || Infinity;
			if (width < minWidth || width > maxWidth) return false;
		}
		return true;
	};
	isNewTableWidthValid = (columnWidths, instance) => {
		if ("fit" === instance.columnResizeMode) return true;
		let newTableWidth = 0;
		for (let header of instance.flatHeaders) newTableWidth += columnWidths[header.id] ? columnWidths[header.id] : getHeaderWidth(header);
		if (Math.round(newTableWidth) < instance.tableWidth) return false;
		return true;
	};
	useInstanceBeforeDimensions = (instance) => {
		let { flatHeaders, getHooks, state: { columnResizing }, columnResizeMode } = instance;
		let getInstance = (0, import_react_table$3.useGetLatest)(instance);
		flatHeaders.forEach((header, index) => {
			header.width = columnResizing.columnWidths[header.id] || header.width || header.originalWidth;
			header.isResizing = columnResizing.isResizingColumn === header.id;
			let headerToResize = header.disableResizing && "fit" === columnResizeMode ? getPreviousResizableHeader(header, instance) : header;
			let nextResizableHeader = "expand" === columnResizeMode && index === flatHeaders.length - 1 ? getPreviousResizableHeader(header, instance) : getNextResizableHeader(header, instance);
			header.canResize = null != header.disableResizing ? !header.disableResizing : true;
			if ("fit" === columnResizeMode) header.isResizerVisible = header.canResize && !!nextResizableHeader || headerToResize && !!instance.flatHeaders[index + 1]?.canResize;
			else header.isResizerVisible = header.canResize && !!headerToResize;
			header.getResizerProps = (0, import_react_table$3.makePropGetter)(getHooks().getResizerProps, {
				instance: getInstance(),
				header: headerToResize,
				nextHeader: nextResizableHeader
			});
		});
	};
	getPreviousResizableHeader = (headerColumn, instance) => {
		let headersList = (headerColumn.parent?.columns || instance.flatHeaders).filter(({ isVisible }) => isVisible);
		let headerIndex = headersList.findIndex((h) => h.id === headerColumn.id);
		return [...headersList].slice(0, headerIndex).reverse().find((h) => !h.disableResizing);
	};
	getNextResizableHeader = (headerColumn, instance) => {
		let headersList = (headerColumn.parent?.columns || instance.flatHeaders).filter(({ isVisible }) => isVisible);
		let headerIndex = headersList.findIndex((h) => h.id === headerColumn.id);
		return [...headersList].slice(headerIndex + 1).find((h) => !h.disableResizing);
	};
	getHeaderWidth = (header) => {
		if (!header) return 0;
		return "string" == typeof header.width && Number.isNaN(Number(header.width)) ? Number(header.resizeWidth || 0) : Number(header.width || header.resizeWidth || 0);
	};
	calculateTableWidth = (columnWidths, headers) => {
		let newTableWidth = 0;
		for (let header of headers) newTableWidth += columnWidths[header.id] ? columnWidths[header.id] : getHeaderWidth(header);
		return newTableWidth;
	};
	passiveSupported = null;
	passiveEventSupported = () => {
		if (null != passiveSupported) return passiveSupported;
		try {
			window.addEventListener("test", () => {}, {
				once: true,
				get passive() {
					passiveSupported = true;
					return false;
				}
			});
		} catch {
			passiveSupported = false;
		}
		return passiveSupported;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/hooks/useColumnDragAndDrop.js
var import_react_table$2, leftClassName, rightClassName, REORDER_ACTIONS, useColumnDragAndDrop, defaultGetDragAndDropProps, reducer$1, useInstance$1;
var init_useColumnDragAndDrop = __esmMin((() => {
	import_react_table$2 = require_react_table();
	init_styles();
	leftClassName = u["iui-table-reorder-column-left"];
	rightClassName = u["iui-table-reorder-column-right"];
	REORDER_ACTIONS = {
		columnDragStart: "columnDragStart",
		columnDragEnd: "columnDragEnd"
	};
	useColumnDragAndDrop = (isEnabled) => (hooks) => {
		hooks.getDragAndDropProps = [defaultGetDragAndDropProps(isEnabled)];
		hooks.stateReducers.push(reducer$1);
		hooks.useInstance.push(useInstance$1);
	};
	defaultGetDragAndDropProps = (isEnabled) => (props, { instance, header }) => {
		if (!isEnabled || header.disableReordering) return props;
		let onDragStart = () => {
			instance.dispatch({
				type: REORDER_ACTIONS.columnDragStart,
				columnIndex: instance.flatHeaders.indexOf(header)
			});
		};
		let setOnDragColumnStyle = (event, position) => {
			let columnElement = event.currentTarget;
			if ("left" === position) {
				columnElement.classList.remove(rightClassName);
				columnElement.classList.add(leftClassName);
			} else if ("right" === position) {
				columnElement.classList.remove(leftClassName);
				columnElement.classList.add(rightClassName);
			} else {
				columnElement.classList.remove(leftClassName);
				columnElement.classList.remove(rightClassName);
			}
		};
		let reorderColumns = (tableColumns, srcIndex, dstIndex) => {
			let newTableColumns = [...tableColumns];
			let [removed] = newTableColumns.splice(srcIndex, 1);
			newTableColumns.splice(dstIndex, 0, removed);
			return newTableColumns;
		};
		let onDragOver = (event) => {
			event.preventDefault();
			let headerIndex = instance.flatHeaders.indexOf(header);
			if (instance.state.columnReorderStartIndex !== headerIndex) setOnDragColumnStyle(event, instance.state.columnReorderStartIndex > headerIndex ? "left" : "right");
		};
		let onDragLeave = (event) => {
			setOnDragColumnStyle(event);
		};
		let onDrop = (event) => {
			event.preventDefault();
			setOnDragColumnStyle(event);
			let columnIds = instance.allColumns.map((x) => x.id);
			let srcIndex = instance.state.columnReorderStartIndex;
			let dstIndex = columnIds.findIndex((x) => x === header.id);
			if (srcIndex === dstIndex || -1 === srcIndex || -1 === dstIndex) return;
			instance.setColumnOrder(reorderColumns(columnIds, srcIndex, dstIndex));
			instance.dispatch({
				type: REORDER_ACTIONS.columnDragEnd,
				columnIndex: -1
			});
		};
		return [props, {
			draggable: true,
			onDragStart,
			onDragOver,
			onDragLeave,
			onDrop
		}];
	};
	reducer$1 = (newState, action) => {
		switch (action.type) {
			case import_react_table$2.actions.init: return {
				...newState,
				columnReorderStartIndex: -1
			};
			case REORDER_ACTIONS.columnDragStart: return {
				...newState,
				columnReorderStartIndex: action.columnIndex
			};
			case REORDER_ACTIONS.columnDragEnd: return {
				...newState,
				columnReorderStartIndex: -1
			};
			default: return newState;
		}
	};
	useInstance$1 = (instance) => {
		let { flatHeaders, getHooks } = instance;
		let getInstance = (0, import_react_table$2.useGetLatest)(instance);
		flatHeaders.forEach((header) => {
			header.getDragAndDropProps = (0, import_react_table$2.makePropGetter)(getHooks().getDragAndDropProps, {
				instance: getInstance(),
				header
			});
		});
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/hooks/useScrollToRow.js
function useScrollToRow({ data, enableVirtualization, page, paginatorRenderer, scrollToRow }) {
	let rowRefs = import_react$8.useRef({});
	let pageRef = import_react$8.useRef(page);
	pageRef.current = page;
	let dataRef = import_react$8.useRef(data);
	dataRef.current = data;
	let scrollToIndex = import_react$8.useMemo(() => {
		if (!scrollToRow || paginatorRenderer) return;
		let index = scrollToRow(pageRef.current, dataRef.current);
		return index < 0 ? void 0 : index;
	}, [paginatorRenderer, scrollToRow]);
	import_react$8.useEffect(() => {
		if (enableVirtualization || null == scrollToIndex || scrollToIndex < 0) return;
		rowRefs.current[pageRef.current[scrollToIndex]?.id]?.scrollIntoView();
	}, [enableVirtualization, scrollToIndex]);
	return {
		scrollToIndex,
		tableRowRef: import_react$8.useCallback((row) => (element) => {
			rowRefs.current[row.id] = element;
		}, [])
	};
}
var import_react$8;
var init_useScrollToRow = __esmMin((() => {
	import_react$8 = /* @__PURE__ */ __toESM(require_react(), 1);
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/hooks/useStickyColumns.js
var import_react_table$1, useStickyColumns, reducer, useInstance;
var init_useStickyColumns = __esmMin((() => {
	import_react_table$1 = require_react_table();
	import_react_table$1.actions.setScrolledLeft = "setScrolledLeft";
	import_react_table$1.actions.setScrolledRight = "setScrolledRight";
	useStickyColumns = (hooks) => {
		hooks.stateReducers.push(reducer);
		hooks.useInstance.push(useInstance);
	};
	reducer = (newState, action) => {
		if (action.type === import_react_table$1.actions.init) return {
			...newState,
			sticky: {}
		};
		if (action.type === import_react_table$1.actions.setScrolledLeft && newState.sticky?.isScrolledToLeft !== action.value) return {
			...newState,
			sticky: {
				...newState.sticky,
				isScrolledToLeft: action.value
			}
		};
		if (action.type === import_react_table$1.actions.setScrolledRight && newState.sticky?.isScrolledToRight !== action.value) return {
			...newState,
			sticky: {
				...newState.sticky,
				isScrolledToRight: action.value
			}
		};
		return newState;
	};
	useInstance = (instance) => {
		let { flatHeaders } = instance;
		flatHeaders.forEach((header) => {
			if (!header.originalSticky) header.originalSticky = header.sticky ?? "none";
			header.sticky = "none" === header.originalSticky ? void 0 : header.originalSticky;
		});
		let hasLeftStickyColumn = false;
		[...flatHeaders].reverse().forEach((header) => {
			if ("left" === header.sticky) hasLeftStickyColumn = true;
			if (hasLeftStickyColumn) header.sticky = "left";
		});
		let hasRightStickyColumn = false;
		flatHeaders.forEach((header) => {
			if ("right" === header.sticky) hasRightStickyColumn = true;
			if (hasRightStickyColumn) header.sticky = "right";
		});
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/hooks/index.js
var init_hooks = __esmMin((() => {
	init_useExpanderCell();
	init_useSelectionCell();
	init_useSubRowFiltering();
	init_useSubRowSelection();
	init_useResizeColumns();
	init_useColumnDragAndDrop();
	init_useScrollToRow();
	init_useStickyColumns();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/actionHandlers/expandHandler.js
var onExpandHandler;
var init_expandHandler = __esmMin((() => {
	onExpandHandler = (newState, instance, onExpand) => {
		if (!instance?.preFilteredFlatRows.length) return void onExpand?.([], newState);
		let expandedData = [];
		instance.preFilteredFlatRows.forEach((row) => {
			if (newState.expanded[row.id]) expandedData.push(row.original);
		});
		onExpand?.(expandedData, newState);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/actionHandlers/filterHandler.js
var onFilterHandler;
var init_filterHandler = __esmMin((() => {
	onFilterHandler = (newState, action, previousState, currentFilter, instance) => {
		if (previousState.filters.find((f) => f.id === action.columnId)?.value != action.filterValue) return newState.filters.map((f) => {
			let column = instance?.allColumns.find((c) => c.id === f.id);
			return {
				id: f.id,
				value: f.value,
				fieldType: column?.fieldType ?? "text",
				filterType: column?.filter ?? "text"
			};
		});
		return currentFilter;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/actionHandlers/selectHandler.js
var onSelectHandler, onToggleHandler, onSingleSelectHandler, onShiftSelectHandler, getSelectedData;
var init_selectHandler = __esmMin((() => {
	init_Table$1();
	onSelectHandler = (newState, instance, onSelect, isRowDisabled) => {
		if (!instance?.rows.length) return void onSelect?.([], newState);
		let newSelectedRowIds = {};
		let handleRow = (row) => {
			if (isRowDisabled?.(row.original)) return false;
			let hasSubComponents = !!row.initialSubRows[0]?.original[iuiId];
			let hasSubRows = row.subRows.length > 0 && !hasSubComponents;
			let isAllSubSelected = true;
			if (hasSubRows) row.initialSubRows.forEach((subRow) => {
				if (!handleRow(subRow)) isAllSubSelected = false;
			});
			if (newState.selectedRowIds[row.id] && (!instance.selectSubRows || !hasSubRows) || hasSubRows && isAllSubSelected) newSelectedRowIds[row.id] = true;
			return !!newSelectedRowIds[row.id];
		};
		instance.initialRows.forEach((row) => handleRow(row));
		let selectedData = getSelectedData(newSelectedRowIds, instance);
		newState.selectedRowIds = newSelectedRowIds;
		onSelect?.(selectedData, newState);
	};
	onToggleHandler = (newState, action, instance, onSelect, isRowDisabled) => {
		onSelectHandler(newState, instance, onSelect, isRowDisabled);
		newState.lastSelectedRowId = action.id;
	};
	onSingleSelectHandler = (state, action, instance, onSelect, isRowDisabled) => {
		let selectedRowIds = { [action.id]: true };
		if (instance?.selectSubRows) {
			let handleRow = (row) => {
				selectedRowIds[row.id] = true;
				row.subRows.forEach((r) => handleRow(r));
			};
			handleRow(instance.rowsById[action.id]);
		}
		let newState = {
			...state,
			lastSelectedRowId: action.id,
			selectedRowIds
		};
		onSelectHandler(newState, instance, onSelect, isRowDisabled);
		return newState;
	};
	onShiftSelectHandler = (state, action, instance, onSelect, isRowDisabled) => {
		if (null == instance) return state;
		let startIndex = Math.max(0, instance.flatRows.findIndex((row) => row.id === state.lastSelectedRowId));
		let endIndex = Math.max(0, instance.flatRows.findIndex((row) => row.id === action.id));
		if (startIndex > endIndex) {
			let temp = startIndex;
			startIndex = endIndex;
			endIndex = temp;
		}
		let isLastSelectedRowIdSelected = null == state.lastSelectedRowId || !!state.selectedRowIds[state.lastSelectedRowId];
		let selectedRowIds = action.ctrlPressed ? { ...state.selectedRowIds } : {};
		instance.flatRows.slice(startIndex, endIndex + 1).forEach((r) => selectedRowIds[r.id] = isLastSelectedRowIdSelected);
		let handleRow = (row) => {
			selectedRowIds[row.id] = isLastSelectedRowIdSelected;
			row.subRows.forEach((r) => handleRow(r));
		};
		handleRow(instance.flatRows[endIndex]);
		let newState = {
			...state,
			selectedRowIds
		};
		onSelectHandler(newState, instance, onSelect, isRowDisabled);
		return newState;
	};
	getSelectedData = (selectedRowIds, instance) => {
		let selectedData = [];
		let setSelectedData = (row) => {
			if (selectedRowIds[row.id]) selectedData.push(row.original);
			row.initialSubRows.forEach((subRow) => setSelectedData(subRow));
		};
		instance?.initialRows.forEach((row) => setSelectedData(row));
		return selectedData;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/actionHandlers/resizeHandler.js
var onTableResizeStart, onTableResizeEnd;
var init_resizeHandler = __esmMin((() => {
	onTableResizeStart = (state) => ({
		...state,
		isTableResizing: true
	});
	onTableResizeEnd = (state, action) => ({
		...state,
		isTableResizing: false,
		columnResizing: {
			...state.columnResizing,
			columnWidths: { ...action.columnWidths }
		}
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/actionHandlers/index.js
var init_actionHandlers = __esmMin((() => {
	init_expandHandler();
	init_filterHandler();
	init_selectHandler();
	init_resizeHandler();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/filters/FilterToggle.js
var import_react$7, import_classnames$7, FilterToggle;
var init_FilterToggle = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$7 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	init_IconButton();
	init_Popover();
	FilterToggle = (props) => {
		let { column, className, ...rest } = props;
		useGlobals();
		let [isVisible, setIsVisible] = import_react$7.useState(false);
		let close = import_react$7.useCallback(() => setIsVisible(false), []);
		let setFilter = import_react$7.useCallback((filterValue) => {
			column.setFilter(filterValue);
			close();
		}, [close, column]);
		let clearFilter = import_react$7.useCallback(() => {
			column.setFilter(void 0);
			close();
		}, [close, column]);
		let isColumnFiltered = null != column.filterValue && "" !== column.filterValue;
		return import_react$7.createElement(import_react$7.Fragment, null, column.canFilter && column.Filter && import_react$7.createElement(Popover, {
			content: column.render("Filter", {
				close,
				setFilter,
				clearFilter
			}),
			placement: "bottom-start",
			visible: isVisible,
			onVisibleChange: setIsVisible,
			closeOnOutsideClick: true,
			applyBackground: true
		}, import_react$7.createElement(IconButton, {
			styleType: "borderless",
			isActive: isVisible || isColumnFiltered,
			className: (0, import_classnames$7.default)("iui-table-filter-button", className),
			"aria-label": "Filter",
			onClick: (e) => {
				e.stopPropagation();
			},
			"data-iui-shift": "left",
			...rest
		}, isColumnFiltered ? import_react$7.createElement(SvgFilter, null) : import_react$7.createElement(SvgFilterHollow, null))));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/ColumnHeader.js
var import_react$6, import_classnames$6, ColumnHeader;
var init_ColumnHeader = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	init_FilterToggle();
	init_utils();
	import_classnames$6 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	ColumnHeader = import_react$6.forwardRef((props, forwardedRef) => {
		let { column, areFiltersSet, isResizable, columnResizeMode, enableColumnReordering, density, columnHasExpanders, isLast, isTableEmpty, ...rest } = props;
		let isHeaderDirectClick = import_react$6.useRef(false);
		let instance = import_react$6.useContext(TableInstanceContext);
		let COLUMN_MIN_WIDTHS = {
			default: 72,
			withExpander: 108
		};
		let showFilterButton = (column) => (!isTableEmpty || areFiltersSet) && column.canFilter && !!column.Filter;
		let showSortButton = (column) => !isTableEmpty && column.canSort;
		let { onClick, ...restSortProps } = column.getSortByToggleProps();
		if ([void 0, 0].includes(column.minWidth)) {
			column.minWidth = columnHasExpanders ? COLUMN_MIN_WIDTHS.withExpander : COLUMN_MIN_WIDTHS.default;
			if ("number" == typeof column.width && column.minWidth > column.width) column.minWidth = column.width;
		}
		let columnProps = column.getHeaderProps({
			...restSortProps,
			className: (0, import_classnames$6.default)("iui-table-cell", {
				"iui-actionable": column.canSort,
				"iui-sorted": column.isSorted,
				"iui-table-cell-sticky": !!column.sticky
			}, column.columnClassName),
			style: {
				...getCellStyle(column, !!instance?.state.isTableResizing),
				...columnHasExpanders && getSubRowStyle({ density }),
				...getStickyStyle(column, instance?.visibleColumns ?? []),
				flexWrap: "wrap",
				columnGap: "var(--iui-size-xs)"
			}
		});
		return import_react$6.createElement(Box, {
			...columnProps,
			...rest,
			key: columnProps.key,
			title: void 0,
			ref: useMergedRefs(import_react$6.useCallback((el) => {
				if (el) column.resizeWidth = el.getBoundingClientRect().width;
			}, [column]), forwardedRef),
			onMouseDown: () => {
				isHeaderDirectClick.current = true;
			},
			onClick: (e) => {
				if (isHeaderDirectClick.current) {
					onClick?.(e);
					isHeaderDirectClick.current = false;
				}
			},
			tabIndex: showSortButton(column) ? 0 : void 0,
			onKeyDown: (e) => {
				if ("Enter" == e.key && showSortButton(column)) column.toggleSortBy();
			}
		}, import_react$6.createElement(import_react$6.Fragment, null, "string" == typeof column.Header ? import_react$6.createElement(ShadowRoot$1, { css: lineClamp.css }, import_react$6.createElement("div", { className: lineClamp.className }, import_react$6.createElement("slot", null)), import_react$6.createElement("slot", { name: "actions" }), import_react$6.createElement("slot", { name: "resizers" }), import_react$6.createElement("slot", { name: "shadows" })) : null, column.render("Header"), (showFilterButton(column) || showSortButton(column)) && import_react$6.createElement(Box, {
			className: "iui-table-header-actions-container",
			onKeyDown: (e) => e.stopPropagation(),
			slot: "actions"
		}, showFilterButton(column) && import_react$6.createElement(FilterToggle, { column }), showSortButton(column) && import_react$6.createElement(Box, { className: "iui-table-cell-end-icon" }, column.isSortedDesc || !column.isSorted && column.sortDescFirst ? import_react$6.createElement(SvgSortDown, {
			className: "iui-table-sort",
			"aria-hidden": true
		}) : import_react$6.createElement(SvgSortUp, {
			className: "iui-table-sort",
			"aria-hidden": true
		}))), isResizable && column.isResizerVisible && (!isLast || "expand" === columnResizeMode) && import_react$6.createElement(Box, {
			...column.getResizerProps(),
			className: "iui-table-resizer",
			slot: "resizers"
		}, import_react$6.createElement(Box, { className: "iui-table-resizer-bar" })), enableColumnReordering && !column.disableReordering && import_react$6.createElement(Box, {
			className: "iui-table-reorder-bar",
			slot: "resizers"
		}), "left" === column.sticky && instance?.state.sticky.isScrolledToRight && import_react$6.createElement(Box, {
			className: "iui-table-cell-shadow-right",
			slot: "shadows"
		}), "right" === column.sticky && instance?.state.sticky.isScrolledToLeft && import_react$6.createElement(Box, {
			className: "iui-table-cell-shadow-left",
			slot: "shadows"
		})));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/TableExpandableContentMemoized.js
var import_classnames$5, import_react$5, TableExpandableContent, TableExpandableContentMemoized;
var init_TableExpandableContentMemoized = __esmMin((() => {
	import_classnames$5 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react$5 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_utils$1();
	TableExpandableContent = import_react$5.forwardRef((props, ref) => {
		let { children, className, style, isDisabled, virtualItem, ...rest } = props;
		return import_react$5.createElement(Box, {
			className: (0, import_classnames$5.default)("iui-table-row", "iui-table-expanded-content", className),
			style: {
				flex: "0 0 auto",
				minWidth: "100%",
				...null != virtualItem ? { transform: `translateY(${virtualItem.start}px)` } : {},
				...style
			},
			"aria-disabled": isDisabled,
			"data-iui-index": virtualItem?.index,
			...null != virtualItem && { "data-iui-virtualizer": "item" },
			ref,
			...rest
		}, children);
	});
	TableExpandableContentMemoized = import_react$5.memo(TableExpandableContent);
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/Table.js
var import_react$4, import_classnames$4, import_react_table, singleRowSelectedAction, shiftRowSelectedAction, tableResizeStartAction, tableResizeEndAction, iuiId, flattenColumns, Table, TableBodyExtraWrapper, TableEmptyWrapper;
var init_Table$1 = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$4 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react_table = require_react_table();
	init_ProgressRadial();
	init_utils$1();
	init_utils();
	init_TableRowMemoized();
	init_customFilterFunctions();
	init_hooks();
	init_actionHandlers();
	init_columns();
	init_ColumnHeader();
	init_TableExpandableContentMemoized();
	init_VisuallyHidden();
	singleRowSelectedAction = "singleRowSelected";
	shiftRowSelectedAction = "shiftRowSelected";
	tableResizeStartAction = "tableResizeStart";
	tableResizeEndAction = "tableResizeEnd";
	iuiId = Symbol("iui-id");
	flattenColumns = (columns) => {
		let flatColumns = [];
		columns.forEach((column) => {
			flatColumns.push(column);
			if ("columns" in column) flatColumns.push(...flattenColumns(column.columns));
		});
		return flatColumns;
	};
	Table = (props) => {
		let { data, columns, isLoading = false, emptyTableContent, className, style, id, isSelectable = false, onSelect, onRowClick, selectionMode = "multi", isSortable = false, onSort, stateReducer, onBottomReached, onRowInViewport, intersectionMargin = 300, subComponent, onExpand, onFilter, globalFilterValue, emptyFilteredTableContent, filterTypes: filterFunctions, expanderCell, isRowDisabled, rowProps, density = "default", selectSubRows = true, getSubRows, selectRowOnClick = true, paginatorRenderer, pageSize = 25, isResizable = false, columnResizeMode = "fit", styleType = "default", enableVirtualization = false, enableColumnReordering = false, headerWrapperProps, headerProps, bodyProps, tableProps, emptyTableContentProps, getRowId, caption = "Table", role, scrollToRow, useControlledState, autoResetExpanded, autoResetFilters, autoResetGlobalFilter, autoResetHiddenColumns, autoResetPage, autoResetResize, autoResetSelectedRows, autoResetSortBy, defaultCanFilter, defaultCanSort, defaultColumn: defaultColumnProp, disableFilters, disableGlobalFilter, disableMultiSort, disableSortRemove, disabledMultiRemove, expandSubRows, globalFilter, initialState, isMultiSortEvent, manualExpandedKey, manualFilters, manualGlobalFilter, manualRowSelectedKey, manualSortBy, maxMultiSortColCount, orderByFn, pageCount, sortTypes, manualPagination, paginateExpandedRows, ..._rest } = props;
		let { ariaRestAttributes, nonAriaRestAttributes } = import_react$4.useMemo(() => Object.entries(_rest).reduce((result, [key, value]) => {
			if (key.startsWith("aria-")) result.ariaRestAttributes[key] = value;
			else result.nonAriaRestAttributes[key] = value;
			return result;
		}, {
			ariaRestAttributes: {},
			nonAriaRestAttributes: {}
		}), [_rest]);
		let { outerAriaRestAttributes, innerAriaRestAttributes } = import_react$4.useMemo(() => {
			if (tableProps || role) return {
				outerAriaRestAttributes: { ...ariaRestAttributes },
				innerAriaRestAttributes: {}
			};
			return {
				outerAriaRestAttributes: {},
				innerAriaRestAttributes: { ...ariaRestAttributes }
			};
		}, [
			ariaRestAttributes,
			role,
			tableProps
		]);
		useGlobals();
		let ownerDocument = import_react$4.useRef(void 0);
		let defaultColumn = import_react$4.useMemo(() => ({
			maxWidth: 0,
			minWidth: 0,
			width: 0,
			...defaultColumnProp
		}), [defaultColumnProp]);
		let rowHeight = import_react$4.useMemo(() => {
			if ("condensed" === density) return 50;
			if ("extra-condensed" === density) return 38;
			return 62;
		}, [density]);
		let onBottomReachedRef = useLatestRef$2(onBottomReached);
		let onRowInViewportRef = useLatestRef$2(onRowInViewport);
		let hasManualSelectionColumn = import_react$4.useMemo(() => {
			return flattenColumns(columns).some((column) => column.id === SELECTION_CELL_ID);
		}, [columns]);
		let disableUserSelect = import_react$4.useCallback((e) => {
			if ("Shift" === e.key) ownerDocument.current && (ownerDocument.current.documentElement.style.userSelect = "none");
		}, []);
		let enableUserSelect = import_react$4.useCallback((e) => {
			if ("Shift" === e.key) ownerDocument.current && (ownerDocument.current.documentElement.style.userSelect = "");
		}, []);
		import_react$4.useEffect(() => {
			if (!isSelectable || "multi" !== selectionMode) return;
			let ownerDoc = ownerDocument.current;
			ownerDoc?.addEventListener("keydown", disableUserSelect);
			ownerDoc?.addEventListener("keyup", enableUserSelect);
			return () => {
				ownerDoc?.removeEventListener("keydown", disableUserSelect);
				ownerDoc?.removeEventListener("keyup", enableUserSelect);
			};
		}, [
			isSelectable,
			selectionMode,
			ownerDocument,
			disableUserSelect,
			enableUserSelect
		]);
		let previousFilter = import_react$4.useRef([]);
		let currentFilter = import_react$4.useRef(previousFilter.current);
		let tableStateReducer = import_react$4.useCallback((newState, action, previousState, instance) => {
			switch (action.type) {
				case import_react_table.actions.toggleSortBy:
					onSort?.(newState);
					break;
				case import_react_table.actions.setFilter:
					currentFilter.current = onFilterHandler(newState, action, previousState, currentFilter.current, instance);
					break;
				case import_react_table.actions.toggleRowExpanded:
				case import_react_table.actions.toggleAllRowsExpanded:
					onExpandHandler(newState, instance, onExpand);
					break;
				case singleRowSelectedAction:
					newState = onSingleSelectHandler(newState, action, instance, onSelect, hasManualSelectionColumn ? void 0 : isRowDisabled);
					break;
				case shiftRowSelectedAction:
					newState = onShiftSelectHandler(newState, action, instance, onSelect, hasManualSelectionColumn ? void 0 : isRowDisabled);
					break;
				case import_react_table.actions.toggleRowSelected:
				case import_react_table.actions.toggleAllRowsSelected:
				case import_react_table.actions.toggleAllPageRowsSelected:
					onToggleHandler(newState, action, instance, onSelect, hasManualSelectionColumn ? void 0 : isRowDisabled);
					break;
				case tableResizeStartAction:
					newState = onTableResizeStart(newState);
					break;
				case tableResizeEndAction:
					newState = onTableResizeEnd(newState, action);
					break;
				default: break;
			}
			return stateReducer ? stateReducer(newState, action, previousState, instance) : newState;
		}, [
			hasManualSelectionColumn,
			isRowDisabled,
			onExpand,
			onSelect,
			onSort,
			stateReducer
		]);
		let filterTypes = import_react$4.useMemo(() => ({
			...customFilterFunctions,
			...filterFunctions
		}), [filterFunctions]);
		let hasAnySubRows = import_react$4.useMemo(() => data.some((item, index) => getSubRows ? getSubRows(item, index) : item.subRows), [data, getSubRows]);
		let getSubRowsWithSubComponents = import_react$4.useCallback((originalRow, relativeIndex) => {
			if (originalRow[iuiId]) return [];
			if (originalRow.subRows) return originalRow.subRows;
			return [{
				[iuiId]: `subcomponent-${relativeIndex}`,
				...originalRow
			}];
		}, []);
		let getRowIdWithSubComponents = import_react$4.useCallback((originalRow, relativeIndex, parent) => {
			let defaultRowId = parent ? `${parent.id}.${relativeIndex}` : `${relativeIndex}`;
			let rowIdFromUser = getRowId?.(originalRow, relativeIndex, parent);
			if (void 0 !== rowIdFromUser && originalRow[iuiId]) return `${rowIdFromUser}-${defaultRowId}`;
			return rowIdFromUser ?? defaultRowId;
		}, [getRowId]);
		let instance = (0, import_react_table.useTable)({
			manualPagination: manualPagination ?? !paginatorRenderer,
			paginateExpandedRows: paginateExpandedRows ?? false,
			useControlledState,
			autoResetExpanded,
			autoResetFilters,
			autoResetGlobalFilter,
			autoResetHiddenColumns,
			autoResetPage,
			autoResetResize,
			autoResetSelectedRows,
			autoResetSortBy,
			defaultCanFilter,
			defaultCanSort,
			disableFilters,
			disableGlobalFilter,
			disableMultiSort,
			disableSortRemove,
			disabledMultiRemove,
			expandSubRows,
			globalFilter,
			isMultiSortEvent,
			manualExpandedKey,
			manualFilters,
			manualGlobalFilter,
			manualRowSelectedKey,
			manualSortBy,
			maxMultiSortColCount,
			orderByFn,
			pageCount: pageCount ?? -1,
			sortTypes,
			columns,
			defaultColumn,
			disableSortBy: !isSortable,
			stateReducer: tableStateReducer,
			filterTypes,
			selectSubRows,
			data,
			getSubRows: subComponent ? getSubRowsWithSubComponents : getSubRows,
			initialState: {
				pageSize,
				...initialState
			},
			columnResizeMode,
			getRowId: subComponent ? getRowIdWithSubComponents : getRowId
		}, import_react_table.useFlexLayout, useResizeColumns(ownerDocument), import_react_table.useFilters, useSubRowFiltering(hasAnySubRows), import_react_table.useGlobalFilter, import_react_table.useSortBy, import_react_table.useExpanded, import_react_table.usePagination, import_react_table.useRowSelect, useSubRowSelection, useExpanderCell(subComponent, expanderCell, isRowDisabled), useSelectionCell(isSelectable, selectionMode, isRowDisabled, density), import_react_table.useColumnOrder, useColumnDragAndDrop(enableColumnReordering), useStickyColumns);
		let { getTableProps, rows, headerGroups: _headerGroups, getTableBodyProps, prepareRow, state, allColumns, dispatch, page, gotoPage, setPageSize, flatHeaders, setGlobalFilter } = instance;
		let headerGroups = _headerGroups;
		useWarningLogger();
		if (1 === columns.length && "columns" in columns[0]) headerGroups = _headerGroups.slice(1);
		let areFiltersSet = allColumns.some((column) => null != column.filterValue && "" !== column.filterValue) || !!globalFilterValue;
		let onRowClickHandler = import_react$4.useCallback((event, row) => {
			let isDisabled = isRowDisabled?.(row.original);
			let ctrlPressed = event.ctrlKey || event.metaKey;
			if (!isDisabled) onRowClick?.(event, row);
			if (isSelectable && !isDisabled && selectRowOnClick && !event.isDefaultPrevented()) if ("multi" === selectionMode && event.shiftKey) dispatch({
				type: shiftRowSelectedAction,
				id: row.id,
				ctrlPressed
			});
			else if (row.isSelected || "single" !== selectionMode && ctrlPressed) row.toggleRowSelected(!row.isSelected);
			else dispatch({
				type: singleRowSelectedAction,
				id: row.id
			});
		}, [
			isRowDisabled,
			isSelectable,
			selectRowOnClick,
			selectionMode,
			dispatch,
			onRowClick
		]);
		import_react$4.useEffect(() => {
			setGlobalFilter(globalFilterValue);
		}, [globalFilterValue, setGlobalFilter]);
		import_react$4.useEffect(() => {
			setPageSize(pageSize);
		}, [pageSize, setPageSize]);
		import_react$4.useEffect(() => {
			if (previousFilter.current !== currentFilter.current) {
				previousFilter.current = currentFilter.current;
				onFilter?.(currentFilter.current, state, instance.filteredRows);
			}
		}, [
			state,
			instance.filteredRows,
			onFilter
		]);
		let lastPassedColumns = import_react$4.useRef([]);
		import_react$4.useEffect(() => {
			if (lastPassedColumns.current.length > 0 && JSON.stringify(lastPassedColumns.current) !== JSON.stringify(columns)) instance.setColumnOrder([]);
			lastPassedColumns.current = columns;
		}, [columns, instance]);
		let paginatorRendererProps = import_react$4.useMemo(() => ({
			currentPage: state.pageIndex,
			pageSize: state.pageSize,
			totalRowsCount: rows.length,
			size: "default" !== density ? "small" : "default",
			isLoading,
			onPageChange: gotoPage,
			onPageSizeChange: setPageSize,
			totalSelectedRowsCount: "single" === selectionMode ? 0 : instance.selectedFlatRows.length
		}), [
			density,
			gotoPage,
			isLoading,
			rows.length,
			setPageSize,
			state.pageIndex,
			state.pageSize,
			instance.selectedFlatRows,
			selectionMode
		]);
		let tableRef = import_react$4.useRef(null);
		let { scrollToIndex, tableRowRef } = useScrollToRow({
			...props,
			scrollToRow,
			page
		});
		let columnRefs = import_react$4.useRef({});
		let previousTableWidth = import_react$4.useRef(0);
		let [resizeRef] = useResizeObserver(import_react$4.useCallback(({ width }) => {
			if (!isResizable) return;
			instance.tableWidth = width;
			if (width === previousTableWidth.current) return;
			previousTableWidth.current = width;
			flatHeaders.forEach((header) => {
				if (columnRefs.current[header.id]) header.resizeWidth = columnRefs.current[header.id].getBoundingClientRect().width;
			});
			if (0 === Object.keys(state.columnResizing.columnWidths).length) return;
			dispatch({ type: tableResizeStartAction });
		}, [
			dispatch,
			state.columnResizing.columnWidths,
			flatHeaders,
			instance,
			isResizable
		]));
		useIsomorphicLayoutEffect$1(() => {
			if (state.isTableResizing) {
				let newColumnWidths = {};
				flatHeaders.forEach((column) => {
					if (columnRefs.current[column.id]) newColumnWidths[column.id] = columnRefs.current[column.id].getBoundingClientRect().width;
				});
				dispatch({
					type: tableResizeEndAction,
					columnWidths: newColumnWidths
				});
			}
		});
		let { virtualizer, css: virtualizerCss } = useVirtualScroll({
			enabled: enableVirtualization,
			count: page.length,
			getScrollElement: () => tableRef.current,
			estimateSize: () => rowHeight,
			getItemKey: import_react$4.useCallback((index) => page[index].id, [page]),
			overscan: 1
		});
		useIsomorphicLayoutEffect$1(() => {
			if (scrollToIndex) virtualizer.scrollToIndex(scrollToIndex, { align: "start" });
		}, [virtualizer, scrollToIndex]);
		let getPreparedRow = import_react$4.useCallback((index, virtualItem, virtualizer) => {
			let row = page[index];
			prepareRow(row);
			if (!!row.original[iuiId] && !!subComponent) return import_react$4.createElement(TableExpandableContentMemoized, {
				key: row.getRowProps().key,
				virtualItem,
				ref: enableVirtualization ? virtualizer?.measureElement : tableRowRef(row),
				isDisabled: !!isRowDisabled?.(row.original)
			}, subComponent(row));
			return import_react$4.createElement(TableRowMemoized, {
				row,
				rowProps,
				isLast: index === page.length - 1,
				onRowInViewport: onRowInViewportRef,
				onBottomReached: onBottomReachedRef,
				intersectionMargin,
				state,
				key: row.getRowProps().key,
				onClick: onRowClickHandler,
				subComponent,
				isDisabled: !!isRowDisabled?.(row.original),
				tableHasSubRows: hasAnySubRows,
				tableInstance: instance,
				expanderCell,
				scrollContainerRef: tableRef.current,
				tableRowRef: enableVirtualization ? void 0 : tableRowRef(row),
				density,
				virtualItem,
				virtualizer
			});
		}, [
			page,
			prepareRow,
			subComponent,
			rowProps,
			onRowInViewportRef,
			onBottomReachedRef,
			intersectionMargin,
			state,
			onRowClickHandler,
			isRowDisabled,
			hasAnySubRows,
			instance,
			expanderCell,
			enableVirtualization,
			tableRowRef,
			density
		]);
		let updateStickyState = () => {
			if (!tableRef.current || flatHeaders.every((header) => !header.sticky)) return;
			0 !== tableRef.current.scrollLeft ? dispatch({
				type: import_react_table.actions.setScrolledRight,
				value: true
			}) : dispatch({
				type: import_react_table.actions.setScrolledRight,
				value: false
			});
			tableRef.current.scrollLeft !== tableRef.current.scrollWidth - tableRef.current.clientWidth ? dispatch({
				type: import_react_table.actions.setScrolledLeft,
				value: true
			}) : dispatch({
				type: import_react_table.actions.setScrolledLeft,
				value: false
			});
		};
		import_react$4.useEffect(() => {
			updateStickyState();
		}, []);
		let captionId = useId$1();
		return import_react$4.createElement(TableInstanceContext.Provider, { value: instance }, import_react$4.createElement(Box, {
			ref: useMergedRefs(tableRef, resizeRef, import_react$4.useCallback((element) => {
				ownerDocument.current = element?.ownerDocument;
			}, [])),
			id,
			...getTableProps({
				className: (0, import_classnames$4.default)("iui-table", className),
				style: {
					minWidth: 0,
					...style
				}
			}),
			role,
			onScroll: () => updateStickyState(),
			"data-iui-size": "default" === density ? void 0 : density,
			...outerAriaRestAttributes,
			...nonAriaRestAttributes
		}, import_react$4.createElement(ShadowRoot$1, null, import_react$4.createElement("div", {
			role: "table",
			...innerAriaRestAttributes,
			...tableProps,
			"aria-labelledby": captionId
		}, import_react$4.createElement(VisuallyHidden, { id: captionId }, caption), import_react$4.createElement("slot", { name: "iui-table-header-wrapper" }), import_react$4.createElement("slot", { name: "iui-table-body" })), import_react$4.createElement("slot", { name: "iui-table-body-extra" }), import_react$4.createElement("slot", null)), headerGroups.map((headerGroup) => {
			headerGroup.headers = headerGroup.headers.filter((header) => !header.id.includes("iui-table-checkbox-selector_placeholder") && !header.id.includes("iui-table-expander_placeholder"));
			let headerGroupProps = headerGroup.getHeaderGroupProps({ className: "iui-table-row" });
			return import_react$4.createElement(Box, {
				slot: "iui-table-header-wrapper",
				as: "div",
				key: headerGroupProps.key,
				...headerWrapperProps,
				className: (0, import_classnames$4.default)("iui-table-header-wrapper", headerWrapperProps?.className)
			}, import_react$4.createElement(Box, {
				as: "div",
				...headerProps,
				className: (0, import_classnames$4.default)("iui-table-header", headerProps?.className)
			}, import_react$4.createElement(Box, {
				...headerGroupProps,
				key: headerGroupProps.key
			}, headerGroup.headers.map((column, index) => {
				let dragAndDropProps = column.getDragAndDropProps();
				return import_react$4.createElement(ColumnHeader, {
					...dragAndDropProps,
					key: dragAndDropProps.key || column.id || index,
					column,
					areFiltersSet,
					columnHasExpanders: hasAnySubRows && index === headerGroup.headers.findIndex((c) => c.id !== "iui-table-checkbox-selector"),
					isLast: index === headerGroup.headers.length - 1,
					isTableEmpty: 0 === data.length,
					isResizable,
					columnResizeMode,
					enableColumnReordering,
					density,
					ref: (el) => {
						if (el) columnRefs.current[column.id] = el;
					}
				});
			}))));
		}), import_react$4.createElement(Box, {
			slot: "iui-table-body",
			as: "div",
			...bodyProps,
			...getTableBodyProps({ className: (0, import_classnames$4.default)("iui-table-body", { "iui-zebra-striping": "zebra-rows" === styleType }, bodyProps?.className) }),
			role: void 0
		}, import_react$4.createElement(ShadowRoot$1, {
			css: virtualizerCss,
			flush: false
		}, enableVirtualization && 0 !== data.length ? import_react$4.createElement("div", {
			"data-iui-virtualizer": "root",
			style: { minBlockSize: virtualizer.getTotalSize() }
		}, import_react$4.createElement("slot", null)) : import_react$4.createElement("slot", null)), 0 !== data.length && import_react$4.createElement(import_react$4.Fragment, null, enableVirtualization ? virtualizer.getVirtualItems().map((virtualItem) => getPreparedRow(virtualItem.index, virtualItem, virtualizer)) : page.map((_, index) => getPreparedRow(index)))), isLoading && 0 === data.length && import_react$4.createElement(TableBodyExtraWrapper, null, import_react$4.createElement(TableEmptyWrapper, emptyTableContentProps, import_react$4.createElement(ProgressRadial, { indeterminate: true }))), !isLoading && 0 === data.length && !areFiltersSet && import_react$4.createElement(TableBodyExtraWrapper, null, import_react$4.createElement(TableEmptyWrapper, emptyTableContentProps, import_react$4.createElement("div", null, emptyTableContent))), !isLoading && (0 === data.length || 0 === rows.length) && areFiltersSet && import_react$4.createElement(TableBodyExtraWrapper, null, import_react$4.createElement(TableEmptyWrapper, emptyTableContentProps, import_react$4.createElement("div", null, emptyFilteredTableContent))), isLoading && 0 !== data.length && import_react$4.createElement(TableBodyExtraWrapper, { "data-iui-loading": "true" }, import_react$4.createElement(ProgressRadial, {
			indeterminate: true,
			size: "small"
		})), paginatorRenderer?.(paginatorRendererProps)));
	};
	TableBodyExtraWrapper = import_react$4.forwardRef((props, ref) => {
		let { children, ...rest } = props;
		return import_react$4.createElement(Box, {
			as: "div",
			ref,
			slot: "iui-table-body-extra",
			...rest,
			className: (0, import_classnames$4.default)("iui-table-body-extra", rest.className)
		}, children);
	});
	TableEmptyWrapper = import_react$4.forwardRef((props, ref) => {
		let { children, ...rest } = props;
		return import_react$4.createElement(Box, {
			as: "div",
			ref,
			...rest,
			className: (0, import_classnames$4.default)("iui-table-empty", rest.className)
		}, children);
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/index.js
var init_Table = __esmMin((() => {
	init_Table$1();
	init_utils$1();
	init_Button();
	init_DatePicker();
	init_Label();
	init_Input();
	init_Textarea();
	init_StatusMessage();
	init_InputWithDecorations();
	init_ComboBox();
	init_Select();
	init_Popover();
	init_Icon();
	init_FilterToggle();
	init_cells();
	init_IconButton();
	init_DropdownButton();
	init_ProgressRadial();
	init_MenuItem();
	init_styles();
	init_columns();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Tag/TagContainer.js
var import_react$3, import_classnames$3, TagContainer;
var init_TagContainer = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$3 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	TagContainer = import_react$3.forwardRef((props, forwardedRef) => {
		let { className, children, overflow, background = "none", ...rest } = props;
		return import_react$3.createElement(Box, {
			className: (0, import_classnames$3.default)("iui-tag-container", {
				[`iui-${overflow}`]: !!overflow,
				"iui-visible": "none" !== background
			}, className),
			ref: forwardedRef,
			...rest
		}, children);
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/ToggleSwitch/ToggleSwitch.js
var import_react$2, import_classnames$2, ToggleSwitch;
var init_ToggleSwitch = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$2 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	ToggleSwitch = import_react$2.forwardRef((props, ref) => {
		let { disabled = false, labelPosition = "right", label, className, style, size = "default", labelProps = {}, wrapperProps, icon: iconProp, ...rest } = props;
		let { consistentPropsSpread } = useFutureFlag("ToggleSwitch") || {};
		let shouldApplyClassNameAndStyleOnInput = null != wrapperProps || consistentPropsSpread;
		let shouldShowIcon = void 0 === iconProp || null !== iconProp && "small" !== size;
		return import_react$2.createElement(Box, {
			as: label ? "label" : "div",
			style: shouldApplyClassNameAndStyleOnInput ? void 0 : style,
			...wrapperProps,
			className: (0, import_classnames$2.default)("iui-toggle-switch-wrapper", {
				"iui-disabled": disabled,
				"iui-label-on-right": label && "right" === labelPosition,
				"iui-label-on-left": label && "left" === labelPosition
			}, shouldApplyClassNameAndStyleOnInput ? void 0 : className, wrapperProps?.className),
			"data-iui-size": size
		}, import_react$2.createElement(Box, {
			as: "input",
			type: "checkbox",
			role: "switch",
			style: shouldApplyClassNameAndStyleOnInput ? style : void 0,
			...rest,
			className: (0, import_classnames$2.default)("iui-toggle-switch", shouldApplyClassNameAndStyleOnInput ? className : void 0),
			disabled,
			ref
		}), shouldShowIcon && import_react$2.createElement(Box, {
			as: "span",
			className: "iui-toggle-switch-icon",
			"aria-hidden": true
		}, iconProp || import_react$2.createElement(SvgCheckmark, null)), label && import_react$2.createElement(Box, {
			as: "span",
			...labelProps,
			className: (0, import_classnames$2.default)("iui-toggle-switch-label", labelProps?.className)
		}, label));
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/SearchBox/SearchBox.js
var import_react$1, import_classnames$1, SearchBoxContext, SearchBoxComponent, SearchBoxCollapsedState, SearchBoxExpandedState, SearchBoxIcon, SearchBoxInput, SearchBoxButton, SearchBoxCollapseButton, SearchBoxExpandButton, SearchBox;
var init_SearchBox = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames$1 = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_utils$1();
	SearchBoxContext = import_react$1.createContext(void 0);
	SearchBoxComponent = import_react$1.forwardRef((props, ref) => {
		let { size, expandable = false, isDisabled = false, onCollapse: onCollapseProp, onExpand: onExpandProp, isExpanded: isExpandedProp, children, inputProps, className, ...rest } = props;
		let uid = useId$1();
		let [inputId, setInputId] = import_react$1.useState(uid);
		let inputRef = import_react$1.useRef(null);
		let openButtonRef = import_react$1.useRef(null);
		let [localExpanded, setLocalExpanded] = import_react$1.useState(isExpandedProp);
		let isExpanded = isExpandedProp ?? localExpanded;
		let onCollapse = () => {
			setLocalExpanded(false);
			onCollapseProp?.();
			queueMicrotask(() => openButtonRef.current?.focus({ preventScroll: true }));
		};
		let onExpand = () => {
			setLocalExpanded(true);
			onExpandProp?.();
			queueMicrotask(() => inputRef.current?.focus({ preventScroll: true }));
		};
		return import_react$1.createElement(SearchBoxContext.Provider, { value: {
			size,
			isDisabled,
			onCollapse,
			onExpand,
			inputRef,
			inputId,
			setInputId,
			openButtonRef,
			isExpanded,
			expandable
		} }, import_react$1.createElement(InputFlexContainer, {
			ref,
			className: (0, import_classnames$1.default)("iui-searchbox", { "iui-expandable-searchbox": expandable }, className),
			size,
			isDisabled,
			"data-iui-expanded": isExpanded,
			...rest
		}, children ?? import_react$1.createElement(import_react$1.Fragment, null, import_react$1.createElement(SearchBoxCollapsedState, null, import_react$1.createElement(SearchBoxExpandButton, null)), import_react$1.createElement(SearchBoxExpandedState, null, import_react$1.createElement(SearchBoxIcon, null), import_react$1.createElement(SearchBoxInput, inputProps), expandable ? import_react$1.createElement(SearchBoxCollapseButton, null) : null))));
	});
	SearchBoxCollapsedState = ({ children }) => {
		let { isExpanded, expandable } = useSafeContext(SearchBoxContext);
		if (!expandable || isExpanded) return null;
		return import_react$1.createElement(import_react$1.Fragment, null, children ?? import_react$1.createElement(SearchBoxExpandButton, null));
	};
	SearchBoxExpandedState = ({ children }) => {
		let { isExpanded, expandable } = useSafeContext(SearchBoxContext);
		if (expandable && !isExpanded) return null;
		return import_react$1.createElement(import_react$1.Fragment, null, children);
	};
	SearchBoxIcon = import_react$1.forwardRef((props, ref) => {
		let { className, children, ...rest } = props;
		return import_react$1.createElement(InputFlexContainerIcon, {
			"aria-hidden": true,
			className: (0, import_classnames$1.default)("iui-search-icon", className),
			ref,
			...rest
		}, children ?? import_react$1.createElement(SvgSearch, null));
	});
	SearchBoxInput = import_react$1.forwardRef((props, ref) => {
		let { className, id: idProp, ...rest } = props;
		let { inputId, setInputId, isDisabled, inputRef } = useSafeContext(SearchBoxContext);
		import_react$1.useEffect(() => {
			if (idProp && idProp !== inputId) setInputId(idProp);
		}, [
			idProp,
			inputId,
			setInputId
		]);
		return import_react$1.createElement(Box, {
			as: "input",
			id: idProp ?? inputId,
			ref: useMergedRefs(ref, inputRef),
			role: "searchbox",
			type: "text",
			className: (0, import_classnames$1.default)("iui-search-input", className),
			disabled: isDisabled,
			...rest
		});
	});
	SearchBoxButton = import_react$1.forwardRef((props, ref) => {
		let { children, ...rest } = props;
		let { size: sizeContext, isDisabled } = useSafeContext(SearchBoxContext);
		return import_react$1.createElement(InputFlexContainerButton, {
			size: sizeContext,
			ref,
			disabled: isDisabled,
			...rest
		}, children ?? import_react$1.createElement(SvgSearch, null));
	});
	SearchBoxCollapseButton = import_react$1.forwardRef((props, ref) => {
		let { children, onClick: onClickProp, ...rest } = props;
		let { onCollapse, size: sizeContext, isDisabled } = useSafeContext(SearchBoxContext);
		return import_react$1.createElement(SearchBoxButton, {
			ref,
			"aria-label": "Close searchbox",
			size: sizeContext,
			disabled: isDisabled,
			onClick: mergeEventHandlers(onClickProp, onCollapse),
			...rest
		}, children ?? import_react$1.createElement(SvgCloseSmall, null));
	});
	SearchBoxExpandButton = import_react$1.forwardRef((props, ref) => {
		let { children, onClick: onClickProp, ...rest } = props;
		let { onExpand, size: sizeContext, isDisabled, openButtonRef } = useSafeContext(SearchBoxContext);
		return import_react$1.createElement(SearchBoxButton, {
			ref: useMergedRefs(ref, openButtonRef),
			"aria-label": "Expand searchbox",
			size: sizeContext,
			disabled: isDisabled,
			onClick: mergeEventHandlers(onClickProp, onExpand),
			styleType: "default",
			...rest
		}, children ?? import_react$1.createElement(SvgSearch, null));
	});
	SearchBox = Object.assign(SearchBoxComponent, {
		Icon: SearchBoxIcon,
		Input: SearchBoxInput,
		Button: SearchBoxButton,
		CollapseButton: SearchBoxCollapseButton,
		ExpandButton: SearchBoxExpandButton,
		ExpandedState: SearchBoxExpandedState,
		CollapsedState: SearchBoxCollapsedState
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Divider/Divider.js
var import_react, import_classnames, Divider;
var init_Divider = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_Box();
	Divider = import_react.forwardRef((props, ref) => {
		let { className, orientation = "horizontal", ...rest } = props;
		return import_react.createElement(Box, {
			as: "hr",
			className: (0, import_classnames.default)("iui-divider", className),
			"aria-orientation": "vertical" === orientation ? "vertical" : void 0,
			ref,
			...rest
		});
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/index.js
var init_esm = __esmMin((() => {
	init_utils$1();
	init_IconButton();
	init_Icon();
	init_Anchor();
	init_VisuallyHidden();
	init_Backdrop();
	init_Button();
	init_DropdownButton();
	init_Menu();
	init_ButtonGroup();
	init_Checkbox();
	init_ColorPicker();
	init_ColorSwatch();
	init_ColorBuilder();
	init_ColorInputPanel();
	init_ColorPalette();
	init_ComboBox();
	init_DatePicker();
	init_Dialog();
	init_DropdownMenu();
	init_NonIdealState();
	init_ProgressRadial();
	init_ExpandableBlock();
	init_List();
	init_ListItem();
	init_Label();
	init_Tabs();
	init_Input();
	init_InputWithDecorations();
	init_Textarea();
	init_StatusMessage();
	init_Select();
	init_MenuItem();
	init_MenuDivider();
	init_MenuExtraContent();
	init_DialogContent();
	init_DialogButtonBar();
	init_NotificationMarker();
	init_Flex();
	init_Text();
	init_ProgressLinear();
	init_floating_ui_react();
	init_Tooltip();
	init_Slider();
	init_Surface();
	init_Table();
	init_Tag();
	init_TagContainer();
	init_LinkAction();
	init_TimePicker();
	init_Toaster();
	init_ThemeProvider();
	init_ToggleSwitch();
	init_SearchBox();
	init_Popover();
	init_Divider();
	init_meta();
}));
//#endregion
export { init_ColorInputPanel as $, Tabs as A, ThemeProvider as At, ComboBox as B, StatusMessage as Bt, init_Select as C, init_Text as Ct, init_Textarea as D, init_IconButton as Dt, Textarea as E, IconButton as Et, init_NonIdealState as F, init_ButtonGroup as Ft, init_List as G, init_Label as Gt, ListItem as H, Icon as Ht, Dialog as I, VisuallyHidden as It, MenuExtraContent as J, Tag as K, require_classnames as Kt, init_Dialog as L, init_VisuallyHidden as Lt, ExpandableBlock as M, init_Toaster as Mt, init_ExpandableBlock as N, useToaster as Nt, InputWithDecorations as O, Popover as Ot, NonIdealState as P, ButtonGroup as Pt, ColorInputPanel as Q, DatePicker as R, Tooltip as Rt, Select as S, Text as St, init_MenuItem as T, init_ColorValue as Tt, init_ListItem as U, init_Icon as Ut, init_ComboBox as V, init_StatusMessage as Vt, List as W, Label as Wt, ColorPalette as X, init_MenuExtraContent as Y, init_ColorPalette as Z, init_Flex as _, init_Button as _t, init_SearchBox as a, init_Slider as at, MenuDivider as b, Anchor as bt, TagContainer as c, ColorPicker as ct, init_Table$1 as d, init_Checkbox as dt, Input as et, Surface as f, DropdownButton as ft, Flex as g, Button as gt, init_ProgressLinear as h, init_DropdownMenu as ht, SearchBox as i, Slider as it, init_Tabs as j, init_ThemeProvider as jt, init_InputWithDecorations as k, init_Popover as kt, init_TagContainer as l, init_ColorPicker as lt, ProgressLinear as m, DropdownMenu as mt, Divider as n, ColorBuilder as nt, ToggleSwitch as o, ColorSwatch as ot, init_Surface as p, init_DropdownButton as pt, init_Tag as q, init_Divider as r, init_ColorBuilder as rt, init_ToggleSwitch as s, init_ColorSwatch as st, init_esm as t, init_Input as tt, Table as u, Checkbox as ut, NotificationMarker as v, ProgressRadial as vt, MenuItem as w, ColorValue as wt, init_MenuDivider as x, init_Anchor as xt, init_NotificationMarker as y, init_ProgressRadial as yt, init_DatePicker as z, init_Tooltip as zt };
