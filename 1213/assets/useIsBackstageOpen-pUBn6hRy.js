import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
import { useMDXComponents } from "./index-Ck2pqDD9.js";
import { ae as Meta, af as Story2 } from "./index-ByPpJakk.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-CU7IT4VP.js";
import "./index-R26Bfrts.js";
import "./iframe-3d6x3TCf.js";
import "../sb-preview/runtime.js";
import "./index-CHBBkG1-.js";
import "./index-DLlB04eo.js";
import "./_commonjs-dynamic-modules-lq-lihFa.js";
import "./index-Brmgc-W4.js";
import "./index-BdOSk9or.js";
import "./appui-react-B-HDB5XE.js";
import "./Dialog-CsfHcPcG.js";
import "./SvgCloseSmall-dlV7-Ptn.js";
import "./index-oY8aizO2.js";
import "./client-DRUEp2wC.js";
import "./debounce-CTTNlY27.js";
import "./AppUiStory-iyTEe1kU.js";
import "./Utils-DiRbNwt0.js";
import "./DemoIModel-zibz9A5r.js";
import "./BackstageComposer-5cXKYijU.js";
import "./BackstageAppButton-BQyARyrI.js";
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
