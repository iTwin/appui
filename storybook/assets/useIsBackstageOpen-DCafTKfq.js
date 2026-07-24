import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { I as useMDXComponents, f as init_blocks, l as Story2, s as Meta } from "./blocks-1rJJ86v1.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { t as init_mdx_react_shim } from "./mdx-react-shim-BQwhp-wD.js";
import { Basic, n as useIsBackstageOpen_stories_exports, t as init_useIsBackstageOpen_stories } from "./useIsBackstageOpen.stories-CK9z6Srb.js";
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
//#endregion
__esmMin((() => {
	import_jsx_runtime = require_jsx_runtime();
	init_mdx_react_shim();
	init_blocks();
	init_useIsBackstageOpen_stories();
}))();
export { MDXContent as default };
