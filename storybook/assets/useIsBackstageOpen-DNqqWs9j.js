import { j as jsxRuntimeExports } from "./iframe-D6etZYKx.js";
import { u as useMDXComponents, M as Meta, S as Story2 } from "./blocks-C98UqoJ1.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-CZ9wmQrM.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-D6OYgiXS.js";
import "./appui-react-DQPnIqIU.js";
import "./Key.enum-DxiaZ4K2.js";
import "./components-react-CcAoSHHf.js";
import "./client-8d8O9vwT.js";
import "./Dialog-CnMxc27J.js";
import "./AppUiStory-Cke2SHqr.js";
import "./Utils-WX8e-cwd.js";
import "./BackstageComposer-OJPFF2MX.js";
import "./BackstageAppButton-Mlddb59v.js";
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
