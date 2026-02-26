import { j as jsxRuntimeExports } from "./iframe-MZ9GDAUV.js";
import { useMDXComponents } from "./index-Bl3_9Te0.js";
import { M as Meta, S as Story2 } from "./blocks-w2bBkgKV.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-D39kAIu5.js";
import "./appui-react-CxqBCL1K.js";
import "./Key.enum-BlUwKc_n.js";
import "./client-CdcWlIUh.js";
import "./AppUiStory-BbgzA-a2.js";
import "./Utils-65SDZWWd.js";
import "./BackstageComposer-DpyUDep4.js";
import "./BackstageAppButton-Co_9jlKh.js";
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
