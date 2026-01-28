import { j as jsxRuntimeExports } from "./iframe-mID-VM-4.js";
import { useMDXComponents } from "./index-C7EpHct7.js";
import { M as Meta, S as Story2 } from "./blocks-CSIHzS0p.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-DtRlHkFB.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-DaTRI3hl.js";
import "./appui-react-vckN5W79.js";
import "./Key.enum-DJvycrum.js";
import "./client-6pR6hfaI.js";
import "./AppUiStory-Dg-YBc6l.js";
import "./Utils-CaJJl6Dq.js";
import "./BackstageComposer-C9mxAU0l.js";
import "./BackstageAppButton-C21CDxD4.js";
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
