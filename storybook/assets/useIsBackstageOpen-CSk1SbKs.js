import { j as jsxRuntimeExports } from "./iframe-C8gxtGVZ.js";
import { useMDXComponents } from "./index-Cp-LBmF5.js";
import { M as Meta, S as Story2 } from "./blocks-CICEthw7.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-Dfp_BAqh.js";
import "./appui-react-If8DduuN.js";
import "./Key.enum-U_STwKJc.js";
import "./client-gG1c7Fyf.js";
import "./AppUiStory-BCMzfQJ6.js";
import "./Utils-H7ytDdFo.js";
import "./BackstageComposer-Ch82k65h.js";
import "./BackstageAppButton-wOtfQOMP.js";
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
