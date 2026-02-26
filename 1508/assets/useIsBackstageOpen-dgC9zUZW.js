import { j as jsxRuntimeExports } from "./iframe-BnF7kxuI.js";
import { useMDXComponents } from "./index-BqQTAQnN.js";
import { M as Meta, S as Story2 } from "./blocks-BPELq9PS.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-DpuoHZgR.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-CptIXb7J.js";
import "./appui-react-B7iNJbV5.js";
import "./Key.enum-B3pThNWo.js";
import "./client-DYbOg5lC.js";
import "./AppUiStory-C8_Xb5kX.js";
import "./Utils-IR3EMk7M.js";
import "./BackstageComposer-vtoqYtCX.js";
import "./BackstageAppButton-CWFjvR9M.js";
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
