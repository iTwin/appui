import { j as jsxRuntimeExports } from "./iframe-BmX5H014.js";
import { useMDXComponents } from "./index-CFV0u5Wf.js";
import { M as Meta, S as Story2 } from "./blocks-CrcdVEJ9.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-DJv9Nseg.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-D95LU0cB.js";
import "./appui-react-DXkFctUx.js";
import "./Key.enum-DvCHltQ0.js";
import "./client-M2bM1T3-.js";
import "./AppUiStory-Cv85Pvas.js";
import "./Utils-C4oq2jmg.js";
import "./BackstageComposer-C4aLwlT3.js";
import "./BackstageAppButton-DOYC4lTj.js";
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
