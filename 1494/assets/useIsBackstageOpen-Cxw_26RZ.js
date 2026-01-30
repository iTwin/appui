import { j as jsxRuntimeExports } from "./iframe-CLfdfAl1.js";
import { useMDXComponents } from "./index-CriI876K.js";
import { M as Meta, S as Story2 } from "./blocks-Bwva7fi3.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-C_k1bpPP.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-DuJcsXoL.js";
import "./appui-react-DlzUwJvs.js";
import "./Key.enum-DZrcflso.js";
import "./client-D8vXmL2m.js";
import "./AppUiStory-BLIjtn2Z.js";
import "./Utils-BCzx_3pi.js";
import "./BackstageComposer-BRrHUqaN.js";
import "./BackstageAppButton-lOMmAAOS.js";
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
