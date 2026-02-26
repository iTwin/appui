import { j as jsxRuntimeExports } from "./iframe-B5XhNadd.js";
import { useMDXComponents } from "./index-DOjqn9OY.js";
import { M as Meta, S as Story2 } from "./blocks-CGJKxwwC.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-DWXmtAjx.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-B5vH9_xk.js";
import "./appui-react-CwKstaKu.js";
import "./Key.enum-szt-ThaG.js";
import "./client-H2bURNxP.js";
import "./AppUiStory-iS4J_UUr.js";
import "./Utils-98Mhw6iN.js";
import "./BackstageComposer-Bj6rodcd.js";
import "./BackstageAppButton-CL8vcI1t.js";
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
