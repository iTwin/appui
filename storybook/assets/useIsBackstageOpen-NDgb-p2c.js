import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
import { useMDXComponents } from "./index-Ck2pqDD9.js";
import { ae as Meta, af as Story2 } from "./index-C-bkt7zZ.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-BHQ-bxod.js";
import "./index-R26Bfrts.js";
import "./iframe-Dfasi_Sg.js";
import "../sb-preview/runtime.js";
import "./index-CHBBkG1-.js";
import "./index-DLlB04eo.js";
import "./_commonjs-dynamic-modules-lq-lihFa.js";
import "./index-Brmgc-W4.js";
import "./index-BdOSk9or.js";
import "./appui-react-B1foI6ti.js";
import "./Dialog-BqJA4ZAD.js";
import "./SvgCloseSmall-MLQqOcA1.js";
import "./index-oY8aizO2.js";
import "./client-DRUEp2wC.js";
import "./debounce-CTTNlY27.js";
import "./AppUiStory-DhxrQeZp.js";
import "./Utils-AjDGKMQR.js";
import "./DemoIModel-zibz9A5r.js";
import "./BackstageComposer-CmUCNRyH.js";
import "./BackstageAppButton-BK3qAZJp.js";
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
