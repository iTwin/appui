import { j as jsxRuntimeExports } from "./iframe-CyhagKHJ.js";
import { useMDXComponents } from "./index-wxFpDL2F.js";
import { M as Meta, S as Story2 } from "./blocks-D_rIBRpe.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-DcTThs3t.js";
import "./appui-react-DIW3BCK3.js";
import "./Key.enum-Dnr03nyZ.js";
import "./client-CV4hcD3J.js";
import "./AppUiStory-CVd9Snlu.js";
import "./Utils-CJabGIIC.js";
import "./BackstageComposer-_DXYXX7M.js";
import "./BackstageAppButton-D3FvdLOM.js";
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
