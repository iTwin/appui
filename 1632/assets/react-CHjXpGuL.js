import { a as __toESM, n as __esmMin, r as __exportAll } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
//#region ../../node_modules/.pnpm/@mdx-js+react@3.1.1_@types+react@19.2.14_react@19.2.5/node_modules/@mdx-js/react/lib/index.js
/**
* Get current components from the MDX Context.
*
* @param {Readonly<MDXComponents> | MergeComponents | null | undefined} [components]
*   Additional components to use or a function that creates them (optional).
* @returns {MDXComponents}
*   Current components.
*/
function useMDXComponents(components) {
	const contextComponents = import_react.useContext(MDXContext);
	return import_react.useMemo(function() {
		if (typeof components === "function") return components(contextComponents);
		return {
			...contextComponents,
			...components
		};
	}, [contextComponents, components]);
}
/**
* Provider for MDX context.
*
* @param {Readonly<Props>} properties
*   Properties.
* @returns {ReactElement}
*   Element.
* @satisfies {Component}
*/
function MDXProvider(properties) {
	/** @type {Readonly<MDXComponents>} */
	let allComponents;
	if (properties.disableParentContext) allComponents = typeof properties.components === "function" ? properties.components(emptyComponents) : properties.components || emptyComponents;
	else allComponents = useMDXComponents(properties.components);
	return import_react.createElement(MDXContext.Provider, { value: allComponents }, properties.children);
}
var import_react, emptyComponents, MDXContext;
function init_lib() {
	return (init_lib = __esmMin((() => {
		import_react = /* @__PURE__ */ __toESM(require_react(), 1);
		emptyComponents = {};
		MDXContext = import_react.createContext(emptyComponents);
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@mdx-js+react@3.1.1_@types+react@19.2.14_react@19.2.5/node_modules/@mdx-js/react/index.js
var react_exports = /* @__PURE__ */ __exportAll({ MDXProvider: () => MDXProvider });
function init_react() {
	return (init_react = __esmMin((() => {
		init_lib();
	})))();
}
//#endregion
export { useMDXComponents as i, react_exports as n, init_lib as r, init_react as t };
