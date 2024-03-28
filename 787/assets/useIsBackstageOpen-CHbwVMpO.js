import { j as jsxRuntimeExports } from "./jsx-runtime-_iMjpMZ4.js";
import { M as Meta, b as Story2 } from "./index-Dr-11776.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-tyDAs4WX.js";
import { useMDXComponents } from "./index-rfIeqBSq.js";
import "./index-DlkhCVTf.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./iframe-DDgUOPmj.js";
import "../sb-preview/runtime.js";
import "./getPrototypeOf-BmmMfuHC.js";
import "./index-Cm_5MPU1.js";
import "./index-Cp4dr_sK.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./DefaultToolSettingsProvider-DnwPMY8p.js";
import "./index-B47T7vRo.js";
import "./AppUiStory-BtwpH1aH.js";
import "./ToolbarComposer-BHflxGDg.js";
import "./DemoIModel-4Lmk67sy.js";
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
