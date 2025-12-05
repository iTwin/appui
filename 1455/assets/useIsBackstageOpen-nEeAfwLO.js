import { j as jsxRuntimeExports } from "./iframe-D1d7Ek9N.js";
import { useMDXComponents } from "./index-80LixC-u.js";
import { M as Meta, S as Story2 } from "./blocks-BMXrFF8o.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-Dg-Dvs5u.js";
import "./appui-react-CPCdSJxc.js";
import "./Key.enum-Cu1f0CYO.js";
import "./client-BaOf5Sgr.js";
import "./AppUiStory-CmCUFlL_.js";
import "./Utils-CecUmvm7.js";
import "./BackstageComposer-bZqEnq0g.js";
import "./BackstageAppButton-pYnU_irf.js";
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
