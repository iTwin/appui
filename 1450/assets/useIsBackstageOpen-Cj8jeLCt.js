import { j as jsxRuntimeExports } from "./iframe-qZqPc1fv.js";
import { useMDXComponents } from "./index-Dz3sxKme.js";
import { M as Meta, S as Story2 } from "./blocks-vWvhPRMt.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-ByfhOn95.js";
import "./appui-react-CLN8J6gc.js";
import "./Key.enum-bWQ0azWJ.js";
import "./client-BmWydt1w.js";
import "./AppUiStory-DAdR-NZM.js";
import "./Utils-BlPrrr_h.js";
import "./BackstageComposer-AO4z-rsH.js";
import "./BackstageAppButton-D9R509ey.js";
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
