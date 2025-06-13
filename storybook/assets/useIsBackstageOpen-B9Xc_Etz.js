import { j as jsxRuntimeExports } from "./iframe-DMCF11ZE.js";
import { useMDXComponents } from "./index-Bki48HLG.js";
import { M as Meta, S as Story2 } from "./blocks-CdwoZI2S.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-QAzuFqc7.js";
import "./appui-react-Cn73l-Bp.js";
import "./Key.enum-jv_2YNFv.js";
import "./client-DS_KHKKa.js";
import "./AppUiStory-BruMjF3K.js";
import "./Utils-Bnboikm0.js";
import "./BackstageComposer-D27OcW8L.js";
import "./BackstageAppButton-BWzyPWQP.js";
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
