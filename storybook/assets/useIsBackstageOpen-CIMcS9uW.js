import { j as jsxRuntimeExports } from "./iframe-DqVel35l.js";
import { useMDXComponents } from "./index-COmoo4A0.js";
import { M as Meta, S as Story2 } from "./blocks-B-_uQaVC.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-BIDiziqr.js";
import "./appui-react-DMgRmWeu.js";
import "./Key.enum-DIxXXS_n.js";
import "./client-BghBGm9p.js";
import "./AppUiStory-Dm-FFY30.js";
import "./Utils-AGul7ozO.js";
import "./BackstageComposer-DkR9mZIT.js";
import "./BackstageAppButton-D3WPWwVh.js";
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
