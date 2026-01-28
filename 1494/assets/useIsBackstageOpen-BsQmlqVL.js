import { j as jsxRuntimeExports } from "./iframe-BTOKt8sb.js";
import { useMDXComponents } from "./index-OPl85mTw.js";
import { M as Meta, S as Story2 } from "./blocks-D95ser5u.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-BvYCR1nb.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-C8w0C_Xr.js";
import "./appui-react-nOGh2M21.js";
import "./Key.enum-DdwJ-Wkg.js";
import "./client-BuoZTSzj.js";
import "./AppUiStory-DWrXMzNt.js";
import "./Utils-DSy70KJB.js";
import "./BackstageComposer-CE2G8zlj.js";
import "./BackstageAppButton-DKdEuw4E.js";
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
