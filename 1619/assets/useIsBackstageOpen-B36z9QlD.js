import { n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { f as init_blocks, l as Story2, s as Meta } from "./blocks-CKY4b78G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { i as useMDXComponents, r as init_lib } from "./react-CHjXpGuL.js";
import { n as init_useIsBackstageOpen_stories, r as useIsBackstageOpen_stories_exports, t as Basic } from "./useIsBackstageOpen.stories-Cpt72LV4.js";
//#region src/hooks/useIsBackstageOpen.mdx
function _createMdxContent(props) {
	const _components = {
		h1: "h1",
		p: "p",
		...useMDXComponents(),
		...props.components
	};
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)(Meta, { of: useIsBackstageOpen_stories_exports }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h1, {
			id: "useisbackstageopen",
			children: "useIsBackstageOpen"
		}),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "React hook that returns whether the backstage is open." }),
		"\n",
		(0, import_jsx_runtime.jsx)(Story2, { of: Basic })
	] });
}
function MDXContent(props = {}) {
	const { wrapper: MDXLayout } = {
		...useMDXComponents(),
		...props.components
	};
	return MDXLayout ? (0, import_jsx_runtime.jsx)(MDXLayout, {
		...props,
		children: (0, import_jsx_runtime.jsx)(_createMdxContent, { ...props })
	}) : _createMdxContent(props);
}
var import_jsx_runtime;
function init_useIsBackstageOpen() {
	return (init_useIsBackstageOpen = __esmMin((() => {
		import_jsx_runtime = require_jsx_runtime();
		init_lib();
		init_blocks();
		init_useIsBackstageOpen_stories();
	})))();
}
//#endregion
init_useIsBackstageOpen();
export { MDXContent as default };
