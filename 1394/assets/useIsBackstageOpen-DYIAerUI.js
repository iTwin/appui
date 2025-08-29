import { j as jsxRuntimeExports } from "./iframe-CVzQFnIL.js";
import { useMDXComponents } from "./index-CMl7N_FR.js";
import { M as Meta, S as Story2 } from "./blocks-BC0Jph6c.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-hKA4bajd.js";
import "./appui-react-w3-SwpAO.js";
import "./Key.enum-Cpx2vBj7.js";
import "./client-UosGsWyk.js";
import "./AppUiStory-DQ2j5jE4.js";
import "./Utils-CEYefhoR.js";
import "./BackstageComposer-DQX2i7Ii.js";
import "./BackstageAppButton-B3tVSf9b.js";
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
