function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./index-Clz-aGG3.js","./index-DM9bPmif.js","./_commonjsHelpers-LQfde5yM.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import { _ as __vitePreload } from "./iframe-C1TMdbVu.js";
import { R as React, r as reactExports } from "./index-DM9bPmif.js";
import { r as renderElement, u as unmountElement } from "./react-18-wiUuDfWn.js";
import { C as CodeOrSourceMdx, A as AnchorMdx, H as HeadersMdx, D as Docs } from "./index-n0FlVOjm.js";
import "../sb-preview/runtime.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./index-EDRsojbr.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-Cp4dr_sK.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
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
        __vitePreload(() => import("./index-Clz-aGG3.js"), true ? __vite__mapDeps([0,1,2]) : void 0, import.meta.url).then(({ MDXProvider }) => renderElement(React.createElement(ErrorBoundary, { showException: reject, key: Math.random() }, React.createElement(MDXProvider, { components }, React.createElement(TDocs, { context, docsParameter }))), element)).then(() => resolve());
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
