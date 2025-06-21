import { j as jsxRuntimeExports } from "./iframe-C6dO4R-p.js";
import { useMDXComponents } from "./index-i8KegIy7.js";
import { M as Meta, S as Story2 } from "./blocks-CGNPuRNT.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-BJuqvgKB.js";
import "./appui-react-B7LIxGJK.js";
import "./Key.enum-BxJht1U4.js";
import "./client-CWGpl6Kr.js";
import "./AppUiStory-TW9HFGM6.js";
import "./Utils-D8K8VaUT.js";
import "./BackstageComposer-CiIncimN.js";
import "./BackstageAppButton-BXjZSOvy.js";
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
