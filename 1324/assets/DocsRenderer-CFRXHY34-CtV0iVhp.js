const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-CPY3fjxE.js","./index-DVOlmhHI.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./iframe-BrzIzMCe.js";
import { R as React, r as reactExports } from "./index-DVOlmhHI.js";
import { H as HeadersMdx, A as AnchorMdx, C as CodeOrSourceMdx, D as Docs } from "./index-DzWEwk9c.js";
import { renderElement, unmountElement } from "./react-18-Bmx1fhKs.js";
import "./index-C8SlDwFz.js";
import "./index-CdGyBOBZ.js";
import "./index-XG6mIJUL.js";
import "./index-BdOSk9or.js";
import "./client-DmvY241V.js";
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
    return hasError ? null : React.createElement(React.Fragment, null, children);
  }
}, DocsRenderer = class {
  constructor() {
    this.render = async (context, docsParameter, element) => {
      let components = { ...defaultComponents, ...docsParameter == null ? void 0 : docsParameter.components }, TDocs = Docs;
      return new Promise((resolve, reject) => {
        __vitePreload(async () => {
          const { MDXProvider } = await import("./index-CPY3fjxE.js");
          return { MDXProvider };
        }, true ? __vite__mapDeps([0,1]) : void 0, import.meta.url).then(({ MDXProvider }) => renderElement(React.createElement(ErrorBoundary, { showException: reject, key: Math.random() }, React.createElement(MDXProvider, { components }, React.createElement(TDocs, { context, docsParameter }))), element)).then(() => resolve());
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
