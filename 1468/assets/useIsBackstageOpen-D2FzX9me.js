import { j as jsxRuntimeExports } from "./iframe-Ddex7Uec.js";
import { useMDXComponents } from "./index-B5PHmx2k.js";
import { M as Meta, S as Story2 } from "./blocks-BbXmE2On.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-CRS36uxf.js";
import "./appui-react-DC9EfscU.js";
import "./Key.enum-BciO7xwH.js";
import "./client-CHs3PkIM.js";
import "./AppUiStory-B1ZwRmoq.js";
import "./Utils-C6Q20Zpt.js";
import "./BackstageComposer-CMnQTF_6.js";
import "./BackstageAppButton-CKz8x-_A.js";
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
