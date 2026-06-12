import { j as jsxRuntimeExports } from "./iframe-Vh1VhiK6.js";
import { u as useMDXComponents, M as Meta, S as Story2 } from "./blocks-DauVs0W_.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-BCImcVb7.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-CiwSlqzV.js";
import "./appui-react-B0bJ_Skp.js";
import "./Key.enum-D1Zc0n-Y.js";
import "./components-react-DzfsRLZU.js";
import "./client-BgtXd6k0.js";
import "./Dialog-B-i9zAr5.js";
import "./AppUiStory-DBh92p0x.js";
import "./Utils-D_B7dZSR.js";
import "./BackstageComposer-oKvaX_db.js";
import "./BackstageAppButton-J95p1KmZ.js";
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
