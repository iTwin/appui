import { j as jsxRuntimeExports } from "./iframe-BIXwoC80.js";
import { useMDXComponents } from "./index-DA6RlwqT.js";
import { M as Meta, S as Story2 } from "./blocks-DA_2Rxbk.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-KPqfVEyF.js";
import "./appui-react-CNLcJNb9.js";
import "./Key.enum-B-WhjwuV.js";
import "./client-dvjUKoP6.js";
import "./AppUiStory-DrM_MNQm.js";
import "./Utils-CICO5XQv.js";
import "./BackstageComposer-CpW6UoAz.js";
import "./BackstageAppButton-Cvy43O5t.js";
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
