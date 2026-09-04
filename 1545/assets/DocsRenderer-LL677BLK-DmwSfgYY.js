import { i as MDXProvider, H as HeadersMdx, j as AnchorMdx, k as CodeOrSourceMdx, m as Docs, u as useMDXComponents } from "./blocks-Bj0mf2N-.js";
import { _ as __vitePreload } from "./preload-helper-UZRgTS1n.js";
import { R as React, r as reactExports } from "./iframe-D8NJimLr.js";
import { renderElement, unmountElement } from "./react-18-B50D63hb.js";
import "./index-50wz-xKp.js";
import "./client-D3QKcxNP.js";
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MDXProvider,
  useMDXComponents
}, Symbol.toStringTag, { value: "Module" }));
var defaultComponents = {
  code: CodeOrSourceMdx,
  a: AnchorMdx,
  ...HeadersMdx
}, ErrorBoundary = class extends reactExports.Component {
  constructor() {
    super(...arguments);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err) {
    let { showException } = this.props;
    showException(err);
  }
  render() {
    let { hasError } = this.state, { children } = this.props;
    return hasError ? null : React.createElement(React.Fragment, null, children);
  }
}, DocsRenderer = class {
  constructor() {
    this.render = async (context, docsParameter, element) => {
      let components = {
        ...defaultComponents,
        ...docsParameter?.components
      }, TDocs = Docs;
      return new Promise((resolve, reject) => {
        __vitePreload(async () => {
          const { MDXProvider: MDXProvider2 } = await Promise.resolve().then(() => index);
          return { MDXProvider: MDXProvider2 };
        }, true ? void 0 : void 0, import.meta.url).then(
          ({ MDXProvider: MDXProvider2 }) => (
            // We use a `key={}` here to reset the `hasError` state each time we render ErrorBoundary
            renderElement(
              React.createElement(ErrorBoundary, { showException: reject, key: Math.random() }, React.createElement(MDXProvider2, { components }, React.createElement(TDocs, { context, docsParameter }))),
              element
            )
          )
        ).then(() => resolve());
      });
    }, this.unmount = (element) => {
      unmountElement(element);
    };
  }
};
export {
  DocsRenderer,
  defaultComponents
};
