import { j as jsxRuntimeExports } from "./iframe-BaZp3WKq.js";
import { useMDXComponents } from "./index-CfitQDAI.js";
import { M as Meta, S as Story2 } from "./blocks-DD-rhL6h.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-R89a5uuW.js";
import "./appui-react-Be32igjM.js";
import "./Key.enum-C7IyTHg1.js";
import "./client-4z9HH6bW.js";
import "./AppUiStory-FgT0yxyq.js";
import "./Utils-DN7Wz8EB.js";
import "./BackstageComposer-CsmdjR4N.js";
import "./BackstageAppButton-cm7j7kvS.js";
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
