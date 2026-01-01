import { j as jsxRuntimeExports } from "./iframe-BMMt6Qh8.js";
import { useMDXComponents } from "./index-C4Vh-4a-.js";
import { M as Meta, S as Story2 } from "./blocks-KaRYsgKH.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-C_v-3-id.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-B0PW13ef.js";
import "./appui-react-Cz4Q9cY4.js";
import "./Key.enum-DpqfsKm8.js";
import "./client-BZ3qZmlJ.js";
import "./AppUiStory-Dny5S618.js";
import "./Utils-7SBuMPvL.js";
import "./BackstageComposer-DZFSArWb.js";
import "./BackstageAppButton-BL71bXx-.js";
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
