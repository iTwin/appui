import { j as jsxRuntimeExports } from "./iframe-BENp4d1r.js";
import { useMDXComponents } from "./index-pqSIZAoL.js";
import { M as Meta, S as Story2 } from "./blocks-DFQpQ9rY.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-C9dycPDj.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-CsG4pdOs.js";
import "./appui-react-CEufDDhs.js";
import "./Key.enum-CnwI7CFN.js";
import "./client-S7MnCWX8.js";
import "./AppUiStory-1k4NCfid.js";
import "./Utils-B8gUJSzA.js";
import "./BackstageComposer-C5Dw2njM.js";
import "./BackstageAppButton-Ba6pIfc7.js";
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
