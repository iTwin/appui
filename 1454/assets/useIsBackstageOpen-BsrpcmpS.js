import { j as jsxRuntimeExports } from "./iframe-Dq7NZ5f-.js";
import { useMDXComponents } from "./index-B_SdzV-h.js";
import { M as Meta, S as Story2 } from "./blocks-CmE7vdRB.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-XZJtyzHK.js";
import "./appui-react-nLGuzzO4.js";
import "./Key.enum-C6kR_Rex.js";
import "./client-Tq8JgO2o.js";
import "./AppUiStory-gnpxRoSq.js";
import "./Utils-CAHEPdek.js";
import "./BackstageComposer-DsrGOZ8z.js";
import "./BackstageAppButton-JyUunBKY.js";
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
