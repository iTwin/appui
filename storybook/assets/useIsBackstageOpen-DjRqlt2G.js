import { j as jsxRuntimeExports } from "./iframe-CRTLbVkI.js";
import { useMDXComponents } from "./index-o51R0bmn.js";
import { M as Meta, S as Story2 } from "./blocks-BFUCPRSl.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-CfF7-Kex.js";
import "./appui-react-CRWgJbNo.js";
import "./Key.enum-DQFIldn9.js";
import "./client-DXbnPzJB.js";
import "./AppUiStory-D5W5CdR0.js";
import "./Utils-C1TlXicR.js";
import "./BackstageComposer-B3OsXBjo.js";
import "./BackstageAppButton-DIk2K_XG.js";
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
