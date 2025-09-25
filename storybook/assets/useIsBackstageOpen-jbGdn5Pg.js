import { j as jsxRuntimeExports } from "./iframe-DE_hZcVj.js";
import { useMDXComponents } from "./index-D2uDXjTd.js";
import { M as Meta, S as Story2 } from "./blocks-CZaZywOG.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-Ba9sOntj.js";
import "./appui-react-BJc9EwXU.js";
import "./Key.enum-BDsF8giz.js";
import "./client-6qB_cImc.js";
import "./AppUiStory-Bwtc4HcF.js";
import "./Utils-Cnp_Uj8B.js";
import "./BackstageComposer-Cy_AaxA_.js";
import "./BackstageAppButton-vfz8onP4.js";
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
