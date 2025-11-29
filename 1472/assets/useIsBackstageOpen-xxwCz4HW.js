import { j as jsxRuntimeExports } from "./iframe-D8YXFxh5.js";
import { useMDXComponents } from "./index-zQlXL_pO.js";
import { M as Meta, S as Story2 } from "./blocks-Ca4GsY1R.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-DK9mYEO9.js";
import "./appui-react-B4QxuTrb.js";
import "./Key.enum-CJ9HrJPR.js";
import "./client-DooKKsJi.js";
import "./AppUiStory-CuxKvlpf.js";
import "./Utils-AlNTFfqN.js";
import "./BackstageComposer-D8LD-Pau.js";
import "./BackstageAppButton-DNR44zf1.js";
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
