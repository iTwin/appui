const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./react-CHjXpGuL.js","./rolldown-runtime-htSClZ5J.js","./react-Dtiv5CLt.js"])))=>i.map(i=>d[i]);
import { a as __toESM, n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-BeSU7fTM.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { a as Docs, f as init_blocks, n as CodeOrSourceMdx, o as HeadersMdx, t as AnchorMdx } from "./blocks-CKY4b78G.js";
import { i as unmountElement, r as renderElement, t as init_react_18 } from "./react-18-CL0z47Ik.js";
//#region ../../node_modules/.pnpm/@storybook+addon-docs@10.5.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_79f0c9ed95d1b34ec286c75f3993b3a1/node_modules/@storybook/addon-docs/dist/_browser-chunks/chunk-OATZR77O.js
var import_react, defaultComponents, ErrorBoundary, DocsRenderer;
function init_chunk_OATZR77O() {
	return (init_chunk_OATZR77O = __esmMin((() => {
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
							const { MDXProvider } = await import("./react-CHjXpGuL.js").then((n) => (n.t(), n.n));
							return { MDXProvider };
						}, __vite__mapDeps([0,1,2]), import.meta.url).then(({ MDXProvider }) => renderElement(import_react.createElement(ErrorBoundary, {
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
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@storybook+addon-docs@10.5.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_79f0c9ed95d1b34ec286c75f3993b3a1/node_modules/@storybook/addon-docs/dist/_browser-chunks/DocsRenderer-JROSPFPF.js
function init_DocsRenderer_JROSPFPF() {
	return (init_DocsRenderer_JROSPFPF = __esmMin((() => {
		init_chunk_OATZR77O();
	})))();
}
//#endregion
init_DocsRenderer_JROSPFPF();
export { DocsRenderer };
