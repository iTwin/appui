import { j as jsxRuntimeExports } from "./iframe-F4W_oBvD.js";
import { useMDXComponents } from "./index-kpR5j9B0.js";
import { M as Meta, S as Story2 } from "./blocks-BzmQGof6.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-92yv9QBB.js";
import "./appui-react-D5aueqJ-.js";
import "./Key.enum-BuPNU8_r.js";
import "./client-D6CAiuV8.js";
import "./AppUiStory-Cza2nidm.js";
import "./Utils-BIJ3Rwzj.js";
import "./BackstageComposer-C7HRmvT0.js";
import "./BackstageAppButton-uRv1nBte.js";
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
