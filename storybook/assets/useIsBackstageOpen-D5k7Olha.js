import { j as jsxRuntimeExports } from "./iframe-JYBMU7ZD.js";
import { useMDXComponents } from "./index-D6p6y-vV.js";
import { M as Meta, S as Story2 } from "./blocks-RORET1q_.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-CeA3av02.js";
import "./appui-react-Bkdl7eTp.js";
import "./Key.enum-D8YSRJHT.js";
import "./client-CxV4gkpD.js";
import "./AppUiStory-DiVjAxvm.js";
import "./Utils-CTNbv4Q7.js";
import "./BackstageComposer-CdUYQy2E.js";
import "./BackstageAppButton-0jv9DhWy.js";
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
