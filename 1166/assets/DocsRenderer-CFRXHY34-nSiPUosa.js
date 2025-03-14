const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-Ck2pqDD9.js","./index-R26Bfrts.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./iframe-CVbTZ5MX.js";
import { R as React, r as reactExports } from "./index-R26Bfrts.js";
import { ag as CodeOrSourceMdx, ah as AnchorMdx, ai as HeadersMdx, aj as Docs } from "./index-qX-VSfMD.js";
import { renderElement, unmountElement } from "./react-18-BJPHa9L5.js";
import "../sb-preview/runtime.js";
import "./jsx-runtime-f7WWSPSb.js";
import "./index-CHBBkG1-.js";
import "./index-DLlB04eo.js";
import "./_commonjs-dynamic-modules-lq-lihFa.js";
import "./index-Brmgc-W4.js";
import "./index-BdOSk9or.js";
import "./client-DRUEp2wC.js";
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
          const { MDXProvider } = await import("./index-Ck2pqDD9.js");
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
