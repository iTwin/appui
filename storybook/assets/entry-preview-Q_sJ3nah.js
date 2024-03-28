import { R as React, r as reactExports } from "./index-DlkhCVTf.js";
import { u as unmountElement, r as renderElement } from "./react-16-CTl29GW6.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./index-Cm_5MPU1.js";
const { global } = __STORYBOOK_MODULE_GLOBAL__;
var { FRAMEWORK_OPTIONS } = global, render = (args, context) => {
  let { id, component: Component } = context;
  if (!Component)
    throw new Error(`Unable to render story ${id} as the component annotation is missing from the default export`);
  return React.createElement(Component, { ...args });
}, ErrorBoundary = class extends reactExports.Component {
  constructor() {
    super(...arguments);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidMount() {
    let { hasError } = this.state, { showMain } = this.props;
    hasError || showMain();
  }
  componentDidCatch(err) {
    let { showException } = this.props;
    showException(err);
  }
  render() {
    let { hasError } = this.state, { children } = this.props;
    return hasError ? null : children;
  }
}, Wrapper = (FRAMEWORK_OPTIONS == null ? void 0 : FRAMEWORK_OPTIONS.strictMode) ? reactExports.StrictMode : reactExports.Fragment;
async function renderToCanvas({ storyContext, unboundStoryFn, showMain, showException, forceRemount }, canvasElement) {
  let content = React.createElement(ErrorBoundary, { showMain, showException }, React.createElement(unboundStoryFn, { ...storyContext })), element = Wrapper ? React.createElement(Wrapper, null, content) : content;
  return forceRemount && unmountElement(canvasElement), await renderElement(element, canvasElement), () => unmountElement(canvasElement);
}
var parameters = { renderer: "react" };
export {
  parameters,
  render,
  renderToCanvas
};
