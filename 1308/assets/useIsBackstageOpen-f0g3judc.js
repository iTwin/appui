import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { useMDXComponents } from "./index-CPY3fjxE.js";
import { M as Meta, S as Story2 } from "./index-jG0EcXCq.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-MFc-bk0S.js";
import "./index-DVOlmhHI.js";
import "./index-CdGyBOBZ.js";
import "./iframe-CMr3liut.js";
import "./index-XG6mIJUL.js";
import "./index-BdOSk9or.js";
import "./appui-react-Dl7Zotdf.js";
import "./Dialog-D8X5n1Ze.js";
import "./SvgCloseSmall-DMa1Cocg.js";
import "./client-DmvY241V.js";
import "./AppUiStory-RiJNuQz6.js";
import "./Utils-A70xa9OL.js";
import "./DemoIModel-selgNRA5.js";
import "./BackstageComposer-CcMTkmhC.js";
import "./BackstageAppButton-DwABjT1x.js";
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
