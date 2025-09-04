import { j as jsxRuntimeExports } from "./iframe-BCzDxZkA.js";
import { useMDXComponents } from "./index-Bmqflx0T.js";
import { M as Meta, S as Story2 } from "./blocks-BgG76LwQ.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-B6C7DKlQ.js";
import "./appui-react-B6-8uygV.js";
import "./Key.enum-C2x9ytFN.js";
import "./client-D3ZkmZ9k.js";
import "./AppUiStory-DSBT_Cga.js";
import "./Utils-grVClwkp.js";
import "./BackstageComposer-DBzQbsMb.js";
import "./BackstageAppButton-OfcZcYhR.js";
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
