import { j as jsxRuntimeExports } from "./iframe-CPJTBdlt.js";
import { useMDXComponents } from "./index-C2rSGRD1.js";
import { M as Meta, S as Story2 } from "./blocks-IJCZiXwu.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-ZQKKD9h3.js";
import "./appui-react-C9QUNdjL.js";
import "./Key.enum-B-HWoSA2.js";
import "./client-CmZJ5OHh.js";
import "./AppUiStory-CBZTKTwr.js";
import "./Utils-qaAQbqnD.js";
import "./BackstageComposer-VqKed0R2.js";
import "./BackstageAppButton-BaYgkARw.js";
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
