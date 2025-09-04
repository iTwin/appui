import { j as jsxRuntimeExports } from "./iframe-CFDVpAw4.js";
import { useMDXComponents } from "./index-CoV9k2qD.js";
import { M as Meta, S as Story2 } from "./blocks-LAy3Nih-.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-D7L_VePB.js";
import "./appui-react-DH8at8DD.js";
import "./Key.enum-oRjsNWTu.js";
import "./client-CJ1zPzO-.js";
import "./AppUiStory-BKYjwqeB.js";
import "./Utils-CmixmEsk.js";
import "./BackstageComposer-B4Hrun9e.js";
import "./BackstageAppButton-GJN41cVQ.js";
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
