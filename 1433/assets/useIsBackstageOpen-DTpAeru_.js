import { j as jsxRuntimeExports } from "./iframe-DDsloJCs.js";
import { useMDXComponents } from "./index-BfS9xsn7.js";
import { M as Meta, S as Story2 } from "./blocks-CQUVNWUC.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-B-x90Gt4.js";
import "./appui-react-CJ4WPLAk.js";
import "./Key.enum-IWU58BJQ.js";
import "./client-DPW9UKYs.js";
import "./AppUiStory-Bdgi8QBg.js";
import "./Utils-CJOTLJ3d.js";
import "./BackstageComposer-BrN2pUu7.js";
import "./BackstageAppButton-CbfJTZwu.js";
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
