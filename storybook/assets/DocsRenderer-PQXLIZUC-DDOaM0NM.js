const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-DA6RlwqT.js","./iframe-BIXwoC80.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload, e, r as reactExports } from "./iframe-BIXwoC80.js";
import { renderElement, unmountElement } from "./react-18-CdoUeb-y.js";
import { H as HeadersMdx, A as AnchorMdx, C as CodeOrSourceMdx, D as Docs } from "./blocks-DA_2Rxbk.js";
import "./client-dvjUKoP6.js";
var defaultComponents = { code: CodeOrSourceMdx, a: AnchorMdx, ...HeadersMdx }, ErrorBoundary = class extends reactExports.Component {
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
    return hasError ? null : e.createElement(e.Fragment, null, children);
  }
}, DocsRenderer = class {
  constructor() {
    this.render = async (context, docsParameter, element) => {
      let components = { ...defaultComponents, ...docsParameter?.components }, TDocs = Docs;
      return new Promise((resolve, reject) => {
        __vitePreload(async () => {
          const { MDXProvider } = await import("./index-DA6RlwqT.js");
          return { MDXProvider };
        }, true ? __vite__mapDeps([0,1]) : void 0, import.meta.url).then(({ MDXProvider }) => renderElement(e.createElement(ErrorBoundary, { showException: reject, key: Math.random() }, e.createElement(MDXProvider, { components }, e.createElement(TDocs, { context, docsParameter }))), element)).then(() => resolve());
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
