import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { useMDXComponents } from "./index-CPY3fjxE.js";
import { M as Meta, S as Story2 } from "./index-fGVRtO9K.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-DY_e4HpF.js";
import "./index-DVOlmhHI.js";
import "./index-CdGyBOBZ.js";
import "./iframe-D__3V3e7.js";
import "./index-XG6mIJUL.js";
import "./index-BdOSk9or.js";
import "./appui-react-BhnF3Zrq.js";
import "./Dialog-DI2PG4iL.js";
import "./SvgCloseSmall-CRuBXn0_.js";
import "./client-DmvY241V.js";
import "./AppUiStory-Qg8ERM2E.js";
import "./Utils-CBjlEOQk.js";
import "./DemoIModel-selgNRA5.js";
import "./BackstageComposer-SLPNHg_k.js";
import "./BackstageAppButton-BY-mLxDF.js";
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
