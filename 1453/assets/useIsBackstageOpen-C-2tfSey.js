import { j as jsxRuntimeExports } from "./iframe-DIqrB2BT.js";
import { useMDXComponents } from "./index-BPx10Ui0.js";
import { M as Meta, S as Story2 } from "./blocks-B5aShZ5Q.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-Bb_U-GFw.js";
import "./appui-react-CmcDt8M8.js";
import "./Key.enum-q6sQ_7Ej.js";
import "./client-BHE0PJ4Z.js";
import "./AppUiStory-Ls3ZC5D9.js";
import "./Utils-B5tHSU7P.js";
import "./BackstageComposer-C_zQXcsA.js";
import "./BackstageAppButton-BpkLPM8j.js";
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
