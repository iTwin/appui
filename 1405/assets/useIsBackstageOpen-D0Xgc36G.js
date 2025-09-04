import { j as jsxRuntimeExports } from "./iframe-DQy1AcBq.js";
import { useMDXComponents } from "./index-3SmZYVoF.js";
import { M as Meta, S as Story2 } from "./blocks-CQGsWLsF.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-CI7RcqNb.js";
import "./appui-react-DY_MpVZu.js";
import "./Key.enum-CmhcI3db.js";
import "./client-G0M5LdjD.js";
import "./AppUiStory-BXOFIann.js";
import "./Utils-BD1aFGCE.js";
import "./BackstageComposer-DWtqYEwp.js";
import "./BackstageAppButton-eyfiBAOU.js";
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
