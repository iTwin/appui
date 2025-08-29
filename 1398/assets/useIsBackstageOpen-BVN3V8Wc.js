import { j as jsxRuntimeExports } from "./iframe-wVYm6gXj.js";
import { useMDXComponents } from "./index-BG5rQgLQ.js";
import { M as Meta, S as Story2 } from "./blocks-B9jhJ8xs.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-DdFY3YNk.js";
import "./appui-react-eiGJk34q.js";
import "./Key.enum-1GsSiffr.js";
import "./client-Ck5mzuni.js";
import "./AppUiStory-CxLsOX_V.js";
import "./Utils-BI6fIBBa.js";
import "./BackstageComposer-DwAxs8Dc.js";
import "./BackstageAppButton-BtiwBKb_.js";
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
