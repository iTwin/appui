import { j as jsxRuntimeExports } from "./iframe-N2fj7JLS.js";
import { useMDXComponents } from "./index-lvR6aP_c.js";
import { M as Meta, S as Story2 } from "./blocks-BQmKhZDh.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-CkAsFPx8.js";
import "./appui-react-BMIkHgLG.js";
import "./Key.enum-B1r-IJYZ.js";
import "./client-B-V9a0IV.js";
import "./AppUiStory--D7avtYM.js";
import "./Utils-SDm-TzWl.js";
import "./BackstageComposer-C774qwZL.js";
import "./BackstageAppButton-Cbw7fjC1.js";
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
