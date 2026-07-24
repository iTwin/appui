import { j as jsxRuntimeExports } from "./iframe-DNdoMX4Q.js";
import { useMDXComponents } from "./index-ZXWUJBjW.js";
import { M as Meta, S as Story2 } from "./blocks-C7SkmsIk.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-CkBcj7oH.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-C9p5eh_j.js";
import "./appui-react-glMK-yaN.js";
import "./Key.enum-YmMvjtrc.js";
import "./client-7SU87-Ux.js";
import "./AppUiStory-BWJJvhLI.js";
import "./Utils-CtqzyU6g.js";
import "./BackstageComposer-Wyh-yKc1.js";
import "./BackstageAppButton-DPih_3Em.js";
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
