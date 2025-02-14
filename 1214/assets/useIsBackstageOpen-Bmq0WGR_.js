import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { useMDXComponents } from "./index-C92vVcek.js";
import { ae as Meta, af as Story2 } from "./index-CeK7sbMg.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-Ca-mL77d.js";
import "./index-DDLqOySG.js";
import "./iframe-B1rRuy0Z.js";
import "../sb-preview/runtime.js";
import "./index-BwI9SQDf.js";
import "./index-DLlB04eo.js";
import "./_commonjs-dynamic-modules-6KCvujNB.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./index-BZDuRpLS.js";
import "./index-BdOSk9or.js";
import "./appui-react-Cx6bFzkB.js";
import "./Dialog-DXWiaz89.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
import "./debounce-BQf5aemw.js";
import "./AppUiStory-DxGmk2wr.js";
import "./Utils-DZ4FdB5e.js";
import "./DemoIModel-B8H6_QN-.js";
import "./BackstageComposer-DeoK1yep.js";
import "./BackstageAppButton-oRvOPHfv.js";
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    p: "p",
    ...useMDXComponents(),
    ...props.components
  };
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
  const { wrapper: MDXLayout } = {
    ...useMDXComponents(),
    ...props.components
  };
  return MDXLayout ? jsxRuntimeExports.jsx(MDXLayout, {
    ...props,
    children: jsxRuntimeExports.jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
export {
  MDXContent as default
};
