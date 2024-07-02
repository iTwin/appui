import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { M as Meta, b as Story2 } from "./index-_WnuOxD8.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-Cu4deZjW.js";
import { useMDXComponents } from "./index-Clz-aGG3.js";
import "./index-DM9bPmif.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./iframe-vMT8xG5O.js";
import "../sb-preview/runtime.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-EDRsojbr.js";
import "./index-Cp4dr_sK.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./Key.enum-Nky5yUvk.js";
import "./DefaultToolSettingsProvider-BeaL6ll4.js";
import "./index-B47T7vRo.js";
import "./BackstageAppButton-rq4zruab.js";
import "./AppUiStory-4-AayLg_.js";
import "./DemoIModel-DuWsADYF.js";
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p"
  }, useMDXComponents(), props.components);
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
    children: [jsxRuntimeExports.jsx(Meta, {
      of: stories
    }), "\n", jsxRuntimeExports.jsx(_components.h1, {
      id: "useisbackstageopen",
      children: "useIsBackstageOpen"
    }), "\n", jsxRuntimeExports.jsx(_components.p, {
      children: "React hook that returns whether the backstage is open."
    }), "\n", jsxRuntimeExports.jsx(Story2, {
      of: Basic
    })]
  });
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = Object.assign({}, useMDXComponents(), props.components);
  return MDXLayout ? jsxRuntimeExports.jsx(MDXLayout, Object.assign({}, props, {
    children: jsxRuntimeExports.jsx(_createMdxContent, props)
  })) : _createMdxContent(props);
}
export {
  MDXContent as default
};
