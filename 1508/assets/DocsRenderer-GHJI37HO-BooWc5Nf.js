const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-BqQTAQnN.js","./iframe-BnF7kxuI.js","./preload-helper-UZRgTS1n.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./preload-helper-UZRgTS1n.js";
import { R as React, r as reactExports } from "./iframe-BnF7kxuI.js";
import { renderElement, unmountElement } from "./react-18-B_hAtHji.js";
import { H as HeadersMdx, A as AnchorMdx, C as CodeOrSourceMdx, D as Docs } from "./blocks-BPELq9PS.js";
import "./client-DYbOg5lC.js";
import "./index-CptIXb7J.js";
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
          const { MDXProvider } = await import("./index-BqQTAQnN.js");
          return { MDXProvider };
        }, true ? __vite__mapDeps([0,1,2]) : void 0, import.meta.url).then(
          ({ MDXProvider }) => (
            // We use a `key={}` here to reset the `hasError` state each time we render ErrorBoundary
            renderElement(
              React.createElement(ErrorBoundary, { showException: reject, key: Math.random() }, React.createElement(MDXProvider, { components }, React.createElement(TDocs, { context, docsParameter }))),
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
