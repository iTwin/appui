import { i as __esmMin, r as __commonJSMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
//#region ../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@19.2.5/node_modules/use-sync-external-store/cjs/use-sync-external-store-with-selector.production.js
/**
* @license React
* use-sync-external-store-with-selector.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_with_selector_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	React.useSyncExternalStore;
	React.useRef;
	React.useEffect;
	React.useMemo;
	React.useDebugValue;
}));
//#endregion
//#region ../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@19.2.5/node_modules/use-sync-external-store/with-selector.js
var require_with_selector = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_use_sync_external_store_with_selector_production();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-redux@9.2.0_@types+react@19.2.14_react@19.2.5_redux@5.0.1/node_modules/react-redux/dist/react-redux.mjs
function defaultNoopBatch(callback) {
	callback();
}
function createListenerCollection() {
	let first = null;
	let last = null;
	return {
		clear() {
			first = null;
			last = null;
		},
		notify() {
			defaultNoopBatch(() => {
				let listener = first;
				while (listener) {
					listener.callback();
					listener = listener.next;
				}
			});
		},
		get() {
			const listeners = [];
			let listener = first;
			while (listener) {
				listeners.push(listener);
				listener = listener.next;
			}
			return listeners;
		},
		subscribe(callback) {
			let isSubscribed = true;
			const listener = last = {
				callback,
				next: null,
				prev: last
			};
			if (listener.prev) listener.prev.next = listener;
			else first = listener;
			return function unsubscribe() {
				if (!isSubscribed || first === null) return;
				isSubscribed = false;
				if (listener.next) listener.next.prev = listener.prev;
				else last = listener.prev;
				if (listener.prev) listener.prev.next = listener.next;
				else first = listener.next;
			};
		}
	};
}
function createSubscription(store, parentSub) {
	let unsubscribe;
	let listeners = nullListeners;
	let subscriptionsAmount = 0;
	let selfSubscribed = false;
	function addNestedSub(listener) {
		trySubscribe();
		const cleanupListener = listeners.subscribe(listener);
		let removed = false;
		return () => {
			if (!removed) {
				removed = true;
				cleanupListener();
				tryUnsubscribe();
			}
		};
	}
	function notifyNestedSubs() {
		listeners.notify();
	}
	function handleChangeWrapper() {
		if (subscription.onStateChange) subscription.onStateChange();
	}
	function isSubscribed() {
		return selfSubscribed;
	}
	function trySubscribe() {
		subscriptionsAmount++;
		if (!unsubscribe) {
			unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store.subscribe(handleChangeWrapper);
			listeners = createListenerCollection();
		}
	}
	function tryUnsubscribe() {
		subscriptionsAmount--;
		if (unsubscribe && subscriptionsAmount === 0) {
			unsubscribe();
			unsubscribe = void 0;
			listeners.clear();
			listeners = nullListeners;
		}
	}
	function trySubscribeSelf() {
		if (!selfSubscribed) {
			selfSubscribed = true;
			trySubscribe();
		}
	}
	function tryUnsubscribeSelf() {
		if (selfSubscribed) {
			selfSubscribed = false;
			tryUnsubscribe();
		}
	}
	const subscription = {
		addNestedSub,
		notifyNestedSubs,
		handleChangeWrapper,
		isSubscribed,
		trySubscribe: trySubscribeSelf,
		tryUnsubscribe: tryUnsubscribeSelf,
		getListeners: () => listeners
	};
	return subscription;
}
function getContext() {
	if (!import_react.createContext) return {};
	const contextMap = gT[ContextKey] ??= /* @__PURE__ */ new Map();
	let realContext = contextMap.get(import_react.createContext);
	if (!realContext) {
		realContext = import_react.createContext(null);
		contextMap.set(import_react.createContext, realContext);
	}
	return realContext;
}
function Provider(providerProps) {
	const { children, context, serverState, store } = providerProps;
	const contextValue = import_react.useMemo(() => {
		const subscription = createSubscription(store);
		return {
			store,
			subscription,
			getServerState: serverState ? () => serverState : void 0
		};
	}, [store, serverState]);
	const previousState = import_react.useMemo(() => store.getState(), [store]);
	useIsomorphicLayoutEffect(() => {
		const { subscription } = contextValue;
		subscription.onStateChange = subscription.notifyNestedSubs;
		subscription.trySubscribe();
		if (previousState !== store.getState()) subscription.notifyNestedSubs();
		return () => {
			subscription.tryUnsubscribe();
			subscription.onStateChange = void 0;
		};
	}, [contextValue, previousState]);
	const Context = context || ReactReduxContext;
	return /* @__PURE__ */ import_react.createElement(Context.Provider, { value: contextValue }, children);
}
var import_react, nullListeners, canUseDOM, isDOM, isRunningInReactNative, isReactNative, getUseIsomorphicLayoutEffect, useIsomorphicLayoutEffect, ContextKey, gT, ReactReduxContext, Provider_default;
var init_react_redux = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	require_with_selector();
	nullListeners = {
		notify() {},
		get: () => []
	};
	canUseDOM = () => !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
	isDOM = /* @__PURE__ */ canUseDOM();
	isRunningInReactNative = () => typeof navigator !== "undefined" && navigator.product === "ReactNative";
	isReactNative = /* @__PURE__ */ isRunningInReactNative();
	getUseIsomorphicLayoutEffect = () => isDOM || isReactNative ? import_react.useLayoutEffect : import_react.useEffect;
	useIsomorphicLayoutEffect = /* @__PURE__ */ getUseIsomorphicLayoutEffect();
	ContextKey = /* @__PURE__ */ Symbol.for(`react-redux-context`);
	gT = typeof globalThis !== "undefined" ? globalThis : {};
	ReactReduxContext = /* @__PURE__ */ getContext();
	Provider_default = Provider;
}));
//#endregion
export { init_react_redux as n, Provider_default as t };
