const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-C92vVcek.js","./index-DDLqOySG.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./iframe-ye88wkuB.js";
import { R as React, r as reactExports } from "./index-DDLqOySG.js";
import { ag as CodeOrSourceMdx, ah as AnchorMdx, ai as HeadersMdx, aj as Docs } from "./index-DyUYfeQW.js";
import { renderElement, unmountElement } from "./react-18-CwOcAOSR.js";
import "../sb-preview/runtime.js";
import "./jsx-runtime-CC5-Dj7Q.js";
import "./index-BwI9SQDf.js";
import "./index-DLlB04eo.js";
import "./_commonjs-dynamic-modules-DTCOR0lh.js";
import "./inheritsLoose-HEqISCW8.js";
import "./index-BZDuRpLS.js";
import "./index-BdOSk9or.js";
import "./client-D6MDPju-.js";
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
          const { MDXProvider } = await import("./index-C92vVcek.js");
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
