import { j as jsxRuntimeExports } from "./iframe-CpRh-TYa.js";
import { u as useMDXComponents, M as Meta, S as Story2 } from "./blocks-DE0lqga4.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-CJyh2Xud.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-_JpHN5Jx.js";
import "./appui-react-BtU_mNFj.js";
import "./Key.enum-DCghlnp9.js";
import "./components-react-Dj8XcCyt.js";
import "./client-Cvp-1q-B.js";
import "./Dialog-BycrGCvo.js";
import "./AppUiStory-Be3BgbZq.js";
import "./Utils-BFxNE3WT.js";
import "./BackstageComposer-DVpKS-mW.js";
import "./BackstageAppButton-LjJ_EvB7.js";
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
