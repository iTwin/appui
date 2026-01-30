import { j as jsxRuntimeExports } from "./iframe-BBMVhVSb.js";
import { useMDXComponents } from "./index-Bm1J6-XN.js";
import { M as Meta, S as Story2 } from "./blocks-_USzMXUQ.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-DBj71D1r.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-DGG_u3yd.js";
import "./appui-react-CuxmpMO6.js";
import "./Key.enum-OlB0m7Wi.js";
import "./client-X93GHqP6.js";
import "./AppUiStory-DqdiOs5F.js";
import "./Utils-CeaEC1n-.js";
import "./BackstageComposer-F-QufiDv.js";
import "./BackstageAppButton-Ds_nRtCD.js";
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
