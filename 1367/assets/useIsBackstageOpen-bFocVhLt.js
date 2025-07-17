import { j as jsxRuntimeExports } from "./iframe-CPf_22bH.js";
import { useMDXComponents } from "./index-98XlNAIy.js";
import { M as Meta, S as Story2 } from "./blocks-CklCPdjl.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-CLP2b0eb.js";
import "./appui-react-DM43Y0g2.js";
import "./Key.enum-xgF-LmbB.js";
import "./client-AY0nUbTQ.js";
import "./AppUiStory-Bkt4h7-f.js";
import "./Utils-By4Tr37r.js";
import "./Divider-CbGHJc5r.js";
import "./BackstageComposer-BFpVv4Gx.js";
import "./BackstageAppButton-DCuFuPv1.js";
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
