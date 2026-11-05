import { a as __toESM, n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { t as require_react_dom } from "./react-dom-COAM6TrF.js";
import { a as init_theming, u as styled } from "./theming-BErEndj3.js";
//#region ../../node_modules/.pnpm/storybook@10.5.3_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-LITCR56V.js
function $319e236875307eab$export$a9b970dcc4ae71a9(message, assertiveness = "assertive", timeout = 7e3) {
	$319e236875307eab$var$liveAnnouncer ? $319e236875307eab$var$liveAnnouncer.announce(message, assertiveness, timeout) : ($319e236875307eab$var$liveAnnouncer = new $319e236875307eab$var$LiveAnnouncer(), (typeof IS_REACT_ACT_ENVIRONMENT == "boolean" ? IS_REACT_ACT_ENVIRONMENT : typeof jest < "u") ? $319e236875307eab$var$liveAnnouncer.announce(message, assertiveness, timeout) : setTimeout(() => {
		$319e236875307eab$var$liveAnnouncer?.isAttached() && $319e236875307eab$var$liveAnnouncer?.announce(message, assertiveness, timeout);
	}, 100));
}
function $319e236875307eab$export$d10ae4f68404609a(assertiveness) {
	$319e236875307eab$var$liveAnnouncer && $319e236875307eab$var$liveAnnouncer.clear(assertiveness);
}
var $319e236875307eab$var$liveAnnouncer, $319e236875307eab$var$LiveAnnouncer;
function init_chunk_LITCR56V() {
	return (init_chunk_LITCR56V = __esmMin((() => {
		$319e236875307eab$var$liveAnnouncer = null;
		$319e236875307eab$var$LiveAnnouncer = class {
			isAttached() {
				var _this_node;
				return (_this_node = this.node) === null || _this_node === void 0 ? void 0 : _this_node.isConnected;
			}
			createLog(ariaLive) {
				let node = document.createElement("div");
				return node.setAttribute("role", "log"), node.setAttribute("aria-live", ariaLive), node.setAttribute("aria-relevant", "additions"), node;
			}
			destroy() {
				this.node && (document.body.removeChild(this.node), this.node = null);
			}
			announce(message, assertiveness = "assertive", timeout = 7e3) {
				var _this_assertiveLog, _this_politeLog;
				if (!this.node) return;
				let node = document.createElement("div");
				typeof message == "object" ? (node.setAttribute("role", "img"), node.setAttribute("aria-labelledby", message["aria-labelledby"])) : node.textContent = message, assertiveness === "assertive" ? (_this_assertiveLog = this.assertiveLog) === null || _this_assertiveLog === void 0 || _this_assertiveLog.appendChild(node) : (_this_politeLog = this.politeLog) === null || _this_politeLog === void 0 || _this_politeLog.appendChild(node), message !== "" && setTimeout(() => {
					node.remove();
				}, timeout);
			}
			clear(assertiveness) {
				this.node && ((!assertiveness || assertiveness === "assertive") && this.assertiveLog && (this.assertiveLog.innerHTML = ""), (!assertiveness || assertiveness === "polite") && this.politeLog && (this.politeLog.innerHTML = ""));
			}
			constructor() {
				this.node = null, this.assertiveLog = null, this.politeLog = null, typeof document < "u" && (this.node = document.createElement("div"), this.node.dataset.liveAnnouncer = "true", Object.assign(this.node.style, {
					border: 0,
					clip: "rect(0 0 0 0)",
					clipPath: "inset(50%)",
					height: "1px",
					margin: "-1px",
					overflow: "hidden",
					padding: 0,
					position: "absolute",
					width: "1px",
					whiteSpace: "nowrap"
				}), this.assertiveLog = this.createLog("assertive"), this.node.appendChild(this.assertiveLog), this.politeLog = this.createLog("polite"), this.node.appendChild(this.politeLog), document.body.prepend(this.node));
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.5.3_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-W22LQPXL.js
function setRef(ref, value) {
	typeof ref == "function" ? ref(value) : ref != null && (ref.current = value);
}
function composeRefs(...refs) {
	return (node) => refs.forEach((ref) => setRef(ref, node));
}
function useComposedRefs(...refs) {
	return import_react$5.useCallback(composeRefs(...refs), refs);
}
function isSlottable(child) {
	return import_react$4.isValidElement(child) && child.type === Slottable;
}
function mergeProps(slotProps, childProps) {
	let overrideProps = { ...childProps };
	for (let propName in childProps) {
		let slotPropValue = slotProps[propName], childPropValue = childProps[propName];
		/^on[A-Z]/.test(propName) ? slotPropValue && childPropValue ? overrideProps[propName] = (...args) => {
			childPropValue(...args), slotPropValue(...args);
		} : slotPropValue && (overrideProps[propName] = slotPropValue) : propName === "style" ? overrideProps[propName] = {
			...slotPropValue,
			...childPropValue
		} : propName === "className" && (overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" "));
	}
	return {
		...slotProps,
		...overrideProps
	};
}
function getElementRef(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get, mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	return mayWarn ? element.ref : (getter = Object.getOwnPropertyDescriptor(element, "ref")?.get, mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning, mayWarn ? element.props.ref : element.props.ref || element.ref);
}
function useStateMachine(initialState, machine) {
	return import_react$8.useReducer((state, event) => machine[state][event] ?? state, initialState);
}
function usePresence(present) {
	let [node, setNode] = import_react$6.useState(), stylesRef = import_react$6.useRef({}), prevPresentRef = import_react$6.useRef(present), prevAnimationNameRef = import_react$6.useRef("none"), [state, send] = useStateMachine(present ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return import_react$6.useEffect(() => {
		let currentAnimationName = getAnimationName(stylesRef.current);
		prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
	}, [state]), useLayoutEffect2(() => {
		let styles = stylesRef.current, wasPresent = prevPresentRef.current;
		if (wasPresent !== present) {
			let prevAnimationName = prevAnimationNameRef.current, currentAnimationName = getAnimationName(styles);
			present ? send("MOUNT") : currentAnimationName === "none" || styles?.display === "none" ? send("UNMOUNT") : send(wasPresent && prevAnimationName !== currentAnimationName ? "ANIMATION_OUT" : "UNMOUNT"), prevPresentRef.current = present;
		}
	}, [present, send]), useLayoutEffect2(() => {
		if (node) {
			let handleAnimationEnd = (event) => {
				let isCurrentAnimation = getAnimationName(stylesRef.current).includes(event.animationName);
				event.target === node && isCurrentAnimation && import_react_dom$1.flushSync(() => send("ANIMATION_END"));
			}, handleAnimationStart = (event) => {
				event.target === node && (prevAnimationNameRef.current = getAnimationName(stylesRef.current));
			};
			return node.addEventListener("animationstart", handleAnimationStart), node.addEventListener("animationcancel", handleAnimationEnd), node.addEventListener("animationend", handleAnimationEnd), () => {
				node.removeEventListener("animationstart", handleAnimationStart), node.removeEventListener("animationcancel", handleAnimationEnd), node.removeEventListener("animationend", handleAnimationEnd);
			};
		} else send("ANIMATION_END");
	}, [node, send]), {
		isPresent: ["mounted", "unmountSuspended"].includes(state),
		ref: import_react$6.useCallback((node2) => {
			node2 && (stylesRef.current = getComputedStyle(node2)), setNode(node2);
		}, [])
	};
}
function getAnimationName(styles) {
	return styles?.animationName || "none";
}
function getElementRef2(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get, mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	return mayWarn ? element.ref : (getter = Object.getOwnPropertyDescriptor(element, "ref")?.get, mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning, mayWarn ? element.props.ref : element.props.ref || element.ref);
}
function createContextScope(scopeName, createContextScopeDeps = []) {
	let defaultContexts = [];
	function createContext3(rootComponentName, defaultContext) {
		let BaseContext = import_react$9.createContext(defaultContext), index = defaultContexts.length;
		defaultContexts = [...defaultContexts, defaultContext];
		function Provider(props) {
			let { scope, children, ...context } = props, Context = scope?.[scopeName][index] || BaseContext, value = import_react$9.useMemo(() => context, Object.values(context));
			return (0, import_jsx_runtime$2.jsx)(Context.Provider, {
				value,
				children
			});
		}
		function useContext22(consumerName, scope) {
			let Context = scope?.[scopeName][index] || BaseContext, context = import_react$9.useContext(Context);
			if (context) return context;
			if (defaultContext !== void 0) return defaultContext;
			throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
		}
		return Provider.displayName = rootComponentName + "Provider", [Provider, useContext22];
	}
	let createScope = () => {
		let scopeContexts = defaultContexts.map((defaultContext) => import_react$9.createContext(defaultContext));
		return function(scope) {
			let contexts = scope?.[scopeName] || scopeContexts;
			return import_react$9.useMemo(() => ({ [`__scope${scopeName}`]: {
				...scope,
				[scopeName]: contexts
			} }), [scope, contexts]);
		};
	};
	return createScope.scopeName = scopeName, [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
	let baseScope = scopes[0];
	if (scopes.length === 1) return baseScope;
	let createScope = () => {
		let scopeHooks = scopes.map((createScope2) => ({
			useScope: createScope2(),
			scopeName: createScope2.scopeName
		}));
		return function(overrideScopes) {
			let nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
				let currentScope = useScope(overrideScopes)[`__scope${scopeName}`];
				return {
					...nextScopes2,
					...currentScope
				};
			}, {});
			return import_react$9.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
		};
	};
	return createScope.scopeName = baseScope.scopeName, createScope;
}
function useCallbackRef(callback) {
	let callbackRef = import_react$10.useRef(callback);
	return import_react$10.useEffect(() => {
		callbackRef.current = callback;
	}), import_react$10.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}
function useDirection(localDir) {
	let globalDir = import_react$11.useContext(DirectionContext);
	return localDir || globalDir || "ltr";
}
function clamp(value, [min, max]) {
	return Math.min(max, Math.max(min, value));
}
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = !0 } = {}) {
	return function(event) {
		if (originalEventHandler?.(event), checkForDefaultPrevented === !1 || !event.defaultPrevented) return ourEventHandler?.(event);
	};
}
function useStateMachine2(initialState, machine) {
	return import_react$12.useReducer((state, event) => machine[state][event] ?? state, initialState);
}
function toInt(value) {
	return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
	let ratio = viewportSize / contentSize;
	return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
	let ratio = getThumbRatio(sizes.viewport, sizes.content), scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd, thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
	return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
	let thumbSizePx = getThumbSize(sizes), thumbCenter = thumbSizePx / 2, offset = pointerOffset || thumbCenter, thumbOffsetFromEnd = thumbSizePx - offset, minPointerPos = sizes.scrollbar.paddingStart + offset, maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd, maxScrollPos = sizes.content - sizes.viewport, scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
	return linearScale([minPointerPos, maxPointerPos], scrollRange)(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
	let thumbSizePx = getThumbSize(sizes), scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd, scrollbar = sizes.scrollbar.size - scrollbarPadding, maxScrollPos = sizes.content - sizes.viewport, maxThumbPos = scrollbar - thumbSizePx, scrollWithoutMomentum = clamp(scrollPos, dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0]);
	return linearScale([0, maxScrollPos], [0, maxThumbPos])(scrollWithoutMomentum);
}
function linearScale(input, output) {
	return (value) => {
		if (input[0] === input[1] || output[0] === output[1]) return output[0];
		let ratio = (output[1] - output[0]) / (input[1] - input[0]);
		return output[0] + ratio * (value - input[0]);
	};
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
	return scrollPos > 0 && scrollPos < maxScrollPos;
}
function useDebounceCallback(callback, delay) {
	let handleCallback = useCallbackRef(callback), debounceTimerRef = import_react$2.useRef(0);
	return import_react$2.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []), import_react$2.useCallback(() => {
		window.clearTimeout(debounceTimerRef.current), debounceTimerRef.current = window.setTimeout(handleCallback, delay);
	}, [handleCallback, delay]);
}
function useResizeObserver(element, onResize) {
	let handleResize = useCallbackRef(onResize);
	useLayoutEffect2(() => {
		let rAF = 0;
		if (element) {
			let resizeObserver = new ResizeObserver(() => {
				cancelAnimationFrame(rAF), rAF = window.requestAnimationFrame(handleResize);
			});
			return resizeObserver.observe(element), () => {
				window.cancelAnimationFrame(rAF), resizeObserver.unobserve(element);
			};
		}
	}, [element, handleResize]);
}
function getSubtree(options, content) {
	let { asChild, children } = options;
	if (!asChild) return typeof content == "function" ? content(children) : content;
	let firstChild = import_react$2.Children.only(children);
	return import_react$2.cloneElement(firstChild, { children: typeof content == "function" ? content(firstChild.props.children) : content });
}
function useCopyButton({ children = "Copy", childrenOnCopy = "Copied!", content, onCopy, ariaLabel = !1, ariaLabelOnCopy = !1, duration = 3e3 }) {
	let [copied, setCopied] = (0, import_react$13.useState)(!1), timerRef = (0, import_react$13.useRef)(null);
	(0, import_react$13.useEffect)(() => () => {
		timerRef.current && clearTimeout(timerRef.current);
	}, []);
	let handleClick = (0, import_react$13.useCallback)((e) => {
		timerRef.current && clearTimeout(timerRef.current);
		let announcement = typeof ariaLabelOnCopy == "string" ? ariaLabelOnCopy : "Copied to clipboard";
		navigator.clipboard?.writeText(content).then(() => {
			onCopy?.(e), setCopied(!0), $319e236875307eab$export$a9b970dcc4ae71a9(announcement, "polite"), timerRef.current = setTimeout(() => {
				setCopied(!1), $319e236875307eab$export$d10ae4f68404609a("polite"), timerRef.current = null;
			}, duration);
		});
	}, [
		content,
		onCopy,
		ariaLabelOnCopy,
		duration
	]);
	return {
		children: copied ? childrenOnCopy : children,
		buttonProps: (0, import_react$13.useMemo)(() => ({
			onClick: handleClick,
			ariaLabel: copied ? ariaLabelOnCopy : ariaLabel
		}), [
			handleClick,
			copied,
			ariaLabelOnCopy,
			ariaLabel
		])
	};
}
var import_react, import_react$1, import_react$2, import_react$3, import_react$4, import_react$5, import_jsx_runtime, import_jsx_runtime$1, import_react$6, import_react_dom$1, import_react$7, import_react$8, import_react$9, import_jsx_runtime$2, import_react$10, import_react$11, import_react$12, import_jsx_runtime$4, import_react$13, Container, ActionButton, ActionBar, Slot, SlotClone, Slottable, Primitive, useLayoutEffect2, Presence, DirectionContext, SCROLL_AREA_NAME, createScrollAreaContext, createScrollAreaScope, ScrollAreaProvider, useScrollAreaContext, ScrollArea, VIEWPORT_NAME, ScrollAreaViewport, SCROLLBAR_NAME, ScrollAreaScrollbar, ScrollAreaScrollbarHover, ScrollAreaScrollbarScroll, ScrollAreaScrollbarAuto, ScrollAreaScrollbarVisible, ScrollAreaScrollbarX, ScrollAreaScrollbarY, ScrollbarProvider, useScrollbarContext, ScrollAreaScrollbarImpl, THUMB_NAME, ScrollAreaThumb, ScrollAreaThumbImpl, CORNER_NAME, ScrollAreaCorner, ScrollAreaCornerImpl, addUnlinkedScrollListener, Root, Viewport, Scrollbar, Thumb, Corner, ScrollAreaRoot, ScrollAreaViewport2, ScrollAreaScrollbar2, ScrollAreaThumb2, ScrollArea2;
function init_chunk_W22LQPXL() {
	return (init_chunk_W22LQPXL = __esmMin((() => {
		init_chunk_LITCR56V();
		import_react = /* @__PURE__ */ __toESM(require_react(), 1);
		init_theming();
		import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react$2 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react$3 = /* @__PURE__ */ __toESM(require_react(), 1);
		require_react_dom();
		import_react$4 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react$5 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_jsx_runtime = require_jsx_runtime();
		import_jsx_runtime$1 = require_jsx_runtime();
		import_react$6 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom(), 1);
		import_react$7 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react$8 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react$9 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_jsx_runtime$2 = require_jsx_runtime();
		import_react$10 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react$11 = /* @__PURE__ */ __toESM(require_react(), 1);
		require_jsx_runtime();
		import_react$12 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_jsx_runtime$4 = require_jsx_runtime();
		import_react$13 = require_react();
		Container = styled.div(({ theme, $flexLayout = !1 }) => [{ background: theme.background.content }, $flexLayout ? {
			display: "inline-flex",
			marginInlineStart: "auto",
			alignSelf: "flex-end"
		} : {
			position: "absolute",
			bottom: 0,
			right: 0,
			maxWidth: "100%",
			display: "flex",
			zIndex: 1
		}]);
		ActionButton = styled.button(({ theme }) => ({
			margin: 0,
			border: "0 none",
			padding: "4px 10px",
			cursor: "pointer",
			display: "flex",
			alignItems: "center",
			color: theme.color.defaultText,
			background: theme.background.content,
			fontSize: 12,
			lineHeight: "16px",
			fontFamily: theme.typography.fonts.base,
			fontWeight: theme.typography.weight.bold,
			borderTop: `1px solid ${theme.appBorderColor}`,
			borderLeft: `1px solid ${theme.appBorderColor}`,
			marginLeft: -1,
			borderRadius: "4px 0 0 0",
			"&:not(:last-child)": { borderRight: `1px solid ${theme.appBorderColor}` },
			"& + *": {
				borderLeft: `1px solid ${theme.appBorderColor}`,
				borderRadius: 0
			},
			"&:focus": {
				boxShadow: `${theme.color.secondary} 0 -3px 0 0 inset`,
				outline: "0 none",
				"@media (forced-colors: active)": {
					outline: "2px solid ButtonBorder",
					outlineOffset: "2px"
				}
			}
		}), ({ disabled }) => disabled && {
			cursor: "not-allowed",
			opacity: .5
		});
		ActionButton.displayName = "ActionButton";
		ActionBar = ({ actionItems, flexLayout = !1, ...props }) => import_react.createElement(Container, {
			...props,
			$flexLayout: flexLayout
		}, actionItems.map(({ title, ariaLabel, className, onClick, disabled }, index) => import_react.createElement(ActionButton, {
			key: index,
			"aria-label": ariaLabel,
			className,
			onClick,
			disabled: !!disabled
		}, title)));
		Slot = import_react$4.forwardRef((props, forwardedRef) => {
			let { children, ...slotProps } = props, childrenArray = import_react$4.Children.toArray(children), slottable = childrenArray.find(isSlottable);
			if (slottable) {
				let newElement = slottable.props.children, newChildren = childrenArray.map((child) => child === slottable ? import_react$4.Children.count(newElement) > 1 ? import_react$4.Children.only(null) : import_react$4.isValidElement(newElement) ? newElement.props.children : null : child);
				return (0, import_jsx_runtime.jsx)(SlotClone, {
					...slotProps,
					ref: forwardedRef,
					children: import_react$4.isValidElement(newElement) ? import_react$4.cloneElement(newElement, void 0, newChildren) : null
				});
			}
			return (0, import_jsx_runtime.jsx)(SlotClone, {
				...slotProps,
				ref: forwardedRef,
				children
			});
		});
		Slot.displayName = "Slot";
		SlotClone = import_react$4.forwardRef((props, forwardedRef) => {
			let { children, ...slotProps } = props;
			if (import_react$4.isValidElement(children)) {
				let childrenRef = getElementRef(children);
				return import_react$4.cloneElement(children, {
					...mergeProps(slotProps, children.props),
					ref: forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef
				});
			}
			return import_react$4.Children.count(children) > 1 ? import_react$4.Children.only(null) : null;
		});
		SlotClone.displayName = "SlotClone";
		Slottable = ({ children }) => (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
		Primitive = [
			"a",
			"button",
			"div",
			"form",
			"h2",
			"h3",
			"img",
			"input",
			"label",
			"li",
			"nav",
			"ol",
			"p",
			"span",
			"svg",
			"ul"
		].reduce((primitive, node) => {
			let Node = import_react$3.forwardRef((props, forwardedRef) => {
				let { asChild, ...primitiveProps } = props, Comp = asChild ? Slot : node;
				return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), (0, import_jsx_runtime$1.jsx)(Comp, {
					...primitiveProps,
					ref: forwardedRef
				});
			});
			return Node.displayName = `Primitive.${node}`, {
				...primitive,
				[node]: Node
			};
		}, {});
		useLayoutEffect2 = globalThis?.document ? import_react$7.useLayoutEffect : () => {};
		Presence = (props) => {
			let { present, children } = props, presence = usePresence(present), child = typeof children == "function" ? children({ present: presence.isPresent }) : import_react$6.Children.only(children), ref = useComposedRefs(presence.ref, getElementRef2(child));
			return typeof children == "function" || presence.isPresent ? import_react$6.cloneElement(child, { ref }) : null;
		};
		Presence.displayName = "Presence";
		DirectionContext = import_react$11.createContext(void 0);
		SCROLL_AREA_NAME = "ScrollArea", [createScrollAreaContext, createScrollAreaScope] = createContextScope(SCROLL_AREA_NAME), [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME), ScrollArea = import_react$2.forwardRef((props, forwardedRef) => {
			let { __scopeScrollArea, type = "hover", dir, scrollHideDelay = 600, ...scrollAreaProps } = props, [scrollArea, setScrollArea] = import_react$2.useState(null), [viewport, setViewport] = import_react$2.useState(null), [content, setContent] = import_react$2.useState(null), [scrollbarX, setScrollbarX] = import_react$2.useState(null), [scrollbarY, setScrollbarY] = import_react$2.useState(null), [cornerWidth, setCornerWidth] = import_react$2.useState(0), [cornerHeight, setCornerHeight] = import_react$2.useState(0), [scrollbarXEnabled, setScrollbarXEnabled] = import_react$2.useState(!1), [scrollbarYEnabled, setScrollbarYEnabled] = import_react$2.useState(!1), composedRefs = useComposedRefs(forwardedRef, (node) => setScrollArea(node)), direction = useDirection(dir);
			return (0, import_jsx_runtime$4.jsx)(ScrollAreaProvider, {
				scope: __scopeScrollArea,
				type,
				dir: direction,
				scrollHideDelay,
				scrollArea,
				viewport,
				onViewportChange: setViewport,
				content,
				onContentChange: setContent,
				scrollbarX,
				onScrollbarXChange: setScrollbarX,
				scrollbarXEnabled,
				onScrollbarXEnabledChange: setScrollbarXEnabled,
				scrollbarY,
				onScrollbarYChange: setScrollbarY,
				scrollbarYEnabled,
				onScrollbarYEnabledChange: setScrollbarYEnabled,
				onCornerWidthChange: setCornerWidth,
				onCornerHeightChange: setCornerHeight,
				children: (0, import_jsx_runtime$4.jsx)(Primitive.div, {
					dir: direction,
					...scrollAreaProps,
					ref: composedRefs,
					style: {
						position: "relative",
						"--radix-scroll-area-corner-width": cornerWidth + "px",
						"--radix-scroll-area-corner-height": cornerHeight + "px",
						...props.style
					}
				})
			});
		});
		ScrollArea.displayName = SCROLL_AREA_NAME;
		VIEWPORT_NAME = "ScrollAreaViewport";
		ScrollAreaViewport = import_react$2.forwardRef((props, forwardedRef) => {
			let { __scopeScrollArea, children, asChild, nonce, ...viewportProps } = props, context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea), composedRefs = useComposedRefs(forwardedRef, import_react$2.useRef(null), context.onViewportChange);
			return (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [(0, import_jsx_runtime$4.jsx)("style", {
				dangerouslySetInnerHTML: { __html: `
[data-radix-scroll-area-viewport] {
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}
[data-radix-scroll-area-viewport]::-webkit-scrollbar {
  display: none;
}
:where([data-radix-scroll-area-viewport]) {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
:where([data-radix-scroll-area-content]) {
  flex-grow: 1;
}
` },
				nonce
			}), (0, import_jsx_runtime$4.jsx)(Primitive.div, {
				"data-radix-scroll-area-viewport": "",
				...viewportProps,
				asChild,
				ref: composedRefs,
				style: {
					/**
					* We don't support `visible` because the intention is to have at least one scrollbar
					* if this component is used and `visible` will behave like `auto` in that case
					* https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
					*
					* We don't handle `auto` because the intention is for the native implementation
					* to be hidden if using this component. We just want to ensure the node is scrollable
					* so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
					* the browser from having to work out whether to render native scrollbars or not,
					* we tell it to with the intention of hiding them in CSS.
					*/
					overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
					overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
					...props.style
				},
				children: getSubtree({
					asChild,
					children
				}, (children2) => (0, import_jsx_runtime$4.jsx)("div", {
					"data-radix-scroll-area-content": "",
					ref: context.onContentChange,
					style: { minWidth: context.scrollbarXEnabled ? "fit-content" : void 0 },
					children: children2
				}))
			})] });
		});
		ScrollAreaViewport.displayName = VIEWPORT_NAME;
		SCROLLBAR_NAME = "ScrollAreaScrollbar";
		ScrollAreaScrollbar = import_react$2.forwardRef((props, forwardedRef) => {
			let { forceMount, ...scrollbarProps } = props, context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea), { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context, isHorizontal = props.orientation === "horizontal";
			return import_react$2.useEffect(() => (isHorizontal ? onScrollbarXEnabledChange(!0) : onScrollbarYEnabledChange(!0), () => {
				isHorizontal ? onScrollbarXEnabledChange(!1) : onScrollbarYEnabledChange(!1);
			}), [
				isHorizontal,
				onScrollbarXEnabledChange,
				onScrollbarYEnabledChange
			]), context.type === "hover" ? (0, import_jsx_runtime$4.jsx)(ScrollAreaScrollbarHover, {
				...scrollbarProps,
				ref: forwardedRef,
				forceMount
			}) : context.type === "scroll" ? (0, import_jsx_runtime$4.jsx)(ScrollAreaScrollbarScroll, {
				...scrollbarProps,
				ref: forwardedRef,
				forceMount
			}) : context.type === "auto" ? (0, import_jsx_runtime$4.jsx)(ScrollAreaScrollbarAuto, {
				...scrollbarProps,
				ref: forwardedRef,
				forceMount
			}) : context.type === "always" ? (0, import_jsx_runtime$4.jsx)(ScrollAreaScrollbarVisible, {
				...scrollbarProps,
				ref: forwardedRef
			}) : null;
		});
		ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
		ScrollAreaScrollbarHover = import_react$2.forwardRef((props, forwardedRef) => {
			let { forceMount, ...scrollbarProps } = props, context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea), [visible, setVisible] = import_react$2.useState(!1);
			return import_react$2.useEffect(() => {
				let scrollArea = context.scrollArea, hideTimer = 0;
				if (scrollArea) {
					let handlePointerEnter = () => {
						window.clearTimeout(hideTimer), setVisible(!0);
					}, handlePointerLeave = () => {
						hideTimer = window.setTimeout(() => setVisible(!1), context.scrollHideDelay);
					};
					return scrollArea.addEventListener("pointerenter", handlePointerEnter), scrollArea.addEventListener("pointerleave", handlePointerLeave), () => {
						window.clearTimeout(hideTimer), scrollArea.removeEventListener("pointerenter", handlePointerEnter), scrollArea.removeEventListener("pointerleave", handlePointerLeave);
					};
				}
			}, [context.scrollArea, context.scrollHideDelay]), (0, import_jsx_runtime$4.jsx)(Presence, {
				present: forceMount || visible,
				children: (0, import_jsx_runtime$4.jsx)(ScrollAreaScrollbarAuto, {
					"data-state": visible ? "visible" : "hidden",
					...scrollbarProps,
					ref: forwardedRef
				})
			});
		}), ScrollAreaScrollbarScroll = import_react$2.forwardRef((props, forwardedRef) => {
			let { forceMount, ...scrollbarProps } = props, context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea), isHorizontal = props.orientation === "horizontal", debounceScrollEnd = useDebounceCallback(() => send("SCROLL_END"), 100), [state, send] = useStateMachine2("hidden", {
				hidden: { SCROLL: "scrolling" },
				scrolling: {
					SCROLL_END: "idle",
					POINTER_ENTER: "interacting"
				},
				interacting: {
					SCROLL: "interacting",
					POINTER_LEAVE: "idle"
				},
				idle: {
					HIDE: "hidden",
					SCROLL: "scrolling",
					POINTER_ENTER: "interacting"
				}
			});
			return import_react$2.useEffect(() => {
				if (state === "idle") {
					let hideTimer = window.setTimeout(() => send("HIDE"), context.scrollHideDelay);
					return () => window.clearTimeout(hideTimer);
				}
			}, [
				state,
				context.scrollHideDelay,
				send
			]), import_react$2.useEffect(() => {
				let viewport = context.viewport, scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
				if (viewport) {
					let prevScrollPos = viewport[scrollDirection], handleScroll = () => {
						let scrollPos = viewport[scrollDirection];
						prevScrollPos !== scrollPos && (send("SCROLL"), debounceScrollEnd()), prevScrollPos = scrollPos;
					};
					return viewport.addEventListener("scroll", handleScroll), () => viewport.removeEventListener("scroll", handleScroll);
				}
			}, [
				context.viewport,
				isHorizontal,
				send,
				debounceScrollEnd
			]), (0, import_jsx_runtime$4.jsx)(Presence, {
				present: forceMount || state !== "hidden",
				children: (0, import_jsx_runtime$4.jsx)(ScrollAreaScrollbarVisible, {
					"data-state": state === "hidden" ? "hidden" : "visible",
					...scrollbarProps,
					ref: forwardedRef,
					onPointerEnter: composeEventHandlers(props.onPointerEnter, () => send("POINTER_ENTER")),
					onPointerLeave: composeEventHandlers(props.onPointerLeave, () => send("POINTER_LEAVE"))
				})
			});
		}), ScrollAreaScrollbarAuto = import_react$2.forwardRef((props, forwardedRef) => {
			let context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea), { forceMount, ...scrollbarProps } = props, [visible, setVisible] = import_react$2.useState(!1), isHorizontal = props.orientation === "horizontal", handleResize = useDebounceCallback(() => {
				if (context.viewport) {
					let isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth, isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
					setVisible(isHorizontal ? isOverflowX : isOverflowY);
				}
			}, 10);
			return useResizeObserver(context.viewport, handleResize), useResizeObserver(context.content, handleResize), (0, import_jsx_runtime$4.jsx)(Presence, {
				present: forceMount || visible,
				children: (0, import_jsx_runtime$4.jsx)(ScrollAreaScrollbarVisible, {
					"data-state": visible ? "visible" : "hidden",
					...scrollbarProps,
					ref: forwardedRef
				})
			});
		}), ScrollAreaScrollbarVisible = import_react$2.forwardRef((props, forwardedRef) => {
			let { orientation = "vertical", ...scrollbarProps } = props, context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea), thumbRef = import_react$2.useRef(null), pointerOffsetRef = import_react$2.useRef(0), [sizes, setSizes] = import_react$2.useState({
				content: 0,
				viewport: 0,
				scrollbar: {
					size: 0,
					paddingStart: 0,
					paddingEnd: 0
				}
			}), thumbRatio = getThumbRatio(sizes.viewport, sizes.content), commonProps = {
				...scrollbarProps,
				sizes,
				onSizesChange: setSizes,
				hasThumb: thumbRatio > 0 && thumbRatio < 1,
				onThumbChange: (thumb) => thumbRef.current = thumb,
				onThumbPointerUp: () => pointerOffsetRef.current = 0,
				onThumbPointerDown: (pointerPos) => pointerOffsetRef.current = pointerPos
			};
			function getScrollPosition(pointerPos, dir) {
				return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
			}
			return orientation === "horizontal" ? (0, import_jsx_runtime$4.jsx)(ScrollAreaScrollbarX, {
				...commonProps,
				ref: forwardedRef,
				onThumbPositionChange: () => {
					if (context.viewport && thumbRef.current) {
						let scrollPos = context.viewport.scrollLeft, offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
						thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
					}
				},
				onWheelScroll: (scrollPos) => {
					context.viewport && (context.viewport.scrollLeft = scrollPos);
				},
				onDragScroll: (pointerPos) => {
					context.viewport && (context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir));
				}
			}) : orientation === "vertical" ? (0, import_jsx_runtime$4.jsx)(ScrollAreaScrollbarY, {
				...commonProps,
				ref: forwardedRef,
				onThumbPositionChange: () => {
					if (context.viewport && thumbRef.current) {
						let scrollPos = context.viewport.scrollTop, offset = getThumbOffsetFromScroll(scrollPos, sizes);
						thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
					}
				},
				onWheelScroll: (scrollPos) => {
					context.viewport && (context.viewport.scrollTop = scrollPos);
				},
				onDragScroll: (pointerPos) => {
					context.viewport && (context.viewport.scrollTop = getScrollPosition(pointerPos));
				}
			}) : null;
		}), ScrollAreaScrollbarX = import_react$2.forwardRef((props, forwardedRef) => {
			let { sizes, onSizesChange, ...scrollbarProps } = props, context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea), [computedStyle, setComputedStyle] = import_react$2.useState(), ref = import_react$2.useRef(null), composeRefs2 = useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);
			return import_react$2.useEffect(() => {
				ref.current && setComputedStyle(getComputedStyle(ref.current));
			}, [ref]), (0, import_jsx_runtime$4.jsx)(ScrollAreaScrollbarImpl, {
				"data-orientation": "horizontal",
				...scrollbarProps,
				ref: composeRefs2,
				sizes,
				style: {
					bottom: 0,
					left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
					right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
					"--radix-scroll-area-thumb-width": getThumbSize(sizes) + "px",
					...props.style
				},
				onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
				onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
				onWheelScroll: (event, maxScrollPos) => {
					if (context.viewport) {
						let scrollPos = context.viewport.scrollLeft + event.deltaX;
						props.onWheelScroll(scrollPos), isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) && event.preventDefault();
					}
				},
				onResize: () => {
					ref.current && context.viewport && computedStyle && onSizesChange({
						content: context.viewport.scrollWidth,
						viewport: context.viewport.offsetWidth,
						scrollbar: {
							size: ref.current.clientWidth,
							paddingStart: toInt(computedStyle.paddingLeft),
							paddingEnd: toInt(computedStyle.paddingRight)
						}
					});
				}
			});
		}), ScrollAreaScrollbarY = import_react$2.forwardRef((props, forwardedRef) => {
			let { sizes, onSizesChange, ...scrollbarProps } = props, context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea), [computedStyle, setComputedStyle] = import_react$2.useState(), ref = import_react$2.useRef(null), composeRefs2 = useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);
			return import_react$2.useEffect(() => {
				ref.current && setComputedStyle(getComputedStyle(ref.current));
			}, [ref]), (0, import_jsx_runtime$4.jsx)(ScrollAreaScrollbarImpl, {
				"data-orientation": "vertical",
				...scrollbarProps,
				ref: composeRefs2,
				sizes,
				style: {
					top: 0,
					right: context.dir === "ltr" ? 0 : void 0,
					left: context.dir === "rtl" ? 0 : void 0,
					bottom: "var(--radix-scroll-area-corner-height)",
					"--radix-scroll-area-thumb-height": getThumbSize(sizes) + "px",
					...props.style
				},
				onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
				onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
				onWheelScroll: (event, maxScrollPos) => {
					if (context.viewport) {
						let scrollPos = context.viewport.scrollTop + event.deltaY;
						props.onWheelScroll(scrollPos), isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) && event.preventDefault();
					}
				},
				onResize: () => {
					ref.current && context.viewport && computedStyle && onSizesChange({
						content: context.viewport.scrollHeight,
						viewport: context.viewport.offsetHeight,
						scrollbar: {
							size: ref.current.clientHeight,
							paddingStart: toInt(computedStyle.paddingTop),
							paddingEnd: toInt(computedStyle.paddingBottom)
						}
					});
				}
			});
		}), [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME), ScrollAreaScrollbarImpl = import_react$2.forwardRef((props, forwardedRef) => {
			let { __scopeScrollArea, sizes, hasThumb, onThumbChange, onThumbPointerUp, onThumbPointerDown, onThumbPositionChange, onDragScroll, onWheelScroll, onResize, ...scrollbarProps } = props, context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea), [scrollbar, setScrollbar] = import_react$2.useState(null), composeRefs2 = useComposedRefs(forwardedRef, (node) => setScrollbar(node)), rectRef = import_react$2.useRef(null), prevWebkitUserSelectRef = import_react$2.useRef(""), viewport = context.viewport, maxScrollPos = sizes.content - sizes.viewport, handleWheelScroll = useCallbackRef(onWheelScroll), handleThumbPositionChange = useCallbackRef(onThumbPositionChange), handleResize = useDebounceCallback(onResize, 10);
			function handleDragScroll(event) {
				if (rectRef.current) {
					let x = event.clientX - rectRef.current.left, y = event.clientY - rectRef.current.top;
					onDragScroll({
						x,
						y
					});
				}
			}
			return import_react$2.useEffect(() => {
				let handleWheel = (event) => {
					let element = event.target;
					scrollbar?.contains(element) && handleWheelScroll(event, maxScrollPos);
				};
				return document.addEventListener("wheel", handleWheel, { passive: !1 }), () => document.removeEventListener("wheel", handleWheel, { passive: !1 });
			}, [
				viewport,
				scrollbar,
				maxScrollPos,
				handleWheelScroll
			]), import_react$2.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]), useResizeObserver(scrollbar, handleResize), useResizeObserver(context.content, handleResize), (0, import_jsx_runtime$4.jsx)(ScrollbarProvider, {
				scope: __scopeScrollArea,
				scrollbar,
				hasThumb,
				onThumbChange: useCallbackRef(onThumbChange),
				onThumbPointerUp: useCallbackRef(onThumbPointerUp),
				onThumbPositionChange: handleThumbPositionChange,
				onThumbPointerDown: useCallbackRef(onThumbPointerDown),
				children: (0, import_jsx_runtime$4.jsx)(Primitive.div, {
					...scrollbarProps,
					ref: composeRefs2,
					style: {
						position: "absolute",
						...scrollbarProps.style
					},
					onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
						event.button === 0 && (event.target.setPointerCapture(event.pointerId), rectRef.current = scrollbar.getBoundingClientRect(), prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", context.viewport && (context.viewport.style.scrollBehavior = "auto"), handleDragScroll(event));
					}),
					onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
					onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
						let element = event.target;
						element.hasPointerCapture(event.pointerId) && element.releasePointerCapture(event.pointerId), document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current, context.viewport && (context.viewport.style.scrollBehavior = ""), rectRef.current = null;
					})
				})
			});
		}), THUMB_NAME = "ScrollAreaThumb", ScrollAreaThumb = import_react$2.forwardRef((props, forwardedRef) => {
			let { forceMount, ...thumbProps } = props, scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
			return (0, import_jsx_runtime$4.jsx)(Presence, {
				present: forceMount || scrollbarContext.hasThumb,
				children: (0, import_jsx_runtime$4.jsx)(ScrollAreaThumbImpl, {
					ref: forwardedRef,
					...thumbProps
				})
			});
		}), ScrollAreaThumbImpl = import_react$2.forwardRef((props, forwardedRef) => {
			let { __scopeScrollArea, style, ...thumbProps } = props, scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea), scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea), { onThumbPositionChange } = scrollbarContext, composedRef = useComposedRefs(forwardedRef, (node) => scrollbarContext.onThumbChange(node)), removeUnlinkedScrollListenerRef = import_react$2.useRef(), debounceScrollEnd = useDebounceCallback(() => {
				removeUnlinkedScrollListenerRef.current && (removeUnlinkedScrollListenerRef.current(), removeUnlinkedScrollListenerRef.current = void 0);
			}, 100);
			return import_react$2.useEffect(() => {
				let viewport = scrollAreaContext.viewport;
				if (viewport) {
					let handleScroll = () => {
						if (debounceScrollEnd(), !removeUnlinkedScrollListenerRef.current) {
							let listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
							removeUnlinkedScrollListenerRef.current = listener, onThumbPositionChange();
						}
					};
					return onThumbPositionChange(), viewport.addEventListener("scroll", handleScroll), () => viewport.removeEventListener("scroll", handleScroll);
				}
			}, [
				scrollAreaContext.viewport,
				debounceScrollEnd,
				onThumbPositionChange
			]), (0, import_jsx_runtime$4.jsx)(Primitive.div, {
				"data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
				...thumbProps,
				ref: composedRef,
				style: {
					width: "var(--radix-scroll-area-thumb-width)",
					height: "var(--radix-scroll-area-thumb-height)",
					...style
				},
				onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
					let thumbRect = event.target.getBoundingClientRect(), x = event.clientX - thumbRect.left, y = event.clientY - thumbRect.top;
					scrollbarContext.onThumbPointerDown({
						x,
						y
					});
				}),
				onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
			});
		});
		ScrollAreaThumb.displayName = THUMB_NAME;
		CORNER_NAME = "ScrollAreaCorner";
		ScrollAreaCorner = import_react$2.forwardRef((props, forwardedRef) => {
			let context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea), hasBothScrollbarsVisible = !!(context.scrollbarX && context.scrollbarY);
			return context.type !== "scroll" && hasBothScrollbarsVisible ? (0, import_jsx_runtime$4.jsx)(ScrollAreaCornerImpl, {
				...props,
				ref: forwardedRef
			}) : null;
		});
		ScrollAreaCorner.displayName = CORNER_NAME;
		ScrollAreaCornerImpl = import_react$2.forwardRef((props, forwardedRef) => {
			let { __scopeScrollArea, ...cornerProps } = props, context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea), [width, setWidth] = import_react$2.useState(0), [height, setHeight] = import_react$2.useState(0), hasSize = !!(width && height);
			return useResizeObserver(context.scrollbarX, () => {
				let height2 = context.scrollbarX?.offsetHeight || 0;
				context.onCornerHeightChange(height2), setHeight(height2);
			}), useResizeObserver(context.scrollbarY, () => {
				let width2 = context.scrollbarY?.offsetWidth || 0;
				context.onCornerWidthChange(width2), setWidth(width2);
			}), hasSize ? (0, import_jsx_runtime$4.jsx)(Primitive.div, {
				...cornerProps,
				ref: forwardedRef,
				style: {
					width,
					height,
					position: "absolute",
					right: context.dir === "ltr" ? 0 : void 0,
					left: context.dir === "rtl" ? 0 : void 0,
					bottom: 0,
					...props.style
				}
			}) : null;
		});
		addUnlinkedScrollListener = (node, handler = () => {}) => {
			let prevPosition = {
				left: node.scrollLeft,
				top: node.scrollTop
			}, rAF = 0;
			return (function loop() {
				let position = {
					left: node.scrollLeft,
					top: node.scrollTop
				}, isHorizontalScroll = prevPosition.left !== position.left, isVerticalScroll = prevPosition.top !== position.top;
				(isHorizontalScroll || isVerticalScroll) && handler(), prevPosition = position, rAF = window.requestAnimationFrame(loop);
			})(), () => window.cancelAnimationFrame(rAF);
		};
		Root = ScrollArea;
		Viewport = ScrollAreaViewport;
		Scrollbar = ScrollAreaScrollbar;
		Thumb = ScrollAreaThumb;
		Corner = ScrollAreaCorner;
		ScrollAreaRoot = styled(Root)(({ scrollbarsize, offset }) => ({
			width: "100%",
			height: "100%",
			overflow: "hidden",
			"--scrollbar-size": `${scrollbarsize + offset}px`,
			"--radix-scroll-area-thumb-width": `${scrollbarsize}px`
		}));
		ScrollAreaViewport2 = styled(Viewport)(({ focusable, theme }) => ({
			width: "100%",
			height: "100%",
			"&:focus": focusable ? {
				outline: `2px solid ${theme.color.secondary}`,
				outlineOffset: -2
			} : {}
		}));
		ScrollAreaScrollbar2 = styled(Scrollbar)(({ offset, horizontal, vertical }) => ({
			display: "flex",
			userSelect: "none",
			touchAction: "none",
			background: "transparent",
			transition: "all 0.2s ease-out",
			borderRadius: "var(--scrollbar-size)",
			zIndex: 1,
			"&[data-orientation=\"vertical\"]": {
				width: "var(--scrollbar-size)",
				paddingRight: offset,
				marginTop: offset,
				marginBottom: horizontal === "true" && vertical === "true" ? 0 : offset
			},
			"&[data-orientation=\"horizontal\"]": {
				flexDirection: "column",
				height: "var(--scrollbar-size)",
				paddingBottom: offset,
				marginLeft: offset,
				marginRight: horizontal === "true" && vertical === "true" ? 0 : offset
			}
		}));
		ScrollAreaThumb2 = styled(Thumb)(({ theme }) => ({
			flex: 1,
			background: theme.textMutedColor,
			opacity: .5,
			borderRadius: "var(--scrollbar-size)",
			position: "relative",
			transition: "opacity 0.2s ease-out",
			zIndex: 1,
			"&:hover": { opacity: .8 },
			"::before": {
				content: "\"\"",
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%,-50%)",
				width: "100%",
				height: "100%"
			}
		}));
		ScrollArea2 = (0, import_react$1.forwardRef)(({ children, horizontal = !1, vertical = !1, offset = 2, scrollbarSize = 6, scrollPadding = 0, className, focusable = !1 }, ref) => import_react$1.createElement(ScrollAreaRoot, {
			scrollbarsize: scrollbarSize,
			offset,
			className
		}, import_react$1.createElement(ScrollAreaViewport2, {
			ref,
			style: { scrollPadding },
			tabIndex: focusable ? 0 : void 0,
			focusable
		}, children), horizontal && import_react$1.createElement(ScrollAreaScrollbar2, {
			orientation: "horizontal",
			offset,
			horizontal: horizontal.toString(),
			vertical: vertical.toString()
		}, import_react$1.createElement(ScrollAreaThumb2, null)), vertical && import_react$1.createElement(ScrollAreaScrollbar2, {
			orientation: "vertical",
			offset,
			horizontal: horizontal.toString(),
			vertical: vertical.toString()
		}, import_react$1.createElement(ScrollAreaThumb2, null)), horizontal && vertical && import_react$1.createElement(Corner, null)));
		ScrollArea2.displayName = "ScrollArea";
	})))();
}
//#endregion
export { $319e236875307eab$export$a9b970dcc4ae71a9 as a, useCopyButton as i, ScrollArea2 as n, init_chunk_LITCR56V as o, init_chunk_W22LQPXL as r, ActionBar as t };
