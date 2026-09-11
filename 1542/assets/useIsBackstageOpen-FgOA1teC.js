import { j as jsxRuntimeExports } from "./iframe-CiskuaAf.js";
import { u as useMDXComponents, M as Meta, S as Story2 } from "./blocks-DB3kl8q0.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-P_qodJ3k.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-CkgzJ0FA.js";
import "./appui-react-CRF-9igQ.js";
import "./Key.enum-DEi28OI6.js";
import "./client-DpXMbJf5.js";
import "./AppUiStory-CJYfqXZz.js";
import "./Utils-CJKj8S7p.js";
import "./BackstageComposer-zlHACjXs.js";
import "./BackstageAppButton-DgqKhU5_.js";
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
