const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./blocks-1rJJ86v1.js","./preload-helper-C_PogYeJ.js","./react-6GvqukgS.js","./chunk-5GYAEUAU-CznfIcZ4.js","./chunk-IMSF75WX-KsEuZSRr.js","./docs-tools-B6HNWnsZ.js","./chunk-DRQKCCAG-Bb6XxTR9.js","./jsx-runtime-CLJh2LsN.js","./react-dom-13j8k41E.js","./shim-B3WBU4W5.js"])))=>i.map(i=>d[i]);
import { i as __esmMin, n as init_preload_helper, s as __toESM, t as __vitePreload } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { a as Docs, f as init_blocks, n as CodeOrSourceMdx, o as HeadersMdx, t as AnchorMdx } from "./blocks-1rJJ86v1.js";
import { i as unmountElement, r as renderElement, t as init_react_18 } from "./react-18-D0abHgjR.js";
//#region ../../node_modules/.pnpm/@storybook+addon-docs@10.5.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_8e8ee1f3f4e9c55d1edefb985cf84089/node_modules/@storybook/addon-docs/dist/_browser-chunks/chunk-OATZR77O.js
var import_react, defaultComponents, ErrorBoundary, DocsRenderer;
var init_chunk_OATZR77O = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_react_18();
	init_blocks();
	init_preload_helper();
	defaultComponents = {
		code: CodeOrSourceMdx,
		a: AnchorMdx,
		...HeadersMdx
	};
	ErrorBoundary = class extends import_react.Component {
		constructor() {
			super(...arguments);
			this.state = { hasError: !1 };
		}
		static getDerivedStateFromError() {
			return { hasError: !0 };
		}
		componentDidCatch(err) {
			let { showException } = this.props;
			showException(err);
		}
		render() {
			let { hasError } = this.state, { children } = this.props;
			return hasError ? null : import_react.createElement(import_react.Fragment, null, children);
		}
	};
	DocsRenderer = class {
		constructor() {
			this.render = async (context, docsParameter, element) => {
				let components = {
					...defaultComponents,
					...docsParameter?.components
				}, TDocs = Docs;
				return new Promise((resolve, reject) => {
					__vitePreload(async () => {
						const { MDXProvider } = await import("./blocks-1rJJ86v1.js").then((n) => (n.N(), n.P));
						return { MDXProvider };
					}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9]), import.meta.url).then(({ MDXProvider }) => renderElement(import_react.createElement(ErrorBoundary, {
						showException: reject,
						key: Math.random()
					}, import_react.createElement(MDXProvider, { components }, import_react.createElement(TDocs, {
						context,
						docsParameter
					}))), element)).then(() => resolve());
				});
			}, this.unmount = (element) => {
				unmountElement(element);
			};
		}
	};
}));
//#endregion
__esmMin((() => {
	init_chunk_OATZR77O();
}))();
export { DocsRenderer };
