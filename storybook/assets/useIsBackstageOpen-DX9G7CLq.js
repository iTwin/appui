import { j as jsxRuntimeExports } from "./iframe-CmD0Hb4y.js";
import { useMDXComponents } from "./index-BrEs9FWj.js";
import { M as Meta, S as Story2 } from "./blocks-CqC2p7bk.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-BSEFBb1c.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-CzRyVTiY.js";
import "./appui-react-DgImBujK.js";
import "./Key.enum-DiqAEzk8.js";
import "./client-eTkMhgnB.js";
import "./AppUiStory-DV8mE_E8.js";
import "./Utils-DGcn9Fj-.js";
import "./BackstageComposer-n4ackDGF.js";
import "./BackstageAppButton-Ss9jZZrv.js";
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
