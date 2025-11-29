import { j as jsxRuntimeExports } from "./iframe-B7Vu6-Nd.js";
import { useMDXComponents } from "./index-COvwQHdo.js";
import { M as Meta, S as Story2 } from "./blocks-IUZ6V50a.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-CHpWqc_c.js";
import "./appui-react-C03ZSW7W.js";
import "./Key.enum-vvj7KXZL.js";
import "./client-cEhHFPCd.js";
import "./AppUiStory-Beo-UPAP.js";
import "./Utils-BJP4_Q3q.js";
import "./BackstageComposer-5AejiV5X.js";
import "./BackstageAppButton-D4fHKDen.js";
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
