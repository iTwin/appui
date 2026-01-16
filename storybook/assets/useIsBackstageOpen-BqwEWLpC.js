import { j as jsxRuntimeExports } from "./iframe-Bw_N4eUI.js";
import { useMDXComponents } from "./index-DVKzabOQ.js";
import { M as Meta, S as Story2 } from "./blocks-CpM4JGSK.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-C1r_tTE2.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-Btv7an_F.js";
import "./appui-react-C_1Z-tb4.js";
import "./Key.enum-D-1rx8MU.js";
import "./client-CKwtnCjo.js";
import "./AppUiStory-DvSGBHsI.js";
import "./Utils-DStvCVQ7.js";
import "./BackstageComposer-DN4u0E4c.js";
import "./BackstageAppButton-g4qvdK8y.js";
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
