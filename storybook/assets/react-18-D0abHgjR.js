import { a as __exportAll, i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_client } from "./client-CH1Z1mh7.js";
//#region ../../node_modules/.pnpm/@storybook+react-dom-shim@10.5.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+r_2b764325ca1ce291ab03f6973abc8f10/node_modules/@storybook/react-dom-shim/dist/react-18.js
var react_18_exports = /* @__PURE__ */ __exportAll({
	renderElement: () => renderElement,
	unmountElement: () => unmountElement
});
function getIsReactActEnvironment() {
	return globalThis.IS_REACT_ACT_ENVIRONMENT;
}
var import_react, import_client, nodes, WithCallback, renderElement, unmountElement, getReactRoot;
var init_react_18 = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	import_client = /* @__PURE__ */ __toESM(require_client(), 1);
	nodes = /* @__PURE__ */ new Map();
	WithCallback = ({ callback, children }) => {
		let once = import_react.useRef();
		return import_react.useLayoutEffect(() => {
			once.current !== callback && (once.current = callback, callback());
		}, [callback]), children;
	};
	typeof Promise.withResolvers > "u" && (Promise.withResolvers = () => {
		let resolve = null, reject = null;
		return {
			promise: new Promise((res, rej) => {
				resolve = res, reject = rej;
			}),
			resolve,
			reject
		};
	});
	renderElement = async (node, el, rootOptions) => {
		let root = await getReactRoot(el, rootOptions);
		if (getIsReactActEnvironment()) {
			root.render(node);
			return;
		}
		let { promise, resolve } = Promise.withResolvers();
		return root.render(import_react.createElement(WithCallback, { callback: resolve }, node)), promise;
	};
	unmountElement = (el, shouldUseNewRootApi) => {
		let root = nodes.get(el);
		root && (root.unmount(), nodes.delete(el));
	};
	getReactRoot = async (el, rootOptions) => {
		let root = nodes.get(el);
		return root || (root = import_client.createRoot(el, rootOptions), nodes.set(el, root)), root;
	};
}));
//#endregion
export { unmountElement as i, react_18_exports as n, renderElement as r, init_react_18 as t };
